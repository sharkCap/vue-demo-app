const express = require('express')
const router = express.Router()
const https = require('https')
const http = require('http')

// Changelog服务类 - 使用Node.js内置模块
class ChangelogService {
    constructor() {
        this.cache = null;
        this.cacheTime = null;
        this.cacheDuration = 5 * 60 * 1000; // 5分钟缓存
        this.translationCache = new Map(); // 翻译缓存
        this.translateApi = 'http://host.docker.internal:5050/translate';
    }

    log(message) {
        console.log(`[ChangelogService] ${new Date().toISOString()} ${message}`);
    }

    // 翻译文本（使用本地LibreTranslate）
    async translateText(text) {
        if (!text || typeof text !== 'string') return text;
        
        // 检查翻译缓存
        if (this.translationCache.has(text)) {
            return this.translationCache.get(text);
        }
        
        try {
            const translated = await this.callTranslateApi(text);
            this.translationCache.set(text, translated);
            return translated;
        } catch (error) {
            this.log(`翻译失败: ${error.message}, 返回原文`);
            return text;
        }
    }

    // 调用LibreTranslate API
    async callTranslateApi(text) {
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify({
                q: text,
                source: 'en',
                target: 'zh'
            });
            
            const options = {
                hostname: '172.17.0.1',
                port: 5050,
                path: '/translate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                },
                timeout: 30000
            };
            
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const result = JSON.parse(data);
                            resolve(result.translatedText || text);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('翻译请求超时'));
            });
            
            req.write(postData);
            req.end();
        });
    }

    // 翻译版本数据
    async translateVersionData(version) {
        const translated = { ...version };
        
        if (translated.features && translated.features.length > 0) {
            translated.features = await Promise.all(
                translated.features.map(f => this.translateText(f))
            );
        }
        
        if (translated.improvements && translated.improvements.length > 0) {
            translated.improvements = await Promise.all(
                translated.improvements.map(i => this.translateText(i))
            );
        }
        
        if (translated.fixes && translated.fixes.length > 0) {
            translated.fixes = await Promise.all(
                translated.fixes.map(f => this.translateText(f))
            );
        }
        
        return translated;
    }

    // 从GitHub API获取数据
    async getFromGitHub() {
        try {
            this.log('正在从GitHub API获取版本信息...');
            
            const data = await this.fetchGitHubAPI('/repos/openclaw/openclaw/releases?per_page=10')
            
            if (!data) {
                this.log('GitHub API访问失败，尝试使用CHANGELOG.md...');
                return this.getFromChangelog();
            }
            
            const releases = JSON.parse(data);
            const versions = releases.map(release => {
                return {
                    version: release.tag_name,
                    date: release.published_at ? new Date(release.published_at).toISOString().split('T')[0] : '',
                    type: release.prerelease ? 'prerelease' : 'release',
                    features: this.extractFeatures(release.body),
                    improvements: this.extractImprovements(release.body),
                    fixes: this.extractFixes(release.body)
                };
            });
            
            this.log(`成功获取 ${versions.length} 个版本信息`);
            return versions;
        } catch (error) {
            this.log(`GitHub API错误: ${error.message}`);
            return this.getFromChangelog();
        }
    }

    // 从CHANGELOG.md获取数据
    async getFromChangelog() {
        try {
            this.log('正在从CHANGELOG.md获取版本信息...');
            
            const data = await this.fetchGitHubRaw('https://raw.githubusercontent.com/openclaw/openclaw/main/CHANGELOG.md')
            
            if (!data) {
                this.log('CHANGELOG.md访问失败，使用本地数据');
                return this.getLocalData();
            }
            
            const versions = this.parseChangelog(data);
            this.log(`成功解析 ${versions.length} 个版本信息`);
            return versions;
        } catch (error) {
            this.log(`CHANGELOG解析错误: ${error.message}`);
            return this.getLocalData();
        }
    }

    // 本地fallback数据
    getLocalData() {
        this.log('使用本地fallback数据');
        return [
            {
                version: '2026.4.14',
                date: '2026-04-14',
                type: 'release',
                features: ['更新日志API接口', 'GitHub数据同步'],
                improvements: ['性能优化'],
                fixes: ['Vue错误修复']
            }
        ];
    }

    // HTTP请求封装
    fetchGitHubAPI(path) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.github.com',
                path: path,
                method: 'GET',
                headers: {
                    'User-Agent': 'OpenClaw-Changelog-Service'
                }
            };
            
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(data);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.end();
        });
    }

    fetchGitHubRaw(url) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'raw.githubusercontent.com',
                path: url.replace('https://raw.githubusercontent.com', ''),
                method: 'GET',
                headers: {
                    'User-Agent': 'OpenClaw-Changelog-Service'
                }
            };
            
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(data);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.end();
        });
    }

    // 解析CHANGELOG.md
    parseChangelog(content) {
        const versions = [];
        const lines = content.split('\n');
        let currentVersion = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // 版本行
            const versionMatch = line.match(/^##\s*\[?([^\]]+)\]?/);
            if (versionMatch) {
                if (currentVersion) {
                    versions.push(currentVersion);
                }
                currentVersion = {
                    version: versionMatch[1],
                    date: '',
                    type: 'release',
                    features: [],
                    improvements: [],
                    fixes: []
                };
                continue;
            }
            
            // 特性行
            if (line.includes('feat:') || line.includes('新功能')) {
                if (currentVersion) {
                    currentVersion.features.push(line.replace(/^-\s*/, ''));
                }
            }
            
            // 修复行
            if (line.includes('fix:') || line.includes('修复')) {
                if (currentVersion) {
                    currentVersion.fixes.push(line.replace(/^-\s*/, ''));
                }
            }
        }
        
        if (currentVersion) {
            versions.push(currentVersion);
        }
        
        return versions.slice(0, 10); // 限制返回最新版本
    }

    // 提取特性
    extractFeatures(body) {
        if (!body) return [];
        const features = [];
        const lines = body.split('\n');
        
        for (const line of lines) {
            if (line.toLowerCase().includes('feature') || line.toLowerCase().includes('feat')) {
                features.push(line.replace(/^[-*]\s*/, ''));
            }
        }
        
        return features.slice(0, 5); // 限制数量
    }

    // 提取改进
    extractImprovements(body) {
        if (!body) return [];
        const improvements = [];
        const lines = body.split('\n');
        
        for (const line of lines) {
            if (line.toLowerCase().includes('improve') || line.toLowerCase().includes('enhance')) {
                improvements.push(line.replace(/^[-*]\s*/, ''));
            }
        }
        
        return improvements.slice(0, 3);
    }

    // 提取修复
    extractFixes(body) {
        if (!body) return [];
        const fixes = [];
        const lines = body.split('\n');
        
        for (const line of lines) {
            if (line.toLowerCase().includes('fix') || line.toLowerCase().includes('bug')) {
                fixes.push(line.replace(/^[-*]\s*/, ''));
            }
        }
        
        return fixes.slice(0, 5);
    }

    // 获取所有版本（分页）
    async getVersions(page = 1, limit = 10) {
        try {
            if (this.cache && this.cacheTime &&
                Date.now() - this.cacheTime < this.cacheDuration) {
                this.log('使用缓存数据');
                return this.paginate(this.cache, page, limit);
            }

            let versions = await this.getFromGitHub();
            
            // 翻译所有版本数据
            this.log('正在翻译版本数据...');
            versions = await Promise.all(
                versions.map(v => this.translateVersionData(v))
            );
            
            this.cache = versions;
            this.cacheTime = Date.now();
            
            return this.paginate(versions, page, limit);
        } catch (error) {
            this.log(`获取版本失败: ${error.message}`);
            return { data: [], total: 0, page, limit };
        }
    }

    // 分页处理
    paginate(versions, page, limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = versions.slice(start, end);
        
        return {
            data,
            total: versions.length,
            page,
            limit,
            totalPages: Math.ceil(versions.length / limit)
        };
    }

    // 获取特定版本
    async getVersion(version) {
        try {
            const versions = await this.getFromGitHub();
            let targetVersion = versions.find(v => v.version === version);
            
            if (targetVersion) {
                targetVersion = await this.translateVersionData(targetVersion);
                return targetVersion;
            }
            
            throw new Error(`版本 ${version} 不存在`);
        } catch (error) {
            this.log(`获取版本 ${version} 失败: ${error.message}`);
            return null;
        }
    }

    // 获取最新版本
    async getLatestVersion() {
        try {
            const versions = await this.getFromGitHub();
            if (versions.length > 0) {
                return await this.translateVersionData(versions[0]);
            }
            return null;
        } catch (error) {
            this.log(`获取最新版本失败: ${error.message}`);
            return null;
        }
    }
}

// 创建服务实例
const changelogService = new ChangelogService();

// API路由

// 获取所有版本（分页）
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await changelogService.getVersions(page, limit);
        res.json(result);
    } catch (error) {
        console.error('获取版本列表失败:', error);
        res.status(500).json({ error: '获取版本列表失败' });
    }
});

// 获取特定版本
router.get('/:version', async (req, res) => {
    try {
        const version = req.params.version;
        const result = await changelogService.getVersion(version);
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: '版本不存在' });
        }
    } catch (error) {
        console.error('获取版本失败:', error);
        res.status(500).json({ error: '获取版本失败' });
    }
});

// 获取最新版本
router.get('/latest/release', async (req, res) => {
    try {
        const result = await changelogService.getLatestVersion();
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: '未找到版本信息' });
        }
    } catch (error) {
        console.error('获取最新版本失败:', error);
        res.status(500).json({ error: '获取最新版本失败' });
    }
});

module.exports = router;

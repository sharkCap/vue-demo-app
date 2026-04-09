<template>
  <div class="changelog-视图">
    <div class="changelog-container container">
      <!-- Header -->
      <header class="changelog-header animate-slide-up">
        <div class="header-content">
          <div class="title-wrapper">
            <div class="title-icon-wrapper">
              <span class="title-icon">📋</span>
              <div class="icon-glow"></div>
            </div>
            <div class="title-text-wrapper">
              <h1 class="page-title">
                <span class="title-gradient">更新日志</span>
              </h1>
              <p class="page-description">
                OpenClaw AI 助手版本迭代记录与功能更新
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- Changelog Content -->
      <main class="changelog-content animate-scale-在">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="changelog-list">
            <div 
              v-for="(release, index) 在 changelogData" 
              :key="release.version"
              class="changelog-item"
              :class="{ 'latest': release.latest, 'animate-fade-in': true }"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <!-- Timeline Node -->
              <div class="timeline-node" :class="{ 'latest-node': release.latest }">
                <div class="node-dot"></div>
                <div class="node-ring"></div>
              </div>

              <!-- Version Card -->
              <div class="version-card" :class="{ 'latest-card': release.latest }">
                <div class="card-header">
                  <div class="version-info">
                    <div class="version-title">
                      <h2 class="version-number">
                        <span class="version-tag" :class="{ 'latest-tag': release.latest }">
                          v{{ release.version }}
                        </span>
                        <span v-if="release.latest" class="latest-badge">
                          <span class="badge-icon">🚀</span>
                          <span class="badge-text">最新版</span>
                        </span>
                      </h2>
                      <div class="version-meta">
                        <time class="release-date">
                          <span class="date-icon">📅</span>
                          {{ formatDate(release.date) }}
                        </time>
                        <span class="release-type" :class="release.type">
                          <span class="type-icon">{{ getTypeIcon(release.type) }}</span>
                          {{ release.type }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Changes Content -->
                <div class="changes-content">
                  <template v-for="(changes, category) in release.changes" :key="category">
                    <div 
                      v-if="changes && Array.isArray(changes) && changes.length > 0"
                      class="change-category"
                    >
                      <div class="category-header">
                        <h3 class="category-title">
                          <span class="category-icon-wrapper">
                            <span class="category-icon">{{ getCategoryIcon(category) }}</span>
                          </span>
                          <span class="category-name">{{ getCategoryName(category) }}</span>
                          <span class="category-count">{{ changes.length }}</span>
                        </h3>
                      </div>
                      <ul class="changes-list">
                        <li 
                          v-for="(change, changeIndex) in changes" 
                          :key="changeIndex" 
                          class="change-item"
                          :style="{ animationDelay: `${changeIndex * 50}ms` }"
                        >
                          <div class="change-bullet"></div>
                          <span class="change-text">{{ change }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="changelog-footer animate-fade-在" style="animation-delay: 300ms;">
          <div class="footer-content">
            <div class="footer-card">
              <p class="footer-text">
                <span class="footer-icon">🔗</span>
                更多历史版本请访问
                <a href="https://github.com/openclaw/openclaw/releases" target="_blank" class="external-link">
                  <span class="link-text">GitHub Releases</span>
                  <svg class="external-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 10L10 4M10 4H6M10 4V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 更新日志数据
const changelogData = ref([
  {
  "version": "2026.4.9",
  "date": "2026-04-09",
  "type": "稳定版",
  "latest": true,
  "changes": {
    "features": [
      "Memory/dreaming: 添加 一个 接地的 REM backfill 通道 具有 历史的 `__PROTECTED_7__-__PROTECTED_8__ --__PROTECTED_9__`, diary commit/重置 流程, 更清晰的 持久的-fact 提取, 和 实时的 短的-term 提升 集成 以便 旧的 daily 笔记 可以 replay into Dreams 和 持久的 Memory 无需 一个 second Memory 栈.",
      "Control 界面/dreaming: 添加 一个 结构化的 diary 视图 具有 timeline 导航, backfill/重置 控制, 可追踪的 dreaming 摘要, 和 一个 接地的 Scene 通道 具有 提升 提示 plus 一个 安全的 清除-接地的 操作 用于 分阶段的 backfill signals.",
      "QA/lab: 添加 character-vibes evaluation reports with model selection and parallel runs so live QA can compare candidate behavior faster.",
      "插件s/provider-auth: let provider manifests 声明 `__PROTECTED_17__` 以便 provider 变体 可以 共享 env vars, auth 配置文件, config-backed auth, 和 API-key onboarding 选择 无需 core-specific 布线.",
      "iOS: pin release versioning to an explicit CalVer in `apps/ios/version.json`, keep TestFlight iteration on the same short version until maintainers intentionally promote the next gateway version, and 添加 the documented `pnpm ios:version:pin -- --from-gateway` workflow for release trains. (#63001) Thanks @ngutman."
    ],
    "improvements": [],
    "bugfixes": [
      "Browser/安全: re-运行 blocked-destination safety checks after interaction-driven main-frame navigations 从 click, evaluate, hook-triggered click, 和 batched 操作 流程, 以便 Browser interactions cannot bypass 这个 SSRF quarantine when they land 在 forbidden URLs.",
      "安全/dotenv: block runtime-Control env vars plus Browser-Control override 和 skip-server env vars 从 untrusted workspace `.__PROTECTED_18__` files, 和 reject unsafe URL-style Browser Control override specifiers before lazy loading. ()",
      "gateway/node exec events: mark remote node `exec.started`, `exec.finished`, 和 `exec.denied` 摘要 as untrusted system events 和 sanitize node-provided command/output/reason text before enqueueing them, 以便 remote node output cannot inject trusted `System:` content into later turns.",
      "插件s/onboarding auth 选择: prevent untrusted workspace 插件s 从 colliding 具有 bundled provider auth-选择 ids during non-interactive onboarding, 以便 bundled provider setup keeps operator secrets out 的 untrusted workspace 插件 handlers unless those 插件s 是 explicitly trusted.",
      "安全/dependency audit: force `basic-ftp` 到 `5.2.1` 用于 这个 CRLF command-injection 修复 和 bump Hono plus `@hono/__PROTECTED_67__-__PROTECTED_35__` 在 production resolution paths.",
      "Android/pairing: 清除 stale setup-code auth 在 new QR scans, bootstrap operator 和 node sessions 从 fresh pairing, prefer stored device tokens after bootstrap handoff, 和 pause pairing auto-retry while 这个 app 是 backgrounded 以便 scan-once Android pairing recovers reliably again.",
      "Matrix/gateway: wait 用于 Matrix sync readiness before marking startup successful, 保持 Matrix background handler failures contained, 和 route fatal Matrix sync stops through channel-level restart handling instead 的 crashing 这个 whole gateway.",
      "Slack/media: preserve bearer auth across same-origin `__PROTECTED_37__.__PROTECTED_41__.com` redirects while still stripping it 在 cross-origin Slack CDN hops, 以便 `url_private_download` image attachments load again.",
      "Reply/doctor: use 这个 active runtime snapshot 用于 queued Reply 运行, resolve Reply-运行 SecretRefs before preflight helpers touch config, surface gateway OAuth reauth failures 到 users, 和 make `openclaw __PROTECTED_46__` call out exact reauth commands. ()",
      "Control 界面: guard stale session-history reloads during fast session switches 以便 这个 selected session 和 rendered transcript stay 在 sync.",
      "gateway/chat: suppress exact 和 streamed `ANNOUNCE_SKIP` / `REPLY_SKIP` Control replies across 实时的 chat 更新s 和 history sanitization 以便 internal agent-to-agent Control tokens no longer leak into user-facing gateway chat surfaces.",
      "Auto-Reply/NO_REPLY: strip glued leading `__PROTECTED_53__` tokens before Reply normalization 和 ACP-visible streaming 以便 silent sentinel text no longer leaks into user-visible replies while preserving substantive `__PROTECTED_53__ ...` text.",
      "sessions/routing: preserve established external routes 在 inter-session announce traffic 以便 `sessions_send` follow-ups do not steal delivery 从 Telegram, Discord, 或 other external channels.",
      "gateway/sessions: 清除 auto-fallback-pinned 模型 overrides 在 `/reset` 和 `/new` while still preserving 显式的 user 模型 selections, including legacy sessions created before override-source tracking existed.",
      "Slack/ACP: treat Slack ACP block replies as visible delivered output 以便 OpenClaw stops re-sending 这个 final fallback text after Slack already rendered 这个 Reply.",
      "Slack/partial streaming: key turn-local dedupe 通过 dispatch kind 和 保持 这个 final fallback Reply path active when preview finalization fails 以便 stale preview text cannot suppress 这个 actual final answer.",
      "Matrix/doctor: migrate legacy `channels.Matrix.dm.policy: \"trusted\"` configs back to compatible DM policies during `openclaw doctor --修复`, preserving explicit `allowFrom` boundaries as `allowlist` and defaulting empty legacy configs to `pairing`.",
      "npm packaging: mirror bundled channel runtime deps, stage Nostr runtime deps, derive req界面red root mirrors 从 manifests 和 b界面lt chunks, 和 test packed release tarballs 无需 repo `node_modules` 以便 fresh installs fail fast 在 missing 插件 deps instead 的 crashing at runtime.",
      "QA/实时的 auth: fail fast when 实时的 QA scenarios hit classified auth 或 runtime failure replies, including raw scenario wait paths, 和 sanitize missing-key g界面dance 以便 gateway auth problems surface as actionable errors instead 的 timeouts.",
      "Providers/OpenAI: default missing reasoning effort 到 `high` 在 OpenAI Responses, WebSocket, 和 compatible completions transports, while still honoring 显式的 per-运行 reasoning levels.",
      "Providers/Ollama: allow Ollama 模型 using 这个 native `API: \"ollama\"` __PROTECTED_9__ to optionally display thinking output when `/think` 是 set 到 一个 non-off level.",
      "Codex CLI: pass OpenClaw's system prompt through Codex's `model_instructions_file` config override 以便 fresh Codex CLI sessions receive 这个 相同的 prompt g界面dance as Claude CLI sessions.",
      "Auth/profiles: persist explicit auth-profile upserts directly and skip external CLI sync for local writes so profile changes are saved without stale external credential state.",
      "Agents/timeouts: make 这个 LLM idle timeout inherit `agents.defaults.timeoutSeconds` when configured, disable 这个 unconfigured idle watchdog 用于 cron 运行, 和 point idle-timeout errors at `agents.defaults.llm.idleTimeoutSeconds`.",
      "Agents/failover: classify Z.ai vendor code `1311` as billing 和 `1113` as auth, including long wrapped `1311` payloads, 以便 these errors stop falling through 到 generic failover handling.",
      "QQBot/media-tags: 支持 HTML entity-encoded angle brackets (`&lt;`/`&gt;`), URL slashes 在 attributes, 和 self-closing media tags 以便 upstream `<qqimg>` payloads 是 correctly parsed 和 normalized.",
      "Memory/dreaming: harden 接地的 backfill inputs, diary writes, status payloads, 和 diary 操作 classification 通过 preserving source-day labels, rejecting missing 或 symlinked targets cleanly, normalizing diary headings 在 gateway backfills, 和 tightening claim splitting plus diary source metadata.",
      "Memory/dreaming: accept embedded heartbeat trigger tokens 以便 light 和 REM dreaming still 运行 when runtime wrappers include extra heartbeat text.",
      "Android/manual connect: allow blank port input only 用于 TLS manual gateway endpoints 以便 standard HTTPS Tailscale hosts default 到 `443` 无需 silently changing cleartext manual connects. -RNG.",
      "Windows/更新: 添加 heap headroom 到 Windows `__PROTECTED_27__ b界面ld` steps during dev 更新s 以便 更新 preflight b界面lds stop failing 在 low default node Memory.",
      "插件 SDK: export 这个 channel 插件 base 和 web-search config contract through 这个 public package 以便 插件s 可以 use them 无需 private imports.",
      "插件s/contracts: 保持 test-only helpers out 的 production contract barrels, load shared contract harnesses through bundled test surfaces, 和 harden guardrails 以便 indirect re-exports 和 canonical `*.test.ts` files stay blocked.",
      "Control 界面/模型: preserve provider-qualified refs 用于 OpenRouter catalog 模型 whose ids already contain slashes 以便 picker selections submit allowlist-compatible 模型 refs instead 的 dropping 这个 `openrouter/` pre修复.",
      "插件 SDK/command auth: split command status b界面lders onto 这个 lightweight `openclaw/插件-sdk/command-status` subpath while preserving deprecated `command-__PROTECTED_21__` 兼容性 exports, 以便 auth-only 插件 imports no longer pull status/context warmup into CLI onboarding paths."
    ]
  }
},
  {
  "version": "2026.4.9-beta.1",
  "date": "2026-04-09",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "Memory/dreaming: 添加 一个 接地的 REM backfill 通道 具有 历史的 `__PROTECTED_7__-__PROTECTED_8__ --__PROTECTED_9__`, diary commit/重置 流程, 更清晰的 持久的-fact 提取, 和 实时的 短的-term 提升 集成 以便 旧的 daily 笔记 可以 replay into Dreams 和 持久的 Memory 无需 一个 second Memory 栈.",
      "Control 界面/dreaming: 添加 一个 结构化的 diary 视图 具有 timeline 导航, backfill/重置 控制, 可追踪的 dreaming 摘要, 和 一个 接地的 Scene 通道 具有 提升 提示 plus 一个 安全的 清除-接地的 操作 用于 分阶段的 backfill signals.",
      "QA/lab: 添加 character-vibes evaluation reports with model selection and parallel runs so live QA can compare candidate behavior faster.",
      "插件s/provider-auth: let provider manifests 声明 `__PROTECTED_17__` 以便 provider 变体 可以 共享 env vars, auth 配置文件, config-backed auth, 和 API-key onboarding 选择 无需 core-specific 布线.",
      "iOS: pin release versioning to an explicit CalVer in `apps/ios/version.json`, keep TestFlight iteration on the same short version until maintainers intentionally promote the next gateway version, and 添加 the documented `pnpm ios:version:pin -- --from-gateway` workflow for release trains. (#63001) Thanks @ngutman."
    ],
    "improvements": [],
    "bugfixes": [
      "Browser/安全: re-运行 blocked-destination safety checks after interaction-driven main-frame navigations 从 click, evaluate, hook-triggered click, 和 batched 操作 流程, 以便 Browser interactions cannot bypass 这个 SSRF quarantine when they land 在 forbidden URLs.",
      "安全/dotenv: block runtime-Control env vars plus Browser-Control override 和 skip-server env vars 从 untrusted workspace `.__PROTECTED_18__` files, 和 reject unsafe URL-style Browser Control override specifiers before lazy loading. ()",
      "gateway/node exec events: mark remote node `exec.started`, `exec.finished`, 和 `exec.denied` 摘要 as untrusted system events 和 sanitize node-provided command/output/reason text before enqueueing them, 以便 remote node output cannot inject trusted `System:` content into later turns.",
      "插件s/onboarding auth 选择: prevent untrusted workspace 插件s 从 colliding 具有 bundled provider auth-选择 ids during non-interactive onboarding, 以便 bundled provider setup keeps operator secrets out 的 untrusted workspace 插件 handlers unless those 插件s 是 explicitly trusted.",
      "安全/dependency audit: force `basic-ftp` 到 `5.2.1` 用于 这个 CRLF command-injection 修复 和 bump Hono plus `@hono/__PROTECTED_67__-__PROTECTED_35__` 在 production resolution paths.",
      "Android/pairing: 清除 stale setup-code auth 在 new QR scans, bootstrap operator 和 node sessions 从 fresh pairing, prefer stored device tokens after bootstrap handoff, 和 pause pairing auto-retry while 这个 app 是 backgrounded 以便 scan-once Android pairing recovers reliably again.",
      "Matrix/gateway: wait 用于 Matrix sync readiness before marking startup successful, 保持 Matrix background handler failures contained, 和 route fatal Matrix sync stops through channel-level restart handling instead 的 crashing 这个 whole gateway.",
      "Slack/media: preserve bearer auth across same-origin `__PROTECTED_37__.__PROTECTED_41__.com` redirects while still stripping it 在 cross-origin Slack CDN hops, 以便 `url_private_download` image attachments load again.",
      "Reply/doctor: use 这个 active runtime snapshot 用于 queued Reply 运行, resolve Reply-运行 SecretRefs before preflight helpers touch config, surface gateway OAuth reauth failures 到 users, 和 make `openclaw __PROTECTED_46__` call out exact reauth commands. ()",
      "Control 界面: guard stale session-history reloads during fast session switches 以便 这个 selected session 和 rendered transcript stay 在 sync.",
      "gateway/chat: suppress exact 和 streamed `ANNOUNCE_SKIP` / `REPLY_SKIP` Control replies across 实时的 chat 更新s 和 history sanitization 以便 internal agent-to-agent Control tokens no longer leak into user-facing gateway chat surfaces.",
      "Auto-Reply/NO_REPLY: strip glued leading `__PROTECTED_53__` tokens before Reply normalization 和 ACP-visible streaming 以便 silent sentinel text no longer leaks into user-visible replies while preserving substantive `__PROTECTED_53__ ...` text.",
      "sessions/routing: preserve established external routes 在 inter-session announce traffic 以便 `sessions_send` follow-ups do not steal delivery 从 Telegram, Discord, 或 other external channels.",
      "gateway/sessions: 清除 auto-fallback-pinned 模型 overrides 在 `/reset` 和 `/new` while still preserving 显式的 user 模型 selections, including legacy sessions created before override-source tracking existed.",
      "Slack/ACP: treat Slack ACP block replies as visible delivered output 以便 OpenClaw stops re-sending 这个 final fallback text after Slack already rendered 这个 Reply.",
      "Slack/partial streaming: key turn-local dedupe 通过 dispatch kind 和 保持 这个 final fallback Reply path active when preview finalization fails 以便 stale preview text cannot suppress 这个 actual final answer.",
      "Matrix/doctor: migrate legacy `channels.Matrix.dm.policy: \"trusted\"` configs back to compatible DM policies during `openclaw doctor --修复`, preserving explicit `allowFrom` boundaries as `allowlist` and defaulting empty legacy configs to `pairing`.",
      "npm packaging: mirror bundled channel runtime deps, stage Nostr runtime deps, derive req界面red root mirrors 从 manifests 和 b界面lt chunks, 和 test packed release tarballs 无需 repo `node_modules` 以便 fresh installs fail fast 在 missing 插件 deps instead 的 crashing at runtime.",
      "QA/实时的 auth: fail fast when 实时的 QA scenarios hit classified auth 或 runtime failure replies, including raw scenario wait paths, 和 sanitize missing-key g界面dance 以便 gateway auth problems surface as actionable errors instead 的 timeouts.",
      "Providers/OpenAI: default missing reasoning effort 到 `high` 在 OpenAI Responses, WebSocket, 和 compatible completions transports, while still honoring 显式的 per-运行 reasoning levels.",
      "Providers/Ollama: allow Ollama 模型 using 这个 native `API: \"ollama\"` __PROTECTED_9__ to optionally display thinking output when `/think` 是 set 到 一个 non-off level.",
      "Codex CLI: pass OpenClaw's system prompt through Codex's `model_instructions_file` config override 以便 fresh Codex CLI sessions receive 这个 相同的 prompt g界面dance as Claude CLI sessions.",
      "Auth/profiles: persist explicit auth-profile upserts directly and skip external CLI sync for local writes so profile changes are saved without stale external credential state.",
      "Agents/timeouts: make 这个 LLM idle timeout inherit `agents.defaults.timeoutSeconds` when configured, disable 这个 unconfigured idle watchdog 用于 cron 运行, 和 point idle-timeout errors at `agents.defaults.llm.idleTimeoutSeconds`.",
      "Agents/failover: classify Z.ai vendor code `1311` as billing 和 `1113` as auth, including long wrapped `1311` payloads, 以便 these errors stop falling through 到 generic failover handling.",
      "QQBot/media-tags: 支持 HTML entity-encoded angle brackets (`&lt;`/`&gt;`), URL slashes 在 attributes, 和 self-closing media tags 以便 upstream `<qqimg>` payloads 是 correctly parsed 和 normalized.",
      "Memory/dreaming: harden 接地的 backfill inputs, diary writes, status payloads, 和 diary 操作 classification 通过 preserving source-day labels, rejecting missing 或 symlinked targets cleanly, normalizing diary headings 在 gateway backfills, 和 tightening claim splitting plus diary source metadata.",
      "Memory/dreaming: accept embedded heartbeat trigger tokens 以便 light 和 REM dreaming still 运行 when runtime wrappers include extra heartbeat text.",
      "Android/manual connect: allow blank port input only 用于 TLS manual gateway endpoints 以便 standard HTTPS Tailscale hosts default 到 `443` 无需 silently changing cleartext manual connects. -RNG.",
      "Windows/更新: 添加 heap headroom 到 Windows `__PROTECTED_27__ b界面ld` steps during dev 更新s 以便 更新 preflight b界面lds stop failing 在 low default node Memory.",
      "插件 SDK: export 这个 channel 插件 base 和 web-search config contract through 这个 public package 以便 插件s 可以 use them 无需 private imports.",
      "插件s/contracts: 保持 test-only helpers out 的 production contract barrels, load shared contract harnesses through bundled test surfaces, 和 harden guardrails 以便 indirect re-exports 和 canonical `*.test.ts` files stay blocked.",
      "Control 界面/模型: preserve provider-qualified refs 用于 OpenRouter catalog 模型 whose ids already contain slashes 以便 picker selections submit allowlist-compatible 模型 refs instead 的 dropping 这个 `openrouter/` pre修复.",
      "插件 SDK/command auth: split command status b界面lders onto 这个 lightweight `openclaw/插件-sdk/command-status` subpath while preserving deprecated `command-__PROTECTED_21__` 兼容性 exports, 以便 auth-only 插件 imports no longer pull status/context warmup into CLI onboarding paths."
    ]
  }
},
  {
  "version": "2026.4.8",
  "date": "2026-04-08",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [],
    "improvements": [],
    "bugfixes": [
      "Telegram/setup: load setup 和 secret contracts through packaged top-level sidecars 以便 installed npm b界面lds no longer try 到 import missing `dist/extensions/telegram/src/*` files during gateway startup.",
      "Bundled channels/setup: load shared secret contracts through packaged top-level sidecars across BlueBubbles, Feishu, Google chat, IRC, Matrix, Mattermost, Microsoft Teams, Nextcloud Talk, Slack, 和 Zalo 以便 installed npm b界面lds no longer rely 在 missing `dist/extensions/*/src/*` files during gateway startup.",
      "Bundled 插件s: align packaged 插件 兼容性 metadata with the release version so bundled channels and providers load on OpenClaw 2026.4.8.",
      "Agents/progress: 保持 `更新_plan` available 用于 OpenAI-family 运行 while returning compact success payloads 和 allowing `tools.experimental.planTool=false` 到 opt out.",
      "Agents/exec: 保持 `/exec` current-default reporting aligned 具有 real runtime 行为 以便 `host=auto` sessions surface 这个 correct host-aware fallback policy (`full/off` 在 gateway 或 node, `deny/off` 在 sandbox) instead 的 stale stricter defaults.",
      "Slack: honor ambient HTTP(S) proxy settings 用于 Socket Mode WebSocket connections, including NO_PROXY exclusions, 以便 proxy-only deployments 可以 connect 无需 一个 monkey patch.",
      "Slack/操作: pass 这个 already resolved read token into `downloadFile` 以便 SecretRef-backed bot tokens no longer fail after 一个 raw config re-read.",
      "Network/fetch guard: skip target DNS pinning when trusted env-proxy mode 是 active 以便 proxy-only sandboxes 可以 let 这个 trusted proxy resolve outbound hosts."
    ]
  }
},
  {
  "version": "2026.4.7",
  "date": "2026-04-08",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "CLI/infer: 添加 一个 first-class `openclaw infer ...` hub 用于 provider-backed inference 工作流 across 模型, media, web, 和 embedding tasks.",
      "Tools/media generation: auto-fallback across auth-backed image, music, 和 video providers 通过 default, preserve intent during provider switches, remap size/aspect/resolution/duration 提示 到 这个 closest 支持ed option, 和 surface provider capabilities plus mode-aware video-到-video 支持.",
      "Memory/wiki: restore 这个 bundled `__PROTECTED_0__-wiki` 栈 具有 插件, CLI, sync/query/apply tooling, Memory-host 集成, 结构化的 claim/evidence fields, compiled digest retrieval, claim-health linting, contradiction clustering, staleness dashboards, 和 freshness-weighted search.",
      "插件s/webhooks: 添加 一个 bundled webhook ingress 插件 以便 external automation 可以 create 和 drive bound TaskFlows through per-route shared-secret endpoints.",
      "gateway/sessions: 添加 persisted compaction checkpoints plus sessions 界面 branch/restore 操作 以便 operators 可以 inspect 和 recover pre-compaction session state.",
      "Compaction: 添加 pluggable compaction provider registry 以便 插件s 可以 replace 这个 b界面lt-在 summarization pipeline. Configure via `agents.defaults.compaction.__PROTECTED_15__`; falls back 到 LLM summarization 在 provider failure.",
      "Agents/system prompt: 添加 `agents.defaults.systemPromptOverride` 用于 controlled prompt experiments plus heartbeat prompt-section 控制 以便 heartbeat runtime 行为 可以 stay enabled 无需 injecting heartbeat instructions every turn.",
      "Providers/Google: 添加 Gemma 4 模型 支持 和 保持 Google fallback resolution 在 这个 requested provider path 以便 native Google Gemma routes work again.",
      "Providers/Google: preserve 显式的 thinking-off semantics 用于 Gemma 4 while still enabling Gemma reasoning 支持 在 兼容性 wrappers.",
      "Providers/Arcee AI: 添加 一个 bundled Arcee AI provider 插件 具有 Trinity catalog entries, OpenRouter 支持, 和 更新d onboarding/auth g界面dance.",
      "Providers/Anthropic: restore Claude CLI as 这个 preferred local Anthropic path 在 onboarding, 模型-auth g界面dance, doctor 流程, 和 Docker Claude CLI 实时的 通道 again.",
      "Providers/Ollama: detect vision capability 从 这个 `/__PROTECTED_22__/show` response 和 set image input 在 模型 that 支持 it 以便 Ollama vision 模型 accept image attachments.",
      "Memory/dreaming: ingest redacted session transcripts into 这个 dreaming corpus 具有 per-day session-corpus 笔记, cursor checkpointing, 和 提升/doctor 支持.",
      "Providers/inferrs: 添加 string-content 兼容性 用于 stricter OpenAI-compatible chat backends, document `inferrs` setup 具有 一个 full config example, 和 添加 troubleshooting g界面dance 用于 local backends that pass direct probes but fail 在 full agent-runtime prompts.",
      "Agents/context engine: expose prompt-cache runtime context 到 context engines 和 保持 current-turn prompt-cache usage aligned 具有 这个 active attempt instead 的 stale prior-turn assistant state.",
      "插件 SDK/context engines: pass `availableTools` 和 `citationsMode` into `assemble()`, 和 expose Memory-artifact 和 Memory-prompt seams 以便 companion 插件s 和 non-legacy context engines 可以 consume active Memory state 无需 reaching into internals.",
      "ACP/ACPX 插件: bump the bundled `acpx` pin to `0.5.1` so 插件-local installs and strict version checks pick up the latest published runtime release. (#62148) Thanks @onutc.",
      "Discord/events: allow `event-create` to accept a cover image URL or local file path, load and validate PNG/JPG/GIF event cover media, and pass the encoded image payload through Discord admin action/runtime paths. (#60883) Thanks @bittoby."
    ],
    "improvements": [],
    "bugfixes": [
      "CLI/infer: 保持 provider-backed infer 行为 aligned 具有 actual runtime execution 通过 修复ing 显式的 TTS override handling, 配置文件-aware gateway TTS prefs resolution, per-request transcription `prompt`/`language` overrides, image output MIME/extension mismatches, configured web-search fallback 行为, 和 agent-vs-CLI web-search execution drift.",
      "插件s/media: when `插件s.allow` 是 set, capability fallback now merges bundled capability 插件 ids into 这个 allowlist (not only `插件s.entries`), 以便 media understanding providers such as OpenAI-compatible STT load 用于 voice transcription 无需 req界面ring `openai` 在 `插件s.allow`.",
      "Agents/history 和 replies: buffer phaseless OpenAI WS text 直到 一个 real assistant phase arrives, 保持 replay 和 SSE history sequence tracking aligned, hide commentary 和 leaked tool XML 从 user-visible history, 和 保持 history-based follow-up replies 在 `final_answer` text only. () 和 contributors.",
      "Control 界面: show `/tts` audio replies 在 webchat, detect mistaken `?token=` auth links 具有 这个 correct `#token=` 提示, 和 保持 Copy, Canvas, 和 mobile exec-approval 界面 从 covering chat content 在 narrow screens. ()",
      "iOS/gateway: replace string-matched connection error 界面 具有 结构化的 gateway connection problems, preserve actionable pairing/auth failures over later generic disconnect noise, 和 surface reusable problem banners 和 details across onboarding, settings, 和 root status surfaces.",
      "T界面: route `/status` through 这个 shared session-status command, 保持 commentary hidden 在 history, strip raw envelope metadata 从 async command notices, preserve fallback streaming before per-attempt failures finalize, 和 restore Kitty keyboard state 在 exit 或 fatal crashes. () 和 contributors.",
      "iOS/Watch exec approvals: 保持 Apple Watch review 和 approval recovery working while 这个 iPhone 是 locked 或 backgrounded, including reconnect recovery, pending approval persistence, notification cleanup, 和 APNs-backed watch refresh recovery.",
      "Agents/context overflow: combine oversized 和 aggregate tool-result recovery 在 one pass 和 restore 一个 total-context overflow backstop 以便 recoverable sessions retry instead 的 failing early.",
      "auth/OpenAI Codex OAuth: reload fresh 在-disk credentials inside 这个 locked refresh path 和 retry once after `refresh_token_reused` rotates only 这个 stored refresh token, 以便 relogin/restart recovery stops getting stuck 在 stale cached auth state. -ever.",
      "auth/OpenAI Codex OAuth: 保持 native `/model ...@profile` selections 在 这个 target session 和 honor 显式的 user-locked auth 配置文件 even when per-agent auth order excludes them.",
      "Providers/Anthropic: preserve thinking blocks 用于 Claude Opus 4.5+, Sonnet 4.5+, 和 newer Claude 4-family 模型 以便 prompt-cache pre修复es 保持 matching, 和 skip `service_tier` injection 在 OAuth-authenticated stream wrapper requests 以便 Claude OAuth streaming stops failing 具有 HTTP 401. ()",
      "Agents/Claude CLI: surface nested API error messages 从 结构化的 CLI output 以便 billing/auth/provider failures show 这个 real provider error instead 的 一个 opaque CLI failure.",
      "Agents/exec: preserve 显式的 `host=__PROTECTED_67__` routing under elevated defaults when `tools.exec.host=auto`, fail loud 在 invalid elevated cross-host overrides, 和 保持 `strictInlineEval` commands blocked after approval timeouts instead 的 falling through 到 automatic execution.",
      "Nodes/exec approvals: 保持 `host=__PROTECTED_67__` POSIX transport shell wrappers (`/bin/sh -lc ...`) aligned 具有 inner-command allowlist analysis 以便 allowlisted scripts stop prompting unnecessarily, while Windows `cmd.exe` wrapper 运行 stay approval-gated.",
      "Nodes/exec approvals: 保持 Windows `cmd.exe /c` wrapper 运行 approval-gated even when `__PROTECTED_18__` carriers, including env-assignment carriers, wrap 这个 shell invocation.",
      "gateway tool/exec config: block 模型-facing `__PROTECTED_26__ __PROTECTED_20__.apply` 和 `__PROTECTED_20__.patch` writes 从 changing exec approval paths such as `safeBins`, `safeBinProfiles`, `safeBinTrustedDirs`, 和 `strictInlineEval`, while still allowing unchanged 结构化的 values through.",
      "Host exec/env sanitization: block dangerous Java, Rust, Cargo, Git, Kubernetes, cloud credential, config-path, 和 Helm env overrides 以便 host-运行 tools cannot be redirected 到 attacker-chosen code, config, credentials, 或 repository state. () 和 contributors.",
      "commands/allowlist: req界面re owner authorization 用于 `/allowlist 添加` 和 `/allowlist 移除` before channel resolution, 以便 non-owner but command-authorized senders 可以 no longer persistently rewrite allowlist policy state.",
      "Feishu/docx uploads: honor `tools.fs.workspaceOnly` 用于 local `upload_file` 和 `upload_image` paths 通过 forwarding workspace-constrained `localRoots` into 这个 media loader, 以便 docx uploads 可以 no longer read host-local files outside 这个 workspace when workspace-only mode 是 active.",
      "Network/fetch guard: drop request bodies 和 body-describing headers 在 cross-origin `307` 和 `308` redirects 通过 default, 以便 attacker-controlled redirect hops cannot receive secret-bearing POST payloads 从 SSRF-guarded fetch 流程 unless 一个 caller explicitly opts 在.",
      "Browser/SSRF: treat main-frame `document` redirect hops as navigations even when Playwright does not flag them as `isNavigationRequest()`, 以便 strict private-network blocking still stops forbidden redirect pivots before 这个 Browser reaches 这个 internal target.",
      "Browser/node invoke: block persistent Browser 配置文件 create, 重置, 和 delete mutations through `__PROTECTED_30__.proxy` 在 both gateway-forwarded `__PROTECTED_67__.invoke` 和 这个 node-host proxy path, even when no 配置文件 allowlist 是 configured.",
      "gateway/node pairing: req界面re 一个 fresh pairing request when 一个 previously paired node reconnects 具有 添加itional declared commands, 和 保持 这个 实时的 session pinned 到 这个 earlier approved command set 直到 这个 upgrade 是 approved.",
      "Gateway/auth: invalidate existing shared-token and password WebSocket sessions when the configured secret rotates, so stale authenticated sockets cannot stay attached after token or password changes. (#62350) Thanks @pgondhi987.",
      "MS Teams/安全: validate file-consent upload URLs against HTTPS, Microsoft/SharePoint host allowlists, and private-IP DNS checks before uploading attachments, blocking SSRF-style consent-upload abuse. (#23596)",
      "media/base64 decode guards: enforce byte limits before decoding missed base64-backed Teams, 信号, QQ Bot, 和 image-tool payloads 以便 oversized inbound media 和 data URLs no longer bypass pre-decode size checks.",
      "runtime event trust: mark background `notifyOnExit` 摘要, ACP parent-stream relays, 和 wake-hook payloads as untrusted system events 以便 lower-trust runtime output no longer re-enters later turns as trusted `System:` text.",
      "Auto-Reply/media: allow managed generated-media `__PROTECTED_42__:` paths 从 normal Reply text again while still blocking arbitrary host-local media 和 document paths, 以便 generated media 保持 delivering 无需 reopening host-path injection holes.",
      "gateway/status 和 containers: auto-bind 到 `0.0.0.0` inside Docker 和 Podman environments, 和 probe local TLS gateways over `wss://` 具有 self-signed fingerprint forwarding 以便 container startup 和 loopback TLS status checks work again. () 和 contributors.",
      "gateway/OpenAI-compatible HTTP: abort 在-flight `/v1/__PROTECTED_51__/completions` 和 `/v1/responses` turns when clients disconnect 以便 abandoned HTTP requests stop wasting agent runtime.",
      "macOS/gateway version: strip trailing commit metadata from CLI version output before semver parsing so the Mac app recognizes installed gateway versions like `OpenClaw 2026.4.2 (d74a122)` again. (#61111) Thanks @oliviareid-svg.",
      "sessions/模型 选择: resolve 这个 explicitly selected session 模型 separately 从 runtime fallback resolution 以便 session status 和 实时的 模型 switching stay aligned 具有 这个 chosen 模型.",
      "Discord/ACP bindings: canonicalize DM conversation identity across inbound messages, component interactions, native commands, 和 current-conversation binding resolution 以便 `--bind here` 在 Discord DMs keeps routing follow-up replies 到 这个 bound agent instead 的 falling back 到 这个 default agent.",
      "Discord: recover forwarded referenced message text 和 attachments when snapshots 是 missing, use `ws://` again 用于 gateway monitor sockets, stop forcing 一个 hardcoded temperature 用于 Codex-backed auto-thread titles, 和 harden voice receive recovery 以便 rAPId speaker restarts 保持 their 下一个 utterance. () 和 contributors.",
      "Slack/thread mentions: 添加 `channels.__PROTECTED_41__.thread.req界面reExplicitMention` 以便 Slack channels that already req界面re mentions 可以 also req界面re 显式的 `@bot` mentions inside bot-participated threads. -engineer.",
      "Slack/threading: 保持 legacy thread stickiness 用于 real replies when older callers omit `isThreadReply`, while still honoring `replyToMode` 用于 Slack's auto-created top-level `thread_ts`.",
      "Slack/media: 保持 attachment downloads 在 这个 SSRF-guarded dispatcher path 以便 Slack media fetching works 在 node 22 无需 dropping pinned transport enforcement.",
      "Matrix/onboarding: 添加 一个 invite auto-join setup step 具有 显式的 off warnings 和 strict stable-target validation 以便 new Matrix accounts stop silently ignoring invited rooms 和 fresh DM-style invites unless operators opt 在.",
      "Matrix/formatting: preserve multi-paragraph 和 loose-list rendering 在 Element 以便 numbered 和 bulleted Markdown keeps their content attached 到 这个 correct list item.",
      "Telegram/doctor: 保持 top-level access-Control fallback 在 place during multi-account normalization while still promoting legacy default auth into `accounts.default`, 以便 existing named bots 保持 inherited allowlists 无需 dropping 这个 legacy default bot.",
      "插件s/loaders: centralize bundled `dist/**` Jiti native-load policy 和 保持 channel, public-surface, facade, 和 config-metadata loader seams off native Jiti 在 Windows 以便 onboarding 和 configure 流程 stop tripping `ERR_UN支持ED_ESM_URL_SCHEME`. -zhang-cs-code.",
      "插件s/channels: 保持 bundled channel artifact 和 secret-contract loading stable under lazy loading, preserve 插件-schema defaults during install, 和 修复 Windows `file://` plus native-Jiti 插件 loader paths 以便 onboarding, doctor, `openclaw secret`, 和 bundled 插件 installs work again. () 和 contributors.",
      "插件s/ClawHub: verify downloaded 插件 archives against version metadata SHA-256, fail closed when archive integrity metadata is missing or malformed, and tighten fallback ZIP verification so 插件 installs cannot proceed on mismatched or incomplete ClawHub package metadata. (#60517) Thanks @mappel-nv.",
      "插件s/provider hooks: stop recursive provider snapshot loads 从 overflowing 这个 栈 during 插件 initialization, while still preserving cached nested provider-hook results. ()",
      "Docker/插件s: stop forcing bundled 插件 discovery 到 `/__PROTECTED_70__/extensions` 在 runtime images 以便 packaged installs use compiled `dist/extensions` artifacts again 和 node 24 containers do not boot through source-only 插件 entry paths. 修复es.",
      "Providers/Ollama: honor 这个 selected provider's `baseUrl` during streaming 以便 multi-Ollama setups stop routing every stream 到 这个 first configured Ollama endpoint.",
      "Providers/Ollama: stop warning that Ollama could not be reached when discovery only sees empty default local stubs, while still keeping real 显式的 Ollama overrides loud when 这个 endpoint 是 unreachable.",
      "Providers/xAI: recognize `__PROTECTED_22__.grok.x.ai` as 一个 xAI-native endpoint again 和 保持 legacy `x_search` auth resolution working 以便 older xAI web-search configs continue 到 load.",
      "Providers/Mistral: send `reasoning_effort` for `mistral/mistral-small-latest` (Mistral Small 4) with thinking-level mapping, and mark the catalog entry as reasoning-capable so adjustable reasoning matches Mistral’s Chat Completions API. (#62162) Thanks @neeravmakwana.",
      "OpenAI TTS/Groq: send `wav` 到 Groq-compatible speech endpoints, honor 显式的 `responseFormat` overrides 在 OpenAI-compatible paths, 和 only mark voice-笔记 output as voice-compatible when 这个 actual format 是 `opus`.",
      "Tools/web_fetch 和 web_search: 修复 `TypeError: fetch failed` caused 通过 undici 8.0 enabling HTTP/2 通过 default; pinned SSRF-guard dispatchers now explicitly set `allowH2: false` 到 restore HTTP/1.1 行为 和 保持 这个 custom DNS-pinning lookup compatible. ()",
      "Tools/web search/Exa: show Exa Search 在 onboarding 和 configure provider pickers again 通过 marking 这个 bundled Exa provider as setup-visible.",
      "Memory/vector recall: surface 显式的 warnings when `sqlite-vec` 是 unavailable 或 vector writes 是 degraded, 和 strip managed Light Sleep 和 REM blocks before daily-笔记 ingestion 以便 Memory indexing 和 dreaming stop reporting false-success 或 re-ingesting 分阶段的 output.",
      "Memory/dreaming: make Dreams config reads 和 writes respect 这个 selected Memory slot 插件 instead 的 always targeting `__PROTECTED_0__-core`.",
      "QQ Bot/media: route gateway-side attachment 和 fallback downloads through guarded QQ/Tencent HTTPS fetches 以便 QQ media handling no longer follows arbitrary remote hosts.",
      "Browser/remote CDP: retry 这个 DevTools websocket once after remote Browser restarts 以便 healthy remote Browser 配置文件 do not fail availability checks during CDP warm-up.",
      "界面/light mode: target both root 和 nested WebKit scrollbar thumbs 在 这个 light theme 以便 page-level 和 container scrollbars stay visible 在 light backgrounds.",
      "Agents/subagents: honor `sessions_spawn(lightContext: true)` 用于 spawned subagent 运行 通过 preserving lightweight bootstrap context through 这个 gateway 和 embedded runner instead 的 silently falling back 到 full workspace bootstrap injection.",
      "Cron: load `jobId` into `id` when 这个 在-disk store omits `id`, matching doctor migration 和 修复ing `unknown cron job id` 用于 hand-edited `jobs.json`.",
      "Agents/model fallback: classify minimal HTTP 404 API errors (for example `404 status code (no body)`) as `model_not_found` so assistant failures throw into the fallback chain instead of stopping at the first fallback candidate. (#62119) Thanks @neeravmakwana.",
      "BlueBubbles/network: respect 显式的 private-network opt-out 用于 loopback 和 private `serverUrl` values across account resolution, status probes, monitor startup, 和 attachment downloads, while keeping public-host attachment hostname pinning intact.",
      "Agents/heartbeat: 保持 heartbeat 运行 pinned 到 这个 main session 以便 active subagent transcripts 是 not overwritten 通过 heartbeat status messages.",
      "Agents/heartbeat: respect disabled heartbeat prompt g界面dance 以便 operators 可以 suppress heartbeat prompt instructions 无需 disabling heartbeat runtime 行为.",
      "Agents/compaction: stop compaction-wait aborts 从 re-entering prompt failover 和 replaying completed tool turns. -dentifier.",
      "Approvals/runtime: move native approval lifecycle assembly into shared core bootstrap/runtime seams driven 通过 channel capabilities 和 runtime contexts, 和 移除 这个 legacy bundled approval fallback 布线.",
      "安全/fetch-guard: stop rejecting operator-configured proxy hostnames against 这个 target-scoped hostname allowlist 在 SSRF-guarded fetches, restoring proxy-based media downloads 用于 Telegram 和 other channels.",
      "Logging: make `logging.level` 和 `logging.consoleLevel` honor 这个 文档化的 severity threshold ordering again, 和 保持 child loggers inheriting 这个 parent `minLevel`.",
      "Agents/sessions_send: pass `threadId` through announce delivery 以便 cross-session notifications land 在 这个 correct Telegram forum topic instead 的 这个 group's general thread.",
      "Daemon/systemd: 保持 sudo systemctl calls scoped 到 这个 invoking user when machine-scoped systemctl fails, while still avoiding machine fallback 用于 permission-denied user bus errors.",
      "Docs/i18n: relocalize final localized-page links after translation 和 移除 这个 zh-CN homepage redirect override 以便 localized Mintlify pages resolve 到 这个 correct language roots again.",
      "Agents/exec: 保持 timed-out shell-backgrounded commands 在 这个 failed path 和 point long-running jobs 到 exec background/yield sessions 以便 process polling 是 only suggested 用于 registered sessions."
    ]
  }
},
  {
  "version": "2026.4.5",
  "date": "2026-04-06",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Agents/video generation: 添加 这个 b界面lt-在 `video_generate` tool 以便 agents 可以 create videos through configured providers 和 return 这个 generated media directly 在 这个 Reply.",
      "Agents/music generation: ignore un支持ed optional 提示 such as `durationSeconds` 具有 一个 warning instead 的 hard-failing requests 在 providers like Google Lyria.",
      "Providers/Comfy界面: 添加 一个 bundled `comfy` 工作流 media 插件 用于 local Comfy界面 和 Comfy Cloud 工作流, including shared `image_generate`, `video_generate`, 和 工作流-backed `music_generate` 支持, 具有 prompt injection, optional reference-image upload, 实时的 tests, 和 output download.",
      "Tools/music generation: 添加 这个 b界面lt-在 `music_generate` tool 具有 bundled Google (Lyria) 和 MiniMax providers plus 工作流-backed Comfy 支持, including async task tracking 和 follow-up delivery 的 finished audio.",
      "Providers: 添加 bundled Qwen, Fireworks AI, 和 StepFun providers, plus MiniMax TTS, Ollama Web Search, 和 MiniMax Search 集成s 用于 chat, speech, 和 search 工作流. ()",
      "Providers/Amazon Bedrock: 添加 bundled Mantle 支持 plus inference-配置文件 discovery 和 automatic request-region injection 以便 Bedrock-hosted Claude, GPT-OSS, Qwen, Kimi, GLM, 和 similar routes work 具有 less manual setup. ()",
      "Control 界面/multilingual: 添加 localized Control 界面 支持 用于 Simplified Chinese, Traditional Chinese, Brazilian Portuguese, German, Spanish, Japanese, Korean, French, Turkish, Indonesian, Polish, 和 Ukrainian.",
      "插件s: 添加 插件-config T界面 prompts 到 g界面ded onboarding/setup 流程, 和 添加 `openclaw 插件s install --force` 以便 existing 插件 和 hook-pack targets 可以 be replaced 无需 using 这个 dangerous-code override flag. ()",
      "Control 界面/skills: 添加 ClawHub search, detail, 和 install 流程 directly 在 这个 Skills panel.",
      "iOS/exec approvals: 添加 generic APNs approval notifications that open 一个 在-app exec approval modal, fetch command details only after authenticated operator reconnect, 和 清除 stale notification state when 这个 approval resolves.",
      "Matrix/exec approvals: 添加 Matrix-native exec approval prompts 具有 account-scoped approvers, channel-或-DM delivery, 和 room-thread aware resolution handling.",
      "Channels/context visibility: 添加 configurable `contextVisibility` per channel (`all`, `allowlist`, `allowlist_quote`) 以便 supplemental quote, thread, 和 fetched history context 可以 be filtered 通过 sender allowlists instead 的 always passing through as received.",
      "Providers/request overrides: 添加 shared 模型 和 media request transport overrides across OpenAI-, Anthropic-, Google-, 和 compatible provider paths, including headers, auth, proxy, 和 TLS 控制.",
      "Providers/OpenAI: 添加 forward-compat `openai-codex/gpt-5.4-mini`, 一个 opt-在 GPT personality, 和 provider-owned GPT-5 prompt contributions 以便 Codex/GPT 运行 stay cache-stable 和 compatible 具有 bundled catalog lag.",
      "Agents/Claude CLI: expose OpenClaw tools 到 background Claude CLI 运行 through 一个 loopback MCP bridge 和 switch bundled 运行 到 stdin + `stream-json` partial-message streaming 以便 prompts stop riding argv, long replies show 实时的 progress, 和 final session/usage metadata still land cleanly.",
      "ACPX/runtime: embed 这个 ACP runtime directly 在 这个 bundled `acpx` 插件, 移除 这个 extra external ACP CLI hop, harden 实时的 ACP session binding 和 reuse, 和 添加 一个 generic `reply_dispatch` hook 以便 bundled 插件s like ACPX 可以 own Reply interception 无需 hardcoded ACP paths 在 core auto-Reply routing.",
      "Agents/progress: 添加 experimental 结构化的 plan 更新s 和 结构化的 execution item events 以便 compatible 界面s 可以 show clearer step-通过-step progress during long-running 运行.",
      "Providers/Anthropic: 移除 这个 Claude CLI backend 和 setup-token 从 new onboarding, 保持 existing configured legacy 配置文件 runnable, 和 have `openclaw __PROTECTED_46__` repair 或 移除 stale `anthropic:claude-cli` state during migration.",
      "Tools/video generation: 添加 bundled xAI (`grok-imagine-video`), Alibaba 模型 Studio Wan, 和 Runway video providers, plus 实时的-test/default 模型 布线 用于 all three.",
      "Memory/search: 添加 Amazon Bedrock embeddings 用于 Titan, Cohere, Nova, 和 TwelveLabs 模型, 具有 AWS credential-chain auto-detection 用于 `provider: \"auto\"` 和 provider-specific dimension 控制.",
      "Providers/Amazon Bedrock Mantle: generate bearer tokens 从 这个 AWS credential chain 以便 Mantle auto-discovery 可以 use IAM auth 无需 manually exporting `AWS_BEARER_TOKEN_BEDROCK`.",
      "Memory/dreaming (experimental): 添加 weighted 短的-term recall 提升, 一个 `/__PROTECTED_1__` command, Dreams 界面, multilingual conceptual tagging, 和 doctor/status repair 支持, while 重构ing dreaming 从 competing modes into three cooperative phases (light, deep, REM) 具有 independent schedules 和 recovery 行为 以便 持久的 Memory 提升 可以 运行 在 这个 background 具有 less manual setup. ()",
      "Memory/dreaming: 添加 configurable aging 控制 (`recencyHalfLifeDays`, `maxAgeDays`) plus optional verbose logging 以便 operators 可以 tune recall decay 和 inspect 提升 decisions more easily.",
      "Memory/dreaming: 添加 REM preview tooling (`openclaw __PROTECTED_0__ __PROTECTED_7__-__PROTECTED_8__`, `promote-explain`), surface possible lasting truths during REM staging, 和 make deep 提升 replay-安全的 以便 reruns reconcile instead 的 duplicating `__PROTECTED_0__.md` entries.",
      "Memory/dreaming: write dreaming trail content 到 top-level `dreams.md` instead 的 daily Memory 笔记, 更新 `/__PROTECTED_1__` help text 到 point there, 和 保持 `dreams.md` available 用于 显式的 reads 无需 pulling it into default recall.",
      "Memory/dreaming: 添加 这个 Dream diary surface 在 Dreams, simplify user-facing dreaming config 到 `enabled` plus optional `frequency`, treat phases as 实现ation detail 在 docs/界面, 和 保持 这个 lobster animation visible above diary content.",
      "Prompt caching: 保持 prompt pre修复es more reusable across transport fallback, deterministic MCP tool ordering, compaction, embedded image history, normalized system-prompt fingerprints, `openclaw status --verbose` cache diagnostics, 和 这个 removal 的 duplicate 在-band tool inventories 从 agent system prompts 以便 follow-up turns hit cache more reliably. () 和 @vincentkoc.",
      "Agents/cache: diagnostics: 添加 prompt-cache break diagnostics, trace 实时的 cache scenarios through embedded runner paths, 和 show cache reuse explicitly 在 `openclaw status --verbose`.",
      "Agents/cache: stabilize cache-relevant system prompt fingerprints 通过 normalizing eq界面valent 结构化的 prompt whitespace, line endings, hook-添加ed system context, 和 runtime capability ordering 以便 semantically unchanged prompts reuse KV/cache more reliably.",
      "Agents/tool prompts: 移除 这个 duplicate 在-band tool inventory 从 agent system prompts 以便 tool-calling 模型 rely 在 这个 结构化的 tool definitions as 这个 single source 的 truth, improving prompt 稳定性 和 reducing stale tool g界面dance.",
      "config/schema: enrich 这个 exported `openclaw __PROTECTED_20__ schema` JSON Schema 具有 field titles 和 descriptions 以便 editors, agents, 和 other schema consumers receive 这个 相同的 config help metadata.",
      "Providers/CLI: 移除 bundled CLI text-provider backends 和 这个 `agents.defaults.cliBackends` surface, while keeping ACP harness sessions 和 Gemini media understanding 在 这个 native bundled providers.",
      "Matrix/exec approvals: clarify unavailable-approval replies 以便 Matrix no longer claims chat approvals 是 un支持ed when native exec approvals 是 merely unconfigured.",
      "Docs/IRC: replace public IRC hostname examples 具有 `irc.example.com` 和 recommend private servers 用于 bot coordination while listing common public networks 用于 有意的 use.",
      "Memory/dreaming: group nearby daily-笔记 lines into 短的 coherent chunks before staging them 用于 dreaming, 以便 one-off context 从 recent 笔记 reaches REM/deep 具有 better evidence 和 less line-level noise.",
      "Memory/dreaming: drop generic date/day headings from daily-note chunk pre修复es while keeping meaningful section labels, so staged snippets stay cleaner and more reusable. (#61597) Thanks @mbelinky.",
      "插件s/Lobster: 运行 bundled Lobster 工作流 在 process instead 的 spawning 这个 external CLI, reducing transport overhead 和 unblocking native runtime 集成.",
      "插件s/Lobster: harden managed resume validation 以便 invalid TaskFlow resume calls fail earlier, 和 memoize embedded runtime loading per runner while keeping failed loads retryable."
    ],
    "improvements": [
      "config: 移除 legacy public config 别名 such as `talk.voiceId` / `talk.APIKey`, `agents.*.sandbox.perSession`, `__PROTECTED_30__.ssrfPolicy.allowPrivateNetwork`, `hooks.__PROTECTED_96__.handlers`, 和 channel/group/room `allow` toggles 在 favor 的 这个 canonical public paths 和 `enabled`, while keeping load-time 兼容性 和 `openclaw __PROTECTED_46__ --修复` migration 支持 用于 existing configs."
    ],
    "bugfixes": [
      "安全: preserve restrictive 插件-only tool allowlists, req界面re owner access 用于 `/allowlist 添加` 和 `/allowlist 移除`, fail closed when `before_tool_call` hooks crash, block Browser SSRF redirect bypasses earlier, 和 保持 non-interactive auth-选择 inference scoped 到 bundled 和 already-trusted 插件s. () 和 @pgondhi987.",
      "Providers/OpenAI: make GPT-5 和 Codex 运行 act sooner 具有 lower-verbosity defaults, visible progress during tool work, 和 一个 one-shot retry when 一个 turn only narrates 这个 plan instead 的 taking 操作.",
      "Providers/OpenAI 和 Reply delivery: preserve native `reasoning.effort: \"none\"` and strict schemas where 支持ed, 添加 GPT-5.4 assistant `phase` metadata across replay and the __PROTECTED_26__ `/v1/responses` layer, and keep commentary buffered until `final_answer` 以便 web chat, session previews, embedded replies, 和 Telegram partials stop leaking planning text. 修复es.",
      "Telegram: 修复 current-模型 checks 在 这个 模型 picker, HTML-format non-default `/model` confirmations, 显式的 topic replies, persisted reaction ownership across restarts, caption-media placeholder 和 `file_id` preservation 在 download failure, 和 upgraded-install inbound image reads. () , @GitZhangChi, @dashhuang, @samzong, @v1p0r, 和 @neeravmakwana.",
      "Telegram: restore DM voice-笔记 preflight transcription 以便 direct-message audio stops arriving as raw `<__PROTECTED_42__:audio>` placeholders.",
      "Telegram/reasoning: only create 一个 Telegram reasoning preview 通道 when 这个 session 是 explicitly `reasoning:stream`, 以便 hidden `<think>` traces 从 streamed replies stop surfacing as chat previews 在 normal sessions.",
      "Telegram/native command menu: trim long menu descriptions before dropping commands 以便 sub-100 command sets 可以 still fit Telegram's payload budget 和 保持 more `/` entries visible.",
      "Discord: 保持 REST, webhook, 和 monitor traffic 在 这个 configured proxy, preserve component-only media sends, honor `@everyone` 和 `@here` mention gates, 保持 ACK reactions 在 这个 active account, 和 split voice connect/playback timeouts 以便 auto-join 是 more reliable. ()",
      "Discord/Reply tags: strip leaked `[[reply_to_current]]` Control tags 从 preview text 和 honor 显式的 Reply-tag threading during final delivery, 以便 Discord replies stay attached 到 这个 triggering message instead 的 printing Reply metadata into chat.",
      "Discord/replies: replace 这个 unshipped `replyToOnlyWhenBatched` flag 具有 `replyToMode: \"batched\"` 以便 native Reply references only attach 在 debounced multi-message turns while 显式的 Reply tags still work.",
      "Discord/image generation: include 这个 real generated `__PROTECTED_42__:` paths 在 tool output, avoid duplicate plain-output media requeueing, 和 persist volatile workspace-generated media into 持久的 outbound media before final Reply delivery 以便 generated image replies stop pointing at missing local files.",
      "Slack: route 实时的 DM replies back 到 这个 concrete inbound DM channel while keeping persisted routing metadata user-scoped, 以便 normal assistant replies stop disappearing when pairing 和 system messages still arrive.",
      "WhatsApp: restore `channels.whatsapp.blockStreaming` 和 重置 watchdog timeouts after reconnect 以便 q界面et chats stop falling into reconnect loops. () 和 @mcaxtr.",
      "Android/Talk Mode: cancel 在-flight `talk.speak` playback when speech 是 explicitly stopped, 和 restore spoken replies 在 both node-scoped 和 gateway-backed sessions 通过 keeping Reply routing 和 embedded transport overrides aligned 具有 这个 current playback path. ()",
      "Voice-call/OpenAI: pass full 插件 config into realtime transcription provider resolution 以便 streaming calls 可以 discover 这个 bundled OpenAI realtime transcription provider again. 修复es. 和 @vincentkoc.",
      "Matrix/exec approvals: anchor seeded approval reactions 到 这个 primary Matrix prompt event, resolve them 从 event metadata instead 的 prompt text, 和 clean up chunked approval prompts correctly.",
      "Matrix: recover more reliably when secret storage 或 recovery keys 是 missing 通过 recreating secret storage during repair 和 backup 重置, hold crypto snapshot locks during persistence, 和 surface 显式的 too-large attachment markers. () , @emonty, 和 @efe-arv.",
      "Matrix/DM sessions: 添加 `channels.__PROTECTED_39__.dm.sessionScope`, shared-session collision notices, 和 aligned outbound session reuse 以便 separate Matrix DM rooms 可以 保持 distinct context when configured.",
      "Matrix: move legacy top-level `avatarUrl` into 这个 default account during multi-account 提升 和 保持 env-backed account setup avatar config persisted.",
      "MS Teams: download inline DM images via Graph API 和 preserve channel Reply threading 在 proactive fallback. () -developer 和 @hyojin.",
      "MS Teams: replace 这个 deprecated Teams SDK Http插件 stub 具有 `httpServerAdapter` 以便 recurring gateway deprecation warnings stop firing 和 这个 Express 5 兼容性 workaround stays 在 这个 支持ed SDK path. -sys.",
      "Control 界面/chat: 添加 一个 per-session thinking-level picker 在 这个 chat header 和 mobile chat settings, 和 保持 这个 Browser bundle 在 界面-local thinking/session-key helpers 以便 Safari no longer crashes 在 node-only imports before rendering chat 控制.",
      "Sandbox/SSH: reject hardlinked files during cross-device rename fallback 以便 EXDEV file copies preserve 这个 相同的 pinned file-boundary checks as direct reads.",
      "Control 界面: keep Stop visible during tool-only execution, preserve pending-send busy state, and clear stale ClawHub search results as soon as the query changes. (#54528, #59800, #60267) Thanks @chziyue and @frankekn.",
      "Control 界面/avatar: honor `界面.assistant.avatar` when serving `/avatar/:agentId` 以便 Appearance 界面 avatar paths stop falling back 到 initials placeholders.",
      "Control 界面/cron: highlight 这个 Cron refresh button while refresh 是 在 flight 以便 这个 page's loading state stays visible even when prior data remains 在 screen. -zhuzm.",
      "Control 界面/Overview: prevent gateway access token/password visibility toggle buttons 从 overlapping their inputs at narrow widths.",
      "Auto-Reply: unify Reply lifecycle ownership across preflight compaction, session rotation, CLI-backed 运行, 和 gateway restart handling 以便 `/stop` 和 相同的-session overlap checks target 这个 right active turn 和 restart-interrupted turns return 这个 restart notice instead 的 being silently dropped.",
      "Reply delivery: prevent duplicate block replies 在 `text_end` channels 以便 providers that emit 显式的 text-end boundaries no longer double-send 这个 相同的 final message.",
      "gateway/startup: default `__PROTECTED_26__.mode` 到 `local` when unset, detect PID recycling 在 gateway lock files 在 Windows 和 macOS, 和 show startup progress 以便 healthy restarts stop getting blocked 通过 stale locks. () 和 @TonyDerek-dot.",
      "gateway/macOS: let launchd `KeepAlive` own 在-process gateway restarts again, 添加ing 一个 短的 supervised-exit delay 以便 rAPId restarts avoid launchd crash-loop unloads while `openclaw __PROTECTED_26__ __PROTECTED_74__` still 报告 real LaunchAgent errors synchronously.",
      "gateway/macOS: re-bootstrap 这个 LaunchAgent if `launchctl kickstart -k` unloads it during restart 以便 failed restarts do not leave 这个 gateway unmanaged 直到 manual repair.",
      "gateway/macOS: recover installed-but-unloaded LaunchAgents during `openclaw __PROTECTED_26__ start` 和 `__PROTECTED_74__`, while still preferring 实时的 unmanaged gateways during restart recovery. -3.",
      "gateway/Windows scheduled tasks: preserve Task Scheduler settings 在 reinstall, fail loudly when `/Run` does not start, 和 报告 fast failed restarts accurately instead 的 pretending they timed out after 60 seconds.",
      "Windows/restart: fall back 到 这个 installed Startup-entry launcher when 这个 scheduled task was never registered, 以便 `/__PROTECTED_74__` 可以 relaunch 这个 gateway 在 Windows setups where `schtasks` install fell back during onboarding.",
      "Windows/restart: clean up stale gateway listeners before Windows self-restart 和 treat listener 和 argv probe failures as inconclusive, 以便 scheduled-task relaunch no longer falls into 一个 `E添加RINUSE` retry loop.",
      "更新/npm: prefer 这个 npm binary that owns 这个 installed global OpenClaw pre修复 以便 mixed Homebrew-plus-nvm setups 更新 这个 right install.",
      "Agents/music 和 video generation: 添加 `tools.__PROTECTED_42__.asyncCompletion.directSend` as 一个 opt-在 direct-delivery path 用于 finished async media tasks, while keeping 这个 legacy requester-session wake/模型-delivery 流程 as 这个 default.",
      "CLI/skills JSON: route `skills list --json`, `skills info --json`, 和 `skills check --json` output 到 stdout instead 的 stderr 以便 machine-readable consumers receive JSON 在 这个 expected stream again. (; 修复es; landed 从 contributor PR 通过 @Aftabbs)",
      "CLI/Commander: preserve Commander-computed exit codes 用于 argument 和 help-error paths, 和 cover 这个 user-argv parse mode 在 这个 regression tests 以便 invalid CLI invocations no longer 报告 success when exits 是 intercepted.",
      "Cron: replay interrupted recurring jobs 在 这个 first gateway restart instead 的 waiting 用于 一个 second restart.",
      "Cron: send failure notifications through 这个 job's primary delivery channel using 这个 相同的 session context as successful delivery when no 显式的 `failureDestination` 是 configured.",
      "Exec/remote skills: stop advertising `exec host=__PROTECTED_67__` when 这个 current exec policy cannot route 到 一个 node, 和 clarify blocked exec-host override errors 具有 both 这个 requested host 和 allowed config path.",
      "Agents/Claude CLI/安全: 清除 inherited Claude Code config-root 和 插件-root env overrides like `CLAUDE_CONFIG_DIR` 和 `CLAUDE_CODE_插件_*`, 以便 OpenClaw-launched Claude CLI 运行 cannot be silently pointed at 一个 alternate Claude config/插件 tree 具有 different hooks, 插件s, 或 auth context.",
      "Agents/Claude CLI/安全: 清除 inherited Claude Code provider-routing 和 managed-auth env overrides, 和 mark OpenClaw-launched Claude CLI 运行 as host-managed, 以便 Claude CLI backdoor sessions cannot be silently redirected 到 proxy, Bedrock, Vertex, Foundry, 或 parent-managed token contexts.",
      "Agents/Claude CLI/安全: force host-managed Claude CLI backdoor 运行 到 `--setting-sources user`, even under custom backend arg overrides, 以便 repo-local `.claude` project/local settings, hooks, 和 插件 discovery do not silently execute inside non-interactive OpenClaw sessions.",
      "Agents/Claude CLI: treat malformed bare `--permission-mode` backend overrides as missing 和 fail 安全的 back 到 `bypassPermissions`, 以便 custom `cliBackends.claude-cli.args` 安全 config cannot accidentally consume 这个 下一个 flag as 一个 bogus permission mode.",
      "gateway/device pairing: req界面re non-admin paired-device sessions 到 manage only their own device 用于 token rotate/revoke 和 paired-device removal, blocking cross-device token theft inside pairing-scoped sessions.",
      "gateway/插件 routes: 保持 gateway-auth 插件 runtime routes 在 write-only fallback scopes unless 一个 trusted-proxy caller explicitly declares narrower `x-openclaw-scopes`, 以便 插件 HTTP handlers no longer mint admin-level runtime scopes 在 missing 或 untrusted HTTP scope headers.",
      "B界面ld/types: 修复 the Node `createReq界面re(...)` helper typing so provider-runtime lazy loads compile cleanly again and `pnpm b界面ld` no longer fails in the Pi embedded provider error-pattern path.",
      "gateway/安全: scope loopback Browser-origin auth throttling 通过 normalized origin 以便 one localhost Control 界面 tab cannot lock out 一个 different localhost Browser origin after repeated auth failures.",
      "gateway/auth: serialize async shared-secret auth attempts per client 以便 concurrent Tailscale-capable failures cannot overrun 这个 intended auth rate-limit budget.",
      "device pairing/安全: 保持 non-operator device scope checks bound 到 这个 requested role pre修复 以便 bootstrap verification cannot redeem `__PROTECTED_66__.*` scopes through `__PROTECTED_67__` auth.",
      "device pairing: reject rotating device tokens into roles that were never approved during pairing, 和 保持 reconnect role checks bounded 到 这个 paired device's approved role set.",
      "gateway/device auth: reuse cached device-token scopes only 用于 cached-token reconnects, while keeping 显式的 `deviceToken` scope requests 和 empty-cache fallbacks intact 以便 reconnects preserve `__PROTECTED_66__.read` 无需 breaking 显式的 auth 流程.",
      "Mobile pairing/安全: fail closed 用于 internal `/pair` setup-code issuance, cleanup, 和 approval paths when gateway pairing scopes 是 missing, 和 保持 approval-time requested-scope enforcement 在 这个 internal command path.",
      "Mobile pairing/bootstrap: 保持 QR bootstrap handoff tokens bounded 到 这个 mobile-安全的 contract 以便 node handoff stays unscoped 和 operator handoff drops mixed `__PROTECTED_67__.*`, `__PROTECTED_66__.admin`, 和 `__PROTECTED_66__.__PROTECTED_60__` scopes.",
      "Mobile pairing/Android: tighten secure endpoint handling 以便 Tailscale 和 public remote setup reject cleartext endpoints, private LAN pairing still works, merged-role approvals mint both node 和 operator device tokens, 和 bootstrap tokens survive node auto-pair 直到 operator approval finishes. ()",
      "Android/canvas 安全: req界面re exact normalized A2界面 URL matches before forwarding canvas bridge 操作, rejecting query mismatches 和 descendant paths while still allowing fragment-only A2界面 导航.",
      "Synology chat/安全: default low-level HTTPS helper TLS verification 到 在 以便 helper/API defaults match 这个 shipped 安全的 account default, 和 only 显式的 `allowInsecureSsl: true` opts out.",
      "Synology chat/安全: route webhook token comparison through 这个 shared constant-time secret helper 用于 consistency 具有 other bundled 插件s.",
      "插件s/marketplace: block remote marketplace symlink escapes 无需 breaking ordinary local marketplace install paths.",
      "Telegram/local Bot API: honor `channels.telegram.APIRoot` 用于 buffered media downloads, 添加 `channels.telegram.network.dangerouslyAllowPrivateNetwork` 用于 trusted fake-IP setups, 和 req界面re `channels.telegram.trustedLocalFileRoots` before reading absolute Bot API `file_path` values. () 和 @obviyus.",
      "Outbound/sanitizer: strip leaked `<tool_call>`, `<function_calls>`, 和 模型 special tokens 从 shared user-visible assistant text, including truncated tool-call streams, 以便 internal scaffolding no longer bleeds into replies across surfaces. -svg.",
      "Agents/errors: surface 一个 显式的 disk-full message when local session 或 transcript writes fail 具有 `ENOSPC`/`disk full`, 以便 those 运行 stop degrading into opaque `__PROTECTED_53__`-style failures.",
      "Exec approvals: 移除 heuristic command-obfuscation gating 从 host exec 以便 gateway 和 node 运行 rely 在 显式的 policy, allowlist, 和 strict inline-eval rules only.",
      "Agents/tool results: cap 实时的 tool-result persistence 和 overflow-recovery truncation at 40k 角色 以便 oversized tool output stays bounded 无需 discarding recent context entirely.",
      "Discord/video replies: split text-plus-video deliveries into 一个 text Reply followed 通过 一个 media-only send, 和 let 实时的 provider auth checks honor manifest-declared API key env vars like `MODELSTUDIO_API_KEY`.",
      "config/All Settings: 保持 这个 raw config 视图 intact when sensitive fields 是 blank instead 的 corrupting 或 dropping 这个 rendered snapshot.",
      "插件 SDK/facades: back-fill bundled 插件 facade sentinels before 插件-id tracking re-enters config loading, 以便 CLI/provider startup no longer crashes 具有 `shouldNormalizeGoogleProviderConfig is not a function` 或 other empty-facade reads during bundled 插件 re-entry.",
      "插件s/facades: back-fill facade sentinels before tracked-插件 resolution re-enters config loading, 以便 facade exports stay defined during circular provider normalization.",
      "QA lab: restore typed mock OpenAI gateway config wiring so QA-lab config helpers compile cleanly again and `pnpm check` / `pnpm b界面ld` stay green.",
      "Discord/image generation: include 这个 real generated `__PROTECTED_42__:` paths 在 tool output 和 avoid duplicate plain-output media requeueing 以便 Discord image replies stop pointing at missing local files.",
      "Slack: route 实时的 DM replies back 到 这个 concrete inbound DM channel while keeping persisted routing metadata user-scoped, 以便 normal assistant replies stop disappearing when pairing 和 system messages still arrive.",
      "Discord/Reply tags: strip leaked `[[reply_to_current]]` Control tags 从 preview text 和 honor 显式的 Reply-tag threading during final delivery, 以便 Discord replies stay attached 到 这个 triggering message instead 的 printing Reply metadata into chat.",
      "Telegram: 修复 current-模型 checks 在 这个 模型 picker, HTML-format non-default `/model` confirmations, 显式的 topic replies, persisted reaction ownership across restarts, caption-media placeholder 和 `file_id` preservation 在 download failure, 和 upgraded-install inbound image reads. () , @GitZhangChi, @dashhuang, @samzong, @v1p0r, 和 @neeravmakwana.",
      "Telegram: restore DM voice-笔记 preflight transcription 以便 direct-message audio stops arriving as raw `<__PROTECTED_42__:audio>` placeholders.",
      "Telegram/reasoning: only create 一个 Telegram reasoning preview 通道 when 这个 session 是 explicitly `reasoning:stream`, 以便 hidden `<think>` traces 从 streamed replies stop surfacing as chat previews 在 normal sessions.",
      "Telegram/native command menu: trim long menu descriptions before dropping commands 以便 sub-100 command sets 可以 still fit Telegram's payload budget 和 保持 more `/` entries visible.",
      "Feishu/reasoning: only expose streamed reasoning previews when 这个 session 是 explicitly `reasoning:stream`, 以便 hidden reasoning traces do not surface 在 normal streaming sessions.",
      "Discord: 保持 REST, webhook, 和 monitor traffic 在 这个 configured proxy, preserve component-only media sends, honor `@everyone` 和 `@here` mention gates, 保持 ACK reactions 在 这个 active account, 和 split voice connect/playback timeouts 以便 auto-join 是 more reliable. ()",
      "WhatsApp: restore `channels.whatsapp.blockStreaming` 和 重置 watchdog timeouts after reconnect 以便 q界面et chats stop falling into reconnect loops. () 和 @mcaxtr.",
      "Memory: 保持 `__PROTECTED_0__-core` b界面ltin embedding registration 在 这个 already-registered path 以便 selecting `__PROTECTED_0__-core` no longer recurses through 插件 discovery 和 crashes during startup.",
      "Agents/tool results: keep large `read` outputs visible longer, preserve the latest `read` output when older tool output can absorb the overflow budget, and fall back to Pi's normal overflow compaction/retry path before replacing a fresh `read` with a compacted stub. Thanks @vincentkoc.",
      "Memory/QMD: prefer modern `qmd collection 添加 --glob`, accept newer single-line JSON hit metadata while keeping legacy line fields, refresh QMD docs/doctor install g界面dance 和 模型-override g界面dance, 和 保持 older QMD releases working.",
      "MS Teams: download inline DM images via Graph API 和 preserve channel Reply threading 在 proactive fallback. () -developer 和 @hyojin.",
      "MS Teams: replace 这个 deprecated Teams SDK Http插件 stub 具有 `httpServerAdapter` 以便 recurring gateway deprecation warnings stop firing 和 这个 Express 5 兼容性 workaround stays 在 这个 支持ed SDK path. -sys.",
      "Matrix/exec approvals: anchor seeded approval reactions 到 这个 primary Matrix prompt event, resolve them 从 event metadata instead 的 prompt text, 和 clean up chunked approval prompts correctly.",
      "Matrix: recover more reliably when secret storage 或 recovery keys 是 missing 通过 recreating secret storage during repair 和 backup 重置, hold crypto snapshot locks during persistence, 和 surface 显式的 too-large attachment markers. () , @emonty, 和 @efe-arv.",
      "Android/Talk Mode: cancel 在-flight `talk.speak` playback when speech 是 explicitly stopped, 以便 stale replies stop starting after barge-在 或 manual stop.",
      "Android/Talk Mode: restore spoken assistant replies 在 node-scoped sessions 通过 keeping Reply routing synced 到 这个 resolved node session key 和 pausing mic capture during Reply playback.",
      "Android/Talk Mode: restore voice replies 在 gateway-backed talk mode sessions 通过 updating embedded runner transport overrides 到 这个 current agent transport API.",
      "Voice-call/OpenAI: pass full 插件 config into realtime transcription provider resolution 以便 streaming calls 可以 discover 这个 bundled OpenAI realtime transcription provider again. 修复es. 和 @vincentkoc.",
      "Control 界面/chat: 添加 一个 per-session thinking-level picker 在 这个 chat header 和 mobile chat settings, 和 保持 这个 Browser bundle 在 界面-local thinking/session-key helpers 以便 Safari no longer crashes 在 node-only imports before rendering chat 控制.",
      "Control 界面: keep Stop visible during tool-only execution, preserve pending-send busy state, and clear stale ClawHub search results as soon as the query changes. (#54528, #59800, #60267) Thanks @chziyue and @frankekn.",
      "Control 界面/avatar: honor `界面.assistant.avatar` when serving `/avatar/:agentId` 以便 Appearance 界面 avatar paths stop falling back 到 initials placeholders.",
      "Control 界面/cron: highlight 这个 Cron refresh button while refresh 是 在 flight 以便 这个 page's loading state stays visible even when prior data remains 在 screen. -zhuzm.",
      "Control 界面/Overview: prevent gateway access token/password visibility toggle buttons 从 overlapping their inputs at narrow widths.",
      "CLI/skills JSON: route `skills list --json`, `skills info --json`, 和 `skills check --json` output 到 stdout instead 的 stderr 以便 machine-readable consumers receive JSON 在 这个 expected stream again. (; 修复es; landed 从 contributor PR 通过 @Aftabbs)",
      "CLI/Commander: preserve Commander-computed exit codes 用于 argument 和 help-error paths, 和 cover 这个 user-argv parse mode 在 这个 regression tests 以便 invalid CLI invocations no longer 报告 success when exits 是 intercepted.",
      "Cron: replay interrupted recurring jobs 在 这个 first gateway restart instead 的 waiting 用于 一个 second restart.",
      "Cron: send failure notifications through 这个 job's primary delivery channel using 这个 相同的 session context as successful delivery when no 显式的 `failureDestination` 是 configured.",
      "Live model switching: only treat explicit user-driven model changes as pending live switches, so fallback rotation, heartbeat overrides, and compaction no longer trip `LiveSessionModelSwitchError` before making an API call. (#60266) Thanks @kiranvk-2011.",
      "Exec approvals: reuse 持久的 exact-command `allow-always` approvals 在 allowlist mode 以便 identical reruns stop prompting, 和 tighten Windows interpreter/path approval handling 以便 wrapper 和 malformed-path cases fail closed more consistently. () , @SnowSky1, 和 @pgondhi987.",
      "node exec approvals: 保持 node-host `system.run` approvals bound 到 这个 prepared execution plan across async forwarding, 以便 mutable script operands still get approval-time binding 和 drift revalidation instead 的 dropping back 到 unbound execution.",
      "Agents/exec approvals: let `exec-approvals.json` agent 安全 override stricter gateway tool defaults 以便 approved subagents 可以 use `安全: “full”` 无需 falling back 到 allowlist enforcement again.",
      "Agents/exec: restore `host=__PROTECTED_67__` routing 用于 node-pinned 和 `host=auto` sessions, while still blocking sandboxed `auto` sessions 从 jumping 到 gateway.",
      "Exec/heartbeat: use 这个 canonical `exec-event` wake reason 用于 `notifyOnExit` 以便 background exec completions still trigger follow-up turns when `HEARTBEAT.md` 是 empty 或 comments-only.",
      "Heartbeat: skip wake delivery when 这个 target session 通道 是 already busy 以便 这个 pending event 是 retried instead 的 getting drained too early.",
      "Group chats/agent prompts: tell 模型 到 minimize empty lines 和 use normal chat-style spacing 以便 group replies avoid document-style blank-line formatting.",
      "Providers/OpenAI GPT: treat 短的 approval turns like `ok do it` 和 `go ahead` as immediate 操作 turns, 和 trim overly memo-like GPT-5 chat confirmations 以便 OpenAI replies stay shorter 和 more conversational 通过 default.",
      "Providers/OpenAI Codex: split native `contextWindow` 从 runtime `contextTokens`, 保持 这个 default effective cap at `272000`, 和 expose 一个 per-模型 `contextTokens` override 在 `models.providers.*.models[]`.",
      "Providers/OpenAI-compatible WS: compute fallback token totals 从 normalized usage when providers omit 或 zero `total_tokens`, 以便 DashScope-compatible sessions stop storing zero totals after 别名 normalization.",
      "Agents/OpenAI: mark Claude-compatible file tool schemas as `添加itionalProperties: false` 以便 direct OpenAI GPT-5 routes stop rejecting 这个 `read` tool 具有 invalid strict-schema errors.",
      "Agents/OpenAI: fall back 到 `strict: false` 用于 native OpenAI tool calls when 一个 tool schema 是 not strict-compatible, 和 normalize empty-object tool schemas 到 include `req界面red: []`, 以便 direct GPT-5 routes stop failing 具有 invalid strict-schema errors like missing `__PROTECTED_9__` 在 `req界面red`.",
      "Agents/GPT: 添加 显式的 work-item lifecycle events 用于 embedded 运行, use them 到 surface real progress more reliably, 和 stop counting tool-started turns as planning-only retries.",
      "插件s/OpenAI: enable `gpt-image-1` reference-image edits through `/images/edits` multipart uploads, 和 stop inferring un支持ed resolution overrides when no 显式的 `size` 或 `resolution` 是 provided.",
      "Agents/replay: 移除 这个 malformed assistant-content canonicalization repair 从 replay history sanitization instead 的 extending that legacy repair path into replay validation.",
      "插件s/OpenAI: tune 这个 OpenAI prompt overlay 用于 实时的-chat cadence 以便 GPT replies stay shorter, more human, 和 less wall-的-text 通过 default.",
      "Providers/compat: stop forcing OpenAI-only defaults 在 proxy 和 custom OpenAI-compatible routes, preserve native vendor-specific reasoning/tool/streaming 行为 across Anthropic-compatible, Moonshot, Mistral, ModelStudio, OpenRouter, xAI, 和 Z.ai endpoints, 和 route GitHub Copilot Claude 模型 through Anthropic Messages instead 的 OpenAI Responses.",
      "Providers/GitHub Copilot: send IDE identity headers 在 runtime 模型 requests 和 GitHub token exchange 以便 IDE-authenticated Copilot 运行 stop failing 具有 missing `Editor-Version`. 和 @vincentkoc.",
      "Providers/OpenRouter failover: classify `403 “Key limit exceeded”` spending-limit responses as billing 以便 模型 fallback continues instead 的 stopping 在 generic auth.",
      "Providers/Anthropic: 保持 `claude-cli/*` auth 在 实时的 Claude CLI credentials at runtime, avoid persisting stale bearer-token 配置文件, 和 suppress macOS Keychain prompts during non-interactive Claude CLI setup.",
      "Providers/Anthropic: when Claude CLI auth becomes 这个 default, write 一个 real `claude-cli` auth 配置文件 以便 local 和 gateway agent 运行 可以 use Claude CLI immediately 无需 missing-API-key failures.",
      "Providers/Anthropic Vertex: honor `cacheRetention: “long”` 具有 这个 real 1-hour prompt-cache TTL 在 Vertex AI endpoints, 和 default `anthropic-vertex` cache retention like direct Anthropic.",
      "Agents/Anthropic: preserve native `toolu_*` replay ids 在 direct Anthropic 和 Anthropic Vertex paths 以便 cache-sensitive history stops rewriting known-valid Anthropic tool-use ids.",
      "Providers/Google: 添加 模型-level `cacheRetention` 支持 用于 direct Gemini system prompts 通过 creating, reusing, 和 refreshing `cachedContents` automatically 在 Google AI Studio 运行. -glitch.",
      "Google Gemini CLI auth: detect bundled npm installs 通过 scanning packaged bundle files 用于 这个 Gemini OAuth client config, 以便 `npm install -g @google/gemini-cli` layouts work again.",
      "Google Gemini CLI auth: detect personal OAuth mode 从 local Gemini settings 和 skip Code Assist project discovery 用于 those logins, 以便 personal Google accounts stop failing 具有 `loadCodeAssist 400 Bad Request`.",
      "Google Gemini CLI auth: 改进 OAuth credential discovery across Windows nvm 和 Homebrew libexec installs, 和 align Code Assist metadata 以便 Gemini login stops failing 在 packaged CLI layouts.",
      "Google Gemini CLI 模型: 添加 forward-compat 支持 用于 stable `gemini-2.5-*` 模型 ids 通过 letting 这个 bundled CLI provider clone them 从 Google templates, 以便 `gemini-2.5-flash-lite` 和 related configured 模型 stop showing up as missing.",
      "Google image generation: disable pinned DNS 用于 Gemini image requests 和 honor 显式的 `pinDns` overrides 在 shared provider HTTP helpers 以便 proxy-backed image generation works again.",
      "Providers/Microsoft Foundry: preserve 显式的 image capability 在 normalized Foundry deployments, repair stale GPT/o-series text-only 模型 metadata across gateway 和 runtime paths, 和 保持 unknown fallback 模型 从 borrowing unrelated image 支持.",
      "Providers/模型 Studio: preserve native streaming usage reporting 用于 DashScope-compatible endpoints even when they 是 configured under 一个 generic provider key, 以便 streamed token totals stop sticking at zero. -AI-gif.",
      "Providers/Z.AI: preserve explicitly registered `glm-5-*` 变体 like `glm-5-turbo` instead 的 intercepting them 具有 这个 generic GLM-5 forward-compat shim. -haoyu.",
      "Amazon Bedrock/aws-sdk auth: stop injecting 这个 fake `AWS_PROFILE` APIKey marker when no AWS auth env vars exist, 以便 instance-role 和 other default-chain setups 保持 working 无需 poisoning provider config.",
      "Agents/Kimi tool-call repair: preserve tool arguments that were already present 在 streamed tool calls when later malformed deltas fail reevaluation, while still dropping stale repair-only state before `toolcall_end`.",
      "插件s/Kimi Coding: parse tagged tool calls 和 保持 Anthropic-native tool payloads 以便 Kimi coding endpoints execute tools instead 的 echoing raw markup. () 和 @Eric-Guo.",
      "media understanding: auto-register image-capable config providers 用于 vision routing, 以便 custom GLM-style provider ids 具有 image 模型 stop failing 具有 “no media-understanding provider registered”. -610.",
      "插件s/media understanding: enable bundled Groq 和 Deepgram providers 通过 default 以便 configured transcription 模型 work 无需 extra 插件 activation config.",
      "MiniMax/pricing: 保持 bundled MiniMax highspeed pricing distinct 在 provider catalogs 和 preserve 这个 lower M2.5 cache-read pricing when onboarding older MiniMax 模型. -patch.",
      "MiniMax: advertise image input 在 bundled `MiniMax-M2.7` 和 `MiniMax-M2.7-highspeed` 模型 definitions 以便 image-capable 流程 可以 route through 这个 M2.7 family correctly.",
      "模型/MiniMax: honor `MINIMAX_API_HOST` 用于 implicit bundled MiniMax provider catalogs 以便 China-hosted API-key setups pick `__PROTECTED_22__.minimaxi.com/anthropic` 无需 manual provider config.",
      "Usage/MiniMax: invert remaining-style `usage_percent` fields when MiniMax 报告 only remaining percentage data, 以便 usage bars stop showing nearly-full remaining quota as nearly-exhausted usage.",
      "Usage/MiniMax: let usage snapshots treat `minimax-portal` 和 MiniMax CN 别名 as 这个 相同的 MiniMax quota surface, 和 prefer stored MiniMax OAuth before falling back 到 Coding Plan keys.",
      "Usage/MiniMax: prefer 这个 chat-模型 `model_remains` entry 和 derive Coding Plan window labels 从 MiniMax interval timestamps 以便 MiniMax usage snapshots stop picking zero-budget media rows 和 misreporting 4h windows as `5h`. -AI-gif.",
      "模型 picker/providers: treat bundled BytePlus 和 Volcengine plan 别名 as their native providers during setup, 和 expose their bundled standard/coding catalogs before auth 以便 setup 可以 suggest 这个 right 模型.",
      "Tools/web_search (Kimi): when `tools.web.search.kimi.baseUrl` 是 unset, inherit native Moonshot chat `baseUrl` (`.ai` / `.cn`) 以便 China console keys authenticate 在 这个 相同的 host as chat. 修复es.",
      "Agents/Claude CLI: 保持 non-interactive `--permission-mode bypassPermissions` when custom `cliBackends.claude-cli.args` override defaults, including fallback resolution before 这个 runtime 插件 registry 是 active, 以便 cron 和 heartbeat Claude CLI 运行 do not regress 到 interactive approval mode. 和 @thewilloftheshadow.",
      "Agents/Claude CLI: persist 显式的 `openclaw agent --__PROTECTED_49__-id` 运行 under 一个 stable session key 以便 follow-ups 可以 reuse 这个 stored CLI binding 和 resume 这个 相同的 underlying Claude session.",
      "Agents/Claude CLI: persist routed Claude session bindings, rotate them 在 `/new` 和 `/reset`, 和 保持 实时的 Claude CLI 模型 switches moving across 这个 configured Claude family 以便 resumed sessions follow 这个 real active thread 和 模型.",
      "Agents/CLI backends: invalidate stored CLI session reuse when local CLI login state or the selected auth profile credential changes, so relogin and token rotation stop resuming stale sessions.",
      "Agents/Claude CLI/images: reuse stable hydrated image file paths 和 preserve shared media extensions like HEIC when passing image refs 到 local CLI 运行, 以便 Claude CLI image prompts stop thrashing KV cache pre修复es 和 oddball image formats do not fall back 到 `.bin`.",
      "Agents/compaction: 保持 assistant tool calls 和 displaced tool results 在 这个 相同的 compaction chunk 以便 strict summarization providers stop rejecting orphaned tool pairs.",
      "Agents/failover: scope Anthropic `An unknown error occurred` failover matching 通过 provider 以便 generic internal unknown-error text no longer triggers retryable timeout fallback. -he-zhu.",
      "Agents/subagents: honor allowlist validation, auth-配置文件 handoff, 和 session override state when 一个 subagent retries after `LiveSessionModelSwitchError`.",
      "Agents/runtime: make default subagent allowlists, inherited skills/workspaces, 和 duplicate session-id resolution behave more predictably, 和 include value-shape 提示 在 missing-parameter tool errors. () , @gumadeiras, @joelnishanth, 和 @priyansh19.",
      "Agents/pairing: merge completion announce delivery context 具有 这个 requester session fallback 以便 missing `to` still reaches 这个 original channel, 和 include `__PROTECTED_66__.talk.secrets` 在 CLI default operator scopes 用于 node-role device pairing approvals.",
      "Agents/scheduling: steer background-now work toward automatic completion wake 和 treat `process` polling as 在-demand inspection 或 intervention instead 的 default completion handling.",
      "Agents/skills: skip `.git` 和 `node_modules` when mirroring skills into sandbox workspaces 以便 read-only sandboxes do not copy repo history 或 dependency trees.",
      "ACP/agents: inherit 这个 target agent workspace 用于 cross-agent ACP spawns 和 fall back safely when 这个 inherited workspace no longer exists. -rgb.",
      "ACPX/Windows: preserve backslashes 和 absolute `.exe` paths 在 Claude CLI parsing, 和 fail fast 在 wrapper-script targets 具有 g界面dance 到 use `cmd.exe /c`, `powershell.exe -File`, 或 `__PROTECTED_67__ <script>`.",
      "Auth/failover: persist selected fallback overrides before retrying, shorten `auth_permanent` lockouts, and refresh websocket/shared-auth sessions only when real auth changes occur so retries and secret rotations behave predictably. (#60404, #60323, #60387) Thanks @extrasmall0 and @mappel-nv.",
      "gateway/channels: pin 这个 initial startup channel registry before later 插件-registry churn 以便 configured channels stay visible 和 `channels.status` stops falling back 到 empty `channelOrder` / `channels` payloads after runtime 插件 loads.",
      "Prompt caching: order stable workspace project-context files before `HEARTBEAT.md` and keep `HEARTBEAT.md` below the system-prompt cache boundary so heartbeat churn does not invalidate the stable project-context pre修复. (#58979) Thanks @yozu and @vincentkoc.",
      "Prompt caching: route Codex Responses 和 Anthropic Vertex through boundary-aware cache shAPIng, 和 报告 这个 actual outbound system prompt 在 cache traces 以便 cache reuse 和 misses line up 具有 what providers really receive.",
      "Agents/cache: preserve 这个 full 3-turn prompt-cache image window across tool loops, 保持 colliding bundled MCP tool definitions deterministic, 和 reapply Anthropic Vertex cache shAPIng after payload hook replacements 以便 KV/cache reuse stays stable.",
      "Status/cache: restore `cacheRead` 和 `cacheWrite` 在 transcript fallback 以便 `/status` keeps showing cache hit percentages when session logs 是 这个 only complete usage source.",
      "Status/usage: let `/status` 和 `session_status` fall back 到 transcript token totals when 这个 session meta store stayed at zero, 以便 LM Studio, Ollama, DashScope, 和 similar OpenAI-compatible providers stop showing `Context: 0/...`.",
      "Mattermost/config schema: accept `groups.*.req界面reMention` again 以便 existing Mattermost configs no longer fail strict validation after upgrade.",
      "doctor/config: 比较 normalized `talk` configs 通过 deep structural equality instead 的 key-order-sensitive serialization 以便 `openclaw __PROTECTED_46__ --修复` stops repeatedly reporting/applying no-op `talk.__PROTECTED_15__/providers` normalization. -dev.",
      "Anthropic CLI onboarding: rewrite migrated fallback 模型 refs during non-interactive Claude CLI setup too, 以便 onboarding 和 scripted setup no longer 保持 stale `anthropic/*` fallbacks after switching 这个 primary 模型 到 `claude-cli/*`.",
      "模型/Anthropic CLI auth: replace migrated `agents.defaults.models` allowlists when `openclaw models __PROTECTED_21__ login --__PROTECTED_15__ anthropic --method cli --set-default` switches 到 `claude-cli/*`, 以便 stale `anthropic/*` entries do not linger beside 这个 migrated Claude CLI defaults.",
      "doctor/Claude CLI: 添加 dedicated Claude CLI health checks 以便 `openclaw __PROTECTED_46__` 可以 spot missing local installs 或 broken auth before agent 运行 fail.",
      "插件s/auth-选择: apply provider-owned auth config patches 无需 recursively preserving replaced default-模型 maps, 以便 Anthropic Claude CLI 和 similar migrations 可以 intentionally swap 模型 allowlists during onboarding 和 setup instead 的 accumulating stale entries.",
      "插件s/onboarding: write dotted 插件 界面提示 paths like Brave `webSearch.mode` as nested 插件 config 以便 `llm-context` setup stops failing validation.",
      "插件s/install: preserve unsafe override flags across linked 插件 和 hook-pack probes 以便 local `--link` installs honor 这个 文档化的 override 行为.",
      "插件s/cache: inherit 这个 active gateway workspace 用于 provider, web-search, 和 web-fetch snapshot loads when callers omit `workspaceDir`, 以便 compatible 插件 registries 和 snapshot caches stop missing 在 gateway-owned runtime paths.",
      "插件 SDK/context engines: export the missing context-engine result and subagent lifecycle types from `openclaw/插件-sdk` so context engine 插件s can type `ContextEngine` 实现ations without local workarounds. (#61251) Thanks @DaevMithran.",
      "Tasks/maintenance: reconcile stale cron 和 chat-backed CLI task rows against 实时的 cron-job 和 agent-运行 ownership instead 的 treating any persisted session key as proof that 这个 task 是 still running.",
      "插件s: suppress trust-warning noise during non-activating snapshot 和 CLI metadata loads.",
      "Agents/video generation: accept `agents.defaults.videoGenerationModel` 在 strict config validation 和 `openclaw __PROTECTED_20__ set/get`, 以便 gateways using `video_generate` no longer fail 到 boot after enabling 一个 video 模型.",
      "Matrix/streaming: 添加 一个 q界面et preview mode 用于 streamed Matrix replies, 保持 legacy `partial` preview-first 行为, 和 finalize q界面et media captions correctly 以便 previews stop notifying early 无需 dropping final text semantics.",
      "gateway/shutdown: bound websocket-server shutdown even when no tracked clients remain, 以便 gateway restarts stop hanging 直到 这个 watchdog kills 这个 process.",
      "Control 界面/multilingual: localize 这个 remaining shared channel, instances, nodes, 和 gateway-confirmation strings 以便 这个 dashboard stops mixing translated 界面 具有 hardcoded English labels.",
      "Discord/media: raise 这个 default inbound 和 outbound media cap 到 `100MB` 以便 Discord matches Telegram more closely 和 larger attachments stop failing 在 这个 旧的 low default.",
      "Matrix: keep direct transport requests on the pinned dispatcher by routing them through undici runtime fetch, so Matrix clients resume syncing on newer runtimes without dropping the validated 添加ress binding. (#61595) Thanks @gumadeiras.",
      "插件s/facades: resolve globally installed bundled-插件 runtime facades 从 registry roots 以便 bundled channels like LINE still boot when 这个 winning 插件 install lives under 这个 global extensions directory 具有 一个 encoded scoped folder name."
    ]
  }
},
  {
  "version": "2026.4.2",
  "date": "2026-04-02",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Tasks/Task 流程: restore 这个 core Task 流程 substrate 具有 managed-vs-mirrored sync modes, 持久的 流程 state/revision tracking, 和 `openclaw flows` inspection/recovery primitives 以便 background orchestration 可以 persist 和 be operated separately 从 插件 authoring layers.",
      "Tasks/Task 流程: 添加 managed child task spawning plus sticky cancel intent, 以便 external orchestrators 可以 stop scheduling immediately 和 let parent Task 流程 settle 到 `cancelled` once active child tasks finish.",
      "插件s/Task 流程: 添加 一个 bound `__PROTECTED_22__.__PROTECTED_34__.taskFlow` seam 以便 插件s 和 trusted authoring layers 可以 create 和 drive managed Task 流程 从 host-resolved OpenClaw context 无需 passing owner identifiers 在 each call.",
      "Android/assistant: 添加 assistant-role entrypoints plus Google Assistant app 操作 metadata 以便 Android 可以 launch OpenClaw 从 这个 assistant trigger 和 hand prompts into 这个 chat composer.",
      "Exec defaults: make gateway/node host exec default 到 YOLO mode 通过 requesting `安全=full` 具有 `ask=off`, 和 align host approval-file fallbacks plus docs/doctor reporting 具有 that no-prompt default.",
      "Providers/runtime: 添加 provider-owned replay hook surfaces 用于 transcript policy, replay cleanup, 和 reasoning-mode dispatch.",
      "插件s/hooks: 添加 `before_agent_reply` 以便 插件s 可以 短的-circ界面t 这个 LLM 具有 synthetic replies after inline 操作.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing 和 Feishu scoped inheritance across bootstrap, 模型 override, restart, 和 tool-policy paths.",
      "Feishu/comments: 添加 一个 dedicated Drive comment-event 流程 具有 comment-thread context resolution, 在-thread replies, 和 `feishu_drive` comment 操作 用于 document collaboration 工作流. -01.",
      "Matrix/插件: emit spec-compliant `m.mentions` metadata across text sends, media captions, edits, poll fallback text, 和 操作-driven edits 以便 Matrix mentions notify reliably 在 clients like Element.",
      "Diffs: 添加 插件-owned `viewerBaseUrl` 以便 viewer links 可以 use 一个 stable proxy/public origin 无需 passing `baseUrl` 在 every tool call. Related.",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently 用于 manual `/compact` 和 other context-engine compaction paths, 以便 engine-owned compaction uses 这个 configured override 模型 across runtime entrypoints. -svg.",
      "Agents/compaction: 添加 `agents.defaults.compaction.notifyUser` 以便 这个 `🧹 Compacting context...` start notice 是 opt-在 instead 的 always being shown.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance 用于 agent reactions.",
      "Exec approvals/channels: auto-enable DM-first native chat approvals when 支持ed channels 可以 infer approvers 从 existing owner config, while keeping channel fanout 显式的 和 clarifying forwarding versus native approval client config."
    ],
    "improvements": [
      "插件s/xAI: move `x_search` settings 从 这个 legacy core `tools.web.x_search.*` path 到 这个 插件-owned `插件s.entries.xai.__PROTECTED_20__.xSearch.*` path, standardize `x_search` auth 在 `插件s.entries.xai.__PROTECTED_20__.webSearch.APIKey` / `XAI_API_KEY`, 和 migrate legacy config 具有 `openclaw __PROTECTED_46__ --修复`.",
      "插件s/web fetch: move Firecrawl `web_fetch` config 从 这个 legacy core `tools.web.fetch.firecrawl.*` path 到 这个 插件-owned `插件s.entries.firecrawl.__PROTECTED_20__.webFetch.*` path, route `web_fetch` fallback through 这个 new fetch-provider boundary instead 的 一个 Firecrawl-only core branch, 和 migrate legacy config 具有 `openclaw __PROTECTED_46__ --修复`."
    ],
    "bugfixes": [
      "Providers/transport policy: centralize request auth, proxy, TLS, 和 header shAPIng across shared HTTP, stream, 和 websocket paths, block insecure TLS/runtime transport overrides, 和 保持 proxy-hop TLS separate 从 target mTLS settings.",
      "Providers/Copilot: classify native GitHub Copilot API hosts 在 这个 shared provider endpoint resolver 和 harden token-derived proxy endpoint parsing 以便 Copilot base URL routing stays centralized 和 fails closed 在 malformed 提示.",
      "Providers/streaming headers: centralize default 和 attribution header merging across OpenAI websocket, embedded-runner, 和 proxy stream paths 以便 provider-specific headers stay consistent 和 caller overrides only win where intended.",
      "Providers/media HTTP: centralize base URL normalization, default auth/header injection, 和 显式的 header override handling across shared OpenAI-compatible audio, Deepgram audio, Gemini media/image, 和 Moonshot video request paths.",
      "Providers/OpenAI-compatible routing: centralize native-vs-proxy request policy 以便 hidden attribution 和 related OpenAI-family defaults only apply 在 verified native endpoints across stream, websocket, 和 shared audio HTTP paths.",
      "Providers/Anthropic routing: centralize native-vs-proxy endpoint classification 用于 direct Anthropic `service_tier` handling 以便 spoofed 或 proxied hosts do not inherit native Anthropic defaults.",
      "gateway/exec loopback: restore legacy-role fallback 用于 empty paired-device token maps 和 allow silent local role upgrades 以便 local exec 和 node clients stop failing 具有 pairing-req界面red errors after `2026.3.31`.",
      "Agents/subagents: pin admin-only subagent gateway calls 到 `__PROTECTED_66__.admin` while keeping `agent` at least privilege, 以便 `sessions_spawn` no longer dies 在 loopback scope-upgrade pairing 具有 `close(1008) \"pairing req界面red\"`.",
      "Exec approvals/config: strip invalid `安全`, `ask`, 和 `askFallback` values 从 `~/.openclaw/exec-approvals.json` during normalization 以便 malformed policy enums fall back cleanly 到 这个 文档化的 defaults instead 的 corrupting runtime policy resolution.",
      "Exec approvals/doctor: 报告 host policy sources 从 这个 real approvals file path 和 ignore malformed host override values when attributing effective policy conflicts.",
      "Exec/runtime: treat `tools.exec.host=auto` as routing-only, 保持 implicit no-config exec 在 sandbox when available 或 gateway otherwise, 和 reject per-call host overrides that would bypass 这个 configured sandbox 或 host target.",
      "Slack/mrkdwn formatting: 添加 b界面lt-在 Slack mrkdwn g界面dance 在 inbound context 以便 Slack replies stop falling back 到 generic Markdown patterns that render poorly 在 Slack.",
      "WhatsApp/presence: send `unavailable` presence 在 connect 在 self-chat mode 以便 personal-phone users stop losing all push notifications while 这个 gateway 是 running.",
      "WhatsApp/media: 添加 HTML, XML, and CSS to the MIME map and fall back gracefully for unknown media types instead of dropping the attachment. (#51562) Thanks @bobbyt74.",
      "Matrix/onboarding: restore g界面ded setup 在 `openclaw channels 添加` 和 `openclaw configure --section channels`, while keeping custom 插件 wizards 在 这个 shared `setupWizard` seam.",
      "Matrix/streaming: 保持 实时的 partial previews 用于 这个 current assistant block while preserving completed block 更新s as separate messages when `channels.__PROTECTED_39__.blockStreaming` 是 enabled.",
      "Feishu/comment threads: harden document comment-thread delivery 以便 whole-document comments fall back 到 `添加_comment`, delayed Reply lookups retry more reliably, 和 user-visible replies avoid reasoning/planning spillover. -01.",
      "MS Teams/streaming: strip already-streamed text 从 fallback block delivery when replies exceed 这个 4000-角色 streaming limit 以便 long responses stop duplicating content.",
      "Slack/thread context: filter thread starter 和 history 通过 这个 effective conversation allowlist 无需 dropping valid open-room, DM, 或 group DM context.",
      "Mattermost/probes: route status probes through 这个 SSRF guard 和 honor `allowPrivateNetwork` 以便 connectivity checks stay 安全的 用于 self-hosted Mattermost deployments. -nv.",
      "Zalo/webhook replay: scope replay dedupe key 通过 chat 和 sender 以便 reused message IDs across different chats 或 senders no longer collide, 和 harden metadata reads 用于 partially missing payloads.",
      "QQBot/结构化的 payloads: restrict local file paths 到 QQ Bot-owned media storage, block traversal outside that root, reduce path leakage 在 logs, 和 保持 inline image data URLs working.",
      "Image generation/providers: route OpenAI, MiniMax, 和 fal image requests through 这个 shared provider HTTP transport path 以便 custom base URLs, guarded private-network routing, 和 provider request defaults stay aligned 具有 这个 rest 的 provider HTTP.",
      "Image generation/providers: stop inferring private-network access 从 configured OpenAI, MiniMax, 和 fal image base URLs, 和 cap shared HTTP error-body reads 以便 hostile 或 misconfigured endpoints fail closed 无需 relaxing SSRF policy 或 buffering unbounded error payloads.",
      "Browser/host inspection: 保持 static Chrome inspection helpers out 的 这个 activated Browser runtime 以便 `openclaw __PROTECTED_46__ __PROTECTED_30__` 和 related checks do not eagerly load 这个 bundled Browser 插件.",
      "Browser/CDP: normalize trailing-dot localhost absolute-form hosts before loopback checks 以便 remote CDP websocket URLs like `ws://localhost...` rewrite back 到 这个 configured remote host. -nv.",
      "Agents/output sanitization: strip namespaced `antml:thinking` blocks 从 user-visible text 以便 Anthropic-style internal monologue tags do not leak into replies.",
      "Kimi Coding/tools: normalize Anthropic tool payloads into 这个 OpenAI-compatible function shape Kimi Coding expects 以便 tool calls stop losing req界面red arguments.",
      "Image tool/paths: resolve relative local media paths against 这个 agent `workspaceDir` instead 的 `process.cwd()` 以便 inputs like `inbox/receipt.png` pass 这个 local-path allowlist reliably. Thanks Priyansh Gupta.",
      "Podman/launch: 移除 noisy container output 从 `scripts/run-openclaw-podman.sh` 和 align 这个 Podman install g界面dance 具有 这个 q界面eter startup 流程.",
      "插件s/runtime: 保持 LINE Reply directives 和 Browser-backed cleanup/重置 流程 working even when those 插件s 是 disabled while tightening bundled 插件 activation guards.",
      "ACP/gateway reconnects: 保持 ACP prompts alive across transient websocket drops while still failing boundedly when reconnect recovery does not complete.",
      "ACP/gateway reconnects: reject stale pre-ack ACP prompts after reconnect grace expiry 以便 callers fail cleanly instead 的 hanging indefinitely when 这个 gateway never confirms 这个 运行.",
      "gateway/session kill: enforce HTTP operator scopes 在 session kill requests 和 gate authorization before session lookup 以便 unauthenticated callers cannot probe session existence.",
      "MS Teams/logging: format non-`Error` failures 具有 这个 shared unknown-error helper 以便 logs stop collapsing caught SDK 或 Axios objects into `[object Object]`.",
      "Channels/setup: ignore untrusted workspace channel 插件s during setup resolution 以便 一个 shadowing workspace 插件 cannot override b界面lt-在 channel setup/login 流程 unless explicitly trusted 在 config. -nv.",
      "Exec/Windows: restore allowlist enforcement 具有 quote-aware `argPattern` matching across gateway 和 node exec, 和 surface accurate dynamic pre-approved executable 提示 在 这个 exec tool description.",
      "gateway: prune empty `__PROTECTED_67__-pending-work` state entries after 显式的 acknowledgments 和 natural expiry 以便 这个 per-node state map no longer grows indefinitely.",
      "Webhooks/secret comparison: replace ad-hoc timing-安全的 secret comparisons across BlueBubbles, Feishu, Mattermost, Telegram, Twilio, 和 Zalo webhook handlers 具有 这个 shared `safeEqualSecret` helper 和 reject empty auth tokens 在 BlueBubbles.",
      "OpenShell/mirror: constrain `remoteWorkspaceDir` 和 `remoteAgentWorkspaceDir` 到 这个 managed `/sandbox` 和 `/agent` roots, 和 保持 mirror sync 从 overwriting 或 removing user-添加ed shell roots during config synchronization.",
      "插件s/activation: preserve 显式的, auto-enabled, 和 default activation provenance plus reason metadata across CLI, gateway bootstrap, 和 status surfaces 以便 插件 enablement state stays accurate after auto-enable resolution.",
      "Exec/env: block 添加itional host environment override pivots 用于 package roots, language runtimes, compiler include paths, 和 credential/config locations 以便 request-scoped exec cannot redirect trusted toolchains 或 config lookups.",
      "dotenv/workspace overrides: block workspace `.__PROTECTED_18__` files 从 overriding `OPENCLAW_PINNED_PYTHON` 和 `OPENCLAW_PINNED_WRITE_PYTHON` 以便 trusted helper interpreters cannot be redirected 通过 repo-local env injection.",
      "插件s/install: accept JSON5 syntax 在 `openclaw.插件.json` 和 bundle `插件.json` manifests during install/validation, 以便 third-party 插件s 具有 trailing commas, comments, 或 unquoted keys no longer fail 到 install.",
      "Telegram/exec approvals: rewrite shared `/approve … allow-always` callback payloads 到 `/approve … always` before Telegram button rendering 以便 插件 approval IDs still fit Telegram's `callback_data` limit 和 保持 这个 Allow Always 操作 visible.",
      "Cron/exec timeouts: surface timed-out `exec` 和 `bash` failures 在 isolated cron 运行 even when `verbose: off`, including custom session-target cron jobs, 以便 scheduled 运行 stop failing silently.",
      "Telegram/exec approvals: fall back 到 这个 origin session key 用于 async approval followups 和 保持 resume-failure status delivery sanitized 以便 Telegram followups still land 无需 leaking raw exec metadata.",
      "node-host/exec approvals: bind `__PROTECTED_27__ dlx` invocations through 这个 approval planner's mutable-script path 以便 这个 effective runtime command 是 resolved 用于 approval instead 的 being left unbound.",
      "Exec/node hosts: stop forwarding 这个 gateway workspace cwd 到 remote node exec when no workdir was explicitly requested, 以便 cross-platform node approvals fall back 到 这个 node default cwd instead 的 failing 具有 `SYSTEM_RUN_DENIED`.",
      "Exec approvals/channels: decouple initiating-surface approval availability 从 native delivery enablement 以便 Telegram, Slack, 和 Discord still expose approvals when approvers exist 和 native target routing 是 configured separately."
    ]
  }
},
  {
  "version": "2026.4.1",
  "date": "2026-04-01",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Tasks/chat: 添加 `/tasks` as 一个 chat-native background task board 用于 这个 current session, 具有 recent task details 和 agent-local fallback counts when no linked tasks 是 visible. Related.",
      "Web search/SearXNG: 添加 这个 bundled SearXNG provider 插件 用于 `web_search` 具有 configurable host 支持.",
      "Amazon Bedrock/Guardrails: 添加 Bedrock Guardrails 支持 到 这个 bundled provider.",
      "macOS/Voice Wake: 添加 这个 Voice Wake option 到 trigger Talk Mode.",
      "Feishu/comments: 添加 一个 dedicated Drive comment-event 流程 具有 comment-thread context resolution, 在-thread replies, 和 `feishu_drive` comment 操作 用于 document collaboration 工作流. -01.",
      "gateway/webchat: make `__PROTECTED_51__.history` text truncation configurable 具有 `__PROTECTED_26__.webchat.chatHistoryMaxChars` 和 per-request `maxChars`, while preserving silent-Reply filtering 和 existing default payload limits.",
      "Agents/default params: 添加 `agents.defaults.params` 用于 global default provider parameters.",
      "Agents/failover: cap prompt-side 和 assistant-side 相同的-provider auth-配置文件 retries 用于 rate-limit failures before cross-provider 模型 fallback, 添加 这个 `__PROTECTED_21__.cooldowns.rateLimitedProfileRotations` knob, 和 document 这个 new fallback 行为.",
      "Cron/tools allowlist: 添加 `openclaw cron --tools` 用于 per-job tool allowlists. -ms.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing 和 Feishu scoped inheritance across bootstrap, 模型 override, restart, 和 tool-policy paths.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance 用于 agent reactions.",
      "Telegram/errors: 添加 configurable `errorPolicy` 和 `errorCooldownMs` 控制 以便 Telegram 可以 suppress repeated delivery errors per account, chat, 和 topic 无需 muting distinct failures. -amrutkar",
      "ZAI/模型: 添加 `glm-5.1` 和 `glm-5v-turbo` 到 这个 bundled Z.AI provider catalog.",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently 用于 manual `/compact` 和 other context-engine compaction paths, 以便 engine-owned compaction uses 这个 configured override 模型 across runtime entrypoints. -svg"
    ],
    "improvements": [],
    "bugfixes": [
      "chat/error replies: stop leaking raw provider/runtime failures into external chat channels, return 一个 friendly retry message instead, 和 添加 一个 specific `/new` 提示 用于 Bedrock toolResult/toolUse session mismatches.",
      "gateway/reload: ignore startup config writes 通过 persisted hash 在 这个 config reloader 以便 generated auth tokens 和 seeded Control 界面 origins do not trigger 一个 restart loop, while real `__PROTECTED_26__.__PROTECTED_21__.*` edits still req界面re restart.",
      "Tasks/gateway: 保持 这个 task registry maintenance sweep 从 stalling 这个 gateway event loop under synchronous SQLite pressure, 以便 upgraded gateways stop hanging about 一个 minute after startup.",
      "Tasks/status: hide stale completed background tasks 从 `/status` 和 `session_status`, prefer 实时的 task context, 和 show recent failures only when no active work remains.",
      "Tasks/gateway: re-check 这个 current task record before maintenance marks 运行 lost 或 prunes them, 以便 一个 task heartbeat 或 cleanup 更新 that lands during 一个 sweep no longer gets overwritten 通过 stale snapshot state.",
      "Exec/approvals: honor `exec-approvals.json` 安全 defaults when inline 或 configured tool policy 是 unset, 和 保持 Slack 和 Discord native approval handling aligned 具有 inferred approvers 和 real channel enablement 以便 remote exec stops falling into false approval timeouts 和 disabled states. 和 @vincentkoc.",
      "Exec/approvals: make `allow-always` persist as 持久的 user-approved trust instead 的 behaving like `allow-once`, reuse exact-command trust 在 shell-wrapper paths that cannot safely persist 一个 executable allowlist entry, 保持 static allowlist entries 从 silently bypassing `ask:\"always\"`, 和 req界面re 显式的 approval when Windows cannot b界面ld 一个 allowlist execution plan instead 的 hard-dead-ending remote exec. 和 @vincentkoc.",
      "Exec/cron: resolve isolated cron no-route approval dead-ends 从 这个 effective host fallback policy when trusted automation 是 allowed, 和 make `openclaw __PROTECTED_46__` warn when `tools.exec` 是 broader than `~/.openclaw/exec-approvals.json` 以便 stricter host-policy conflicts 是 显式的. 和 @vincentkoc.",
      "Sessions/model switching: keep `/model` changes queued behind busy runs instead of interrupting the active turn, and retarget queued followups so later work picks up the new model as soon as the current turn finishes.",
      "gateway/HTTP: skip failing HTTP request stages 以便 one broken facade no longer forces every HTTP endpoint 到 return 500.",
      "gateway/nodes: stop pinning 实时的 node commands 到 这个 approved node-pair record. node pairing remains 一个 trust/token 流程, while per-node `system.run` policy stays 在 that node's exec approvals config. 修复es.",
      "WebChat/exec approvals: use native approval 界面 g界面dance 在 agent system prompts instead 的 telling agents 到 paste manual `/approve` commands 在 webchat sessions.",
      "Web 界面/OpenResponses: preserve rewritten stream snapshots 在 webchat 和 保持 OpenResponses final streamed text aligned when 模型 rewind earlier output.",
      "Discord/inbound media: pass Discord attachment 和 sticker downloads through 这个 shared idle-timeout 和 worker-abort path 以便 slow 或 stuck inbound media fetches stop hanging message processing.",
      "Telegram/retries: 保持 non-idempotent sends 在 这个 strict 安全的-send path, retry wrapped pre-connect failures, 和 preserve `429` / `retry_after` backoff 用于 安全的 delivery retries. -amrutkar",
      "Telegram/exec approvals: route topic-aware exec approval followups through Telegram-owned threading 和 approval-target parsing, 以便 forum-topic approvals stay 在 这个 originating topic instead 的 falling back 到 这个 root chat.",
      "Telegram/local Bot API: preserve media MIME types for absolute-path downloads so local audio files still trigger transcription and other MIME-based handling. (#54603) Thanks @jzakirov",
      "Channels/WhatsApp: pass inbound message timestamp 到 模型 context 以便 这个 AI 可以 see when WhatsApp messages were sent.",
      "Channels/QQ Bot: 保持 `/bot-logs` export gated behind 一个 truly 显式的 QQBot allowlist, rejecting wildcard 和 mixed wildcard entries while preserving 这个 real framework command path.",
      "Channels/插件s: 保持 bundled channel 插件s loadable 从 legacy `channels.<id>` config even under restrictive 插件 allowlists, 和 make `openclaw __PROTECTED_46__` warn only 在 real 插件 blockers instead 的 misleading setup g界面dance.",
      "插件s/bundled runtimes: restore externalized bundled 插件 runtime dependency staging across packed installs, Docker b界面lds, 和 local runtime staging 以便 bundled 插件s 保持 their declared runtime deps after 这个 2026.3.31 externalization change.",
      "LINE/runtime: resolve 这个 packaged runtime contract 从 这个 b界面lt `dist/插件s/__PROTECTED_34__` layout 以便 LINE channels start correctly again after global npm installs 在 `2026.3.31`.",
      "MiniMax/插件s: auto-enable 这个 bundled MiniMax 插件 用于 API-key auth/config 以便 MiniMax image generation 和 other 插件-owned capabilities load 无需 manual 插件 allowlisting.",
      "Ollama/模型 picker: show only Ollama 模型 after provider 选择 在 这个 CLI picker.",
      "CDP/配置文件: prefer `cdpPort` over stale WebSocket URLs 以便 Browser automation reconnects cleanly.",
      "media/paths: resolve relative `__PROTECTED_42__` paths against 这个 agent workspace 以便 local attachment references 保持 working.",
      "Memory/session indexing: 保持 full reindexes 从 skipping session transcripts when sync 是 triggered 通过 `__PROTECTED_49__-start` 或 `watch`, 以便 restart-driven reindexes preserve session Memory.",
      "Memory/QMD: prefer `--mask` over `--glob` when creating QMD collections 以便 default Memory collections 保持 their intended patterns 和 stop colliding 在 restart.",
      "Subagents/tasks: 保持 subagent completion 和 cleanup 从 crashing when task-registry writes fail, 以便 一个 corrupt 或 missing task row no longer takes down 这个 gateway during lifecycle finalization.",
      "Sandbox/Browser: 比较 Browser runtime inspection against `agents.defaults.sandbox.__PROTECTED_30__.image` 以便 `openclaw sandbox list --__PROTECTED_30__` stops reporting healthy Browser containers as image mismatches.",
      "插件s/install: forward `--dangerously-force-unsafe-install` through archive 和 npm-spec 插件 installs 以便 这个 文档化的 override reaches 这个 安全 scanner 在 those install paths. -gemini.",
      "Auto-Reply/commands: strip inbound metadata before slash command detection 以便 wrapped `/model`, `/new`, 和 `/status` commands 是 recognized.",
      "Agents/Anthropic: preserve thinking blocks 和 signatures across replay, cache-Control patching, 和 context pruning 以便 compacted Anthropic sessions continue working instead 的 failing 在 later turns.",
      "Agents/failover: unify 结构化的 和 raw provider error classification 以便 provider-specific `400`/`422` payloads no longer get forced into generic format failures before retry, billing, 或 compaction logic 可以 inspect them. -he-zhu.",
      "auth 配置文件/store: coerce misplaced SecretRef objects out 的 plaintext `key` 和 `token` fields during store load 以便 agents 无需 ACP runtime stop crashing 在 `.trim()` after upgrade.",
      "ACPX/runtime: repair `queue owner unavailable` session recovery 通过 replacing dead named sessions 和 resuming 这个 backend session when ACPX exposes 一个 stable session id, 以便 这个 first ACP prompt no longer inherits 一个 dead handle.",
      "ACPX/runtime: retry dead-session queue-owner repair 无需 `--resume-__PROTECTED_49__` when 这个 reported ACPX session id 是 stale, 以便 recovery still creates 一个 fresh named session instead 的 failing session init.",
      "auth/OpenAI Codex: persist 插件-refreshed OAuth credentials 到 `__PROTECTED_21__-profiles.json` before returning them, 以便 rotated Codex refresh tokens survive restart 和 stop falling into `refresh_token_reused` loops.",
      "Discord/gateway: hand reconnect ownership back 到 Carbon, 保持 runtime status aligned 具有 close/reconnect state, 和 force-stop sockets that open 无需 reaching READY 以便 Discord monitors recover promptly instead 的 waiting 在 stale health timeouts.",
      "config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\"*\"].req界面reMention` 在 load 以便 legacy configs no longer crash at startup. thanks @jameslcowan."
    ]
  }
},
  {
  "version": "2026.4.1-beta.1",
  "date": "2026-04-01",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "Tasks/chat: 添加 `/tasks` as 一个 chat-native background task board 用于 这个 current session, 具有 recent task details 和 agent-local fallback counts when no linked tasks 是 visible. Related.",
      "Web search/SearXNG: 添加 这个 bundled SearXNG provider 插件 用于 `web_search` 具有 configurable host 支持.",
      "Amazon Bedrock/Guardrails: 添加 Bedrock Guardrails 支持 到 这个 bundled provider.",
      "macOS/Voice Wake: 添加 这个 Voice Wake option 到 trigger Talk Mode.",
      "Feishu/comments: 添加 一个 dedicated Drive comment-event 流程 具有 comment-thread context resolution, 在-thread replies, 和 `feishu_drive` comment 操作 用于 document collaboration 工作流. -01.",
      "gateway/webchat: make `__PROTECTED_51__.history` text truncation configurable 具有 `__PROTECTED_26__.webchat.chatHistoryMaxChars` 和 per-request `maxChars`, while preserving silent-Reply filtering 和 existing default payload limits.",
      "Agents/default params: 添加 `agents.defaults.params` 用于 global default provider parameters.",
      "Agents/failover: cap prompt-side 和 assistant-side 相同的-provider auth-配置文件 retries 用于 rate-limit failures before cross-provider 模型 fallback, 添加 这个 `__PROTECTED_21__.cooldowns.rateLimitedProfileRotations` knob, 和 document 这个 new fallback 行为.",
      "Cron/tools allowlist: 添加 `openclaw cron --tools` 用于 per-job tool allowlists. -ms.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing 和 Feishu scoped inheritance across bootstrap, 模型 override, restart, 和 tool-policy paths.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance 用于 agent reactions.",
      "Telegram/errors: 添加 configurable `errorPolicy` 和 `errorCooldownMs` 控制 以便 Telegram 可以 suppress repeated delivery errors per account, chat, 和 topic 无需 muting distinct failures. -amrutkar",
      "ZAI/模型: 添加 `glm-5.1` 和 `glm-5v-turbo` 到 这个 bundled Z.AI provider catalog.",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently 用于 manual `/compact` 和 other context-engine compaction paths, 以便 engine-owned compaction uses 这个 configured override 模型 across runtime entrypoints. -svg"
    ],
    "improvements": [],
    "bugfixes": [
      "chat/error replies: stop leaking raw provider/runtime failures into external chat channels, return 一个 friendly retry message instead, 和 添加 一个 specific `/new` 提示 用于 Bedrock toolResult/toolUse session mismatches.",
      "gateway/reload: ignore startup config writes 通过 persisted hash 在 这个 config reloader 以便 generated auth tokens 和 seeded Control 界面 origins do not trigger 一个 restart loop, while real `__PROTECTED_26__.__PROTECTED_21__.*` edits still req界面re restart.",
      "Tasks/gateway: 保持 这个 task registry maintenance sweep 从 stalling 这个 gateway event loop under synchronous SQLite pressure, 以便 upgraded gateways stop hanging about 一个 minute after startup.",
      "Tasks/status: hide stale completed background tasks 从 `/status` 和 `session_status`, prefer 实时的 task context, 和 show recent failures only when no active work remains.",
      "Tasks/gateway: re-check 这个 current task record before maintenance marks 运行 lost 或 prunes them, 以便 一个 task heartbeat 或 cleanup 更新 that lands during 一个 sweep no longer gets overwritten 通过 stale snapshot state.",
      "Exec/approvals: honor `exec-approvals.json` 安全 defaults when inline 或 configured tool policy 是 unset, 和 保持 Slack 和 Discord native approval handling aligned 具有 inferred approvers 和 real channel enablement 以便 remote exec stops falling into false approval timeouts 和 disabled states. 和 @vincentkoc.",
      "Exec/approvals: make `allow-always` persist as 持久的 user-approved trust instead 的 behaving like `allow-once`, reuse exact-command trust 在 shell-wrapper paths that cannot safely persist 一个 executable allowlist entry, 保持 static allowlist entries 从 silently bypassing `ask:\"always\"`, 和 req界面re 显式的 approval when Windows cannot b界面ld 一个 allowlist execution plan instead 的 hard-dead-ending remote exec. 和 @vincentkoc.",
      "Exec/cron: resolve isolated cron no-route approval dead-ends 从 这个 effective host fallback policy when trusted automation 是 allowed, 和 make `openclaw __PROTECTED_46__` warn when `tools.exec` 是 broader than `~/.openclaw/exec-approvals.json` 以便 stricter host-policy conflicts 是 显式的. 和 @vincentkoc.",
      "Sessions/model switching: keep `/model` changes queued behind busy runs instead of interrupting the active turn, and retarget queued followups so later work picks up the new model as soon as the current turn finishes.",
      "gateway/HTTP: skip failing HTTP request stages 以便 one broken facade no longer forces every HTTP endpoint 到 return 500.",
      "gateway/nodes: stop pinning 实时的 node commands 到 这个 approved node-pair record. node pairing remains 一个 trust/token 流程, while per-node `system.run` policy stays 在 that node's exec approvals config. 修复es.",
      "WebChat/exec approvals: use native approval 界面 g界面dance 在 agent system prompts instead 的 telling agents 到 paste manual `/approve` commands 在 webchat sessions.",
      "Web 界面/OpenResponses: preserve rewritten stream snapshots 在 webchat 和 保持 OpenResponses final streamed text aligned when 模型 rewind earlier output.",
      "Discord/inbound media: pass Discord attachment 和 sticker downloads through 这个 shared idle-timeout 和 worker-abort path 以便 slow 或 stuck inbound media fetches stop hanging message processing.",
      "Telegram/retries: 保持 non-idempotent sends 在 这个 strict 安全的-send path, retry wrapped pre-connect failures, 和 preserve `429` / `retry_after` backoff 用于 安全的 delivery retries. -amrutkar",
      "Telegram/exec approvals: route topic-aware exec approval followups through Telegram-owned threading 和 approval-target parsing, 以便 forum-topic approvals stay 在 这个 originating topic instead 的 falling back 到 这个 root chat.",
      "Telegram/local Bot API: preserve media MIME types for absolute-path downloads so local audio files still trigger transcription and other MIME-based handling. (#54603) Thanks @jzakirov",
      "Channels/WhatsApp: pass inbound message timestamp 到 模型 context 以便 这个 AI 可以 see when WhatsApp messages were sent.",
      "Channels/QQ Bot: 保持 `/bot-logs` export gated behind 一个 truly 显式的 QQBot allowlist, rejecting wildcard 和 mixed wildcard entries while preserving 这个 real framework command path.",
      "Channels/插件s: 保持 bundled channel 插件s loadable 从 legacy `channels.<id>` config even under restrictive 插件 allowlists, 和 make `openclaw __PROTECTED_46__` warn only 在 real 插件 blockers instead 的 misleading setup g界面dance.",
      "插件s/bundled runtimes: restore externalized bundled 插件 runtime dependency staging across packed installs, Docker b界面lds, 和 local runtime staging 以便 bundled 插件s 保持 their declared runtime deps after 这个 2026.3.31 externalization change.",
      "LINE/runtime: resolve 这个 packaged runtime contract 从 这个 b界面lt `dist/插件s/__PROTECTED_34__` layout 以便 LINE channels start correctly again after global npm installs 在 `2026.3.31`.",
      "MiniMax/插件s: auto-enable 这个 bundled MiniMax 插件 用于 API-key auth/config 以便 MiniMax image generation 和 other 插件-owned capabilities load 无需 manual 插件 allowlisting.",
      "Ollama/模型 picker: show only Ollama 模型 after provider 选择 在 这个 CLI picker.",
      "CDP/配置文件: prefer `cdpPort` over stale WebSocket URLs 以便 Browser automation reconnects cleanly.",
      "media/paths: resolve relative `__PROTECTED_42__` paths against 这个 agent workspace 以便 local attachment references 保持 working.",
      "Memory/session indexing: 保持 full reindexes 从 skipping session transcripts when sync 是 triggered 通过 `__PROTECTED_49__-start` 或 `watch`, 以便 restart-driven reindexes preserve session Memory.",
      "Memory/QMD: prefer `--mask` over `--glob` when creating QMD collections 以便 default Memory collections 保持 their intended patterns 和 stop colliding 在 restart.",
      "Subagents/tasks: 保持 subagent completion 和 cleanup 从 crashing when task-registry writes fail, 以便 一个 corrupt 或 missing task row no longer takes down 这个 gateway during lifecycle finalization.",
      "Sandbox/Browser: 比较 Browser runtime inspection against `agents.defaults.sandbox.__PROTECTED_30__.image` 以便 `openclaw sandbox list --__PROTECTED_30__` stops reporting healthy Browser containers as image mismatches.",
      "插件s/install: forward `--dangerously-force-unsafe-install` through archive 和 npm-spec 插件 installs 以便 这个 文档化的 override reaches 这个 安全 scanner 在 those install paths. -gemini.",
      "Auto-Reply/commands: strip inbound metadata before slash command detection 以便 wrapped `/model`, `/new`, 和 `/status` commands 是 recognized.",
      "Agents/Anthropic: preserve thinking blocks 和 signatures across replay, cache-Control patching, 和 context pruning 以便 compacted Anthropic sessions continue working instead 的 failing 在 later turns.",
      "Agents/failover: unify 结构化的 和 raw provider error classification 以便 provider-specific `400`/`422` payloads no longer get forced into generic format failures before retry, billing, 或 compaction logic 可以 inspect them. -he-zhu.",
      "auth 配置文件/store: coerce misplaced SecretRef objects out 的 plaintext `key` 和 `token` fields during store load 以便 agents 无需 ACP runtime stop crashing 在 `.trim()` after upgrade.",
      "ACPX/runtime: repair `queue owner unavailable` session recovery 通过 replacing dead named sessions 和 resuming 这个 backend session when ACPX exposes 一个 stable session id, 以便 这个 first ACP prompt no longer inherits 一个 dead handle.",
      "ACPX/runtime: retry dead-session queue-owner repair 无需 `--resume-__PROTECTED_49__` when 这个 reported ACPX session id 是 stale, 以便 recovery still creates 一个 fresh named session instead 的 failing session init.",
      "auth/OpenAI Codex: persist 插件-refreshed OAuth credentials 到 `__PROTECTED_21__-profiles.json` before returning them, 以便 rotated Codex refresh tokens survive restart 和 stop falling into `refresh_token_reused` loops.",
      "Discord/gateway: hand reconnect ownership back 到 Carbon, 保持 runtime status aligned 具有 close/reconnect state, 和 force-stop sockets that open 无需 reaching READY 以便 Discord monitors recover promptly instead 的 waiting 在 stale health timeouts."
    ]
  }
},
  {
  "version": "2026.3.31",
  "date": "2026-03-31",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "ACP/插件s: 添加 一个 显式的 default-off ACPX 插件-tools MCP bridge config, document 这个 trust boundary, 和 harden 这个 b界面lt-在 bridge packaging/logging path 以便 global installs 和 stdio MCP sessions work reliably.",
      "Agents/LLM: 添加 一个 configurable idle-stream timeout 用于 embedded runner requests 以便 stalled 模型 streams abort cleanly instead 的 hanging 直到 这个 broader 运行 timeout fires.",
      "Agents/MCP: materialize bundle MCP tools 具有 provider-安全的 names (`serverName__toolName`), 支持 optional `streamable-http` transport 选择 plus per-server connection timeouts, 和 preserve real tool results 从 aborted/error turns unless truncation explicitly drops them.",
      "Android/notifications: 添加 notification-forwarding 控制 具有 package filtering, q界面et hours, rate limiting, 和 safer picker 行为 用于 forwarded notification events.",
      "Background tasks: turn tasks into 一个 real shared background-运行 Control plane instead 的 ACP-only bookkeeping 通过 unifying ACP, subagent, cron, 和 background CLI execution under one SQLite-backed ledger, routing detached lifecycle 更新s through 这个 executor seam, 添加ing audit/maintenance/status visibility, tightening auto-cleanup 和 lost-运行 recovery, improving task awareness 在 internal status/tool surfaces, 和 clarifying 这个 split between heartbeat/main-session automation 和 detached scheduled 运行. 和 @vincentkoc.",
      "Background tasks: 添加 这个 first linear task 流程 Control surface 具有 `openclaw flows list|show|cancel`, 保持 manual multi-task 流程 separate 从 one-task auto-sync 流程, 和 surface doctor recovery 提示 用于 obviously orphaned 或 broken 流程/task linkage. 和 @vincentkoc.",
      "Channels/QQ Bot: 添加 QQ Bot as 一个 bundled channel 插件 具有 multi-account setup, SecretRef-aware credentials, slash commands, reminders, 和 media send/receive 支持.",
      "Diffs: skip unused viewer-versus-file SSR preload work 以便 `diffs` 视图-only 和 file-only 运行 do less render work while keeping mode outputs aligned. thanks @gumadeiras.",
      "Tasks: 添加 一个 minimal SQLite-backed task 流程 registry plus task-到-流程 linkage scaffolding, 以便 orchestrated work 可以 start gaining 一个 first-class parent record 无需 changing current task delivery 行为. 和 @vincentkoc.",
      "Tasks: persist blocked state 在 one-task task 流程 和 let 这个 相同的 流程 reopen cleanly 在 retry, 以便 blocked detached work 可以 carry 一个 parent-level reason 和 continue 无需 fragmenting into 一个 new job. 和 @vincentkoc.",
      "Tasks: route one-task ACP 和 subagent 更新s through 一个 parent task-流程 owner context, 以便 detached work 可以 emerge back through 这个 intended parent thread/session instead 的 speaking only as 一个 raw child task. 和 @vincentkoc.",
      "LINE/outbound media: 添加 LINE image, video, 和 audio outbound sends 在 这个 LINE-specific delivery path, including 显式的 preview/tracking handling 用于 videos while keeping generic media sends 在 这个 existing image-only route.",
      "Matrix/history: 添加 optional room history context 用于 Matrix group triggers via `channels.__PROTECTED_39__.historyLimit`, 具有 per-agent watermarks 和 retry-安全的 snapshots 以便 failed trigger retries do not drift into newer room messages. thanks @chain710.",
      "Matrix/network: 添加 显式的 `channels.__PROTECTED_39__.proxy` config 用于 routing Matrix traffic through 一个 HTTP(S) proxy, including account-level overrides 和 matching probe/runtime 行为. thanks @patrick-yingxi-pan.",
      "Matrix/streaming: 添加 draft streaming 以便 partial Matrix replies 更新 这个 相同的 message 在 place instead 的 sending 一个 new message 用于 each chunk.",
      "Matrix/threads: 添加 per-DM `threadReplies` overrides 和 保持 thread session isolation aligned 具有 这个 effective room 或 DM thread policy 从 这个 triggering message onward. thanks @teconomix.",
      "MCP: 添加 remote HTTP/SSE server 支持 用于 `mcp.servers` URL configs, including auth headers 和 safer config redaction 用于 MCP credentials.",
      "Memory/QMD: 添加 per-agent `memorySearch.qmd.extraCollections` 以便 agents 可以 opt into cross-agent session search 无需 flattening every transcript collection into one shared QMD namespace.",
      "Microsoft Teams/member info: 添加 一个 Graph-backed member info 操作 以便 Teams automations 和 tools 可以 resolve channel member details directly 从 Microsoft Graph. -codes.",
      "Nostr/inbound DMs: verify inbound event signatures before pairing 或 sender-authorization side effects, 以便 forged DM events no longer create pairing requests 或 trigger Reply attempts. 和 @vincentkoc.",
      "OpenAI/Responses: forward configured `__PROTECTED_58__.verbosity` across Responses HTTP 和 WebSocket transports, surface it 在 `/status`, 和 保持 per-agent verbosity precedence aligned 具有 runtime 行为. 和 @vincentkoc.",
      "Pi/Codex: 添加 native Codex web search 支持 用于 embedded Pi 运行, including config/docs/wizard coverage 和 managed-tool suppression when native Codex search 是 active.",
      "Slack/exec approvals: 添加 native Slack approval routing 和 approver authorization 以便 exec approval prompts 可以 stay 在 Slack instead 的 falling back 到 这个 Web 界面 或 terminal.",
      "TTS: 添加 结构化的 provider diagnostics 和 fallback attempt analytics.",
      "WhatsApp/reactions: agents 可以 now react 具有 emoji 在 incoming WhatsApp messages, enabling more natural conversational interactions like acknowledging 一个 photo 具有 ❤️ instead 的 typing 一个 Reply.",
      "Agents/BTW: force `/btw` side questions 到 disable provider reasoning 以便 Anthropic adaptive-thinking sessions stop failing 具有 `No BTW response generated`. 修复es. 和 @vincentkoc.",
      "CLI/onboarding: 重置 这个 remote gateway URL prompt 到 这个 安全的 loopback default after declining 一个 discovered endpoint, 以便 onboarding does not 保持 一个 previously rejected remote URL.",
      "Agents/exec defaults: honor per-agent `tools.exec` defaults when no inline directive 或 session override 是 present, 以便 configured exec host, 安全, ask, 和 node settings actually apply.",
      "Sandbox/networking: sanitize SSH subprocess env vars through 这个 shared sandbox policy 和 route marketplace archive downloads plus Ollama discovery, auth, 和 pull requests through 这个 guarded fetch path 以便 sandboxed execution 和 remote fetches follow 这个 repo's trust boundaries. ()"
    ],
    "improvements": [
      "Nodes/exec: 移除 这个 duplicated `nodes.run` shell wrapper 从 这个 CLI 和 agent `nodes` tool 以便 node shell execution always goes through `exec host=__PROTECTED_67__`, keeping node-specific capabilities 在 `nodes invoke` 和 这个 dedicated media/location/notify 操作.",
      "插件 SDK: deprecate 这个 legacy provider compat subpaths plus 这个 older bundled provider setup 和 channel-runtime 兼容性 shims, emit migration warnings, 和 保持 这个 current 文档化的 `openclaw/插件-sdk/*` entrypoints plus local `__PROTECTED_22__.ts` / `__PROTECTED_34__-__PROTECTED_22__.ts` barrels as 这个 forward path ahead 的 一个 future major-release removal.",
      "Skills/install 和 插件s/install: b界面lt-在 dangerous-code `critical` findings 和 install-time scan failures now fail closed 通过 default, 以便 插件 installs 和 gateway-backed skill dependency installs that previously succeeded may now req界面re 一个 显式的 dangerous override such as `--dangerously-force-unsafe-install` 到 proceed.",
      "gateway/auth: `trusted-proxy` now rejects mixed shared-token configs, 和 local-direct fallback req界面res 这个 configured token instead 的 implicitly authenticating 相同的-host callers. -agent, @jacobtomlinson, 和 @vincentkoc.",
      "gateway/node commands: node commands now stay disabled 直到 node pairing 是 approved, 以便 device pairing alone 是 no longer enough 到 expose declared node commands.",
      "gateway/node events: node-originated 运行 now stay 在 一个 reduced trusted surface, 以便 notification-driven 或 node-triggered 流程 that previously relied 在 broader host/session tool access may need adjustment."
    ],
    "bugfixes": [
      "Slack: stop retry-driven duplicate replies when draft-finalization edits fail ambiguously, 和 log configured allowlisted users/channels 通过 readable name instead 的 raw IDs.",
      "Agents/OpenAI Responses: normalize raw bundled MCP tool schemas 在 这个 WebSocket/Responses path 以便 bare-object, object-ish, 和 top-level union MCP tools no longer get rejected 通过 OpenAI during tool registration.",
      "ACP/安全: replace ACP's dangerous-tool name override 具有 semantic approval classes, 以便 only narrow readonly reads/searches 可以 auto-approve while indirect exec-capable 和 Control-plane tools always req界面re 显式的 prompt approval.",
      "ACP/sessions_spawn: register ACP child 运行 用于 completion tracking 和 lifecycle cleanup, 和 make registration-failure cleanup explicitly best-effort 以便 callers do not assume 一个 already-started ACP turn was fully aborted. 和 @vincentkoc.",
      "ACP/tasks: mark cleanly exited ACP 运行 as blocked when they end 在 deterministic write 或 authorization blockers, 和 wake 这个 parent session 具有 一个 follow-up instead 的 falsely reporting success.",
      "ACPX/runtime: derive the bundled ACPX expected version from the extension package metadata instead of hardcoding a separate literal, so 插件-local ACPX installs stop drifting out of health-check parity after version bumps. (#49089) Thanks @jiejiesks and @vincentkoc.",
      "Agents/Anthropic failover: treat Anthropic `API_error` payloads 具有 `An unexpected error occurred while processing the response` as transient 以便 retry/fallback 可以 engage instead 的 surfacing 一个 terminal failure. 和 @vincentkoc.",
      "Agents/compaction: 保持 late compaction-retry completions 从 double-resolving finished compaction futures, 以便 interrupted 或 timed-out compactions stop surfacing spurious second-completion races.",
      "Agents/disabled providers: make disabled providers disappear 从 default 模型 选择 和 embedded provider fallback, while letting explicitly pinned disabled providers fail 具有 一个 清除 config error instead 的 silently taking traffic. -dev 和 @vincentkoc.",
      "Agents/OAuth output: force exec-host OAuth output readers through 这个 gateway fs policy 以便 embedded gateway 运行 stop crashing when provider auth writes land outside 这个 current sandbox workspace.",
      "Agents/system prompt: 修复 `agent.name` interpolation 在 这个 embedded runtime system prompt 和 make provider/模型 fallback text reflect 这个 effective runtime 选择 after start. 和 @vincentkoc.",
      "Android/device info: read the app's version metadata from the package manager instead of hidden APIs so Android 15+ onboarding and device info no longer fail to compile or report placeholder values. (#58126) Thanks @L3ER0Y.",
      "Android/pairing: stop appending duplicate push receiver entries 到 `__PROTECTED_26__-service.conf` 在 repeated QR pairing 和 保持 push registration bounded 到 这个 current successful pairing, 以便 Android push delivery stays healthy across re-pair 和 token rotation.",
      "App install smoke: pin the latest-release lookup to `latest`, cache the first stable install version across the rerun, and relax prerelease package assertions so the Parallels smoke lane can validate stable-to-main upgrades even when `beta` moves ahead or the guest starts from an older stable. (#58177) Thanks @vincentkoc.",
      "auth/配置文件: 保持 这个 last successful config load 在 Memory 用于 这个 running process 和 refresh that snapshot 在 successful writes/reloads, 以便 hot paths stop reparsing `openclaw.json` between watcher-driven swaps.",
      "config/SecretRef + Control 界面: harden SecretRef redaction round-trip restore, block unsafe raw fallback (force Form mode when raw 是 unavailable), 和 preflight submitted-config SecretRefs before config write RPC persistence.",
      "config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\\\"*\\\"].req界面reMention` 在 load 以便 legacy configs no longer crash at startup. thanks @jameslcowan.",
      "config/更新: stop `openclaw __PROTECTED_46__` write-backs 从 persisting 插件-injected channel defaults, 以便 `openclaw 更新` no longer seeds config keys that later break service refresh validation.",
      "Control 界面/agents: auto-load agent workspace files 在 initial files panel open, 和 populate overview 模型/workspace/fallbacks 从 effective runtime agent metadata 以便 defaulted 模型 no longer show as `Not set`.",
      "Control 界面/slash commands: make `/steer` 和 `/redirect` work 从 这个 chat command palette 具有 visible pending state 用于 active-运行 `/steer`, correct redirected-运行 tracking, 和 一个 single canonical `/steer` entry 在 这个 command menu. -栈-dev.",
      "Cron/announce: preserve all deliverable text payloads 用于 announce mode instead 的 collapsing 到 这个 last chunk, 以便 multi-line cron 报告 deliver 在 full 到 Telegram forum topics.",
      "Cron/isolated sessions: carry 这个 full 实时的-session provider, 模型, 和 auth-配置文件 选择 across retry restarts 以便 cron jobs 具有 模型 overrides no longer fail 或 loop 在 mid-运行 模型-switch requests.",
      "Diffs/config: preserve schema-shaped 插件 config parsing 从 `diffs插件ConfigSchema.safeParse()`, 以便 direct callers 保持 `defaults` 和 `安全` sections instead 的 receiving flattened tool defaults.",
      "Diffs: fall back 到 plain text when `lang` 提示 是 invalid during diff render 和 viewer hydration, 以便 bad 或 stale language values no longer break 这个 diff viewer.",
      "Discord/voice: enforce 这个 相同的 g界面ld channel 和 member allowlist checks 在 spoken voice ingress before transcription, 以便 joined voice channels no longer accept speech 从 users outside 这个 configured Discord access policy. 和 @vincentkoc.",
      "Docker/setup: force B界面ldKit 用于 local image b界面lds (including sandbox image b界面lds) 以便 `./docker-setup.sh` no longer fails 在 `RUN --mount=...` when hosts default 到 Docker's legacy b界面lder. 界面-china.",
      "Docs/anchors: 修复 broken English docs links 和 make Mint anchor audits 运行 against 这个 English-source docs tree. thanks @velvet-shark.",
      "doctor/插件s: skip false Matrix legacy-helper warnings when no migration plans exist, 和 保持 bundled `enabledByDefault` 插件s 在 这个 gateway startup set.",
      "Exec approvals/macOS: unwrap `arch` 和 `xcrun` before deriving shell payloads 和 allow-always patterns, 以便 wrapper approvals stay bound 到 这个 carried command instead 的 这个 outer carrier. 和 @vincentkoc.",
      "Exec approvals: unwrap `caffeinate` and `sandbox-exec` before persisting allow-always trust so later shell payload changes still req界面re a fresh approval. Thanks @tdjackey and @vincentkoc.",
      "Exec/approvals: infer Discord 和 Telegram exec approvers 从 existing owner config when `execApprovals.approvers` 是 unset, extend 这个 default approval window 到 30 minutes, 和 clarify approval-unavailable g界面dance 以便 approvals do not appear 到 silently disappear.",
      "Pi/T界面: flush message-boundary replies at `message_end` 以便 turns stop looking stuck 直到 这个 下一个 nudge when 这个 final Reply was already ready.",
      "Exec/approvals: 保持 `awk` 和 `sed` family binaries out 的 这个 low-risk `safeBins` fast path, 和 stop doctor 配置文件 scaffolding 从 treating them like ordinary custom filters.",
      "Exec/env: block proxy, TLS, 和 Docker endpoint env overrides 在 host execution 以便 request-scoped commands cannot silently reroute outbound traffic 或 trust attacker-supplied certificate settings. 安全lab.",
      "Exec/env: block Python package index override 变量 从 request-scoped host exec environment sanitization 以便 package fetches cannot be redirected through 一个 caller-supplied index. 和 @vincentkoc.",
      "Exec/node: stop gateway-side workdir fallback 从 rewriting 显式的 `host=__PROTECTED_67__` cwd values 到 这个 gateway filesystem, 以便 remote node exec approval 和 运行 保持 using 这个 intended node-local directory.",
      "Exec/runtime: default implicit exec 到 `host=auto`, resolve that target 到 sandbox only when 一个 sandbox runtime exists, 保持 显式的 `host=sandbox` fail-closed 无需 sandbox, 和 show `/exec` effective host state 在 runtime status/docs.",
      "Exec: fail closed when 这个 implicit sandbox host has no sandbox runtime, 和 stop denied async approval followups 从 reusing prior command output 从 这个 相同的 session.",
      "Feishu/groups: 保持 quoted replies 和 topic bootstrap context aligned 具有 group sender allowlists 以便 only allowlisted thread messages seed agent context. 安全lab 和 @vincentkoc.",
      "gateway/attachments: offload large inbound images 无需 leaking `__PROTECTED_42__://` markers into text-only 运行, preserve mixed attachment order 用于 模型 input/transcripts, 和 fail closed when 模型 image capability cannot be resolved.",
      "Gateway/auth: keep shared-auth rate limiting active during WebSocket handshake attempts even when callers also send device-token candidates, so bogus device-token fields no longer suppress shared-secret brute-force tracking. Thanks @kexinoh and @vincentkoc.",
      "gateway/auth: reject mismatched Browser `Origin` headers 在 trusted-proxy HTTP operator requests while keeping origin-less headless proxy clients working. 安全lab 和 @vincentkoc.",
      "gateway/device tokens: disconnect active device sessions after token rotation 以便 newly rotated credentials revoke existing 实时的 connections immediately instead 的 waiting 用于 those sockets 到 close naturally. 和 @vincentkoc.",
      "gateway/health: carry webhook-vs-polling account mode 从 channel descriptors into runtime snapshots 以便 passive channels like LINE 和 BlueBubbles skip false stale-socket health failures. 界面-u.",
      "gateway/pairing: restore QR bootstrap onboarding handoff 以便 fresh `/pair __PROTECTED_61__` iPhone setup 可以 auto-approve 这个 initial node pairing, receive 一个 reusable node device token, 和 stop retrying 具有 spent bootstrap auth.",
      "gateway/OpenAI 兼容性: accept flat Responses API function tool definitions 在 `/v1/responses` 和 preserve `strict` when normalizing hosted tools into 这个 embedded runner, 以便 spec-compliant clients like Codex no longer fail validation 或 silently lose strict tool enforcement. 和 @vincentkoc.",
      "gateway/OpenAI HTTP: restore default operator scopes 用于 bearer-authenticated requests that omit `x-openclaw-scopes`, 以便 headless `/v1/__PROTECTED_51__/completions` 和 session-history callers work again after 这个 recent method-scope hardening.",
      "gateway/插件s: scope 插件-auth HTTP route runtime clients 到 read-only access 和 保持 gateway-authenticated 插件 routes 在 write scope, 以便 插件-owned webhook handlers do not inherit write-capable runtime access 通过 default. 和 @vincentkoc.",
      "gateway/SecretRef: resolve restart token drift checks 具有 merged service/runtime env sources 和 hard-fail un支持ed mutable SecretRef plus OAuth-配置文件 combinations 以便 restart warnings 和 policy enforcement match runtime 行为.",
      "gateway/tools HTTP: tighten HTTP tool-invoke authorization 以便 owner-only tools stay off HTTP invoke paths.",
      "Harden async approval followup delivery 在 webchat-only sessions",
      "Heartbeat/auth: prevent exec-event heartbeat 运行 从 inheriting owner-only tool access 从 这个 session delivery target, 以便 node exec output stays 在 这个 non-owner tool surface even when 这个 target session belongs 到 这个 owner. 安全lab 和 @vincentkoc.",
      "Hooks/config: accept runtime channel 插件 ids 在 `hooks.mappings[].channel` (用于 example `feishu`) instead 的 rejecting non-core channels during config validation.",
      "Hooks/session routing: rebind hook-triggered `agent:` session keys 到 这个 actual target agent before isolated dispatch 以便 dedicated hook agents 保持 their own session-scoped tool 和 插件 identity. 和 @vincentkoc.",
      "Host exec/env: block 添加itional request-scoped env overrides that 可以 redirect Docker endpoints, trust roots, compiler include paths, package resolution, 或 Python environment roots during approved host 运行. 和 @vincentkoc.",
      "Image generation/b界面ld: write stable runtime 别名 files into `dist/` 和 route provider-auth runtime lookups through those 别名 以便 image-generation providers 保持 resolving auth/runtime modules after reb界面lds instead 的 crashing 在 missing hashed chunk files.",
      "iOS/实时的 Activities: mark 这个 `ActivityKit` import 在 `LiveActivityManager.swift` as `@preconcurrency` 以便 Xcode 26.4 / Swift 6 b界面lds stop failing 在 strict concurrency checks.",
      "LINE/ACP: 添加 current-conversation binding 和 inbound binding-routing parity 以便 `/acp spawn ... --thread here`, configured ACP bindings, 和 active conversation-bound ACP sessions work 在 LINE like 这个 other conversation channels.",
      "LINE/markdown: preserve underscores inside Latin, Cyrillic, 和 CJK words when stripping markdown, while still removing standalone `_italic_` markers 在 这个 shared text-runtime path used 通过 LINE 和 TTS.",
      "Agents/failover: make overloaded 相同的-provider retry count 和 retry delay configurable via `__PROTECTED_21__.cooldowns`, default 到 one retry 具有 no delay, 和 document 这个 模型-fallback 行为."
    ]
  }
},
  {
  "version": "2026.3.31-beta.1",
  "date": "2026-03-31",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "ACP/插件s: 添加 一个 显式的 default-off ACPX 插件-tools MCP bridge config, document 这个 trust boundary, 和 harden 这个 b界面lt-在 bridge packaging/logging path 以便 global installs 和 stdio MCP sessions work reliably.",
      "Agents/LLM: 添加 一个 configurable idle-stream timeout 用于 embedded runner requests 以便 stalled 模型 streams abort cleanly instead 的 hanging 直到 这个 broader 运行 timeout fires.",
      "Agents/MCP: materialize bundle MCP tools 具有 provider-安全的 names (`serverName__toolName`), 支持 optional `streamable-http` transport 选择 plus per-server connection timeouts, 和 preserve real tool results 从 aborted/error turns unless truncation explicitly drops them.",
      "Android/notifications: 添加 notification-forwarding 控制 具有 package filtering, q界面et hours, rate limiting, 和 safer picker 行为 用于 forwarded notification events.",
      "Background tasks: turn tasks into 一个 real shared background-运行 Control plane instead 的 ACP-only bookkeeping 通过 unifying ACP, subagent, cron, 和 background CLI execution under one SQLite-backed ledger, routing detached lifecycle 更新s through 这个 executor seam, 添加ing audit/maintenance/status visibility, tightening auto-cleanup 和 lost-运行 recovery, improving task awareness 在 internal status/tool surfaces, 和 clarifying 这个 split between heartbeat/main-session automation 和 detached scheduled 运行. 和 @vincentkoc.",
      "Background tasks: 添加 这个 first linear task 流程 Control surface 具有 `openclaw flows list|show|cancel`, 保持 manual multi-task 流程 separate 从 one-task auto-sync 流程, 和 surface doctor recovery 提示 用于 obviously orphaned 或 broken 流程/task linkage. 和 @vincentkoc.",
      "Channels/QQ Bot: 添加 QQ Bot as 一个 bundled channel 插件 具有 multi-account setup, SecretRef-aware credentials, slash commands, reminders, 和 media send/receive 支持.",
      "Diffs: skip unused viewer-versus-file SSR preload work 以便 `diffs` 视图-only 和 file-only 运行 do less render work while keeping mode outputs aligned. thanks @gumadeiras.",
      "Tasks: 添加 一个 minimal SQLite-backed task 流程 registry plus task-到-流程 linkage scaffolding, 以便 orchestrated work 可以 start gaining 一个 first-class parent record 无需 changing current task delivery 行为. 和 @vincentkoc.",
      "Tasks: persist blocked state 在 one-task task 流程 和 let 这个 相同的 流程 reopen cleanly 在 retry, 以便 blocked detached work 可以 carry 一个 parent-level reason 和 continue 无需 fragmenting into 一个 new job. 和 @vincentkoc.",
      "Tasks: route one-task ACP 和 subagent 更新s through 一个 parent task-流程 owner context, 以便 detached work 可以 emerge back through 这个 intended parent thread/session instead 的 speaking only as 一个 raw child task. 和 @vincentkoc.",
      "LINE/outbound media: 添加 LINE image, video, 和 audio outbound sends 在 这个 LINE-specific delivery path, including 显式的 preview/tracking handling 用于 videos while keeping generic media sends 在 这个 existing image-only route.",
      "Matrix/history: 添加 optional room history context 用于 Matrix group triggers via `channels.__PROTECTED_39__.historyLimit`, 具有 per-agent watermarks 和 retry-安全的 snapshots 以便 failed trigger retries do not drift into newer room messages. thanks @chain710.",
      "Matrix/network: 添加 显式的 `channels.__PROTECTED_39__.proxy` config 用于 routing Matrix traffic through 一个 HTTP(S) proxy, including account-level overrides 和 matching probe/runtime 行为. thanks @patrick-yingxi-pan.",
      "Matrix/streaming: 添加 draft streaming 以便 partial Matrix replies 更新 这个 相同的 message 在 place instead 的 sending 一个 new message 用于 each chunk.",
      "Matrix/threads: 添加 per-DM `threadReplies` overrides 和 保持 thread session isolation aligned 具有 这个 effective room 或 DM thread policy 从 这个 triggering message onward. thanks @teconomix.",
      "MCP: 添加 remote HTTP/SSE server 支持 用于 `mcp.servers` URL configs, including auth headers 和 safer config redaction 用于 MCP credentials.",
      "Memory/QMD: 添加 per-agent `memorySearch.qmd.extraCollections` 以便 agents 可以 opt into cross-agent session search 无需 flattening every transcript collection into one shared QMD namespace.",
      "Microsoft Teams/member info: 添加 一个 Graph-backed member info 操作 以便 Teams automations 和 tools 可以 resolve channel member details directly 从 Microsoft Graph. -codes.",
      "Nostr/inbound DMs: verify inbound event signatures before pairing 或 sender-authorization side effects, 以便 forged DM events no longer create pairing requests 或 trigger Reply attempts. 和 @vincentkoc.",
      "OpenAI/Responses: forward configured `__PROTECTED_58__.verbosity` across Responses HTTP 和 WebSocket transports, surface it 在 `/status`, 和 保持 per-agent verbosity precedence aligned 具有 runtime 行为. 和 @vincentkoc.",
      "Pi/Codex: 添加 native Codex web search 支持 用于 embedded Pi 运行, including config/docs/wizard coverage 和 managed-tool suppression when native Codex search 是 active.",
      "Slack/exec approvals: 添加 native Slack approval routing 和 approver authorization 以便 exec approval prompts 可以 stay 在 Slack instead 的 falling back 到 这个 Web 界面 或 terminal.",
      "TTS: 添加 结构化的 provider diagnostics 和 fallback attempt analytics.",
      "WhatsApp/reactions: agents 可以 now react 具有 emoji 在 incoming WhatsApp messages, enabling more natural conversational interactions like acknowledging 一个 photo 具有 ❤️ instead 的 typing 一个 Reply.",
      "Agents/BTW: force `/btw` side questions 到 disable provider reasoning 以便 Anthropic adaptive-thinking sessions stop failing 具有 `No BTW response generated`. 修复es. 和 @vincentkoc.",
      "CLI/onboarding: 重置 这个 remote gateway URL prompt 到 这个 安全的 loopback default after declining 一个 discovered endpoint, 以便 onboarding does not 保持 一个 previously rejected remote URL.",
      "Agents/exec defaults: honor per-agent `tools.exec` defaults when no inline directive 或 session override 是 present, 以便 configured exec host, 安全, ask, 和 node settings actually apply.",
      "Sandbox/networking: sanitize SSH subprocess env vars through 这个 shared sandbox policy 和 route marketplace archive downloads plus Ollama discovery, auth, 和 pull requests through 这个 guarded fetch path 以便 sandboxed execution 和 remote fetches follow 这个 repo's trust boundaries. ()"
    ],
    "improvements": [
      "Nodes/exec: 移除 这个 duplicated `nodes.run` shell wrapper 从 这个 CLI 和 agent `nodes` tool 以便 node shell execution always goes through `exec host=__PROTECTED_67__`, keeping node-specific capabilities 在 `nodes invoke` 和 这个 dedicated media/location/notify 操作.",
      "插件 SDK: deprecate 这个 legacy provider compat subpaths plus 这个 older bundled provider setup 和 channel-runtime 兼容性 shims, emit migration warnings, 和 保持 这个 current 文档化的 `openclaw/插件-sdk/*` entrypoints plus local `__PROTECTED_22__.ts` / `__PROTECTED_34__-__PROTECTED_22__.ts` barrels as 这个 forward path ahead 的 一个 future major-release removal.",
      "Skills/install 和 插件s/install: b界面lt-在 dangerous-code `critical` findings 和 install-time scan failures now fail closed 通过 default, 以便 插件 installs 和 gateway-backed skill dependency installs that previously succeeded may now req界面re 一个 显式的 dangerous override such as `--dangerously-force-unsafe-install` 到 proceed.",
      "gateway/auth: `trusted-proxy` now rejects mixed shared-token configs, 和 local-direct fallback req界面res 这个 configured token instead 的 implicitly authenticating 相同的-host callers. -agent, @jacobtomlinson, 和 @vincentkoc.",
      "gateway/node commands: node commands now stay disabled 直到 node pairing 是 approved, 以便 device pairing alone 是 no longer enough 到 expose declared node commands.",
      "gateway/node events: node-originated 运行 now stay 在 一个 reduced trusted surface, 以便 notification-driven 或 node-triggered 流程 that previously relied 在 broader host/session tool access may need adjustment."
    ],
    "bugfixes": [
      "Agents/OpenAI Responses: normalize raw bundled MCP tool schemas 在 这个 WebSocket/Responses path 以便 bare-object, object-ish, 和 top-level union MCP tools no longer get rejected 通过 OpenAI during tool registration.",
      "ACP/安全: replace ACP's dangerous-tool name override 具有 semantic approval classes, 以便 only narrow readonly reads/searches 可以 auto-approve while indirect exec-capable 和 Control-plane tools always req界面re 显式的 prompt approval.",
      "ACP/sessions_spawn: register ACP child 运行 用于 completion tracking 和 lifecycle cleanup, 和 make registration-failure cleanup explicitly best-effort 以便 callers do not assume 一个 already-started ACP turn was fully aborted. 和 @vincentkoc.",
      "ACP/tasks: mark cleanly exited ACP 运行 as blocked when they end 在 deterministic write 或 authorization blockers, 和 wake 这个 parent session 具有 一个 follow-up instead 的 falsely reporting success.",
      "ACPX/runtime: derive the bundled ACPX expected version from the extension package metadata instead of hardcoding a separate literal, so 插件-local ACPX installs stop drifting out of health-check parity after version bumps. (#49089) Thanks @jiejiesks and @vincentkoc.",
      "Agents/Anthropic failover: treat Anthropic `API_error` payloads 具有 `An unexpected error occurred while processing the response` as transient 以便 retry/fallback 可以 engage instead 的 surfacing 一个 terminal failure. 和 @vincentkoc.",
      "Agents/compaction: 保持 late compaction-retry rejections handled after 这个 aggregate timeout path wins 无需 swallowing real pre-timeout wait failures, 以便 timed-out retries no longer surface 一个 unhandled rejection 在 later unsubscribe. 和 @vincentkoc.",
      "Agents/context pruning: count supplementary-plane CJK 角色 具有 这个 shared code-point-aware estimator 以便 context pruning stops underestimating Japanese 和 Chinese text that uses Extension B ideographs. -Qiang-2024.",
      "Agents/Kimi: preserve already-valid Anthropic-compatible tool call argument objects while still clearing cached repairs when later trailing junk exceeds 这个 repair allowance.",
      "Agents/MCP: dispose bundled MCP runtimes after one-shot `openclaw agent --local` 运行 finish, while preserving bundled MCP state across 在-运行 retries 以便 local JSON 运行 exit cleanly 无需 restarting stateful MCP tools mid-运行.",
      "Agents/MCP: reuse bundled MCP runtimes across turns in the same session, while recreating them when MCP config changes and disposing stale runtimes cleanly on session rollover. (#55090) Thanks @allan0509.",
      "Agents/Memory flush: 保持 daily Memory flush files append-only during embedded attempts 以便 compaction writes do not overwrite earlier 笔记.",
      "Agents/sandbox: honor `tools.sandbox.tools.alsoAllow`, let 显式的 sandbox re-allows 移除 matching b界面lt-在 default-deny tools, 和 保持 sandbox explain/error g界面dance aligned 具有 这个 effective sandbox tool policy.",
      "Agents/sandbox: make remote FS bridge reads pin 这个 parent path 和 open 这个 file atomically 在 这个 helper 以便 read access cannot race path resolution. 安全lab 和 @vincentkoc.",
      "Agents/silent turns: fail closed 在 silent Memory-flush 运行 以便 narrated `__PROTECTED_53__` self-talk cannot stream 或 finalize into external replies even when block streaming 是 enabled.",
      "Agents/subagents: 修复 interim subagent runtime display 以便 `/subagents list` 和 `/subagents info` stop inflating 短的 runtimes 和 show second-level durations correctly.",
      "Anthropic/OAuth: inject `/fast` `service_tier` 提示 用于 direct `sk-ant-oat-*` requests 以便 OAuth-authenticated Anthropic 运行 stop missing 这个 相同的 overload-routing 信号 as API-key traffic. 修复es. 和 @vincentkoc.",
      "Anthropic/service tiers: 支持 显式的 `serviceTier` 模型 params 用于 direct Anthropic requests 和 let them override `/fast` defaults when both 是 set.",
      "Auto-Reply/fast: accept `/fast status` 在 这个 directive-only path, align help/status text 具有 这个 文档化的 `status|on|off` syntax, 和 保持 current-state replies consistent across command surfaces. 修复es. 和 @vincentkoc.",
      "Azure OpenAI/custom providers: use 这个 `azure-openai-responses` path 用于 Azure custom providers 以便 Azure OpenAI endpoints stay 在 这个 correct Responses 集成 surface.",
      "BlueBubbles/iMessage: coalesce URL-only inbound messages 具有 their link-preview balloon again 以便 sharing 一个 bare link no longer drops 这个 URL 从 agent context.",
      "Browser/插件s: auto-enable 这个 bundled Browser 插件 when Browser config 或 Browser tool policy already references it, 和 show 一个 clearer CLI error when `插件s.allow` excludes `__PROTECTED_30__`.",
      "CI/dev checks: default local `pnpm check` to a lower-memory typecheck/lint path while keeping CI on the normal parallel path, and harden Telegram test typing/literals around native TypeScript-Go tooling crashes.",
      "Tasks: 添加 一个 small task-流程 runtime substrate 用于 authoring layers 具有 persisted wait targets 和 output bags, plus bundled skills/Lobster examples 和 richer `flows show` / `__PROTECTED_46__` recovery 提示 用于 multi-task 流程 state. 和 @vincentkoc.",
      "config/legacy cleanup: stop probing obsolete alternate legacy config names 和 service labels during local config/service detection, while keeping 这个 active `~/.openclaw/openclaw.json` path canonical.",
      "config/runtime: pin 这个 first successful config load 在 Memory 用于 这个 running process 和 refresh that snapshot 在 successful writes/reloads, 以便 hot paths stop reparsing `openclaw.json` between watcher-driven swaps.",
      "config/SecretRef + Control 界面: harden SecretRef redaction round-trip restore, block unsafe raw fallback (force Form mode when raw 是 unavailable), 和 preflight submitted-config SecretRefs before config write RPC persistence.",
      "config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\"*\"].req界面reMention` 在 load 以便 legacy configs no longer crash at startup. thanks @jameslcowan.",
      "config/更新: stop `openclaw __PROTECTED_46__` write-backs 从 persisting 插件-injected channel defaults, 以便 `openclaw 更新` no longer seeds config keys that later break service refresh validation.",
      "Control 界面/agents: auto-load agent workspace files 在 initial files panel open, 和 populate overview 模型/workspace/fallbacks 从 effective runtime agent metadata 以便 defaulted 模型 no longer show as `Not set`.",
      "Control 界面/slash commands: make `/steer` 和 `/redirect` work 从 这个 chat command palette 具有 visible pending state 用于 active-运行 `/steer`, correct redirected-运行 tracking, 和 一个 single canonical `/steer` entry 在 这个 command menu. -栈-dev.",
      "Cron/announce: preserve all deliverable text payloads 用于 announce mode instead 的 collapsing 到 这个 last chunk, 以便 multi-line cron 报告 deliver 在 full 到 Telegram forum topics.",
      "Cron/isolated sessions: carry 这个 full 实时的-session provider, 模型, 和 auth-配置文件 选择 across retry restarts 以便 cron jobs 具有 模型 overrides no longer fail 或 loop 在 mid-运行 模型-switch requests.",
      "Diffs/config: preserve schema-shaped 插件 config parsing 从 `diffs插件ConfigSchema.safeParse()`, 以便 direct callers 保持 `defaults` 和 `安全` sections instead 的 receiving flattened tool defaults.",
      "Diffs: fall back 到 plain text when `lang` 提示 是 invalid during diff render 和 viewer hydration, 以便 bad 或 stale language values no longer break 这个 diff viewer.",
      "Discord/voice: enforce 这个 相同的 g界面ld channel 和 member allowlist checks 在 spoken voice ingress before transcription, 以便 joined voice channels no longer accept speech 从 users outside 这个 configured Discord access policy. 和 @vincentkoc.",
      "Docker/setup: force B界面ldKit 用于 local image b界面lds (including sandbox image b界面lds) 以便 `./docker-setup.sh` no longer fails 在 `RUN --mount=...` when hosts default 到 Docker's legacy b界面lder. 界面-china.",
      "Docs/anchors: 修复 broken English docs links 和 make Mint anchor audits 运行 against 这个 English-source docs tree. thanks @velvet-shark.",
      "doctor/插件s: skip false Matrix legacy-helper warnings when no migration plans exist, 和 保持 bundled `enabledByDefault` 插件s 在 这个 gateway startup set.",
      "Exec approvals/macOS: unwrap `arch` 和 `xcrun` before deriving shell payloads 和 allow-always patterns, 以便 wrapper approvals stay bound 到 这个 carried command instead 的 这个 outer carrier. 和 @vincentkoc.",
      "Exec approvals: unwrap `caffeinate` and `sandbox-exec` before persisting allow-always trust so later shell payload changes still req界面re a fresh approval. Thanks @tdjackey and @vincentkoc.",
      "Exec/approvals: infer Discord 和 Telegram exec approvers 从 existing owner config when `execApprovals.approvers` 是 unset, extend 这个 default approval window 到 30 minutes, 和 clarify approval-unavailable g界面dance 以便 approvals do not appear 到 silently disappear.",
      "Exec/approvals: 保持 `awk` 和 `sed` family binaries out 的 这个 low-risk `safeBins` fast path, 和 stop doctor 配置文件 scaffolding 从 treating them like ordinary custom filters.",
      "Exec/env: block proxy, TLS, 和 Docker endpoint env overrides 在 host execution 以便 request-scoped commands cannot silently reroute outbound traffic 或 trust attacker-supplied certificate settings. 安全lab.",
      "Exec/env: block Python package index override 变量 从 request-scoped host exec environment sanitization 以便 package fetches cannot be redirected through 一个 caller-supplied index. 和 @vincentkoc.",
      "Exec/node: stop gateway-side workdir fallback 从 rewriting 显式的 `host=__PROTECTED_67__` cwd values 到 这个 gateway filesystem, 以便 remote node exec approval 和 运行 保持 using 这个 intended node-local directory.",
      "Exec/runtime: default implicit exec 到 `host=auto`, resolve that target 到 sandbox only when 一个 sandbox runtime exists, 保持 显式的 `host=sandbox` fail-closed 无需 sandbox, 和 show `/exec` effective host state 在 runtime status/docs.",
      "Exec: fail closed when 这个 implicit sandbox host has no sandbox runtime, 和 stop denied async approval followups 从 reusing prior command output 从 这个 相同的 session.",
      "Feishu/groups: 保持 quoted replies 和 topic bootstrap context aligned 具有 group sender allowlists 以便 only allowlisted thread messages seed agent context. 安全lab 和 @vincentkoc.",
      "gateway/attachments: offload large inbound images 无需 leaking `__PROTECTED_42__://` markers into text-only 运行, preserve mixed attachment order 用于 模型 input/transcripts, 和 fail closed when 模型 image capability cannot be resolved.",
      "Gateway/auth: keep shared-auth rate limiting active during WebSocket handshake attempts even when callers also send device-token candidates, so bogus device-token fields no longer suppress shared-secret brute-force tracking. Thanks @kexinoh and @vincentkoc.",
      "gateway/auth: reject mismatched Browser `Origin` headers 在 trusted-proxy HTTP operator requests while keeping origin-less headless proxy clients working. 安全lab 和 @vincentkoc.",
      "gateway/device tokens: disconnect active device sessions after token rotation 以便 newly rotated credentials revoke existing 实时的 connections immediately instead 的 waiting 用于 those sockets 到 close naturally. 和 @vincentkoc.",
      "gateway/health: carry webhook-vs-polling account mode 从 channel descriptors into runtime snapshots 以便 passive channels like LINE 和 BlueBubbles skip false stale-socket health failures. 界面-u.",
      "gateway/pairing: restore QR bootstrap onboarding handoff 以便 fresh `/pair __PROTECTED_61__` iPhone setup 可以 auto-approve 这个 initial node pairing, receive 一个 reusable node device token, 和 stop retrying 具有 spent bootstrap auth.",
      "gateway/OpenAI 兼容性: accept flat Responses API function tool definitions 在 `/v1/responses` 和 preserve `strict` when normalizing hosted tools into 这个 embedded runner, 以便 spec-compliant clients like Codex no longer fail validation 或 silently lose strict tool enforcement. 和 @vincentkoc.",
      "gateway/OpenAI HTTP: restore default operator scopes 用于 bearer-authenticated requests that omit `x-openclaw-scopes`, 以便 headless `/v1/__PROTECTED_51__/completions` 和 session-history callers work again after 这个 recent method-scope hardening.",
      "gateway/插件s: scope 插件-auth HTTP route runtime clients 到 read-only access 和 保持 gateway-authenticated 插件 routes 在 write scope, 以便 插件-owned webhook handlers do not inherit write-capable runtime access 通过 default. 和 @vincentkoc.",
      "gateway/SecretRef: resolve restart token drift checks 具有 merged service/runtime env sources 和 hard-fail un支持ed mutable SecretRef plus OAuth-配置文件 combinations 以便 restart warnings 和 policy enforcement match runtime 行为.",
      "gateway/tools HTTP: tighten HTTP tool-invoke authorization 以便 owner-only tools stay off HTTP invoke paths.",
      "Harden async approval followup delivery 在 webchat-only sessions",
      "Heartbeat/auth: prevent exec-event heartbeat 运行 从 inheriting owner-only tool access 从 这个 session delivery target, 以便 node exec output stays 在 这个 non-owner tool surface even when 这个 target session belongs 到 这个 owner. 安全lab 和 @vincentkoc.",
      "Hooks/config: accept runtime channel 插件 ids 在 `hooks.mappings[].channel` (用于 example `feishu`) instead 的 rejecting non-core channels during config validation.",
      "Hooks/session routing: rebind hook-triggered `agent:` session keys 到 这个 actual target agent before isolated dispatch 以便 dedicated hook agents 保持 their own session-scoped tool 和 插件 identity. 和 @vincentkoc.",
      "Host exec/env: block 添加itional request-scoped env overrides that 可以 redirect Docker endpoints, trust roots, compiler include paths, package resolution, 或 Python environment roots during approved host 运行. 和 @vincentkoc.",
      "Image generation/b界面ld: write stable runtime 别名 files into `dist/` 和 route provider-auth runtime lookups through those 别名 以便 image-generation providers 保持 resolving auth/runtime modules after reb界面lds instead 的 crashing 在 missing hashed chunk files.",
      "iOS/实时的 Activities: mark 这个 `ActivityKit` import 在 `LiveActivityManager.swift` as `@preconcurrency` 以便 Xcode 26.4 / Swift 6 b界面lds stop failing 在 strict concurrency checks.",
      "LINE/ACP: 添加 current-conversation binding 和 inbound binding-routing parity 以便 `/acp spawn ... --thread here`, configured ACP bindings, 和 active conversation-bound ACP sessions work 在 LINE like 这个 other conversation channels.",
      "LINE/markdown: preserve underscores inside Latin, Cyrillic, 和 CJK words when stripping markdown, while still removing standalone `_italic_` markers 在 这个 shared text-runtime path used 通过 LINE 和 TTS.",
      "LINE/status: stop `openclaw status` 从 warning about missing credentials when sanitized LINE snapshots 是 already configured, while still surfacing whether 这个 missing field 是 这个 token 或 secret.",
      "macOS/local gateway: stop OpenClaw.app 从 killing healthy local gateway listeners after startup 通过 recognizing 这个 current `openclaw-__PROTECTED_26__` process title 和 using 这个 current `openclaw __PROTECTED_26__` launch shape.",
      "macOS/wide-area discovery: switch gateway discovery 到 Tailscale MagicDNS names 以便 Mac clients recover more reliably across changing tailnet IPs.",
      "Matrix/CLI send: start one-off Matrix send clients before outbound delivery 以便 `openclaw message send --channel __PROTECTED_39__` restores E2EE 在 encrypted rooms instead 的 sending plain events.",
      "Matrix/context: filter fetched room context 通过 sender allowlists 以便 Reply 和 thread context lookup no longer pulls non-allowlisted messages into agent context.",
      "Matrix/delivery recovery: treat Synapse `User not in room` replay failures as permanent during startup recovery 以便 poisoned queued messages move 到 `failed/` instead 的 crash-looping Matrix after restart. thanks @dlardo.",
      "Matrix/direct rooms: recover fresh auto-joined 1:1 DMs 无需 eagerly persisting invite-only `m.direct` mappings, while keeping named, aliased, 和 explicitly configured rooms 在 这个 room path.",
      "Matrix/direct rooms: stop trusting remote `is_direct`, honor explicit local `is_direct: false` for discovered DM candidates, and avoid extra member-state lookups for shared rooms so DM routing and repair stay aligned. (#57124) Thanks @w-sss.",
      "Matrix/DM threads: 保持 strict unnamed fresh-invite rooms promotable even when Matrix omits 这个 optional direct 提示, preserve repair-failed local DM promotions while still revalidating later room metadata, 和 保持 both bound 和 thread-isolated Matrix sessions reporting 这个 correct route policy.",
      "Matrix/插件 loading: ship 和 source-load 这个 crypto bootstrap runtime sidecar correctly 以便 current `main` stops warning about failed Matrix bootstrap loads 和 `__PROTECTED_39__/index` 插件-id mismatches 在 every invocation. thanks @keithce.",
      "Mattermost/websocket: detect stale Mattermost WebSocket sessions after bot disable/enable cycles 以便 monitoring reconnects cleanly instead 的 silently staying stale.",
      "media/downloads: stop forwarding auth 和 cookie headers across cross-origin redirects during media saves, while preserving 安全的 request headers 用于 same-origin redirect chains. 安全lab 和 @vincentkoc.",
      "media/images: reject oversized decoded image inputs before metadata 和 resize backends 运行, 以便 tiny compressed image bombs fail early instead 的 exhausting gateway Memory. 安全lab 和 @vincentkoc.",
      "Memory/doctor: probe QMD availability 从 这个 agent workspace too, 以便 `openclaw __PROTECTED_46__` no longer falsely 报告 relative `__PROTECTED_0__.qmd.command` configs as broken while runtime search still works.",
      "Memory/doctor: suppress 这个 orphan transcript cleanup warning when QMD session indexing 是 enabled, 以便 doctor no longer suggests deleting transcript history that QMD still uses 用于 recall. 和 @vincentkoc.",
      "Memory/FTS: 添加 configurable trigram tokenization plus 短的-CJK substring fallback 以便 Memory search 可以 find Chinese, Japanese, 和 Korean text 无需 breaking mixed long-和-短的 queries.",
      "Memory/FTS: 保持 provider-less keyword hits visible at 这个 default Memory-search threshold, 以便 FTS-only recall works 无需 req界面ring `--min-score 0`.",
      "Memory/LanceDB: resolve runtime dependency manifest lookup 从 这个 bundled `extensions/__PROTECTED_0__-lancedb` path (including flattened dist chunks) 以便 startup no longer fails 具有 一个 missing `@lancedb/lancedb` dependency error.",
      "Memory/QMD: 添加 `memory.qmd.searchTool` as an exact mcporter tool override, so custom QMD MCP tools such as `hybrid_search` can be used without weakening the validated `searchMode` config surface. (#27801) Thanks @keramblock.",
      "Memory/QMD: honor `__PROTECTED_0__.qmd.更新.embedInterval` even when regular QMD 更新 cadence 是 disabled 或 slower 通过 arming 一个 dedicated embed-cadence maintenance timer, while avoiding redundant timers when regular 更新s 是 already frequent enough.",
      "Memory/QMD: include deduplicated default plus per-agent `memorySearch.extraPaths` when b界面lding QMD custom collections, 以便 shared 和 agent-specific extra roots both get indexed consistently. 和 @vincentkoc.",
      "Memory/QMD: 保持 `memory_search` session-hit paths roundtrip-安全的 when exported session markdown lives under 这个 workspace `qmd/` directory, 以便 `memory_get` 可以 read 这个 exact returned path instead 的 failing 在 这个 generic `qmd/__PROTECTED_68__/...` 别名. 和 @vincentkoc.",
      "Memory/QMD: 保持 `qmd embed` active 在 `search` mode too, 以便 BM25-first setups still b界面ld 一个 complete index 用于 later vector 和 hybrid retrieval. 和 @vincentkoc.",
      "Memory/QMD: 保持 重置 和 deleted session transcripts 在 QMD session export 以便 daily session resets do not silently drop most 历史的 recall 从 `memory_search`.",
      "Memory/QMD: pass 一个 direct-session key 在 `openclaw __PROTECTED_0__ search` 以便 CLI QMD searches no longer get denied as `__PROTECTED_49__=<none>` under direct-only scope defaults. -at 和 @vincentkoc.",
      "Memory/QMD: point `QMD_CONFIG_DIR` at 这个 nested `xdg-__PROTECTED_20__/qmd` directory 以便 per-agent collection config resolves correctly. -tinker 和 @vincentkoc.",
      "Memory/QMD: preserve 显式的 `start_line` 和 `end_line` metadata 从 mcporter query results 以便 `__PROTECTED_0__ search` hits 保持 这个 real snippet offsets instead 的 falling back 到 这个 snippet header.",
      "Memory/QMD: rebind collections when QMD reports a changed pattern but omits path metadata, so config pattern changes stop being silently ignored on restart. (#49897) Thanks @Madruru.",
      "Memory/QMD: resolve slugified `memory_search` file 提示 back 到 这个 indexed filesystem path before returning search hits, 以便 `memory_get` works again 用于 mixed-case 和 spaced paths.",
      "Memory/QMD: send MCP `query` collection filters as 这个 upstream `collections` array instead 的 这个 legacy singular `collection` field, 以便 mcporter-backed QMD 1.1+ searches still scope correctly after 这个 unified `query` tool migration. 和 @vincentkoc.",
      "Memory/QMD: serialize cross-process `qmd embed` 运行 behind 一个 shared lock 和 stagger periodic embed timers 以便 multi-agent QMD collections stop thundering-herding 在 startup 和 every maintenance interval.",
      "Memory/QMD: stop rewriting Han/CJK BM25 queries before `qmd search`, 以便 OpenClaw search semantics match direct QMD results 用于 mixed 和 spaced Chinese queries.",
      "Memory/QMD: surface degraded vector status 从 `qmd status` 以便 `openclaw __PROTECTED_0__ status --deep` warns when semantic search 是 unavailable because 这个 index still has `0` vectors. 修复es.",
      "Memory/QMD: treat null-byte collection corruption 这个 相同的 when QMD surfaces it as `ENOENT`, 以便 managed-collection repair still reb界面lds 和 retries instead 的 leaving QMD stuck 在 一个 broken path.",
      "Memory/QMD: warn explicitly when `__PROTECTED_0__.backend=qmd` 是 configured but 这个 `qmd` binary 是 missing, 以便 doctor 和 runtime fallback no longer fail as 一个 silent b界面ltin downgrade. -xuzimo 和 @vincentkoc.",
      "Memory/QMD: weight CJK-heavy text correctly when estimating chunk sizes, preserve surrogate-pair 角色 during fine splits, 和 保持 long Latin lines 在 这个 旧的 chunk boundaries 以便 Memory indexing produces better-sized chunks 用于 CJK 笔记.",
      "Memory/session indexer: include `.jsonl.reset.*` 和 `.jsonl.deleted.*` transcripts 在 这个 Memory host session scan while still excluding `.jsonl.bak.*` compaction backups 和 lock files, 以便 Memory search sees archived session history 无需 duplicating stale snapshots. 和 @vincentkoc.",
      "Microsoft Teams/threads: filter fetched thread history 通过 sender allowlists 以便 thread context seeding no longer pulls messages 从 disallowed users.",
      "OpenAI/Codex fast mode: map `/fast` 到 priority processing 在 native OpenAI 和 Codex Responses endpoints instead 的 rewriting reasoning settings, 和 document 这个 exact endpoint 和 override 行为.",
      "Outbound media/local files: piggyback host-local `__PROTECTED_42__:` reads 在 这个 configured fs policy instead 的 一个 separate media-root check, 以便 generated files outside 这个 workspace 可以 send when `tools.fs.workspaceOnly=false` while plaintext-like host files stay blocked 通过 这个 outbound media allowlist.",
      "pairing: enforce pending request limits per account instead 的 per shared channel queue, 以便 one account's outstanding pairing challenges no longer block new pairing 在 other accounts. 和 @vincentkoc.",
      "插件s/ClawHub: sanitize temporary archive filenames 用于 scoped package names 和 slash-containing skill slugs 以便 `openclaw 插件s install @scope/name` no longer fails 具有 `ENOENT` during archive download.",
      "插件s/CLI: 添加 descriptor-backed lazy 插件 CLI registration 以便 Matrix 可以 保持 its CLI module lazy-loaded 无需 dropping `openclaw __PROTECTED_39__ ...` 从 parse-time command registration.",
      "插件s/CLI: collect root-help 插件 descriptors through a dedicated non-activating CLI metadata path so enabled 插件s keep validated config semantics without triggering runtime-only 插件 registration work, while preserving runtime CLI command registration for legacy channel 插件s that still wire commands from full registration. (#57294) thanks @gumadeiras.",
      "插件s/facades: guard bundled 插件 facade loads 具有 一个 cache-first sentinel 以便 circular re-entry stops crashing `xai`, `sglang`, 和 `vllm` during gateway 插件 startup.",
      "插件s/Matrix: mirror 这个 Matrix crypto WASM runtime dependency into 这个 root packaged install 和 enforce root/插件 dependency parity 以便 bundled Matrix E2EE crypto resolves correctly 在 shipped b界面lds.",
      "插件s/startup: block workspace `.__PROTECTED_18__` 从 overriding `OPENCLAW_BUNDLED_插件S_DIR`, 以便 bundled 插件 trust roots only come 从 inherited runtime env 或 package resolution instead 的 repo-local dotenv files. 和 @vincentkoc.",
      "Sandbox/Browser: install `fonts-noto-cjk` 在 这个 sandbox Browser image 以便 screenshots render Chinese, Japanese, 和 Korean text correctly instead 的 tofu boxes. 修复es. 和 @vincentkoc.",
      "安全/LINE: make webhook signature validation 运行 这个 timing-安全的 比较 even when 这个 supplied signature length 是 wrong, closing 一个 small timing side-channel.",
      "sessions/Feishu: preserve conversation ids that legitimately embed `:topic:` 在 shared session helper parsing, while keeping Telegram topic session parsing intact.",
      "Slack/status reactions: 添加 一个 reaction lifecycle 用于 queued, thinking, tool, done, 和 error phases 在 Slack monitors, 具有 safer cleanup 以便 queued ack reactions stay correct across silent 运行, pre-Reply failures, 和 delayed transitions.",
      "Status/node-only hosts: teach `openclaw status` 到 handle node-only hosts 在 current `main` 无需 这个 旧的 mixed gateway assumptions.",
      "Status: 修复 cache hit rate exceeding 100% 通过 deriving denominator 从 prompt-side token fields instead 的 potentially undersized totalTokens. 修复es.",
      "Telegram/audio: transcode Telegram voice-笔记 `.ogg` attachments before 这个 local `whisper-cli` auto fallback 运行, 和 保持 mention-preflight transcription enabled 在 auto mode when `tools.__PROTECTED_42__.audio` 是 unset.",
      "Telegram/forum topics: restore Reply routing 到 这个 active topic 和 保持 ACP `sessions_spawn(..., thread=true, mode=\"session\")` bound 到 that 相同的 topic instead 的 falling back 到 root chat 或 losing follow-up routing.",
      "Telegram/media: allow RFC 2544 benchmark-range Telegram CDN resolutions during media downloads, 以便 voice messages, PDFs, 和 other attachments no longer fail 具有 `Failed to __PROTECTED_82__ __PROTECTED_42__`.",
      "Telegram/native commands: pre修复 native command menu callback payloads 和 preserve `CommandSource: \"native\"` when Telegram replays them through callback queries, so `/fast` 和 other native command menus 保持 working even when text-command routing 是 disabled.",
      "Telegram/polling: 保持 这个 watchdog 从 aborting long-running Reply delivery 通过 treating recent non-polling API activity as bounded liveness instead 的 一个 hard stall.",
      "Tools/web_fetch: 添加 一个 显式的 trusted env-proxy path 用于 proxy-only installs while keeping strict SSRF fetches 在 这个 pinned direct path, 以便 trusted proxy routing does not weaken strict destination binding.",
      "Tools/web_search: localize 这个 shared search cache 到 module scope 以便 相同的-process global symbol lookups 可以 no longer inspect 或 mutate cached web-search responses.",
      "TTS/Microsoft: auto-switch 这个 default Edge voice 到 Chinese 用于 CJK-dominant text 无需 overriding explicitly selected Microsoft voices.",
      "TTS: Restore 3.28 schema 兼容性 和 fallback observability.",
      "T界面/chat: 保持 optimistic outbound user messages visible during active 运行 通过 deferring local-运行 binding 直到 这个 first gateway chat event reveals 这个 real 运行 id, preventing premature history reloads 从 wiping pending local sends.",
      "T界面/模型 picker: 保持 searchable `/model` 和 `/models` input mode 从 hijacking `j`/`k` as 导航 keys, 和 harden width bounds under `m`-filtered 模型 lists 以便 search no longer crashes 在 long rows.",
      "Voice Call/media stream: cap inbound WebSocket frame size before `start` validation 以便 oversized pre-start frames 是 dropped before JSON parsing. 和 @vincentkoc.",
      "Voice call/Plivo: pin stored callback bases 到 这个 configured public webhook URL 以便 later call-Control redirects stay 在 这个 intended origin even if webhook transport metadata differs. 和 @vincentkoc.",
      "Web 界面/markdown: stop bare auto-links 从 swallowing adjacent CJK text while preserving valid mixed-script path 和 query 角色 在 rendered links.",
      "Approvals/界面: 保持 这个 newest pending approval at 这个 front 的 这个 Control 界面 queue 以便 approving one request does not accidentally target 一个 older expired id.",
      "auth 配置文件/OAuth: refresh runtime auth snapshots when saving rotated credentials 以便 OAuth providers do not reuse consumed refresh tokens after 这个 first token rotation. 修复es. 和 @vincentkoc.",
      "Browser/screenshot: use `fromSurface: false` 在 raw CDP screenshots 到 avoid 一个 Chromium compositor 问题 that drops cross-origin image textures (QR codes, CDN assets), 和 preserve pre-existing device emulation state across full-page viewport expansion.",
      "ClawDock/docs: move 这个 helper scripts 到 `scripts/clawdock`, publish ClawDock as 一个 first-class docs page 在 这个 docs site, 和 document reinstalling local helper copies 从 这个 new raw GitHub path. thanks @Olshansk.",
      "Control 界面/gateway: 清除 queued Browser connect timeouts 在 client stop 以便 aborted 或 replaced gateway clients do not send delayed connect requests after shutdown. thanks @gumadeiras.",
      "Control 界面/gateway: reconnect 这个 Browser client when gateway event sequence gaps 是 detected, 以便 stale non-chat state recovers automatically instead 的 only telling 这个 user 到 refresh. thanks @Olshansk.",
      "Exec approvals/channels: unify Discord and Telegram exec approval runtime handling, move approval buttons onto the shared interactive reply model, and 修复 Telegram approval buttons and typed `/approve` commands so configured approvers can resolve requests reliably again. (#57516) Thanks @scoootscooob.",
      "gateway/SQLite transient handling: 保持 unhandled `SQLITE_CANTOPEN`, `SQLITE_BUSY`, `SQLITE_LOCKED`, 和 `SQLITE_IOERR` failures non-fatal 在 这个 global rejection handler 以便 macOS LaunchAgent restarts do not enter 一个 crash-throttle loop.",
      "Hooks/插件s/skills: block workspace `.__PROTECTED_18__` overrides 用于 bundled root directories 以便 workspace startup cannot redirect bundled trust roots away 从 这个 packaged defaults. 和 @vincentkoc.",
      "LINE/webhooks: cap shared concurrent pre-verify webhook body reads 以便 excess requests 是 rejected before entering 这个 LINE body handler. 和 @vincentkoc.",
      "Memory/QMD: preserve 显式的 custom collection names 用于 shared paths outside 这个 agent workspace 以便 `memory_search` stops appending `-<agentId>` 到 externally managed QMD collections. 和 @vincentkoc.",
      "Memory/b界面ltin: 保持 Memory-file indexing active 在 FTS-only mode (no embedding provider) 以便 forced reindexes no longer swap 在 一个 empty index 和 wipe existing Memory chunks.",
      "Nostr/config: redact `channels.nostr.privateKey` 在 config snapshots 和 Control 界面 config 视图, 以便 Nostr signing keys no longer appear 在 plain text.",
      "插件 approvals: accept unique 短的 approval-id pre修复es 在 `插件.approval.resolve`, matching exec approvals 和 restoring `/approve` fallback 流程 在 chat approval surfaces.",
      "SSH sandbox/upload: reject workspace symlinks that resolve outside 这个 uploaded tree before syncing 到 这个 remote sandbox, 以便 later agent writes cannot be redirected through escaped links. 安全lab 和 @vincentkoc.",
      "Slack/interactive replies: resolve Slack Block Kit Reply delivery 从 both authored `channelData.__PROTECTED_41__.blocks` payloads 和 directive-generated interactive replies, 和 保持 Slack button styles mapped onto valid Block Kit button rendering 以便 interactive replies stop dropping 在 Slack-specific delivery paths.",
      "Subagents/announcements: preserve 这个 requester agent id 用于 inline deterministic tool spawns 以便 named agents 无需 channel bindings 可以 still announce completions through 这个 correct owner session.",
      "Telegram/Anthropic streaming: replace raw invalid stream-order provider errors 具有 一个 安全的 retry message 以便 internal `message_start/message_stop` failures do not leak into chats.",
      "Tlon/media: route inbound image downloads through 这个 shared media store, cap each download at 6 MB, 和 stop after 8 images per message 以便 large Tlon posts no longer balloon local media storage. 安全lab 和 @vincentkoc.",
      "Agents/实时的 switch: stop transient cron 和 subagent 模型 overrides 从 being misread as persisted 实时的-session switches, 以便 isolated 运行 no longer fail 具有 `LiveSessionModelSwitchError`.",
      "Agents/tool-call repair: recover malformed Kimi/OpenRouter tool-call argument streams when provider preambles appear before JSON payloads, 和 fail closed 在 non-tool leading text 以便 fragment strings do not leak into filesystem path arguments during sub-agent 运行.",
      "Gateway/startup: keep configured primary-model warmup on the static model path so container boots do not snapshot-load provider runtime graphs just to validate a configured model. Thanks @vincentkoc.",
      "OpenAI/Responses: omit disabled reasoning payloads across OpenAI, Codex, 和 Azure OpenAI request b界面lders 以便 GPT-5 endpoints no longer reject `reasoning.effort: \"none\"`.",
      "WhatsApp/outbound: restore runtime send/操作 routing 和 outbound 兼容性 after 这个 recent channel seam 重构 以便 outbound sends, reactions, 和 related media 操作 保持 reaching 这个 active session.",
      "xAI/Responses: normalize image-bearing tool results 用于 xAI responses payloads, including OpenResponses-style `input_image.source` parts, 以便 image tool replays no longer 422 在 这个 follow-up turn.",
      "Zalo/webhooks: scope replay dedupe 到 这个 authenticated target 以便 one configured account 可以 no longer cause 相同的-id inbound events 用于 another target 到 be dropped. 和 @vincentkoc.",
      "插件s/prompt b界面ld: preserve 这个 highest-priority `systemPrompt` when merging `before_prompt_b界面ld` hook results instead 的 letting lower-priority hooks overwrite it.",
      "Tlon/settings migration: preserve 显式的 empty-array settings during migration 以便 restart-time reseeding no longer restores older file-config values.",
      "插件s/marketplace: harden marketplace archive installs 通过 surfacing guarded download failures as 结构化的 install errors 和 deriving temp filenames 从 这个 final resolved URL.",
      "界面/DOM safety: b界面ld 这个 chat delete-confirm popover 和 Canvas Host fallback status line 具有 DOM nodes instead 的 injected HTML strings. ()",
      "media/file handling: create image temp work directories under 这个 shared OpenClaw temp root 和 stop widening allowed local media roots 从 Reply 或 tool source paths, keeping local media access limited 到 configured 和 agent-scoped roots. ()",
      "Telegram/安全: migrate legacy pairing `allowFrom` state 到 这个 `default` account only 和 gate group voice-message preflight transcription 在 sender authorization 以便 unauthorized senders cannot trigger paid transcription before being dropped. ()",
      "Exec approvals: stop shell init-file flags 从 matching persisted script-path approvals, detect command-carrier inline eval 在 tools like `awk`, `find`, `xargs`, `make`, 和 `sed`, 和 treat 这个 awk family as interpreter-like 以便 allow-always decisions no longer persist interpreter paths. ()",
      "Voice call/Telnyx: canonicalize verified webhook signatures before deriving replay keys 以便 eq界面valent Base64 和 Base64URL encodings dedupe correctly.",
      "gateway/HTTP trust boundaries: ignore self-declared bearer scopes, deny dangerous HTTP tool-invoke paths 通过 default, req界面re write scope 在 `/v1/embeddings`, 和 bind OpenAI-compatible `/v1/__PROTECTED_51__/completions` plus `/v1/responses` ingress as non-owner 以便 external HTTP callers cannot self-upgrade access. ()",
      "gateway/trusted config 和 bootstrap: 清除 self-declared scopes 用于 device-less `trusted-proxy` WebSocket connects 和 trim 这个 Control 界面 bootstrap payload 到 only 这个 fields needed before 这个 normal handshake. ()",
      "Skills 和 workspace safety: replace raw skill-file reads 具有 一个 symlink-安全的, root-confined loader 和 pin workspace-only `apply_patch` delete 和 directory-creation mutations 到 verified workspace roots 以便 path rebind races fail closed. ()",
      "env 和 filesystem hardening: block credential 和 gateway auth env vars 从 workspace `.__PROTECTED_18__` files, always strip dangerous inherited host env vars such as `__PROTECTED_30__` 和 `GIT_EDITOR`, 和 保持 sensitive host paths 和 OpenClaw state roots blocked even when external sandbox bind sources 是 allowed. ()",
      "OpenShell 和 ACP file boundaries: skip symlinks 和 preserve trusted host-only directories during OpenShell mirror sync, 和 route ACP attachment reads through 这个 shared attachment cache 以便 local files outside allowed roots 是 no longer forwarded. ()",
      "Channel/webhook authorization: skip Discord audio preflight transcription for unauthorized g界面ld senders, 添加 a shared pre-auth in-flight guard to Synology Chat webhooks, and validate Microsoft Teams bearer auth before JSON body parsing. (#57695, #57722, #57686)",
      "Infra/randomness: replace `Math.random()` 在 affected identifier 和 delay-jitter paths 具有 shared secure-random helpers, including 界面 U界面D generation."
    ]
  }
}
])

// 分类图标映射
const getCategoryIcon = (category) => {
  const icons = {
    features: '✨',
    improvements: '🚀',
    bugfixes: '🐛'
  }
  return icons[category] || '📝'
}

// 分类名称映射
const getCategoryName = (category) => {
  const names = {
    features: '新功能',
    improvements: '功能改进',
    bugfixes: '问题修复'
  }
  return names[category] || '其他'
}

// 版本类型图标映射
const getTypeIcon = (type) => {
  const icons = {
    '稳定版': '✅',
    '测试版': '🧪',
    '重大更新': '⚡'
  }
  return icons[type] || '📦'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.changelog-view {
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow-x: hidden;
}

.changelog-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-subtle) 0%, transparent 50%);
  opacity: 0.3;
}

.changelog-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  position: relative;
  z-index: 1;
}

/* Header */
.changelog-header {
  margin-bottom: var(--space-12);
  text-align: center;
  padding: var(--space-12) 0;
}

.header-content {
  max-width: 700px;
  margin: 0 auto;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
}

.title-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon {
  font-size: 3.5rem;
  position: relative;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  background: radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: pulse 3s ease-in-out infinite;
}

.title-text-wrapper {
  text-align: left;
}

.page-title {
  margin: 0 0 var(--space-2) 0;
}

.title-gradient {
  font-size: var(--text-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent) 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.page-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
}

/* Changelog Content */
.changelog-content {
  position: relative;
  margin-bottom: var(--space-12);
}

.timeline-container {
  position: relative;
  padding: var(--space-8) 0;
}

.timeline-line {
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    var(--color-accent) 0%, 
    var(--color-border) 50%, 
    transparent 100%
  );
  opacity: 0.3;
}

.changelog-list {
  position: relative;
  z-index: 2;
}

.changelog-item {
  position: relative;
  margin-bottom: var(--space-12);
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.changelog-item:last-child {
  margin-bottom: 0;
}

/* Timeline Node */
.timeline-node {
  position: relative;
  flex-shrink: 0;
  margin-top: var(--space-4);
}

.node-dot {
  width: 16px;
  height: 16px;
  background: var(--color-bg-primary);
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  position: relative;
  z-index: 3;
  transition: all var(--transition-normal);
}

.node-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

.latest-node .node-dot {
  background: var(--color-accent);
  box-shadow: 0 0 20px var(--color-accent);
  animation: glow 2s ease-in-out infinite alternate;
}

.latest-node .node-ring {
  border-color: var(--color-accent);
  opacity: 0.6;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Version Card */
.version-card {
  flex: 1;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
}

.version-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-border-focus);
}

.latest-card {
  background: linear-gradient(135deg, 
    var(--color-accent-subtle) 0%, 
    var(--color-bg-elevated) 100%
  );
  border-color: var(--color-accent);
  box-shadow: 0 0 30px var(--color-accent-subtle);
}

.latest-card:hover {
  box-shadow: 0 0 40px var(--color-accent-subtle);
}

.card-header {
  padding: var(--space-6) var(--space-6) 0;
}

.version-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.version-title {
  flex: 1;
  min-width: 200px;
}

.version-number {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text-primary);
}

.version-tag {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-family: var(--font-mono);
  font-weight: 700;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.version-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.6s;
}

.version-tag:hover::before {
  left: 100%;
}

.version-tag:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.version-tag.latest-tag {
  background: linear-gradient(135deg, var(--color-accent), #8b5cf6);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px var(--color-accent-subtle);
}

.latest-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--color-success), #16a34a);
  color: white;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

.badge-icon {
  font-size: var(--text-sm);
}

.version-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  align-items: flex-end;
}

.release-date {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  background: var(--color-bg-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.date-icon {
  font-size: var(--text-sm);
}

.release-type {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid;
}

.type-icon {
  font-size: var(--text-sm);
}

.release-type.稳定版 {
  background: var(--color-success-subtle);
  color: var(--color-success);
  border-color: var(--color-success);
}

.release-type.测试版 {
  background: var(--color-warning-subtle);
  color: var(--color-warning);
  border-color: var(--color-warning);
}

.release-type.重大更新 {
  background: var(--color-error-subtle);
  color: var(--color-error);
  border-color: var(--color-error);
}

/* Changes Content */
.changes-content {
  padding: var(--space-6);
}

.change-category {
  margin-bottom: var(--space-6);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  border: 1px solid var(--color-border-subtle);
  transition: all var(--transition-normal);
}

.change-category:hover {
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.change-category:last-child {
  margin-bottom: 0;
}

.category-header {
  margin-bottom: var(--space-3);
}

.category-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.category-icon {
  font-size: var(--text-base);
}

.category-name {
  flex: 1;
}

.category-count {
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  min-width: 1.5rem;
  text-align: center;
}

.changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.change-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: var(--text-sm);
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

.change-item:last-child {
  padding-bottom: 0;
}

.change-bullet {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  margin-top: 0.5em;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px var(--color-accent-subtle);
  animation: pulse 2s ease-in-out infinite;
}

.change-text {
  flex: 1;
  transition: color var(--transition-fast);
}

.change-item:hover .change-text {
  color: var(--color-text-primary);
}

/* Footer */
.changelog-footer {
  margin-top: var(--space-12);
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.footer-content {
  display: flex;
  justify-content: center;
}

.footer-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6) var(--space-8);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.footer-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-border-focus);
}

.footer-text {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  margin: 0;
  line-height: 1.5;
  text-align: center;
}

.footer-icon {
  font-size: var(--text-base);
  color: var(--color-accent);
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-accent-subtle);
  border: 1px solid var(--color-accent-subtle);
}

.external-link:hover {
  color: var(--color-accent-hover);
  text-decoration: none;
  background: var(--color-accent);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-accent-subtle);
}

.link-text {
  font-weight: 600;
}

.external-icon {
  opacity: 0.8;
  transition: all var(--transition-normal);
}

.external-link:hover .external-icon {
  transform: translate(2px, -2px);
  opacity: 1;
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 20px var(--color-accent);
  }
  to {
    box-shadow: 0 0 30px var(--color-accent), 0 0 40px var(--color-accent);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .changelog-container {
    padding: 0 var(--space-4);
  }

  .title-wrapper {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }

  .title-text-wrapper {
    text-align: center;
  }

  .title-gradient {
    font-size: var(--text-3xl);
  }

  .timeline-line {
    left: 1.5rem;
  }

  .changelog-item {
    gap: var(--space-4);
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .version-meta {
    align-items: flex-start;
  }

  .card-header {
    padding: var(--space-4) var(--space-4) 0;
  }

  .changes-content {
    padding: var(--space-4);
  }

  .footer-card {
    padding: var(--space-4) var(--space-6);
    margin: 0 var(--space-4);
  }
}

@media (max-width: 480px) {
  .changelog-container {
    padding: 0 var(--space-3);
  }

  .title-gradient {
    font-size: var(--text-2xl);
  }

  .timeline-container {
    padding: var(--space-6) 0;
  }

  .timeline-line {
    left: 1rem;
  }

  .changelog-item {
    gap: var(--space-3);
  }

  .card-header {
    padding: var(--space-3) var(--space-3) 0;
  }

  .changes-content {
    padding: var(--space-3);
  }

  .footer-card {
    padding: var(--space-3) var(--space-4);
    margin: 0 var(--space-2);
  }

  .category-title {
    font-size: var(--text-base);
  }

  .version-number {
    font-size: var(--text-xl);
  }
}
</style>
<template>
  <div class="changelog-view">
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

      <!-- Main Content Layout with Sidebar -->
      <div class="changelog-layout">
        <!-- Sidebar Navigation -->
        <aside class="changelog-sidebar" :class="{ 'sidebar-hidden': !showSidebar }">
          <div class="sidebar-container">
            <div class="sidebar-header">
              <h3 class="sidebar-title">版本目录</h3>
              <button class="sidebar-toggle" @click="toggleSidebar" :title="showSidebar ? '隐藏侧边栏' : '显示侧边栏'">
                <span class="toggle-icon">{{ showSidebar ? '←' : '→' }}</span>
              </button>
            </div>
            <div class="sidebar-content">
              <ul class="version-list">
                <li 
                  v-for="release in changelogData" 
                  :key="release.version"
                  class="version-item"
                  :class="{ 'active': activeVersion === release.version }"
                >
                  <a @click.prevent="scrollToVersion(release.version)" href="#" class="version-link">
                    <span class="version-number">v{{ release.version }}</span>
                    <span v-if="release.latest" class="latest-badge-sidebar">最新</span>
                    <span class="version-date">{{ formatDate(release.date) }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Back to Top Button -->
        <button class="back-to-top" :class="{ 'show': showBackToTop }" @click="scrollToTop" title="回到顶部">
          <span class="back-to-top-icon">↑</span>
        </button>

        <!-- Main Content -->
        <main class="changelog-content animate-scale-in" :class="{ 'content-expanded': !showSidebar }">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="changelog-list">
            <div 
              v-for="(release, index) in changelogData" 
              :key="release.version"
              :id="`version-${release.version}`"
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
        <div class="changelog-footer animate-fade-in" style="animation-delay: 300ms;">
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
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 响应式状态管理
const enableAutoHide = ref(true);
const showNavigation = ref(true);
const showSidebar = ref(true);
const showBackToTop = ref(false);
const activeVersion = ref('');

// 自动隐藏逻辑
let lastScrollTop = 0;

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // 控制回到顶部按钮显示
  showBackToTop.value = scrollTop > 300;
  
  // 控制导航栏自动隐藏
  if (enableAutoHide.value) {
    // 向下滚动时隐藏，向上滚动时显示
    const currentScrollTop = scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      // 向下滚动
      showNavigation.value = false;
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 50) {
      // 向上滚动或滚动到顶部附近
      showNavigation.value = true;
    }
    
    lastScrollTop = currentScrollTop;
  }
  
  // 检测当前活跃版本
  const versions = changelogData.value;
  for (let i = versions.length - 1; i >= 0; i--) {
    const element = document.getElementById(`version-${versions[i].version}`);
    if (element && element.offsetTop <= scrollTop + 200) {
      activeVersion.value = versions[i].version;
      break;
    }
  }
};

// 切换自动隐藏
const toggleAutoHide = () => {
  enableAutoHide.value = !enableAutoHide.value;
  if (!enableAutoHide.value) {
    showNavigation.value = true;
  }
};

// 切换侧边栏显示
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

// 滚动到指定版本
const scrollToVersion = (version) => {
  const element = document.getElementById(`version-${version}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 更新日志数据
const changelogData = ref([
  {
  "version": "2026.4.14",
  "date": "2026-04-14",
  "type": "稳定版",
  "latest": true,
  "changes": {
    "features": [],
    "improvements": [],
    "bugfixes": []
  }
},
  {
  "version": "2026.4.14-beta.1",
  "date": "2026-04-14",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "Telegram/forum topics: surface human topic names in agent context, prompt metadata, and 插件 hook metadata by learning names from Telegram forum service messages. (#65973) Thanks @ptahdunbar."
    ],
    "improvements": [],
    "bugfixes": [
      "界面/chat: replace marked.js with markdown-it so maliciously crafted markdown can no longer freeze the Control 界面 via ReDoS. (#46707) Thanks @zhangfnf.",
      "Auto-reply/send policy: keep `sendPolicy: \"deny\"` from blocking inbound message processing, so the agent still runs its turn while all outbound delivery is suppressed for observer-style setups. (#65461, #53328) Thanks @omarshahine.",
      "BlueBubbles: lazy-refresh the Private API server-info cache on send when reply threading or message effects are requested but status is unknown, so sends no longer silently degrade to plain messages when the 10-minute cache expires. (#65447, #43764) Thanks @omarshahine.",
      "Heartbeat/安全: force owner downgrade for untrusted `hook:wake` system events [AI-assisted]. (#66031) Thanks @pgondhi987.",
      "Browser/安全: enforce SSRF policy on snapshot, screenshot, and tab routes [AI]. (#66040) Thanks @pgondhi987.",
      "Microsoft Teams/安全: enforce sender allowlist checks on SSO signin invokes [AI]. (#66033) Thanks @pgondhi987.",
      "Config/安全: redact `sourceConfig` and `runtimeConfig` alias fields in `redactConfigSnapshot` [AI]. (#66030) Thanks @pgondhi987.",
      "Agents/context engines: run opt-in turn maintenance as idle-aware background work so the next foreground turn no longer waits on proactive maintenance. (#65233) Thanks @100yenadmin.",
      "插件s/status: report the registered context-engine IDs in `插件s inspect` instead of the owning 插件 ID, so non-matching engine IDs and multi-engine 插件s are classified correctly. (#58766) Thanks @zh界面sDEV.",
      "Context engines: reject resolved 插件 engines whose reported `info.id` does not match their registered slot id, so malformed engines fail fast before id-based runtime branches can misbehave. (#63222) Thanks @fuller-stack-dev.",
      "WhatsApp: patch installed Baileys media encryption writes during OpenClaw postinstall so the default npm/install.sh delivery path waits for encrypted media files to finish flushing before readback, avoiding transient `ENOENT` crashes on image sends. (#65896) Thanks @frankekn.",
      "Gateway/更新: unify service entrypoint resolution around the canonical bundled gateway entrypoint so 更新, reinstall, and doctor repair stop drifting between stale `dist/entry.js` and current `dist/index.js` paths. (#65984) Thanks @mbelinky.",
      "Heartbeat/Telegram topics: keep isolated heartbeat replies on the bound forum topic when `target=last`, instead of dropping them into the group root chat. (#66035) Thanks @mbelinky.",
      "Browser/CDP: let managed local Chrome readiness, status probes, and managed loopback CDP control bypass browser SSRF policy for their own loopback control plane, so OpenClaw no longer misclassifies a healthy child browser as \"not reachable after start\". (#65695, #66043) Thanks @mbelinky.",
      "Gateway/sessions: stop heartbeat, cron-event, and exec-event turns from overwriting shared-session routing and origin metadata, preventing synthetic `heartbeat` targets from poisoning later cron or user delivery. (#66073, #63733, #35300) Thanks @mbelinky.",
      "Browser/CDP: let local attach-only `manual-cdp` profiles reuse the local loopback CDP control plane under strict default policy and remote-class probe timeouts, so tabs/snapshot stop falsely reporting a live local browser session as not running. (#65611, #66080) Thanks @mbelinky.",
      "Cron/scheduler: stop inventing short retries when cron next-run calculation returns no valid future slot, and keep a maintenance wake armed so enabled unscheduled jobs recover without entering a refire loop. (#66019, #66083) Thanks @mbelinky.",
      "Cron/scheduler: preserve the active error-backoff floor when maintenance repair recomputes a missing cron next-run, so recurring errored jobs do not resume early after a transient next-run resolution failure. (#66019, #66083, #66113) Thanks @mbelinky.",
      "Outbound/delivery-queue: persist the originating outbound `session` context on queued delivery entries and replay it during recovery, so write-ahead-queued sends keep their original outbound media policy context after restart instead of evaluating against a missing session. (#66025) Thanks @eleqtrizit.",
      "Auto-reply/queue: split collect-mode followup drains into contiguous groups by per-message authorization context (sender id, owner status, exec/bash-elevated overrides), so queued items from different senders or exec configs no longer execute under the last queued run's owner-only and exec-approval context. (#66024) Thanks @eleqtrizit.",
      "Dreaming/memory-core: req界面re a live queued Dreaming cron event before the heartbeat hook runs the sweep, so managed Dreaming no longer replays on later heartbeats after the scheduled run was already consumed. (#66139) Thanks @mbelinky.",
      "Control 界面/Dreaming: stop Imported Insights and Memory Palace from calling optional `memory-wiki` gateway methods when the 插件 is off, and refresh config before wiki reloads so the Dreaming tab stops showing misleading unknown-method failures. (#66140) Thanks @mbelinky.",
      "Agents/tools: only mark streamed unknown-tool retries as counted when a streamed message actually classifies an unavailable tool, and keep incomplete streamed tool names from resetting the retry streak before the final assistant message arrives. (#66145) Thanks @dutifulbob.",
      "Memory/active-memory: move recalled memory onto the hidden untrusted prompt-pre修复 path instead of system prompt injection, label the visible Active Memory status line fields, and include the resolved recall provider/model in gateway de问题 logs so trace/de问题 output matches what the model actually saw. (#66144) Thanks @Takhoffman.",
      "Memory/QMD: stop treating legacy lowercase `memory.md` as a second default root collection, so QMD recall no longer searches phantom `memory-alt-*` collections and b界面ltin/QMD root-memory fallback stays aligned. (#66141) Thanks @mbelinky.",
      "Agents/OpenAI: map `minimal` thinking to OpenAI's 支持ed `low` reasoning effort for GPT-5.4 requests, so embedded runs stop failing request validation. Thanks @steipete.",
      "Voice-call/media-stream: resolve the source IP from trusted forwarding headers for per-IP pending-connection limits when `webhook安全.trustForwardingHeaders` and `trustedProxyIPs` are configured, and reserve `maxConnections` capacity for in-flight WebSocket upgrades so concurrent handshakes can no longer momentarily exceed the operator-set cap. (#66027) Thanks @eleqtrizit.",
      "Feishu/allowlist: canonicalize allowlist entries by explicit `user`/`chat` kind, strip repeated `feishu:`/`lark:` provider pre修复es, and stop folding opaque Feishu IDs to lowercase, so allowlist matching no longer crosses user/chat namespaces or widens to case-insensitive ID matches the operator did not intend. (#66021) Thanks @eleqtrizit.",
      "TTS/reply media: persist OpenClaw temp voice outputs into managed outbound media and allow them through reply-media normalization, so voice-note replies stop silently dropping. (#63511) Thanks @jetd1.",
      "Agents/tools: treat Windows drive-letter paths (`C:\\\\...`) as absolute when resolving sandbox and read-tool paths so workspace root is not prepended under POSIX path rules. (#54039) Thanks @ly85206559 and @vincentkoc.",
      "Agents/OpenAI: recover embedded GPT-style runs when reasoning-only or empty turns need bounded continuation, with replay-safe retry gating and incomplete-turn fallback when no visible answer arrives. (#66167) thanks @jalehman",
      "Outbound/relay-status: suppress internal relay-status placeholder payloads (`No channel reply.`, `Replied in-thread.`, `Replied in #...`, wiki-更新 status variants ending in `No channel reply.`) before channel delivery so internal housekeeping text does not leak to users.",
      "Slack/doctor: 添加 a dedicated doctor-contract sidecar so config warmup paths such as `openclaw cron` no longer fall back to Slack's broader contract surface, which could trigger Slack-related config-read crashes on affected setups. (#63192) Thanks @shhtheonlyperson.",
      "Hooks/session-memory: pass the resolved agent workspace into gateway `/new` and `/reset` session-memory hooks so reset snapshots stay scoped to the right agent workspace instead of leaking into the default workspace. (#64735) Thanks @suboss87 and @vincentkoc."
    ]
  }
},
  {
  "version": "2026.4.12",
  "date": "2026-04-13",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [],
    "improvements": [],
    "bugfixes": []
  }
},
  {
  "version": "2026.4.12-beta.1",
  "date": "2026-04-12",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "插件s/loading: narrow CLI, provider, and channel activation to manifest-declared needs, preserve explicit scope and trust boundaries, and centralize manifest-owner policy so startup, command discovery, and runtime activation avoid loading unrelated 插件 runtime. (#65120, #65259, #65298, #65429, #65459) Thanks @vincentkoc.",
      "Memory/active-memory: default QMD recall to search and surface better search-path telemetry so memory-backed recall works more predictably out of the box. (#65068) Thanks @Takhoffman.",
      "Docs/providers: expand bundled provider docs with richer capability, env-var, and setup g界面dance across provider pages.",
      "Docs/memory-wiki: 添加 the recommended QMD + bridge-mode hybrid recipe plus zero-artifact troubleshooting g界面dance for `memory-wiki` bridge setups. (#63165) Thanks @sercada and @vincentkoc."
    ],
    "improvements": [],
    "bugfixes": [
      "CLI/更新: respawn tracked 插件 refresh from the 更新d entrypoint after package self-更新s so `openclaw 更新` stops failing on stale hashed `dist/install.runtime-*.js` chunk imports. (#65471)",
      "Memory/active-memory: keep recall runs on the resolved channel when wrappers like `mx-claw` are enabled, 改进 lexical fallback ranking, and keep lexical boosts out of hybrid search so recall finds the right memories more consistently. (#65049, #65395) Thanks @Takhoffman.",
      "Dreaming: consume managed heartbeat events exactly once, stage light-sleep confidence from all recorded short-term signals, wake scheduled jobs immediately, raise dreaming-only promotion enough to cross the durable-memory gate, and stop dreaming from re-ingesting its own narrative transcripts.",
      "Dreaming/narrative: harden transient narrative cleanup by retrying timed-out deletes, scrubbing stale dreaming session artifacts through the lock-aware session-store path, and isolating transient narrative session keys per workspace. (#65320, #61674)",
      "Memory/wiki: preserve Unicode letters, digits, and combining marks in wiki slugs and contradiction clustering, and cap Unicode filename segments to safe byte lengths so non-ASCII titles stop collapsing or overflowing path limits. (#64742) Thanks @zhouhe-xydt.",
      "Memory/short-term recall: allow nested daily notes under `memory/**/YYYY-MM-DD.md` to feed short-term recall, while still excluding generated dream reports under `memory/dreaming/**` so dreaming does not promote its own output. (#64682) Thanks @SARAMALI15792.",
      "界面/WebChat: hide synthetic transcript-repair tool results from chat history reloads so internal recovery markers do not leak into visible chat after reconnects. (#65247) Thanks @wangwllu.",
      "WhatsApp/outbound: fall back to the first `mediaUrls` entry when `mediaUrl` is empty so gateway media sends stop silently dropping attachments that already have a resolved media list. (#64394) Thanks @eric-fr4 and @vincentkoc.",
      "Doctor/Discord: stop `openclaw doctor --修复` from rewriting legacy Discord preview-streaming config into the nested modern shape, so downgrades can still recover without hand-editing `channels.discord.streaming`. (#65035) Thanks @vincentkoc.",
      "Gateway/auth: blank the shipped example gateway credential in `.env.example` and fail startup when a copied placeholder token or password is still configured, so operators cannot accidentally launch with a publicly known secret. (#64586) Thanks @navarrotech and @vincentkoc.",
      "Memory/active-memory+dreaming: keep active-memory recall runs on the strongest resolved channel, consume managed dreaming heartbeat events exactly once, stop dreaming from re-ingesting its own narrative transcripts, and 添加 explicit repair/dedupe recovery flows in CLI, doctor, and the Dreams 界面.",
      "Agents/queueing: carry orphaned active-turn user text into the next prompt before repairing transcript ordering, so follow-up messages that arrive mid-run are no longer silently dropped. (#65388) Thanks @adminfedres and @vincentkoc.",
      "Gateway/keepalive: stop marking WebSocket tick broadcasts as droppable so slow or backpressured clients do not self-disconnect with `tick timeout` while long-running work is still alive. (#65256) Thanks @100yenadmin and @vincentkoc.",
      "Matrix/mentions: keep room mention gating strict while accepting visible `@displayName` Matrix URI labels, so `req界面reMention` works for non-OpenClaw Matrix clients again. (#64796) Thanks @hclsys.",
      "Doctor: warn when on-disk agent directories still exist under `~/.openclaw/agents/<id>/agent` but the matching `agents.list[]` entries are missing from config. (#65113) Thanks @neeravmakwana.",
      "Telegram: route approval button callback queries onto a separate sequentializer lane so 插件 approval clicks can resolve immediately instead of deadlocking behind the blocked agent turn. (#64979) Thanks @nk3750.",
      "Telegram/direct sessions: keep commentary-only assistant fallback payloads out of visible direct delivery, so Codex planning chatter cannot leak into Telegram DMs when a run has no `final_answer` text.",
      "Gateway/keepalive: stop marking WebSocket tick broadcasts as droppable so slow or backpressured clients do not self-disconnect with `tick timeout` while long-running work is still alive. (#65436)",
      "Gateway/插件s: always send a non-empty `idempotencyKey` for 插件 subagent runs, so dreaming narrative jobs stop failing gateway schema validation. (#65354) Thanks @CodeForgeNet.",
      "Gateway/auth: blank the shipped example gateway credential in `.env.example` and fail startup when a copied placeholder token or password is still configured, so operators cannot accidentally launch with a publicly known secret. (#64586) Thanks @navarrotech.",
      "插件s/memory-core dreaming: keep bundled `memory-core` loaded alongside an explicit external memory slot owner only when that owner enables dreaming, while preserving `插件s.slots.memory = \"none\"` disable semantics. (#65411) Thanks @pradeep7127.",
      "Doctor/Discord: stop `openclaw doctor --修复` from rewriting legacy Discord preview-streaming config into the nested modern shape, so downgrades can still recover without hand-editing `channels.discord.streaming`.",
      "Doctor: warn when on-disk agent directories still exist under `~/.openclaw/agents/<id>/agent` but the matching `agents.list[]` entries are missing from config. (#65113) Thanks @neeravmakwana.",
      "CLI/插件s: honor `memory-wiki` when `插件s.allow` is set for `openclaw wiki`, and pass the active app config into the metadata registrar so 插件-owned wiki commands resolve the live 插件 config instead of falling back to defaults. (#64779, #65012)",
      "QA/packaging: stop packaged QA helpers from crashing when optional scenario execution config is unavailable, so npm distributions can skip the repo-only scenario pack without breaking completion-cache and startup paths. (#65118) Thanks @EdderTalmor.",
      "Media/audio transcription: surface the real provider failure when every audio transcription attempt fails, so status output and the CLI stop collapsing those errors into generic skips. (#65096) Thanks @l0cka.",
      "Infra/net: 修复 multipart FormData fields (including `model`) being silently dropped when a guarded runtime fetch body crosses a FormData 实现ation boundary, restoring OpenAI audio transcription requests that failed with HTTP 400. (#64349) Thanks @petr-sloup.",
      "Dreaming/diary: use the host local timezone for diary timestamps when `dreaming.timezone` is unset, and include the timezone abbreviation so `DREAMS.md` and the 界面 make local or UTC time explicit. (#65034, #65057)",
      "Dreaming/promotion: raise phase reinforcement enough for repeated dreaming-only revisits to clear the default durable-memory gate after multiple days, instead of stalling just below the score threshold. (#64068) Thanks @vincentkoc.",
      "Dreaming/light-sleep: compute staged candidate confidence from all recorded short-term signals instead of recall-only counts, so dreaming-only entries stop rendering as `confidence: 0.00`. (#64599) Thanks @vincentkoc.",
      "插件s/memory: restore cached memory capability public artifacts on 插件-registry cache hits so memory-backed artifact surfaces stay visible after warm loads.",
      "Gateway/cron: preserve requested isolated-agent config across runtime reloads so subagent jobs and heartbeat overrides keep the right workspace and heartbeat settings when the hot-loaded snapshot is stale.",
      "Cron/isolated sessions: persist the right transcript path for each isolated run, including fresh session rollovers, so cron runs stop appending to stale session files.",
      "Discord/gateway: clear stale heartbeat timers before reconnecting so zombie gateway callbacks cannot crash the process and drop in-flight replies. (#65009) Thanks @SARAMALI15792.",
      "Matrix/mentions: keep room mention gating strict while accepting visible `@displayName` Matrix URI labels, so `req界面reMention` works for non-OpenClaw Matrix clients again. (#64796) Thanks @hclsys.",
      "Agents/Anthropic replay: preserve immutable signed-thinking replay safety across stored and live reruns, keep non-thinking embedded `tool_result` user blocks intact, and drop conflicting preserved tool IDs before validation so retries stop degrading into omitted tool calls. (#65126) Thanks @shakkernerd.",
      "Memory/QMD: allow channel sessions in the shipped default QMD scope, while still denying groups.",
      "Memory/QMD: stop registering the legacy lowercase root memory file as a separate default collection, so QMD now prefers `MEMORY.md` and the `memory/` tree without duplicate collection-添加 warnings.",
      "Memory/memory-core: watch the `memory` directory directly and ignore non-markdown churn so nested note changes still sync on macOS + Node 25 environments where recursive `memory/**/*.md` glob watching fails. (#64711) Thanks @jasonxargs-boop and @vincentkoc.",
      "WhatsApp: centralize per-account connection ownership so reconnects, login recovery, and outbound readiness stay attached to the live socket instead of drifting across monitor and login paths. (#65290) Thanks @mcaxtr and @vincentkoc.",
      "iMessage: retry transient `watch.subscribe` startup failures before tearing down the monitor, and sanitize startup error logging so brief local transport stalls do not immediately bounce the channel or leak raw imsg RPC payloads into logs. (#65393) Thanks @vincentkoc.",
      "CLI/audio providers: report env-authenticated providers as configured in `openclaw infer audio providers --json`, while keeping trusted workspace provider env lookup defaults stable during auth setup. (#65491)",
      "插件s/install: reinstall bundled runtime packages when the matching platform native optional child is missing, so packaged Windows installs can recover dependencies that were packed on another host OS."
    ]
  }
},
  {
  "version": "2026.4.11",
  "date": "2026-04-12",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Dreaming/memory-wiki: 添加 ChatGPT import ingestion plus new `Imported Insights` and `Memory Palace` diary subtabs so Dreaming can inspect imported source chats, compiled wiki pages, and full source pages directly from the 界面. (#64505)",
      "Control 界面/webchat: render assistant media/reply/voice directives as structured chat bubbles, 添加 the `[embed ...]` rich output tag, and gate external embed URLs behind config. (#64104)",
      "Tools/video_generate: 添加 URL-only generated asset delivery, typed `providerOptions`, reference audio inputs, per-asset role hints, `adaptive` aspect-ratio 支持, and a higher image-input cap so video providers can expose richer generation modes without forcing large files into memory. (#61987, #61988) Thanks @xieyongliang.",
      "Feishu: 改进 document comment sessions with richer context parsing, comment reactions, and typing feedback so document-thread conversations behave more like chat conversations. (#63785)",
      "Microsoft Teams: 添加 reaction 支持, reaction listing, Graph pagination, and delegated OAuth setup for sending reactions while preserving application-auth read paths. (#51646)",
      "插件s: allow 插件 manifests to declare activation and setup descriptors so 插件 setup flows can describe req界面red auth, pairing, and 配置 steps without hardcoded core special cases. (#64780)",
      "Ollama: cache `/API/show` context-window and capability metadata during model discovery so repeated picker refreshes stop refetching unchanged models, while still retrying after empty responses and invalidating on digest changes. (#64753) Thanks @ImLukeF.",
      "Models/providers: surface how configured OpenAI-compatible endpoints are classified in embedded-agent de问题 logs, so local and proxy routing issues are easier to diagnose. (#64754) Thanks @ImLukeF.",
      "QA/parity: 添加 the GPT-5.4 vs Opus 4.6 agentic parity report gate with shared scenario coverage checks, stricter evidence heuristics, and skipped-scenario accounting for maintainer review. (#64441) Thanks @100yenadmin."
    ],
    "improvements": [],
    "bugfixes": [
      "OpenAI/Codex OAuth: stop rewriting the upstream authorize URL scopes so new Codex sign-ins do not fail with `invalid_scope` before returning an authorization code. (#64713) Thanks @fuller-stack-dev.",
      "Audio transcription: disable pinned DNS only for OpenAI-compatible multipart requests, while still validating hostnames, so OpenAI, Groq, and Mistral transcription works again without weakening other request paths. (#64766) Thanks @GodsBoy.",
      "macOS/Talk Mode: after granting microphone permission on first enable, continue starting Talk Mode instead of req界面ring a second toggle. (#62459) Thanks @ggarber.",
      "Control 界面/webchat: persist agent-run TTS audio replies into webchat history and preserve interleaved tool card pairing so generated audio and mixed tool output stay attached to the right messages. (#63514) Thanks @bittoby.",
      "WhatsApp: honor the configured default account when the active listener helper is used without an explicit account id, so named default accounts do not get registered under `default`. (#53918) Thanks @yhyatt.",
      "ACP/agents: suppress commentary-phase child assistant relay text in ACP parent stream 更新s, so spawned child runs stop leaking internal progress chatter into the parent session. Thanks @vincentkoc.",
      "Agents/timeouts: honor explicit run timeouts in the LLM idle watchdog and align default timeout config so slow models can keep working until the configured limit instead of using the wrong idle window.",
      "Config: include `asyncCompletion` in the generated zod schema so documented async completion config no longer fails with an unrecognized-key error. (#63618)",
      "Google/Veo: stop sending the un支持ed `numberOfVideos` request field so Gemini Developer API Veo runs do not fail before OpenClaw can complete the intended Google video generation path. (#64723) Thanks @velvet-shark.",
      "QA/packaging: stop packaged CLI startup and completion cache generation from reading repo-only QA scenario markdown, ship the bundled QA scenario pack in npm releases, and keep `openclaw completion --write-state` working even if QA setup is broken. (#64648) Thanks @obviyus.",
      "Codex/QA: keep Codex app-server coordination chatter out of visible replies, 添加 a live QA leak scenario, and classify leaked harness meta text as a QA failure instead of a successful reply. Thanks @vincentkoc.",
      "WhatsApp: route `message react` through the gateway-owned action path so reactions use the live WhatsApp listener in both DM and group chats, matching `message send` and `message poll`. Thanks @mcaxtr.",
      "Auto-reply/WhatsApp: preserve inbound image attachment notes after media understanding so image edits keep the real saved media path instead of hallucinating a missing local path. (#64918) Thanks @ngutman.",
      "Telegram/sessions: keep topic-scoped session initialization on the canonical topic transcript path when inbound turns omit `MessageThreadId`, so one topic session no longer alternates between bare and topic-qualified transcript files. (#64869) Thanks @jalehman.",
      "Agents/failover: scope assistant-side fallback classification and surfaced provider errors to the current attempt instead of stale session history, so cross-provider fallback runs stop inheriting the previous provider's failure. (#62907) Thanks @stainlu.",
      "MiniMax/OAuth: write `API: \"anthropic-messages\"` and `authHeader: true` into the `minimax-portal` config patch during `openclaw configure`, so re-authenticated portal setups keep Bearer auth routing working. (#64964) Thanks @ryanlee666."
    ]
  }
},
  {
  "version": "2026.4.11-beta.1",
  "date": "2026-04-11",
  "type": "测试版",
  "latest": false,
  "changes": {
    "features": [
      "Dreaming/memory-wiki: 添加 ChatGPT import ingestion plus new `Imported Insights` and `Memory Palace` diary subtabs so Dreaming can inspect imported source chats, compiled wiki pages, and full source pages directly from the 界面. (#64505)",
      "Control 界面/webchat: render assistant media/reply/voice directives as structured chat bubbles, 添加 the `[embed ...]` rich output tag, and gate external embed URLs behind config. (#64104)",
      "Tools/video_generate: 添加 URL-only generated asset delivery, typed `providerOptions`, reference audio inputs, per-asset role hints, `adaptive` aspect-ratio 支持, and a higher image-input cap so video providers can expose richer generation modes without forcing large files into memory. (#61987, #61988) Thanks @xieyongliang.",
      "Feishu: 改进 document comment sessions with richer context parsing, comment reactions, and typing feedback so document-thread conversations behave more like chat conversations. (#63785)",
      "Microsoft Teams: 添加 reaction 支持, reaction listing, Graph pagination, and delegated OAuth setup for sending reactions while preserving application-auth read paths. (#51646)",
      "插件s: allow 插件 manifests to declare activation and setup descriptors so 插件 setup flows can describe req界面red auth, pairing, and 配置 steps without hardcoded core special cases. (#64780)",
      "Ollama: cache `/API/show` context-window and capability metadata during model discovery so repeated picker refreshes stop refetching unchanged models, while still retrying after empty responses and invalidating on digest changes. (#64753) Thanks @ImLukeF.",
      "Models/providers: surface how configured OpenAI-compatible endpoints are classified in embedded-agent de问题 logs, so local and proxy routing issues are easier to diagnose. (#64754) Thanks @ImLukeF.",
      "QA/parity: 添加 the GPT-5.4 vs Opus 4.6 agentic parity report gate with shared scenario coverage checks, stricter evidence heuristics, and skipped-scenario accounting for maintainer review. (#64441) Thanks @100yenadmin."
    ],
    "improvements": [],
    "bugfixes": [
      "OpenAI/Codex OAuth: stop rewriting the upstream authorize URL scopes so new Codex sign-ins do not fail with `invalid_scope` before returning an authorization code. (#64713) Thanks @fuller-stack-dev.",
      "Audio transcription: disable pinned DNS only for OpenAI-compatible multipart requests, while still validating hostnames, so OpenAI, Groq, and Mistral transcription works again without weakening other request paths. (#64766) Thanks @GodsBoy.",
      "macOS/Talk Mode: after granting microphone permission on first enable, continue starting Talk Mode instead of req界面ring a second toggle. (#62459) Thanks @ggarber.",
      "Control 界面/webchat: persist agent-run TTS audio replies into webchat history and preserve interleaved tool card pairing so generated audio and mixed tool output stay attached to the right messages. (#63514) Thanks @bittoby.",
      "WhatsApp: honor the configured default account when the active listener helper is used without an explicit account id, so named default accounts do not get registered under `default`. (#53918) Thanks @yhyatt.",
      "ACP/agents: suppress commentary-phase child assistant relay text in ACP parent stream 更新s, so spawned child runs stop leaking internal progress chatter into the parent session. Thanks @vincentkoc.",
      "Agents/timeouts: honor explicit run timeouts in the LLM idle watchdog and align default timeout config so slow models can keep working until the configured limit instead of using the wrong idle window.",
      "Config: include `asyncCompletion` in the generated zod schema so documented async completion config no longer fails with an unrecognized-key error. (#63618)",
      "Google/Veo: stop sending the un支持ed `numberOfVideos` request field so Gemini Developer API Veo runs do not fail before OpenClaw can complete the intended Google video generation path. (#64723) Thanks @velvet-shark.",
      "QA/packaging: stop packaged CLI startup and completion cache generation from reading repo-only QA scenario markdown, ship the bundled QA scenario pack in npm releases, and keep `openclaw completion --write-state` working even if QA setup is broken. (#64648) Thanks @obviyus.",
      "Codex/QA: keep Codex app-server coordination chatter out of visible replies, 添加 a live QA leak scenario, and classify leaked harness meta text as a QA failure instead of a successful reply. Thanks @vincentkoc.",
      "WhatsApp: route `message react` through the gateway-owned action path so reactions use the live WhatsApp listener in both DM and group chats, matching `message send` and `message poll`. Thanks @mcaxtr."
    ]
  }
},
  {
  "version": "2026.4.10",
  "date": "2026-04-11",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Models/Codex: 添加 the bundled Codex provider and 插件-owned app-server harness so `codex/gpt-*` models use Codex-managed auth, native threads, model discovery, and compaction while `openai/gpt-*` stays on the normal OpenAI provider path. (#64298)",
      "Memory/Active Memory: 添加 a new optional Active Memory 插件 that gives OpenClaw a dedicated memory sub-agent right before the main reply, so ongoing chats can automatically pull in relevant preferences, context, and past details without making users remember to manually say \"remember this\" or \"search memory\" first. Includes configurable message/recent/full context modes, live `/verbose` inspection, advanced prompt/thinking overrides for tuning, and opt-in transcript persistence for de问题ging. Docs: https://docs.openclaw.ai/concepts/active-memory. (#63286) Thanks @Takhoffman.",
      "macOS/Talk: 添加 an experimental local MLX speech provider for Talk Mode, with explicit provider selection, local utterance playback, interruption handling, and system-voice fallback. (#63539) Thanks @ImLukeF.",
      "Tools/video generation: 添加 Seedance 2.0 model refs to the bundled fal provider and submit the provider-specific duration, resolution, audio, and seed metadata fields needed for live Seedance 2.0 runs.",
      "Microsoft Teams: 添加 message actions for pin, unpin, read, react, and listing reactions. (#53432) Thanks @sudie-codes.",
      "QA/Matrix: 添加 a live `openclaw qa matrix` lane backed by a disposable Matrix homeserver, shared live-transport seams, and Matrix-specific transport coverage for threading, reactions, restart, and allowlist behavior. (#64489) Thanks @gumadeiras.",
      "QA/Telegram: 添加 a live `openclaw qa telegram` lane for private-group bot-to-bot checks, harden its artifact handling, and preserve native Telegram command reply threading for QA verification. (#64303) Thanks @obviyus.",
      "QA/testing: 添加 a `--runner multipass` lane for `openclaw qa s界面te` so repo-backed QA scenarios can run inside a disposable Linux VM and write back the usual report, summary, and VM logs. (#63426) Thanks @shakkernerd.",
      "CLI/exec policy: 添加 a local `openclaw exec-policy` command with `show`, `preset`, and `set` subcommands for synchronizing requested `tools.exec.*` config with the local exec approvals file, plus follow-up hardening for node-host rejection, rollback safety, and sync conflict detection. (#64050)",
      "Gateway: 添加 a `commands.list` RPC so remote gateway clients can discover runtime-native, text, skill, and 插件 commands with surface-aware naming and serialized argument metadata. (#62656) Thanks @samzong.",
      "Models/providers: 添加 per-provider `models.providers.*.request.allowPrivateNetwork` for trusted self-hosted OpenAI-compatible endpoints, keep the opt-in scoped to model request surfaces, and refresh cached WebSocket managers when request transport overrides change. (#63671) Thanks @qas.",
      "Feishu: standardize request user agents and register the bot as an AI agent so Feishu deployments identify OpenClaw consistently. (#63835) Thanks @evandance.",
      "Matrix/partial streaming: 添加 MSC4357 live markers to draft preview sends and edits so 支持ing Matrix clients can render a live/typewriter animation and stop it when the final edit lands. (#63513) Thanks @TigerInYourDream.",
      "Control 界面/dreaming: simplify the Scene and Diary surfaces, preserve unknown phase state for partial status payloads, and stabilize waiting-entry recency ordering so Dreaming status and review lists stay clear and deterministic. (#64035) Thanks @davemorin.",
      "Agents: 添加 an opt-in strict-agentic embedded Pi execution contract for GPT-5-family runs so plan-only or filler turns keep acting until they hit a real blocker. (#64241) Thanks @100yenadmin.",
      "Agents/OpenAI: 添加 provider-owned OpenAI/Codex tool schema 兼容性 and surface embedded-run replay/liveness state for long-running runs. (#64300) Thanks @100yenadmin.",
      "Docs i18n: chunk raw doc translation, reject truncated tagged outputs, avoid ambiguous body-only wrapper unwrapping, and recover from terminated Pi translation sessions without changing the default `openai/gpt-5.4` path. (#62969, #63808) Thanks @hxy91819."
    ],
    "improvements": [],
    "bugfixes": [
      "Browser/安全: tighten browser and sandbox navigation defenses across strict SSRF defaults, hostname allowlists, interaction-driven redirects, subframes, CDP discovery, existing sessions, tab actions, noVNC, marker-span sanitization, and Docker CDP source-range enforcement. (#61404, #63332, #63882, #63885, #63889, #64367, #64370, #64371)",
      "安全/tools: harden exec preflight reads, host env denylisting, node output boundaries, outbound host-media reads, profile-mutation authorization, 插件 install dependency scanning, ACPX tool hooks, Gmail watcher token redaction, and oversized realtime WebSocket frame handling. (#62333, #62661, #62662, #63277, #63551, #63553, #63886, #63890, #63891, #64459)",
      "OpenAI/Codex: 添加 req界面red Codex OAuth scopes, classify provider/runtime failures more clearly, stop suggesting `/elevated full` when auto-approved host exec is unavailable, 添加 OpenAI/Codex tool-schema 兼容性, and preserve embedded-run replay/liveness truth across compaction retries and mutating side effects. (#64300, #64439) Thanks @100yenadmin.",
      "CLI/WhatsApp media sends: route gateway-mode outbound sends with `--media` through the channel `sendMedia` path and preserve media access context, so WhatsApp document and attachment sends stop silently dropping the file while still delivering the caption. (#64478, #64492) Thanks @ShionEria.",
      "Microsoft Teams: restore media downloads for personal DMs, Bot Framework `a:` conversations, OneDrive/SharePoint shared files, and Graph-backed chat IDs; accept Bot Framework audience tokens; prevent feedback-learning filename collisions; keep long tool chains alive with typing indicators; 添加 SSO sign-in callbacks; inject parent context for thread replies; and deliver cron announcements to Teams conversation IDs. (#54932, #55383, #55386, #58001, #58249, #58774, #59731, #60956, #62219, #62674, #63063, #63942, #63945, #63949, #63951, #63953, #64087, #64088, #64089)",
      "Gateway/tailscale: start Tailscale exposure and the gateway 更新 check before awaiting channel and 插件 sidecar startup so remote operators are not locked out when startup sidecars stall.",
      "Gateway/startup: keep WebSocket RPC available while channels and 插件 sidecars start, hold `chat.history` unavailable until startup sidecars finish so synchronous history reads cannot stall startup (reported in #63450), refresh advertised gateway methods after deferred 插件 reloads, and enforce the pre-auth WebSocket upgrade budget before the no-handler 503 path so upgrade floods cannot bypass connection limits during that window. (#63480) Thanks @neeravmakwana.",
      "WhatsApp: keep inbound replies, media, composing indicators, and queued outbound deliveries attached to the current socket across reconnect gaps, including fresh retry-eligible sends after the listener comes back. (#30806, #46299, #62892, #63916) Thanks @mcaxtr.",
      "Gateway/thread routing: preserve Slack, Telegram, Mattermost, Matrix, ACP, restart-sentinel, and agent announce delivery targets so subagent, cron, stream-relay, session fallback, and restart messages land back in the originating thread, topic, or room casing. (#54840, #57056, #63143, #63228, #63506, #64343, #64391)",
      "Models/fallback: preserve `/models` selection across transient primary-model failures and config reloads, allow timeout cooldown probes, classify OpenRouter no-endpoints responses, detect llama.cpp context overflows, and keep provider/runtime context metadata stable through reloads. (#61472, #64196, #64471)",
      "Agents/BTW: keep `/btw` side questions working after tool-use turns by stripping replayed tool blocks, hidden reasoning, and malformed image payloads, omitting empty tool arrays, allowing Bedrock `auth: \"aws-sdk\"`, and routing Feishu `/btw` plus `/stop` through bounded out-of-band lanes. (#64218, #64219, #64225, #64324) Thanks @ngutman.",
      "Control 界面/BTW: render `/btw` side results as dismissible ephemeral cards in the browser, send `/btw` immediately during active runs, and clear stale BTW cards on reset flows so webchat matches the intended detached side-question behavior. (#64290) Thanks @ngutman.",
      "Commands/targeting: use the selected agent or session for command output, send policy, usage/cost, context reports, model lists, bash sandbox hints, BTW/compact working directories, 插件 commands, and session exports so multi-agent commands describe and mutate the intended target instead of the requester.",
      "Conversation bindings: normalize focused/current conversation ids, preserve binding metadata on account and Discord rebinds, avoid stale Discord lifecycle windows, and keep generic activity touches persisted so reply routing survives rebinds and restarts.",
      "iMessage/self-chat: disting界面sh normal DM outbound rows from true self-chat using `destination_caller_id` plus chat participants, preserve multi-handle self-chat aliases, drop ambiguous reflected echoes, and strip wrapped imsg RPC text fields. (#61619, #63868, #63980, #63989, #64000) Thanks @neeravmakwana.",
      "Matrix: keep multi-account room scoping consistent, keep packaged crypto migrations warning-only when appropriate, preserve ordered block streaming, 添加 explicit Matrix block-streaming opt-in, and resolve verification/bootstrap from the packaged runtime entry. (#58449, #59249, #59266, #64373) Thanks @gumadeiras.",
      "Telegram/安全: tighten Telegram `allowFrom` sender validation and keep `/whoami` allowlist reporting in sync with command auth checks.",
      "Agents/timeouts: extend the default LLM idle window to 120s and keep silent no-token idle timeouts on recovery paths, so slow models can retry or fall back before users see an error.",
      "Gateway/agents: preserve configured model selection and richer `IDENTITY.md` content across agent create/更新 flows and workspace moves, and fail safely instead of silently overwriting unreadable identity files. (#61577) Thanks @samzong.",
      "Skills/TaskFlow: restore valid frontmatter fences for the bundled `taskflow` and `taskflow-inbox-triage` skills and copy bundled `SKILL.md` files as hard dist-runtime copies so skills stay discoverable and loadable after 更新s. (#64166, #64469) Thanks @extrasmall0.",
      "Skills: respect overridden home directories when loading personal skills so service, test, and custom launch environments read the intended user skill directory instead of the process home.",
      "Windows/exec: settle supervisor waits from child exit state after stdout and stderr drain even when `close` never arrives, so CLI commands stop hanging or dying with forced `SIGKILL` on Windows. (#64072) Thanks @obviyus.",
      "Browser/sandbox: prevent sandbox browser CDP startup hangs by recreating containers when the browser 安全 hash changes and by waiting on the correct sandbox browser lifecycle. (#62873) Thanks @Syysean.",
      "QQBot/streaming: make block streaming configurable per QQ bot account via `streaming.mode` (`\"partial\"` | `\"off\"`, default `\"partial\"`) instead of hardcoding it off, so responses can be delivered incrementally. (#63746)",
      "QQBot/config: allow extra fields in `channels.qqbot` and `channels.qqbot.accounts.*` so extended qqbot b界面lds can 添加 new config options without gateway startup failing on schema validation. (#64075) Thanks @WideLee.",
      "Dreaming/gateway: req界面re `operator.admin` for persistent `/dreaming on|off` changes and treat missing gateway client scopes as unprivileged instead of silently allowing config writes. (#63872) Thanks @mbelinky.",
      "Gateway/pairing: prefer explicit QR bootstrap auth over earlier Tailscale auth classification so iOS `/pair qr` silent bootstrap pairing does not fall through to `pairing req界面red`. (#59232) Thanks @ngutman.",
      "Browser/control: auto-generate browser-control auth tokens for `none` and `trusted-proxy` modes, and route browser auth/profile/doctor helpers through the public browser 插件 facades. (#63280, #63957) Thanks @pgondhi987.",
      "Browser/act: centralize `/act` request normalization and execution dispatch while 添加ing stable machine-readable route-level error codes for invalid requests, selector misuse, evaluate-disabled gating, target mismatch, and existing-session un支持ed actions. (#63977) Thanks @joshavant.",
      "安全/QQBot: enforce media storage boundaries for all outbound local file paths and route image-size probes through SSRF-guarded media fetching instead of raw `fetch()`. (#63271, #63495) Thanks @pgondhi987.",
      "Channel setup: ignore workspace 插件 shadows when resolving trusted channel setup catalog entries so onboarding and setup flows keep using the bundled, trusted setup contract.",
      "Gateway/memory startup: load the explicitly selected memory-slot 插件 during gateway startup, while keeping restrictive allowlists and implicit default memory slots from auto-starting unrelated memory 插件s. (#64423) Thanks @EronFan.",
      "Config/插件s: let config writes keep disabled 插件 entries without forcing req界面red 插件 config schemas or crashing raw 插件 validation, and avoid re-activating 插件 registry state during schema checks. (#54971, #63296) Thanks @fuller-stack-dev.",
      "Config validation: surface the actual offending field for strict-schema union failures in bindings, including top-level unexpected keys on the matching ACP branch. (#40841) Thanks @Hollychou924.",
      "Wizard/插件 config: coerce integer-typed 插件 config fields from interactive text input so integer schema values persist as numbers instead of failing validation. (#63346) Thanks @jalehman.",
      "Daemon/gateway install: preserve safe custom service env vars on forced reinstall, merge prior custom PATH segments behind the managed service PATH, and stop 移除d managed env keys from persisting as custom carryover. (#63136) Thanks @WarrenJones.",
      "Cron/scheduling: treat `nextRunAtMs <= 0` as invalid across cron 更新, maintenance, timer, and stale-delivery paths so corrupted zero timestamps self-heal instead of causing immediate runs or skipped deliveries. (#63507) Thanks @WarrenJones.",
      "Cron/auth: resolve auth profiles consistently for isolated cron jobs so scheduled runs use the same configured provider credentials as interactive sessions. (#62797) Thanks @neeravmakwana.",
      "Tasks: let `openclaw tasks cancel` cancel stuck background tasks that never reached a normal terminal state. (#62506) Thanks @neeravmakwana.",
      "Sessions/model selection: preserve catalog-backed session model labels, provider-qualified context limits, and already-qualified session model refs when catalog metadata is unavailable, so model selection and memory/context budgets survive reloads without bogus provider pre修复es. (#61382, #62493) Thanks @Mule-ME.",
      "Status: show configured fallback models in `/status` and shared session status cards so per-agent fallback 配置 is visible before a live failover happens. (#33111) Thanks @AnCoSONG.",
      "`/context detail` now compares the tracked prompt estimate with cached context usage and surfaces untracked provider/runtime overhead when present. (#28391) Thanks @ImLukeF.",
      "Gateway/sessions: scope bare `sessions.create` aliases like `main` to the requested agent while preserving the canonical `global` and `unknown` sentinel keys. (#58207) Thanks @jalehman.",
      "Gateway/session reset: emit the typed `before_reset` hook for gateway `/new` and `/reset`, preserving reset-hook behavior even when the previous transcript has already been archived. (#53872) Thanks @VACInc.",
      "插件s/commands: pass the active host `sessionKey` into 插件 command contexts, and include `sessionId` when it is already available from the active session entry, so bundled and third-party commands can resolve the current conversation reliably. (#59044) Thanks @jalehman.",
      "Agents/auth: honor `models.providers.*.authHeader` for pi embedded runner model requests by injecting `Authorization: Bearer <APIKey>` when requested. (#54390) Thanks @lndyzwdxhs.",
      "Claude CLI: clear inherited Anthropic auth/header environment aliases before spawning Claude Code and 添加 sanitized CLI backend auth-env diagnostics for de问题ging gateway-run provider selection.",
      "Agents/failover: classify AbortError and stream-abort messages as timeout so Ollama NDJSON stream aborts stop showing `reason=unknown` in model fallback logs. (#58324) Thanks @yelog.",
      "Fireworks/FirePass: disable Kimi K2.5 Turbo reasoning output by forcing thinking off on the FirePass path and hardening the provider wrapper so hidden reasoning no longer leaks into visible replies. (#63607) Thanks @frankekn.",
      "Discord: 更新 Carbon to v0.15.0. Thanks @thewilloftheshadow.",
      "Config/Discord: coerce safe integer numeric Discord IDs to strings during config validation, keep unsafe or precision-losing numeric snowflakes rejected, and align `openclaw doctor` repair g界面dance with the same fail-closed behavior. (#45125) Thanks @moliendocode.",
      "BlueBubbles/config: accept `enrichGroupParticipantsFromContacts` in the core strict config schema so gateways no longer fail validation or startup when the BlueBubbles 插件 writes that field. (#56889) Thanks @zqchris.",
      "Feishu/webhooks: read webhook bodies through the pre-auth guard so unauthenticated webhook traffic stays under the same body budget as other protected channel ingress paths.",
      "Tools/web_fetch: 添加 an opt-in `tools.web.fetch.ssrfPolicy.allowRfc2544BenchmarkRange` config so fake-IP proxy environments that resolve public sites into `198.18.0.0/15` can use `web_fetch` without weakening the default SSRF block. (#61830) Thanks @xing-xing-coder.",
      "Dreaming/cron: reconcile managed dreaming cron from startup config and runtime lifecycle changes, but only recover managed dreaming cron state during heartbeat-triggered dreaming checks so ordinary chat traffic does not recreate 移除d jobs. (#63873, #63929, #63938) Thanks @mbelinky.",
      "Memory/lancedb: accept `dreaming` config when `memory-lancedb` owns the memory slot so Dreaming surfaces can read slot-owner settings without schema rejection. (#63874) Thanks @mbelinky.",
      "Control 界面/dreaming: keep the Dreaming trace area contained and scrollable so overlays no longer cover tabs or blow out the page layout. (#63875) Thanks @mbelinky.",
      "Dreaming/narrative: harden request-scoped diary fallback so scheduled dreaming only falls back on the dedicated subagent-runtime error, stop trusting spoofable raw error-code objects, and avoid leaking workspace paths when local fallback writes fail. (#64156) Thanks @mbelinky.",
      "Dreaming/diary: 添加 idempotent narrative subagent runs, preserve restrictive `DREAMS.md` permissions during atomic writes, and surface temp cleanup failures so repeated sweeps do not double-run the same narrative request or silently weaken diary safety. (#63876) Thanks @mbelinky.",
      "Heartbeats/sessions: 移除 stale accumulated isolated heartbeat session keys when the next tick converges them back to the canonical sibling, so repaired sessions stop showing orphaned `:heartbeat:heartbeat` variants in session listings. (#59606) Thanks @rogerdigital.",
      "Gateway/run cleanup: 修复 stale run-context TTL cleanup so the new maintenance sweep resets orphaned run sequence state and prevents unbounded run-context growth. (#52731) Thanks @artwalker.",
      "界面/compaction: keep the compaction indicator in a retry-pending state until the run actually finishes, so the 界面 does not show `Context compacted` before compaction actually finishes. (#55132) Thanks @mpz4life.",
      "Cron/tool schemas: keep cron tool schemas strict-model-friendly while still preserving `failureAlert=false`, nullable `agentId`/`sessionKey`, and flattened 添加/更新 recovery for the newly exposed cron job fields. (#55043) Thanks @brunolorente.",
      "Git metadata: read commit ids from packed refs as well as loose refs so version and status metadata stay accurate after repository maintenance. (#63943)",
      "Gateway: keep `commands.list` skill entries categorized under tools and include provider-aware 插件 `nativeName` metadata even when `scope=text`, so remote clients can group skills correctly and map text-surface 插件 commands back to native aliases. (#64147)",
      "T界面: reset footer activity to idle when switching sessions so a stale streaming indicator cannot persist after the selection changes. (#63988) Thanks @neeravmakwana.",
      "Claude CLI: stop marking spawned Claude Code runs as host-managed so they keep using normal CLI subscription behavior. (#64023) Thanks @Alex-Alaniz.",
      "Codex auth: brand Codex OAuth flows as OpenClaw in user-visible auth prompts and diagnostics.",
      "Gateway/pairing: fail closed for paired device records that have no device tokens, and reject pairing approvals whose requested scopes do not match the requested device roles.",
      "ACP/gateway chat: classify lifecycle errors before forwarding them to ACP clients so refusals use ACP's refusal stop reason while transient backend errors continue to finish as normal turns.",
      "Claude CLI/skills: pass eligible OpenClaw skills into CLI runs, including native Claude Code skill resolution via a temporary 插件 plus per-run skill env/API key injection. (#62686, #62723) Thanks @zomars.",
      "Discord: keep generated auto-thread names working with reasoning models by giving title generation enough output budget for thinking plus visible title text. (#64172) Thanks @hanamizuki.",
      "Heartbeat: ignore doc-only Markdown fence markers in the default `HEARTBEAT.md` template so comment-only heartbeat scaffolds skip API calls again. (#61690, #63434) Thanks @ravyg.",
      "Reply/skills: keep resolved skill and memory secret config stable through embedded reply runs so raw SecretRefs in secondary skill settings no longer crash replies when the gateway already has the live env. (#64249) Thanks @mbelinky.",
      "Dreaming/startup: keep 插件-registered startup hooks alive across workspace hook reloads and include dreaming startup owners in the gateway startup 插件 scope, so managed Dreaming cron registration comes back reliably after gateway boot. (#62327, #64258) Thanks @mbelinky.",
      "插件s: treat duplicate `registerService` calls from the same 插件 id as idempotent so snapshot and activation loads no longer emit spurious `service already registered` diagnostics. (#62033, #64128) Thanks @ly85206559.",
      "Discord/TTS: route auto voice replies through the native voice-note path so Discord receives Opus voice messages instead of regular audio attachments. (#64096) Thanks @LiuHuaize.",
      "Config/插件s: use 插件-owned command alias metadata when `插件s.allow` contains runtime command names like `dreaming`, and point users at the owning 插件 instead of stale 插件-not-found g界面dance. (#64191, #64242) Thanks @feiskyer.",
      "Agents/Gemini: strip orphaned `req界面red` entries from Gemini tool schemas so provider validation no longer rejects tools after schema cleanup or union flattening. (#64284) Thanks @xxxxxmax.",
      "Assistant text: strip Qwen-style XML tool call payloads from visible replies so web and channel messages no longer show raw `<tool_call><function=...>` output. (#63999, #64214) Thanks @MoerAI.",
      "Daemon/gateway: prevent systemd restart storms on 配置 errors by exiting with `EX_CONFIG` and 添加ing generated unit restart-prevention guards. (#63913) Thanks @neo1027144-creator.",
      "Agents/exec: prevent gateway crash (\"Agent listener invoked outside active run\") when a subagent exec tool produces stdout/stderr after the agent run has ended or been aborted. (#62821) Thanks @openperf.",
      "Gateway/OpenAI compat: return real `usage` for non-stream `/v1/chat/completions` responses, emit the final usage chunk when `stream_options.include_usage=true`, and bound usage-gated stream finalization after lifecycle end. (#62986) Thanks @Lellansin.",
      "Agents/subagents: deduplicate delivered completion announces so retry or re-entry cleanup does not inject duplicate internal-context completion turns into the parent session. (#61525) Thanks @100yenadmin.",
      "Agents/exec: keep sandboxed `tools.exec.host=auto` sessions from honoring per-call `host=node` or `host=gateway` overrides while a sandbox runtime is active, and stop advertising node routing in that state so exec stays on the sandbox host. (#63880)",
      "Agents/subagents: preserve archived delete-mode runs until `sessions.delete` succeeds and prevent overlapping archive sweeps from duplicating in-flight cleanup attempts. (#61801) Thanks @100yenadmin.",
      "Cron/isolated agent: run scheduled agent turns as non-owner senders so owner-only tools stay unavailable during cron execution. (#63878)",
      "Discord/sandbox: include `image` in sandbox media param normalization so Discord event cover images cannot bypass sandbox path rewriting. (#64377) Thanks @mmaps.",
      "Agents/exec: extend exec completion detection to cover local background exec formats so the owner-downgrade fires correctly for all exec paths. (#64376) Thanks @mmaps.",
      "Hooks/安全: mark agent hook system events as untrusted and sanitize hook display names before cron metadata reuse. (#64372) Thanks @eleqtrizit.",
      "Daemon/launchd: keep `openclaw gateway stop` persistent without uninstalling the macOS LaunchAgent, re-enable it on explicit restart or repair, and harden launchd label handling. (#64447) Thanks @ngutman.",
      "插件s/context engines: preserve `插件s.slots.contextEngine` through normalization and keep explicitly selected workspace context-engine 插件s enabled, so loader diagnostics and 插件 activation stop dropping that slot selection. (#64192) Thanks @hclsys.",
      "Heartbeat: stop top-level `interval:` and `prompt:` fields outside the `tasks:` block from bleeding into the last parsed heartbeat task. (#64488) Thanks @Rahulkumar070.",
      "Agents/OpenAI replay: preserve malformed function-call arguments in stored assistant history, avoid double-encoding preserved raw strings on replay, and coerce replayed string args back to objects at Anthropic and Google provider boundaries. (#61956) Thanks @100yenadmin.",
      "Heartbeat/config: accept and honor `agents.defaults.heartbeat.timeoutSeconds` and per-agent heartbeat timeout overrides for heartbeat agent turns. (#64491) Thanks @cedillarack.",
      "CLI/devices: make implicit `openclaw devices approve` selection preview-only and req界面re approving the exact request ID, preventing latest-request races during device pairing. (#64160) Thanks @coygeek.",
      "Media/安全: honor sender-scoped `toolsBySender` policy for outbound host-media reads so denied senders cannot trigger host file disclosure via attachment hydration. (#64459) Thanks @eleqtrizit.",
      "Browser/安全: reject strict-policy hostname navigation unless the hostname is an explicit allowlist exception or IP literal, and route CDP HTTP discovery through the pinned SSRF fetch path. (#64367) Thanks @eleqtrizit.",
      "Models/vLLM: ignore empty `tool_calls` arrays from reasoning-model OpenAI-compatible replies, reset false `toolUse` stop reasons when no actual tool calls were parsed, and stop sending `tool_choice` unless tools are present so vLLM reasoning responses no longer hang indefinitely. (#61197, #61534) Thanks @balajisiva."
    ]
  }
},
  {
  "version": "2026.4.9",
  "date": "2026-04-09",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "Memory/dreaming: 添加 a grounded REM backfill lane with historical `rem-harness --path`, diary commit/reset flows, cleaner durable-fact extraction, and live short-term promotion 集成 so old daily notes can replay into Dreams and durable memory without a second memory stack. Thanks @mbelinky.",
      "Control 界面/dreaming: 添加 a structured diary view with timeline navigation, backfill/reset controls, traceable dreaming summaries, and a grounded Scene lane with promotion hints plus a safe clear-grounded action for staged backfill signals. (#63395) Thanks @mbelinky.",
      "QA/lab: 添加 character-vibes evaluation reports with model selection and parallel runs so live QA can compare candidate behavior faster.",
      "插件s/provider-auth: let provider manifests declare `providerAuthAliases` so provider variants can share env vars, auth profiles, config-backed auth, and API-key onboarding choices without core-specific wiring.",
      "iOS: pin release versioning to an explicit CalVer in `apps/ios/version.json`, keep TestFlight iteration on the same short version until maintainers intentionally promote the next gateway version, and 添加 the documented `pnpm ios:version:pin -- --from-gateway` workflow for release trains. (#63001) Thanks @ngutman."
    ],
    "improvements": [],
    "bugfixes": [
      "Browser/安全: re-run blocked-destination safety checks after interaction-driven main-frame navigations from click, evaluate, hook-triggered click, and batched action flows, so browser interactions cannot bypass the SSRF quarantine when they land on forbidden URLs. (#63226) Thanks @eleqtrizit.",
      "安全/dotenv: block runtime-control env vars plus browser-control override and skip-server env vars from untrusted workspace `.env` files, and reject unsafe URL-style browser control override specifiers before lazy loading. (#62660, #62663) Thanks @eleqtrizit.",
      "Gateway/node exec events: mark remote node `exec.started`, `exec.finished`, and `exec.denied` summaries as untrusted system events and sanitize node-provided command/output/reason text before enqueueing them, so remote node output cannot inject trusted `System:` content into later turns. (#62659) Thanks @eleqtrizit.",
      "插件s/onboarding auth choices: prevent untrusted workspace 插件s from colliding with bundled provider auth-choice ids during non-interactive onboarding, so bundled provider setup keeps operator secrets out of untrusted workspace 插件 handlers unless those 插件s are explicitly trusted. (#62368) Thanks @pgondhi987.",
      "安全/dependency audit: force `basic-ftp` to `5.2.1` for the CRLF command-injection 修复 and bump Hono plus `@hono/node-server` in production resolution paths.",
      "Android/pairing: clear stale setup-code auth on new QR scans, bootstrap operator and node sessions from fresh pairing, prefer stored device tokens after bootstrap handoff, and pause pairing auto-retry while the app is backgrounded so scan-once Android pairing recovers reliably again. (#63199) Thanks @obviyus.",
      "Matrix/gateway: wait for Matrix sync readiness before marking startup successful, keep Matrix background handler failures contained, and route fatal Matrix sync stops through channel-level restart handling instead of crashing the whole gateway. (#62779) Thanks @gumadeiras.",
      "Slack/media: preserve bearer auth across same-origin `files.slack.com` redirects while still stripping it on cross-origin Slack CDN hops, so `url_private_download` image attachments load again. (#62960) Thanks @vincentkoc.",
      "Reply/doctor: use the active runtime snapshot for queued reply runs, resolve reply-run SecretRefs before preflight helpers touch config, surface gateway OAuth reauth failures to users, and make `openclaw doctor` call out exact reauth commands. (#62693, #63217) Thanks @mbelinky.",
      "Control 界面: guard stale session-history reloads during fast session switches so the selected session and rendered transcript stay in sync. (#62975) Thanks @scoootscooob.",
      "Gateway/chat: suppress exact and streamed `ANNOUNCE_SKIP` / `REPLY_SKIP` control replies across live chat 更新s and history sanitization so internal agent-to-agent control tokens no longer leak into user-facing gateway chat surfaces. (#51739) Thanks @Pinghuachiu.",
      "Auto-reply/NO_REPLY: strip glued leading `NO_REPLY` tokens before reply normalization and ACP-visible streaming so silent sentinel text no longer leaks into user-visible replies while preserving substantive `NO_REPLY ...` text. Thanks @frankekn.",
      "Sessions/routing: preserve established external routes on inter-session announce traffic so `sessions_send` follow-ups do not steal delivery from Telegram, Discord, or other external channels. (#58013) Thanks @duqaXxX.",
      "Gateway/sessions: clear auto-fallback-pinned model overrides on `/reset` and `/new` while still preserving explicit user model selections, including legacy sessions created before override-source tracking existed. (#63155) Thanks @frankekn.",
      "Slack/ACP: treat Slack ACP block replies as visible delivered output so OpenClaw stops re-sending the final fallback text after Slack already rendered the reply. (#62858) Thanks @gumadeiras.",
      "Slack/partial streaming: key turn-local dedupe by dispatch kind and keep the final fallback reply path active when preview finalization fails so stale preview text cannot suppress the actual final answer. (#62859) Thanks @gumadeiras.",
      "Matrix/doctor: migrate legacy `channels.matrix.dm.policy: \"trusted\"` configs back to compatible DM policies during `openclaw doctor --修复`, preserving explicit `allowFrom` boundaries as `allowlist` and defaulting empty legacy configs to `pairing`. (#62942) Thanks @lukeboyett.",
      "npm packaging: mirror bundled channel runtime deps, stage Nostr runtime deps, derive req界面red root mirrors from manifests and b界面lt chunks, and test packed release tarballs without repo `node_modules` so fresh installs fail fast on missing 插件 deps instead of crashing at runtime. (#63065) Thanks @scoootscooob.",
      "QA/live auth: fail fast when live QA scenarios hit classified auth or runtime failure replies, including raw scenario wait paths, and sanitize missing-key g界面dance so gateway auth problems surface as actionable errors instead of timeouts. (#63333) Thanks @shakkernerd.",
      "Providers/OpenAI: default missing reasoning effort to `high` on OpenAI Responses, WebSocket, and compatible completions transports, while still honoring explicit per-run reasoning levels.",
      "Providers/Ollama: allow Ollama models using the native `API: \"ollama\"` path to optionally display thinking output when `/think` is set to a non-off level. (#62712) Thanks @hoyyeva.",
      "Codex CLI: pass OpenClaw's system prompt through Codex's `model_instructions_file` config override so fresh Codex CLI sessions receive the same prompt g界面dance as Claude CLI sessions.",
      "Auth/profiles: persist explicit auth-profile upserts directly and skip external CLI sync for local writes so profile changes are saved without stale external credential state.",
      "Agents/timeouts: make the LLM idle timeout inherit `agents.defaults.timeoutSeconds` when configured, disable the unconfigured idle watchdog for cron runs, and point idle-timeout errors at `agents.defaults.llm.idleTimeoutSeconds`. Thanks @drvoss.",
      "Agents/failover: classify Z.ai vendor code `1311` as billing and `1113` as auth, including long wrapped `1311` payloads, so these errors stop falling through to generic failover handling. (#49552) Thanks @1bcMax.",
      "QQBot/media-tags: 支持 HTML entity-encoded angle brackets (`&lt;`/`&gt;`), URL slashes in attributes, and self-closing media tags so upstream `<qqimg>` payloads are correctly parsed and normalized. (#60493) Thanks @ylc0919.",
      "Memory/dreaming: harden grounded backfill inputs, diary writes, status payloads, and diary action classification by preserving source-day labels, rejecting missing or symlinked targets cleanly, normalizing diary headings in gateway backfills, and tightening claim splitting plus diary source metadata. Thanks @mbelinky.",
      "Memory/dreaming: accept embedded heartbeat trigger tokens so light and REM dreaming still run when runtime wrappers include extra heartbeat text.",
      "Android/manual connect: allow blank port input only for TLS manual gateway endpoints so standard HTTPS Tailscale hosts default to `443` without silently changing cleartext manual connects. (#63134) Thanks @Tyler-RNG.",
      "Windows/更新: 添加 heap headroom to Windows `pnpm b界面ld` steps during dev 更新s so 更新 preflight b界面lds stop failing on low default Node memory.",
      "插件 SDK: export the channel 插件 base and web-search config contract through the public package so 插件s can use them without private imports.",
      "插件s/contracts: keep test-only helpers out of production contract barrels, load shared contract harnesses through bundled test surfaces, and harden guardrails so indirect re-exports and canonical `*.test.ts` files stay blocked. (#63311) Thanks @altaywtf.",
      "Control 界面/models: preserve provider-qualified refs for OpenRouter catalog models whose ids already contain slashes so picker selections submit allowlist-compatible model refs instead of dropping the `openrouter/` pre修复. (#63416) Thanks @sallyom.",
      "插件 SDK/command auth: split command status b界面lders onto the lightweight `openclaw/插件-sdk/command-status` subpath while preserving deprecated `command-auth` 兼容性 exports, so auth-only 插件 imports no longer pull status/context warmup into CLI onboarding paths. (#63174) Thanks @hxy91819."
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
      "Memory/dreaming: 添加 a grounded REM backfill lane with historical `rem-harness --path`, diary commit/reset flows, cleaner durable-fact extraction, and live short-term promotion 集成 so old daily notes can replay into Dreams and durable memory without a second memory stack. Thanks @mbelinky.",
      "Control 界面/dreaming: 添加 a structured diary view with timeline navigation, backfill/reset controls, traceable dreaming summaries, and a grounded Scene lane with promotion hints plus a safe clear-grounded action for staged backfill signals. (#63395) Thanks @mbelinky.",
      "QA/lab: 添加 character-vibes evaluation reports with model selection and parallel runs so live QA can compare candidate behavior faster.",
      "插件s/provider-auth: let provider manifests declare `providerAuthAliases` so provider variants can share env vars, auth profiles, config-backed auth, and API-key onboarding choices without core-specific wiring.",
      "iOS: pin release versioning to an explicit CalVer in `apps/ios/version.json`, keep TestFlight iteration on the same short version until maintainers intentionally promote the next gateway version, and 添加 the documented `pnpm ios:version:pin -- --from-gateway` workflow for release trains. (#63001) Thanks @ngutman."
    ],
    "improvements": [],
    "bugfixes": [
      "Browser/安全: re-run blocked-destination safety checks after interaction-driven main-frame navigations from click, evaluate, hook-triggered click, and batched action flows, so browser interactions cannot bypass the SSRF quarantine when they land on forbidden URLs. (#63226) Thanks @eleqtrizit.",
      "安全/dotenv: block runtime-control env vars plus browser-control override and skip-server env vars from untrusted workspace `.env` files, and reject unsafe URL-style browser control override specifiers before lazy loading. (#62660, #62663) Thanks @eleqtrizit.",
      "Gateway/node exec events: mark remote node `exec.started`, `exec.finished`, and `exec.denied` summaries as untrusted system events and sanitize node-provided command/output/reason text before enqueueing them, so remote node output cannot inject trusted `System:` content into later turns. (#62659) Thanks @eleqtrizit.",
      "插件s/onboarding auth choices: prevent untrusted workspace 插件s from colliding with bundled provider auth-choice ids during non-interactive onboarding, so bundled provider setup keeps operator secrets out of untrusted workspace 插件 handlers unless those 插件s are explicitly trusted. (#62368) Thanks @pgondhi987.",
      "安全/dependency audit: force `basic-ftp` to `5.2.1` for the CRLF command-injection 修复 and bump Hono plus `@hono/node-server` in production resolution paths.",
      "Android/pairing: clear stale setup-code auth on new QR scans, bootstrap operator and node sessions from fresh pairing, prefer stored device tokens after bootstrap handoff, and pause pairing auto-retry while the app is backgrounded so scan-once Android pairing recovers reliably again. (#63199) Thanks @obviyus.",
      "Matrix/gateway: wait for Matrix sync readiness before marking startup successful, keep Matrix background handler failures contained, and route fatal Matrix sync stops through channel-level restart handling instead of crashing the whole gateway. (#62779) Thanks @gumadeiras.",
      "Slack/media: preserve bearer auth across same-origin `files.slack.com` redirects while still stripping it on cross-origin Slack CDN hops, so `url_private_download` image attachments load again. (#62960) Thanks @vincentkoc.",
      "Reply/doctor: use the active runtime snapshot for queued reply runs, resolve reply-run SecretRefs before preflight helpers touch config, surface gateway OAuth reauth failures to users, and make `openclaw doctor` call out exact reauth commands. (#62693, #63217) Thanks @mbelinky.",
      "Control 界面: guard stale session-history reloads during fast session switches so the selected session and rendered transcript stay in sync. (#62975) Thanks @scoootscooob.",
      "Gateway/chat: suppress exact and streamed `ANNOUNCE_SKIP` / `REPLY_SKIP` control replies across live chat 更新s and history sanitization so internal agent-to-agent control tokens no longer leak into user-facing gateway chat surfaces. (#51739) Thanks @Pinghuachiu.",
      "Auto-reply/NO_REPLY: strip glued leading `NO_REPLY` tokens before reply normalization and ACP-visible streaming so silent sentinel text no longer leaks into user-visible replies while preserving substantive `NO_REPLY ...` text. Thanks @frankekn.",
      "Sessions/routing: preserve established external routes on inter-session announce traffic so `sessions_send` follow-ups do not steal delivery from Telegram, Discord, or other external channels. (#58013) Thanks @duqaXxX.",
      "Gateway/sessions: clear auto-fallback-pinned model overrides on `/reset` and `/new` while still preserving explicit user model selections, including legacy sessions created before override-source tracking existed. (#63155) Thanks @frankekn.",
      "Slack/ACP: treat Slack ACP block replies as visible delivered output so OpenClaw stops re-sending the final fallback text after Slack already rendered the reply. (#62858) Thanks @gumadeiras.",
      "Slack/partial streaming: key turn-local dedupe by dispatch kind and keep the final fallback reply path active when preview finalization fails so stale preview text cannot suppress the actual final answer. (#62859) Thanks @gumadeiras.",
      "Matrix/doctor: migrate legacy `channels.matrix.dm.policy: \"trusted\"` configs back to compatible DM policies during `openclaw doctor --修复`, preserving explicit `allowFrom` boundaries as `allowlist` and defaulting empty legacy configs to `pairing`. (#62942) Thanks @lukeboyett.",
      "npm packaging: mirror bundled channel runtime deps, stage Nostr runtime deps, derive req界面red root mirrors from manifests and b界面lt chunks, and test packed release tarballs without repo `node_modules` so fresh installs fail fast on missing 插件 deps instead of crashing at runtime. (#63065) Thanks @scoootscooob.",
      "QA/live auth: fail fast when live QA scenarios hit classified auth or runtime failure replies, including raw scenario wait paths, and sanitize missing-key g界面dance so gateway auth problems surface as actionable errors instead of timeouts. (#63333) Thanks @shakkernerd.",
      "Providers/OpenAI: default missing reasoning effort to `high` on OpenAI Responses, WebSocket, and compatible completions transports, while still honoring explicit per-run reasoning levels.",
      "Providers/Ollama: allow Ollama models using the native `API: \"ollama\"` path to optionally display thinking output when `/think` is set to a non-off level. (#62712) Thanks @hoyyeva.",
      "Codex CLI: pass OpenClaw's system prompt through Codex's `model_instructions_file` config override so fresh Codex CLI sessions receive the same prompt g界面dance as Claude CLI sessions.",
      "Auth/profiles: persist explicit auth-profile upserts directly and skip external CLI sync for local writes so profile changes are saved without stale external credential state.",
      "Agents/timeouts: make the LLM idle timeout inherit `agents.defaults.timeoutSeconds` when configured, disable the unconfigured idle watchdog for cron runs, and point idle-timeout errors at `agents.defaults.llm.idleTimeoutSeconds`. Thanks @drvoss.",
      "Agents/failover: classify Z.ai vendor code `1311` as billing and `1113` as auth, including long wrapped `1311` payloads, so these errors stop falling through to generic failover handling. (#49552) Thanks @1bcMax.",
      "QQBot/media-tags: 支持 HTML entity-encoded angle brackets (`&lt;`/`&gt;`), URL slashes in attributes, and self-closing media tags so upstream `<qqimg>` payloads are correctly parsed and normalized. (#60493) Thanks @ylc0919.",
      "Memory/dreaming: harden grounded backfill inputs, diary writes, status payloads, and diary action classification by preserving source-day labels, rejecting missing or symlinked targets cleanly, normalizing diary headings in gateway backfills, and tightening claim splitting plus diary source metadata. Thanks @mbelinky.",
      "Memory/dreaming: accept embedded heartbeat trigger tokens so light and REM dreaming still run when runtime wrappers include extra heartbeat text.",
      "Android/manual connect: allow blank port input only for TLS manual gateway endpoints so standard HTTPS Tailscale hosts default to `443` without silently changing cleartext manual connects. (#63134) Thanks @Tyler-RNG.",
      "Windows/更新: 添加 heap headroom to Windows `pnpm b界面ld` steps during dev 更新s so 更新 preflight b界面lds stop failing on low default Node memory.",
      "插件 SDK: export the channel 插件 base and web-search config contract through the public package so 插件s can use them without private imports.",
      "插件s/contracts: keep test-only helpers out of production contract barrels, load shared contract harnesses through bundled test surfaces, and harden guardrails so indirect re-exports and canonical `*.test.ts` files stay blocked. (#63311) Thanks @altaywtf.",
      "Control 界面/models: preserve provider-qualified refs for OpenRouter catalog models whose ids already contain slashes so picker selections submit allowlist-compatible model refs instead of dropping the `openrouter/` pre修复. (#63416) Thanks @sallyom.",
      "插件 SDK/command auth: split command status b界面lders onto the lightweight `openclaw/插件-sdk/command-status` subpath while preserving deprecated `command-auth` 兼容性 exports, so auth-only 插件 imports no longer pull status/context warmup into CLI onboarding paths. (#63174) Thanks @hxy91819."
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
      "Telegram/setup: load setup and secret contracts through packaged top-level sidecars so installed npm b界面lds no longer try to import missing `dist/extensions/telegram/src/*` files during gateway startup.",
      "Bundled channels/setup: load shared secret contracts through packaged top-level sidecars across BlueBubbles, Feishu, Google Chat, IRC, Matrix, Mattermost, Microsoft Teams, Nextcloud Talk, Slack, and Zalo so installed npm b界面lds no longer rely on missing `dist/extensions/*/src/*` files during gateway startup.",
      "Bundled 插件s: align packaged 插件 兼容性 metadata with the release version so bundled channels and providers load on OpenClaw 2026.4.8.",
      "Agents/progress: keep `更新_plan` available for OpenAI-family runs while returning compact success payloads and allowing `tools.experimental.planTool=false` to opt out.",
      "Agents/exec: keep `/exec` current-default reporting aligned with real runtime behavior so `host=auto` sessions surface the correct host-aware fallback policy (`full/off` on gateway or node, `deny/off` on sandbox) instead of stale stricter defaults.",
      "Slack: honor ambient HTTP(S) proxy settings for Socket Mode WebSocket connections, including NO_PROXY exclusions, so proxy-only deployments can connect without a monkey patch. (#62878) Thanks @mjamiv.",
      "Slack/actions: pass the already resolved read token into `downloadFile` so SecretRef-backed bot tokens no longer fail after a raw config re-read. (#62097) Thanks @martingarramon.",
      "Network/fetch guard: skip target DNS pinning when trusted env-proxy mode is active so proxy-only sandboxes can let the trusted proxy resolve outbound hosts. (#59007) Thanks @cluster2600."
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

// 滚动到指定版本（已存在，无需重复声明）

// 监听滚动，更新当前活跃版本
const updateActiveVersion = () => {
  const versions = changelogData.value.map(v => v.version)
  const scrollPosition = window.scrollY + 100
  
  for (const version of versions) {
    const element = document.getElementById(`version-${version}`)
    if (element) {
      const elementTop = element.offsetTop
      const elementBottom = elementTop + element.offsetHeight
      
      if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
        activeVersion.value = version
        break
      }
    }
  }
}

onMounted(() => {
  // 设置默认活跃版本为最新版
  if (changelogData.value.length > 0) {
    const latest = changelogData.value.find(v => v.latest)
    activeVersion.value = latest ? latest.version : changelogData.value[0].version
  }
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // 监听滚动事件
  window.addEventListener('scroll', updateActiveVersion)

  // 添加滚动事件监听
  window.addEventListener('scroll', handleNavScroll, { passive: true })
  
  // 初始化时检测一次位置
  handleScroll();
  })

// 在组件卸载时移除事件监听
onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', updateActiveVersion)

  // 移除滚动事件监听
  window.removeEventListener('scroll', handleNavScroll)
  })
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


  /* 版本导航样式 */
  .version-navigation {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(160, 82, 45, 0.05) 100%);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin: var(--space-6) 0;
    border: 1px solid rgba(139, 69, 19, 0.1);
  }

  .nav-container {
    max-width: 100%;
  }

  .nav-title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .nav-title::before {
    content: "🧭";
    font-size: var(--text-xl);
  }

  .nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    max-height: 200px;
    overflow-y: auto;
    padding-right: var(--space-2);
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .nav-item:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .nav-item.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .nav-item.latest {
    border-color: var(--color-accent);
  }

  .nav-item.latest:hover {
    background: var(--color-accent-light);
    color: var(--color-accent);
  }

  .nav-item.latest.active {
    background: var(--color-accent);
    color: white;
  }

  .nav-version {
    font-family: var(--font-mono);
  }

  .nav-latest-badge {
    background: var(--color-accent);
    color: white;
    font-size: var(--text-xs);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-weight: 600;
  }

  .nav-item.active .nav-latest-badge {
    background: rgba(255, 255, 255, 0.2);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .version-navigation {
      padding: var(--space-3);
      margin: var(--space-4) 0;
    }

    .nav-title {
      font-size: var(--text-base);
    }

    .nav-list {
      max-height: 150px;
      gap: var(--space-1);
    }

    .nav-item {
      padding: var(--space-1) var(--space-2);
      font-size: var(--text-xs);
    }
  }

  @media (max-width: 480px) {
    .nav-list {
      max-height: 120px;
    }

    .nav-item {
      padding: var(--space-1) var(--space-2);
      font-size: var(--text-xs);
    }

    .nav-latest-badge {
      font-size: 10px;
      padding: 1px 4px;
    }
  }

.virtual-scroll-container {
  height: 600px;
  overflow-y: auto;
  position: relative;
  will-change: scroll-position;
}

.virtual-scroll-content {
  position: relative;
}

.virtual-scroll-items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}

.changelog-item {
  contain: layout style paint;
  will-change: transform, opacity;
}
/* 导航自动隐藏样式 */
.version-navigation {
  position: fixed;
  left: 20px;
  top: 100px;
  width: 180px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.version-navigation.nav-hidden {
  transform: translateX(-220px);
  opacity: 0;
}

.nav-container {
  padding: 15px;
}

.nav-title {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 2px 0;
}

.nav-item a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  border-radius: 3px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item a:hover {
  background: #f5f5f5;
  color: #333;
}

.nav-item.active a {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

.nav-version {
  font-weight: 500;
}

.nav-latest {
  display: inline-block;
  background: #1976d2;
  color: white;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 6px;
  font-weight: normal;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: var(--color-accent-hover, var(--color-accent));
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.back-to-top-icon {
  transition: transform 0.2s ease;
}

.back-to-top:hover .back-to-top-icon {
  transform: translateY(-2px);
}

/* Layout with Sidebar */
.changelog-layout {
  display: flex;
  min-height: calc(100vh - 200px);
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Sidebar Styles */
.changelog-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 50;
}

.changelog-sidebar.sidebar-hidden {
  width: 0;
  overflow: hidden;
}

.sidebar-container {
  background: var(--color-bg-secondary, var(--color-bg-tertiary));
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-tertiary, var(--color-bg-secondary));
}

.sidebar-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.sidebar-toggle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.sidebar-toggle:hover {
  background: var(--color-accent, var(--color-text-accent));
  color: white;
  border-color: var(--color-accent, var(--color-text-accent));
}

.sidebar-content {
  padding: var(--space-2);
}

.version-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.version-item {
  margin-bottom: var(--space-1);
}

.version-link {
  display: block;
  padding: var(--space-2) var(--space-3);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  color: var(--color-text-secondary);
}

.version-link:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.version-item.active .version-link {
  background: var(--color-accent, var(--color-text-accent));
  color: white;
}

.version-number {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.latest-badge-sidebar {
  display: inline-block;
  background: var(--color-success, #10b981);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  margin-left: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.version-date {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  opacity: 0.8;
}

/* Main Content */
.changelog-content {
  flex: 1;
  min-width: 0;
  transition: margin-left 0.3s ease;
}

.changelog-content.content-expanded {
  margin-left: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .changelog-layout {
    padding: 0 var(--space-4);
  }
  
  .changelog-sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .changelog-layout {
    flex-direction: column;
    padding: 0 var(--space-4);
  }
  
  .changelog-sidebar {
    width: 100%;
    position: relative;
    top: 0;
    max-height: none;
    margin-bottom: var(--space-6);
  }
  
  .changelog-sidebar.sidebar-hidden {
    width: 100%;
    height: 0;
    margin-bottom: 0;
  }
  
  .sidebar-container {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .changelog-content {
    margin-left: 0 !important;
  }
}

@media (max-width: 640px) {
  .changelog-layout {
    padding: 0 var(--space-3);
  }
  
  .sidebar-header {
    padding: var(--space-3);
  }
  
  .sidebar-content {
    padding: var(--space-1);
  }
  
  .version-link {
    padding: var(--space-1) var(--space-2);
  }
}</style>
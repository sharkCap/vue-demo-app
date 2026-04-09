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

      <!-- Changelog Content -->
      <main class="changelog-content animate-scale-in">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="changelog-list">
            <div 
              v-for="(release, index) in changelogData" 
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
},
  {
  "version": "2026.4.7",
  "date": "2026-04-08",
  "type": "稳定版",
  "latest": false,
  "changes": {
    "features": [
      "CLI/infer: 添加 a first-class `openclaw infer ...` hub for provider-backed inference workflows across model, media, web, and embedding tasks. Thanks @Takhoffman.",
      "Tools/media generation: auto-fallback across auth-backed image, music, and video providers by default, preserve intent during provider switches, remap size/aspect/resolution/duration hints to the closest 支持ed option, and surface provider capabilities plus mode-aware video-to-video 支持.",
      "Memory/wiki: restore the bundled `memory-wiki` stack with 插件, CLI, sync/query/apply tooling, memory-host 集成, structured claim/evidence fields, compiled digest retrieval, claim-health linting, contradiction clustering, staleness dashboards, and freshness-weighted search. Thanks @vincentkoc.",
      "插件s/webhooks: 添加 a bundled webhook ingress 插件 so external automation can create and drive bound TaskFlows through per-route shared-secret endpoints. (#61892) Thanks @mbelinky.",
      "Gateway/sessions: 添加 persisted compaction checkpoints plus Sessions 界面 branch/restore actions so operators can inspect and recover pre-compaction session state. (#62146) Thanks @scoootscooob.",
      "Compaction: 添加 pluggable compaction provider registry so 插件s can replace the b界面lt-in summarization pipeline. Configure via `agents.defaults.compaction.provider`; falls back to LLM summarization on provider failure. (#56224) Thanks @DhruvBhatia0.",
      "Agents/system prompt: 添加 `agents.defaults.systemPromptOverride` for controlled prompt experiments plus heartbeat prompt-section controls so heartbeat runtime behavior can stay enabled without injecting heartbeat instructions every turn.",
      "Providers/Google: 添加 Gemma 4 model 支持 and keep Google fallback resolution on the requested provider path so native Google Gemma routes work again. (#61507) Thanks @eyjohn.",
      "Providers/Google: preserve explicit thinking-off semantics for Gemma 4 while still enabling Gemma reasoning 支持 in 兼容性 wrappers. (#62127) Thanks @romgenie.",
      "Providers/Arcee AI: 添加 a bundled Arcee AI provider 插件 with Trinity catalog entries, OpenRouter 支持, and 更新d onboarding/auth g界面dance. (#62068) Thanks @arthurbr11.",
      "Providers/Anthropic: restore Claude CLI as the preferred local Anthropic path in onboarding, model-auth g界面dance, doctor flows, and Docker Claude CLI live lanes again.",
      "Providers/Ollama: detect vision capability from the `/API/show` response and set image input on models that 支持 it so Ollama vision models accept image attachments. (#62193) Thanks @BruceMacD.",
      "Memory/dreaming: ingest redacted session transcripts into the dreaming corpus with per-day session-corpus notes, cursor checkpointing, and promotion/doctor 支持. (#62227) Thanks @vignesh07.",
      "Providers/inferrs: 添加 string-content 兼容性 for stricter OpenAI-compatible chat backends, document `inferrs` setup with a full config example, and 添加 troubleshooting g界面dance for local backends that pass direct probes but fail on full agent-runtime prompts.",
      "Agents/context engine: expose prompt-cache runtime context to context engines and keep current-turn prompt-cache usage aligned with the active attempt instead of stale prior-turn assistant state. (#62179) Thanks @jalehman.",
      "插件 SDK/context engines: pass `availableTools` and `citationsMode` into `assemble()`, and expose memory-artifact and memory-prompt seams so companion 插件s and non-legacy context engines can consume active memory state without reaching into internals. Thanks @vincentkoc.",
      "ACP/ACPX 插件: bump the bundled `acpx` pin to `0.5.1` so 插件-local installs and strict version checks pick up the latest published runtime release. (#62148) Thanks @onutc.",
      "Discord/events: allow `event-create` to accept a cover image URL or local file path, load and validate PNG/JPG/GIF event cover media, and pass the encoded image payload through Discord admin action/runtime paths. (#60883) Thanks @bittoby."
    ],
    "improvements": [],
    "bugfixes": [
      "CLI/infer: keep provider-backed infer behavior aligned with actual runtime execution by 修复ing explicit TTS override handling, profile-aware gateway TTS prefs resolution, per-request transcription `prompt`/`language` overrides, image output MIME/extension mismatches, configured web-search fallback behavior, and agent-vs-CLI web-search execution drift.",
      "插件s/media: when `插件s.allow` is set, capability fallback now merges bundled capability 插件 ids into the allowlist (not only `插件s.entries`), so media understanding providers such as OpenAI-compatible STT load for voice transcription without req界面ring `openai` in `插件s.allow`. (#62205) Thanks @neeravmakwana.",
      "Agents/history and replies: buffer phaseless OpenAI WS text until a real assistant phase arrives, keep replay and SSE history sequence tracking aligned, hide commentary and leaked tool XML from user-visible history, and keep history-based follow-up replies on `final_answer` text only. (#61729, #61747, #61829, #61855, #61954) Thanks @100yenadmin and contributors.",
      "Control 界面: show `/tts` audio replies in webchat, detect mistaken `?token=` auth links with the correct `#token=` hint, and keep Copy, Canvas, and mobile exec-approval 界面 from covering chat content on narrow screens. (#54842, #61514, #61598) Thanks @neeravmakwana.",
      "iOS/gateway: replace string-matched connection error 界面 with structured gateway connection problems, preserve actionable pairing/auth failures over later generic disconnect noise, and surface reusable problem banners and details across onboarding, settings, and root status surfaces. (#62650) Thanks @ngutman.",
      "T界面: route `/status` through the shared session-status command, keep commentary hidden in history, strip raw envelope metadata from async command notices, preserve fallback streaming before per-attempt failures finalize, and restore Kitty keyboard state on exit or fatal crashes. (#49130, #59985, #60043, #61463) Thanks @biefan and contributors.",
      "iOS/Watch exec approvals: keep Apple Watch review and approval recovery working while the iPhone is locked or backgrounded, including reconnect recovery, pending approval persistence, notification cleanup, and APNs-backed watch refresh recovery. (#61757) Thanks @ngutman.",
      "Agents/context overflow: combine oversized and aggregate tool-result recovery in one pass and restore a total-context overflow backstop so recoverable sessions retry instead of failing early. (#61651) Thanks @Takhoffman.",
      "Auth/OpenAI Codex OAuth: reload fresh on-disk credentials inside the locked refresh path and retry once after `refresh_token_reused` rotates only the stored refresh token, so relogin/restart recovery stops getting stuck on stale cached auth state. Thanks @owen-ever.",
      "Auth/OpenAI Codex OAuth: keep native `/model ...@profile` selections on the target session and honor explicit user-locked auth profiles even when per-agent auth order excludes them. (#62744) Thanks @jalehman.",
      "Providers/Anthropic: preserve thinking blocks for Claude Opus 4.5+, Sonnet 4.5+, and newer Claude 4-family models so prompt-cache pre修复es keep matching, and skip `service_tier` injection on OAuth-authenticated stream wrapper requests so Claude OAuth streaming stops failing with HTTP 401. (#60356, #61793)",
      "Agents/Claude CLI: surface nested API error messages from structured CLI output so billing/auth/provider failures show the real provider error instead of an opaque CLI failure.",
      "Agents/exec: preserve explicit `host=node` routing under elevated defaults when `tools.exec.host=auto`, fail loud on invalid elevated cross-host overrides, and keep `strictInlineEval` commands blocked after approval timeouts instead of falling through to automatic execution. (#61739) Thanks @obviyus.",
      "Nodes/exec approvals: keep `host=node` POSIX transport shell wrappers (`/bin/sh -lc ...`) aligned with inner-command allowlist analysis so allowlisted scripts stop prompting unnecessarily, while Windows `cmd.exe` wrapper runs stay approval-gated. (#62401) Thanks @ngutman.",
      "Nodes/exec approvals: keep Windows `cmd.exe /c` wrapper runs approval-gated even when `env` carriers, including env-assignment carriers, wrap the shell invocation. (#62439) Thanks @ngutman.",
      "Gateway tool/exec config: block model-facing `gateway config.apply` and `config.patch` writes from changing exec approval paths such as `safeBins`, `safeBinProfiles`, `safeBinTrustedDirs`, and `strictInlineEval`, while still allowing unchanged structured values through. (#62001) Thanks @eleqtrizit.",
      "Host exec/env sanitization: block dangerous Java, Rust, Cargo, Git, Kubernetes, cloud credential, config-path, and Helm env overrides so host-run tools cannot be redirected to attacker-chosen code, config, credentials, or repository state. (#59119, #62002, #62291) Thanks @eleqtrizit and contributors.",
      "Commands/allowlist: req界面re owner authorization for `/allowlist 添加` and `/allowlist 移除` before channel resolution, so non-owner but command-authorized senders can no longer persistently rewrite allowlist policy state. (#62383) Thanks @pgondhi987.",
      "Feishu/docx uploads: honor `tools.fs.workspaceOnly` for local `upload_file` and `upload_image` paths by forwarding workspace-constrained `localRoots` into the media loader, so docx uploads can no longer read host-local files outside the workspace when workspace-only mode is active. (#62369) Thanks @pgondhi987.",
      "Network/fetch guard: drop request bodies and body-describing headers on cross-origin `307` and `308` redirects by default, so attacker-controlled redirect hops cannot receive secret-bearing POST payloads from SSRF-guarded fetch flows unless a caller explicitly opts in. (#62357) Thanks @pgondhi987.",
      "Browser/SSRF: treat main-frame `document` redirect hops as navigations even when Playwright does not flag them as `isNavigationRequest()`, so strict private-network blocking still stops forbidden redirect pivots before the browser reaches the internal target. (#62355) Thanks @pgondhi987.",
      "Browser/node invoke: block persistent browser profile create, reset, and delete mutations through `browser.proxy` on both gateway-forwarded `node.invoke` and the node-host proxy path, even when no profile allowlist is configured. (#60489)",
      "Gateway/node pairing: req界面re a fresh pairing request when a previously paired node reconnects with 添加itional declared commands, and keep the live session pinned to the earlier approved command set until the upgrade is approved. (#62658) Thanks @eleqtrizit.",
      "Gateway/auth: invalidate existing shared-token and password WebSocket sessions when the configured secret rotates, so stale authenticated sockets cannot stay attached after token or password changes. (#62350) Thanks @pgondhi987.",
      "MS Teams/安全: validate file-consent upload URLs against HTTPS, Microsoft/SharePoint host allowlists, and private-IP DNS checks before uploading attachments, blocking SSRF-style consent-upload abuse. (#23596)",
      "Media/base64 decode guards: enforce byte limits before decoding missed base64-backed Teams, Signal, QQ Bot, and image-tool payloads so oversized inbound media and data URLs no longer bypass pre-decode size checks. (#62007) Thanks @eleqtrizit.",
      "Runtime event trust: mark background `notifyOnExit` summaries, ACP parent-stream relays, and wake-hook payloads as untrusted system events so lower-trust runtime output no longer re-enters later turns as trusted `System:` text. (#62003)",
      "Auto-reply/media: allow managed generated-media `MEDIA:` paths from normal reply text again while still blocking arbitrary host-local media and document paths, so generated media keep delivering without reopening host-path injection holes.",
      "Gateway/status and containers: auto-bind to `0.0.0.0` inside Docker and Podman environments, and probe local TLS gateways over `wss://` with self-signed fingerprint forwarding so container startup and loopback TLS status checks work again. (#61818, #61935) Thanks @openperf and contributors.",
      "Gateway/OpenAI-compatible HTTP: abort in-flight `/v1/chat/completions` and `/v1/responses` turns when clients disconnect so abandoned HTTP requests stop wasting agent runtime. (#54388) Thanks @Lellansin.",
      "macOS/gateway version: strip trailing commit metadata from CLI version output before semver parsing so the Mac app recognizes installed gateway versions like `OpenClaw 2026.4.2 (d74a122)` again. (#61111) Thanks @oliviareid-svg.",
      "Sessions/model selection: resolve the explicitly selected session model separately from runtime fallback resolution so session status and live model switching stay aligned with the chosen model.",
      "Discord/ACP bindings: canonicalize DM conversation identity across inbound messages, component interactions, native commands, and current-conversation binding resolution so `--bind here` in Discord DMs keeps routing follow-up replies to the bound agent instead of falling back to the default agent.",
      "Discord: recover forwarded referenced message text and attachments when snapshots are missing, use `ws://` again for gateway monitor sockets, stop forcing a hardcoded temperature for Codex-backed auto-thread titles, and harden voice receive recovery so rAPId speaker restarts keep their next utterance. (#41536, #61670) Thanks @artwalker and contributors.",
      "Slack/thread mentions: 添加 `channels.slack.thread.req界面reExplicitMention` so Slack channels that already req界面re mentions can also req界面re explicit `@bot` mentions inside bot-participated threads. (#58276) Thanks @praktika-engineer.",
      "Slack/threading: keep legacy thread stickiness for real replies when older callers omit `isThreadReply`, while still honoring `replyToMode` for Slack's auto-created top-level `thread_ts`. (#61835) Thanks @kaonash.",
      "Slack/media: keep attachment downloads on the SSRF-guarded dispatcher path so Slack media fetching works on Node 22 without dropping pinned transport enforcement. (#62239) Thanks @openperf.",
      "Matrix/onboarding: 添加 an invite auto-join setup step with explicit off warnings and strict stable-target validation so new Matrix accounts stop silently ignoring invited rooms and fresh DM-style invites unless operators opt in. (#62168) Thanks @gumadeiras.",
      "Matrix/formatting: preserve multi-paragraph and loose-list rendering in Element so numbered and bulleted Markdown keeps their content attached to the correct list item. (#60997) Thanks @gucasbrg.",
      "Telegram/doctor: keep top-level access-control fallback in place during multi-account normalization while still promoting legacy default auth into `accounts.default`, so existing named bots keep inherited allowlists without dropping the legacy default bot. (#62263) Thanks @obviyus.",
      "插件s/loaders: centralize bundled `dist/**` Jiti native-load policy and keep channel, public-surface, facade, and config-metadata loader seams off native Jiti on Windows so onboarding and configure flows stop tripping `ERR_UN支持ED_ESM_URL_SCHEME`. (#62286) Thanks @chen-zhang-cs-code.",
      "插件s/channels: keep bundled channel artifact and secret-contract loading stable under lazy loading, preserve 插件-schema defaults during install, and 修复 Windows `file://` plus native-Jiti 插件 loader paths so onboarding, doctor, `openclaw secret`, and bundled 插件 installs work again. (#61832, #61836, #61853, #61856) Thanks @Zeesejo and contributors.",
      "插件s/ClawHub: verify downloaded 插件 archives against version metadata SHA-256, fail closed when archive integrity metadata is missing or malformed, and tighten fallback ZIP verification so 插件 installs cannot proceed on mismatched or incomplete ClawHub package metadata. (#60517) Thanks @mappel-nv.",
      "插件s/provider hooks: stop recursive provider snapshot loads from overflowing the stack during 插件 initialization, while still preserving cached nested provider-hook results. (#61922, #61938, #61946, #61951)",
      "Docker/插件s: stop forcing bundled 插件 discovery to `/app/extensions` in runtime images so packaged installs use compiled `dist/extensions` artifacts again and Node 24 containers do not boot through source-only 插件 entry paths. 修复es #62044. (#62316) Thanks @gumadeiras.",
      "Providers/Ollama: honor the selected provider's `baseUrl` during streaming so multi-Ollama setups stop routing every stream to the first configured Ollama endpoint. (#61678)",
      "Providers/Ollama: stop warning that Ollama could not be reached when discovery only sees empty default local stubs, while still keeping real explicit Ollama overrides loud when the endpoint is unreachable.",
      "Providers/xAI: recognize `API.grok.x.ai` as an xAI-native endpoint again and keep legacy `x_search` auth resolution working so older xAI web-search configs continue to load. (#61377) Thanks @jjjojoj.",
      "Providers/Mistral: send `reasoning_effort` for `mistral/mistral-small-latest` (Mistral Small 4) with thinking-level mapping, and mark the catalog entry as reasoning-capable so adjustable reasoning matches Mistral’s Chat Completions API. (#62162) Thanks @neeravmakwana.",
      "OpenAI TTS/Groq: send `wav` to Groq-compatible speech endpoints, honor explicit `responseFormat` overrides on OpenAI-compatible paths, and only mark voice-note output as voice-compatible when the actual format is `opus`. (#62233) Thanks @neeravmakwana.",
      "Tools/web_fetch and web_search: 修复 `TypeError: fetch failed` caused by undici 8.0 enabling HTTP/2 by default; pinned SSRF-guard dispatchers now explicitly set `allowH2: false` to restore HTTP/1.1 behavior and keep the custom DNS-pinning lookup compatible. (#61738, #61777) Thanks @zozo123.",
      "Tools/web search/Exa: show Exa Search in onboarding and configure provider pickers again by marking the bundled Exa provider as setup-visible. Thanks @vincentkoc.",
      "Memory/vector recall: surface explicit warnings when `sqlite-vec` is unavailable or vector writes are degraded, and strip managed Light Sleep and REM blocks before daily-note ingestion so memory indexing and dreaming stop reporting false-success or re-ingesting staged output. (#61720) Thanks @MonkeyLeeT.",
      "Memory/dreaming: make Dreams config reads and writes respect the selected memory slot 插件 instead of always targeting `memory-core`. (#62275) Thanks @SnowSky1.",
      "QQ Bot/media: route gateway-side attachment and fallback downloads through guarded QQ/Tencent HTTPS fetches so QQ media handling no longer follows arbitrary remote hosts.",
      "Browser/remote CDP: retry the DevTools websocket once after remote browser restarts so healthy remote browser profiles do not fail availability checks during CDP warm-up. (#57397) Thanks @ThanhNguyxn07.",
      "界面/light mode: target both root and nested WebKit scrollbar thumbs in the light theme so page-level and container scrollbars stay visible on light backgrounds. (#61753) Thanks @chziyue.",
      "Agents/subagents: honor `sessions_spawn(lightContext: true)` for spawned subagent runs by preserving lightweight bootstrap context through the gateway and embedded runner instead of silently falling back to full workspace bootstrap injection. (#62264) Thanks @theSamPadilla.",
      "Cron: load `jobId` into `id` when the on-disk store omits `id`, matching doctor migration and 修复ing `unknown cron job id` for hand-edited `jobs.json`. (#62246) Thanks @neeravmakwana.",
      "Agents/model fallback: classify minimal HTTP 404 API errors (for example `404 status code (no body)`) as `model_not_found` so assistant failures throw into the fallback chain instead of stopping at the first fallback candidate. (#62119) Thanks @neeravmakwana.",
      "BlueBubbles/network: respect explicit private-network opt-out for loopback and private `serverUrl` values across account resolution, status probes, monitor startup, and attachment downloads, while keeping public-host attachment hostname pinning intact. (#59373) Thanks @jpreagan.",
      "Agents/heartbeat: keep heartbeat runs pinned to the main session so active subagent transcripts are not overwritten by heartbeat status messages. (#61803) Thanks @100yenadmin.",
      "Agents/heartbeat: respect disabled heartbeat prompt g界面dance so operators can suppress heartbeat prompt instructions without disabling heartbeat runtime behavior.",
      "Agents/compaction: stop compaction-wait aborts from re-entering prompt failover and replaying completed tool turns. (#62600) Thanks @i-dentifier.",
      "Approvals/runtime: move native approval lifecycle assembly into shared core bootstrap/runtime seams driven by channel capabilities and runtime contexts, and 移除 the legacy bundled approval fallback wiring. (#62135) Thanks @gumadeiras.",
      "安全/fetch-guard: stop rejecting operator-configured proxy hostnames against the target-scoped hostname allowlist in SSRF-guarded fetches, restoring proxy-based media downloads for Telegram and other channels. (#62312) Thanks @ademczuk.",
      "Logging: make `logging.level` and `logging.consoleLevel` honor the documented severity threshold ordering again, and keep child loggers inheriting the parent `minLevel`. (#44646) Thanks @zhumengzhu.",
      "Agents/sessions_send: pass `threadId` through announce delivery so cross-session notifications land in the correct Telegram forum topic instead of the group's general thread. (#62758) Thanks @jalehman.",
      "Daemon/systemd: keep sudo systemctl calls scoped to the invoking user when machine-scoped systemctl fails, while still avoiding machine fallback for permission-denied user bus errors. (#62337) Thanks @Aftabbs.",
      "Docs/i18n: relocalize final localized-page links after translation and 移除 the zh-CN homepage redirect override so localized Mintlify pages resolve to the correct language roots again. (#61796) Thanks @hxy91819.",
      "Agents/exec: keep timed-out shell-backgrounded commands on the failed path and point long-running jobs to exec background/yield sessions so process polling is only suggested for registered sessions."
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
      "Agents/video generation: 添加 the b界面lt-in `video_generate` tool so agents can create videos through configured providers and return the generated media directly in the reply.",
      "Agents/music generation: ignore un支持ed optional hints such as `durationSeconds` with a warning instead of hard-failing requests on providers like Google Lyria.",
      "Providers/Comfy界面: 添加 a bundled `comfy` workflow media 插件 for local Comfy界面 and Comfy Cloud workflows, including shared `image_generate`, `video_generate`, and workflow-backed `music_generate` 支持, with prompt injection, optional reference-image upload, live tests, and output download.",
      "Tools/music generation: 添加 the b界面lt-in `music_generate` tool with bundled Google (Lyria) and MiniMax providers plus workflow-backed Comfy 支持, including async task tracking and follow-up delivery of finished audio.",
      "Providers: 添加 bundled Qwen, Fireworks AI, and StepFun providers, plus MiniMax TTS, Ollama Web Search, and MiniMax Search 集成s for chat, speech, and search workflows. (#60032, #55921, #59318, #54648)",
      "Providers/Amazon Bedrock: 添加 bundled Mantle 支持 plus inference-profile discovery and automatic request-region injection so Bedrock-hosted Claude, GPT-OSS, Qwen, Kimi, GLM, and similar routes work with less manual setup. (#61296, #61299) Thanks @wirjo.",
      "Control 界面/multilingual: 添加 localized control 界面 支持 for Simplified Chinese, Traditional Chinese, Brazilian Portuguese, German, Spanish, Japanese, Korean, French, Turkish, Indonesian, Polish, and Ukrainian. Thanks @vincentkoc.",
      "插件s: 添加 插件-config T界面 prompts to g界面ded onboarding/setup flows, and 添加 `openclaw 插件s install --force` so existing 插件 and hook-pack targets can be replaced without using the dangerous-code override flag. (#60590, #60544)",
      "Control 界面/skills: 添加 ClawHub search, detail, and install flows directly in the Skills panel. (#60134) Thanks @samzong.",
      "iOS/exec approvals: 添加 generic APNs approval notifications that open an in-app exec approval modal, fetch command details only after authenticated operator reconnect, and clear stale notification state when the approval resolves. (#60239) Thanks @ngutman.",
      "Matrix/exec approvals: 添加 Matrix-native exec approval prompts with account-scoped approvers, channel-or-DM delivery, and room-thread aware resolution handling. (#58635) Thanks @gumadeiras.",
      "Channels/context visibility: 添加 configurable `contextVisibility` per channel (`all`, `allowlist`, `allowlist_quote`) so supplemental quote, thread, and fetched history context can be filtered by sender allowlists instead of always passing through as received.",
      "Providers/request overrides: 添加 shared model and media request transport overrides across OpenAI-, Anthropic-, Google-, and compatible provider paths, including headers, auth, proxy, and TLS controls. (#60200)",
      "Providers/OpenAI: 添加 forward-compat `openai-codex/gpt-5.4-mini`, an opt-in GPT personality, and provider-owned GPT-5 prompt contributions so Codex/GPT runs stay cache-stable and compatible with bundled catalog lag.",
      "Agents/Claude CLI: expose OpenClaw tools to background Claude CLI runs through a loopback MCP bridge and switch bundled runs to stdin + `stream-json` partial-message streaming so prompts stop riding argv, long replies show live progress, and final session/usage metadata still land cleanly. (#35676) Thanks @mylukin.",
      "ACPX/runtime: embed the ACP runtime directly in the bundled `acpx` 插件, 移除 the extra external ACP CLI hop, harden live ACP session binding and reuse, and 添加 a generic `reply_dispatch` hook so bundled 插件s like ACPX can own reply interception without hardcoded ACP paths in core auto-reply routing. (#61319)",
      "Agents/progress: 添加 experimental structured plan 更新s and structured execution item events so compatible 界面s can show clearer step-by-step progress during long-running runs.",
      "Providers/Anthropic: 移除 the Claude CLI backend and setup-token from new onboarding, keep existing configured legacy profiles runnable, and have `openclaw doctor` repair or 移除 stale `anthropic:claude-cli` state during migration.",
      "Tools/video generation: 添加 bundled xAI (`grok-imagine-video`), Alibaba Model Studio Wan, and Runway video providers, plus live-test/default model wiring for all three.",
      "Memory/search: 添加 Amazon Bedrock embeddings for Titan, Cohere, Nova, and TwelveLabs models, with AWS credential-chain auto-detection for `provider: \"auto\"` and provider-specific dimension controls. Thanks @wirjo.",
      "Providers/Amazon Bedrock Mantle: generate bearer tokens from the AWS credential chain so Mantle auto-discovery can use IAM auth without manually exporting `AWS_BEARER_TOKEN_BEDROCK`. Thanks @wirjo.",
      "Memory/dreaming (experimental): 添加 weighted short-term recall promotion, a `/dreaming` command, Dreams 界面, multilingual conceptual tagging, and doctor/status repair 支持, while 重构ing dreaming from competing modes into three cooperative phases (light, deep, REM) with independent schedules and recovery behavior so durable memory promotion can run in the background with less manual setup. (#60569, #60697) Thanks @vignesh07.",
      "Memory/dreaming: 添加 configurable aging controls (`recencyHalfLifeDays`, `maxAgeDays`) plus optional verbose logging so operators can tune recall decay and inspect promotion decisions more easily.",
      "Memory/dreaming: 添加 REM preview tooling (`openclaw memory rem-harness`, `promote-explain`), surface possible lasting truths during REM staging, and make deep promotion replay-safe so reruns reconcile instead of duplicating `MEMORY.md` entries.",
      "Memory/dreaming: write dreaming trail content to top-level `dreams.md` instead of daily memory notes, 更新 `/dreaming` help text to point there, and keep `dreams.md` available for explicit reads without pulling it into default recall. Thanks @davemorin.",
      "Memory/dreaming: 添加 the Dream Diary surface in Dreams, simplify user-facing dreaming config to `enabled` plus optional `frequency`, treat phases as 实现ation detail in docs/界面, and keep the lobster animation visible above diary content. Thanks @vignesh07.",
      "Prompt caching: keep prompt pre修复es more reusable across transport fallback, deterministic MCP tool ordering, compaction, embedded image history, normalized system-prompt fingerprints, `openclaw status --verbose` cache diagnostics, and the removal of duplicate in-band tool inventories from agent system prompts so follow-up turns hit cache more reliably. (#58036, #58037, #58038, #59054, #60603, #60691) Thanks @bcherny and @vincentkoc.",
      "Agents/cache: diagnostics: 添加 prompt-cache break diagnostics, trace live cache scenarios through embedded runner paths, and show cache reuse explicitly in `openclaw status --verbose`. Thanks @vincentkoc.",
      "Agents/cache: stabilize cache-relevant system prompt fingerprints by normalizing eq界面valent structured prompt whitespace, line endings, hook-添加ed system context, and runtime capability ordering so semantically unchanged prompts reuse KV/cache more reliably. Thanks @vincentkoc.",
      "Agents/tool prompts: 移除 the duplicate in-band tool inventory from agent system prompts so tool-calling models rely on the structured tool definitions as the single source of truth, improving prompt 稳定性 and reducing stale tool g界面dance.",
      "Config/schema: enrich the exported `openclaw config schema` JSON Schema with field titles and descriptions so editors, agents, and other schema consumers receive the same config help metadata. (#60067) Thanks @solavrc.",
      "Providers/CLI: 移除 bundled CLI text-provider backends and the `agents.defaults.cliBackends` surface, while keeping ACP harness sessions and Gemini media understanding on the native bundled providers.",
      "Matrix/exec approvals: clarify unavailable-approval replies so Matrix no longer claims chat approvals are un支持ed when native exec approvals are merely unconfigured. (#61424) Thanks @gumadeiras.",
      "Docs/IRC: replace public IRC hostname examples with `irc.example.com` and recommend private servers for bot coordination while listing common public networks for intentional use.",
      "Memory/dreaming: group nearby daily-note lines into short coherent chunks before staging them for dreaming, so one-off context from recent notes reaches REM/deep with better evidence and less line-level noise.",
      "Memory/dreaming: drop generic date/day headings from daily-note chunk pre修复es while keeping meaningful section labels, so staged snippets stay cleaner and more reusable. (#61597) Thanks @mbelinky.",
      "插件s/Lobster: run bundled Lobster workflows in process instead of spawning the external CLI, reducing transport overhead and unblocking native runtime 集成. (#61523) Thanks @mbelinky.",
      "插件s/Lobster: harden managed resume validation so invalid TaskFlow resume calls fail earlier, and memoize embedded runtime loading per runner while keeping failed loads retryable. (#61566) Thanks @mbelinky."
    ],
    "improvements": [
      "Config: 移除 legacy public config aliases such as `talk.voiceId` / `talk.APIKey`, `agents.*.sandbox.perSession`, `browser.ssrfPolicy.allowPrivateNetwork`, `hooks.internal.handlers`, and channel/group/room `allow` toggles in favor of the canonical public paths and `enabled`, while keeping load-time 兼容性 and `openclaw doctor --修复` migration 支持 for existing configs. (#60726) Thanks @vincentkoc."
    ],
    "bugfixes": [
      "安全: preserve restrictive 插件-only tool allowlists, req界面re owner access for `/allowlist 添加` and `/allowlist 移除`, fail closed when `before_tool_call` hooks crash, block browser SSRF redirect bypasses earlier, and keep non-interactive auth-choice inference scoped to bundled and already-trusted 插件s. (#58476, #59836, #59822, #58771, #59120) Thanks @eleqtrizit and @pgondhi987.",
      "Providers/OpenAI: make GPT-5 and Codex runs act sooner with lower-verbosity defaults, visible progress during tool work, and a one-shot retry when a turn only narrates the plan instead of taking action.",
      "Providers/OpenAI and reply delivery: preserve native `reasoning.effort: \"none\"` and strict schemas where 支持ed, 添加 GPT-5.4 assistant `phase` metadata across replay and the Gateway `/v1/responses` layer, and keep commentary buffered until `final_answer` so web chat, session previews, embedded replies, and Telegram partials stop leaking planning text. 修复es #59150, #59643, #61282.",
      "Telegram: 修复 current-model checks in the model picker, HTML-format non-default `/model` confirmations, explicit topic replies, persisted reaction ownership across restarts, caption-media placeholder and `file_id` preservation on download failure, and upgraded-install inbound image reads. (#60384, #60042, #59634, #59207, #59948, #59971) Thanks @sfuminya, @GitZhangChi, @dashhuang, @samzong, @v1p0r, and @neeravmakwana.",
      "Telegram: restore DM voice-note preflight transcription so direct-message audio stops arriving as raw `<media:audio>` placeholders. (#61008) Thanks @manueltarouca.",
      "Telegram/reasoning: only create a Telegram reasoning preview lane when the session is explicitly `reasoning:stream`, so hidden `<think>` traces from streamed replies stop surfacing as chat previews on normal sessions. Thanks @vincentkoc.",
      "Telegram/native command menu: trim long menu descriptions before dropping commands so sub-100 command sets can still fit Telegram's payload budget and keep more `/` entries visible. (#61129) Thanks @neeravmakwana.",
      "Discord: keep REST, webhook, and monitor traffic on the configured proxy, preserve component-only media sends, honor `@everyone` and `@here` mention gates, keep ACK reactions on the active account, and split voice connect/playback timeouts so auto-join is more reliable. (#57465, #60361, #60345) Thanks @geekhuashan.",
      "Discord/reply tags: strip leaked `[[reply_to_current]]` control tags from preview text and honor explicit reply-tag threading during final delivery, so Discord replies stay attached to the triggering message instead of printing reply metadata into chat.",
      "Discord/replies: replace the unshipped `replyToOnlyWhenBatched` flag with `replyToMode: \"batched\"` so native reply references only attach on debounced multi-message turns while explicit reply tags still work.",
      "Discord/image generation: include the real generated `MEDIA:` paths in tool output, avoid duplicate plain-output media requeueing, and persist volatile workspace-generated media into durable outbound media before final reply delivery so generated image replies stop pointing at missing local files.",
      "Slack: route live DM replies back to the concrete inbound DM channel while keeping persisted routing metadata user-scoped, so normal assistant replies stop disappearing when pairing and system messages still arrive. (#59030) Thanks @afurm.",
      "WhatsApp: restore `channels.whatsapp.blockStreaming` and reset watchdog timeouts after reconnect so q界面et chats stop falling into reconnect loops. (#60007, #60069) Thanks @MonkeyLeeT and @mcaxtr.",
      "Android/Talk Mode: cancel in-flight `talk.speak` playback when speech is explicitly stopped, and restore spoken replies on both node-scoped and gateway-backed sessions by keeping reply routing and embedded transport overrides aligned with the current playback path. (#60306, #61164, #61214)",
      "Voice-call/OpenAI: pass full 插件 config into realtime transcription provider resolution so streaming calls can discover the bundled OpenAI realtime transcription provider again. 修复es #60936. Thanks @sliekens and @vincentkoc.",
      "Matrix/exec approvals: anchor seeded approval reactions to the primary Matrix prompt event, resolve them from event metadata instead of prompt text, and clean up chunked approval prompts correctly. (#60931) Thanks @gumadeiras.",
      "Matrix: recover more reliably when secret storage or recovery keys are missing by recreating secret storage during repair and backup reset, hold crypto snapshot locks during persistence, and surface explicit too-large attachment markers. (#59846, #59851, #60599, #60289) Thanks @al3mart, @emonty, and @efe-arv.",
      "Matrix/DM sessions: 添加 `channels.matrix.dm.sessionScope`, shared-session collision notices, and aligned outbound session reuse so separate Matrix DM rooms can keep distinct context when configured. (#61373) Thanks @gumadeiras.",
      "Matrix: move legacy top-level `avatarUrl` into the default account during multi-account promotion and keep env-backed account setup avatar config persisted. (#61437) Thanks @gumadeiras.",
      "MS Teams: download inline DM images via Graph API and preserve channel reply threading in proactive fallback. (#52212, #55198) Thanks @Ted-developer and @hyojin.",
      "MS Teams: replace the deprecated Teams SDK Http插件 stub with `httpServerAdapter` so recurring gateway deprecation warnings stop firing and the Express 5 兼容性 workaround stays on the 支持ed SDK path. (#60939) Thanks @coolramukaka-sys.",
      "Control 界面/chat: 添加 a per-session thinking-level picker in the chat header and mobile chat settings, and keep the browser bundle on 界面-local thinking/session-key helpers so Safari no longer crashes on Node-only imports before rendering chat controls.",
      "Sandbox/SSH: reject hardlinked files during cross-device rename fallback so EXDEV file copies preserve the same pinned file-boundary checks as direct reads.",
      "Control 界面: keep Stop visible during tool-only execution, preserve pending-send busy state, and clear stale ClawHub search results as soon as the query changes. (#54528, #59800, #60267) Thanks @chziyue and @frankekn.",
      "Control 界面/avatar: honor `界面.assistant.avatar` when serving `/avatar/:agentId` so Appearance 界面 avatar paths stop falling back to initials placeholders. (#60778) Thanks @hannasdev.",
      "Control 界面/cron: highlight the Cron refresh button while refresh is in flight so the page's loading state stays visible even when prior data remains on screen. (#60394) Thanks @coder-zhuzm.",
      "Control 界面/Overview: prevent gateway access token/password visibility toggle buttons from overlapping their inputs at narrow widths. (#56924) Thanks @bbddbb1.",
      "Auto-reply: unify reply lifecycle ownership across preflight compaction, session rotation, CLI-backed runs, and gateway restart handling so `/stop` and same-session overlap checks target the right active turn and restart-interrupted turns return the restart notice instead of being silently dropped. (#61267) Thanks @dutifulbob.",
      "Reply delivery: prevent duplicate block replies on `text_end` channels so providers that emit explicit text-end boundaries no longer double-send the same final message. (#61530)",
      "Gateway/startup: default `gateway.mode` to `local` when unset, detect PID recycling in gateway lock files on Windows and macOS, and show startup progress so healthy restarts stop getting blocked by stale locks. (#54801, #60085, #59843) Thanks @BradGroux and @TonyDerek-dot.",
      "Gateway/macOS: let launchd `KeepAlive` own in-process gateway restarts again, 添加ing a short supervised-exit delay so rAPId restarts avoid launchd crash-loop unloads while `openclaw gateway restart` still reports real LaunchAgent errors synchronously.",
      "Gateway/macOS: re-bootstrap the LaunchAgent if `launchctl kickstart -k` unloads it during restart so failed restarts do not leave the gateway unmanaged until manual repair.",
      "Gateway/macOS: recover installed-but-unloaded LaunchAgents during `openclaw gateway start` and `restart`, while still preferring live unmanaged gateways during restart recovery. (#43766) Thanks @HenryC-3.",
      "Gateway/Windows scheduled tasks: preserve Task Scheduler settings on reinstall, fail loudly when `/Run` does not start, and report fast failed restarts accurately instead of pretending they timed out after 60 seconds. (#59335) Thanks @tmimmanuel.",
      "Windows/restart: fall back to the installed Startup-entry launcher when the scheduled task was never registered, so `/restart` can relaunch the gateway on Windows setups where `schtasks` install fell back during onboarding. (#58943) Thanks @imechZhangLY.",
      "Windows/restart: clean up stale gateway listeners before Windows self-restart and treat listener and argv probe failures as inconclusive, so scheduled-task relaunch no longer falls into an `E添加RINUSE` retry loop. (#60480) Thanks @arifahmedjoy.",
      "更新/npm: prefer the npm binary that owns the installed global OpenClaw pre修复 so mixed Homebrew-plus-nvm setups 更新 the right install. (#60153) Thanks @jayeshp19.",
      "Agents/music and video generation: 添加 `tools.media.asyncCompletion.directSend` as an opt-in direct-delivery path for finished async media tasks, while keeping the legacy requester-session wake/model-delivery flow as the default.",
      "CLI/skills JSON: route `skills list --json`, `skills info --json`, and `skills check --json` output to stdout instead of stderr so machine-readable consumers receive JSON on the expected stream again. (#60914; 修复es #57599; landed from contributor PR #57611 by @Aftabbs) Thanks @Aftabbs.",
      "CLI/Commander: preserve Commander-computed exit codes for argument and help-error paths, and cover the user-argv parse mode in the regression tests so invalid CLI invocations no longer report success when exits are intercepted. (#60923) Thanks @Linux2010.",
      "Cron: replay interrupted recurring jobs on the first gateway restart instead of waiting for a second restart. (#60583) Thanks @joelnishanth.",
      "Cron: send failure notifications through the job's primary delivery channel using the same session context as successful delivery when no explicit `failureDestination` is configured. (#60622) Thanks @artwalker.",
      "Exec/remote skills: stop advertising `exec host=node` when the current exec policy cannot route to a node, and clarify blocked exec-host override errors with both the requested host and allowed config path.",
      "Agents/Claude CLI/安全: clear inherited Claude Code config-root and 插件-root env overrides like `CLAUDE_CONFIG_DIR` and `CLAUDE_CODE_插件_*`, so OpenClaw-launched Claude CLI runs cannot be silently pointed at an alternate Claude config/插件 tree with different hooks, 插件s, or auth context. Thanks @vincentkoc.",
      "Agents/Claude CLI/安全: clear inherited Claude Code provider-routing and managed-auth env overrides, and mark OpenClaw-launched Claude CLI runs as host-managed, so Claude CLI backdoor sessions cannot be silently redirected to proxy, Bedrock, Vertex, Foundry, or parent-managed token contexts. Thanks @vincentkoc.",
      "Agents/Claude CLI/安全: force host-managed Claude CLI backdoor runs to `--setting-sources user`, even under custom backend arg overrides, so repo-local `.claude` project/local settings, hooks, and 插件 discovery do not silently execute inside non-interactive OpenClaw sessions. Thanks @vincentkoc.",
      "Agents/Claude CLI: treat malformed bare `--permission-mode` backend overrides as missing and fail safe back to `bypassPermissions`, so custom `cliBackends.claude-cli.args` 安全 config cannot accidentally consume the next flag as a bogus permission mode. Thanks @vincentkoc.",
      "Gateway/device pairing: req界面re non-admin paired-device sessions to manage only their own device for token rotate/revoke and paired-device removal, blocking cross-device token theft inside pairing-scoped sessions. (#50627) Thanks @coygeek.",
      "Gateway/插件 routes: keep gateway-auth 插件 runtime routes on write-only fallback scopes unless a trusted-proxy caller explicitly declares narrower `x-openclaw-scopes`, so 插件 HTTP handlers no longer mint admin-level runtime scopes on missing or untrusted HTTP scope headers. (#59815) Thanks @pgondhi987.",
      "B界面ld/types: 修复 the Node `createReq界面re(...)` helper typing so provider-runtime lazy loads compile cleanly again and `pnpm b界面ld` no longer fails in the Pi embedded provider error-pattern path.",
      "Gateway/安全: scope loopback browser-origin auth throttling by normalized origin so one localhost Control 界面 tab cannot lock out a different localhost browser origin after repeated auth failures.",
      "Gateway/auth: serialize async shared-secret auth attempts per client so concurrent Tailscale-capable failures cannot overrun the intended auth rate-limit budget. Thanks @Telecaster2147.",
      "Device pairing/安全: keep non-operator device scope checks bound to the requested role pre修复 so bootstrap verification cannot redeem `operator.*` scopes through `node` auth. (#57258) Thanks @jlapenna.",
      "Device pairing: reject rotating device tokens into roles that were never approved during pairing, and keep reconnect role checks bounded to the paired device's approved role set. (#60462) Thanks @eleqtrizit.",
      "Gateway/device auth: reuse cached device-token scopes only for cached-token reconnects, while keeping explicit `deviceToken` scope requests and empty-cache fallbacks intact so reconnects preserve `operator.read` without breaking explicit auth flows. (#46032) Thanks @caicongyang.",
      "Mobile pairing/安全: fail closed for internal `/pair` setup-code issuance, cleanup, and approval paths when gateway pairing scopes are missing, and keep approval-time requested-scope enforcement on the internal command path. (#55996) Thanks @coygeek.",
      "Mobile pairing/bootstrap: keep QR bootstrap handoff tokens bounded to the mobile-safe contract so node handoff stays unscoped and operator handoff drops mixed `node.*`, `operator.admin`, and `operator.pairing` scopes.",
      "Mobile pairing/Android: tighten secure endpoint handling so Tailscale and public remote setup reject cleartext endpoints, private LAN pairing still works, merged-role approvals mint both node and operator device tokens, and bootstrap tokens survive node auto-pair until operator approval finishes. (#60128, #60208, #60221) Thanks @obviyus.",
      "Android/canvas 安全: req界面re exact normalized A2界面 URL matches before forwarding canvas bridge actions, rejecting query mismatches and descendant paths while still allowing fragment-only A2界面 navigation.",
      "Synology Chat/安全: default low-level HTTPS helper TLS verification to on so helper/API defaults match the shipped safe account default, and only explicit `allowInsecureSsl: true` opts out.",
      "Synology Chat/安全: route webhook token comparison through the shared constant-time secret helper for consistency with other bundled 插件s.",
      "插件s/marketplace: block remote marketplace symlink escapes without breaking ordinary local marketplace install paths. (#60556) Thanks @eleqtrizit.",
      "Telegram/local Bot API: honor `channels.telegram.APIRoot` for buffered media downloads, 添加 `channels.telegram.network.dangerouslyAllowPrivateNetwork` for trusted fake-IP setups, and req界面re `channels.telegram.trustedLocalFileRoots` before reading absolute Bot API `file_path` values. (#59544, #60705) Thanks @SARAMALI15792 and @obviyus.",
      "Outbound/sanitizer: strip leaked `<tool_call>`, `<function_calls>`, and model special tokens from shared user-visible assistant text, including truncated tool-call streams, so internal scaffolding no longer bleeds into replies across surfaces. (#60619) Thanks @oliviareid-svg.",
      "Agents/errors: surface an explicit disk-full message when local session or transcript writes fail with `ENOSPC`/`disk full`, so those runs stop degrading into opaque `NO_REPLY`-style failures. Thanks @vincentkoc.",
      "Exec approvals: 移除 heuristic command-obfuscation gating from host exec so gateway and node runs rely on explicit policy, allowlist, and strict inline-eval rules only.",
      "Agents/tool results: cap live tool-result persistence and overflow-recovery truncation at 40k characters so oversized tool output stays bounded without discarding recent context entirely.",
      "Discord/video replies: split text-plus-video deliveries into a text reply followed by a media-only send, and let live provider auth checks honor manifest-declared API key env vars like `MODELSTUDIO_API_KEY`.",
      "Config/All Settings: keep the raw config view intact when sensitive fields are blank instead of corrupting or dropping the rendered snapshot. (#28214) Thanks @solodmd.",
      "插件 SDK/facades: back-fill bundled 插件 facade sentinels before 插件-id tracking re-enters config loading, so CLI/provider startup no longer crashes with `shouldNormalizeGoogleProviderConfig is not a function` or other empty-facade reads during bundled 插件 re-entry. Thanks @adam91holt.",
      "插件s/facades: back-fill facade sentinels before tracked-插件 resolution re-enters config loading, so facade exports stay defined during circular provider normalization. (#61180) Thanks @adam91holt.",
      "QA lab: restore typed mock OpenAI gateway config wiring so QA-lab config helpers compile cleanly again and `pnpm check` / `pnpm b界面ld` stay green.",
      "Discord/image generation: include the real generated `MEDIA:` paths in tool output and avoid duplicate plain-output media requeueing so Discord image replies stop pointing at missing local files.",
      "Slack: route live DM replies back to the concrete inbound DM channel while keeping persisted routing metadata user-scoped, so normal assistant replies stop disappearing when pairing and system messages still arrive. (#59030) Thanks @afurm.",
      "Discord/reply tags: strip leaked `[[reply_to_current]]` control tags from preview text and honor explicit reply-tag threading during final delivery, so Discord replies stay attached to the triggering message instead of printing reply metadata into chat.",
      "Telegram: 修复 current-model checks in the model picker, HTML-format non-default `/model` confirmations, explicit topic replies, persisted reaction ownership across restarts, caption-media placeholder and `file_id` preservation on download failure, and upgraded-install inbound image reads. (#60384, #60042, #59634, #59207, #59948, #59971) Thanks @sfuminya, @GitZhangChi, @dashhuang, @samzong, @v1p0r, and @neeravmakwana.",
      "Telegram: restore DM voice-note preflight transcription so direct-message audio stops arriving as raw `<media:audio>` placeholders. (#61008) Thanks @manueltarouca.",
      "Telegram/reasoning: only create a Telegram reasoning preview lane when the session is explicitly `reasoning:stream`, so hidden `<think>` traces from streamed replies stop surfacing as chat previews on normal sessions. Thanks @vincentkoc.",
      "Telegram/native command menu: trim long menu descriptions before dropping commands so sub-100 command sets can still fit Telegram's payload budget and keep more `/` entries visible. (#61129) Thanks @neeravmakwana.",
      "Feishu/reasoning: only expose streamed reasoning previews when the session is explicitly `reasoning:stream`, so hidden reasoning traces do not surface on normal streaming sessions. Thanks @vincentkoc.",
      "Discord: keep REST, webhook, and monitor traffic on the configured proxy, preserve component-only media sends, honor `@everyone` and `@here` mention gates, keep ACK reactions on the active account, and split voice connect/playback timeouts so auto-join is more reliable. (#57465, #60361, #60345) Thanks @geekhuashan.",
      "WhatsApp: restore `channels.whatsapp.blockStreaming` and reset watchdog timeouts after reconnect so q界面et chats stop falling into reconnect loops. (#60007, #60069) Thanks @MonkeyLeeT and @mcaxtr.",
      "Memory: keep `memory-core` b界面ltin embedding registration on the already-registered path so selecting `memory-core` no longer recurses through 插件 discovery and crashes during startup. (#61402) Thanks @ngutman.",
      "Agents/tool results: keep large `read` outputs visible longer, preserve the latest `read` output when older tool output can absorb the overflow budget, and fall back to Pi's normal overflow compaction/retry path before replacing a fresh `read` with a compacted stub. Thanks @vincentkoc.",
      "Memory/QMD: prefer modern `qmd collection 添加 --glob`, accept newer single-line JSON hit metadata while keeping legacy line fields, refresh QMD docs/doctor install g界面dance and model-override g界面dance, and keep older QMD releases working. Thanks @vincentkoc.",
      "MS Teams: download inline DM images via Graph API and preserve channel reply threading in proactive fallback. (#52212, #55198) Thanks @Ted-developer and @hyojin.",
      "MS Teams: replace the deprecated Teams SDK Http插件 stub with `httpServerAdapter` so recurring gateway deprecation warnings stop firing and the Express 5 兼容性 workaround stays on the 支持ed SDK path. (#60939) Thanks @coolramukaka-sys.",
      "Matrix/exec approvals: anchor seeded approval reactions to the primary Matrix prompt event, resolve them from event metadata instead of prompt text, and clean up chunked approval prompts correctly. (#60931) Thanks @gumadeiras.",
      "Matrix: recover more reliably when secret storage or recovery keys are missing by recreating secret storage during repair and backup reset, hold crypto snapshot locks during persistence, and surface explicit too-large attachment markers. (#59846, #59851, #60599, #60289) Thanks @al3mart, @emonty, and @efe-arv.",
      "Android/Talk Mode: cancel in-flight `talk.speak` playback when speech is explicitly stopped, so stale replies stop starting after barge-in or manual stop. (#61164) Thanks @obviyus.",
      "Android/Talk Mode: restore spoken assistant replies on node-scoped sessions by keeping reply routing synced to the resolved node session key and pausing mic capture during reply playback. (#60306) Thanks @MKV21.",
      "Android/Talk Mode: restore voice replies on gateway-backed talk mode sessions by updating embedded runner transport overrides to the current agent transport API. (#61214) Thanks @obviyus.",
      "Voice-call/OpenAI: pass full 插件 config into realtime transcription provider resolution so streaming calls can discover the bundled OpenAI realtime transcription provider again. 修复es #60936. Thanks @sliekens and @vincentkoc.",
      "Control 界面/chat: 添加 a per-session thinking-level picker in the chat header and mobile chat settings, and keep the browser bundle on 界面-local thinking/session-key helpers so Safari no longer crashes on Node-only imports before rendering chat controls.",
      "Control 界面: keep Stop visible during tool-only execution, preserve pending-send busy state, and clear stale ClawHub search results as soon as the query changes. (#54528, #59800, #60267) Thanks @chziyue and @frankekn.",
      "Control 界面/avatar: honor `界面.assistant.avatar` when serving `/avatar/:agentId` so Appearance 界面 avatar paths stop falling back to initials placeholders. (#60778) Thanks @hannasdev.",
      "Control 界面/cron: highlight the Cron refresh button while refresh is in flight so the page's loading state stays visible even when prior data remains on screen. (#60394) Thanks @coder-zhuzm.",
      "Control 界面/Overview: prevent gateway access token/password visibility toggle buttons from overlapping their inputs at narrow widths. (#56924) Thanks @bbddbb1.",
      "CLI/skills JSON: route `skills list --json`, `skills info --json`, and `skills check --json` output to stdout instead of stderr so machine-readable consumers receive JSON on the expected stream again. (#60914; 修复es #57599; landed from contributor PR #57611 by @Aftabbs) Thanks @Aftabbs.",
      "CLI/Commander: preserve Commander-computed exit codes for argument and help-error paths, and cover the user-argv parse mode in the regression tests so invalid CLI invocations no longer report success when exits are intercepted. (#60923) Thanks @Linux2010.",
      "Cron: replay interrupted recurring jobs on the first gateway restart instead of waiting for a second restart. (#60583) Thanks @joelnishanth.",
      "Cron: send failure notifications through the job's primary delivery channel using the same session context as successful delivery when no explicit `failureDestination` is configured. (#60622) Thanks @artwalker.",
      "Live model switching: only treat explicit user-driven model changes as pending live switches, so fallback rotation, heartbeat overrides, and compaction no longer trip `LiveSessionModelSwitchError` before making an API call. (#60266) Thanks @kiranvk-2011.",
      "Exec approvals: reuse durable exact-command `allow-always` approvals in allowlist mode so identical reruns stop prompting, and tighten Windows interpreter/path approval handling so wrapper and malformed-path cases fail closed more consistently. (#59880, #59780, #58040, #59182) Thanks @luoyanglang, @SnowSky1, and @pgondhi987.",
      "Node exec approvals: keep node-host `system.run` approvals bound to the prepared execution plan across async forwarding, so mutable script operands still get approval-time binding and drift revalidation instead of dropping back to unbound execution.",
      "Agents/exec approvals: let `exec-approvals.json` agent 安全 override stricter gateway tool defaults so approved subagents can use `安全: “full”` without falling back to allowlist enforcement again. (#60310) Thanks @lml2468.",
      "Agents/exec: restore `host=node` routing for node-pinned and `host=auto` sessions, while still blocking sandboxed `auto` sessions from jumping to gateway. (#60788) Thanks @openperf.",
      "Exec/heartbeat: use the canonical `exec-event` wake reason for `notifyOnExit` so background exec completions still trigger follow-up turns when `HEARTBEAT.md` is empty or comments-only. (#41479) Thanks @rstar327.",
      "Heartbeat: skip wake delivery when the target session lane is already busy so the pending event is retried instead of getting drained too early. (#40526) Thanks @lucky7323.",
      "Group chats/agent prompts: tell models to minimize empty lines and use normal chat-style spacing so group replies avoid document-style blank-line formatting.",
      "Providers/OpenAI GPT: treat short approval turns like `ok do it` and `go ahead` as immediate action turns, and trim overly memo-like GPT-5 chat confirmations so OpenAI replies stay shorter and more conversational by default.",
      "Providers/OpenAI Codex: split native `contextWindow` from runtime `contextTokens`, keep the default effective cap at `272000`, and expose a per-model `contextTokens` override on `models.providers.*.models[]`.",
      "Providers/OpenAI-compatible WS: compute fallback token totals from normalized usage when providers omit or zero `total_tokens`, so DashScope-compatible sessions stop storing zero totals after alias normalization. (#54940) Thanks @lyfuci.",
      "Agents/OpenAI: mark Claude-compatible file tool schemas as `添加itionalProperties: false` so direct OpenAI GPT-5 routes stop rejecting the `read` tool with invalid strict-schema errors.",
      "Agents/OpenAI: fall back to `strict: false` for native OpenAI tool calls when a tool schema is not strict-compatible, and normalize empty-object tool schemas to include `req界面red: []`, so direct GPT-5 routes stop failing with invalid strict-schema errors like missing `path` in `req界面red`.",
      "Agents/GPT: 添加 explicit work-item lifecycle events for embedded runs, use them to surface real progress more reliably, and stop counting tool-started turns as planning-only retries.",
      "插件s/OpenAI: enable `gpt-image-1` reference-image edits through `/images/edits` multipart uploads, and stop inferring un支持ed resolution overrides when no explicit `size` or `resolution` is provided.",
      "Agents/replay: 移除 the malformed assistant-content canonicalization repair from replay history sanitization instead of extending that legacy repair path into replay validation.",
      "插件s/OpenAI: tune the OpenAI prompt overlay for live-chat cadence so GPT replies stay shorter, more human, and less wall-of-text by default.",
      "Providers/compat: stop forcing OpenAI-only defaults on proxy and custom OpenAI-compatible routes, preserve native vendor-specific reasoning/tool/streaming behavior across Anthropic-compatible, Moonshot, Mistral, ModelStudio, OpenRouter, xAI, and Z.ai endpoints, and route GitHub Copilot Claude models through Anthropic Messages instead of OpenAI Responses.",
      "Providers/GitHub Copilot: send IDE identity headers on runtime model requests and GitHub token exchange so IDE-authenticated Copilot runs stop failing with missing `Editor-Version`. (#60641) Thanks @VACInc and @vincentkoc.",
      "Providers/OpenRouter failover: classify `403 “Key limit exceeded”` spending-limit responses as billing so model fallback continues instead of stopping on generic auth. (#59892) Thanks @rockcent.",
      "Providers/Anthropic: keep `claude-cli/*` auth on live Claude CLI credentials at runtime, avoid persisting stale bearer-token profiles, and suppress macOS Keychain prompts during non-interactive Claude CLI setup. (#61234) Thanks @darkamenosa.",
      "Providers/Anthropic: when Claude CLI auth becomes the default, write a real `claude-cli` auth profile so local and gateway agent runs can use Claude CLI immediately without missing-API-key failures. Thanks @vincentkoc.",
      "Providers/Anthropic Vertex: honor `cacheRetention: “long”` with the real 1-hour prompt-cache TTL on Vertex AI endpoints, and default `anthropic-vertex` cache retention like direct Anthropic. (#60888) Thanks @affsantos.",
      "Agents/Anthropic: preserve native `toolu_*` replay ids on direct Anthropic and Anthropic Vertex paths so cache-sensitive history stops rewriting known-valid Anthropic tool-use ids. (#52612)",
      "Providers/Google: 添加 model-level `cacheRetention` 支持 for direct Gemini system prompts by creating, reusing, and refreshing `cachedContents` automatically on Google AI Studio runs. (#51372) Thanks @rafaelmariano-glitch.",
      "Google Gemini CLI auth: detect bundled npm installs by scanning packaged bundle files for the Gemini OAuth client config, so `npm install -g @google/gemini-cli` layouts work again. (#60486) Thanks @wzfmini01.",
      "Google Gemini CLI auth: detect personal OAuth mode from local Gemini settings and skip Code Assist project discovery for those logins, so personal Google accounts stop failing with `loadCodeAssist 400 Bad Request`. (#49226) Thanks @bobworrall.",
      "Google Gemini CLI auth: 改进 OAuth credential discovery across Windows nvm and Homebrew libexec installs, and align Code Assist metadata so Gemini login stops failing on packaged CLI layouts. (#40729) Thanks @hughcube.",
      "Google Gemini CLI models: 添加 forward-compat 支持 for stable `gemini-2.5-*` model ids by letting the bundled CLI provider clone them from Google templates, so `gemini-2.5-flash-lite` and related configured models stop showing up as missing. (#35274) Thanks @mySebbe.",
      "Google image generation: disable pinned DNS for Gemini image requests and honor explicit `pinDns` overrides in shared provider HTTP helpers so proxy-backed image generation works again. (#59873) Thanks @luoyanglang.",
      "Providers/Microsoft Foundry: preserve explicit image capability on normalized Foundry deployments, repair stale GPT/o-series text-only model metadata across gateway and runtime paths, and keep unknown fallback models from borrowing unrelated image 支持.",
      "Providers/Model Studio: preserve native streaming usage reporting for DashScope-compatible endpoints even when they are configured under a generic provider key, so streamed token totals stop sticking at zero. (#52395) Thanks @IVY-AI-gif.",
      "Providers/Z.AI: preserve explicitly registered `glm-5-*` variants like `glm-5-turbo` instead of intercepting them with the generic GLM-5 forward-compat shim. (#48185) Thanks @haoyu-haoyu.",
      "Amazon Bedrock/aws-sdk auth: stop injecting the fake `AWS_PROFILE` APIKey marker when no AWS auth env vars exist, so instance-role and other default-chain setups keep working without poisoning provider config. (#61194) Thanks @wirjo.",
      "Agents/Kimi tool-call repair: preserve tool arguments that were already present on streamed tool calls when later malformed deltas fail reevaluation, while still dropping stale repair-only state before `toolcall_end`.",
      "插件s/Kimi Coding: parse tagged tool calls and keep Anthropic-native tool payloads so Kimi coding endpoints execute tools instead of echoing raw markup. (#60051, #60391) Thanks @obviyus and @Eric-Guo.",
      "Media understanding: auto-register image-capable config providers for vision routing, so custom GLM-style provider ids with image models stop failing with “no media-understanding provider registered”. (#51418) Thanks @xydt-610.",
      "插件s/media understanding: enable bundled Groq and Deepgram providers by default so configured transcription models work without extra 插件 activation config. (#59982) Thanks @yxjsxy.",
      "MiniMax/pricing: keep bundled MiniMax highspeed pricing distinct in provider catalogs and preserve the lower M2.5 cache-read pricing when onboarding older MiniMax models. (#54214) Thanks @octo-patch.",
      "MiniMax: advertise image input on bundled `MiniMax-M2.7` and `MiniMax-M2.7-highspeed` model definitions so image-capable flows can route through the M2.7 family correctly. (#54843) Thanks @MerlinMiao88888888.",
      "Models/MiniMax: honor `MINIMAX_API_HOST` for implicit bundled MiniMax provider catalogs so China-hosted API-key setups pick `API.minimaxi.com/anthropic` without manual provider config. (#34524) Thanks @caiqinghua.",
      "Usage/MiniMax: invert remaining-style `usage_percent` fields when MiniMax reports only remaining percentage data, so usage bars stop showing nearly-full remaining quota as nearly-exhausted usage. (#60254) Thanks @jwchmodx.",
      "Usage/MiniMax: let usage snapshots treat `minimax-portal` and MiniMax CN aliases as the same MiniMax quota surface, and prefer stored MiniMax OAuth before falling back to Coding Plan keys.",
      "Usage/MiniMax: prefer the chat-model `model_remains` entry and derive Coding Plan window labels from MiniMax interval timestamps so MiniMax usage snapshots stop picking zero-budget media rows and misreporting 4h windows as `5h`. (#52349) Thanks @IVY-AI-gif.",
      "Model picker/providers: treat bundled BytePlus and Volcengine plan aliases as their native providers during setup, and expose their bundled standard/coding catalogs before auth so setup can suggest the right models. (#58819) Thanks @Luckymingxuan.",
      "Tools/web_search (Kimi): when `tools.web.search.kimi.baseUrl` is unset, inherit native Moonshot chat `baseUrl` (`.ai` / `.cn`) so China console keys authenticate on the same host as chat. 修复es #44851. (#56769) Thanks @tonga54.",
      "Agents/Claude CLI: keep non-interactive `--permission-mode bypassPermissions` when custom `cliBackends.claude-cli.args` override defaults, including fallback resolution before the runtime 插件 registry is active, so cron and heartbeat Claude CLI runs do not regress to interactive approval mode. (#61114) Thanks @cathrynlavery and @thewilloftheshadow.",
      "Agents/Claude CLI: persist explicit `openclaw agent --session-id` runs under a stable session key so follow-ups can reuse the stored CLI binding and resume the same underlying Claude session.",
      "Agents/Claude CLI: persist routed Claude session bindings, rotate them on `/new` and `/reset`, and keep live Claude CLI model switches moving across the configured Claude family so resumed sessions follow the real active thread and model. Thanks @vincentkoc.",
      "Agents/CLI backends: invalidate stored CLI session reuse when local CLI login state or the selected auth profile credential changes, so relogin and token rotation stop resuming stale sessions.",
      "Agents/Claude CLI/images: reuse stable hydrated image file paths and preserve shared media extensions like HEIC when passing image refs to local CLI runs, so Claude CLI image prompts stop thrashing KV cache pre修复es and oddball image formats do not fall back to `.bin`. Thanks @vincentkoc.",
      "Agents/compaction: keep assistant tool calls and displaced tool results in the same compaction chunk so strict summarization providers stop rejecting orphaned tool pairs. (#58849) Thanks @openperf.",
      "Agents/failover: scope Anthropic `An unknown error occurred` failover matching by provider so generic internal unknown-error text no longer triggers retryable timeout fallback. (#59325) Thanks @aaron-he-zhu.",
      "Agents/subagents: honor allowlist validation, auth-profile handoff, and session override state when a subagent retries after `LiveSessionModelSwitchError`. (#58178) Thanks @openperf.",
      "Agents/runtime: make default subagent allowlists, inherited skills/workspaces, and duplicate session-id resolution behave more predictably, and include value-shape hints in missing-parameter tool errors. (#59944, #59992, #59858, #55317) Thanks @hclsys, @gumadeiras, @joelnishanth, and @priyansh19.",
      "Agents/pairing: merge completion announce delivery context with the requester session fallback so missing `to` still reaches the original channel, and include `operator.talk.secrets` in CLI default operator scopes for node-role device pairing approvals. (#56481) Thanks @maxpetrusenko.",
      "Agents/scheduling: steer background-now work toward automatic completion wake and treat `process` polling as on-demand inspection or intervention instead of default completion handling. (#60877) Thanks @vincentkoc.",
      "Agents/skills: skip `.git` and `node_modules` when mirroring skills into sandbox workspaces so read-only sandboxes do not copy repo history or dependency trees. (#61090) Thanks @joelnishanth.",
      "ACP/agents: inherit the target agent workspace for cross-agent ACP spawns and fall back safely when the inherited workspace no longer exists. (#58438) Thanks @zssggle-rgb.",
      "ACPX/Windows: preserve backslashes and absolute `.exe` paths in Claude CLI parsing, and fail fast on wrapper-script targets with g界面dance to use `cmd.exe /c`, `powershell.exe -File`, or `node <script>`. (#60689) Thanks @steipete.",
      "Auth/failover: persist selected fallback overrides before retrying, shorten `auth_permanent` lockouts, and refresh websocket/shared-auth sessions only when real auth changes occur so retries and secret rotations behave predictably. (#60404, #60323, #60387) Thanks @extrasmall0 and @mappel-nv.",
      "Gateway/channels: pin the initial startup channel registry before later 插件-registry churn so configured channels stay visible and `channels.status` stops falling back to empty `channelOrder` / `channels` payloads after runtime 插件 loads.",
      "Prompt caching: order stable workspace project-context files before `HEARTBEAT.md` and keep `HEARTBEAT.md` below the system-prompt cache boundary so heartbeat churn does not invalidate the stable project-context pre修复. (#58979) Thanks @yozu and @vincentkoc.",
      "Prompt caching: route Codex Responses and Anthropic Vertex through boundary-aware cache shAPIng, and report the actual outbound system prompt in cache traces so cache reuse and misses line up with what providers really receive. Thanks @vincentkoc.",
      "Agents/cache: preserve the full 3-turn prompt-cache image window across tool loops, keep colliding bundled MCP tool definitions deterministic, and reapply Anthropic Vertex cache shAPIng after payload hook replacements so KV/cache reuse stays stable. Thanks @vincentkoc.",
      "Status/cache: restore `cacheRead` and `cacheWrite` in transcript fallback so `/status` keeps showing cache hit percentages when session logs are the only complete usage source. (#59247) Thanks @stuartsy.",
      "Status/usage: let `/status` and `session_status` fall back to transcript token totals when the session meta store stayed at zero, so LM Studio, Ollama, DashScope, and similar OpenAI-compatible providers stop showing `Context: 0/...`. (#55041) Thanks @jjjojoj.",
      "Mattermost/config schema: accept `groups.*.req界面reMention` again so existing Mattermost configs no longer fail strict validation after upgrade. (#58271) Thanks @MoerAI.",
      "Doctor/config: compare normalized `talk` configs by deep structural equality instead of key-order-sensitive serialization so `openclaw doctor --修复` stops repeatedly reporting/applying no-op `talk.provider/providers` normalization. (#59911) Thanks @ejames-dev.",
      "Anthropic CLI onboarding: rewrite migrated fallback model refs during non-interactive Claude CLI setup too, so onboarding and scripted setup no longer keep stale `anthropic/*` fallbacks after switching the primary model to `claude-cli/*`. Thanks @vincentkoc.",
      "Models/Anthropic CLI auth: replace migrated `agents.defaults.models` allowlists when `openclaw models auth login --provider anthropic --method cli --set-default` switches to `claude-cli/*`, so stale `anthropic/*` entries do not linger beside the migrated Claude CLI defaults. Thanks @vincentkoc.",
      "Doctor/Claude CLI: 添加 dedicated Claude CLI health checks so `openclaw doctor` can spot missing local installs or broken auth before agent runs fail. Thanks @vincentkoc.",
      "插件s/auth-choice: apply provider-owned auth config patches without recursively preserving replaced default-model maps, so Anthropic Claude CLI and similar migrations can intentionally swap model allowlists during onboarding and setup instead of accumulating stale entries. Thanks @vincentkoc.",
      "插件s/onboarding: write dotted 插件 界面Hint paths like Brave `webSearch.mode` as nested 插件 config so `llm-context` setup stops failing validation. (#61159) Thanks @obviyus.",
      "插件s/install: preserve unsafe override flags across linked 插件 and hook-pack probes so local `--link` installs honor the documented override behavior. (#60624) Thanks @JerrettDavis.",
      "插件s/cache: inherit the active gateway workspace for provider, web-search, and web-fetch snapshot loads when callers omit `workspaceDir`, so compatible 插件 registries and snapshot caches stop missing on gateway-owned runtime paths. (#61138) Thanks @jzakirov.",
      "插件 SDK/context engines: export the missing context-engine result and subagent lifecycle types from `openclaw/插件-sdk` so context engine 插件s can type `ContextEngine` 实现ations without local workarounds. (#61251) Thanks @DaevMithran.",
      "Tasks/maintenance: reconcile stale cron and chat-backed CLI task rows against live cron-job and agent-run ownership instead of treating any persisted session key as proof that the task is still running. (#60310) Thanks @lml2468.",
      "插件s: suppress trust-warning noise during non-activating snapshot and CLI metadata loads. (#61427) Thanks @gumadeiras.",
      "Agents/video generation: accept `agents.defaults.videoGenerationModel` in strict config validation and `openclaw config set/get`, so gateways using `video_generate` no longer fail to boot after enabling a video model.",
      "Matrix/streaming: 添加 a q界面et preview mode for streamed Matrix replies, keep legacy `partial` preview-first behavior, and finalize q界面et media captions correctly so previews stop notifying early without dropping final text semantics. (#61450) Thanks @gumadeiras.",
      "Gateway/shutdown: bound websocket-server shutdown even when no tracked clients remain, so gateway restarts stop hanging until the watchdog kills the process. (#61565) Thanks @mbelinky.",
      "Control 界面/multilingual: localize the remaining shared channel, instances, nodes, and gateway-confirmation strings so the dashboard stops mixing translated 界面 with hardcoded English labels. Thanks @vincentkoc.",
      "Discord/media: raise the default inbound and outbound media cap to `100MB` so Discord matches Telegram more closely and larger attachments stop failing on the old low default.",
      "Matrix: keep direct transport requests on the pinned dispatcher by routing them through undici runtime fetch, so Matrix clients resume syncing on newer runtimes without dropping the validated 添加ress binding. (#61595) Thanks @gumadeiras.",
      "插件s/facades: resolve globally installed bundled-插件 runtime facades from registry roots so bundled channels like LINE still boot when the winning 插件 install lives under the global extensions directory with an encoded scoped folder name. (#61297) Thanks @openperf."
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
      "Tasks/Task Flow: restore the core Task Flow substrate with managed-vs-mirrored sync modes, durable flow state/revision tracking, and `openclaw flows` inspection/recovery primitives so background orchestration can persist and be operated separately from 插件 authoring layers. (#58930) Thanks @mbelinky.",
      "Tasks/Task Flow: 添加 managed child task spawning plus sticky cancel intent, so external orchestrators can stop scheduling immediately and let parent Task Flows settle to `cancelled` once active child tasks finish. (#59610) Thanks @mbelinky.",
      "插件s/Task Flow: 添加 a bound `API.runtime.taskFlow` seam so 插件s and trusted authoring layers can create and drive managed Task Flows from host-resolved OpenClaw context without passing owner identifiers on each call. (#59622) Thanks @mbelinky.",
      "Android/assistant: 添加 assistant-role entrypoints plus Google Assistant App Actions metadata so Android can launch OpenClaw from the assistant trigger and hand prompts into the chat composer. (#59596) Thanks @obviyus.",
      "Exec defaults: make gateway/node host exec default to YOLO mode by requesting `安全=full` with `ask=off`, and align host approval-file fallbacks plus docs/doctor reporting with that no-prompt default.",
      "Providers/runtime: 添加 provider-owned replay hook surfaces for transcript policy, replay cleanup, and reasoning-mode dispatch. (#59143) Thanks @jalehman.",
      "插件s/hooks: 添加 `before_agent_reply` so 插件s can short-circ界面t the LLM with synthetic replies after inline actions. (#20067) Thanks @JoshuaLelon.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing and Feishu scoped inheritance across bootstrap, model override, restart, and tool-policy paths.",
      "Feishu/comments: 添加 a dedicated Drive comment-event flow with comment-thread context resolution, in-thread replies, and `feishu_drive` comment actions for document collaboration workflows. (#58497) Thanks @wittam-01.",
      "Matrix/插件: emit spec-compliant `m.mentions` metadata across text sends, media captions, edits, poll fallback text, and action-driven edits so Matrix mentions notify reliably in clients like Element. (#59323) Thanks @gumadeiras.",
      "Diffs: 添加 插件-owned `viewerBaseUrl` so viewer links can use a stable proxy/public origin without passing `baseUrl` on every tool call. (#59341) Related #59227. Thanks @gumadeiras.",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently for manual `/compact` and other context-engine compaction paths, so engine-owned compaction uses the configured override model across runtime entrypoints. (#56710) Thanks @oliviareid-svg.",
      "Agents/compaction: 添加 `agents.defaults.compaction.notifyUser` so the `🧹 Compacting context...` start notice is opt-in instead of always being shown. (#54251) Thanks @oguricap0327.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance for agent reactions. Thanks @mcaxtr.",
      "Exec approvals/channels: auto-enable DM-first native chat approvals when 支持ed channels can infer approvers from existing owner config, while keeping channel fanout explicit and clarifying forwarding versus native approval client config."
    ],
    "improvements": [
      "插件s/xAI: move `x_search` settings from the legacy core `tools.web.x_search.*` path to the 插件-owned `插件s.entries.xai.config.xSearch.*` path, standardize `x_search` auth on `插件s.entries.xai.config.webSearch.APIKey` / `XAI_API_KEY`, and migrate legacy config with `openclaw doctor --修复`. (#59674) Thanks @vincentkoc.",
      "插件s/web fetch: move Firecrawl `web_fetch` config from the legacy core `tools.web.fetch.firecrawl.*` path to the 插件-owned `插件s.entries.firecrawl.config.webFetch.*` path, route `web_fetch` fallback through the new fetch-provider boundary instead of a Firecrawl-only core branch, and migrate legacy config with `openclaw doctor --修复`. (#59465) Thanks @vincentkoc."
    ],
    "bugfixes": [
      "Providers/transport policy: centralize request auth, proxy, TLS, and header shAPIng across shared HTTP, stream, and websocket paths, block insecure TLS/runtime transport overrides, and keep proxy-hop TLS separate from target mTLS settings. (#59682) Thanks @vincentkoc.",
      "Providers/Copilot: classify native GitHub Copilot API hosts in the shared provider endpoint resolver and harden token-derived proxy endpoint parsing so Copilot base URL routing stays centralized and fails closed on malformed hints. (#59644) Thanks @vincentkoc.",
      "Providers/streaming headers: centralize default and attribution header merging across OpenAI websocket, embedded-runner, and proxy stream paths so provider-specific headers stay consistent and caller overrides only win where intended. (#59542) Thanks @vincentkoc.",
      "Providers/media HTTP: centralize base URL normalization, default auth/header injection, and explicit header override handling across shared OpenAI-compatible audio, Deepgram audio, Gemini media/image, and Moonshot video request paths. (#59469) Thanks @vincentkoc.",
      "Providers/OpenAI-compatible routing: centralize native-vs-proxy request policy so hidden attribution and related OpenAI-family defaults only apply on verified native endpoints across stream, websocket, and shared audio HTTP paths. (#59433) Thanks @vincentkoc.",
      "Providers/Anthropic routing: centralize native-vs-proxy endpoint classification for direct Anthropic `service_tier` handling so spoofed or proxied hosts do not inherit native Anthropic defaults. (#59608) Thanks @vincentkoc.",
      "Gateway/exec loopback: restore legacy-role fallback for empty paired-device token maps and allow silent local role upgrades so local exec and node clients stop failing with pairing-req界面red errors after `2026.3.31`. (#59092) Thanks @openperf.",
      "Agents/subagents: pin admin-only subagent gateway calls to `operator.admin` while keeping `agent` at least privilege, so `sessions_spawn` no longer dies on loopback scope-upgrade pairing with `close(1008) \"pairing req界面red\"`. (#59555) Thanks @openperf.",
      "Exec approvals/config: strip invalid `安全`, `ask`, and `askFallback` values from `~/.openclaw/exec-approvals.json` during normalization so malformed policy enums fall back cleanly to the documented defaults instead of corrupting runtime policy resolution. (#59112) Thanks @openperf.",
      "Exec approvals/doctor: report host policy sources from the real approvals file path and ignore malformed host override values when attributing effective policy conflicts. (#59367) Thanks @gumadeiras.",
      "Exec/runtime: treat `tools.exec.host=auto` as routing-only, keep implicit no-config exec on sandbox when available or gateway otherwise, and reject per-call host overrides that would bypass the configured sandbox or host target. (#58897) Thanks @vincentkoc.",
      "Slack/mrkdwn formatting: 添加 b界面lt-in Slack mrkdwn g界面dance in inbound context so Slack replies stop falling back to generic Markdown patterns that render poorly in Slack. (#59100) Thanks @jadewon.",
      "WhatsApp/presence: send `unavailable` presence on connect in self-chat mode so personal-phone users stop losing all push notifications while the gateway is running. (#59410) Thanks @mcaxtr.",
      "WhatsApp/media: 添加 HTML, XML, and CSS to the MIME map and fall back gracefully for unknown media types instead of dropping the attachment. (#51562) Thanks @bobbyt74.",
      "Matrix/onboarding: restore g界面ded setup in `openclaw channels 添加` and `openclaw configure --section channels`, while keeping custom 插件 wizards on the shared `setupWizard` seam. (#59462) Thanks @gumadeiras.",
      "Matrix/streaming: keep live partial previews for the current assistant block while preserving completed block 更新s as separate messages when `channels.matrix.blockStreaming` is enabled. (#59384) Thanks @gumadeiras.",
      "Feishu/comment threads: harden document comment-thread delivery so whole-document comments fall back to `添加_comment`, delayed reply lookups retry more reliably, and user-visible replies avoid reasoning/planning spillover. (#59129) Thanks @wittam-01.",
      "MS Teams/streaming: strip already-streamed text from fallback block delivery when replies exceed the 4000-character streaming limit so long responses stop duplicating content. (#59297) Thanks @bradgroux.",
      "Slack/thread context: filter thread starter and history by the effective conversation allowlist without dropping valid open-room, DM, or group DM context. (#58380) Thanks @jacobtomlinson.",
      "Mattermost/probes: route status probes through the SSRF guard and honor `allowPrivateNetwork` so connectivity checks stay safe for self-hosted Mattermost deployments. (#58529) Thanks @mappel-nv.",
      "Zalo/webhook replay: scope replay dedupe key by chat and sender so reused message IDs across different chats or senders no longer collide, and harden metadata reads for partially missing payloads. (#58444)",
      "QQBot/structured payloads: restrict local file paths to QQ Bot-owned media storage, block traversal outside that root, reduce path leakage in logs, and keep inline image data URLs working. (#58453) Thanks @jacobtomlinson.",
      "Image generation/providers: route OpenAI, MiniMax, and fal image requests through the shared provider HTTP transport path so custom base URLs, guarded private-network routing, and provider request defaults stay aligned with the rest of provider HTTP. Thanks @vincentkoc.",
      "Image generation/providers: stop inferring private-network access from configured OpenAI, MiniMax, and fal image base URLs, and cap shared HTTP error-body reads so hostile or misconfigured endpoints fail closed without relaxing SSRF policy or buffering unbounded error payloads. Thanks @vincentkoc.",
      "Browser/host inspection: keep static Chrome inspection helpers out of the activated browser runtime so `openclaw doctor browser` and related checks do not eagerly load the bundled browser 插件. (#59471) Thanks @vincentkoc.",
      "Browser/CDP: normalize trailing-dot localhost absolute-form hosts before loopback checks so remote CDP websocket URLs like `ws://localhost.:...` rewrite back to the configured remote host. (#59236) Thanks @mappel-nv.",
      "Agents/output sanitization: strip namespaced `antml:thinking` blocks from user-visible text so Anthropic-style internal monologue tags do not leak into replies. (#59550) Thanks @obviyus.",
      "Kimi Coding/tools: normalize Anthropic tool payloads into the OpenAI-compatible function shape Kimi Coding expects so tool calls stop losing req界面red arguments. (#59440) Thanks @obviyus.",
      "Image tool/paths: resolve relative local media paths against the agent `workspaceDir` instead of `process.cwd()` so inputs like `inbox/receipt.png` pass the local-path allowlist reliably. (#57222) Thanks Priyansh Gupta.",
      "Podman/launch: 移除 noisy container output from `scripts/run-openclaw-podman.sh` and align the Podman install g界面dance with the q界面eter startup flow. (#59368) Thanks @sallyom.",
      "插件s/runtime: keep LINE reply directives and browser-backed cleanup/reset flows working even when those 插件s are disabled while tightening bundled 插件 activation guards. (#59412) Thanks @vincentkoc.",
      "ACP/gateway reconnects: keep ACP prompts alive across transient websocket drops while still failing boundedly when reconnect recovery does not complete. (#59473) Thanks @obviyus.",
      "ACP/gateway reconnects: reject stale pre-ack ACP prompts after reconnect grace expiry so callers fail cleanly instead of hanging indefinitely when the gateway never confirms the run.",
      "Gateway/session kill: enforce HTTP operator scopes on session kill requests and gate authorization before session lookup so unauthenticated callers cannot probe session existence. (#59128) Thanks @jacobtomlinson.",
      "MS Teams/logging: format non-`Error` failures with the shared unknown-error helper so logs stop collapsing caught SDK or Axios objects into `[object Object]`. (#59321) Thanks @bradgroux.",
      "Channels/setup: ignore untrusted workspace channel 插件s during setup resolution so a shadowing workspace 插件 cannot override b界面lt-in channel setup/login flows unless explicitly trusted in config. (#59158) Thanks @mappel-nv.",
      "Exec/Windows: restore allowlist enforcement with quote-aware `argPattern` matching across gateway and node exec, and surface accurate dynamic pre-approved executable hints in the exec tool description. (#56285) Thanks @kpngr.",
      "Gateway: prune empty `node-pending-work` state entries after explicit acknowledgments and natural expiry so the per-node state map no longer grows indefinitely. (#58179) Thanks @gavyngong.",
      "Webhooks/secret comparison: replace ad-hoc timing-safe secret comparisons across BlueBubbles, Feishu, Mattermost, Telegram, Twilio, and Zalo webhook handlers with the shared `safeEqualSecret` helper and reject empty auth tokens in BlueBubbles. (#58432) Thanks @eleqtrizit.",
      "OpenShell/mirror: constrain `remoteWorkspaceDir` and `remoteAgentWorkspaceDir` to the managed `/sandbox` and `/agent` roots, and keep mirror sync from overwriting or removing user-添加ed shell roots during config synchronization. (#58515) Thanks @eleqtrizit.",
      "插件s/activation: preserve explicit, auto-enabled, and default activation provenance plus reason metadata across CLI, gateway bootstrap, and status surfaces so 插件 enablement state stays accurate after auto-enable resolution. (#59641) Thanks @vincentkoc.",
      "Exec/env: block 添加itional host environment override pivots for package roots, language runtimes, compiler include paths, and credential/config locations so request-scoped exec cannot redirect trusted toolchains or config lookups. (#59233) Thanks @drobison00.",
      "Dotenv/workspace overrides: block workspace `.env` files from overriding `OPENCLAW_PINNED_PYTHON` and `OPENCLAW_PINNED_WRITE_PYTHON` so trusted helper interpreters cannot be redirected by repo-local env injection. (#58473) Thanks @eleqtrizit.",
      "插件s/install: accept JSON5 syntax in `openclaw.插件.json` and bundle `插件.json` manifests during install/validation, so third-party 插件s with trailing commas, comments, or unquoted keys no longer fail to install. (#59084) Thanks @singleGanghood.",
      "Telegram/exec approvals: rewrite shared `/approve … allow-always` callback payloads to `/approve … always` before Telegram button rendering so 插件 approval IDs still fit Telegram's `callback_data` limit and keep the Allow Always action visible. (#59217) Thanks @jameslcowan.",
      "Cron/exec timeouts: surface timed-out `exec` and `bash` failures in isolated cron runs even when `verbose: off`, including custom session-target cron jobs, so scheduled runs stop failing silently. (#58247) Thanks @skainguyen1412.",
      "Telegram/exec approvals: fall back to the origin session key for async approval followups and keep resume-failure status delivery sanitized so Telegram followups still land without leaking raw exec metadata. (#59351) Thanks @seonang.",
      "Node-host/exec approvals: bind `pnpm dlx` invocations through the approval planner's mutable-script path so the effective runtime command is resolved for approval instead of being left unbound. (#58374)",
      "Exec/node hosts: stop forwarding the gateway workspace cwd to remote node exec when no workdir was explicitly requested, so cross-platform node approvals fall back to the node default cwd instead of failing with `SYSTEM_RUN_DENIED`. (#58977) Thanks @Starhappysh.",
      "Exec approvals/channels: decouple initiating-surface approval availability from native delivery enablement so Telegram, Slack, and Discord still expose approvals when approvers exist and native target routing is configured separately. (#59776) Thanks @joelnishanth."
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
      "Tasks/chat: 添加 `/tasks` as a chat-native background task board for the current session, with recent task details and agent-local fallback counts when no linked tasks are visible. Related #54226. Thanks @vincentkoc.",
      "Web search/SearXNG: 添加 the bundled SearXNG provider 插件 for `web_search` with configurable host 支持. (#57317) Thanks @cgdusek.",
      "Amazon Bedrock/Guardrails: 添加 Bedrock Guardrails 支持 to the bundled provider. (#58588) Thanks @MikeORed.",
      "macOS/Voice Wake: 添加 the Voice Wake option to trigger Talk Mode. (#58490) Thanks @SmoothExec.",
      "Feishu/comments: 添加 a dedicated Drive comment-event flow with comment-thread context resolution, in-thread replies, and `feishu_drive` comment actions for document collaboration workflows. (#58497) Thanks @wittam-01.",
      "Gateway/webchat: make `chat.history` text truncation configurable with `gateway.webchat.chatHistoryMaxChars` and per-request `maxChars`, while preserving silent-reply filtering and existing default payload limits. (#58900)",
      "Agents/default params: 添加 `agents.defaults.params` for global default provider parameters. (#58548) Thanks @lpender.",
      "Agents/failover: cap prompt-side and assistant-side same-provider auth-profile retries for rate-limit failures before cross-provider model fallback, 添加 the `auth.cooldowns.rateLimitedProfileRotations` knob, and document the new fallback behavior. (#58707) Thanks @Forgely3D",
      "Cron/tools allowlist: 添加 `openclaw cron --tools` for per-job tool allowlists. (#58504) Thanks @andyk-ms.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing and Feishu scoped inheritance across bootstrap, model override, restart, and tool-policy paths.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance for agent reactions. Thanks @mcaxtr.",
      "Telegram/errors: 添加 configurable `errorPolicy` and `errorCooldownMs` controls so Telegram can suppress repeated delivery errors per account, chat, and topic without muting distinct failures. (#51914) Thanks @chinar-amrutkar",
      "ZAI/models: 添加 `glm-5.1` and `glm-5v-turbo` to the bundled Z.AI provider catalog. (#58793) Thanks @tomsun28",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently for manual `/compact` and other context-engine compaction paths, so engine-owned compaction uses the configured override model across runtime entrypoints. (#56710) Thanks @oliviareid-svg"
    ],
    "improvements": [],
    "bugfixes": [
      "Chat/error replies: stop leaking raw provider/runtime failures into external chat channels, return a friendly retry message instead, and 添加 a specific `/new` hint for Bedrock toolResult/toolUse session mismatches. (#58831) Thanks @ImLukeF.",
      "Gateway/reload: ignore startup config writes by persisted hash in the config reloader so generated auth tokens and seeded Control 界面 origins do not trigger a restart loop, while real `gateway.auth.*` edits still req界面re restart. (#58678) Thanks @yelog",
      "Tasks/gateway: keep the task registry maintenance sweep from stalling the gateway event loop under synchronous SQLite pressure, so upgraded gateways stop hanging about a minute after startup. (#58670) Thanks @openperf",
      "Tasks/status: hide stale completed background tasks from `/status` and `session_status`, prefer live task context, and show recent failures only when no active work remains. (#58661) Thanks @vincentkoc",
      "Tasks/gateway: re-check the current task record before maintenance marks runs lost or prunes them, so a task heartbeat or cleanup 更新 that lands during a sweep no longer gets overwritten by stale snapshot state.",
      "Exec/approvals: honor `exec-approvals.json` 安全 defaults when inline or configured tool policy is unset, and keep Slack and Discord native approval handling aligned with inferred approvers and real channel enablement so remote exec stops falling into false approval timeouts and disabled states. Thanks @scoootscooob and @vincentkoc.",
      "Exec/approvals: make `allow-always` persist as durable user-approved trust instead of behaving like `allow-once`, reuse exact-command trust on shell-wrapper paths that cannot safely persist an executable allowlist entry, keep static allowlist entries from silently bypassing `ask:\"always\"`, and req界面re explicit approval when Windows cannot b界面ld an allowlist execution plan instead of hard-dead-ending remote exec. Thanks @scoootscooob and @vincentkoc.",
      "Exec/cron: resolve isolated cron no-route approval dead-ends from the effective host fallback policy when trusted automation is allowed, and make `openclaw doctor` warn when `tools.exec` is broader than `~/.openclaw/exec-approvals.json` so stricter host-policy conflicts are explicit. Thanks @scoootscooob and @vincentkoc.",
      "Sessions/model switching: keep `/model` changes queued behind busy runs instead of interrupting the active turn, and retarget queued followups so later work picks up the new model as soon as the current turn finishes.",
      "Gateway/HTTP: skip failing HTTP request stages so one broken facade no longer forces every HTTP endpoint to return 500. (#58746) Thanks @yelog",
      "Gateway/nodes: stop pinning live node commands to the approved node-pair record. Node pairing remains a trust/token flow, while per-node `system.run` policy stays in that node's exec approvals config. 修复es #58824.",
      "WebChat/exec approvals: use native approval 界面 g界面dance in agent system prompts instead of telling agents to paste manual `/approve` commands in webchat sessions. Thanks @vincentkoc.",
      "Web 界面/OpenResponses: preserve rewritten stream snapshots in webchat and keep OpenResponses final streamed text aligned when models rewind earlier output. (#58641) Thanks @neeravmakwana",
      "Discord/inbound media: pass Discord attachment and sticker downloads through the shared idle-timeout and worker-abort path so slow or stuck inbound media fetches stop hanging message processing. (#58593) Thanks @aquaright1",
      "Telegram/retries: keep non-idempotent sends on the strict safe-send path, retry wrapped pre-connect failures, and preserve `429` / `retry_after` backoff for safe delivery retries. (#51895) Thanks @chinar-amrutkar",
      "Telegram/exec approvals: route topic-aware exec approval followups through Telegram-owned threading and approval-target parsing, so forum-topic approvals stay in the originating topic instead of falling back to the root chat. (#58783)",
      "Telegram/local Bot API: preserve media MIME types for absolute-path downloads so local audio files still trigger transcription and other MIME-based handling. (#54603) Thanks @jzakirov",
      "Channels/WhatsApp: pass inbound message timestamp to model context so the AI can see when WhatsApp messages were sent. (#58590) Thanks @Maninae",
      "Channels/QQ Bot: keep `/bot-logs` export gated behind a truly explicit QQBot allowlist, rejecting wildcard and mixed wildcard entries while preserving the real framework command path. Thanks @vincentkoc.",
      "Channels/插件s: keep bundled channel 插件s loadable from legacy `channels.<id>` config even under restrictive 插件 allowlists, and make `openclaw doctor` warn only on real 插件 blockers instead of misleading setup g界面dance. (#58873) Thanks @obviyus",
      "插件s/bundled runtimes: restore externalized bundled 插件 runtime dependency staging across packed installs, Docker b界面lds, and local runtime staging so bundled 插件s keep their declared runtime deps after the 2026.3.31 externalization change. (#58782)",
      "LINE/runtime: resolve the packaged runtime contract from the b界面lt `dist/插件s/runtime` layout so LINE channels start correctly again after global npm installs on `2026.3.31`. (#58799) Thanks @vincentkoc.",
      "MiniMax/插件s: auto-enable the bundled MiniMax 插件 for API-key auth/config so MiniMax image generation and other 插件-owned capabilities load without manual 插件 allowlisting. (#57127) Thanks @tars90percent.",
      "Ollama/model picker: show only Ollama models after provider selection in the CLI picker. (#55290) Thanks @Luckymingxuan.",
      "CDP/profiles: prefer `cdpPort` over stale WebSocket URLs so browser automation reconnects cleanly. (#58499) Thanks @Mlightsnow.",
      "Media/paths: resolve relative `MEDIA` paths against the agent workspace so local attachment references keep working. (#58624) Thanks @aquaright1.",
      "Memory/session indexing: keep full reindexes from skipping session transcripts when sync is triggered by `session-start` or `watch`, so restart-driven reindexes preserve session memory. (#39732) Thanks @upupc",
      "Memory/QMD: prefer `--mask` over `--glob` when creating QMD collections so default memory collections keep their intended patterns and stop colliding on restart. (#58643) Thanks @GitZhangChi.",
      "Subagents/tasks: keep subagent completion and cleanup from crashing when task-registry writes fail, so a corrupt or missing task row no longer takes down the gateway during lifecycle finalization. Thanks @vincentkoc.",
      "Sandbox/browser: compare browser runtime inspection against `agents.defaults.sandbox.browser.image` so `openclaw sandbox list --browser` stops reporting healthy browser containers as image mismatches. (#58759) Thanks @sandpile.",
      "插件s/install: forward `--dangerously-force-unsafe-install` through archive and npm-spec 插件 installs so the documented override reaches the 安全 scanner on those install paths. (#58879) Thanks @ryanlee-gemini.",
      "Auto-reply/commands: strip inbound metadata before slash command detection so wrapped `/model`, `/new`, and `/status` commands are recognized. (#58725) Thanks @Mlightsnow.",
      "Agents/Anthropic: preserve thinking blocks and signatures across replay, cache-control patching, and context pruning so compacted Anthropic sessions continue working instead of failing on later turns. (#58916) Thanks @obviyus",
      "Agents/failover: unify structured and raw provider error classification so provider-specific `400`/`422` payloads no longer get forced into generic format failures before retry, billing, or compaction logic can inspect them. (#58856) Thanks @aaron-he-zhu.",
      "Auth profiles/store: coerce misplaced SecretRef objects out of plaintext `key` and `token` fields during store load so agents without ACP runtime stop crashing on `.trim()` after upgrade. (#58923) Thanks @openperf.",
      "ACPX/runtime: repair `queue owner unavailable` session recovery by replacing dead named sessions and resuming the backend session when ACPX exposes a stable session id, so the first ACP prompt no longer inherits a dead handle. (#58669) Thanks @neeravmakwana",
      "ACPX/runtime: retry dead-session queue-owner repair without `--resume-session` when the reported ACPX session id is stale, so recovery still creates a fresh named session instead of failing session init. Thanks @obviyus.",
      "Auth/OpenAI Codex: persist 插件-refreshed OAuth credentials to `auth-profiles.json` before returning them, so rotated Codex refresh tokens survive restart and stop falling into `refresh_token_reused` loops. (#53082)",
      "Discord/gateway: hand reconnect ownership back to Carbon, keep runtime status aligned with close/reconnect state, and force-stop sockets that open without reaching READY so Discord monitors recover promptly instead of waiting on stale health timeouts. (#59019) Thanks @obviyus",
      "Config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\"*\"].req界面reMention` on load so legacy configs no longer crash at startup. (#55336) thanks @jameslcowan."
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
      "Tasks/chat: 添加 `/tasks` as a chat-native background task board for the current session, with recent task details and agent-local fallback counts when no linked tasks are visible. Related #54226. Thanks @vincentkoc.",
      "Web search/SearXNG: 添加 the bundled SearXNG provider 插件 for `web_search` with configurable host 支持. (#57317) Thanks @cgdusek.",
      "Amazon Bedrock/Guardrails: 添加 Bedrock Guardrails 支持 to the bundled provider. (#58588) Thanks @MikeORed.",
      "macOS/Voice Wake: 添加 the Voice Wake option to trigger Talk Mode. (#58490) Thanks @SmoothExec.",
      "Feishu/comments: 添加 a dedicated Drive comment-event flow with comment-thread context resolution, in-thread replies, and `feishu_drive` comment actions for document collaboration workflows. (#58497) Thanks @wittam-01.",
      "Gateway/webchat: make `chat.history` text truncation configurable with `gateway.webchat.chatHistoryMaxChars` and per-request `maxChars`, while preserving silent-reply filtering and existing default payload limits. (#58900)",
      "Agents/default params: 添加 `agents.defaults.params` for global default provider parameters. (#58548) Thanks @lpender.",
      "Agents/failover: cap prompt-side and assistant-side same-provider auth-profile retries for rate-limit failures before cross-provider model fallback, 添加 the `auth.cooldowns.rateLimitedProfileRotations` knob, and document the new fallback behavior. (#58707) Thanks @Forgely3D",
      "Cron/tools allowlist: 添加 `openclaw cron --tools` for per-job tool allowlists. (#58504) Thanks @andyk-ms.",
      "Channels/session routing: move provider-specific session conversation grammar into 插件-owned session-key surfaces, preserving Telegram topic routing and Feishu scoped inheritance across bootstrap, model override, restart, and tool-policy paths.",
      "WhatsApp/reactions: 添加 `reactionLevel` g界面dance for agent reactions. Thanks @mcaxtr.",
      "Telegram/errors: 添加 configurable `errorPolicy` and `errorCooldownMs` controls so Telegram can suppress repeated delivery errors per account, chat, and topic without muting distinct failures. (#51914) Thanks @chinar-amrutkar",
      "ZAI/models: 添加 `glm-5.1` and `glm-5v-turbo` to the bundled Z.AI provider catalog. (#58793) Thanks @tomsun28",
      "Agents/compaction: resolve `agents.defaults.compaction.model` consistently for manual `/compact` and other context-engine compaction paths, so engine-owned compaction uses the configured override model across runtime entrypoints. (#56710) Thanks @oliviareid-svg"
    ],
    "improvements": [],
    "bugfixes": [
      "Chat/error replies: stop leaking raw provider/runtime failures into external chat channels, return a friendly retry message instead, and 添加 a specific `/new` hint for Bedrock toolResult/toolUse session mismatches. (#58831) Thanks @ImLukeF.",
      "Gateway/reload: ignore startup config writes by persisted hash in the config reloader so generated auth tokens and seeded Control 界面 origins do not trigger a restart loop, while real `gateway.auth.*` edits still req界面re restart. (#58678) Thanks @yelog",
      "Tasks/gateway: keep the task registry maintenance sweep from stalling the gateway event loop under synchronous SQLite pressure, so upgraded gateways stop hanging about a minute after startup. (#58670) Thanks @openperf",
      "Tasks/status: hide stale completed background tasks from `/status` and `session_status`, prefer live task context, and show recent failures only when no active work remains. (#58661) Thanks @vincentkoc",
      "Tasks/gateway: re-check the current task record before maintenance marks runs lost or prunes them, so a task heartbeat or cleanup 更新 that lands during a sweep no longer gets overwritten by stale snapshot state.",
      "Exec/approvals: honor `exec-approvals.json` 安全 defaults when inline or configured tool policy is unset, and keep Slack and Discord native approval handling aligned with inferred approvers and real channel enablement so remote exec stops falling into false approval timeouts and disabled states. Thanks @scoootscooob and @vincentkoc.",
      "Exec/approvals: make `allow-always` persist as durable user-approved trust instead of behaving like `allow-once`, reuse exact-command trust on shell-wrapper paths that cannot safely persist an executable allowlist entry, keep static allowlist entries from silently bypassing `ask:\"always\"`, and req界面re explicit approval when Windows cannot b界面ld an allowlist execution plan instead of hard-dead-ending remote exec. Thanks @scoootscooob and @vincentkoc.",
      "Exec/cron: resolve isolated cron no-route approval dead-ends from the effective host fallback policy when trusted automation is allowed, and make `openclaw doctor` warn when `tools.exec` is broader than `~/.openclaw/exec-approvals.json` so stricter host-policy conflicts are explicit. Thanks @scoootscooob and @vincentkoc.",
      "Sessions/model switching: keep `/model` changes queued behind busy runs instead of interrupting the active turn, and retarget queued followups so later work picks up the new model as soon as the current turn finishes.",
      "Gateway/HTTP: skip failing HTTP request stages so one broken facade no longer forces every HTTP endpoint to return 500. (#58746) Thanks @yelog",
      "Gateway/nodes: stop pinning live node commands to the approved node-pair record. Node pairing remains a trust/token flow, while per-node `system.run` policy stays in that node's exec approvals config. 修复es #58824.",
      "WebChat/exec approvals: use native approval 界面 g界面dance in agent system prompts instead of telling agents to paste manual `/approve` commands in webchat sessions. Thanks @vincentkoc.",
      "Web 界面/OpenResponses: preserve rewritten stream snapshots in webchat and keep OpenResponses final streamed text aligned when models rewind earlier output. (#58641) Thanks @neeravmakwana",
      "Discord/inbound media: pass Discord attachment and sticker downloads through the shared idle-timeout and worker-abort path so slow or stuck inbound media fetches stop hanging message processing. (#58593) Thanks @aquaright1",
      "Telegram/retries: keep non-idempotent sends on the strict safe-send path, retry wrapped pre-connect failures, and preserve `429` / `retry_after` backoff for safe delivery retries. (#51895) Thanks @chinar-amrutkar",
      "Telegram/exec approvals: route topic-aware exec approval followups through Telegram-owned threading and approval-target parsing, so forum-topic approvals stay in the originating topic instead of falling back to the root chat. (#58783)",
      "Telegram/local Bot API: preserve media MIME types for absolute-path downloads so local audio files still trigger transcription and other MIME-based handling. (#54603) Thanks @jzakirov",
      "Channels/WhatsApp: pass inbound message timestamp to model context so the AI can see when WhatsApp messages were sent. (#58590) Thanks @Maninae",
      "Channels/QQ Bot: keep `/bot-logs` export gated behind a truly explicit QQBot allowlist, rejecting wildcard and mixed wildcard entries while preserving the real framework command path. Thanks @vincentkoc.",
      "Channels/插件s: keep bundled channel 插件s loadable from legacy `channels.<id>` config even under restrictive 插件 allowlists, and make `openclaw doctor` warn only on real 插件 blockers instead of misleading setup g界面dance. (#58873) Thanks @obviyus",
      "插件s/bundled runtimes: restore externalized bundled 插件 runtime dependency staging across packed installs, Docker b界面lds, and local runtime staging so bundled 插件s keep their declared runtime deps after the 2026.3.31 externalization change. (#58782)",
      "LINE/runtime: resolve the packaged runtime contract from the b界面lt `dist/插件s/runtime` layout so LINE channels start correctly again after global npm installs on `2026.3.31`. (#58799) Thanks @vincentkoc.",
      "MiniMax/插件s: auto-enable the bundled MiniMax 插件 for API-key auth/config so MiniMax image generation and other 插件-owned capabilities load without manual 插件 allowlisting. (#57127) Thanks @tars90percent.",
      "Ollama/model picker: show only Ollama models after provider selection in the CLI picker. (#55290) Thanks @Luckymingxuan.",
      "CDP/profiles: prefer `cdpPort` over stale WebSocket URLs so browser automation reconnects cleanly. (#58499) Thanks @Mlightsnow.",
      "Media/paths: resolve relative `MEDIA` paths against the agent workspace so local attachment references keep working. (#58624) Thanks @aquaright1.",
      "Memory/session indexing: keep full reindexes from skipping session transcripts when sync is triggered by `session-start` or `watch`, so restart-driven reindexes preserve session memory. (#39732) Thanks @upupc",
      "Memory/QMD: prefer `--mask` over `--glob` when creating QMD collections so default memory collections keep their intended patterns and stop colliding on restart. (#58643) Thanks @GitZhangChi.",
      "Subagents/tasks: keep subagent completion and cleanup from crashing when task-registry writes fail, so a corrupt or missing task row no longer takes down the gateway during lifecycle finalization. Thanks @vincentkoc.",
      "Sandbox/browser: compare browser runtime inspection against `agents.defaults.sandbox.browser.image` so `openclaw sandbox list --browser` stops reporting healthy browser containers as image mismatches. (#58759) Thanks @sandpile.",
      "插件s/install: forward `--dangerously-force-unsafe-install` through archive and npm-spec 插件 installs so the documented override reaches the 安全 scanner on those install paths. (#58879) Thanks @ryanlee-gemini.",
      "Auto-reply/commands: strip inbound metadata before slash command detection so wrapped `/model`, `/new`, and `/status` commands are recognized. (#58725) Thanks @Mlightsnow.",
      "Agents/Anthropic: preserve thinking blocks and signatures across replay, cache-control patching, and context pruning so compacted Anthropic sessions continue working instead of failing on later turns. (#58916) Thanks @obviyus",
      "Agents/failover: unify structured and raw provider error classification so provider-specific `400`/`422` payloads no longer get forced into generic format failures before retry, billing, or compaction logic can inspect them. (#58856) Thanks @aaron-he-zhu.",
      "Auth profiles/store: coerce misplaced SecretRef objects out of plaintext `key` and `token` fields during store load so agents without ACP runtime stop crashing on `.trim()` after upgrade. (#58923) Thanks @openperf.",
      "ACPX/runtime: repair `queue owner unavailable` session recovery by replacing dead named sessions and resuming the backend session when ACPX exposes a stable session id, so the first ACP prompt no longer inherits a dead handle. (#58669) Thanks @neeravmakwana",
      "ACPX/runtime: retry dead-session queue-owner repair without `--resume-session` when the reported ACPX session id is stale, so recovery still creates a fresh named session instead of failing session init. Thanks @obviyus.",
      "Auth/OpenAI Codex: persist 插件-refreshed OAuth credentials to `auth-profiles.json` before returning them, so rotated Codex refresh tokens survive restart and stop falling into `refresh_token_reused` loops. (#53082)",
      "Discord/gateway: hand reconnect ownership back to Carbon, keep runtime status aligned with close/reconnect state, and force-stop sockets that open without reaching READY so Discord monitors recover promptly instead of waiting on stale health timeouts. (#59019) Thanks @obviyus"
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
      "ACP/插件s: 添加 an explicit default-off ACPX 插件-tools MCP bridge config, document the trust boundary, and harden the b界面lt-in bridge packaging/logging path so global installs and stdio MCP sessions work reliably. (#56867) Thanks @joe2643.",
      "Agents/LLM: 添加 a configurable idle-stream timeout for embedded runner requests so stalled model streams abort cleanly instead of hanging until the broader run timeout fires. (#55072) Thanks @liuy.",
      "Agents/MCP: materialize bundle MCP tools with provider-safe names (`serverName__toolName`), 支持 optional `streamable-http` transport selection plus per-server connection timeouts, and preserve real tool results from aborted/error turns unless truncation explicitly drops them. (#49505) Thanks @ziomancer.",
      "Android/notifications: 添加 notification-forwarding controls with package filtering, q界面et hours, rate limiting, and safer picker behavior for forwarded notification events. (#40175) Thanks @nimbleenigma.",
      "Background tasks: turn tasks into a real shared background-run control plane instead of ACP-only bookkeeping by unifying ACP, subagent, cron, and background CLI execution under one SQLite-backed ledger, routing detached lifecycle 更新s through the executor seam, 添加ing audit/maintenance/status visibility, tightening auto-cleanup and lost-run recovery, improving task awareness in internal status/tool surfaces, and clarifying the split between heartbeat/main-session automation and detached scheduled runs. Thanks @mbelinky and @vincentkoc.",
      "Background tasks: 添加 the first linear task flow control surface with `openclaw flows list|show|cancel`, keep manual multi-task flows separate from one-task auto-sync flows, and surface doctor recovery hints for obviously orphaned or broken flow/task linkage. Thanks @mbelinky and @vincentkoc.",
      "Channels/QQ Bot: 添加 QQ Bot as a bundled channel 插件 with multi-account setup, SecretRef-aware credentials, slash commands, reminders, and media send/receive 支持. (#52986) Thanks @sliverp.",
      "Diffs: skip unused viewer-versus-file SSR preload work so `diffs` view-only and file-only runs do less render work while keeping mode outputs aligned. (#57909) thanks @gumadeiras.",
      "Tasks: 添加 a minimal SQLite-backed task flow registry plus task-to-flow linkage scaffolding, so orchestrated work can start gaining a first-class parent record without changing current task delivery behavior. Thanks @mbelinky and @vincentkoc.",
      "Tasks: persist blocked state on one-task task flows and let the same flow reopen cleanly on retry, so blocked detached work can carry a parent-level reason and continue without fragmenting into a new job. Thanks @mbelinky and @vincentkoc.",
      "Tasks: route one-task ACP and subagent 更新s through a parent task-flow owner context, so detached work can emerge back through the intended parent thread/session instead of speaking only as a raw child task. Thanks @mbelinky and @vincentkoc.",
      "LINE/outbound media: 添加 LINE image, video, and audio outbound sends on the LINE-specific delivery path, including explicit preview/tracking handling for videos while keeping generic media sends on the existing image-only route. (#45826) Thanks @masatohoshino.",
      "Matrix/history: 添加 optional room history context for Matrix group triggers via `channels.matrix.historyLimit`, with per-agent watermarks and retry-safe snapshots so failed trigger retries do not drift into newer room messages. (#57022) thanks @chain710.",
      "Matrix/network: 添加 explicit `channels.matrix.proxy` config for routing Matrix traffic through an HTTP(S) proxy, including account-level overrides and matching probe/runtime behavior. (#56931) thanks @patrick-yingxi-pan.",
      "Matrix/streaming: 添加 draft streaming so partial Matrix replies 更新 the same message in place instead of sending a new message for each chunk. (#56387) Thanks @jrusz.",
      "Matrix/threads: 添加 per-DM `threadReplies` overrides and keep thread session isolation aligned with the effective room or DM thread policy from the triggering message onward. (#57995) thanks @teconomix.",
      "MCP: 添加 remote HTTP/SSE server 支持 for `mcp.servers` URL configs, including auth headers and safer config redaction for MCP credentials. (#50396) Thanks @dhananjai1729.",
      "Memory/QMD: 添加 per-agent `memorySearch.qmd.extraCollections` so agents can opt into cross-agent session search without flattening every transcript collection into one shared QMD namespace. Thanks @vincentkoc.",
      "Microsoft Teams/member info: 添加 a Graph-backed member info action so Teams automations and tools can resolve channel member details directly from Microsoft Graph. (#57528) Thanks @sudie-codes.",
      "Nostr/inbound DMs: verify inbound event signatures before pairing or sender-authorization side effects, so forged DM events no longer create pairing requests or trigger reply attempts. Thanks @smaeljaish771 and @vincentkoc.",
      "OpenAI/Responses: forward configured `text.verbosity` across Responses HTTP and WebSocket transports, surface it in `/status`, and keep per-agent verbosity precedence aligned with runtime behavior. (#47106) Thanks @merc1305 and @vincentkoc.",
      "Pi/Codex: 添加 native Codex web search 支持 for embedded Pi runs, including config/docs/wizard coverage and managed-tool suppression when native Codex search is active. (#46579) Thanks @Evizero.",
      "Slack/exec approvals: 添加 native Slack approval routing and approver authorization so exec approval prompts can stay in Slack instead of falling back to the Web 界面 or terminal. Thanks @vincentkoc.",
      "TTS: 添加 structured provider diagnostics and fallback attempt analytics. (#57954) Thanks @joshavant.",
      "WhatsApp/reactions: agents can now react with emoji on incoming WhatsApp messages, enabling more natural conversational interactions like acknowledging a photo with ❤️ instead of typing a reply. Thanks @mcaxtr.",
      "Agents/BTW: force `/btw` side questions to disable provider reasoning so Anthropic adaptive-thinking sessions stop failing with `No BTW response generated`. 修复es #55376. Thanks @Catteres and @vincentkoc.",
      "CLI/onboarding: reset the remote gateway URL prompt to the safe loopback default after declining a discovered endpoint, so onboarding does not keep a previously rejected remote URL. (#57828)",
      "Agents/exec defaults: honor per-agent `tools.exec` defaults when no inline directive or session override is present, so configured exec host, 安全, ask, and node settings actually apply. (#57689)",
      "Sandbox/networking: sanitize SSH subprocess env vars through the shared sandbox policy and route marketplace archive downloads plus Ollama discovery, auth, and pull requests through the guarded fetch path so sandboxed execution and remote fetches follow the repo's trust boundaries. (#57848, #57850)"
    ],
    "improvements": [
      "Nodes/exec: 移除 the duplicated `nodes.run` shell wrapper from the CLI and agent `nodes` tool so node shell execution always goes through `exec host=node`, keeping node-specific capabilities on `nodes invoke` and the dedicated media/location/notify actions.",
      "插件 SDK: deprecate the legacy provider compat subpaths plus the older bundled provider setup and channel-runtime 兼容性 shims, emit migration warnings, and keep the current documented `openclaw/插件-sdk/*` entrypoints plus local `API.ts` / `runtime-API.ts` barrels as the forward path ahead of a future major-release removal.",
      "Skills/install and 插件s/install: b界面lt-in dangerous-code `critical` findings and install-time scan failures now fail closed by default, so 插件 installs and gateway-backed skill dependency installs that previously succeeded may now req界面re an explicit dangerous override such as `--dangerously-force-unsafe-install` to proceed.",
      "Gateway/auth: `trusted-proxy` now rejects mixed shared-token configs, and local-direct fallback req界面res the configured token instead of implicitly authenticating same-host callers. Thanks @zhangning-agent, @jacobtomlinson, and @vincentkoc.",
      "Gateway/node commands: node commands now stay disabled until node pairing is approved, so device pairing alone is no longer enough to expose declared node commands. (#57777) Thanks @jacobtomlinson.",
      "Gateway/node events: node-originated runs now stay on a reduced trusted surface, so notification-driven or node-triggered flows that previously relied on broader host/session tool access may need adjustment. (#57691) Thanks @jacobtomlinson."
    ],
    "bugfixes": [
      "Slack: stop retry-driven duplicate replies when draft-finalization edits fail ambiguously, and log configured allowlisted users/channels by readable name instead of raw IDs.",
      "Agents/OpenAI Responses: normalize raw bundled MCP tool schemas on the WebSocket/Responses path so bare-object, object-ish, and top-level union MCP tools no longer get rejected by OpenAI during tool registration. (#58299) Thanks @yelog.",
      "ACP/安全: replace ACP's dangerous-tool name override with semantic approval classes, so only narrow readonly reads/searches can auto-approve while indirect exec-capable and control-plane tools always req界面re explicit prompt approval. Thanks @vincentkoc.",
      "ACP/sessions_spawn: register ACP child runs for completion tracking and lifecycle cleanup, and make registration-failure cleanup explicitly best-effort so callers do not assume an already-started ACP turn was fully aborted. (#40885) Thanks @xaeon2026 and @vincentkoc.",
      "ACP/tasks: mark cleanly exited ACP runs as blocked when they end on deterministic write or authorization blockers, and wake the parent session with a follow-up instead of falsely reporting success.",
      "ACPX/runtime: derive the bundled ACPX expected version from the extension package metadata instead of hardcoding a separate literal, so 插件-local ACPX installs stop drifting out of health-check parity after version bumps. (#49089) Thanks @jiejiesks and @vincentkoc.",
      "Agents/Anthropic failover: treat Anthropic `API_error` payloads with `An unexpected error occurred while processing the response` as transient so retry/fallback can engage instead of surfacing a terminal failure. (#57441) Thanks @zijiess and @vincentkoc.",
      "Agents/compaction: keep late compaction-retry completions from double-resolving finished compaction futures, so interrupted or timed-out compactions stop surfacing spurious second-completion races. (#57796) Thanks @joshavant.",
      "Agents/disabled providers: make disabled providers disappear from default model selection and embedded provider fallback, while letting explicitly pinned disabled providers fail with a clear config error instead of silently taking traffic. (#57735) Thanks @rileybrown-dev and @vincentkoc.",
      "Agents/OAuth output: force exec-host OAuth output readers through the gateway fs policy so embedded gateway runs stop crashing when provider auth writes land outside the current sandbox workspace. (#58249) Thanks @joshavant.",
      "Agents/system prompt: 修复 `agent.name` interpolation in the embedded runtime system prompt and make provider/model fallback text reflect the effective runtime selection after start. (#57625) Thanks @StllrSvr and @vincentkoc.",
      "Android/device info: read the app's version metadata from the package manager instead of hidden APIs so Android 15+ onboarding and device info no longer fail to compile or report placeholder values. (#58126) Thanks @L3ER0Y.",
      "Android/pairing: stop appending duplicate push receiver entries to `gateway-service.conf` on repeated QR pairing and keep push registration bounded to the current successful pairing, so Android push delivery stays healthy across re-pair and token rotation. (#58256) Thanks @surrealroad.",
      "App install smoke: pin the latest-release lookup to `latest`, cache the first stable install version across the rerun, and relax prerelease package assertions so the Parallels smoke lane can validate stable-to-main upgrades even when `beta` moves ahead or the guest starts from an older stable. (#58177) Thanks @vincentkoc.",
      "Auth/profiles: keep the last successful config load in memory for the running process and refresh that snapshot on successful writes/reloads, so hot paths stop reparsing `openclaw.json` between watcher-driven swaps.",
      "Config/SecretRef + Control 界面: harden SecretRef redaction round-trip restore, block unsafe raw fallback (force Form mode when raw is unavailable), and preflight submitted-config SecretRefs before config write RPC persistence. (#58044) Thanks @joshavant.",
      "Config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\\\"*\\\"].req界面reMention` on load so legacy configs no longer crash at startup. (#55336) thanks @jameslcowan.",
      "Config/更新: stop `openclaw doctor` write-backs from persisting 插件-injected channel defaults, so `openclaw 更新` no longer seeds config keys that later break service refresh validation. (#56834) Thanks @openperf.",
      "Control 界面/agents: auto-load agent workspace files on initial Files panel open, and populate overview model/workspace/fallbacks from effective runtime agent metadata so defaulted models no longer show as `Not set`. (#56637) Thanks @dxsx84.",
      "Control 界面/slash commands: make `/steer` and `/redirect` work from the chat command palette with visible pending state for active-run `/steer`, correct redirected-run tracking, and a single canonical `/steer` entry in the command menu. (#54625) Thanks @fuller-stack-dev.",
      "Cron/announce: preserve all deliverable text payloads for announce mode instead of collapsing to the last chunk, so multi-line cron reports deliver in full to Telegram forum topics.",
      "Cron/isolated sessions: carry the full live-session provider, model, and auth-profile selection across retry restarts so cron jobs with model overrides no longer fail or loop on mid-run model-switch requests. (#57972) Thanks @issaba1.",
      "Diffs/config: preserve schema-shaped 插件 config parsing from `diffs插件ConfigSchema.safeParse()`, so direct callers keep `defaults` and `安全` sections instead of receiving flattened tool defaults. (#57904) Thanks @gumadeiras.",
      "Diffs: fall back to plain text when `lang` hints are invalid during diff render and viewer hydration, so bad or stale language values no longer break the diff viewer. (#57902) Thanks @gumadeiras.",
      "Discord/voice: enforce the same g界面ld channel and member allowlist checks on spoken voice ingress before transcription, so joined voice channels no longer accept speech from users outside the configured Discord access policy. Thanks @cyjhhh and @vincentkoc.",
      "Docker/setup: force B界面ldKit for local image b界面lds (including sandbox image b界面lds) so `./docker-setup.sh` no longer fails on `RUN --mount=...` when hosts default to Docker's legacy b界面lder. (#56681) Thanks @zhangh界面-china.",
      "Docs/anchors: 修复 broken English docs links and make Mint anchor audits run against the English-source docs tree. (#57039) thanks @velvet-shark.",
      "Doctor/插件s: skip false Matrix legacy-helper warnings when no migration plans exist, and keep bundled `enabledByDefault` 插件s in the gateway startup set. (#57931) Thanks @dinakars777.",
      "Exec approvals/macOS: unwrap `arch` and `xcrun` before deriving shell payloads and allow-always patterns, so wrapper approvals stay bound to the carried command instead of the outer carrier. Thanks @tdjackey and @vincentkoc.",
      "Exec approvals: unwrap `caffeinate` and `sandbox-exec` before persisting allow-always trust so later shell payload changes still req界面re a fresh approval. Thanks @tdjackey and @vincentkoc.",
      "Exec/approvals: infer Discord and Telegram exec approvers from existing owner config when `execApprovals.approvers` is unset, extend the default approval window to 30 minutes, and clarify approval-unavailable g界面dance so approvals do not appear to silently disappear.",
      "Pi/T界面: flush message-boundary replies at `message_end` so turns stop looking stuck until the next nudge when the final reply was already ready. Thanks @vincentkoc.",
      "Exec/approvals: keep `awk` and `sed` family binaries out of the low-risk `safeBins` fast path, and stop doctor profile scaffolding from treating them like ordinary custom filters. Thanks @vincentkoc.",
      "Exec/env: block proxy, TLS, and Docker endpoint env overrides in host execution so request-scoped commands cannot silently reroute outbound traffic or trust attacker-supplied certificate settings. Thanks @AntAI安全Lab.",
      "Exec/env: block Python package index override variables from request-scoped host exec environment sanitization so package fetches cannot be redirected through a caller-supplied index. Thanks @nexrin and @vincentkoc.",
      "Exec/node: stop gateway-side workdir fallback from rewriting explicit `host=node` cwd values to the gateway filesystem, so remote node exec approval and runs keep using the intended node-local directory. (#50961) Thanks @openperf.",
      "Exec/runtime: default implicit exec to `host=auto`, resolve that target to sandbox only when a sandbox runtime exists, keep explicit `host=sandbox` fail-closed without sandbox, and show `/exec` effective host state in runtime status/docs.",
      "Exec: fail closed when the implicit sandbox host has no sandbox runtime, and stop denied async approval followups from reusing prior command output from the same session. (#56800) Thanks @scoootscooob.",
      "Feishu/groups: keep quoted replies and topic bootstrap context aligned with group sender allowlists so only allowlisted thread messages seed agent context. Thanks @AntAI安全Lab and @vincentkoc.",
      "Gateway/attachments: offload large inbound images without leaking `media://` markers into text-only runs, preserve mixed attachment order for model input/transcripts, and fail closed when model image capability cannot be resolved. (#55513) Thanks @Syysean.",
      "Gateway/auth: keep shared-auth rate limiting active during WebSocket handshake attempts even when callers also send device-token candidates, so bogus device-token fields no longer suppress shared-secret brute-force tracking. Thanks @kexinoh and @vincentkoc.",
      "Gateway/auth: reject mismatched browser `Origin` headers on trusted-proxy HTTP operator requests while keeping origin-less headless proxy clients working. Thanks @AntAI安全Lab and @vincentkoc.",
      "Gateway/device tokens: disconnect active device sessions after token rotation so newly rotated credentials revoke existing live connections immediately instead of waiting for those sockets to close naturally. Thanks @zsxsoft and @vincentkoc.",
      "Gateway/health: carry webhook-vs-polling account mode from channel descriptors into runtime snapshots so passive channels like LINE and BlueBubbles skip false stale-socket health failures. (#47488) Thanks @karesans界面-u.",
      "Gateway/pairing: restore QR bootstrap onboarding handoff so fresh `/pair qr` iPhone setup can auto-approve the initial node pairing, receive a reusable node device token, and stop retrying with spent bootstrap auth. (#58382) Thanks @ngutman.",
      "Gateway/OpenAI 兼容性: accept flat Responses API function tool definitions on `/v1/responses` and preserve `strict` when normalizing hosted tools into the embedded runner, so spec-compliant clients like Codex no longer fail validation or silently lose strict tool enforcement. Thanks @malaiwah and @vincentkoc.",
      "Gateway/OpenAI HTTP: restore default operator scopes for bearer-authenticated requests that omit `x-openclaw-scopes`, so headless `/v1/chat/completions` and session-history callers work again after the recent method-scope hardening. (#57596) Thanks @openperf.",
      "Gateway/插件s: scope 插件-auth HTTP route runtime clients to read-only access and keep gateway-authenticated 插件 routes on write scope, so 插件-owned webhook handlers do not inherit write-capable runtime access by default. Thanks @davidluzsilva and @vincentkoc.",
      "Gateway/SecretRef: resolve restart token drift checks with merged service/runtime env sources and hard-fail un支持ed mutable SecretRef plus OAuth-profile combinations so restart warnings and policy enforcement match runtime behavior. (#58141) Thanks @joshavant.",
      "Gateway/tools HTTP: tighten HTTP tool-invoke authorization so owner-only tools stay off HTTP invoke paths. (#57773) Thanks @jacobtomlinson.",
      "Harden async approval followup delivery in webchat-only sessions (#57359) Thanks @joshavant.",
      "Heartbeat/auth: prevent exec-event heartbeat runs from inheriting owner-only tool access from the session delivery target, so node exec output stays on the non-owner tool surface even when the target session belongs to the owner. Thanks @AntAI安全Lab and @vincentkoc.",
      "Hooks/config: accept runtime channel 插件 ids in `hooks.mappings[].channel` (for example `feishu`) instead of rejecting non-core channels during config validation. (#56226) Thanks @AiKrai001.",
      "Hooks/session routing: rebind hook-triggered `agent:` session keys to the actual target agent before isolated dispatch so dedicated hook agents keep their own session-scoped tool and 插件 identity. Thanks @kexinoh and @vincentkoc.",
      "Host exec/env: block 添加itional request-scoped env overrides that can redirect Docker endpoints, trust roots, compiler include paths, package resolution, or Python environment roots during approved host runs. Thanks @tdjackey and @vincentkoc.",
      "Image generation/b界面ld: write stable runtime alias files into `dist/` and route provider-auth runtime lookups through those aliases so image-generation providers keep resolving auth/runtime modules after reb界面lds instead of crashing on missing hashed chunk files.",
      "iOS/Live Activities: mark the `ActivityKit` import in `LiveActivityManager.swift` as `@preconcurrency` so Xcode 26.4 / Swift 6 b界面lds stop failing on strict concurrency checks. (#57180) Thanks @ngutman.",
      "LINE/ACP: 添加 current-conversation binding and inbound binding-routing parity so `/acp spawn ... --thread here`, configured ACP bindings, and active conversation-bound ACP sessions work on LINE like the other conversation channels.",
      "LINE/markdown: preserve underscores inside Latin, Cyrillic, and CJK words when stripping markdown, while still removing standalone `_italic_` markers on the shared text-runtime path used by LINE and TTS. (#47465) Thanks @jackjin1997.",
      "Agents/failover: make overloaded same-provider retry count and retry delay configurable via `auth.cooldowns`, default to one retry with no delay, and document the model-fallback behavior."
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
      "ACP/插件s: 添加 an explicit default-off ACPX 插件-tools MCP bridge config, document the trust boundary, and harden the b界面lt-in bridge packaging/logging path so global installs and stdio MCP sessions work reliably. (#56867) Thanks @joe2643.",
      "Agents/LLM: 添加 a configurable idle-stream timeout for embedded runner requests so stalled model streams abort cleanly instead of hanging until the broader run timeout fires. (#55072) Thanks @liuy.",
      "Agents/MCP: materialize bundle MCP tools with provider-safe names (`serverName__toolName`), 支持 optional `streamable-http` transport selection plus per-server connection timeouts, and preserve real tool results from aborted/error turns unless truncation explicitly drops them. (#49505) Thanks @ziomancer.",
      "Android/notifications: 添加 notification-forwarding controls with package filtering, q界面et hours, rate limiting, and safer picker behavior for forwarded notification events. (#40175) Thanks @nimbleenigma.",
      "Background tasks: turn tasks into a real shared background-run control plane instead of ACP-only bookkeeping by unifying ACP, subagent, cron, and background CLI execution under one SQLite-backed ledger, routing detached lifecycle 更新s through the executor seam, 添加ing audit/maintenance/status visibility, tightening auto-cleanup and lost-run recovery, improving task awareness in internal status/tool surfaces, and clarifying the split between heartbeat/main-session automation and detached scheduled runs. Thanks @mbelinky and @vincentkoc.",
      "Background tasks: 添加 the first linear task flow control surface with `openclaw flows list|show|cancel`, keep manual multi-task flows separate from one-task auto-sync flows, and surface doctor recovery hints for obviously orphaned or broken flow/task linkage. Thanks @mbelinky and @vincentkoc.",
      "Channels/QQ Bot: 添加 QQ Bot as a bundled channel 插件 with multi-account setup, SecretRef-aware credentials, slash commands, reminders, and media send/receive 支持. (#52986) Thanks @sliverp.",
      "Diffs: skip unused viewer-versus-file SSR preload work so `diffs` view-only and file-only runs do less render work while keeping mode outputs aligned. (#57909) thanks @gumadeiras.",
      "Tasks: 添加 a minimal SQLite-backed task flow registry plus task-to-flow linkage scaffolding, so orchestrated work can start gaining a first-class parent record without changing current task delivery behavior. Thanks @mbelinky and @vincentkoc.",
      "Tasks: persist blocked state on one-task task flows and let the same flow reopen cleanly on retry, so blocked detached work can carry a parent-level reason and continue without fragmenting into a new job. Thanks @mbelinky and @vincentkoc.",
      "Tasks: route one-task ACP and subagent 更新s through a parent task-flow owner context, so detached work can emerge back through the intended parent thread/session instead of speaking only as a raw child task. Thanks @mbelinky and @vincentkoc.",
      "LINE/outbound media: 添加 LINE image, video, and audio outbound sends on the LINE-specific delivery path, including explicit preview/tracking handling for videos while keeping generic media sends on the existing image-only route. (#45826) Thanks @masatohoshino.",
      "Matrix/history: 添加 optional room history context for Matrix group triggers via `channels.matrix.historyLimit`, with per-agent watermarks and retry-safe snapshots so failed trigger retries do not drift into newer room messages. (#57022) thanks @chain710.",
      "Matrix/network: 添加 explicit `channels.matrix.proxy` config for routing Matrix traffic through an HTTP(S) proxy, including account-level overrides and matching probe/runtime behavior. (#56931) thanks @patrick-yingxi-pan.",
      "Matrix/streaming: 添加 draft streaming so partial Matrix replies 更新 the same message in place instead of sending a new message for each chunk. (#56387) Thanks @jrusz.",
      "Matrix/threads: 添加 per-DM `threadReplies` overrides and keep thread session isolation aligned with the effective room or DM thread policy from the triggering message onward. (#57995) thanks @teconomix.",
      "MCP: 添加 remote HTTP/SSE server 支持 for `mcp.servers` URL configs, including auth headers and safer config redaction for MCP credentials. (#50396) Thanks @dhananjai1729.",
      "Memory/QMD: 添加 per-agent `memorySearch.qmd.extraCollections` so agents can opt into cross-agent session search without flattening every transcript collection into one shared QMD namespace. Thanks @vincentkoc.",
      "Microsoft Teams/member info: 添加 a Graph-backed member info action so Teams automations and tools can resolve channel member details directly from Microsoft Graph. (#57528) Thanks @sudie-codes.",
      "Nostr/inbound DMs: verify inbound event signatures before pairing or sender-authorization side effects, so forged DM events no longer create pairing requests or trigger reply attempts. Thanks @smaeljaish771 and @vincentkoc.",
      "OpenAI/Responses: forward configured `text.verbosity` across Responses HTTP and WebSocket transports, surface it in `/status`, and keep per-agent verbosity precedence aligned with runtime behavior. (#47106) Thanks @merc1305 and @vincentkoc.",
      "Pi/Codex: 添加 native Codex web search 支持 for embedded Pi runs, including config/docs/wizard coverage and managed-tool suppression when native Codex search is active. (#46579) Thanks @Evizero.",
      "Slack/exec approvals: 添加 native Slack approval routing and approver authorization so exec approval prompts can stay in Slack instead of falling back to the Web 界面 or terminal. Thanks @vincentkoc.",
      "TTS: 添加 structured provider diagnostics and fallback attempt analytics. (#57954) Thanks @joshavant.",
      "WhatsApp/reactions: agents can now react with emoji on incoming WhatsApp messages, enabling more natural conversational interactions like acknowledging a photo with ❤️ instead of typing a reply. Thanks @mcaxtr.",
      "Agents/BTW: force `/btw` side questions to disable provider reasoning so Anthropic adaptive-thinking sessions stop failing with `No BTW response generated`. 修复es #55376. Thanks @Catteres and @vincentkoc.",
      "CLI/onboarding: reset the remote gateway URL prompt to the safe loopback default after declining a discovered endpoint, so onboarding does not keep a previously rejected remote URL. (#57828)",
      "Agents/exec defaults: honor per-agent `tools.exec` defaults when no inline directive or session override is present, so configured exec host, 安全, ask, and node settings actually apply. (#57689)",
      "Sandbox/networking: sanitize SSH subprocess env vars through the shared sandbox policy and route marketplace archive downloads plus Ollama discovery, auth, and pull requests through the guarded fetch path so sandboxed execution and remote fetches follow the repo's trust boundaries. (#57848, #57850)"
    ],
    "improvements": [
      "Nodes/exec: 移除 the duplicated `nodes.run` shell wrapper from the CLI and agent `nodes` tool so node shell execution always goes through `exec host=node`, keeping node-specific capabilities on `nodes invoke` and the dedicated media/location/notify actions.",
      "插件 SDK: deprecate the legacy provider compat subpaths plus the older bundled provider setup and channel-runtime 兼容性 shims, emit migration warnings, and keep the current documented `openclaw/插件-sdk/*` entrypoints plus local `API.ts` / `runtime-API.ts` barrels as the forward path ahead of a future major-release removal.",
      "Skills/install and 插件s/install: b界面lt-in dangerous-code `critical` findings and install-time scan failures now fail closed by default, so 插件 installs and gateway-backed skill dependency installs that previously succeeded may now req界面re an explicit dangerous override such as `--dangerously-force-unsafe-install` to proceed.",
      "Gateway/auth: `trusted-proxy` now rejects mixed shared-token configs, and local-direct fallback req界面res the configured token instead of implicitly authenticating same-host callers. Thanks @zhangning-agent, @jacobtomlinson, and @vincentkoc.",
      "Gateway/node commands: node commands now stay disabled until node pairing is approved, so device pairing alone is no longer enough to expose declared node commands. (#57777) Thanks @jacobtomlinson.",
      "Gateway/node events: node-originated runs now stay on a reduced trusted surface, so notification-driven or node-triggered flows that previously relied on broader host/session tool access may need adjustment. (#57691) Thanks @jacobtomlinson."
    ],
    "bugfixes": [
      "Agents/OpenAI Responses: normalize raw bundled MCP tool schemas on the WebSocket/Responses path so bare-object, object-ish, and top-level union MCP tools no longer get rejected by OpenAI during tool registration. (#58299) Thanks @yelog.",
      "ACP/安全: replace ACP's dangerous-tool name override with semantic approval classes, so only narrow readonly reads/searches can auto-approve while indirect exec-capable and control-plane tools always req界面re explicit prompt approval. Thanks @vincentkoc.",
      "ACP/sessions_spawn: register ACP child runs for completion tracking and lifecycle cleanup, and make registration-failure cleanup explicitly best-effort so callers do not assume an already-started ACP turn was fully aborted. (#40885) Thanks @xaeon2026 and @vincentkoc.",
      "ACP/tasks: mark cleanly exited ACP runs as blocked when they end on deterministic write or authorization blockers, and wake the parent session with a follow-up instead of falsely reporting success.",
      "ACPX/runtime: derive the bundled ACPX expected version from the extension package metadata instead of hardcoding a separate literal, so 插件-local ACPX installs stop drifting out of health-check parity after version bumps. (#49089) Thanks @jiejiesks and @vincentkoc.",
      "Agents/Anthropic failover: treat Anthropic `API_error` payloads with `An unexpected error occurred while processing the response` as transient so retry/fallback can engage instead of surfacing a terminal failure. (#57441) Thanks @zijiess and @vincentkoc.",
      "Agents/compaction: keep late compaction-retry rejections handled after the aggregate timeout path wins without swallowing real pre-timeout wait failures, so timed-out retries no longer surface an unhandled rejection on later unsubscribe. (#57451) Thanks @mpz4life and @vincentkoc.",
      "Agents/context pruning: count supplementary-plane CJK characters with the shared code-point-aware estimator so context pruning stops underestimating Japanese and Chinese text that uses Extension B ideographs. (#39985) Thanks @Edward-Qiang-2024.",
      "Agents/Kimi: preserve already-valid Anthropic-compatible tool call argument objects while still clearing cached repairs when later trailing junk exceeds the repair allowance. (#54491) Thanks @yuanaichi.",
      "Agents/MCP: dispose bundled MCP runtimes after one-shot `openclaw agent --local` runs finish, while preserving bundled MCP state across in-run retries so local JSON runs exit cleanly without restarting stateful MCP tools mid-run.",
      "Agents/MCP: reuse bundled MCP runtimes across turns in the same session, while recreating them when MCP config changes and disposing stale runtimes cleanly on session rollover. (#55090) Thanks @allan0509.",
      "Agents/memory flush: keep daily memory flush files append-only during embedded attempts so compaction writes do not overwrite earlier notes. (#53725) Thanks @HPluseven.",
      "Agents/sandbox: honor `tools.sandbox.tools.alsoAllow`, let explicit sandbox re-allows 移除 matching b界面lt-in default-deny tools, and keep sandbox explain/error g界面dance aligned with the effective sandbox tool policy. (#54492) Thanks @ngutman.",
      "Agents/sandbox: make remote FS bridge reads pin the parent path and open the file atomically in the helper so read access cannot race path resolution. Thanks @AntAI安全Lab and @vincentkoc.",
      "Agents/silent turns: fail closed on silent memory-flush runs so narrated `NO_REPLY` self-talk cannot stream or finalize into external replies even when block streaming is enabled. (#52593)",
      "Agents/subagents: 修复 interim subagent runtime display so `/subagents list` and `/subagents info` stop inflating short runtimes and show second-level durations correctly. (#57739) Thanks @samzong.",
      "Anthropic/OAuth: inject `/fast` `service_tier` hints for direct `sk-ant-oat-*` requests so OAuth-authenticated Anthropic runs stop missing the same overload-routing signal as API-key traffic. 修复es #55758. Thanks @Cypherm and @vincentkoc.",
      "Anthropic/service tiers: 支持 explicit `serviceTier` model params for direct Anthropic requests and let them override `/fast` defaults when both are set. (#45453) Thanks @vincentkoc.",
      "Auto-reply/fast: accept `/fast status` on the directive-only path, align help/status text with the documented `status|on|off` syntax, and keep current-state replies consistent across command surfaces. 修复es #46095. Thanks @weissfl and @vincentkoc.",
      "Azure OpenAI/custom providers: use the `azure-openai-responses` path for Azure custom providers so Azure OpenAI endpoints stay on the correct Responses 集成 surface. (#50851) Thanks @kunalk16.",
      "BlueBubbles/iMessage: coalesce URL-only inbound messages with their link-preview balloon again so sharing a bare link no longer drops the URL from agent context. Thanks @vincentkoc.",
      "Browser/插件s: auto-enable the bundled browser 插件 when browser config or browser tool policy already references it, and show a clearer CLI error when `插件s.allow` excludes `browser`.",
      "CI/dev checks: default local `pnpm check` to a lower-memory typecheck/lint path while keeping CI on the normal parallel path, and harden Telegram test typing/literals around native TypeScript-Go tooling crashes.",
      "Tasks: 添加 a small task-flow runtime substrate for authoring layers with persisted wait targets and output bags, plus bundled skills/Lobster examples and richer `flows show` / `doctor` recovery hints for multi-task flow state. (#58336) Thanks @mbelinky and @vincentkoc.",
      "Config/legacy cleanup: stop probing obsolete alternate legacy config names and service labels during local config/service detection, while keeping the active `~/.openclaw/openclaw.json` path canonical.",
      "Config/runtime: pin the first successful config load in memory for the running process and refresh that snapshot on successful writes/reloads, so hot paths stop reparsing `openclaw.json` between watcher-driven swaps.",
      "Config/SecretRef + Control 界面: harden SecretRef redaction round-trip restore, block unsafe raw fallback (force Form mode when raw is unavailable), and preflight submitted-config SecretRefs before config write RPC persistence. (#58044) Thanks @joshavant.",
      "Config/Telegram: migrate 移除d `channels.telegram.groupMentionsOnly` into `channels.telegram.groups[\"*\"].req界面reMention` on load so legacy configs no longer crash at startup. (#55336) thanks @jameslcowan.",
      "Config/更新: stop `openclaw doctor` write-backs from persisting 插件-injected channel defaults, so `openclaw 更新` no longer seeds config keys that later break service refresh validation. (#56834) Thanks @openperf.",
      "Control 界面/agents: auto-load agent workspace files on initial Files panel open, and populate overview model/workspace/fallbacks from effective runtime agent metadata so defaulted models no longer show as `Not set`. (#56637) Thanks @dxsx84.",
      "Control 界面/slash commands: make `/steer` and `/redirect` work from the chat command palette with visible pending state for active-run `/steer`, correct redirected-run tracking, and a single canonical `/steer` entry in the command menu. (#54625) Thanks @fuller-stack-dev.",
      "Cron/announce: preserve all deliverable text payloads for announce mode instead of collapsing to the last chunk, so multi-line cron reports deliver in full to Telegram forum topics.",
      "Cron/isolated sessions: carry the full live-session provider, model, and auth-profile selection across retry restarts so cron jobs with model overrides no longer fail or loop on mid-run model-switch requests. (#57972) Thanks @issaba1.",
      "Diffs/config: preserve schema-shaped 插件 config parsing from `diffs插件ConfigSchema.safeParse()`, so direct callers keep `defaults` and `安全` sections instead of receiving flattened tool defaults. (#57904) Thanks @gumadeiras.",
      "Diffs: fall back to plain text when `lang` hints are invalid during diff render and viewer hydration, so bad or stale language values no longer break the diff viewer. (#57902) Thanks @gumadeiras.",
      "Discord/voice: enforce the same g界面ld channel and member allowlist checks on spoken voice ingress before transcription, so joined voice channels no longer accept speech from users outside the configured Discord access policy. Thanks @cyjhhh and @vincentkoc.",
      "Docker/setup: force B界面ldKit for local image b界面lds (including sandbox image b界面lds) so `./docker-setup.sh` no longer fails on `RUN --mount=...` when hosts default to Docker's legacy b界面lder. (#56681) Thanks @zhangh界面-china.",
      "Docs/anchors: 修复 broken English docs links and make Mint anchor audits run against the English-source docs tree. (#57039) thanks @velvet-shark.",
      "Doctor/插件s: skip false Matrix legacy-helper warnings when no migration plans exist, and keep bundled `enabledByDefault` 插件s in the gateway startup set. (#57931) Thanks @dinakars777.",
      "Exec approvals/macOS: unwrap `arch` and `xcrun` before deriving shell payloads and allow-always patterns, so wrapper approvals stay bound to the carried command instead of the outer carrier. Thanks @tdjackey and @vincentkoc.",
      "Exec approvals: unwrap `caffeinate` and `sandbox-exec` before persisting allow-always trust so later shell payload changes still req界面re a fresh approval. Thanks @tdjackey and @vincentkoc.",
      "Exec/approvals: infer Discord and Telegram exec approvers from existing owner config when `execApprovals.approvers` is unset, extend the default approval window to 30 minutes, and clarify approval-unavailable g界面dance so approvals do not appear to silently disappear.",
      "Exec/approvals: keep `awk` and `sed` family binaries out of the low-risk `safeBins` fast path, and stop doctor profile scaffolding from treating them like ordinary custom filters. Thanks @vincentkoc.",
      "Exec/env: block proxy, TLS, and Docker endpoint env overrides in host execution so request-scoped commands cannot silently reroute outbound traffic or trust attacker-supplied certificate settings. Thanks @AntAI安全Lab.",
      "Exec/env: block Python package index override variables from request-scoped host exec environment sanitization so package fetches cannot be redirected through a caller-supplied index. Thanks @nexrin and @vincentkoc.",
      "Exec/node: stop gateway-side workdir fallback from rewriting explicit `host=node` cwd values to the gateway filesystem, so remote node exec approval and runs keep using the intended node-local directory. (#50961) Thanks @openperf.",
      "Exec/runtime: default implicit exec to `host=auto`, resolve that target to sandbox only when a sandbox runtime exists, keep explicit `host=sandbox` fail-closed without sandbox, and show `/exec` effective host state in runtime status/docs.",
      "Exec: fail closed when the implicit sandbox host has no sandbox runtime, and stop denied async approval followups from reusing prior command output from the same session. (#56800) Thanks @scoootscooob.",
      "Feishu/groups: keep quoted replies and topic bootstrap context aligned with group sender allowlists so only allowlisted thread messages seed agent context. Thanks @AntAI安全Lab and @vincentkoc.",
      "Gateway/attachments: offload large inbound images without leaking `media://` markers into text-only runs, preserve mixed attachment order for model input/transcripts, and fail closed when model image capability cannot be resolved. (#55513) Thanks @Syysean.",
      "Gateway/auth: keep shared-auth rate limiting active during WebSocket handshake attempts even when callers also send device-token candidates, so bogus device-token fields no longer suppress shared-secret brute-force tracking. Thanks @kexinoh and @vincentkoc.",
      "Gateway/auth: reject mismatched browser `Origin` headers on trusted-proxy HTTP operator requests while keeping origin-less headless proxy clients working. Thanks @AntAI安全Lab and @vincentkoc.",
      "Gateway/device tokens: disconnect active device sessions after token rotation so newly rotated credentials revoke existing live connections immediately instead of waiting for those sockets to close naturally. Thanks @zsxsoft and @vincentkoc.",
      "Gateway/health: carry webhook-vs-polling account mode from channel descriptors into runtime snapshots so passive channels like LINE and BlueBubbles skip false stale-socket health failures. (#47488) Thanks @karesans界面-u.",
      "Gateway/pairing: restore QR bootstrap onboarding handoff so fresh `/pair qr` iPhone setup can auto-approve the initial node pairing, receive a reusable node device token, and stop retrying with spent bootstrap auth. (#58382) Thanks @ngutman.",
      "Gateway/OpenAI 兼容性: accept flat Responses API function tool definitions on `/v1/responses` and preserve `strict` when normalizing hosted tools into the embedded runner, so spec-compliant clients like Codex no longer fail validation or silently lose strict tool enforcement. Thanks @malaiwah and @vincentkoc.",
      "Gateway/OpenAI HTTP: restore default operator scopes for bearer-authenticated requests that omit `x-openclaw-scopes`, so headless `/v1/chat/completions` and session-history callers work again after the recent method-scope hardening. (#57596) Thanks @openperf.",
      "Gateway/插件s: scope 插件-auth HTTP route runtime clients to read-only access and keep gateway-authenticated 插件 routes on write scope, so 插件-owned webhook handlers do not inherit write-capable runtime access by default. Thanks @davidluzsilva and @vincentkoc.",
      "Gateway/SecretRef: resolve restart token drift checks with merged service/runtime env sources and hard-fail un支持ed mutable SecretRef plus OAuth-profile combinations so restart warnings and policy enforcement match runtime behavior. (#58141) Thanks @joshavant.",
      "Gateway/tools HTTP: tighten HTTP tool-invoke authorization so owner-only tools stay off HTTP invoke paths. (#57773) Thanks @jacobtomlinson.",
      "Harden async approval followup delivery in webchat-only sessions (#57359) Thanks @joshavant.",
      "Heartbeat/auth: prevent exec-event heartbeat runs from inheriting owner-only tool access from the session delivery target, so node exec output stays on the non-owner tool surface even when the target session belongs to the owner. Thanks @AntAI安全Lab and @vincentkoc.",
      "Hooks/config: accept runtime channel 插件 ids in `hooks.mappings[].channel` (for example `feishu`) instead of rejecting non-core channels during config validation. (#56226) Thanks @AiKrai001.",
      "Hooks/session routing: rebind hook-triggered `agent:` session keys to the actual target agent before isolated dispatch so dedicated hook agents keep their own session-scoped tool and 插件 identity. Thanks @kexinoh and @vincentkoc.",
      "Host exec/env: block 添加itional request-scoped env overrides that can redirect Docker endpoints, trust roots, compiler include paths, package resolution, or Python environment roots during approved host runs. Thanks @tdjackey and @vincentkoc.",
      "Image generation/b界面ld: write stable runtime alias files into `dist/` and route provider-auth runtime lookups through those aliases so image-generation providers keep resolving auth/runtime modules after reb界面lds instead of crashing on missing hashed chunk files.",
      "iOS/Live Activities: mark the `ActivityKit` import in `LiveActivityManager.swift` as `@preconcurrency` so Xcode 26.4 / Swift 6 b界面lds stop failing on strict concurrency checks. (#57180) Thanks @ngutman.",
      "LINE/ACP: 添加 current-conversation binding and inbound binding-routing parity so `/acp spawn ... --thread here`, configured ACP bindings, and active conversation-bound ACP sessions work on LINE like the other conversation channels.",
      "LINE/markdown: preserve underscores inside Latin, Cyrillic, and CJK words when stripping markdown, while still removing standalone `_italic_` markers on the shared text-runtime path used by LINE and TTS. (#47465) Thanks @jackjin1997.",
      "LINE/status: stop `openclaw status` from warning about missing credentials when sanitized LINE snapshots are already configured, while still surfacing whether the missing field is the token or secret. (#45701) Thanks @tamaosamu.",
      "macOS/local gateway: stop OpenClaw.app from killing healthy local gateway listeners after startup by recognizing the current `openclaw-gateway` process title and using the current `openclaw gateway` launch shape.",
      "macOS/wide-area discovery: switch gateway discovery to Tailscale MagicDNS names so Mac clients recover more reliably across changing tailnet IPs. (#57833) Thanks @jacobtomlinson.",
      "Matrix/CLI send: start one-off Matrix send clients before outbound delivery so `openclaw message send --channel matrix` restores E2EE in encrypted rooms instead of sending plain events. (#57936) Thanks @gumadeiras.",
      "Matrix/context: filter fetched room context by sender allowlists so reply and thread context lookup no longer pulls non-allowlisted messages into agent context. (#58376) Thanks @jacobtomlinson.",
      "Matrix/delivery recovery: treat Synapse `User not in room` replay failures as permanent during startup recovery so poisoned queued messages move to `failed/` instead of crash-looping Matrix after restart. (#57426) thanks @dlardo.",
      "Matrix/direct rooms: recover fresh auto-joined 1:1 DMs without eagerly persisting invite-only `m.direct` mappings, while keeping named, aliased, and explicitly configured rooms on the room path. (#58024) Thanks @gumadeiras.",
      "Matrix/direct rooms: stop trusting remote `is_direct`, honor explicit local `is_direct: false` for discovered DM candidates, and avoid extra member-state lookups for shared rooms so DM routing and repair stay aligned. (#57124) Thanks @w-sss.",
      "Matrix/DM threads: keep strict unnamed fresh-invite rooms promotable even when Matrix omits the optional direct hint, preserve repair-failed local DM promotions while still revalidating later room metadata, and keep both bound and thread-isolated Matrix sessions reporting the correct route policy. (#58099) Thanks @gumadeiras.",
      "Matrix/插件 loading: ship and source-load the crypto bootstrap runtime sidecar correctly so current `main` stops warning about failed Matrix bootstrap loads and `matrix/index` 插件-id mismatches on every invocation. (#53298) thanks @keithce.",
      "Mattermost/websocket: detect stale Mattermost WebSocket sessions after bot disable/enable cycles so monitoring reconnects cleanly instead of silently staying stale. (#53604) Thanks @Qinsam.",
      "Media/downloads: stop forwarding auth and cookie headers across cross-origin redirects during media saves, while preserving safe request headers for same-origin redirect chains. Thanks @AntAI安全Lab and @vincentkoc.",
      "Media/images: reject oversized decoded image inputs before metadata and resize backends run, so tiny compressed image bombs fail early instead of exhausting gateway memory. (#58226) Thanks @AntAI安全Lab and @vincentkoc.",
      "Memory/doctor: probe QMD availability from the agent workspace too, so `openclaw doctor` no longer falsely reports relative `memory.qmd.command` configs as broken while runtime search still works. Thanks @vincentkoc.",
      "Memory/doctor: suppress the orphan transcript cleanup warning when QMD session indexing is enabled, so doctor no longer suggests deleting transcript history that QMD still uses for recall. (#40584) Thanks @Gyarados4157 and @vincentkoc.",
      "Memory/FTS: 添加 configurable trigram tokenization plus short-CJK substring fallback so memory search can find Chinese, Japanese, and Korean text without breaking mixed long-and-short queries. Thanks @carrotRakko.",
      "Memory/FTS: keep provider-less keyword hits visible at the default memory-search threshold, so FTS-only recall works without req界面ring `--min-score 0`. (#56473) Thanks @opriz.",
      "Memory/LanceDB: resolve runtime dependency manifest lookup from the bundled `extensions/memory-lancedb` path (including flattened dist chunks) so startup no longer fails with a missing `@lancedb/lancedb` dependency error. (#56623) Thanks @LUKSOAgent.",
      "Memory/QMD: 添加 `memory.qmd.searchTool` as an exact mcporter tool override, so custom QMD MCP tools such as `hybrid_search` can be used without weakening the validated `searchMode` config surface. (#27801) Thanks @keramblock.",
      "Memory/QMD: honor `memory.qmd.更新.embedInterval` even when regular QMD 更新 cadence is disabled or slower by arming a dedicated embed-cadence maintenance timer, while avoiding redundant timers when regular 更新s are already frequent enough. (#37326) Thanks @barronlroth.",
      "Memory/QMD: include deduplicated default plus per-agent `memorySearch.extraPaths` when b界面lding QMD custom collections, so shared and agent-specific extra roots both get indexed consistently. (#57315) Thanks @Vitalcheffe and @vincentkoc.",
      "Memory/QMD: keep `memory_search` session-hit paths roundtrip-safe when exported session markdown lives under the workspace `qmd/` directory, so `memory_get` can read the exact returned path instead of failing on the generic `qmd/sessions/...` alias. (#43519) Thanks @holgergruenhagen and @vincentkoc.",
      "Memory/QMD: keep `qmd embed` active in `search` mode too, so BM25-first setups still b界面ld a complete index for later vector and hybrid retrieval. (#54509) Thanks @hnshah and @vincentkoc.",
      "Memory/QMD: keep reset and deleted session transcripts in QMD session export so daily session resets do not silently drop most historical recall from `memory_search`. (#30220) Thanks @pushkarsingh32.",
      "Memory/QMD: pass a direct-session key on `openclaw memory search` so CLI QMD searches no longer get denied as `session=<none>` under direct-only scope defaults. (#43517) Thanks @waynecc-at and @vincentkoc.",
      "Memory/QMD: point `QMD_CONFIG_DIR` at the nested `xdg-config/qmd` directory so per-agent collection config resolves correctly. (#39078) Thanks @smart-tinker and @vincentkoc.",
      "Memory/QMD: preserve explicit `start_line` and `end_line` metadata from mcporter query results so `memory search` hits keep the real snippet offsets instead of falling back to the snippet header. (#47960) Thanks @vincentkoc.",
      "Memory/QMD: rebind collections when QMD reports a changed pattern but omits path metadata, so config pattern changes stop being silently ignored on restart. (#49897) Thanks @Madruru.",
      "Memory/QMD: resolve slugified `memory_search` file hints back to the indexed filesystem path before returning search hits, so `memory_get` works again for mixed-case and spaced paths. (#50313) Thanks @erra9x.",
      "Memory/QMD: send MCP `query` collection filters as the upstream `collections` array instead of the legacy singular `collection` field, so mcporter-backed QMD 1.1+ searches still scope correctly after the unified `query` tool migration. (#54728) Thanks @armanddp and @vincentkoc.",
      "Memory/QMD: serialize cross-process `qmd embed` runs behind a shared lock and stagger periodic embed timers so multi-agent QMD collections stop thundering-herding on startup and every maintenance interval. Thanks @vincentkoc.",
      "Memory/QMD: stop rewriting Han/CJK BM25 queries before `qmd search`, so OpenClaw search semantics match direct QMD results for mixed and spaced Chinese queries. Thanks @vincentkoc.",
      "Memory/QMD: surface degraded vector status from `qmd status` so `openclaw memory status --deep` warns when semantic search is unavailable because the index still has `0` vectors. 修复es #28169. Thanks @vincentkoc.",
      "Memory/QMD: treat null-byte collection corruption the same when QMD surfaces it as `ENOENT`, so managed-collection repair still reb界面lds and retries instead of leaving QMD stuck on a broken path. Thanks @vincentkoc.",
      "Memory/QMD: warn explicitly when `memory.backend=qmd` is configured but the `qmd` binary is missing, so doctor and runtime fallback no longer fail as a silent b界面ltin downgrade. (#50439) Thanks @Jimmy-xuzimo and @vincentkoc.",
      "Memory/QMD: weight CJK-heavy text correctly when estimating chunk sizes, preserve surrogate-pair characters during fine splits, and keep long Latin lines on the old chunk boundaries so memory indexing produces better-sized chunks for CJK notes. (#40271) Thanks @AaronLuo00.",
      "Memory/session indexer: include `.jsonl.reset.*` and `.jsonl.deleted.*` transcripts in the memory host session scan while still excluding `.jsonl.bak.*` compaction backups and lock files, so memory search sees archived session history without duplicating stale snapshots. Thanks @hclsys and @vincentkoc.",
      "Microsoft Teams/threads: filter fetched thread history by sender allowlists so thread context seeding no longer pulls messages from disallowed users. (#57723) Thanks @jacobtomlinson.",
      "OpenAI/Codex fast mode: map `/fast` to priority processing on native OpenAI and Codex Responses endpoints instead of rewriting reasoning settings, and document the exact endpoint and override behavior.",
      "Outbound media/local files: piggyback host-local `MEDIA:` reads on the configured fs policy instead of a separate media-root check, so generated files outside the workspace can send when `tools.fs.workspaceOnly=false` while plaintext-like host files stay blocked by the outbound media allowlist.",
      "Pairing: enforce pending request limits per account instead of per shared channel queue, so one account's outstanding pairing challenges no longer block new pairing on other accounts. Thanks @smaeljaish771 and @vincentkoc.",
      "插件s/ClawHub: sanitize temporary archive filenames for scoped package names and slash-containing skill slugs so `openclaw 插件s install @scope/name` no longer fails with `ENOENT` during archive download. (#56452) Thanks @soimy.",
      "插件s/CLI: 添加 descriptor-backed lazy 插件 CLI registration so Matrix can keep its CLI module lazy-loaded without dropping `openclaw matrix ...` from parse-time command registration. (#57165) Thanks @gumadeiras.",
      "插件s/CLI: collect root-help 插件 descriptors through a dedicated non-activating CLI metadata path so enabled 插件s keep validated config semantics without triggering runtime-only 插件 registration work, while preserving runtime CLI command registration for legacy channel 插件s that still wire commands from full registration. (#57294) thanks @gumadeiras.",
      "插件s/facades: guard bundled 插件 facade loads with a cache-first sentinel so circular re-entry stops crashing `xai`, `sglang`, and `vllm` during gateway 插件 startup. (#57508) Thanks @openperf.",
      "插件s/Matrix: mirror the Matrix crypto WASM runtime dependency into the root packaged install and enforce root/插件 dependency parity so bundled Matrix E2EE crypto resolves correctly in shipped b界面lds. (#57163) Thanks @gumadeiras.",
      "插件s/startup: block workspace `.env` from overriding `OPENCLAW_BUNDLED_插件S_DIR`, so bundled 插件 trust roots only come from inherited runtime env or package resolution instead of repo-local dotenv files. Thanks @nexrin and @vincentkoc.",
      "Sandbox/browser: install `fonts-noto-cjk` in the sandbox browser image so screenshots render Chinese, Japanese, and Korean text correctly instead of tofu boxes. 修复es #35597. Thanks @carrotRakko and @vincentkoc.",
      "安全/LINE: make webhook signature validation run the timing-safe compare even when the supplied signature length is wrong, closing a small timing side-channel. (#55663) Thanks @gavyngong.",
      "Sessions/Feishu: preserve conversation ids that legitimately embed `:topic:` in shared session helper parsing, while keeping Telegram topic session parsing intact. (#58100) Thanks @gumadeiras.",
      "Slack/status reactions: 添加 a reaction lifecycle for queued, thinking, tool, done, and error phases in Slack monitors, with safer cleanup so queued ack reactions stay correct across silent runs, pre-reply failures, and delayed transitions. (#56430) Thanks @hsiaoa.",
      "Status/node-only hosts: teach `openclaw status` to handle node-only hosts on current `main` without the old mixed gateway assumptions. (#56718) Thanks @ImLukeF.",
      "Status: 修复 cache hit rate exceeding 100% by deriving denominator from prompt-side token fields instead of potentially undersized totalTokens. 修复es #26643.",
      "Telegram/audio: transcode Telegram voice-note `.ogg` attachments before the local `whisper-cli` auto fallback runs, and keep mention-preflight transcription enabled in auto mode when `tools.media.audio` is unset.",
      "Telegram/forum topics: restore reply routing to the active topic and keep ACP `sessions_spawn(..., thread=true, mode=\"session\")` bound to that same topic instead of falling back to root chat or losing follow-up routing. (#56060) Thanks @one27001.",
      "Telegram/media: allow RFC 2544 benchmark-range Telegram CDN resolutions during media downloads, so voice messages, PDFs, and other attachments no longer fail with `Failed to download media`. (#57624) Thanks @MoerAI.",
      "Telegram/native commands: pre修复 native command menu callback payloads and preserve `CommandSource: \"native\"` when Telegram replays them through callback queries, so `/fast` and other native command menus keep working even when text-command routing is disabled. Thanks @vincentkoc.",
      "Telegram/polling: keep the watchdog from aborting long-running reply delivery by treating recent non-polling API activity as bounded liveness instead of a hard stall. (#56343) Thanks @openperf.",
      "Tools/web_fetch: 添加 an explicit trusted env-proxy path for proxy-only installs while keeping strict SSRF fetches on the pinned direct path, so trusted proxy routing does not weaken strict destination binding. (#50650) Thanks @kkav004.",
      "Tools/web_search: localize the shared search cache to module scope so same-process global symbol lookups can no longer inspect or mutate cached web-search responses. Thanks @vincentkoc.",
      "TTS/Microsoft: auto-switch the default Edge voice to Chinese for CJK-dominant text without overriding explicitly selected Microsoft voices. (#52355) Thanks @extrasmall0.",
      "TTS: Restore 3.28 schema 兼容性 and fallback observability. (#57953) Thanks @joshavant.",
      "T界面/chat: keep optimistic outbound user messages visible during active runs by deferring local-run binding until the first gateway chat event reveals the real run id, preventing premature history reloads from wiping pending local sends. (#54722) Thanks @seanturner001.",
      "T界面/model picker: keep searchable `/model` and `/models` input mode from hijacking `j`/`k` as navigation keys, and harden width bounds under `m`-filtered model lists so search no longer crashes on long rows. (#30156) Thanks @briannicholls.",
      "Voice Call/media stream: cap inbound WebSocket frame size before `start` validation so oversized pre-start frames are dropped before JSON parsing. Thanks @Kazamayc and @vincentkoc.",
      "Voice call/Plivo: pin stored callback bases to the configured public webhook URL so later call-control redirects stay on the intended origin even if webhook transport metadata differs. Thanks @zsxsoft and @vincentkoc.",
      "Web 界面/markdown: stop bare auto-links from swallowing adjacent CJK text while preserving valid mixed-script path and query characters in rendered links. (#48410) Thanks @jnuyao.",
      "Approvals/界面: keep the newest pending approval at the front of the Control 界面 queue so approving one request does not accidentally target an older expired id. Thanks @vincentkoc.",
      "Auth profiles/OAuth: refresh runtime auth snapshots when saving rotated credentials so OAuth providers do not reuse consumed refresh tokens after the first token rotation. 修复es #55389. Thanks @sam26880 and @vincentkoc.",
      "Browser/screenshot: use `fromSurface: false` in raw CDP screenshots to avoid a Chromium compositor 问题 that drops cross-origin image textures (QR codes, CDN assets), and preserve pre-existing device emulation state across full-page viewport expansion. (#54358) Thanks @FMLS.",
      "ClawDock/docs: move the helper scripts to `scripts/clawdock`, publish ClawDock as a first-class docs page on the docs site, and document reinstalling local helper copies from the new raw GitHub path. (#23912) thanks @Olshansk.",
      "Control 界面/gateway: clear queued browser connect timeouts on client stop so aborted or replaced gateway clients do not send delayed connect requests after shutdown. (#57338) thanks @gumadeiras.",
      "Control 界面/gateway: reconnect the browser client when gateway event sequence gaps are detected, so stale non-chat state recovers automatically instead of only telling the user to refresh. (#23912) thanks @Olshansk.",
      "Exec approvals/channels: unify Discord and Telegram exec approval runtime handling, move approval buttons onto the shared interactive reply model, and 修复 Telegram approval buttons and typed `/approve` commands so configured approvers can resolve requests reliably again. (#57516) Thanks @scoootscooob.",
      "Gateway/SQLite transient handling: keep unhandled `SQLITE_CANTOPEN`, `SQLITE_BUSY`, `SQLITE_LOCKED`, and `SQLITE_IOERR` failures non-fatal in the global rejection handler so macOS LaunchAgent restarts do not enter a crash-throttle loop. (#57018)",
      "Hooks/插件s/skills: block workspace `.env` overrides for bundled root directories so workspace startup cannot redirect bundled trust roots away from the packaged defaults. Thanks @nexrin and @vincentkoc.",
      "LINE/webhooks: cap shared concurrent pre-verify webhook body reads so excess requests are rejected before entering the LINE body handler. Thanks @nexrin and @vincentkoc.",
      "Memory/QMD: preserve explicit custom collection names for shared paths outside the agent workspace so `memory_search` stops appending `-<agentId>` to externally managed QMD collections. (#52539) Thanks @lobsrice and @vincentkoc.",
      "Memory/b界面ltin: keep memory-file indexing active in FTS-only mode (no embedding provider) so forced reindexes no longer swap in an empty index and wipe existing memory chunks. (#42714) Thanks @asamimei.",
      "Nostr/config: redact `channels.nostr.privateKey` in config snapshots and Control 界面 config views, so Nostr signing keys no longer appear in plain text. Thanks @ccreater222.",
      "插件 approvals: accept unique short approval-id pre修复es on `插件.approval.resolve`, matching exec approvals and restoring `/approve` fallback flows on chat approval surfaces. Thanks @vincentkoc.",
      "SSH sandbox/upload: reject workspace symlinks that resolve outside the uploaded tree before syncing to the remote sandbox, so later agent writes cannot be redirected through escaped links. Thanks @AntAI安全Lab and @vincentkoc.",
      "Slack/interactive replies: resolve Slack Block Kit reply delivery from both authored `channelData.slack.blocks` payloads and directive-generated interactive replies, and keep Slack button styles mapped onto valid Block Kit button rendering so interactive replies stop dropping on Slack-specific delivery paths. Thanks @vincentkoc.",
      "Subagents/announcements: preserve the requester agent id for inline deterministic tool spawns so named agents without channel bindings can still announce completions through the correct owner session. (#55437) Thanks @kAIborg24.",
      "Telegram/Anthropic streaming: replace raw invalid stream-order provider errors with a safe retry message so internal `message_start/message_stop` failures do not leak into chats. (#55408) Thanks @imydal.",
      "Tlon/media: route inbound image downloads through the shared media store, cap each download at 6 MB, and stop after 8 images per message so large Tlon posts no longer balloon local media storage. Thanks @AntAI安全Lab and @vincentkoc.",
      "Agents/live switch: stop transient cron and subagent model overrides from being misread as persisted live-session switches, so isolated runs no longer fail with `LiveSessionModelSwitchError`. Thanks @vincentkoc.",
      "Agents/tool-call repair: recover malformed Kimi/OpenRouter tool-call argument streams when provider preambles appear before JSON payloads, and fail closed on non-tool leading text so fragment strings do not leak into filesystem path arguments during sub-agent runs. (#56560) Thanks @Originalwhite.",
      "Gateway/startup: keep configured primary-model warmup on the static model path so container boots do not snapshot-load provider runtime graphs just to validate a configured model. Thanks @vincentkoc.",
      "OpenAI/Responses: omit disabled reasoning payloads across OpenAI, Codex, and Azure OpenAI request b界面lders so GPT-5 endpoints no longer reject `reasoning.effort: \"none\"`. (#58208) Thanks @jalehman.",
      "WhatsApp/outbound: restore runtime send/action routing and outbound 兼容性 after the recent channel seam 重构 so outbound sends, reactions, and related media actions keep reaching the active session.",
      "xAI/Responses: normalize image-bearing tool results for xAI responses payloads, including OpenResponses-style `input_image.source` parts, so image tool replays no longer 422 on the follow-up turn. (#58017) Thanks @neeravmakwana.",
      "Zalo/webhooks: scope replay dedupe to the authenticated target so one configured account can no longer cause same-id inbound events for another target to be dropped. Thanks @smaeljaish771 and @vincentkoc.",
      "插件s/prompt b界面ld: preserve the highest-priority `systemPrompt` when merging `before_prompt_b界面ld` hook results instead of letting lower-priority hooks overwrite it. (#58375)",
      "Tlon/settings migration: preserve explicit empty-array settings during migration so restart-time reseeding no longer restores older file-config values. (#58370)",
      "插件s/marketplace: harden marketplace archive installs by surfacing guarded download failures as structured install errors and deriving temp filenames from the final resolved URL. (#58267)",
      "界面/DOM safety: b界面ld the chat delete-confirm popover and Canvas Host fallback status line with DOM nodes instead of injected HTML strings. (#58269, #58266)",
      "Media/file handling: create image temp work directories under the shared OpenClaw temp root and stop widening allowed local media roots from reply or tool source paths, keeping local media access limited to configured and agent-scoped roots. (#58270, #57770)",
      "Telegram/安全: migrate legacy pairing `allowFrom` state to the `default` account only and gate group voice-message preflight transcription on sender authorization so unauthorized senders cannot trigger paid transcription before being dropped. (#58165, #57566)",
      "Exec approvals: stop shell init-file flags from matching persisted script-path approvals, detect command-carrier inline eval in tools like `awk`, `find`, `xargs`, `make`, and `sed`, and treat the awk family as interpreter-like so allow-always decisions no longer persist interpreter paths. (#58369, #57842, #57772)",
      "Voice call/Telnyx: canonicalize verified webhook signatures before deriving replay keys so eq界面valent Base64 and Base64URL encodings dedupe correctly. (#57829)",
      "Gateway/HTTP trust boundaries: ignore self-declared bearer scopes, deny dangerous HTTP tool-invoke paths by default, req界面re write scope on `/v1/embeddings`, and bind OpenAI-compatible `/v1/chat/completions` plus `/v1/responses` ingress as non-owner so external HTTP callers cannot self-upgrade access. (#57783, #57771, #57721, #57769, #57778)",
      "Gateway/trusted config and bootstrap: clear self-declared scopes for device-less `trusted-proxy` WebSocket connects and trim the Control 界面 bootstrap payload to only the fields needed before the normal handshake. (#57692, #57727)",
      "Skills and workspace safety: replace raw skill-file reads with a symlink-safe, root-confined loader and pin workspace-only `apply_patch` delete and directory-creation mutations to verified workspace roots so path rebind races fail closed. (#57519, #56016)",
      "Env and filesystem hardening: block credential and gateway auth env vars from workspace `.env` files, always strip dangerous inherited host env vars such as `BROWSER` and `GIT_EDITOR`, and keep sensitive host paths and OpenClaw state roots blocked even when external sandbox bind sources are allowed. (#57767, #57559, #56024)",
      "OpenShell and ACP file boundaries: skip symlinks and preserve trusted host-only directories during OpenShell mirror sync, and route ACP attachment reads through the shared attachment cache so local files outside allowed roots are no longer forwarded. (#57693, #57690)",
      "Channel/webhook authorization: skip Discord audio preflight transcription for unauthorized g界面ld senders, 添加 a shared pre-auth in-flight guard to Synology Chat webhooks, and validate Microsoft Teams bearer auth before JSON body parsing. (#57695, #57722, #57686)",
      "Infra/randomness: replace `Math.random()` in affected identifier and delay-jitter paths with shared secure-random helpers, including 界面 U界面D generation. (#57744)"
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
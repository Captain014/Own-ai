const API = window.location.protocol === "file:" ? "http://localhost:3000" : "";
const SK = "ua_chats";
const AK = "ua_active";
const MK = "ua_model";
const TK = "ua_theme";
const MGK = "ua_merge";
const SEARCHK = "ua_search";
const TOKENK = "ua_memory_token";

const MODELS = [
    { id: "gateway-gpt-5", name: "GPT-5", provider: "openai", color: "#10a37f", tier: "flagship" },
    { id: "gateway-gpt-5-1", name: "GPT-5.1", provider: "openai", color: "#10a37f", tier: "flagship" },
    { id: "gateway-gpt-5-3", name: "GPT-5.3", provider: "openai", color: "#10a37f", tier: "flagship" },
    { id: "gateway-gpt-5-4", name: "GPT-5.4", provider: "openai", color: "#10a37f", tier: "flagship" },
    { id: "gateway-gpt-5-5", name: "GPT-5.5", provider: "openai", color: "#10a37f", tier: "flagship" },
    { id: "gateway-gpt-o3", name: "o3", provider: "openai", color: "#10a37f", tier: "reasoning" },
    { id: "gateway-gpt-o3-mini", name: "o3 Mini", provider: "openai", color: "#10a37f", tier: "reasoning" },
    { id: "gateway-gpt-o4-mini", name: "o4-mini", provider: "openai", color: "#10a37f", tier: "reasoning" },
    { id: "gateway-gpt-4o", name: "GPT-4o", provider: "openai", color: "#10a37f", tier: "standard" },
    { id: "gateway-gpt-4-1-mini", name: "GPT-4.1 Mini", provider: "openai", color: "#10a37f", tier: "fast" },
    { id: "gateway-gpt-4-1-nano", name: "GPT-4.1 Nano", provider: "openai", color: "#10a37f", tier: "fast" },
    { id: "gateway-gpt-5-mini", name: "GPT-5 Mini", provider: "openai", color: "#10a37f", tier: "fast" },
    { id: "gateway-gpt-5-nano", name: "GPT-5 Nano", provider: "openai", color: "#10a37f", tier: "fast" },
    { id: "gateway-gpt-5-online", name: "GPT-5 Online", provider: "openai", color: "#10a37f", tier: "standard" },
    { id: "gateway-claude-opus-4-7", name: "Claude Opus 4.7", provider: "anthropic", color: "#d97706", tier: "flagship" },
    { id: "gateway-claude-opus-4-6", name: "Claude Opus 4.6", provider: "anthropic", color: "#d97706", tier: "flagship" },
    { id: "gateway-claude-opus-4-5", name: "Claude Opus 4.5", provider: "anthropic", color: "#d97706", tier: "flagship" },
    { id: "gateway-claude-opus-4-1", name: "Claude Opus 4.1", provider: "anthropic", color: "#d97706", tier: "standard" },
    { id: "gateway-claude-sonnet-4", name: "Claude Sonnet 4", provider: "anthropic", color: "#d97706", tier: "standard" },
    { id: "gateway-claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "anthropic", color: "#d97706", tier: "standard" },
    { id: "gateway-google-2.5-pro", name: "Gemini 2.5 Pro", provider: "google", color: "#3b82f6", tier: "flagship" },
    { id: "gateway-gemini-3-pro", name: "Gemini 3 Pro", provider: "google", color: "#3b82f6", tier: "flagship" },
    { id: "gateway-gemini-3-1-pro", name: "Gemini 3.1 Pro", provider: "google", color: "#3b82f6", tier: "flagship" },
    { id: "gateway-gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "google", color: "#3b82f6", tier: "fast" },
    { id: "gateway-deepseek-v4-pro", name: "DeepSeek V4 Pro", provider: "deepseek", color: "#06b6d4", tier: "flagship" },
    { id: "gateway-deepseek-v4-flash", name: "DeepSeek V4 Flash", provider: "deepseek", color: "#06b6d4", tier: "fast" },
    { id: "gateway-deepseek-r1", name: "DeepSeek R1", provider: "deepseek", color: "#06b6d4", tier: "reasoning" },
    { id: "gateway-deepseek-v3", name: "DeepSeek V3", provider: "deepseek", color: "#06b6d4", tier: "standard" },
    { id: "gateway-grok-4", name: "Grok 4", provider: "xai", color: "#ef4444", tier: "flagship" },
    { id: "gateway-grok-3", name: "Grok 3", provider: "xai", color: "#ef4444", tier: "standard" },
    { id: "gateway-qwen-3-max", name: "Qwen 3 Max", provider: "alibaba", color: "#8b5cf6", tier: "standard" },
    { id: "gateway-qwen-qwq-32b", name: "Qwen QwQ 32B", provider: "alibaba", color: "#8b5cf6", tier: "reasoning" },
    { id: "gateway-deepinfra-kimi-k2", name: "Kimi K2", provider: "moonshot", color: "#ec4899", tier: "standard" },
    { id: "gateway-llama-3-3-70b-versatile", name: "Llama 3.3 70B", provider: "meta", color: "#6366f1", tier: "standard" }
];

const PROVIDERS = {
    openai: { name: "OpenAI", color: "#10a37f" },
    anthropic: { name: "Anthropic", color: "#d97706" },
    google: { name: "Google", color: "#3b82f6" },
    deepseek: { name: "DeepSeek", color: "#06b6d4" },
    xai: { name: "xAI", color: "#ef4444" },
    alibaba: { name: "Alibaba", color: "#8b5cf6" },
    moonshot: { name: "Moonshot", color: "#ec4899" },
    meta: { name: "Meta", color: "#6366f1" }
};

const SUGGESTIONS = [
    { title: "Explain", desc: "Break down quantum computing simply" },
    { title: "Write code", desc: "Python web scraper with error handling" },
    { title: "Analyze", desc: "Find patterns in this dataset" },
    { title: "Create", desc: "Write a sci-fi story about AI" }
];

let chats = loadJson(SK, {});
let activeChatId = localStorage.getItem(AK) || null;
let currentModel = localStorage.getItem(MK) || "gateway-gpt-5";
let mergeMode = localStorage.getItem(MGK) === "1";
let searchMode = localStorage.getItem(SEARCHK) === "1";
let isStreaming = false;
let abortCtrl = null;
let apiAccess = null;
let apiAccessPromise = null;

function $(id) {
    return document.getElementById(id);
}

function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function save() {
    localStorage.setItem(SK, JSON.stringify(chats));
    localStorage.setItem(AK, activeChatId || "");
    localStorage.setItem(MK, currentModel);
    localStorage.setItem(MGK, mergeMode ? "1" : "0");
    localStorage.setItem(SEARCHK, searchMode ? "1" : "0");
}

function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function memoryToken() {
    let token = localStorage.getItem(TOKENK);
    if (!token) {
        token = uuid();
        localStorage.setItem(TOKENK, token);
    }
    return token;
}

function chatMemoryToken(chatId) {
    return `${memoryToken()}_${chatId}`.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
}

function info(id = currentModel) {
    return MODELS.find((model) => model.id === id) || MODELS[0];
}

function pInfo(key) {
    return PROVIDERS[key] || { name: "Unknown", color: "#a78bfa" };
}

function rgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function esc(text) {
    const div = document.createElement("div");
    div.textContent = String(text ?? "");
    return div.innerHTML;
}

function attr(text) {
    return esc(text).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function timeAgo(ts) {
    const elapsed = Date.now() - Number(ts || Date.now());
    if (elapsed < 60000) return "now";
    if (elapsed < 3600000) return `${Math.floor(elapsed / 60000)}m`;
    if (elapsed < 86400000) return `${Math.floor(elapsed / 3600000)}h`;
    return `${Math.floor(elapsed / 86400000)}d`;
}

function icon(name, size = 14) {
    return `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
}

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function toast(message, cls = "") {
    const el = document.createElement("div");
    el.className = `toast ${cls}`;
    el.textContent = message;
    $("toast-container").appendChild(el);
    setTimeout(() => {
        el.style.animation = "toast-out 180ms ease forwards";
        setTimeout(() => el.remove(), 180);
    }, 1800);
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        if (btn) {
            btn.classList.add("ok");
            const old = btn.textContent;
            if (old.trim()) btn.textContent = "Copied";
            setTimeout(() => {
                btn.classList.remove("ok");
                if (old.trim()) btn.textContent = old;
            }, 1200);
        }
        toast("Copied", "ok");
    }).catch(() => toast("Copy failed", "err"));
}

function getApiBaseUrl() {
    if (window.location.protocol === "file:") {
        return "http://localhost:3000";
    }

    return window.location.origin;
}

function updateApiAccessUi() {
    const key = apiAccess?.key || "Loading...";
    const unlimited = apiAccess?.unlimited === true || apiAccess?.remaining === "unlimited" || apiAccess?.limit === "unlimited";
    const remaining = unlimited ? "Unlimited" : Number.isFinite(apiAccess?.remaining) ? apiAccess.remaining : "...";
    const used = Number.isFinite(apiAccess?.used) ? apiAccess.used : 0;
    const limit = unlimited ? "Unlimited" : Number.isFinite(apiAccess?.limit) ? apiAccess.limit : 200;
    const baseUrl = getApiBaseUrl();
    const bearer = apiAccess?.key || "YOUR_AUTH_KEY";

    if ($("api-key-value")) $("api-key-value").textContent = key;
    if ($("api-usage-text")) {
        $("api-usage-text").textContent = unlimited
            ? `Unlimited messages. Used: ${used}.`
            : `${remaining} of ${limit} messages remaining. Used: ${used}.`;
    }
    if ($("api-remaining-pill")) $("api-remaining-pill").textContent = String(remaining);
    if ($("api-key-example")) $("api-key-example").textContent = `curl -s ${baseUrl}/api/key`;
    if ($("api-chat-example")) {
        $("api-chat-example").textContent = [
            `curl ${baseUrl}/api/chat \\`,
            `  -H "Authorization: Bearer ${bearer}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"message":"Hello","model":"gateway-gpt-5"}'`
        ].join("\n");
    }
    if ($("api-search-example")) {
        $("api-search-example").textContent = [
            `curl ${baseUrl}/api/search \\`,
            `  -H "Authorization: Bearer ${bearer}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"query":"latest AI news"}'`
        ].join("\n");
    }
    if ($("api-merge-example")) {
        $("api-merge-example").textContent = [
            `curl ${baseUrl}/api/merge \\`,
            `  -H "Authorization: Bearer ${bearer}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"message":"Give me the best answer from multiple models"}'`
        ].join("\n");
    }
}

async function loadApiAccess(force = false) {
    if (!force && apiAccess?.key) {
        updateApiAccessUi();
        return apiAccess;
    }

    if (!force && apiAccessPromise) {
        return apiAccessPromise;
    }

    apiAccessPromise = fetch(`${API}/api/key`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(await response.text());
            }

            apiAccess = await response.json();
            updateApiAccessUi();
            return apiAccess;
        })
        .catch((error) => {
            if ($("api-usage-text")) $("api-usage-text").textContent = "Could not load the API key.";
            throw error;
        })
        .finally(() => {
            apiAccessPromise = null;
        });

    return apiAccessPromise;
}

async function ensureApiAccess() {
    if (!apiAccess?.key) {
        await loadApiAccess();
    }

    return apiAccess;
}

function apiJsonHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (apiAccess?.key) {
        headers.Authorization = `Bearer ${apiAccess.key}`;
    }
    return headers;
}

function updateAccessFromHeaders(headers) {
    const rawLimit = headers.get("X-RateLimit-Limit");
    const rawUsed = headers.get("X-RateLimit-Used");
    const rawRemaining = headers.get("X-RateLimit-Remaining");
    const limit = Number(rawLimit);
    const used = Number(rawUsed);
    const remaining = Number(rawRemaining);

    if (rawLimit === "unlimited" || rawRemaining === "unlimited") {
        apiAccess = {
            ...(apiAccess || {}),
            limit: "unlimited",
            used: Number.isFinite(used) ? used : apiAccess?.used || 0,
            remaining: "unlimited",
            unlimited: true
        };
        updateApiAccessUi();
        return;
    }

    if (Number.isFinite(limit) && Number.isFinite(used) && Number.isFinite(remaining)) {
        apiAccess = {
            ...(apiAccess || {}),
            limit,
            used,
            remaining,
            unlimited: false
        };
        updateApiAccessUi();
    }
}

async function readErrorMessage(response) {
    const text = await response.text();
    try {
        const data = JSON.parse(text);
        return data.detail || data.error || text || "Request failed";
    } catch {
        return text || "Request failed";
    }
}

function openApiDocs() {
    $("api-modal").classList.remove("hidden");
    updateApiAccessUi();
    loadApiAccess().catch(() => toast("Could not load API key", "err"));
}

function closeApiDocs() {
    $("api-modal").classList.add("hidden");
}

function formatInline(text) {
    return esc(text)
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\n/g, "<br>");
}

function formatCode(text) {
    const raw = String(text || "");
    const codeFence = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let html = "";
    let cursor = 0;
    let match;

    while ((match = codeFence.exec(raw)) !== null) {
        html += formatInline(raw.slice(cursor, match.index));
        const lang = match[1] || "code";
        const code = esc(match[2].replace(/\n$/, ""));
        html += `<pre><div class="code-bar"><span>${esc(lang)}</span><button class="code-copy" type="button">Copy</button></div><code>${code}</code></pre>`;
        cursor = match.index + match[0].length;
    }

    html += formatInline(raw.slice(cursor));
    return html;
}

function currentModeModel() {
    if (searchMode) return "__search__";
    if (mergeMode) return "__merge__";
    return currentModel;
}

function modeMeta(model = currentModeModel()) {
    if (model === "__search__") {
        return { name: "Web Search", provider: "Search", color: "#3b82f6", icon: "search" };
    }
    if (model === "__merge__") {
        return { name: "Merge AI", provider: "Merge", color: "#f59e0b", icon: "circle-check" };
    }
    const modelInfo = info(model);
    return {
        name: modelInfo.name,
        provider: pInfo(modelInfo.provider).name,
        color: modelInfo.color,
        icon: "sparkles"
    };
}

function renderModels() {
    const list = $("model-list");
    list.innerHTML = "";

    MODELS.forEach((model) => {
        const provider = pInfo(model.provider);
        const item = document.createElement("button");
        item.type = "button";
        item.className = `model-item ${model.id === currentModel && !mergeMode && !searchMode ? "active" : ""}`;
        item.dataset.model = model.id;
        item.dataset.name = model.name.toLowerCase();
        item.dataset.provider = model.provider;
        item.innerHTML = `
            <span class="model-item-dot" style="background:${provider.color}"></span>
            <span class="model-item-name">${esc(model.name)}</span>
            <span class="model-item-tier tier-${model.tier}">${esc(model.tier)}</span>
        `;
        list.appendChild(item);
    });
}

function filterModels(query) {
    const needle = query.toLowerCase().trim();
    document.querySelectorAll(".model-item").forEach((item) => {
        const show = !needle || item.dataset.name.includes(needle) || item.dataset.provider.includes(needle);
        item.classList.toggle("hidden", !show);
    });
}

function updateModeUi() {
    const meta = modeMeta();
    const badge = $("header-model-badge");
    badge.textContent = meta.name;
    badge.style.background = rgba(meta.color, 0.12);
    badge.style.color = meta.color;
    badge.style.border = `1px solid ${rgba(meta.color, 0.24)}`;

    $("input-model-dot").style.background = meta.color;
    $("user-input").placeholder = searchMode ? "Search the web..." : mergeMode ? "Message Merge AI..." : `Message ${meta.name}...`;

    $("merge-section").classList.toggle("active", mergeMode);
    $("merge-toggle").classList.toggle("on", mergeMode);
    $("merge-toggle").textContent = mergeMode ? "ON" : "OFF";
    $("merge-desc").classList.toggle("visible", mergeMode);

    $("search-section").classList.toggle("active", searchMode);
    $("search-toggle").classList.toggle("on", searchMode);
    $("search-toggle").textContent = searchMode ? "ON" : "OFF";
    $("search-desc").classList.toggle("visible", searchMode);
}

function selectModel(id) {
    currentModel = id;
    mergeMode = false;
    searchMode = false;
    save();
    renderModels();
    updateModeUi();
}

function toggleMerge() {
    mergeMode = !mergeMode;
    if (mergeMode) searchMode = false;
    save();
    renderModels();
    updateModeUi();
    if (mergeMode) toast("Merge AI activated");
}

function toggleSearch() {
    searchMode = !searchMode;
    if (searchMode) mergeMode = false;
    save();
    renderModels();
    updateModeUi();
    if (searchMode) toast("Web search enabled");
}

function sortedChats() {
    return Object.values(chats)
        .filter((chat) => chat && chat.id)
        .sort((a, b) => Number(b.updated || 0) - Number(a.updated || 0));
}

function renderChats() {
    const list = $("chat-list");
    const rows = sortedChats();
    list.innerHTML = rows.map((chat) => {
        const last = chat.messages?.length ? chat.messages[chat.messages.length - 1].content : "New chat";
        return `
            <div class="chat-item ${chat.id === activeChatId ? "active" : ""}" data-chat="${attr(chat.id)}">
                <span class="chat-preview">${esc(last || "New chat")}</span>
                <span class="chat-time">${timeAgo(chat.updated)}</span>
                <button class="chat-delete" type="button" title="Delete chat">${icon("trash-2", 13)}</button>
            </div>
        `;
    }).join("");
    refreshIcons();
}

function createChat() {
    const now = Date.now();
    const id = uuid();
    chats[id] = {
        id,
        title: "New Chat",
        messages: [],
        updated: now
    };
    activeChatId = id;
    save();
    renderChats();
    renderMessages();
    return chats[id];
}

function newChat() {
    createChat();
    closeMobile();
    $("user-input").focus();
}

function deleteChat(id) {
    delete chats[id];
    if (activeChatId === id) {
        activeChatId = sortedChats()[0]?.id || null;
    }
    save();
    renderChats();
    renderMessages();
    toast("Deleted");
}

function switchChat(id) {
    activeChatId = id;
    save();
    renderChats();
    renderMessages();
    closeMobile();
}

function scrollMessages() {
    const messages = $("messages");
    messages.scrollTop = messages.scrollHeight;
}

function sourceHtml(sources = []) {
    const cleanSources = sources
        .filter((source) => source && (source.url || source.title))
        .slice(0, 8);

    if (!cleanSources.length) return "";

    return `
        <div class="search-sources">
            <div class="search-sources-title">${icon("search", 12)} Sources</div>
            ${cleanSources.map((source) => `
                <a class="search-source-link" href="${attr(source.url || "#")}" target="_blank" rel="noopener">
                    ${esc(source.title || source.url)}
                </a>
            `).join("")}
        </div>
    `;
}

function reasoningHtml(reasoning) {
    if (!reasoning) return "";
    return `
        <details class="reasoning-block">
            <summary class="reasoning-summary">${icon("brain", 12)} Reasoning</summary>
            <div class="reasoning-content">${formatCode(cleanReasoning(reasoning))}</div>
        </details>
    `;
}

function cleanReasoning(reasoning) {
    return String(reasoning || "")
        .replace(/^(<thinking>|<reasoning>|\*\*reasoning:?\*\*|\*\*thinking:?\*{0,2}|reasoning:|thinking:)\s*/i, "")
        .replace(/(<\/thinking>|<\/reasoning>)\s*$/i, "");
}

function addMsg(role, content, model, timestamp = Date.now(), sources = [], reasoning = "", animate = true) {
    const meta = modeMeta(model);
    const isUser = role === "user";
    const isSearch = model === "__search__";
    const isMerge = model === "__merge__";
    const div = document.createElement("div");
    div.className = `message ${role}${isSearch ? " search-mode" : ""}${isMerge ? " merge-mode" : ""}`;
    div.style.setProperty("--mc", meta.color);
    if (!animate) div.style.animation = "none";

    const avatar = isUser ? "user" : meta.icon;
    const roleName = isUser ? "You" : meta.name;
    const actions = !isUser && content
        ? `<div class="msg-actions"><button class="msg-act" type="button" title="Copy message" data-copy-message>${icon("copy", 12)}</button></div>`
        : "";

    div.innerHTML = `
        <div class="msg-avatar">${icon(avatar, 15)}</div>
        <div class="msg-body">
            <div class="msg-role">${esc(roleName)}<span class="msg-time">${timeAgo(timestamp)}</span></div>
            ${sourceHtml(sources)}
            ${reasoningHtml(reasoning)}
            <div class="msg-content">${formatCode(content)}</div>
            ${actions}
        </div>
    `;

    $("messages").appendChild(div);
    refreshIcons();
    scrollMessages();
    return div.querySelector(".msg-content");
}

function ensureSources(contentEl, sources) {
    if (!sources?.length) return;
    const body = contentEl.closest(".msg-body");
    body.querySelector(".search-sources")?.remove();
    body.querySelector(".msg-role").insertAdjacentHTML("afterend", sourceHtml(sources));
    refreshIcons();
}

function ensureReasoning(contentEl, reasoning) {
    if (!reasoning) return;
    const body = contentEl.closest(".msg-body");
    const existing = body.querySelector(".reasoning-block");
    if (existing) {
        existing.querySelector(".reasoning-content").innerHTML = formatCode(cleanReasoning(reasoning));
    } else {
        const anchor = body.querySelector(".search-sources") || body.querySelector(".msg-role");
        anchor.insertAdjacentHTML("afterend", reasoningHtml(reasoning));
    }
    refreshIcons();
}

function renderWelcome() {
    const providerCards = Object.entries(PROVIDERS).map(([key, provider]) => {
        const firstModel = MODELS.find((model) => model.provider === key);
        if (!firstModel) return "";

        const count = MODELS.filter((model) => model.provider === key).length;
        return `
            <div class="provider-card" data-model="${attr(firstModel.id)}">
                <div class="provider-dot" style="background:${provider.color}"></div>
                <div class="provider-name">${esc(provider.name)}</div>
                <div class="provider-count">${count} model${count === 1 ? "" : "s"}</div>
            </div>
        `;
    }).join("");

    const suggestions = SUGGESTIONS.map((item) => `
        <div class="suggest" data-suggestion="${attr(item.desc)}">
            <div class="suggest-title">${esc(item.title)}</div>
            <div class="suggest-desc">${esc(item.desc)}</div>
        </div>
    `).join("");

    $("messages").innerHTML = `
        <div class="welcome">
            <div class="welcome-icon">${icon("sparkles", 30)}</div>
            <h2>Unlimited AI</h2>
            <p>Pick a model, search the web, or combine top models with Merge AI.</p>
            <div class="provider-grid">${providerCards}</div>
            <div class="merge-card" data-action="merge">
                <div class="merge-card-title">${icon("circle-check", 14)} Unlimited Merge AI</div>
                <div class="merge-card-desc">Combines GPT-5.5, Claude Opus 4.7, and Gemini 2.5 Pro into one synthesized response.</div>
            </div>
            <div class="suggestion-grid">${suggestions}</div>
        </div>
    `;
    refreshIcons();
}

function renderMessages() {
    const chat = activeChatId ? chats[activeChatId] : null;
    $("chat-title").textContent = chat?.title || "Unlimited AI";

    if (!chat || !chat.messages?.length) {
        renderWelcome();
        return;
    }

    $("messages").innerHTML = "";
    chat.messages.forEach((message) => {
        addMsg(message.role, message.content, message.model, message.timestamp, message.sources, message.reasoning, false);
    });
    scrollMessages();
}

function addTyping(model) {
    const meta = modeMeta(model);
    const div = document.createElement("div");
    div.id = "typing-msg";
    div.className = `message assistant${model === "__search__" ? " search-mode" : ""}${model === "__merge__" ? " merge-mode" : ""}`;
    div.style.setProperty("--mc", meta.color);
    div.innerHTML = `
        <div class="msg-avatar">${icon(meta.icon, 15)}</div>
        <div class="msg-body">
            <div class="msg-role">${esc(meta.name)}</div>
            <div class="msg-content"><span class="typing"><span></span><span></span><span></span></span></div>
        </div>
    `;
    $("messages").appendChild(div);
    refreshIcons();
    scrollMessages();
}

function removeTyping() {
    $("typing-msg")?.remove();
}

function setStreamingUi(active) {
    isStreaming = active;
    $("send-btn").disabled = active || !$("user-input").value.trim();
    $("stop-btn").classList.toggle("hidden", !active);
    if (!active) {
        $("input-status").classList.remove("visible");
        $("input-status").textContent = "";
    }
}

function parseStreamLine(line) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return null;
    const payload = trimmed.replace(/^data:\s*/, "");
    if (!payload || payload === "[DONE]") return null;
    try {
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

function updateChatTitle(chat, text) {
    if (chat.messages.length === 1) {
        const compact = text.replace(/\s+/g, " ").trim();
        chat.title = compact.length > 42 ? `${compact.slice(0, 42)}...` : compact;
        $("chat-title").textContent = chat.title;
    }
}

async function sendMsg() {
    const input = $("user-input");
    const text = input.value.trim();
    if (!text || isStreaming) return;

    try {
        await ensureApiAccess();
    } catch {
        toast("API key unavailable", "err");
        return;
    }

    const chat = activeChatId && chats[activeChatId] ? chats[activeChatId] : createChat();
    const model = currentModeModel();
    const timestamp = Date.now();

    chat.messages.push({ role: "user", content: text, model, timestamp });
    chat.updated = timestamp;
    updateChatTitle(chat, text);
    save();
    renderChats();

    if ($("messages").querySelector(".welcome")) $("messages").innerHTML = "";
    addMsg("user", text, model, timestamp);
    input.value = "";
    input.style.height = "auto";

    setStreamingUi(true);
    addTyping(model);
    abortCtrl = new AbortController();

    const endpoint = model === "__search__" ? "/api/search" : model === "__merge__" ? "/api/merge" : "/api/chat";
    const body = model === "__search__"
        ? { query: text, memoryToken: chatMemoryToken(chat.id) }
        : model === "__merge__"
            ? { message: text, memoryToken: chatMemoryToken(chat.id), remember: true }
            : { message: text, model: currentModel, memoryToken: chatMemoryToken(chat.id), remember: true };

    let assistantText = "";   // full text received from server
    let visibleText = "";     // text currently rendered to the DOM
    let reasoning = "";
    let sources = [];
    const assistantTime = Date.now();
    let contentEl = null;
    let typerTimer = null;
    // Characters per tick + tick interval = typing speed. ~80 chars per
    // animation frame (~16ms) feels fast but still readable as it appears.
    const TYPE_CHARS_PER_TICK = 6;
    const TYPE_INTERVAL_MS = 16;

    function startTyper() {
        if (typerTimer) return;
        typerTimer = setInterval(() => {
            if (!contentEl) return;
            if (visibleText.length >= assistantText.length) return;
            // Adaptive speed: if we're falling far behind (big chunk landed),
            // speed up so we don't lag forever.
            const behind = assistantText.length - visibleText.length;
            const step = Math.max(TYPE_CHARS_PER_TICK, Math.ceil(behind / 30));
            visibleText = assistantText.slice(0, visibleText.length + step);
            contentEl.innerHTML = formatCode(visibleText);
            refreshIcons();
            scrollMessages();
        }, TYPE_INTERVAL_MS);
    }

    function stopTyper() {
        if (typerTimer) {
            clearInterval(typerTimer);
            typerTimer = null;
        }
    }

    function flushTyper() {
        stopTyper();
        if (!contentEl) return;
        visibleText = assistantText;
        contentEl.innerHTML = formatCode(visibleText);
        refreshIcons();
        scrollMessages();
    }

    try {
        const response = await fetch(API + endpoint, {
            method: "POST",
            headers: apiJsonHeaders(),
            body: JSON.stringify(body),
            signal: abortCtrl.signal
        });
        updateAccessFromHeaders(response.headers);

        removeTyping();
        contentEl = addMsg("assistant", "", model, assistantTime, [], "");
        contentEl.classList.add("streaming");
        startTyper();

        if (!response.ok) {
            throw new Error(await readErrorMessage(response));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() || "";

            for (const line of lines) {
                handleStreamPayload(parseStreamLine(line));
            }
        }

        if (buffer.trim()) {
            handleStreamPayload(parseStreamLine(buffer));
        }

        if (!assistantText.trim()) {
            assistantText = "No text came back from the stream.";
        }

        // Stream ended — dump any remaining buffered chars instantly so the
        // user doesn't wait for the typer to catch up.
        flushTyper();

        contentEl.classList.remove("streaming");
        chat.messages.push({
            role: "assistant",
            content: assistantText,
            model,
            timestamp: assistantTime,
            sources,
            reasoning: reasoning || undefined
        });
        chat.updated = Date.now();
        save();
        renderChats();
        toast("Complete", "ok");
    } catch (error) {
        removeTyping();
        flushTyper();
        if (error.name !== "AbortError") {
            if (contentEl) {
                contentEl.classList.remove("streaming");
                const row = contentEl.closest(".message");
                row.classList.remove("assistant");
                row.classList.add("error");
                contentEl.innerHTML = formatCode(error.message || "Connection error");
            } else {
                addMsg("error", error.message || "Connection error", model, Date.now());
            }
            toast("Request failed", "err");
        }
    } finally {
        stopTyper();
        abortCtrl = null;
        setStreamingUi(false);
    }

    function handleStreamPayload(payload) {
        if (!payload || !contentEl) return;
        const statusEl = $("input-status");

        if (payload.status) {
            statusEl.textContent = payload.status;
            statusEl.classList.add("visible");
        }

        if (Array.isArray(payload.results)) {
            sources = payload.results;
            ensureSources(contentEl, sources);
            statusEl.textContent = "Reading sources...";
            statusEl.classList.add("visible");
        }

        if (Array.isArray(payload.sources)) {
            sources = payload.sources;
            ensureSources(contentEl, sources);
        }

        if (payload.reasoning) {
            reasoning = payload.reasoning;
            ensureReasoning(contentEl, reasoning);
        }

        if (payload.delta) {
            assistantText += payload.delta;
        } else if (payload.answer) {
            assistantText = payload.answer;
        } else if (payload.content && !assistantText) {
            assistantText = payload.content;
        }

        if (payload.error) {
            assistantText += `${assistantText ? "\n\n" : ""}Error: ${payload.error}`;
        }

        // The typer interval picks up new text from assistantText on its own.
    }
}

function stopStream() {
    if (abortCtrl) abortCtrl.abort();
    document.querySelector(".msg-content.streaming")?.classList.remove("streaming");
    removeTyping();
    setStreamingUi(false);
    toast("Stopped", "err");
}

function useSuggestion(text) {
    $("user-input").value = text;
    resizeInput();
    sendMsg();
}

function closeMobile() {
    $("sidebar").classList.remove("open");
    $("sidebar-overlay").classList.remove("active");
}

function resizeInput() {
    const input = $("user-input");
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
    $("send-btn").disabled = isStreaming || !input.value.trim();
}

function initBg() {
    const canvas = $("bg-canvas");
    const ctx = canvas.getContext("2d");
    const colors = [
        [139, 92, 246],
        [20, 184, 166],
        [59, 130, 246],
        [245, 158, 11],
        [236, 72, 153]
    ];
    let width = 0;
    let height = 0;
    let points = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        points = Array.from({ length: 46 }, () => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.1 + 0.4,
                color
            };
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point) => {
            point.x += point.vx;
            point.y += point.vy;
            if (point.x < 0) point.x = width;
            if (point.x > width) point.x = 0;
            if (point.y < 0) point.y = height;
            if (point.y > height) point.y = 0;

            ctx.beginPath();
            ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${point.color.join(",")},0.22)`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
}

function bindEvents() {
    $("send-btn").addEventListener("click", sendMsg);
    $("stop-btn").addEventListener("click", stopStream);
    $("new-chat-btn").addEventListener("click", newChat);
    $("api-docs-btn").addEventListener("click", openApiDocs);
    $("api-modal-close").addEventListener("click", closeApiDocs);
    $("copy-api-key-btn").addEventListener("click", () => {
        if (apiAccess?.key) {
            copyText(apiAccess.key, $("copy-api-key-btn"));
        }
    });
    $("api-modal").addEventListener("click", (event) => {
        if (event.target.closest("[data-api-close]")) {
            closeApiDocs();
        }
    });
    $("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem(TK, document.body.classList.contains("light") ? "1" : "0");
    });
    $("sidebar-toggle").addEventListener("click", () => {
        $("sidebar").classList.add("open");
        $("sidebar-overlay").classList.add("active");
    });
    $("sidebar-close").addEventListener("click", closeMobile);
    $("sidebar-overlay").addEventListener("click", closeMobile);
    $("merge-section").addEventListener("click", toggleMerge);
    $("search-section").addEventListener("click", toggleSearch);
    $("model-search").addEventListener("input", (event) => filterModels(event.target.value));
    $("user-input").addEventListener("input", resizeInput);
    $("user-input").addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMsg();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === "n") {
            event.preventDefault();
            newChat();
        }
        if (event.key === "Escape" && !$("api-modal").classList.contains("hidden")) {
            closeApiDocs();
        }
    });

    document.addEventListener("click", (event) => {
        const modelItem = event.target.closest(".model-item");
        if (modelItem) {
            selectModel(modelItem.dataset.model);
            return;
        }

        const chatDelete = event.target.closest(".chat-delete");
        if (chatDelete) {
            event.stopPropagation();
            deleteChat(chatDelete.closest(".chat-item").dataset.chat);
            return;
        }

        const chatItem = event.target.closest(".chat-item");
        if (chatItem) {
            switchChat(chatItem.dataset.chat);
            return;
        }

        const provider = event.target.closest(".provider-card");
        if (provider) {
            selectModel(provider.dataset.model);
            return;
        }

        const suggestion = event.target.closest(".suggest");
        if (suggestion) {
            useSuggestion(suggestion.dataset.suggestion);
            return;
        }

        if (event.target.closest('[data-action="merge"]')) {
            toggleMerge();
            return;
        }

        const codeCopy = event.target.closest(".code-copy");
        if (codeCopy) {
            copyText(codeCopy.closest("pre").querySelector("code").textContent, codeCopy);
            return;
        }

        const messageCopy = event.target.closest("[data-copy-message]");
        if (messageCopy) {
            copyText(messageCopy.closest(".msg-body").querySelector(".msg-content").innerText, messageCopy);
        }
    });
}

function init() {
    if (localStorage.getItem(TK) === "1") {
        document.body.classList.add("light");
    }

    if (!MODELS.some((model) => model.id === currentModel)) {
        currentModel = "gateway-gpt-5";
    }

    if (activeChatId && !chats[activeChatId]) {
        activeChatId = null;
    }

    renderModels();
    updateModeUi();
    renderChats();
    renderMessages();
    bindEvents();
    resizeInput();
    refreshIcons();
    updateApiAccessUi();
    loadApiAccess().catch(() => {
        if ($("api-remaining-pill")) $("api-remaining-pill").textContent = "!";
    });
    initBg();
}

document.addEventListener("DOMContentLoaded", init);

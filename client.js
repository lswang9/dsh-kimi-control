window.__ModuleLoader__.load({ id: 'dsh-kimi-control', factory: (require) => {
  const module = { exports: {} }
  const exports = module.exports
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

  const React = require('react')
  const h = React.createElement
  const { useEffect, useMemo, useState } = React
  const NS = 'dsh-kimi-control'
  const GLOBAL = '__dshKimiControl'

  // Copy follows Kimi Code desktop's workbench vocabulary. Kept inline because
  // the client bundle has no loader of its own for locale files.
  const zh = {
    'control.agent': '正在操作浏览器',
    'control.human': '你已接管',
    'control.done': '已完成',
    'control.return': '交还给 Agent',
    'control.hintAgent': '点击页面即可接管',
    'control.hintHuman': '交还后 Agent 会继续',
    'control.reveal': '在侧栏中查看',
    'control.input': '输入',
    'control.output': '输出',
    'control.running': '执行中',
    'control.preparing': '准备中',
    'control.failed': '失败',
    'control.stopped': '已停止',
    'control.expand': '查看详情',
    'control.collapse': '收起详情',
    'tool.open': '打开网页',
    'tool.snapshot': '读取页面',
    'tool.challenge': '检查人机验证',
    'tool.wait': '等待页面',
    'tool.execute': '执行页面脚本',
    'tool.content': '提取页面内容',
    'tool.scrape': '结构化提取',
    'tool.click': '点击页面',
    'tool.type': '输入文本',
    'tool.scroll': '滚动页面',
    'tool.back': '后退',
    'tool.forward': '前进',
    'tool.refresh': '刷新页面',
    'tool.key': '按下按键',
    'tool.fill': '填写表单',
    'tool.set_value': '设置控件值',
    'tool.check': '切换勾选',
    'tool.select': '选择选项',
    'tool.clear': '清空输入',
    'tool.get_value': '读取控件值',
    'tool.screenshot': '页面截图',
    'tool.list_tabs': '查看标签页',
    'tool.switch_tab': '切换标签页',
    'tool.close_tab': '关闭标签页',
    'tool.reset': '重置浏览器',
    'tool.history': '查看浏览历史',
    'tool.visited': '查询访问记录',
    'tool.replay': '回放浏览记录',
    'tool.download': '下载文件',
    'tool.session': '查看浏览器会话',
    'tool.reset_session': '重置浏览器会话',
    'tool.restrict': '调整操作权限',
    'tool.auth': '管理登录状态',
  }

  const en = {
    'control.agent': 'Using the browser',
    'control.human': 'You have control',
    'control.done': 'Done',
    'control.return': 'Return control to Agent',
    'control.hintAgent': 'Click the page to take over',
    'control.hintHuman': 'Agent continues after you return control',
    'control.reveal': 'Show in sidebar',
    'control.input': 'Input',
    'control.output': 'Output',
    'control.running': 'Running',
    'control.preparing': 'Preparing',
    'control.failed': 'Failed',
    'control.stopped': 'Stopped',
    'control.expand': 'Show details',
    'control.collapse': 'Hide details',
    'tool.open': 'Open page',
    'tool.snapshot': 'Read page',
    'tool.challenge': 'Check for a challenge',
    'tool.wait': 'Wait for page',
    'tool.execute': 'Run page script',
    'tool.content': 'Extract page content',
    'tool.scrape': 'Extract structured data',
    'tool.click': 'Click page',
    'tool.type': 'Type text',
    'tool.scroll': 'Scroll page',
    'tool.back': 'Go back',
    'tool.forward': 'Go forward',
    'tool.refresh': 'Reload page',
    'tool.key': 'Press key',
    'tool.fill': 'Fill form',
    'tool.set_value': 'Set control value',
    'tool.check': 'Toggle checkbox',
    'tool.select': 'Select option',
    'tool.clear': 'Clear input',
    'tool.get_value': 'Read control value',
    'tool.screenshot': 'Capture screenshot',
    'tool.list_tabs': 'List tabs',
    'tool.switch_tab': 'Switch tab',
    'tool.close_tab': 'Close tab',
    'tool.reset': 'Reset browser',
    'tool.history': 'Read browsing history',
    'tool.visited': 'Search visited pages',
    'tool.replay': 'Replay browsing history',
    'tool.download': 'Download file',
    'tool.session': 'Inspect browser session',
    'tool.reset_session': 'Reset browser session',
    'tool.restrict': 'Update action restrictions',
    'tool.auth': 'Manage login state',
  }

  const TOOLS = [
    'open', 'snapshot', 'challenge', 'wait', 'execute', 'content', 'scrape', 'click', 'type',
    'scroll', 'back', 'forward', 'refresh', 'key', 'fill', 'set_value', 'check', 'select',
    'clear', 'get_value', 'screenshot', 'list_tabs', 'switch_tab', 'close_tab', 'reset',
    'history', 'visited', 'replay', 'download', 'session', 'reset_session', 'restrict', 'auth',
  ]

  // Design language ported from Kimi Code desktop's browser workbench:
  //   · UI-B2 14/20 titles, UI-C1 12/18 supporting copy
  //   · Radius xs 8 · sm 10 · md 12 · lg 16
  //   · Fills F1/F2 neutral interaction layers, KMBlue as the single accent
  //   · 120–180ms motion on cubic-bezier(.2, 0, 0, 1), soft low-opacity shadows
  // Surfaces take DSH's own alias tokens so the pane still belongs to the page it
  // sits on; the accent, radii, type ramp and motion are Kimi's.
  const CSS = `
.dsh-kc-card {
  --kc-accent: #1783ff;
  --kc-accent-soft: color-mix(in srgb, var(--kc-accent) 10%, transparent);
  --kc-ease: cubic-bezier(.2, 0, 0, 1);
  position: relative;
  margin: 6px 0;
  overflow: hidden;
  color: var(--dsw-alias-label-primary, inherit);
  font: 13px/1.5 var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
  background: var(--dsw-alias-bg-layer-1, rgba(128,128,128,.05));
  border: .5px solid var(--dsw-alias-border-l3, rgba(128,128,128,.16));
  border-radius: 12px;
  transition: border-color .18s ease, background-color .18s ease;
}
.dsh-kc-card:hover { border-color: var(--dsw-alias-border-l2, rgba(128,128,128,.28)); }
.dsh-kc-card[data-running="true"] { border-color: color-mix(in srgb, var(--kc-accent) 26%, transparent); }
.dsh-kc-card[data-error="true"] { --kc-accent: var(--dsw-alias-state-error-primary, #ff4756); }
.dsh-kc-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  padding: 10px 12px;
  color: inherit;
  font: inherit;
  text-align: left;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.dsh-kc-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--kc-accent);
  background: var(--kc-accent-soft);
  border-radius: 8px;
}
.dsh-kc-card[data-running="true"] .dsh-kc-icon { animation: dsh-kc-breathe 1.8s ease-in-out infinite; }
.dsh-kc-copy { display: flex; flex: 1 1 auto; align-items: baseline; gap: 6px; min-width: 0; }
.dsh-kc-title {
  flex: 0 0 auto;
  color: var(--dsw-alias-label-primary, inherit);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -.01em;
}
.dsh-kc-text {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, inherit);
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-kc-text:empty { display: none; }
.dsh-kc-state {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 5px;
  color: var(--dsw-alias-label-tertiary, inherit);
  font-size: 12px;
  line-height: 18px;
}
.dsh-kc-state::before {
  width: 5px;
  height: 5px;
  content: "";
  background: currentColor;
  border-radius: 50%;
  opacity: .9;
}
.dsh-kc-card[data-running="true"] .dsh-kc-state { color: var(--kc-accent); }
.dsh-kc-card[data-running="true"] .dsh-kc-state::before { animation: dsh-kc-breathe 1.4s ease-in-out infinite; }
.dsh-kc-card[data-error="true"] .dsh-kc-state { color: var(--dsw-alias-state-error-primary, #ff4756); }
.dsh-kc-chevron {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--dsw-alias-label-tertiary, inherit);
  transition: transform .16s var(--kc-ease);
}
.dsh-kc-chevron[data-open="true"] { transform: rotate(90deg); }
.dsh-kc-details {
  padding: 2px 12px 12px 46px;
  animation: dsh-kc-enter .18s var(--kc-ease);
}
.dsh-kc-actions { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.dsh-kc-reveal {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  color: var(--kc-accent);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color .15s ease;
}
.dsh-kc-reveal:hover { background: var(--kc-accent-soft); }
.dsh-kc-label {
  margin: 10px 0 4px;
  color: var(--dsw-alias-label-tertiary, inherit);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}
.dsh-kc-body {
  max-height: 260px;
  margin: 0;
  padding: 10px 12px;
  overflow: auto;
  color: var(--dsw-alias-label-secondary, inherit);
  font: 12px/1.65 var(--dsw-font-mono, "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace);
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  background: var(--dsw-alias-bg-base, rgba(128,128,128,.05));
  border: .5px solid var(--dsw-alias-border-l3, rgba(128,128,128,.12));
  border-radius: 10px;
}
.dsh-kc-layer {
  position: absolute;
  z-index: 50;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}
.dsh-kc-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1.5px color-mix(in srgb, var(--kc-accent) 55%, transparent),
    0 0 22px color-mix(in srgb, var(--kc-accent) 14%, transparent);
  transition: box-shadow .3s var(--kc-ease), opacity .8s ease;
}
.dsh-kc-layer[data-state="agent"] .dsh-kc-frame { animation: dsh-kc-frame-pulse 2.4s ease-in-out infinite; }
.dsh-kc-layer[data-state="human"] .dsh-kc-frame {
  box-shadow: inset 0 0 0 1.5px var(--dsw-alias-border-l2, rgba(128,128,128,.3));
  animation: none;
}
.dsh-kc-layer[data-state="done"] .dsh-kc-frame { opacity: .4; animation: none; }
.dsh-kc-status {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100% - 20px);
  height: 32px;
  box-sizing: border-box;
  padding: 0 6px 0 10px;
  pointer-events: auto;
  color: var(--dsw-alias-label-primary, inherit);
  font: 12px/18px var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
  white-space: nowrap;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #1f1f1f) 92%, transparent);
  border: .5px solid var(--dsw-alias-border-l3, rgba(128,128,128,.16));
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,.18);
  backdrop-filter: blur(14px) saturate(1.2);
  animation: dsh-kc-fade-in .2s var(--kc-ease);
}
.dsh-kc-status strong { font-size: 12px; font-weight: 500; }
.dsh-kc-dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  background: var(--kc-accent);
  border-radius: 50%;
}
.dsh-kc-layer[data-state="agent"] .dsh-kc-dot { animation: dsh-kc-breathe 1.4s ease-in-out infinite; }
.dsh-kc-layer[data-state="human"] .dsh-kc-dot { background: var(--dsw-alias-label-tertiary, #8a8a8a); }
.dsh-kc-hint {
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, inherit);
  font-size: 12px;
  text-overflow: ellipsis;
}
.dsh-kc-return {
  height: 24px;
  box-sizing: border-box;
  padding: 0 8px;
  color: var(--dsw-alias-label-primary, inherit);
  font: inherit;
  font-size: 12px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(128,128,128,.12));
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color .15s ease;
}
.dsh-kc-return:hover { background: var(--dsw-alias-interactive-bg-active, rgba(128,128,128,.2)); }
.dsh-kc-action {
  position: absolute;
  bottom: 12px;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100% - 24px);
  height: 34px;
  box-sizing: border-box;
  padding: 0 12px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary, #e6e6e6);
  font: 12px/18px var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
  white-space: nowrap;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #292929) 88%, transparent);
  border: .5px solid var(--dsw-alias-border-l3, rgba(128,128,128,.16));
  border-radius: 16px;
  box-shadow: 0 0 0 .5px rgba(0,0,0,.02), 0 4px 18px rgba(0,0,0,.22);
  backdrop-filter: blur(12px) saturate(1.2);
  transform: translateX(-50%);
  animation: dsh-kc-pill-in .2s var(--kc-ease);
}
.dsh-kc-action-text { overflow: hidden; text-overflow: ellipsis; }
.dsh-kc-action-dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  background: var(--kc-accent);
  border-radius: 50%;
  animation: dsh-kc-breathe 1.4s ease-in-out infinite;
}
.dsh-kc-layer[data-state="idle"] { display: none; }
@keyframes dsh-kc-frame-pulse { 50% { opacity: .62; } }
@keyframes dsh-kc-breathe { 50% { opacity: .4; transform: scale(.9); } }
@keyframes dsh-kc-enter { from { opacity: 0; transform: translateY(-3px); } }
@keyframes dsh-kc-fade-in { from { opacity: 0; transform: translateY(-3px); } }
@keyframes dsh-kc-pill-in { from { opacity: 0; transform: translate(-50%, -4px) scale(.98); } }
@media (max-width: 560px) { .dsh-kc-hint { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .dsh-kc-frame, .dsh-kc-icon, .dsh-kc-state::before, .dsh-kc-dot, .dsh-kc-action-dot { animation: none !important; }
  .dsh-kc-status, .dsh-kc-action, .dsh-kc-details { animation: none !important; }
  .dsh-kc-card, .dsh-kc-chevron, .dsh-kc-frame { transition: none !important; }
}
`

  let translate = key => key
  const sessions = new Map()
  const overlays = new Map()
  let observer
  let syncQueued = false
  // Injected at apply time; the sidebar service expands the right column so the
  // page is visible while the Agent drives it (content nobody can see is not
  // "being operated on"). Absent on shells without the seat.
  let sidebarRight = null

  function sessionState(sessionId) {
    let state = sessions.get(sessionId)
    if (state === undefined) {
      state = { activeCalls: new Set(), human: false, label: '', done: false, timer: undefined, touched: 0 }
      sessions.set(sessionId, state)
    }
    state.touched = Date.now()
    return state
  }

  function visualState(state) {
    if (state.human) return 'human'
    if (state.activeCalls.size > 0) return 'agent'
    if (state.done) return 'done'
    return 'idle'
  }

  function revealSidebar() {
    try {
      if (sidebarRight !== null && typeof sidebarRight.isExpanded === 'function'
        && typeof sidebarRight.toggleExpanded === 'function'
        && !sidebarRight.isExpanded()) sidebarRight.toggleExpanded()
    } catch {}
  }

  function publish(event) {
    if (event === null || typeof event !== 'object') return
    const sessionId = typeof event.sessionId === 'string' && event.sessionId !== '' ? event.sessionId : 'default'
    const state = sessionState(sessionId)
    if (state.timer !== undefined) {
      clearTimeout(state.timer)
      state.timer = undefined
    }
    if (event.kind === 'agent') {
      const callId = String(event.callId ?? `${event.toolName ?? 'browser'}:${Date.now()}`)
      if (event.phase === 'result') {
        state.activeCalls.delete(callId)
        state.done = !state.human && state.activeCalls.size === 0
      } else {
        state.activeCalls.add(callId)
        state.done = false
        if (!state.human) state.label = String(event.label ?? '')
      }
    } else if (event.kind === 'human') {
      state.human = event.phase !== 'end'
      state.done = false
      if (state.human) state.label = ''
    } else if (event.kind === 'label') {
      state.label = String(event.label ?? '')
    } else if (event.kind === 'reset') {
      state.activeCalls.clear()
      state.human = false
      state.done = false
      state.label = ''
    }
    if (state.done) {
      state.timer = setTimeout(() => {
        state.done = false
        state.timer = undefined
        scheduleSync()
      }, 1500)
    }
    scheduleSync()
  }

  function sessionIdOfElement(element) {
    const key = Object.keys(element).find(name => name.startsWith('__reactFiber$') || name.startsWith('__reactInternalInstance$'))
    if (key === undefined) return null
    let fiber = element[key]
    let depth = 0
    while (fiber !== null && fiber !== undefined && depth < 60) {
      const props = fiber.memoizedProps
      if (props !== null && typeof props === 'object' && typeof props.sessionId === 'string') return props.sessionId
      fiber = fiber.return
      depth += 1
    }
    return null
  }

  /**
   * The page surface this conversation is showing, found the way the sidebar
   * browser finds its own guest: ascend from the conversation's tab strip and
   * stop before another conversation's strip, so the overlay can never land on
   * somebody else's page. The overlay covers the page area (the webview's own
   * container), not the toolbar, so it starts where the content starts.
   */
  function pageViewFor(sessionId) {
    for (const strip of Array.from(document.querySelectorAll('[class*=_tabStrip]'))) {
      if (sessionIdOfElement(strip) !== sessionId) continue
      let node = strip
      while (node !== null && node !== undefined && node !== document.body) {
        const foreign = Array.from(node.querySelectorAll('[class*=_tabStrip]'))
          .some(el => sessionIdOfElement(el) !== sessionId)
        if (foreign) break
        const views = Array.from(node.querySelectorAll('webview')).filter(view => {
          try { return typeof view.getWebContentsId === 'function' && view.getWebContentsId() > 0 } catch { return false }
        })
        if (views.length > 0) {
          const drawn = views.find(view => {
            const rect = view.getBoundingClientRect()
            return rect.width > 0 && rect.height > 0
          })
          return drawn ?? views[views.length - 1]
        }
        node = node.parentElement
      }
    }
    return null
  }

  function makeOverlay(sessionId) {
    const root = document.createElement('div')
    root.className = 'dsh-kc-layer'
    root.dataset.state = 'idle'
    root.dataset.sessionId = sessionId
    root.innerHTML = `
      <div class="dsh-kc-frame" aria-hidden="true"></div>
      <div class="dsh-kc-status" role="status" aria-live="polite">
        <span class="dsh-kc-dot" aria-hidden="true"></span>
        <strong data-kc-title></strong>
        <span class="dsh-kc-hint" data-kc-hint></span>
        <button type="button" class="dsh-kc-return" data-kc-return></button>
      </div>
      <div class="dsh-kc-action" data-kc-action><span class="dsh-kc-action-dot" aria-hidden="true"></span><span class="dsh-kc-action-text" data-kc-action-text></span></div>
    `
    root.querySelector('[data-kc-return]').addEventListener('click', () => {
      publish({ kind: 'human', phase: 'end', sessionId })
    })
    return root
  }

  function paintOverlay(sessionId, root, state) {
    const visual = visualState(state)
    root.dataset.state = visual
    const title = root.querySelector('[data-kc-title]')
    const hint = root.querySelector('[data-kc-hint]')
    const action = root.querySelector('[data-kc-action]')
    const actionText = root.querySelector('[data-kc-action-text]')
    const button = root.querySelector('[data-kc-return]')
    title.textContent = translate(visual === 'agent' ? 'control.agent' : visual === 'human' ? 'control.human' : 'control.done')
    hint.textContent = visual === 'agent' ? translate('control.hintAgent') : visual === 'human' ? translate('control.hintHuman') : ''
    actionText.textContent = visual === 'agent' ? state.label : ''
    action.style.display = visual === 'agent' && state.label !== '' ? '' : 'none'
    button.textContent = translate('control.return')
    button.style.display = visual === 'human' ? '' : 'none'
  }

  function syncOverlays() {
    syncQueued = false
    const mounted = new Set()
    for (const strip of Array.from(document.querySelectorAll('[class*=_tabStrip]'))) {
      const sessionId = sessionIdOfElement(strip)
      if (typeof sessionId !== 'string' || !sessions.has(sessionId)) continue
      const view = pageViewFor(sessionId)
      const panel = view?.parentElement ?? null
      if (panel === null) continue
      let root = overlays.get(sessionId)
      if (root === undefined) {
        root = makeOverlay(sessionId)
        overlays.set(sessionId, root)
      }
      if (root.parentElement !== panel) {
        const position = getComputedStyle(panel).position
        if (position === 'static') panel.style.position = 'relative'
        panel.appendChild(root)
      }
      paintOverlay(sessionId, root, sessions.get(sessionId))
      mounted.add(sessionId)
    }
    for (const [sessionId, root] of overlays) {
      if (mounted.has(sessionId)) continue
      root.remove()
      overlays.delete(sessionId)
    }
    const now = Date.now()
    for (const [sessionId, state] of sessions) {
      if (state.activeCalls.size === 0 && !state.human && !state.done && now - state.touched > 300000) sessions.delete(sessionId)
    }
  }

  function scheduleSync() {
    if (syncQueued) return
    syncQueued = true
    queueMicrotask(syncOverlays)
  }

  function installStyles() {
    if (document.getElementById('dsh-kimi-control-styles') !== null) return
    const tag = document.createElement('style')
    tag.id = 'dsh-kimi-control-styles'
    tag.textContent = CSS
    document.head.appendChild(tag)
  }

  function textSummary(block) {
    try {
      for (const key of ['url', 'selector', 'description', 'text', 'query', 'key', 'savePath']) {
        if (typeof block.args?.complete === 'function' && !block.args.complete(key)) continue
        const value = block.args?.text?.(key)
        if (typeof value === 'string' && value.trim() !== '') return value.trim().split('\n')[0].slice(0, 180)
      }
      if (typeof block.argsRaw === 'string' && block.argsRaw !== '') return block.argsRaw.slice(0, 180)
      if (typeof block.call?.argsRaw === 'string' && block.call.argsRaw !== '') return block.call.argsRaw.slice(0, 180)
    } catch {}
    return ''
  }

  function resultText(block) {
    if (!('kind' in block)) return ''
    if (Array.isArray(block.content)) {
      return block.content.map(part => part.type === 'text' ? part.text : JSON.stringify(part, null, 2)).join('\n')
    }
    return block.error === undefined ? '' : `${block.error.name}: ${block.error.code}`
  }

  function argsText(block) {
    const raw = 'kind' in block ? block.call?.argsRaw : block.argsRaw
    if (typeof raw !== 'string' || raw === '') return ''
    try { return JSON.stringify(JSON.parse(raw), null, 2) } catch { return raw }
  }

  function GlobeIcon() {
    return h('svg', { width: 15, height: 15, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' }, [
      h('circle', { key: 'c', cx: 8, cy: 8, r: 5.8, stroke: 'currentColor', strokeWidth: 1.3 }),
      h('path', { key: 'p', d: 'M2.5 8h11M8 2.2c1.6 1.55 2.4 3.48 2.4 5.8S9.6 12.25 8 13.8C6.4 12.25 5.6 10.32 5.6 8S6.4 3.75 8 2.2Z', stroke: 'currentColor', strokeWidth: 1.15, strokeLinecap: 'round' }),
    ])
  }

  function ChevronIcon() {
    return h('svg', { width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': 'true' }, [
      h('path', { key: 'p', d: 'M4.5 2.5 8 6l-3.5 3.5', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    ])
  }

  function BrowserToolCard(props) {
    const action = props.toolName.replace(/^dsh_browser_/, '')
    const sessionId = props.useSession(snapshot => snapshot.sessionId) ?? 'default'
    const { expanded, toggle } = props.useDisclosure()
    const [manualOpen, setManualOpen] = useState(false)
    const open = expanded || manualOpen
    const running = props.phase !== 'result'
    const failed = props.phase === 'result' && props.block.isError
    const stopped = failed && props.block.error?.code === 'interrupted'
    const summary = useMemo(() => textSummary(props.block), [props.block])
    const output = useMemo(() => resultText(props.block), [props.block])
    const input = useMemo(() => argsText(props.block), [props.block])
    const title = translate(`tool.${action}`)

    useEffect(() => {
      publish({
        kind: 'agent', sessionId, callId: props.callId,
        phase: props.phase === 'result' ? 'result' : 'start',
        label: summary === '' ? title : `${title} · ${summary}`,
        toolName: props.toolName,
      })
      if (running) revealSidebar()
    }, [sessionId, props.callId, props.phase, props.toolName, title, summary])

    const stateLabel = stopped ? translate('control.stopped')
      : failed ? translate('control.failed')
        : props.phase === 'preparing' ? translate('control.preparing')
          : running ? translate('control.running') : ''
    const reveal = event => {
      event.stopPropagation()
      globalThis.__dshBuiltinBrowser?.openPanel?.(sessionId, '')
    }
    const toggleDetails = () => {
      setManualOpen(value => !value)
      if (typeof toggle === 'function') toggle()
    }

    return h('article', {
      className: 'dsh-kc-card',
      'data-running': running ? 'true' : 'false',
      'data-error': failed ? 'true' : 'false',
      'data-chat-call-id': props.callId,
    }, [
      h('button', {
        key: 'summary', type: 'button', className: 'dsh-kc-summary',
        onClick: toggleDetails,
        'aria-expanded': open ? 'true' : 'false',
        'aria-label': `${title}. ${translate(open ? 'control.collapse' : 'control.expand')}`,
      }, [
        h('span', { key: 'icon', className: 'dsh-kc-icon' }, h(GlobeIcon)),
        h('span', { key: 'copy', className: 'dsh-kc-copy' }, [
          h('span', { key: 'title', className: 'dsh-kc-title' }, title),
          h('span', { key: 'summary', className: 'dsh-kc-text', title: summary }, summary),
        ]),
        stateLabel !== '' ? h('span', { key: 'state', className: 'dsh-kc-state' }, stateLabel) : null,
        h('span', { key: 'chevron', className: 'dsh-kc-chevron', 'data-open': open ? 'true' : 'false', 'aria-hidden': 'true' }, h(ChevronIcon)),
      ]),
      open ? h('div', { key: 'details', className: 'dsh-kc-details' }, [
        h('div', { key: 'actions', className: 'dsh-kc-actions' }, h('button', { type: 'button', className: 'dsh-kc-reveal', onClick: reveal }, translate('control.reveal'))),
        input !== '' ? h('div', { key: 'il', className: 'dsh-kc-label' }, translate('control.input')) : null,
        input !== '' ? h('pre', { key: 'in', className: 'dsh-kc-body' }, input.slice(0, 12000)) : null,
        output !== '' ? h('div', { key: 'ol', className: 'dsh-kc-label' }, translate('control.output')) : null,
        output !== '' ? h('pre', { key: 'out', className: 'dsh-kc-body' }, output.slice(0, 20000)) : null,
      ]) : null,
    ])
  }

  function apply(ctx) {
    installStyles()
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-kimi-control: dictionaries')
    translate = ctx.locale.bind(NS)

    if (typeof ctx.inject === 'function') {
      ctx.inject(['sidebarRight'], scope => {
        sidebarRight = scope.sidebarRight
        scope.effect(() => () => {
          if (sidebarRight === scope.sidebarRight) sidebarRight = null
        }, 'dsh-kimi-control: sidebar reveal binding')
      })
    }

    const api = {
      emit: publish,
      reveal: revealSidebar,
      human(sessionId, active = true) {
        publish({ kind: 'human', sessionId, phase: active ? 'start' : 'end' })
      },
      reset(sessionId) { publish({ kind: 'reset', sessionId }) },
      snapshot(sessionId) {
        const state = sessions.get(sessionId)
        return state === undefined ? { state: 'idle' } : { state: visualState(state), label: state.label, activeCalls: state.activeCalls.size }
      },
    }
    ctx.effect(() => {
      globalThis[GLOBAL] = api
      observer = new MutationObserver(records => {
        const external = records.some(record => !(record.target instanceof Element && record.target.closest('.dsh-kc-layer')))
        if (external) scheduleSync()
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => {
        observer?.disconnect()
        observer = undefined
        if (globalThis[GLOBAL] === api) delete globalThis[GLOBAL]
        for (const root of overlays.values()) root.remove()
        overlays.clear()
        for (const state of sessions.values()) if (state.timer !== undefined) clearTimeout(state.timer)
        sessions.clear()
        document.getElementById('dsh-kimi-control-styles')?.remove()
      }
    }, 'dsh-kimi-control: browser takeover presentation')

    ctx.slots.inject('tool.call.toolview', function* () {
      for (const action of TOOLS) {
        yield ctx.slots.register({ name: 'tool.call.toolview', key: `dsh_browser_${action}`, locale: NS }, BrowserToolCard)
      }
    })
  }

  exports.name = 'dsh-kimi-control'
  exports.inject = ['slots', 'locale']
  exports.apply = apply
  return module.exports
} })

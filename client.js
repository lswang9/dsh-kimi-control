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

  // Kimi Code desktop browser-workbench chrome. Tokens are Kimi's own values
  // (`common.css` .dark / :root), so the toolbar, address field, tab chips and
  // menus read the same as the workbench the plugin is modelled on.
  const KIMI_CSS = `
html[data-kc-scheme="dark"] {
  --kc-bg: #121212;
  --kc-bg-2: #1f1f1f;
  --kc-bg-3: #292929;
  --kc-label-1: rgba(255,255,255,.84);
  --kc-label-2: rgba(255,255,255,.56);
  --kc-label-3: rgba(255,255,255,.42);
  --kc-label-4: rgba(255,255,255,.26);
  --kc-fill-1: rgba(255,255,255,.05);
  --kc-fill-2: rgba(255,255,255,.1);
  --kc-fill-3: rgba(255,255,255,.18);
  --kc-fill-4: rgba(255,255,255,.25);
  --kc-sep: rgba(255,255,255,.12);
  --kc-blue: #1a88ff;
  --kc-blue-soft: rgba(26,136,255,.12);
}
html[data-kc-scheme="light"] {
  --kc-bg: #ffffff;
  --kc-bg-2: #f5f5f5;
  --kc-bg-3: #ffffff;
  --kc-label-1: rgba(0,0,0,.9);
  --kc-label-2: rgba(0,0,0,.6);
  --kc-label-3: rgba(0,0,0,.45);
  --kc-label-4: rgba(0,0,0,.3);
  --kc-fill-1: rgba(0,0,0,.03);
  --kc-fill-2: rgba(0,0,0,.05);
  --kc-fill-3: rgba(0,0,0,.15);
  --kc-fill-4: rgba(0,0,0,.25);
  --kc-sep: rgba(0,0,0,.13);
  --kc-blue: #1783ff;
  --kc-blue-soft: rgba(23,131,255,.08);
}
.dsh-kc-kimi-root { background: var(--kc-bg) !important; }
.dsh-kc-kimi-root > form[class*="_toolbar"] { display: none !important; }
.dsh-kc-toolbar {
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  height: 52px;
  padding: 10px;
  background: var(--kc-bg);
  box-shadow: inset 0 -.5px 0 var(--kc-sep);
  font: 14px/20px var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
}
.dsh-kc-tool {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 6px;
  color: var(--kc-label-1);
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color .18s ease, color .18s ease, transform .12s ease;
}
.dsh-kc-tool:hover:not(:disabled) { background: var(--kc-fill-1); }
.dsh-kc-tool:active:not(:disabled) { background: var(--kc-fill-2); transform: scale(.96); }
.dsh-kc-tool:disabled { color: var(--kc-label-4); cursor: default; }
.dsh-kc-glyph { display: block; width: 20px; height: 20px; }
.dsh-kc-address {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  height: 32px;
  box-sizing: border-box;
  margin: 0 2px;
  background: var(--kc-bg);
  border: .5px solid transparent;
  border-radius: 8px;
  transition: border-color .18s ease, background-color .18s ease;
}
.dsh-kc-address:hover:not(.dsh-kc-focused) { background: var(--kc-fill-1); }
.dsh-kc-address.dsh-kc-focused { background: var(--kc-bg); border-color: var(--kc-fill-4); }
.dsh-kc-domain {
  position: absolute;
  left: 50%;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100% - 20px);
  pointer-events: none;
  transform: translateX(-50%);
}
.dsh-kc-address.dsh-kc-focused .dsh-kc-domain { display: none; }
.dsh-kc-address:not(.dsh-kc-domain-mode) .dsh-kc-domain { display: none; }
.dsh-kc-favicon { display: grid; width: 16px; height: 16px; flex: none; place-items: center; color: var(--kc-label-2); }
.dsh-kc-domain-text {
  min-width: 0;
  overflow: hidden;
  color: var(--kc-label-1);
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-kc-address input {
  position: relative;
  min-width: 0;
  flex: 1;
  height: 100%;
  padding: 0 10px;
  color: var(--kc-label-1);
  font: 14px/20px var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
  background: transparent;
  border: 0;
  outline: 0;
}
.dsh-kc-address.dsh-kc-domain-mode input { color: transparent; }
.dsh-kc-address input::placeholder { color: var(--kc-label-3); }
.dsh-kc-address.dsh-kc-domain-mode input::placeholder { color: transparent; }
.dsh-kc-more-wrap { position: relative; display: inline-flex; flex: none; }
.dsh-kc-menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  right: 0;
  width: 176px;
  padding: 6px;
  background: var(--kc-bg-2);
  border: 1px solid var(--kc-sep);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.dsh-kc-menu[hidden] { display: none; }
.dsh-kc-menu button {
  display: flex;
  width: 100%;
  height: 36px;
  align-items: center;
  padding: 0 8px;
  color: var(--kc-label-1);
  font: 14px/20px var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "PingFang SC", sans-serif);
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.dsh-kc-menu button:hover { background: var(--kc-fill-1); }
.dsh-kc-agent {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  height: 28px;
  max-width: 190px;
  box-sizing: border-box;
  padding: 0 8px;
  overflow: hidden;
  color: var(--kc-label-1);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  background: var(--kc-fill-2);
  border-radius: 8px;
}
.dsh-kc-agent[data-state="idle"] { display: none; }
.dsh-kc-agent-dot {
  width: 6px;
  height: 6px;
  flex: none;
  background: var(--kc-blue);
  border-radius: 50%;
}
.dsh-kc-agent[data-state="agent"] .dsh-kc-agent-dot { animation: dsh-kc-breathe 1.4s ease-in-out infinite; }
.dsh-kc-agent[data-state="human"] .dsh-kc-agent-dot { background: var(--kc-label-3); }
.dsh-kc-agent-text { overflow: hidden; text-overflow: ellipsis; }
.dsh-kc-agent-return {
  height: 22px;
  flex: none;
  padding: 0 8px;
  color: var(--kc-label-1);
  font: inherit;
  font-size: 12px;
  background: var(--kc-fill-3);
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.dsh-kc-kimi-strip[class*="_tabStrip"] {
  height: 52px !important;
  gap: 4px !important;
  box-sizing: border-box !important;
  padding: 10px !important;
  background: var(--kc-bg) !important;
  box-shadow: inset 0 -.5px 0 var(--kc-sep) !important;
}
.dsh-kc-kimi-strip [class*="_tab_"] {
  height: 32px !important;
  gap: 4px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: var(--kc-label-1) !important;
  transition: background-color .12s ease, color .12s ease;
}
.dsh-kc-kimi-strip [class*="_tab_"]:hover { background: var(--kc-fill-1) !important; }
.dsh-kc-kimi-strip [class*="_tabActive"] { background: var(--kc-fill-2) !important; }
.dsh-kc-kimi-strip [class*="_tabTitle_"] { font-size: 14px !important; line-height: 20px !important; }
.dsh-kc-kimi-header { height: 52px !important; }
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
      <div class="dsh-kc-action" data-kc-action><span class="dsh-kc-action-dot" aria-hidden="true"></span><span class="dsh-kc-action-text" data-kc-action-text></span></div>
    `
    return root
  }

  function paintOverlay(sessionId, root, state) {
    const visual = visualState(state)
    root.dataset.state = visual
    const action = root.querySelector('[data-kc-action]')
    const actionText = root.querySelector('[data-kc-action-text]')
    const label = visual === 'agent' ? state.label : ''
    if (actionText.textContent !== label) actionText.textContent = label
    action.style.display = visual === 'agent' && state.label !== '' ? '' : 'none'
    paintChrome(sessionId)
  }

  function syncOverlays() {
    syncQueued = false
    for (const strip of Array.from(document.querySelectorAll('[class*=_tabStrip]'))) {
      const sessionId = sessionIdOfElement(strip)
      if (typeof sessionId !== 'string' || !sessions.has(sessionId)) continue
      const view = pageViewFor(sessionId)
      if (view === null) continue
      syncChrome(sessionId, strip, view)
    }
    const now = Date.now()
    for (const [sessionId, state] of sessions) {
      if (state.activeCalls.size === 0 && !state.human && !state.done && now - state.touched > 300000) sessions.delete(sessionId)
    }
    teardownChrome()
  }

  let syncBudget = { start: 0, count: 0 }
  function scheduleSync() {
    if (syncQueued) return
    syncQueued = true
    const now = Date.now()
    if (now - syncBudget.start > 1000) syncBudget = { start: now, count: 0 }
    syncBudget.count += 1
    // Circuit breaker: a self-triggered mutation storm must never starve the
    // renderer. Past this budget the sync runs at 4 Hz instead of ~60 Hz.
    const delay = syncBudget.count > 24 ? 250 : 16
    setTimeout(syncOverlays, delay)
  }

  const GLYPHS = {
    back: '<svg class="dsh-kc-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M1.80108 10.6784C1.50999 10.3852 1.51084 9.91176 1.80299 9.61961L6.41837 5.00423C6.71127 4.71133 7.18614 4.71133 7.47903 5.00423C7.77193 5.29712 7.77193 5.77199 7.47903 6.06489L4.14398 9.39994H17.3333C17.7475 9.39994 18.0833 9.73573 18.0833 10.1499C18.0833 10.5642 17.7475 10.8999 17.3333 10.8999H4.13477L7.48094 14.2704C7.77278 14.5643 7.77106 15.0392 7.47711 15.331C7.18316 15.6229 6.70829 15.6211 6.41646 15.3272L1.80108 10.6784Z" fill="currentColor"/></svg>',
    forward: '<svg class="dsh-kc-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M17.8656 10.6784C18.1566 10.3852 18.1558 9.91176 17.8636 9.61961L13.2483 5.00423C12.9554 4.71133 12.4805 4.71133 12.1876 5.00423C11.8947 5.29712 11.8947 5.77199 12.1876 6.06489L15.5227 9.39994H2.33332C1.9191 9.39994 1.58332 9.73573 1.58332 10.1499C1.58332 10.5642 1.9191 10.8999 2.33332 10.8999H15.5319L12.1857 14.2704C11.8939 14.5643 11.8956 15.0392 12.1895 15.331C12.4835 15.6229 12.9583 15.6211 13.2502 15.3272L17.8656 10.6784Z" fill="currentColor"/></svg>',
    reload: '<svg class="dsh-kc-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M16.2 10a6.2 6.2 0 1 1-1.82-4.39" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15.1 2.6v4.2h-4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    stop: '<svg class="dsh-kc-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="6.5" y="6.5" width="7" height="7" rx="1.6" fill="currentColor"/></svg>',
    more: '<svg class="dsh-kc-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="4.6" cy="10" r="1.3" fill="currentColor"/><circle cx="10" cy="10" r="1.3" fill="currentColor"/><circle cx="15.4" cy="10" r="1.3" fill="currentColor"/></svg>',
    globe: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.6" stroke="currentColor" stroke-width="1.2"/><path d="M2.6 8h10.8M8 2.3c1.55 1.5 2.35 3.37 2.35 5.7S9.55 12.3 8 13.7C6.45 12.3 5.65 10.33 5.65 8S6.45 3.8 8 2.3Z" stroke="currentColor" stroke-width="1.05"/></svg>',
  }

  const chromeBySession = new Map()
  let chromeMenuOpen = null

  function schemeName() {
    try {
      const scheme = getComputedStyle(document.documentElement).colorScheme || ''
      return scheme.includes('dark') ? 'dark' : 'light'
    } catch { return 'dark' }
  }

  function installChromeStyles() {
    if (document.getElementById('dsh-kimi-control-chrome') !== null) return
    const tag = document.createElement('style')
    tag.id = 'dsh-kimi-control-chrome'
    tag.textContent = KIMI_CSS
    document.head.appendChild(tag)
  }

  function rootFor(view) {
    let node = view.parentElement
    while (node !== null && node !== undefined && node !== document.body) {
      if (node.querySelector(':scope > form[class*="_toolbar"]') !== null) return node
      node = node.parentElement
    }
    return null
  }

  function normalizeUrl(raw) {
    const text = String(raw ?? '').trim()
    if (text === '') return ''
    if (/^[a-z][a-z0-9+.-]*:/i.test(text)) return text
    return 'https://' + text
  }

  function navigateView(view, raw) {
    const url = normalizeUrl(raw)
    if (url === '') return
    try { view.loadURL(url) } catch { try { view.src = url } catch {} }
  }

  function closeChromeMenu() {
    if (chromeMenuOpen === null) return
    chromeMenuOpen.menu.hidden = true
    chromeMenuOpen = null
  }

  function makeChrome(sessionId, view) {
    const root = rootFor(view)
    if (root === null) return null
    root.classList.add('dsh-kc-kimi-root')
    for (const stale of Array.from(root.querySelectorAll(':scope > .dsh-kc-toolbar'))) stale.remove()
    const bar = document.createElement('div')
    bar.className = 'dsh-kc-toolbar'
    bar.dataset.sessionId = sessionId
    bar.innerHTML = `
      <button type="button" class="dsh-kc-tool" data-kc-action="back" aria-label="后退">${GLYPHS.back}</button>
      <button type="button" class="dsh-kc-tool" data-kc-action="forward" aria-label="前进">${GLYPHS.forward}</button>
      <button type="button" class="dsh-kc-tool" data-kc-action="reload" aria-label="重新加载">${GLYPHS.reload}</button>
      <form class="dsh-kc-address dsh-kc-domain-mode" autocomplete="off">
        <span class="dsh-kc-domain"><span class="dsh-kc-favicon">${GLYPHS.globe}</span><span class="dsh-kc-domain-text" data-kc-domain></span></span>
        <input data-kc-url placeholder="输入网址" spellcheck="false" autocomplete="off" aria-label="地址" />
      </form>
      <div class="dsh-kc-more-wrap">
        <button type="button" class="dsh-kc-tool" data-kc-action="more" aria-label="更多">${GLYPHS.more}</button>
        <div class="dsh-kc-menu" hidden>
          <button type="button" data-kc-menu="reload">刷新页面</button>
          <button type="button" data-kc-menu="copy">复制链接</button>
          <button type="button" data-kc-menu="close">关闭标签页</button>
        </div>
      </div>
      <div class="dsh-kc-agent" data-state="idle">
        <span class="dsh-kc-agent-dot" aria-hidden="true"></span>
        <span class="dsh-kc-agent-text"></span>
        <button type="button" class="dsh-kc-agent-return">交还给 Agent</button>
      </div>
    `
    root.insertBefore(bar, root.firstChild)
    const chrome = {
      sessionId, root, view, bar,
      back: bar.querySelector('[data-kc-action="back"]'),
      forward: bar.querySelector('[data-kc-action="forward"]'),
      reload: bar.querySelector('[data-kc-action="reload"]'),
      address: bar.querySelector('.dsh-kc-address'),
      input: bar.querySelector('[data-kc-url]'),
      domain: bar.querySelector('[data-kc-domain]'),
      more: bar.querySelector('[data-kc-action="more"]'),
      menu: bar.querySelector('.dsh-kc-menu'),
      agent: bar.querySelector('.dsh-kc-agent'),
      agentText: bar.querySelector('.dsh-kc-agent-text'),
      agentReturn: bar.querySelector('.dsh-kc-agent-return'),
      loading: false,
      bound: false,
    }

    const syncAddress = () => {
      let url = ''
      try { url = String(view.getURL() || '') } catch { url = '' }
      let host = ''
      try { host = url === '' || url === 'about:blank' ? '' : (new URL(url).host || url) } catch { host = url }
      if (chrome.domain.textContent !== host) chrome.domain.textContent = host
      const focused = document.activeElement === chrome.input
      chrome.address.classList.toggle('dsh-kc-focused', focused)
      chrome.address.classList.toggle('dsh-kc-domain-mode', !focused && host !== '')
      if (!focused) chrome.input.value = url === 'about:blank' ? '' : url
      try { chrome.back.disabled = !view.canGoBack(); chrome.forward.disabled = !view.canGoForward() } catch {}
    }
    const setLoading = loading => {
      chrome.loading = loading
      chrome.reload.innerHTML = loading ? GLYPHS.stop : GLYPHS.reload
      chrome.reload.setAttribute('aria-label', loading ? '停止加载' : '重新加载')
    }
    chrome.syncAddress = syncAddress
    chrome.setLoading = setLoading

    if (!chrome.bound) {
      chrome.bound = true
      view.addEventListener('did-navigate', syncAddress)
      view.addEventListener('did-navigate-in-page', syncAddress)
      view.addEventListener('page-title-updated', syncAddress)
      view.addEventListener('did-start-loading', () => setLoading(true))
      view.addEventListener('did-stop-loading', () => { setLoading(false); syncAddress() })
      view.addEventListener('did-fail-load', syncAddress)
      view.addEventListener('dom-ready', syncAddress)

      chrome.back.addEventListener('click', () => { try { view.goBack() } catch {} })
      chrome.forward.addEventListener('click', () => { try { view.goForward() } catch {} })
      chrome.reload.addEventListener('click', () => {
        try { if (chrome.loading) view.stop(); else view.reload() } catch {}
      })
      chrome.address.addEventListener('submit', event => {
        event.preventDefault()
        navigateView(view, chrome.input.value)
        chrome.input.blur()
      })
      chrome.input.addEventListener('focus', () => {
        chrome.address.classList.add('dsh-kc-focused')
        chrome.address.classList.remove('dsh-kc-domain-mode')
        try { chrome.input.value = view.getURL() || '' } catch {}
        chrome.input.select()
      })
      chrome.input.addEventListener('blur', () => {
        chrome.address.classList.remove('dsh-kc-focused')
        syncAddress()
      })
      chrome.input.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); chrome.input.blur() }
      })
      chrome.more.addEventListener('click', event => {
        event.stopPropagation()
        if (chromeMenuOpen !== null && chromeMenuOpen.menu === chrome.menu) { closeChromeMenu(); return }
        closeChromeMenu()
        chrome.menu.hidden = false
        chromeMenuOpen = { menu: chrome.menu }
      })
      chrome.menu.addEventListener('click', event => {
        const action = event.target instanceof Element ? event.target.closest('[data-kc-menu]')?.getAttribute('data-kc-menu') : null
        closeChromeMenu()
        if (action === 'reload') { try { view.reload() } catch {} }
        else if (action === 'copy') { try { void navigator.clipboard.writeText(view.getURL()) } catch {} }
        else if (action === 'close') {
          try {
            const tab = sidebarRight?.active?.()
            if (tab?.id !== undefined) sidebarRight.close(tab.id)
          } catch {}
        }
      })
      chrome.agentReturn.addEventListener('click', () => {
        publish({ kind: 'human', phase: 'end', sessionId })
      })
      document.addEventListener('pointerdown', event => {
        if (chromeMenuOpen === null) return
        if (chrome.menu.contains(event.target)) return
        if (chrome.more.contains(event.target)) return
        closeChromeMenu()
      })
    }
    syncAddress()
    return chrome
  }

  function paintChrome(sessionId) {
    const chrome = chromeBySession.get(sessionId)
    if (chrome === undefined) return
    const state = sessions.get(sessionId)
    const visual = state === undefined ? 'idle' : visualState(state)
    chrome.agent.dataset.state = visual
    const label = translate(visual === 'agent' ? 'control.agent' : visual === 'human' ? 'control.human' : 'control.done')
    if (chrome.agentText.textContent !== label) chrome.agentText.textContent = label
    chrome.agentReturn.style.display = visual === 'human' ? '' : 'none'
    const returnLabel = translate('control.return')
    if (chrome.agentReturn.textContent !== returnLabel) chrome.agentReturn.textContent = returnLabel
  }

  function syncChrome(sessionId, strip, view) {
    try { syncChromeUnsafe(sessionId, strip, view) } catch {}
  }

  function syncChromeUnsafe(sessionId, strip, view) {
    strip.classList.add('dsh-kc-kimi-strip')
    if (strip.parentElement) strip.parentElement.classList.add('dsh-kc-kimi-header')
    let chrome = chromeBySession.get(sessionId)
    if (chrome === undefined || chrome.view !== view || !chrome.bar.isConnected) {
      if (chrome !== undefined) { try { chrome.bar.remove() } catch {} ; chromeBySession.delete(sessionId) }
      chrome = makeChrome(sessionId, view)
      if (chrome === null) return
      chromeBySession.set(sessionId, chrome)
    }
    paintChrome(sessionId)
  }

  function teardownChrome() {
    for (const [sessionId, chrome] of chromeBySession) {
      if (chrome.root.isConnected && chrome.view.isConnected && chrome.bar.isConnected) continue
      try { chrome.bar.remove() } catch {}
      chromeBySession.delete(sessionId)
    }
    closeChromeMenu()
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
    for (const layer of Array.from(document.querySelectorAll('.dsh-kc-layer'))) layer.remove()
    installStyles()
    installChromeStyles()
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-kimi-control: dictionaries')
    translate = ctx.locale.bind(NS)

    ctx.effect(() => {
      const syncScheme = () => { document.documentElement.dataset.kcScheme = schemeName() }
      syncScheme()
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      try { media.addEventListener('change', syncScheme) } catch { media.addListener?.(syncScheme) }
      return () => {
        try { media.removeEventListener('change', syncScheme) } catch { media.removeListener?.(syncScheme) }
        delete document.documentElement.dataset.kcScheme
      }
    }, 'dsh-kimi-control: toolbar scheme')

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
        const external = records.some(record => {
          if (!(record.target instanceof Element)) return true
          return record.target.closest('.dsh-kc-layer, .dsh-kc-toolbar, .dsh-kc-menu') === null
        })
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
        for (const chrome of chromeBySession.values()) { try { chrome.bar.remove() } catch {} }
        chromeBySession.clear()
        closeChromeMenu()
        document.getElementById('dsh-kimi-control-styles')?.remove()
        document.getElementById('dsh-kimi-control-chrome')?.remove()
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

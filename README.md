# DSH Kimi Control

[English](README.en.md)

为 DeepSeek Harness 增加 Kimi Code 桌面版风格的浏览器接管交互：真实浏览器侧栏、Agent / 用户接管状态、Kimi 工作台设计语言的动作提示，以及对话内浏览器卡片。

基于 MIT 许可的 [`dsh-builtin-browser`](https://github.com/wqty123/dsh-browser) 浏览器运行时，保留其 32 个 `dsh_browser_*` 工具、DOM / 无障碍树、截图、登录态、下载和多标签页能力。本仓库新增交互层与桌面输入事件桥，不是 Kimi 或 DeepSeek 的官方插件。

## 交互效果

- **Agent 操作时**：自动展开当前会话的浏览器侧栏，页面右上角显示“正在操作浏览器”状态芯片与当前动作提示。
- **接管反馈**：页面四周显示一条 Kimi 蓝（`#1783ff` / 深色 `#1a88ff`）的细边框与轻微呼吸光晕，键盘、鼠标事件不被拦截。
- **用户接管时**：在页面内点击或按键后切换为“你已接管”，边框转为中性色；点击“交还给 Agent”恢复。
- **操作完成后**：显示短暂“已完成”反馈并自动消退，不持续遮挡页面。
- **对话流中**：浏览器工具使用 Kimi 工具卡片——动作、目标、运行状态、可展开的输入 / 输出，以及“在侧栏中查看”。
- **真实页面**：桌面端使用 DSH 原生 `<webview>`，不是 JPEG 转播。
- **动效可及性**：跟随系统“减少动态效果”设置，窄侧栏自动收起辅助文字。

## 设计对齐

交互层按 Kimi Code 桌面版（3.2.21）浏览器工作台的设计语言重做，设计 token 与组件规格来自对已安装应用的静态逆向（REA）：

| 维度 | Kimi 规格 |
|---|---|
| 强调色 | `--Colors-KMBlue` 亮色 `#1783ff` / 深色 `#1a88ff` |
| 圆角 | `--Radius-xs` 8 · `sm` 10 · `md` 12 · `lg` 16 |
| 字号 | `UI-B2` 14/20（标题）· `UI-C1` 12/18（辅助信息） |
| 层次 | `Fills-F1` / `Fills-F2` 中性交互层，`Separators-S1` 分隔线 |
| 动效 | 120–180ms，`cubic-bezier(.2, 0, 0, 1)`，低透明度柔和阴影 |

浏览器侧栏本身由 DSH 内置的 `@deepseek-ai/dsh-client-ui-sidebar-browser` 渲染（标签页、地址栏、前进后退属于它的 chrome），本插件负责接管状态、动作提示、边框与对话卡片，因此不替换侧栏原生工具栏。

## 环境要求

- DSH `>=0.2.0-rc.2 <0.3.0`。
- Node.js `>=22.19`。
- 完整侧栏接管体验需要 DSH Desktop；`dsh web` 仍有对话卡片和浏览器工具，但浏览器由独立窗口承载。
- 上游运行时首次使用自托管浏览器时，如果提示缺少 Electron 二进制，按提示运行 `npx install-electron`。

## 安装

### DSH Desktop

```bash
dsh plugin --profile desktop add git+https://github.com/lswang9/dsh-kimi-control.git
node ~/.dsh/profiles/desktop/node_modules/dsh-kimi-control/desktop-bridge/install.mjs
```

安装器自动探测标准 macOS / Windows 应用目录，也可以显式传入安装路径：

```bash
node ~/.dsh/profiles/desktop/node_modules/dsh-kimi-control/desktop-bridge/install.mjs "/Applications/DeepSeek Harness.app/Contents"
```

完全退出并重新打开 DSH Desktop。桌面升级会替换应用文件，需要重新执行安装器。

> 桌面桥必须运行在 Electron 主进程中，因此安装器会备份并修改 DSH Desktop 的应用入口。它提供 `--revert` 回滚；不安装桥时，浏览器工具退化为独立窗口，原生侧栏交互不可用。

### DSH Web

```bash
dsh plugin --profile web add git+https://github.com/lswang9/dsh-kimi-control.git
```

重启 `dsh web` 并新建会话。

## 使用

直接对 Agent 说：

```text
打开 example.com，读取主要内容，然后点击登录按钮。
```

对话卡片出现“执行中”时，侧栏同步显示接管状态。你可以直接在页面里登录、完成人机验证或修正输入，然后选择“交还给 Agent”。

## 卸载

```bash
node ~/.dsh/profiles/desktop/node_modules/dsh-kimi-control/desktop-bridge/install.mjs --revert
dsh plugin --profile desktop remove dsh-kimi-control
dsh plugin --profile web remove dsh-kimi-control
```

## 隐私与安全

- 桌面输入桥只上报操作类型（`mouseDown` 或 `keyDown`）及所属会话，不上传按键、文本、密码或页面内容。
- 高亮层只负责显示，不暂停 Agent，也不构成权限边界。浏览器动作的权限仍由上游设置和 DSH 审批机制控制。
- 浏览器可能持有真实登录态。不要允许不受信任的页面或指令诱导 Agent 发布内容、付款或修改账号设置。

## 开发检查

```bash
pnpm install
pnpm run check
pnpm pack --dry-run
```

## 致谢与许可

MIT。浏览器运行时和桌面桥基于 [WQTY123/dsh-browser](https://github.com/wqty123/dsh-browser)，署名见 [NOTICE.md](NOTICE.md)。

# DSH Kimi Control

[English](README.en.md)

为 DeepSeek Harness 增加 Kimi Code 桌面版风格的浏览器接管交互：右侧栏使用 Kimi 工作台的浏览器 chrome（52px 标签条、浏览器工具栏、居中域名地址栏、更多菜单），并把 Agent / 用户接管状态收进工具栏状态芯片；对话内提供 Kimi 工具卡片。

基于 MIT 许可的 [`dsh-builtin-browser`](https://github.com/wqty123/dsh-browser) 浏览器运行时，保留其 32 个 `dsh_browser_*` 工具、DOM / 无障碍树、截图、登录态、下载和多标签页能力。本仓库新增交互层与桌面输入事件桥，不是 Kimi 或 DeepSeek 的官方插件。

## 交互效果

- **Kimi 工作台浏览器 chrome**：侧栏浏览器面板顶部是 52px 工作台标签条 + 52px 工具栏；工具栏从左到右为返回 / 前进 / 刷新（加载中变为停止）、居中域名地址栏（聚焦后显示完整 URL，回车导航）、更多菜单（刷新 / 复制链接 / 关闭标签页）。
- **接管状态**：工具栏右侧的状态芯片显示 Agent 控制（「正在操作浏览器」，蓝色呼吸点）、用户接管（「你已接管」+「交还给 Agent」）和短暂完成反馈「已完成」。
- **真实页面**：桌面端使用 DSH 原生 `<webview>`；点击页面内任意位置或按键即接管，交还后 Agent 继续。
- **对话流中**：浏览器工具使用 Kimi 工具卡片——动作、目标、运行状态、可展开的输入 / 输出，以及「在侧栏中查看」。
- **动效可及性**：Kimi 的 120–180ms 动效曲线、柔和阴影；跟随系统「减少动态效果」设置。

## 设计对齐

交互层与 chrome 按 Kimi Code 桌面版（3.2.21）浏览器工作台的设计语言重做，规格来自对已安装应用的静态逆向（REA）：

| 维度 | Kimi 规格 |
|---|---|
| 强调色 | `--Colors-KMBlue` 亮色 `#1783ff` / 深色 `#1a88ff` |
| 背景 | `Bg-Primary` 亮色 `#fff` / 深色 `#121212`；`BgGp-Secondary` `#1f1f1f` |
| 圆角 | `--Radius-xs` 8 · `sm` 10 · `md` 12 · `lg` 16 |
| 字号 | `UI-B2` 14/20（标签、地址栏、菜单）· `UI-C1` 12/18（状态芯片） |
| 层次 | `Fills-F1` / `Fills-F2` 中性交互层，`Separators-S1` 发丝线 |
| 动效 | 120–180ms，`cubic-bezier(.2, 0, 0, 1)`，低透明度柔和阴影 |

浏览器侧栏的标签页、地址栏和工具栏原本由 DSH 内置的 `@deepseek-ai/dsh-client-ui-sidebar-browser` 渲染；本插件隐藏其 38px 原生工具栏，按其 DOM 结构注入 Kimi chrome，并复用同一 `<webview>` 与导航能力。因此 DSH 升级后若这些内部 DOM 结构变化，chrome 可能需要适配。

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

对话卡片出现「执行中」时，侧栏同步显示接管状态。你可以直接使用侧栏工具栏导航，或在页面里登录、完成人机验证、修正输入，然后点「交还给 Agent」。

## 卸载

```bash
node ~/.dsh/profiles/desktop/node_modules/dsh-kimi-control/desktop-bridge/install.mjs --revert
dsh plugin --profile desktop remove dsh-kimi-control
dsh plugin --profile web remove dsh-kimi-control
```

## 隐私与安全

- 桌面输入桥只上报操作类型（`mouseDown` 或 `keyDown`）及所属会话，不上传按键、文本、密码或页面内容。
- 接管状态芯片只负责显示，不暂停 Agent，也不构成权限边界。浏览器动作的权限仍由上游设置和 DSH 审批机制控制。
- 浏览器可能持有真实登录态。不要允许不受信任的页面或指令诱导 Agent 发布内容、付款或修改账号设置。

## 开发检查

```bash
pnpm install
pnpm run check
pnpm pack --dry-run
```

## 致谢与许可

MIT。浏览器运行时和桌面桥基于 [WQTY123/dsh-browser](https://github.com/wqty123/dsh-browser)，署名见 [NOTICE.md](NOTICE.md)。

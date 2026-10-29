# DSH Kimi Control

[中文](README.md)

Kimi Code Desktop-style browser takeover interactions for DeepSeek Harness: a real browser sidebar, Agent / human control states, action hints in Kimi workbench design language, and conversation cards.

This unofficial community plugin composes the MIT-licensed [`dsh-builtin-browser`](https://github.com/wqty123/dsh-browser) runtime and adds its own interaction layer and desktop input-event bridge.

## Features

- Native DSH `<webview>` on Desktop, not a JPEG mirror.
- While the Agent works, the conversation's browser sidebar expands automatically and the page shows a “Using the browser” status chip plus the current action.
- A thin Kimi-blue border (`#1783ff`, dark `#1a88ff`) with a soft breathing glow marks Agent control; page input is never intercepted.
- Human input switches the state to “You have control” with a neutral border; an explicit button returns control.
- Short “Done” feedback that fades out instead of covering the page.
- Browser conversation cards follow Kimi's tool-card anatomy: action, target, live status, expandable input / output, and “Show in sidebar”.
- Responsive layout and reduced-motion support.

## Design alignment

The interaction layer is rebuilt against Kimi Code Desktop 3.2.21's browser workbench design language, recovered statically with REA from the installed application:

| Token | Kimi value |
|---|---|
| Accent | `--Colors-KMBlue` `#1783ff` (light) / `#1a88ff` (dark) |
| Radius | `--Radius-xs` 8 · `sm` 10 · `md` 12 · `lg` 16 |
| Type | `UI-B2` 14/20 titles · `UI-C1` 12/18 supporting copy |
| Layers | `Fills-F1` / `Fills-F2` neutral interaction fills, `Separators-S1` hairlines |
| Motion | 120–180ms on `cubic-bezier(.2, 0, 0, 1)`, soft low-opacity shadows |

The sidebar itself is rendered by DSH's shipped `@deepseek-ai/dsh-client-ui-sidebar-browser` package (tabs, address bar and history are its chrome). This plugin owns the control state, action hints, frame and conversation cards, and deliberately does not replace the native browser toolbar.

## Requirements

- DSH `>=0.2.0-rc.2 <0.3.0`.
- Node.js `>=22.19`.
- DSH Desktop for the embedded sidebar. DSH Web keeps conversation cards and tools but uses a separate browser window.

## Install on DSH Desktop

```bash
dsh plugin --profile desktop add git+https://github.com/lswang9/dsh-kimi-control.git
node ~/.dsh/profiles/desktop/node_modules/dsh-kimi-control/desktop-bridge/install.mjs
```

Quit and reopen DSH Desktop. Re-run the installer after every desktop upgrade. Pass an explicit application Contents path if automatic detection does not match your installation.

The bridge must modify the installed app's entry point because it runs in Electron's main process. The installer creates backups and supports `--revert`. Without it, browser tools fall back to a separate window.

## Install on DSH Web

```bash
dsh plugin --profile web add git+https://github.com/lswang9/dsh-kimi-control.git
```

Restart `dsh web` and start a new session.

## Privacy

The input bridge reports only `mouseDown` or `keyDown` and the owning session. It never reports key values, typed text, passwords, or page content. The visual handoff does not pause the Agent and is not a security boundary.

## Checks

```bash
pnpm install
pnpm run check
pnpm pack --dry-run
```

## License

MIT. See [NOTICE.md](NOTICE.md) for upstream attribution.

# DSH Kimi Control

[中文](README.md)

Kimi Code Desktop-style browser takeover for DeepSeek Harness: the right sidebar renders Kimi's browser workbench chrome (52px tab strip, browser toolbar, centered domain address field, more menu), and Agent / human control lives in a toolbar status chip.

This unofficial community plugin composes the MIT-licensed [`dsh-builtin-browser`](https://github.com/wqty123/dsh-browser) runtime and adds its own interaction layer and desktop input-event bridge.

## Features

- **Kimi workbench browser chrome**: a 52px workbench tab strip and a 52px toolbar above the page — back, forward, reload (stop while loading), centered domain address field (full URL on focus, Enter navigates), and a more menu (reload, copy link, close tab).
- **Control state in the toolbar**: a status chip shows “Using the browser” with a breathing KMBlue dot, “You have control” plus a return-control button, and a short “Done” acknowledgement.
- Native DSH `<webview>` on Desktop; clicking or typing in the page takes over, returning control resumes the Agent.
- Kimi tool cards in the conversation: action, target, live status, expandable input/output, and “Show in sidebar”.
- Kimi's 120–180ms motion curve and soft shadows; reduced-motion support.

## Design alignment

The workbench chrome and interaction layer are rebuilt against Kimi Code Desktop 3.2.21's browser workbench design language, recovered statically with REA:

| Token | Kimi value |
|---|---|
| Accent | `--Colors-KMBlue` `#1783ff` (light) / `#1a88ff` (dark) |
| Surfaces | `Bg-Primary` `#fff` / `#121212`; `BgGp-Secondary` `#1f1f1f` |
| Radius | `--Radius-xs` 8 · `sm` 10 · `md` 12 · `lg` 16 |
| Type | `UI-B2` 14/20 tabs, address, menus · `UI-C1` 12/18 status chip |
| Layers | `Fills-F1` / `Fills-F2` neutral fills, `Separators-S1` hairlines |
| Motion | 120–180ms on `cubic-bezier(.2, 0, 0, 1)`, soft low-opacity shadows |

The sidebar's tabs, address bar and toolbar normally belong to DSH's shipped `@deepseek-ai/dsh-client-ui-sidebar-browser` package. The plugin hides that package's 38px toolbar, injects the Kimi chrome into its DOM structure, and reuses the same `<webview>` and navigation. If a DSH upgrade changes those internal structures, the chrome may need adapting.

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

The input bridge reports only `mouseDown` or `keyDown` and the owning session. It never reports key values, typed text, passwords, or page content. The status chip does not pause the Agent and is not a security boundary.

## Checks

```bash
pnpm install
pnpm run check
pnpm pack --dry-run
```

## License

MIT. See [NOTICE.md](NOTICE.md) for upstream attribution.

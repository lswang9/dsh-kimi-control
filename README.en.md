# DSH Kimi Control

[中文](README.md)

Kimi Code Desktop-style browser takeover interactions for DeepSeek Harness: a real browser sidebar, animated rainbow feedback, Agent / human control states, action hints, and conversation cards.

This unofficial community plugin composes the MIT-licensed [`dsh-builtin-browser`](https://github.com/wqty123/dsh-browser) runtime and adds its own interaction layer and desktop input-event bridge.

## Features

- Native DSH `<webview>` on Desktop, not a JPEG mirror.
- Animated rainbow border and “Agent has control” state during browser actions.
- Human input switches the panel to “You have control”; an explicit button returns control.
- Browser conversation cards with live status, arguments, results, and a sidebar reveal action.
- Short completion feedback, responsive layout, and reduced-motion support.

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

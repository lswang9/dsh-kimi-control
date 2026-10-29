# Kimi browser control

Turn the browser sidebar into Kimi Code Desktop's browser workbench, with the Agent's control state in its toolbar.

- Real pages in the DSH Desktop browser sidebar, in Kimi's 52px workbench tab strip.
- Kimi browser toolbar: back, forward, reload/stop, centered domain address field (full URL on focus, Enter navigates), and a more menu.
- A toolbar status chip shows Agent control (“Using the browser”), human takeover (“You have control” + return), and a short “Done” acknowledgement.
- Conversation cards use Kimi's tool-card anatomy: 24px icon tile, 14/20 title, 12/18 target, status dot, expandable input/output blocks, and a “Show in sidebar” action.
- The upstream DOM, screenshot, form, tab, login-state, and download tools remain available.

The chrome and interaction layer follow the design tokens recovered from Kimi Code Desktop 3.2.21's browser workbench with REA: KMBlue `#1783ff` / `#1a88ff`, Bg-Primary `#fff` / `#121212`, radii 8–16, the UI-B2/UI-C1 type ramp, neutral Fills layers, and 120–180ms motion. DSH's shipped sidebar-browser package still owns the tab bodies and webview; the plugin hides its 38px toolbar, injects the Kimi chrome into its DOM structure and reuses the same navigation, so a DSH upgrade that changes those internals may need adaptation.

DSH Desktop also requires the bundled bridge. The installer creates backups and supports rollback. DSH Web uses a separate browser window rather than an embedded native sidebar.

# Kimi browser control

Turn browser automation into a visible, interactive handoff instead of a background tool call.

- Real pages in the DSH Desktop browser sidebar.
- While the Agent works: the sidebar expands, a “Using the browser” chip and the current action appear on the page, and a Kimi-blue frame marks Agent control.
- Human input switches the state to “You have control”; an explicit button returns control.
- Conversation cards use Kimi Code Desktop's tool-card anatomy: 14/20 title, 12/18 target, 8px icon tile, expandable input/output blocks, and a “Show in sidebar” action.
- The upstream DOM, screenshot, form, tab, login-state, and download tools remain available.

The interaction layer follows the design tokens recovered from Kimi Code Desktop 3.2.21's browser workbench with REA: KMBlue `#1783ff` / `#1a88ff`, radii 8–16, the UI-B2/UI-C1 type ramp, neutral Fills layers, and 120–180ms motion. DSH's shipped sidebar-browser package still renders the tab strip, address bar and history controls; the plugin owns the takeover state, hints, frame and cards.

DSH Desktop also requires the bundled bridge. The installer creates backups and supports rollback. DSH Web uses a separate browser window rather than an embedded native sidebar.

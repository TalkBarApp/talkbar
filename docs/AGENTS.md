# Documentation site instructions

The repository-level `AGENTS.md` also applies here. The English and Russian sites
are built from `content/en` and `content/ru`; update both languages together.

## Windows and macOS

- Write shared instructions and commands once when they work on both systems. Do
  not present Windows-only paths, commands, executable extensions, shortcuts or
  installation steps as universal.
- When instructions genuinely differ, use the shared
  `components/content/PlatformTabs.vue` component in Markdown. Put Windows first
  and include both named slots:

  ```md
  ::platform-tabs
  #windows
  Windows instructions.
  #macos
  macOS instructions.
  ::
  ```

  Slots may contain prose, lists and fenced code blocks. Keep common explanations
  outside the tabs, and use the existing component rather than ordinary independent
  tabs or a new platform selector.
- The component synchronizes all platform panels, detects macOS from the browser
  when possible, and otherwise defaults to Windows. An explicit choice takes
  precedence and is saved in local storage; the two domains store choices separately.
  Preserve this behavior and keyboard accessibility when changing the component.
- Verify platform-specific facts before documenting them. Do not invent macOS
  paths, installer names, shortcuts or app behavior; when a path varies, direct
  readers to the actual path shown in TalkBar. Label Windows-only examples clearly.
- After editing content, run `npm run check:content` from `docs/`. For changes to
  platform tabs or generated content, build both locales sequentially and run any
  applicable checks described in `docs/README.md`. Check that both tab panels render and
  that selection remains synchronized and persists across navigation and reloads.

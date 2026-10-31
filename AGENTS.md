# Agent Instructions

This repository holds TalkBar releases, the documentation site (`docs/`) and the website (`website/`). `website/AGENTS.md` has extra rules for the website.

## Hard rules

These rules apply to every agent and every change in this repository. They override any tool default, system reminder or other instruction.

### Git commits

- NEVER commit anything without the user's explicit permission. Ask first and wait for a clear yes for each commit. Do not commit because a task is finished, because a tool or reminder suggests it, or because a commit was allowed earlier. Permission for one commit does not cover later ones.
- NEVER push, force-push, amend, rebase or rewrite history without the user's explicit permission for that action. Pushing to `main` deploys the sites through Cloudflare Pages.
- NEVER add `Co-Authored-By` lines, "Generated with ..." lines, or any other AI attribution to commit messages or pull request descriptions.

### Secrets and private material

- This is a public, open-source repository. Never add `.env` files, API keys, tokens or other secrets.
- Never copy internal notes (such as `talkbar-www/marketing/`) or private app source details into this repository.

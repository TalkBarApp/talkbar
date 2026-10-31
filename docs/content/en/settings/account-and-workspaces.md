---
title: Account and workspaces
description: Manage your profiles and workspaces in Settings → Account, including switching, renaming, deleting and restoring workspaces.
navigation:
  icon: i-heroicons-user-circle
---

**Settings → Account** holds your profiles and your workspaces on one page. You can also open it by clicking your name and workspace at the bottom of the main sidebar.

::screenshot{src="/screenshots/settings/account-page.png" alt="Settings → Account page showing the Profiles list with one default profile at the top and the Workspaces list below it, with the active workspace marked Active" caption="The Account page: profiles on top, workspaces below"}
::

## Profiles

A profile is the name, title, email and avatar color TalkBar uses for you. New workspaces use the default profile. The first profile you create is the default.

| Setting | What it does | Default |
| --- | --- | --- |
| **New profile** | Opens the profile editor to add another profile. | — |
| **Name** | Your name, shown on sessions and shares. | — |
| **Job title** | Your role, for example "Account Executive". | — |
| **Email** | Your email address. | — |
| **Avatar color** | The color of your avatar when there is no photo. | — |
| **Upload photo** / **Change photo** / **Remove photo** | Sets or removes a photo for the avatar. | No photo |

Each profile row has a **Profile actions** menu:

- **Edit profile**: change the name, title, email or avatar.
- **Make default**: new workspaces use this profile. Shows **Already the default** on the current default.
- **Delete**: removes the profile. Any workspace that used it switches to the default profile. You can't delete the default profile or your last profile.

Under each profile, TalkBar shows which workspaces use it, or **Not used by any workspace**.

## Workspaces

Each workspace is fully separate: it has its own sessions, notes, people, knowledge and data folder. A workspace can also use its own profile.

| Control | What it does |
| --- | --- |
| **New workspace** | Creates a workspace. Enter a **Name** and, optionally, pick a **Profile**. If you leave the profile empty, the workspace uses the default profile. |
| **Switch** | Makes that workspace the active one. The active workspace shows an **Active** badge. |
| Profile list on each row | Chooses which profile the workspace uses. **Create new profile…** creates one and assigns it right away. |
| **Rename workspace** (actions menu) | Changes only the name. Sessions, notes and knowledge stay as they are. |
| **Move to Trash** (actions menu) | Hides the workspace. Its sessions, notes and files stay on disk until you delete it permanently. |

You can't move the active workspace or your last workspace to Trash. Switch to another workspace first.

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
While a session is recording, you can't switch, create or change workspaces. Stop the session first.
::

## Deleted workspaces

When at least one workspace is in Trash, **Show deleted** appears below the list (with a count). It opens the **Deleted workspaces** area:

- **Restore** brings the workspace back.
- **Delete permanently** erases the workspace's sessions, notes, knowledge and files. This can't be undone. To confirm, type the full workspace name. **Create a backup first** is checked by default, so TalkBar saves a backup before erasing anything.

If a permanent delete fails partway, the button changes to **Retry**.

::screenshot{src="/screenshots/settings/account-delete-workspace.png" alt="The Delete this workspace permanently? dialog with the Create a backup first checkbox checked and an empty field asking to type the full workspace name" caption="Deleting a workspace permanently"}
::

## Plan limits

Your plan sets how many profiles and workspaces you can have on this device. When you reach a limit, **New profile** or **New workspace** is turned off. The page then shows a note such as "Your plan includes 2 workspace(s)." with a **Details** link. You also can't restore a deleted workspace while you're at the workspace limit.

| Plan | Profiles | Workspaces |
| --- | --- | --- |
| Free | 1 | 1 |
| Personal | 1 | 1 |
| Plus | 2 | 2 |
| Pro | 5 | Unlimited |
| Business | 5 | Unlimited |

See [Plans and license](/data/plans-and-license) for everything each plan includes.

## Related

- [Getting around](/getting-started/getting-around)
- [Plans and license](/data/plans-and-license)
- [Data & Backup settings](/settings/data-and-backup)
- [Backup and restore](/data/backup-and-restore)

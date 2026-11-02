---
title: License
description: Reference for Settings → License — your plan and usage, activating and managing a license key, upgrades, custom branding and the admin policy.
navigation:
  icon: i-heroicons-key
---

**Settings → License** shows your TalkBar plan, what it includes, and the plans above it. This is also where you activate, check or remove a license key on this computer.

::screenshot{src="/screenshots/settings/license.png" alt="Settings → License page with the Current plan section showing usage meters for Sessions, Workspaces, Projects, Local profiles and Active share links, and the License key section below it" caption="Settings → License"}
::

## Current plan

Shows the plan in effect on this computer, for example **TalkBar Free**, with a short tagline and a list of what it includes.

Usage meters show how much of each limit you use:

- **Sessions**
- **Workspaces**
- **Projects**
- **Local profiles**
- **Active share links**

Limits your plan doesn't cap have no meter. If you are over a limit, the meter says by how much. Paid plans note **Perpetual license · 12 months of updates**.

For a side-by-side comparison of the plans, see [Plans and license](/data/plans-and-license).

## License key

Without a license, the section shows **No license activated** and TalkBar runs on the Free plan.

| Button | What it does |
| --- | --- |
| **Activate license** | Opens activation. Paste the key from your purchase email, or open the activation link from **Manage License**. |
| **Find my license key** | Opens the license portal in your browser so you can recover your key. |
| **Cancel activation** | Shown while an activation is still finishing. Stops it; this computer stays on the Free plan. |

Once a license is active, the section shows the plan, a short license ID, and a status badge. Details include **Licensed to**, **Interface language** (which app languages the license covers), **Devices** (for example "1 of 2 in use"), when updates and the share link service are included until, and **Last checked**.

| Button | What it does |
| --- | --- |
| **Check license** | Contacts the license service and confirms the license is in order. |
| **Manage License** | Opens the license portal in your browser to manage your license and devices. |
| **Change license key** | Replaces the key on this computer with another one. |
| **Remove license** | Switches this computer to the Free plan and frees its place on the license so you can activate it on another computer. Your data is kept. |
| **Renew updates** | Shown when renewal is open or this version isn't covered by your updates period. Opens the license portal in your browser. Renewing adds 12 months to the current end date. |
| **Activate again** | Shown when the license needs to be activated again on this computer. |

If something needs your attention, such as a license that could not be confirmed, the section shows it in an amber note with the next step.

::callout{icon="i-heroicons-light-bulb" color="primary"}
A removed license keeps this computer's place until TalkBar next reaches the license service. Then the place is freed automatically.
::

## Upgrade your plan

Lists each plan above yours with its highlights. Plus is marked **Most popular**. **Upgrade to {plan}** opens a summary of what you get with a **Buy {plan} License** button that opens checkout in your browser. If purchases are not yet available in your version, the dialog says so and the buy button is turned off.

After payment, TalkBar activates the license from the activation link.

## Custom branding

A yearly add-on that lets you share sessions, notes and chats under your own brand instead of TalkBar: your logo, colors and address on shared pages, invitations and messages.

| State | What you see |
| --- | --- |
| Free plan | "Needs a Personal, Plus or Pro license." The add button is turned off. |
| Personal, Plus or Pro, not purchased | **Add custom branding**. Each purchase adds 12 months. |
| Add-on active | "Active until {date}", with **Extend custom branding** and **Set up custom branding**. |
| Business plan | Included while the plan's share link service is active, with **Set up custom branding**. |

**Set up custom branding** opens **Settings → Export & Share → Custom branding**. See [Export and share settings](/settings/export-and-share).

## Admin policy

This section is on the page on every plan. It shows the rules your organization sets for everyone who uses TalkBar on this computer, with a status: **In force**, **Disabled**, **Could not be read** or **Not set**. Setting up rules needs a Business license. Without one, the section has a **Business** badge.

| Control | What it does |
| --- | --- |
| **Enable admin policy** | Enforces the rules on this computer. Turning it off, after you confirm, keeps the rules but stops enforcing them. Changing it needs the Business plan, a policy on this computer and the computer's administrator password. |
| **Show Admin policy page** | Adds the [Admin policy](/settings/admin-policy) tab to Settings for everyone on this computer. Shown on the Business plan only. Changing it needs the computer's administrator password. |
| **Open admin policy** | Opens that tab. Shown once the tab is turned on. |
| **Remove policy** | Removes the policy from this computer, after you confirm and approve the administrator prompt. People on this computer can then change every setting again. This doesn't need a Business license. |

If the section shows **The policy could not be read**, TalkBar uses the strictest settings until your administrator fixes the policy on this computer.

## Preview trial

A Preview trial is a free 14-day trial that unlocks all features with no plan limits. It needs an invitation link or code.

On a computer that never had a trial, the **Preview invitation** section sits at the bottom of this page. **Not interested** hides it. On the Free plan, **Activate Invite** is also in the **Help** menu.

To activate:

1. Click **Activate Invite** to open **Activate Preview**.
2. Open your invitation and confirm your email. On your Preview page, select **Open TalkBar**. Or enter your code or email under **Invitation code or email**.
3. If you entered an email, open the confirmation link TalkBar sends you, then click **Check activation**.

Each computer can have one trial, and an invitation works on one computer.

While the trial runs, a **Preview** tag shows in the logo menu and a row in the sidebar shows its end date. The **Preview trial** section moves to the top of this page:

| Control | What it does |
| --- | --- |
| **Preview details** | Shows the end date and the days left. |
| **Turn off Preview** | Your own plan applies again right away. You can use **Turn Preview back on** until the end date; the trial keeps that date and doesn't start over. |
| **Remove Preview** | Shown while the trial is off. Removes the trial and its invitation from this computer. Activating the same invitation again continues the trial until the same date. |

A license you have stays on this computer during the trial and applies again when the trial ends. If you activate a license during a trial, TalkBar asks whether to turn off Preview now, or **Keep Preview**.

When the trial ends, TalkBar says **Your Preview trial has ended. Your plan is back.**

## Related

- [Plans and license](/data/plans-and-license)
- [Admin policy](/settings/admin-policy)
- [Account and workspaces](/settings/account-and-workspaces)
- [Export and share settings](/settings/export-and-share)
- [Share links](/sharing/share-links)

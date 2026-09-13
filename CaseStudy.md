# Web Folio Case Study: Why I Built It, How I Built It, and the Publish Button That Lied to Me

> **Disclaimer:** This one's less "clean tutorial" and more "here's the honest chaos behind the polished README." Real story of building Web Folio — the admin panel that grew a mind of its own, a publish button that flat-out lied to my face, and a Vercel deployment that made me question whether `index.js` was ever real. If you've ever stared at a boolean that's clearly wrong and still somehow "working," this one's for you. 😅

Most of my posts explain what a project does.

This one explains what it did *to me* while I was building the admin side of it.

```text
Idea 💡
  ↓
"The public site is the easy part" 😌
  ↓
Admin panel architecture 🧠💥
  ↓
Publish button gaslighting me 🌀
  ↓
Vercel deployment surprises 👹
  ↓
It finally works 🎉
```

Here's the honest version of building Web Folio.


* [Why I Built This](#why-i-built-this)
* [How I Built This](#how-i-built-this)
* [Bug #1: The Admin Panel Architecture From Hell 🧩](#bug-1-the-admin-panel-architecture-from-hell-)
* [Bug #2: The Publish Button That Lied 🤥](#bug-2-the-publish-button-that-lied-)
* [Deployment: Vercel Had Notes 📋](#deployment-vercel-had-notes-)
* [What I Actually Learned](#what-i-actually-learned)
* [Final Thoughts](#final-thoughts)
* [Quick Cheat Sheet](#quick-cheat-sheet)


# Why I Built This

I kept looking at my own portfolio and thinking: "cool, it lists my projects... and then what?" A visitor sees a card, a live demo link, a GitHub link, and has to just *trust* that the project is good. There's no story. No "here's why I made this decision" or "here's the bug that almost broke me."

```text
Old portfolio:
Project card → link → link → the end
```

So I decided the portfolio itself needed a blog attached to it — not a separate Medium account, not a disconnected Notion page, but posts that live *inside* the portfolio and can attach themselves directly to a project as either a **Case Study** or **Docs**. One place, one login, one system.

That was the whole pitch. Simple sentence. Deeply not-simple execution, as you're about to find out. 😄

---

# How I Built This

The public side came together pretty painlessly:

```text
React (Vite) frontend
     ↓
Express backend
     ↓
MongoDB for admin, posts, projects, and messages
     ↓
Cloudinary for images and preview videos
     ↓
JWT + cookies for the single admin account
```

Home page, About, Projects, Blog, Contact — all straightforward. I was feeling good. Confident, even.

Then I opened the admin panel requirements and remembered that "let the admin manage everything" is doing a lot of quiet heavy lifting in that sentence. 🙃

---

# Bug #1: The Admin Panel Architecture From Hell 🧩

Here's the actual shape of the problem: a blog post isn't just a blog post. It can *also* be a Case Study. It can *also* be Docs. Both of those need to be editable. Both need publish and unpublish states. And all of that needs to live comfortably next to regular project management, in the same dashboard, without turning into spaghetti.

```text
A single "Post" can be:
  - a normal blog post
  - a Case Study for a project
  - Docs for a project
  - a draft
  - published
  - unpublished (again, but different from draft)
```

Every one of those states needed its own UI treatment, its own edit flow, and its own place in the dashboard without the whole thing collapsing into an unreadable mess of conditionals. I rebuilt the admin structure more than once trying to find a shape that didn't make me want to close my laptop and take up gardening. 🌱

Eventually I landed on flags (`isCaseStudy`, `isDocumentation`) plus a `published` boolean instead of trying to model every combination as a separate "type" — and the complexity finally became manageable instead of exponential. Lesson unlocked: sometimes the fix isn't more structure, it's *less* structure done smarter.

---

# Bug #2: The Publish Button That Lied 🤥

Just when I thought the admin panel and I had made peace, the **Publish/Unpublish** button decided to start gaslighting me.

```text
Button says:  "This post is unpublished"
Reality:      the post is very much live and published
Me:           🧍
```

The UI was confidently telling me one thing while the actual database state was doing the opposite. Which is somehow worse than a normal bug — at least a crash tells you something's wrong. This just... lied, calmly, with a straight face.

So I went digging through the now-admittedly-complex architecture from Bug #1 (thanks, past me), tracing the publish state all the way from the click to the database and back to the UI. And there it was: the bug wasn't in my schema, wasn't in the API response — it was sitting quietly inside the **button's own function**, flipping or reading the state incorrectly before it ever reached the actual toggle logic.

```text
Root cause: the button's handler function itself,
            not the backend, not the model, not the API
Fix:        correct the function logic
Result:     button finally tells the truth
```

Once fixed, publish and unpublish did exactly what the label said — which honestly felt like a small miracle after staring at a screen that had been quietly wrong at me for a while. 😅

---

# Deployment: Vercel Had Notes 📋

Deployment day arrived with its usual optimism, which Vercel proceeded to gently dismantle. Three separate surprises, back to back.

## Surprise 1: The Missing Entry Point 🚪

Vercel's Node boilerplate expected an `index.js` entry point. My project didn't have one — I'd structured things differently. So the deploy just... didn't know where to start.

```text
Vercel: "Where's index.js?"
Me:     "...good question"
```

Fix: added the actual `index.js` entry point Vercel expects for its serverless functions, pointing it at my existing app setup. Simple in hindsight, mildly panic-inducing in the moment.

## Surprise 2: The Admin API That Couldn't Read Its Own Secret 🔐

Next up: the admin API endpoints couldn't access an environment variable I'd added — even though I could see it sitting right there in the Vercel dashboard. I'd added it as a regular env variable, but the admin API needed it treated properly as a **secret**, configured correctly for the serverless environment rather than just dropped in as a plain value.

```text
Local:       env variable just works
Production:  env variable exists but isn't reachable the same way
Fix:         configure it explicitly as a secret in Vercel's settings
```

## Surprise 3: Cloudinary Uploads Ghosting Me 👻

And finally — image and video uploads just stopped working entirely in production. Turned out my **upload middleware** wasn't correctly passing the file through to Cloudinary in the deployed environment. It worked locally, sure, but production had different opinions about how that file buffer should be handled on its way out.

```text
Local:       file → middleware → Cloudinary ✅
Production:  file → middleware → 🕳️ (nothing) → Cloudinary ❌
```

Fixed the middleware's handling of the upload so the file buffer actually made it all the way through, and uploads started working in production too.

By the end of all three surprises, deployment went from "this should be quick" to "okay, we're doing this properly now." Classic. 😂

---

# What I Actually Learned

```text
1. Complex "one thing can be many things" content models (post = post
   OR case study OR docs) get easier with flags and booleans, not
   more nested types.
2. When the UI is lying about state, trace the click handler itself
   before blaming the backend or the database.
3. Serverless platforms like Vercel expect specific entry points
   (index.js) — know the boilerplate before you deploy, not after.
4. Env variables aren't always "just env variables" in production —
   sometimes they need to be configured as secrets explicitly.
5. Upload middleware that works locally can silently fail in
   production if it's not actually passing the file buffer through
   correctly — test uploads specifically after every deploy.
```

---

# Final Thoughts

Building Web Folio taught me that the "boring" admin panel is usually where the real complexity hides. The public site was the fun part — animations, theming, a nice blog reading experience. The admin panel was where I actually had to think hard about state, architecture, and a button that apparently had its own agenda.

```text
Idea
  ↓
Build the easy public-facing half
  ↓
Get humbled by the admin panel
  ↓
Get humbled again by a lying button
  ↓
Get humbled a third time by deployment
  ↓
Fix it, learn from it, ship it
```

Every single one of these was frustrating in the moment and completely fixable once actually traced properly — which might just be the whole job, honestly. 🙂

---

# Quick Cheat Sheet

| Moment | What Actually Happened |
| --- | --- |
| Bug #1 | Admin panel needed to support post/case-study/docs + draft/publish states — solved with flags instead of nested types |
| Bug #2 | Publish/Unpublish button showed the wrong state — root cause was the button's own handler function, not the backend |
| Deployment issue #1 | Vercel expected an `index.js` entry point that didn't exist yet |
| Deployment issue #2 | Admin API couldn't read an env variable — needed to be configured as a secret |
| Deployment issue #3 | Upload middleware wasn't passing files through to Cloudinary in production |
| Real lesson | Trace state from click to database before assuming where a bug lives |

If your button is confidently telling you the wrong thing — check the button's own code before you tear apart your backend. Ask me how I know. 😅

---

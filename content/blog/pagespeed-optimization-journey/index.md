---
title: "How I Took My PageSpeed Score from 35 to 90"
date: "2026-04-07"
description: "The story of how I diagnosed, prioritized, and fixed performance issues to double my site's Lighthouse score."
---

Have you ever shipped a feature you were really proud of, only to watch your PageSpeed score sit at a painful **35**?

That was me. My app worked fine locally. But once deployed, Lighthouse painted the screen red. Users noticed too: "Why is this so slow?"

This is the story of how I diagnosed the problem, wasted time on the wrong fix, and eventually pushed the score past **90**. If you've ever stared at a bad Lighthouse report and didn't know where to start, this one's for you.

---

## What Was Actually Wrong

Before jumping into fixes, I needed to understand what was happening. I opened Chrome DevTools, ran Lighthouse, and found three clear issues:

| Issue | What I Found |
|-------|-------------|
| **Huge JS bundle** | `main.js` was over 2MB |
| **Render-blocking resources** | Components loaded upfront even when users didn't need them yet |
| **Unoptimized images** | PNG/JPEG files, some over 1MB each |

> **Tip for fellow devs:** Before optimizing anything, always run Lighthouse first. It tells you exactly where the bottleneck is. Don't guess.

This step alone saved me hours. In *The Pragmatic Programmer*, Hunt and Thomas call this **"Don't Assume It — Prove It."** It's tempting to jump straight into fixing things based on gut feeling, but the data almost always tells a different story than you expect.

---

## What I Tried First (And Why It Failed)

My instinct was to compress everything. I spent hours tweaking `Terser` settings and adding image compression plugins to my build pipeline.

**Result:** Score went from 35 to... 42. That's it.

Here's what I got wrong: compressing a 2MB bundle down to 1.8MB still means the browser has to **parse and execute 1.8MB of JavaScript** before the page becomes interactive. I was treating the symptom, not the cause.

In hindsight, I was doing what *The Pragmatic Programmer* warns against: **"Programming by Coincidence"** — making changes and hoping something improves without truly understanding the underlying problem. The config tweaks felt productive, but I had no clear mental model of *why* the page was slow.

The real question wasn't *"How do I make this smaller?"* It was *"Does the user actually need all of this right now?"*

That reframe is what John Ousterhout describes in *A Philosophy of Software Design* as tackling **complexity at its source** rather than patching around it. The bundle wasn't too big because it lacked compression. It was too big because it was loading things nobody asked for.

---

## What Actually Worked

Once I reframed the problem, three changes made the biggest difference:

### 1. Code Splitting by Route

Instead of shipping the entire app in one bundle, I split it so each page only loads what it needs.

```javascript
// Before: everything loads at once
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

// After: each page loads on demand
import React, { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

**Why this works:** The user visiting `/dashboard` doesn't download the code for `/settings`. Simple, but the impact is massive.

This is the **YAGNI principle** *(You Aren't Gonna Need It)* applied to delivery: don't send the browser code it doesn't need yet. Martin Fowler and Kent Beck popularized YAGNI for writing code, but it applies just as well to *shipping* code.

### 2. Lazy Loading Images

Images below the fold don't need to load immediately. HTML5 makes this a one-liner:

```html
<!-- Above the fold: load immediately -->
<img src="hero.webp" alt="Hero banner" />

<!-- Below the fold: load when user scrolls -->
<img src="footer-graphic.webp" loading="lazy" alt="Footer" />
```

No library needed. Just one attribute.

Robert C. Martin writes in *Clean Code* that **"the best code is no code at all."** The same idea applies here: the best optimization is often the simplest one. A single HTML attribute replaced what used to require a JavaScript library with scroll listeners.

### 3. Switching to WebP

I converted all images from PNG/JPEG to WebP, with a fallback for older browsers:

```html
<picture>
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Example" loading="lazy" />
</picture>
```

**WebP files are typically 25-35% smaller** than JPEG at the same quality. Multiply that across every image on your site and the savings add up fast.

---

## The Results

| Metric | Before | After |
|--------|--------|-------|
| Initial Bundle Size | 2.2 MB | 340 KB |
| First Contentful Paint | 4.2s | 0.8s |
| **PageSpeed Score** | **35** 🔴 | **92** 🟢 |

---

## What I Learned

The biggest takeaway wasn't about any specific tool or technique. It was a mindset shift:

**Performance optimization isn't about making things smaller. It's about loading the right things at the right time.**

*The Pragmatic Programmer* has a concept called **"Tracer Bullets"** — find the path that lights up the whole system, then iterate. Applied to performance work, this means: identify the critical rendering path first. Everything that isn't on that path can wait.

Before applying any optimization, ask yourself: *"Does the user need this resource right now?"* If the answer is no, defer it.

Three things that made the real difference:
1. **Code Splitting** — only ship the JS the user actually needs *(YAGNI)*
2. **Lazy Loading** — defer images and components below the fold *(simplicity over cleverness)*
3. **Modern Formats** — use WebP instead of legacy image formats

If you're facing a similar problem, start with a Lighthouse audit. Look at what's blocking your initial load. Chances are, the fix isn't compression — it's prioritization.

> *"Kaizen"* — the Japanese philosophy of continuous, small improvements — is how I think about performance now. You don't need a massive rewrite. A few targeted changes, guided by data, can transform your app.

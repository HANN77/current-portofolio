---

## 🛠️ 1. Tech Stack Refinement

Besides the core stack you mentioned, there are a few crucial additions that are almost mandatory to achieve that Awwwards-level smoothness:

* **Core:** Next.js (App Router), React, Tailwind CSS.
* **UI Components:** shadcn/ui (for base components like dialogs, sheets, and forms with minimalist styling).
* **Animation & Interactions:**
* **Framer Motion:** Use this for page transitions, layout animations, and micro-interactions (like button hover effects or magnetic cursors).
* **GSAP + ScrollTrigger:** Use this specifically for complex scroll-based animations (like staggered text reveals, parallax effects, or pinning elements on scroll).


* **Smooth Scrolling (Crucial):** **Lenis (by Studio Freight)**. This is the secret behind the buttery-smooth scrolling of Awwwards-winning websites, and it pairs perfectly with GSAP ScrollTrigger.
* **State Management:** Zustand (optional, if you need a lightweight global state to control animation statuses, e.g., waiting for the preloader to finish before GSAP starts).

---

## 🎨 2. Design Concept: "The Pure White Canvas"

A minimalist design dominated by white relies heavily on **typography**, **whitespace**, and **grids** to look premium.

- **Color Palette:**
- Background: `#FFFFFF` (Pure White) or `#FAFAFA` (Off-white to reduce eye strain).
- Text: `#111111` (Near black) for primary text, `#666666` for secondary text.
- Accent: Use light neutral grays or subtle glassmorphism effects.

- **Typography:** Use a clean, modern Sans-serif font (e.g., Inter, PP Neue Montreal, Roobert, or Helvetica Now). Create extreme contrast between oversized typography for headings and small but highly legible paragraph text.

---

## 🏗️ 3. Page Structure & Animation Scenarios

Here is the blueprint for the main page (Single Page or Multi-page) and its animation targets:

### A. Initial Preloader (Framer Motion)

- **Concept:** A pure white screen with a percentage counter (0-100%) counting up rapidly using bold typography.
- **Transition:** The screen splits or slides up smoothly to reveal the Hero section.

### B. Hero Section

- **Design:** Ultra-clean. Only your name (oversized letters), profession/role (e.g., "Creative Developer"), and a custom cursor.
- **Animation:**
- Your name reveals from bottom to top (staggered text reveal per character) using GSAP.
- A custom cursor (Framer Motion) that morphs when hovering over specific areas.

### C. Selected Works (Portfolio)

- **Design:** Project list. Because of the white background, use high-quality project images/videos. This could be a list of large typography where hovering over a name reveals a floating project image following the cursor.
- **Animation (GSAP ScrollTrigger):**
- Subtle parallax effect on project images.
- Images scale up slowly as they scroll into the viewport.

### D. About / Philosophy

- **Design:** A large paragraph detailing your approach to web development.
- **Animation (GSAP):** Scrubbing animation. The text is initially light gray and turns black word-by-word as you scroll down.

### E. Footer / Contact

- **Design:** A massive call-to-action text ("Let's Talk").
- **Animation:** A magnetic button effect on the contact button (Framer Motion), where the button feels pulled towards the cursor as it approaches.

---

## 🤖 4. Prompting Strategy for Antigravity (Claude)

Since you are using an AI agent, you cannot ask it to build everything at once in a single prompt. The best approach is **Iterative Component-Driven Development**.

Divide the tasks for Claude into the following phases:

**Step 1: Base Setup & Configuration (Prompt for Claude)**

> "Initialize a Next.js project with Tailwind CSS. Add and configure Lenis for smooth scrolling in the root layout. Ensure the page background is pure white (#FFFFFF) with primary text in #111111."

**Step 2: Building Utility Components (Prompt for Claude)**

> "Create a Custom Cursor component using Framer Motion that follows mouse movement. The cursor should be a small black circle that scales up and becomes translucent when hovering over elements with a specific class."

**Step 3: Building the Hero Section (Prompt for Claude)**

> "Build a minimalist Hero Section. Use GSAP to create an entrance text animation (stagger reveal) on the main heading when the component first mounts. Ensure there are no animation conflicts with Framer Motion."

**Step 4: Building Scroll Sections (Prompt for Claude)**

> "Build the 'About Me' section. Use GSAP ScrollTrigger. The text should be one large paragraph. Animate each word so it slowly transitions from gray to black as the user scrolls past the section (scrub: true)."

---

Rencana ini sudah siap tempur! Apakah Anda mau kita langsung fokus membedah detail komponen pertama (seperti setup Lenis atau preloader) untuk mulai di- _generate_?

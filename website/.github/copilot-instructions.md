<!-- GitHub Copilot Custom Instructions for Visual Studio Code -->
<!-- https://code.visualstudio.com/docs/copilot/copilot-customization -->

This is a high-end personal portfolio project built with Next.js. All content, comments, and UI elements must be in **English**, even if the developer speaks another language.

## 🧠 Project Vision

Create a **minimalistic yet rich** user experience, inspired by Apple, Google, OpenAI, Volvo, and Vercel design systems. Prioritize **clean, modern aesthetics**, and **smooth, ultra-polished animations**. The goal is to deliver a professional and distinctive digital identity that showcases passion, product quality, and long-term vision.

## 🧱 Architecture & Tech Stack

- Framework: **Next.js (App Router)**
- Styling: **Tailwind CSS** with `@tailwind/forms`, `@tailwind/typography`, and `tailwindcss-animate`
- Animation: **Framer Motion**, **GSAP** (for scroll or reveal effects)
- Icons: **Lucide**, **Tabler**, **Simple Icons**
- UI Enhancements: `glassmorphism`, `backdrop-blur`, `translucent effects`, and `layered textures`
- SEO: **next-seo**, schema markup, and meta optimization
- Deployment: **Github Pages**
- Accessibility: Fully accessible (WAI-ARIA best practices)

## 🎨 Visual & Interaction Design

- Rounded corners everywhere (Apple-like softness)
- Dark mode and light mode:
  - Light: white, soft gray, glassy blue
  - Dark: deep purple, elegant black, soft orange/pink highlights
- Glassmorphism / Liquid Glass:
  - Use `backdrop-blur`, opacity, and gradients tastefully
  - Subtle reflections and depth with `drop shadows` and `layering`
- Hover & tap animations that feel **natural**, **non-intrusive**
- Use `transitions`, `easing`, and `motion.div` for smooth flow

## 📂 Content Sections

Structure the site into modular, reusable sections/components. The navigation should be intuitive, guiding the user through a narrative that balances personality and professional expertise.

1.  **Home**

    - A captivating hero section featuring an avatar, name, and a concise, powerful tagline (e.g., "Product-minded Software Engineer").
    - Clear Call-to-Action (CTA) buttons leading to key sections like "Projects" or "Contact".
    - A subtle, animated scroll indicator to encourage exploration.

2.  **Dashboard**

    - A dynamic, at-a-glance view of professional activity. This replaces a static "GitHub Stats" page.
    - Integrate real-time data via GitHub API: contribution graph, recent activity, pinned repositories.
    - Potentially include status indicators for ongoing projects (from the Roadmap).

3.  **Career**

    - An interactive, vertical timeline showcasing professional experience.
    - Each entry should detail the role, company, duration, and key technologies.
    - Use micro-animations to highlight progression and achievements. The tone should be confident yet approachable.

4.  **Projects**

    - A curated grid or carousel of your most significant work.
    - Each project card must include a high-quality image/video, a brief description, the tech stack used, and links to the live demo and source code.
    - Implement filtering by technology or project type.
    - Include well-designed placeholder cards for upcoming projects to build anticipation.

5.  **Stack**

    - A visually engaging grid of technologies, grouped by category (e.g., Frontend, Backend, DevOps, Design).
    - Icons should be clean and recognizable. On hover, a tooltip can provide more detail or proficiency level.

6.  **Writing**

    - A dedicated space for articles, tutorials, and thoughts. Replaces a generic "Blog".
    - Clean, readable typography is paramount (`@tailwindcss/typography`).
    - Support for code blocks with syntax highlighting.
    - Categorization (e.g., "Engineering", "Design", "Tutorials") for easy navigation.

7.  **Contact**

    - A simple, elegant, and responsive contact form with clear validation.
    - Prominently display links to professional profiles: LinkedIn, GitHub, X/Twitter.
    - Optionally include a vCard QR code for easy contact saving.

8.  **Footer**

    - A minimal footer containing copyright information, social links, and a link back to the GitHub repository for this portfolio.

9.  **404 Page**

    - A custom, on-brand 404 page with a helpful message and a clear button to return to the homepage.

10. **Navbar**
    - A persistent, full-height sidebar navigation component.
    - Top-aligned: Avatar and name for personal branding.
    - Center-aligned: Logically grouped navigation links.
    - Bottom-aligned: Language selector and a theme (light/dark) switcher.
    - The entire component should be a single visual element, using glassmorphism for a modern feel.

## ✨ Splash Screen (Intro Loader)

Before the main content loads, create a minimal and elegant animated splash screen.

### Visual Design

- Centered, perfectly symmetrical design.
- Circular element in the middle:
  - Inside: my logo, avatar, or a single initial (like "M").
  - Around it: a smooth, subtle, rotating border or ring.
- Ring should appear as a soft loader:
  - Can be a stroked SVG, border animation, or conic gradient.
  - Rotate slowly, no harsh movement.
- Use tasteful spacing, alignment, and ratio — inspired by Apple or Volvo branding.
- Rounded, clean, neutral colors:
  - Light mode: white background, soft black/gray border.
  - Dark mode: black background, soft white/gray border.
- Optional entrance animation: scale in + fade in.
- Optional exit animation: fade out + scale out before homepage reveals.

### Technical Details

- Build it as a `<SplashScreen />` React component.
- Use **Framer Motion** for animation (entry/exit and rotation).
- Apply conditional rendering logic: show loader for ~2–3 seconds, then unmount it.
- Use Tailwind CSS for layout and responsiveness.
- Ensure full-screen coverage (`fixed`, `inset-0`, `z-50`).
- Component must be reusable and easy to disable when not needed.

## 🧩 Additional Notes

- Follow atomic/component-based design principles
- Prefer server components unless interactivity is needed
- Organize components and content for **future scalability**
- Keep naming consistent and meaningful (`ProjectCard`, `TechIcon`, etc.)
- Always write **clean, commented, semantic** code

## 🧪 Optional Enhancements

- Add loading skeletons
- Add theme switcher
- Integrate with Notion API or GitHub Issues for Roadmap updates
- Use OG image generation for blog previews

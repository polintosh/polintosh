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
- Deployment: **Vercel**
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

Structure the site into modular, reusable sections/components:

1. **Home**

   - Hero with avatar/image, name, role, tagline
   - CTA buttons, animated scroll indicator
   - Smooth entrance animations

2. **Career / Experience**

   - Interactive timeline with role, company, period, technologies
   - Add micro-animations to emphasize progression
   - Less formal tone, conversational summaries

3. **Tech Stack & Skills**

   - Visual grid of logos/icons with hover tooltips
   - Group skills by category (frontend, backend, tools, etc.)

4. **Projects**

   - Grid or carousel showcasing each project
   - Must include: image, tech stack, description, GitHub/demo links
   - Filterable by tech or category
   - Include placeholder cards for future apps to tease roadmap

5. **GitHub Stats**

   - Use GitHub API or a widget to show contributions, repos, stars

6. **Roadmap / Goals**

   - Dynamic list of upcoming apps and ideas
   - Personal notes, “in-progress” tags, visual indicators

7. **Blog**

   - Markdown or CMS-based blog engine
   - Categories like "Tutorials", "Opinions", "Teasers", "Product Updates"
   - Optional social embeds (X, Instagram, YouTube, etc.)

8. **Contact**

   - Responsive form with validation
   - Social media links, LinkedIn, GitHub
   - Consider adding QR code to CV or business card

9. **404 Page**

   - Stylized error message with animation
   - Button to return home

10. **Navbar & Footer**
    - Sticky, responsive, animated
    - Navbar with route transitions and scroll-aware behavior
    - Footer includes legal, GitHub, and social links

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

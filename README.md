# Black Llama Tours and Travels Website

A modern, mobile-first static website for Black Llama Tours and Travels, a Kathmandu-based tour operator specializing in Himalayan adventures, cultural heritage tours, and wildlife safaris in Nepal.

## Project Structure

```
black-llama-tours/
├── index.html
├── netlify.toml
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
├── README.md
├── public/
│   └── favicon, robots.txt, etc.
├── assets/
│   └── images/               (hero/ tours/ gallery/)
└── src/
    ├── main.ts                        # entry point
    ├── styles/
    │   └── base.css                   # Tailwind directives + custom layers
    ├── data/
    │   └── tours.ts                   # typed tour package data
    ├── types/
    │   └── tour.ts                    # Tour, Destination, TourType interfaces
    ├── sections/                      # one file per page section
    │   ├── hero.ts
    │   ├── about.ts
    │   ├── tours.ts
    │   ├── gallery.ts
    │   ├── whyBookWithUs.ts
    │   ├── contact.ts
    │   └── footer.ts
    ├── components/                    # reusable render functions
    │   ├── navbar.ts
    │   ├── tourCard.ts
    │   ├── filterBar.ts
    │   ├── floatingContactButtons.ts
    │   └── inquiryForm.ts
    ├── lib/
    │   ├── contactLinks.ts            # contact link builders
    │   ├── animations.ts              # GSAP animations
    │   └── smoothScroll.ts            # Lenis smooth scroll
    └── utils/
        └── dom.ts                     # DOM helpers
```

## Tech Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety and better editor support
- **Tailwind CSS** - Utility-first styling with custom theme
- **GSAP** - Scroll-triggered animations and hero entrance
- **Lenis** - Smooth scrolling experience

## Local Development

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

## Editing Content

### Tour Packages

All tour data is centralized in `src/data/tours.ts`. To add, edit, or remove tours:

1. Open `src/data/tours.ts`
2. Modify the `tours` array following the `Tour` interface
3. Changes will automatically reflect in the Tours section

### Contact Information

Contact details are managed in `src/lib/contactLinks.ts`:

- Phone number: Update the `PHONE_NUMBER` constant
- Email: Update the `EMAIL` constant

These changes will propagate to all CTAs across the site (hero, tour cards, contact section, footer, floating buttons).

### Styling

The design system is configured in `tailwind.config.js`:

- **Colors**: snow, surface, ink, slate, accent, glacier, line
- **Fonts**: Archivo Black (headings), Inter (body)

To adjust the color palette or fonts, modify the `theme.extend` section in `tailwind.config.js`.

## Deployment

This site is configured for Netlify deployment via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

To deploy:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Netlify will automatically build and deploy using the configuration in `netlify.toml`

## Mobile Responsiveness

**Critical**: This site is designed mobile-first. Before deploying, test at these widths:

- **375px** (iPhone SE, small phones)
- **390px** (iPhone 12/13/14)
- **768px** (tablet breakpoint)

Key mobile considerations:

- All sections use `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8` for proper centering
- No fixed pixel widths that could cause horizontal scroll
- Tap targets are minimum 44x44px per accessibility guidelines
- Floating contact buttons respect `env(safe-area-inset-bottom)` for iOS home bar
- Navbar collapses to hamburger menu below `md:` breakpoint
- Tour grid: `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3`

## Features

- **Single-page scrolling** with smooth navigation
- **Filterable tour grid** by destination and tour type
- **Click-to-call and SMS** functionality throughout
- **Prefilled inquiry form** that generates SMS or email links
- **Floating contact buttons** for easy mobile access
- **GSAP animations** with `prefers-reduced-motion` support
- **Lenis smooth scrolling** with fallback for reduced motion
- **Fully responsive** design from 375px to desktop

## Business Info

- **Name**: Black Llama Tours and Travels
- **Address**: Saatghumti, Thamel, Kathmandu, Nepal
- **Phone**: +977 9861242810
- **Email**: llamamt.28treks@gmail.com

## License

Copyright © 2026 Black Llama Tours and Travels. All rights reserved.

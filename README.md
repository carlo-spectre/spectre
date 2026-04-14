# Spectre Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS.

## Features

- 🎨 Beautiful, modern design
- 📱 Fully responsive
- ⚡ Fast and lightweight
- 🎯 Smooth scrolling navigation
- 📧 Contact form
- 🎭 Gradient animations

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Hooks** - State management

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

### Build

```bash
npm run build
```

## CMS

- Strapi admin panel: `https://cms.spectredesign.studio/admin`
- Public portfolio content is fetched from Strapi REST endpoints.

### Configure Strapi URL

1. Copy `.env.example` to `.env`
2. Set:
   - `VITE_STRAPI_URL` (example: `https://cms.spectredesign.studio`)

### Strapi API requirements

- Collection type: `project`
- Public role permissions: allow `find` and `findOne` for `project` only.
- Required fields consumed by frontend:
  - `idNumber`, `slug`, `title`, `tag`, `timeframe`, `role`, `team`
  - `summary`, `challenge`
  - `goals`, `process`, `outcome`
  - `contextParagraphs`, `rationaleParagraphs`
  - `thumbnail` (single media), `supportingImages` (multiple media)

### Security note

Strapi should be the only write surface for content updates. Keep admin access restricted and expose read-only API permissions publicly.

## Customization

1. **Update Hero Section** - Edit `src/components/Hero.jsx` to change your name and tagline
2. **Add/Manage Projects** - Edit entries in Strapi admin (`/admin`)
3. **Update Skills** - Edit skill categories in `src/components/Skills.jsx`
4. **Change Colors** - Modify the primary color palette in `src/index.css` using the `@theme` directive
5. **Update Contact** - Change social links and email in `src/components/Contact.jsx`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx    # Navigation bar
│   ├── Hero.jsx      # Hero section
│   ├── About.jsx     # About section
│   ├── Projects.jsx  # Projects showcase
│   ├── Skills.jsx    # Skills section
│   └── Contact.jsx   # Contact form
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## License

MIT

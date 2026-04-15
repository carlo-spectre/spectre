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

- CMS login page: `/cms/login`
- CMS dashboard: `/cms`
- Default local demo login:
  - Email: `admin@spectre.local`
  - Password: `spectre123`

### Configure CMS credentials

1. Copy `.env.example` to `.env`
2. Set:
   - `VITE_CMS_EMAIL`
   - `VITE_CMS_PASSWORD_SALT`
   - `VITE_CMS_PASSWORD_HASH`
   - `VITE_CMS_ROLE`

Generate a password hash with PBKDF2-SHA256:

```bash
node -e "const crypto=require('crypto');const password='YOUR_PASSWORD';const salt='YOUR_SALT';console.log(crypto.pbkdf2Sync(password,salt,120000,32,'sha256').toString('hex'))"
```

### Security note

This CMS is frontend-only and intended for lightweight/local content management. For production security, move authentication and authorization to a backend (server-side sessions/JWT, rate limiting, audit logs, and RBAC).

## Customization

1. **Update Hero Section** - Edit `src/components/Hero.jsx` to change your name and tagline
2. **Add/Manage Projects** - Use `/cms` or edit `src/data/projects.js`
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

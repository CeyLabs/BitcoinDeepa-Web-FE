# BitcoinDeepa-Web-FE
Learn, connect, and grow with Sri Lanka’s Bitcoin community from grassroots meetups to Bitcoin Deepa initiatives by Pearl of Satoshi.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/) (the only lockfile is `pnpm-lock.yaml`; don't commit bun/npm lockfiles)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CeyLabs/BitcoinDeepa-Web-FE.git
   cd BitcoinDeepa-Web-FE
   ```

2. **Install dependencies**
   ```bash
   corepack enable   # picks up the pnpm version pinned in package.json
   pnpm install
   ```

3. **Set up environment variables**
   
Create a `.env` file in the root directory of the project and add the following environment variables:

```env
NEXT_PUBLIC_UUID=
GHOST_CONTENT_API_KEY=
GHOST_API_URL=
NEXT_PUBLIC_LUMA_CALENDAR_ID=
GITHUB_TOKEN=
```

#### Environment Variables Description

- `NEXT_PUBLIC_UUID`: Unique identifier for the application
- `GHOST_CONTENT_API_KEY`: API key for Ghost CMS to fetch blog content
- `GHOST_API_URL`: Base URL for your Ghost CMS instance
- `NEXT_PUBLIC_LUMA_CALENDAR_ID`: Luma Calendar ID
- `GITHUB_TOKEN`: GitHub PAT for authenticating and fetching data from private repositories.

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── blog/posts/   # Blog posts API
│   ├── privacy-policy/   # Privacy policy page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # Reusable UI components
│   ├── hero.tsx          # Hero section
│   ├── features.tsx      # Features section
│   ├── community.tsx     # Community section
│   ├── bitcoin-card.tsx  # Bitcoin card component
│   ├── events.tsx        # Events section
│   ├── blog-section.tsx  # Blog section
│   ├── faq.tsx           # FAQ section
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Additional styles
└── types/                # TypeScript type definitions
```

## 🎨 Key Components

- **Hero**
- **Features Section**
- **Community Section**
- **BitcoinCard**
- **Events**
- **BlogSection**
- **FAQ**

## 🔧 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build production bundle (also type-checks)
- `pnpm start`: Start production server
- `pnpm typecheck`: Type-check without building

## License

This project is released under the [MIT License](LICENSE). See the [license page](https://bitcoindeepa.com/license) on the website for details.

Built with ❤️ by Bitcoin දීප Team

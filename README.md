# 🚀 AI Prompter

A powerful, modern Next.js web application that transforms app ideas into professional, structured AI development prompts. Perfect for developers, students, and product managers who want to leverage AI coding assistants like ChatGPT, Claude, or GitHub Copilot.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Features
- 📝 **Step-by-Step Wizard** - Guided form experience with 5 easy steps
- 🎯 **8+ Pre-built Templates** - E-Commerce, SaaS, Social, Blog, and more
- 📋 **One-Click Copy** - Instantly copy prompts to clipboard
- 💾 **Prompt History** - Auto-save and access previous prompts
- 🌗 **Dark Mode** - Beautiful light and dark themes
- 📱 **PWA Support** - Install as a mobile app

### Modern UI/UX
- 🎨 **Glassmorphism Design** - Stunning modern visual style
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🎉 **Confetti Celebration** - Delightful generation completion
- 📊 **Animated Stats** - Engaging number counters
- 🔄 **Skeleton Loading** - Polished loading states

### Technical Excellence
- ⚡ **Fast & Lightweight** - No database, pure client-side
- 🔒 **Privacy First** - All data stays in your browser
- ♿ **Accessible** - WCAG 2.1 compliant
- 🎹 **Keyboard Shortcuts** - Power user support
- 🛡️ **Error Boundaries** - Graceful error handling

## 🎯 Use Cases

- Convert app ideas into actionable AI prompts
- Create detailed specifications for AI coding assistants
- Plan application architecture with AI assistance
- Generate comprehensive project requirements
- Streamline communication with AI development tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Celebration**: Canvas Confetti
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saqibnawazkhan/AI-Prompter.git
   cd ai-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Quick Start

1. Click "Get Started Free" on the homepage
2. Choose a template or start from scratch
3. Fill out the 5-step wizard form
4. Click "Generate Prompt"
5. Copy your professional AI prompt!

### Using Templates

Templates pre-fill common configurations for:
- 🛒 E-Commerce Store
- 💼 SaaS Dashboard
- 📱 Social Media App
- 📝 Blog Platform
- ✅ Task Manager
- 🎨 Portfolio Website
- 💪 Fitness Tracker
- 🤖 AI Chatbot

### Keyboard Shortcuts

- `Ctrl/Cmd + K` - Open command menu
- `Ctrl/Cmd + C` - Copy prompt
- `Ctrl/Cmd + Enter` - Generate prompt
- `Escape` - Close panels/modals

## 📁 Project Structure

```
ai-prompt-generator/
├── app/
│   ├── page.tsx              # Main page with state management
│   ├── layout.tsx            # Root layout with providers
│   ├── not-found.tsx         # Custom 404 page
│   └── globals.css           # Global styles & animations
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Tooltip.tsx
│   ├── Hero.tsx              # Landing page hero
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Site footer
│   ├── StepWizard.tsx        # Form wizard
│   ├── TemplateSelector.tsx  # Template picker
│   ├── PromptOutput.tsx      # Generated prompt display
│   ├── HistoryPanel.tsx      # Saved prompts sidebar
│   ├── Stats.tsx             # Statistics section
│   ├── HowItWorks.tsx        # Process steps
│   ├── FeaturesSection.tsx   # Features grid
│   ├── Testimonials.tsx      # User reviews
│   ├── FAQ.tsx               # FAQ accordion
│   ├── CTA.tsx               # Call to action
│   └── ...                   # More components
├── hooks/
│   ├── useHistory.ts         # Prompt history management
│   ├── useConfetti.ts        # Celebration effects
│   ├── useKeyboardShortcuts.ts
│   ├── useFocusTrap.ts
│   └── useMediaQuery.ts
├── context/
│   └── ThemeContext.tsx      # Dark mode context
├── data/
│   └── templates.ts          # Pre-built templates
├── types/
│   └── index.ts              # TypeScript interfaces
├── lib/
│   └── utils.ts              # Utility functions
└── public/
    └── manifest.json         # PWA manifest
```

## 🎨 Components

### UI Components
- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Input** - Text inputs and textareas with labels
- **Card** - Flexible card container with header/footer
- **Badge** - Status indicators with colors
- **Tooltip** - Hover information displays

### Feature Components
- **ScrollToTop** - Floating scroll button
- **PageTransition** - Animated page switches
- **EmptyState** - Placeholder for empty content
- **ErrorBoundary** - Graceful error handling
- **ProgressBar** - Step progress indicator
- **Skeleton** - Loading state placeholders
- **AnimatedCounter** - Number animations
- **CopyButton** - Clipboard copy with feedback

## 📄 Generated Prompt Structure

The generated prompt includes:

1. **Project Overview** - App details and purpose
2. **Tech Stack** - Technologies and tools
3. **Functional Requirements** - Core and optional features
4. **Non-Functional Requirements** - Performance, security
5. **UI/UX Guidelines** - Design specifications
6. **AI Features** - Automation and AI integration
7. **Database Structure** - Data architecture
8. **APIs & Integrations** - Third-party services
9. **Deployment Instructions** - Step-by-step guide
10. **Deliverables** - Expected outputs
11. **Implementation Guide** - Action steps

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Saqibnawazkhan/AI-Prompter)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://framer.com/motion)
- Icons by [Lucide](https://lucide.dev)
- Inspired by the need for better AI-developer communication

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Saqibnawazkhan/AI-Prompter/issues) on GitHub.

---

**Made with ❤️ by [Saqib Nawaz Khan](https://github.com/Saqibnawazkhan)**

*Transform your ideas into code with AI*

# 🚀 AI Prompt Generator

A powerful Next.js web application that converts app ideas into professional, structured AI development prompts. Perfect for developers, students, and product managers who want to leverage AI coding assistants like ChatGPT, Claude, or GitHub Copilot.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 📝 **Comprehensive Form Input** - Capture all essential app details
- 🎯 **Template-Based Generation** - Professional prompt structure
- 📋 **Copy to Clipboard** - One-click copy functionality
- 💾 **Download as Markdown** - Save prompts for later use
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Fast & Lightweight** - No database, pure client-side
- 🔄 **Reusable** - Generate unlimited prompts

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
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Generating a Prompt

1. Fill out the form with your app details:
   - **Required fields**: App Type, Platform, Core Features, Complexity Level
   - **Optional fields**: All other fields (smart defaults applied)

2. Click "🚀 Generate AI Prompt"

3. Your structured prompt will be displayed with options to:
   - 📋 Copy to clipboard
   - 💾 Download as .md file
   - 🔄 Create a new prompt

### Using the Generated Prompt

1. Copy the generated prompt
2. Open ChatGPT, Claude, or any AI coding assistant
3. Paste the entire prompt
4. The AI will build your application following the specifications

## 📁 Project Structure

```
ai-prompt-generator/
├── app/
│   ├── page.tsx              # Main page with prompt generation logic
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── PromptForm.tsx        # Input form component
│   └── PromptOutput.tsx      # Output display component
├── types/
│   └── index.ts              # TypeScript interfaces
├── public/                   # Static assets
├── README.md                 # Documentation
└── package.json              # Dependencies
```

## 🎨 Input Fields

### Required Fields
- Application Type (Web/Mobile/Desktop)
- Platform/Tech Stack
- Core Features
- Complexity Level

### Optional Fields
- App Name
- App Purpose
- Target Users
- Optional Features
- Design Preferences
- Authentication (Yes/No)
- Database Type
- AI Features
- APIs & Integrations
- Performance Requirements
- Security Requirements
- Deployment Preference

## 📄 Generated Prompt Structure

The generated prompt includes:

1. **Project Overview** - High-level app description
2. **Tech Stack** - Technologies and tools
3. **Functional Requirements** - Core and optional features
4. **Non-Functional Requirements** - Performance, security
5. **UI/UX Guidelines** - Design specifications
6. **AI Features** - Automation and AI integration
7. **Database Structure** - Data architecture (if applicable)
8. **APIs & Integrations** - Third-party services
9. **Deployment Instructions** - Step-by-step deployment
10. **Deliverables** - Expected outputs
11. **Constraints & Notes** - Project boundaries
12. **Assumptions** - Smart defaults applied
13. **Implementation Instructions** - Action steps

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

### Deploy to Other Platforms

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Inspired by the need for better AI-developer communication

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ for the developer community**

*Transform your ideas into code with AI*

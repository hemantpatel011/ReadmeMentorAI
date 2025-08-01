# 🎯 Readme Mentor

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-green?style=flat-square&logo=supabase)](https://supabase.com/)

> **AI-Powered README Generator for Developers** ✨

Transform your GitHub repositories with professional, AI-generated README.md files. Perfect for students, developers, and open-source contributors who want to showcase their projects with polished documentation.

![Readme Mentor Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Readme+Mentor+Preview)

## 🚀 Features

- **🤖 AI-Powered Analysis** - Multi-model AI pipeline using OpenRouter and Gemini APIs
- **📁 Smart Code Detection** - Automatically detects tech stack, dependencies, and project structure
- **🎨 Professional Templates** - Beautiful, responsive README templates with proper markdown formatting
- **⚡ Lightning Fast** - Generate comprehensive READMEs in seconds
- **🔐 Secure Authentication** - Supabase Auth with GitHub OAuth integration
- **📱 Mobile Responsive** - Works perfectly on all devices
- **🌙 Dark/Light Mode** - Built-in theme switching
- **💾 Project History** - Save and manage your generated READMEs
- **📊 Analytics Dashboard** - Track your README generation activity

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Supabase Auth** - Authentication and user management
- **Next.js API Routes** - Server-side API endpoints

### AI Integration
- **OpenRouter API** - Access to Claude and other LLMs
- **Google Gemini** - Advanced text generation
- **GitHub API** - Repository analysis and data fetching

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account
- AI API keys (OpenRouter, Gemini)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/readme-mentor.git
cd readme-mentor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# AI API Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
REPLICATE_API_TOKEN=your_replicate_api_token_here

# GitHub API (optional, for higher rate limits)
GITHUB_TOKEN=your_github_token_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup
Set up your Supabase database with the required tables:

```sql
-- Users profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  full_name text,
  avatar_url text,
  github_username text
);

-- README generations table
create table readme_generations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  github_url text not null,
  repository_name text not null,
  generated_readme text not null,
  analysis_data jsonb,
  feedback_rating integer,
  feedback_text text
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table readme_generations enable row level security;

-- Policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view own generations" on readme_generations for select using (auth.uid() = user_id);
create policy "Users can insert own generations" on readme_generations for insert with check (auth.uid() = user_id);
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Basic Usage (No Account Required)
1. Visit the [Generate page](http://localhost:3000/generate)
2. Paste your public GitHub repository URL
3. Click "Generate" and wait for AI analysis
4. Review the generated README in the preview tab
5. Copy or download your professional README.md

### With Account (Recommended)
1. Sign up at [/auth](http://localhost:3000/auth)
2. Generate READMEs with full feature access
3. View your history in the [Dashboard](http://localhost:3000/dashboard)
4. Save and organize your generated READMEs

## 🏗️ Project Structure

```
readme-mentor/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   │   └── generate/      # README generation endpoint
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── generate/          # Main generation page
│   │   ├── pricing/           # Pricing page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable components
│   │   ├── layout/            # Layout components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # UI components
│   └── lib/                   # Utility libraries
│       ├── ai.ts              # AI service integrations
│       ├── github.ts          # GitHub API service
│       ├── supabase.ts        # Supabase configuration
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── .env.example              # Environment template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration

### AI Model Configuration
The application uses a multi-model approach for better results:

1. **OpenRouter (Claude)** - Primary analysis and structure detection
2. **Google Gemini** - README generation and polishing
3. **Fallback System** - Basic README generation if AI APIs fail

### GitHub API
- Public repositories work without authentication
- Add `GITHUB_TOKEN` for higher rate limits (5000 requests/hour)
- Private repositories require user authentication

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations (see Installation step 4)
3. Configure authentication providers (Email, GitHub OAuth)
4. Set up Row Level Security policies

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:
- Supabase credentials
- AI API keys
- GitHub token (optional)
- NextAuth secret and URL

### Database Migrations
Run the SQL migrations in your production Supabase instance before deploying.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution
- 🧠 Additional AI model integrations
- 🎨 New README templates
- 🔧 Performance optimizations
- 🐛 Bug fixes and improvements
- 📚 Documentation updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenRouter** - For providing access to state-of-the-art AI models
- **Google** - For the Gemini API
- **Supabase** - For the excellent backend-as-a-service platform
- **Vercel** - For seamless deployment and hosting
- **GitHub** - For the comprehensive API and platform
- **The Open Source Community** - For the amazing tools and libraries

## 📞 Support

- 📧 **Email**: support@readmementor.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/readme-mentor/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/readme-mentor/discussions)
- 📖 **Documentation**: [docs.readmementor.com](https://docs.readmementor.com)

## 🗺️ Roadmap

### v1.1 - Enhanced Features
- [ ] PDF export functionality
- [ ] Custom template creation
- [ ] Batch processing for multiple repositories
- [ ] Advanced analytics and insights

### v1.2 - Team Collaboration
- [ ] Team workspaces
- [ ] Shared template libraries
- [ ] Collaboration tools
- [ ] Enterprise features

### v2.0 - Advanced AI
- [ ] Image generation for project screenshots
- [ ] Video demo generation
- [ ] Multi-language README support
- [ ] Advanced customization options

---

<div align="center">

**Made with ❤️ for the developer community**

[🚀 Get Started](http://localhost:3000/generate) • [📚 Documentation](https://docs.readmementor.com) • [🌟 Star on GitHub](https://github.com/yourusername/readme-mentor)

</div>

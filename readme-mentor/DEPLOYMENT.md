# 🚀 Deployment Guide for Readme Mentor

This guide will help you deploy Readme Mentor to production using Vercel and configure all necessary services.

## 📋 Prerequisites

Before deploying, ensure you have:
- A GitHub account (for source code)
- A Vercel account (for hosting)
- A Supabase account (for database and auth)
- AI API accounts (OpenRouter, Google AI Studio)

## 🔧 Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 1.2 Database Schema
Run this SQL in the Supabase SQL Editor:

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

### 1.3 Authentication Settings
1. Go to Authentication → Settings
2. Enable Email authentication
3. Optional: Configure GitHub OAuth:
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Create new OAuth App with callback URL: `https://your-project.supabase.co/auth/v1/callback`
   - Add Client ID and Secret to Supabase

### 1.4 Get API Keys
1. Go to Settings → API
2. Copy your project URL and anon public key

## 🤖 Step 2: AI API Setup

### 2.1 OpenRouter API
1. Go to [OpenRouter](https://openrouter.ai)
2. Create an account
3. Generate an API key
4. Add credits to your account

### 2.2 Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Enable the Generative Language API

### 2.3 GitHub API (Optional)
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a classic token with `public_repo` scope
3. This increases rate limits from 60 to 5000 requests/hour

## 🚢 Step 3: Vercel Deployment

### 3.1 Fork and Deploy
1. Fork this repository to your GitHub account
2. Go to [Vercel](https://vercel.com)
3. Import your forked repository
4. Choose the "readme-mentor" folder as the root directory

### 3.2 Environment Variables
Add these environment variables in Vercel:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI API Keys
OPENROUTER_API_KEY=your_openrouter_api_key
GEMINI_API_KEY=your_gemini_api_key
REPLICATE_API_TOKEN=your_replicate_api_token

# GitHub API (optional)
GITHUB_TOKEN=your_github_token

# Next.js
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

### 3.3 Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

## 🔐 Step 4: Security Configuration

### 4.1 Supabase Auth Callback
1. In Supabase → Authentication → Settings
2. Add your Vercel domain to "Site URL": `https://your-project.vercel.app`
3. Add redirect URLs:
   - `https://your-project.vercel.app/dashboard`
   - `https://your-project.vercel.app/auth`

### 4.2 CORS Configuration
Supabase should automatically handle CORS for your domain, but verify in the settings if you encounter issues.

## 🧪 Step 5: Testing

### 5.1 Basic Functionality
1. Visit your deployed site
2. Try generating a README without signing up
3. Test user registration and login
4. Verify AI generation works

### 5.2 Error Monitoring
Consider adding error monitoring:
```bash
npm install @sentry/nextjs
```

## 📊 Step 6: Analytics (Optional)

### 6.1 Vercel Analytics
```bash
npm install @vercel/analytics
```

### 6.2 Google Analytics
Add GA4 tracking code to your layout.

## 🔧 Step 7: Custom Domain (Optional)

### 7.1 Vercel Custom Domain
1. Go to your project settings in Vercel
2. Add your custom domain
3. Configure DNS records as instructed

### 7.2 Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain.

## 🚨 Common Issues and Solutions

### Build Errors
- **Supabase URL Error**: Ensure environment variables are set correctly
- **Type Errors**: Run `npm run build` locally first
- **Missing Dependencies**: Check package.json and run `npm install`

### Runtime Errors
- **AI API Failures**: Check API keys and account credits
- **Auth Issues**: Verify Supabase callback URLs
- **Database Errors**: Ensure RLS policies are correctly set

### Performance Issues
- **Slow Loading**: Optimize images and enable Vercel's image optimization
- **API Rate Limits**: Add caching or implement request queuing

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key for AI models |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `REPLICATE_API_TOKEN` | No | Replicate API token (backup) |
| `GITHUB_TOKEN` | No | GitHub personal access token |
| `NEXTAUTH_SECRET` | Yes | Random secret for NextAuth |
| `NEXTAUTH_URL` | Yes | Your deployment URL |

## 🎯 Post-Deployment Checklist

- [ ] Test README generation with a sample repository
- [ ] Verify user registration and login
- [ ] Check responsive design on mobile devices
- [ ] Test dark/light mode toggle
- [ ] Ensure error pages work correctly
- [ ] Verify analytics are working (if configured)
- [ ] Test performance with realistic usage
- [ ] Set up monitoring and alerts

## 🆘 Support

If you encounter issues during deployment:
1. Check the [GitHub Issues](https://github.com/yourusername/readme-mentor/issues)
2. Review Vercel deployment logs
3. Check Supabase logs for database errors
4. Verify all environment variables are set correctly

## 🔄 Updates and Maintenance

To update your deployment:
1. Push changes to your GitHub repository
2. Vercel will automatically deploy the updates
3. Monitor the deployment logs for any issues

For database schema changes:
1. Run migrations in Supabase SQL Editor
2. Update your application code accordingly
3. Test thoroughly before deploying

---

**Congratulations! 🎉** Your Readme Mentor application should now be live and ready to help developers create amazing documentation.
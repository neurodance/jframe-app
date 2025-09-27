# Deployment Guide for JFrame App

## Prerequisites

1. **Supabase Account**: Sign up at https://supabase.com
2. **Vercel Account**: Sign up at https://vercel.com
3. **GitHub Account**: For repository hosting

## Step 1: Set up Supabase

1. Create a new Supabase project at https://supabase.com/dashboard
2. Once created, go to Settings → API
3. Copy these values:
   - `Project URL` → This will be your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → This will be your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Set up the database schema:
   - Go to SQL Editor in Supabase dashboard
   - Copy the entire contents of `supabase/schema.sql`
   - Run the SQL to create all tables and policies

5. Configure authentication:
   - Go to Authentication → Providers
   - Enable Email provider
   - Enable Google provider (optional):
     - Add your Google OAuth credentials
     - Set redirect URL: `https://your-domain.vercel.app/auth/callback`

## Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: JFrame authentication system"
```

## Step 4: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git remote add origin https://github.com/yourusername/jframe-app.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts and add environment variables when asked

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

## Step 6: Update Supabase URLs

After deployment, update these in Supabase:

1. Go to Authentication → URL Configuration
2. Update:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: Add `https://your-app.vercel.app/auth/callback`

## Step 7: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Go to Settings → Domains
3. Add your custom domain (e.g., jframe.ai)
4. Follow DNS configuration instructions

## Important Notes

- The app will fail to build without environment variables
- Email verification is required for production
- Configure SMTP in Supabase for custom email templates
- Monitor Supabase usage to stay within free tier limits

## Troubleshooting

### Build Errors
- Ensure all environment variables are set in Vercel
- Check that Supabase project is active

### Authentication Issues
- Verify redirect URLs in Supabase match your deployment URL
- Check that email confirmations are enabled/disabled as needed

### Database Errors
- Ensure schema.sql has been run successfully
- Check Row Level Security policies are enabled

## Next Steps

After successful deployment:

1. Test authentication flow
2. Create your first Jott
3. Configure payment processing (Stripe) for Pro plans
4. Set up monitoring and analytics
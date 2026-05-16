# FitBrain - AI-Powered Workout & Fitness Tracking Platform

A modern, production-ready Next.js 16 application for tracking workouts, managing fitness goals, and analyzing athletic performance with AI-powered insights.

## Features

- **User Authentication** - Secure login and registration with demo credentials
- **Workout Tracking** - Log exercises, duration, and calories burned
- **Dashboard Analytics** - Real-time charts showing workout progress and statistics
- **Session Management** - Complete workout history with detailed session information
- **Progress Monitoring** - Track strength gains, weight loss, and fitness goals
- **User Profiles** - Manage personal information and fitness preferences
- **Settings** - Customizable notifications, preferences, and security options
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Dark theme with smooth animations and intuitive navigation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: React Query, Axios
- **Charts & Analytics**: Recharts
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Project Structure

```
fitbrain/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Dashboard)
│   │   ├── workout/
│   │   ├── log/
│   │   ├── history/
│   │   ├── progress/
│   │   ├── profile/
│   │   └── settings/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   └── ui/
│       └── button-custom.tsx
├── lib/
│   ├── api/
│   │   └── client.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   └── utils.ts
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn/bun
- A modern web browser

### Installation

1. **Clone or extract the project**
   ```bash
   cd fitbrain
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API endpoint:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: demo@fitbrain.com
- **Password**: demo123456

## Pages & Routes

- `/` - Redirects to dashboard
- `/auth/login` - User login page
- `/auth/register` - User registration page
- `/dashboard` - Main dashboard with analytics
- `/dashboard/workout` - Start and manage workouts
- `/dashboard/log` - Log workout sessions
- `/dashboard/history` - View workout history
- `/dashboard/progress` - Track fitness progress
- `/dashboard/profile` - User profile management
- `/dashboard/settings` - Account settings

## API Integration

The app is configured to connect to the FitBrain backend API:
- **Base URL**: `https://fitbrain-production.up.railway.app`
- **Authentication**: Bearer token (JWT) in Authorization header
- **Interceptors**: Automatic token refresh and error handling

### API Endpoints Expected

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/verify

GET    /api/workouts
POST   /api/workouts
GET    /api/workouts/:id
PUT    /api/workouts/:id
DELETE /api/workouts/:id

GET    /api/exercises
POST   /api/exercises
GET    /api/exercises/:id

GET    /api/sessions
POST   /api/sessions
GET    /api/sessions/:id
POST   /api/sessions/:id/complete

GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/stats

GET    /api/analytics/dashboard
GET    /api/analytics/progress
GET    /api/analytics/performance
```

## Build & Deployment

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

### Deploy to Other Platforms

The app can be deployed to any platform that supports Node.js:

**Docker** (if applicable):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

**Docker Compose**:
```bash
docker-compose up -d
```

## State Management

### Zustand Stores

- **authStore**: User authentication, login, logout, user data
- **uiStore**: Sidebar state, mobile menu, theme, active tabs

### React Query

Configured for server-side data fetching and client-side caching with automatic background refetching.

## Styling & Design System

### Color Palette
- **Background**: Dark blue-gray (#0a141e)
- **Foreground**: Off-white (#f0f5ff)
- **Primary**: Bright blue (#3b82f6)
- **Secondary**: Slate (#1e293b)
- **Accent**: Green (#22c55e)
- **Muted**: Gray (#334155)

### Typography
- **Display Font**: Plus Jakarta Sans (headings)
- **Body Font**: Inter (body text)
- **Code Font**: Fira Code (monospace)

### Animations
- Fade in: 0.5s ease-in
- Slide up: 0.5s ease-out
- Staggered animations on component load

## Performance Optimizations

- Server Component rendering for improved initial load
- Image optimization with next/image
- CSS compression via Tailwind CSS 4
- React Compiler enabled for optimized renders
- Code splitting per route
- Automatic bundle optimization

## Security

- JWT-based authentication with secure token storage
- HTTPS enforcement (recommended for production)
- CORS headers configured for API requests
- Input validation on forms
- Secure password hashing (backend)
- Environment variables for sensitive data

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port Already in Use
```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` in environment variables
- Check backend API is running and accessible
- Review browser console for CORS errors
- Ensure authentication token is valid

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

## Contributing

When modifying the codebase:
1. Follow the existing component structure
2. Use TypeScript for type safety
3. Keep components focused and reusable
4. Follow Tailwind CSS conventions
5. Test responsive behavior on mobile devices

## License

Proprietary - All rights reserved

## Support

For issues and feature requests, contact the development team or visit the support portal.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Built with Next.js 16 & TypeScript**

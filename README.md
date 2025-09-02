# E-Commerce Admin Dashboard

A comprehensive **multi-tenant e-commerce admin dashboard** built with Next.js 13+ App Router, designed for managing multiple stores with complete CRUD operations for products, categories, orders, and more. Each user can create and manage multiple independent stores with full data isolation.

## 🚀 Features

- **Multi-Tenant Architecture** - Each user can create and manage multiple stores
- **Complete Store Management** - Products, categories, billboards, sizes, colors, and orders
- **Authentication & Authorization** - Secure user management with Clerk
- **Payment Processing** - Stripe integration for order payments
- **Image Management** - Cloudinary integration for product images
- **Data Visualization** - Revenue charts and analytics dashboard
- **Responsive Design** - Built with Tailwind CSS and shadcn/ui components
- **Type Safety** - Full TypeScript implementation
- **Real-time Updates** - Optimistic UI updates with proper error handling

## 🛠️ Technology Stack

### Core Framework
- **[Next.js 13.5.4](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.9.2](https://www.typescriptlang.org/)** - Static type checking
- **[React 18](https://reactjs.org/)** - UI library
- **[React DOM 18](https://reactjs.org/)** - DOM bindings for React

### Database & ORM
- **[Prisma 5.3.1](https://www.prisma.io/)** - Database ORM and migration tool
- **[MySQL](https://www.mysql.com/)** - Relational database (via DATABASE_URL)
- **[@prisma/client 5.3.1](https://www.prisma.io/docs/concepts/components/prisma-client)** - Auto-generated database client

### Authentication
- **[@clerk/nextjs 4.25.1](https://clerk.com/)** - Complete authentication solution
- Secure user management with sign-up/sign-in flows
- Session management and route protection

### UI Components & Styling
- **[Tailwind CSS 3.3.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives:
  - `@radix-ui/react-checkbox 1.3.3`
  - `@radix-ui/react-dialog 1.1.15`
  - `@radix-ui/react-dropdown-menu 2.1.16`
  - `@radix-ui/react-label 2.1.7`
  - `@radix-ui/react-popover 1.1.15`
  - `@radix-ui/react-select 2.2.6`
  - `@radix-ui/react-separator 1.1.7`
  - `@radix-ui/react-slot 1.2.3`
- **[Lucide React 0.542.0](https://lucide.dev/)** - Beautiful & consistent icons
- **[class-variance-authority 0.7.1](https://github.com/joe-bell/cva)** - Component variant management
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Conditional CSS class names
- **[tailwind-merge 3.3.1](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[tailwindcss-animate 1.0.7](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Dark/light mode support

### Data Management & Tables
- **[@tanstack/react-table 8.21.3](https://tanstack.com/table/v8)** - Powerful table components
- **[zustand 5.0.8](https://zustand-demo.pmnd.rs/)** - Small, fast state management

### Forms & Validation
- **[react-hook-form 7.62.0](https://react-hook-form.com/)** - Performant forms with validation
- **[@hookform/resolvers 5.2.1](https://github.com/react-hook-form/resolvers)** - Validation schema resolvers
- **[zod 3.22.2](https://zod.dev/)** - TypeScript-first schema validation

### External Services
- **[stripe 18.5.0](https://stripe.com/)** - Payment processing
- **[next-cloudinary 4.23.0](https://next.cloudinary.dev/)** - Image optimization and management
- **[axios 1.11.0](https://axios-http.com/)** - HTTP client for API requests

### UI Feedback & Interaction
- **[react-hot-toast 2.6.0](https://react-hot-toast.com/)** - Beautiful toast notifications
- **[cmdk 1.1.1](https://cmdk.paco.me/)** - Command palette interface

### Data Visualization
- **[recharts 3.1.2](https://recharts.org/)** - Chart library built with React and D3

### Utilities
- **[date-fns 4.1.0](https://date-fns.org/)** - Modern JavaScript date utility library

### Development Tools
- **[ESLint 8](https://eslint.org/)** - JavaScript/TypeScript linting
- **[eslint-config-next 13.5.4](https://nextjs.org/docs/basic-features/eslint)** - Next.js ESLint configuration
- **[Autoprefixer 10.4.21](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing
- **[PostCSS 8.5.6](https://postcss.org/)** - CSS transformation

## 📁 Project Structure

```
ecommerce-admin/
├── .env                            # Environment variables
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── middleware.ts                   # Clerk middleware for authentication
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── components.json                 # shadcn/ui component configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # Project documentation

├── actions/                        # Server actions for data fetching
│   ├── get-graph-revenue.ts        # Revenue analytics
│   ├── get-sales-count.ts          # Sales statistics
│   ├── get-stock-count.ts          # Inventory statistics
│   └── get-total-revenue.ts        # Revenue calculations

├── app/                            # Next.js 13+ App Router
│   ├── favicon.ico                 # App favicon
│   ├── globals.css                 # Global CSS styles
│   ├── layout.tsx                  # Root layout component
│   ├── page.module.css             # Page-specific styles
│   │
│   ├── (auth)/                     # Authentication route group
│   │   ├── layout.tsx              # Auth layout
│   │   └── (routes)/               # Auth routes
│   │       ├── sign-in/            # Sign-in pages
│   │       └── sign-up/            # Sign-up pages
│   │ 
│   ├── (dashboard)/[storeId]/      # Store-specific dashboard
│   │   ├── layout.tsx              # Dashboard layout with navbar
│   │   └── (routes)/               # Dashboard routes
│   │       ├── billboards/         # Billboards management
│   │       ├── categories/         # Categories management
│   │       ├── colors/             # Colors management
│   │       └── sizes/              # Sizes management
│   │       ├── products/           # Products management
│   │       ├── orders/             # Orders management
│   │       ├── settings/           # Store settings
│   │    
│   ├── (root)/                     # Root application routes
│   │   ├── layout.tsx              # Root layout
│   │   └── (routes)/               # Store selection/creation
│   │    
│   └── api/                        # API routes
│       ├── webhook/                # Stripe webhooks
│       ├── stores/                 # Store management API
│       └── [storeId]/              # Store-scoped API endpoints
│           ├── billboards/         # Billboard CRUD API
│           ├── categories/         # Category CRUD API
│           ├── checkout/           # Checkout/payment API
│           ├── colors/             # Color CRUD API
│           ├── products/           # Product CRUD API
│           └── sizes/              # Size CRUD API

├── components/                     # Reusable React components
│   ├── main-nav.tsx                # Main navigation elements
│   ├── navbar.tsx                  # Top navigation bar
│   ├── overview.tsx                # Analytics overview
│   ├── store-switcher.tsx          # Store selection component
│   ├── theme-toggle.tsx            # Dark/light mode toggle
│   │       
│   ├── modals/                     # Modal components
│   │   ├── alert-modal.tsx         # Confirmation dialogs
│   │   └── store-modal.tsx         # Store creation modal
│   │       
│   └── ui/                         # shadcn/ui base components
│       ├── alert.tsx               # Alert components
│       ├── api-alert.tsx           # API endpoint display
│       ├── api-list.tsx            # API documentation component
│       ├── badge.tsx               # Badge/status indicators
│       ├── button.tsx              # Button variants
│       ├── card.tsx                # Card containers
│       ├── checkbox.tsx            # Form checkboxes
│       ├── command.tsx             # Command palette
│       ├── data-table.tsx          # Data table with sorting/filtering
│       ├── dialog.tsx              # Modal dialogs
│       ├── dropdown-menu.tsx       # Dropdown menus
│       ├── form.tsx                # Form components
│       ├── heading.tsx             # Page headings
│       ├── image-upload.tsx        # Image upload widget
│       ├── input.tsx               # Form inputs
│       ├── label.tsx               # Form labels
│       ├── modal.tsx               # Base modal component
│       ├── popover.tsx             # Popover components
│       ├── select.tsx              # Select dropdowns
│       ├── separator.tsx           # Visual separators
│       └── table.tsx               # Table components

├── hooks/                          # Custom React hooks
│   ├── use-origin.tsx              # Get current origin URL
│   └── use-store-modal.tsx         # Store modal state management

├── lib/                            # Utility libraries
│   ├── prismadb.ts                 # Prisma database client
│   ├── stripe.ts                   # Stripe client configuration
│   └── utils.ts                    # Utility functions (cn, etc.)

├── prisma/                         # Database schema and migrations
│   └── schema.prisma               # Prisma database schema

├── providers/                      # React context providers
│   ├── modal-provider.tsx          # Modal state provider
│   ├── theme-provider.tsx          # Theme management
│   └── toast-provider.tsx          # Toast notifications

└── public/                         # Static assets
    └── (static files)              # Images, icons, etc.
```

## 🏗️ Database Schema

The application uses a **multi-tenant architecture** with the following data model:

```
Store (top-level tenant)
├── Billboards (marketing banners)
├── Categories (linked to billboards)
├── Sizes & Colors (product attributes)
├── Products (linked to categories, sizes, colors)
└── Orders (containing order items with products)
```

## ⚡ Getting Started

### Prerequisites

- **Node.js 18+**
- **npm/yarn/pnpm**
- **MySQL Database**
- **Clerk Account** (for authentication)
- **Stripe Account** (for payments)
- **Cloudinary Account** (for images)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/ecommerce_admin"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_STORE_URL=http://localhost:3001
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push the schema to your database
   npx prisma db push
   
   # Optional: Open Prisma Studio to manage data
   npx prisma studio
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npx prisma generate             # Generate Prisma client
npx prisma db push              # Push schema changes to database
npx prisma db pull              # Pull schema from database
npx prisma studio               # Open Prisma Studio GUI
npx prisma migrate dev          # Create and apply migrations
npx prisma migrate reset        # Reset database completely
npx prisma db seed              # Seed database (if seed script exists)
```

## 🏪 How It Works

### Multi-Tenant Architecture
1. **User Registration**: Users sign up via Clerk authentication
2. **Store Creation**: Each user can create multiple stores
3. **Data Isolation**: All data is scoped to specific stores via `storeId`
4. **Store Management**: Users can only access and modify their own stores

### Store Management Flow
1. **Setup**: Create store → Configure settings
2. **Catalog**: Add billboards → Create categories → Add sizes/colors → Create products
3. **Operations**: Manage inventory → Process orders → Track revenue

### API Architecture
- **RESTful Design**: Standard HTTP methods (GET, POST, PATCH, DELETE)
- **Store-Scoped**: All endpoints include `[storeId]` parameter
- **Protected**: Routes validate user authentication and store ownership
- **Type-Safe**: Full TypeScript integration with Prisma

## 🔐 Authentication & Security

- **Clerk Integration**: Complete authentication solution
- **Route Protection**: Middleware protects all dashboard routes
- **Store Ownership**: API validates user owns the store being accessed
- **Data Isolation**: Users can only access their own store data

## 💳 Payment Integration

- **Stripe Integration**: Secure payment processing
- **Webhook Handling**: Real-time payment status updates
- **Order Management**: Track payment status and order fulfillment

## 📱 Responsive Design

Built with mobile-first approach using:
- **Tailwind CSS**: Utility-first responsive design
- **shadcn/ui**: Accessible component primitives
- **Dark Mode**: Built-in theme switching

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build command and environment variables
- **Railway**: One-click deployment with database
- **Docker**: Use provided Dockerfile for containerization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Prisma Documentation](https://www.prisma.io/docs)
- Visit [Clerk Documentation](https://clerk.com/docs)
- Explore [shadcn/ui Documentation](https://ui.shadcn.com)

---

**Built with ❤️ using Next.js, TypeScript, Prisma, and Tailwind CSS**

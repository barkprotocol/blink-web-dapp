# BARK Blink As A Service
**proof of concept**

## Overview 

BARK Blink is a powerful component of Blink BaaS (Blink As A Service) that streamlines interactions with blockchain assets, particularly within the Solana ecosystem. It simplifies user engagement, enhances transaction efficiency, and provides developers with the tools needed to create rich, blockchain-enabled applications.

## Key Features

- **Marketing landing page** (`/`) with animated Terminal element
- **Pricing page** (`/pricing`) which connects to Stripe Checkout
- **Dashboard pages** with CRUD operations on users/teams
- **Basic RBAC** with Owner and Member roles
- **Subscription management** with Stripe Customer Portal
- **Email/password authentication** with JWTs stored to cookies
- **Global middleware** to protect logged-in routes
- **Local middleware** to protect Server Actions or validate Zod schemas
- **Activity logging system** for any user events

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - A powerful React framework for building server-side rendered applications.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - For storing user data, transaction records, and application metadata.
- **ORM**: [Drizzle](https://orm.drizzle.team/) - Simplifying database interactions with a type-safe API.
- **Payments**: [Stripe](https://stripe.com/) - For handling transactions and subscriptions.
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) - A component library for building responsive user interfaces.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/barkprotocol/blink-as-a-service
   cd blink-as-a-service
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- **User**: `test@test.com`
- **Password**: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- **Card Number**: `4242 4242 4242 4242`
- **Expiration**: Any future date
- **CVC**: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add Environment Variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. **`BASE_URL`**: Set this to your production domain.
2. **`STRIPE_SECRET_KEY`**: Use your Stripe secret key for the production environment.
3. **`STRIPE_WEBHOOK_SECRET`**: Use the webhook secret from the production webhook you created in step 1.
4. **`POSTGRES_URL`**: Set this to your production database URL.
5. **`AUTH_SECRET`**: Set this to a random string. `openssl rand -base64 32` will generate one.

# PrimeFlex - Cash Loan Platform

A modern, responsive cash loan platform built with Next.js, TypeScript, Tailwind CSS, and Supabase. PrimeFlex helps clients get short-term loans easily with a simple application process and quick approval.

## Features

- **Loan Application**: Multi-step loan application form with document upload
- **Client Portal**: View loan profile, outstanding balance, and payment history
- **Loan Qualification**: Check how much you qualify for based on your profile
- **Referral Program**: Earn R100 for loans under R1000 or R200 for loans over R1000
- **Authentication**: Secure login and registration system
- **Contact Integration**: WhatsApp integration for quick support
- **Responsive Design**: Beautiful white and blue theme, mobile-friendly

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PRIMEFLEX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase database**
   
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and run the SQL from `supabase/schema.sql`
   - Create storage buckets: `documents`, `payslips`, `bank_statements`, `id_documents`
   - Enable Row Level Security (RLS) policies as defined in the schema

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
PRIMEFLEX/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── apply/        # Loan application page
│   │   ├── profile/      # Client portal
│   │   ├── referral/     # Referral program
│   │   ├── contact/      # Contact page
│   │   ├── login/        # Authentication
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── lib/             # Utility functions
│       ├── utils.ts
│       └── supabase.ts
├── supabase/
│   └── schema.sql       # Database schema
├── public/             # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Database Schema

The application uses the following main tables:

- **users**: User profiles and authentication
- **loan_applications**: Loan application records
- **loans**: Active loans after approval
- **payments**: Payment schedules and history
- **documents**: Uploaded documents (payslips, bank statements, ID)
- **referrals**: Referral program tracking
- **referral_agents**: Professional referral agents
- **contact_messages**: Contact form submissions
- **audit_log**: System audit trail

See `supabase/schema.sql` for the complete schema.

## Features Overview

### Loan Application
- Multi-step form (Personal Info → Employment → Documents)
- Document upload for payslips, bank statements, and ID
- Real-time validation
- Application tracking

### Client Portal
- View outstanding balance
- Check available credit
- See loan qualification amount
- View active loans and progress
- Payment schedule and history
- Make payments

### Referral Program
- Unique referral codes
- Track referral statistics
- Commission tracking (R100/R200)
- Become a referral agent

### Contact
- WhatsApp integration (064 6911 623)
- Contact form
- Business hours and location

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your application URL | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp contact number | No |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## Legal Information

- **FSP**: 46378 (Financial Service Provider)
- **NCR CP**: 19963 (Registered Credit Provider)

## Support

For support, contact:
- WhatsApp: 064 6911 623
- Email: info@primeflex.co.za

## License

This project is proprietary. All rights reserved.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in `src/app/`
2. Add reusable components in `src/components/`
3. Update database schema in `supabase/schema.sql`
4. Test thoroughly before deploying

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for database access
- Enable Row Level Security (RLS) in Supabase
- Validate all user inputs
- Use HTTPS in production
- Regularly update dependencies

## Future Enhancements

- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Credit score integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered loan recommendations
- [ ] Document OCR processing
- [ ] Automated fraud detection

## Contributing

This is a proprietary project. External contributions are not accepted at this time.

# Circle Property - Production Full-Stack Application

## Architecture Overview

```
circle-property-fullstack/
├── frontend/                 # React/Next.js client application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   ├── types/          # TypeScript type definitions
│   │   └── styles/         # CSS/SCSS styles
│   ├── public/             # Static assets
│   ├── package.json
│   └── next.config.js
│
├── backend/                  # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Configuration files
│   ├── tests/              # API tests
│   ├── package.json
│   └── Dockerfile
│
├── shared/                   # Common code between frontend/backend
│   ├── types/              # Shared TypeScript interfaces
│   ├── constants/          # Shared constants
│   └── utils/              # Shared utility functions
│
├── deployment/               # Infrastructure & deployment
│   ├── docker-compose.yml  # Development environment
│   ├── docker-compose.prod.yml  # Production environment
│   ├── nginx/              # Reverse proxy configuration
│   └── scripts/            # Deployment scripts
│
└── docs/                     # Documentation
    ├── api/                # API documentation
    ├── architecture/       # System architecture docs
    └── deployment/         # Deployment guides
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **API Client**: Axios with React Query
- **Authentication**: NextAuth.js

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + Passport.js
- **Validation**: Zod
- **File Storage**: AWS S3
- **Email**: SendGrid

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Database**: PostgreSQL (containerized)
- **Caching**: Redis
- **Monitoring**: Winston + Morgan
- **Environment**: dotenv

## Development Setup

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
docker >= 20.0.0
docker-compose >= 2.0.0
```

### Quick Start
```bash
# Clone and setup
git clone <repository>
cd circle-property-fullstack

# Install dependencies
npm run install:all

# Setup environment
cp .env.example .env.local

# Start development environment
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Database: localhost:5432
```

## Production Deployment

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.circleproperty.ae
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://circleproperty.ae

# Backend (.env)
DATABASE_URL=postgresql://user:pass@db:5432/circleproperty
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_live_...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SENDGRID_API_KEY=...
```

### Deployment Commands
```bash
# Build production images
npm run build:prod

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

## API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/refresh      # Token refresh
POST /api/auth/logout       # User logout
```

### Service Endpoints
```
GET  /api/services          # List all services
POST /api/services/quote    # Request service quote
GET  /api/services/:id      # Get service details
```

### Portfolio Endpoints
```
POST /api/portfolio         # Create portfolio
GET  /api/portfolio/:id     # Get portfolio
PUT  /api/portfolio/:id     # Update portfolio
DELETE /api/portfolio/:id   # Delete portfolio
```

### Payment Endpoints
```
POST /api/payments/intent   # Create payment intent
POST /api/payments/confirm  # Confirm payment
GET  /api/payments/:id      # Get payment status
```

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- CORS configuration

### Data Protection
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection

### Compliance
- GDPR compliance for EU clients
- UAE data residency requirements
- AML/KYC data collection
- PCI DSS compliance for payments

## Performance Optimization

### Frontend
- Next.js ISR (Incremental Static Regeneration)
- Image optimization
- Code splitting
- CDN integration

### Backend
- Database indexing
- Query optimization
- Redis caching
- Connection pooling

### Infrastructure
- Docker multi-stage builds
- Nginx compression
- SSL/TLS termination
- Health checks

## Monitoring & Logging

### Application Monitoring
- Winston logging
- Error tracking (Sentry)
- Performance monitoring
- API response times

### Infrastructure Monitoring
- Docker container health
- Database performance
- Memory/CPU usage
- Network latency

## Development Workflow

### Git Workflow
```
main                 # Production branch
├── staging         # Staging branch
└── feature/*       # Feature branches
```

### Code Quality
- ESLint + Prettier
- Husky pre-commit hooks
- TypeScript strict mode
- Unit tests (Jest)
- Integration tests (Supertest)

### CI/CD Pipeline
1. Code commit triggers workflow
2. Run tests and linting
3. Build Docker images
4. Deploy to staging
5. Manual approval for production
6. Deploy to production
7. Health checks and monitoring

## Next Steps

1. **Phase 1**: Setup development environment
2. **Phase 2**: Migrate current prototype to frontend/
3. **Phase 3**: Build backend API
4. **Phase 4**: Integrate payment systems
5. **Phase 5**: Production deployment
6. **Phase 6**: Monitoring and optimization

## Support

For development questions, contact the engineering team.
For deployment issues, contact DevOps team.

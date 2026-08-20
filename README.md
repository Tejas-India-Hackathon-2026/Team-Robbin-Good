# ResourceLoop (E2G)

A full-stack B2B + B2C waste-to-resource marketplace platform that connects households, collection agents, businesses, and farmers in the circular economy lifecycle. Built for the Tejas India Hackathon 2026.

## Architecture

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  React SPA   │──────▶│  Spring Boot │──────▶│    MySQL     │
│  (port 3000) │ proxy │  (port 8081) │  JPA  │  resourceloop│
└──────────────┘       └──────────────┘       └──────────────┘
       │                       │
       │  Vite dev server      │  JWT Auth + RBAC
       │  Tailwind CSS 4       │  REST API
       │  Recharts             │  Spring Security
```

## Tech Stack

### Backend
- **Java 21** / **Spring Boot 3.3.2**
- Spring Security + JWT (JJWT 0.12.5)
- Spring Data JPA + Hibernate
- MySQL 8
- Lombok
- Maven

### Frontend
- **React 19** / **Vite 8**
- Tailwind CSS 4
- React Router 7
- Axios
- Recharts (charts + impact dashboard)

## Modules

### Module A — Household Waste Collection
Households request pickups. Auto-matched to collection agents in their city.

| Role | Capability |
|------|-----------|
| Household | Request pickup, choose waste category + sub-type, track status |
| Agent | View assigned pickups, claim self-assignment, collect with actual quantity |
| Admin | View all pickups, monitor agent activity |

### Module B — Waste Categorization & Collection
Plastic, Metal, Paper, E-Waste, Food Waste, Garden Waste — each with per-unit rate card.

### Module C — Rate Card & Payouts
Automatic payout calculation on collection.

| Waste Type | Rate |
|-----------|------|
| PLASTIC | ₹12/kg |
| METAL | ₹25/kg |
| PAPER | ₹6/kg |
| E_WASTE | ₹15/kg |
| FOOD_WASTE | ₹2/kg |
| GARDEN_WASTE | ₹1/kg |
| OTHER | ₹0.50/kg |

### Module D — Household Wallet
Track lifetime earnings, recent transactions, and wallet balance per household.

### Module E — Compost & Farmer Distribution
Collected biodegradable waste → compost batches → distributed to farmers with contact tracking.

### Module F — B2B Marketplace
Sellers list waste, buyers search and request purchases. 5% platform commission on completed transactions. Quantity validation prevents overselling — accepting one request auto-rejects all others for the same listing.

### Impact Dashboard
CO₂ savings calculated per transaction using waste-type-specific emission factors, visualized with Recharts.

## User Roles

| Role | Description |
|------|-------------|
| `BUSINESS_SELLER` | Lists waste inventory, accepts/rejects buyer requests |
| `BUSINESS_BUYER` | Searches listings, makes purchase requests |
| `HOUSEHOLD_USER` | Requests waste pickups, tracks wallet balance |
| `COLLECTION_AGENT` | Collects waste from households, credits wallets |
| `ADMIN` | Full platform overview — users, pickups, transactions, payments, compost |

## Getting Started

### Prerequisites
- Java 21
- Node.js 18+
- MySQL 8

### Database Setup
```sql
CREATE DATABASE resourceloop;
```

### Backend
```bash
# From project root
mvn clean compile
# Run from IntelliJ using Java 21, or:
mvn spring-boot:run
```

Backend starts on `http://localhost:8081`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend starts on `http://localhost:3000` and proxies `/api` requests to the backend.

### First Run
Register any user. The admin account is pre-configured:

| Field | Value |
|-------|-------|
| Email | `admin@resourceloop.in` |
| Password | `admin123` |

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/auth/me` | Get current user profile |

### Marketplace (B2B)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/listings` | Create waste listing |
| GET | `/api/listings` | Search all listings |
| GET | `/api/listings/seller/{id}` | Seller's listings |
| POST | `/api/requirements` | Create buyer requirement |
| GET | `/api/requirements` | Search requirements |
| POST | `/api/transactions` | Create purchase request |
| GET | `/api/transactions/seller/{id}` | Seller's transactions |
| GET | `/api/transactions/buyer/{id}` | Buyer's transactions |
| PUT | `/api/transactions/{id}/accept` | Accept (auto-rejects others) |
| PUT | `/api/transactions/{id}/reject` | Reject request |
| PUT | `/api/transactions/{id}/complete` | Mark complete |
| GET | `/api/seller/dashboard` | Seller stats |
| GET | `/api/buyer/dashboard` | Buyer stats |

### Collection (Household)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pickup-requests` | Request a pickup |
| GET | `/api/pickup-requests/household/{userId}` | Household's pickups |
| GET | `/api/pickup-requests/assigned/{userId}` | Agent's pickups |
| PUT | `/api/pickup-requests/{id}/assign` | Assign agent |
| PUT | `/api/pickup-requests/{id}/claim` | Agent self-assign |
| PUT | `/api/pickup-requests/{id}/collect` | Agent collects waste |
| GET | `/api/household/dashboard` | Household dashboard + wallet |

### Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet/{userId}` | Get wallet balance |
| GET | `/api/wallet/{userId}/transactions` | Transaction history |
| POST | `/api/wallet/credit` | Manual wallet credit |

### Compost & Distribution
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/compost-batches` | All compost batches |
| GET | `/api/compost-batches/available` | Available for distribution |
| POST | `/api/compost-batches/{id}/distribute` | Distribute to farmer |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Platform-wide stats |
| GET | `/api/admin/users` | All users |
| GET | `/api/admin/pickups` | All pickups |
| GET | `/api/admin/transactions` | All transactions |

## Project Structure

```
e2g/
├── src/main/java/com/kshitij/
│   ├── auth/                    # JWT authentication
│   ├── user/                    # User entity + roles
│   ├── admin/                   # Admin dashboard
│   ├── collection/              # Pickup, wallet, compost, agent
│   ├── marketplace/             # B2B listings, transactions
│   ├── impact/                  # CO2 estimation
│   ├── security/                # JWT filter + Spring Security
│   ├── config/                  # CORS, config
│   └── common/                  # Exceptions, ApiResponse
│
├── frontend/src/
│   ├── components/
│   │   ├── agent/               # Collection agent UI
│   │   ├── business/            # Seller + buyer UI
│   │   ├── household/           # Pickup requests + wallet
│   │   ├── admin/               # Admin panels
│   │   └── impact/              # CO2 dashboard
│   ├── pages/                   # Route-level dashboards
│   ├── context/                 # Auth state
│   ├── services/                # API client
│   └── utils/                   # Constants, labels
│
├── pom.xml
└── frontend/
    ├── package.json
    └── vite.config.js
```

## License

Built for Tejas India Hackathon 2026 — Team Robbin Good.

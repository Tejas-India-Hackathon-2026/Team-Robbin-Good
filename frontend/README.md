# ResourceLoop

ResourceLoop is a web platform for managing reusable materials and connecting the people and businesses involved in the collection cycle.

The application supports material listings, marketplace requests, pickups, rewards, aggregation batches, and impact tracking through role-based dashboards.

## Stack

**Frontend**

- React 19
- React Router
- Tailwind CSS
- Vite

**Backend**

- Java 17
- Spring Boot
- Spring Security with JWT authentication
- Spring Data JPA
- MySQL

## Requirements

Install the following before running the project:

- Java 17 or later
- Maven
- Node.js and npm
- MySQL

Create a MySQL database called `resourceloop`. Set the database username and password in `src/main/resources/application.properties`.

## Getting Started

### 1. Start the backend

Run this command from the repository root:

```bash
mvn spring-boot:run
```

The backend starts on `http://localhost:8081`.

### 2. Start the frontend

Open a second terminal in the `frontend` directory:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

Run these commands from `frontend`:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Check the source code
npm run preview   # Preview the production build
```

## Features

- Secure registration, login, and JWT-based authentication
- Role-based dashboards with tailored workflows for each type of user
- Material listing creation and marketplace search
- Buyer requests and seller request management
- Household pickup requests with collection status tracking
- Collection agent assignment and pickup completion workflows
- Household reward balance and transaction tracking
- Aggregation batch management and batch sales
- Seller, buyer, and household dashboard statistics
- Environmental impact reporting and progress tracking

## User Roles

- **Business sellers** can list materials and manage incoming requests.
- **Business buyers** can search listings and request materials.
- **Household users** can request pickups and track rewards.
- **Collection agents** can manage assigned pickups.
- **Administrators** can manage aggregation batches and platform operations.

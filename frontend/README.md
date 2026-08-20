# ResourceLoop

ResourceLoop is a circular-economy platform that connects businesses, households, collection agents, and administrators to manage reusable materials, listings, pickup requests, rewards, and impact reporting.

## Project Structure

- `src/main/java` - Spring Boot REST API
- `src/main/resources` - backend configuration
- `frontend` - React and Vite web application

## Technology

- Java 17 and Spring Boot
- Spring Security with JWT authentication
- Spring Data JPA and MySQL
- React 19, React Router, Tailwind CSS, and Vite

## Prerequisites

- Java 17+
- Maven
- Node.js and npm
- MySQL

Create a MySQL database named `resourceloop`, then update the datasource username and password in `src/main/resources/application.properties` for your local environment.

## Run the Backend

From the project root:

```bash
mvn spring-boot:run
```

The API runs on `http://localhost:8081` by default.

## Run the Frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

Vite will print the local frontend URL in the terminal. Other available commands are:

```bash
npm run build
npm run lint
npm run preview
```

## Main Features

- Role-based dashboards for sellers, buyers, households, collection agents, and administrators
- Material listing and marketplace requests
- Pickup request scheduling and collection tracking
- Household rewards and balance tracking
- Aggregation batch management
- Environmental impact dashboards

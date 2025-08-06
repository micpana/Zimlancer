# Zimlancer

Zimlancer is a freelance services marketplace designed for the Zimbabwean community. It allows freelancers to showcase their skills and services, and enables clients to get work done efficiently through project listings or on-demand service browsing.

## Features

- Freelancer profiles with listed services and pricing  
- Clients can post project requests and receive bids  
- Freelancers can place bids on open projects  
- Real-time messaging system between freelancers and clients  
- Browsable service listings for on-demand work  

## Tech Stack

- **Frontend**: ReactJS, Reactstrap (located in the `client` folder)  
- **Backend**: Node.js, Express.js, GraphQL API (located in the `server` folder)  
- **Database**: MongoDB  

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- MongoDB (local or remote instance)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/micpana/Zimlancer.git
cd Zimlancer
```

### 2. Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd ../server
npm install
```

---

## Running the Project

### 1. Start the backend

```bash
cd server
npm start
```

> Make sure MongoDB is running and environment variables (like DB URI and JWT secret) are set.

### 2. Start the frontend

In another terminal:

```bash
cd client
npm start
```

App will be available at `http://localhost:3000`

---

## Folder Structure

```
Zimlancer/
│
├── client/      → React frontend
├── server/      → Node.js backend with GraphQL
└── README.md
```

---

## Contributing

This is an early-stage project and still under development. Contributions and feedback are welcome.

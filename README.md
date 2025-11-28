# MicroMart - E-Commerce MFE Demo

A micro frontend demo using **Webpack Module Federation**.
### Build incredibly scalable apps with a microfrontend architecture
#### course from Stephen Grider

## Architecture

```
container (8080)  →  products (8081)
                 →  cart (8082)
```

## Quick Start

```bash
# Terminal 1
cd products && npm start

# Terminal 2
cd cart && npm start

# Terminal 3
cd container && npm start
```

Open **http://localhost:8080**

## Stack

- Webpack 5 Module Federation
- Faker.js for mock data


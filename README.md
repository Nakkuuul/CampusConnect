# CampusConnect — Lost & Found Platform

A full-stack lost and found web application built for Bennett University. Students, faculty, and staff can report lost or found items, browse posts, and submit verified claims to recover their belongings.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Axios |
| Backend | Node.js, Express.js (ESM) |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Upload | Multer |
| Validation | express-validator |
| Logging | Winston, Morgan |

---

## Project Structure

```
Samar/
├── frontend/                   # Next.js app
│   ├── app/
│   │   ├── browse/             # Browse all items
│   │   ├── claims/             # My claims
│   │   ├── components/         # Navbar, ItemCard
│   │   ├── dashboard/          # Dashboard
│   │   ├── item/[id]/          # Item detail
│   │   ├── login/              # Login
│   │   ├── register/           # Register
│   │   └── report/             # Report lost/found
│   ├── lib/
│   │   ├── api.ts              # Axios instance
│   │   └── services/           # auth, item, claims, user, dashboard
│   └── .env.local
│
└── backend/
    ├── src/
    │   ├── modules/
    │   │   ├── auth/           # Register, login, logout, me
    │   │   ├── item/           # CRUD + image upload + status flow
    │   │   ├── claims/         # Submit, review, withdraw
    │   │   ├── user/           # Profile + notifications
    │   │   ├── dashboard/      # Stats + recovery rates
    │   │   └── notification/   # Model + helper
    │   ├── middlewares/        # auth, error
    │   ├── config/             # env, db
    │   ├── utils/              # logger, response
    │   ├── routes/             # Central route loader
    │   └── app.js
    ├── uploads/                # Uploaded item images
    ├── server.js
    └── .env
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally on port 27017

### 1. Clone the repo

```bash
git clone <repo-url>
cd Samar
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
```

Create the uploads folder:

```bash
mkdir -p uploads
```

Start the server:

```bash
npm start
```

Backend runs at `http://localhost:5000`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Create account |
| POST | `/auth/login` | ❌ | Login and get token |
| POST | `/auth/logout` | ✅ | Logout |
| GET | `/auth/me` | ✅ | Get current user |

### Items

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/item` | ✅ | Browse items (supports `type`, `category`, `location`, `status`, `q`, `page`, `limit`) |
| GET | `/item/my` | ✅ | My posted items |
| GET | `/item/:id` | ✅ | Item detail |
| POST | `/item` | ✅ | Report lost/found item (multipart) |
| PATCH | `/item/:id/status` | ✅ | Update item status |
| DELETE | `/item/:id` | ✅ | Delete item |

### Claims

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/claims` | ✅ | Submit a claim |
| GET | `/claims/my` | ✅ | My claims |
| GET | `/claims/item/:itemId` | ✅ | Claims on an item |
| GET | `/claims/:id` | ✅ | Single claim |
| PATCH | `/claims/:id/review` | ✅ Staff/Faculty | Approve or reject |
| DELETE | `/claims/:id` | ✅ | Withdraw claim |

### User

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/user/profile` | ✅ | Get profile |
| PATCH | `/user/profile` | ✅ | Update name or role |
| GET | `/user/notifications` | ✅ | Get notifications |
| PATCH | `/user/notifications/read-all` | ✅ | Mark all as read |
| PATCH | `/user/notifications/:id/read` | ✅ | Mark one as read |

### Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | ✅ | Total items, resolved, pending claims, active users |
| GET | `/dashboard/recovery-rates` | ✅ | Recovery % per category |

---

## Database Collections

| Collection | Description |
|---|---|
| `users` | Registered university members |
| `items` | Lost and found item posts |
| `claims` | Ownership claims on found items |
| `notifications` | User notifications |

---

## Item Status Flow

```
posted → matched → claimed → resolved
```

- `posted` — item is live and visible
- `matched` — a claim has been submitted
- `claimed` — claim approved by admin
- `resolved` — item returned to owner

---

## Access from Other Devices (Local Network)

Update backend `.env`:

```env
CLIENT_ORIGIN=http://localhost:3000,http://<your-ip>:3000
```

Update `server.js` to bind on all interfaces:

```js
app.listen(env.port, '0.0.0.0', () => { ... })
```

Update frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://<your-ip>:5000/api
```

Start frontend on all interfaces:

```bash
npm run dev -- -H 0.0.0.0
```

---

## Reset Database

```bash
mongosh
use campusconnect
db.dropDatabase()
exit
```

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `NODE_ENV` | `development` or `production` |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing tokens |
| `JWT_EXPIRES_IN` | Token expiry (default `7d`) |
| `CLIENT_ORIGIN` | Comma-separated allowed origins |

### Frontend `.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

---

## Enrollment Number Format

Bennett University enrollment numbers follow this pattern:

```
S24CSEU0193
│ ││   │└─── 4-digit number
│ ││   └──── U (undergraduate)
│ │└──────── Department code (CSE, ECE, etc.)
│ └───────── 2-digit year
└─────────── Prefix letter
```

---

## License

MIT
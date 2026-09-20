# M3allem API

Express + TypeScript + MongoDB (Mongoose) backend for the M3allem app: a
Tunisian lead-generation marketplace where clients post service requests,
verified artisans spend purchased credits to unlock leads and send quotes,
and payment happens in cash outside the app.

## Stack

- Express 4, TypeScript
- MongoDB via Mongoose
- JWT auth (`jsonwebtoken`) with bcrypt password hashing (`bcryptjs`)
- Request validation with `zod`

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit MONGODB_URI / JWT_SECRET as needed
```

You need a real MongoDB instance reachable at `MONGODB_URI` — either a local
`mongod`, a Docker container (`docker run -d -p 27017:27017 mongo:7`), or a
free MongoDB Atlas cluster. This backend was developed and type-checked in a
sandboxed environment with no outbound access to download a MongoDB binary
or reach Docker Hub, so **it has not been exercised against a live
database** — only against the running Express app with the database calls
deliberately left unreachable (verifying routing, validation and auth
short-circuit correctly before ever touching the DB). Run the seed script
and a few requests from the list below the first time you point it at a
real database to confirm everything end-to-end.

```bash
npm run seed   # wipes and re-populates categories, credit packs, and demo accounts
npm run dev    # starts on http://localhost:4000 with ts-node-dev (auto-reload)
```

Demo accounts created by the seed script (password for all: `password123`):

| Role   | Email                       | Notes                                  |
|--------|------------------------------|-----------------------------------------|
| client | amira.haddad@email.com       | has one open request with 2 quotes, one completed+reviewed request |
| worker | mohamed.belhaj@email.com     | verified, 12 credits, has already unlocked the demo lead and sent a quote |
| worker | hedi.karray@email.com        | verified, 6 credits, has also unlocked and quoted the demo lead |
| worker | walid.trabelsi@email.com     | unverified, 3 credits, has not unlocked anything yet |

Production build: `npm run build && npm start`.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | HTTP port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/m3allem` | Mongo connection string |
| `JWT_SECRET` | — | Sign/verify auth tokens. Set a real secret outside development. |
| `JWT_EXPIRES_IN` | `30d` | Token lifetime |
| `CORS_ORIGIN` | `*` | Allowed origin(s) for the Expo app |

## Data model

- **User** — `client` or `worker`, bcrypt password hash, name/email/phone/city/language.
- **ArtisanProfile** — 1:1 with a `worker` User. Categories served, area, price
  range, verification `credentials` (CIN / auto-entrepreneur / referral /
  CNSS), rating aggregate, job count, credit balance, and the
  auto-entrepreneur `aeJourney` timeline.
- **Category** — bilingual (fr/ar) trade category with icon + color tint.
- **ServiceRequest** — a client's posted job: category, description, photos,
  address, budget range, status (`open` → `accepted` → `completed`, or
  `cancelled`), and `unlockedBy` (artisans who spent a credit to see full
  detail).
- **Quote** — an artisan's response to a request: price, time slot, message,
  status (`pending` / `accepted` / `declined`). Unique per (request, artisan).
- **Review** — one per completed request; rolls up into the artisan's
  rating aggregate on creation.
- **CreditPack** — purchasable credit bundles (name, credit count, price).
- **CreditTransaction** — audit log of every credit purchase/spend.

## API reference

All authenticated routes expect `Authorization: Bearer <token>`.

### Auth

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/api/auth/register` | — | `{ name, email, password, role, phone?, city?, language?, artisan? }` | `artisan` (`{ roleLabel: {fr,ar}, area, priceMin, priceMax, categoryIds[] }`) only used when `role: "worker"`; a worker profile is created with sensible defaults if omitted. |
| POST | `/api/auth/login` | — | `{ email, password }` | |
| GET | `/api/auth/me` | any | — | Returns `{ user }` for clients, `{ user, artisanProfile }` for workers. |

### Categories & artisans

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/categories` | — | List all trade categories. |
| GET | `/api/artisans/:id` | — | Public profile: user, artisan profile, recent reviews. `:id` is the artisan's **User** id. |

### Client: requests & quotes

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/requests` | client | `{ categoryId, description, photos[], address: {line, city, lat?, lng?}, budgetMin?, budgetMax? }` |
| GET | `/api/requests/mine` | client | Own requests, newest first. |
| GET | `/api/requests/:id` | any | Full detail if you own it, or you're a worker who has unlocked it / already quoted it; `403` otherwise. |
| GET | `/api/requests/:id/quotes` | client (owner) | Quotes received, each paired with the sending artisan's profile. |
| PATCH | `/api/requests/:id/quotes/:quoteId/accept` | client (owner) | Accepts one quote, declines the rest, moves the request to `accepted`. |
| POST | `/api/requests/:id/complete` | client (owner) | `accepted` → `completed`. |
| POST | `/api/requests/:id/review` | client (owner) | `{ rating: 1-5, text? }`; request must be `completed`; updates the artisan's rating aggregate. |

### Worker: leads, quotes, credits, AE journey

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/leads` | worker | Open requests in the artisan's categories. Unlocked leads show full detail; locked ones are redacted to category/city/budget/postedAt only. |
| POST | `/api/leads/:id/unlock` | worker | Spends 1 credit (idempotent if already unlocked), `402` if the balance is too low. |
| POST | `/api/requests/:id/quotes` | worker | `{ price, timeSlot, message? }`; requires the lead to be unlocked first; one quote per artisan per request. |
| GET | `/api/quotes/mine` | worker | Own sent quotes with the related request/category/client name. |
| GET | `/api/credits/balance` | worker | |
| GET | `/api/credits/packs` | — | |
| POST | `/api/credits/purchase` | worker | `{ packId }`; credits immediately (a real payment provider like Flouci/D17 would confirm the charge first). |
| GET | `/api/ae-journey` | worker | The artisan's auto-entrepreneur status timeline. |
| POST | `/api/ae-journey/advance` | worker | Marks the current `now` step `done` and starts the next one. |

## Connecting the Expo app

The React Native app (repo root, run `npm install && npm start` there) is
wired to this API: real login/register screens, a JWT stored via
`AsyncStorage`, and every screen fetching/mutating through `src/api/*.ts`.
There is no more mock data or client-side role switch — which app you see
(client or worker) is whichever role your account was registered with.

Point the app at this backend by setting `EXPO_PUBLIC_API_BASE_URL` (Expo
inlines `EXPO_PUBLIC_*` env vars automatically) before starting it, e.g.:

```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.23:4000/api npx expo start
```

- Defaults to `http://localhost:4000/api`, which works for the iOS
  simulator or Expo web running on the same machine as the API.
- On a physical phone via Expo Go, `localhost` refers to the phone itself —
  use your computer's LAN IP instead (as above).
- On the Android emulator, use `http://10.0.2.2:4000/api`.

The Login screen has "Démo client" / "Démo artisan" buttons that sign in
with the seeded demo accounts above, so there's no need to type credentials
to try it out once both the API and a MongoDB instance are running.

This integration was verified against a hand-written mock server that
mirrors this API's exact request/response shapes (registration, posting a
request, unlocking a lead, submitting and accepting a quote, purchasing
credits, advancing the AE journey, RTL/dark mode) rather than against a
live MongoDB, for the same sandboxing reason noted above. Point the app at
a real running instance of this backend to confirm the last mile.

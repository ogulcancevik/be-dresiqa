# Express TypeScript MongoDB Clerk Template

Basit, temiz ve büyümeye uygun bir Express.js backend başlangıcı.

## Neler Var?

- Express.js + TypeScript
- MongoDB bağlantısı için Mongoose
- Clerk auth middleware
- Zod ile environment validation
- Helmet, CORS, Morgan
- Health check ve protected user endpoint örneği
- Merkezi error handling

## Kurulum

```bash
npm install
cp .env.example .env
npm run dev
```

`.env` içinde en az şunları doldur:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/be-dresiqa
CLERK_SECRET_KEY=sk_test_...
```

## Scriptler

```bash
npm run dev        # development server
npm run build      # TypeScript build
npm start          # dist/server.js çalıştırır
npm run typecheck  # sadece type kontrolü
npm run lint       # Biome lint kontrolü
npm run format     # Biome format
npm run check      # Biome lint + format düzeltmeleri
```

## Endpointler

```txt
GET /api/health
GET /api/me
```

`/api/me` Clerk ile korunur. Frontend'den Clerk session token ile istek attığında kullanıcı bilgilerini döner.

## Klasör Yapısı

```txt
src
├── app.ts
├── server.ts
├── config
│   ├── database.ts
│   └── env.ts
├── middleware
│   ├── error-handler.ts
│   └── not-found.ts
├── routes
│   ├── health.routes.ts
│   ├── index.ts
│   └── me.routes.ts
└── utils
    └── logger.ts
```

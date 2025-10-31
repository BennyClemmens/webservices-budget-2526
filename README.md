# Web Services Budget App version 2025-2026

This time round, I'm keeping as close as possible to the instructions.

## 0.Software

- `settings.json` in `.vscode`, but with a lot of tweaks

## 2. Rest API intro

### Project opzetten

- Installing pnpm CLI on the system globally

```bash
pnpm add -g @nest/cli
```

Nest was allready installed on the system.

```PS
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526> nest --version
11.0.10
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526> pnpm list -g --depth=0
Legend: production dependency, optional only, dev only

C:\Users\benny\AppData\Local\pnpm\global\5

dependencies:
@nestjs/cli 11.0.10
```

- Creating a new nest project with the cli

```bash
nest new --strict webservices-budget

# Kies voor pnpm als package manager
```

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526> nest new --strict webservices-budget --package-manager pnpm
✨  We will scaffold your app in a few seconds..

CREATE webservices-budget/.prettierrc (54 bytes)
CREATE webservices-budget/eslint.config.mjs (869 bytes)
CREATE webservices-budget/nest-cli.json (179 bytes)
CREATE webservices-budget/package.json (2060 bytes)
CREATE webservices-budget/README.md (5134 bytes)
CREATE webservices-budget/tsconfig.build.json (101 bytes)
CREATE webservices-budget/tsconfig.json (699 bytes)
CREATE webservices-budget/src/app.controller.ts (286 bytes)
CREATE webservices-budget/src/app.module.ts (259 bytes)
CREATE webservices-budget/src/app.service.ts (150 bytes)
CREATE webservices-budget/src/main.ts (236 bytes)
CREATE webservices-budget/src/app.controller.spec.ts (639 bytes)
CREATE webservices-budget/test/jest-e2e.json (192 bytes)
CREATE webservices-budget/test/app.e2e-spec.ts (699 bytes)

✔ Installation in progress... ☕

🚀  Successfully created project webservices-budget
👉  Get started with the following commands:

$ cd webservices-budget
$ pnpm run start


                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.


               🍷  Donate: https://opencollective.com/nest
```

- removing .git directory in subdirectory

```bash
benny@FLAB2025 MINGW64 /D/DATA/GIT/WEBSERVICES/webservices-budget-2526/webservices-budget (main)
$ rm -rf .git
```

- `tsconfig.json`
  - `baseurl` optie verwijderd

### Health controller

```bash
nest generate controller health
```

```PS
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> nest g controller health
CREATE src/health/health.controller.ts (105 bytes)
CREATE src/health/health.controller.spec.ts (510 bytes)
UPDATE src/app.module.ts (330 bytes)
```

Keeping the unit test for now...

Replacing code in `src/healt/health.controller.ts` with course code.

### /api prefix

- `src/main.tx`
  - code for global prefix added
  - linting error fixed and some logging tweaks

### Debugger

- `.vscode/launch.json
  - NestJS debugger added to port 9229

### Adjust project README.md

- `webservices-budget\README.md` filled with project specific info.

## 3. REST API bouwen

### Datalaag

- Mock data (en interface) toegevoegd in `src/data/mock_data.ts`

### PlaceController

- controller gegenereerd met cli
- `GET /api/places` als string
- Route parameters: `id`
- `POST` route
- HTTP statuscodes
- Dto for creating a Place
- Pagination for the getAll()
- oefening
  - put method (met Dto)
  - delete method
  - algemene dto voor pagination

### Services

- generate place service
- dependency toegevoegd in constructor controller
- extra and refactored Dto's voor return types
- service methods for all crud operations
- using those services in the controller

### Exception handling

- `NotFoundException` in service toegevoegd
- as a result: `undefined` niet meer nodig
- handling for deletion of non existing place neccessary?

### Modules

- refactored controller and service into a module

### Configuration

- pnpm add @nestjs/config
- pnpm approve-builds
- `.env` file aangemaakt
- ConfigModule toegevoegd in app.module
- env variables gebruikt in main.ts

### CORS

- added to .env
- added in configuration
- used in main.ts

## 4. Datalaag en places

### MySQL in docker

- `docker-compose.yml` aangemaakt maar port 3306 mapped naar localhost 3307
- runt in docker desktop met WSL2 als provider, kan connecteren via Workbench
- phpmydamin added op locazlhost:8080
- secrets moved naar .env

### Installatie drizzle

- pnpm add drizzle-orm mysql2
- pnpm add -D drizzle-kit
- pnpm approve-builds
- variabele in .env
- READMe aangepast
- drizzle.config.ts aangemaakt
- config/configuration.ts aangevuld

### Drizzle connectie als provider

- nest generate module drizzle
- drizzle.provider.ts

### Databankschema definiëren

- src/drizzle/schema.ts
- schema imported in provider

### Connectie afsluiten

- lifecycle event voor sluiten connectie

### Migrations

- pnpm drizzle-kit generate

```bash
No config path provided, using default 'drizzle.config.ts'
Reading config file 'D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\drizzle.config.ts'
Reading schema files:
D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\src\drizzle\schema.ts

1 tables
places 3 columns 1 indexes 0 fks

[✓] Your SQL migration file ➜ migrations\0000_melted_jazinda.sql 🚀
```

- pnpm drizzle-kit migrate (after starting docker desktop/docker)

```bash
No config path provided, using default 'drizzle.config.ts'
Reading config file 'D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\drizzle.config.ts'
[✓] migrations applied successfully!
```

- scripts added in package.json

### Seeds

- seed script: srs/drizzle/seed.ts
- added to scripts in package.json
- dev dependencies: env-cmd & tsx

```bash
pnpm db:seed

> webservices-budget@0.0.1 db:seed D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget
> env-cmd tsx src/drizzle/seed.ts

🌱 Starting database seeding...

🗑️ Resetting database...
✅ Database reset completed

📍 Seeding places...
✅ Places seeded successfully

🎉 Database seeding completed successfully!
```

### use Drizzle in Services

- DrizzleModule imported in PlacesModule
- DrizzleProvider injected in PlaceService (constructor)
- getall method: async, await, Promise
- getall service: async, Promise
- getbyid
- create
- update
- delete

## 5. Relaties

### Schema aanvullen cfr. ERD

- schema.ts updated met nieuwe tabellen
- foreign keys toegevoegd
- realties

### Migratie maken en uitvoeren

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm db:generate

> webservices-budget@0.0.1 db:generate D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget
> drizzle-kit generate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\drizzle.config.ts'
Reading schema files:
D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\src\drizzle\schema.ts

4 tables
places 3 columns 1 indexes 0 fks
transactions 5 columns 0 indexes 2 fks
user_favorite_places 2 columns 0 indexes 2 fks
users 2 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ migrations\0001_loving_talos.sql 🚀
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm db:migrate

> webservices-budget@0.0.1 db:migrate D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget
> drizzle-kit migrate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget\drizzle.config.ts'
[✓] migrations applied successfully!
```

### Seeds aanvullen

- resetDatabase aangevuld
- seeds aangevuld
- seed uitgevoerd

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm db:seed

> webservices-budget@0.0.1 db:seed D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget
> env-cmd tsx src/drizzle/seed.ts

🌱 Starting database seeding...

🗑️ Resetting database...
✅ Database reset completed

👥 Seeding users...
✅ Users seeded successfully

📍 Seeding places...
✅ Places seeded successfully

💰 Seeding transactions...
✅ Transactions seeded successfully

💰 Seeding UserFavoritePlaces...
✅ UserFavoritePlaces seeded successfully

🎉 Database seeding completed successfully!
```

### PlaceService - getById

- aangepast om relaties te kunnen gebruiken
- bijpassende dto's aangemaakt
- return types in services en controller aangepast

### TransactionController

- module & controller aangemaakt

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm nest g module transaction
CREATE src/transaction/transaction.module.ts (92 bytes)
UPDATE src/app.module.ts (757 bytes)
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm nest g controller transaction --no-spec
CREATE src/transaction/transaction.controller.ts (115 bytes)
UPDATE src/transaction/transaction.module.ts (198 bytes)
```

- dto's aangemaakt
- non implemented routes in the transaction controller

### TransactionService

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm nest g service transaction --no-spec
CREATE src/transaction/transaction.service.ts (99 bytes)
UPDATE src/transaction/transaction.module.ts (298 bytes)
```

- nieuwe service TransactionService die enkel errors gooit
- imported and exported in module

### Implementatie TransactionService

- getAll
  - db in constructor
  - method in TransactionService
  - import Drizzle in Module
  - import Service in Controller
- andere crud operaties
  - getbyid
  - create
  - delete
  - update, nu ook met andere userId mogelijk

### Favorite places

- getFavoritePlacesByUserId in place.service
- hangt onder user dus:
  - aanmaken modules, controller, route

```bash
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm nest g module user
CREATE src/user/user.module.ts (85 bytes)
UPDATE src/app.module.ts (822 bytes)
PS D:\DATA\GIT\WEBSERVICES\webservices-budget-2526\webservices-budget> pnpm nest g controller user --no-spec
CREATE src/user/user.controller.ts (101 bytes)
UPDATE src/user/user.module.ts (170 bytes)
```

### UserService

- overige enpoints in UserController
- userService met ethoden
- userModule
- dto's

## 6. Validatie en foutafhandeling

### Pipes

- `ParseIntPipe` gebruikt in een controller
- genereert 400 ipv 500 status code by foutief input type

### ValidationPipe

- `pnpm i class-validator class-transformer`
- decorators gebruikt in `CreatePlaceRequestDto`
- `ValidationPipe` imported in `main.jsx`

### Transformeren van payloads naar DTO's

- mbv `transform: true`

### Primitieve types transformeren

- id: number
- vraag of dit correct wordt opgevangen als een string wordt opgegeven (wat ParseInt wel deed)

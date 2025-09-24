# Web Services Budget App version 2025-2026

This time round, I'm keeping as close as possible to the instructions.

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

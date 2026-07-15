# FinControl Mobile

App mobile do FinControl, construído com Expo + Expo Router + TypeScript. Funciona 100% offline: todos os dados residem em um banco SQLite local no dispositivo (sem backend/API).

## Stack

- **Expo** (SDK 57) + TypeScript + **Expo Router** (file-based routing)
- **NativeWind** (Tailwind CSS para React Native) com dark mode
- **react-native-reusables** (componentes de UI, equivalente ao shadcn/ui)
- **expo-sqlite** + **Drizzle ORM** para persistência local, com migrations automáticas no boot
- ESLint + Prettier
- EAS CLI para builds (iOS/Android)

## Estrutura de pastas

```
app/            # rotas (Expo Router)
components/ui/  # componentes do react-native-reusables
components/     # componentes próprios do app
lib/db/         # schema, client e migrations do Drizzle
hooks/          # custom hooks (incluindo acesso ao banco)
types/          # tipos TypeScript compartilhados
```

## Pré-requisitos

- Node.js 20+
- npm
- Xcode (para rodar no iOS Simulator) — apenas macOS
- Android Studio com um emulador configurado, ou um dispositivo Android físico com depuração USB habilitada

## Setup

```bash
npm install
```

## Rodando o app

```bash
npx expo start        # inicia o Metro bundler (aperte "i" ou "a" para abrir no simulador/emulador)
npm run ios           # abre direto no iOS Simulator
npm run android       # abre direto no emulador/dispositivo Android
```

Como o app usa módulos nativos (`expo-sqlite`), ele **não roda no Expo Go**. Na primeira vez, o Expo vai te guiar para gerar um dev build (`expo-dev-client`). Alternativa: `npx expo run:ios` / `npx expo run:android` fazem o build nativo e instalam direto no simulador/dispositivo.

## Banco de dados

O schema fica em [lib/db/schema.ts](lib/db/schema.ts). Depois de alterar o schema, gere uma nova migration:

```bash
npm run db:generate
```

As migrations rodam automaticamente na inicialização do app (hook `useMigrations` em [app/_layout.tsx](app/_layout.tsx)).

## Scripts úteis

| Script | Descrição |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run format` | Formata o projeto com Prettier |
| `npm run format:check` | Checa formatação sem alterar arquivos |
| `npm run typecheck` | Checagem de tipos TypeScript |
| `npm run db:generate` | Gera migrations do Drizzle a partir do schema |
| `npm run expo:prebuild` | Gera as pastas nativas `ios/`/`android/` |
| `npm run eas:build:dev` \| `preview` \| `production` | Builds via EAS |

## Builds (EAS)

Requer login na sua conta Expo:

```bash
npx eas-cli login
npx eas-cli init          # associa o projeto à sua conta (gera o projectId)
npx eas-cli build:configure
```

Os perfis de build estão em [eas.json](eas.json).

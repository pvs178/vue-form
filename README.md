# Account Management Form

Vue 3 + TypeScript + Pinia + Element Plus.

## Stack

- Vue.js 3 (Composition API)
- TypeScript
- Pinia (with localStorage persistence)
- Element Plus

## Getting started

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Features

- Header and button to add an account (+)
- Hint for the "Labels" field (use `;` as separator)
- List of accounts: Labels, Record type (Local / LDAP), Login, Password, delete button
- Validation on blur (text fields) and on change (select); invalid fields get a red border
- Data stored in Pinia and persisted to localStorage (survives page reload)
- Labels are stored as an array of objects: `[{ text: "label" }, ...]`

# Client Discovery Form

Formulario multi-step (ES/EN) para capturar requisitos de potenciales clientes antes de un presupuesto web/sistema.

## Stack

- Astro + TypeScript
- React (isla del wizard)
- nanostores
- Tailwind CSS
- Zod
- Supabase + Resend (integraciones preparadas)

## Requisitos

- Node.js `>= 22.12.0`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## Variables de entorno

Copia `.env.example` a `.env` y completa las claves cuando conectes Supabase/Resend.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Redirect a `/es` |
| `/es`, `/en` | Landing |
| `/es/formulario`, `/en/formulario` | Wizard |
| `/es/gracias`, `/en/gracias` | Confirmación |
| `POST /api/discovery/submit` | Envío validado |

## Arquitectura

La lógica del discovery vive en `src/features/discovery-form`.

- `schemas/` — validación Zod por paso + schema global
- `stores/` — estado del wizard (nanostores) + persistencia local
- `hooks/` — API ergonómica para la UI
- `services/` — I/O (submit)
- `components/` — UI del wizard y pasos
- `src/i18n/` — catálogos ES/EN tipados

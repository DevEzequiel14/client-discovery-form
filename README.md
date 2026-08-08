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

| Variable | Descripción |
|----------|-------------|
| `PUBLIC_SITE_URL` | URL pública del sitio |
| `PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `PUBLIC_SUPABASE_ANON_KEY` | Anon key (opcional en client; el insert usa service role) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (solo server; requerida para persistir) |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend |
| `DISCOVERY_NOTIFY_EMAIL` | Tu correo para recibir cada lead |

### Setup Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com) (plan free).
2. Abrí **SQL Editor** y ejecutá el contenido de `supabase/schema.sql`.
3. En **Project Settings → API**, copiá `URL` y `service_role` a tu `.env`.

### Setup Resend

1. Creá cuenta en [resend.com](https://resend.com) (plan free).
2. Verificá un dominio (o usá el sandbox de prueba) y creá un API key.
3. Completá `RESEND_API_KEY`, `RESEND_FROM_EMAIL` y `DISCOVERY_NOTIFY_EMAIL`.

Sin estas claves el submit sigue aceptando payloads válidos (útil en desarrollo), pero no guarda ni notifica.

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

## Deploy (compartir el formulario)

El código está en GitHub. Para una **URL pública** usamos Vercel (GitHub Pages no alcanza: el envío usa una API server-side).

### Opción A — Dashboard (recomendada)

1. Entrá a [vercel.com/new](https://vercel.com/new)
2. Importá el repo `DevEzequiel14/client-discovery-form`
3. Dejá los defaults (Astro + Node 22 si te lo pide)
4. Deploy → te da una URL tipo `https://client-discovery-form.vercel.app`
5. Compartí: `https://tu-url.vercel.app/es/formulario`

Cada push a `main` vuelve a desplegar solo.

### Opción B — CLI

```bash
npx vercel
npx vercel --prod
```

### Nota

Supabase/Resend son opcionales en desarrollo: el submit valida igual sin claves. En producción conviene configurar ambos para no perder leads.

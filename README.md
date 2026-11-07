<div align="center">

# Cek Resi All

**A shipment tracker** for Indonesian couriers in a single interface — just enter the tracking number.

[![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**English** · [Bahasa Indonesia](README.id.md)

</div>

---

## About

Check a parcel's status without opening each courier's own website. Enter the tracking number, pick a courier, and the full journey appears as a single timeline.

Tracking data comes from the **[Binderbyte API](https://binderbyte.com)**, which covers dozens of Indonesian couriers (JNE, J&T, SiCepat, POS, AnterAja, Ninja, and more).

## Features

- One form for every courier Binderbyte supports; the tracking number is sent together with the courier name.
- Results render as a timeline: status history in order, from dispatch to delivery.
- A parcel summary above the timeline: tracking number, courier, current status, and estimate.
- Pages are code-split with `React.lazy` + `Suspense`, keeping the initial bundle small.
- Unknown routes fall through to a 404 page.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 + Vite |
| Routing | React Router 6 |
| Styling | Tailwind CSS |
| Data | [Binderbyte API](https://api.binderbyte.com/v1/track) |
| Deployment | Netlify (`_redirects` for the SPA) |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Ilhamaji/cek-resi-all.git
cd cek-resi-all
npm install
```

### 2. API key

Register at [binderbyte.com](https://binderbyte.com) to get a key, then create `.env`:

```env
VITE_API_KEY=your_binderbyte_key
```

### 3. Run

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

## Project Layout

```
src/
  App.jsx                 # routing, layout, background decoration
  components/Nav.jsx      # navigation
  pages/
    Home.jsx              # tracking form and results
    About.jsx             # app info
    Notfound.jsx          # 404 page
public/_redirects         # SPA rewrite rules for Netlify
.github/workflows/deploy.yaml
```

## Endpoint

```http
GET https://api.binderbyte.com/v1/track?api_key={KEY}&courier={courier}&awb={tracking_number}
```

> **Note:** the API key is called straight from the browser (the `VITE_` prefix), so it is visible in the bundle. For public use, move the call behind a backend or proxy so the key cannot be abused.

## License

MIT.

---

<div align="center">
Built by <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>

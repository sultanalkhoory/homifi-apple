# HomiFi – Apple‑style Fresh Build

Apple‑first, minimal, cinematic. Built with Next.js 15 + Tailwind 3.4 + Framer Motion.

## Getting Started
1) Upload this folder to a new GitHub repo (use the website "Upload files").
2) On your machine later: install deps then run `pnpm dev` or `npm run dev`.

## Deploy on Vercel
- Import this GitHub repo into Vercel.
- Framework preset: Next.js (defaults).

## Add Your Assets (after upload)
Put these inside `/public/` (no placeholders provided here):
- `iphone-17pro.png` (transparent screen)
- `Curtains-Open-Lights-On.png`
- `Curtains-Closed-Lights-On.png`
- `Curtains-Closed-Lights-Off.png`
- `/public/video/curtains-opening.mp4`, `/public/video/curtains-closing.mp4`

## Principles
- System font stack (SF Pro on Apple devices)
- Glass only inside iPhone/HUDs
- No desktop parallax; mobile parallax-ready
- Subtle ease‑out animations

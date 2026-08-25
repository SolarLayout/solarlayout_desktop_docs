# BESS docs — deployment coordination

The `/bess` tree is part of this one Next app and ships with the existing
**Deploy** workflow (Vercel). `NEXT_PUBLIC_ASSET_PREFIX` already covers it.

**One external change, in `solarlayout_web` (do before the public launch):**
add a `/bess` rewrite mirroring the existing `/docs` rewrite
(`solarlayout.app/bess/:path* → DOCS_URL/bess/:path*`), so the proxied path
resolves. Direct access to `docs.solarlayout.app/bess` works without it.

Pre-launch, this is not blocking: the docs deployment is reachable on its own
domain regardless.

<img src="/public/favicon.svg" alt="lukasposledni.cz" width="128" height="128" />

# lukasposledni.cz

### Prerequisites

- Node.js >= 22
- pnpm (recommended)
- Sanity CLI

### Local Development

After cloning the repo, the basic setup commands are:

```sh
cd lukasposledni.cz
cp .env.example .env
pnpm
pnpm dev
```

Visit http://localhost:4321 to see the app.

### Sanity

Sanity Studio is embedded on the http://localhost:4321/content route.

> [!NOTE]  
> After changing schema in `/sanity` you want to regenerate your schema with `sanity schema extract --enforce-required-fields` then create new `sanity.types.ts` with `sanity typegen generate`

## Resources

- [Astro][astro]
- [Sanity][sanity]

[astro]: https://astro.build
[sanity]: https://www.sanity.io/docs

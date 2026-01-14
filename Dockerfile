FROM node:24-alpine AS build

# Installer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Copier le code source
COPY . .

# Build de l'application Angular
RUN pnpm run build

# Stage de production avec Caddy
FROM caddy:2-alpine

# Copier le build Angular
COPY --from=build /app/dist/kanbano-users/browser /srv

# Copier la config Caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80


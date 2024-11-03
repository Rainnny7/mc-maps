FROM imbios/bun-node AS base


# Install dependencies
FROM base AS depends
WORKDIR /usr/src/app
COPY package.json* bun.lockb* ./
RUN bun install --frozen-lockfile --quiet


# Build the app
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=depends /usr/src/app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

ARG S3_ENDPOINT
ENV S3_ENDPOINT=${S3_ENDPOINT}

ARG S3_PORT
ENV S3_PORT=${S3_PORT}

ARG S3_ACCESS_KEY
ENV S3_ACCESS_KEY=${S3_ACCESS_KEY}

ARG S3_SECRET_KEY
ENV S3_SECRET_KEY=${S3_SECRET_KEY}

ARG S3_USE_SSL
ENV S3_USE_SSL=${S3_USE_SSL}

ARG ADMIN_PASSWORD
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

RUN bun run build


# Run the app
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1007 nextjs
RUN adduser --system --uid 1007 nextjs

RUN mkdir .next
RUN chown nextjs:nextjs .next

COPY --from=builder --chown=nextjs:nextjs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/package.json ./package.json

ENV NODE_ENV=production

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

ARG S3_ENDPOINT
ENV S3_ENDPOINT=${S3_ENDPOINT}

ARG S3_PORT
ENV S3_PORT=${S3_PORT}

ARG S3_ACCESS_KEY
ENV S3_ACCESS_KEY=${S3_ACCESS_KEY}

ARG S3_SECRET_KEY
ENV S3_SECRET_KEY=${S3_SECRET_KEY}

ARG S3_USE_SSL
ENV S3_USE_SSL=${S3_USE_SSL}

ARG ADMIN_PASSWORD
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

# Exposting on port 80 so we can
# access via a reverse proxy for Dokku
ENV HOSTNAME="0.0.0.0"
EXPOSE 80
ENV PORT=80

USER nextjs
CMD ["node", "server.js"]
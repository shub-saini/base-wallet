# ----------------------------
# For dependencies and build
# ----------------------------
FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . ./
RUN bun run build

# ----------------------------- 
# Production Runtime  
# -----------------------------

FROM oven/bun:alpine as runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "server.js"]
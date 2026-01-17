# Use Node 20
FROM node:20-bullseye

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies)
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Force Rollup to NOT load the native binary (prevents the crash)
ENV ROLLUP_DISABLE_NATIVE=true

EXPOSE 5173

# Start dev server
CMD ["pnpm", "dev"]

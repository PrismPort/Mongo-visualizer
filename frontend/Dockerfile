# # Stage 1: Building the code
# FROM node:18 AS builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Run the built code
# FROM node:18
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/public ./public
# COPY package*.json ./
# EXPOSE 3000
# CMD ["npm", "start"]


# Stage 1: Building the code
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run the built code in development mode
FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD ["npm", "run", "dev"]

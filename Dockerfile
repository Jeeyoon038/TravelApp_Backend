# Step 1: Use Node.js 18 official image as the base image
FROM node:18 AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code to the container
COPY . .

# Step 6: Build the Nest.js application
RUN npm run build

# Step 7: Use a lighter image for the production runtime
FROM node:18-alpine AS runtime

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Step 10: Install only production dependencies
RUN npm install --only=production

# Step 11: Expose the application port
EXPOSE 3000

# Step 12: Define the command to start the application
CMD ["node", "dist/main"]

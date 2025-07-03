
# Use Node 20 Slim as the base image (generally has fewer vulnerabilities)
FROM node:23-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]

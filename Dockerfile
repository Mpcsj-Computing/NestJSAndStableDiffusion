# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) before other files
# Leverage Docker cache to save time on dependency installation
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Build the NestJS application
RUN yarn prebuild
RUN yarn build

# Expose the port that your NestJS app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "dist/main"]

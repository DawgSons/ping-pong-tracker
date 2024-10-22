# Dockerfile for Ping Pong Tracker Project

# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application based on environment
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "development" ]; then yarn build:dev; else yarn build:prod; fi

# Expose the port the app runs on
EXPOSE 4173

# Set the environment variable to use production mode by default
ENV NODE_ENV=production

# Run the application in preview mode
CMD ["yarn", "preview"]

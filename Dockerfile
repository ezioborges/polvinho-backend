# Use the official Node.js image as the base image
FROM node:22-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3333

# Command to run the application
CMD ["npm","run","start"]
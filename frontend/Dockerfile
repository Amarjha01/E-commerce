# # Stage 1: Build the Vite app
# FROM node:20.11.1 AS build

# WORKDIR /app

# # Copy the frontend's package.json and package-lock.json/yarn.lock
# COPY package*.json ./

# # Install the frontend dependencies
# RUN npm install

# # Copy the rest of the frontend code and build the Vite app
# COPY . .
# RUN npm run build

# # Stage 2: Serve the built files with Nginx
# FROM nginx:alpine

# # Copy the built files from the previous stage to Nginx's default html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80 to serve the frontend
# EXPOSE 80

# # Command to run Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js image as the base image for the build stage
FROM node:20.11.1 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code and build the Vite app
COPY . .
RUN npm run build

# Use the official Nginx image as the base image for the production stage
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

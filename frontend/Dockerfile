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

# Stage 1: Build the application
FROM node:20.11.1 AS build

# Set the working directory to /app inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to /app
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY frontend/ .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
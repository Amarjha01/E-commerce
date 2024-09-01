FROM node:20.11.1

WORKDIR /app

# Copy the backend's package.json and package-lock.json from the backend directory
COPY backend/package*.json ./

# Copy the rest of the backend code from the backend directory
COPY backend/ .

# Install the backend dependencies
RUN npm install

# Expose the port the backend listens on
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]

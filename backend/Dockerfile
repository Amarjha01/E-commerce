FROM node:20.11.1

WORKDIR /app

# Copy the backend's package.json and package-lock.json
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the backend listens on
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]

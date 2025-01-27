# Use the official Node.js image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /mealmeter_web/frontend

# Copy the package.json and package-lock.json (if available) to the container
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend folder into the container
COPY frontend .

# Expose the port on which the app will run (default for React is 3000)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
# Use an official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nextron app
RUN npm run build

# Expose the required port(s)
EXPOSE 8888

# Start the Nextron app using Nextron's start command
CMD ["npm", "run", "dev"]
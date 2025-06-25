# Use an official lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000 so the app can be accessed from outside the container
EXPOSE 5000

# Start the application using the 'npm start' command
CMD ["npm", "start"]

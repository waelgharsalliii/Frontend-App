# Use the official Node.js 14 image as a base
FROM node:latest

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 80 (assuming your frontend runs on port 80)
EXPOSE 3001

# Command to run the frontend server
CMD ["npm","start"]

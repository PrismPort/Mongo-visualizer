# Use a suitable base image
FROM node:18

# Create and set the working directory
WORKDIR /src

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your frontend runs on
EXPOSE 80

# Start your frontend application
CMD ["npm", "start"]


# Use Node.js as a base image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy all files to the container
COPY . /usr/src/app

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]

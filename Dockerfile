FROM node:14.21.3-slim as builder

ENV HTTP_PROXY=http://eastproxies.cvshealth.com:8080/ HTTPS_PROXY=http://eastproxies.cvshealth.com:8080/ NO_PROXY=localhost,127.0.0.1,10.254.246.80,gitw.cvshealth.com,10.254.246.182

ARG BUILD_FOR=prod

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm i --legacy-peer-deps

# Build the app
RUN npm run build:$BUILD_FOR

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Private ID folders
COPY --from=builder /app/node_modules/@privateid/cryptonets-web-sdk/wasm/ /usr/share/nginx/html/wasm/
COPY --from=builder /app/node_modules/@privateid/cryptonets-web-sdk/workers/ /usr/share/nginx/html/workers/
RUN ls -laR /usr/share/nginx/html/*

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3005
# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# Install depedencies
FROM node:latest as build
WORKDIR /app
COPY package.json .
RUN npm i

# Build application
COPY . .
RUN npm run build

# Copy to nginx
FROM nginx:latest as nginx
COPY --from=build /app/dist/ /usr/share/nginx/html










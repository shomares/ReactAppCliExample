# Install depedencies
FROM node:latest as build

ARG VITE_SERVICE_URL
RUN echo $VITE_SERVICE_URL

ARG VITE_CLIENT_ID
RUN echo $VITE_CLIENT_ID

ARG VITE_REDIRECT_URL
RUN echo $VITE_REDIRECT_URL

WORKDIR /app
COPY package.json .
RUN npm i

# Build application
COPY . .
RUN npm run build

# Copy to nginx
FROM nginx:latest as nginx
COPY --from=build /app/dist/ /usr/share/nginx/html










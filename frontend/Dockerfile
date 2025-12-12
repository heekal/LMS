FROM node:22-alpine AS build

WORKDIR /myapp

COPY package*.json ./
RUN npm install

COPY . .
ENV VITE_API_URL=/api
RUN npm run build

FROM nginx:stable
COPY --from=build /myapp/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Базовый образ для сборки приложения
FROM node:16-alpine as build

WORKDIR /app
ENV NODE_OPTIONS="--max_old_space_size=4096"

COPY package*.json ./
RUN npm install

COPY . .

# RUN npm run build

# Базовый образ для Nginx
FROM nginx

# Копируем собранные файлы в директорию Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

# add docker container
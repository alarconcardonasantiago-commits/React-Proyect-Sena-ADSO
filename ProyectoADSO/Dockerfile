# Etapa 1: Compilación
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Copiar build de React al directorio html de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Añadir configuración personalizada de Nginx para manejar React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

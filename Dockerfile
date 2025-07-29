# ========== ETAPA 1: BUILD ==========
# Usar imagen oficial de Node.js como base para el build
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci --only=production=false

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# ========== ETAPA 2: PRODUCTION ==========
# Usar nginx alpine para servir la aplicación
FROM nginx:alpine AS production

# Copiar archivos estáticos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]

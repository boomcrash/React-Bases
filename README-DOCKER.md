# 🐳 Despliegue con Docker - React Learning Lab

Esta aplicación educativa de React puede ser desplegada usando Docker para facilitar la distribución y el despliegue.

## 📋 Requisitos

- Docker (versión 20.10+)
- Docker Compose (versión 2.0+)

## 🚀 Despliegue Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Opción 2: Docker directo

```bash
# Construir la imagen
docker build -t react-learning-lab .

# Ejecutar el contenedor
docker run -d \
  --name react-learning-lab \
  -p 3000:80 \
  --restart unless-stopped \
  react-learning-lab

# Ver logs
docker logs -f react-learning-lab
```

## 🌐 Acceso a la Aplicación

Una vez desplegada, la aplicación estará disponible en:

- **Local**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 📁 Estructura del Despliegue

```
.
├── Dockerfile              # Configuración multi-stage build
├── docker-compose.yml      # Orquestación del contenedor
├── nginx.conf              # Configuración optimizada de nginx
├── .dockerignore           # Archivos excluidos del build
└── README-DOCKER.md        # Esta documentación
```

## ⚙️ Configuración

### Variables de Entorno

Puedes personalizar el despliegue modificando las variables en `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=80
```

### Configuración de nginx

El archivo `nginx.conf` incluye:

- ✅ Compresión gzip
- ✅ Cacheo de archivos estáticos
- ✅ Configuración SPA (React Router)
- ✅ Headers de seguridad
- ✅ Health check endpoint

### Puertos

Por defecto, la aplicación se expone en el puerto 3000, pero puedes cambiarlo en `docker-compose.yml`:

```yaml
ports:
  - "8080:80" # Cambiar a puerto 8080
```

## 🔧 Comandos Útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Actualizar la aplicación
docker-compose pull
docker-compose up --build -d

# Ver uso de recursos
docker stats react-learning-lab

# Acceder al contenedor
docker exec -it react-learning-lab sh

# Limpiar imágenes no utilizadas
docker system prune -f
```

## 📊 Monitoring y Logs

```bash
# Ver logs en tiempo real
docker-compose logs -f react-learning-lab

# Ver logs de los últimos 100 líneas
docker-compose logs --tail=100 react-learning-lab

# Verificar health check
curl http://localhost:3000/health
```

## 🛠️ Troubleshooting

### Problema: Puerto ya en uso

```bash
# Encontrar qué proceso usa el puerto
lsof -i :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:80"
```

### Problema: Build falla

```bash
# Limpiar cache de Docker
docker builder prune -f

# Build sin cache
docker-compose build --no-cache
```

### Problema: Aplicación no carga

```bash
# Verificar que nginx está corriendo
docker exec react-learning-lab nginx -t

# Verificar logs de nginx
docker logs react-learning-lab
```

## 🚀 Despliegue en Producción

Para producción, considera:

1. **Usar un registry de Docker**:

```bash
# Tag para registry
docker tag react-learning-lab your-registry.com/react-learning-lab:v1.0.0

# Push al registry
docker push your-registry.com/react-learning-lab:v1.0.0
```

2. **Configurar HTTPS**:

```yaml
# Agregar SSL con traefik o nginx-proxy
labels:
  - "traefik.http.routers.react-app.tls=true"
```

3. **Configurar dominio personalizado**:

```yaml
labels:
  - "traefik.http.routers.react-app.rule=Host(`tu-dominio.com`)"
```

## 📈 Optimizaciones

El Dockerfile incluye:

- ✅ Multi-stage build (reduce tamaño de imagen)
- ✅ Alpine Linux (imagen ligera)
- ✅ Caching de dependencias npm
- ✅ Archivos estáticos optimizados
- ✅ Configuración de seguridad nginx

**Tamaño final de imagen**: ~25MB (nginx + archivos estáticos)

## 🎓 Para Estudiantes

Esta aplicación es perfecta para:

- Aprender conceptos de React en un entorno aislado
- Demostraciones en clase sin configuración local
- Prácticas de despliegue con Docker
- Comparación de técnicas de optimización

¡La aplicación está lista para enseñar React de manera interactiva! 🚀

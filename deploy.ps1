# React Learning Lab - Script de Despliegue
# PowerShell Script para Windows

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("build", "start", "stop", "restart", "logs", "clean", "status")]
    [string]$Action = "start",
    
    [Parameter(Mandatory=$false)]
    [int]$Port = 3000
)

$AppName = "react-learning-lab"
$ImageName = "react-learning-lab"

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host " $Message" -ForegroundColor Yellow
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
}

function Check-Docker {
    try {
        docker --version | Out-Null
        docker-compose --version | Out-Null
        return $true
    }
    catch {
        Write-Host "❌ Error: Docker o Docker Compose no están instalados." -ForegroundColor Red
        Write-Host "Por favor, instala Docker Desktop desde: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
        return $false
    }
}

function Build-App {
    Write-Header "Construyendo la aplicación React Learning Lab"
    
    Write-Host "🔨 Construyendo imagen Docker..." -ForegroundColor Green
    docker-compose build --no-cache
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Aplicación construida exitosamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al construir la aplicación" -ForegroundColor Red
        exit 1
    }
}

function Start-App {
    Write-Header "Iniciando React Learning Lab"
    
    # Actualizar puerto en docker-compose si es diferente a 3000
    if ($Port -ne 3000) {
        Write-Host "🔧 Configurando puerto $Port..." -ForegroundColor Yellow
        $composecontent = Get-Content "docker-compose.yml" -Raw
        $composecontent = $composecontent -replace '3000:80', "$Port`:80"
        Set-Content "docker-compose.yml" -Value $composecontent
    }
    
    Write-Host "🚀 Iniciando contenedores..." -ForegroundColor Green
    docker-compose up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Aplicación iniciada exitosamente!" -ForegroundColor Green
        Write-Host "🌐 Accede a la aplicación en: http://localhost:$Port" -ForegroundColor Cyan
        Write-Host "🔍 Health check: http://localhost:$Port/health" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📊 Para ver los logs en tiempo real, ejecuta:" -ForegroundColor Yellow
        Write-Host "   .\deploy.ps1 -Action logs" -ForegroundColor White
    } else {
        Write-Host "❌ Error al iniciar la aplicación" -ForegroundColor Red
        exit 1
    }
}

function Stop-App {
    Write-Header "Deteniendo React Learning Lab"
    
    Write-Host "⏹️ Deteniendo contenedores..." -ForegroundColor Red
    docker-compose down
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Aplicación detenida exitosamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al detener la aplicación" -ForegroundColor Red
    }
}

function Restart-App {
    Write-Header "Reiniciando React Learning Lab"
    Stop-App
    Start-App
}

function Show-Logs {
    Write-Header "Logs de React Learning Lab"
    
    Write-Host "📋 Mostrando logs (Ctrl+C para salir)..." -ForegroundColor Green
    docker-compose logs -f
}

function Clean-Docker {
    Write-Header "Limpiando recursos Docker"
    
    Write-Host "🧹 Deteniendo aplicación..." -ForegroundColor Yellow
    docker-compose down
    
    Write-Host "🗑️ Eliminando imágenes no utilizadas..." -ForegroundColor Yellow
    docker system prune -f
    
    Write-Host "✅ Limpieza completada" -ForegroundColor Green
}

function Show-Status {
    Write-Header "Estado de React Learning Lab"
    
    Write-Host "📊 Estado de contenedores:" -ForegroundColor Green
    docker-compose ps
    
    Write-Host ""
    Write-Host "💾 Uso de recursos:" -ForegroundColor Green
    try {
        docker stats $AppName --no-stream
    }
    catch {
        Write-Host "ℹ️ Contenedor no está ejecutándose" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "🔍 Verificando conectividad..." -ForegroundColor Green
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port/health" -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Aplicación responde correctamente" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "❌ Aplicación no responde en el puerto $Port" -ForegroundColor Red
    }
}

# Script principal
Write-Host ""
Write-Host "🐳 React Learning Lab - Deployment Script" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

if (-not (Check-Docker)) {
    exit 1
}

switch ($Action.ToLower()) {
    "build" {
        Build-App
    }
    "start" {
        Start-App
    }
    "stop" {
        Stop-App
    }
    "restart" {
        Restart-App
    }
    "logs" {
        Show-Logs
    }
    "clean" {
        Clean-Docker
    }
    "status" {
        Show-Status
    }
    default {
        Write-Host "❌ Acción no válida: $Action" -ForegroundColor Red
        Write-Host ""
        Write-Host "Acciones disponibles:" -ForegroundColor Yellow
        Write-Host "  build   - Construir la aplicación" -ForegroundColor White
        Write-Host "  start   - Iniciar la aplicación (por defecto)" -ForegroundColor White
        Write-Host "  stop    - Detener la aplicación" -ForegroundColor White
        Write-Host "  restart - Reiniciar la aplicación" -ForegroundColor White
        Write-Host "  logs    - Ver logs en tiempo real" -ForegroundColor White
        Write-Host "  status  - Ver estado de la aplicación" -ForegroundColor White
        Write-Host "  clean   - Limpiar recursos Docker" -ForegroundColor White
        Write-Host ""
        Write-Host "Ejemplos:" -ForegroundColor Yellow
        Write-Host "  .\deploy.ps1                     # Iniciar en puerto 3000" -ForegroundColor Gray
        Write-Host "  .\deploy.ps1 -Action build       # Solo construir" -ForegroundColor Gray
        Write-Host "  .\deploy.ps1 -Action start -Port 8080  # Iniciar en puerto 8080" -ForegroundColor Gray
        exit 1
    }
}

Write-Host ""

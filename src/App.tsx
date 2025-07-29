import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Code, Zap, Database, Cpu, Globe, Package, Settings, Menu, X, Home, ChevronRight } from 'lucide-react';
import './App.css';

// Importar todas las secciones
import ComponentsSection from './sections/01components/ComponentsSection';
import PropsSection from './sections/02props/PropsSection';
import StateSection from './sections/03state/StateSection';
import UseEffectSection from './sections/04useEffect/UseEffectSection';
import UseReducerSection from './sections/05useReducer/UseReducerSection';
import ApiSection from './sections/06api/ApiSection';
import ZustandSection from './sections/07zustand/ZustandSection';
import ReduxSection from './sections/08redux/ReduxSection';
import PerformanceSection from './sections/09performance/PerformanceSection';

// Configuración de las secciones
type SectionConfig = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
  component: React.ComponentType;
  color: string;
};

const sections: SectionConfig[] = [
  {
    id: 'components',
    title: 'Componentes',
    description: 'Bloques de construcción fundamentales de React',
    icon: Code,
    path: '/components',
    component: ComponentsSection,
    color: '#3B82F6'
  },
  {
    id: 'props',
    title: 'Props',
    description: 'Pasando datos entre componentes',
    icon: Package,
    path: '/props',
    component: PropsSection,
    color: '#10B981'
  },
  {
    id: 'state',
    title: 'Estado (useState)',
    description: 'Manejo del estado local del componente',
    icon: Database,
    path: '/state',
    component: StateSection,
    color: '#8B5CF6'
  },
  {
    id: 'useEffect',
    title: 'useEffect',
    description: 'Efectos secundarios y ciclo de vida',
    icon: Zap,
    path: '/useEffect',
    component: UseEffectSection,
    color: '#F59E0B'
  },
  {
    id: 'useReducer',
    title: 'useReducer',
    description: 'Estado complejo con reducer',
    icon: Settings,
    path: '/useReducer',
    component: UseReducerSection,
    color: '#EF4444'
  },
  {
    id: 'api',
    title: 'API y Fetch',
    description: 'Consumiendo APIs externas',
    icon: Globe,
    path: '/api',
    component: ApiSection,
    color: '#06B6D4'
  },
  {
    id: 'zustand',
    title: 'Zustand',
    description: 'Gestión de estado global simple',
    icon: Cpu,
    path: '/zustand',
    component: ZustandSection,
    color: '#84CC16'
  },
  {
    id: 'redux',
    title: 'Redux Toolkit',
    description: 'Gestión de estado global robusta',
    icon: Database,
    path: '/redux',
    component: ReduxSection,
    color: '#F97316'
  },
  {
    id: 'performance',
    title: 'Rendimiento',
    description: 'useMemo, useCallback y optimización',
    icon: Zap,
    path: '/performance',
    component: PerformanceSection,
    color: '#EC4899'
  }
];

function App() {
  return (
    <Router>
      <Layout sections={sections} />
    </Router>
  );
}

// Layout principal con navigation drawer
function Layout({ sections }: { sections: SectionConfig[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="app-header-new">
        <div className="header-content-new">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="header-title">
            <BookOpen size={28} />
            <h1>React Learning Lab</h1>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <aside className={`navigation-drawer ${sidebarOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">
            <BookOpen size={24} />
            <span>Navegación</span>
          </div>
          <button 
            className="close-drawer"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={20} />
            <span>Inicio</span>
          </Link>

          <div className="nav-section">
            <h3 className="nav-section-title">Conceptos de React</h3>
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isActive = location.pathname === section.path;
              
              return (
                <Link 
                  key={section.id}
                  to={section.path} 
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                  style={{ '--section-color': section.color } as React.CSSProperties}
                >
                  <IconComponent size={20} />
                  <span>{section.title}</span>
                  <ChevronRight size={16} className="nav-arrow" />
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {sections.map((section) => (
            <Route 
              key={section.id} 
              path={section.path} 
              element={<section.component />} 
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

// Página principal con explicación de React
function HomePage() {
  return (
    <div className="home-page-new">
      <div className="hero-section">
        <div className="hero-content">
          <h1>¡Bienvenido a React Learning Lab!</h1>
          <p className="hero-subtitle">
            Tu laboratorio interactivo para dominar React desde cero hasta nivel avanzado
          </p>
          
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">
                <Code size={24} />
              </div>
              <div>
                <h3>Ejemplos Interactivos</h3>
                <p>Practica con demos reales y manipulables</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <BookOpen size={24} />
              </div>
              <div>
                <h3>Explicaciones Claras</h3>
                <p>Conceptos explicados de forma simple y directa</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <div>
                <h3>Progresivo</h3>
                <p>Desde lo básico hasta conceptos avanzados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="react-basics-section">
        <h2>¿Qué es React?</h2>
        
        <div className="basics-grid">
          <div className="basic-card">
            <div className="basic-icon">
              <Package size={32} />
            </div>
            <h3>Biblioteca de JavaScript</h3>
            <p>
              React es una biblioteca de JavaScript para construir interfaces de usuario, 
              especialmente para aplicaciones web de una sola página (SPAs).
            </p>
          </div>

          <div className="basic-card">
            <div className="basic-icon">
              <Code size={32} />
            </div>
            <h3>Basado en Componentes</h3>
            <p>
              Todo en React son componentes. Piensa en ellos como bloques de construcción 
              reutilizables que encapsulan su propia lógica y presentación.
            </p>
          </div>

          <div className="basic-card">
            <div className="basic-icon">
              <Zap size={32} />
            </div>
            <h3>Virtual DOM</h3>
            <p>
              React utiliza un Virtual DOM para hacer actualizaciones eficientes. 
              Solo actualiza las partes que realmente cambiaron.
            </p>
          </div>

          <div className="basic-card">
            <div className="basic-icon">
              <Database size={32} />
            </div>
            <h3>Estado y Props</h3>
            <p>
              Los componentes pueden tener estado interno y recibir datos a través de props. 
              Esto permite crear interfaces dinámicas e interactivas.
            </p>
          </div>
        </div>
      </div>

      <div className="learning-path-section">
        <h2>Tu Ruta de Aprendizaje</h2>
        <p className="path-description">
          Este laboratorio está diseñado para llevarte paso a paso desde los conceptos básicos 
          hasta técnicas avanzadas de React. Cada sección es independiente pero recomendamos 
          seguir el orden sugerido.
        </p>

        <div className="path-steps">
          <div className="path-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Fundamentos</h3>
              <p>Componentes, Props y Estado básico</p>
              <div className="step-topics">
                <span>Componentes</span>
                <span>Props</span>
                <span>useState</span>
              </div>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Hooks Esenciales</h3>
              <p>useEffect y useReducer para casos avanzados</p>
              <div className="step-topics">
                <span>useEffect</span>
                <span>useReducer</span>
              </div>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Datos Externos</h3>
              <p>Consumo de APIs y manejo de datos asincrónicos</p>
              <div className="step-topics">
                <span>API Fetch</span>
                <span>Async/Await</span>
              </div>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Estado Global</h3>
              <p>Gestión de estado a nivel de aplicación</p>
              <div className="step-topics">
                <span>Zustand</span>
                <span>Redux Toolkit</span>
              </div>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Optimización</h3>
              <p>Rendimiento y mejores prácticas</p>
              <div className="step-topics">
                <span>useMemo</span>
                <span>useCallback</span>
                <span>React.memo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="getting-started-section">
        <div className="getting-started-content">
          <h2>¿Listo para empezar?</h2>
          <p>
            Usa el menú lateral para navegar entre las diferentes secciones. 
            Cada sección incluye explicaciones teóricas, ejemplos prácticos y código que puedes experimentar.
          </p>
          
          <div className="tips">
            <h3>💡 Tips para aprovechar al máximo este laboratorio:</h3>
            <ul>
              <li>📖 Lee las explicaciones antes de interactuar con los ejemplos</li>
              <li>🔍 Examina el código fuente de cada ejemplo</li>
              <li>🧪 Experimenta modificando los valores en los demos</li>
              <li>📝 Toma notas de los conceptos clave</li>
              <li>🔄 Repite las secciones que necesites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { Clock, Wifi, User, RefreshCw } from 'lucide-react';

const UseEffectSection: React.FC = () => {
  return (
    <SectionLayout
      title="useEffect Hook"
      description="useEffect permite ejecutar código cuando el componente se monta, actualiza o desmonta. Es como los eventos del ciclo de vida del componente."
      color="#F59E0B"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Efecto Simple */}
        <div className="example-card">
          <h3 className="example-title">Efecto al Montarse</h3>
          <p className="example-description">
            useEffect sin dependencias se ejecuta una vez cuando el componente se monta. ¡Prueba montando y desmontando!
          </p>
          
          <div className="interactive-demo">
            <MountEffectPlayground />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function MountEffect() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    setMessage('¡Componente montado!');
    console.log('Componente se montó');
  }, []); // Array vacío = solo al montar
  
  return <div>{message}</div>;
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Reloj en Tiempo Real */}
        <div className="example-card">
          <h3 className="example-title">Reloj en Tiempo Real</h3>
          <p className="example-description">
            useEffect con setInterval para actualizar el tiempo. ¡Controla el reloj!
          </p>
          
          <div className="interactive-demo">
            <ClockPlayground />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function Clock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Cleanup: limpiar interval al desmontar
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h3>{time.toLocaleTimeString()}</h3>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Efecto con Dependencias */}
        <div className="example-card">
          <h3 className="example-title">Efecto con Dependencias</h3>
          <p className="example-description">
            useEffect que se ejecuta cuando cambian valores específicos. ¡Experimenta con diferentes dependencias!
          </p>
          
          <div className="interactive-demo">
            <DependencyEffectPlayground />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function DependencyEffect() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  
  // Se ejecuta cuando 'count' cambia
  useEffect(() => {
    setLastUpdate(\`Count cambió a \${count} a las \${new Date().toLocaleTimeString()}\`);
  }, [count]); // Solo cuando count cambia
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe tu nombre"
      />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>{lastUpdate}</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Fetch de Datos */}
        <div className="example-card">
          <h3 className="example-title">Fetch de Datos (API)</h3>
          <p className="example-description">
            useEffect para cargar datos de una API cuando el componente se monta.
          </p>
          
          <div className="interactive-demo">
            <DataFetcher />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function DataFetcher() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Ciudad: {user.address.city}</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 5: Múltiples Efectos */}
        <div className="example-card">
          <h3 className="example-title">Múltiples useEffect</h3>
          <p className="example-description">
            Puedes usar varios useEffect para separar diferentes responsabilidades.
          </p>
          
          <div className="interactive-demo">
            <MultipleEffects />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function MultipleEffects() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [online, setOnline] = useState(navigator.onLine);
  
  // Efecto para el tamaño de ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Efecto para estado de conexión
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div>
      <p>Ancho: {windowWidth}px</p>
      <p>Estado: {online ? 'Online' : 'Offline'}</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 6: Cleanup y Memory Leaks */}
        <div className="example-card">
          <h3 className="example-title">Cleanup (Limpieza)</h3>
          <p className="example-description">
            Siempre limpia efectos como timers, listeners para evitar memory leaks.
          </p>
          
          <div className="interactive-demo">
            <CleanupExample />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function CleanupExample() {
  const [show, setShow] = useState(false);
  
  function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
      console.log('Timer iniciado');
      const interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      
      // IMPORTANTE: Cleanup
      return () => {
        console.log('Timer limpiado');
        clearInterval(interval);
      };
    }, []);
    
    return <div>Timer: {seconds}s</div>;
  }
  
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? 'Ocultar' : 'Mostrar'} Timer
      </button>
      {show && <Timer />}
    </div>
  );
}`}
            </pre>
          </details>
        </div>
      </div>
    </SectionLayout>
  );
};

// Componentes de ejemplo

function MountEffect() {
  const [message, setMessage] = useState('Esperando...');
  const [mountTime, setMountTime] = useState('');
  
  useEffect(() => {
    setMessage('¡Componente montado exitosamente! 🎉');
    setMountTime(new Date().toLocaleTimeString());
    console.log('Componente se montó');
  }, []);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center'
    }}>
      <div style={{ 
        color: '#F59E0B',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }}>
        {message}
      </div>
      <p style={{ color: '#666', margin: 0 }}>
        Montado a las: {mountTime}
      </p>
    </div>
  );
}

function MountEffectPlayground() {
  const [showComponent, setShowComponent] = useState(false);
  const [mountCount, setMountCount] = useState(0);

  const handleToggle = () => {
    if (!showComponent) {
      setMountCount(prev => prev + 1);
    }
    setShowComponent(!showComponent);
  };

  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          className="demo-button"
          onClick={handleToggle}
          style={{ 
            background: showComponent ? '#ef4444' : '#10b981',
            color: 'white',
            marginRight: '1rem'
          }}
        >
          {showComponent ? '🔴 Desmontar Componente' : '🟢 Montar Componente'}
        </button>
        
        <span style={{ 
          background: '#f3f4f6',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          color: '#374151'
        }}>
          Montado {mountCount} {mountCount === 1 ? 'vez' : 'veces'}
        </span>
      </div>

      {showComponent && <MountEffect />}

      <div style={{ 
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
          💡 <strong>Observa:</strong> Cada vez que montas el componente, useEffect se ejecuta 
          y actualiza el mensaje con la nueva hora de montaje.
        </p>
      </div>
    </div>
  );
}

function ClockPlayground() {
  const [showClock, setShowClock] = useState(true);
  const [interval, setIntervalTime] = useState(1000);

  function ControllableClock() {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, interval);
      
      return () => clearInterval(intervalId);
    }, [interval]);
    
    return (
      <div style={{ 
        background: '#fef3c7',
        border: '1px solid #F59E0B',
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center',
        margin: '1rem 0'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          <Clock size={24} color="#F59E0B" />
          <h3 style={{ color: '#F59E0B', margin: 0 }}>Reloj Controlable</h3>
        </div>
        
        <div style={{ 
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#92400e',
          fontFamily: 'monospace'
        }}>
          {time.toLocaleTimeString()}
        </div>
        
        <p style={{ color: '#92400e', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
          Actualiza cada {interval}ms
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Velocidad de actualización:
        </label>
        <select 
          className="demo-input"
          value={interval}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
          style={{ marginRight: '1rem' }}
        >
          <option value={100}>Muy rápido (100ms)</option>
          <option value={500}>Rápido (500ms)</option>
          <option value={1000}>Normal (1 segundo)</option>
          <option value={2000}>Lento (2 segundos)</option>
          <option value={5000}>Muy lento (5 segundos)</option>
        </select>
        
        <button 
          className="demo-button"
          onClick={() => setShowClock(!showClock)}
          style={{ 
            background: showClock ? '#ef4444' : '#10b981',
            color: 'white'
          }}
        >
          {showClock ? '⏹️ Parar Reloj' : '▶️ Iniciar Reloj'}
        </button>
      </div>

      {showClock && <ControllableClock />}

      <div style={{ 
        background: '#f0fdf4',
        border: '1px solid #10b981',
        borderRadius: '4px',
        padding: '0.75rem'
      }}>
        <p style={{ margin: 0, color: '#14532d', fontSize: '0.875rem' }}>
          🔄 <strong>useEffect con dependencias:</strong> Cuando cambias la velocidad, 
          el efecto se re-ejecuta con el nuevo interval. El cleanup limpia el interval anterior.
        </p>
      </div>
    </div>
  );
}

function DependencyEffectPlayground() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [watchName, setWatchName] = useState(true);
  const [watchEmail, setWatchEmail] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  // Efecto que depende de count
  useEffect(() => {
    const logEntry = `🔄 useEffect (count): ejecutado porque count cambió a ${count} - ${new Date().toLocaleTimeString()}`;
    setExecutionLog(prev => [...prev.slice(-4), logEntry]);
  }, [count]);

  // Efecto que depende de name (condicional)
  useEffect(() => {
    if (watchName && name) {
      const logEntry = `👤 useEffect (name): ejecutado porque name cambió a "${name}" - ${new Date().toLocaleTimeString()}`;
      setExecutionLog(prev => [...prev.slice(-4), logEntry]);
    }
  }, [name, watchName]);

  // Efecto que depende de email (condicional)
  useEffect(() => {
    if (watchEmail && email) {
      const logEntry = `📧 useEffect (email): ejecutado porque email cambió a "${email}" - ${new Date().toLocaleTimeString()}`;
      setExecutionLog(prev => [...prev.slice(-4), logEntry]);
    }
  }, [email, watchEmail]);

  const clearLog = () => setExecutionLog([]);

  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#F59E0B' }}>
          Controla qué efectos se ejecutan:
        </h4>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Control de Count */}
          <div style={{ 
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Count (siempre activo)</h5>
            <button 
              className="demo-button"
              onClick={() => setCount(count + 1)}
              style={{ 
                background: '#3B82F6',
                color: 'white',
                width: '100%'
              }}
            >
              Incrementar: {count}
            </button>
          </div>

          {/* Control de Name */}
          <div style={{ 
            background: watchName ? '#f0fdf4' : '#f8fafc',
            padding: '1rem',
            borderRadius: '6px',
            border: `1px solid ${watchName ? '#10b981' : '#e2e8f0'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={watchName}
                onChange={(e) => setWatchName(e.target.checked)}
              />
              <h5 style={{ margin: 0, color: '#374151' }}>Nombre</h5>
            </div>
            <input
              className="demo-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre"
              style={{ width: '100%' }}
            />
          </div>

          {/* Control de Email */}
          <div style={{ 
            background: watchEmail ? '#f0fdf4' : '#f8fafc',
            padding: '1rem',
            borderRadius: '6px',
            border: `1px solid ${watchEmail ? '#10b981' : '#e2e8f0'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={watchEmail}
                onChange={(e) => setWatchEmail(e.target.checked)}
              />
              <h5 style={{ margin: 0, color: '#374151' }}>Email</h5>
            </div>
            <input
              className="demo-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu email"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Log de ejecuciones */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h4 style={{ margin: 0, color: '#374151' }}>Log de useEffect:</h4>
          <button 
            className="demo-button"
            onClick={clearLog}
            style={{ 
              background: '#6b7280',
              color: 'white',
              fontSize: '0.875rem',
              padding: '0.25rem 0.5rem'
            }}
          >
            Limpiar Log
          </button>
        </div>
        
        <div style={{ 
          background: '#1f2937',
          color: '#e5e7eb',
          padding: '1rem',
          borderRadius: '6px',
          minHeight: '120px',
          maxHeight: '200px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.875rem'
        }}>
          {executionLog.length === 0 ? (
            <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>
              Realiza alguna acción para ver las ejecuciones de useEffect...
            </div>
          ) : (
            executionLog.map((log, index) => (
              <div key={index} style={{ marginBottom: '0.25rem' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ 
        background: '#fef3c7',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '0.75rem'
      }}>
        <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
          🎯 <strong>Experimenta:</strong> Activa/desactiva los checkboxes para ver cómo 
          las dependencias controlan cuándo se ejecuta cada useEffect.
        </p>
      </div>
    </div>
  );
}

interface UserData {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

function DataFetcher() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar usuario');
        }
        return response.json();
      })
      .then((data: UserData) => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Seleccionar Usuario (1-10):
        </label>
        <input
          className="demo-input"
          type="number"
          min="1"
          max="10"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>
      
      {loading && (
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#F59E0B'
        }}>
          <RefreshCw size={16} className="animate-spin" />
          Cargando usuario...
        </div>
      )}
      
      {error && (
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#dc2626'
        }}>
          ❌ Error: {error}
        </div>
      )}
      
      {user && !loading && (
        <div style={{ 
          border: '1px solid #F59E0B',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <User size={20} color="#F59E0B" />
            <h3 style={{ margin: 0, color: '#F59E0B' }}>{user.name}</h3>
          </div>
          <p style={{ margin: '0.25rem 0', color: '#666' }}>
            📧 Email: {user.email}
          </p>
          <p style={{ margin: '0.25rem 0', color: '#666' }}>
            🏙️ Ciudad: {user.address.city}
          </p>
          <p style={{ margin: '0.25rem 0', color: '#666' }}>
            🏢 Empresa: {user.company.name}
          </p>
        </div>
      )}
      
      <div style={{ 
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
          🌐 <strong>useEffect para APIs:</strong> Cambia el ID del usuario para ver cómo 
          useEffect se ejecuta automáticamente y carga nuevos datos. Observa los estados 
          de loading y error.
        </p>
      </div>
    </div>
  );
}

function MultipleEffects() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Efecto para el tamaño de ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Efecto para estado de conexión
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Efecto para posición del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#F59E0B' }}>
        Estados en Tiempo Real
      </h4>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div style={{ 
          background: '#f8fafc',
          padding: '0.75rem',
          borderRadius: '4px',
          border: '1px solid #e2e8f0'
        }}>
          📐 <strong>Ancho de ventana:</strong> {windowWidth}px
        </div>
        
        <div style={{ 
          background: online ? '#f0fdf4' : '#fee2e2',
          padding: '0.75rem',
          borderRadius: '4px',
          border: `1px solid ${online ? '#10b981' : '#ef4444'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Wifi size={16} color={online ? '#10b981' : '#ef4444'} />
          <strong>Conexión:</strong> {online ? 'Online ✅' : 'Offline ❌'}
        </div>
        
        <div style={{ 
          background: '#f8fafc',
          padding: '0.75rem',
          borderRadius: '4px',
          border: '1px solid #e2e8f0'
        }}>
          🖱️ <strong>Mouse:</strong> X: {mousePosition.x}, Y: {mousePosition.y}
        </div>
      </div>
      
      <p style={{ 
        color: '#666',
        fontSize: '0.875rem',
        margin: '1rem 0 0 0',
        fontStyle: 'italic'
      }}>
        Cada estado se maneja con un useEffect independiente
      </p>
      
      <div style={{ 
        background: '#fef3c7',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
          🔄 <strong>Múltiples efectos:</strong> Redimensiona la ventana o mueve el mouse para 
          ver cómo cada useEffect responde independientemente a diferentes eventos del navegador.
        </p>
      </div>
    </div>
  );
}

function CleanupExample() {
  const [show, setShow] = useState(false);
  
  function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
      console.log('⏰ Timer iniciado');
      const interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      
      return () => {
        console.log('🧹 Timer limpiado');
        clearInterval(interval);
      };
    }, []);
    
    return (
      <div style={{ 
        background: '#fef3c7',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#92400e'
        }}>
          ⏱️ {seconds}s
        </div>
        <p style={{ 
          color: '#92400e',
          margin: '0.5rem 0 0 0',
          fontSize: '0.875rem'
        }}>
          Abre la consola para ver los logs
        </p>
      </div>
    );
  }
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <button 
        className="demo-button"
        onClick={() => setShow(!show)}
        style={{ 
          background: show ? '#ef4444' : '#10b981',
          color: 'white',
          marginBottom: '1rem'
        }}
      >
        {show ? '🔴 Ocultar Timer' : '🟢 Mostrar Timer'}
      </button>
      
      {show && <Timer />}
      
      <div style={{ 
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
          🧹 <strong>Cleanup en acción:</strong> Haz clic en "Mostrar/Ocultar Timer" varias veces 
          y abre la consola del navegador (F12) para ver los logs de cuándo se inicia y 
          limpia cada timer. ¡Esto previene memory leaks!
        </p>
      </div>
    </div>
  );
}

export default UseEffectSection;

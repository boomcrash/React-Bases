import React, { useState, useMemo, useCallback, memo } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { Zap, Clock, Play, ChevronDown, ChevronUp, Cpu, Star, BarChart3 } from 'lucide-react';

// ========== COMPONENTES OPTIMIZADOS ==========

// Componente regular (no optimizado)
const ExpensiveListItem: React.FC<{ 
  item: { id: number; name: string; value: number }; 
  onUpdate: (id: number, value: number) => void;
}> = ({ item, onUpdate }) => {
  // Simulamos una operación costosa - SIEMPRE se ejecuta
  const expensiveCalculation = () => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`🔄 Calculando item ${item.id} SIN useMemo - ${timestamp}`);
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  };
  
  const result = expensiveCalculation();
  
  return (
    <div style={{ 
      background: '#fef2f2',
      border: '1px solid #fca5a5',
      borderRadius: '4px',
      padding: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span style={{ fontWeight: '500' }}>{item.name}</span>
        <div style={{ fontSize: '0.75rem', color: '#991b1b' }}>
          Cálculo: {result.toFixed(2)} (sin memo)
        </div>
        <div style={{ fontSize: '0.625rem', color: '#7f1d1d', fontStyle: 'italic' }}>
          ⚠️ Se recalcula en CADA render
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>{item.value}</span>
        <button 
          onClick={() => onUpdate(item.id, item.value + 1)}
          style={{ 
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer'
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
};

// Componente optimizado con memo
const OptimizedListItem = memo<{ 
  item: { id: number; name: string; value: number }; 
  onUpdate: (id: number, value: number) => void;
}>(({ item, onUpdate }) => {
  // Misma operación costosa, pero memorizada con useMemo
  const expensiveCalculation = useMemo(() => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`⚡ Calculando item ${item.id} CON useMemo - ${timestamp} (solo cuando cambia value: ${item.value})`);
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }, [item.value]); // Solo recalcula si cambia el value del item específico
  
  return (
    <div style={{ 
      background: '#f0fdf4',
      border: '1px solid #86efac',
      borderRadius: '4px',
      padding: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span style={{ fontWeight: '500' }}>{item.name}</span>
        <div style={{ fontSize: '0.75rem', color: '#166534' }}>
          Cálculo: {expensiveCalculation.toFixed(2)} (con memo)
        </div>
        <div style={{ fontSize: '0.625rem', color: '#14532d', fontStyle: 'italic' }}>
          ✅ Solo recalcula cuando value cambia
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>{item.value}</span>
        <button 
          onClick={() => onUpdate(item.id, item.value + 1)}
          style={{ 
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer'
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
});

OptimizedListItem.displayName = 'OptimizedListItem';

// Componente para mostrar renders (versión corregida)
const RenderCounter: React.FC<{ label: string; color: string }> = ({ label, color }) => {
  const renderCountRef = React.useRef(0);
  renderCountRef.current += 1;
  
  return (
    <div style={{ 
      background: color,
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    }}>
      {label}: {renderCountRef.current}
    </div>
  );
};

// Nuevos componentes para el ejemplo de useCallback mejorado
const BadFilterComponent: React.FC<{ 
  items: string[]; 
  filterFunction: (item: string) => boolean;
  renderTrigger?: number; // Para forzar re-renders
}> = ({ items, filterFunction, renderTrigger }) => {
  console.log('🔴 BadFilterComponent renderizado - trigger:', renderTrigger);
  const filteredItems = items.filter(filterFunction);
  
  return (
    <div style={{ 
      background: '#fef2f2',
      border: '1px solid #fca5a5',
      borderRadius: '4px',
      padding: '1rem'
    }}>
      <RenderCounter label="Renders" color="#ef4444" />
      <div style={{ 
        marginTop: '0.5rem',
        fontSize: '0.875rem'
      }}>
        <strong>Items filtrados: {filteredItems.length}</strong>
        <div style={{ 
          maxHeight: '120px',
          overflowY: 'auto',
          marginTop: '0.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <div key={index} style={{ 
              background: '#fee2e2',
              padding: '0.25rem 0.5rem',
              margin: '0.25rem 0',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#991b1b', 
        marginTop: '0.5rem',
        fontStyle: 'italic'
      }}>
        Sin useCallback - nueva función en cada render
      </div>
    </div>
  );
};

// Componente optimizado que usa memo y useCallback
const GoodFilterComponent = memo<{ 
  items: string[]; 
  filterFunction: (item: string) => boolean;
  renderTrigger?: number; // Para forzar re-renders
}>(({ items, filterFunction, renderTrigger }) => {
  console.log('🟢 GoodFilterComponent renderizado - trigger:', renderTrigger);
  const filteredItems = items.filter(filterFunction);
  
  return (
    <div style={{ 
      background: '#f0fdf4',
      border: '1px solid #86efac',
      borderRadius: '4px',
      padding: '1rem'
    }}>
      <RenderCounter label="Renders" color="#10b981" />
      <div style={{ 
        marginTop: '0.5rem',
        fontSize: '0.875rem'
      }}>
        <strong>Items filtrados: {filteredItems.length}</strong>
        <div style={{ 
          maxHeight: '120px',
          overflowY: 'auto',
          marginTop: '0.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <div key={index} style={{ 
              background: '#dcfce7',
              padding: '0.25rem 0.5rem',
              margin: '0.25rem 0',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#166534', 
        marginTop: '0.5rem',
        fontStyle: 'italic'
      }}>
        Con memo + useCallback - solo re-renderiza cuando es necesario
      </div>
    </div>
  );
});

GoodFilterComponent.displayName = 'GoodFilterComponent';

const PerformanceSection: React.FC = () => {
  return (
    <SectionLayout
      title="Optimización de Rendimiento"
      description="useMemo, useCallback y React.memo para optimizar el rendimiento de tus aplicaciones React."
      color="#F59E0B"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: useMemo vs sin optimización */}
        <div className="example-card">
          <h3 className="example-title">useMemo - Memoización de Cálculos</h3>
          <p className="example-description">
            Compara el rendimiento entre componentes con y sin useMemo. Abre la consola para ver las diferencias.
          </p>
          
          <div className="interactive-demo">
            <UseMemoExample />
          </div>
          
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Zap size={20} color="#f59e0b" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.5rem' }}>
                Cómo probar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#78350f', lineHeight: '1.5' }}>
                1. <strong>Abre la consola del navegador</strong> (F12)<br/>
                2. <strong>Haz clic en "Forzar Re-render"</strong> - los items rojos recalculan SIEMPRE<br/>
                3. <strong>Haz clic en "+1" en cualquier item</strong> - el item verde solo recalcula ESE item específico<br/>
                ¡Observa la diferencia en la consola!
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// ❌ SIN useMemo - Recalcula en cada render
function ExpensiveComponent({ items }) {
  const expensiveValue = () => {
    console.log('🔄 Calculando valor costoso...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  };
  
  // Se ejecuta en CADA render, incluso si 'items' no cambió
  const result = expensiveValue();
  
  return <div>Resultado: {result}</div>;
}

// ✅ CON useMemo - Solo recalcula cuando cambian las dependencias
function OptimizedComponent({ items }) {
  const expensiveValue = useMemo(() => {
    console.log('⚡ Calculando valor costoso (memoizado)...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }, [items]); // Solo recalcula si 'items' cambia
  
  return <div>Resultado: {expensiveValue}</div>;
}

// Cuándo usar useMemo:
// ✅ Cálculos costosos que dependen de props/state
// ✅ Crear objetos/arrays que se pasan como props
// ✅ Filtrar/transformar arrays grandes
// ❌ Valores primitivos simples
// ❌ Operaciones que ya son rápidas`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: useCallback */}
        <div className="example-card">
          <h3 className="example-title">useCallback - Memoización de Funciones</h3>
          <p className="example-description">
            useCallback evita que los componentes hijos se re-rendericen innecesariamente cuando las funciones no han cambiado.
          </p>
          
          <div className="interactive-demo">
            <UseCallbackExample />
          </div>
          
          <div style={{
            background: '#f3e8ff',
            border: '1px solid #7c3aed',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Cpu size={20} color="#7c3aed" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#5b21b6', display: 'block', marginBottom: '0.5rem' }}>
                Cómo probar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#6b46c1', lineHeight: '1.5' }}>
                1. <strong>Abre la consola del navegador</strong> (F12)<br/>
                2. <strong>Incrementa el contador</strong> - el componente rojo se re-renderiza innecesariamente, el verde NO<br/>
                3. <strong>Cambia el filtro</strong> - ambos se re-renderizan (correcto, función cambió)<br/>
                4. <strong>Agrega frutas</strong> - ambos se re-renderizan (correcto, lista cambió)<br/>
                ¡Observa la consola para ver cuándo se crean nuevas funciones!
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// ❌ SIN useCallback - Nueva función en cada render
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Nueva función en cada render!
  const handleAction = () => {
    console.log('Acción ejecutada');
  };
  
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ChildComponent data={text} onAction={handleAction} />
      {/* ChildComponent se re-renderiza aunque 'text' no cambió 
          porque handleAction es una nueva función */}
    </div>
  );
}

// ✅ CON useCallback - Misma función si dependencias no cambian
function OptimizedParent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Misma función referencia si dependencias no cambian
  const handleAction = useCallback(() => {
    console.log('Acción ejecutada', count);
  }, [count]); // Solo cambia si 'count' cambia
  
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <OptimizedChildComponent data={text} onAction={handleAction} />
      {/* OptimizedChildComponent no se re-renderiza si solo cambió text
          porque handleAction mantiene la misma referencia */}
    </div>
  );
}

// Cuándo usar useCallback:
// ✅ Funciones pasadas a componentes memoizados
// ✅ Funciones en dependencias de useEffect
// ✅ Funciones costosas de crear
// ❌ Funciones que siempre cambian
// ❌ Funciones simples sin componentes hijos memoizados`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: React.memo */}
        <div className="example-card">
          <h3 className="example-title">React.memo - Componentes Memoizados</h3>
          <p className="example-description">
            React.memo evita re-renders innecesarios comparando props automáticamente.
          </p>
          
          <div className="interactive-demo">
            <ReactMemoExample />
          </div>
          
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Clock size={20} color="#10b981" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#059669', display: 'block', marginBottom: '0.5rem' }}>
                Cómo probar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#047857', lineHeight: '1.5' }}>
                1. <strong>Abre la consola del navegador</strong> (F12)<br/>
                2. <strong>Incrementa "Parent Count"</strong> - el componente regular se re-renderiza SIEMPRE, el memoizado NO<br/>
                3. <strong>Cambia el nombre o edad</strong> - ambos se re-renderizan (correcto, sus props cambiaron)<br/>
                ¡Observa los contadores de renders y la consola!
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// ❌ Componente normal - Se re-renderiza siempre
function RegularComponent({ name, age }) {
  console.log('🔄 RegularComponent renderizado');
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Edad: {age}</p>
    </div>
  );
}

// ✅ Componente memoizado - Solo se re-renderiza si props cambian
const MemoizedComponent = memo(function MemoizedComponent({ name, age }) {
  console.log('⚡ MemoizedComponent renderizado');
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Edad: {age}</p>
    </div>
  );
});

// ✅ Componente memoizado con comparación personalizada
const CustomMemoComponent = memo(
  function CustomMemoComponent({ user, settings }) {
    console.log('🎯 CustomMemoComponent renderizado');
    
    return (
      <div>
        <h3>{user.name}</h3>
        <p>Theme: {settings.theme}</p>
      </div>
    );
  },
  // Comparación personalizada
  (prevProps, nextProps) => {
    return (
      prevProps.user.name === nextProps.user.name &&
      prevProps.settings.theme === nextProps.settings.theme
    );
  }
);

// Cuándo usar React.memo:
// ✅ Componentes que reciben props complejas
// ✅ Componentes que se renderizan frecuentemente
// ✅ Componentes en listas grandes
// ❌ Componentes que siempre cambian
// ❌ Componentes muy simples
// ❌ Componentes sin props o props primitivas simples`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Comparación de Rendimiento */}
        <div className="example-card">
          <h3 className="example-title">Dashboard de Rendimiento</h3>
          <p className="example-description">
            Comparación visual de diferentes técnicas de optimización en acción.
          </p>
          
          <div className="interactive-demo">
            <PerformanceDashboard />
          </div>
          
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <BarChart3 size={20} color="#0ea5e9" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#075985', lineHeight: '1.5' }}>
                Haz clic en las métricas para simular eventos de rendimiento. Usa el botón de colapsar/expandir 
                para ver los tips de optimización. ¡Es tu centro de comando para el rendimiento!
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Mejores prácticas de rendimiento en React:

// 1. MEDIR ANTES DE OPTIMIZAR
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Render:', { id, phase, actualDuration });
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>

// 2. PATRONES DE OPTIMIZACIÓN

// ✅ Mover estado hacia abajo
function App() {
  return (
    <div>
      <Header />
      <ExpensiveComponent />
      <CounterSection /> {/* Estado local aquí */}
    </div>
  );
}

// ✅ Dividir componentes grandes
const LargeComponent = () => {
  return (
    <>
      <StaticPart />
      <DynamicPart />
    </>
  );
};

// ✅ Virtualización para listas grandes
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={35}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        {data[index].name}
      </div>
    )}
  </List>
);

// ✅ Lazy loading de componentes
const LazyComponent = lazy(() => import('./ExpensiveComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}

// 🎯 CHECKLIST DE RENDIMIENTO:
// □ Usar React DevTools Profiler
// □ Medir antes de optimizar
// □ Mover estado lo más cerca posible de donde se usa
// □ Usar memo para componentes costosos
// □ Usar useMemo para cálculos costosos
// □ Usar useCallback para funciones en dependencias
// □ Considerar virtualización para listas grandes
// □ Implementar lazy loading para rutas
// □ Evitar objetos/arrays inline en props
// □ Usar keys estables en listas`}
            </pre>
          </details>
        </div>
      </div>
    </SectionLayout>
  );
};

// ========== COMPONENTES DE EJEMPLO ==========

function UseMemoExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ]);
  const [trigger, setTrigger] = useState(0);
  
  const updateItem = useCallback((id: number, value: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  }, []);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h4 style={{ margin: 0, color: '#F59E0B' }}>
          📊 Comparación de Rendimiento
        </h4>
        <button 
          onClick={() => setTrigger(prev => prev + 1)}
          style={{ 
            background: '#F59E0B',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Play size={14} />
          Forzar Re-render ({trigger})
        </button>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={16} />
            Sin useMemo (Lento)
          </h5>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {items.map(item => (
              <ExpensiveListItem 
                key={item.id} 
                item={item} 
                onUpdate={updateItem}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Zap size={16} />
            Con useMemo (Rápido)
          </h5>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {items.map(item => (
              <OptimizedListItem 
                key={item.id} 
                item={item} 
                onUpdate={updateItem}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ 
        background: '#fffbeb',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ 
          margin: 0,
          fontSize: '0.875rem',
          color: '#92400e'
        }}>
          💡 <strong>Tip:</strong> Abre la consola del navegador para ver cuándo se ejecutan los cálculos.
          Los componentes sin useMemo recalculan en cada render, mientras que los optimizados solo cuando es necesario.
        </p>
      </div>
    </div>
  );
}

function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Manzana', 'Banana', 'Naranja']);
  const [filter, setFilter] = useState('');
  
  // ❌ PROBLEMA: Nueva función en cada render
  const badFilterFunction = (item: string) => {
    console.log('🔴 Función sin useCallback creada - render ' + count);
    return item.toLowerCase().includes(filter.toLowerCase());
  };
  
  // ✅ SOLUCIÓN: Función memoizada con useCallback
  const goodFilterFunction = useCallback((item: string) => {
    console.log('🟢 Función con useCallback reutilizada - filter: ' + filter);
    return item.toLowerCase().includes(filter.toLowerCase());
  }, [filter]); // Solo cambia cuando 'filter' cambia
  
  const addItem = () => {
    const newItems = ['Uva', 'Pera', 'Kiwi', 'Mango', 'Papaya'];
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)];
    setItems(prev => [...prev, `${randomItem} ${Math.floor(Math.random() * 100)}`]);
  };
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <h5 style={{ 
          margin: '0 0 1rem 0',
          color: '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Cpu size={16} />
          Controles - Filtrador de Items
        </h5>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem'
        }}>
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Contador: {count}
            </label>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              style={{ 
                background: '#F59E0B',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Incrementar (no afecta filtro)
            </button>
          </div>
          
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Filtrar items:
            </label>
            <input 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar frutas..."
              style={{ 
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Agregar item:
            </label>
            <button 
              onClick={addItem}
              style={{ 
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Agregar Fruta
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#dc2626',
            fontSize: '0.875rem'
          }}>
            ❌ Sin useCallback
          </h5>
          <p style={{ 
            margin: '0 0 0.5rem 0',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            Nueva función en cada render
          </p>
          <BadFilterComponent 
            items={items}
            filterFunction={badFilterFunction}
            renderTrigger={count} // Forzar re-render cuando count cambia
          />
        </div>
        
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#16a34a',
            fontSize: '0.875rem'
          }}>
            ✅ Con useCallback
          </h5>
          <p style={{ 
            margin: '0 0 0.5rem 0',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            Misma función si dependencias no cambian
          </p>
          <GoodFilterComponent 
            items={items}
            filterFunction={goodFilterFunction}
            renderTrigger={count} // Forzar re-render cuando count cambia
          />
        </div>
      </div>
      
      <div style={{ 
        background: '#fffbeb',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ 
          margin: 0,
          fontSize: '0.875rem',
          color: '#92400e'
        }}>
          🎯 <strong>¡PRUEBA ESTO PASO A PASO!</strong><br/>
          📝 <strong>Abre la consola (F12)</strong> para ver los logs<br/>
          🔴 <strong>Incrementa el contador:</strong> componente rojo se re-renderiza, verde NO<br/>
          🟢 <strong>Cambia el filtro:</strong> ambos se re-renderizan (función realmente cambió)<br/>
          📊 Los contadores de renders muestran claramente la diferencia
        </p>
      </div>
    </div>
  );
}

function ReactMemoExample() {
  const [parentCount, setParentCount] = useState(0);
  const [userName, setUserName] = useState('Carlos');
  const [userAge, setUserAge] = useState(25);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <h5 style={{ margin: '0 0 1rem 0', color: '#F59E0B' }}>
          🎛️ Controles del Parent
        </h5>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem'
        }}>
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Parent Count: {parentCount}
            </label>
            <button 
              onClick={() => setParentCount(prev => prev + 1)}
              style={{ 
                background: '#F59E0B',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Incrementar Parent
            </button>
          </div>
          
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Nombre: {userName}
            </label>
            <button 
              onClick={() => setUserName(prev => prev === 'Carlos' ? 'María' : 'Carlos')}
              style={{ 
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Cambiar Nombre
            </button>
          </div>
          
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Edad: {userAge}
            </label>
            <button 
              onClick={() => setUserAge(prev => prev + 1)}
              style={{ 
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Incrementar Edad
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            ❌ Componente Regular
            <RenderCounter label="Parent" color="#F59E0B" />
          </h5>
          <RegularChildComponent name={userName} age={userAge} />
        </div>
        
        <div>
          <h5 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            ✅ Componente con memo
            <RenderCounter label="Parent" color="#F59E0B" />
          </h5>
          <MemoizedChildComponent name={userName} age={userAge} />
        </div>
      </div>
      
      <div style={{ 
        background: '#fffbeb',
        border: '1px solid #F59E0B',
        borderRadius: '4px',
        padding: '0.75rem',
        marginTop: '1rem'
      }}>
        <p style={{ 
          margin: 0,
          fontSize: '0.875rem',
          color: '#92400e'
        }}>
          📈 <strong>Comparación:</strong> El componente regular se re-renderiza cada vez que el parent 
          cambia (incluso si sus props no cambiaron), mientras que el memoizado solo se re-renderiza 
          cuando sus props realmente cambian.
        </p>
      </div>
    </div>
  );
}

// Componentes auxiliares para el ejemplo de memo
const RegularChildComponent: React.FC<{ name: string; age: number }> = ({ name, age }) => {
  console.log('🔴 RegularChildComponent renderizado - name:', name, 'age:', age);
  
  return (
    <div style={{ 
      background: '#fef2f2',
      border: '1px solid #fca5a5',
      borderRadius: '4px',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <RenderCounter label="Renders" color="#ef4444" />
      <h4 style={{ margin: '0.5rem 0', color: '#333' }}>{name}</h4>
      <p style={{ margin: '0', color: '#666' }}>Edad: {age} años</p>
      <div style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '0.5rem' }}>
        Sin memo - se re-renderiza siempre que el parent cambia
      </div>
      <div style={{ 
        fontSize: '0.625rem', 
        color: '#7f1d1d', 
        marginTop: '0.25rem',
        fontStyle: 'italic' 
      }}>
        Última renderización: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

const MemoizedChildComponent = memo<{ name: string; age: number }>(({ name, age }) => {
  console.log('🟢 MemoizedChildComponent renderizado - name:', name, 'age:', age);
  
  return (
    <div style={{ 
      background: '#f0fdf4',
      border: '1px solid #86efac',
      borderRadius: '4px',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <RenderCounter label="Renders" color="#10b981" />
      <h4 style={{ margin: '0.5rem 0', color: '#333' }}>{name}</h4>
      <p style={{ margin: '0', color: '#666' }}>Edad: {age} años</p>
      <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '0.5rem' }}>
        Con memo - solo re-renderiza si props (name/age) cambian
      </div>
      <div style={{ 
        fontSize: '0.625rem', 
        color: '#14532d', 
        marginTop: '0.25rem',
        fontStyle: 'italic' 
      }}>
        Última renderización: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
});

MemoizedChildComponent.displayName = 'MemoizedChildComponent';

function PerformanceDashboard() {
  const [metrics, setMetrics] = useState({
    renders: 0,
    memoHits: 0,
    callbackHits: 0,
    wastedRenders: 0
  });
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const incrementMetric = useCallback((metric: keyof typeof metrics) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: prev[metric] + 1
    }));
  }, []);
  
  const resetMetrics = useCallback(() => {
    setMetrics({
      renders: 0,
      memoHits: 0,
      callbackHits: 0,
      wastedRenders: 0
    });
  }, []);
  
  const tips = [
    "🔍 Usa React DevTools Profiler para identificar componentes lentos",
    "📊 Mide primero, optimiza después - no optimices prematuramente",
    "🎯 useMemo para cálculos costosos que dependen de props/state",
    "🔄 useCallback para funciones pasadas a componentes memoizados",
    "⚡ React.memo para componentes que reciben props complejas",
    "📱 Considera virtualización para listas de más de 100 elementos",
    "🚀 Implementa lazy loading para componentes no críticos",
    "💾 Mueve el estado lo más cerca posible de donde se usa"
  ];
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h4 style={{ 
          margin: 0,
          color: '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <BarChart3 size={20} />
          Dashboard de Rendimiento
        </h4>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ 
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          
          <button 
            onClick={resetMetrics}
            style={{ 
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          background: '#fef3c7',
          border: '1px solid #F59E0B',
          borderRadius: '4px',
          padding: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={() => incrementMetric('renders')}
        >
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#F59E0B'
          }}>
            {metrics.renders}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#92400e' }}>
            Total Renders
          </div>
        </div>
        
        <div style={{ 
          background: '#f0fdf4',
          border: '1px solid #10b981',
          borderRadius: '4px',
          padding: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={() => incrementMetric('memoHits')}
        >
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            {metrics.memoHits}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857' }}>
            Memo Hits
          </div>
        </div>
        
        <div style={{ 
          background: '#fef7ff',
          border: '1px solid #8b5cf6',
          borderRadius: '4px',
          padding: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={() => incrementMetric('callbackHits')}
        >
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8b5cf6'
          }}>
            {metrics.callbackHits}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7c3aed' }}>
            Callback Hits
          </div>
        </div>
        
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={() => incrementMetric('wastedRenders')}
        >
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ef4444'
          }}>
            {metrics.wastedRenders}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>
            Wasted Renders
          </div>
        </div>
      </div>
      
      {!isCollapsed && (
        <div style={{ 
          background: '#fff7ed',
          border: '1px solid #F59E0B',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <h5 style={{ 
            margin: '0 0 0.75rem 0',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Star size={16} />
            Tips de Optimización
          </h5>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '0.5rem'
          }}>
            {tips.map((tip, index) => (
              <div 
                key={index}
                style={{ 
                  fontSize: '0.875rem',
                  color: '#9a3412',
                  padding: '0.25rem 0'
                }}
              >
                {tip}
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '0.75rem',
            padding: '0.75rem',
            background: '#fef3c7',
            border: '1px solid #F59E0B',
            borderRadius: '4px'
          }}>
            <strong style={{ color: '#92400e' }}>Regla de Oro:</strong>
            <p style={{ 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem',
              color: '#92400e'
            }}>
              "Haz que funcione, hazlo correcto, hazlo rápido" - Optimiza solo cuando tengas 
              problemas de rendimiento reales, no por optimizar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceSection;

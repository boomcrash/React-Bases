import React, { useState } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { ShoppingCart, Eye, EyeOff, Plus, Minus } from 'lucide-react';

const StateSection: React.FC = () => {
  return (
    <SectionLayout
      title="State (Estado)"
      description="El state permite que los componentes 'recuerden' información y cambien con el tiempo. Es la memoria de tu componente."
      color="#8B5CF6"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Contador Simple */}
        <div className="example-card">
          <h3 className="example-title">useState Básico</h3>
          <p className="example-description">
            El ejemplo más simple de state: un contador que aumenta y disminuye.
          </p>
          
          <div className="interactive-demo">
            <SimpleCounter />
          </div>
          
          <div style={{ 
            background: '#f3f4f6',
            border: '1px solid #8B5CF6',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#5b21b6', fontSize: '0.875rem' }}>
              🔢 <strong>Experimenta:</strong> Haz clic en los botones para ver cómo useState 
              actualiza el valor del contador inmediatamente. Cada clic re-renderiza el componente 
              con el nuevo valor.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function SimpleCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h3>Contador: {count}</h3>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
      <button onClick={() => setCount(0)}>
        Reiniciar
      </button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Toggle Visibility */}
        <div className="example-card">
          <h3 className="example-title">Toggle de Visibilidad</h3>
          <p className="example-description">
            State con valores booleanos para mostrar/ocultar contenido.
          </p>
          
          <div className="interactive-demo">
            <PasswordToggle />
          </div>
          
          <div style={{ 
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
              👁️ <strong>Prueba:</strong> Escribe una contraseña y usa el botón del ojo para 
              alternar la visibilidad. Observa cómo el estado booleano cambia el tipo de input 
              y el icono mostrado.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function PasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  
  return (
    <div>
      <input
        type={isVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa tu contraseña"
      />
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Lista de Tareas */}
        <div className="example-card">
          <h3 className="example-title">Lista de Tareas</h3>
          <p className="example-description">
            State con arrays: agregar, eliminar y marcar tareas como completadas.
          </p>
          
          <div className="interactive-demo">
            <TodoList />
          </div>
          
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#14532d', fontSize: '0.875rem' }}>
              ✅ <strong>Interactúa:</strong> Agrega nuevas tareas, márcalas como completadas 
              y elimínalas. Observa cómo el estado del array se actualiza y cómo cada tarea 
              mantiene su propio estado de "completada".
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={addTodo}>Agregar</button>
      
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Carrito de Compras */}
        <div className="example-card">
          <h3 className="example-title">Carrito de Compras</h3>
          <p className="example-description">
            State complejo con objetos: agregar productos al carrito y calcular totales.
          </p>
          
          <div className="interactive-demo">
            <ShoppingCartDemo />
          </div>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #F59E0B',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
              🛒 <strong>Compra:</strong> Agrega productos al carrito y observa cómo se actualiza 
              la cantidad y el total automáticamente. Nota cómo el estado maneja objetos complejos 
              y cálculos derivados en tiempo real.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function ShoppingCartDemo() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 75 }
  ]);
  
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  return (
    <div>
      <h4>Productos</h4>
      {products.map(product => (
        <button 
          key={product.id}
          onClick={() => addToCart(product)}
        >
          {product.name} - ${'{product.price}'}
        </button>
      ))}
      
      <h4>Carrito (Total: ${'{total}'})</h4>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x{item.quantity}
        </div>
      ))}
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

function SimpleCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ 
      background: 'white', 
      border: '1px solid #e5e7eb', 
      borderRadius: '12px', 
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#8B5CF6', 
        fontSize: '2rem', 
        margin: '0 0 1rem 0' 
      }}>
        {count}
      </h3>
      
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          className="demo-button"
          onClick={() => setCount(count - 1)}
          style={{ 
            background: '#ef4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Minus size={16} /> Decrementar
        </button>
        
        <button 
          className="demo-button"
          onClick={() => setCount(0)}
          style={{ background: '#6b7280', color: 'white' }}
        >
          Reiniciar
        </button>
        
        <button 
          className="demo-button"
          onClick={() => setCount(count + 1)}
          style={{ 
            background: '#10b981',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Plus size={16} /> Incrementar
        </button>
      </div>
    </div>
  );
}

function PasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <input
          className="demo-input"
          type={isVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          style={{ flex: 1 }}
        />
        <button 
          className="demo-button"
          onClick={() => setIsVisible(!isVisible)}
          style={{ 
            background: isVisible ? '#8B5CF6' : '#d1d5db',
            color: isVisible ? 'white' : '#374151',
            padding: '0.5rem'
          }}
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
        Estado: {isVisible ? 'Visible' : 'Oculto'} | 
        Caracteres: {password.length}
      </p>
    </div>
  );
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Entender useState', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1rem'
      }}>
        <input
          className="demo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          style={{ flex: 1 }}
        />
        <button 
          className="demo-button"
          onClick={addTodo}
          style={{ background: '#8B5CF6', color: 'white' }}
        >
          Agregar
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {todos.map(todo => (
          <div 
            key={todo.id}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              background: todo.completed ? '#f0fdf4' : '#fafafa',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span 
              style={{ 
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#6b7280' : '#333'
              }}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ 
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      
      <p style={{ 
        color: '#666', 
        fontSize: '0.875rem', 
        margin: '1rem 0 0 0',
        textAlign: 'center'
      }}>
        Total: {todos.length} tareas | Completadas: {todos.filter(t => t.completed).length}
      </p>
    </div>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

function ShoppingCartDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 75 },
    { id: 4, name: 'Monitor', price: 300 }
  ]);
  
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>
        📦 Productos Disponibles
      </h4>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {products.map(product => (
          <button 
            key={product.id}
            className="demo-button"
            onClick={() => addToCart(product)}
            style={{ 
              background: '#8B5CF6',
              color: 'white',
              padding: '0.75rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{product.name}</span>
            <span style={{ fontSize: '0.875rem' }}>${product.price}</span>
          </button>
        ))}
      </div>
      
      <div style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1rem'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: 0, color: '#333' }}>
            <ShoppingCart size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Carrito
          </h4>
          <span style={{ 
            background: '#10b981',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Total: ${total}
          </span>
        </div>
        
        {cart.length === 0 ? (
          <p style={{ color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
            El carrito está vacío
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {cart.map(item => (
              <div 
                key={item.id}
                style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  background: '#f8fafc',
                  borderRadius: '4px'
                }}
              >
                <span>{item.name}</span>
                <span style={{ color: '#6b7280' }}>
                  {item.quantity} x ${item.price} = ${item.quantity * item.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StateSection;

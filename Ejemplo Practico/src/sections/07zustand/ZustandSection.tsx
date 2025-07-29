import React from 'react';
import { create } from 'zustand';
import SectionLayout from '../../components/SectionLayout';
import { Plus, Minus, ShoppingCart, Trash2, Heart, User, Settings } from 'lucide-react';

// ========== STORES DE ZUSTAND ==========

// 1. Store simple para contador
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}));

// 2. Store para carrito de compras
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: updatedItems, total };
    } else {
      const updatedItems = [...state.items, { ...product, quantity: 1 }];
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: updatedItems, total };
    }
  }),
  
  removeItem: (id) => set((state) => {
    const updatedItems = state.items.filter(item => item.id !== id);
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { items: updatedItems, total };
  }),
  
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity <= 0) {
      const updatedItems = state.items.filter(item => item.id !== id);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: updatedItems, total };
    }
    
    const updatedItems = state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { items: updatedItems, total };
  }),
  
  clearCart: () => set({ items: [], total: 0 }),
  
  getItemCount: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
}));

// 3. Store para usuario y preferencias
interface UserStore {
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  preferences: {
    theme: 'light' | 'dark';
    language: 'es' | 'en';
    notifications: boolean;
  };
  favorites: number[];
  login: (userData: { name: string; email: string; avatar: string }) => void;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserStore['preferences']>) => void;
  toggleFavorite: (id: number) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: true,
  },
  favorites: [],
  
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, favorites: [] }),
  
  updatePreferences: (prefs) => set((state) => ({
    preferences: { ...state.preferences, ...prefs }
  })),
  
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter(fav => fav !== id)
      : [...state.favorites, id]
  })),
}));

const ZustandSection: React.FC = () => {
  return (
    <SectionLayout
      title="Zustand - Estado Global"
      description="Zustand es una librería simple y poderosa para manejar estado global. Es como tener un 'almacén central' donde todos los componentes pueden acceder y modificar datos compartidos."
      color="#059669"
    >
      <div className="examples-grid wide-layout">
        {/* Ejemplo 1: Store Básico */}
        <div className="example-card">
          <h3 className="example-title">Store Básico - Contador Global</h3>
          <p className="example-description">
            Un contador que se comparte entre múltiples componentes usando Zustand.
          </p>
          
          <div className="interactive-demo">
            <CounterExample />
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
            <Plus size={20} color="#10b981" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#059669', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#047857', lineHeight: '1.5' }}>
                Observa cómo el contador se sincroniza automáticamente entre los dos paneles. 
                Prueba los botones +1, -1, Reset y Set 100. El estado se comparte sin necesidad de props o context.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// 1. Crear el store
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 2. Usar en componentes
function CounterDisplay() {
  const count = useCounterStore((state) => state.count);
  return <h3>Contador: {count}</h3>;
}

function CounterControls() {
  const { increment, decrement, reset } = useCounterStore();
  return (
    <div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Carrito de Compras */}
        <div className="example-card">
          <h3 className="example-title">Carrito de Compras Global</h3>
          <p className="example-description">
            Un carrito de compras completo que se mantiene sincronizado en toda la app.
          </p>
          
          <div className="interactive-demo">
            <ShoppingExample />
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
            <ShoppingCart size={20} color="#f59e0b" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#78350f', lineHeight: '1.5' }}>
                Agrega productos haciendo clic en ellos. Ajusta cantidades con +/- y elimina items con el ícono de basura. 
                El carrito se mantiene sincronizado y calcula automáticamente el total.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Store del carrito
const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const total = updatedItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      return { items: updatedItems, total };
    } else {
      const updatedItems = [...state.items, { ...product, quantity: 1 }];
      const total = updatedItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      return { items: updatedItems, total };
    }
  }),
  
  removeItem: (id) => set((state) => {
    const updatedItems = state.items.filter(item => item.id !== id);
    const total = updatedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    return { items: updatedItems, total };
  }),
  
  getItemCount: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
}));

// Uso en componentes
function ProductList() {
  const addItem = useCartStore((state) => state.addItem);
  
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => addItem(product)}>
          Agregar {product.name}
        </button>
      ))}
    </div>
  );
}

function CartSummary() {
  const { items, total, removeItem } = useCartStore();
  
  return (
    <div>
      <h3>Carrito: ${'{total}'}</h3>
      {items.map(item => (
        <div key={item.id}>
          {item.name} x{item.quantity}
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Usuario y Preferencias */}
        <div className="example-card">
          <h3 className="example-title">Usuario y Preferencias</h3>
          <p className="example-description">
            Manejo de sesión de usuario, preferencias y favoritos con Zustand.
          </p>
          
          <div className="interactive-demo">
            <UserExample />
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
            <User size={20} color="#7c3aed" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#5b21b6', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#6b46c1', lineHeight: '1.5' }}>
                Haz clic en "Iniciar Sesión" para loguearte. Luego cambia las preferencias (notificaciones, tema, idioma) y 
                marca/desmarca favoritos. Todo se mantiene en el estado global.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Store de usuario
const useUserStore = create((set) => ({
  user: null,
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: true,
  },
  favorites: [],
  
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, favorites: [] }),
  
  updatePreferences: (prefs) => set((state) => ({
    preferences: { ...state.preferences, ...prefs }
  })),
  
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter(fav => fav !== id)
      : [...state.favorites, id]
  })),
}));

// Componente de login
function LoginForm() {
  const login = useUserStore((state) => state.login);
  
  const handleLogin = () => {
    login({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      avatar: '👤'
    });
  };
  
  return <button onClick={handleLogin}>Iniciar Sesión</button>;
}

// Componente de perfil
function UserProfile() {
  const { user, logout, preferences, updatePreferences } = useUserStore();
  
  if (!user) return <LoginForm />;
  
  return (
    <div>
      <h3>Bienvenido, {user.name}!</h3>
      <p>Email: {user.email}</p>
      
      <label>
        <input
          type="checkbox"
          checked={preferences.notifications}
          onChange={(e) => updatePreferences({ 
            notifications: e.target.checked 
          })}
        />
        Recibir notificaciones
      </label>
      
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Múltiples Stores Conectados */}
        <div className="example-card">
          <h3 className="example-title">Dashboard Completo</h3>
          <p className="example-description">
            Ejemplo que combina múltiples stores para crear un dashboard interactivo.
          </p>
          
          <div className="interactive-demo">
            <DashboardExample />
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
            <Settings size={20} color="#0ea5e9" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#075985', lineHeight: '1.5' }}>
                Este dashboard combina todos los stores anteriores. Interactúa con los otros ejemplos y observa 
                cómo se reflejan automáticamente aquí: contador, carrito, usuario y favoritos.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Dashboard que usa múltiples stores
function Dashboard() {
  const user = useUserStore((state) => state.user);
  const count = useCounterStore((state) => state.count);
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const total = useCartStore((state) => state.total);
  
  return (
    <div className="dashboard">
      <header>
        <h2>Dashboard</h2>
        {user ? (
          <span>Bienvenido, {user.name}</span>
        ) : (
          <span>Usuario no logueado</span>
        )}
      </header>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Contador Global</h3>
          <p>{count}</p>
        </div>
        
        <div className="stat-card">
          <h3>Items en Carrito</h3>
          <p>{cartItemCount}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total del Carrito</h3>
          <p>${'{total}'}</p>
        </div>
      </div>
    </div>
  );
}

// Ventajas de Zustand:
// 1. Simple y liviano (2KB)
// 2. No requiere providers
// 3. TypeScript nativo
// 4. DevTools automáticos
// 5. Actualización granular
// 6. Fácil de testear`}
            </pre>
          </details>
        </div>
      </div>
    </SectionLayout>
  );
};

// ========== COMPONENTES DE EJEMPLO ==========

function CounterExample() {
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#059669' }}>
        🔄 Contador Compartido
      </h4>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <CounterDisplay />
        <CounterControls />
      </div>
      
      <div style={{ 
        background: '#f0fdf4',
        border: '1px solid #059669',
        borderRadius: '4px',
        padding: '0.75rem',
        fontSize: '0.875rem',
        color: '#047857'
      }}>
        💡 <strong>Tip:</strong> El estado se comparte automáticamente entre los componentes
      </div>
    </div>
  );
}

function CounterDisplay() {
  const count = useCounterStore((state) => state.count);
  
  return (
    <div style={{ 
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#059669',
        fontSize: '2rem',
        margin: '0'
      }}>
        {count}
      </h3>
      <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.875rem' }}>
        Valor actual
      </p>
    </div>
  );
}

function CounterControls() {
  const { increment, decrement, reset, setCount } = useCounterStore();
  
  return (
    <div style={{ 
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          className="demo-button"
          onClick={decrement}
          style={{ 
            background: '#ef4444',
            color: 'white',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem'
          }}
        >
          <Minus size={14} /> -1
        </button>
        
        <button 
          className="demo-button"
          onClick={increment}
          style={{ 
            background: '#059669',
            color: 'white',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem'
          }}
        >
          <Plus size={14} /> +1
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          className="demo-button"
          onClick={reset}
          style={{ 
            background: '#6b7280',
            color: 'white',
            flex: 1
          }}
        >
          Reset
        </button>
        
        <button 
          className="demo-button"
          onClick={() => setCount(100)}
          style={{ 
            background: '#059669',
            color: 'white',
            flex: 1
          }}
        >
          Set 100
        </button>
      </div>
    </div>
  );
}

function ShoppingExample() {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 75 },
    { id: 4, name: 'Monitor', price: 300 }
  ];
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <ProductList products={products} />
        <CartSummary />
      </div>
    </div>
  );
}

function ProductList({ products }: { products: Product[] }) {
  const addItem = useCartStore((state) => state.addItem);
  
  return (
    <div>
      <h4 style={{ margin: '0 0 1rem 0', color: '#059669' }}>
        📦 Productos
      </h4>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {products.map(product => (
          <button 
            key={product.id}
            className="demo-button"
            onClick={() => addItem(product)}
            style={{ 
              background: '#059669',
              color: 'white',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{product.name}</span>
            <span style={{ fontWeight: 'bold' }}>${product.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CartSummary() {
  const { items, total, removeItem, updateQuantity, clearCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  
  return (
    <div>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h4 style={{ margin: 0, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={20} />
          Carrito ({itemCount})
        </h4>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ 
            background: '#059669',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          }}>
            ${total}
          </span>
          
          {items.length > 0 && (
            <button 
              onClick={clearCart}
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
              Limpiar
            </button>
          )}
        </div>
      </div>
      
      {items.length === 0 ? (
        <div style={{ 
          textAlign: 'center',
          color: '#6b7280',
          fontStyle: 'italic',
          padding: '2rem 1rem'
        }}>
          🛒 Carrito vacío
        </div>
      ) : (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {items.map(item => (
            <div 
              key={item.id}
              style={{ 
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ flex: 1, fontSize: '0.875rem' }}>{item.name}</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ 
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '0.125rem',
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Minus size={10} />
                </button>
                
                <span style={{ 
                  minWidth: '20px',
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {item.quantity}
                </span>
                
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ 
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '0.125rem',
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={10} />
                </button>
              </div>
              
              <span style={{ 
                color: '#059669',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                minWidth: '40px',
                textAlign: 'right'
              }}>
                ${item.quantity * item.price}
              </span>
              
              <button 
                onClick={() => removeItem(item.id)}
                style={{ 
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserExample() {
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <UserProfile />
        <UserPreferences />
      </div>
    </div>
  );
}

function UserProfile() {
  const { user, login, logout } = useUserStore();
  
  const handleLogin = () => {
    login({
      name: 'Ana García',
      email: 'ana@example.com',
      avatar: '👩‍💼'
    });
  };
  
  return (
    <div style={{ 
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      padding: '1rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <User size={20} />
        Perfil de Usuario
      </h4>
      
      {user ? (
        <div>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>{user.avatar}</span>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>{user.name}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>{user.email}</p>
            </div>
          </div>
          
          <button 
            className="demo-button"
            onClick={logout}
            style={{ 
              background: '#ef4444',
              color: 'white',
              width: '100%'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            No hay usuario logueado
          </p>
          <button 
            className="demo-button"
            onClick={handleLogin}
            style={{ 
              background: '#059669',
              color: 'white',
              width: '100%'
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

function UserPreferences() {
  const { preferences, updatePreferences, favorites, toggleFavorite } = useUserStore();
  
  const favoriteItems = [
    { id: 1, name: 'Producto A' },
    { id: 2, name: 'Producto B' },
    { id: 3, name: 'Producto C' }
  ];
  
  return (
    <div style={{ 
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      padding: '1rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Settings size={20} />
        Preferencias
      </h4>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <label style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => updatePreferences({ notifications: e.target.checked })}
          />
          <span style={{ fontSize: '0.875rem' }}>Recibir notificaciones</span>
        </label>
        
        <div>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Tema:
          </label>
          <select
            value={preferences.theme}
            onChange={(e) => updatePreferences({ theme: e.target.value as 'light' | 'dark' })}
            style={{ 
              width: '100%',
              padding: '0.25rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
        
        <div>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Idioma:
          </label>
          <select
            value={preferences.language}
            onChange={(e) => updatePreferences({ language: e.target.value as 'es' | 'en' })}
            style={{ 
              width: '100%',
              padding: '0.25rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div>
          <h5 style={{ 
            margin: '0.5rem 0 0.25rem 0',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Favoritos ({favorites.length}):
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {favoriteItems.map(item => (
              <button
                key={item.id}
                onClick={() => toggleFavorite(item.id)}
                style={{ 
                  background: 'none',
                  border: 'none',
                  padding: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <Heart 
                  size={14}
                  fill={favorites.includes(item.id) ? '#ef4444' : 'none'}
                  color={favorites.includes(item.id) ? '#ef4444' : '#9ca3af'}
                />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardExample() {
  const user = useUserStore((state) => state.user);
  const count = useCounterStore((state) => state.count);
  const { getItemCount, total } = useCartStore();
  const cartItemCount = getItemCount();
  const favorites = useUserStore((state) => state.favorites);
  
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
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ margin: 0, color: '#059669' }}>
          📊 Dashboard Global
        </h4>
        {user && (
          <span style={{ 
            background: '#f0fdf4',
            color: '#059669',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            border: '1px solid #059669'
          }}>
            {user.avatar} {user.name}
          </span>
        )}
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem'
      }}>
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
            color: '#F59E0B'
          }}>
            {count}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#92400e' }}>
            Contador Global
          </div>
        </div>
        
        <div style={{ 
          background: '#ddd6fe',
          border: '1px solid #8B5CF6',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8B5CF6'
          }}>
            {cartItemCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B46C1' }}>
            Items en Carrito
          </div>
        </div>
        
        <div style={{ 
          background: '#f0fdf4',
          border: '1px solid #059669',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#059669'
          }}>
            ${total}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857' }}>
            Total Carrito
          </div>
        </div>
        
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ef4444'
          }}>
            {favorites.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>
            Favoritos
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#f0fdf4',
        border: '1px solid #059669',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#047857'
      }}>
        <strong>🌟 Ventajas de Zustand:</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1rem' }}>
          <li>Simple y liviano (2KB)</li>
          <li>No requiere providers ni context</li>
          <li>TypeScript nativo</li>
          <li>Updates granulares automáticas</li>
        </ul>
      </div>
    </div>
  );
}

export default ZustandSection;

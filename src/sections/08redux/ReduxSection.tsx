import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import SectionLayout from '../../components/SectionLayout';
import { Plus, Minus, ShoppingCart, Trash2, User, Bell, Star } from 'lucide-react';

// ========== REDUX SLICES ==========

// 1. Counter Slice
interface CounterState {
  value: number;
  history: number[];
}

const initialCounterState: CounterState = {
  value: 0,
  history: [0]
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    reset: (state) => {
      state.value = 0;
      state.history = [0];
    },
    clearHistory: (state) => {
      state.history = [state.value];
    }
  }
});

// 2. Shopping Cart Slice
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  discount: number;
}

const initialCartState: CartState = {
  items: [],
  isOpen: false,
  discount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    }
  }
});

// 3. User Slice
interface UserState {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
  } | null;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: 'es' | 'en';
  };
  notifications: Array<{
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: number;
  }>;
}

const initialUserState: UserState = {
  currentUser: null,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'es'
  },
  notifications: []
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string; role: 'user' | 'admin' }>) => {
      state.currentUser = {
        id: Date.now(),
        ...action.payload
      };
      state.notifications.push({
        id: Date.now(),
        message: `Bienvenido ${action.payload.name}!`,
        type: 'success',
        read: false,
        timestamp: Date.now()
      });
    },
    logout: (state) => {
      state.currentUser = null;
      state.notifications = [];
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addNotification: (state, action: PayloadAction<{ message: string; type: 'info' | 'success' | 'warning' | 'error' }>) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
        timestamp: Date.now()
      });
    },
    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

// ========== STORE CONFIGURATION ==========

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Action creators
export const counterActions = counterSlice.actions;
export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;

const ReduxSection: React.FC = () => {
  return (
    <Provider store={store}>
      <SectionLayout
        title="Redux Toolkit"
        description="Redux Toolkit es la forma moderna y recomendada de usar Redux. Simplifica la configuración y elimina mucho boilerplate."
        color="#F97316"
      >
        <div className="examples-grid wide-layout">
          {/* Ejemplo 1: Contador con Redux */}
          <div className="example-card">
            <h3 className="example-title">Contador con Redux Toolkit</h3>
            <p className="example-description">
              Contador avanzado con historial usando Redux Toolkit y createSlice.
            </p>
            
            <div className="interactive-demo">
              <CounterReduxExample />
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
              <Plus size={20} color="#f59e0b" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.5rem' }}>
                  Cómo usar este ejemplo:
                </strong>
                <p style={{ margin: 0, color: '#78350f', lineHeight: '1.5' }}>
                  Prueba los botones +1, -1, +5 y Reset. Observa cómo el historial guarda cada cambio automáticamente. 
                  Este es Redux Toolkit con createSlice - mucho más simple que Redux clásico.
                </p>
              </div>
            </div>
            
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// 1. Crear el slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  history: number[];
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, history: [0] },
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    reset: (state) => {
      state.value = 0;
      state.history = [0];
    }
  }
});

// 2. Configurar el store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// 3. Usar en componentes
function CounterComponent() {
  const { value, history } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h3>Contador: {value}</h3>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +1
      </button>
      <button onClick={() => dispatch(counterSlice.actions.incrementByAmount(5))}>
        +5
      </button>
      <p>Historial: {history.join(', ')}</p>
    </div>
  );
}`}
              </pre>
            </details>
          </div>

          {/* Ejemplo 2: Carrito Avanzado */}
          <div className="example-card">
            <h3 className="example-title">Carrito de Compras Avanzado</h3>
            <p className="example-description">
              Sistema completo de carrito con descuentos y múltiples funcionalidades.
            </p>
            
            <div className="interactive-demo">
              <CartReduxExample />
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
              <ShoppingCart size={20} color="#7c3aed" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#5b21b6', display: 'block', marginBottom: '0.5rem' }}>
                  Cómo usar este ejemplo:
                </strong>
                <p style={{ margin: 0, color: '#6b46c1', lineHeight: '1.5' }}>
                  Agrega productos Apple al carrito y ajusta el descuento con el slider. 
                  Modifica cantidades con +/- y observa cómo Redux calcula automáticamente subtotales y descuentos.
                </p>
              </div>
            </div>
            
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Cart slice con funcionalidades avanzadas
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
    discount: 0
  },
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

// Selectors
const selectCartTotal = (state: RootState) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );
  return subtotal - (subtotal * state.cart.discount / 100);
};

const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);`}
              </pre>
            </details>
          </div>

          {/* Ejemplo 3: Usuario y Notificaciones */}
          <div className="example-card">
            <h3 className="example-title">Sistema de Usuario Completo</h3>
            <p className="example-description">
              Manejo de sesión, preferencias y sistema de notificaciones en tiempo real.
            </p>
            
            <div className="interactive-demo">
              <UserReduxExample />
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
              <Bell size={20} color="#0ea5e9" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>
                  Cómo usar este ejemplo:
                </strong>
                <p style={{ margin: 0, color: '#075985', lineHeight: '1.5' }}>
                  Haz "Login Aleatorio" para crear un usuario. Luego genera notificaciones con "+ Notificación" y 
                  haz clic en ellas para marcarlas como leídas. Sistema completo de usuarios con Redux.
                </p>
              </div>
            </div>
            
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// User slice con notificaciones
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'es'
    },
    notifications: []
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = {
        id: Date.now(),
        ...action.payload
      };
      state.notifications.push({
        id: Date.now(),
        message: \`Bienvenido \${action.payload.name}!\`,
        type: 'success',
        read: false,
        timestamp: Date.now()
      });
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
        timestamp: Date.now()
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    }
  }
});

// Custom hooks
const useNotifications = () => {
  const notifications = useSelector((state: RootState) => state.user.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return { notifications, unreadCount };
};`}
              </pre>
            </details>
          </div>

          {/* Ejemplo 4: Dashboard Redux */}
          <div className="example-card">
            <h3 className="example-title">Dashboard Redux Completo</h3>
            <p className="example-description">
              Vista general que combina todos los estados Redux con selectors optimizados.
            </p>
            
            <div className="interactive-demo">
              <ReduxDashboard />
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
              <Star size={20} color="#10b981" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#059669', display: 'block', marginBottom: '0.5rem' }}>
                  Cómo usar este ejemplo:
                </strong>
                <p style={{ margin: 0, color: '#047857', lineHeight: '1.5' }}>
                  Este dashboard combina TODOS los slices de Redux. Interactúa con los ejemplos anteriores y 
                  observa cómo se actualizan automáticamente aquí: contador, carrito, usuario y notificaciones.
                </p>
              </div>
            </div>
            
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Selectors optimizados
import { createSelector } from '@reduxjs/toolkit';

const selectCartTotal = createSelector(
  [(state: RootState) => state.cart.items, (state: RootState) => state.cart.discount],
  (items, discount) => {
    const subtotal = items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
    return subtotal - (subtotal * discount / 100);
  }
);

const selectCartItemCount = createSelector(
  [(state: RootState) => state.cart.items],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

const selectUnreadNotifications = createSelector(
  [(state: RootState) => state.user.notifications],
  (notifications) => notifications.filter(n => !n.read)
);

// Dashboard component
function ReduxDashboard() {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);
  const unreadNotifications = useSelector(selectUnreadNotifications);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  
  return (
    <div className="dashboard">
      <h2>Redux Dashboard</h2>
      
      <div className="stats-grid">
        <StatCard title="Counter" value={counterValue} />
        <StatCard title="Cart Items" value={cartItemCount} />
        <StatCard title="Cart Total" value={\`$\${cartTotal}\`} />
        <StatCard title="Notifications" value={unreadNotifications.length} />
      </div>
      
      <UserStatus user={currentUser} />
    </div>
  );
}

// Ventajas de Redux Toolkit:
// 1. Menos boilerplate
// 2. Immer incluido (mutaciones "directas")
// 3. DevTools configurado automáticamente
// 4. createSlice simplifica reducers
// 5. createSelector para optimización
// 6. RTK Query para datos async`}
              </pre>
            </details>
          </div>
        </div>
      </SectionLayout>
    </Provider>
  );
};

// ========== COMPONENTES DE EJEMPLO ==========

function CounterReduxExample() {
  const { value, history } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  
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
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          background: '#fff7ed',
          border: '1px solid #F97316',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: '#F97316',
            fontSize: '2rem',
            margin: '0'
          }}>
            {value}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#9a3412', fontSize: '0.875rem' }}>
            Valor Actual
          </p>
        </div>
        
        <div style={{ 
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <button 
              className="demo-button"
              onClick={() => dispatch(counterActions.decrement())}
              style={{ 
                background: '#ef4444',
                color: 'white',
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
              onClick={() => dispatch(counterActions.increment())}
              style={{ 
                background: '#F97316',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem'
              }}
            >
              <Plus size={14} /> +1
            </button>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem'
          }}>
            <button 
              className="demo-button"
              onClick={() => dispatch(counterActions.incrementByAmount(5))}
              style={{ 
                background: '#10b981',
                color: 'white',
                fontSize: '0.75rem'
              }}
            >
              +5
            </button>
            
            <button 
              className="demo-button"
              onClick={() => dispatch(counterActions.reset())}
              style={{ 
                background: '#6b7280',
                color: 'white',
                fontSize: '0.75rem'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        background: '#fff7ed',
        border: '1px solid #F97316',
        borderRadius: '4px',
        padding: '0.75rem'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <h4 style={{ margin: 0, color: '#F97316', fontSize: '0.875rem' }}>
            📊 Historial ({history.length} cambios)
          </h4>
          <button 
            onClick={() => dispatch(counterActions.clearHistory())}
            style={{ 
              background: '#F97316',
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
        </div>
        <p style={{ 
          margin: 0,
          color: '#9a3412',
          fontSize: '0.875rem',
          wordBreak: 'break-all'
        }}>
          {history.slice(-10).join(' → ')}
          {history.length > 10 && ' ...'}
        </p>
      </div>
    </div>
  );
}

function CartReduxExample() {
  const { items, discount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  
  const products: Product[] = [
    { id: 1, name: 'MacBook Pro', price: 2499 },
    { id: 2, name: 'iPhone 15', price: 999 },
    { id: 3, name: 'AirPods Pro', price: 249 },
    { id: 4, name: 'Apple Watch', price: 399 }
  ];
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount / 100;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: '#F97316' }}>
            🛍️ Productos Apple
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
                onClick={() => dispatch(cartActions.addItem(product))}
                style={{ 
                  background: '#F97316',
                  color: 'white',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem'
                }}
              >
                <span style={{ fontSize: '0.875rem' }}>{product.name}</span>
                <span style={{ fontWeight: 'bold' }}>${product.price}</span>
              </button>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#F97316'
            }}>
              💰 Descuento (%):
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={discount}
              onChange={(e) => dispatch(cartActions.setDiscount(Number(e.target.value)))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#9a3412' }}>
              {discount}% de descuento
            </span>
          </div>
        </div>
        
        <div style={{ 
          position: 'relative',
          zIndex: 20
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: 0, color: '#F97316', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart size={20} />
              Carrito ({itemCount})
            </h4>
            
            {items.length > 0 && (
              <button 
                onClick={() => dispatch(cartActions.clearCart())}
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
            <>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxHeight: '150px',
                overflowY: 'auto',
                marginBottom: '1rem'
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
                        onClick={() => dispatch(cartActions.updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity - 1 
                        }))}
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
                        onClick={() => dispatch(cartActions.updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity + 1 
                        }))}
                        style={{ 
                          background: '#10b981',
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
                      color: '#F97316',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      minWidth: '50px',
                      textAlign: 'right'
                    }}>
                      ${item.quantity * item.price}
                    </span>
                    
                    <button 
                      onClick={() => dispatch(cartActions.removeItem(item.id))}
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
              
              <div style={{ 
                background: '#fff7ed',
                border: '1px solid #F97316',
                borderRadius: '4px',
                padding: '0.75rem'
              }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  marginBottom: '0.25rem'
                }}>
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    color: '#10b981',
                    marginBottom: '0.25rem'
                  }}>
                    <span>Descuento ({discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#F97316',
                  borderTop: '1px solid #F97316',
                  paddingTop: '0.25rem'
                }}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function UserReduxExample() {
  const { currentUser, notifications } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleLogin = () => {
    const users = [
      { name: 'Carlos Admin', email: 'carlos@admin.com', role: 'admin' as const },
      { name: 'María User', email: 'maria@user.com', role: 'user' as const }
    ];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    dispatch(userActions.login(randomUser));
  };
  
  const addRandomNotification = () => {
    const messages = [
      { message: 'Nuevo producto agregado al catálogo', type: 'info' as const },
      { message: 'Tu pedido ha sido enviado', type: 'success' as const },
      { message: 'Stock bajo en algunos productos', type: 'warning' as const },
      { message: 'Error en el procesamiento', type: 'error' as const }
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    dispatch(userActions.addNotification(randomMsg));
  };
  
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
        <div style={{ 
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#F97316', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} />
            Usuario
          </h4>
          
          {currentUser ? (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>
                  {currentUser.name}
                </h3>
                <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.875rem' }}>
                  {currentUser.email}
                </p>
                <span style={{ 
                  background: currentUser.role === 'admin' ? '#F97316' : '#10b981',
                  color: 'white',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase'
                }}>
                  {currentUser.role}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: '0.5rem',
                flexDirection: 'column'
              }}>
                <button 
                  className="demo-button"
                  onClick={addRandomNotification}
                  style={{ 
                    background: '#10b981',
                    color: 'white'
                  }}
                >
                  + Notificación
                </button>
                
                <button 
                  className="demo-button"
                  onClick={() => dispatch(userActions.logout())}
                  style={{ 
                    background: '#ef4444',
                    color: 'white'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
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
                  background: '#F97316',
                  color: 'white',
                  width: '100%'
                }}
              >
                Login Aleatorio
              </button>
            </div>
          )}
        </div>
        
        <div style={{ 
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: 0, color: '#F97316', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} />
              Notificaciones
              {unreadCount > 0 && (
                <span style={{ 
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  {unreadCount}
                </span>
              )}
            </h4>
            
            {notifications.length > 0 && (
              <button 
                onClick={() => dispatch(userActions.clearNotifications())}
                style={{ 
                  background: '#6b7280',
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
          
          {notifications.length === 0 ? (
            <div style={{ 
              textAlign: 'center',
              color: '#6b7280',
              fontStyle: 'italic',
              padding: '1rem'
            }}>
              No hay notificaciones
            </div>
          ) : (
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {notifications.slice().reverse().map(notification => (
                <div 
                  key={notification.id}
                  onClick={() => dispatch(userActions.markNotificationAsRead(notification.id))}
                  style={{ 
                    background: notification.read ? '#f9fafb' : '#fef3c7',
                    border: `1px solid ${notification.read ? '#e5e7eb' : '#F59E0B'}`,
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    opacity: notification.read ? 0.7 : 1
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{ fontSize: '0.75rem' }}>
                      {notification.type === 'success' && '✅'}
                      {notification.type === 'warning' && '⚠️'}
                      {notification.type === 'error' && '❌'}
                      {notification.type === 'info' && 'ℹ️'}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                    {!notification.read && (
                      <span style={{ 
                        background: '#ef4444',
                        borderRadius: '50%',
                        width: '6px',
                        height: '6px'
                      }} />
                    )}
                  </div>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.875rem',
                    color: '#333'
                  }}>
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReduxDashboard() {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const counterHistory = useSelector((state: RootState) => state.counter.history);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartDiscount = useSelector((state: RootState) => state.cart.discount);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const notifications = useSelector((state: RootState) => state.user.notifications);
  
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const finalTotal = cartTotal - (cartTotal * cartDiscount / 100);
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
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
        <h4 style={{ margin: 0, color: '#F97316' }}>
          📊 Redux Dashboard Completo
        </h4>
        {currentUser && (
          <span style={{ 
            background: '#fff7ed',
            color: '#F97316',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            border: '1px solid #F97316'
          }}>
            👤 {currentUser.name} ({currentUser.role})
          </span>
        )}
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
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
            {counterValue}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#92400e' }}>
            Contador Redux
          </div>
          <div style={{ fontSize: '0.625rem', color: '#92400e' }}>
            {counterHistory.length} cambios
          </div>
        </div>
        
        <div style={{ 
          background: '#fff7ed',
          border: '1px solid #F97316',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#F97316'
          }}>
            {cartItemCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9a3412' }}>
            Items Carrito
          </div>
          <div style={{ fontSize: '0.625rem', color: '#9a3412' }}>
            {cartDiscount}% descuento
          </div>
        </div>
        
        <div style={{ 
          background: '#f0fdf4',
          border: '1px solid #10b981',
          borderRadius: '4px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            ${finalTotal.toFixed(0)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857' }}>
            Total Carrito
          </div>
          <div style={{ fontSize: '0.625rem', color: '#047857' }}>
            de ${cartTotal}
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
            {unreadNotifications}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>
            Sin Leer
          </div>
          <div style={{ fontSize: '0.625rem', color: '#dc2626' }}>
            de {notifications.length}
          </div>
        </div>
      </div>
      
      <div style={{ 
        background: '#fff7ed',
        border: '1px solid #F97316',
        borderRadius: '4px',
        padding: '0.75rem'
      }}>
        <h5 style={{ 
          margin: '0 0 0.5rem 0',
          color: '#F97316',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Star size={16} />
          Ventajas de Redux Toolkit
        </h5>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: '#9a3412'
        }}>
          <div>✅ Menos boilerplate que Redux clásico</div>
          <div>✅ Immer integrado (mutaciones "directas")</div>
          <div>✅ DevTools configurado automáticamente</div>
          <div>✅ createSlice simplifica reducers</div>
          <div>✅ createSelector para optimización</div>
          <div>✅ TypeScript nativo</div>
        </div>
      </div>
    </div>
  );
}

export default ReduxSection;

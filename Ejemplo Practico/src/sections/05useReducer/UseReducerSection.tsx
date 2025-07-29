import React, { useReducer, useState } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { Plus, Minus, ShoppingCart, Trash2, Edit2, Check, X } from 'lucide-react';

const UseReducerSection: React.FC = () => {
  return (
    <SectionLayout
      title="useReducer Hook"
      description="useReducer es como useState pero para estados más complejos. Es como tener un 'gerente' que maneja todas las actualizaciones de estado de forma organizada."
      color="#DC2626"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Contador con Reducer */}
        <div className="example-card">
          <h3 className="example-title">Contador con useReducer</h3>
          <p className="example-description">
            Mismo contador que useState, pero usando useReducer para mostrar la diferencia.
          </p>
          
          <div className="interactive-demo">
            <CounterReducer />
          </div>
          
          <div style={{ 
            background: '#fee2e2',
            border: '1px solid #DC2626',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#991b1b', fontSize: '0.875rem' }}>
              🔄 <strong>Compara:</strong> Usa los botones para incrementar, decrementar y 
              establecer valores. Observa cómo useReducer maneja acciones específicas en lugar 
              de actualizar el estado directamente como useState.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// 1. Definir las acciones posibles
const counterActions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
};

// 2. Crear el reducer
function counterReducer(state, action) {
  switch (action.type) {
    case counterActions.INCREMENT:
      return { count: state.count + 1 };
    case counterActions.DECREMENT:
      return { count: state.count - 1 };
    case counterActions.RESET:
      return { count: 0 };
    default:
      throw new Error(\`Acción no reconocida: \${action.type}\`);
  }
}

// 3. Usar en el componente
function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <h3>Count: {state.count}</h3>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Todo List con Reducer */}
        <div className="example-card">
          <h3 className="example-title">Lista de Tareas Avanzada</h3>
          <p className="example-description">
            Lista de tareas con múltiples acciones: agregar, editar, eliminar, toggle.
          </p>
          
          <div className="interactive-demo">
            <TodoReducer />
          </div>
          
          <div style={{ 
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
              ✏️ <strong>Gestiona:</strong> Agrega, edita, completa y elimina tareas. Nota cómo 
              useReducer maneja múltiples acciones complejas (ADD, EDIT, TOGGLE, DELETE) 
              de forma organizada en un solo lugar.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`const todoActions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO'
};

function todoReducer(state, action) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case todoActions.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case todoActions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case todoActions.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
    default:
      return state;
  }
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Carrito de Compras Completo */}
        <div className="example-card">
          <h3 className="example-title">Carrito de Compras Completo</h3>
          <p className="example-description">
            Sistema completo de carrito con productos, cantidades y cálculos automáticos.
          </p>
          
          <div className="interactive-demo">
            <ShoppingCartReducer />
          </div>
          
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#14532d', fontSize: '0.875rem' }}>
              🛒 <strong>Experimenta:</strong> Agrega productos, cambia cantidades y elimina items. 
              Observa cómo useReducer maneja estados complejos con arrays de objetos y 
              cálculos automáticos de totales.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD_ITEM:
      const existingItem = state.items.find(item => 
        item.id === action.payload.id
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    
    case cartActions.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case cartActions.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case cartActions.CLEAR_CART:
      return { ...state, items: [] };
    
    default:
      return state;
  }
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Form con Validación */}
        <div className="example-card">
          <h3 className="example-title">Formulario con Validación</h3>
          <p className="example-description">
            Formulario complejo que maneja múltiples campos, validaciones y estados.
          </p>
          
          <div className="interactive-demo">
            <FormReducer />
          </div>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #F59E0B',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
              📝 <strong>Valida:</strong> Llena el formulario con datos válidos e inválidos para 
              ver las validaciones. Observa cómo useReducer coordina múltiples estados: 
              campos, errores, loading y éxito.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`const formActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_LOADING: 'SET_LOADING',
  RESET_FORM: 'RESET_FORM'
};

function formReducer(state, action) {
  switch (action.type) {
    case formActions.UPDATE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: action.payload.value
        }
      };
    
    case formActions.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message
        }
      };
    
    case formActions.CLEAR_ERRORS:
      return { ...state, errors: {} };
    
    case formActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case formActions.RESET_FORM:
      return {
        fields: { name: '', email: '', password: '' },
        errors: {},
        isLoading: false
      };
    
    default:
      return state;
  }
}`}
            </pre>
          </details>
        </div>
      </div>
    </SectionLayout>
  );
};

// Componentes de ejemplo

// 1. Contador con Reducer
const counterActions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_VALUE: 'SET_VALUE'
};

interface CounterState {
  count: number;
}

interface CounterAction {
  type: string;
  payload?: number;
}

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case counterActions.INCREMENT:
      return { count: state.count + 1 };
    case counterActions.DECREMENT:
      return { count: state.count - 1 };
    case counterActions.RESET:
      return { count: 0 };
    case counterActions.SET_VALUE:
      return { count: action.payload || 0 };
    default:
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#DC2626',
        fontSize: '2rem',
        margin: '0 0 1rem 0'
      }}>
        {state.count}
      </h3>
      
      <div style={{ 
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '1rem'
      }}>
        <button 
          className="demo-button"
          onClick={() => dispatch({ type: counterActions.DECREMENT })}
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
          onClick={() => dispatch({ type: counterActions.RESET })}
          style={{ background: '#6b7280', color: 'white' }}
        >
          Reset
        </button>
        
        <button 
          className="demo-button"
          onClick={() => dispatch({ type: counterActions.INCREMENT })}
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
      
      <div style={{ 
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <input
          className="demo-input"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Valor específico"
          style={{ width: '120px' }}
        />
        <button 
          className="demo-button"
          onClick={() => {
            dispatch({ type: counterActions.SET_VALUE, payload: Number(inputValue) });
            setInputValue('');
          }}
          style={{ background: '#DC2626', color: 'white' }}
        >
          Establecer
        </button>
      </div>
    </div>
  );
}

// 2. Todo List con Reducer
const todoActions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  START_EDIT: 'START_EDIT',
  CANCEL_EDIT: 'CANCEL_EDIT'
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  editingId: number | null;
}

interface TodoAction {
  type: string;
  payload?: any;
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case todoActions.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case todoActions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case todoActions.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
        editingId: null
      };
    case todoActions.START_EDIT:
      return { ...state, editingId: action.payload };
    case todoActions.CANCEL_EDIT:
      return { ...state, editingId: null };
    default:
      return state;
  }
}

function TodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Aprender useReducer', completed: false },
      { id: 2, text: 'Comparar con useState', completed: true }
    ],
    editingId: null
  });
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: todoActions.ADD_TODO, payload: newTodo });
      setNewTodo('');
    }
  };
  
  const startEdit = (todo: Todo) => {
    dispatch({ type: todoActions.START_EDIT, payload: todo.id });
    setEditText(todo.text);
  };
  
  const saveEdit = (id: number) => {
    dispatch({ 
      type: todoActions.EDIT_TODO, 
      payload: { id, text: editText }
    });
    setEditText('');
  };
  
  const cancelEdit = () => {
    dispatch({ type: todoActions.CANCEL_EDIT });
    setEditText('');
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
          style={{ background: '#DC2626', color: 'white' }}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {state.todos.map(todo => (
          <div 
            key={todo.id}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: todo.completed ? '#f0fdf4' : '#fafafa',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ 
                type: todoActions.TOGGLE_TODO, 
                payload: todo.id 
              })}
            />
            
            {state.editingId === todo.id ? (
              <>
                <input
                  className="demo-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                  autoFocus
                />
                <button 
                  onClick={() => saveEdit(todo.id)}
                  style={{ 
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={16} />
                </button>
                <button 
                  onClick={cancelEdit}
                  style={{ 
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
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
                  onClick={() => startEdit(todo)}
                  style={{ 
                    background: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => dispatch({ 
                    type: todoActions.DELETE_TODO, 
                    payload: todo.id 
                  })}
                  style={{ 
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#fef3c7',
        borderRadius: '4px',
        border: '1px solid #F59E0B'
      }}>
        <p style={{ 
          margin: 0,
          color: '#92400e',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          📊 Total: {state.todos.length} | Completadas: {state.todos.filter(t => t.completed).length} | 
          Pendientes: {state.todos.filter(t => !t.completed).length}
        </p>
      </div>
    </div>
  );
}

// 3. Shopping Cart con Reducer
const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

interface CartProduct {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends CartProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: string;
  payload?: any;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case cartActions.ADD_ITEM:
      const existingItem = state.items.find(item => 
        item.id === action.payload.id
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    
    case cartActions.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case cartActions.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case cartActions.CLEAR_CART:
      return { ...state, items: [] };
    
    default:
      return state;
  }
}

function ShoppingCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [products] = useState<CartProduct[]>([
    { id: 1, name: 'Laptop Pro', price: 1299 },
    { id: 2, name: 'Mouse Gaming', price: 79 },
    { id: 3, name: 'Teclado Mecánico', price: 159 },
    { id: 4, name: 'Monitor 4K', price: 499 }
  ]);
  
  const total = state.items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  const totalItems = state.items.reduce((sum, item) => 
    sum + item.quantity, 0
  );
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>
        🛍️ Productos Disponibles
      </h4>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {products.map(product => (
          <button 
            key={product.id}
            className="demo-button"
            onClick={() => dispatch({ 
              type: cartActions.ADD_ITEM, 
              payload: product 
            })}
            style={{ 
              background: '#DC2626',
              color: 'white',
              padding: '0.75rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              {product.name}
            </span>
            <span style={{ fontSize: '0.75rem' }}>${product.price}</span>
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
          <h4 style={{ margin: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={20} />
            Carrito ({totalItems} items)
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ 
              background: '#10b981',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}>
              ${total}
            </span>
            {state.items.length > 0 && (
              <button 
                onClick={() => dispatch({ type: cartActions.CLEAR_CART })}
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
        
        {state.items.length === 0 ? (
          <p style={{ 
            color: '#6b7280',
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '2rem'
          }}>
            🛒 El carrito está vacío
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {state.items.map(item => (
              <div 
                key={item.id}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: '#f8fafc',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <span style={{ flex: 1, fontWeight: '500' }}>{item.name}</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button 
                    onClick={() => dispatch({
                      type: cartActions.UPDATE_QUANTITY,
                      payload: { id: item.id, quantity: item.quantity - 1 }
                    })}
                    style={{ 
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '0.125rem',
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus size={12} />
                  </button>
                  
                  <span style={{ 
                    minWidth: '20px',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button 
                    onClick={() => dispatch({
                      type: cartActions.UPDATE_QUANTITY,
                      payload: { id: item.id, quantity: item.quantity + 1 }
                    })}
                    style={{ 
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '0.125rem',
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                
                <span style={{ 
                  color: '#10b981',
                  fontWeight: 'bold',
                  minWidth: '60px',
                  textAlign: 'right',
                  fontSize: '0.875rem'
                }}>
                  ${item.quantity * item.price}
                </span>
                
                <button 
                  onClick={() => dispatch({
                    type: cartActions.REMOVE_ITEM,
                    payload: item.id
                  })}
                  style={{ 
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Form con Reducer
const formActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_LOADING: 'SET_LOADING',
  RESET_FORM: 'RESET_FORM',
  SET_SUCCESS: 'SET_SUCCESS'
};

interface FormState {
  fields: {
    name: string;
    email: string;
    password: string;
  };
  errors: Record<string, string>;
  isLoading: boolean;
  success: boolean;
}

interface FormAction {
  type: string;
  payload?: any;
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case formActions.UPDATE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: action.payload.value
        },
        success: false
      };
    
    case formActions.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message
        }
      };
    
    case formActions.CLEAR_ERRORS:
      return { ...state, errors: {} };
    
    case formActions.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case formActions.SET_SUCCESS:
      return { ...state, success: action.payload };
    
    case formActions.RESET_FORM:
      return {
        fields: { name: '', email: '', password: '' },
        errors: {},
        isLoading: false,
        success: false
      };
    
    default:
      return state;
  }
}

function FormReducer() {
  const [state, dispatch] = useReducer(formReducer, {
    fields: { name: '', email: '', password: '' },
    errors: {},
    isLoading: false,
    success: false
  });
  
  const validateForm = () => {
    dispatch({ type: formActions.CLEAR_ERRORS });
    let isValid = true;
    
    if (!state.fields.name.trim()) {
      dispatch({
        type: formActions.SET_ERROR,
        payload: { field: 'name', message: 'El nombre es requerido' }
      });
      isValid = false;
    }
    
    if (!state.fields.email.trim()) {
      dispatch({
        type: formActions.SET_ERROR,
        payload: { field: 'email', message: 'El email es requerido' }
      });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.fields.email)) {
      dispatch({
        type: formActions.SET_ERROR,
        payload: { field: 'email', message: 'Email inválido' }
      });
      isValid = false;
    }
    
    if (!state.fields.password.trim()) {
      dispatch({
        type: formActions.SET_ERROR,
        payload: { field: 'password', message: 'La contraseña es requerida' }
      });
      isValid = false;
    } else if (state.fields.password.length < 6) {
      dispatch({
        type: formActions.SET_ERROR,
        payload: { field: 'password', message: 'Mínimo 6 caracteres' }
      });
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch({ type: formActions.SET_LOADING, payload: true });
    
    // Simular API call
    setTimeout(() => {
      dispatch({ type: formActions.SET_LOADING, payload: false });
      dispatch({ type: formActions.SET_SUCCESS, payload: true });
    }, 2000);
  };
  
  const updateField = (name: string, value: string) => {
    dispatch({
      type: formActions.UPDATE_FIELD,
      payload: { name, value }
    });
  };
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Nombre:
          </label>
          <input
            className="demo-input"
            type="text"
            value={state.fields.name}
            onChange={(e) => updateField('name', e.target.value)}
            style={{ 
              width: '100%',
              borderColor: state.errors.name ? '#ef4444' : '#d1d5db'
            }}
          />
          {state.errors.name && (
            <p style={{ 
              color: '#ef4444',
              fontSize: '0.75rem',
              margin: '0.25rem 0 0 0'
            }}>
              {state.errors.name}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Email:
          </label>
          <input
            className="demo-input"
            type="email"
            value={state.fields.email}
            onChange={(e) => updateField('email', e.target.value)}
            style={{ 
              width: '100%',
              borderColor: state.errors.email ? '#ef4444' : '#d1d5db'
            }}
          />
          {state.errors.email && (
            <p style={{ 
              color: '#ef4444',
              fontSize: '0.75rem',
              margin: '0.25rem 0 0 0'
            }}>
              {state.errors.email}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Contraseña:
          </label>
          <input
            className="demo-input"
            type="password"
            value={state.fields.password}
            onChange={(e) => updateField('password', e.target.value)}
            style={{ 
              width: '100%',
              borderColor: state.errors.password ? '#ef4444' : '#d1d5db'
            }}
          />
          {state.errors.password && (
            <p style={{ 
              color: '#ef4444',
              fontSize: '0.75rem',
              margin: '0.25rem 0 0 0'
            }}>
              {state.errors.password}
            </p>
          )}
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'space-between'
        }}>
          <button
            type="submit"
            disabled={state.isLoading}
            style={{ 
              background: state.isLoading ? '#9ca3af' : '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1.5rem',
              cursor: state.isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              flex: 1
            }}
          >
            {state.isLoading ? 'Enviando...' : 'Enviar'}
          </button>
          
          <button
            type="button"
            onClick={() => dispatch({ type: formActions.RESET_FORM })}
            style={{ 
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Reset
          </button>
        </div>
        
        {state.success && (
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem',
            color: '#059669',
            textAlign: 'center'
          }}>
            ✅ ¡Formulario enviado exitosamente!
          </div>
        )}
      </form>
    </div>
  );
}

export default UseReducerSection;

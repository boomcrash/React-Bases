import React, { useState } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { Star, MapPin, Calendar } from 'lucide-react';

const PropsSection: React.FC = () => {
  return (
    <SectionLayout
      title="Props (Propiedades)"
      description="Las props permiten pasar datos de un componente padre a un componente hijo. Son como argumentos de una función."
      color="#10B981"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Props Básicas */}
        <div className="example-card">
          <h3 className="example-title">Props Básicas</h3>
          <p className="example-description">
            Pasando texto y números como props a un componente. ¡Prueba con diferentes valores!
          </p>
          
          <div className="interactive-demo">
            <BasicPropsPlayground />
          </div>
          
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #10B981',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#14532d', fontSize: '0.875rem' }}>
              📝 <strong>Experimenta:</strong> Cambia los nombres y edades en los inputs para ver 
              cómo las props se pasan del componente padre a los hijos. Cada componente Greeting 
              recibe props independientes.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function Greeting({ name, age }) {
  return (
    <div>
      <h3>¡Hola {name}!</h3>
      <p>Tienes {age} años</p>
    </div>
  );
}

// Uso del componente
<Greeting name="María" age={25} />
<Greeting name="Carlos" age={30} />`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Props Interactivas */}
        <div className="example-card">
          <h3 className="example-title">Props Interactivas</h3>
          <p className="example-description">
            Cambia los valores y observa cómo se actualizan los componentes.
          </p>
          
          <div className="interactive-demo">
            <PropsPlayground />
          </div>
          
          <div style={{ 
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.875rem' }}>
              🔄 <strong>Modifica:</strong> Cambia el nombre, precio, categoría y estado del 
              producto. Observa cómo diferentes tipos de props (string, number, boolean) 
              afectan la renderización del componente.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function ProductCard({ name, price, category, inStock }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Precio: ${'{price}'}</p>
      <span>Categoría: {category}</span>
      <span className={inStock ? 'in-stock' : 'out-of-stock'}>
        {inStock ? 'En stock' : 'Agotado'}
      </span>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Props con Objetos */}
        <div className="example-card">
          <h3 className="example-title">Props con Objetos</h3>
          <p className="example-description">
            También puedes pasar objetos completos como props. ¡Modifica los valores!
          </p>
          
          <div className="interactive-demo">
            <EventPlayground />
          </div>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #F59E0B',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#92400e', fontSize: '0.875rem' }}>
              📅 <strong>Edita:</strong> Modifica los datos del evento para ver cómo un objeto 
              completo se pasa como prop. Cambia título, fecha, ubicación, asistentes y 
              calificación para ver la actualización inmediata.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p><Calendar /> {event.date}</p>
      <p><MapPin /> {event.location}</p>
      <p>👥 {event.attendees} asistentes</p>
      <p><Star /> {event.rating}/5</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Props Opcionales */}
        <div className="example-card">
          <h3 className="example-title">Props Opcionales y Defaults</h3>
          <p className="example-description">
            Los componentes pueden tener props opcionales con valores por defecto. ¡Experimenta!
          </p>
          
          <div className="interactive-demo">
            <NotificationPlayground />
          </div>
          
          <div style={{ 
            background: '#f3f4f6',
            border: '1px solid #8B5CF6',
            borderRadius: '4px',
            padding: '0.75rem',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, color: '#5b21b6', fontSize: '0.875rem' }}>
              ⚙️ <strong>Configura:</strong> Cambia el mensaje, tipo de notificación y opciones 
              para ver cómo funcionan las props opcionales con valores por defecto. 
              Nota cómo algunas props tienen valores predeterminados.
            </p>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function NotificationCard({ 
  message, 
  type = "info", 
  showIcon = false,
  dismissible = false 
}) {
  const getColor = () => {
    switch(type) {
      case "success": return "#059669";
      case "warning": return "#d97706";
      case "error": return "#dc2626";
      default: return "#3B82F6";
    }
  };

  return (
    <div style={{ 
      background: getColor(),
      color: "white",
      padding: "1rem"
    }}>
      {showIcon && "🔔 "}
      {message}
      {dismissible && " ❌"}
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

interface GreetingProps {
  name: string;
  age: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div style={{ 
      background: 'white', 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '1rem',
      margin: '0.5rem 0',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#10B981', margin: '0 0 0.5rem 0' }}>¡Hola {name}! 👋</h3>
      <p style={{ color: '#666', margin: 0 }}>Tienes {age} años</p>
    </div>
  );
}

function BasicPropsPlayground() {
  const [name1, setName1] = useState("María");
  const [age1, setAge1] = useState(25);
  const [name2, setName2] = useState("Carlos");
  const [age2, setAge2] = useState(30);
  const [name3, setName3] = useState("Ana");
  const [age3, setAge3] = useState(28);

  return (
    <div>
      {/* Controles para el primer saludo */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Primera Persona:</h4>
        <div className="demo-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            className="demo-input"
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Nombre"
            style={{ flex: '1', minWidth: '120px' }}
          />
          <input
            className="demo-input"
            type="number"
            value={age1}
            onChange={(e) => setAge1(Number(e.target.value))}
            placeholder="Edad"
            min="1"
            max="120"
            style={{ flex: '1', minWidth: '80px' }}
          />
        </div>
      </div>

      {/* Controles para el segundo saludo */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Segunda Persona:</h4>
        <div className="demo-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            className="demo-input"
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Nombre"
            style={{ flex: '1', minWidth: '120px' }}
          />
          <input
            className="demo-input"
            type="number"
            value={age2}
            onChange={(e) => setAge2(Number(e.target.value))}
            placeholder="Edad"
            min="1"
            max="120"
            style={{ flex: '1', minWidth: '80px' }}
          />
        </div>
      </div>

      {/* Controles para el tercer saludo */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Tercera Persona:</h4>
        <div className="demo-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            className="demo-input"
            type="text"
            value={name3}
            onChange={(e) => setName3(e.target.value)}
            placeholder="Nombre"
            style={{ flex: '1', minWidth: '120px' }}
          />
          <input
            className="demo-input"
            type="number"
            value={age3}
            onChange={(e) => setAge3(Number(e.target.value))}
            placeholder="Edad"
            min="1"
            max="120"
            style={{ flex: '1', minWidth: '80px' }}
          />
        </div>
      </div>

      {/* Resultados */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Resultados:</h4>
        <Greeting name={name1} age={age1} />
        <Greeting name={name2} age={age2} />
        <Greeting name={name3} age={age3} />
      </div>
    </div>
  );
}

function PropsPlayground() {
  const [productName, setProductName] = useState("iPhone 15");
  const [price, setPrice] = useState(999);
  const [category, setCategory] = useState("Electrónicos");
  const [inStock, setInStock] = useState(true);

  return (
    <div>
      {/* Controles */}
      <div className="demo-controls" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <input
          className="demo-input"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del producto"
        />
        <input
          className="demo-input"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Precio"
        />
        <input
          className="demo-input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría"
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          En stock
        </label>
      </div>

      {/* Resultado */}
      <ProductCard 
        name={productName}
        price={price}
        category={category}
        inStock={inStock}
      />
    </div>
  );
}

function EventPlayground() {
  const [title, setTitle] = useState("Workshop React");
  const [date, setDate] = useState("2024-02-15");
  const [location, setLocation] = useState("Madrid, España");
  const [attendees, setAttendees] = useState(45);
  const [rating, setRating] = useState(4.8);

  const event = {
    title,
    date,
    location,
    attendees,
    rating
  };

  return (
    <div>
      {/* Controles */}
      <div className="demo-controls" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <input
          className="demo-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del evento"
        />
        <input
          className="demo-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="demo-input"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ubicación"
        />
        <input
          className="demo-input"
          type="number"
          value={attendees}
          onChange={(e) => setAttendees(Number(e.target.value))}
          placeholder="Número de asistentes"
          min="1"
        />
        <input
          className="demo-input"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Calificación (1-5)"
          min="1"
          max="5"
          step="0.1"
        />
      </div>

      {/* Resultado */}
      <EventCard event={event} />
    </div>
  );
}

function NotificationPlayground() {
  const [message, setMessage] = useState("¡Bienvenido de vuelta!");
  const [type, setType] = useState<"info" | "success" | "warning" | "error">("success");
  const [showIcon, setShowIcon] = useState(true);
  const [dismissible, setDismissible] = useState(false);

  return (
    <div>
      {/* Controles */}
      <div className="demo-controls" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <input
          className="demo-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensaje de la notificación"
        />
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="radio"
              name="type"
              checked={type === "info"}
              onChange={() => setType("info")}
            />
            Info
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="radio"
              name="type"
              checked={type === "success"}
              onChange={() => setType("success")}
            />
            Success
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="radio"
              name="type"
              checked={type === "warning"}
              onChange={() => setType("warning")}
            />
            Warning
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="radio"
              name="type"
              checked={type === "error"}
              onChange={() => setType("error")}
            />
            Error
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showIcon}
              onChange={(e) => setShowIcon(e.target.checked)}
            />
            Mostrar icono
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={dismissible}
              onChange={(e) => setDismissible(e.target.checked)}
            />
            Puede cerrarse
          </label>
        </div>
      </div>

      {/* Resultado */}
      <NotificationCard 
        message={message}
        type={type}
        showIcon={showIcon}
        dismissible={dismissible}
      />
    </div>
  );
}

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

function ProductCard({ name, price, category, inStock }: ProductCardProps) {
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      marginTop: '1rem'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{name}</h3>
      <p style={{ margin: '0.25rem 0', color: '#10B981', fontWeight: 'bold', fontSize: '1.2rem' }}>
        ${price}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>
        📦 Categoría: {category}
      </p>
      <span style={{ 
        background: inStock ? '#d1fae5' : '#fee2e2',
        color: inStock ? '#059669' : '#dc2626',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        fontWeight: '500'
      }}>
        {inStock ? '✅ En stock' : '❌ Agotado'}
      </span>
    </div>
  );
}

interface EventCardProps {
  event: {
    title: string;
    date: string;
    location: string;
    attendees: number;
    rating: number;
  };
}

function EventCard({ event }: EventCardProps) {
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '0.5rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#10B981', margin: '0 0 1rem 0' }}>{event.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#666' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} />
          {event.date}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={16} />
          {event.location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          👥 {event.attendees} asistentes
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          {event.rating}/5
        </div>
      </div>
    </div>
  );
}

interface NotificationCardProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  showIcon?: boolean;
  dismissible?: boolean;
}

function NotificationCard({ 
  message, 
  type = "info", 
  showIcon = false,
  dismissible = false 
}: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const getColor = () => {
    switch(type) {
      case "success": return "#059669";
      case "warning": return "#d97706";
      case "error": return "#dc2626";
      default: return "#3B82F6";
    }
  };

  const getIcon = () => {
    switch(type) {
      case "success": return "✅";
      case "warning": return "⚠️";
      case "error": return "❌";
      default: return "ℹ️";
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{ 
      background: getColor(),
      color: "white",
      padding: "1rem",
      borderRadius: "8px",
      margin: "0.5rem 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <span>
        {showIcon && `${getIcon()} `}
        {message}
      </span>
      {dismissible && (
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default PropsSection;

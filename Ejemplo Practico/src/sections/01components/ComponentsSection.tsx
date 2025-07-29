import React, { useState } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { User, Heart, Star, MessageCircle } from 'lucide-react';

const ComponentsSection: React.FC = () => {
  return (
    <SectionLayout
      title="Componentes"
      description="Los componentes son los bloques de construcción fundamentales de React. Aprende a crear y usar componentes funcionales."
      color="#3B82F6"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Componente Básico */}
        <div className="example-card">
          <h3 className="example-title">Componente Básico</h3>
          <p className="example-description">
            Un componente simple que retorna JSX. Es como una función que devuelve HTML.
          </p>
          
          <div className="interactive-demo">
            <SimpleGreeting />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function SimpleGreeting() {
  return (
    <div>
      <h2>¡Hola desde un componente!</h2>
      <p>Este es mi primer componente React</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Componente con Estado */}
        <div className="example-card">
          <h3 className="example-title">Componente Interactivo</h3>
          <p className="example-description">
            Los componentes pueden tener estado y responder a eventos del usuario.
          </p>
          
          <div className="interactive-demo">
            <InteractiveButton />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function InteractiveButton() {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div>
      <p>Has hecho click {clicks} veces</p>
      <button onClick={() => setClicks(clicks + 1)}>
        ¡Haz click aquí!
      </button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Componente con Íconos */}
        <div className="example-card">
          <h3 className="example-title">Componente con Íconos</h3>
          <p className="example-description">
            Los componentes pueden incluir íconos y elementos visuales más complejos.
          </p>
          
          <div className="interactive-demo">
            <UserCard />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function UserCard() {
  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '1rem',
      textAlign: 'center'
    }}>
      <User size={48} style={{ color: '#3B82F6' }} />
      <h3>Juan Pérez</h3>
      <p>Desarrollador Frontend</p>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: Múltiples Componentes */}
        <div className="example-card">
          <h3 className="example-title">Composición de Componentes</h3>
          <p className="example-description">
            Los componentes se pueden combinar para crear interfaces más complejas.
          </p>
          
          <div className="interactive-demo">
            <SocialCard />
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function SocialCard() {
  return (
    <div className="social-card">
      <PostHeader />
      <PostContent />
      <PostActions />
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

function SimpleGreeting() {
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2 style={{ color: '#3B82F6', marginBottom: '0.5rem' }}>¡Hola desde un componente!</h2>
      <p style={{ color: '#666' }}>Este es mi primer componente React 🎉</p>
    </div>
  );
}

function InteractiveButton() {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
        Has hecho click <strong style={{ color: '#3B82F6' }}>{clicks}</strong> veces
      </p>
      <button 
        className="demo-button"
        onClick={() => setClicks(clicks + 1)}
      >
        ¡Haz click aquí! 🎯
      </button>
      {clicks > 5 && (
        <p style={{ marginTop: '1rem', color: '#059669' }}>
          ¡Wow! Eres muy activo 🔥
        </p>
      )}
    </div>
  );
}

function UserCard() {
  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '12px', 
      padding: '1.5rem',
      textAlign: 'center',
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <User size={48} style={{ color: '#3B82F6', marginBottom: '1rem' }} />
      <h3 style={{ margin: '0.5rem 0', color: '#333' }}>Juan Pérez</h3>
      <p style={{ color: '#666', margin: '0' }}>Desarrollador Frontend</p>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        <span style={{ background: '#3B82F6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
          React
        </span>
        <span style={{ background: '#10B981', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
          TypeScript
        </span>
      </div>
    </div>
  );
}

function SocialCard() {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '12px', 
      overflow: 'hidden',
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={24} style={{ color: '#3B82F6' }} />
          <strong>@reactdev</strong>
          <span style={{ color: '#666' }}>• hace 2h</span>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '1rem' }}>
        <p>¡Acabo de crear mi primer componente React! 🎉 Es increíble lo fácil que es crear interfaces interactivas.</p>
      </div>
      
      {/* Actions */}
      <div style={{ 
        padding: '1rem', 
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <button 
          onClick={handleLike}
          style={{ 
            background: 'none', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer',
            color: isLiked ? '#EF4444' : '#666'
          }}
        >
          <Heart size={20} fill={isLiked ? '#EF4444' : 'none'} />
          {likes}
        </button>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          cursor: 'pointer',
          color: '#666'
        }}>
          <MessageCircle size={20} />
          12
        </button>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          cursor: 'pointer',
          color: '#666'
        }}>
          <Star size={20} />
          8
        </button>
      </div>
    </div>
  );
}

export default ComponentsSection;

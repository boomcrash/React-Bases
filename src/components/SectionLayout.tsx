import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SectionLayoutProps {
  title: string;
  description: string;
  color: string;
  children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ 
  title, 
  description, 
  color, 
  children 
}) => {
  return (
    <div 
      className="section-container"
      style={{ 
        '--section-color': color,
        width: '100%',
        maxWidth: 'none',
        margin: '0',
        padding: '2rem',
        boxSizing: 'border-box'
      } as React.CSSProperties}
    >
      <div 
        className="section-header"
        style={{
          width: '100%',
          maxWidth: 'none',
          margin: '0 0 2rem 0',
          boxSizing: 'border-box'
        }}
      >
        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
          Volver al Menú
        </Link>
        <h1 className="section-title">{title}</h1>
        <p className="section-description">{description}</p>
      </div>
      
      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
};

export default SectionLayout;

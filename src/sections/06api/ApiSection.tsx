import React, { useState, useEffect } from 'react';
import SectionLayout from '../../components/SectionLayout';
import { RefreshCw, User, MapPin, Phone, Star, Search, Download } from 'lucide-react';

const ApiSection: React.FC = () => {
  return (
    <SectionLayout
      title="Consumo de APIs"
      description="Aprende a obtener datos de APIs externas usando fetch. Es como pedir información a otros servicios en internet."
      color="#7C3AED"
    >
      <div className="examples-grid">
        {/* Ejemplo 1: Fetch Básico */}
        <div className="example-card">
          <h3 className="example-title">Fetch Básico</h3>
          <p className="example-description">
            Ejemplo simple de cómo obtener datos de una API y manejar estados de carga.
          </p>
          
          <div className="interactive-demo">
            <BasicFetch />
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
            <RefreshCw size={20} color="#0ea5e9" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#075985', lineHeight: '1.5' }}>
                Haz clic en "Recargar Usuario" para ver cómo se obtienen datos de una API. 
                Observa los estados de carga, éxito y error. Este es el patrón básico para cualquier petición HTTP.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function BasicFetch() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      
      if (!response.ok) {
        throw new Error('Error al obtener usuario');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser(); // Cargar al montar el componente
  }, []);
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No hay datos</div>;
  
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Teléfono: {user.phone}</p>
      <button onClick={fetchUser}>Recargar</button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 2: Lista de Usuarios */}
        <div className="example-card">
          <h3 className="example-title">Lista de Usuarios</h3>
          <p className="example-description">
            Obtener y mostrar una lista completa de usuarios con refresh manual.
          </p>
          
          <div className="interactive-demo">
            <UsersList />
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
            <User size={20} color="#10b981" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#059669', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#047857', lineHeight: '1.5' }}>
                Haz clic en "Actualizar" para recargar la lista completa de usuarios. 
                Observa cómo se manejan múltiples elementos y el scroll automático cuando hay muchos datos.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const usersData = await response.json();
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar Lista'}
        </button>
      </div>
      
      {error && <div>Error: {error}</div>}
      
      <div>
        {users.map(user => (
          <div key={user.id}>
            <h4>{user.name}</h4>
            <p>@{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 3: Búsqueda en Tiempo Real */}
        <div className="example-card">
          <h3 className="example-title">Búsqueda con Debounce</h3>
          <p className="example-description">
            Buscar posts en tiempo real con debounce para evitar demasiadas requests.
          </p>
          
          <div className="interactive-demo">
            <SearchPosts />
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
            <Search size={20} color="#f59e0b" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#78350f', lineHeight: '1.5' }}>
                Escribe en el campo de búsqueda palabras como "sunt", "qui", "et", "dolor" o "consectetur". 
                La búsqueda tiene un delay de 500ms (debounce) para evitar demasiadas peticiones mientras escribes.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function SearchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce: esperar 500ms después de que el usuario deje de escribir
  useEffect(() => {
    if (!searchTerm.trim()) {
      setPosts([]);
      return;
    }
    
    const timeoutId = setTimeout(() => {
      searchPosts(searchTerm);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  
  const searchPosts = async (term) => {
    setLoading(true);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const allPosts = await response.json();
      
      // Filtrar posts que contengan el término de búsqueda
      const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase())
      );
      
      setPosts(filteredPosts.slice(0, 5)); // Mostrar solo 5 resultados
    } catch (err) {
      console.error('Error searching posts:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar posts..."
      />
      
      {loading && <div>Buscando...</div>}
      
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 4: POST Request */}
        <div className="example-card">
          <h3 className="example-title">Crear Nuevo Post</h3>
          <p className="example-description">
            Enviar datos a una API usando POST request y manejar la respuesta.
          </p>
          
          <div className="interactive-demo">
            <CreatePost />
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
            <MapPin size={20} color="#7c3aed" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#5b21b6', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#6b46c1', lineHeight: '1.5' }}>
                Completa ambos campos (título y contenido) y haz clic en "Crear Post". 
                Observa cómo se envían datos al servidor y se recibe una respuesta de confirmación.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el post');
      }
      
      const newPost = await response.json();
      setResult(newPost);
      setTitle('');
      setBody('');
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del post"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Contenido del post"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Post'}
      </button>
      
      {result && (
        <div>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <div>
              <h4>✅ Post creado!</h4>
              <p>ID: {result.id}</p>
              <p>Título: {result.title}</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 5: Multiple APIs */}
        <div className="example-card">
          <h3 className="example-title">Múltiples APIs</h3>
          <p className="example-description">
            Combinar datos de diferentes APIs usando Promise.all para cargas paralelas.
          </p>
          
          <div className="interactive-demo">
            <MultipleApis />
          </div>
          
          <div style={{
            background: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Download size={20} color="#ef4444" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#dc2626', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#b91c1c', lineHeight: '1.5' }}>
                Haz clic en "Actualizar Todo" para ver cómo se cargan múltiples APIs en paralelo usando Promise.all. 
                Observa las estadísticas combinadas y los datos destacados de diferentes fuentes.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function MultipleApis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Hacer múltiples requests en paralelo
      const [usersResponse, postsResponse, albumsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/albums')
      ]);
      
      // Verificar que todas las respuestas sean exitosas
      if (!usersResponse.ok || !postsResponse.ok || !albumsResponse.ok) {
        throw new Error('Error en una o más APIs');
      }
      
      // Convertir todas las respuestas a JSON
      const [users, posts, albums] = await Promise.all([
        usersResponse.json(),
        postsResponse.json(),
        albumsResponse.json()
      ]);
      
      setData({
        usersCount: users.length,
        postsCount: posts.length,
        albumsCount: albums.length,
        latestPost: posts[0],
        firstUser: users[0]
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllData();
  }, []);
  
  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No hay datos</div>;
  
  return (
    <div>
      <h4>📊 Estadísticas</h4>
      <p>Usuarios: {data.usersCount}</p>
      <p>Posts: {data.postsCount}</p>
      <p>Albums: {data.albumsCount}</p>
      
      <h4>👤 Primer Usuario</h4>
      <p>{data.firstUser.name}</p>
      
      <h4>📝 Post Más Reciente</h4>
      <p>{data.latestPost.title}</p>
      
      <button onClick={fetchAllData}>Actualizar Todo</button>
    </div>
  );
}`}
            </pre>
          </details>
        </div>

        {/* Ejemplo 6: Error Handling Avanzado */}
        <div className="example-card">
          <h3 className="example-title">Manejo de Errores Avanzado</h3>
          <p className="example-description">
            Manejo robusto de errores con retry automático y diferentes tipos de error.
          </p>
          
          <div className="interactive-demo">
            <AdvancedErrorHandling />
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
            <Star size={20} color="#0ea5e9" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>
                Cómo usar este ejemplo:
              </strong>
              <p style={{ margin: 0, color: '#075985', lineHeight: '1.5' }}>
                Prueba ambos botones: "URL Válida" funciona correctamente, "URL Inválida" falla pero reintenta automáticamente 3 veces. 
                Observa el contador de intentos y el manejo robusto de errores.
              </p>
            </div>
          </div>
          
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver código</summary>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`function AdvancedErrorHandling() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const fetchWithRetry = async (url, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Recurso no encontrado (404)');
          } else if (response.status === 500) {
            throw new Error('Error del servidor (500)');
          } else {
            throw new Error(\`Error HTTP: \${response.status}\`);
          }
        }
        
        const result = await response.json();
        setData(result);
        setRetryCount(0);
        return result;
        
      } catch (err) {
        console.log(\`Intento \${attempt} falló:\`, err.message);
        
        if (attempt === maxRetries) {
          setError(\`Falló después de \${maxRetries} intentos: \${err.message}\`);
          throw err;
        }
        
        // Esperar antes del siguiente intento (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  };
  
  return (
    <div>
      <button onClick={() => fetchWithRetry('https://jsonplaceholder.typicode.com/users/1')}>
        Cargar Usuario (URL Válida)
      </button>
      
      <button onClick={() => fetchWithRetry('https://jsonplaceholder.typicode.com/invalid-endpoint')}>
        Cargar Datos (URL Inválida)
      </button>
      
      {loading && (
        <div>
          Cargando... {retryCount > 1 && \`(Intento \${retryCount})\`}
        </div>
      )}
      
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      
      {data && (
        <div style={{ color: 'green' }}>
          ✅ Datos cargados: {data.name || 'Usuario encontrado'}
        </div>
      )}
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

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
  };
  company: {
    name: string;
  };
}

function BasicFetch() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      
      if (!response.ok) {
        throw new Error('Error al obtener usuario');
      }
      
      const userData: User = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
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
          onClick={fetchUser}
          disabled={loading}
          style={{ 
            background: loading ? '#9ca3af' : '#7C3AED',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Cargando...' : 'Recargar Usuario'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#dc2626',
          marginBottom: '1rem'
        }}>
          ❌ Error: {error}
        </div>
      )}
      
      {user && !loading && (
        <div style={{ 
          border: '1px solid #7C3AED',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <User size={20} color="#7C3AED" />
            <h3 style={{ margin: 0, color: '#7C3AED' }}>{user.name}</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#666' }}>
            <p style={{ margin: 0 }}>📧 Email: {user.email}</p>
            <p style={{ margin: 0 }}>📞 Teléfono: {user.phone}</p>
            <p style={{ margin: 0 }}>🌐 Website: {user.website}</p>
            <p style={{ margin: 0 }}>🏙️ Ciudad: {user.address.city}</p>
            <p style={{ margin: 0 }}>🏢 Empresa: {user.company.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const usersData: User[] = await response.json();
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
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
        <h4 style={{ margin: 0, color: '#333' }}>
          👥 Lista de Usuarios ({users.length})
        </h4>
        <button 
          className="demo-button"
          onClick={fetchUsers}
          disabled={loading}
          style={{ 
            background: loading ? '#9ca3af' : '#7C3AED',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#dc2626',
          marginBottom: '1rem'
        }}>
          ❌ Error: {error}
        </div>
      )}
      
      <div style={{ 
        maxHeight: '300px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {users.map(user => (
          <div 
            key={user.id}
            style={{ 
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '0.75rem'
            }}
          >
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <User size={16} color="#7C3AED" />
              <h4 style={{ margin: 0, color: '#333', fontSize: '1rem' }}>
                {user.name}
              </h4>
              <span style={{ 
                background: '#7C3AED',
                color: 'white',
                padding: '0.125rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}>
                @{user.username}
              </span>
            </div>
            <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.875rem' }}>
              📧 {user.email}
            </p>
            <div style={{ 
              display: 'flex',
              gap: '1rem',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              <span>
                <MapPin size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                {user.address.city}
              </span>
              <span>
                <Phone size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                {user.phone.split(' ')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function SearchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  
  // Cargar posts iniciales al montar el componente
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData: Post[] = await response.json();
        setAllPosts(postsData);
        // Mostrar los primeros 3 posts como ejemplo inicial
        setPosts(postsData.slice(0, 3));
      } catch (err) {
        console.error('Error loading initial posts:', err);
      }
    };
    
    loadInitialPosts();
  }, []);
  
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar los primeros 3 posts
      setPosts(allPosts.slice(0, 3));
      return;
    }
    
    const timeoutId = setTimeout(() => {
      searchPosts(searchTerm);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, allPosts]);
  
  const searchPosts = async (term: string) => {
    setLoading(true);
    
    try {
      // Usar los posts ya cargados para búsqueda más rápida
      const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase())
      );
      
      setPosts(filteredPosts.slice(0, 5));
    } catch (err) {
      console.error('Error searching posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
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
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <Search size={20} color="#7C3AED" />
        <input
          className="demo-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar posts... (ej: 'sunt', 'qui', 'et', 'dolor')"
          style={{ flex: 1 }}
        />
        {loading && <RefreshCw size={16} className="animate-spin" color="#7C3AED" />}
      </div>
      
      <div style={{ 
        marginBottom: '1rem',
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        {searchTerm ? (
          <>Resultados para "{searchTerm}": {posts.length} encontrados</>
        ) : (
          <>Mostrando posts de ejemplo. Escribe algo para buscar...</>
        )}
      </div>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        {posts.map(post => (
          <div 
            key={post.id}
            style={{ 
              background: searchTerm ? '#faf5ff' : '#f8fafc',
              border: `1px solid ${searchTerm ? '#7C3AED' : '#e2e8f0'}`,
              borderRadius: '4px',
              padding: '0.75rem'
            }}
          >
            <h4 style={{ 
              margin: '0 0 0.5rem 0',
              color: searchTerm ? '#7C3AED' : '#374151',
              fontSize: '0.95rem'
            }}>
              #{post.id} - {post.title}
            </h4>
            <p style={{ 
              margin: 0,
              color: '#666',
              fontSize: '0.875rem',
              lineHeight: '1.4'
            }}>
              {post.body.substring(0, 120)}
              {post.body.length > 120 && '...'}
            </p>
          </div>
        ))}
        
        {searchTerm && !loading && posts.length === 0 && (
          <div style={{ 
            textAlign: 'center',
            color: '#6b7280',
            fontStyle: 'italic',
            padding: '2rem',
            background: '#f9fafb',
            borderRadius: '4px',
            border: '1px dashed #d1d5db'
          }}>
            No se encontraron posts con "{searchTerm}"
            <br />
            <small>Prueba con: sunt, qui, et, dolor, consectetur</small>
          </div>
        )}
      </div>
    </div>
  );
}

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el post');
      }
      
      const newPost = await response.json();
      setResult(newPost);
      setTitle('');
      setBody('');
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : 'Error desconocido' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <form onSubmit={createPost}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Título:
          </label>
          <input
            className="demo-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del post"
            required
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Contenido:
          </label>
          <textarea
            className="demo-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Contenido del post"
            required
            rows={4}
            style={{ 
              width: '100%',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !title.trim() || !body.trim()}
          style={{ 
            background: (loading || !title.trim() || !body.trim()) ? '#9ca3af' : '#7C3AED',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.75rem 1.5rem',
            cursor: (loading || !title.trim() || !body.trim()) ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {loading && <RefreshCw size={16} className="animate-spin" />}
          {loading ? 'Creando...' : 'Crear Post'}
        </button>
      </form>
      
      {result && (
        <div style={{ marginTop: '1rem' }}>
          {result.error ? (
            <div style={{ 
              background: '#fee2e2',
              border: '1px solid #ef4444',
              borderRadius: '4px',
              padding: '0.75rem',
              color: '#dc2626'
            }}>
              ❌ Error: {result.error}
            </div>
          ) : (
            <div style={{ 
              background: '#f0fdf4',
              border: '1px solid #10b981',
              borderRadius: '4px',
              padding: '0.75rem',
              color: '#059669'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>✅ Post creado exitosamente!</h4>
              <p style={{ margin: '0.25rem 0' }}>ID: {result.id}</p>
              <p style={{ margin: '0.25rem 0' }}>Título: {result.title}</p>
              <p style={{ margin: '0.25rem 0' }}>
                Contenido: {result.body.substring(0, 50)}...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ApiData {
  usersCount: number;
  postsCount: number;
  albumsCount: number;
  latestPost: Post;
  firstUser: User;
}

function MultipleApis() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [usersResponse, postsResponse, albumsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/albums')
      ]);
      
      if (!usersResponse.ok || !postsResponse.ok || !albumsResponse.ok) {
        throw new Error('Error en una o más APIs');
      }
      
      const [users, posts, albums] = await Promise.all([
        usersResponse.json(),
        postsResponse.json(),
        albumsResponse.json()
      ]);
      
      setData({
        usersCount: users.length,
        postsCount: posts.length,
        albumsCount: albums.length,
        latestPost: posts[0],
        firstUser: users[0]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllData();
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
        <h4 style={{ margin: 0, color: '#333' }}>
          🔄 Dashboard Multi-API
        </h4>
        <button 
          className="demo-button"
          onClick={fetchAllData}
          disabled={loading}
          style={{ 
            background: loading ? '#9ca3af' : '#7C3AED',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Download size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Cargando...' : 'Actualizar Todo'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#dc2626',
          marginBottom: '1rem'
        }}>
          ❌ Error: {error}
        </div>
      )}
      
      {data && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            background: '#faf5ff',
            border: '1px solid #7C3AED',
            borderRadius: '4px',
            padding: '0.75rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#7C3AED' }}>
              📊 Estadísticas Generales
            </h4>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#7C3AED' }}>
                  {data.usersCount}
                </div>
                <div style={{ color: '#666' }}>Usuarios</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#7C3AED' }}>
                  {data.postsCount}
                </div>
                <div style={{ color: '#666' }}>Posts</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#7C3AED' }}>
                  {data.albumsCount}
                </div>
                <div style={{ color: '#666' }}>Albums</div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '4px',
            padding: '0.75rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>
              👤 Primer Usuario
            </h4>
            <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
              <strong>{data.firstUser.name}</strong> (@{data.firstUser.username})
            </p>
            <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.875rem' }}>
              {data.firstUser.email}
            </p>
          </div>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #F59E0B',
            borderRadius: '4px',
            padding: '0.75rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#F59E0B' }}>
              📝 Post Más Reciente
            </h4>
            <p style={{ margin: '0.25rem 0', fontWeight: 'bold', fontSize: '0.875rem' }}>
              {data.latestPost.title}
            </p>
            <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.875rem' }}>
              {data.latestPost.body.substring(0, 100)}...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function AdvancedErrorHandling() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const fetchWithRetry = async (url: string, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Recurso no encontrado (404)');
          } else if (response.status === 500) {
            throw new Error('Error del servidor (500)');
          } else {
            throw new Error(`Error HTTP: ${response.status}`);
          }
        }
        
        const result = await response.json();
        setData(result);
        setRetryCount(0);
        setLoading(false);
        return result;
        
      } catch (err) {
        console.log(`Intento ${attempt} falló:`, err);
        
        if (attempt === maxRetries) {
          setError(`Falló después de ${maxRetries} intentos: ${err instanceof Error ? err.message : 'Error desconocido'}`);
          setLoading(false);
          setRetryCount(0);
          throw err;
        }
        
        // Esperar antes del siguiente intento (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  };
  
  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>
        🛡️ Manejo Robusto de Errores
      </h4>
      
      <div style={{ 
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <button 
          className="demo-button"
          onClick={() => fetchWithRetry('https://jsonplaceholder.typicode.com/users/1')}
          disabled={loading}
          style={{ 
            background: '#10b981',
            color: 'white'
          }}
        >
          ✅ URL Válida
        </button>
        
        <button 
          className="demo-button"
          onClick={() => fetchWithRetry('https://jsonplaceholder.typicode.com/invalid-endpoint')}
          disabled={loading}
          style={{ 
            background: '#ef4444',
            color: 'white'
          }}
        >
          ❌ URL Inválida
        </button>
      </div>
      
      {loading && (
        <div style={{ 
          background: '#fef3c7',
          border: '1px solid #F59E0B',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#92400e',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <RefreshCw size={16} className="animate-spin" />
          Cargando... {retryCount > 1 && `(Intento ${retryCount}/3)`}
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
          ❌ {error}
        </div>
      )}
      
      {data && !loading && (
        <div style={{ 
          background: '#f0fdf4',
          border: '1px solid #10b981',
          borderRadius: '4px',
          padding: '0.75rem',
          color: '#059669'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Star size={16} />
            <strong>✅ Datos cargados exitosamente!</strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Usuario: {data.name || data.title || 'Datos encontrados'}
          </p>
          {data.email && (
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
              Email: {data.email}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ApiSection;

import { useEffect, useState } from 'react'
import { Contenedor } from "./components/Contenedor";
import { Consultar } from "./api/api.js";
import { Tarjeta } from "./components/Tarjeta.jsx";

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [itemsFiltrados, setItemsFiltrados] = useState([])
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroRaza, setFiltroRaza] = useState('')
  const [ordenPor, setOrdenPor] = useState('name')

  const filtrarPersonajes = () => {
    let resultado = items;

    if (filtroNombre) {
      resultado = resultado.filter(item =>
        item.name.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }

    if (filtroRaza) {
      resultado = resultado.filter(item =>
        item.race === filtroRaza || item.species === filtroRaza
      );
    }

    resultado.sort((a, b) => {
      if (ordenPor === 'name') {
        return a.name.localeCompare(b.name);
      } else if (ordenPor === 'power') {
        const poderA = a.ki || a.power_level || a.maxKi || 0;
        const poderB = b.ki || b.power_level || b.maxKi || 0;
        return parseInt(poderB.replace(/[^\d]/g, '')) - parseInt(poderA.replace(/[^\d]/g, ''));
      }
      return 0;
    });

    setItemsFiltrados(resultado);
  };

  useEffect(() => {
    async function carga() {
      const i = await Consultar()
      setItems(i) 
      setTimeout(() => {
        setLoading(false)
      }, 1000);   
    }
    carga()
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      filtrarPersonajes();
    }
  }, [filtroNombre, filtroRaza, ordenPor, items])

  const razasUnicas = [...new Set(items.map(item => 
    item.race || item.species || 'Desconocido'
  ).filter(Boolean))]

  const limpiarFiltros = () => {
    setFiltroNombre('')
    setFiltroRaza('')
    setOrdenPor('name')
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          DRAGON BALL
        </h1>
        <p className="text-gray-400">Personajes</p>
      </div>

      
      <div className="max-w-4xl mx-auto mb-8 p-4 bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
          />

          <select
            value={filtroRaza}
            onChange={(e) => setFiltroRaza(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
          >
            <option value="">Todas las razas</option>
            {razasUnicas.map(raza => (
              <option key={raza} value={raza}>{raza}</option>
            ))}
          </select>

          <select
            value={ordenPor}
            onChange={(e) => setOrdenPor(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
          >
            <option value="name">Por nombre</option>
            <option value="power">Por poder</option>
          </select>

          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Limpiar
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-400 text-sm">
            {itemsFiltrados.length} de {items.length} personajes
          </span>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto">
        {itemsFiltrados.length > 0 ? (
          <Contenedor>
            {itemsFiltrados.map((item, index) => {
              return <Tarjeta key={item.id || index} item={item} />
            })}
          </Contenedor>
        ) : (
          <div className="text-center py-16">
            <p className="text-white text-xl mb-4">
              No se encontraron personajes
            </p>
            <button
              onClick={limpiarFiltros}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
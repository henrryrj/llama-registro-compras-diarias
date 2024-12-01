import  { useState } from 'react';

interface Producto {
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

interface Compra {
  fecha: string;
  total: number;
  productos: Producto[];
}

const App = () => {
  const [nombre, setNombre] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleCompra, setDetalleCompra] = useState<Compra | null>(null);

  const agregarProducto = () => {
    const nuevoProducto: Producto = {
      nombre,
      precioUnitario,
      cantidad,
    };
    setProductos([...productos, nuevoProducto]);
    setNombre('');
    setPrecioUnitario(0);
    setCantidad(1);
  };

  const editarProducto = (index: number) => {
    const productoEditado: Producto = {
      nombre,
      precioUnitario,
      cantidad,
    };
    const nuevosProductos = [...productos];
    nuevosProductos[index] = productoEditado;
    setProductos(nuevosProductos);
    setNombre('');
    setPrecioUnitario(0);
    setCantidad(0);
  };

  const eliminarProducto = (index: number) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const guardarCompra = () => {
    const fecha = new Date().toLocaleDateString();
    const total = productos.reduce((acumulado, producto) => acumulado + producto.precioUnitario * producto.cantidad, 0);
    const nuevaCompra: Compra = {
      fecha,
      total,
      productos,
    };
    setCompras([...compras, nuevaCompra]);
    setProductos([]);
  };

  const verDetalle = (compra: Compra) => {
    setDetalleCompra(compra);
    setModalVisible(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registro de Compras Diarias</h1>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Nombre del Producto:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Precio Unitario:</label>
        <input
          type="number"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(Number(e.target.value))}
          className="p-2 border border-gray-400 rounded-lg"
          min={0}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="p-2 border border-gray-400 rounded-lg"
          min={1}
        />
      </div>
      <button
        onClick={agregarProducto}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 mr-2"
      >
        <i className="fas fa-plus mr-2"></i>Agregar Producto
      </button>
      <table className="table-fixed" style={{ display: productos.length > 0 ? 'block' : 'none' }}>
        <thead className='bg-teal-200'>
          <tr className='text-white'>
            <th className="text-lg font-bold p-2">Nombre</th>
            <th className="text-lg font-bold p-2">Precio Unitario</th>
            <th className="text-lg font-bold p-2">Cantidad</th>
            <th className="text-lg font-bold p-2">Subtotal</th>
            <th className="text-lg font-bold p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="p-2">{producto.nombre}</td>
              <td className="p-2 text-right">{producto.precioUnitario}</td>
              <td className="p-2 text-right">{producto.cantidad}</td>
              <td className="p-2 text-right">{producto.precioUnitario * producto.cantidad}</td>
              <td className="p-2">
                <button
                  onClick={() => editarProducto(index)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-lg mr-2"
                >
                  <i className="fas fa-edit mr-1"></i>Editar
                </button>
                <button
                  onClick={() => eliminarProducto(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg"
                >
                  <i className="fas fa-trash mr-1"></i>Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='font-bold bg-teal-200'>
            <td className='p-2 text-right' colSpan={1}>Totales</td>
            <td className="p-2 text-right">{productos.reduce((suma, productoActual) => suma + productoActual.precioUnitario, 0)}</td>
            <td className="p-2 text-right">{productos.reduce((suma, productoActual) => suma + productoActual.cantidad, 0)}</td>
            <td className="p-2 text-right">{productos.reduce((suma, productoActual) => suma + (productoActual.precioUnitario * productoActual.cantidad), 0)}</td>
            <td className='p-2 text-right' colSpan={1}></td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={guardarCompra}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-4 mt-2"
        style={{ display: productos.length > 0 ? 'block' : 'none' }}
      >
        <i className="fas fa-save mr-2"></i>Guardar Compra
      </button>
      <h2 className="text-2xl font-bold mb-4" style={{ display: compras.length >0? 'block' : 'none' }}>Historial de Compras</h2>
      <table className="table-fixed" style={{ display: compras.length >0? 'block' : 'none' }}>
        <thead className='bg-teal-200'>
          <tr className='text-white'>
            <th className="text-lg font-bold p-2">Fecha</th>
            <th className="text-lg font-bold p-2 text-right">Total</th>
            <th className="text-lg font-bold p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra, index) => (
            <tr key={index}>
              <td className="p-2">{compra.fecha}</td>
              <td className="p-2 text-right">{compra.total}</td>
              <td className="p-2">
                <button
                  onClick={() => verDetalle(compra)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
                >
                  <i className="fas fa-info-circle mr-1"></i>Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='font-bold bg-teal-200'>
            <td className='p-2 text-right' colSpan={1}>Totales</td>
            <td className="p-2 text-right">{compras.reduce((suma, compra) => suma + compra.total, 0)}</td>
            <td className='p-2 text-right' colSpan={1}></td>
          </tr>
        </tfoot>
      </table>
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Detalle de Compra</h2>
            <table className="table-fixed" >
            <thead className='bg-teal-200'>
                <tr className='text-white'>
                  <th className="text-lg font-bold p-2">Nombre</th>
                  <th className="text-lg font-bold p-2">Precio Unitario</th>
                  <th className="text-lg font-bold p-2">Cantidad</th>
                  <th className="text-lg font-bold p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalleCompra?.productos.map((producto, index) => (
                  <tr key={index}>
                    <td className="p-2">{producto.nombre}</td>
                    <td className="p-2 text-right">{producto.precioUnitario}</td>
                    <td className="p-2 text-right">{producto.cantidad}</td>
                    <td className="p-2 text-right">{producto.precioUnitario * producto.cantidad}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='font-bold bg-teal-200'>
                  <td className='p-2 text-right' colSpan={1}>Totales</td>
                  <td className="p-2 text-right">{detalleCompra?.productos.reduce((suma, productoActual) => suma + productoActual.precioUnitario, 0)}</td>
                  <td className="p-2 text-right">{detalleCompra?.productos.reduce((suma, productoActual) => suma + productoActual.cantidad, 0)}</td>
                  <td className="p-2 text-right">{detalleCompra?.productos.reduce((suma, productoActual) => suma + (productoActual.precioUnitario * productoActual.cantidad), 0)}</td>
                </tr>
              </tfoot>
            </table>
            <button
              onClick={() => setModalVisible(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
            >
              <i className="fas fa-times mr-2"></i>Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
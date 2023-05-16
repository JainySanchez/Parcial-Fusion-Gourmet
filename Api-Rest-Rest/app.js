// Importar los módulos necesarios
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');



// Crear la aplicación Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
// Agregar cors como middleware
app.use(cors());

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ server });

// Crear un arreglo con los datos de los restaurantes
const restaurantes = [
  {
    nombre: 'Fusion Gourmet Surco',
    ubicacion: 'Surco',
    id: '1'
  },
  {
    nombre: 'Fusion Gourmet Barranco',
    ubicacion: 'Barranco',
    id: '2'
  },
  {
    nombre: 'Fusion Gourmet Miraflores',
    ubicacion: 'Miraflores',
    id: '3'
  },
  {
    nombre: 'Fusion Gourmet Callao',
    ubicacion: 'Callao',
    id: '4'
  },
  {
    nombre: 'Fusion Gourmet Breña',
    ubicacion: 'Breña',
    id: '5'
  }
];



// Endpoint para buscar restaurantes por nombre o ubicación
app.get('/restaurantes', (req, res) => {
  const { nombre, ubicacion } = req.query;
  const resultados = restaurantes.filter(restaurante => {
    const coincideNombre = !nombre || restaurante.nombre.toLowerCase().includes(nombre.toLowerCase());
    const coincideUbicacion = !ubicacion || restaurante.ubicacion.toLowerCase().includes(ubicacion.toLowerCase());
    return coincideNombre && coincideUbicacion;
  });
  res.json(resultados);
});

// Endpoint para hacer una reserva en un restaurante
app.post('/reservas', (req, res) => {
  const { nombreRestaurante, fecha, hora, numeroPersonas } = req.body;
  const restaurante = restaurantes.find(restaurante => restaurante.nombre === nombreRestaurante);
  if (!restaurante) {
    return res.status(404).send('Restaurante no encontrado');
  }
  if (restaurante.mesasDisponibles < numeroPersonas) {
    return res.status(400).send('No hay mesas disponibles');
  }
  const reserva = {
    usuario,
    dni,
    fecha,
    hora,
    numeroPersonas,
    nombreRestaurante,
    confirmada: false
  };
  restaurante.reservas.push(reserva);
  restaurante.mesasDisponibles -= numeroPersonas;
  // Enviar la confirmación de la reserva a través de WebSocket
  wss.clients.forEach(cliente => {
    cliente.send(JSON.stringify({
      tipo: 'confirmacion',
      restaurante: nombreRestaurante,
      reserva
    }));
  });
  res.status(201).json(reserva);
});

// Iniciar el servidor HTTP y WebSocket
const PORT = 2000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
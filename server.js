const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const productRouter = require('./routes/products');
const viewRouter = require('./routes/views');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/products', productRouter);
app.use('/', viewRouter);

// Manejo de conexión con WebSockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

    socket.on('deleteProduct', (productId) => {
        io.emit('removeProduct', productId);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = io;

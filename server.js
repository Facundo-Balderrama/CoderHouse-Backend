const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Server } = require('socket.io');
const http = require('http');
const exphbs = require('express-handlebars');

const productRouter = require('./routes/products.js');
const cartRouter = require('./routes/carts.js');
const viewRouter = require('./routes/views.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views.js');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/products', productRouter(io));
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

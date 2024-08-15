document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    socket.on('updateProducts', (product) => {
        const productList = document.getElementById('product-list');
        const newProduct = document.createElement('li');
        newProduct.setAttribute('data-id', product.id);
        newProduct.innerHTML = `${product.title} - ${product.price} <button onclick="deleteProduct(${product.id})">Delete</button>`;
        productList.appendChild(newProduct);
    });

    socket.on('removeProduct', (productId) => {
        const productElement = document.querySelector(`[data-id="${productId}"]`);
        if (productElement) {
            productElement.remove();
        }
    });

    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
        const category = document.getElementById('category').value;
        const thumbnails = document.getElementById('thumbnails').value.split(',');

        const product = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        };

        socket.emit('newProduct', product);

        // Reset form
        form.reset();
    });

    // Función para eliminar productos
    window.deleteProduct = (productId) => {
        socket.emit('deleteProduct', productId);
    };
});
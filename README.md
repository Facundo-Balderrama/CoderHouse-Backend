La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
![image](https://github.com/user-attachments/assets/1e2b12c7-7e08-4cb8-8678-5d61cbc2c509)

La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
![image](https://github.com/user-attachments/assets/f34dba7f-1104-4e19-a558-34d31686e741)

La ruta raíz POST / deberá agregar un nuevo producto con los campos: id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo. title:String, description:String code:String price:Number status:Boolean stock:Number category:String thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto Status es true por defecto. Todos los campos son obligatorios, a excepción de thumbnails
![image](https://github.com/user-attachments/assets/44c9dc69-c35f-496d-9955-f45929730fb7)
![image](https://github.com/user-attachments/assets/5da733e2-bc52-489f-bad1-889b8e315be9)

La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
![image](https://github.com/user-attachments/assets/bdf5d61b-affe-4acc-9b27-903310de9579)
![image](https://github.com/user-attachments/assets/ae5b0738-1cb7-42cd-88c1-a90db237ba1e)

La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
![image](https://github.com/user-attachments/assets/b1143912-9d13-4177-92fe-f6da0f85a925)
![image](https://github.com/user-attachments/assets/4eb1cf3f-2b94-4b7f-a107-c9db951ff3e5)

La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura: Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere). products: Array que contendrá objetos que representen cada producto
![image](https://github.com/user-attachments/assets/c64483c9-97c7-41a8-a0d6-d129ba6a8654)

La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
![image](https://github.com/user-attachments/assets/8251bd8c-eceb-417b-a1aa-c94d8273f55c)

La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato: product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo) quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno. Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.
(ESTA ULTIMA PARTE NO ME SALIA, SEGUN EL CODIGO NO TIRA ERROR, PERO NO ME CAMBIA NADA)

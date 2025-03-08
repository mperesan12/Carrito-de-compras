//variables gobales
let btnproducts = document.querySelectorAll(".btn-product");
let contadorCarrito =document.querySelector(".contar-pro");
let listadocarrito = document.querySelector(".list-cart tbody");
let con=0;
// el consol es solo para mostar en consola 
//console.log(btnproducts);

//para que cuando recarge vuelova a regar la pagina
document.addEventListener("DOMContentLoaded",()=>{
    cagarProLocalStorage();
})



btnproducts.forEach((btn, i)=>{
    btn.addEventListener("click", ()=>{
        //alert("distes click al boton" +(i+1))
        // el contador de producto en el carrito
        con++;
        contadorCarrito.textContent=con; //actualizamos el contador en el HTML
       
        
        infoProducto(i);
    });
});

//agregar producto al carrito
function agregarProducto(producto){
    let fila =document.createElement("tr");
    fila.innerHTML=`
    <td> ${con} </td>
    <td> <img src="${producto.imagen}"width="70px" ></td>
    <td> ${producto.nombre} </td>
    <td> $${producto.precio} </td>
    <td><span onclick="borrarProducto(${con})" class="btn btn-danger"> x </td>
    `;
    listadocarrito.appendChild(fila);
}

//funcion para agregar la informacion del producto al carrito
function infoProducto(pos){
    let producto= btnproducts[pos].parentElement.parentElement.parentElement;
    let infoPro={
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    }

    //console.log(infoPro);
    agregarProducto(infoPro);
    guardarproLocalStorage(infoPro); 
}

// funcion para eliminar un producto del carrito 
function borrarProducto(pos) {
    let producto = event.target;
    producto.parentElement.parentElement.remove();

    // Disminuir el contador del carrito
    if (con > 0) {
        con--;
        contadorCarrito.textContent = con;
    }
    eliminarproLocalStorage(pos);
    // #1 reto numero uno 
    // Actualizar los índices de los productos en la tabla
    let filas = listadocarrito.querySelectorAll("tr");
    filas.forEach((fila, index) => {
        // Actualiza el contenido de la primera celda con el índice correcto
        fila.querySelector("td").textContent = index + 1;
    });
}

//guardar los productos en localstorage
function guardarproLocalStorage(producto){
    let todosProductos= [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"));
    if(productosPrevios != null){
        todosProductos = Object.values( productosPrevios);
    }
    todosProductos.push(producto);
    localStorage.setItem("pro-carrito",JSON.stringify(todosProductos));

}

// eliminar productos en localstorage
function eliminarproLocalStorage( pos ){
    let todosProductos= [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"));
    if(productosPrevios != null){
        todosProductos = Object.values( productosPrevios);
    }
    todosProductos.splice((pos-1),1);
    localStorage.setItem("pro-carrito",JSON.stringify(todosProductos));

}

// cargar productos del localstorage en el carrito
function cagarProLocalStorage(){
    let todosProductos= [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"));
    if(productosPrevios != null){
        todosProductos = Object.values( productosPrevios);
    }
    todosProductos.forEach((producto)=>{
        agregarProducto(producto);
    });
}

contadorCarrito.parentElement.addEventListener("click", ()=>{
    listadocarrito.parentElement.classList.toggle("ocultar");
}
)
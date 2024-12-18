let carrito =[]
let carritoabierto= false
if (localStorage.getItem("carrito")){
  
    carrito = JSON.parse(localStorage.getItem("carrito"))
   // alert(typeof(carrito[0].producto) + " " + carrito[0].producto)
}
//localStorage.removeItem("carrito")

mostrarcontador()
function mostrarcontador(){
  if (contarCarrito() != 0){document.getElementById("carrito-contador").style.display = "flex"
  document.getElementById("carrito-contador").innerText = contarCarrito()
}
else {
  document.getElementById("carrito-contador").style.display = "none"
}
}



const productos = async () => {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxDk8hhUDcKvMPRP_on7ZX23CN3nZL2eOB6knfro0NdsD2-aSBhF5gRyAtoztjdchrj1A/exec");
    
    if (res.ok) {
   
    const data = await res.json();
    console.log(data)
    for (i = 0; i < data.length; i++) {
       let p = document.createElement("article")
       let b = document.createElement("button")
       let objClon = JSON.stringify(data[i])
      // alert(objClon)
       p.classList.add("card")
       p.classList.add("fondo-card")
       p.id = data[i].Id
       p.innerHTML += '<div class="card-img"><img src="assets/img/productos/'+ data[i].Imagen+'" alt="'+'"></div>'
       p.innerHTML += '<div class="card-txt"><h3>' + data[i].Producto + '</h3><h4>$ '+data[i].Precio+' </h4></div>'
       b.classList.add("boton-agregar")
       b.innerHTML = "Agregar al carrito"
       p.appendChild(b)
       b.addEventListener('click', ()=>{
        addCarrito(objClon)
        if (carritoabierto == true){
         listarCarrito()}
        
        
       })
       document.getElementById("cards-container").appendChild(p)
        
    }
    
}
}
productos()

function addCarrito(objClon){
  let encontrado = false;
  let pos = 0;
  let producto = {"producto":JSON.parse(objClon),"cantidad":1}
  
  while (!encontrado && pos < carrito.length){
   
    if ( JSON.stringify(carrito[pos].producto) == objClon){
       
        encontrado = true
        carrito[pos].cantidad++

    }
    pos++
 
  }
  if (encontrado==false){
      carrito.push(producto)
  }
  document.getElementById("carrito-contador").style.display = "flex"
  document.getElementById("carrito-contador").innerText = contarCarrito()

  localStorage.setItem("carrito",JSON.stringify(carrito) )
}
function contarCarrito(){
    let total = 0
    for (let i = 0 ; i < carrito.length; i++){
     total += carrito[i].cantidad

    }
 return total
}



function listarCarrito(){
       if(document.getElementById("carrito-items").hasChildNodes()){
        while (document.getElementById("carrito-items").firstChild) {
            document.getElementById("carrito-items").removeChild(document.getElementById("carrito-items").firstChild);
          }
       } 
       if (carrito.length == 0){
        let vacio = document.createElement("h3")
        vacio.innerHTML = "El carrito esta vacio"
        
        document.getElementById("carrito-items").appendChild(vacio)
        return
       }
        else {
       let tablacarrito = document.createElement("table")
        let total = document.createElement("h3")
        let vaciarCarrito = document.createElement("button")
        let totalCarrito = 0
       //
        tablacarrito.innerHTML += '<tr><td>Producto</td><td>Precio</td><td>Cantidad</td></tr>'
        tablacarrito.classList.add("tabla-items")
        for (let i = 0 ; i < carrito.length; i++){
           // CREAR TR Y TD PARA NO ROMPER EL ESQUEMA CON EL INNER 
          let eliminar = document.createElement("button")
          let sumar = document.createElement("button")
          let restar = document.createElement("button")
          let trn = document.createElement("tr")
          let tdn = document.createElement("td")    
            trn.innerHTML += '<td>'+carrito[i].producto.Producto+'</td><td>'+carrito[i].producto.Precio+'</td><td>'+carrito[i].cantidad+'</td>'
            
            eliminar.classList.add("boton-eliminar")
            eliminar.innerHTML = "Eliminar"
            sumar.classList.add("boton-sumar")
            sumar.innerHTML = "+"
            restar.classList.add("boton-eliminar")
            restar.innerHTML = "-"
            sumar.addEventListener('click', () => {
              sumarCantidad(i)
            })
            restar.addEventListener('click', () => {
              restarCantidad(i)
            })
            
            eliminar.addEventListener('click', () => {
              eliminarProducto(i)
            })
           tdn.appendChild(sumar)
           tdn.appendChild(restar) 
           trn.appendChild(tdn)
           tdn.appendChild(eliminar)
           tablacarrito.appendChild(trn) 
          
            totalCarrito += carrito[i].producto.Precio * carrito[i].cantidad
           
        }
        
        total.innerHTML = "Total: $" + totalCarrito
        
        vaciarCarrito.innerHTML = "Vaciar Carrito"
        vaciarCarrito.addEventListener('click', () => {
          vaciarCarrito()
        })
        
        vaciarCarrito.classList.add("boton-eliminar")
        document.getElementById("carrito-items").appendChild(tablacarrito)
        document.getElementById("carrito-items").appendChild(total)
        document.getElementById("carrito-items").appendChild(vaciarCarrito)
      }
          
}
function sumarCantidad(pos){
  carrito[pos].cantidad++
  document.getElementById("carrito-contador").style.display = "flex"
  document.getElementById("carrito-contador").innerText = contarCarrito()
  localStorage.setItem("carrito",JSON.stringify(carrito) )
  listarCarrito()
  mostrarcontador()
}
function restarCantidad(pos){
  if (carrito[pos].cantidad > 1){
  carrito[pos].cantidad--
  document.getElementById("carrito-contador").style.display = "flex"
  document.getElementById("carrito-contador").innerText = contarCarrito()
  localStorage.setItem("carrito",JSON.stringify(carrito) )
  listarCarrito()
  }else {
    eliminarProducto(pos)
  }
  mostrarcontador()
}

function eliminarProducto(pos){
  carrito.splice(pos,1)
  document.getElementById("carrito-contador").style.display = "flex"
  document.getElementById("carrito-contador").innerText = contarCarrito()
  localStorage.setItem("carrito",JSON.stringify(carrito) )
  listarCarrito()
  mostrarcontador()
}

function vaciarCarrito(){
  localStorage.removeItem("carrito")
  carrito = []
  document.getElementById("cont-carrito").style.display = "none"
  document.getElementById("carrito-contador").style.display = "none"
  carritoabierto = false
}


document.getElementById("carrito").addEventListener('click', e => {
 if (carritoabierto == true){
  document.getElementById("cont-carrito").style.display = "none"
  carritoabierto = false
}else {
  document.getElementById("cont-carrito").style.display = "block"
  
  listarCarrito()
  carritoabierto = true
}
})
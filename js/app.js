let products = [
  {id:1,name:"RTX 4060",category:"GPU",price:1599,stock:5,img:"./img/img-rtx4060.jpg"},
  {id:2,name:"RX 7600",category:"GPU",price:1299,stock:8,img:"./img/img-rx7600.jpg"},
  {id:3,name:"Ryzen 5 5500",category:"CPU",price:499,stock:8,img:"./img/img-ry5500.jpg"},
  {id:4,name:"Msi B760M",category:"Motherboard",price:450,stock:3,img:"./img/img-b760m.png"},
  {id:5,name:"Logitech MX Mechanical",category:"Teclado",price:699,stock:15,img:"./img/img-mx.png"},
  {id:6,name:"Logitech G522",category:"Auriculares",price:599,stock:10,img:"./img/img-g522.jpg"},
  {id:7,name:"Monitor 24\"",category:"Monitor",price:899,stock:7,img:"./img/img-lgmon.jpg"},
  {id:8,name:"SSD 500GB",category:"Almacenamiento",price:250,stock:12,img:"./img/img-ssd500.jpg"},
  {id:9,name:"Fuente 600W",category:"Fuente",price:350,stock:5,img:"./img/img-600w.jpg"}
];

const ofertas = [
  {name:"Ryzen 5 5500",price_old:499,price_new:449,img:"./img/img-ry5500.jpg"},
  {name:"Logitech MX Mechanical",price_old:699,price_new:649,img:"./img/img-mx.png"},
  {name:"Logitech G522",price_old:599,price_new:549,img:"./img/img-g522.jpg"}
];

const categories = [
  {name:"GPU",img:"./img/img-gpu.jpeg"},
  {name:"CPU",img:"./img/img-cpu.jpg"},
  {name:"Motherboard",img:"./img/img-mothb.jpg"},
  {name:"Teclado",img:"./img/img-teclado.jpg"},
  {name:"Mouse",img:"./img/img-mouse.jpg"},
  {name:"Auriculares",img:"./img/img-headph.jpg"},
  {name:"Almacenamiento",img:"./img/img-sdd.jpg"},
  {name:"Monitores",img:"./img/img-monitor.jpg"},
  {name:"Fuente",img:"./img/img-fuente.jpg"}
];

const catalogoBody = document.getElementById("catalogo-body");
const inventarioBody = document.getElementById("inventario-body");
const ofertasBody = document.getElementById("ofertas-body");
const categoriesBody = document.getElementById("categories-body");

const addBtn = document.getElementById("add-product-btn");
const modal = document.getElementById("modal-product");
const modalClose = document.getElementById("modal-close");
const saveProduct = document.getElementById("save-product");

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector("nav.menu");

function renderCatalog(){
  catalogoBody.innerHTML = "";
  products.forEach(p => {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="content">
        <span class="etiqueta">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="precio">S/ ${p.price}</p>
        <a href="#contacto" class="btn btn-loquiero">Lo quiero</a>
      </div>
    `;
    article.addEventListener("mouseover",()=>console.log(`Hover: ${p.name}`));
    article.addEventListener("mouseout",()=>console.log(`Mouse out: ${p.name}`));
    catalogoBody.appendChild(article);
  });
}

function renderInventory(){
  inventarioBody.innerHTML = "";
  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.price}</td><td>${p.stock}</td>
      <td><button class="btn delete-btn" data-id="${p.id}">Eliminar</button></td>
    `;
    inventarioBody.appendChild(tr);
  });

  document.querySelectorAll(".delete-btn").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const id = parseInt(e.target.dataset.id);
      const prod = products.find(p => p.id === id);
      if(confirm(`¿Eliminar ${prod.name} (${prod.category})?`)){
        products = products.filter(p => p.id !== id);
        alert(`${prod.name} eliminado correctamente`);
        renderCatalog();
        renderInventory();
      }
    });
  });
}

function renderOffers(){
  ofertasBody.innerHTML = "";
  ofertas.forEach(o=>{
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${o.img}" alt="${o.name}">
      <div class="content">
        <span class="etiqueta">Oferta</span>
        <h3>${o.name}</h3>
        <p class="precio-old">S/ ${o.price_old}</p>
        <p class="precio-new">S/ ${o.price_new}</p>
        <a href="#contacto" class="btn btn-oferta">Lo quiero</a>
      </div>
    `;
    article.addEventListener("mouseover",()=>console.log(`Hover oferta: ${o.name}`));
    article.addEventListener("mouseout",()=>console.log(`Mouse out oferta: ${o.name}`));
    ofertasBody.appendChild(article);
  });
}

function renderCategories(){
  categoriesBody.innerHTML = "";
  categories.forEach(c=>{
    const div = document.createElement("div");
    div.classList.add("category-item");
    div.innerHTML = `<img src="${c.img}" alt="${c.name}"><div class="overlay">${c.name}</div>`;
    categoriesBody.appendChild(div);
  });
}

addBtn.addEventListener("click", ()=>{ modal.classList.add("active"); });
modalClose.addEventListener("click", ()=>{ modal.classList.remove("active"); });

saveProduct.addEventListener("click", ()=>{
  const name = document.getElementById("new-name").value;
  const category = document.getElementById("new-category").value;
  const price = parseFloat(document.getElementById("new-price").value);
  const stock = parseInt(document.getElementById("new-stock").value);

  if(name && category && !isNaN(price) && !isNaN(stock)){
    const id = products.length ? products[products.length-1].id + 1 : 1;
    products.push({id,name,category,price,stock,img:"./img/img-game.jpg"});
    alert(`Producto ${name} agregado!`);
    renderCatalog();
    renderInventory();
    modal.classList.remove("active");
    document.getElementById("new-name").value="";
    document.getElementById("new-category").value="";
    document.getElementById("new-price").value="";
    document.getElementById("new-stock").value="";
  }else alert("Completa todos los campos correctamente.");
});

hamburger.addEventListener("click", ()=>{ menu.classList.toggle("active"); });
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{ menu.classList.remove("active"); }));
window.addEventListener("click", e=>{
  if(!menu.contains(e.target) && !hamburger.contains(e.target)){ menu.classList.remove("active"); }
});

window.addEventListener("keydown", e=>{
  if(e.key === "Escape"){ menu.classList.remove("active"); modal.classList.remove("active"); }
});

document.getElementById("new-price").addEventListener("change", e=>{
  const val = parseFloat(e.target.value);
  if(val < 0) alert("El precio no puede ser negativo");
});

document.getElementById("new-stock").addEventListener("change", e=>{
  const val = parseInt(e.target.value);
  if(val < 0) alert("El stock no puede ser negativo");
});

document.querySelectorAll("#inventario-body tr").forEach(tr=>{
  tr.addEventListener("mouseover",()=>{ tr.style.backgroundColor="rgba(50,50,100,0.2)"; });
  tr.addEventListener("mouseout",()=>{ tr.style.backgroundColor=""; });
});

renderCatalog();
renderInventory();
renderOffers();
renderCategories();


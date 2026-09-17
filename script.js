const products=[
{id:1,name:"Paracetamol 500mg",category:"Pain Relief",price:39.99,icon:"💊"},
{id:2,name:"Vitamin C 1000mg",category:"Vitamins",price:89.99,icon:"🍊"},
{id:3,name:"Daily Multivitamins",category:"Vitamins",price:119.99,icon:"🌿"},
{id:4,name:"Moisturising Lotion",category:"Personal Care",price:74.99,icon:"🧴"},
{id:5,name:"First Aid Kit",category:"First Aid",price:149.99,icon:"🩹"},
{id:6,name:"Antiseptic Solution",category:"First Aid",price:54.99,icon:"🧪"},
{id:7,name:"Baby Care Set",category:"Family Care",price:129.99,icon:"👶"},
{id:8,name:"Hand Sanitiser",category:"Personal Care",price:34.99,icon:"🧴"}
];

const money=n=>"R"+n.toFixed(2);
function getCart(){return JSON.parse(localStorage.getItem("carepointCart")||"[]")}
function saveCart(c){localStorage.setItem("carepointCart",JSON.stringify(c));updateCount()}
function updateCount(){const el=document.getElementById("cartCount");if(el)el.textContent=getCart().reduce((s,x)=>s+x.qty,0)}
function addToCart(id){const c=getCart(),item=c.find(x=>x.id===id);item?item.qty++:c.push({id,qty:1});saveCart(c);alert("Product added to your cart.")}
function renderProducts(list=products){
 const grid=document.getElementById("productGrid");if(!grid)return;
 grid.innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-img">${p.icon}</div><div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="btn primary" onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join(""):`<div class="empty">No products found.</div>`;
}
function filterProducts(){
 const q=(document.getElementById("searchInput")?.value||"").toLowerCase(),cat=document.getElementById("categoryFilter")?.value||"All";
 renderProducts(products.filter(p=>(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&(cat==="All"||p.category===cat)));
}
function renderCart(){
 const box=document.getElementById("cartItems"),sum=document.getElementById("cartSummary");if(!box)return;
 const c=getCart();
 if(!c.length){box.innerHTML='<div class="empty"><h2>Your cart is empty</h2><p>Add some everyday health products to get started.</p><a class="btn primary" href="products.html">Browse products</a></div>';sum.innerHTML="";return}
 let total=0;
 box.innerHTML=c.map(item=>{const p=products.find(x=>x.id===item.id),sub=p.price*item.qty;total+=sub;return `<div class="cart-row"><strong>${p.icon} ${p.name}</strong><span>${money(p.price)} each</span><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${item.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div><strong>${money(sub)}</strong><button class="btn secondary" onclick="removeItem(${p.id})">Remove</button></div>`}).join("");
 sum.innerHTML=`<h2>Total: ${money(total)}</h2><p>Demo checkout — no payment is processed.</p><button class="btn primary" onclick="demoCheckout()">Proceed to enquiry</button>`;
}
function changeQty(id,n){let c=getCart(),x=c.find(i=>i.id===id);if(x){x.qty+=n;if(x.qty<=0)c=c.filter(i=>i.id!==id)}saveCart(c);renderCart()}
function removeItem(id){saveCart(getCart().filter(i=>i.id!==id));renderCart()}
function demoCheckout(){alert("Demo checkout: please contact CarePoint to complete an order.");}
function setupForms(){
 ["prescriptionForm","generalForm"].forEach(id=>{const f=document.getElementById(id);if(!f)return;f.addEventListener("submit",e=>{e.preventDefault();const m=document.getElementById("formMessage");if(m){m.className="success";m.textContent="Thank you. Your enquiry has been recorded for this demo.";f.reset()}})})
}
document.addEventListener("DOMContentLoaded",()=>{
 updateCount();renderProducts();renderCart();setupForms();
 document.getElementById("searchInput")?.addEventListener("input",filterProducts);
 document.getElementById("categoryFilter")?.addEventListener("change",filterProducts);
 const params=new URLSearchParams(location.search),cat=params.get("category");if(cat&&document.getElementById("categoryFilter")){document.getElementById("categoryFilter").value=cat;filterProducts()}
 document.querySelector(".menu-btn")?.addEventListener("click",()=>document.getElementById("navLinks")?.classList.toggle("open"));
});
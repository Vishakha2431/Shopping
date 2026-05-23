let filters = document.querySelectorAll(".filter");
let products = JSON.parse(localStorage.getItem("products")) || [];
let ssearchBtn=document.getElementById("searchbtn");

ssearchBtn.addEventListener("input",(e)=>{
     
    let val=e.target.value.toLowerCase();
    let filtered=products.filter((item)=> item.title.toLowerCase().includes(val))
    displayProducts(filtered)
   

})

async function fetchProduct(category) {

    let allProducts = products;

    // fetch only if empty
    if (products.length === 0) {
        const res = await fetch("https://fakestoreapi.com/products");
        allProducts = await res.json();
        localStorage.setItem("products", JSON.stringify(allProducts));
        products = allProducts;
    }

    // filtering logic
    let filtered = allProducts;

    if (category && category !== "all-products") {
        filtered = allProducts.filter((p) =>
            p.category.toLowerCase() === category.toLowerCase()
        );
    }

    
    console.log("Filtered Products:");
    filtered.forEach((item) => {
        console.log(item.category);
    });
    displayProducts(filtered);
}



    let container = document.querySelector(".items");

    container.innerHTML = "";

    products.forEach((item) => {

        let card = document.createElement("div");
        card.classList.add("item");

        card.innerHTML = `
            <img src="${item.image}" alt="Item" />

            <div class="info">

                <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">S, M, L</div>
                </div>

                <div class="colors">
                    Colors:
                    <div class="row">
                        <div class="circle" style="background-color: #000"></div>
                        <div class="circle" style="background-color: #4938af"></div>
                        <div class="circle" style="background-color: #203d3e"></div>
                    </div>
                </div>

                <div class="row">
                    Rating: ${item.rating.rate}
                </div>

            </div>

            <button onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
function displayProducts(products) {


    let container = document.querySelector(".items");

    container.innerHTML = "";

    // ALL PRODUCTS CASE
    if (products.length === 0) {
        container.innerHTML = "<h2>No Products Found</h2>";
        return;
    }

    products.forEach((item) => {

        let card = document.createElement("div");
        card.classList.add("item");

        card.innerHTML = `
            <img src="${item.image}" alt="item"/>

            <div class="info">

                <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">S, M, L</div>
                </div>

                <div class="row">
                    Category: ${item.category}
                </div>

                <div class="row">
                    Rating: ${item.rating.rate}
                </div>

            </div>

            <button onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}

    function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ensure products exist
    if (!products.length) return;

    let product = products.find(p => p.id == id);

    if (!product) return;

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart 🛒");
}


// click events
filters.forEach((btn) => {
    btn.addEventListener("click", () => {

        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        fetchProduct(btn.id || btn.textContent.trim());
    });
});
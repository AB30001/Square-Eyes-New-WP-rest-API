
// Function to fetch products
function fetchProducts() {
    console.log("Fetching products...");
    fetch('https://snoutstyles.com/wp-json/wc/store/products')
        .then(response => {
            console.log("Response received", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received", data); 
            displayProducts(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) return;

    productsContainer.innerHTML = ''; 

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : '';
        
        
        productElement.innerHTML = `
            <a href="productpage.html?id=${product.id}">
                <h2>${product.name}</h2>
                <img src="${imageUrl}" alt="${product.name}" style="width:300px; height:auto;">
            </a>
            <p>${product.description}</p>
            <p><strong>Price:</strong> ${product.prices.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(productElement);
    });
}


function addToCart(productId) {
    console.log("Adding to cart:", productId);
   
}

window.onload = fetchProducts;




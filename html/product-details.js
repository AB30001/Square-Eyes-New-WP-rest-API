function fetchProductDetails() {
    // Extract product ID from URL
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');

    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    fetch(`https://snoutstyles.com/wp-json/wc/store/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => displayProductDetails(product))
        .catch(error => console.error('Fetch error:', error));
}

function displayProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail');

    if (!productDetailContainer) return;

    const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : '';

    productDetailContainer.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${imageUrl}" alt="${product.name}" style="width:300px; height:auto;">
        <p>${product.description}</p>
        <p><strong>Price:</strong> ${product.prices.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

window.onload = fetchProductDetails;

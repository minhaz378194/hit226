document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;

    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<h3>${name}</h3><p>Price: $${price}</p><img src="${image}" width="100"><br>`;

    document.getElementById("product-list").appendChild(productDiv);

    document.getElementById("product-form").reset();
});

// Subscription Form Submission
document.getElementById("subscription-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    alert("Thank you for subscribing with " + email + "!");
    document.getElementById("subscription-form").reset();
});

/* =========================================
   AL LUXE SHOPPING SYSTEM
========================================= */


/* =========================================
   PRODUCT INFORMATION
========================================= */

const products = {

    petal: {
        name: "Petal Necklace",
        price: 150,
        image: "images/Petal Necklace.jpg",
        description: "A graceful floral-inspired necklace designed to bring a delicate touch of elegance to your everyday look."
    },

    "flower-drop": {
        name: "Flower Drop Necklace",
        price: 150,
        image: "images/Golden Flower Drop Necklace ✨.jpg",
        description: "A beautiful flower-inspired necklace that combines feminine charm with an elegant golden finish."
    },

    lola: {
        name: "Lola Necklace",
        price: 150,
        image: "images/Flower Necklace Enamel Pendants Dainty Flower Necklace - Etsy.jpg",
        description: "A delicate floral necklace selected for its effortless beauty and sophisticated everyday appeal."
    },

    "crystal-bow": {
        name: "Crystal Bow Necklace",
        price: 150,
        image: "images/crystal bow.jpg",
        description: "A graceful crystal bow necklace that adds sparkle and refined elegance to any outfit."
    },

    "gold-bow": {
        name: "Gold Bow Necklace",
        price: 150,
        image: "images/gold bow.jpg",
        description: "A timeless gold bow design created for a polished and effortlessly elegant appearance."
    },

    heart: {
        name: "Heart Necklace",
        price: 150,
        image: "images/full heart.jpg",
        description: "A charming heart necklace that brings a romantic and timeless touch to your jewellery collection."
    },

    crescent: {
        name: "Crescent Necklace",
        price: 150,
        image: "images/crescent necklace.jpg",
        description: "A sophisticated crescent-inspired necklace designed for understated elegance."
    },

    "open-pearl": {
        name: "Open Pearl Necklace",
        price: 150,
        image: "images/open pearl.jpg",
        description: "A refined pearl-inspired piece that blends classic beauty with a modern silhouette."
    },

    "pearl-luxe": {
        name: "Pearl Luxe Necklace",
        price: 150,
        image: "images/pearl luxe.jpg",
        description: "An elegant pearl necklace that adds timeless sophistication to both everyday and occasion styling."
    },

    sunshine: {
        name: "Sunshine Necklace",
        price: 150,
        image: "images/sunshine necklace.jpg",
        description: "A radiant necklace inspired by sunshine, designed to bring warmth and elegance to your look."
    },

    charm: {
        name: "Charm Necklace",
        price: 150,
        image: "images/Hibiscus Charm Necklace.jpg",
        description: "A beautiful charm necklace with a delicate floral-inspired design and timeless appeal."
    },

    bloom: {
        name: "Bloom Necklace",
        price: 150,
        image: "images/Pin by 𝐋𝐚𝐟𝐞𝐞♡.jpg",
        description: "A graceful bloom-inspired necklace that adds a soft and feminine finishing touch."
    }

};


/* =========================================
   GET PRODUCT FROM URL
========================================= */

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("product");

const product = products[productId];


/* =========================================
   DISPLAY PRODUCT
========================================= */

if (product) {

    const productName = document.getElementById("productName");

    const productPrice = document.getElementById("productPrice");

    const productImage = document.getElementById("productImage");

    const productDescription = document.getElementById("productDescription");


    if (productName) {
        productName.textContent = product.name;
    }


    if (productPrice) {
        productPrice.textContent = `GH₵${product.price.toFixed(2)}`;
    }


    if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
    }


    if (productDescription) {
        productDescription.textContent = product.description;
    }

}


/* =========================================
   QUANTITY
========================================= */

let quantity = 1;


const quantityDisplay = document.getElementById("quantity");

const increaseBtn = document.getElementById("increaseBtn");

const decreaseBtn = document.getElementById("decreaseBtn");


if (increaseBtn) {

    increaseBtn.addEventListener("click", function () {

        quantity++;

        quantityDisplay.textContent = quantity;

    });

}


if (decreaseBtn) {

    decreaseBtn.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;

        }

    });

}


/* =========================================
   ADD TO CART
========================================= */

const addCartBtn = document.getElementById("addCartBtn");


if (addCartBtn) {

    addCartBtn.addEventListener("click", function () {

        if (!product) {
            return;
        }


        let cart =
            JSON.parse(localStorage.getItem("alLuxeCart")) || [];


        const existingProduct =
            cart.find(item => item.id === productId);


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                id: productId,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity

            });

        }


        localStorage.setItem(
            "alLuxeCart",
            JSON.stringify(cart)
        );


        alert(`${product.name} has been added to your cart.`);

    });

}


/* =========================================
   ADD TO WISHLIST
========================================= */

const wishlistBtn = document.getElementById("wishlistBtn");


if (wishlistBtn) {

    wishlistBtn.addEventListener("click", function () {

        if (!product) {
            return;
        }


        let wishlist =
            JSON.parse(localStorage.getItem("alLuxeWishlist")) || [];


        const alreadySaved =
            wishlist.some(item => item.id === productId);


        if (alreadySaved) {

            alert(`${product.name} is already in your wishlist.`);

            return;

        }


        wishlist.push({

            id: productId,

            name: product.name,

            price: product.price,

            image: product.image

        });


        localStorage.setItem(
            "alLuxeWishlist",
            JSON.stringify(wishlist)
        );


        alert(`${product.name} has been added to your wishlist.`);

    });

}
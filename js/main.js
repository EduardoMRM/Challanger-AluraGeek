import { servicesProducts } from "./server.js";

const product = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createElement(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("produtos__exibicao__container")

    card.innerHTML = `
        <img class="img__produto" src="${image}" alt="${name}">
        <div class="card_produto">
            <p>${name}</p>
            <div class="value__produto">
                <p>$ ${price}</p>
                <button data-id=${id} class="delete-button">
                    <img src="./assets/lixeira.png" alt="Apagar">
                </button>
            </div>
        </div>
    `

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        const id = deleteButton.getAttribute("data-id");
        card.remove();
        servicesProducts.deleteProduct(id);
    });

    product.appendChild(card);
    return card;
};

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();
        listProduct.forEach(e => {
            product.appendChild(
                createElement(
                    e.name,
                    e.price,
                    e.image,
                    e.id
                )
            );
        });
    } catch (error) {
        console.log(error)
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts
        .createProduct(name, price, image)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
});

render();

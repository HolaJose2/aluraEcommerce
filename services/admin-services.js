// const URL = "http://localhost:3000/products"
const URL = "https://64b74407df0839c97e167966.mockapi.io/products"

async function listProducts() {
    const consulta = await fetch(URL);
    const data = await consulta.json();

    return data;
}

async function createProduct({ image, category, name, price, description }) {
    const consulta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: uuid.v4(),
            image,
            category,
            name,
            price,
            description,
        }),
    });

    return consulta;
}

async function deleteProduct(id) {
    const consulta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    });
    return consulta;
}

async function detailsProduct(id) {
    const consulta = await fetch(`${URL}/${id}`);
    return consulta.json();
}

async function updateProduct({
    id,
    image,
    category,
    name,
    price,
    description,
}) {
    const consulta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, category, name, price, description }),
    });
    return consulta;
}

export const Services = {
    listProducts,
    createProduct,
    deleteProduct,
    detailsProduct,
    updateProduct,
};

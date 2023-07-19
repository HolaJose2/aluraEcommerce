async function listProducts() {
    const consulta = await fetch("http://localhost:3000/products");
    const data = await consulta.json();

    return data;
}

async function createProduct({ image, category, name, price, description }) {
    const consulta = await fetch("http://localhost:3000/products", {
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
    const consulta = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });
    return consulta;
}

async function detailsProduct(id) {
    const consulta = await fetch(`http://localhost:3000/products/${id}`);
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
    const consulta = await fetch(`http://localhost:3000/products/${id}`, {
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

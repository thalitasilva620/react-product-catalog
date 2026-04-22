interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const ProductCard = ({ product }: { product: Product }) => {

    return (

        <div className="card">
            <img src={product.image} alt={product.title} width={100} className="card-image" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p> R${product.price}</p>
        </div>

    )
}
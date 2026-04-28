import { useEffect, useState } from "react"

interface Product {
    id: number
    title: string
    price: number
    description: string
    image: string
    category: string
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const filteredProducts = products
    .filter(product => 
       product.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter(product =>
        category === "all" ? true : product.category === category
    );

    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const categories = ["all", ...new Set(products.map(p => p.category))];

    useEffect(() => {
        setCurrentPage(1);
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                await new Promise(resolve => setTimeout(resolve, 2000));
                
                setProducts(data);
            } catch (error) {
                console.log("error fetching products:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchProducts();
    }, [query, category]);

    return { products: paginatedProducts, loading, category, setCategory, categories, search, setSearch, query, setQuery, selectedProduct, setSelectedProduct, currentPage, setCurrentPage, totalPages };

}
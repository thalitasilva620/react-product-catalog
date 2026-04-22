import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const Products = () => {

    const { products, loading, search, setSearch, category, setCategory, categories } = useProducts();

    if (loading) {
        return <p>Carregando produtos...</p>
    }else{
        products.length === 0 && <p>Nenhum produto encontrado.</p>
    }

    return (
        <>
            <div>
                <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((category: string) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <button onClick={() => {
                    setSearch("");
                    setCategory("all");
                }}>
                    Limpar Filtros
                </button>
            </div>

            <div>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>


        </>
    )
}
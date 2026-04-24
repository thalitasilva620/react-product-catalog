import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const Products = () => {

    const { products, loading, search, setSearch, category, setCategory, categories } = useProducts();

    if (loading) {
        return <p>Carregando produtos...</p>
    } else {
        products.length === 0 && <p>Nenhum produto encontrado.</p>
    }

    return (
        <>
            <div className="max-w-7xl mx-auto py-5 px-4">
                <div className="min-h-screen bg-gradient-to-br rounded-sm from-gray-100 to-gray-200 ">
                    <div className="m-5 ">
                        <h1 className="text-4xl font-extrabold p-3 text-gray-800">Catálogo de produtos</h1>
                        <p className="text-gray-500 m-3">Explore produtos incríveis com filtros dinâmicos</p>

                        <div className="bg-white p-4 rounded-xl shadow-md flex flex-colmd:flex-row gap-4 mb-10">
                            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
                                {categories.map((category: string) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <button onClick={() => {
                                setSearch("");
                                setCategory("all");
                            }} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                Limpar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>


                    </div>
                </div>






            </div>
        </>
    )
}
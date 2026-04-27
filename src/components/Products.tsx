import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "./Skeleton";

export const Products = () => {

    const { products, loading, search, setSearch, query, setQuery, category, setCategory, categories, selectedProduct, setSelectedProduct } = useProducts();

    if (loading) {
        return (
            <div>{Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
            ))}</div>
        )
    }
    
    return (
        <>
            <div className="max-w-7xl mx-auto py-5 px-4">
                <div className="min-h-screen bg-linear-to-br rounded-sm from-gray-100 to-gray-200 ">
                    <div className="m-5 ">
                        <h1 className="text-4xl font-extrabold p-3 text-gray-800">Catálogo de produtos</h1>
                        <p className="text-gray-500 m-3">Explore produtos incríveis com filtros dinâmicos</p>

                        <div className="bg-white p-4 rounded-xl shadow-md flex flex-colmd:flex-row gap-4 mb-10">
                            <input
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Search products..."
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setQuery(search);
                                    }
                                }}
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition" />

                            <button onClick={() => setQuery(search)} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                Buscar
                            </button>

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
                                <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {products.length === 0 && (
                <p className="text-center text-gray-500">
                Nenhum produto encontrado.
                </p>
            )}

            {
                selectedProduct && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                        <div className="bg-white rounded-xl p-6 max-w-md w-full relative">

                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-2 right-2"
                            >
                                ✕
                            </button>

                            <img
                                src={selectedProduct.image}
                                className="w-full h-40 object-contain"
                            />

                            <h2 className="font-bold mt-4">
                                {selectedProduct.title}
                            </h2>

                            <p className="mt-2 text-gray-600">
                                {selectedProduct.description}
                            </p>

                            <p className="mt-4 font-bold">
                                R${selectedProduct.price}
                            </p>

                        </div>
                    </div>
                )
            };
        </>
    )
}
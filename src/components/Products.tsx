import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "./Skeleton";
import { useState } from "react";

export const Products = () => {

    const { products, loading, search, setSearch, setQuery, category, setCategory, categories, selectedProduct, setSelectedProduct } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">{Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
            ))}</div>
        )
    }

    return (
        <>
            <div className="max-w-7xl mx-auto py-5 px-4">
                <div className="gridmin-h-screen bg-linear-to-br rounded-sm from-gray-100 to-gray-200 animated-fadeIn">
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

            <div className="flex items-center justify-center gap-4 mt-10">
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    {"<<"}
                </button>

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded font-medium transition ${currentPage === page 
                            ? "bg-black text-white" 
                            : "bg-white border hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                   {">>"}
                </button>

                {totalPages > 1 && (
                    <div className="flex justify-center ...">
                        ...
                    </div>
                )}
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
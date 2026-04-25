interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const ProductCard = ({ product, onSelect }) => {

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col">
      <img src={product.image} alt={product.title} width={100} className="w-full h-40 object-contain mb-4 transition duration-300 group-hover:scale-105" />
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>

      <div className="mt-auto items-center justify-between p-4">
        <span className="text-lg font-bold text-gray-900"> R${product.price.toFixed(2)}</span>
      </div>

      <button onClick={() => onSelect(product)} className="bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">Ver</button>
    </div>
  )
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const categoryStyles: Record<string, string> = {
  "men's clothing": "bg-blue-100 text-blue-700",
  "women's clothing": "bg-pink-100 text-pink-700",
  "jewelery": "bg-yellow-100 text-yellow-700",
  "eletronics": "bg-green-100 text-green-700",
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}
  
export const ProductCard = ({ product, onSelect }: ProductCardProps) => {

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col">

        <span className={`text-xs font-medium px-3 py-1 rounded-full w-fit mb-2 transition hover:opacity-80 ${categoryStyles[product.category] || "bg-gray-200 text-gray-700"}`}
        >
          {product.category
            .replace("'", "")
            .replace(/\b\w/g, l => l.toUpperCase())
          }
          </span>

        <img src={product.image} alt={product.title} width={100} className="w-full h-40 object-contain mb-4 transition-transform duration-300 group-hover:scale-105" />
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>

        <div className="mt-auto items-center justify-between p-4">
          <span className="text-lg font-bold text-gray-900"> R${product.price.toFixed(2)}</span>
        </div>

        <button onClick={() => onSelect(product)} className="bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 hover:scale-105 active:scale-95 cursor-pointer transition">Ver</button>
      </div>
    </>
  )
}

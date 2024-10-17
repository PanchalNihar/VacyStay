import Image from 'next/image';

interface CategoriesProps {
    selectedCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    selectedCategory,
    setCategory
}) => {
    const categories = [
        { name: "Beach", key: "beach", icon: "/beach.png" },
        { name: "Golfing", key: "golfing", icon: "/golf.png" },
        { name: "Cabins", key: "cabins", icon: "/cabin.png" },
        { name: "Farm", key: "farm", icon: "/farm.png" },
        { name: "Lake", key: "lakeView", icon: "/lake.png" },
        { name: "Pool", key: "pool", icon: "/pool.png" },
        { name: "Houseboat", key: "houseboat", icon: "/houseboat.png" },
        { name: "Barn", key: "barn", icon: "/barn.png" },
        { name: "Island", key: "island", icon: "/island.png" },
        { name: "Desert", key: "desert", icon: "/desert.png" },
        { name: "Cave", key: "cave", icon: "/cave.png" },
        { name: "Tropical", key: "tropical", icon: "/tropical.png" },
    ];

    return (
        <div className="pt-4 pb-6 flex flex-wrap justify-center gap-4">
            {categories.map(({ name, key, icon }) => (
                <div 
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`p-4 flex flex-col items-center space-y-2 rounded-lg shadow-lg 
                        ${selectedCategory === key ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-white text-gray-700'} 
                        transform hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-xl`}
                >
                    <Image
                        src={icon}
                        alt={`Category - ${name}`}
                        width={40}
                        height={40}
                        className={`${selectedCategory === key ? 'opacity-100' : 'opacity-80'}`}
                    />
                    <span className='text-sm font-medium'>{name}</span>
                </div>
            ))}
        </div>
    );
}

export default Categories;

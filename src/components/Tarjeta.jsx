export function Tarjeta({item}){
    
    const formatearPoder = (poder) => {
        if (!poder) return 'Desconocido';
        const numero = poder.toString().replace(/[^\d]/g, '');
        return parseInt(numero).toLocaleString();
    };

    return (
        <div className="group relative bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors w-64 h-96">
            
            
            <div className="p-3 text-center bg-gray-700">
                <h3 className="text-lg font-semibold text-white">
                    {item?.name}
                </h3>
            </div>

            
            <div className="relative h-64 bg-gray-600 flex items-center justify-center">
                <img 
                    className="w-full h-full object-contain" 
                    src={item?.image}
                    alt={item?.name}
                    onError={(e) => {
                        e.target.src = '/placeholder-character.png';
                    }}
                />
                
                
                <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">
                    {formatearPoder(item?.ki)}
                </div>

                
                <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <div className="text-center text-white">
                        <p className="text-sm leading-relaxed">
                            {item?.description || 'Uno de los guerreros más poderosos del universo Dragon Ball. Conocido por sus increíbles habilidades de combate y su determinación inquebrantable.'}
                        </p>
                    </div>
                </div>
            </div>

            
            <div className="p-3 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Raza:</span>
                    <span className="text-white text-sm">
                        {item?.race || item?.species || 'Desconocido'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Poder:</span>
                    <span className="text-orange-400 text-sm font-medium">
                        {formatearPoder(item?.ki)}
                    </span>
                </div>
            </div>
        </div>
    );
}
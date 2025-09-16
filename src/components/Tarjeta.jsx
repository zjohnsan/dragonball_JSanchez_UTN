export function Tarjeta({item}){
    
    const formatearPoder = (poder) => {
        if (!poder) return 'Desconocido';
        const numero = poder.toString().replace(/[^\d]/g, '');
        return parseInt(numero).toLocaleString();
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors w-64 h-96">
            
            {/* Nombre */}
            <div className="p-3 text-center bg-gray-700">
                <h3 className="text-lg font-semibold text-white">
                    {item?.name}
                </h3>
            </div>

            {/* Imagen */}
            <div className="relative h-64 bg-gray-600 flex items-center justify-center">
                <img 
                    className="w-full h-full object-contain" 
                    src={item?.image}
                    alt={item?.name}
                    onError={(e) => {
                        e.target.src = '/placeholder-character.png';
                    }}
                />
                
                {/* Poder en esquina */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">
                    {formatearPoder(item?.ki)}
                </div>
            </div>

            {/* Info */}
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
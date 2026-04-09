import axios from 'axios';

window.obtainFeaturedCarreras = function () {
    const grid = document.getElementById('grid-featured-races');
    if (!grid) return;

    axios.get('http://localhost:8080/carreras')
        .then((response) => {
            const todasLasCarreras = response.data; // Cogemos el array completo
            
            grid.innerHTML = ''; // Limpiamos las cards estáticas del HTML

            todasLasCarreras.forEach((carrera, index) => {
                // Formateamos el número (01, 02, 03, 04...)
                const displayNumber = (index + 1).toString().padStart(2, '0');
                
                // Lógica para alternar colores: las pares azul (primary), las impares naranja (secondary)
                const isEven = index % 2 === 0;
                const hoverColor = isEven ? 'hover:border-primary/50' : 'hover:border-secondary/50';
                const textColor = isEven ? 'group-hover:text-primary' : 'group-hover:text-secondary';
                const bgText = isEven ? 'group-hover:text-primary/10' : 'group-hover:text-secondary/10';

                grid.innerHTML += `
                <div class="flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-lg p-8 group ${hoverColor} transition-all min-h-[300px] justify-between">
                    <div class="flex flex-col gap-6">
                        <div class="flex justify-between items-center">
                            <span class="bg-secondary-container/20 text-secondary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                                ${carrera.distance} KM
                            </span>
                            <span class="text-white/10 font-headline font-black text-4xl ${bgText} transition-colors">
                                ${displayNumber}
                            </span>
                        </div>
                        <h3 class="text-white text-3xl font-headline font-black leading-tight uppercase ${textColor} transition-colors">
                            ${carrera.name}
                        </h3>
                    </div>
                    <div class="flex flex-col gap-4 border-t border-outline-variant/30 pt-6 mt-6">
                        <div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                            <span class="material-symbols-outlined text-secondary text-base">calendar_today</span>
                            ${carrera.date}
                        </div>
                        <div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                            <span class="material-symbols-outlined text-secondary text-base">location_on</span>
                            ${carrera.location || 'España'}
                        </div>
                    </div>
                </div>`;
            });
        })
        .catch(err => {
            console.error("Error al obtener carreras:", err);
        });
};

document.addEventListener('DOMContentLoaded', window.obtainFeaturedCarreras);
window.obtainCarreras = function () {
    axios.get('http://localhost:8080/carreras')
        .then((response) => {
            const carrerasList = response.data;
            const grid = document.querySelector('.grid');
            
            // Limpiamos el grid antes de empezar
            grid.innerHTML = '';

            //Creamos una tarjeta diferente con cada elemento de la lista y sus atributos
            carrerasList.forEach(carrera => {
                grid.innerHTML += 
                    '<div class="flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-lg p-8 group hover:border-secondary/50 transition-all min-h-[300px] justify-between">' +
                        '<div class="flex flex-col gap-6">' +
                            '<div class="flex justify-between items-center">' +
                                '<span class="bg-secondary-container/20 text-secondary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">' + (carrera.distance || '??') + ' KM</span>' +
                                '<span class="text-white/10 font-headline font-black text-4xl group-hover:text-secondary/10 transition-colors">'+carrera.id+'</span>' +
                            '</div>' +
                            '<h3 class="text-white text-3xl font-headline font-black leading-tight uppercase group-hover:text-secondary transition-colors">' +
                                carrera.name +
                            '</h3>' +
                        '</div>' +
                        '<div class="flex flex-col gap-4 border-t border-outline-variant/30 pt-6 mt-6">' +
                            '<div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">' +
                                '<span class="material-symbols-outlined text-secondary text-base">calendar_today</span>' +
                                carrera.date +
                            '</div>' +
                            '<div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">' +
                                '<span class="material-symbols-outlined text-secondary text-base">location_on</span>' +
                                (carrera.location || 'Ubicación no disponible') +
                            '</div>' +
                        '</div>' +
                    '</div>';
            });
        })
        .catch(err => {
            console.error("Error al cargar datos:", err);
        });
};

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', window.obtainCarreras);
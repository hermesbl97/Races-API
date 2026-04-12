import axios from 'axios';
import { notifySuccess } from './util.js';

window.obtainAtletas = function () {
    axios.get('http://localhost:8080/atletas')
        .then((response) => {
            const atletasList = response.data;
            const grid = document.getElementById('atletas-container');

            // Limpiamos el grid antes de empezar
            grid.innerHTML = '';

            // Creamos una tarjeta diferente con cada elemento de la lista y sus atributos
            atletasList.forEach((atleta) => {
                const photoUrl = `http://localhost:8080/uploads/${atleta.photo}`;

                grid.innerHTML +=
                    `<div id="atleta-${atleta.id}" class="flex flex-col bg-surface-container-low rounded-lg overflow-hidden group hover:translate-y-[-4px] transition-all">
                        <div class="w-full aspect-[16/10] bg-center bg-no-repeat bg-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                             style="background-image: url('${photoUrl}');">
                        </div>

                        <div class="p-6 flex flex-col gap-4">
                            <div class="flex justify-between items-start">
                                <h3 class="text-white text-xl font-headline font-bold leading-tight">${atleta.name} ${atleta.surname}</h3>
                                <span class="bg-secondary-container/20 text-secondary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">${atleta.age || '??'} años</span>
                            </div>

                            <div class="flex justify-between items-end border-t border-outline-variant/30 pt-4 mt-2">
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-2 text-on-surface-variant text-[12px]">
                                        <span class="material-symbols-outlined text-xs text-secondary/70">badge</span> ${atleta.dni || 'N/A'}
                                    </div>
                                    <div class="flex items-center gap-2 text-on-surface-variant text-[12px]">
                                        <span class="material-symbols-outlined text-xs text-secondary/70">call</span> ${atleta.telephone || '---'}
                                    </div>
                                    <div class="flex items-center gap-2 text-on-surface-variant text-[12px]">
                                        <span class="material-symbols-outlined text-xs text-secondary/70">location_on</span> ${atleta.city || '---'}
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <a href="atletas-editar.html?id=${atleta.id}" class="text-on-surface-variant hover:text-primary transition-colors p-1 flex items-center justify-center" title="Editar">
                                        <span class="material-symbols-outlined text-xl">edit_square</span>
                                    </a>
                                    <button onclick="removeAtleta(${atleta.id})" class="text-on-surface-variant hover:text-error transition-colors p-1 flex items-center justify-center" title="Eliminar">
                                        <span class="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
        })
        .catch(err => {
            console.error("Error al cargar datos:", err);
        });
};

window.removeAtleta = function (Id) {
    if (confirm('¿Estás seguro de que quieres eliminar este atleta?')) {
        axios.delete('http://localhost:8080/atletas/' + Id)
            .then((response) => {
                // Si el backend responde correctamente
                const element = document.getElementById('atleta-' + Id);
                if (element) {
                    element.remove();
                    notifySuccess('Atleta eliminado correctamente')
                }
            })
            .catch(err => console.error("No se pudo eliminar:", err));
    }
};

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', window.obtainAtletas);
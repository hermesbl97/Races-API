import axios from 'axios';

window.loadCarreras = function () {
  axios
    .get("http://localhost:8080/carreras")
    .then((response) => {
        const carrerasList = response.data;
        const selectCarrera = document.getElementById('select-carrera');

        //Se borra y coloca la opción por defecto
        selectCarrera.innerHTML = '<option value="">Seleccione una opción</option>';

        // Se rellenan las opciones con las carreras disponibles
        carrerasList.forEach((carrera) => {
            selectCarrera.innerHTML += `<option value="${carrera.id}">${carrera.name}</option>`;
        });
    }).catch(err => console.error("Error al cargar carreras:", err));
};

window.loadAtletas = function () {
  axios
    .get("http://localhost:8080/atletas")
    .then((response) => {
        const atletasList = response.data;
        const selectAtleta = document.getElementById('select-atleta');

        //Se borra y coloca la opción por defecto
        selectAtleta.innerHTML = '<option value="">Seleccione una opción</option>';

                // Se rellenan las opciones con los atletas disponibles
        atletasList.forEach((atleta) => {
            selectAtleta.innerHTML += `<option value="${atleta.id}">${atleta.name} ${atleta.surname}</option>`;
        });
    }).catch(err => console.error("Error al cargar atletas:", err));
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadCarreras();
    window.loadAtletas();
});
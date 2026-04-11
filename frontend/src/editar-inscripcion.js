import axios from 'axios';
import { notifyError, notifySuccess } from './util.js';

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


window.loadInscripcion = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const inscripcionId = queryParams.get('id');

    if (inscripcionId) {
        axios.get('http://localhost:8080/inscripciones/' + inscripcionId)
            .then(response => {
                const inscripcion = response.data;

                //pintar los datos en el html
                document.getElementById('date').value = inscripcion.date;
                document.getElementById('state').value = inscripcion.state;
                document.getElementById('price').value = inscripcion.price;
            })
            .catch(err => console.error("Error al cargar la inscripcion", err));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadCarreras();
    window.loadAtletas();
    window.loadInscripcion();
});

// 4. Función de actualización corregida
window.updateInscripcion = function () {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const state = document.getElementById('state').value;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;
    const atletaId = document.getElementById('select-atleta').value;
    const carreraId = document.getElementById('select-carrera').value;

    const updateData = { state, price, date, atletaId, carreraId };

    if (state != "Aceptada" && state != "Cancelada") {
        notifyError('El estado de la inscripción unicamente puede ser Aceptada o Cancelada');
        return;
    } else if (price <= 0) {
        notifyError('El precio no puede ser 0 o inferior');
        return;
    } else if (carreraId == '') {
        notifyError('Debe seleccionar una carrera');
        return;
    } else if (atletaId == '') {
        notifyError('Debe seleccionar un atleta');
        return;
    } else 

    if (confirm('¿Estás seguro de que quieres modificar esta inscripción?')) {
        axios.put('http://localhost:8080/inscripciones/' + id, updateData)
            .then(response => {
                notifySuccess('Se ha modificado la inscripción correctamente')
            })
            .catch(err => console.error("Error al actualizar:", err));
    }
};

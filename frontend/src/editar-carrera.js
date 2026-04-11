import axios from 'axios';
import { notifyError, notifySuccess } from './util.js';

//función para obtener el Id de la URL y pintar los datos 
window.loadCarrera = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const carreraId = queryParams.get('id');

    if (carreraId) {
        axios.get('http://localhost:8080/carreras/' + carreraId)
            .then(response => {
                const carrera = response.data;

                //pintar los datos en el html
                document.getElementById('name').value = carrera.name;
                document.getElementById('distance').value = carrera.distance;
                document.getElementById('location').value = carrera.location;
                document.getElementById('date').value = carrera.date;
            })
            .catch(err => console.error("Error al cargar la carrera", err));
    }
};

window.updateCarrera = function () {

    const queryParams = new URLSearchParams(window.location.search);
    const carreraId = queryParams.get('id');

    const name = document.getElementById('name').value;
    const distance = document.getElementById('distance').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    if (name == '') {
        notifyError('El nombre es un campo obligatorio');
        return;
    }  
    if (date == '') {
        notifyError('La fecha es un campo obligatorio');
        return;
    }

    if (confirm('¿Estás seguro de que quieres modificar esta carrera?')) {
        axios.put('http://localhost:8080/carreras/' + carreraId, {
            name: name,
            distance: distance,
            location: location,
            date: date
        }).then(() => { //Después de modificar los datos, te redirige a la lista de carreras
            notifySuccess('Se ha modificado la carrera correctamente');
        })
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadCarrera();
});
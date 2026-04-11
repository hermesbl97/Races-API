import axios from 'axios';
import { notifyError, notifySuccess } from './util.js';

//función para obtener el Id de la URL y pintar los datos 
window.loadAtleta = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const atletaId = queryParams.get('id');

    if (atletaId) {
        axios.get('http://localhost:8080/atletas/' + atletaId)
            .then(response => {
                const atleta = response.data;

                //pintar los datos en el html
                document.getElementById('name').value = atleta.name;
                document.getElementById('surname').value = atleta.surname;
                document.getElementById('age').value = atleta.age;
                document.getElementById('dni').value = atleta.dni;
                document.getElementById('telephone').value = atleta.telephone;
                document.getElementById('city').value = atleta.city;
            })
            .catch(err => console.error("Error al cargar el atleta", err));
    }
};

window.updateAtleta = function () {

    const queryParams = new URLSearchParams(window.location.search);
    const atletaId = queryParams.get('id');

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const dni = document.getElementById('dni').value;
    const telephone = document.getElementById('telephone').value;
    const city = document.getElementById('city').value;

    if (name == '') {
        notifyError('El nombre es un campo obligatorio');
        return;
    } else if (surname == '') {
        notifyError('El apellido es un campo obligatorio');
        return;
    } else if (dni == '') {
        notifyError('el dni es un campo obligatorio');
        return;
    }

    if (confirm('¿Estás seguro de querer modificar este atleta?')) {
        axios.put('http://localhost:8080/atletas/' + atletaId, {
            name: name,
            surname: surname,
            age: age,
            dni: dni,
            telephone: telephone,
            city: city,
        }).then(response => { //Después de modificar los datos, te redirige a la lista de atletas
            window.location.href = "atletas.html";
        });
    };
};

window.onload = loadAtleta;
import axios from 'axios';
import { notifyError, notifySuccess } from './util.js';

window.addAtleta = function () {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const dni = document.getElementById('dni').value;
    const telephone = document.getElementById('telephone').value;
    const city = document.getElementById('city').value;

    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

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

    //Se usa formData para empaquetar los textos e imagen
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('age', age);
    formData.append('dni', dni);
    formData.append('telephone', telephone);
    formData.append('city', city);

    if (photoFile) {
        formData.append('photo', photoFile);
    }

    axios.post('http://localhost:8080/atletas', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        notifySuccess('Atleta registrado');
    }).catch(err => {
        notifyError('Error al conectar con el servidor');
        console.error(err);
    });
};
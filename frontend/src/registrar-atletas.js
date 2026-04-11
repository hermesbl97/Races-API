import axios from 'axios';
import { notifyError } from './util.js';

window.addAtleta = function () {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const dni = document.getElementById('dni').value;
    const telephone = document.getElementById('telephone').value;
    const city = document.getElementById('city').value;

    if(name == '') {
        notifyError('El nombre es un campo obligatorio');
        return;
    } else if(surname == '') {
        notifyError('El apellido es un campo obligatorio');
        return;
    } else if(dni == '') {
        notifyError('el dni es un campo obligatorio');
        return;
    }
    

    axios.post('http://localhost:8080/atletas', {
        name: name,
        surname: surname,
        age: age,
        dni: dni,
        telephone: telephone,
        city: city,
    }).then(() => {
        notifySuccess('Atleta registrado');
    })
};
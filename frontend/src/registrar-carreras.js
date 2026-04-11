import axios from 'axios';
import {notifyError, notifySuccess} from './util.js';

window.addCarrera = function () {
    const name = document.getElementById('name').value;
    const distance = document.getElementById('distance').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    if(name == '') {
        notifyError('El nombre es un campo obligatorio');
        return;
    } else if(date == '') {
        notifyError('La fecha es un campo obligatorio');
        return;
    }

    axios.post('http://localhost:8080/carreras', {
        name: name,
        distance: distance,
        location: location,
        date: date,
    }).then(() => {
        notifySuccess('Carrera registrada');
    })
};

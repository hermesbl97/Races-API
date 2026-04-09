import axios from 'axios';

window.addCarrera = function () {
    const name = document.getElementById('name').value;
    const distance = document.getElementById('distance').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    axios.post('http://localhost:8080/carreras', {
        name: name,
        distance: distance,
        location: location,
        date: date,
    });

};
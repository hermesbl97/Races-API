import axios from 'axios';

window.addAtleta = function () {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const dni = document.getElementById('dni').value;
    const telephone = document.getElementById('telephone').value;
    const city = document.getElementById('city').value;

    axios.post('http://localhost:8080/atletas', {
        name: name,
        surname: surname,
        age: age,
        dni: dni,
        telephone: telephone,
        city: city,
    });

};
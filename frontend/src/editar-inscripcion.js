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


window.loadInscripcion = function() {
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
window.updateInscripcion = function() {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    const updateData = {
        state: document.getElementById('state').value,
        price: document.getElementById('price').value,
        date: document.getElementById('date').value,
        atletaId: document.getElementById('select-atleta').value,
        carreraId: document.getElementById('select-carrera').value
    };

    if (confirm('¿Estás seguro de que quieres modificar esta inscripción?')) {
        axios.put('http://localhost:8080/inscripciones/' + id, updateData)
            .then(() => {
                window.location.href = "inscripciones.html";
            })
            .catch(err => console.error("Error al actualizar:", err));
    }
};

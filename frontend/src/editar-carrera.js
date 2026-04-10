//función para obtener el Id de la URL y pintar los datos 
window.loadCarrera = function() {
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

window.onload = loadCarrera;
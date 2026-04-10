//función para obtener el Id de la URL y pintar los datos 
window.loadAtleta = function() {
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

window.onload = laodAtleta;
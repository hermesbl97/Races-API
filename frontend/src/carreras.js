window.obtainCarreras = function () {
  axios
    .get("http://localhost:8080/carreras")
    .then((response) => {
      const carrerasList = response.data;
      const grid = document.querySelector(".grid");

      grid.innerHTML = "";

      carrerasList.forEach((carrera) => {
        // Añadimos un ID al div principal para poder borrarlo del DOM fácilmente
        grid.innerHTML +=
          '<div id="carrera-' +
          carrera.id +
          '" class="flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-lg p-8 group hover:border-secondary/50 transition-all min-h-[350px] justify-between">' +
          '<div class="flex flex-col gap-6">' +
          '<div class="flex justify-between items-center">' +
          '<span class="bg-secondary-container/20 text-secondary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">' +
          (carrera.distance || "??") +
          " KM</span>" +
          '<div class="flex gap-2">' +
          // Botón de editar
          '<a href="carreras-editar.html?id=' +
          carrera.id +
          '" class="text-on-surface-variant hover:text-primary transition-colors" title="Editar">' +
          '<span class="material-symbols-outlined text-xl">edit_square</span>' +
          "</a>" +
          //Botón de eliminar
          '<button onclick="removeCarrera(' +
          carrera.id +
          ')" class="text-on-surface-variant hover:text-error transition-colors">' +
          '<span class="material-symbols-outlined text-xl">delete</span>' +
          "</button>" +
          "</div>" +
          "</div>" +
          '<h3 class="text-white text-3xl font-headline font-black leading-tight uppercase group-hover:text-secondary transition-colors">' +
          carrera.name +
          "</h3>" +
          "</div>" +
          '<div class="flex flex-col gap-4">' +
          '<div class="flex flex-col gap-4 border-t border-outline-variant/30 pt-6 mt-6">' +
          '<div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">' +
          '<span class="material-symbols-outlined text-secondary text-base">calendar_today</span>' +
          carrera.date +
          "</div>" +
          '<div class="flex items-center gap-3 text-on-surface-variant text-sm font-medium">' +
          '<span class="material-symbols-outlined text-secondary text-base">location_on</span>' +
          (carrera.location || "Ubicación no disponible") +
          "</div>" +
          "</div>" +
          '<span class="text-white/5 font-headline font-black text-2xl self-end mt-2">' +
          carrera.id +
          "</span>" +
          "</div>" +
          "</div>";
      });
    })
    .catch((err) => {
      console.error("Error al cargar datos:", err);
    });
};

window.removeCarrera = function (Id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta carrera?")) {
    axios
      .delete("http://localhost:8080/carreras/" + Id)
      .then((response) => {
        // Si el backend responde correctamente
        const element = document.getElementById("carrera-" + Id);
        if (element) {
          element.remove();
        }
      })
      .catch((err) => console.error("No se pudo eliminar:", err));
  }
};

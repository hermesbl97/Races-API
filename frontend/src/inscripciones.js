window.obtainInscripciones = function () {
  axios
    .get("http://localhost:8080/inscripciones")
    .then((response) => {
      const inscripcionesList = response.data;
      console.log("Lo que llega al navegador:", inscripcionesList[0]); // <--- AÑADE ESTO
      // Seleccionamos el tbody donde irán las filas
      const tbody = document.getElementById("inscripciones-body");

      tbody.innerHTML = "";

      inscripcionesList.forEach((inscripcion) => {
        // Lógica para el color del estado
        let estadoClase = "bg-primary/10 text-primary"; // Por defecto
        let puntoClase = "bg-primary shadow-[0_0_8px_rgba(148,170,255,0.8)]";

        if (inscripcion.state === "Cancelada") {
            estadoClase = "bg-error/10 text-error";
            puntoClase = "bg-error shadow-[0_0_8px_rgba(255,110,132,0.8)]";
        }

        tbody.innerHTML += `
          <tr class="hover:bg-surface-container-highest/30 transition-colors">
            <td class="px-6 py-5">
              <div class="flex items-center gap-4">
                <div>
                  <p class="font-bold text-sm lexend uppercase tracking-tight">${inscripcion.atleta_name} ${inscripcion.atleta_surname}</p>
                  <p class="text-[10px] text-on-surface-variant">ID INSCRIPCION: #${inscripcion.id}</p>
                </div>
              </div>
            </td>
            
            <td class="px-6 py-5">
              <p class="text-sm font-semibold lexend uppercase">${inscripcion.carrera_name}</p>
            </td>

            <td class="px-6 py-5">
              <span class="px-3 py-1 ${estadoClase} text-[10px] font-black uppercase tracking-widest rounded-full">
                ${inscripcion.state}
              </span>
            </td>

            <td class="px-6 py-5">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full ${puntoClase}"></div>
                <span class="text-[10px] font-black uppercase tracking-widest">${inscripcion.price}€</span>
              </div>
            </td>

            <td class="px-6 py-5 text-[10px] font-medium text-on-surface-variant">
                ${inscripcion.date || 'No se ha podido obtener'}
            </td>

            <td class="px-6 py-5 text-right">
              <div class="flex justify-end gap-3">
                <button class="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all text-primary">Editar</button>
                <button onclick="deleteInscripcion" class="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all text-error">Eliminar</button>
              </div>
            </td>
          </tr>
        `;
      });
    })
    .catch((err) => {
      console.error("Error al cargar datos:", err);
    });
};
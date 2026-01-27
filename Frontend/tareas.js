const lista = document.getElementById("listaTareas");
const logoutBtn = document.getElementById("logout");

const token = localStorage.getItem("token");

// Si no hay token, bye
if (!token) {
    window.location.href = "index.html";
}

// Traer tareas del backend
async function cargarTareas() {
    try {
        const response = await fetch("http://localhost:3000/api/tareas", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const tareas = await response.json();

        tareas.forEach(tarea => {
            const li = document.createElement("li");
            li.textContent = tarea.nombre;
            lista.appendChild(li);
        });

    } catch (error) {
        console.error("Error al cargar tareas", error);
    }
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});

cargarTareas();

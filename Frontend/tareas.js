// ===== TOKEN =====
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

// ===== ELEMENTOS DOM =====
const lista = document.getElementById("listaTareas");
const logoutBtn = document.getElementById("logout");
const input = document.getElementById("tareaInput");
const boton = document.getElementById("agregarBtn");
const error = document.getElementById("error");

// ===== GESTOR DE TAREAS (API) =====
class GestorTareasAPI {
    constructor(token) {
        this.baseURL = "http://localhost:3000/api/tareas";
        this.token = token;
    }

    async obtener() {
        const res = await fetch(this.baseURL, {
            headers: {
                "Authorization": "Bearer " + this.token
            }
        });
        return res.json();
    }

    async agregar(nombre) {
        const res = await fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify({ nombre })
        });
        return res.json();
    }

    async editar(id, nombre) {
        const res = await fetch(`${this.baseURL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
            body: JSON.stringify({ nombre })
        });
        return res.json();
    }

    async eliminar(id) {
        await fetch(`${this.baseURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.token
            }
        });
    }
}

// ===== INSTANCIA =====
const gestor = new GestorTareasAPI(token);

// ===== RENDER =====
async function render() {
    lista.innerHTML = "";

    const tareas = await gestor.obtener();

    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.nombre + " ";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", async () => {
            const nuevo = prompt("Editar tarea:", tarea.nombre);
            if (nuevo && nuevo.trim() !== "") {
                await gestor.editar(tarea.id, nuevo.trim());
                render();
            }
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", async () => {
            await gestor.eliminar(tarea.id);
            render();
        });

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

// ===== EVENTOS =====
boton.addEventListener("click", async () => {
    const texto = input.value.trim();

    if (texto === "") {
        error.textContent = "No puedes agregar tareas vacías";
        return;
    }

    error.textContent = "";
    await gestor.agregar(texto);
    input.value = "";
    render();
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});

// ===== INIT =====
render();

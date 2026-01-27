const boton = document.getElementById("loginBtn");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", async () => {
    const email = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        mensaje.style.color = "red";
        mensaje.textContent = "Completa todos los campos";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            mensaje.style.color = "green";
            mensaje.textContent = "Login exitoso 🎉";

            // Redirigir a la página principal
            setTimeout(() => {
                window.location.href = "tareas.html";
            }, 1000);

        } else {
            mensaje.style.color = "red";
            mensaje.textContent = data.mensaje || "Credenciales incorrectas";
        }

    } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error al conectar con el servidor 😭";
    }
});

document.getElementById("form-opinion").addEventListener("submit", function (event) {
  event.preventDefault();

  // Deshabilitar botón y mostrar estado de carga
  const button = event.target.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Enviando...';
  button.classList.add('loading');
  button.disabled = true;

  // Recopilar datos del formulario
  const data = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    programa: document.getElementById("programa").value,
    proyecto: document.getElementById("proyecto").value,
    calificacion: document.getElementById("calificacion-lista").value,
    comentario: document.getElementById("comentario").value
  };

  // Enviar datos a Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycbwY1mSnvxLBJTV7G3Ivd9yUX-jONGkSJ8RxnAIu71VdMw3eA-EYLOrFWrYOy3_hdK6R/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Mensaje de éxito
    alert("✅ ¡Tu opinión se ha registrado correctamente!");
    
    // Limpiar formulario
    document.getElementById("form-opinion").reset();
  })
  .catch((error) => {
    // Mensaje de error
    alert("❌ Ocurrió un error al enviar la opinión. Por favor, intenta nuevamente.");
    console.error("Error:", error);
  })
  .finally(() => {
    // Restaurar botón a su estado original
    button.textContent = originalText;
    button.classList.remove('loading');
    button.disabled = false;
  });
});
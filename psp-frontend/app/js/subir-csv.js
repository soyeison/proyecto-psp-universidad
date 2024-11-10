const BASE_URL = "http://localhost:3000";

function procesarCsv() {
  const file = document.getElementById("archivoXlsx").files[0];

  console.log("File", file);

  if (!file) {
    alert("Por favor seleccione un archivo excel.");
    return;
  } else if (!file.type.split(".").includes("spreadsheetml")) {
    alert("Por favor introduzca un archivo con extension .csv valido.");
    return;
  }

  // funcionalidad para disparar el endpoint
  const formToSend = new FormData();
  formToSend.append("excelFile", file);

  fetch(BASE_URL + "/files/upload-excel", {
    method: "POST",
    body: formToSend,
  })
    .then((response) => response.text())
    .then((response) => console.log("Response from server", response))
    .catch((error) => {
      console.error("Error: ", error);
      alert("Hubo un error al subir el archivo al servidor.");
    });
}

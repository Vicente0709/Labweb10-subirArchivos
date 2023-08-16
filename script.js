const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const preview = document.getElementById("preview");
const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

fileInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    fileInfo.innerHTML = "No se ha seleccionado ningún archivo.";
    preview.style.display = "none";
    return;
  }

  if (!isValidFileType(selectedFile)) {
    fileInfo.innerHTML = "Tipo de archivo no admitido. Por favor, seleccione una imagen PNG o JPEG.";
    preview.style.display = "none";
    return;
  }

  if (selectedFile.size > maxSize) {
    fileInfo.innerHTML = "El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.";
    preview.style.display = "none";
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${formatFileSize(selectedFile.size)}
  `;

  preview.style.display = "block";
  const reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;
  };

  reader.readAsDataURL(selectedFile);
});

function isValidFileType(file) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  return allowedTypes.includes(file.type);
}

function formatFileSize(size) {
  const units = ["bytes", "KB", "MB", "GB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const blockError = document.querySelector(".form__custom-file-error");
  const labelComment = document.querySelector(".form_add");
  const inputComment = document.querySelector(".form__input-comment");

  if (document.querySelector("#fileInput")) {
    const fileInput = document.querySelector("#fileInput");
    const fileButton = document.querySelector(
      ".form__custom-file-input-button"
    );

    fileButton.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      const maxSize = 5 * 1024 * 1024; // 5 МБ в байтах
      const allowedExtensions = ["jpg", "jpeg", "png"]; // Разрешенные расширения

      const validFiles = Array.from(fileInput.files).filter((file) => {
        const fileExtension = getFileExtension(file.name).toLowerCase();

        if (file.size > maxSize) {

          blockError.style.display = "block";
          labelComment.classList.add('error');
          inputComment.classList.add("error-placeholder");

          setTimeout(() => {
            blockError.style.display = "none";
            labelComment.classList.remove("error");
            inputComment.classList.remove("error-placeholder");
          }, 3000);

          return false;

        } else if (!allowedExtensions.includes(fileExtension)) {
          
          return false;
        }

        return true;
      });

      if (validFiles.length === 0) {
        fileButton.textContent = "Прикрепить файл";
      } else if (validFiles.length === 1) {
        fileButton.textContent = validFiles[0].name;
      } else {
        fileButton.textContent = `${validFiles.length} файлов`;
      }

      // Создаем новый объект FileList для установки выбранных файлов
      const newFileList = new DataTransfer();
      validFiles.forEach((file) => {
        newFileList.items.add(file);
      });

      fileInput.files = newFileList.files;
    });
  }
});

function getFileExtension(filename) {
  return filename.split(".").pop();
}

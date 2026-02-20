document.addEventListener("DOMContentLoaded", function () {

    const fileInputs = document.querySelectorAll("input[type='file']");

    fileInputs.forEach(input => {

        input.addEventListener("change", function () {

            if (!this.files.length) return;

            const formData = new FormData();
            formData.append(this.name, this.files[0]);

            fetch("/validate-file", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                const fileNameSpan = this.closest("form").querySelector(".file-name");

                if (!fileNameSpan) return;

                if (data.status === "success") {
                    fileNameSpan.textContent = "Archivo válido: " + data.filename;
                    fileNameSpan.style.color = "green";
                } else {
                    fileNameSpan.textContent = data.message;
                    fileNameSpan.style.color = "red";
                }

            })
            .catch(() => {
                const fileNameSpan = this.closest("form").querySelector(".file-name");
                if (fileNameSpan) {
                    fileNameSpan.textContent = "Entradas no correctas";
                    fileNameSpan.style.color = "red";
                }
            });

        });

    });

});

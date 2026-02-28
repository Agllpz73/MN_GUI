// función para agregar funcionalidad al botón de calcular, se llama desde el HTML
// Version 2 

function insertAllCursor(input, text) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const before = input.value.substring(0, start);
    const after = input.value.substring(end);
    input.value = before + text + after;


    if(text.endsWith("()")){
        const newPos = start + text.length - 1;
        input.setSelectionRange(newPos, newPos);
    } else {
        const newPos = start + text.length;
        input.setSelectionRange(newPos, newPos);
    }

    input.focus();
}


// EVENTOS

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-insert]").forEach(btn => {
        btn.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Evita que el botón tome el foco
            const input = document.activeElement;
            if(!input|| input.tagName !== "INPUT" && input.tagName !== "TEXTAREA")  return;
            insertAllCursor(input, btn.getAttribute("data-insert"));
        });
    });
    
    document.querySelector(".back")?.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Evita que el botón tome el foco
        const input = document.activeElement;
        if(!input || (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA")) return;

        const start = input.selectionStart;
        const end = input.selectionEnd;

        if(start === end && start > 0){
            input.value = input.value.substring(0, start - 1) + input.value.substring(end);
            input.setSelectionRange(start - 1, start - 1);
        }
        input.focus();
    });


    document.querySelector(".clear")?.addEventListener("mousedown", (e) => {
        e.preventDefault();

        const input = document.activeElement;
        if(!input || (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA")) return;

        input.value = "";
        input.focus();
    }   );

    
});
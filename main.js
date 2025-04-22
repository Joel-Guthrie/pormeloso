// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Elementos
  const initialScreen = document.getElementById("initial-screen");
  const letterScreen = document.getElementById("letter-screen");
  const openLetterScreen = document.getElementById("open-letter-screen");
  const startButton = document.getElementById("start-button");
  const envelope = document.querySelector(".envelope");
  const letterContent = document.querySelector(".letter-content");
  
  // Función para iniciar la secuencia
  startButton.addEventListener("click", function() {
    // Cambiar de pantalla inicial a pantalla con sobre
    initialScreen.classList.remove("active");
    letterScreen.classList.add("active");
    
    // Después de un breve retraso, abrir el sobre
    setTimeout(function() {
      envelope.classList.add("open");
      
      // Después de que el sobre se abra, mostrar la carta completa
      setTimeout(function() {
        // Ocultar la pantalla del sobre
        letterScreen.classList.remove("active");
        
        // Mostrar la pantalla de la carta abierta
        openLetterScreen.classList.add("active");
        
        // Asegurarse de que el scroll esté al inicio
        openLetterScreen.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Añadir efecto de aparición gradual
        const vintageLetterContainer = document.querySelector(".vintage-letter-container");
        vintageLetterContainer.style.opacity = "0";
        vintageLetterContainer.style.transform = "translateY(20px)";
        vintageLetterContainer.style.transition = "opacity 1s ease, transform 1s ease";
        
        setTimeout(function() {
          vintageLetterContainer.style.opacity = "1";
          vintageLetterContainer.style.transform = "translateY(0)";
          
          // Asegurarse nuevamente de que el scroll esté al inicio
          openLetterScreen.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 100);
        
      }, 2500); // 2.5 segundos después de que se abre el sobre
    }, 1000); // 1 segundo después de mostrar la pantalla del sobre
  });
  
  // Añadir efecto de papel antiguo
  const addVintageEffect = function() {
    const vintageLetter = document.querySelector(".vintage-letter");
    
    // Añadir manchas aleatorias
    for (let i = 0; i < 5; i++) {
      const stain = document.createElement("div");
      stain.className = "vintage-stain";
      stain.style.position = "absolute";
      stain.style.width = Math.random() * 30 + 20 + "px";
      stain.style.height = Math.random() * 30 + 20 + "px";
      stain.style.borderRadius = "50%";
      stain.style.backgroundColor = "rgba(160, 82, 45, 0.1)";
      stain.style.top = Math.random() * 100 + "%";
      stain.style.left = Math.random() * 100 + "%";
      stain.style.transform = "translate(-50%, -50%)";
      stain.style.pointerEvents = "none";
      
      vintageLetter.appendChild(stain);
    }
    
    // Añadir efecto de bordes desgastados
    vintageLetter.style.borderImage = "linear-gradient(45deg, #f5e8c9 0%, #d0b88b 50%, #f5e8c9 100%) 1";
    vintageLetter.style.borderWidth = "1px";
    vintageLetter.style.borderStyle = "solid";
  };
  
  // Ejecutar el efecto de papel antiguo cuando se carga la página
  addVintageEffect();
});

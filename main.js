// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Elementos
  const initialScreen = document.getElementById("initial-screen");
  const letterScreen = document.getElementById("letter-screen");
  const openLetterScreen = document.getElementById("open-letter-screen");
  const startButton = document.getElementById("start-button");
  const envelope = document.querySelector(".envelope");
  const letterContent = document.querySelector(".letter-content");
  
  // Detectar si es un dispositivo móvil
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
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
        
        // Preparar la pantalla de la carta abierta antes de mostrarla
        if (isMobile) {
          // Solución específica para dispositivos móviles
          document.body.style.overflow = "hidden";
          openLetterScreen.style.top = "0";
          openLetterScreen.style.left = "0";
          openLetterScreen.scrollTop = 0;
          
          // Forzar el scroll al inicio para iOS
          if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.height = "100%";
            openLetterScreen.style.position = "fixed";
            openLetterScreen.style.top = "0";
            openLetterScreen.style.left = "0";
            openLetterScreen.style.right = "0";
            openLetterScreen.style.bottom = "0";
            openLetterScreen.style.overflowY = "auto";
            openLetterScreen.style.webkitOverflowScrolling = "touch";
          }
        }
        
        // Mostrar la pantalla de la carta abierta
        openLetterScreen.classList.add("active");
        
        // Forzar el scroll al inicio para todos los dispositivos
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        openLetterScreen.scrollTop = 0;
        
        // Añadir efecto de aparición gradual
        const vintageLetterContainer = document.querySelector(".vintage-letter-container");
        vintageLetterContainer.style.opacity = "0";
        vintageLetterContainer.style.transform = "translateY(20px)";
        vintageLetterContainer.style.transition = "opacity 1s ease, transform 1s ease";
        
        // Pequeño retraso para asegurar que el scroll se resetee
        setTimeout(function() {
          vintageLetterContainer.style.opacity = "1";
          vintageLetterContainer.style.transform = "translateY(0)";
          
          // Forzar scroll al inicio nuevamente después de la animación
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          openLetterScreen.scrollTop = 0;
          
          // Solución específica para dispositivos móviles
          if (isMobile) {
            // Crear un observador de mutaciones para asegurar que el scroll se mantenga al inicio
            const observer = new MutationObserver(function() {
              openLetterScreen.scrollTop = 0;
            });
            
            observer.observe(openLetterScreen, { childList: true, subtree: true });
            
            // Desconectar el observador después de un tiempo
            setTimeout(function() {
              observer.disconnect();
            }, 1000);
            
            // Solución específica para Android
            if (/Android/.test(navigator.userAgent)) {
              document.addEventListener('touchmove', function(e) {
                if (e.target.closest('#open-letter-screen')) {
                  e.stopPropagation();
                }
              }, { passive: true });
            }
          }
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
  
  // Solución específica para dispositivos móviles
  if (isMobile) {
    // Prevenir el comportamiento de rebote en iOS
    document.addEventListener('touchmove', function(e) {
      if (e.target.closest('#open-letter-screen')) {
        // Permitir el desplazamiento dentro de la carta
      } else {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Asegurar que la carta comience desde arriba en dispositivos móviles
    window.addEventListener('resize', function() {
      if (openLetterScreen.classList.contains('active')) {
        openLetterScreen.scrollTop = 0;
      }
    });
    
    // Solución para el problema de desplazamiento en iOS
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      document.addEventListener('touchend', function() {
        if (openLetterScreen.classList.contains('active')) {
          // Pequeño retraso para asegurar que el scroll funcione correctamente
          setTimeout(function() {
            if (openLetterScreen.scrollTop <= 0) {
              openLetterScreen.scrollTop = 1;
            }
          }, 300);
        }
      });
    }
  }
});

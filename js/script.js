const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 5) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// Carrossel Mobile para a seção de Proposta de Valor
function initValuePropositionCarousel() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const imageItems = document.querySelectorAll('.image-item');
    
    // Verificar se estamos no mobile e se existe o wrapper
    if (window.innerWidth <= 768 && imageWrapper && imageItems.length > 0) {
        let currentIndex = 0;
        const totalItems = imageItems.length;
        const itemWidth = imageItems[0].offsetWidth + 20; // width + gap
        
        // Função para mover o carrossel
        function moveCarousel() {
            // Calcula a posição baseada no índice atual
            // Centraliza a imagem atual
            const offset = -((itemWidth * currentIndex) - (window.innerWidth / 2 - itemWidth / 2));
            imageWrapper.style.transform = `translateX(${offset}px)`;
            
            // Atualiza classes para destacar a imagem atual
            imageItems.forEach((item, index) => {
                item.classList.remove('active', 'left-side', 'right-side');
                
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
                    item.classList.add('left-side');
                } else if (index === (currentIndex + 1) % totalItems) {
                    item.classList.add('right-side');
                }
            });
            
            // Avança para o próximo índice
            currentIndex = (currentIndex + 1) % totalItems;
        }
        
        // Iniciar o carrossel
        moveCarousel();
        
        // Configurar intervalo de 4 segundos
        const carouselInterval = setInterval(moveCarousel, 4000);
        
        // Parar o carrossel ao passar o mouse (opcional)
        imageWrapper.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        imageWrapper.addEventListener('mouseleave', () => {
            // Reiniciar intervalo
            carouselInterval = setInterval(moveCarousel, 4000);
        });
        
        // Reiniciar carrossel ao redimensionar
        window.addEventListener('resize', () => {
            clearInterval(carouselInterval);
            if (window.innerWidth <= 768) {
                initValuePropositionCarousel();
            }
        });
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initValuePropositionCarousel);

// Inicializar também quando a seção for carregada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initValuePropositionCarousel();
        }
    });
}, { threshold: 0.1 });

// Observar a seção de proposta de valor
const valueSection = document.querySelector('.value-proposition');
if (valueSection) {
    observer.observe(valueSection);
}
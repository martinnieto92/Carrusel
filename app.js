var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 10,
    // init: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },


    breakpoints: {
        620: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        680: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        920: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1240: {
            slidesPerView: 4,
            spaceBetween: 50,
        },
    }
});


const verMasLinks = document.querySelectorAll('.swiper-slide');
let expandedContainer = null;

verMasLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Si el enlace está en el carrusel original
        const isInCarousel = link.closest('.swiper-slide');

        if (!isInCarousel) {
            closeExpandedImage();
        } else {
            // Crea la imagen ampliada
            const imageUrl = link.closest('.swiper-slide').querySelector('img').src;
            const expandedImage = document.createElement('img');
            expandedImage.src = imageUrl;

            expandedContainer = document.createElement('div');
            expandedContainer.classList.add('expanded-container');
            expandedContainer.appendChild(expandedImage);

            document.body.appendChild(expandedContainer);

            document.body.classList.add('zoomed');

            // Agrega eventos para la tecla "ESC" y el clic en cualquier parte de la pantalla
            document.addEventListener('keydown', handleKeydown);
            document.addEventListener('click', handleDocumentClick);
        }
    });
});

function handleKeydown(event) {
    if (event.key === 'Escape') {
        closeExpandedImage();
    }
}

function handleDocumentClick(event) {
    if (event.target === expandedContainer) {
        closeExpandedImage();
    }
}

function closeExpandedImage() {
    // Elimina la imagen ampliada con transición
    if (expandedContainer) {
        expandedContainer.style.opacity = '0';
        setTimeout(() => {
            expandedContainer.remove();
            expandedContainer = null;
            // Restaura el carrusel original
            document.body.classList.remove('zoomed');
            // Remueve los eventos para la tecla "ESC" y el clic en cualquier parte de la pantalla
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('click', handleDocumentClick);
        }, 300); // Duración de la transición en milisegundos
    }
}



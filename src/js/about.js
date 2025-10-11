// Datos de las obras de arte
const artworks = [
    {
        id: 'musicos',
        title: 'MÚSICOS',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Musicos - Byron.jpg',
        video: 'src/assets/videos/Musicos - Byron.mp4'
    },
    {
        id: 'bailarina',
        title: 'BAILARINA',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Bailarina - Byron.jpg',
        video: 'src/assets/videos/Bailarina - Byron.mp4'
    },
    {
        id: 'musicosm',
        title: 'MÚSICOS M',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/MusicosM.jpg',
        video: 'src/assets/videos/MusicosM.mp4'
    },
    {
        id: 'amanecer',
        title: 'AMANECER',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Amanecer - Byron.jpeg',
        video: 'src/assets/videos/Amanecer - Byron.mp4'
    },
    {
        id: 'escultura-pie',
        title: 'ESCULTURA DE PIE',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Escultura de pie - Byron.jpg',
        video: 'src/assets/videos/Escultura de pie - Byron.mp4'
    },
    {
        id: 'naturaleza-muerta',
        title: 'NATURALEZA MUERTA',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Naturaleza Muerta - Byron.jpg',
        video: 'src/assets/videos/Naturaleza muerta - Byron.mp4'
    },
    {
        id: 'escultura-sentada',
        title: 'ESCULTURA SENTADA',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Escultura sentada - Byron.jpg',
        video: 'src/assets/videos/Escultura sentada - Byron.mp4'
    },
    {
        id: 'rocas-cielo',
        title: 'ROCAS Y CIELO',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Rocas y Cielo - Byron.jpg',
        video: 'src/assets/videos/Rocas y cielo - Byron.mp4'
    },
    {
        id: 'vela',
        title: 'VELA',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Vela.jpg',
        video: 'src/assets/videos/Vela.mp4'
    },
    {
        id: 'violincello',
        title: 'VIOLINCELLO',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Violincello.jpg',
        video: 'src/assets/videos/Violincello.mp4'
    },
    {
        id: 'copas',
        title: 'COPAS',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Copas.jpg',
        video: 'src/assets/videos/Copas.mp4'
    },
    {
        id: 'frutas',
        title: 'FRUTAS',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Frutas.jpg',
        video: 'src/assets/videos/Frutas.mp4'
    },
    {
        id: 'maquillaje',
        title: 'MAQUILLAJE',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Maquillaje.jpg',
        video: 'src/assets/videos/Maquillaje.mp4'
    },
    {
        id: 'vanidad',
        title: 'VANIDAD',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Vanidad.jpg',
        video: 'src/assets/videos/Vanidad.mp4'
    },
    {
        id: 'vela2',
        title: 'VELA 2',
        author: 'Byron',
        year: 'Colección Universo',
        image: 'src/assets/images/Vela2.jpg',
        video: 'src/assets/videos/Vela2.mp4'
    }
];

// Variables globales
let currentIndex = 0;
let isChanging = false;

// Elementos del DOM (se inicializarán en init())
let mainArtwork;
let artworkImage;
let artworkTitle;
let artworkAuthor;
let artworkYear;
let currentNumber;
let totalNumber;
let prevBtn;
let nextBtn;
let thumbnailContainer;
let videoModal;
let modalImage;
let modalVideo;
let modalVideoSource;
let modalTitle;
let modalAuthor;
let modalYear;
let closeModal;

// Inicializar
function init() {
    // Obtener elementos del DOM
    mainArtwork = document.getElementById('mainArtwork');
    artworkImage = document.getElementById('artworkImage');
    artworkTitle = document.getElementById('artworkTitle');
    artworkAuthor = document.getElementById('artworkAuthor');
    artworkYear = document.getElementById('artworkYear');
    currentNumber = document.getElementById('currentNumber');
    totalNumber = document.getElementById('totalNumber');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    thumbnailContainer = document.getElementById('thumbnailContainer');
    videoModal = document.getElementById('videoModal');
    modalImage = document.getElementById('modalImage');
    modalVideo = document.getElementById('modalVideo');
    modalVideoSource = document.getElementById('modalVideoSource');
    modalTitle = document.getElementById('modalTitle');
    modalAuthor = document.getElementById('modalAuthor');
    modalYear = document.getElementById('modalYear');
    closeModal = document.getElementById('closeModal');
    
    // Establecer total de obras
    totalNumber.textContent = artworks.length;
    
    // Generar miniaturas
    generateThumbnails();
    
    // Cargar primera obra
    loadArtwork(0, false);
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        console.log('Prev clicked');
        previousArtwork();
    });
    nextBtn.addEventListener('click', () => {
        console.log('Next clicked');
        nextArtwork();
    });
    closeModal.addEventListener('click', closeVideoModal);
    
    // Click en la imagen para abrir modal con video
    artworkImage.addEventListener('click', () => {
        console.log('Image clicked');
        openVideoModal();
    });
    
    // Cerrar modal al hacer click en el fondo
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Cuando el video termina, volver a mostrarlo desde el inicio
    modalVideo.addEventListener('ended', () => {
        modalVideo.currentTime = 0;
        modalVideo.play();
    });
    
    console.log('Initialized with', artworks.length, 'artworks');
}

// Generar miniaturas
function generateThumbnails() {
    artworks.forEach((artwork, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-item';
        if (index === 0) thumbnail.classList.add('active');
        
        const img = document.createElement('img');
        img.src = artwork.image;
        img.alt = artwork.title;
        
        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => changeArtwork(index));
        
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Cargar obra de arte
function loadArtwork(index, animate = true) {
    console.log('loadArtwork called:', index, 'animate:', animate);
    if (isChanging && animate) {
        console.log('Blocked - is changing');
        return;
    }
    
    const artwork = artworks[index];
    currentIndex = index;
    
    if (animate) {
        isChanging = true;
        console.log('Starting unhang animation');
        
        // Animación de descolgar
        mainArtwork.classList.add('unhang');
        
        setTimeout(() => {
            console.log('Changing content to:', artwork.title);
            // Cambiar contenido
            updateArtworkContent(artwork);
            
            // Quitar clase unhang y agregar hang
            mainArtwork.classList.remove('unhang');
            mainArtwork.classList.add('hang');
            
            setTimeout(() => {
                mainArtwork.classList.remove('hang');
                isChanging = false;
                console.log('Animation complete');
            }, 1000);
        }, 1000);
    } else {
        console.log('Loading without animation:', artwork.title);
        updateArtworkContent(artwork);
    }
    
    // Actualizar contador y miniaturas
    currentNumber.textContent = index + 1;
    updateThumbnailsActive(index);
}

// Actualizar contenido de la obra
function updateArtworkContent(artwork) {
    console.log('updateArtworkContent called for:', artwork.title);
    
    const artworkContent = document.querySelector('.artwork-content');
    
    if (!artworkContent) {
        console.error('artworkContent not found!');
        return;
    }
    
    // Resetear estilos para permitir ajuste natural
    artworkContent.style.height = 'auto';
    artworkContent.style.width = 'auto';
    
    // Actualizar imagen
    artworkImage.src = artwork.image;
    console.log('Image updated to:', artwork.image);
    
    // Actualizar información
    artworkTitle.textContent = artwork.title;
    artworkAuthor.textContent = artwork.author;
    artworkYear.textContent = artwork.year;
}

// Abrir modal con video
function openVideoModal() {
    const artwork = artworks[currentIndex];
    
    // Configurar modal
    modalImage.src = artwork.image;
    modalVideoSource.src = artwork.video;
    modalVideo.load();
    modalTitle.textContent = artwork.title;
    modalAuthor.textContent = artwork.author;
    modalYear.textContent = artwork.year;
    
    // Mostrar modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Mostrar imagen por 2 segundos, luego reproducir video
    modalImage.classList.remove('hidden');
    
    setTimeout(() => {
        modalImage.classList.add('hidden');
        modalVideo.play();
    }, 2000);
}

// Cerrar modal de video
function closeVideoModal() {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    modalImage.classList.remove('hidden');
}

// Actualizar miniaturas activas
function updateThumbnailsActive(index) {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
            // Scroll para centrar la miniatura activa
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Cambiar obra de arte
function changeArtwork(index) {
    console.log('changeArtwork called:', index, 'currentIndex:', currentIndex, 'isChanging:', isChanging);
    if (index === currentIndex || isChanging) {
        console.log('Blocked - same index or is changing');
        return;
    }
    loadArtwork(index, true);
}

// Obra anterior
function previousArtwork() {
    console.log('previousArtwork called, current:', currentIndex);
    const newIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    console.log('newIndex:', newIndex);
    changeArtwork(newIndex);
}

// Obra siguiente
function nextArtwork() {
    console.log('nextArtwork called, current:', currentIndex);
    const newIndex = (currentIndex + 1) % artworks.length;
    console.log('newIndex:', newIndex);
    changeArtwork(newIndex);
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            previousArtwork();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextArtwork();
            break;
        case 'Escape':
            if (videoModal && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
            break;
    }
});

// Navegación por números (1-0 para las 10 obras)
document.addEventListener('keydown', (e) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
        changeArtwork(num - 1);
    } else if (e.key === '0') {
        changeArtwork(9);
    }
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Precargar videos para mejor experiencia
function preloadVideos() {
    artworks.forEach((artwork, index) => {
        if (index < 3) { // Precargar solo los primeros 3 videos
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = artwork.video;
        }
    });
}

// Precargar después de 2 segundos
setTimeout(preloadVideos, 2000);

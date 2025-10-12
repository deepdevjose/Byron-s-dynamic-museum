// Datos de las obras de arte
const artworks = [
    {
        id: 'musicos',
        title: 'MÚSICOS',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Musicos - Byron.jpg',
        video: 'src/assets/videos/Musicos - Byron.mp4'
    },
    {
        id: 'bailarina',
        title: 'BAILARINA',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Bailarina - Byron.jpg',
        video: 'src/assets/videos/Bailarina - Byron.mp4'
    },
    {
        id: 'musicosm',
        title: 'MÚSICOS M',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/MusicosM.jpg',
        video: 'src/assets/videos/MusicosM - Byron.mp4'
    },
    {
        id: 'amanecer',
        title: 'AMANECER',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Amanecer - Byron.jpeg',
        video: 'src/assets/videos/Amanecer - Byron.mp4'
    },
    {
        id: 'escultura-pie',
        title: 'ESCULTURA DE PIE',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Escultura de pie - Byron.jpg',
        video: 'src/assets/videos/Escultura de pie - Byron.mp4'
    },
    {
        id: 'naturaleza-muerta',
        title: 'NATURALEZA MUERTA',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Naturaleza Muerta - Byron.jpg',
        video: 'src/assets/videos/Naturaleza muerta - Byron.mp4'
    },
    {
        id: 'escultura-sentada',
        title: 'ESCULTURA SENTADA',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Escultura sentada - Byron.jpg',
        video: 'src/assets/videos/Escultura sentada - Byron.mp4'
    },
    {
        id: 'rocas-cielo',
        title: 'ROCAS Y CIELO',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Rocas y Cielo - Byron.jpg',
        video: 'src/assets/videos/Rocas y cielo - Byron.mp4'
    },
    {
        id: 'vela',
        title: 'VELA',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Vela.jpg',
        video: 'src/assets/videos/Vela - Byron.mp4'
    },
    {
        id: 'violincello',
        title: 'VIOLINCELLO',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Violincello.jpg',
        video: 'src/assets/videos/Violincelo - Byron.mp4'
    },
    {
        id: 'copas',
        title: 'COPAS',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Copas.jpg',
        video: 'src/assets/videos/Copeo - Byron.mp4'
    },
    {
        id: 'frutas',
        title: 'FRUTAS',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Frutas.jpg',
        video: 'src/assets/videos/Frutas - Byron.mp4'
    },
    {
        id: 'maquillaje',
        title: 'MAQUILLAJE',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Maquillaje.jpg',
        video: 'src/assets/videos/Maquillaje - Byron.mp4'
    },
    {
        id: 'vanidad',
        title: 'VANIDAD',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Vanidad.jpg',
        video: 'src/assets/videos/Vanidad - Byron.mp4'
    },
    {
        id: 'vela2',
        title: 'VELA 2',
        author: 'Byron',
        year: 'Byron',
        image: 'src/assets/images/Vela2.jpg',
        video: 'src/assets/videos/Vela2 - Byron.mp4'
    }
];

// Variables globales
let currentIndex = 0;
let isChanging = false;
let isMobile = false;
let videoCache = new Map(); // Cache para videos precargados

// Elementos del DOM (se inicializarán en init())
let mainArtwork;
let artworkImage;
let artworkTitle;
let artworkAuthor;
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
let closeModal;

// Detectar si es dispositivo móvil
function detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    
    return mobileRegex.test(userAgent.toLowerCase()) || (isTouchDevice && isSmallScreen);
}

// Sistema de precarga progresiva de videos (estilo Spotify)
class VideoPreloader {
    constructor() {
        this.preloadQueue = [];
        this.currentlyPreloading = null;
        this.maxCacheSize = 5; // Máximo de videos en cache
    }
    
    // Precargar los primeros 2-3 segundos de un video
    async preloadVideoChunk(videoUrl, artworkId) {
        if (videoCache.has(artworkId)) {
            console.log(`✅ Video ya en cache: ${artworkId}`);
            return videoCache.get(artworkId);
        }
        
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'auto'; // Cargar lo que sea posible
            video.src = videoUrl;
            
            // Manejar cuando se carguen los primeros datos
            const onCanPlay = () => {
                console.log(`✅ Video precargado (primeros segundos): ${artworkId}`);
                
                // Guardar en cache
                if (videoCache.size >= this.maxCacheSize) {
                    // Eliminar el video más antiguo
                    const firstKey = videoCache.keys().next().value;
                    const oldVideo = videoCache.get(firstKey);
                    if (oldVideo && oldVideo.src) {
                        oldVideo.src = '';
                    }
                    videoCache.delete(firstKey);
                }
                
                videoCache.set(artworkId, video);
                cleanup();
                resolve(video);
            };
            
            const onError = () => {
                console.warn(`⚠️ Error precargando video: ${artworkId}`);
                cleanup();
                reject();
            };
            
            const cleanup = () => {
                video.removeEventListener('canplay', onCanPlay);
                video.removeEventListener('error', onError);
            };
            
            video.addEventListener('canplay', onCanPlay, { once: true });
            video.addEventListener('error', onError, { once: true });
            
            // Timeout de seguridad
            setTimeout(() => {
                if (!videoCache.has(artworkId)) {
                    console.warn(`⏱️ Timeout precargando video: ${artworkId}`);
                    cleanup();
                    reject();
                }
            }, 5000);
        });
    }
    
    // Precargar video actual y los 2 siguientes
    async preloadCurrentAndNext(currentIdx) {
        const videosToPreload = [];
        
        // Video actual
        videosToPreload.push({
            index: currentIdx,
            artwork: artworks[currentIdx],
            priority: 1
        });
        
        // Siguiente
        const nextIdx = (currentIdx + 1) % artworks.length;
        videosToPreload.push({
            index: nextIdx,
            artwork: artworks[nextIdx],
            priority: 2
        });
        
        // Siguiente del siguiente
        const nextNextIdx = (currentIdx + 2) % artworks.length;
        videosToPreload.push({
            index: nextNextIdx,
            artwork: artworks[nextNextIdx],
            priority: 3
        });
        
        // Precargar en orden de prioridad
        for (const item of videosToPreload) {
            if (!videoCache.has(item.artwork.id)) {
                try {
                    await this.preloadVideoChunk(item.artwork.video, item.artwork.id);
                    // Pequeña pausa entre precargas
                    await new Promise(resolve => setTimeout(resolve, 300));
                } catch (error) {
                    console.warn(`Error precargando video ${item.artwork.id}:`, error);
                }
            }
        }
    }
}

const videoPreloader = new VideoPreloader();

// Inicializar
function init() {
    // Detectar si es móvil
    isMobile = detectMobile();
    console.log(isMobile ? '📱 Modo móvil detectado' : '💻 Modo escritorio detectado');
    
    // Obtener elementos del DOM
    mainArtwork = document.getElementById('mainArtwork');
    artworkImage = document.getElementById('artworkImage');
    artworkTitle = document.getElementById('artworkTitle');
    artworkAuthor = document.getElementById('artworkAuthor');
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
    
    // Cerrar modal al hacer click en el fondo (solo en escritorio)
    if (!isMobile) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Cuando el video termina, volver a mostrarlo desde el inicio
    modalVideo.addEventListener('ended', () => {
        modalVideo.currentTime = 0;
        modalVideo.play();
    });
    
    // Listener para salir de pantalla completa
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Iniciar precarga progresiva después de 1 segundo
    setTimeout(() => {
        console.log('🎬 Iniciando precarga de videos...');
        videoPreloader.preloadCurrentAndNext(currentIndex);
    }, 1000);
    
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
    
    // Verificar que todos los elementos existen
    if (!artworkImage) {
        console.error('artworkImage element not found!');
        return;
    }
    if (!artworkTitle) {
        console.error('artworkTitle element not found!');
        return;
    }
    if (!artworkAuthor) {
        console.error('artworkAuthor element not found!');
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
}

// Abrir modal con video
async function openVideoModal() {
    const artwork = artworks[currentIndex];
    
    // Si es móvil, ir directamente a pantalla completa
    if (isMobile) {
        await playVideoFullscreen(artwork);
        return;
    }
    
    // Modo escritorio: mostrar modal con frame decorativo
    // Configurar modal
    modalImage.src = artwork.image;
    modalTitle.textContent = artwork.title;
    modalAuthor.textContent = artwork.author;
    
    // Usar video del cache si está disponible
    let videoElement;
    if (videoCache.has(artwork.id)) {
        console.log('🚀 Usando video del cache');
        videoElement = videoCache.get(artwork.id);
        // Clonar el video para el modal
        modalVideoSource.src = videoElement.src;
    } else {
        console.log('⏳ Cargando video...');
        modalVideoSource.src = artwork.video;
    }
    
    modalVideo.load();
    
    // Mostrar modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Mostrar imagen por 2 segundos, luego reproducir video
    modalImage.classList.remove('hidden');
    
    setTimeout(() => {
        modalImage.classList.add('hidden');
        modalVideo.play().catch(err => {
            console.error('Error reproduciendo video:', err);
        });
    }, 2000);
}

// Reproducir video en pantalla completa (móviles)
async function playVideoFullscreen(artwork) {
    console.log('📱 Reproduciendo en pantalla completa');
    
    // Crear un video temporal para pantalla completa
    const fullscreenVideo = document.createElement('video');
    fullscreenVideo.className = 'fullscreen-video-mobile';
    fullscreenVideo.controls = true;
    fullscreenVideo.autoplay = true;
    fullscreenVideo.playsInline = false; // Forzar pantalla completa en iOS
    
    // Usar video del cache si está disponible
    if (videoCache.has(artwork.id)) {
        console.log('🚀 Usando video del cache para pantalla completa');
        const cachedVideo = videoCache.get(artwork.id);
        fullscreenVideo.src = cachedVideo.src;
    } else {
        console.log('⏳ Cargando video para pantalla completa...');
        fullscreenVideo.src = artwork.video;
    }
    
    // Agregar al DOM
    document.body.appendChild(fullscreenVideo);
    
    // Esperar a que el video esté listo
    fullscreenVideo.addEventListener('loadedmetadata', async () => {
        try {
            // Intentar entrar en pantalla completa
            if (fullscreenVideo.requestFullscreen) {
                await fullscreenVideo.requestFullscreen();
            } else if (fullscreenVideo.webkitRequestFullscreen) {
                await fullscreenVideo.webkitRequestFullscreen();
            } else if (fullscreenVideo.mozRequestFullScreen) {
                await fullscreenVideo.mozRequestFullScreen();
            } else if (fullscreenVideo.msRequestFullscreen) {
                await fullscreenVideo.msRequestFullscreen();
            } else if (fullscreenVideo.webkitEnterFullscreen) {
                // Para iOS
                fullscreenVideo.webkitEnterFullscreen();
            }
            
            // Reproducir
            await fullscreenVideo.play();
        } catch (err) {
            console.error('Error activando pantalla completa:', err);
            // Si falla pantalla completa, reproducir de todas formas
            fullscreenVideo.play();
        }
    });
    
    // Cuando termine o salga de pantalla completa, limpiar
    const cleanup = () => {
        fullscreenVideo.pause();
        fullscreenVideo.src = '';
        document.body.removeChild(fullscreenVideo);
    };
    
    fullscreenVideo.addEventListener('ended', cleanup);
    fullscreenVideo.addEventListener('pause', () => {
        // Esperar un poco antes de limpiar por si el usuario pausó
        setTimeout(() => {
            if (fullscreenVideo.paused && document.body.contains(fullscreenVideo)) {
                cleanup();
            }
        }, 500);
    });
}

// Manejar cambios de pantalla completa
function handleFullscreenChange() {
    const isFullscreen = !!(document.fullscreenElement || 
                           document.webkitFullscreenElement || 
                           document.mozFullScreenElement || 
                           document.msFullscreenElement);
    
    if (!isFullscreen && isMobile) {
        // El usuario salió de pantalla completa en móvil
        const fullscreenVideo = document.querySelector('.fullscreen-video-mobile');
        if (fullscreenVideo) {
            fullscreenVideo.pause();
            setTimeout(() => {
                if (document.body.contains(fullscreenVideo)) {
                    fullscreenVideo.src = '';
                    document.body.removeChild(fullscreenVideo);
                }
            }, 300);
        }
    }
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
    
    // Precargar videos relacionados con esta nueva obra
    setTimeout(() => {
        videoPreloader.preloadCurrentAndNext(index);
    }, 500);
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

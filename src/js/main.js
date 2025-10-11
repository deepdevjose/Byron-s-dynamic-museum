// Configuración de audio de Byron
const byronAudio = {
    audioPath: './src/assets/audio/main.mp3', // Archivo de audio de Byron
    isPlaying: false
};

// Elementos del DOM
let byronImage;
let byronAudioElement;
let audioIndicator;
let biographyModal;
let fullBiographyBtn;
let closeBiographyModal;
let modalOverlay;

// Inicializar la aplicación
function init() {
    // Obtener elementos del DOM
    byronImage = document.getElementById('byronImage');
    byronAudioElement = document.getElementById('byronAudio');
    audioIndicator = document.querySelector('.audio-indicator');
    biographyModal = document.getElementById('biographyModal');
    fullBiographyBtn = document.getElementById('fullBiographyBtn');
    closeBiographyModal = document.getElementById('closeBiographyModal');
    modalOverlay = document.getElementById('modalOverlay');
    
    // Event listeners para audio
    if (byronImage) {
        byronImage.addEventListener('click', toggleAudio);
    }
    
    if (audioIndicator) {
        audioIndicator.addEventListener('click', toggleAudio);
    }
    
    // Event listeners para modal de biografía
    if (fullBiographyBtn) {
        fullBiographyBtn.addEventListener('click', openBiographyModal);
    }
    
    if (closeBiographyModal) {
        closeBiographyModal.addEventListener('click', closeBiographyModalHandler);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeBiographyModalHandler);
    }
    
    // Event listeners para el elemento de audio
    if (byronAudioElement) {
        byronAudioElement.addEventListener('ended', () => {
            stopAudio();
        });
        
        byronAudioElement.addEventListener('error', (e) => {
            console.error('Error al cargar el audio:', e);
            stopAudio();
        });
    }
    
    console.log('Byron Museum initialized');
}

// Función para reproducir/pausar audio
function toggleAudio() {
    if (!byronAudioElement) {
        console.error('Elemento de audio no encontrado');
        return;
    }
    
    if (byronAudio.isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Reproducir audio
function playAudio() {
    if (!byronAudioElement) return;
    
    // Asegurar que la fuente está configurada
    const audioSource = document.getElementById('audioSource');
    if (audioSource && !audioSource.src.includes(byronAudio.audioPath)) {
        audioSource.src = byronAudio.audioPath;
        byronAudioElement.load();
    }
    
    byronAudioElement.play()
        .then(() => {
            byronAudio.isPlaying = true;
            updateAudioIndicator(true);
            console.log('Audio reproduciéndose:', byronAudio.audioPath);
        })
        .catch(error => {
            console.error('Error al reproducir audio:', error);
        });
}

// Pausar audio
function pauseAudio() {
    if (!byronAudioElement) return;
    
    byronAudioElement.pause();
    byronAudio.isPlaying = false;
    updateAudioIndicator(false);
    console.log('Audio pausado');
}

// Detener audio
function stopAudio() {
    if (!byronAudioElement) return;
    
    byronAudioElement.pause();
    byronAudioElement.currentTime = 0;
    byronAudio.isPlaying = false;
    updateAudioIndicator(false);
    console.log('Audio detenido');
}

// Actualizar indicador visual de audio
function updateAudioIndicator(isPlaying) {
    if (!audioIndicator) return;
    
    if (isPlaying) {
        audioIndicator.classList.add('playing');
        audioIndicator.title = 'Click para pausar audio';
    } else {
        audioIndicator.classList.remove('playing');
        audioIndicator.title = 'Click para escuchar';
    }
}

// Función para configurar el archivo de audio (cuando lo tengas)
function setAudioFile(audioPath) {
    byronAudio.audioPath = audioPath;
    console.log('Archivo de audio configurado:', audioPath);
}

// Función para actualizar la semblanza (cuando la tengas)
function updateBiography(biographyHtml) {
    if (biographyText) {
        biographyText.innerHTML = biographyHtml;
        console.log('Biografía actualizada');
    }
}

// Funciones del modal de biografía
function openBiographyModal() {
    if (biographyModal) {
        biographyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal de biografía abierto');
    }
}

function closeBiographyModalHandler() {
    if (biographyModal) {
        biographyModal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Modal de biografía cerrado');
    }
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'Enter':
            // Solo activar audio si no hay modal abierto
            if (!biographyModal || !biographyModal.classList.contains('active')) {
                e.preventDefault();
                toggleAudio();
            }
            break;
        case 'Escape':
            if (biographyModal && biographyModal.classList.contains('active')) {
                closeBiographyModalHandler();
            } else if (byronAudio.isPlaying) {
                stopAudio();
            }
            break;
    }
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Estrategia de precarga inteligente para optimización de rendimiento
function intelligentPreloading() {
    // Lista de videos adicionales para precargar progresivamente
    const additionalVideos = [
        'src/assets/videos/Escultura de pie - Byron.mp4',
        'src/assets/videos/Naturaleza muerta - Byron.mp4',
        'src/assets/videos/Escultura sentada - Byron.mp4',
        'src/assets/videos/Rocas y cielo - Byron.mp4',
        'src/assets/videos/Vela - Byron.mp4',
        'src/assets/videos/Violincelo - Byron.mp4'
    ];
    
    // Lista de imágenes adicionales para precargar
    const additionalImages = [
        'src/assets/images/MusicosM.jpg',
        'src/assets/images/Amanecer - Byron.jpeg',
        'src/assets/images/Escultura de pie - Byron.jpg',
        'src/assets/images/Naturaleza Muerta - Byron.jpg'
    ];
    
    // Función para precargar un video
    function preloadVideo(src) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata'; // Solo metadatos para ahorrar ancho de banda
            video.onloadedmetadata = () => {
                console.log(`Video precargado: ${src}`);
                resolve(video);
            };
            video.onerror = () => {
                console.warn(`Error precargando video: ${src}`);
                reject();
            };
            video.src = src;
        });
    }
    
    // Función para precargar una imagen
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`Imagen precargada: ${src}`);
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`Error precargando imagen: ${src}`);
                reject();
            };
            img.src = src;
        });
    }
    
    // Precarga progresiva con throttling para no saturar la conexión
    async function progressivePreload() {
        // Esperar 3 segundos después de que la página esté completamente cargada
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Precargar imágenes primero (son más pequeñas)
        console.log('🖼️ Iniciando precarga de imágenes adicionales...');
        for (const imageSrc of additionalImages) {
            try {
                await preloadImage(imageSrc);
                // Pequeña pausa entre cada imagen
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                // Continuar con la siguiente imagen si una falla
                continue;
            }
        }
        
        // Precargar videos progresivamente
        console.log('🎬 Iniciando precarga de videos adicionales...');
        for (const videoSrc of additionalVideos) {
            try {
                await preloadVideo(videoSrc);
                // Pausa más larga entre videos para evitar saturar la conexión
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                // Continuar con el siguiente video si uno falla
                continue;
            }
        }
        
        console.log('✅ Precarga inteligente completada');
    }
    
    // Iniciar precarga solo si la conexión es rápida
    if (navigator.connection) {
        const connection = navigator.connection;
        // Solo precargar en conexiones rápidas (4G o mejor)
        if (connection.effectiveType === '4g' || connection.downlink > 2) {
            progressivePreload();
        } else {
            console.log('🐌 Conexión lenta detectada, omitiendo precarga adicional');
        }
    } else {
        // Si no se puede detectar la conexión, asumir que es buena
        progressivePreload();
    }
}

// Iniciar precarga inteligente después de que todo esté listo
window.addEventListener('load', () => {
    // Esperar 2 segundos después del load completo
    setTimeout(intelligentPreloading, 2000);
});

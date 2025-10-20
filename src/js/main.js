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
        // Configurar velocidad de reproducción a 1.25x
        byronAudioElement.playbackRate = 1.25;
        
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
            // Asegurar que la velocidad sea 1.25x
            byronAudioElement.playbackRate = 1.25;
            updateAudioIndicator(true);
            console.log('Audio reproduciéndose:', byronAudio.audioPath, 'a velocidad 1.25x');
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
    // Lista de videos adicionales para precargar progresivamente (solo primeros segundos)
    const priorityVideos = [
        { src: 'src/assets/videos/Musicos - Byron.mp4', priority: 1 },
        { src: 'src/assets/videos/Bailarina - Byron.mp4', priority: 1 },
        { src: 'src/assets/videos/MusicosM - Byron.mp4', priority: 2 },
        { src: 'src/assets/videos/Amanecer - Byron.mp4', priority: 2 }
    ];
    
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
    
    // Función para precargar solo los primeros segundos de un video (estilo Spotify)
    function preloadVideoChunk(src) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'auto'; // Cargar datos iniciales
            
            const onCanPlay = () => {
                console.log(`✅ Video chunk precargado: ${src.split('/').pop()}`);
                cleanup();
                resolve(video);
            };
            
            const onError = () => {
                console.warn(`⚠️ Error precargando video: ${src.split('/').pop()}`);
                cleanup();
                reject();
            };
            
            const cleanup = () => {
                video.removeEventListener('canplay', onCanPlay);
                video.removeEventListener('error', onError);
            };
            
            video.addEventListener('canplay', onCanPlay, { once: true });
            video.addEventListener('error', onError, { once: true });
            video.src = src;
            
            // Timeout de seguridad
            setTimeout(() => {
                cleanup();
                resolve(video);
            }, 5000);
        });
    }
    
    // Función para precargar una imagen
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`✅ Imagen precargada: ${src.split('/').pop()}`);
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`⚠️ Error precargando imagen: ${src.split('/').pop()}`);
                reject();
            };
            img.src = src;
        });
    }
    
    // Precarga progresiva con prioridades
    async function progressivePreload() {
        // Esperar 2 segundos después de que la página esté completamente cargada
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('🎬 Iniciando precarga inteligente de videos prioritarios...');
        
        // Precargar videos de alta prioridad primero
        for (const videoInfo of priorityVideos) {
            try {
                await preloadVideoChunk(videoInfo.src);
                // Pausa breve entre videos
                await new Promise(resolve => setTimeout(resolve, 400));
            } catch (error) {
                continue;
            }
        }
        
        // Precargar imágenes (son más ligeras)
        console.log('🖼️ Precargando imágenes adicionales...');
        for (const imageSrc of additionalImages) {
            try {
                await preloadImage(imageSrc);
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                continue;
            }
        }
        
        // Solo precargar videos adicionales si la conexión es buena
        if (shouldPreloadAdditional()) {
            console.log('🎬 Precargando videos adicionales...');
            for (const videoSrc of additionalVideos) {
                try {
                    await preloadVideoChunk(videoSrc);
                    // Pausa más larga para no saturar
                    await new Promise(resolve => setTimeout(resolve, 800));
                } catch (error) {
                    continue;
                }
            }
        }
        
        console.log('✅ Precarga inteligente completada');
    }
    
    // Determinar si se deben precargar recursos adicionales
    function shouldPreloadAdditional() {
        // Verificar conexión del usuario
        if (navigator.connection) {
            const connection = navigator.connection;
            // Solo precargar en conexiones rápidas (4G o mejor)
            const isFastConnection = connection.effectiveType === '4g' || 
                                    connection.downlink > 2;
            
            if (!isFastConnection) {
                console.log('🐌 Conexión lenta detectada, limitando precarga');
                return false;
            }
        }
        
        // No precargar si el usuario está en modo ahorro de datos
        if (navigator.connection && navigator.connection.saveData) {
            console.log('💾 Modo ahorro de datos activo, omitiendo precarga adicional');
            return false;
        }
        
        return true;
    }
    
    // Iniciar precarga
    progressivePreload();
}

// Iniciar precarga inteligente después de que todo esté listo
window.addEventListener('load', () => {
    // Esperar 1.5 segundos después del load completo
    setTimeout(intelligentPreloading, 1500);
});

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

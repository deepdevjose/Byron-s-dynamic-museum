// Datos de los miembros del equipo
const teamMembers = {
    jose: {
        name: 'José Manuel Cortés Cerón',
        role: 'Project Manager & Lead Developer',
        degree: 'Ing. en Tecnologías de la Información y Comunicaciones - ITSOEH',
        semester: '5° Semestre - Grupo A',
        id: '230110688',
        image: 'src/assets/team/jose.png',
        description: 'José Manuel Cortés Cerón asumió un rol triple y fundamental como Project Manager, Lead Full-Stack Developer y WebGL Architect. Su liderazgo fue clave en la gestión integral del proyecto, definiendo el alcance, los cronogramas y la asignación de recursos del equipo. A nivel técnico, se desempeñó como arquitecto principal de WebGL, liderando el diseño y desarrollo de la arquitectura 3D mediante Three.js. Además, como Lead Full-Stack Developer, fue responsable de la implementación del frontend del sitio web, el pipeline de creación de contenido multimedia (videomapping) y la administración de la infraestructura tecnológica y del repositorio.'
    },
    asael: {
        name: 'Asael Manuel Otero Reyes',
        role: 'QA Engineer',
        degree: 'Ing. en Tecnologías de la Información y Comunicaciones - ITSOEH',
        semester: '5° Semestre - Grupo A',
        id: '230110197',
        image: 'src/assets/team/asael.jpg',
        description: 'Asael Manuel Otero Reyes se desempeñó como QA Engineer (Ingeniero de Calidad de Software). Su principal responsabilidad fue garantizar la calidad, estabilidad y usabilidad del producto, ejecutando pruebas funcionales y de experiencia de usuario (UI/UX). También se encargó de la validación del motor 3D, la detección de errores críticos y su documentación (debugging), contribuyendo a mantener la solidez técnica del proyecto.'
    },
    monserrat: {
        name: 'Aguilar Pérez Monserrat',
        role: 'Junior TTS/LM Engineer',
        degree: 'Ing. en Tecnologías de la Información y Comunicaciones - ITSOEH',
        semester: '3° Semestre - Grupo A',
        id: '240110021',
        image: 'src/assets/team/monse.jpg',
        description: 'Aguilar Pérez Monserrat ocupó el puesto de Junior TTS/LM Engineer (Ingeniera Junior de Texto a Voz / Modelo de Lenguaje). Formó parte del equipo de ingeniería de voz con Python, colaborando en el desarrollo de un modelo de clonación de voz del artista. Además, participó en la generación y producción de videos de videomapping, así como en la composición digital para animaciones sutiles.'
    },
    alan: {
        name: 'Bautista Cruz Alan',
        role: 'Junior TTS/LM Engineer',
        degree: 'Ing. en Tecnologías de la Información y Comunicaciones - ITSOEH',
        semester: '3° Semestre - Grupo A',
        id: '240110049',
        image: 'src/assets/team/alan.jpg',
        description: 'Bautista Cruz Alan desempeñó el cargo de Junior TTS/LM Engineer (Ingeniero Junior de Texto a Voz / Modelo de Lenguaje). Contribuyó significativamente al desarrollo del modelo de clonación de voz del artista en Python y participó en la creación y producción de videos de videomapping, además de colaborar en tareas de composición digital para animaciones.'
    },
    alex: {
        name: 'Calva Obregón Rembrandt Alexandre',
        role: 'Junior TTS/LM Engineer',
        degree: 'Ing. en Tecnologías de la Información y Comunicaciones - ITSOEH',
        semester: '3° Semestre - Grupo A',
        id: '240110314',
        image: 'src/assets/team/alex.jpg',
        description: 'Calva Obregón Rembrandt Alexandre ocupó el puesto de Junior TTS/LM Engineer (Ingeniero Junior de Texto a Voz / Modelo de Lenguaje). Participó activamente en el desarrollo del modelo de clonación de voz con Python y apoyó en la producción audiovisual, incluyendo la generación de videos de videomapping y la composición digital para animaciones.'
    }
};

// Elementos del DOM
let modal;
let modalOverlay;
let closeModalBtn;
let modalImage;
let modalName;
let modalRole;
let modalDegree;
let modalSemester;
let modalId;
let modalDescription;

// Inicializar
function init() {
    // Obtener elementos del DOM
    modal = document.getElementById('memberModal');
    
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    modalOverlay = modal.querySelector('.modal-overlay');
    closeModalBtn = document.getElementById('closeModal');
    modalImage = document.getElementById('modalImage');
    modalName = document.getElementById('modalName');
    modalRole = document.getElementById('modalRole');
    modalDegree = document.getElementById('modalDegree');
    modalSemester = document.getElementById('modalSemester');
    modalId = document.getElementById('modalId');
    modalDescription = document.getElementById('modalDescription');
    
    // Event listeners para las cards
    const cards = document.querySelectorAll('.card[data-member]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const memberId = card.getAttribute('data-member');
            openModal(memberId);
        });
    });
    
    // Event listeners para cerrar el modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('About page initialized with', cards.length, 'team members');
}

// Abrir modal con información del miembro
function openModal(memberId) {
    const member = teamMembers[memberId];
    
    if (!member) {
        console.error('Miembro no encontrado:', memberId);
        return;
    }
    
    // Actualizar contenido del modal
    modalImage.src = member.image;
    modalImage.alt = member.name;
    modalName.textContent = member.name;
    modalRole.textContent = member.role;
    modalDegree.textContent = member.degree;
    modalSemester.textContent = member.semester;
    modalId.textContent = member.id;
    modalDescription.textContent = member.description;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal abierto para:', member.name);
}

// Cerrar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    console.log('Modal cerrado');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

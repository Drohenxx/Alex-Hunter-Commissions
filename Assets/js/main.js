const COMMISSION_EMAIL = "aluna.design19@gmail.com";

// Verificar si los elementos existen antes de usarlos
const modal = document.getElementById('commissionModal');
const formView = document.getElementById('formView');
const successView = document.getElementById('successView');
const form = document.getElementById('commissionForm');
const statusBox = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// Solo configurar modal si existe
if (modal && formView && successView && form && statusBox && submitBtn) {
    function openModal() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        formView.style.display = 'block';
        successView.style.display = 'none';
        statusBox.classList.remove('show');
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-commission]').forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    document.querySelectorAll('[data-close-commission]').forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    document.querySelectorAll('.option-row input[type="radio"]').forEach((input) => {
        input.addEventListener('change', () => {
            const group = input.closest('[data-radio-group]');
            group.querySelectorAll('.option-row').forEach((r) => r.classList.remove('checked'));
            input.closest('.option-row').classList.add('checked');
        });
    });

    document.querySelectorAll('.option-row input[type="checkbox"]').forEach((input) => {
        input.addEventListener('change', () => {
            input.closest('.option-row').classList.toggle('checked', input.checked);
        });
    });

    const fileInput = document.getElementById('referenceImages');
    const fileTrigger = document.getElementById('fileTrigger');

    if (fileInput && fileTrigger) {
        fileTrigger.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', () => {
            const fileNameEl = document.getElementById('fileName');
            if (fileInput.files.length === 0) {
                fileNameEl.textContent = 'Ningún archivo seleccionado';
            } else if (fileInput.files.length === 1) {
                fileNameEl.textContent = fileInput.files[0].name;
            } else {
                fileNameEl.textContent = fileInput.files.length + ' archivos seleccionados';
            }
        });
    }

    function showStatus(msg, isError) {
        statusBox.textContent = msg;
        statusBox.className = 'form-status show ' + (isError ? 'err' : 'ok');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (COMMISSION_EMAIL === 'tu-correo@ejemplo.com') {
            showStatus('Falta configurar el correo de destino en el código (busca COMMISSION_EMAIL).', true);
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        const formData = new FormData(form);
        formData.append('_subject', 'Nueva solicitud de comisión — Alex Hunter');
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        try {
            const res = await fetch('https://formsubmit.co/ajax/' + COMMISSION_EMAIL, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData
            });
            const data = await res.json();

            if (res.ok && (data.success === 'true' || data.success === true)) {
                formView.style.display = 'none';
                successView.style.display = 'block';
                form.reset();
                document.querySelectorAll('.option-row.checked').forEach((r) => r.classList.remove('checked'));
                document.getElementById('fileName').textContent = 'Ningún archivo seleccionado';
            } else {
                showStatus('No se pudo enviar. Si es tu primer envío, revisa tu correo para activar FormSubmit y vuelve a intentarlo.', true);
            }
        } catch (err) {
            showStatus('Hubo un problema de conexión. Inténtalo de nuevo en unos segundos.', true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Request';
        }
    });
}

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    console.log('📌 DOMContentLoaded ejecutado');

    const galleryGrid = document.getElementById('galleryGrid');
    console.log('🔍 galleryGrid encontrado:', galleryGrid);

    if (!galleryGrid) {
        console.error('❌ ERROR: No se encontró #galleryGrid');
        return;
    }

    // Datos de los artworks (imagen + título)
    const artworks = [
        { title: 'Glenn', image: 'Assets/Img/gallery-1.png' },
        { title: 'Trío', image: 'Assets/Img/gallery-2.png' },
        { title: 'Retrato', image: 'Assets/Img/gallery-3.png' },
        { title: 'Bosque', image: 'Assets/Img/gallery-4.png' },
        { title: 'Estudio', image: 'Assets/Img/gallery-5.png' },
        { title: 'Escena', image: 'Assets/Img/gallery-6.png' },
        { title: 'Duo', image: 'Assets/Img/gallery-7.png' },
        { title: 'Sombras', image: 'Assets/Img/gallery-8.png' },
        { title: 'Otoño', image: 'Assets/Img/gallery-9.png' },
        { title: 'Silencio', image: 'Assets/Img/gallery-10.png' },
        { title: 'Guardián', image: 'Assets/Img/gallery-11.png' },
        { title: 'Mirada', image: 'Assets/Img/gallery-12.png' }
    ];

    // Generar HTML de cards
    let cardsHTML = '';

    artworks.forEach(artwork => {
        cardsHTML += `
            <div class="art-card">
                <div class="tone" style="background-image: url('${artwork.image}'); width: 100%; height: 100%; display: block;"></div>
                <div class="cap">${artwork.title}</div>
            </div>
        `;
    });

    // Insertar en el DOM
    galleryGrid.innerHTML = cardsHTML;
    console.log('✅ Se insertaron ' + artworks.length + ' cards');

    // Event listeners para chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            console.log('🏷️ Filtro aplicado:', this.textContent);
        });
    });
});


// ANIMACIONES
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // se anima solo una vez
        }
    });
}, {
    threshold: 0.,
    rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('section').forEach((el) => observer.observe(el));


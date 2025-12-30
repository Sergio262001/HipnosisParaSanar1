import { CONFIG } from './app-config.js';
import { fb } from './firebase-init.js';

// Crea modal si no existe
function ensureBookingModal(){
  let modal = document.getElementById('booking-modal');
  if(modal) return modal;

  modal = document.createElement('dialog');
  modal.id = 'booking-modal';
  modal.innerHTML = `
    <div class="booking-shell">
      <header class="booking-head">
        <h3>Reserva tu sesión</h3>
        <button type="button" class="booking-close" aria-label="Cerrar">✕</button>
      </header>
      <div class="booking-body">
        <iframe class="booking-frame" src="" title="Agendamiento" loading="lazy"></iframe>
        <p class="booking-fallback">
          Si no ves el calendario, <a id="booking-fallback-link" href="#" target="_blank" rel="noopener">ábrelo aquí</a>.
        </p>
      </div>
    </div>`;
  document.body.appendChild(modal);
  // Close
  modal.querySelector('.booking-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.close();
  });
  return modal;
}

export function bindBooking(){
  const modal = ensureBookingModal();
  const frame = modal.querySelector('.booking-frame');
  const fallback = modal.querySelector('#booking-fallback-link');
  fallback.href = CONFIG.SCHEDULER_URL;

  document.querySelectorAll('[data-book-now]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      fb.track('click_book_now', { page: location.pathname });
      frame.src = CONFIG.SCHEDULER_URL;
      if(typeof modal.showModal === 'function') modal.showModal();
      else window.open(CONFIG.SCHEDULER_URL, '_blank', 'noopener');
    });
  });
}

// WhatsApp FAB
export function mountWhatsAppFab(){
  if(!CONFIG.WHATSAPP) return;
  if(document.getElementById('whatsapp-fab')) return;
  const a = document.createElement('a');
  a.id = 'whatsapp-fab';
  a.href = CONFIG.WHATSAPP;
  a.target = '_blank';
  a.rel = 'noopener';
  a.title = 'Escríbeme por WhatsApp';
  a.textContent = '💬';
  document.body.appendChild(a);
}

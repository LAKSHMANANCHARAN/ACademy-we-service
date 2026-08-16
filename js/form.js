/**
 * CODEDEV ACADEMY - Form Handling & WhatsApp Integration
 * Handles Free Demo booking, lead generation, WhatsApp message generation,
 * validation, and confirmation modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMainDemoForm();
  initModalDemoForm();
  initQuickWhatsAppTriggers();
});

const ACADEMY_PHONE = "919363221866"; // International WhatsApp format

/* ==========================================================================
   1. Main Page Free Demo Booking Form
   ========================================================================== */
function initMainDemoForm() {
  const form = document.getElementById('mainDemoForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('demoName')?.value.trim();
    const phone = document.getElementById('demoPhone')?.value.trim();
    const email = document.getElementById('demoEmail')?.value.trim();
    const course = document.getElementById('demoCourse')?.value;
    const slot = document.getElementById('demoSlot')?.value || "Weekend Evening Batch";

    if (!name || !phone || !course) {
      alert('Please fill in your Name, Phone Number, and select a Course.');
      return;
    }

    // Phone validation
    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    processDemoBooking({ name, phone, email, course, slot });
    form.reset();
  });
}

/* ==========================================================================
   2. Modal Free Demo Booking Form
   ========================================================================== */
function initModalDemoForm() {
  const form = document.getElementById('modalDemoForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('modalDemoName')?.value.trim();
    const phone = document.getElementById('modalDemoPhone')?.value.trim();
    const email = document.getElementById('modalDemoEmail')?.value.trim();
    const course = document.getElementById('demoModalCourseSelect')?.value;
    const slot = document.getElementById('modalDemoSlot')?.value || "Weekday Evening Batch";

    if (!name || !phone || !course) {
      alert('Please fill in all required fields.');
      return;
    }

    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    window.closeDemoModal();
    processDemoBooking({ name, phone, email, course, slot });
    form.reset();
  });
}

/* ==========================================================================
   3. Process Booking & WhatsApp Payload
   ========================================================================== */
function processDemoBooking(data) {
  const textMessage = `Hello CodeDev Academy! 👋%0A%0AI want to book my *FREE FIRST 2 DEMO SESSIONS* and claim the *Early Bird Offer (₹499)*.%0A%0A👤 *Name:* ${encodeURIComponent(data.name)}%0A📱 *Phone:* ${encodeURIComponent(data.phone)}%0A✉️ *Email:* ${encodeURIComponent(data.email || 'Not provided')}%0A🎯 *Interested Course:* ${encodeURIComponent(data.course)}%0A⏰ *Preferred Slot:* ${encodeURIComponent(data.slot)}%0A%0APlease share the live class demo link and batch schedule with me. Thank you!`;

  const whatsappUrl = `https://wa.me/${ACADEMY_PHONE}?text=${textMessage}`;

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');

  // Trigger on-page confirmation modal
  showConfirmationModal(data);

  // Show Toast
  if (typeof window.showToast === 'function') {
    window.showToast(`Awesome, ${data.name}! Your Free Demo slot is reserved. Opening WhatsApp...`);
  }
}

/* ==========================================================================
   4. On-Page Booking Confirmation Modal
   ========================================================================== */
function showConfirmationModal(data) {
  let confirmModal = document.getElementById('bookingConfirmModal');
  if (!confirmModal) {
    confirmModal = document.createElement('div');
    confirmModal.id = 'bookingConfirmModal';
    confirmModal.className = 'modal-overlay';
    confirmModal.innerHTML = `
      <div class="modal-box" style="text-align: center; max-width: 500px;">
        <div class="modal-header" style="border-bottom:none; padding-bottom:0.5rem;">
          <div style="width:100%; display:flex; justify-content:flex-end;">
            <button class="modal-close-btn" onclick="document.getElementById('bookingConfirmModal').classList.remove('is-open')">✕</button>
          </div>
        </div>
        <div class="modal-body" style="padding-top:0;">
          <div style="width:72px; height:72px; background:#dcfce7; color:#16a34a; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.25rem; margin:0 auto 1.25rem auto;">
            ✓
          </div>
          <h3 style="font-size:1.6rem; color:#0f172a; margin-bottom:0.5rem;">Demo Booking Confirmed!</h3>
          <p style="color:#475569; margin-bottom:1.5rem;">
            Congratulations <strong id="confirmStudentName" style="color:#0f172a;"></strong>! Your seat for the <strong style="color:#4f46e5;">FREE FIRST 2 DEMO SESSIONS</strong> in <strong id="confirmCourseName" style="color:#0f172a;"></strong> is reserved at the special <span style="color:#ef4444; font-weight:800;">₹499 Early Bird Rate</span>.
          </p>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; text-align:left; margin-bottom:1.5rem;">
            <p style="font-size:0.88rem; color:#0f172a; margin-bottom:0.4rem;"><strong>What happens next?</strong></p>
            <ul style="font-size:0.85rem; color:#475569; padding-left:1.2rem; display:flex; flex-direction:column; gap:0.35rem;">
              <li>Our team will share the Google Meet / Zoom class link via WhatsApp.</li>
              <li>You will receive study resources and meeting reminders.</li>
              <li>Attend the 2 live demo sessions with zero risk!</li>
            </ul>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <a id="confirmWhatsappLink" href="https://wa.me/919363221866" target="_blank" class="btn btn-whatsapp" style="width:100%;">
              <span>💬</span> Chat with Us on WhatsApp
            </a>
            <button class="btn btn-outline" onclick="document.getElementById('bookingConfirmModal').classList.remove('is-open')" style="width:100%;">
              Done & Return to Website
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);

    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) confirmModal.classList.remove('is-open');
    });
  }

  const nameEl = document.getElementById('confirmStudentName');
  const courseEl = document.getElementById('confirmCourseName');
  if (nameEl) nameEl.textContent = data.name;
  if (courseEl) courseEl.textContent = data.course;

  confirmModal.classList.add('is-open');
}

/* ==========================================================================
   5. Quick WhatsApp Triggers for Specific Courses
   ========================================================================== */
function initQuickWhatsAppTriggers() {
  const triggers = document.querySelectorAll('.whatsapp-course-enroll');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-course-name') || 'Programming Course';
      const msg = `Hi CodeDev Academy! I am interested in enrolling for *${courseName}* with the *Early Bird Offer of ₹499* (instead of ₹3000) and attending the *Free 2 Demo Sessions*. Please guide me with enrollment!`;
      const url = `https://wa.me/${ACADEMY_PHONE}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  });
}

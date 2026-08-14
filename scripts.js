// i18n, cookie consent, modal booking, counters, and interactions
(function(){
  const html = document.documentElement;
  const LANG_KEY = 'saada_lang';
  const COOKIE_KEY = 'saada_consent';

  // Language toggle (simple)
  const langToggle = document.getElementById('lang-toggle');
  function setLang(lang){
    const toggles = Array.from(document.querySelectorAll('.lang-toggle-btn'));
    if(lang === 'en'){
      html.lang = 'en'; html.dir = 'ltr';
      Array.from(document.querySelectorAll('[data-lang]')).forEach(el=> el.hidden = el.getAttribute('data-lang') !== 'en');
      toggles.forEach(t=> t.textContent = 'AR');
      localStorage.setItem(LANG_KEY,'en');
    } else {
      html.lang = 'ar'; html.dir = 'rtl';
      Array.from(document.querySelectorAll('[data-lang]')).forEach(el=> el.hidden = el.getAttribute('data-lang') !== 'ar');
      toggles.forEach(t=> t.textContent = 'EN');
      localStorage.setItem(LANG_KEY,'ar');
    }
  }
  if(langToggle) langToggle.addEventListener('click', ()=> setLang(html.lang==='ar'?'en':'ar'));
  setLang(localStorage.getItem(LANG_KEY) || 'ar');

  // Cookie consent
  const consentEl = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  if(consentEl){
    if(localStorage.getItem(COOKIE_KEY)) consentEl.style.display='none';
    if(acceptBtn) acceptBtn.addEventListener('click', ()=>{ localStorage.setItem(COOKIE_KEY,'1'); consentEl.style.display='none'; });
  }

  // Formspree endpoint (set your form ID here). Leave empty to use mailto fallback.
  // Formspree endpoint: replace with your real endpoint. For this project it's already set.
  // Example: https://formspree.io/f/abcdxyz
  // If left empty the code will fall back to opening the user's mail client.
  const FORM_ENDPOINT = 'https://formspree.io/f/mzepvkyp';

  // Modal booking
  const modal = document.getElementById('booking-modal');
  const openBtns = [document.getElementById('open-booking'), document.getElementById('open-booking-2')].filter(Boolean);
  const bookingForm = document.getElementById('booking-form');
  let currentStep = 1;

  function openModal(prefill){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
    document.body.style.overflow='hidden';
    if(prefill) {
      const sel = bookingForm.querySelector('select[name="service"]');
      if(sel) sel.value = prefill;
    }
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('open');
    document.body.style.overflow='';
    // reset steps
    Array.from(bookingForm.querySelectorAll('.form-step')).forEach((el,i)=> el.hidden = i!==0);
    currentStep = 1;
  }
  openBtns.forEach(b => b.addEventListener('click', ()=> openModal()));
  const openModalBtn = document.getElementById('open-booking-modal');
  if(openModalBtn) openModalBtn.addEventListener('click', ()=> openModal());
  
  // Toast notification helper
  function showToast(message, duration = 4000){
    let toast = document.getElementById('toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), duration);
  }
  // Header scroll effect: add .scrolled when page is scrolled
  const headerEl = document.querySelector('.site-header');
  function updateHeaderOnScroll(){
    if(!headerEl) return;
    if(window.scrollY > 12) headerEl.classList.add('scrolled');
    else headerEl.classList.remove('scrolled');
  }
  window.addEventListener('scroll', updateHeaderOnScroll, {passive:true});
  // init
  updateHeaderOnScroll();
  modal && modal.addEventListener('click', (e)=>{ if(e.target.dataset.close !== undefined) closeModal(); });
  modal && modal.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click', closeModal));

  // Mobile menu handling
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  function openMobileMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    if(navToggle) navToggle.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    if(navToggle) navToggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  if(navToggle) navToggle.addEventListener('click', ()=>{ if(mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu(); else openMobileMenu(); });
  if(mobileMenu){
    mobileMenu.addEventListener('click', (e)=>{ if(e.target.dataset.close !== undefined) closeMobileMenu(); });
    mobileMenu.querySelectorAll('.mobile-nav .nav-link').forEach(a=> a.addEventListener('click', ()=> closeMobileMenu()));
    mobileMenu.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', closeMobileMenu));
  }
  const langToggleMobile = document.getElementById('lang-toggle-mobile');
  if(langToggleMobile) langToggleMobile.addEventListener('click', ()=> setLang(html.lang==='ar'?'en':'ar'));
  const mobileBookBtn = document.getElementById('mobile-book-btn');
  if(mobileBookBtn) mobileBookBtn.addEventListener('click', ()=> closeMobileMenu());

  // Privacy modal handling
  const privacyModal = document.getElementById('privacy-modal');
  document.querySelectorAll('.privacy-open').forEach(link=> link.addEventListener('click', (e)=>{ e.preventDefault(); if(!privacyModal) return; privacyModal.classList.add('open'); privacyModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }));
  if(privacyModal){
    privacyModal.addEventListener('click', (e)=>{ if(e.target.dataset.close !== undefined) { privacyModal.classList.remove('open'); privacyModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } });
    privacyModal.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', ()=>{ privacyModal.classList.remove('open'); privacyModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }));
  }

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  function updateBackToTop(){ if(!backToTop) return; if(window.scrollY > 240) backToTop.classList.add('show'); else backToTop.classList.remove('show'); }
  window.addEventListener('scroll', updateBackToTop, {passive:true});
  updateBackToTop();
  if(backToTop) backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Close modals/drawers on ESC key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' || e.key === 'Esc'){
      try{ if(privacyModal && privacyModal.classList.contains('open')){ privacyModal.classList.remove('open'); privacyModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } }catch(e){}
      try{ if(modal && modal.classList.contains('open')) closeModal(); }catch(e){}
      try{ if(mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu(); }catch(e){}
    }
  });

  // Step navigation
  if(bookingForm){
    bookingForm.addEventListener('click', (e)=>{
      if(e.target.matches('[data-next]')){
        const steps = bookingForm.querySelectorAll('.form-step');
        steps[currentStep-1].hidden = true;
        steps[currentStep].hidden = false;
        currentStep = Math.min(steps.length, currentStep+1);
      }
      if(e.target.matches('[data-prev]')){
        const steps = bookingForm.querySelectorAll('.form-step');
        steps[currentStep-1].hidden = true;
        steps[currentStep-2].hidden = false;
        currentStep = Math.max(1, currentStep-1);
      }
    });

    bookingForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(bookingForm);
      const data = Object.fromEntries(fd.entries());
      // If Formspree endpoint configured, POST JSON
      if(FORM_ENDPOINT && FORM_ENDPOINT.includes('formspree.io')){
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json','Content-Type':'application/json' },
          body: JSON.stringify({
            name: data.name || '',
            phone: data.phone || '',
            service: data.service || '',
            datetime: data.datetime || '',
            message: data.message || ''
          })
        }).then(r=>{
          if(r.ok){
            console.log('Formspree submission success', r);
            showToast(html.lang==='ar' ? 'شكراً! تم استلام طلب الحجز وسنتواصل معك.' : 'Thank you! Your appointment request has been received.');
            try{ bookingForm.reset(); }catch(e){}
            closeModal();
          } else {
            console.warn('Formspree returned non-OK status', r);
            showToast(html.lang==='ar' ? 'حدث خطأ. سيتم استخدام البريد الإلكتروني كبديل.' : 'Something went wrong; falling back to email.');
            // fallback to mailto
            const to = 'info@alsaada-clinic.example';
            const subject = encodeURIComponent('[حجز موعد] ' + (data.name||''));
            const body = encodeURIComponent(`الاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${data.datetime || ''}\nملاحظات: ${data.message || ''}`);
            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
            closeModal();
          }
        }).catch(err=>{
          console.error('Formspree submission error', err);
          const to = 'info@alsaada-clinic.example';
          const subject = encodeURIComponent('[حجز موعد] ' + (data.name||''));
          const body = encodeURIComponent(`الاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${data.datetime || ''}\nملاحظات: ${data.message || ''}`);
          window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
      } else {
        // Mailto fallback
        const to = 'info@alsaada-clinic.example';
        const subject = encodeURIComponent('[حجز موعد] ' + (data.name||''));
        const body = encodeURIComponent(`الاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${data.datetime || ''}\nملاحظات: ${data.message || ''}`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        closeModal();
      }
    });
  }

  // Service cards: clicking opens modal with prefilled service
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const service = card.dataset.service || card.querySelector('h3')?.textContent;
      openModal(service);
    });
  });

  // Inline booking form (visible card) handling
  const bookingFormInline = document.getElementById('booking-form-inline');
  if(bookingFormInline){
    bookingFormInline.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(bookingFormInline);
      const data = Object.fromEntries(fd.entries());
      if(FORM_ENDPOINT && FORM_ENDPOINT.includes('formspree.io')){
        fetch(FORM_ENDPOINT, {
          method:'POST',
          headers:{'Accept':'application/json','Content-Type':'application/json'},
          body:JSON.stringify({name:data.name||'',phone:data.phone||'',service:data.service||'',datetime:data.datetime||''})
        }).then(r=>{
          if(r.ok){
            console.log('Inline Formspree submission success', r);
            showToast(html.lang==='ar' ? 'شكراً! تم استلام طلب الحجز وسنتواصل معك.' : 'Thank you! Your appointment request has been received.');
            bookingFormInline.reset();
          } else {
            console.warn('Inline Formspree non-OK', r);
            throw new Error('Formspree error');
          }
        }).catch(()=>{
          const to = 'info@alsaada-clinic.example';
          const subject = encodeURIComponent('[حجز موعد] ' + (data.name||''));
          const body = encodeURIComponent(`الاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${data.datetime || ''}`);
          window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
      } else {
        const to = 'info@alsaada-clinic.example';
        const subject = encodeURIComponent('[حجز موعد] ' + (data.name||''));
        const body = encodeURIComponent(`الاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتاريخ: ${data.datetime || ''}`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      }
    });
  }

  // Counters animation
  function animateCounters(){
    document.querySelectorAll('.stat-number').forEach(el=>{
      const target = +el.dataset.target || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const id = setInterval(()=>{
        current += step;
        if(current >= target){ el.textContent = target; clearInterval(id); }
        else el.textContent = current;
      }, 15);
    });
  }
  // Trigger counters when visible
  const trustSection = document.getElementById('trust');
  if(trustSection){
    const obs = new IntersectionObserver((entries, o)=>{
      entries.forEach(ent=>{ if(ent.isIntersecting){ animateCounters(); o.disconnect(); } });
    }, {threshold:0.4});
    obs.observe(trustSection);
  }

})();

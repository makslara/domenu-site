/* DoMenu landing */
(function () {
  // Куда слать заявки «сообщить о запуске».
  // Пусто — письмо открывается в почтовом клиенте.
  // Впишите сюда endpoint (Formspree, Cloudflare Worker и т.п.) — и форма начнёт отправлять его фоном.
  var SIGNUP_ENDPOINT = '';
  var CONTACT = 'studiosernik@gmail.com';

  // липкая шапка
  var top = document.querySelector('.top');
  if (top) {
    var onScroll = function () { top.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // появление блоков
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // запомнить выбранный язык
  document.querySelectorAll('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('domenu-lang', a.getAttribute('data-lang')); } catch (e) {}
    });
  });

  // форма «сообщить о запуске»
  document.querySelectorAll('form.signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type=email]');
      var email = (input && input.value || '').trim();
      if (!email) return;
      if (SIGNUP_ENDPOINT) {
        fetch(SIGNUP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: email, lang: document.documentElement.lang, source: 'landing' })
        }).catch(function () {});
      } else {
        var subject = encodeURIComponent(form.getAttribute('data-subject') || 'DoMenu');
        var body = encodeURIComponent((form.getAttribute('data-body') || '') + '\n\n' + email);
        window.location.href = 'mailto:' + CONTACT + '?subject=' + subject + '&body=' + body;
      }
      form.classList.add('sent');
    });
  });
})();

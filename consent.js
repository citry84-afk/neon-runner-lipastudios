(function(){
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

  // Default to denied until user chooses
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  const CHOICE_KEY = 'lipa_consent_v2';
  const saved = (function(){ try { return JSON.parse(localStorage.getItem(CHOICE_KEY)||'null'); } catch(e){ return null; } })();
  if (saved && saved.status) {
    apply(saved.status);
    return;
  }

  // Banner UI
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:100000;background:rgba(0,0,20,.95);border-top:2px solid #00ffff;color:#e8f6ff;padding:14px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial,sans-serif;';
  bar.innerHTML = '<span style="max-width:680px;text-align:center">Usamos Google Analytics y Google AdSense. Puedes aceptar o rechazar. Más info en <a href="/privacy.html" style="color:#00ffff">Privacidad</a>.</span>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
    '<button id="lipa-accept" style="background:#00ffff;color:#000;padding:10px 16px;border:none;border-radius:8px;font-weight:700;cursor:pointer">ACEPTAR</button>'+
    '<button id="lipa-reject" style="background:#444;color:#fff;padding:10px 16px;border:1px solid #666;border-radius:8px;font-weight:700;cursor:pointer">RECHAZAR</button>'+
    '</div>';
  document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(bar); });

  // Mini footer contacto (aparece en todos los sitios)
  document.addEventListener('DOMContentLoaded', function(){
    try {
      var mini = document.createElement('div');
      mini.className = 'site-mini-footer';
      mini.style.cssText = 'position:fixed;bottom:6px;right:8px;background:rgba(0,0,0,0.6);border:1px solid #00ffff;border-radius:8px;padding:6px 10px;font:12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;z-index:10000';
      mini.innerHTML = '<span style="color:#00ffff">Contacto:</span> <a href="mailto:lipastudios4@gmail.com" style="color:#ffff00;text-decoration:none">lipastudios4@gmail.com</a>';
      document.body.appendChild(mini);
    } catch(e) {}
  });

  function store(status){ try { localStorage.setItem(CHOICE_KEY, JSON.stringify({ status, ts: Date.now() })); } catch(e){} }

  function apply(status){
    const granted = status === 'granted';
    gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied'
    });
  }

  function choose(status){
    apply(status);
    store(status);
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
  }

  bar.addEventListener('click', function(e){
    if (e.target && e.target.id === 'lipa-accept') choose('granted');
    if (e.target && e.target.id === 'lipa-reject') choose('denied');
  });
})();




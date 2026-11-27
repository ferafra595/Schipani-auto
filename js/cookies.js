(() => {
  const key = 'schipani-cookie-preferences-v1';
  const lifetime = 184 * 24 * 60 * 60 * 1000;

  let preference;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (typeof saved?.maps === 'boolean' && saved.expiresAt > Date.now()) {
      preference = saved.maps;
    }
  } catch {
    // The controls still work for the current page if storage is unavailable.
  }

  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-labelledby', 'cookie-banner-title');
  banner.innerHTML = `
    <h2 id="cookie-banner-title" tabindex="-1">Cookie e contenuti esterni</h2>
    <p>Puoi scegliere se caricare la mappa incorporata di Google Maps, che può usare cookie. Il resto del sito è accessibile in entrambi i casi.</p>
    <p><a href="cookie.html">Informativa cookie</a> · <a href="privacy.html">Informativa privacy</a></p>
    <div class="cookie-actions">
      <button class="button ghost" type="button" data-map-choice="off">Continua senza mappa</button>
      <button class="button ghost" type="button" data-map-choice="on">Consenti Google Maps</button>
    </div>`;
  banner.hidden = preference !== undefined;
  document.body.append(banner);

  const map = document.querySelector('[data-map]');
  const placeholder = map?.querySelector('[data-map-placeholder]');
  const template = map?.querySelector('[data-map-template]');
  let opener;

  function updateMap() {
    if (!map) return;
    const iframe = map.querySelector('iframe');
    placeholder.hidden = preference === true;
    if (preference === true && !iframe) map.append(template.content.cloneNode(true));
    if (preference !== true) iframe?.remove();
  }

  const settings = document.querySelectorAll('[data-cookie-settings]');
  settings.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      opener = button;
      banner.hidden = false;
      banner.querySelector('h2').focus();
    });
  });

  banner.querySelectorAll('[data-map-choice]').forEach(button => {
    button.addEventListener('click', () => {
      preference = button.dataset.mapChoice === 'on';
      try {
        localStorage.setItem(key, JSON.stringify({maps: preference, expiresAt: Date.now() + lifetime}));
      } catch {
        // Apply the choice in memory when storage is unavailable.
      }
      updateMap();
      banner.hidden = true;
      const focusTarget = opener?.getClientRects().length
        ? opener
        : [...settings].find(control => control.getClientRects().length);
      focusTarget?.focus({preventScroll: true});
      opener = undefined;
    });
  });

  updateMap();
})();

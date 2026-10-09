/* ==========================================================================
   Catalogo prodotti – logica di pagina
   I dati sono in data/prodotti.js (oggetto globale CATALOGO).
   ========================================================================== */
(function () {
  'use strict';

  var DATI = window.CATALOGO;
  if (!DATI || !Array.isArray(DATI.prodotti)) {
    document.getElementById('elenco').innerHTML =
      '<p class="vuoto">Dati non trovati: controlla che il file <code>data/prodotti.js</code> esista e definisca <code>window.CATALOGO</code>.</p>';
    return;
  }

  var PRODOTTI = DATI.prodotti.map(function (p, i) { p._ordine = i; return p; });
  var CATEGORIE = DATI.categorie || [];
  var STATI = { in_commercio: 'In commercio', in_lancio: 'In lancio' };

  // ----- riferimenti DOM ----------------------------------------------------
  var $ = function (id) { return document.getElementById(id); };
  var elElenco = $('elenco');
  var elVuoto = $('vuoto');
  var elConteggio = $('conteggio');
  var elChips = $('chip-categorie');
  var elRicerca = $('ricerca');
  var elStato = $('filtro-stato');
  var elOrdina = $('ordina');
  var elDialog = $('dettaglio');
  var elDettaglio = $('dettaglio-contenuto');
  var elStampa = $('stampa-dettagli');
  var elToggleRev = $('toggle-revisione');

  var stato = { categoria: '', testo: '', stato: '', ordina: 'catalogo' };
  var ultimoFocus = null;

  // ----- utilità -------------------------------------------------------------
  function h(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function lista(arr) { return Array.isArray(arr) ? arr.filter(function (x) { return x != null && String(x).trim() !== ''; }) : []; }
  function nomeCategoria(id) {
    var c = CATEGORIE.filter(function (c) { return c.id === id; })[0];
    return c ? c.nome : (id ? id : 'Senza categoria');
  }
  function immagini(p) {
    if (Array.isArray(p.immagini)) return lista(p.immagini);
    if (p.immagine) return [p.immagine];
    return [];
  }
  function normalizza(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function testoRicerca(p) {
    return normalizza([
      p.nome, p.sottotitolo, p.claim, p.tipologia, nomeCategoria(p.categoria),
      lista(p.composizione).join(' '), lista(p.formati).join(' '),
      lista(p.caratteristiche).join(' '), p.descrizione, lista(p.indicazioni).join(' ')
    ].join(' '));
  }
  function debounce(fn, ms) {
    var t; return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); };
  }

  // ----- intestazione e piè di pagina ---------------------------------------
  (function intestazione() {
    var a = DATI.azienda || {};
    if (a.nome) {
      $('azienda-nome').textContent = a.nome;
      document.title = 'Catalogo prodotti – ' + a.nome;
      var logo = document.querySelector('.marchio-logo');
      if (logo) logo.textContent = a.nome.trim().charAt(0).toUpperCase();
    }
    if (a.sottotitolo) $('azienda-sotto').textContent = a.sottotitolo;
    if (DATI.intro && DATI.intro.titolo) $('intro-titolo').textContent = DATI.intro.titolo;
    if (DATI.intro && DATI.intro.testo) $('intro-testo').textContent = DATI.intro.testo;
    var pie = [];
    if (a.nome) pie.push(a.nome);
    if (a.indirizzo) pie.push(a.indirizzo);
    if (a.sito) pie.push(a.sito);
    if (a.email) pie.push(a.email);
    if (DATI.aggiornato) pie.push('Dati aggiornati al ' + DATI.aggiornato);
    $('pie-testo').textContent = pie.join(' · ');
  })();

  // ----- chip categorie ----------------------------------------------------
  function disegnaChips() {
    var conteggi = {};
    PRODOTTI.forEach(function (p) { var k = p.categoria || ''; conteggi[k] = (conteggi[k] || 0) + 1; });
    var voci = [{ id: '', nome: 'Tutti', n: PRODOTTI.length }];
    CATEGORIE.forEach(function (c) { if (conteggi[c.id]) voci.push({ id: c.id, nome: c.nome, n: conteggi[c.id] }); });
    if (conteggi['']) voci.push({ id: '__senza__', nome: 'Senza categoria', n: conteggi[''] });
    elChips.innerHTML = voci.map(function (v) {
      var attivo = (v.id === stato.categoria) || (v.id === '' && stato.categoria === '');
      return '<button type="button" class="chip" data-cat="' + h(v.id) + '" aria-pressed="' + attivo + '">' +
        h(v.nome) + ' <span class="n">' + v.n + '</span></button>';
    }).join('');
  }
  elChips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    stato.categoria = b.getAttribute('data-cat');
    disegnaChips(); disegna();
  });

  // ----- filtro, ordinamento, rendering griglia -----------------------------
  function filtrati() {
    var q = normalizza(stato.testo).trim();
    var out = PRODOTTI.filter(function (p) {
      if (stato.categoria === '__senza__' && p.categoria) return false;
      if (stato.categoria && stato.categoria !== '__senza__' && p.categoria !== stato.categoria) return false;
      if (stato.stato && (p.stato || 'in_commercio') !== stato.stato) return false;
      if (q && testoRicerca(p).indexOf(q) === -1) return false;
      return true;
    });
    if (stato.ordina === 'nome') out.sort(function (a, b) { return String(a.nome).localeCompare(String(b.nome), 'it'); });
    else if (stato.ordina === 'anno') out.sort(function (a, b) { return (a.anno_lancio || 9999) - (b.anno_lancio || 9999) || a._ordine - b._ordine; });
    else out.sort(function (a, b) { return a._ordine - b._ordine; });
    return out;
  }

  function scheda(p) {
    var imgs = immagini(p);
    var figura = imgs.length
      ? '<img src="' + h(imgs[0]) + '" alt="Confezione di ' + h(p.nome) + '" loading="lazy">'
      : '<span class="segnaposto">Immagine non ancora disponibile</span>';
    var meta = [p.tipologia, lista(p.formati)[0]].filter(Boolean).join(' · ');
    var daVer = lista(p.da_verificare).length;
    return '<button type="button" class="scheda" data-id="' + h(p.id) + '" aria-haspopup="dialog">' +
      '<div class="scheda-figura">' + figura + '</div>' +
      ((p.stato === 'in_lancio') ? '<span class="etichetta etichetta-lancio">In lancio</span>' : '') +
      (p.anno_lancio ? '<span class="etichetta-anno">' + h(p.anno_lancio) + '</span>' : '') +
      '<div class="scheda-corpo">' +
        '<span class="scheda-cat">' + h(nomeCategoria(p.categoria)) + '</span>' +
        '<h2 class="scheda-nome">' + h(p.nome) + (p.sottotitolo ? ' <small>' + h(p.sottotitolo) + '</small>' : '') + '</h2>' +
        (p.claim ? '<p class="scheda-claim">' + h(p.claim) + '</p>' : '') +
        (meta ? '<p class="scheda-meta">' + h(meta) + '</p>' : '') +
        (daVer ? '<span class="tag-revisione">Da verificare: ' + daVer + '</span>' : '') +
      '</div>' +
    '</button>';
  }

  function disegna() {
    var ris = filtrati();
    elElenco.innerHTML = ris.map(scheda).join('');
    elVuoto.hidden = ris.length > 0;
    elConteggio.textContent = ris.length === PRODOTTI.length
      ? PRODOTTI.length + ' prodotti'
      : ris.length + ' di ' + PRODOTTI.length + ' prodotti';
  }

  elElenco.addEventListener('click', function (e) {
    var b = e.target.closest('.scheda'); if (!b) return;
    apri(b.getAttribute('data-id'));
  });

  elRicerca.addEventListener('input', debounce(function () { stato.testo = elRicerca.value; disegna(); }, 120));
  elStato.addEventListener('change', function () { stato.stato = elStato.value; disegna(); });
  elOrdina.addEventListener('change', function () { stato.ordina = elOrdina.value; disegna(); });
  $('azzera').addEventListener('click', function () {
    stato = { categoria: '', testo: '', stato: '', ordina: stato.ordina };
    elRicerca.value = ''; elStato.value = '';
    disegnaChips(); disegna(); elRicerca.focus();
  });

  // ----- scheda di dettaglio -------------------------------------------------
  function sezione(titolo, corpo, classe) {
    if (!corpo) return '';
    return '<section class="dett-sezione ' + (classe || '') + '"><h3>' + h(titolo) + '</h3>' + corpo + '</section>';
  }
  function ul(arr, classe) {
    var l = lista(arr); if (!l.length) return '';
    return '<ul class="' + (classe || '') + '">' + l.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>';
  }
  function paragrafi(arr) {
    var l = lista(Array.isArray(arr) ? arr : [arr]); if (!l.length) return '';
    return l.map(function (x) { return '<p>' + h(x) + '</p>'; }).join('');
  }

  function contenutoDettaglio(p) {
    var imgs = immagini(p);
    var figura = imgs.length
      ? '<img src="' + h(imgs[0]) + '" alt="Confezione di ' + h(p.nome) + '" id="dett-img-principale">'
      : '<span class="segnaposto">Immagine non ancora disponibile</span>';
    var galleria = imgs.length > 1
      ? '<div class="dett-galleria">' + imgs.map(function (src, i) {
          return '<img src="' + h(src) + '" alt="Immagine ' + (i + 1) + ' di ' + h(p.nome) + '" data-src="' + h(src) + '" tabindex="0">';
        }).join('') + '</div>'
      : '';
    var badge = [];
    badge.push('<li class="' + (p.stato === 'in_lancio' ? 'lancio' : 'commercio') + '">' +
      h(STATI[p.stato] || STATI.in_commercio) + (p.anno_lancio ? ' · ' + h(p.anno_lancio) : '') + '</li>');
    if (p.tipologia) badge.push('<li>' + h(p.tipologia) + '</li>');
    lista(p.caratteristiche).forEach(function (c) { badge.push('<li>' + h(c) + '</li>'); });

    var fonti = lista(p.fonti_web).map(function (f) {
      if (typeof f === 'string') return '<li><a href="' + h(f) + '" target="_blank" rel="noopener">' + h(f) + '</a></li>';
      return '<li><a href="' + h(f.url) + '" target="_blank" rel="noopener">' + h(f.titolo || f.url) + '</a>' +
        (f.ufficiale ? ' <em>(fonte ufficiale)</em>' : '') + '</li>';
    }).join('');

    return '<div class="dett-testa">' +
      '<div><div class="dett-figura">' + figura + '</div>' + galleria + '</div>' +
      '<div>' +
        '<p class="dett-cat">' + h(nomeCategoria(p.categoria)) + '</p>' +
        '<h2 class="dett-titolo" id="dettaglio-titolo">' + h(p.nome) + (p.sottotitolo ? '<small>' + h(p.sottotitolo) + '</small>' : '') + '</h2>' +
        (p.claim ? '<p class="dett-claim">' + h(p.claim) + '</p>' : '') +
        '<ul class="dett-badge">' + badge.join('') + '</ul>' +
        (p.descrizione ? '<section class="dett-sezione">' + paragrafi(p.descrizione) + '</section>' : '') +
      '</div>' +
    '</div>' +
    sezione('Composizione', ul(p.composizione)) +
    sezione('Formati e confezioni', ul(p.formati)) +
    sezione('Indicazioni', paragrafi(p.indicazioni)) +
    sezione('Modo d’uso', paragrafi(p.modo_uso)) +
    sezione('Avvertenze', paragrafi(p.avvertenze)) +
    sezione('Approfondimento', paragrafi(p.testi_slide)) +
    sezione('Riferimenti bibliografici', ul(p.riferimenti), 'riferimenti') +
    (fonti ? sezione('Fonti', '<ul>' + fonti + '</ul>', 'riferimenti') : '') +
    '<div class="solo-revisione">' +
      sezione('Note di lavorazione', (
        (lista(p.da_verificare).length ? '<p><strong>Da verificare:</strong></p>' + ul(p.da_verificare) : '<p>Nessun campo segnalato da verificare.</p>') +
        (p.testo_pack ? '<p style="margin-top:8px"><strong>Testo letto sulla confezione:</strong> ' + h(p.testo_pack) + '</p>' : '') +
        (p.pagina_scansione ? '<p>Fonte: pagina ' + h(p.pagina_scansione) + ' della <a href="assets/scan/presentazione-prodotti-scansione.pdf" target="_blank" rel="noopener">scansione originale</a>. ' +
          'Modifica i dati in <code>data/prodotti.js</code> (id <code>' + h(p.id) + '</code>).</p>' : '')
      ), 'revisione-box') +
    '</div>';
  }

  function apri(id) {
    var p = PRODOTTI.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    ultimoFocus = document.activeElement;
    elDettaglio.innerHTML = contenutoDettaglio(p);
    if (typeof elDialog.showModal === 'function') elDialog.showModal();
    else elDialog.setAttribute('open', '');
    elDialog.querySelector('.dettaglio-interno').scrollTop = 0;
    $('chiudi').focus();
    if (history.replaceState) history.replaceState(null, '', '#prodotto=' + encodeURIComponent(id));
  }
  function chiudi() {
    if (elDialog.open) elDialog.close(); else elDialog.removeAttribute('open');
  }
  elDialog.addEventListener('close', function () {
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (ultimoFocus && ultimoFocus.focus) ultimoFocus.focus();
  });
  $('chiudi').addEventListener('click', chiudi);
  elDialog.addEventListener('click', function (e) { if (e.target === elDialog) chiudi(); });
  elDettaglio.addEventListener('click', function (e) {
    var t = e.target.closest('.dett-galleria img'); if (!t) return;
    var principale = $('dett-img-principale'); if (principale) principale.src = t.getAttribute('data-src');
  });
  elDettaglio.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.dett-galleria img')) { e.preventDefault(); e.target.click(); }
  });

  // ----- modalità revisione --------------------------------------------------
  function impostaRevisione(on) {
    document.body.classList.toggle('revisione', !!on);
    elToggleRev.checked = !!on;
    try { localStorage.setItem('catalogo-revisione', on ? '1' : '0'); } catch (err) { /* ignora */ }
  }
  elToggleRev.addEventListener('change', function () { impostaRevisione(elToggleRev.checked); });
  (function () {
    var on = false;
    try { on = localStorage.getItem('catalogo-revisione') === '1'; } catch (err) { /* ignora */ }
    if (/[?&]revisione\b/.test(location.search)) on = true;
    impostaRevisione(on);
  })();

  // ----- stampa ---------------------------------------------------------------
  function schedaStampa(p) {
    var imgs = immagini(p);
    return '<article class="stampa-scheda">' +
      '<div>' + (imgs.length ? '<img src="' + h(imgs[0]) + '" alt="">' : '') + '</div>' +
      '<div>' +
        '<div class="cat">' + h(nomeCategoria(p.categoria)) + (p.anno_lancio ? ' · ' + h(STATI[p.stato] || STATI.in_commercio) + ' ' + h(p.anno_lancio) : '') + '</div>' +
        '<h2>' + h(p.nome) + (p.sottotitolo ? ' <small>' + h(p.sottotitolo) + '</small>' : '') + '</h2>' +
        (p.claim ? '<p class="claim">' + h(p.claim) + '</p>' : '') +
        (p.tipologia ? '<p>' + h(p.tipologia) + '</p>' : '') +
        (p.descrizione ? paragrafi(p.descrizione) : '') +
        (lista(p.composizione).length ? '<h3>Composizione</h3>' + ul(p.composizione) : '') +
        (lista(p.formati).length ? '<h3>Formati</h3>' + ul(p.formati) : '') +
        (lista(p.caratteristiche).length ? '<h3>Caratteristiche</h3><p>' + h(lista(p.caratteristiche).join(' · ')) + '</p>' : '') +
        (lista(p.indicazioni).length ? '<h3>Indicazioni</h3>' + paragrafi(p.indicazioni) : '') +
        (lista(p.modo_uso).length ? '<h3>Modo d’uso</h3>' + paragrafi(p.modo_uso) : '') +
        (lista(p.da_verificare).length ? '<div class="solo-revisione"><h3>Da verificare</h3>' + ul(p.da_verificare) + '</div>' : '') +
      '</div>' +
    '</article>';
  }
  function preparaStampa() { elStampa.innerHTML = filtrati().map(schedaStampa).join(''); }
  $('btn-stampa').addEventListener('click', function () { preparaStampa(); window.print(); });
  window.addEventListener('beforeprint', preparaStampa);

  // ----- avvio ----------------------------------------------------------------
  disegnaChips();
  disegna();
  var m = /#prodotto=([^&]+)/.exec(location.hash);
  if (m) apri(decodeURIComponent(m[1]));
})();

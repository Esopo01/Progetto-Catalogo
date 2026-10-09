/* ==========================================================================
   Catalogo prodotti – logica di pagina
   I dati sono in data/prodotti.js (oggetto globale CATALOGO).
   ========================================================================== */
(function () {
  'use strict';

  var DATI = window.CATALOGO;
  if (!DATI || !Array.isArray(DATI.prodotti)) {
    document.getElementById('elenco').innerHTML =
      '<p class="vuoto">Impossibile leggere i dati del catalogo. Probabilmente nell\'ultima modifica a <code>data/prodotti.js</code> ' +
      'manca o avanza una virgola o una virgoletta: ricontrolla l\'ultimo prodotto modificato.' +
      (window.ERRORE_DATI ? ' <small>(' + String(window.ERRORE_DATI).replace(/[<>&]/g, '') + ')</small>' : '') + '</p>';
    return;
  }

  // ----- dati, resi tolleranti agli errori di battitura più comuni --------
  var idVisti = {};
  var PRODOTTI = DATI.prodotti
    .filter(function (p) { return p && typeof p === 'object'; })
    .map(function (p, i) {
      p._ordine = i;
      if (!p.id || typeof p.id !== 'string') p.id = 'prodotto-' + (i + 1);
      var base = p.id, n = 2;
      while (idVisti[p.id]) p.id = base + '-' + (n++);
      idVisti[p.id] = true;
      return p;
    });
  var CATEGORIE = Array.isArray(DATI.categorie)
    ? DATI.categorie.filter(function (c) { return c && typeof c === 'object' && c.id; })
    : [];
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
  var prodottoAperto = null;
  var apertoAlle = 0;

  // ----- utilità -------------------------------------------------------------
  function h(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function lista(v) {
    if (v == null) return [];
    if (!Array.isArray(v)) v = [v];
    return v.filter(function (x) { return x != null && String(x).trim() !== ''; });
  }
  function statoDi(p) {
    var s = String(p.stato || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
    return STATI[s] ? s : 'in_commercio';
  }
  function nomeCategoria(id) {
    var c = CATEGORIE.filter(function (c) { return c.id === id; })[0];
    return c ? c.nome : (id ? id : 'Senza categoria');
  }
  function immagini(p) {
    if (p.immagini != null) return lista(p.immagini);
    if (p.immagine) return lista(p.immagine);
    return [];
  }
  function urlSicuro(u) {
    u = String(u == null ? '' : u).trim();
    return /^https?:\/\//i.test(u) ? u : '';
  }
  function hostDi(u) {
    var m = /^https?:\/\/([^/?#]+)/i.exec(u);
    return m ? m[1] : u;
  }
  function normalizza(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function testoRicerca(p) {
    if (!p._ricerca) {
      p._ricerca = normalizza([
        p.nome, p.sottotitolo, p.claim, p.tipologia, nomeCategoria(p.categoria), p.descrizione,
        lista(p.composizione).join(' '), lista(p.formati).join(' '), lista(p.caratteristiche).join(' '),
        lista(p.indicazioni).join(' '), lista(p.modo_uso).join(' '), lista(p.avvertenze).join(' '),
        lista(p.testi_slide).join(' '), lista(p.riferimenti).join(' '), lista(p.codici).join(' ')
      ].join(' '));
    }
    return p._ricerca;
  }
  function debounce(fn, ms) {
    var t; return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); };
  }
  function sezione(titolo, corpo, classe) {
    if (!corpo) return '';
    return '<section class="dett-sezione ' + (classe || '') + '"><h3>' + h(titolo) + '</h3>' + corpo + '</section>';
  }
  function ul(arr, classe) {
    var l = lista(arr); if (!l.length) return '';
    return '<ul class="' + (classe || '') + '">' + l.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>';
  }
  function paragrafi(arr) {
    var l = lista(arr); if (!l.length) return '';
    return l.map(function (x) { return '<p>' + h(x) + '</p>'; }).join('');
  }
  function linkFonti(p) {
    return lista(p.fonti_web).map(function (f) {
      var url = urlSicuro(typeof f === 'string' ? f : f.url);
      var titolo = (typeof f === 'string') ? hostDi(url || f) : (f.titolo || hostDi(url || f.url || ''));
      var uff = (typeof f === 'object' && f.ufficiale) ? ' <em>(fonte ufficiale)</em>' : '';
      if (!url) return '<li>' + h(titolo) + uff + '</li>';
      return '<li><a href="' + h(url) + '" target="_blank" rel="noopener">' + h(titolo) +
        '<span class="sr-only"> (si apre in una nuova scheda)</span></a>' + uff + '</li>';
    }).join('');
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
    if (a.telefono) pie.push('Tel. ' + a.telefono);
    if (a.sito) pie.push(String(a.sito).replace(/^https?:\/\//, '').replace(/\/$/, ''));
    if (a.email) pie.push(a.email);
    if (DATI.aggiornato) pie.push('Ultimo aggiornamento: ' + DATI.aggiornato);
    $('pie-testo').textContent = pie.join(' · ');
  })();

  // ----- chip categorie ----------------------------------------------------
  function disegnaChips() {
    var conteggi = {};
    PRODOTTI.forEach(function (p) { var k = p.categoria || ''; conteggi[k] = (conteggi[k] || 0) + 1; });
    var voci = [{ id: '', nome: 'Tutti', n: PRODOTTI.length }];
    CATEGORIE.forEach(function (c) { if (conteggi[c.id]) voci.push({ id: c.id, nome: c.nome, n: conteggi[c.id] }); });
    Object.keys(conteggi).forEach(function (k) {
      if (k && !CATEGORIE.some(function (c) { return c.id === k; })) {
        voci.push({ id: k, nome: k + ' (categoria non definita)', n: conteggi[k] });
      }
    });
    if (conteggi['']) voci.push({ id: '__senza__', nome: 'Senza categoria', n: conteggi[''] });
    elChips.innerHTML = voci.map(function (v) {
      return '<button type="button" class="chip" data-cat="' + h(v.id) + '" aria-pressed="' + (v.id === stato.categoria) + '">' +
        h(v.nome) + ' <span class="n">' + v.n + '</span></button>';
    }).join('');
  }
  function aggiornaChips() {
    var chips = elChips.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].setAttribute('aria-pressed', String(chips[i].getAttribute('data-cat') === stato.categoria));
    }
  }
  elChips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    stato.categoria = b.getAttribute('data-cat');
    aggiornaChips(); disegna();
  });

  // ----- filtro, ordinamento, rendering griglia -----------------------------
  function filtrati() {
    var termini = normalizza(stato.testo).trim().split(/\s+/).filter(Boolean);
    var out = PRODOTTI.filter(function (p) {
      if (stato.categoria === '__senza__' && p.categoria) return false;
      if (stato.categoria && stato.categoria !== '__senza__' && p.categoria !== stato.categoria) return false;
      if (stato.stato && statoDi(p) !== stato.stato) return false;
      if (termini.length) {
        var t = testoRicerca(p);
        if (!termini.every(function (k) { return t.indexOf(k) !== -1; })) return false;
      }
      return true;
    });
    if (stato.ordina === 'nome') out.sort(function (a, b) { return String(a.nome).localeCompare(String(b.nome), 'it') || a._ordine - b._ordine; });
    else if (stato.ordina === 'anno') out.sort(function (a, b) { return (a.anno_lancio || 9999) - (b.anno_lancio || 9999) || a._ordine - b._ordine; });
    else out.sort(function (a, b) { return a._ordine - b._ordine; });
    return out;
  }

  function scheda(p) {
    var imgs = immagini(p);
    var figura = imgs.length
      ? '<img src="' + h(imgs[0]) + '" alt="" loading="lazy">'
      : '<span class="segnaposto">Immagine non ancora disponibile</span>';
    var meta = [p.tipologia, lista(p.formati)[0]].filter(Boolean).join(' · ');
    var daVer = lista(p.da_verificare).length;
    var st = statoDi(p);
    return '<article class="scheda" data-id="' + h(p.id) + '">' +
      '<div class="scheda-figura">' + figura + '</div>' +
      (st === 'in_lancio' ? '<span class="etichetta etichetta-lancio">In lancio</span>' : '') +
      (p.anno_lancio ? '<span class="etichetta-anno">' + h(p.anno_lancio) + '</span>' : '') +
      '<div class="scheda-corpo">' +
        '<span class="scheda-cat">' + h(nomeCategoria(p.categoria)) + '</span>' +
        '<h2 class="scheda-nome"><button type="button" class="scheda-apri" data-id="' + h(p.id) + '" aria-haspopup="dialog">' +
          h(p.nome) + (p.sottotitolo ? ' <small>' + h(p.sottotitolo) + '</small>' : '') + '</button></h2>' +
        (p.claim ? '<p class="scheda-claim">' + h(p.claim) + '</p>' : '') +
        (meta ? '<p class="scheda-meta">' + h(meta) + '</p>' : '') +
        (daVer ? '<span class="tag-revisione">Da verificare: ' + daVer + '</span>' : '') +
      '</div>' +
    '</article>';
  }

  function disegna() {
    var ris = filtrati();
    elElenco.innerHTML = ris.map(scheda).join('');
    elVuoto.hidden = ris.length > 0;
    var tot = PRODOTTI.length, parola = tot === 1 ? ' prodotto' : ' prodotti';
    elConteggio.textContent = ris.length === tot ? tot + parola : ris.length + ' di ' + tot + parola;
    preparaStampa(ris);
  }

  elElenco.addEventListener('click', function (e) {
    var a = e.target.closest('.scheda'); if (!a) return;
    apri(a.getAttribute('data-id'));
  });

  elRicerca.addEventListener('input', debounce(function () { stato.testo = elRicerca.value; disegna(); }, 120));
  elStato.addEventListener('change', function () { stato.stato = elStato.value; disegna(); });
  elOrdina.addEventListener('change', function () { stato.ordina = elOrdina.value; disegna(); });
  $('azzera').addEventListener('click', function () {
    stato = { categoria: '', testo: '', stato: '', ordina: stato.ordina };
    elRicerca.value = ''; elStato.value = '';
    aggiornaChips(); disegna(); elRicerca.focus();
  });

  // immagine mancante su disco: mostra il segnaposto invece dell'icona rotta
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    var cont = img.closest('.scheda-figura, .dett-figura');
    if (!cont) return;
    var s = document.createElement('span');
    s.className = 'segnaposto';
    s.textContent = 'Immagine non trovata';
    img.replaceWith(s);
  }, true);

  // ----- scheda di dettaglio -------------------------------------------------
  function contenutoDettaglio(p) {
    var imgs = immagini(p);
    var st = statoDi(p);
    var figura = imgs.length
      ? '<img src="' + h(imgs[0]) + '" alt="Confezione di ' + h(p.nome) + '" id="dett-img-principale">'
      : '<span class="segnaposto">Immagine non ancora disponibile</span>';
    var galleria = imgs.length > 1
      ? '<div class="dett-galleria" role="group" aria-label="Altre immagini">' + imgs.map(function (src, i) {
          return '<button type="button" class="dett-miniatura" data-src="' + h(src) + '" aria-pressed="' + (i === 0) + '"' +
            ' aria-label="Mostra immagine ' + (i + 1) + ' di ' + imgs.length + '"><img src="' + h(src) + '" alt=""></button>';
        }).join('') + '</div>'
      : '';
    var badge = [];
    badge.push('<li class="' + (st === 'in_lancio' ? 'lancio' : 'commercio') + '">' +
      h(STATI[st]) + (p.anno_lancio ? ' · ' + h(p.anno_lancio) : '') + '</li>');
    if (p.tipologia) badge.push('<li>' + h(p.tipologia) + '</li>');
    lista(p.caratteristiche).forEach(function (c) { badge.push('<li>' + h(c) + '</li>'); });
    var fonti = linkFonti(p);

    return '<div class="dett-testa">' +
      '<div><div class="dett-figura">' + figura + '</div>' + galleria + '</div>' +
      '<div>' +
        '<p class="dett-cat">' + h(nomeCategoria(p.categoria)) + '</p>' +
        '<h2 class="dett-titolo" id="dettaglio-titolo">' + h(p.nome) + (p.sottotitolo ? '<small>' + h(p.sottotitolo) + '</small>' : '') + '</h2>' +
        (p.claim ? '<p class="dett-claim">' + h(p.claim) + '</p>' : '') +
        '<ul class="dett-badge">' + badge.join('') + '</ul>' +
        (lista(p.descrizione).length ? '<section class="dett-sezione">' + paragrafi(p.descrizione) + '</section>' : '') +
      '</div>' +
    '</div>' +
    sezione('Composizione', ul(p.composizione)) +
    sezione('Formati e confezioni', ul(p.formati)) +
    sezione('Codici', ul(p.codici)) +
    sezione('Indicazioni', paragrafi(p.indicazioni)) +
    sezione("Modo d'uso", paragrafi(p.modo_uso)) +
    sezione('Avvertenze', paragrafi(p.avvertenze)) +
    sezione('Approfondimento', paragrafi(p.testi_slide)) +
    sezione('Riferimenti bibliografici', ul(p.riferimenti), 'riferimenti') +
    (fonti ? sezione('Fonti', '<ul>' + fonti + '</ul>', 'riferimenti') : '') +
    '<div class="solo-revisione">' +
      sezione('Note di lavorazione', (
        (lista(p.da_verificare).length ? '<p><strong>Da verificare:</strong></p>' + ul(p.da_verificare) : '<p>Nessun campo segnalato da verificare.</p>') +
        (p.testo_pack ? '<p class="spazio-sopra"><strong>Testo letto sulla confezione:</strong> ' + h(p.testo_pack) + '</p>' : '') +
        (p.pagina_scansione ? '<p>Fonte: pagina ' + h(p.pagina_scansione) + ' della <a href="assets/scan/presentazione-prodotti-scansione.pdf" target="_blank" rel="noopener">scansione originale' +
          '<span class="sr-only"> (si apre in una nuova scheda)</span></a>. ' : '<p>') +
          'Modifica i dati in <code>data/prodotti.js</code> (id <code>' + h(p.id) + '</code>).</p>'
      ), 'revisione-box') +
    '</div>' +
    '<p class="dett-azioni"><button type="button" class="pulsante pulsante-secondario" id="btn-stampa-scheda">Stampa questa scheda</button></p>';
  }

  function apri(id) {
    var p = PRODOTTI.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    if (elDialog.open) chiudi();
    ultimoFocus = document.activeElement;
    prodottoAperto = p;
    apertoAlle = Date.now();
    elDettaglio.innerHTML = contenutoDettaglio(p);
    if (typeof elDialog.showModal === 'function') elDialog.showModal();
    else elDialog.setAttribute('open', '');
    elDettaglio.scrollTop = 0;
    $('chiudi').focus();
    try { history.replaceState(null, '', '#prodotto=' + encodeURIComponent(id)); } catch (err) { /* ignora */ }
  }
  function chiudi() {
    if (typeof elDialog.close === 'function' && elDialog.open) elDialog.close();
    else { elDialog.removeAttribute('open'); dopoChiusura(); }
  }
  function dopoChiusura() {
    prodottoAperto = null;
    if (/#prodotto=/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search); } catch (err) { /* ignora */ } }
    if (ultimoFocus && ultimoFocus.focus && document.contains(ultimoFocus)) ultimoFocus.focus();
  }
  elDialog.addEventListener('close', dopoChiusura);
  elDialog.addEventListener('cancel', function (e) { e.preventDefault(); chiudi(); });
  $('chiudi').addEventListener('click', chiudi);
  elDialog.addEventListener('click', function (e) {
    // clic sullo sfondo: chiude, ma non se è il secondo clic di un doppio clic sulla scheda
    if (e.target === elDialog && Date.now() - apertoAlle > 400) chiudi();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && elDialog.hasAttribute('open')) { e.preventDefault(); chiudi(); }
  });
  elDettaglio.addEventListener('click', function (e) {
    var mini = e.target.closest('.dett-miniatura');
    if (mini) {
      var principale = $('dett-img-principale');
      if (principale) principale.src = mini.getAttribute('data-src');
      var tutte = elDettaglio.querySelectorAll('.dett-miniatura');
      for (var i = 0; i < tutte.length; i++) tutte[i].setAttribute('aria-pressed', String(tutte[i] === mini));
      return;
    }
    if (e.target.closest('#btn-stampa-scheda')) stampaSingola();
  });

  // ----- link diretto #prodotto=<id> -----------------------------------------
  function apriDaHash() {
    var m = /#prodotto=([^&]+)/.exec(location.hash);
    if (!m) { if (elDialog.hasAttribute('open')) chiudi(); return; }
    var id;
    try { id = decodeURIComponent(m[1]); } catch (err) { return; }
    if (!prodottoAperto || prodottoAperto.id !== id) apri(id);
  }
  window.addEventListener('hashchange', apriDaHash);

  // ----- modalità revisione --------------------------------------------------
  var elInterruttore = $('interruttore-revisione');
  function impostaRevisione(on, salva) {
    document.body.classList.toggle('revisione', !!on);
    elToggleRev.checked = !!on;
    if (on && elInterruttore) elInterruttore.hidden = false;
    if (salva) { try { localStorage.setItem('catalogo-revisione', on ? '1' : '0'); } catch (err) { /* ignora */ } }
  }
  elToggleRev.addEventListener('change', function () { impostaRevisione(elToggleRev.checked, true); });
  (function () {
    var on = false;
    try { on = localStorage.getItem('catalogo-revisione') === '1'; } catch (err) { /* ignora */ }
    var m = /[?&]revisione(?:=([^&]*))?(?:&|$)/.exec(location.search);
    if (m) {
      on = !/^(0|no|off|false)$/i.test(m[1] || '');
      try { localStorage.setItem('catalogo-revisione', on ? '1' : '0'); } catch (err) { /* ignora */ }
    }
    // l'interruttore compare solo quando la modalità è stata attivata almeno una volta su questo browser
    var mostra = on;
    try { mostra = mostra || localStorage.getItem('catalogo-revisione') !== null; } catch (err) { /* ignora */ }
    if (m && !on) mostra = false;
    if (elInterruttore) elInterruttore.hidden = !mostra;
    impostaRevisione(on, false);
  })();

  // ----- stampa ---------------------------------------------------------------
  function schedaStampa(p) {
    var imgs = immagini(p);
    var st = statoDi(p);
    return '<article class="stampa-scheda" data-id="' + h(p.id) + '">' +
      '<div class="stampa-testa">' +
        '<div>' + (imgs.length ? '<img src="' + h(imgs[0]) + '" alt="">' : '') + '</div>' +
        '<div>' +
          '<div class="cat">' + h(nomeCategoria(p.categoria)) + ' · ' + h(STATI[st]) + (p.anno_lancio ? ' ' + h(p.anno_lancio) : '') + '</div>' +
          '<h2>' + h(p.nome) + (p.sottotitolo ? ' <small>' + h(p.sottotitolo) + '</small>' : '') + '</h2>' +
          (p.claim ? '<p class="claim">' + h(p.claim) + '</p>' : '') +
          (p.tipologia ? '<p>' + h(p.tipologia) + '</p>' : '') +
          paragrafi(p.descrizione) +
        '</div>' +
      '</div>' +
      '<div class="stampa-corpo">' +
        (lista(p.composizione).length ? '<section><h3>Composizione</h3>' + ul(p.composizione) + '</section>' : '') +
        (lista(p.formati).length ? '<section><h3>Formati e confezioni</h3>' + ul(p.formati) + '</section>' : '') +
        (lista(p.codici).length ? '<section><h3>Codici</h3><p>' + h(lista(p.codici).join(' · ')) + '</p></section>' : '') +
        (lista(p.caratteristiche).length ? '<section><h3>Caratteristiche</h3><p>' + h(lista(p.caratteristiche).join(' · ')) + '</p></section>' : '') +
        (lista(p.indicazioni).length ? '<section><h3>Indicazioni</h3>' + paragrafi(p.indicazioni) + '</section>' : '') +
        (lista(p.modo_uso).length ? "<section><h3>Modo d'uso</h3>" + paragrafi(p.modo_uso) + '</section>' : '') +
        (lista(p.avvertenze).length ? '<section><h3>Avvertenze</h3>' + paragrafi(p.avvertenze) + '</section>' : '') +
        (lista(p.testi_slide).length ? '<section><h3>Approfondimento</h3>' + paragrafi(p.testi_slide) + '</section>' : '') +
        (lista(p.riferimenti).length ? '<section><h3>Riferimenti bibliografici</h3>' + ul(p.riferimenti) + '</section>' : '') +
        (lista(p.da_verificare).length ? '<section class="solo-revisione"><h3>Da verificare</h3>' + ul(p.da_verificare) + '</section>' : '') +
      '</div>' +
    '</article>';
  }
  function descrizioneFiltri() {
    var parti = [elConteggio.textContent];
    if (stato.categoria) parti.push(stato.categoria === '__senza__' ? 'Senza categoria' : nomeCategoria(stato.categoria));
    if (stato.stato) parti.push(STATI[stato.stato]);
    if (stato.testo.trim()) parti.push('ricerca: “' + stato.testo.trim() + '”');
    return parti.join(' · ');
  }
  // La sezione di stampa viene tenuta sempre aggiornata (immagini già caricate al momento della stampa).
  function preparaStampa(ris) {
    var testa = '<p class="stampa-intestazione">' + h(descrizioneFiltri()) + '</p>';
    if (!ris.length) testa += '<p class="stampa-vuoto">Nessun prodotto corrisponde ai filtri selezionati.</p>';
    elStampa.innerHTML = testa + ris.map(schedaStampa).join('');
  }
  function stampaSingola() {
    if (!prodottoAperto) return;
    if (!elStampa.querySelector('.stampa-scheda[data-id="' + prodottoAperto.id.replace(/"/g, '\\"') + '"]')) {
      preparaStampa([prodottoAperto]);
    }
    document.body.classList.add('stampa-singola');
    document.body.setAttribute('data-stampa-id', prodottoAperto.id);
    var sel = elStampa.querySelector('.stampa-scheda[data-id="' + prodottoAperto.id.replace(/"/g, '\\"') + '"]');
    if (sel) sel.classList.add('stampa-attiva');
    window.print();
  }
  $('btn-stampa').addEventListener('click', function () { window.print(); });
  window.addEventListener('beforeprint', function () {
    if (prodottoAperto && !document.body.classList.contains('stampa-singola')) {
      document.body.classList.add('stampa-singola');
      var sel = elStampa.querySelector('.stampa-scheda[data-id="' + prodottoAperto.id.replace(/"/g, '\\"') + '"]');
      if (sel) sel.classList.add('stampa-attiva');
      else { preparaStampa([prodottoAperto]); var s2 = elStampa.querySelector('.stampa-scheda'); if (s2) s2.classList.add('stampa-attiva'); }
    }
  });
  window.addEventListener('afterprint', function () {
    if (document.body.classList.contains('stampa-singola')) {
      document.body.classList.remove('stampa-singola');
      document.body.removeAttribute('data-stampa-id');
      preparaStampa(filtrati());
    }
  });

  // ----- avvio ----------------------------------------------------------------
  disegnaChips();
  disegna();
  apriDaHash();
})();

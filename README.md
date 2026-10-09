# Catalogo prodotti

Catalogo digitale dei prodotti dell'azienda. È un sito statico (HTML, CSS e JavaScript puro, senza dipendenze): si apre direttamente dal disco facendo doppio clic su `index.html` e si può pubblicare gratuitamente con GitHub Pages.

## Come si usa

- **Aprire il catalogo**: doppio clic su `index.html`, oppure pubblica su GitHub Pages (vedi sotto).
- **Cercare e filtrare**: barra di ricerca (nome, ingredienti, tipologia…), filtri per categoria e stato, ordinamento.
- **Scheda prodotto**: clic su una scheda per aprire il dettaglio. L'indirizzo cambia in `#prodotto=<id>`, quindi si può condividere il link diretto a un prodotto.
- **Stampa / PDF**: il pulsante "Stampa / PDF" stampa una scheda completa per ogni prodotto attualmente in elenco (se hai filtrato, stampa solo i prodotti filtrati; la prima riga del PDF riporta il conteggio e i filtri usati). Dal browser scegli "Salva come PDF" per ottenere il file. Con una scheda prodotto aperta, il pulsante "Stampa questa scheda" (o Ctrl+P) stampa solo quel prodotto.
- **Modalità revisione**: mostra le note di lavorazione (campi da verificare, testo letto sulla confezione, pagina della scansione di origine). Si attiva aprendo `index.html?revisione`: da quel momento, su quel browser, in alto compare l'interruttore "Modalità revisione" per accenderla e spegnerla. Con `index.html?revisione=0` si spegne e l'interruttore sparisce. Chi apre il catalogo normalmente non vede né le note né l'interruttore. In modalità revisione le note "da verificare" compaiono anche nella stampa.
- **A chi è rivolto**: il catalogo contiene un medicinale senza obbligo di prescrizione (SOP) con indicazioni e posologia e un dispositivo medico. In Italia questi contenuti non possono essere pubblicizzati liberamente al pubblico, quindi il testo introduttivo e il piè di pagina dichiarano che il catalogo è riservato agli operatori sanitari. Se invece vuoi un catalogo per il pubblico, togli quella frase da `intro.testo` in `data/prodotti.js` e dal piè di pagina in `index.html`, e rivedi le schede di Morelac e Regler (vedi le note "da verificare" di quei prodotti).

## Struttura dei file

```
index.html                 pagina del catalogo
css/style.css              stile (anche per la stampa)
js/app.js                  logica: filtri, ricerca, scheda di dettaglio, stampa
data/prodotti.js           DATI DEI PRODOTTI  <-- l'unico file da modificare
assets/img/prodotti/       foto delle confezioni
assets/scan/               scansione originale della presentazione (fonte dei dati)
```

## Aggiungere o modificare un prodotto

Tutti i dati stanno in `data/prodotti.js`. Ogni prodotto è un blocco come questo:

```js
{
  id: "nuovo-prodotto",              // univoco: minuscole, numeri e trattini
  nome: "Nuovo Prodotto",
  sottotitolo: "",                   // es. "Macrogol 4000"
  claim: "Frase di lancio",
  categoria: "integratori",          // uno degli id in "categorie" (vedi in alto nel file)
  tipologia: "Integratore alimentare",
  stato: "in_commercio",             // oppure "in_lancio"
  anno_lancio: 2026,
  descrizione: "Testo libero mostrato in alto nella scheda.",
  composizione: ["Ingrediente 1", "Ingrediente 2"],
  formati: ["20 compresse, contenuto 26 g"],
  caratteristiche: ["Senza glutine"],
  indicazioni: [],
  modo_uso: [],
  avvertenze: ["Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano."],   // frasi obbligatorie per gli integratori
  testi_slide: [],                   // paragrafi di approfondimento
  riferimenti: [],                   // bibliografia
  codici: [],                        // es. "Paraf 943256659", "AIC 034966010"
  immagini: [],                      // es. ["assets/img/prodotti/nuovo-prodotto.jpg"], solo quando la foto esiste davvero
  fonti_web: [],                     // es. { url: "https://...", titolo: "...", ufficiale: true }
  pagina_scansione: null,
  testo_pack: "",
  da_verificare: []                  // note interne, visibili solo in modalità revisione
}
```

Regole pratiche:

1. Copia un blocco esistente, incollalo nella lista `prodotti` e cambia i valori. Ogni blocco è separato dal successivo da una virgola.
2. I campi vuoti (`""` o `[]`) non compaiono nel sito: non serve cancellarli.
3. Le foto vanno in `assets/img/prodotti/`. Formato consigliato: JPG o PNG, sfondo bianco, lato lungo 1000–1200 px. Se un prodotto ha più immagini, elencale tutte in `immagini`: la prima è quella principale, le altre compaiono come miniature nella scheda.
4. Per aggiungere una categoria, aggiungi una riga in `categorie` (in alto nel file) e usa il suo `id` nei prodotti.
5. Dopo ogni modifica apri `index.html` e controlla che la pagina si carichi. Se il file contiene un errore di sintassi (una virgola o una virgoletta in più o in meno) la pagina mostra un messaggio di dati non trovati: in quel caso ricontrolla l'ultima modifica.
6. Salva sempre `data/prodotti.js` con codifica **UTF-8** (in Blocco note: "Salva con nome" → Codifica: UTF-8), altrimenti le lettere accentate compaiono sbagliate. Un editor come VS Code o Notepad++ lo fa in automatico.
7. I nomi dei prodotti sono scritti senza il simbolo ®: se vuoi mostrarlo, aggiungilo nel campo `nome` (es. `"Tiocronal® MITO"`).
8. Se un prodotto ha un `id` mancante o doppio, il sito ne assegna uno automatico; se una `categoria` non è tra quelle definite, compare un filtro "categoria non definita" per farla notare.
9. Dentro un testo non scrivere mai le virgolette dritte `"` (chiudono il testo e rompono il file): usa le virgolette “ ” oppure « ». L'apostrofo `'` invece va bene (es. `"Risveglia l'azione"`).
10. Ogni categoria ha frasi obbligatorie in `avvertenze`: per gli integratori quelle del modello qui sopra; per i dispositivi medici "È un dispositivo medico CE. Leggere attentamente le avvertenze o le istruzioni per l'uso."; per gli alimenti a fini medici speciali "Da usare sotto controllo medico"; per i medicinali rimanda al foglio illustrativo. Usa sempre la stessa dicitura per lo stesso concetto (es. "Senza glutine", "bustine"), così la ricerca trova tutto.

Dati dell'azienda (nome, indirizzo, telefono, sito, email) e testo introduttivo si modificano nelle sezioni `azienda` e `intro` all'inizio dello stesso file.

## Pubblicare su GitHub Pages

1. Su GitHub apri il repository, poi **Settings → Pages**.
2. In "Build and deployment" scegli **Deploy from a branch**, branch `main` (o quello che usi), cartella `/ (root)`, e salva.
3. Dopo qualche minuto il catalogo è online all'indirizzo indicato nella stessa pagina (`https://<utente>.github.io/<repository>/`).

Ogni `git push` aggiorna automaticamente il sito.

## Stato dei dati

I prodotti sono stati estratti dalla scansione della presentazione aziendale (`assets/scan/`). La scansione è a bassa risoluzione: alcuni dettagli delle confezioni (numero di flaconcini, grammature, aromi, composizione completa) non erano leggibili e sono segnalati nel campo `da_verificare` di ogni prodotto. Le foto attuali sono ritagli della scansione: vanno sostituite con le foto ufficiali delle confezioni appena disponibili.

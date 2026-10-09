# Catalogo prodotti

Catalogo digitale dei prodotti dell'azienda. È un sito statico (HTML, CSS e JavaScript puro, senza dipendenze): si apre direttamente dal disco facendo doppio clic su `index.html` e si può pubblicare gratuitamente con GitHub Pages.

## Come si usa

- **Aprire il catalogo**: doppio clic su `index.html`, oppure pubblica su GitHub Pages (vedi sotto).
- **Cercare e filtrare**: barra di ricerca (nome, ingredienti, tipologia…), filtri per categoria e stato, ordinamento.
- **Scheda prodotto**: clic su una scheda per aprire il dettaglio. L'indirizzo cambia in `#prodotto=<id>`, quindi si può condividere il link diretto a un prodotto.
- **Stampa / PDF**: il pulsante "Stampa / PDF" stampa una scheda completa per ogni prodotto attualmente filtrato (dal browser scegli "Salva come PDF").
- **Modalità revisione**: l'interruttore in alto mostra le note di lavorazione (campi da verificare, testo letto sulla confezione, pagina della scansione di origine). Serve mentre sistemiamo i dati; i clienti non la vedono a meno che non la attivino. Si attiva anche aprendo `index.html?revisione`.

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
  avvertenze: [],
  testi_slide: [],                   // paragrafi di approfondimento
  riferimenti: [],                   // bibliografia
  codici: [],                        // es. "Paraf 943256659", "AIC 034966010"
  immagini: ["assets/img/prodotti/nuovo-prodotto.jpg"],
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

Dati dell'azienda (nome, indirizzo, sito, email) e testo introduttivo si modificano nelle sezioni `azienda` e `intro` all'inizio dello stesso file.

## Pubblicare su GitHub Pages

1. Su GitHub apri il repository, poi **Settings → Pages**.
2. In "Build and deployment" scegli **Deploy from a branch**, branch `main` (o quello che usi), cartella `/ (root)`, e salva.
3. Dopo qualche minuto il catalogo è online all'indirizzo indicato nella stessa pagina (`https://<utente>.github.io/<repository>/`).

Ogni `git push` aggiorna automaticamente il sito.

## Stato dei dati

I prodotti sono stati estratti dalla scansione della presentazione aziendale (`assets/scan/`). La scansione è a bassa risoluzione: alcuni dettagli delle confezioni (numero di flaconcini, grammature, aromi, composizione completa) non erano leggibili e sono segnalati nel campo `da_verificare` di ogni prodotto. Le foto attuali sono ritagli della scansione: vanno sostituite con le foto ufficiali delle confezioni appena disponibili.

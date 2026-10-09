/* ==========================================================================
   DATI DEL CATALOGO
   --------------------------------------------------------------------------
   Questo è l'unico file da modificare per aggiornare il catalogo.
   - Per aggiungere un prodotto: copia un blocco { ... } dentro "prodotti",
     cambia "id" (univoco, solo lettere minuscole, numeri e trattini) e i campi.
   - Per togliere un prodotto: cancella il suo blocco (attenzione alle virgole).
   - Le immagini vanno in assets/img/prodotti/ e si indicano in "immagini".
   - I campi vuoti ("" oppure []) non vengono mostrati nel sito.
   - "da_verificare" e "testo_pack" si vedono solo con "Modalità revisione" attiva.
   Campi possibili per ogni prodotto:
     id, nome, sottotitolo, claim, categoria, tipologia, stato ("in_commercio" | "in_lancio"),
     anno_lancio, descrizione, composizione[], formati[], caratteristiche[], indicazioni[],
     modo_uso[], avvertenze[], testi_slide[], riferimenti[], immagini[], fonti_web[],
     pagina_scansione, testo_pack, da_verificare[]
   Vedi README.md per i dettagli.
   ========================================================================== */

window.CATALOGO = {
  azienda: {
    nome: "B.L.V. Pharma Group S.r.l.",
    sottotitolo: "Catalogo digitale dei prodotti",
    indirizzo: "",
    sito: "",
    email: "",
    telefono: ""
  },
  intro: {
    titolo: "I nostri prodotti",
    testo: "Integratori alimentari, dispositivi medici, alimenti a fini medici speciali e medicinali di automedicazione. Seleziona un prodotto per aprire la scheda completa."
  },
  aggiornato: "9 ottobre 2026",
  categorie: [
    {
      id: "integratori",
      nome: "Integratori alimentari"
    },
    {
      id: "dispositivi-medici",
      nome: "Dispositivi medici"
    },
    {
      id: "alimenti-fini-medici-speciali",
      nome: "Alimenti a fini medici speciali"
    },
    {
      id: "medicinali",
      nome: "Medicinali"
    }
  ],
  prodotti: [
    {
      id: "fisioton",
      nome: "Fisioton",
      sottotitolo: "",
      claim: "Risveglia l'azione",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "",
      composizione: ["Carnitina", "Arginina", "Vitamine del gruppo B", "Estratti vegetali"],
      formati: ["10 flaconcini da 10 ml"],
      caratteristiche: ["Senza glutine"],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [],
      riferimenti: [],
      immagini: ["assets/img/prodotti/fisioton.jpg"],
      fonti_web: [],
      pagina_scansione: 1,
      testo_pack: "Integratore alimentare di carnitina, arginina, vitamine del gruppo B con estratti vegetali",
      da_verificare: [
        "Numero e volume dei flaconcini (sul pack si legge '10 flaconcini da 10 ml' ma è poco leggibile)"
      ]
    },
    {
      id: "fisioton-junior",
      nome: "Fisioton Junior",
      sottotitolo: "",
      claim: "Risveglia l'azione",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "",
      composizione: ["Carnitina", "Arginina", "Vitamine del gruppo B", "Estratti vegetali"],
      formati: ["Flaconcini (numero e volume da verificare)"],
      caratteristiche: ["Senza glutine", "Formulazione per bambini"],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [],
      riferimenti: [],
      immagini: ["assets/img/prodotti/fisioton-junior.jpg"],
      fonti_web: [],
      pagina_scansione: 1,
      testo_pack: "Integratore alimentare di carnitina, arginina, vitamine del gruppo B con estratti vegetali",
      da_verificare: [
        "Numero e volume dei flaconcini",
        "Aroma (sul pack c'è una scritta 'aroma ...' illeggibile)"
      ]
    },
    {
      id: "tiocronal-600-hr",
      nome: "Tiocronal 600 HR",
      sottotitolo: "",
      claim: "Antiossidante \"all-round\"",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "",
      composizione: ["Acido Alfa Lipoico 600 mg in tecnologia High Release (HR)"],
      formati: ["20 compresse, peso netto 18,2 g"],
      caratteristiche: ["Gluten free", "Tecnologia High Release (HR)"],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [
        "A base di Acido Alfa Lipoico in tecnologia High Release (HR)",
        "La formulazione ad elevato rilascio (HR) ha consentito di superare alcune delle criticità principali delle formulazioni standard di alfa lipoico (concentrazioni plasmatiche variabili e interazione con il cibo)",
        "Tiocronal HR riduce del 58% la variabilità interindividuale di assorbimento",
        "Contrastare lo stress ossidativo significa proteggere le cellule da un dannoso insulto mitocondriale"
      ],
      riferimenti: [
        "Perez Pinzon MA et al. Novel mitochondrial targets. J Cereb Blood Flow Metab 2012; 32: 1362-1376"
      ],
      immagini: ["assets/img/prodotti/tiocronal-600-hr.jpg"],
      fonti_web: [],
      pagina_scansione: 2,
      testo_pack: "Integratore alimentare a base di Acido Alfa Lipoico. 20 compresse. Peso netto 18,2 g",
      da_verificare: ["Il dosaggio '600 mg' è dedotto dal nome, non dal pack"]
    },
    {
      id: "tiocronal-redox",
      nome: "Tiocronal REDox",
      sottotitolo: "",
      claim: "\"ROS - Scavenger\"",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "",
      composizione: [
        "Acido Alfa Lipoico",
        "Glutatione Ridotto (Setria)",
        "Vitamine del gruppo B",
        "Vitamina C",
        "Vitamina E",
        "Acido Folico",
        "Selenio",
        "Zinco"
      ],
      formati: ["20 compresse, contenuto 26 g"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [
        "Lo stress ossidativo è un processo continuo e multifattoriale nell'invecchiamento cellulare"
      ],
      riferimenti: [
        "Vendemiale G. Stress ossidativo e invecchiamento. G Gerontol 2011; 59: 261-264"
      ],
      immagini: ["assets/img/prodotti/tiocronal-redox.jpg"],
      fonti_web: [],
      pagina_scansione: 3,
      testo_pack: "Integratore alimentare a base di Acido Alfa Lipoico, Glutatione Ridotto (Setria), Vitamine del gruppo B, Vitamina C ed E, Acido Folico, Selenio e Zinco. 20 compresse, contenuto 26 g",
      da_verificare: []
    },
    {
      id: "maxtrofic",
      nome: "Maxtrofic",
      sottotitolo: "",
      claim: "Per la gestione dietetica della sarcopenia",
      categoria: "alimenti-fini-medici-speciali",
      tipologia: "Alimento a fini medici speciali",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "",
      composizione: [],
      formati: ["30 buste di polvere solubile"],
      caratteristiche: ["Gluten free", "Polvere solubile"],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [],
      riferimenti: [],
      immagini: ["assets/img/prodotti/maxtrofic.jpg"],
      fonti_web: [],
      pagina_scansione: 3,
      testo_pack: "Alimento a fini medici speciali per la gestione dietetica della sarcopenia. Polvere solubile. Gluten free",
      da_verificare: [
        "Numero buste (sul pack si legge '30 BUSTE', poco leggibile)",
        "Composizione: sul pack sembra esserci 'THIOMASS in esclusiva' e 'concentrato di proteine isolate del siero del latte' ma è illeggibile",
        "Grammatura della busta"
      ]
    },
    {
      id: "dizilen",
      nome: "Dizilen",
      sottotitolo: "",
      claim: "Il benessere nella \"stabilità\" quotidiana",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2021,
      descrizione: "",
      composizione: [
        "Citicolina",
        "Acido Lipoico",
        "Zenzero",
        "Vitamina D",
        "Zinco",
        "Vitamina B6",
        "Vitamina B1"
      ],
      formati: ["20 compresse da 1,350 g ciascuna, contenuto 27 g"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [
        "Compensazione vestibolare: un processo di recupero funzionale determinato dalla plasticità intrinseca del SNC di riorganizzarsi",
        "I fattori che possono interferire con questo processo: ipofunzione labirintica; comorbilità con malattie vascolari che colpiscono aree specifiche e percorsi neurali del SNC che si pensa siano direttamente coinvolti nella compensazione vestibolare; declino cognitivo, dal momento che i VOR sembrano non essere completamente automatici ma dipendere in parte dalle risorse cognitive",
        "L'esito della riabilitazione vestibolare può essere migliorato dalla stimolazione della neurotrasmissione colinergica, nota per migliorare la compromissione cognitiva (memoria, attenzione, orientamento visivo-spaziale) in particolare di origine vascolare",
        "SNC = sistema nervoso centrale; VOR = riflessi vestibolo-oculari"
      ],
      riferimenti: [],
      immagini: ["assets/img/prodotti/dizilen.jpg"],
      fonti_web: [],
      pagina_scansione: 4,
      testo_pack: "Integratore alimentare a base di Citicolina, Acido Lipoico, Zenzero, Vitamina D, Zinco, Vitamina B6 e Vitamina B1. 20 compresse da 1,350 g ciascuna. Contenuto 27 g",
      da_verificare: []
    },
    {
      id: "regler",
      nome: "Regler",
      sottotitolo: "Macrogol 4000",
      claim: "Lassativo di 1ª scelta raccomandato dalle Linee Guida",
      categoria: "dispositivi-medici",
      tipologia: "Dispositivo medico",
      stato: "in_commercio",
      anno_lancio: 2021,
      descrizione: "",
      composizione: ["Macrogol 4000"],
      formati: [
        "30 bustine monodose da 10 g",
        "Barattolo di polvere per soluzione orale da 200 g con misurino all'interno"
      ],
      caratteristiche: [
        "Dispositivo Medico CE 0373",
        "Gluten free",
        "Polvere per soluzione orale",
        "Agisce entro 24-72 ore"
      ],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [
        "Efficace nel trattamento sintomatico della stipsi grazie al suo effetto osmotico",
        "Lassativo di 1ª scelta raccomandato dalle Linee Guida NASPGHAN / ESPGHAN (Società Europee e Nordamericane di Gastroenterologia, Epatologia e Nutrizione Pediatrica)"
      ],
      riferimenti: [],
      immagini: [
        "assets/img/prodotti/regler-bustine.jpg",
        "assets/img/prodotti/regler-barattolo.jpg"
      ],
      fonti_web: [],
      pagina_scansione: 5,
      testo_pack: "Polvere per soluzione orale. 30 bustine monodose da 10 g cad. Trattamento sintomatico della stipsi. Agisce entro 24-72 ore. Macrogol 10 g. Gluten free. Dispositivo Medico CE 0373",
      da_verificare: []
    },
    {
      id: "morelac",
      nome: "Morelac",
      sottotitolo: "",
      claim: "Per le sindromi dismicrobiche intestinali",
      categoria: "medicinali",
      tipologia: "Medicinale di automedicazione (Fascia C - SOP)",
      stato: "in_commercio",
      anno_lancio: 2023,
      descrizione: "",
      composizione: [
        "Streptococcus thermophilus P-18807 (almeno 4 miliardi di UFC per bustina)",
        "Lactobacillus acidophilus P-18806 (almeno 10 milioni di UFC per bustina)",
        "Lactobacillus delbrueckii P-18805 (almeno 5 milioni di UFC per bustina)"
      ],
      formati: ["10 bustine di polvere per sospensione orale"],
      caratteristiche: [
        "Aroma banana-albicocca",
        "Uso orale",
        "Medicinale di automedicazione, Fascia C - SOP (senza obbligo di prescrizione)",
        "Titolare/produttore indicato sul pack: Proge Farm"
      ],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [
        "Per le sindromi dismicrobiche intestinali: sindromi diarroiche e dispeptiche da alterata flora batterica (diarrea, enteriti aspecifiche, coliti); dismicrobismo intestinale da antibiotici",
        "Ogni bustina contiene 3 lattobatteri attivi e capaci di adattarsi all'ambiente intestinale"
      ],
      riferimenti: [],
      immagini: ["assets/img/prodotti/morelac.jpg"],
      fonti_web: [],
      pagina_scansione: 6,
      testo_pack: "MORELAC 10.000.000 UFC / 5.000.000 UFC / 4.000.000.000 UFC. Polvere per sospensione orale. Lactobacillus acidophilus P-18806, Lactobacillus delbrueckii P-18805, Streptococcus thermophilus P-18807. Confezione da 10 bustine. Uso orale. Proge Farm",
      da_verificare: ["Rapporto fra B.L.V. Pharma e Proge Farm (distribuzione/licenza)"]
    },
    {
      id: "tiocronal-mito",
      nome: "Tiocronal MITO",
      sottotitolo: "",
      claim: "",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_lancio",
      anno_lancio: 2023,
      descrizione: "",
      composizione: [
        "Acetil Carnitina Cloridrato",
        "Acido Alfa Lipoico",
        "Vitamine del gruppo B",
        "Selenio"
      ],
      formati: ["30 compresse, contenuto 48,6 g"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [],
      riferimenti: [],
      immagini: ["assets/img/prodotti/tiocronal-mito.jpg"],
      fonti_web: [],
      pagina_scansione: 7,
      testo_pack: "Integratore alimentare a base di Acetil Carnitina Cloridrato, Acido Alfa Lipoico, Vitamine del gruppo B e Selenio. 30 compresse, contenuto 48,6 g",
      da_verificare: [
        "La slide dice 'TO BE LAUNCHED IN 2023': verificare se il prodotto è ora in commercio"
      ]
    },
    {
      id: "enzitrik",
      nome: "EnziTRIK",
      sottotitolo: "",
      claim: "",
      categoria: "",
      tipologia: "",
      stato: "in_lancio",
      anno_lancio: 2024,
      descrizione: "",
      composizione: [],
      formati: [],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [],
      avvertenze: [],
      testi_slide: [],
      riferimenti: [],
      immagini: ["assets/img/prodotti/enzitrik.jpg"],
      fonti_web: [],
      pagina_scansione: 8,
      testo_pack: "",
      da_verificare: [
        "Nella scansione c'è solo il logo e 'TO BE LAUNCHED IN 2024': tipologia, composizione, formato e stato attuale sono tutti da inserire"
      ]
    }
  ]
};

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
     modo_uso[], avvertenze[], testi_slide[], riferimenti[], codici[], immagini[], fonti_web[],
     pagina_scansione, testo_pack, da_verificare[]
   Vedi README.md per i dettagli.
   ========================================================================== */

window.CATALOGO = {
  azienda: {
    nome: "B.L.V. Pharma Group S.r.l.",
    sottotitolo: "Catalogo digitale dei prodotti",
    indirizzo: "Via Giorgio Stephenson 43A, 20157 Milano",
    sito: "https://blvpharmagroup.com",
    email: "info@blvpharmagroup.com",
    telefono: "+39 02 36695507"
  },
  intro: {
    titolo: "I nostri prodotti",
    testo: "Integratori alimentari, dispositivi medici, alimenti a fini medici speciali e medicinali senza obbligo di prescrizione. Catalogo riservato agli operatori sanitari (medici e farmacisti): non costituisce pubblicità al pubblico."
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
      descrizione: "Integratore alimentare a base di carnitina, arginina, vitamine del gruppo B ed estratti vegetali. Le vitamine B2, B3 e B6 contribuiscono alla riduzione della stanchezza e dell'affaticamento e, insieme alla vitamina B1, al normale metabolismo energetico.",
      composizione: [
        "Carnitina",
        "Arginina",
        "Vitamine del gruppo B (B1, B2, B3, B6)",
        "Estratti vegetali (Rhodiola rosea)"
      ],
      formati: ["10 flaconcini da 15 ml", "20 flaconcini da 15 ml"],
      caratteristiche: ["Senza glutine", "Aroma amarena"],
      indicazioni: [],
      modo_uso: [
        "1-2 flaconcini al giorno, al mattino o prima di pranzo, tal quali o diluiti in acqua o altro liquido. Agitare bene il flaconcino prima dell'uso."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: [],
      immagini: ["assets/img/prodotti/fisioton.jpg"],
      fonti_web: [
        {
          url: "https://blvpharmagroup.com/energizzanti-e-adattogeni/",
          titolo: "Energizzanti e adattogeni – sito B.L.V. Pharma Group",
          ufficiale: true
        },
        {
          url: "https://www.codifa.it/integratori/f/fisioton-integr-per-la-funzionalita-cerebrale-memoria-attenzione-e-conc-e-l-affaticamento-psicofisico",
          titolo: "Scheda Codifa",
          ufficiale: false
        }
      ],
      pagina_scansione: 1,
      testo_pack: "Integratore alimentare di carnitina, arginina, vitamine del gruppo B con estratti vegetali (testo ripreso per analogia dall'astuccio Junior: sull'astuccio Fisioton è illeggibile). Senza glutine. 10 flaconcini.",
      da_verificare: [
        "Formati: sul pack scansionato si legge solo '10' (volume illeggibile); '10 o 20 flaconcini da 15 ml' e 'aroma amarena' vengono dal sito ufficiale. Confermare sulla confezione attuale.",
        "Estratti vegetali: il sito ufficiale cita la Rhodiola rosea; la scheda Codifa elenca anche rosa canina ed eleuterococco e dosaggi per 2 flaconcini (arginina 600 mg, carnitina 400 mg, rosa canina 800 mg, eleuterococco 400 mg). Decidere quanto dettaglio pubblicare.",
        "Alcune schede indicano 'Fisioton n.f.' (nuova formula): verificare che la composizione pubblicata corrisponda al pack attuale.",
        "Modo d'uso e avvertenze ripresi dal sito ufficiale e da schede online: confermare con l'etichetta.",
        "Testo illeggibile nella scansione su fianco e coperchio dell'astuccio e sulle etichette dei flaconcini."
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
      descrizione: "Integratore alimentare a base di carnitina, arginina, vitamine del gruppo B ed estratti vegetali, formulato per bambini e adolescenti.",
      composizione: ["Carnitina", "Arginina", "Vitamine del gruppo B", "Estratti vegetali"],
      formati: ["10 flaconcini da 10 ml", "20 flaconcini da 10 ml"],
      caratteristiche: ["Senza glutine", "Aroma fragola", "Per bambini e adolescenti"],
      indicazioni: [],
      modo_uso: [
        "1-2 flaconcini al giorno, preferibilmente al mattino o prima di pranzo, tal quali o diluiti in acqua o altro liquido. Agitare bene il flaconcino prima dell'uso."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata e di uno stile di vita sano."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: ["Paraf 930542028 (10 flaconcini, da confermare)"],
      immagini: ["assets/img/prodotti/fisioton-junior.jpg"],
      fonti_web: [
        {
          url: "https://blvpharmagroup.com/energizzanti-e-adattogeni/",
          titolo: "Energizzanti e adattogeni – sito B.L.V. Pharma Group",
          ufficiale: true
        },
        {
          url: "https://meafarma.it/fisioton-junior-10fl10ml",
          titolo: "Scheda rivenditore (Meafarma)",
          ufficiale: false
        }
      ],
      pagina_scansione: 1,
      testo_pack: "INTEGRATORE ALIMENTARE DI CARNITINA, ARGININA, VITAMINE DEL GRUPPO B, CON ESTRATTI VEGETALI. Senza glutine. 10 flaconcini (volume illeggibile sul pack scansionato).",
      da_verificare: [
        "Confezione da 20 flaconcini, volume da 10 ml e aroma fragola: indicati dal sito ufficiale e da schede online; sul pack scansionato si legge solo il '10' nel bollino rosso.",
        "Estratti vegetali: le schede online citano astragalo ed erba medica (oltre a magnesio pidolato, inositolo, calcio piruvato, potassio citrato e vitamine B1, B2, B3, B6, B12). Verificare l'etichetta prima di pubblicare il dettaglio.",
        "ATTENZIONE: una scheda rivenditore (TuttoFarma) elenca 'sciroppo di avena' e dichiara fonti di glutine, in contrasto con il pack e con il sito ufficiale ('senza glutine'). Verificare con l'etichetta attuale prima di lasciare 'Senza glutine'.",
        "Il codice Paraf 930542028 compare come 'codice articolo' su un rivenditore: confermare."
      ]
    },
    {
      id: "tiocronal-600-hr",
      nome: "Tiocronal 600 HR",
      sottotitolo: "",
      claim: "Antiossidante “all-round”",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "Integratore alimentare a base di acido alfa lipoico in tecnologia High Release (HR). La formulazione ad elevato rilascio ha consentito di superare alcune delle criticità principali delle formulazioni standard di alfa lipoico (concentrazioni plasmatiche variabili e interazione con il cibo).",
      composizione: [
        "Acido alfa lipoico 600 mg per compressa, in tecnologia High Release (HR)"
      ],
      formati: ["20 compresse, peso netto 18,2 g"],
      caratteristiche: ["Senza glutine", "Tecnologia High Release (HR)"],
      indicazioni: [],
      modo_uso: [
        "1 compressa al giorno, preferibilmente prima dei pasti a stomaco vuoto, salvo diverso parere del medico."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. In caso di terapia con farmaci ipoglicemizzanti consultare il medico prima dell'uso. Non assumere in caso di ipersensibilità a uno dei componenti."
      ],
      testi_slide: [
        "Tiocronal HR riduce del 58% la variabilità interindividuale di assorbimento.",
        "Contrastare lo stress ossidativo significa proteggere le cellule da un dannoso insulto mitocondriale.",
        "Grafico a confronto fra formulazione standard e tecnologia High Release (HR): concentrazioni plasmatiche (µg/ml) nel tempo (0-300 min). Con la formulazione standard i picchi individuali sono dispersi e variabili; con la tecnologia HR sono concentrati intorno ai 30 minuti."
      ],
      riferimenti: [
        "Perez-Pinzon MA et al. Novel mitochondrial targets for neuroprotection. J Cereb Blood Flow Metab 2012; 32: 1362-1376"
      ],
      codici: [],
      immagini: ["assets/img/prodotti/tiocronal-600-hr.jpg"],
      fonti_web: [
        {
          url: "https://www.codifa.it/integratori/t/tiocronal-600-hr-integratori-per-il-benessere-delle-cartilagini-delle-articolazioni-e-delle-ossa",
          titolo: "Scheda Codifa",
          ufficiale: false
        }
      ],
      pagina_scansione: 2,
      testo_pack: "Integratore alimentare a base di Acido Alfa Lipoico. 20 compresse. Peso netto 18,2 g. Gluten free.",
      da_verificare: [
        "Il dosaggio di 600 mg per compressa è confermato da schede online, non dal pack scansionato.",
        "Riferimento bibliografico: la slide stampa 'J of Cereb B F & M 2012 32, 11362-1376' (refuso nelle pagine); nel catalogo è riportata la citazione completa Perez-Pinzon et al., J Cereb Blood Flow Metab 2012;32:1362-1376, da confermare.",
        "La frase sulla formulazione HR rimanda a una nota ¹ che non è stampata sulla slide, e il dato '58%' è senza fonte: recuperare gli studi a supporto prima di usarli nel catalogo.",
        "Anno: la scheda Codifa riporta immissione in commercio 01/09/2007 (precedente titolare; un rivenditore lo lista sotto Fidia). Il 2019 della presentazione è l'anno di ingresso nel portafoglio B.L.V.: decidere quale anno mostrare.",
        "Modo d'uso e avvertenze ripresi da schede online: confermare con l'etichetta.",
        "Nessuna pagina dedicata trovata sul sito ufficiale blvpharmagroup.com (probabile sezione 'Metabolismo cellulare').",
        "Testo sul fianco della confezione (probabile tabella nutrizionale) illeggibile nella scansione."
      ]
    },
    {
      id: "tiocronal-redox",
      nome: "Tiocronal REDox",
      sottotitolo: "",
      claim: "“ROS – Scavenger”",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "Integratore alimentare antiossidante a base di acido alfa lipoico, glutatione ridotto (Setria®), vitamine del gruppo B, vitamina C ed E, acido folico, selenio e zinco.",
      composizione: [
        "Acido alfa lipoico 600 mg per compressa",
        "Glutatione ridotto (Setria®) 250 mg per compressa",
        "Vitamine del gruppo B",
        "Vitamina C",
        "Vitamina E",
        "Acido folico",
        "Selenio",
        "Zinco"
      ],
      formati: ["20 compresse, contenuto 26 g"],
      caratteristiche: ["Glutatione ridotto a marchio Setria®"],
      indicazioni: [],
      modo_uso: [
        "1 compressa al giorno, preferibilmente prima dei pasti a stomaco vuoto, salvo diverso parere del medico."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Prodotto destinato agli adulti. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. In rari casi l'acido lipoico può provocare ipoglicemia: in caso di terapia con farmaci ipoglicemizzanti consultare il medico. Conservare in luogo fresco e asciutto."
      ],
      testi_slide: [
        "Lo stress ossidativo è un processo continuo e multifattoriale nell'invecchiamento cellulare."
      ],
      riferimenti: [
        "Vendemiale G. Stress ossidativo e invecchiamento. G Gerontol 2011; 59: 261-264"
      ],
      codici: ["Paraf 943256659 (da confermare)"],
      immagini: ["assets/img/prodotti/tiocronal-redox.jpg"],
      fonti_web: [
        {
          url: "https://www.codifa.it/integratori/t/tiocronal-redox-integratori-antiossidanti",
          titolo: "Scheda Codifa",
          ufficiale: false
        },
        {
          url: "https://www.dica33.it/integratori/scheda/tiocronal-redox.asp",
          titolo: "Scheda Dica33",
          ufficiale: false
        }
      ],
      pagina_scansione: 3,
      testo_pack: "Integratore alimentare a base di Acido Alfa Lipoico, Glutatione Ridotto (Setria®), Vitamine del gruppo B, Vitamina C ed E, Acido Folico, Selenio e Zinco. 20 compresse, contenuto 26 g.",
      da_verificare: [
        "Dosaggi di acido lipoico (600 mg) e glutatione (250 mg) ripresi dalla scheda Codifa; dosaggi di vitamine e minerali non pubblicati perché le fonti online riportano unità incoerenti.",
        "Modo d'uso e avvertenze ripresi da schede online: confermare con l'etichetta.",
        "Codice Paraf 943256659 riportato da più rivenditori, non verificato su registro ufficiale.",
        "Riferimento bibliografico: sulla slide è stampato troncato ('*Vendemiale G Stress ossidativo e invecc G Gerontolo 2011 59 261 264'); la forma estesa nel catalogo è da confermare sulla fonte originale.",
        "Testo sull'aletta superiore dell'astuccio (probabili modalità d'uso e avvertenze) illeggibile nella scansione."
      ]
    },
    {
      id: "maxtrofic",
      nome: "Maxtrofic",
      sottotitolo: "",
      claim: "Per la gestione dietetica della sarcopenia",
      categoria: "alimenti-fini-medici-speciali",
      tipologia: "Alimento a fini medici speciali iperproteico",
      stato: "in_commercio",
      anno_lancio: 2019,
      descrizione: "Alimento a fini medici speciali iperproteico in polvere solubile, indicato per la gestione dietetica della sarcopenia (perdita di massa e forza muscolare).",
      composizione: [
        "THIONASS™: proteine del siero del latte (min. 92,5%) ad alto contenuto di cisteina (2,7%)",
        "Emulsionante: lecitina di soia"
      ],
      formati: ["30 bustine da 5 g, peso netto 150 g"],
      caratteristiche: ["Polvere solubile", "Senza glutine"],
      indicazioni: ["Gestione dietetica della sarcopenia, da usare sotto controllo medico."],
      modo_uso: [
        "1-2 bustine al giorno, sciolte in 150-200 ml di acqua o altra bevanda fredda o a temperatura ambiente; mescolare brevemente e bere subito. Su indicazione del medico può essere somministrato anche tramite sonda."
      ],
      avvertenze: [
        "Da usare sotto controllo medico. Non può costituire l'unica fonte di alimentazione. Non somministrare per via parenterale. Tenere fuori dalla portata dei bambini al di sotto dei tre anni."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: ["Paraf 943018857 (da confermare)"],
      immagini: ["assets/img/prodotti/maxtrofic.jpg"],
      fonti_web: [
        {
          url: "https://www.codifa.it/integratori/m/maxtrofic-alimenti-dietetici-destinati-a-fini-medici-speciali",
          titolo: "Scheda Codifa",
          ufficiale: false
        },
        {
          url: "https://www.farmaciedelbenessere.com/maxtrofic-30-bustine.html",
          titolo: "Scheda rivenditore (valori nutrizionali)",
          ufficiale: false
        }
      ],
      pagina_scansione: 3,
      testo_pack: "Maxtrofic® [..] BUSTE. [Nome marchio]™ in esclusiva. Alimento a fini medici speciali per la gestione dietetica della sarcopenia. Polvere solubile. Gluten free (letture parziali: il resto del pack è illeggibile nella scansione).",
      da_verificare: [
        "Composizione (THIONASS, proteine del siero del latte 92,5%, lecitina di soia) e formato (30 buste da 5 g, peso netto 150 g) ripresi da schede di rivenditori: sul pack scansionato si legge solo 'BUSTE' (numero illeggibile). Confermare con l'etichetta.",
        "Valori nutrizionali per busta da 5 g secondo le schede online: 18,2 kcal, proteine 4,6 g. Per 100 g: 364 kcal, proteine 92,5 g, grassi < 1 g, carboidrati < 1,2 g, calcio 500 mg, potassio 300 mg, fosforo 250 mg, sodio 150 mg. Aggiungere al catalogo se confermati.",
        "Le schede online indicano 'adatto agli intolleranti al lattosio (lattosio ≤ 1%)': inserire solo dopo conferma dall'etichetta.",
        "'Gluten free' letto sul pack (poco leggibile), non confermato dalle fonti online.",
        "Esiste anche Maxtrofic Start (14 buste da 5 g, peso netto 70 g): aggiungere come prodotto se a listino.",
        "Sul pack si legge 'BUSTE': nel catalogo è usato 'bustine' per uniformità con gli altri prodotti; adeguare se l'etichetta ufficiale dice 'buste'."
      ]
    },
    {
      id: "dizilen",
      nome: "Dizilen",
      sottotitolo: "",
      claim: "Il benessere nella “stabilità” quotidiana",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2021,
      descrizione: "Integratore alimentare a base di citicolina, acido lipoico, zenzero, vitamina D, zinco, vitamina B6 e vitamina B1.",
      composizione: [
        "Citicolina 500 mg",
        "Acido lipoico 200 mg",
        "Zenzero estratto secco 200 mg (di cui gingeroli 10 mg)",
        "Vitamina D 50 µg",
        "Zinco 10 mg",
        "Vitamina B6 1,4 mg",
        "Vitamina B1 1,1 mg"
      ],
      formati: ["20 compresse da 1,35 g, contenuto 27 g ℮"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [
        "1 compressa al giorno, preferibilmente prima dei pasti a stomaco vuoto, salvo diverso parere del medico."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Prodotto destinato agli adulti. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. In rari casi l'acido lipoico può dare ipoglicemia."
      ],
      testi_slide: [
        "Compensazione vestibolare: un processo di recupero funzionale determinato dalla plasticità intrinseca del SNC di riorganizzarsi.",
        "I fattori che possono interferire con questo processo: ipofunzione labirintica; comorbilità con malattie vascolari che colpiscono aree specifiche e percorsi neurali del SNC che si pensa siano direttamente coinvolti nella compensazione vestibolare; declino cognitivo, dal momento che i VOR sembrano non essere completamente automatici ma dipendere in parte dalle risorse cognitive.",
        "L'esito della riabilitazione vestibolare può essere migliorato dalla stimolazione della neurotrasmissione colinergica, nota per migliorare la compromissione cognitiva (memoria, attenzione, orientamento visivo-spaziale) in particolare di origine vascolare.",
        "SNC = sistema nervoso centrale; VOR = riflessi vestibolo-oculari."
      ],
      riferimenti: [],
      codici: ["Paraf 944294685 (20 compresse, da confermare)"],
      immagini: ["assets/img/prodotti/dizilen.jpg"],
      fonti_web: [
        {
          url: "https://farmaciaigea.com/dizilen-20-compresse",
          titolo: "Scheda rivenditore (tabella nutrizionale)",
          ufficiale: false
        }
      ],
      pagina_scansione: 4,
      testo_pack: "Dizilen®. Integratore alimentare a base di Citicolina, Acido Lipoico, Zenzero, Vitamina D, Zinco, Vitamina B6 e Vitamina B1. 20 compresse da 1,350 g ciascuna. Contenuto 27 g ℮. Logo B.L.V. Pharma Group Srl.",
      da_verificare: [
        "Dosaggi per compressa ripresi da schede online (tabella nutrizionale): confermare con l'etichetta.",
        "Alcune farmacie listano anche una confezione da 10 compresse: verificare se è a listino.",
        "Modo d'uso e avvertenze ripresi da schede online: confermare con l'etichetta.",
        "Testo sull'aletta superiore e sul fianco dell'astuccio illeggibile nella scansione."
      ]
    },
    {
      id: "regler",
      nome: "Regler",
      sottotitolo: "Macrogol 4000",
      claim: "Lassativo di 1ª scelta raccomandato dalle linee guida",
      categoria: "dispositivi-medici",
      tipologia: "Dispositivo medico",
      stato: "in_commercio",
      anno_lancio: 2021,
      descrizione: "Dispositivo medico a base di macrogol 4000 per il trattamento sintomatico della stipsi. Il macrogol è un polimero inerte idrosolubile che lega e trattiene l'acqua nelle feci: la massa fecale si reidrata e si ammorbidisce, facilitando l'evacuazione (effetto osmotico).",
      composizione: ["Macrogol 4000 (10 g per bustina)", "Sucralosio (edulcorante)"],
      formati: [
        "30 bustine monodose da 10 g",
        "Barattolo da 200 g di polvere per soluzione orale, con misurino"
      ],
      caratteristiche: [
        "Marcatura CE 0373",
        "Senza glutine",
        "Polvere per soluzione orale",
        "Agisce entro 24-72 ore"
      ],
      indicazioni: [
        "Trattamento sintomatico della stipsi negli adulti e nei bambini sopra i 12 anni."
      ],
      modo_uso: [
        "Adulti e bambini sopra i 12 anni: da 1 a 4 bustine al giorno, ciascuna sciolta in 125 ml di acqua, oppure misurini rasi sciolti in 50 ml di acqua ciascuno, modulando la dose in base alla risposta individuale fino a ottenere feci morbide."
      ],
      avvertenze: [
        "Se dopo 7 giorni di trattamento non si notano miglioramenti, consultare il medico. Può ridurre l'assorbimento di altri medicinali assunti per via orale: assumerli a distanza di almeno 2 ore. Non usare in caso di ipersensibilità ai componenti o di ileo paralitico. In gravidanza, durante l'allattamento e nei bambini usare solo dopo il parere del medico.",
        "È un dispositivo medico CE 0373. Leggere attentamente le avvertenze o le istruzioni per l'uso."
      ],
      testi_slide: [
        "Efficace nel trattamento sintomatico della stipsi grazie al suo effetto osmotico.",
        "Lassativo di 1ª scelta raccomandato dalle linee guida NASPGHAN/ESPGHAN (Società nordamericana ed europea di gastroenterologia, epatologia e nutrizione pediatrica)."
      ],
      riferimenti: [
        "Linee guida NASPGHAN/ESPGHAN (Società nordamericana ed europea di gastroenterologia, epatologia e nutrizione pediatrica)"
      ],
      codici: [
        "Paraf 947073401 (30 bustine, da confermare)",
        "Paraf 947073413 (barattolo 200 g, da confermare)"
      ],
      immagini: [
        "assets/img/prodotti/regler-bustine.jpg",
        "assets/img/prodotti/regler-barattolo.jpg"
      ],
      fonti_web: [
        {
          url: "https://blvpharmagroup.com/dispositivi-medici/",
          titolo: "Dispositivi medici – sito B.L.V. Pharma Group",
          ufficiale: true
        },
        {
          url: "https://www.topfarmacia.it/p-regler-macrogol-polvere-lassativa-200g",
          titolo: "Scheda rivenditore (barattolo 200 g)",
          ufficiale: false
        }
      ],
      pagina_scansione: 5,
      testo_pack: "Regler®. 30 BUSTINE. Polvere per soluzione orale. 30 bustine monodose da 10 g cad. Trattamento sintomatico della stipsi. AGISCE ENTRO 24-72 ORE. Macrogol 10 g. GLUTEN FREE. (Nel piè di slide: Dispositivo Medico CE 0373.)",
      da_verificare: [
        "Sul sito ufficiale il barattolo è indicato come '200 mg' (refuso per 200 g) e la posologia a misurini è incoerente (2-10 misurini al giorno, ma 'normalmente non oltre 4'): chiarire e correggere anche sul sito.",
        "Numero CE 0373 letto sulla slide, non trovato nelle fonti online: confermare dalle istruzioni per l'uso.",
        "Modo d'uso e avvertenze ripresi dal sito ufficiale e da schede online: confermare con le istruzioni per l'uso.",
        "Codici Paraf riportati da un rivenditore come 'codice articolo': confermare.",
        "Etichetta del barattolo da 200 g e testo delle bustine illeggibili nella scansione: completare dal campione fisico.",
        "Se il catalogo sarà rivolto al pubblico, la scheda di un dispositivo medico è pubblicità e richiede l'autorizzazione del Ministero della Salute (con la dicitura 'Autorizzazione del Ministero della Salute del ...'): verificare prima di pubblicare."
      ]
    },
    {
      id: "morelac",
      nome: "Morelac",
      sottotitolo: "",
      claim: "Per le sindromi dismicrobiche intestinali",
      categoria: "medicinali",
      tipologia: "Medicinale senza obbligo di prescrizione (SOP), classe C",
      stato: "in_commercio",
      anno_lancio: 2023,
      descrizione: "Medicinale a base di fermenti lattici vivi liofilizzati, in polvere per sospensione orale. Ogni bustina contiene tre lattobatteri attivi e capaci di adattarsi all'ambiente intestinale.",
      composizione: [
        "Streptococcus thermophilus P-18807 (almeno 4 miliardi di UFC per bustina)",
        "Lactobacillus acidophilus P-18806 (almeno 10 milioni di UFC per bustina)",
        "Lactobacillus delbrueckii P-18805 (almeno 5 milioni di UFC per bustina)"
      ],
      formati: [
        "10 bustine di polvere per sospensione orale",
        "14 bustine di polvere per sospensione orale"
      ],
      caratteristiche: ["Aroma banana-albicocca", "Uso orale", "Prodotto da Proge Farm S.r.l."],
      indicazioni: [
        "Sindromi dismicrobiche intestinali: sindromi diarroiche e dispeptiche da alterata flora batterica (diarrea, enteriti aspecifiche, coliti); dismicrobismo intestinale da antibiotici."
      ],
      modo_uso: [
        "Adulti: 1-2 bustine al giorno. Il contenuto della bustina si assume con poca acqua oppure sciolto in poca acqua zuccherata o latte."
      ],
      avvertenze: [
        "Contiene lattosio, sorbitolo e saccarosio. I fermenti sono sensibili ai principali antibiotici: assumere il medicinale almeno 3 ore dopo l'antibiotico. Conservare tra 2 e 8 °C (brevi periodi a temperatura ambiente non ne compromettono significativamente l'attività). Leggere attentamente il foglio illustrativo."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: ["AIC 034966010 (10 bustine)", "AIC 034966022 (14 bustine)"],
      immagini: ["assets/img/prodotti/morelac.jpg"],
      fonti_web: [
        {
          url: "https://www.codifa.it/farmaci/m/morelac-lactobacillus-acidophilus-vivo-liofilizzato-e-lactobacillus-delbrueckii-vivo-liofilizzato-e-streptococcus-thermophilus-vivo-liofilizzato-antidiarroici-microrganismi-antidiarroici",
          titolo: "Scheda Codifa (RCP)",
          ufficiale: false
        },
        {
          url: "https://www.torrinomedica.it/schede-farmaci/morelac/",
          titolo: "Scheda Torrinomedica",
          ufficiale: false
        },
        {
          url: "https://progefarm.it/en/chi-siamo/",
          titolo: "Proge Farm – chi siamo",
          ufficiale: true
        }
      ],
      pagina_scansione: 6,
      testo_pack: "MORELAC 10.000.000 UFC / 5.000.000 UFC / 4.000.000.000 UFC. Polvere per sospensione orale. Lactobacillus acidophilus P-18806, Lactobacillus delbrueckii P-18805, Streptococcus thermophilus P-18807. Confezione da 10 bustine. Uso orale. Proge Farm.",
      da_verificare: [
        "Regime di fornitura: la presentazione dice sia 'di automedicazione' sia 'SOP', che sono classi diverse. Verificare sulla Banca dati farmaci AIFA (se OTC, correggere la tipologia). I medicinali SOP non possono essere pubblicizzati al pubblico: la scheda con indicazioni e posologia va riservata agli operatori sanitari.",
        "Confezione da 14 bustine (AIC 034966022) ripresa da listini online: verificare che sia a listino.",
        "Anno: il medicinale risulta già autorizzato nel 2014 (documento AIFA, allora Akkadeas Pharma); il 2023 è l'anno di ingresso nel portafoglio B.L.V.",
        "Rapporto con Proge Farm (produttore/titolare AIC) e titolare AIC attuale: da confermare per la scheda.",
        "Alcuni rivenditori online lo segnalano esaurito: verificare la disponibilità.",
        "Posologia e avvertenze riprese da schede online (RCP): confrontare con il foglio illustrativo ufficiale.",
        "La slide rimanda a una nota bibliografica ¹ (indicazioni e composizione) che non è riprodotta sulla pagina: recuperarla dal materiale originale o dal RCP.",
        "Codici dei ceppi letti sul pack (P-18807/18806/18805) e confermati dalla scheda RCP online; testo delle bustine, del fianco dell'astuccio e del bollino con croce rossa illeggibili nella scansione.",
        "Se il catalogo sarà rivolto al pubblico, togliere indicazioni e posologia di Morelac o verificare le regole sulla pubblicità dei medicinali."
      ]
    },
    {
      id: "tiocronal-mito",
      nome: "Tiocronal MITO",
      sottotitolo: "",
      claim: "Energia e protezione dallo stress ossidativo",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2023,
      descrizione: "Integratore alimentare a base di acetil L-carnitina cloridrato, acido alfa lipoico, vitamine del gruppo B e selenio.",
      composizione: [
        "Acetil L-carnitina cloridrato 1.000 mg",
        "Acido alfa lipoico 300 mg",
        "Vitamine del gruppo B (B1 1,1 mg, B2 1,4 mg, B3 16 mg, B5 6 mg, B6 1,4 mg, B12 2,5 µg)",
        "Selenio 55 µg"
      ],
      formati: ["30 compresse, contenuto 48,6 g"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [
        "1 compressa al giorno con un bicchiere d'acqua (circa 150 ml), preferibilmente dopo uno dei pasti principali."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Non assumere in caso di sensibilità ai componenti. Si consiglia di consultare il medico prima dell'uso."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: [],
      immagini: ["assets/img/prodotti/tiocronal-mito.jpg"],
      fonti_web: [
        {
          url: "https://openfarma.it/tiocronal-mito-30-cpr",
          titolo: "Scheda rivenditore (tabella nutrizionale)",
          ufficiale: false
        },
        {
          url: "https://www.drmax.it/tiocronal-mito-compr-30",
          titolo: "Scheda rivenditore (formato)",
          ufficiale: false
        }
      ],
      pagina_scansione: 7,
      testo_pack: "Integratore alimentare a base di Acetil Carnitina Cloridrato, Acido Alfa Lipoico, Vitamine del gruppo B e Selenio. 30 compresse, contenuto 48,6 g.",
      da_verificare: [
        "La presentazione lo indicava 'to be launched in 2023'; risulta oggi in vendita in molte farmacie online, quindi è segnato 'in commercio'. Confermare anno di lancio e claim (il claim attuale è ripreso da un rivenditore, non dal materiale ufficiale).",
        "Dosaggi per compressa, modo d'uso e avvertenze ripresi da schede online: confermare con l'etichetta.",
        "Codice Paraf non trovato.",
        "Testo sulla patella superiore dell'astuccio (modalità d'uso, avvertenze, conservazione) illeggibile nella scansione."
      ]
    },
    {
      id: "enzitrik",
      nome: "EnziTRIK",
      sottotitolo: "",
      claim: "Per il benessere dell'apparato digerente",
      categoria: "integratori",
      tipologia: "Integratore alimentare",
      stato: "in_commercio",
      anno_lancio: 2024,
      descrizione: "Integratore alimentare a base di enzimi digestivi (PoolZyme Multi), magnesio, estratti di finocchio e melissa, L-triptofano, inulina, alfa-galattosidasi e vitamina B6. Finocchio e melissa contribuiscono alla normale funzione digestiva e all'eliminazione dei gas.",
      composizione: [
        "PoolZyme Multi (complesso di enzimi digestivi)",
        "Magnesio",
        "Estratto di finocchio",
        "Estratto di melissa",
        "L-triptofano",
        "Inulina",
        "Alfa-galattosidasi",
        "Vitamina B6"
      ],
      formati: ["30 compresse"],
      caratteristiche: [],
      indicazioni: [],
      modo_uso: [
        "1-2 compresse al giorno, secondo necessità, all'inizio dei pasti principali."
      ],
      avvertenze: [
        "Non superare la dose giornaliera raccomandata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Non assumere in caso di sensibilità accertata ai componenti. Conservare in luogo fresco e asciutto."
      ],
      testi_slide: [],
      riferimenti: [],
      codici: ["Paraf 948157401 (da confermare)"],
      immagini: ["assets/img/prodotti/enzitrik.jpg"],
      fonti_web: [
        {
          url: "https://www.topfarmacia.it/p-enzitrik-integratore-enzimi-digestivi-benessere-apparato-digerente-30-compresse",
          titolo: "Scheda rivenditore (TopFarmacia)",
          ufficiale: false
        },
        {
          url: "https://openfarma.it/enzitrik-30-cpr",
          titolo: "Scheda rivenditore (Openfarma)",
          ufficiale: false
        }
      ],
      pagina_scansione: 8,
      testo_pack: "Slide con solo il logo EnziTRIK® e la scritta 'TO BE LAUNCHED IN 2024'.",
      da_verificare: [
        "Nella presentazione c'è solo il logo ('to be launched in 2024'): tutti i dati vengono da schede di rivenditori online e vanno confermati con l'etichetta e il materiale ufficiale.",
        "Forma: un rivenditore parla di compresse masticabili, un altro di compresse rivestite.",
        "Mancano peso netto, dosaggi per compressa e foto della confezione (ora è mostrato solo il logo).",
        "Il claim è provvisorio.",
        "Recuperare il file del logo EnziTRIK® (wordmark 'Enzi' nero e 'TRIK' verde) e una foto della confezione per il catalogo."
      ]
    }
  ]
};

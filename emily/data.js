/* ============================================================
   EMILY'S REVISION HUB — MASTER DATA FILE
   To add a new subject: add an entry to SUBJECTS, MINDMAP_DATA,
   LESSONS, and QUIZ_QUESTIONS below.
   ============================================================ */

/* ── SHARED COLOUR PALETTE ─────────────────────────────────── */
const PALETTE = {
  purple: { color:"#7c6fcd", light:"#c4bbff", bg:"rgba(124,111,205,0.18)" },
  teal:   { color:"#3ecfac", light:"#9ef5e2", bg:"rgba(62,207,172,0.15)"  },
  amber:  { color:"#f5a623", light:"#ffd580", bg:"rgba(245,166,35,0.15)"  },
  red:    { color:"#e05c6a", light:"#ffaab3", bg:"rgba(224,92,106,0.15)"  },
  coral:  { color:"#f07050", light:"#ffbfad", bg:"rgba(240,112,80,0.15)"  },
  pink:   { color:"#d066a8", light:"#f5b8e4", bg:"rgba(208,102,168,0.15)" },
  blue:   { color:"#4a90d9", light:"#a8d0ff", bg:"rgba(74,144,217,0.15)"  },
  green:  { color:"#5bbf6a", light:"#b2f0bb", bg:"rgba(91,191,106,0.15)"  },
  rose:   { color:"#e0607e", light:"#ffb3c4", bg:"rgba(224,96,126,0.18)"  },
  violet: { color:"#9b6dcd", light:"#d4b8ff", bg:"rgba(155,109,205,0.18)" },
  gold:   { color:"#d4a017", light:"#ffe580", bg:"rgba(212,160,23,0.15)"  },
};

/* ── SUBJECTS ───────────────────────────────────────────────── */
const SUBJECTS = {
  maths: {
    id: "maths",
    name: "Mathematics",
    icon: "📐",
    tag: "Year 8 · Mathematics · EOY Revision",
    tagline: "1 hour paper · Calculators allowed",
    gradient: ["#7c6fcd","#3ecfac"],
    topicMeta: {
      "Indices":             { ...PALETTE.purple, icon:"🔢" },
      "Transformations":     { ...PALETTE.teal,   icon:"📐" },
      "Brackets":            { ...PALETTE.amber,  icon:"🧮" },
      "Linear Equations":    { ...PALETTE.red,    icon:"⚖️" },
      "Fractions & %":       { ...PALETTE.coral,  icon:"🍕" },
      "Squares & Rounding":  { ...PALETTE.pink,   icon:"🔲" },
      "Circles":             { ...PALETTE.teal,   icon:"⭕" },
      "Standard Form":       { ...PALETTE.blue,   icon:"🔬" },
      "Statistics":          { ...PALETTE.green,  icon:"📊" },
    }
  },
  english: {
    id: "english",
    name: "English – Poetry",
    icon: "📖",
    tag: "Year 8 · English · Unseen Poetry Exam",
    tagline: "Unseen poetry essay",
    gradient: ["#e0607e","#9b6dcd"],
    topicMeta: {
      "Reading a Poem":    { ...PALETTE.rose,   icon:"👁️" },
      "Essay Writing":     { ...PALETTE.violet, icon:"✍️" },
      "PETAL":             { ...PALETTE.gold,   icon:"🌸" },
      "Poetic Techniques": { ...PALETTE.teal,   icon:"🎭" },
      "Sentence Stems":    { ...PALETTE.coral,  icon:"💬" },
      "Terminology":       { ...PALETTE.blue,   icon:"📚" },
      "Analysis Method":   { ...PALETTE.pink,   icon:"🔬" },
      "Practice Poems":    { ...PALETTE.amber,  icon:"📜" },
    }
  },
  geography: {
    id: "geography",
    name: "Geography",
    icon: "🌍",
    tag: "Year 8 · Geography · Summer Exam Revision",
    tagline: "Map Skills · Antarctica · Fashion · Africa · Coasts",
    gradient: ["#5bbf6a","#4a90d9"],
    topicMeta: {
      "Map Skills":       { ...PALETTE.green,  icon:"🗺️" },
      "Antarctica":       { ...PALETTE.blue,   icon:"🧊" },
      "Global Fashion":   { ...PALETTE.pink,   icon:"👗" },
      "Africa":           { ...PALETTE.amber,  icon:"🌍" },
      "Coasts":           { ...PALETTE.teal,   icon:"🌊" },
    }
  },
  spanish: {
    id: "spanish",
    name: "Spanish",
    icon: "🇪🇸",
    tag: "Year 8 · Spanish · Summer Assessment 2026",
    tagline: "Reading · Grammar · Translation · Speaking",
    gradient: ["#e05c6a","#f5a623"],
    topicMeta: {
      "House and Home":   { ...PALETTE.coral,  icon:"🏠" },
      "School":           { ...PALETTE.blue,   icon:"🎒" },
      "Grammar":          { ...PALETTE.violet, icon:"📝" },
    }
  },
  science: {
    id: "science",
    name: "Science",
    icon: "🔬",
    tag: "Year 8 · Science · End of Year Revision",
    tagline: "Acids · Reactions · Plants · Electricity · Forces · Waves",
    gradient: ["#43b89c","#4a90d9"],
    topicMeta: {
      "Scientific Skills":  { ...PALETTE.teal,   icon:"📊" },
      "Acids and Alkalis":  { ...PALETTE.green,  icon:"🧪" },
      "Chemical Reactions": { ...PALETTE.amber,  icon:"⚗️" },
      "Plants and Ecosystems": { ...PALETTE.green, icon:"🌿" },
      "Electricity":        { ...PALETTE.gold,   icon:"⚡" },
      "Forces and Motion":  { ...PALETTE.blue,   icon:"🔵" },
      "Waves and Light":    { ...PALETTE.violet, icon:"🌈" },
    }
  }
};

/* ── MINDMAP DATA ───────────────────────────────────────────── */
/* Each topic card: { topic, icon, subtitle, theme(palette key), subtopics[], quizTopic } */
/* Each subtopic: { title, detail, lessonKey?, formula? } */

const MINDMAP_DATA = {

  maths: [
    {
      topic:"Indices", icon:"🔢", theme:"purple",
      subtitle:"Powers and prime factors",
      quizTopic:"Indices",
      subtopics:[
        { title:"Index notation",                    detail:"Writing repeated multiplication as a power e.g. 2³ = 8",             lessonKey:"index-notation" },
        { title:"Product of prime factors",          detail:"Factor trees to express any number as a product of primes",          lessonKey:"prime-factors" },
        { title:"LCM & HCF with Venn diagrams",      detail:"HCF = shared primes · LCM = all primes across both numbers",        lessonKey:"prime-factors" },
        { title:"Laws of indices",                   detail:"Multiply → add · Divide → subtract · Power of power → multiply",    lessonKey:"laws-of-indices",   formula:"aᵐ×aⁿ=aᵐ⁺ⁿ · aᵐ÷aⁿ=aᵐ⁻ⁿ · (aᵐ)ⁿ=aᵐⁿ" },
        { title:"Negative indices",                  detail:"Negative power = reciprocal  e.g. 5⁻² = 1/25",                     lessonKey:"negative-indices",  formula:"a⁻ⁿ = 1/aⁿ" },
        { title:"Simplifying expressions",           detail:"Multiply coefficients, apply index laws to each letter separately",  lessonKey:"simplifying-indices" },
      ]
    },
    {
      topic:"Transformations", icon:"🔄", theme:"teal",
      subtitle:"Moving and changing shapes",
      quizTopic:"Transformations",
      subtopics:[
        { title:"Rotational symmetry",     detail:"How many times a shape maps onto itself in one full turn",              lessonKey:"rotational-symmetry" },
        { title:"Translations",            detail:"Slide using a column vector — every point moves the same distance",    lessonKey:"translations",       formula:"(x/y): x = across, y = up/down" },
        { title:"Reflections",             detail:"Mirror in a line — state the mirror line fully",                       lessonKey:"reflections" },
        { title:"Rotations",               detail:"State: angle + direction (CW/CCW) + centre of rotation",              lessonKey:"rotations" },
        { title:"Describing transformations", detail:"Always name the transformation first, then give all required details", lessonKey:"rotations" },
      ]
    },
    {
      topic:"Brackets", icon:"🧮", theme:"amber",
      subtitle:"Expanding, factorising, substituting",
      quizTopic:"Brackets",
      subtopics:[
        { title:"Substitution",              detail:"Replace letters with numbers — use brackets around negatives!",    lessonKey:"substitution",            formula:"If a=3,b=−2: 2a+b=4" },
        { title:"Expanding single brackets", detail:"Multiply outside term by every term inside the bracket",          lessonKey:"expanding-single-brackets",formula:"3(2x−5)=6x−15" },
        { title:"Expanding double brackets", detail:"FOIL: First · Outside · Inside · Last, then collect like terms",  lessonKey:"double-brackets",         formula:"(x+3)(x+4)=x²+7x+12" },
        { title:"Factorising single brackets",detail:"Find HCF and take it outside — check by expanding back",        lessonKey:"factorising",             formula:"12x+8=4(3x+2)" },
      ]
    },
    {
      topic:"Linear Equations", icon:"⚖️", theme:"red",
      subtitle:"Solving and forming equations",
      quizTopic:"Linear Equations",
      subtopics:[
        { title:"Solving — unknowns on both sides", detail:"Collect x-terms on one side, numbers on the other",    lessonKey:"solving-equations",       formula:"5x−3=2x+9 → x=4" },
        { title:"Equations with brackets",          detail:"Expand first, then solve normally",                    lessonKey:"solving-equations",       formula:"2(x+3)=14 → x=4" },
        { title:"Equations with fractions",         detail:"Multiply every term by the denominator to clear fractions", lessonKey:"equations-fractions",  formula:"x/3+2=6 → x=12" },
        { title:"Forming and solving equations",    detail:"Define unknown → write equation → solve → check",     lessonKey:"forming-equations" },
      ]
    },
    {
      topic:"Fractions & %", icon:"🍕", theme:"coral",
      subtitle:"Operations and percentage change",
      quizTopic:"Fractions & %",
      subtopics:[
        { title:"Add & subtract fractions",         detail:"Common denominator first, then add/subtract numerators",        lessonKey:"fractions-ops", formula:"1/4+1/3=7/12" },
        { title:"Multiply & divide fractions",      detail:"Multiply: top×top, bottom×bottom · Divide: Keep Change Flip",   lessonKey:"fractions-ops", formula:"2/3÷1/4 = 2/3×4/1 = 8/3" },
        { title:"Percentage increase & decrease",   detail:"Increase r%: ×(1+r/100) · Decrease r%: ×(1−r/100)",          lessonKey:"percentage-change", formula:"Decrease 15%: ×0.85" },
        { title:"Percentage change",                detail:"(change ÷ original) × 100",                                   lessonKey:"percentage-change", formula:"(10÷50)×100 = 20%" },
      ]
    },
    {
      topic:"Squares & Rounding", icon:"🔲", theme:"pink",
      subtitle:"Precision and estimation",
      quizTopic:"Squares & Rounding",
      subtopics:[
        { title:"Squaring & square roots",        detail:"Know 1²–15² by heart · √144=12, √169=13, √225=15",       lessonKey:"squares-roots" },
        { title:"Rounding to decimal places",     detail:"Count digits after decimal · ≥5 round up",               lessonKey:"rounding",       formula:"3.4572 to 2 d.p. = 3.46" },
        { title:"Rounding to significant figures",detail:"Count from first non-zero digit · ignore leading zeros",  lessonKey:"rounding",       formula:"0.007463 to 2 s.f. = 0.0075" },
        { title:"Estimation & estimating roots",  detail:"Round to 1 s.f. first · bracket roots between known squares", lessonKey:"squares-roots", formula:"√50 is between 7 and 8" },
      ]
    },
    {
      topic:"Circles", icon:"⭕", theme:"teal",
      subtitle:"Circumference, area, arcs & sectors",
      quizTopic:"Circles",
      subtopics:[
        { title:"Circumference",            detail:"Distance around a circle",          lessonKey:"circles",  formula:"C = πd = 2πr" },
        { title:"Area of a circle",         detail:"Space inside — use radius not diameter", lessonKey:"circles", formula:"A = πr²" },
        { title:"Arc length & area of sector", detail:"Semi=½ · Quarter=¼ · Three-quarter=¾ of full formula", lessonKey:"circles", formula:"Arc=fraction×πd" },
      ]
    },
    {
      topic:"Standard Form", icon:"🔬", theme:"blue",
      subtitle:"Very big and very small numbers",
      quizTopic:"Standard Form",
      subtopics:[
        { title:"Writing numbers in standard form",    detail:"Move decimal to get 1≤a<10, count moves = power",  lessonKey:"standard-form", formula:"34,000,000 = 3.4×10⁷" },
        { title:"Converting back to ordinary numbers", detail:"Positive power → move right · Negative → move left", lessonKey:"standard-form", formula:"6.2×10⁻³ = 0.0062" },
        { title:"Calculations in standard form",       detail:"× ÷: deal with a-values and powers separately",   lessonKey:"standard-form", formula:"(2×10³)×(4×10⁵)=8×10⁸" },
      ]
    },
    {
      topic:"Statistics", icon:"📊", theme:"green",
      subtitle:"Data collection and averages",
      quizTopic:"Statistics",
      subtopics:[
        { title:"Discrete vs continuous data",     detail:"Discrete = counted (exact values) · Continuous = measured (any value)", lessonKey:"statistics-data" },
        { title:"Mean, median, mode & range",      detail:"Sort first! Mean=total÷count · Median=middle · Mode=most common",       lessonKey:"statistics-averages", formula:"Range = max − min" },
        { title:"Averages from frequency tables",  detail:"Mean = Σ(fx)÷Σf · add a cumulative frequency column for median",       lessonKey:"statistics-freq" },
        { title:"Charts & misleading graphs",      detail:"Check: axis from zero? Equal widths? Quote numbers in conclusions",     lessonKey:"statistics-charts" },
      ]
    },
  ],

  english: [
    {
      topic:"Reading a Poem", icon:"👁️", theme:"rose",
      subtitle:"Your 4-step approach in the exam",
      quizTopic:"Reading a Poem",
      subtopics:[
        { title:"Step 1: Read the question first",     detail:"Highlight the command words — they are your compass for the whole essay",  lessonKey:"reading-q-first" },
        { title:"Step 2: First read for understanding",detail:"Read through once — get the subject, mood and general meaning",           lessonKey:"reading-first-read" },
        { title:"Step 3: Annotate using the question", detail:"Re-read, highlighting techniques and quotes that link to command words",   lessonKey:"reading-annotate" },
        { title:"Step 4: Plan your essay",             detail:"Thesis + 3 topic sentences + quotes and techniques under each",           lessonKey:"reading-plan" },
      ]
    },
    {
      topic:"Essay Writing", icon:"✍️", theme:"violet",
      subtitle:"Introduction, structure and conclusion",
      quizTopic:"Essay Writing",
      subtopics:[
        { title:"Writing your introduction",      detail:"Thesis + command words + writer's purpose + optional summarising quote", lessonKey:"essay-intro" },
        { title:"Writing body paragraphs (PEEA)", detail:"PEEA: Point → Evidence → Explain → Analysis (zoom in)",                lessonKey:"essay-body" },
        { title:"Writing body paragraphs",        detail:"PEEA: Point → Evidence → Explain → Analysis (zoom in)",                lessonKey:"essay-body" },
        { title:"Writing a conclusion",           detail:"Return to thesis · summarise · comment on writer's overall purpose",    lessonKey:"essay-conclusion" },
        { title:"Exam timing & technique",        detail:"How long to spend on each section, how much to write",                  lessonKey:"essay-exam-tips" },
      ]
    },
    {
      topic:"PETAL", icon:"🌸", theme:"gold",
      subtitle:"Your paragraph structure",
      quizTopic:"PETAL",
      subtopics:[
        { title:"P — Point",      detail:"State the supporting point to your thesis — include command words",                    lessonKey:"petal-p" },
        { title:"E — Evidence",   detail:"Integrate a short precise quote in single inverted commas, embedded naturally",        lessonKey:"petal-e" },
        { title:"T — Technique",  detail:"Identify the technique used and explain its effect using subject terminology",         lessonKey:"petal-t" },
        { title:"A — Analysis",   detail:"Analyse the impact of evidence and techniques — how they work together to support your point", lessonKey:"petal-a" },
        { title:"L — Link",       detail:"Link your point back to your thesis statement",                                        lessonKey:"petal-l" },
      ]
    },
    {
      topic:"Poetic Techniques", icon:"🎭", theme:"teal",
      subtitle:"Language, sound and structure devices",
      quizTopic:"Poetic Techniques",
      subtopics:[
        { title:"Figurative language",      detail:"Simile · Metaphor · Personification · Pathetic fallacy · Oxymoron · Symbolism",  lessonKey:"techniques-figurative" },
        { title:"Sound devices",            detail:"Alliteration · Plosive · Assonance · Sibilance · Onomatopoeia · Consonance",     lessonKey:"techniques-sound" },
        { title:"Structural devices",       detail:"Enjambment · Caesura · End-stop · Volta · Rhyme scheme · Stanza form",          lessonKey:"techniques-structure" },
        { title:"Word choices",             detail:"Noun · Verb · Adjective · Adverb · Connotations · Semantic field",              lessonKey:"techniques-words" },
        { title:"Repetition & other devices",detail:"Anaphora · Hyperbole · Irony · Ellipsis · Pun · Cliché · Dialect",            lessonKey:"techniques-repetition" },
      ]
    },
    {
      topic:"Sentence Stems", icon:"💬", theme:"coral",
      subtitle:"How to phrase your analysis",
      quizTopic:"Sentence Stems",
      subtopics:[
        { title:"Introducing a technique",         detail:"The [technique] '[quote]' suggests/implies/conveys…",                      lessonKey:"stems-technique",   formula:"The simile '…' suggests…" },
        { title:"Word-level analysis",             detail:"The word '___' implies… / The connotations of '___' suggest…",            lessonKey:"stems-word-level",  formula:"The verb 'must' implies…" },
        { title:"Multiple interpretations",        detail:"This could suggest…, but it might also imply… / Another reading is…",    lessonKey:"stems-alternative" },
        { title:"Writer's purpose",                detail:"The poet may be trying to show… / The purpose here could be to highlight…",lessonKey:"stems-purpose" },
        { title:"Deeper meanings & broader ideas", detail:"On a deeper level… / This reflects wider ideas about… because…",         lessonKey:"stems-deeper" },
      ]
    },
    {
      topic:"Terminology", icon:"📚", theme:"blue",
      subtitle:"Key vocabulary — definitions and examples",
      quizTopic:"Terminology",
      subtopics:[
        { title:"Language device glossary A–O",   detail:"Alliteration · Anaphora · Assonance · Cliché · Consonance · Irony · Metaphor · Onomatopoeia · Oxymoron", lessonKey:"term-language-1" },
        { title:"Language device glossary P–S",   detail:"Pathetic fallacy · Persona · Plosive · Semantic field · Sibilance · Simile · Symbolism",                 lessonKey:"term-language-2" },
        { title:"Form & structure glossary",      detail:"Blank verse · Caesura · Couplet · Elegy · End-stop · Enjambment · Free verse · Iambic pentameter",       lessonKey:"term-form-structure" },
        { title:"More form & structure",          detail:"Quatrain · Rhyme · Rhythm · Sestet · Sonnet · Stanza · Volta — plus form types",                         lessonKey:"term-form-2" },
        { title:"Tone & mood vocabulary",         detail:"Nostalgic · Melancholic · Elegiac · Defiant · Contemplative · Tender · Pathos · Satire",                 lessonKey:"term-tone" },
      ]
    },
    {
      topic:"Analysis Method", icon:"🔬", theme:"pink",
      subtitle:"How to analyse a text — 5 lenses",
      quizTopic:"Analysis Method",
      subtopics:[
        { title:"Deeper meaning",            detail:"Initially it seems the text is about ___ but deep down the author is saying ___",      lessonKey:"analysis-deeper" },
        { title:"Language choices",          detail:"The word '___' makes me feel ___ because ___ / the author has used '___' because ___",  lessonKey:"analysis-language" },
        { title:"Links within the text",     detail:"This part reminds me of ___ / Things have changed here because earlier ___ but now ___",lessonKey:"analysis-links" },
        { title:"Reader impact",             detail:"The author wants a reader to feel ___ because ___ / uses ___ and ___ to make reader ___",lessonKey:"analysis-reader" },
        { title:"Multiple interpretations",  detail:"'___' could mean ___ but it could also mean ___ / author might be using ___ as symbol", lessonKey:"analysis-interpretations" },
      ]
    },
    {
      topic:"Practice Poems", icon:"📜", theme:"amber",
      subtitle:"Three poems with full worked examples",
      quizTopic:"Practice Poems",
      subtopics:[
        { title:"'Song of the Old Mother' — Yeats",  detail:"How does Yeats present ideas and feelings about motherhood?",                    lessonKey:"poem-old-mother" },
        { title:"'First Love' — John Clare",         detail:"How does Clare present feelings about love in 'First Love'?",                    lessonKey:"poem-first-love" },
        { title:"'The Schoolboy' — William Blake",   detail:"How does Blake present the schoolboy's feelings about nature and school?",        lessonKey:"poem-schoolboy" },
        { title:"Model paragraph walkthrough",       detail:"Full PEEA model paragraph with teacher's own example from 'Song of the Old Mother'", lessonKey:"poem-model-paragraph" },
      ]
    },
  ],


  spanish: [
    {
      topic:"House and Home", icon:"🏠", theme:"coral",
      subtitle:"Where you live, your house, rooms, furniture and your town",
      quizTopic:"House and Home",
      subtopics:[
        { title:"Where you live and types of house",   detail:"Vivo en… · un piso · una casa · una granja · un pueblo · una ciudad · en el norte/sur",      lessonKey:"sp-house-types" },
        { title:"Rooms in the house",                  detail:"el salón · la cocina · el dormitorio · el baño · el jardín · el comedor · el garaje",          lessonKey:"sp-rooms" },
        { title:"Furniture",                           detail:"la cama · el armario · la mesa · la silla · el sofá · la ducha · el lavabo",                  lessonKey:"sp-furniture" },
        { title:"Prepositions — where things are",     detail:"al lado de · delante de · detrás de · encima de · debajo de · entre · enfrente de",           lessonKey:"sp-prepositions",  formula:"al lado de = next to" },
        { title:"What there is in your town",          detail:"Hay… · una piscina · un polideportivo · una biblioteca · un parque · un mercado · una iglesia", lessonKey:"sp-town" },
        { title:"Adjectives to describe places",       detail:"bonito/a · grande · pequeño/a · moderno/a · antiguo/a · tranquilo/a · animado/a",             lessonKey:"sp-town",          formula:"Remember adjective agreement!" },
        { title:"What you can do in your town",        detail:"Se puede… · ir de compras · nadar · jugar al fútbol · visitar los monumentos · salir con amigos", lessonKey:"sp-town" },
      ]
    },
    {
      topic:"School", icon:"🎒", theme:"blue",
      subtitle:"Subjects, timetable, opinions, facilities and uniform",
      quizTopic:"School",
      subtopics:[
        { title:"School subjects vocabulary",       detail:"el inglés · las matemáticas · las ciencias · la historia · el español · la educación física", lessonKey:"sp-subjects" },
        { title:"Opinions and adjectives",          detail:"Me gusta(n)… · Me encanta(n)… · No me gusta(n)… · es fácil · difícil · aburrido/a · interesante", lessonKey:"sp-subjects",    formula:"me gusta + singular · me gustan + plural" },
        { title:"Telling the time",                 detail:"¿Qué hora es? · Es la una · Son las dos · y media · y cuarto · menos cuarto · de la mañana/tarde",  lessonKey:"sp-time" },
        { title:"Describing your timetable",        detail:"Los lunes… · por la mañana… · por la tarde… · primero… · luego… · después…",                     lessonKey:"sp-timetable" },
        { title:"Facilities at school",             detail:"En mi insti hay… · un campo de fútbol · una piscina · un laboratorio · una sala de ordenadores",  lessonKey:"sp-school-facilities" },
        { title:"Uniform — clothes and colours",    detail:"Llevo… · una camisa · un pantalón · una falda · una corbata · zapatos · blanco/a · negro/a · rojo/a · azul", lessonKey:"sp-uniform" },
      ]
    },
    {
      topic:"Grammar", icon:"📝", theme:"violet",
      subtitle:"Adjective agreement, present tense verbs and the near future",
      quizTopic:"Grammar",
      subtopics:[
        { title:"Adjective agreement",              detail:"Adjectives must match noun: masculine/feminine, singular/plural · bonito→bonita→bonitos→bonitas",  lessonKey:"sp-adjectives",   formula:"un chico alto · una chica alta" },
        { title:"AR verbs — present tense",         detail:"estudiar: estudio · estudias · estudia · estudiamos · estudiáis · estudian",                      lessonKey:"sp-ar-verbs",     formula:"-o -as -a -amos -áis -an" },
        { title:"ER verbs — present tense",         detail:"leer: leo · lees · lee · leemos · leéis · leen",                                                  lessonKey:"sp-er-verbs",     formula:"-o -es -e -emos -éis -en" },
        { title:"IR verbs — present tense",         detail:"vivir: vivo · vives · vive · vivimos · vivís · viven",                                            lessonKey:"sp-ir-verbs",     formula:"-o -es -e -imos -ís -en" },
        { title:"Me gusta / me gustan",             detail:"Me gusta + singular noun or infinitive · Me gustan + plural noun · No me gusta/gustan for negative", lessonKey:"sp-me-gusta" },
        { title:"Near future tense",                detail:"Voy a + infinitive = I am going to… · Vas a · Va a · Vamos a · Vais a · Van a",                   lessonKey:"sp-near-future",  formula:"Voy a estudiar = I am going to study" },
      ]
    },
  ],

  science: [
    {
      topic:"Scientific Skills", icon:"📊", theme:"teal",
      subtitle:"Variables, graphs and interpreting data",
      quizTopic:"Scientific Skills",
      subtopics:[
        { title:"Types of variable",       detail:"Independent · Dependent · Control — know the difference and how to identify them",             lessonKey:"sci-variables" },
        { title:"Drawing graphs",          detail:"SALTS: Scale · Axes · Labels · Title · Shape — scatter or line graph, always plot accurately",  lessonKey:"sci-graphs",    formula:"x-axis = independent · y-axis = dependent" },
        { title:"Interpreting graphs",     detail:"Describe trend, quote values, identify anomalies — use data to support conclusions",             lessonKey:"sci-graphs" },
      ]
    },
    {
      topic:"Acids and Alkalis", icon:"🧪", theme:"green",
      subtitle:"pH, indicators, neutralisation and word equations",
      quizTopic:"Acids and Alkalis",
      subtopics:[
        { title:"pH scale and indicators",       detail:"pH 1–6 acid · pH 7 neutral · pH 8–14 alkali · Universal indicator colours · Litmus tests", lessonKey:"sci-ph",          formula:"pH 1 = strong acid · pH 14 = strong alkali" },
        { title:"Neutralisation",                detail:"Acid + alkali → salt + water · the reaction that produces a neutral product",               lessonKey:"sci-neutralisation" },
        { title:"Acids + carbonates",            detail:"Acid + carbonate → salt + water + carbon dioxide · CO₂ makes limewater turn milky",        lessonKey:"sci-acid-reactions" },
        { title:"Acids + metal oxides",          detail:"Acid + metal oxide → salt + water · naming salts from acid used",                          lessonKey:"sci-acid-reactions",  formula:"HCl → chloride · H₂SO₄ → sulphate · HNO₃ → nitrate" },
        { title:"Naming salts",                  detail:"The acid determines the salt name: hydrochloric → chloride, sulphuric → sulphate, nitric → nitrate", lessonKey:"sci-acid-reactions" },
      ]
    },
    {
      topic:"Chemical Reactions", icon:"⚗️", theme:"amber",
      subtitle:"Physical vs chemical change, word equations and lab apparatus",
      quizTopic:"Chemical Reactions",
      subtopics:[
        { title:"Physical vs chemical change",  detail:"Physical = reversible, no new substance · Chemical = irreversible, new product formed",    lessonKey:"sci-changes" },
        { title:"Reactants and products",        detail:"Reactants are starting materials · Products are what is made · Arrow not equals sign",     lessonKey:"sci-word-equations" },
        { title:"Word equations",                detail:"Reactant + reactant → product + product · oxygen→oxide, sulphur→sulphide naming rules",    lessonKey:"sci-word-equations" },
        { title:"Energy in reactions",           detail:"Exothermic releases energy to surroundings (temp rises) · Endothermic absorbs energy (temp falls)", lessonKey:"sci-energy-reactions" },
        { title:"Lab apparatus",                 detail:"Thermometer · Bunsen burner · Test tube · Boiling tube · Tripod · Gauze · Beaker",         lessonKey:"sci-apparatus" },
      ]
    },
    {
      topic:"Plants and Ecosystems", icon:"🌿", theme:"green",
      subtitle:"Photosynthesis, mineral ions, food chains and bioaccumulation",
      quizTopic:"Plants and Ecosystems",
      subtopics:[
        { title:"Photosynthesis",              detail:"Carbon dioxide + water → glucose + oxygen · needs light energy · chlorophyll absorbs light", lessonKey:"sci-photosynthesis",  formula:"CO₂ + H₂O → glucose + O₂" },
        { title:"Mineral ions and deficiencies", detail:"Nitrogen (growth) · Phosphorus (roots) · Potassium (leaves/flowers) · Magnesium (chlorophyll)", lessonKey:"sci-minerals" },
        { title:"Food chains and webs",        detail:"Producer → primary consumer → secondary consumer · arrows show energy flow",                lessonKey:"sci-food-chains" },
        { title:"Interdependence",             detail:"Organisms in a food web depend on each other — remove one and others are affected",          lessonKey:"sci-food-chains" },
        { title:"Bioaccumulation",             detail:"Toxins build up in organisms higher up the food chain — most concentrated in top predators", lessonKey:"sci-food-chains" },
      ]
    },
    {
      topic:"Electricity", icon:"⚡", theme:"gold",
      subtitle:"Static electricity, circuits, current, voltage and resistance",
      quizTopic:"Electricity",
      subtopics:[
        { title:"Static electricity",          detail:"Charging by rubbing insulators · electrons transfer · like charges repel · opposite attract",  lessonKey:"sci-static" },
        { title:"Electric current",            detail:"Flow of electric charge · measured in amperes (A) with ammeter · conventional current + to −", lessonKey:"sci-current",   formula:"Current = charge ÷ time" },
        { title:"Potential difference",        detail:"Energy per coulomb of charge · measured in volts (V) · voltmeter placed in parallel",          lessonKey:"sci-current" },
        { title:"Resistance",                  detail:"Opposition to current flow · measured in ohms (Ω) · R = V ÷ I",                               lessonKey:"sci-resistance",  formula:"R = V ÷ I" },
      ]
    },
    {
      topic:"Forces and Motion", icon:"🔵", theme:"blue",
      subtitle:"Turning moments, pressure and gravity",
      quizTopic:"Forces and Motion",
      subtopics:[
        { title:"Turning moments",             detail:"Moment = force × distance from pivot · unit = newton-metre (Nm) · balanced = clockwise = anticlockwise", lessonKey:"sci-moments",  formula:"M = F × d" },
        { title:"Pressure",                    detail:"Pressure = force ÷ area · unit = N/m² or pascals (Pa)",                                        lessonKey:"sci-pressure",  formula:"P = F ÷ A" },
        { title:"Gravity",                     detail:"Gravity on Mars is less than Earth · weight = mass × gravitational field strength",             lessonKey:"sci-gravity",   formula:"W = m × g" },
      ]
    },
    {
      topic:"Waves and Light", icon:"🌈", theme:"violet",
      subtitle:"Sound waves, the wave equation, reflection, colour and the eye",
      quizTopic:"Waves and Light",
      subtopics:[
        { title:"Sound — key terms",           detail:"Amplitude · frequency · pitch · compression · rarefaction · decibel · hertz · oscilloscope",  lessonKey:"sci-sound" },
        { title:"Wave equation",               detail:"Wave speed = frequency × wavelength · v = f × λ",                                             lessonKey:"sci-wave-equation",  formula:"v = f × λ" },
        { title:"Light — reflection",          detail:"Law of reflection: angle of incidence = angle of reflection · normal line · virtual images",  lessonKey:"sci-reflection" },
        { title:"Transparent, translucent, opaque", detail:"Transparent transmits · translucent scatters · opaque absorbs/reflects → shadow",       lessonKey:"sci-reflection" },
        { title:"Colour and filters",          detail:"Primary colours: red, green, blue · filters subtract colours · white light = all colours",    lessonKey:"sci-colour",    formula:"R+G+B = white" },
        { title:"Eyes and cameras",            detail:"Lens refracts light onto retina · inverted image · photoreceptors detect light · optic nerve", lessonKey:"sci-colour" },
      ]
    },
  ],

  geography: [
    {
      topic:"Map Skills", icon:"🗺️", theme:"green",
      subtitle:"Grid references and measuring distance",
      quizTopic:"Map Skills",
      subtopics:[
        { title:"4-figure grid references",    detail:"Read along the corridor, then up the stairs — gives the whole grid square",         lessonKey:"map-grid-refs",   formula:"Easting first, Northing second" },
        { title:"6-figure grid references",    detail:"Divide each square into tenths — more precise location within a square",           lessonKey:"map-grid-refs" },
        { title:"Measuring distance on a map", detail:"Use a ruler to measure in cm, then multiply by the scale value",                   lessonKey:"map-distance",    formula:"Real distance = map distance × scale" },
        { title:"Scale lines",                 detail:"Mark distance on paper edge and compare to the scale bar to get real-world km",    lessonKey:"map-distance" },
      ]
    },
    {
      topic:"Antarctica", icon:"🧊", theme:"blue",
      subtitle:"The frozen continent — geography, climate and protection",
      quizTopic:"Antarctica",
      subtopics:[
        { title:"Geography of Antarctica",      detail:"Location, size, surrounding ocean, polar position — 98% ice sheet",              lessonKey:"ant-geography" },
        { title:"Conditions and wildlife",      detail:"Extreme cold, high winds, low precipitation — penguins, seals, whales, krill",    lessonKey:"ant-conditions" },
        { title:"How cold and why",             detail:"High latitude, ice albedo, thin atmosphere, distance from warm ocean currents",   lessonKey:"ant-climate",     formula:"Average −60°C inland · coldest −89.2°C" },
        { title:"Climate graphs",               detail:"Reading temperature and precipitation data — Antarctic pattern: cold all year, peak summer −20°C", lessonKey:"ant-climate" },
        { title:"Explorers of Antarctica",      detail:"Scott vs Amundsen race to South Pole 1911 — preparation, outcomes, lessons",     lessonKey:"ant-explorers" },
        { title:"Tourism in Antarctica",        detail:"Growing tourist numbers — benefits vs environmental and logistical risks",        lessonKey:"ant-tourism" },
        { title:"Animal adaptations",           detail:"Blubber, huddling, counter-current blood flow, camouflage, breeding cycles",     lessonKey:"ant-adaptations" },
        { title:"How do we protect Antarctica", detail:"Antarctic Treaty 1959 — what it bans, IAATO rules, bioprospecting debate",       lessonKey:"ant-protection" },
      ]
    },
    {
      topic:"Global Fashion", icon:"👗", theme:"pink",
      subtitle:"TNCs, factories in Asia, working conditions and environmental impact",
      quizTopic:"Global Fashion",
      subtopics:[
        { title:"What is a TNC?",                    detail:"Transnational Corporation — company operating in multiple countries with headquarters in one country", lessonKey:"fashion-tnc" },
        { title:"Why clothes are made in Asia",      detail:"Low labour costs, weak regulations, large workforce, existing infrastructure, trade links",           lessonKey:"fashion-asia" },
        { title:"Working conditions in factories",   detail:"Long hours, low pay, unsafe buildings, child labour — Rana Plaza 2013 case study",                   lessonKey:"fashion-conditions" },
        { title:"Environmental impacts",             detail:"Water pollution, pesticide use (cotton), synthetic microfibres, carbon miles, fast fashion waste",   lessonKey:"fashion-environment" },
      ]
    },
    {
      topic:"Africa", icon:"🌍", theme:"amber",
      subtitle:"Development, trade and strategies to reduce the gap",
      quizTopic:"Africa",
      subtopics:[
        { title:"Locating countries in Africa",     detail:"Key countries to know: Nigeria, Kenya, Ethiopia, South Africa, Egypt, DRC, Ghana, Tanzania",          lessonKey:"africa-location" },
        { title:"Human factors affecting development", detail:"Corruption, civil war, debt, poor healthcare/education, colonial legacy",                          lessonKey:"africa-factors" },
        { title:"Physical factors affecting development", detail:"Landlocked, disease (malaria), drought, poor soils, natural disasters",                         lessonKey:"africa-factors" },
        { title:"Unfair trade",                     detail:"Rich countries subsidise farmers, low commodity prices, unequal trade rules — Ghana cocoa example",   lessonKey:"africa-trade" },
        { title:"Strategies to reduce the gap",     detail:"Fair trade, aid, debt relief, microfinance, improving education and healthcare, tourism",             lessonKey:"africa-strategies" },
      ]
    },
    {
      topic:"Coasts", icon:"🌊", theme:"teal",
      subtitle:"Erosion, landforms and coastal management",
      quizTopic:"Coasts",
      subtopics:[
        { title:"4 processes of erosion",           detail:"Hydraulic action · Abrasion · Attrition · Solution (corrosion)",                                     lessonKey:"coasts-erosion",    formula:"HAAS" },
        { title:"4 processes of transportation",    detail:"Traction · Saltation · Suspension · Solution — plus longshore drift",                               lessonKey:"coasts-erosion",    formula:"TSSS" },
        { title:"Features of a cliff and CASS",     detail:"Cliff · Arch · Stack · Stump — sequence of coastal erosion landforms",                              lessonKey:"coasts-cass" },
        { title:"Formation of CASS",                detail:"Wave attack on joints → cave → arch → stack → stump — each stage explained",                       lessonKey:"coasts-cass" },
        { title:"Spits",                            detail:"Longshore drift deposits sediment beyond headland — recurved end due to wind direction change",      lessonKey:"coasts-spits" },
        { title:"Hard vs soft engineering",         detail:"Hard: sea walls, groynes, rock armour · Soft: beach nourishment, managed retreat",                  lessonKey:"coasts-management" },
      ]
    },
  ]

};

/* ── LESSONS ────────────────────────────────────────────────── */
/* Structure: { topic, topicKey, theme(palette key), icon, title, subtitle,
     keyIdea:{rule,detail}, formulae:[{main,note}], steps:[{title,detail,formula}],
     compare:[{good,bad}], worked:[{q, lines:[{step,expr,why,answer?}]}],
     tips:[{icon,text}], mistakes:[{text}], practice:[{q,opts,ans,exp,poem?}],
     prevLesson:{key,label}|null, nextLesson:{key,label}|null } */

const LESSONS = {

/* ════════ MATHS — INDICES ════════ */
"index-notation": {
  topic:"Indices", topicKey:"Indices", theme:"purple", icon:"🔢",
  title:"Index Notation",
  subtitle:"A shorthand for repeated multiplication — and the foundation of everything in the Indices topic.",
  keyIdea:{ rule:"aⁿ means 'a multiplied by itself n times'", detail:"The base (a) is the number being multiplied. The index or power (n) tells you how many times. So 2⁵ = 2×2×2×2×2 = 32." },
  formulae:[
    { main:"aⁿ = a × a × a × … (n times)", note:"a = base  ·  n = index (power)" },
    { main:"a¹ = a  ·  a⁰ = 1", note:"Any number to the power 1 is itself. Any number to the power 0 is 1." }
  ],
  steps:[
    { title:"Identify the base and the power", detail:"In 3⁴, the base is 3 and the power is 4.", formula:"3⁴" },
    { title:"Write out the repeated multiplication", detail:"Write the base multiplied by itself as many times as the power says.", formula:"3 × 3 × 3 × 3" },
    { title:"Calculate step by step", detail:"3×3=9, then 9×3=27, then 27×3=81.", formula:"= 81" },
  ],
  worked:[{ q:"Calculate 2⁶", lines:[
    { step:"Write out", expr:"2⁶ = 2×2×2×2×2×2", why:"Power is 6, so six 2s" },
    { step:"Multiply", expr:"= 4 × 2 × 2 × 2 × 2", why:"2×2=4" },
    { step:"Continue", expr:"= 8 × 2 × 2 × 2", why:"4×2=8" },
    { step:"Continue", expr:"= 16 × 2 × 2", why:"8×2=16" },
    { step:"Continue", expr:"= 32 × 2", why:"16×2=32" },
    { step:"Answer", expr:"= 64", why:"32×2=64", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Don't confuse power with multiply!</strong> 3⁴ is NOT 3×4=12. It's 3×3×3×3=81. The power tells you how many copies." },
    { icon:"⭐", text:"<strong>Learn these by heart:</strong> 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=256. They come up constantly!" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Writing 2³ = 6. Wrong! 2³ = 2×2×2 = 8, not 2×3." },
    { text:"<strong>Common mistake:</strong> Forgetting that any number to the power 0 = 1. So 7⁰ = 1, not 0." },
  ],
  practice:[
    { q:"What is 3⁴?", opts:["12","81","64","27"], ans:1, exp:"3⁴ = 3×3×3×3 = 9×9 = <strong>81</strong>. (Not 3×4=12!)" },
    { q:"Write 7 × 7 × 7 × 7 × 7 in index notation.", opts:["5⁷","7⁵","35","7×5"], ans:1, exp:"7 is multiplied 5 times, so it's <strong>7⁵</strong>." },
    { q:"What is 4⁰?", opts:["0","4","1","40"], ans:2, exp:"Any number to the power 0 = <strong>1</strong>. So 4⁰ = 1." },
    { q:"What is 10³?", opts:["30","1000","100","300"], ans:1, exp:"10³ = 10×10×10 = <strong>1000</strong>." },
  ],
  prevLesson:null,
  nextLesson:{ key:"prime-factors", label:"Prime Factors & LCM/HCF" }
},

"prime-factors": {
  topic:"Indices", topicKey:"Indices", theme:"purple", icon:"🔢",
  title:"Prime Factors, LCM & HCF",
  subtitle:"Break any number into its prime building blocks, then use a Venn diagram to find LCM and HCF.",
  keyIdea:{ rule:"Every whole number can be written as a product of prime numbers", detail:"A prime has exactly two factors: 1 and itself (2, 3, 5, 7, 11…). A factor tree lets you split until you reach all primes." },
  formulae:[
    { main:"HCF = multiply the primes in the OVERLAP of the Venn diagram", note:"Highest Common Factor — the biggest number that divides into both" },
    { main:"LCM = multiply ALL primes across BOTH circles", note:"Lowest Common Multiple — the smallest number both divide into" }
  ],
  steps:[
    { title:"Draw a factor tree", detail:"Write the number at top. Split into any two factors. Keep splitting until every branch ends in a prime.", formula:"60 → 6×10 → 2×3 and 2×5" },
    { title:"Write as a product of primes", detail:"Collect all the primes. Group repeated ones using powers.", formula:"60 = 2² × 3 × 5" },
    { title:"For HCF/LCM — draw a Venn diagram", detail:"Primes shared by BOTH go in the overlap. Primes in only one number go in its own circle.", formula:"" },
    { title:"Read off HCF and LCM", detail:"HCF = multiply overlap. LCM = multiply ALL numbers in both circles.", formula:"HCF = overlap product · LCM = everything × together" },
  ],
  worked:[{ q:"Find the HCF and LCM of 24 and 36", lines:[
    { step:"24 =", expr:"2³ × 3", why:"24→4×6→2×2 and 2×3" },
    { step:"36 =", expr:"2² × 3²", why:"36→4×9→2×2 and 3×3" },
    { step:"Overlap", expr:"2² and 3¹ are shared", why:"Both have at least two 2s and one 3" },
    { step:"HCF", expr:"2² × 3 = 4 × 3 = 12", why:"Multiply the overlap" },
    { step:"LCM", expr:"2³ × 3² = 8 × 9 = 72", why:"Highest power of each prime from either number", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>LCM tip:</strong> Use the highest power of each prime from either number. For 24=2³×3 and 36=2²×3², LCM uses 2³ and 3²." },
    { icon:"⭐", text:"<strong>Factor tree tip:</strong> Always start by dividing even numbers by 2. You always end with the same prime factorisation regardless of starting point." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Including 1 as a prime factor. 1 is NOT a prime number." },
    { text:"<strong>Common mistake:</strong> Confusing HCF and LCM. HCF is always ≤ both numbers. LCM is always ≥ both." },
  ],
  practice:[
    { q:"Write 84 as a product of its prime factors.", opts:["2² × 3 × 7","4 × 21","2 × 42","2³ × 3 × 7"], ans:0, exp:"84=2×42=2×2×21=2×2×3×7 = <strong>2² × 3 × 7</strong>." },
    { q:"Find the HCF of 18 and 30.", opts:["3","6","9","15"], ans:1, exp:"18=2×3², 30=2×3×5. Shared: 2×3 = <strong>6</strong>." },
    { q:"Find the LCM of 4 and 6.", opts:["2","8","12","24"], ans:2, exp:"4=2², 6=2×3. LCM=2²×3=<strong>12</strong>." },
    { q:"Is 91 prime?", opts:["Yes","No — 7 × 13","No — 9 × 10","No — 11 × 8"], ans:1, exp:"91 = 7 × 13. Both prime factors, so 91 is <strong>not prime</strong>." },
  ],
  prevLesson:{ key:"index-notation", label:"Index Notation" },
  nextLesson:{ key:"laws-of-indices", label:"Laws of Indices" }
},

"laws-of-indices": {
  topic:"Indices", topicKey:"Indices", theme:"purple", icon:"🔢",
  title:"Laws of Indices",
  subtitle:"Three rules that let you simplify expressions with powers without calculating huge numbers.",
  keyIdea:{ rule:"Same base: multiply → ADD powers · divide → SUBTRACT powers · power of power → MULTIPLY", detail:"These laws ONLY work when the BASE is the same. You can't use them on 2³ × 3² — different bases!" },
  formulae:[
    { main:"aᵐ × aⁿ = aᵐ⁺ⁿ", note:"Multiplying → ADD the powers" },
    { main:"aᵐ ÷ aⁿ = aᵐ⁻ⁿ", note:"Dividing → SUBTRACT the powers" },
    { main:"(aᵐ)ⁿ = aᵐˣⁿ", note:"Power of a power → MULTIPLY the powers" },
  ],
  steps:[
    { title:"Check the bases are the same", detail:"Laws only work if the base is identical.", formula:"x³ × x⁵ ✓  but  x³ × y⁵ ✗" },
    { title:"Identify which law to use", detail:"× together → add. ÷ → subtract. Power raised to a power → multiply.", formula:"" },
    { title:"Apply the law — keep the base, change only the power", detail:"", formula:"x³ × x⁵ = x⁸" },
  ],
  worked:[
    { q:"Simplify: 2⁴ × 2³", lines:[
      { step:"Same base?", expr:"Both base 2 ✓", why:"Law applies" },
      { step:"Law", expr:"Multiplying → ADD powers", why:"× rule" },
      { step:"Answer", expr:"2⁷", why:"4+3=7", answer:true },
    ]},
    { q:"Simplify: (y³)⁴", lines:[
      { step:"Type", expr:"Power raised to a power", why:"(aᵐ)ⁿ rule" },
      { step:"Law", expr:"MULTIPLY the powers", why:"3×4=12" },
      { step:"Answer", expr:"y¹²", why:"", answer:true },
    ]},
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory: Mad</strong> — <u>M</u>ultiply → A<u>d</u>d. Divide → Subtract. Power of power → Multiply." },
    { icon:"⭐", text:"<strong>Mixing coefficients:</strong> 3x² × 4x³ — multiply numbers (3×4=12) and apply index laws to letters (x²×x³=x⁵). Answer: 12x⁵." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Adding powers when dividing. Divide = SUBTRACT." },
    { text:"<strong>Common mistake:</strong> (2³)⁴ = 2⁷. Wrong! It's 2¹² — power of power means MULTIPLY: 3×4=12." },
  ],
  practice:[
    { q:"Simplify: 5³ × 5⁴", opts:["5⁷","5¹²","25⁷","5¹"], ans:0, exp:"Multiply → ADD: 3+4=7. Answer: <strong>5⁷</strong>." },
    { q:"Simplify: x⁸ ÷ x³", opts:["x⁵","x¹¹","x²⁴","x²"], ans:0, exp:"Divide → SUBTRACT: 8−3=5. Answer: <strong>x⁵</strong>." },
    { q:"Simplify: (3²)⁵", opts:["3⁷","3³","3¹⁰","3²⁵"], ans:2, exp:"Power of power → MULTIPLY: 2×5=10. Answer: <strong>3¹⁰</strong>." },
    { q:"Simplify: 2x³ × 5x²", opts:["10x⁵","7x⁵","10x⁶","7x⁶"], ans:0, exp:"Numbers: 2×5=10. Letters: x³×x²=x⁵. Answer: <strong>10x⁵</strong>." },
  ],
  prevLesson:{ key:"prime-factors", label:"Prime Factors & LCM/HCF" },
  nextLesson:{ key:"negative-indices", label:"Negative Indices" }
},

"negative-indices": {
  topic:"Indices", topicKey:"Indices", theme:"purple", icon:"🔢",
  title:"Negative Indices",
  subtitle:"A negative power doesn't make the answer negative — it means you flip it (take the reciprocal).",
  keyIdea:{ rule:"a⁻ⁿ = 1 / aⁿ  — negative index = reciprocal", detail:"The answer is a fraction, not a negative number! 2⁻³ = 1/8, which is positive." },
  formulae:[
    { main:"a⁻ⁿ = 1/aⁿ", note:"Flip to reciprocal, then work out the positive power" },
    { main:"(a/b)⁻ⁿ = (b/a)ⁿ", note:"For fractions: flip the fraction, then apply the positive power" },
  ],
  steps:[
    { title:"See the negative index", detail:"The minus sign in the power means 'take the reciprocal'.", formula:"5⁻²" },
    { title:"Write as 1 over the positive power", detail:"", formula:"= 1 / 5²" },
    { title:"Calculate the denominator", detail:"Work out the positive power normally.", formula:"= 1/25" },
  ],
  worked:[{ q:"Calculate 4⁻³", lines:[
    { step:"Reciprocal", expr:"4⁻³ = 1/4³", why:"Flip" },
    { step:"Denominator", expr:"4³ = 64", why:"4×4×4=64" },
    { step:"Answer", expr:"1/64", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Negative ≠ negative answer!</strong> 2⁻³ = 1/8, which is positive." },
    { icon:"⭐", text:"<strong>Quick check:</strong> Larger negative powers → smaller fractions. 10⁻¹=0.1, 10⁻²=0.01, 10⁻³=0.001." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 3⁻² = −9. Wrong! 3⁻² = 1/9." },
  ],
  practice:[
    { q:"What is 2⁻⁴?", opts:["−16","1/16","−8","1/8"], ans:1, exp:"2⁻⁴ = 1/2⁴ = <strong>1/16</strong>." },
    { q:"What is 10⁻³?", opts:["−1000","−0.001","0.001","0.01"], ans:2, exp:"10⁻³ = 1/1000 = <strong>0.001</strong>." },
    { q:"What is (1/2)⁻¹?", opts:["−2","1/2","2","−1/2"], ans:2, exp:"Flip (1/2) to get 2/1 = <strong>2</strong>." },
    { q:"Simplify: x⁵ ÷ x⁸", opts:["x³","x⁻³","x¹³","1/x³"], ans:1, exp:"5−8 = −3. Answer: <strong>x⁻³</strong>." },
  ],
  prevLesson:{ key:"laws-of-indices", label:"Laws of Indices" },
  nextLesson:{ key:"simplifying-indices", label:"Simplifying Expressions" }
},

"simplifying-indices": {
  topic:"Indices", topicKey:"Indices", theme:"purple", icon:"🔢",
  title:"Simplifying Expressions with Indices",
  subtitle:"Combine index laws with algebra — deal with numbers and letters separately.",
  keyIdea:{ rule:"Step 1: multiply/divide the coefficients. Step 2: apply index laws to each letter. Step 3: combine.", detail:"" },
  formulae:[{ main:"Coefficients × index laws per variable — two separate steps", note:"" }],
  steps:[
    { title:"Multiply/divide the coefficients (numbers)", detail:"Handle plain numbers first.", formula:"3x² × 4x³ → 3×4 = 12" },
    { title:"Apply index laws to each letter", detail:"Add powers for ×, subtract for ÷.", formula:"x² × x³ = x⁵" },
    { title:"Combine into one expression", detail:"", formula:"12x⁵" },
  ],
  worked:[{ q:"Simplify: 5a³b² × 2a²b", lines:[
    { step:"Numbers", expr:"5 × 2 = 10", why:"Multiply coefficients" },
    { step:"a terms", expr:"a³ × a² = a⁵", why:"Add: 3+2=5" },
    { step:"b terms", expr:"b² × b¹ = b³", why:"Add: 2+1=3" },
    { step:"Answer", expr:"10a⁵b³", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Two separate jobs:</strong> numbers first, then letters. Doing both at once leads to errors." },
    { icon:"⭐", text:"<strong>Adding/subtracting like terms:</strong> 3x²+5x²=8x². But 3x²+5x³ CANNOT be simplified — different powers!" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> In 3x²+5x², writing 8x⁴. Wrong! Add the coefficients only: 8x²." },
    { text:"<strong>Common mistake:</strong> Forgetting y without a written power has power 1: y = y¹." },
  ],
  practice:[
    { q:"Simplify: 4p³ × 3p²", opts:["12p⁵","7p⁵","12p⁶","7p⁶"], ans:0, exp:"4×3=12, p³×p²=p⁵. Answer: <strong>12p⁵</strong>." },
    { q:"Simplify: 10m⁵ ÷ 2m³", opts:["5m²","8m²","5m⁸","8m⁸"], ans:0, exp:"10÷2=5, m⁵÷m³=m². Answer: <strong>5m²</strong>." },
    { q:"Simplify: 2x² + 7x² − 3x²", opts:["6x²","6x⁶","6x","4x²"], ans:0, exp:"2+7−3=6. Keep x². Answer: <strong>6x²</strong>." },
    { q:"Simplify: 3a²b × 2ab³", opts:["6a³b⁴","5a³b⁴","6a²b³","6a³b³"], ans:0, exp:"3×2=6, a²×a=a³, b×b³=b⁴. Answer: <strong>6a³b⁴</strong>." },
  ],
  prevLesson:{ key:"negative-indices", label:"Negative Indices" },
  nextLesson:{ key:"rotational-symmetry", label:"Rotational Symmetry" }
},

/* ════════ MATHS — TRANSFORMATIONS ════════ */
"rotational-symmetry": {
  topic:"Transformations", topicKey:"Transformations", theme:"teal", icon:"🔄",
  title:"Rotational Symmetry",
  subtitle:"The order of rotational symmetry = how many times a shape looks identical in one full 360° turn.",
  keyIdea:{ rule:"Order = number of positions where the shape looks identical, including the 360° return", detail:"Shortcut for regular polygons: order = number of sides. Triangle=3, Square=4, Pentagon=5, Hexagon=6." },
  formulae:[{ main:"Order = 360° ÷ angle of rotation", note:"e.g. Square: 360°÷90°=4, so order 4" }],
  steps:[
    { title:"Find the centre", detail:"Usually the centre of the shape.", formula:"" },
    { title:"Rotate in equal steps", detail:"Try 360°÷(guessed order). Does the shape match at each step?", formula:"Square: 90°, 180°, 270°, 360° — matches all four" },
    { title:"Count the matches", detail:"Include the 360° return position.", formula:"" },
  ],
  worked:[{ q:"Order of rotational symmetry of a regular pentagon?", lines:[
    { step:"Sides", expr:"5 equal sides", why:"Regular polygon" },
    { step:"Step", expr:"360° ÷ 5 = 72°", why:"Each rotation step" },
    { step:"Matches?", expr:"Yes — every 72° looks identical", why:"" },
    { step:"Answer", expr:"Order 5", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Regular polygon shortcut:</strong> Order = number of sides." },
    { icon:"⭐", text:"<strong>Letters:</strong> S, Z, N, H all have order 2. Most other letters have order 1." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Forgetting the 360° position. An equilateral triangle has order 3, not 2." },
  ],
  practice:[
    { q:"Order of rotational symmetry of a square?", opts:["1","2","4","8"], ans:2, exp:"Matches at 90°,180°,270°,360°. Order = <strong>4</strong>." },
    { q:"Order of a regular hexagon?", opts:["2","3","6","12"], ans:2, exp:"6 sides → order <strong>6</strong>." },
    { q:"Order of the letter S?", opts:["0","1","2","4"], ans:2, exp:"S matches after 180°. Order = <strong>2</strong>." },
    { q:"Order 1 means:", opts:["Matches 4 times","Only matches at 360° — no rotational symmetry","Always 90°","It has line symmetry"], ans:1, exp:"Order 1 = only matches its original position at 360°. <strong>No rotational symmetry</strong>." },
  ],
  prevLesson:{ key:"simplifying-indices", label:"Simplifying Expressions" },
  nextLesson:{ key:"translations", label:"Translations" }
},

"translations": {
  topic:"Transformations", topicKey:"Transformations", theme:"teal", icon:"🔄",
  title:"Translations",
  subtitle:"Sliding a shape using a column vector — every point moves the same distance and direction.",
  keyIdea:{ rule:"Column vector (a/b): top = horizontal (+ right, − left) · bottom = vertical (+ up, − down)", detail:"The shape is congruent after translation — same size, same orientation, just moved." },
  formulae:[{ main:"New point = original point + vector", note:"Add vector to each vertex separately" }],
  steps:[
    { title:"Read the vector", detail:"Top = across, bottom = up/down.", formula:"(3/−2) means 3 right, 2 down" },
    { title:"Apply to each vertex", detail:"Add the vector components to each coordinate.", formula:"(1,4) + (3/−2) = (4, 2)" },
    { title:"Draw the new shape", detail:"Connect new vertices. Shape must be identical in size and orientation.", formula:"" },
  ],
  worked:[{ q:"Point A(1,2). Translate by vector (4/−3). Find A'.", lines:[
    { step:"Read", expr:"4 right, 3 down", why:"+4 across, −3 vertical" },
    { step:"Apply", expr:"x: 1+4=5, y: 2+(−3)=−1", why:"" },
    { step:"Answer", expr:"A' = (5, −1)", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Top = horizontal (x), Bottom = vertical (y).</strong> The most common mistake is swapping them." },
    { icon:"⭐", text:"<strong>All vertices must move.</strong> Every point moves by exactly the same vector." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Swapping x and y in the vector." },
  ],
  practice:[
    { q:"Point (2,5) translated by (3/−4). New position?", opts:["(5,1)","(−1,8)","(5,9)","(6,1)"], ans:0, exp:"x:2+3=5, y:5−4=1. Answer: <strong>(5,1)</strong>." },
    { q:"Vector (−2/3) means:", opts:["Right and up","Left and down","Left and up","Right and down"], ans:2, exp:"−2=left, +3=up. <strong>Left and up</strong>." },
    { q:"B(4,−1) translates to B'(1,2). What was the vector?", opts:["(3/−3)","(−3/3)","(5/1)","(−3/−3)"], ans:1, exp:"x:1−4=−3, y:2−(−1)=3. Vector: <strong>(−3/3)</strong>." },
    { q:"After a translation, is the image congruent?", opts:["Yes","No — larger","No — flipped","Only sometimes"], ans:0, exp:"Translation only moves — never resizes or reflects. Always <strong>congruent</strong>." },
  ],
  prevLesson:{ key:"rotational-symmetry", label:"Rotational Symmetry" },
  nextLesson:{ key:"reflections", label:"Reflections" }
},

"reflections": {
  topic:"Transformations", topicKey:"Transformations", theme:"teal", icon:"🔄",
  title:"Reflections",
  subtitle:"Flipping a shape in a mirror line — every point moves perpendicularly, the same distance on the other side.",
  keyIdea:{ rule:"Each point reflects at 90° to the mirror line — same distance, opposite side", detail:"" },
  formulae:[
    { main:"Reflect in x-axis: (x, y) → (x, −y)", note:"Flip the y-coordinate" },
    { main:"Reflect in y-axis: (x, y) → (−x, y)", note:"Flip the x-coordinate" },
    { main:"Reflect in y = x: (x, y) → (y, x)", note:"Swap the coordinates" },
  ],
  steps:[
    { title:"Identify the mirror line", detail:"x-axis, y-axis, y=x, or a custom line like x=3?", formula:"" },
    { title:"Count perpendicular distance to the line", detail:"How many squares is each point from the mirror line?", formula:"" },
    { title:"Plot same distance on the other side", detail:"", formula:"" },
  ],
  worked:[{ q:"Reflect (4,−2) in the x-axis", lines:[
    { step:"Rule", expr:"(x,y) → (x,−y)", why:"x-axis: flip y" },
    { step:"Apply", expr:"(4, −(−2))", why:"Flip sign of y" },
    { step:"Answer", expr:"(4, 2)", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Must state the mirror line</strong> to describe a reflection. 'Reflected' alone gets no marks." },
    { icon:"⭐", text:"<strong>Shape is congruent but flipped</strong> — key difference from a rotation." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Moving diagonally instead of perpendicular to the mirror line." },
  ],
  practice:[
    { q:"Reflect (−3,4) in the y-axis.", opts:["(3,4)","(−3,−4)","(4,−3)","(3,−4)"], ans:0, exp:"y-axis: flip x-sign. <strong>(3,4)</strong>." },
    { q:"Reflect (5,2) in the x-axis.", opts:["(5,2)","(−5,2)","(5,−2)","(2,5)"], ans:2, exp:"x-axis: flip y-sign. <strong>(5,−2)</strong>." },
    { q:"Reflect (3,7) in y=x.", opts:["(7,3)","(−3,7)","(3,−7)","(−7,−3)"], ans:0, exp:"y=x: swap coords. <strong>(7,3)</strong>." },
    { q:"What must you state to fully describe a reflection?", opts:["Angle","Mirror line","Centre","Vector"], ans:1, exp:"A reflection is fully described by its <strong>mirror line</strong>." },
  ],
  prevLesson:{ key:"translations", label:"Translations" },
  nextLesson:{ key:"rotations", label:"Rotations" }
},

"rotations": {
  topic:"Transformations", topicKey:"Transformations", theme:"teal", icon:"🔄",
  title:"Rotations",
  subtitle:"Turning a shape about a fixed point. Three things always needed: angle + direction + centre.",
  keyIdea:{ rule:"To describe a rotation: angle + direction (CW/CCW) + centre of rotation — all three, every time", detail:"" },
  formulae:[
    { main:"90° CW about origin: (x, y) → (y, −x)", note:"" },
    { main:"180° about origin: (x, y) → (−x, −y)", note:"Same for CW and CCW" },
    { main:"90° CCW about origin: (x, y) → (−y, x)", note:"" },
  ],
  steps:[
    { title:"Identify the centre of rotation", detail:"Usually given. Otherwise use tracing paper.", formula:"" },
    { title:"Apply the coordinate rule", detail:"Use the formula for the origin, or translate-rotate-translate for other centres.", formula:"" },
    { title:"State all three elements", detail:"Angle, direction, centre.", formula:"'90° clockwise about the point (0,0)'" },
  ],
  worked:[{ q:"Rotate (3,1) by 90° clockwise about the origin", lines:[
    { step:"Rule", expr:"90° CW: (x,y) → (y,−x)", why:"" },
    { step:"Apply", expr:"(3,1) → (1,−3)", why:"x becomes −y column, y becomes x column" },
    { step:"Answer", expr:"(1,−3)", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Tracing paper trick:</strong> In exams you can ask for tracing paper. Physically rotate — much easier than formulae for complex shapes!" },
    { icon:"⭐", text:"<strong>180° is easy:</strong> Negate both coordinates. (2,5) → (−2,−5). No need to worry about direction." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Forgetting to state direction. '90° about the origin' is incomplete — state clockwise or anticlockwise." },
  ],
  practice:[
    { q:"Rotate (4,2) by 90° CW about origin.", opts:["(2,−4)","(−2,4)","(−4,−2)","(2,4)"], ans:0, exp:"90° CW: (x,y)→(y,−x). (4,2)→<strong>(2,−4)</strong>." },
    { q:"Rotate (1,3) by 180° about origin.", opts:["(3,1)","(−1,3)","(−1,−3)","(3,−1)"], ans:2, exp:"180°: (x,y)→(−x,−y). (1,3)→<strong>(−1,−3)</strong>." },
    { q:"Three things needed to describe a rotation:", opts:["Size, shape, area","Angle, direction, centre","Vector, line, angle","Colour, size, position"], ans:1, exp:"Always: <strong>angle, direction, and centre of rotation</strong>." },
    { q:"Rotate (5,0) by 90° CCW about origin.", opts:["(0,5)","(0,−5)","(−5,0)","(5,0)"], ans:0, exp:"90° CCW: (x,y)→(−y,x). (5,0)→<strong>(0,5)</strong>." },
  ],
  prevLesson:{ key:"reflections", label:"Reflections" },
  nextLesson:{ key:"substitution", label:"Substitution" }
},

/* ════════ MATHS — BRACKETS ════════ */
"substitution": {
  topic:"Brackets", topicKey:"Brackets", theme:"amber", icon:"🧮",
  title:"Substitution",
  subtitle:"Replacing letters with numbers and calculating carefully using BIDMAS.",
  keyIdea:{ rule:"Replace each letter with its given value (in brackets), then use BIDMAS", detail:"Always put brackets around negative values when substituting — it prevents sign errors with powers." },
  formulae:[{ main:"BIDMAS: Brackets → Indices → ÷/× → +/−", note:"Work in this order after substituting" }],
  steps:[
    { title:"Write out the expression", detail:"Copy it exactly.", formula:"Find 3a² − 2b when a=4, b=−3" },
    { title:"Substitute — use brackets for negatives", detail:"", formula:"= 3(4)² − 2(−3)" },
    { title:"Work in BIDMAS order", detail:"Indices first, then multiply, then add/subtract.", formula:"= 3×16 − 2×(−3) = 48 + 6 = 54" },
  ],
  worked:[{ q:"Find 2p² − q when p=3, q=−5", lines:[
    { step:"Substitute", expr:"2(3)² − (−5)", why:"Brackets around negative" },
    { step:"Indices", expr:"2(9) − (−5)", why:"3²=9" },
    { step:"Multiply", expr:"18 − (−5)", why:"2×9=18" },
    { step:"Subtract negative", expr:"18 + 5", why:"−(−5) = +5" },
    { step:"Answer", expr:"23", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Always use brackets for negative substitutions:</strong> write (−3)² = 9, not −3² which could be read as −9." },
    { icon:"⭐", text:"<strong>Negative × negative = positive.</strong> −2×(−5) = +10." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> With a=−2, calculating a² as −4. Correct: (−2)² = +4." },
  ],
  practice:[
    { q:"Find 4x+3 when x=5.", opts:["35","23","32","17"], ans:1, exp:"4(5)+3=20+3=<strong>23</strong>." },
    { q:"Find t² − 2t when t=−3.", opts:["−3","3","15","−15"], ans:2, exp:"(−3)²−2(−3)=9+6=<strong>15</strong>." },
    { q:"Find 2m − n² when m=6, n=4.", opts:["4","−4","28","−28"], ans:1, exp:"2(6)−(4)²=12−16=<strong>−4</strong>." },
    { q:"P=2l+2w. Find P when l=8, w=5.", opts:["80","26","18","56"], ans:1, exp:"2(8)+2(5)=16+10=<strong>26</strong>." },
  ],
  prevLesson:{ key:"rotations", label:"Rotations" },
  nextLesson:{ key:"expanding-single-brackets", label:"Expanding Single Brackets" }
},

"expanding-single-brackets": {
  topic:"Brackets", topicKey:"Brackets", theme:"amber", icon:"🧮",
  title:"Expanding Single Brackets",
  subtitle:"Multiplying the term outside by every term inside — removing the bracket entirely.",
  keyIdea:{ rule:"Multiply the OUTSIDE term by EVERY term INSIDE — including signs", detail:"" },
  formulae:[
    { main:"a(b + c) = ab + ac", note:"Every term inside gets multiplied by a" },
    { main:"−a(b + c) = −ab − ac", note:"Negative outside: all signs inside flip" },
  ],
  steps:[
    { title:"Multiply outside by first term inside", detail:"Include signs.", formula:"3(2x − 5) → 3×2x = 6x" },
    { title:"Multiply outside by second term inside", detail:"", formula:"3×(−5) = −15" },
    { title:"Write the result — no bracket", detail:"", formula:"= 6x − 15" },
  ],
  worked:[{ q:"Expand: −4(3x − 2)", lines:[
    { step:"First term", expr:"−4 × 3x = −12x", why:"Negative × positive = negative" },
    { step:"Second term", expr:"−4 × (−2) = +8", why:"Negative × negative = positive" },
    { step:"Answer", expr:"−12x + 8", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Every term inside gets multiplied</strong> — the most common error is only multiplying the first term." },
    { icon:"⭐", text:"<strong>Negative outside = flip all signs inside.</strong> −3(2x−4) = −6x + 12." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 3(x+4) = 3x+4. Wrong! The 3 multiplies the 4 too: 3(x+4) = 3x+12." },
  ],
  practice:[
    { q:"Expand: 5(3x+2)", opts:["15x+2","15x+10","8x+7","5x+10"], ans:1, exp:"5×3x=15x, 5×2=10. <strong>15x+10</strong>." },
    { q:"Expand: −2(4x−3)", opts:["−8x−6","−8x+6","8x−6","−6x+6"], ans:1, exp:"−2×4x=−8x, −2×(−3)=+6. <strong>−8x+6</strong>." },
    { q:"Expand and simplify: 3(x+2) + 4(x−1)", opts:["7x+2","7x+10","7x−2","12x+2"], ans:0, exp:"3x+6+4x−4 = <strong>7x+2</strong>." },
    { q:"Expand: x(x+7)", opts:["x²+7","x²+7x","2x+7","x²+7x²"], ans:1, exp:"x×x=x², x×7=7x. <strong>x²+7x</strong>." },
  ],
  prevLesson:{ key:"substitution", label:"Substitution" },
  nextLesson:{ key:"double-brackets", label:"Expanding Double Brackets" }
},

"double-brackets": {
  topic:"Brackets", topicKey:"Brackets", theme:"amber", icon:"🧮",
  title:"Expanding Double Brackets",
  subtitle:"FOIL — First, Outside, Inside, Last — gives four terms, then collect like terms.",
  keyIdea:{ rule:"Every term in the first bracket multiplies every term in the second — FOIL gives 4 products", detail:"" },
  formulae:[{ main:"(a+b)(c+d) = ac + ad + bc + bd", note:"FOIL: First·Outside·Inside·Last" }],
  steps:[
    { title:"F — First × First", detail:"", formula:"(x+3)(x+4): x×x = x²" },
    { title:"O — Outside terms (first × last)", detail:"", formula:"x×4 = 4x" },
    { title:"I — Inside terms (last × first)", detail:"", formula:"3×x = 3x" },
    { title:"L — Last × Last", detail:"", formula:"3×4 = 12" },
    { title:"Collect like terms", detail:"Add the two middle x-terms.", formula:"x² + 4x + 3x + 12 = x² + 7x + 12" },
  ],
  worked:[{ q:"Expand: (x−2)(x+5)", lines:[
    { step:"F", expr:"x² ", why:"x×x" },
    { step:"O", expr:"+5x", why:"x×5" },
    { step:"I", expr:"−2x", why:"−2×x" },
    { step:"L", expr:"−10", why:"−2×5" },
    { step:"Collect", expr:"x² + 5x − 2x − 10", why:"" },
    { step:"Answer", expr:"x² + 3x − 10", why:"5x−2x=3x", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Draw arcs:</strong> one from each term in bracket 1 to each term in bracket 2 — you need exactly 4 arcs." },
    { icon:"⭐", text:"<strong>Difference of two squares:</strong> (x+3)(x−3) = x²−9. Middle terms cancel: any (a+b)(a−b) = a²−b²." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only 2 multiplications instead of 4." },
    { text:"<strong>Common mistake:</strong> Wrong sign on L. In (x−3)(x−4), L=(−3)×(−4)=+12." },
  ],
  practice:[
    { q:"Expand: (x+5)(x+2)", opts:["x²+7x+10","x²+7x+7","x²+10","x²+10x+10"], ans:0, exp:"F:x² O:2x I:5x L:10 → <strong>x²+7x+10</strong>." },
    { q:"Expand: (x−4)(x+3)", opts:["x²−x−12","x²+x−12","x²−12","x²−x+12"], ans:0, exp:"F:x² O:3x I:−4x L:−12 → <strong>x²−x−12</strong>." },
    { q:"Expand: (x−6)(x−2)", opts:["x²+8x+12","x²−8x+12","x²−4x+12","x²−8x−12"], ans:1, exp:"F:x² O:−2x I:−6x L:+12 → <strong>x²−8x+12</strong>." },
    { q:"Expand: (x+7)(x−7)", opts:["x²+49","x²−49","x²−14x−49","x²+14x−49"], ans:1, exp:"Difference of two squares: <strong>x²−49</strong>." },
  ],
  prevLesson:{ key:"expanding-single-brackets", label:"Single Brackets" },
  nextLesson:{ key:"factorising", label:"Factorising" }
},

"factorising": {
  topic:"Brackets", topicKey:"Brackets", theme:"amber", icon:"🧮",
  title:"Factorising Single Brackets",
  subtitle:"The reverse of expanding — find the HCF, take it outside, work out what goes inside.",
  keyIdea:{ rule:"Find the HCF of all terms → write outside → divide each term by HCF → write inside → check by expanding", detail:"" },
  formulae:[{ main:"ab + ac = a(b + c)", note:"a is the HCF" }],
  steps:[
    { title:"Find the HCF of all terms", detail:"Biggest number AND letter combination dividing all terms.", formula:"15x² + 10x → HCF = 5x" },
    { title:"Write HCF outside the bracket", detail:"", formula:"5x(    )" },
    { title:"Divide each term by HCF", detail:"", formula:"15x²÷5x=3x, 10x÷5x=2 → 5x(3x+2)" },
    { title:"Check by expanding", detail:"Expand back and check you get the original.", formula:"5x(3x+2)=15x²+10x ✓" },
  ],
  worked:[{ q:"Factorise fully: 15x² + 10x", lines:[
    { step:"HCF numbers", expr:"HCF(15,10) = 5", why:"" },
    { step:"HCF letters", expr:"HCF(x²,x) = x", why:"x appears in both" },
    { step:"HCF", expr:"5x", why:"" },
    { step:"Divide", expr:"15x²÷5x=3x, 10x÷5x=2", why:"" },
    { step:"Answer", expr:"5x(3x + 2)", why:"Check: 5x×3x=15x², 5x×2=10x ✓", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Always check you've found the HIGHEST common factor.</strong> 2(6x+4) is factorised but not fully — there's still a 2 to take out: 4(3x+2)." },
    { icon:"⭐", text:"<strong>Letters in HCF:</strong> take the lowest power of each letter in ALL terms. For 6x³+4x², HCF includes x² not x³." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Not fully factorising — always check if the inside can be factorised further." },
  ],
  practice:[
    { q:"Factorise: 8x + 12", opts:["4(2x+3)","2(4x+6)","8(x+4)","4(2x+12)"], ans:0, exp:"HCF=4. 8x÷4=2x, 12÷4=3. <strong>4(2x+3)</strong>." },
    { q:"Factorise fully: 6x²+9x", opts:["3x(2x+3)","3(2x²+3x)","6x(x+3)","x(6x+9)"], ans:0, exp:"HCF=3x. <strong>3x(2x+3)</strong>." },
    { q:"Factorise: 20a²−15ab", opts:["5a(4a−3b)","5(4a−3b)","5a(4a−15b)","15a(a−b)"], ans:0, exp:"HCF=5a. <strong>5a(4a−3b)</strong>." },
    { q:"Fully factorise 6x+10:", opts:["2(3x+5)","6(x+5/3)","1(6x+10)","3(2x+5)"], ans:0, exp:"HCF=2. <strong>2(3x+5)</strong>." },
  ],
  prevLesson:{ key:"double-brackets", label:"Double Brackets" },
  nextLesson:{ key:"solving-equations", label:"Solving Equations" }
},

/* ════════ MATHS — LINEAR EQUATIONS ════════ */
"solving-equations": {
  topic:"Linear Equations", topicKey:"Linear Equations", theme:"red", icon:"⚖️",
  title:"Solving Linear Equations",
  subtitle:"Keeping the equation balanced — whatever you do to one side, do to the other.",
  keyIdea:{ rule:"Undo operations in reverse BIDMAS order: +/− first, then ×/÷, then brackets", detail:"Always check by substituting your answer back into the original equation." },
  formulae:[{ main:"Undo in reverse BIDMAS — get x on its own", note:"Collect x-terms first, then number terms" }],
  steps:[
    { title:"Get all x terms on one side", detail:"Subtract the smaller x-term from both sides.", formula:"5x−3=2x+9 → 3x=12" },
    { title:"Get all numbers on the other side", detail:"Move constants by adding or subtracting from both sides.", formula:"" },
    { title:"Divide by the coefficient of x", detail:"", formula:"3x=12 → x=4" },
    { title:"Check", detail:"Substitute back into the original equation.", formula:"5(4)−3=17 and 2(4)+9=17 ✓" },
  ],
  worked:[{ q:"Solve: 3(2x−1) = 4x + 9", lines:[
    { step:"Expand", expr:"6x − 3 = 4x + 9", why:"3×2x=6x, 3×(−1)=−3" },
    { step:"Collect x", expr:"2x = 12", why:"6x−4x=2x, 9+3=12" },
    { step:"Divide", expr:"x = 6", why:"12÷2=6" },
    { step:"Check", expr:"3(11)=33. 4(6)+9=33 ✓", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Always check!</strong> Substituting back takes 30 seconds and confirms you haven't made an error." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Sign errors when moving terms. 3x−5=7 → 3x=7+5=12 (the −5 becomes +5)." },
  ],
  practice:[
    { q:"Solve: 4x+3=19", opts:["x=4","x=5","x=3","x=6"], ans:0, exp:"4x=16, x=<strong>4</strong>." },
    { q:"Solve: 7x−4=3x+12", opts:["x=2","x=3","x=4","x=8"], ans:2, exp:"4x=16, x=<strong>4</strong>." },
    { q:"Solve: 2(x+3)=14", opts:["x=3","x=4","x=5","x=8"], ans:2, exp:"2x+6=14 → 2x=8 → x=<strong>4</strong>." },
    { q:"Solve: 5−2x=11", opts:["x=3","x=−3","x=8","x=−8"], ans:1, exp:"−2x=6 → x=<strong>−3</strong>." },
  ],
  prevLesson:{ key:"factorising", label:"Factorising" },
  nextLesson:{ key:"equations-fractions", label:"Equations with Fractions" }
},

"equations-fractions": {
  topic:"Linear Equations", topicKey:"Linear Equations", theme:"red", icon:"⚖️",
  title:"Equations with Fractions",
  subtitle:"Multiply every term by the denominator to clear fractions, then solve normally.",
  keyIdea:{ rule:"Multiply EVERY term on BOTH sides by the LCM of all denominators to eliminate fractions", detail:"" },
  formulae:[{ main:"Multiply all terms by LCM of denominators → clear fractions → solve normally", note:"" }],
  steps:[
    { title:"Identify all denominators", detail:"", formula:"x/3 + 2 = 6 → denominator is 3" },
    { title:"Multiply EVERY term by the LCM", detail:"Every single term — including whole numbers on both sides.", formula:"×3: x + 6 = 18" },
    { title:"Solve as normal", detail:"", formula:"x = 12" },
  ],
  worked:[{ q:"Solve: x/4 + 3 = 7", lines:[
    { step:"×4 everywhere", expr:"x + 12 = 28", why:"x/4×4=x, 3×4=12, 7×4=28" },
    { step:"Solve", expr:"x = 16", why:"28−12=16", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Multiply EVERY term</strong> — including whole numbers and the right-hand side. Students often forget the RHS." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only multiplying the fraction. In x/3+2=6, you must also multiply the 2 and the 6 by 3." },
  ],
  practice:[
    { q:"Solve: x/5 = 4", opts:["x=9","x=20","x=0.8","x=1"], ans:1, exp:"×5: x=<strong>20</strong>." },
    { q:"Solve: x/3+2=6", opts:["x=4","x=12","x=24","x=8"], ans:1, exp:"×3: x+6=18 → x=<strong>12</strong>." },
    { q:"Solve: (x−1)/4=3", opts:["x=11","x=13","x=8","x=4"], ans:1, exp:"×4: x−1=12 → x=<strong>13</strong>." },
    { q:"Solve: 2x/3=10", opts:["x=5","x=15","x=20","x=30"], ans:1, exp:"×3: 2x=30 → x=<strong>15</strong>." },
  ],
  prevLesson:{ key:"solving-equations", label:"Solving Equations" },
  nextLesson:{ key:"forming-equations", label:"Forming Equations" }
},

"forming-equations": {
  topic:"Linear Equations", topicKey:"Linear Equations", theme:"red", icon:"⚖️",
  title:"Forming and Solving Equations",
  subtitle:"Translating a word problem into algebra, then solving to find the unknown.",
  keyIdea:{ rule:"Read → Define the unknown → Write the equation → Solve → Check it makes sense in context", detail:"" },
  formulae:[{ main:"Define a letter → build the equation → solve → check", note:"Always define your letter first for method marks" }],
  steps:[
    { title:"Define your unknown with a letter", detail:"", formula:"'A number doubled plus 7 equals 19' → let n = the number" },
    { title:"Write the equation", detail:"Translate each phrase into algebra.", formula:"2n + 7 = 19" },
    { title:"Solve", detail:"", formula:"2n=12 → n=6" },
    { title:"Check the answer makes sense", detail:"Re-read the question with your answer.", formula:"doubled: 12, plus 7: 19 ✓" },
  ],
  worked:[{ q:"Perimeter of rectangle = 36 cm. Length = 3 × width. Find the width.", lines:[
    { step:"Define", expr:"Let width = w, length = 3w", why:"" },
    { step:"Equation", expr:"2(w + 3w) = 36", why:"P = 2(l+w)" },
    { step:"Simplify", expr:"8w = 36", why:"2×4w=8w" },
    { step:"Solve", expr:"w = 4.5 cm", why:"" },
    { step:"Check", expr:"2(4.5 + 13.5) = 2×18 = 36 ✓", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Always define your letter</strong> — 'Let x = the number of sweets.' This gets method marks even if the algebra goes wrong." },
    { icon:"⭐", text:"<strong>Check context:</strong> a negative length or an impossible value means you've made an error somewhere." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Rushing into the equation without defining the unknown first." },
  ],
  practice:[
    { q:"Multiply a number by 4, subtract 3, get 25. The number is:", opts:["5","7","8","6"], ans:1, exp:"4n−3=25 → 4n=28 → n=<strong>7</strong>." },
    { q:"Two angles in a triangle are x and 2x. Third is 60°. Find x.", opts:["20°","30°","40°","60°"], ans:2, exp:"x+2x+60=180 → 3x=120 → x=<strong>40°</strong>." },
    { q:"Three consecutive integers sum to 54. Smallest is:", opts:["16","17","18","15"], ans:1, exp:"n+(n+1)+(n+2)=54 → 3n+3=54 → n=<strong>17</strong>." },
    { q:"Perimeter of rectangle = 28 cm. Length is 4 more than width. Width is:", opts:["5 cm","6 cm","8 cm","10 cm"], ans:0, exp:"2(w+w+4)=28 → 4w+8=28 → w=<strong>5 cm</strong>." },
  ],
  prevLesson:{ key:"equations-fractions", label:"Equations with Fractions" },
  nextLesson:{ key:"fractions-ops", label:"Fraction Operations" }
},

/* ════════ MATHS — FRACTIONS & % ════════ */
"fractions-ops": {
  topic:"Fractions & %", topicKey:"Fractions & %", theme:"coral", icon:"🍕",
  title:"Adding, Subtracting, Multiplying & Dividing Fractions",
  subtitle:"Four operations — each with its own method. Multiplying and dividing are easier than adding!",
  keyIdea:{ rule:"× and ÷ are straightforward. For + and −, find a common denominator first.", detail:"" },
  formulae:[
    { main:"a/b + c/d: find common denominator, then add numerators", note:"" },
    { main:"a/b × c/d = ac/bd", note:"Top × top, bottom × bottom" },
    { main:"a/b ÷ c/d = a/b × d/c", note:"Keep Change Flip (KCF)" },
  ],
  steps:[
    { title:"+/−: find LCM of denominators", detail:"Rewrite both fractions with same denominator, then +/− numerators.", formula:"1/4+1/3 = 3/12+4/12 = 7/12" },
    { title:"×: straight across", detail:"Top×top, bottom×bottom. Simplify if possible.", formula:"2/3×3/4 = 6/12 = 1/2" },
    { title:"÷: Keep Change Flip", detail:"Keep first, change ÷ to ×, flip second fraction.", formula:"2/3÷1/4 = 2/3×4/1 = 8/3" },
  ],
  worked:[{ q:"Calculate: ³⁄₄ ÷ ³⁄₈", lines:[
    { step:"KCF", expr:"3/4 × 8/3", why:"Keep 3/4, flip 3/8" },
    { step:"Multiply", expr:"24/12", why:"3×8=24, 4×3=12" },
    { step:"Simplify", expr:"= 2", why:"24÷12=2", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Cross-cancel before multiplying:</strong> In 2/3 × 3/4, the 3s cancel → 2/4 = 1/2. Much easier!" },
    { icon:"⭐", text:"<strong>Keep Change Flip</strong> for division. Say it out loud each time." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Adding denominators — 1/3+1/4 ≠ 2/7. Find a common denominator first." },
  ],
  practice:[
    { q:"1/2 + 2/5 =", opts:["3/7","9/10","1/2","4/10"], ans:1, exp:"5/10+4/10=<strong>9/10</strong>." },
    { q:"2/3 × 3/4 =", opts:["5/7","1/2","6/12","2/4"], ans:1, exp:"6/12=<strong>1/2</strong>." },
    { q:"3/5 ÷ 1/2 =", opts:["3/10","6/5","1½","3/2"], ans:1, exp:"KCF: 3/5×2/1=<strong>6/5</strong>." },
    { q:"5/6 − 1/4 =", opts:["4/2","7/12","4/6","1/3"], ans:1, exp:"10/12−3/12=<strong>7/12</strong>." },
  ],
  prevLesson:{ key:"forming-equations", label:"Forming Equations" },
  nextLesson:{ key:"percentage-change", label:"Percentage Change" }
},

"percentage-change": {
  topic:"Fractions & %", topicKey:"Fractions & %", theme:"coral", icon:"🍕",
  title:"Percentage Increase & Decrease",
  subtitle:"One multiplication using a multiplier does the whole job — no two-step calculations needed.",
  keyIdea:{ rule:"Increase r%: multiply by (1 + r/100) · Decrease r%: multiply by (1 − r/100)", detail:"" },
  formulae:[
    { main:"New value = original × multiplier", note:"Increase 20%: ×1.20 · Decrease 15%: ×0.85" },
    { main:"% change = (change ÷ original) × 100", note:"Always divide by the ORIGINAL, not the new value" },
  ],
  steps:[
    { title:"Find the multiplier", detail:"Increase 20% → 1.20. Decrease 35% → 0.65.", formula:"" },
    { title:"Multiply", detail:"", formula:"£80 × 0.85 = £68" },
    { title:"For % change, use the formula", detail:"", formula:"(10÷50) × 100 = 20%" },
  ],
  worked:[{ q:"Population rises from 24,000 to 27,600. Find the % increase.", lines:[
    { step:"Change", expr:"27600 − 24000 = 3600", why:"" },
    { step:"Formula", expr:"(3600 ÷ 24000) × 100", why:"Divide by ORIGINAL" },
    { step:"Answer", expr:"15%", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Multiplier shortcut:</strong> Divide new by old — 27600/24000 = 1.15 → 15% increase. No need to find the difference first." },
    { icon:"⭐", text:"<strong>Reverse percentage:</strong> Price after 20% increase is £84 → original = 84 ÷ 1.20 = £70." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Dividing by the NEW value instead of the original when finding % change." },
    { text:"<strong>Common mistake:</strong> 85% decrease multiplier as 0.15 — it should be 0.85." },
  ],
  practice:[
    { q:"Bike costs £320, reduced 25%. New price?", opts:["£80","£240","£295","£400"], ans:1, exp:"320×0.75=<strong>£240</strong>." },
    { q:"Increase £56 by 15%.", opts:["£64.40","£47.60","£71","£60"], ans:0, exp:"56×1.15=<strong>£64.40</strong>." },
    { q:"Price: £40 → £52. % increase?", opts:["12%","20%","30%","15%"], ans:2, exp:"(12÷40)×100=<strong>30%</strong>." },
    { q:"After 20% increase, jacket costs £96. Original price?", opts:["£76.80","£80","£76","£115.20"], ans:1, exp:"96÷1.20=<strong>£80</strong>." },
  ],
  prevLesson:{ key:"fractions-ops", label:"Fraction Operations" },
  nextLesson:{ key:"squares-roots", label:"Squares & Roots" }
},

/* ════════ MATHS — SQUARES & ROUNDING ════════ */
"squares-roots": {
  topic:"Squares & Rounding", topicKey:"Squares & Rounding", theme:"pink", icon:"🔲",
  title:"Squares & Square Roots",
  subtitle:"Know your squares 1²–15² by heart — and how to estimate roots of non-perfect squares.",
  keyIdea:{ rule:"n² = n×n · √n = 'what number squared gives n?' · Estimate by bracketing between known squares", detail:"" },
  formulae:[{ main:"n² = n×n · √(n²) = n · Estimate: find the two perfect squares n sits between", note:"" }],
  steps:[
    { title:"Square: multiply by itself", detail:"", formula:"7² = 7×7 = 49" },
    { title:"Square root: know your squares", detail:"1,4,9,16,25,36,49,64,81,100,121,144,169,196,225", formula:"√144 = 12" },
    { title:"Estimate: bracket between squares", detail:"", formula:"√50: between √49=7 and √64=8, closer to 7 → ≈7.1" },
  ],
  worked:[{ q:"Estimate √75 to 1 decimal place", lines:[
    { step:"Bounds", expr:"8²=64, 9²=81", why:"75 is between 64 and 81" },
    { step:"Closer to?", expr:"75 is closer to 81 (diff 6) than 64 (diff 11)", why:"Nearer to 9" },
    { step:"Answer", expr:"≈ 8.7", why:"About 70% of the way from 8 to 9", answer:true },
  ]}],
  tips:[
    { icon:"⭐", text:"<strong>Learn these:</strong> 1,4,9,16,25,36,49,64,81,100,121,144,169,196,225. If you know all 15, square root questions are trivial." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> √9 = 4.5 (halving instead of rooting). √9 = 3 because 3×3=9." },
  ],
  practice:[
    { q:"What is 13²?", opts:["26","169","130","196"], ans:1, exp:"13×13=<strong>169</strong>." },
    { q:"What is √196?", opts:["13","14","98","16"], ans:1, exp:"14×14=196 so √196=<strong>14</strong>." },
    { q:"√80 lies between:", opts:["7 and 8","8 and 9","9 and 10","6 and 7"], ans:1, exp:"8²=64, 9²=81. 80 is between these so <strong>between 8 and 9</strong>." },
    { q:"Estimate √30 to 1 d.p.", opts:["5.0","5.5","5.8","6.0"], ans:1, exp:"5²=25, 6²=36. Halfway: ≈<strong>5.5</strong>." },
  ],
  prevLesson:{ key:"percentage-change", label:"Percentage Change" },
  nextLesson:{ key:"rounding", label:"Rounding" }
},

"rounding": {
  topic:"Squares & Rounding", topicKey:"Squares & Rounding", theme:"pink", icon:"🔲",
  title:"Rounding: Decimal Places & Significant Figures",
  subtitle:"Two different ways to control precision — count from different starting points.",
  keyIdea:{ rule:"Look at the NEXT digit: ≥5 round up, ≤4 round down. d.p. counts from decimal point. s.f. counts from first non-zero digit.", detail:"" },
  formulae:[
    { main:"Decimal places: count digits after the decimal point", note:"" },
    { main:"Significant figures: count from the first NON-ZERO digit", note:"Leading zeros (e.g. 0.0072) are NOT significant" },
  ],
  steps:[
    { title:"Identify: d.p. or s.f.?", detail:"", formula:"" },
    { title:"Find the last digit you're keeping", detail:"2 d.p. → 2nd digit after decimal. 2 s.f. → 2nd significant digit.", formula:"" },
    { title:"Look at the NEXT digit — round accordingly", detail:"≥5 → round up the kept digit. ≤4 → leave as is.", formula:"3.4572 to 2 d.p. → look at 7 → round up → 3.46" },
  ],
  worked:[{ q:"Round 0.08463 to 2 significant figures", lines:[
    { step:"1st sig fig", expr:"8 (zeros before it don't count)", why:"First non-zero digit" },
    { step:"2nd sig fig", expr:"4", why:"Digit after 8" },
    { step:"Next digit", expr:"6 ≥ 5 → round 4 up to 5", why:"" },
    { step:"Answer", expr:"0.085", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Significant figures trap:</strong> 0.0072 has only 2 significant figures (7 and 2). Leading zeros are not significant." },
    { icon:"⭐", text:"<strong>Rounding up 9:</strong> 3.995 to 2 d.p. rounds to 4.00 — the 9 becomes 10, carry 1." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Counting leading zeros as significant figures." },
  ],
  practice:[
    { q:"Round 4.7639 to 2 d.p.", opts:["4.76","4.77","4.8","5.0"], ans:0, exp:"2nd d.p.=6. Next=3<5, keep: <strong>4.76</strong>." },
    { q:"Round 0.004752 to 2 s.f.", opts:["0.0048","0.005","0.47","0.0047"], ans:0, exp:"1st=4, 2nd=7. Next=5≥5, round up: <strong>0.0048</strong>." },
    { q:"Round 34,750 to 3 s.f.", opts:["34,700","34,800","35,000","34,750"], ans:1, exp:"3 sig figs: 3,4,7. Next=5≥5, round up: <strong>34,800</strong>." },
    { q:"Round 9.996 to 2 d.p.", opts:["9.99","10.00","9.90","10.0"], ans:1, exp:"2nd d.p.=9. Next=6≥5, carry: <strong>10.00</strong>." },
  ],
  prevLesson:{ key:"squares-roots", label:"Squares & Roots" },
  nextLesson:{ key:"circles", label:"Circles" }
},

/* ════════ MATHS — CIRCLES ════════ */
"circles": {
  topic:"Circles", topicKey:"Circles", theme:"teal", icon:"⭕",
  title:"Circles: Circumference, Area, Arcs & Sectors",
  subtitle:"Two core formulas plus sector fractions — always check whether you have radius or diameter.",
  keyIdea:{ rule:"C = πd = 2πr · A = πr² · Arcs and sectors: multiply by the fraction of the full circle", detail:"The most common mistake: using diameter in A = πr². Area always uses radius." },
  formulae:[
    { main:"Circumference C = πd = 2πr", note:"Distance around the circle" },
    { main:"Area A = πr²", note:"ALWAYS use radius — never diameter" },
    { main:"Arc = fraction × πd · Sector area = fraction × πr²", note:"½ for semi, ¼ for quarter, ¾ for three-quarter" },
  ],
  steps:[
    { title:"Identify what you need: C, A, arc, or sector area", detail:"", formula:"" },
    { title:"Check: radius or diameter given?", detail:"If given diameter, ÷2 to get radius before using A=πr².", formula:"d=10cm → r=5cm" },
    { title:"For arcs/sectors: find the fraction first", detail:"", formula:"Semi: ½ · Quarter: ¼ · Three-quarter: ¾" },
    { title:"Substitute and calculate", detail:"Give correct units: cm for length, cm² for area.", formula:"A=π×5²=25π≈78.5 cm²" },
  ],
  worked:[{ q:"Diameter 14 cm. Find C and A. (π=3.14)", lines:[
    { step:"C", expr:"πd = 3.14 × 14 = 43.96 cm", why:"Use diameter directly" },
    { step:"Radius", expr:"r = 14÷2 = 7 cm", why:"Need r for area" },
    { step:"A", expr:"π×7² = 3.14×49 = 153.86 cm²", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Units:</strong> Circumference = cm. Area = cm². Always squared for area!" },
    { icon:"⭐", text:"<strong>Semi-circle perimeter:</strong> arc (½πd) + diameter. Don't forget the straight edge!" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Using A=πd² instead of A=πr². ALWAYS use radius in the area formula." },
    { text:"<strong>Common mistake:</strong> Semi-circle perimeter = only the arc. Add the diameter too." },
  ],
  practice:[
    { q:"Circumference of circle with radius 6 cm? (π=3.14)", opts:["18.84 cm","37.68 cm","113.04 cm","12 cm"], ans:1, exp:"C=2πr=2×3.14×6=<strong>37.68 cm</strong>." },
    { q:"Area of circle with diameter 10 cm? (π=3.14)", opts:["31.4 cm²","78.5 cm²","314 cm²","15.7 cm²"], ans:1, exp:"r=5. A=πr²=3.14×25=<strong>78.5 cm²</strong>." },
    { q:"Area of semi-circle with diameter 12 cm? (π=3.14)", opts:["56.52 cm²","226.08 cm²","113.04 cm²","37.68 cm²"], ans:0, exp:"r=6. ½×π×36=½×113.04=<strong>56.52 cm²</strong>." },
    { q:"Perimeter of semi-circle with diameter 10 cm? (π=3.14)", opts:["15.7 cm","25.7 cm","31.4 cm","20 cm"], ans:1, exp:"Arc=½×π×10=15.7. Plus diameter=10. Total:<strong>25.7 cm</strong>." },
  ],
  prevLesson:{ key:"rounding", label:"Rounding" },
  nextLesson:{ key:"standard-form", label:"Standard Form" }
},

/* ════════ MATHS — STANDARD FORM ════════ */
"standard-form": {
  topic:"Standard Form", topicKey:"Standard Form", theme:"blue", icon:"🔬",
  title:"Standard Form",
  subtitle:"Writing, converting and calculating with very large and very small numbers using A × 10ⁿ.",
  keyIdea:{ rule:"A × 10ⁿ where 1 ≤ A < 10 · Big numbers: positive n · Small numbers: negative n", detail:"For × and ÷ calculations, deal with A values and powers separately. For + and −, convert to ordinary numbers first." },
  formulae:[
    { main:"Large: move decimal LEFT → positive power", note:"34,000,000 → 3.4 × 10⁷" },
    { main:"Small: move decimal RIGHT → negative power", note:"0.0062 → 6.2 × 10⁻³" },
    { main:"(a×10ᵐ)×(b×10ⁿ) = (a×b)×10ᵐ⁺ⁿ", note:"Multiply A's, add powers" },
  ],
  steps:[
    { title:"Writing in standard form", detail:"Move decimal after first digit. Count places moved = power.", formula:"34,700,000 → 3.47 (moved 7 left) → 3.47×10⁷" },
    { title:"Converting back", detail:"Positive power → move right. Negative power → move left.", formula:"5×10⁻³ → move 3 left → 0.005" },
    { title:"Multiplying/dividing", detail:"Deal with A values and powers separately.", formula:"(3×10⁴)×(2×10³) → 6×10⁷" },
  ],
  worked:[{ q:"Calculate (4×10⁵)×(3×10²)", lines:[
    { step:"A values", expr:"4 × 3 = 12", why:"" },
    { step:"Powers", expr:"10⁵ × 10² = 10⁷", why:"5+2=7" },
    { step:"Check A", expr:"12 is not between 1–10 → adjust", why:"" },
    { step:"Answer", expr:"1.2 × 10⁸", why:"12×10⁷ = 1.2×10⁸", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Always check A after multiplying!</strong> If you get 12×10⁴, adjust to 1.2×10⁵." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> For small numbers, forgetting the power is negative. 0.0062 = 6.2×10⁻³, NOT 6.2×10³." },
  ],
  practice:[
    { q:"Write 4,600,000 in standard form.", opts:["46×10⁵","4.6×10⁶","4.6×10⁵","0.46×10⁷"], ans:1, exp:"<strong>4.6×10⁶</strong>." },
    { q:"Write 0.00039 in standard form.", opts:["3.9×10³","3.9×10⁻⁴","3.9×10⁴","39×10⁻⁵"], ans:1, exp:"<strong>3.9×10⁻⁴</strong>." },
    { q:"Write 7.2×10⁵ as an ordinary number.", opts:["72,000","720,000","7,200,000","0.000072"], ans:1, exp:"<strong>720,000</strong>." },
    { q:"(2×10³)×(4×10⁵) =", opts:["8×10⁸","8×10¹⁵","6×10⁸","8×10⁷"], ans:0, exp:"2×4=8, 3+5=8. <strong>8×10⁸</strong>." },
  ],
  prevLesson:{ key:"circles", label:"Circles" },
  nextLesson:{ key:"statistics-data", label:"Types of Data" }
},

/* ════════ MATHS — STATISTICS ════════ */
"statistics-data": {
  topic:"Statistics", topicKey:"Statistics", theme:"green", icon:"📊",
  title:"Types of Data: Discrete vs Continuous",
  subtitle:"An important distinction that affects how you collect and display data.",
  keyIdea:{ rule:"Discrete = counted (exact values) · Continuous = measured (any value in a range)", detail:"" },
  formulae:[{ main:"Discrete: counted · Continuous: measured", note:"Measurement test: if you need a ruler/scales/thermometer → continuous" }],
  steps:[
    { title:"Ask: is it counted or measured?", detail:"Counted with whole numbers (goals, people) → discrete. Measured with instruments (height, weight, time) → continuous.", formula:"" },
    { title:"Ask: can it take ANY value in a range?", detail:"Height can be 165.3472… cm — any decimal. That's continuous.", formula:"" },
  ],
  worked:[{ q:"Classifying examples", lines:[
    { step:"Number of goals", expr:"Discrete", why:"Counted, only whole numbers" },
    { step:"Height in cm", expr:"Continuous", why:"Measured, can be any decimal" },
    { step:"Shoe size", expr:"Discrete", why:"Specific values only (3, 3.5, 4…) — not any decimal" },
    { step:"Temperature", expr:"Continuous", why:"Measured, any decimal value possible", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Shoe size is discrete</strong> even with half-sizes — it can only take specific values, not any decimal like 4.73." },
    { icon:"⭐", text:"<strong>Time is continuous</strong> even though we write it in minutes — 3.8524 minutes is a perfectly valid time." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying time is discrete because we write it in whole minutes. Time is continuous." },
  ],
  practice:[
    { q:"Number of goals in a match: discrete or continuous?", opts:["Continuous","Discrete"], ans:1, exp:"Goals are counted whole numbers. <strong>Discrete</strong>." },
    { q:"Height of students: discrete or continuous?", opts:["Continuous","Discrete"], ans:0, exp:"Height is measured and can be any decimal. <strong>Continuous</strong>." },
    { q:"Pages in a book: discrete or continuous?", opts:["Continuous","Discrete"], ans:1, exp:"Whole numbers only. <strong>Discrete</strong>." },
    { q:"Temperature: discrete or continuous?", opts:["Continuous","Discrete"], ans:0, exp:"Any decimal value possible. <strong>Continuous</strong>." },
  ],
  prevLesson:{ key:"standard-form", label:"Standard Form" },
  nextLesson:{ key:"statistics-averages", label:"Averages & Range" }
},

"statistics-averages": {
  topic:"Statistics", topicKey:"Statistics", theme:"green", icon:"📊",
  title:"Mean, Median, Mode & Range",
  subtitle:"Four ways to summarise data — always sort first before finding median or mode.",
  keyIdea:{ rule:"Mean=total÷count · Median=middle (sorted) · Mode=most common · Range=max−min", detail:"" },
  formulae:[
    { main:"Mean = Σx ÷ n", note:"Sum of all values divided by how many" },
    { main:"Median: sort first, then find the middle position", note:"Even count: average the two middle values" },
  ],
  steps:[
    { title:"Sort the data", detail:"ALWAYS sort into order before finding median or mode.", formula:"3,8,1,6,4 → sorted: 1,3,4,6,8" },
    { title:"Find median position", detail:"n values → middle at position (n+1)÷2.", formula:"5 values → position 3 → median=4" },
    { title:"Calculate mean", detail:"Sum all values and divide by count.", formula:"(1+3+4+6+8)÷5=22÷5=4.4" },
  ],
  worked:[{ q:"Mean, median, mode & range of: 5,3,8,3,7,3,9", lines:[
    { step:"Sort", expr:"3,3,3,5,7,8,9", why:"Always sort first" },
    { step:"Mode", expr:"3 (appears 3 times)", why:"Most common" },
    { step:"Median", expr:"5 (4th of 7 values)", why:"Middle value" },
    { step:"Mean", expr:"38÷7 ≈ 5.43", why:"3+3+3+5+7+8+9=38" },
    { step:"Range", expr:"9−3=6", why:"Max−min", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Even number of values:</strong> average the two middle values. For 1,3,5,9 → median=(3+5)/2=4." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Finding median without sorting first. Always sort!" },
  ],
  practice:[
    { q:"Mean of: 4,7,9,2,8", opts:["7","6","5","8"], ans:1, exp:"Sum=30,count=5. Mean=<strong>6</strong>." },
    { q:"Median of: 3,8,1,6,4", opts:["4","6","3","8"], ans:0, exp:"Sorted:1,3,4,6,8. Middle=<strong>4</strong>." },
    { q:"Mode of: 2,5,3,5,7,5,2", opts:["2","3","5","7"], ans:2, exp:"5 appears 3 times. Mode=<strong>5</strong>." },
    { q:"Range of: 12,7,19,3,15", opts:["12","16","19","7"], ans:1, exp:"19−3=<strong>16</strong>." },
  ],
  prevLesson:{ key:"statistics-data", label:"Types of Data" },
  nextLesson:{ key:"statistics-freq", label:"Frequency Tables" }
},

"statistics-freq": {
  topic:"Statistics", topicKey:"Statistics", theme:"green", icon:"📊",
  title:"Averages from Frequency Tables",
  subtitle:"When data is in a frequency table, you must multiply before dividing — Σ(fx) ÷ Σf.",
  keyIdea:{ rule:"Mean = Σ(fx) ÷ Σf · Add an fx column: multiply each value by its frequency", detail:"" },
  formulae:[
    { main:"Mean = Σ(fx) ÷ Σf", note:"f = frequency · x = value · Σ = sum of" },
    { main:"Median position = (Σf + 1) ÷ 2", note:"Use cumulative frequency to find which value sits here" },
  ],
  steps:[
    { title:"Add an fx column", detail:"For each row: value × frequency.", formula:"Value 3, frequency 4 → fx=12" },
    { title:"Find Σ(fx)", detail:"Sum of all fx values.", formula:"" },
    { title:"Find Σf", detail:"Total of all frequencies.", formula:"" },
    { title:"Divide", detail:"Mean = Σ(fx) ÷ Σf.", formula:"" },
  ],
  worked:[{ q:"Frequency table: Score 1(f=2), 2(f=5), 3(f=3), 4(f=1). Find mean.", lines:[
    { step:"fx values", expr:"1×2=2, 2×5=10, 3×3=9, 4×1=4", why:"" },
    { step:"Σ(fx)", expr:"2+10+9+4 = 25", why:"" },
    { step:"Σf", expr:"2+5+3+1 = 11", why:"" },
    { step:"Mean", expr:"25÷11 ≈ 2.27", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Add a cumulative frequency column</strong> to help find the median position." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Finding mean of values only — (1+2+3+4)/4=2.5. This ignores frequency." },
  ],
  practice:[
    { q:"Table: 5(f=3),6(f=4),7(f=2),8(f=1). What is Σf?", opts:["10","20","26","4"], ans:0, exp:"3+4+2+1=<strong>10</strong>." },
    { q:"Same table: Σ(fx)?", opts:["26","61","56","60"], ans:1, exp:"5×3+6×4+7×2+8×1=15+24+14+8=<strong>61</strong>." },
    { q:"Mean (Σfx=61, Σf=10)?", opts:["6.1","6.5","5.5","7.0"], ans:0, exp:"61÷10=<strong>6.1</strong>." },
    { q:"For Σf=20, the median position is:", opts:["10th","10.5th","20th","11th"], ans:1, exp:"(20+1)÷2=10.5th — average 10th and 11th values. <strong>10.5th</strong>." },
  ],
  prevLesson:{ key:"statistics-averages", label:"Averages & Range" },
  nextLesson:{ key:"statistics-charts", label:"Charts & Graphs" }
},

"statistics-charts": {
  topic:"Statistics", topicKey:"Statistics", theme:"green", icon:"📊",
  title:"Charts, Graphs & Drawing Conclusions",
  subtitle:"Reading bar charts and line graphs, spotting misleading graphs, and writing strong data conclusions.",
  keyIdea:{ rule:"Always quote actual numbers in conclusions — never just say 'it went up'", detail:"" },
  formulae:[{ main:"Strong conclusion: [value] changed from [X] to [Y], a [rise/fall] of [amount/percentage]", note:"" }],
  steps:[
    { title:"Read the axes carefully", detail:"Units? Y-axis from zero? Equal class widths?", formula:"" },
    { title:"Spot misleading features", detail:"Truncated axis (not from 0), unequal bar widths, missing labels, 3D effects.", formula:"" },
    { title:"Write a conclusion with specific numbers", detail:"Compare values. Use: 'increased by X', 'was X times greater than'.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Strong conclusion template:</strong> 'The [value] increased from [X] to [Y] between [A] and [B], a rise of [amount].'"},
    { icon:"⭐", text:"<strong>Misleading checklist:</strong> Does y-axis start at 0? Equal bar widths? Consistent scale? Biased title?" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Vague conclusions like 'sales went up'. Always include actual numbers." },
  ],
  practice:[
    { q:"Best conclusion for Jan=£20k, Feb=£25k sales?", opts:["Sales went up","Sales increased by £5,000 (25%) from January to February","February was better","Sales were higher"], ans:1, exp:"Best answer includes <strong>actual figures and percentage</strong>." },
    { q:"Y-axis starting at 50 instead of 0 is:", opts:["Good practice","Misleading — exaggerates changes","Irrelevant","More accurate"], ans:1, exp:"Starting above 0 makes changes look <strong>bigger than they are — misleading</strong>." },
    { q:"Continuous data should be shown in:", opts:["Bar chart with gaps","Pie chart","Histogram with no gaps","Pictogram"], ans:2, exp:"Continuous data → <strong>histogram with no gaps</strong>." },
    { q:"A bar chart misleads when:", opts:["It has a title","Bars have different widths","It uses colour","It has a key"], ans:1, exp:"<strong>Different bar widths</strong> distort visual comparisons." },
  ],
  prevLesson:{ key:"statistics-freq", label:"Frequency Tables" },
  nextLesson:null
},
/* ════════ ENGLISH — READING A POEM ════════ */
"reading-q-first": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 1: Read the Question First",
  subtitle:"Before you look at the poem, read the question and highlight the command words — they are your compass for the entire essay.",
  keyIdea:{ rule:"Command words tell you exactly what to write about — every paragraph must link back to them", detail:"Every mark you earn comes from answering the question. Points that don't link to the command words won't score, no matter how clever they are." },
  formulae:[{ main:"Read question → highlight command words → return to them after every paragraph", note:"" }],
  steps:[
    { title:"Read the question carefully — twice", detail:"The question is the most important text on the page.", formula:"e.g. 'How does Yeats present ideas and feelings about motherhood?'" },
    { title:"Underline the command words", detail:"These are your focus words that every paragraph must address.", formula:"Command words: 'present' · 'ideas and feelings' · 'motherhood'" },
    { title:"Ask: what must I show?", detail:"'Present' = analyse language, form and structure. 'Feelings' = the emotional content. Subject = what those feelings are about.", formula:"" },
    { title:"Keep returning to the command words throughout", detail:"After every paragraph, check: have I used the command words?", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Highlighting tip:</strong> Use different colours for different command words — then use the same colours when annotating the poem." },
    { icon:"⭐", text:"<strong>If you don't answer the question, you can't get top marks</strong> — no matter how much you know about the poem." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Writing about every technique without linking to the question. Every point must connect to the command words." },
    { text:"<strong>Common mistake:</strong> Only using command words in the introduction. They must appear in EVERY paragraph." },
  ],
  practice:[
    { q:"'How does Yeats present ideas and feelings about motherhood?' — what are the command words?", opts:["Yeats, poem, write","present, ideas and feelings, motherhood","How, does, the","poem, language, techniques"], ans:1, exp:"<strong>'present', 'ideas and feelings', 'motherhood'</strong> — these tell you what to analyse and what the essay is about." },
    { q:"A paragraph about rhyme scheme doesn't mention 'motherhood'. The problem is:", opts:["Too short","Doesn't use command words — not answering the question","Rhyme isn't worth analysing","Wrong pen colour"], ans:1, exp:"Even a well-written paragraph won't score if it doesn't connect to the <strong>command words</strong>." },
    { q:"Why do command words matter most?", opts:["They look impressive","All marks come from answering the question — command words are your guide","They're bold","The teacher likes them"], ans:1, exp:"<strong>All marks come from answering the question.</strong> Command words are your guide to every mark." },
    { q:"After each paragraph you should:", opts:["Start a new page","Check you've used the command words","Write a new thesis","Count your words"], ans:1, exp:"After each paragraph, <strong>check you've used the command words</strong>." },
  ],
  prevLesson:null,
  nextLesson:{ key:"reading-first-read", label:"Step 2: First Read" }
},

"reading-first-read": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 2: First Read for Understanding",
  subtitle:"Read the whole poem once without stopping to analyse — get the big picture first.",
  keyIdea:{ rule:"First read = understanding the poem. Second read = finding the evidence.", detail:"Don't try to analyse on your first read — you'll miss the overall meaning, mood and subject." },
  formulae:[{ main:"Who is speaking? · What's happening? · What's the mood? · How does it end differently to how it begins?", note:"Answer these questions after your first read" }],
  steps:[
    { title:"Read all the way through without stopping", detail:"Resist the urge to annotate. Just read.", formula:"" },
    { title:"Ask: who is the speaker?", detail:"Is it the poet? A persona? First person or third person?", formula:"'Song of the Old Mother' — speaker is an old mother, 1st person" },
    { title:"Ask: what is literally happening?", detail:"Summarise in one or two sentences.", formula:"'An old mother describes her exhausting daily work while the young sleep and dream.'" },
    { title:"Notice the mood and any shift", detail:"Does the tone change from beginning to end? A shift is often a key analytical point.", formula:"Yeats: begins with action/duty, ends with fading energy — cyclical and bleak" },
  ],
  tips:[
    { icon:"💡", text:"<strong>The title often helps:</strong> 'Song of the Old Mother' signals immediately — personal, about age, about a mother figure." },
    { icon:"⭐", text:"<strong>Trust your first impression of mood.</strong> If it feels exhausted and resigned, it probably is. Name that feeling and explore how the poet creates it." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Starting to annotate on the first read. Understand the whole before analysing parts." },
  ],
  practice:[
    { q:"Purpose of the first read?", opts:["Identify every technique","Get overall understanding of speaker, subject, mood and meaning","Write your introduction","Count the stanzas"], ans:1, exp:"First read = <strong>overall understanding</strong> of who is speaking, what is happening and the mood." },
    { q:"'An old mother works from dawn to night while the young lie idle.' Is this a useful first read summary?", opts:["No — too simple","Yes — captures speaker, subject and contrast as a starting point","No — need every technique","Only if you add quotes"], ans:1, exp:"<strong>Yes!</strong> Speaker + subject + contrast is exactly what you need from a first read." },
    { q:"A shift in mood between beginning and end of a poem is called:", opts:["Enjambment","A caesura","A volta","Assonance"], ans:2, exp:"A <strong>volta</strong> — a turn or shift in the poem's tone, argument or perspective." },
    { q:"In 'The Schoolboy', the tone shifts from:", opts:["Sad to happy","Angry to calm","Joyful and free → miserable and trapped","Confused to clear"], ans:2, exp:"<strong>Joyful (summer morning, birdsong) → miserable and trapped (school, sighing, dismay)</strong>." },
  ],
  prevLesson:{ key:"reading-q-first", label:"Step 1: Read the Question" },
  nextLesson:{ key:"reading-annotate", label:"Step 3: Annotate" }
},

"reading-annotate": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 3: Annotate Using the Question",
  subtitle:"On your second read, highlight techniques, devices and quotes that connect to the command words.",
  keyIdea:{ rule:"Every annotation must connect to the command words — label technique AND note what it suggests about the question", detail:"" },
  formulae:[{ main:"Highlight quote → label technique → note what it suggests linked to the question", note:"" }],
  steps:[
    { title:"Highlight quotes connecting to command words", detail:"Not everything — the most relevant ones only.", formula:"" },
    { title:"Label the technique", detail:"Simile, metaphor, alliteration, verb, noun, repetition…", formula:"'must' (repeated) → repetition" },
    { title:"Note what each technique suggests", detail:"A brief phrase connecting to the question.", formula:"Repetition of 'must' → no choice, duty, burden — links to 'feelings about motherhood'" },
    { title:"Look for structural features too", detail:"Enjambment, end-stop, volta, rhyme scheme, single stanza vs many.", formula:"'Song of the Old Mother' — single stanza, no break, mirrors relentless routine" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Aim for 4–6 strong annotations</strong> rather than 20 surface-level ones. Quality beats quantity." },
    { icon:"⭐", text:"<strong>Always annotate language AND structure.</strong> Poems where you only annotate language miss half the marks." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Annotating everything without checking relevance. Keep returning to the command words." },
  ],
  practice:[
    { q:"Every annotation should connect to:", opts:["The poet's biography","The command words in the question","Syllable count","The rhyme scheme only"], ans:1, exp:"Every annotation must connect to the <strong>command words</strong>." },
    { q:"In 'Song of the Old Mother', repetition of 'must' links to which command words?", opts:["Yeats, poem","Ideas and feelings about motherhood — duty, no choice, burden","Dawn, fire","Structure only"], ans:1, exp:"'Must' repeated links directly to <strong>her feelings about motherhood — no choice, burden, duty</strong>." },
    { q:"How many strong annotations should you aim for?", opts:["30+","20","4–6 strong developed ones","Just one per stanza"], ans:2, exp:"<strong>4–6 strong annotations</strong> — quality over quantity." },
    { q:"What structural features should you annotate?", opts:["Font size","Enjambment, end-stop, volta, rhyme scheme, stanza structure","The poet's name","Publication date"], ans:1, exp:"<strong>Enjambment, end-stop, volta, rhyme scheme and stanza structure</strong> — all deliberate choices." },
  ],
  prevLesson:{ key:"reading-first-read", label:"Step 2: First Read" },
  nextLesson:{ key:"reading-plan", label:"Step 4: Plan" }
},

"reading-plan": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 4: Plan Your Essay",
  subtitle:"Spend 3–5 minutes planning before you write a single sentence — a clear plan equals a well-structured essay.",
  keyIdea:{ rule:"Thesis statement + 3 topic sentences (Language, Form, Structure) + quotes and techniques under each", detail:"The teacher's writing frame uses Language / Form / Structure as three paragraph angles — these cover everything." },
  formulae:[{ main:"Thesis → Para 1: Language → Para 2: Form → Para 3: Structure", note:"Check: do all three connect to command words?" }],
  steps:[
    { title:"Write your thesis statement", detail:"Your overall argument in one sentence — include the command words.", formula:"'Yeats presents motherhood as exhausting and thankless — a burden borne without choice.'" },
    { title:"Write three topic sentences: Language, Form, Structure", detail:"Each makes a different point supporting your thesis.", formula:"1. Language shows duty/exhaustion · 2. Form mirrors relentless routine · 3. Structure shows contrast between old and young" },
    { title:"Add quotes and techniques under each", detail:"Short notes — you'll expand in the essay.", formula:"'must' (repetition) · 'I rise in the dawn' (verb, imagery) · contrast with 'the young'" },
    { title:"Check your plan answers the question", detail:"Read back your three topic sentences — do they all use command words?", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Language / Form / Structure</strong> is a reliable three-paragraph structure for any poem question." },
    { icon:"⭐", text:"<strong>5 minutes planning saves 15 minutes of confused writing.</strong> Students who plan write better essays." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Three paragraphs all about language. Always cover form AND structure too." },
  ],
  practice:[
    { q:"The teacher's recommended three paragraph angles are:", opts:["Introduction, body, conclusion","Language, Form, Structure","Simile, metaphor, alliteration","Meaning, message, theme"], ans:1, exp:"<strong>Language, Form, Structure</strong> — three angles that cover everything in a poem." },
    { q:"Good thesis for 'How does Yeats present feelings about motherhood?':", opts:["This poem has lots of techniques.","Yeats presents motherhood as exhausting and thankless — a duty borne without choice or rest.","I will discuss three paragraphs.","The poem is about an old woman."], ans:1, exp:"Good thesis: <strong>directly answers question, specific, arguable, uses command words</strong>." },
    { q:"How long should planning take?", opts:["No time","Whole exam","3–5 minutes","20 minutes"], ans:2, exp:"<strong>3–5 minutes</strong> — enough structure without eating into writing time." },
    { q:"A Language paragraph for the Yeats poem should focus on:", opts:["Page numbers","Word choices, imagery, repetition, verbs — and how they convey feelings about motherhood","The poet's date of birth","Number of lines"], ans:1, exp:"Language paragraph = <strong>word choices, imagery, repetition, verbs and how they convey the required feelings</strong>." },
  ],
  prevLesson:{ key:"reading-annotate", label:"Step 3: Annotate" },
  nextLesson:{ key:"essay-intro", label:"Writing Your Introduction" }
},

/* ════════ ENGLISH — ESSAY WRITING ════════ */
"essay-intro": {
  topic:"Essay Writing", topicKey:"Essay Writing", theme:"violet", icon:"✍️",
  title:"Writing Your Introduction",
  subtitle:"Set out your main argument, establish your approach, show you're answering the question from sentence one.",
  keyIdea:{ rule:"Thesis statement + command words + writer's purpose — 3 to 4 sentences, no detailed analysis yet", detail:"Keep it brief. Don't analyse quotes in the introduction — save that for body paragraphs." },
  formulae:[{ main:"In '[poem]', [poet] presents [command subject] as [your specific argument].", note:"Include poet, poem title, command words, clear argument" }],
  steps:[
    { title:"Start with a clear thesis statement", detail:"Your main argument. Include poet's name, poem title, and command words.", formula:"'In \"Song of the Old Mother\", Yeats presents motherhood as…'" },
    { title:"Mention the writer's purpose", detail:"What is the poet trying to make the reader feel or think?", formula:"'Yeats seems to want the reader to understand the inequality between generations and the quiet suffering of the old.'" },
    { title:"Optional: a brief summarising quote", detail:"One short quote that captures your argument.", formula:"The repeated verb 'must' immediately signals duty and obligation." },
  ],
  compare:[
    { good:"In 'Song of the Old Mother', Yeats presents motherhood as exhausting and thankless — a life of endless duty contrasted sharply with the idle freedom of the young.", bad:"In this essay I will talk about the poem 'Song of the Old Mother' and look at techniques." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Don't start with 'In this essay I will…'</strong> — jump straight into your argument." },
    { icon:"⭐", text:"<strong>Use single inverted commas for poem titles:</strong> 'Song of the Old Mother'." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Starting to analyse quotes in detail in the introduction. Save that for body paragraphs." },
    { text:"<strong>Common mistake:</strong> Not using command words. 'This poem is about an old woman' doesn't answer the question." },
  ],
  practice:[
    { q:"What is a thesis statement?", opts:["A list of techniques","Your main argument you'll prove throughout the essay","A poem summary","The poet's biography"], ans:1, exp:"Thesis = <strong>your main argument</strong> — the specific point you'll prove across the whole essay." },
    { q:"Better introduction opener:", opts:["In this essay I will talk about the poem.","In 'Song of the Old Mother', Yeats presents motherhood as exhausting and thankless, showing the stark contrast between the old and the young.","The poem has lots of techniques.","W.B. Yeats was an Irish poet."], ans:1, exp:"Best option: <strong>names poem and poet, uses command words, makes specific argument</strong>." },
    { q:"Should you analyse a quote in detail in your introduction?", opts:["Yes","No — save detailed analysis for body paragraphs","Only a really good quote","Always"], ans:1, exp:"<strong>No</strong> — the introduction establishes your argument. Detailed analysis belongs in body paragraphs." },
    { q:"How long should your introduction be?", opts:["1 sentence","1 full page","3–4 sentences","As long as possible"], ans:2, exp:"<strong>3–4 sentences</strong> — establish your argument without eating into analytical paragraph time." },
  ],
  prevLesson:{ key:"reading-plan", label:"Step 4: Plan" },
  nextLesson:{ key:"essay-body", label:"Writing Body Paragraphs (PEEA)" }
},

"essay-body": {
  topic:"Essay Writing", topicKey:"Essay Writing", theme:"violet", icon:"✍️",
  title:"Writing Body Paragraphs — PEEA",
  subtitle:"Your teacher uses PEEA: Point → Evidence → Explain → Analysis. Every body paragraph follows this structure.",
  keyIdea:{ rule:"PEEA: Point (your argument) → Evidence (short quote) → Explain (what it means) → Analysis (zoom into words/techniques)", detail:"The difference between Explain and Analysis: Explain says what the quote means overall. Analysis zooms into specific words and techniques and asks WHY." },
  formulae:[
    { main:"P — Make a clear point about how the poet presents the command subject", note:"'Yeats presents motherhood as…' / 'One way Clare shows feelings of love is…'" },
    { main:"E — Choose a short quotation to support your point", note:"'This is shown when the poet writes…' / 'For example, the line…'" },
    { main:"E — Explain what the quotation means", note:"'This suggests that…' / 'This shows that her experience is…'" },
    { main:"A — Zoom in on a word or technique and explain its effect", note:"'The word \"___\" implies…' / 'The poet's choice of verb suggests…'" },
  ],
  worked:[{ q:"Model PEEA paragraph — 'Song of the Old Mother'", lines:[
    { step:"Point", expr:"Yeats presents motherhood as tiring and full of constant responsibility.", why:"Clear argument + command words" },
    { step:"Evidence", expr:"'I rise in the dawn'", why:"Short, precise quote embedded naturally" },
    { step:"Explain", expr:"This suggests that the mother must begin working before anyone else is awake.", why:"What the quote means overall" },
    { step:"Explain+", expr:"The word 'must' appears several times, implying she has no choice — motherhood has become a burden she cannot escape.", why:"Extending the explanation" },
    { step:"Analysis", expr:"Yeats contrasts her with 'the young' who 'lie long and dream', making her life seem even harder and more exhausting.", why:"Zoom in on contrast — specific words" },
    { step:"Analysis+", expr:"This contrast helps the reader understand her feelings of frustration and weariness.", why:"Effect on reader — links back to command words", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Explain vs Analysis:</strong> Explain = what does this quote mean? Analysis = zoom into a specific word or technique and ask WHY did the poet choose this?" },
    { icon:"⭐", text:"<strong>Always link back at the end of your paragraph</strong> to the command words — 'This shows that Yeats presents motherhood as…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Writing Explain but forgetting Analysis. Explain tells us what. Analysis tells us HOW and WHY." },
    { text:"<strong>Common mistake:</strong> Quoting too much. One short precise phrase is better than three lines." },
  ],
  practice:[
    { q:"PEEA stands for:", opts:["Poem, Evidence, Effect, Argument","Point, Evidence, Explain, Analysis","Point, Example, Evaluate, Argument","Paragraph, Evidence, Explore, Analysis"], ans:1, exp:"<strong>PEEA = Point, Evidence, Explain, Analysis</strong>." },
    { q:"Difference between Explain and Analysis:", opts:["No difference","Explain = overall meaning of quote; Analysis = zoom into specific words/techniques and WHY","Explain is longer","Analysis comes first"], ans:1, exp:"<strong>Explain = what the quote means overall. Analysis = zoom into specific words/techniques and ask WHY.</strong>" },
    { q:"'The word \"must\" implies she has no choice.' This is:", opts:["The Point","The Evidence","The Explain","The Analysis — zooming into a specific word"], ans:3, exp:"<strong>Analysis</strong> — zooming into a specific word and explaining what it implies." },
    { q:"Best Point for a paragraph about language in 'Song of the Old Mother':", opts:["The poem uses repetition.","One way Yeats presents feelings about motherhood is through language choices that show the relentless, exhausting nature of her duty.","The poem is about an old woman.","Yeats uses verbs."], ans:1, exp:"Best Point: <strong>clear argument + command words + specific angle (language)</strong>." },
  ],
  prevLesson:{ key:"essay-intro", label:"Writing Your Introduction" },
  nextLesson:{ key:"essay-conclusion", label:"Writing a Conclusion" }
},

"essay-conclusion": {
  topic:"Essay Writing", topicKey:"Essay Writing", theme:"violet", icon:"✍️",
  title:"Writing a Conclusion",
  subtitle:"Return to your thesis, briefly summarise, and comment on the writer's overall purpose — 2 to 3 sentences.",
  keyIdea:{ rule:"Return to thesis + summarise how Language, Form and Structure work together + writer's overall purpose", detail:"Don't introduce new points or new quotes in the conclusion." },
  formulae:[{ main:"Overall, [poet] presents [command subject] as [restate thesis] through [language/form/structure].", note:"" }],
  steps:[
    { title:"Restate your thesis — but don't just copy it", detail:"Develop it slightly — show how your paragraphs have proved it.", formula:"'Overall, Yeats presents motherhood as a life of endless, thankless duty…'" },
    { title:"Summarise how language, form and structure work together", detail:"One sentence showing all three contributed to the meaning.", formula:"'…through repetitive language, a single unbroken stanza and the cyclical structure of the poem.'" },
    { title:"Comment on writer's overall purpose", detail:"What did the poet want the reader to think or feel?", formula:"'Yeats may have wanted readers to recognise and value the hidden, unacknowledged labour of older women.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Useful conclusion starters:</strong> 'Overall…' / 'In conclusion…' / 'Through this poem, [poet] presents…'" },
    { icon:"⭐", text:"<strong>Don't introduce new quotes or points.</strong> The conclusion reflects — it doesn't add." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'In conclusion, this poem has lots of techniques.' Vague — restate your specific argument." },
  ],
  practice:[
    { q:"What should your conclusion NOT do?", opts:["Restate the thesis","Comment on writer's purpose","Introduce a new quote and new argument","Summarise the essay"], ans:2, exp:"<strong>Never introduce a new point or quote in the conclusion.</strong> Only reflect on what you've already argued." },
    { q:"Best conclusion sentence:", opts:["That is all I have to say.","Overall, Yeats presents motherhood as exhausting and thankless, using language, form and structure to show the stark inequality between the old mother and the idle young.","The poem uses lots of techniques.","In conclusion, I have discussed three paragraphs."], ans:1, exp:"Best: <strong>restates thesis + mentions language/form/structure + uses command words</strong>." },
    { q:"'Yeats may have wanted readers to recognise the hidden labour of older women' is:", opts:["A new argument — don't include it","A comment on writer's purpose — excellent conclusion material","A quote","An introduction sentence"], ans:1, exp:"This is a <strong>comment on writer's purpose</strong> — excellent in a conclusion." },
    { q:"How long should a conclusion be?", opts:["One word","2–3 sentences","A full page","Same length as body paragraphs"], ans:1, exp:"<strong>2–3 sentences</strong> — brief but purposeful." },
  ],
  prevLesson:{ key:"essay-body", label:"Body Paragraphs — PEEA" },
  nextLesson:{ key:"petal-p", label:"PETAL: P — Point" }
},

/* ════════ ENGLISH — PETAL ════════ */
"petal-p": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"P — Point (Your Topic Sentence)",
  subtitle:"State the supporting point to your thesis statement — this is your argument for this paragraph.",
  keyIdea:{ rule:"State a clear, specific point that supports your thesis and uses the command words", detail:"Don't start with a quote or a technique — start with YOUR argument. Everything else in the paragraph proves it." },
  formulae:[{ main:"'Yeats presents motherhood as…' / 'One way Clare shows feelings of love is…' / 'The poet shows [command subject] by…'", note:"Always include the command subject" }],
  compare:[
    { good:"One way Yeats presents feelings about motherhood is through language choices that show the relentless and exhausting nature of the mother's daily duty.", bad:"John Clare uses lots of techniques in his poem to write about love." },
  ],
  tips:[{ icon:"💡", text:"<strong>The Point is your strongest, clearest statement</strong> of what you're about to argue. Everything that follows proves it." }],
  mistakes:[{ text:"<strong>Common mistake:</strong> Opening a paragraph with a quote. Always start with YOUR point first." }],
  practice:[
    { q:"Best Point to open a paragraph about language in 'Song of the Old Mother'?", opts:["The simile 'like a flower' is used.","One way Yeats presents feelings about motherhood is through repetition of the word 'must', showing the relentless duty she faces.","The poem is about an old woman.","Yeats uses language devices."], ans:1, exp:"Best Point: <strong>clear argument with command words + specific angle</strong>." },
    { q:"Should your Point start with a quote?", opts:["Yes","No — start with your argument; the quote comes in Evidence","Only short quotes","Always"], ans:1, exp:"<strong>No</strong> — Point = YOUR argument. Quote = Evidence (E)." },
    { q:"Point must include:", opts:["A technique definition","The command words AND your specific argument","All techniques","The poem text in full"], ans:1, exp:"Point must include <strong>command words AND your specific argument</strong>." },
    { q:"Purpose of the Point in PETAL?", opts:["Summarise the whole essay","State the specific argument you'll prove in this paragraph","List all techniques","Introduce the poet"], ans:1, exp:"Point = <strong>the specific argument for this paragraph</strong>." },
  ],
  prevLesson:{ key:"essay-conclusion", label:"Writing a Conclusion" },
  nextLesson:{ key:"petal-e", label:"E — Evidence" }
},

"petal-e": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"E — Evidence (Your Quotation)",
  subtitle:"Integrate a short precise quote that supports your Point — always in single inverted commas.",
  keyIdea:{ rule:"Short, targeted, embedded — and directly supports your argument", detail:"A phrase — even a single word — can be more powerful than a full line. You need to be able to analyse every word in your quote." },
  formulae:[
    { main:"'This is shown when the poet writes…'", note:"" },
    { main:"'For example, the line…'", note:"" },
    { main:"'Yeats emphasises this through the phrase…'", note:"" },
  ],
  steps:[
    { title:"Choose a quote proving your Point", detail:"Ask: does this quote show what I argued?", formula:"" },
    { title:"Keep it short and precise", detail:"A phrase beats a full sentence — you need to analyse every word.", formula:"✓ 'I rise in the dawn' rather than the whole first two lines" },
    { title:"Embed it naturally", detail:"Weave into your sentence.", formula:"'Yeats writes that she must \"rise in the dawn\", suggesting…'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Don't quote something you can't analyse.</strong> If you can't say WHY it's interesting word by word, choose a shorter quote." },
    { icon:"⭐", text:"<strong>Always single inverted commas: 'like this'.</strong>" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Quoting three or four lines when one phrase would do." },
  ],
  practice:[
    { q:"Better evidence quote for arguing motherhood is exhausting?", opts:["The whole of stanza 1","'I rise in the dawn'","The whole poem","All the verbs"], ans:1, exp:"<strong>'I rise in the dawn'</strong> — short, precise, packed with analysable meaning." },
    { q:"How to present a quote in your essay?", opts:["CAPITALS","Italics","Single inverted commas: 'like this'","Brackets"], ans:2, exp:"Always <strong>single inverted commas</strong>." },
    { q:"'Embedding a quote' means:", opts:["Putting it on its own line","Weaving it into your own sentence naturally","Boxing it","Highlighting it"], ans:1, exp:"Embedding = <strong>weaving the quote into your own sentence</strong>: 'Yeats writes that she \"rises in the dawn\", suggesting…'" },
    { q:"Why choose a short quote over a long one?", opts:["Shorter is easier","Short quotes allow deeper word-level analysis of every single word","Long quotes look lazy","No reason"], ans:1, exp:"Short quotes allow <strong>deeper word-level analysis</strong> — you need to analyse every word you quote." },
  ],
  prevLesson:{ key:"petal-p", label:"P — Point" },
  nextLesson:{ key:"petal-t", label:"T — Technique" }
},

"petal-t": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"T — Technique (Identify and Explain Effect)",
  subtitle:"Identify the technique used and explain its effect — name it precisely using subject terminology.",
  keyIdea:{ rule:"Name the SPECIFIC technique using subject terminology + explain what effect THIS specific example creates", detail:"Two parts: identify and name → explain the effect. 'This is a simile' earns almost nothing — say what THIS simile does." },
  formulae:[
    { main:"The [technique] '[quote]' suggests / implies / conveys [effect].", note:"'The repetition of \"must\" implies she has no choice…'" },
    { main:"[Poet] uses [technique] to convey / present / show…", note:"'Yeats uses the verb \"rise\" to show…'" },
  ],
  steps:[
    { title:"Identify the technique", detail:"Simile? Metaphor? Repetition? Verb choice? Alliteration? Contrast?", formula:"'must' repeated → repetition" },
    { title:"Name it correctly", detail:"Specific subject terminology — not 'language' or 'word'.", formula:"'The repetition of \"must\"…' not 'The technique…'" },
    { title:"Explain what effect THIS specific example creates", detail:"What does it convey in the context of this poem and this question?", formula:"'…implies the mother has no choice and motherhood is a burden she cannot escape.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Go beyond naming it.</strong> 'This is repetition' earns almost nothing — say what effect THIS specific repetition creates." },
    { icon:"⭐", text:"<strong>Word class counts as technique.</strong> 'The verb \"rise\"…' / 'The adjective \"feeble\"…' — naming word classes and explaining effects shows subject knowledge." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poet uses repetition. Repetition is when a word is repeated.' — this is a definition, not analysis. What does THIS repetition convey?" },
  ],
  practice:[
    { q:"Student writes: 'Yeats uses repetition.' What must they add?", opts:["More punctuation","The effect — e.g. the repetition of \"must\" implies the mother has no choice, showing motherhood as a duty she cannot escape","Definition of repetition","Nothing"], ans:1, exp:"Naming alone earns very little. Must say <strong>what effect this specific repetition creates</strong>." },
    { q:"Complete: 'The verb \"rise\" suggests…'", opts:["it is a verb.","action, duty, forced effort — the mother has no choice but to begin her day regardless of how she feels.","the poem uses language.","it is effective."], ans:1, exp:"Name technique (verb) + <strong>what it conveys in context</strong>." },
    { q:"'The adjective \"feeble\"' — what word class?", opts:["Verb","Noun","Adjective","Adverb"], ans:2, exp:"<strong>Adjective</strong> — describing word. Identifies the mother's fading strength at the poem's end." },
    { q:"Subject terminology means:", opts:["Long complicated words","Technical language: simile, repetition, verb, metaphor, alliteration…","The question's command words","Poem title and poet's name"], ans:1, exp:"Subject terminology = <strong>technical language of English literature</strong>." },
  ],
  prevLesson:{ key:"petal-e", label:"E — Evidence" },
  nextLesson:{ key:"petal-a", label:"A — Analysis" }
},

"petal-a": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"A — Analysis (Impact of Evidence and Techniques Together)",
  subtitle:"Analyse the impact of the evidence and techniques — and how they work together to support your Point.",
  keyIdea:{ rule:"Zoom into individual words. Ask WHY the poet chose THIS word. Offer at least TWO interpretations. Show how techniques work together.", detail:"The teacher's definition: 'Analyse the impact of the evidence AND techniques and how they work together to support the point.' This means connecting everything, not treating each technique in isolation." },
  formulae:[
    { main:"'The word \"___\" implies/connotes…'", note:"Word-level zoom" },
    { main:"'This image creates the impression that…'", note:"Imagery analysis" },
    { main:"'The poet's choice of verb/adjective suggests…'", note:"Word class analysis" },
    { main:"'This could suggest…, but it might also imply…'", note:"Alternative interpretation" },
  ],
  worked:[{ q:"Analysis of 'Song of the Old Mother' — the fire imagery", lines:[
    { step:"First reading", expr:"The fire 'flickering and glowing' at the start suggests warmth and life — the mother has energy and purpose.", why:"First interpretation" },
    { step:"Alternative", expr:"But by the end, 'the seed of the fire gets feeble and cold' — the same image now suggests her energy is fading.", why:"Alternative reading — shows change" },
    { step:"Word-level", expr:"The adjective 'feeble' implies weakness and decline — not just the fire but the mother herself is failing.", why:"Zoom into specific word" },
    { step:"Together", expr:"The fire imagery and the contrast between beginning and end work together to show how motherhood has drained her completely.", why:"How techniques work together — what the teacher's A step requires", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>The key question: WHY did the poet choose THIS word above all others?</strong> What does it do that any other word couldn't?" },
    { icon:"⭐", text:"<strong>Show how techniques work together</strong> — this is what the teacher's Analysis step specifically asks for. Don't treat each technique in isolation." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only giving one interpretation. Two readings shows sophisticated thinking." },
    { text:"<strong>Common mistake:</strong> Listing effects without connecting them. Show how the evidence and techniques work TOGETHER." },
  ],
  practice:[
    { q:"The teacher's Analysis step asks you to analyse:", opts:["Just the simile","Just a single word","The impact of the evidence AND techniques and how they work together to support the point","The poet's biography"], ans:2, exp:"<strong>The impact of evidence AND techniques and how they work together</strong> — not just one device in isolation." },
    { q:"'\"Feeble\" could also suggest the mother's own declining strength — not just the fire.' This is:", opts:["A topic sentence","An alternative interpretation — showing sophisticated thinking","A conclusion","A definition"], ans:1, exp:"An <strong>alternative interpretation</strong> — showing language carries multiple meanings." },
    { q:"Connotations of a word are:", opts:["Its dictionary definition","The spelling","Associations and emotional meanings beyond its literal definition","Its syllable count"], ans:2, exp:"Connotations = <strong>associations and emotional meanings beyond the literal</strong>." },
    { q:"After analysing language, end your Analysis with:", opts:["A new quote","How the techniques work together to support your Point, linking to command words","A technique definition","The next paragraph"], ans:1, exp:"End with <strong>how techniques work together to support the Point</strong>, linking back to command words." },
  ],
  prevLesson:{ key:"petal-t", label:"T — Technique" },
  nextLesson:{ key:"petal-l", label:"L — Link" }
},

"petal-l": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"L — Link (Back to Your Thesis Statement)",
  subtitle:"Link your point back to your thesis statement — close the paragraph by showing how it proves your overall argument.",
  keyIdea:{ rule:"Restate your Point using command words + connect back to your thesis + comment on writer's purpose", detail:"The teacher's definition: 'Link your point to your thesis statement.' This means directly echoing the language of your introduction's thesis." },
  formulae:[
    { main:"'This demonstrates / reinforces / supports the idea that [restate thesis using command words]'", note:"" },
    { main:"'Yeats may be trying to show that… / The poet's purpose here could be to highlight…'", note:"Writer's purpose" },
  ],
  steps:[
    { title:"Restate your Point using command words", detail:"Echo the argument from the start of the paragraph.", formula:"'This demonstrates Yeats's presentation of motherhood as an exhausting, unavoidable duty.'" },
    { title:"Connect back to your thesis", detail:"Show this paragraph proves your overall argument.", formula:"'This reinforces the idea that, for the old mother, there is no rest and no choice.'" },
    { title:"Comment on writer's purpose", detail:"Why did the poet write this?", formula:"'Yeats may be trying to show the invisible, unacknowledged labour of older women in society.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Useful linking phrases:</strong> 'This demonstrates…' / 'This reinforces…' / 'Through this, Yeats conveys…' / 'This supports the idea that…'" },
    { icon:"⭐", text:"<strong>Writer's purpose stems from the teacher's materials:</strong> 'Yeats may be trying to show that…' / 'The poet's purpose here could be to highlight…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'This is how the poet presents his feelings.' Just restating — needs a comment on purpose and thesis link too." },
  ],
  practice:[
    { q:"Best Link sentence:", opts:["That's all I have to say.","This demonstrates Yeats's presentation of motherhood as an exhausting duty, reinforcing the idea that the old mother's life is one of endless, unacknowledged work.","The poem uses alliteration.","Yeats writes about an old woman."], ans:1, exp:"Strong Link: <strong>restates argument with command words AND connects to thesis AND implies writer's purpose</strong>." },
    { q:"'Yeats may be trying to show the invisible labour of older women in society' is:", opts:["Too long for a Link","A comment on writer's purpose — excellent in a Link","A new argument","An introduction sentence"], ans:1, exp:"This is a <strong>comment on writer's purpose</strong> — exactly what a strong Link includes." },
    { q:"The Link should echo language from:", opts:["The middle of the paragraph","Your thesis statement in the introduction","The poem title","The glossary"], ans:1, exp:"Link echoes language from your <strong>thesis statement</strong> — this is what 'link to your thesis' means." },
    { q:"Where does the Link sit in PETAL?", opts:["Beginning","Middle","After the quote","At the very end of the paragraph"], ans:3, exp:"Link is the <strong>final sentence</strong> of the paragraph." },
  ],
  prevLesson:{ key:"petal-a", label:"A — Analysis" },
  nextLesson:{ key:"techniques-figurative", label:"Figurative Language" }
},

/* ════════ ENGLISH — POETIC TECHNIQUES ════════ */
"techniques-figurative": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Figurative Language",
  subtitle:"Simile, metaphor, personification, pathetic fallacy, oxymoron and symbolism — always ask WHY this comparison?",
  keyIdea:{ rule:"Figurative language creates comparisons or gives human qualities to things — always ask WHY this comparison and what qualities are transferred", detail:"" },
  formulae:[
    { main:"Simile: comparison using 'like' or 'as' — 'Her face bloomed like a sweet flower'", note:"Thomas Hardy: 'like stars on the ground'" },
    { main:"Metaphor: says one thing IS another — 'All the world's a stage'", note:"Shakespeare, As You Like It" },
    { main:"Personification: non-human thing described as if it were a person", note:"Emily Dickinson: Death 'kindly stopped for me'" },
    { main:"Pathetic fallacy: giving human feelings to nature/weather to create mood", note:"Wordsworth: 'I wandered lonely as a cloud'" },
    { main:"Oxymoron: contradictory words used for effect — 'O brawling love! O loving hate!'", note:"Shakespeare, Romeo and Juliet" },
    { main:"Symbolism: a word/object represents something beyond its literal meaning", note:"Blake: 'And tombstones where flowers should be'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Most important question:</strong> Why THIS comparison? What qualities of the second thing are being transferred to the first?" },
    { icon:"⭐", text:"<strong>Oxymoron creates tension.</strong> Two contradictory ideas forced together — shows internal conflict or a complex emotion." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'This is a simile because it uses like.' This identifies — you need to analyse the EFFECT of THIS comparison." },
  ],
  practice:[
    { q:"'Her face bloomed like a sweet flower' — what device?", opts:["Metaphor","Personification","Simile using 'like'","Oxymoron"], ans:2, exp:"<strong>Simile</strong> — uses 'like'. Her face compared to a flower: beauty, natural, delicate, admirable." },
    { q:"'All the world's a stage' — what device?", opts:["Simile","Extended metaphor — life IS a stage, people are players","Personification","Oxymoron"], ans:1, exp:"<strong>Extended metaphor</strong> — life is directly called a stage." },
    { q:"Pathetic fallacy means:", opts:["A weak comparison","Using weather/nature to mirror the speaker's inner emotional state","A type of rhyme","A structural device"], ans:1, exp:"Pathetic fallacy = <strong>weather/nature mirroring the speaker's emotional state</strong>." },
    { q:"'O brawling love! O loving hate!' — what device?", opts:["Simile","Alliteration","Personification","Oxymoron — contradictory words for effect"], ans:3, exp:"<strong>Oxymoron</strong> — 'brawling love' and 'loving hate' are contradictions that show Romeo's confused, intense emotions." },
  ],
  prevLesson:{ key:"petal-l", label:"L — Link" },
  nextLesson:{ key:"techniques-sound", label:"Sound Devices" }
},

"techniques-sound": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Sound Devices",
  subtitle:"Alliteration, assonance, consonance, sibilance, onomatopoeia and plosive — always explain what the specific sound creates.",
  keyIdea:{ rule:"Sound devices create auditory effects that reinforce meaning — name the TYPE of sound and its effect in THIS context", detail:"Plosive consonants (b,p,d,t,g,k): abrupt, forceful. Sibilance (s,sh): hushing, calm or sinister. Assonance: internal melody and mood." },
  formulae:[
    { main:"Alliteration: same consonant sound at start of nearby words", note:"Poe: 'While I nodded, nearly napping'" },
    { main:"Plosive: abrupt sound using /b/ /p/ /t/ /d/ /g/ /k/ — 'bitter as the cud'", note:"Wilfred Owen, Dulce et Decorum Est" },
    { main:"Assonance: repetition of vowel sounds — 'In what distant deeps or skies'", note:"Blake, The Tyger" },
    { main:"Sibilance: repetition of 's'/'sh' hushing sounds — 'Sweet dreams of pleasant streams'", note:"Blake, A Cradle Song" },
    { main:"Consonance: similar sounds between multiple words — 'Though at next door we might meet'", note:"John Donne, Song" },
    { main:"Onomatopoeia: word sounds like what it describes — 'rustling… bustling'", note:"Robert Browning, The Pied Piper" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Name the TYPE of sound:</strong> plosive (b/p/d/t), sibilant (s/sh), fricative (f/v). Each creates a different effect." },
    { icon:"⭐", text:"<strong>Always connect sound to meaning.</strong> Don't just say 'alliteration is used' — explain what THIS alliteration creates in context." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poet uses alliteration here.' What type of sound? What effect? Why here?" },
  ],
  practice:[
    { q:"'Bitter as the cud' — the b,t,d sounds are:", opts:["Sibilance","Assonance","Plosive — abrupt, harsh sounds","Onomatopoeia"], ans:2, exp:"<strong>Plosive</strong> — /b/, /t/, /d/ are abrupt consonants creating harsh, bitter effect." },
    { q:"'Sweet dreams of pleasant streams' — the repeated 's' sounds are:", opts:["Plosive","Alliteration","Sibilance — hushing, gentle sounds","Assonance"], ans:2, exp:"<strong>Sibilance</strong> — repeated 's' sounds create a hushing, peaceful, dream-like quality." },
    { q:"Assonance means:", opts:["Same consonant at start of words","Repetition of vowel sounds within nearby words","A word that sounds like its meaning","Rhyme at end of lines"], ans:1, exp:"<strong>Assonance = repetition of vowel sounds</strong> within nearby words — creates internal melody." },
    { q:"'There was a rustling that seemed like a bustling' — what device?", opts:["Simile only","Onomatopoeia — 'rustling' and 'bustling' sound like what they describe","Alliteration","Sibilance"], ans:1, exp:"<strong>Onomatopoeia</strong> — the words sound like the actions they describe." },
  ],
  prevLesson:{ key:"techniques-figurative", label:"Figurative Language" },
  nextLesson:{ key:"techniques-structure", label:"Structural Devices" }
},

"techniques-structure": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Structural Devices",
  subtitle:"Enjambment, caesura, end-stop, volta and rhyme scheme — structure is always a deliberate choice.",
  keyIdea:{ rule:"Structure is a deliberate choice — always explain what effect the structural device creates, not just what it is", detail:"Enjambment = flow/continuation. Caesura = pause/tension. End-stop = completion. Volta = shift. Regular rhyme = harmony/control. Broken rhyme = unease." },
  formulae:[
    { main:"Enjambment: continuation of an idea over a line of poetry — 'Its loveliness increases; it will never / Pass into nothingness'", note:"Keats, Endymion — creates urgency, flow" },
    { main:"Caesura: break or pause mid-line — 'My name is Ozymandias, || king of kings'", note:"Shelley, Ozymandias — creates tension, hesitation" },
    { main:"End-stop: a pause at the end of a line — line ends where the sentence ends", note:"Creates completion, resolution" },
    { main:"Volta: the turn of thought or argument in a poem", note:"Shakespeare Sonnet 130: '…And yet by heaven I think my love as rare'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Read aloud for enjambment:</strong> if you naturally want to pause but the sentence runs on — that's enjambment. Notice how it feels rushed or breathless." },
    { icon:"⭐", text:"<strong>The volta is high-scoring.</strong> 'Before X, but after this shift, Y' — shows understanding of the whole poem's development." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poem uses enjambment here.' Just identifies — what effect does this specific enjambment create?" },
    { text:"<strong>Common mistake:</strong> Ignoring structure entirely. Every poem has structural choices — always comment on at least one." },
  ],
  practice:[
    { q:"What is enjambment?", opts:["Sentence ends at line end","Continuation of an idea across a line of poetry — sentence runs on","Pause mid-line","Turn in a sonnet"], ans:1, exp:"Enjambment = <strong>continuation of an idea across a line</strong>. Creates flow, urgency or breathlessness." },
    { q:"'My name is Ozymandias, || king of kings' — the || shows a:", opts:["Volta","Enjambment","Caesura — pause mid-line","End-stop"], ans:2, exp:"<strong>Caesura</strong> — a break or pause mid-line, creating tension or hesitation." },
    { q:"A poem shifts from anger to acceptance at stanza 4. This is called:", opts:["Enjambment","Caesura","A volta — turn of thought or argument","A rhyming couplet"], ans:2, exp:"A <strong>volta</strong> — a turn or shift in the poem's tone, argument or perspective." },
    { q:"In 'Song of the Old Mother', the poem is a single unbroken stanza. This structural choice suggests:", opts:["Laziness","The relentless, unbroken nature of the mother's routine — no pause, no relief","It's unfinished","A mistake"], ans:1, exp:"Single stanza = <strong>unbroken, relentless — mirrors the mother's endless routine with no rest</strong>." },
  ],
  prevLesson:{ key:"techniques-sound", label:"Sound Devices" },
  nextLesson:{ key:"techniques-words", label:"Word Choices" }
},

"techniques-words": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Word Choices and Other Devices",
  subtitle:"How to analyse specific word classes, plus repetition, hyperbole, irony, ellipsis, pun, dialect and more.",
  keyIdea:{ rule:"Every word is a choice — ask: why THIS word? What does its word class and connotation add?", detail:"" },
  formulae:[
    { main:"The [noun/verb/adjective/adverb] '[word]' implies / connotes…", note:"Name the word class, quote it, discuss what it suggests" },
    { main:"Repetition: using a word/phrase previously used — creates emphasis, urgency, obsession", note:"Whitman — 'From… From… from…' (anaphora)" },
    { main:"Hyperbole: exaggeration to emphasise — 'I've told you a million times'", note:"Creates dramatic effect, heightens emotion" },
    { main:"Irony: a distance between what is said and what is meant", note:"Coleridge: 'Water, water everywhere / And not a drop to drink'" },
    { main:"Ellipsis: three dots … indicating a pause or missing words", note:"Creates suspense, trailing off, uncertainty" },
  ],
  steps:[
    { title:"Identify the word class", detail:"noun / verb / adjective / adverb", formula:"'must'=verb · 'feeble'=adjective · 'dawn'=noun" },
    { title:"Quote the specific word in single inverted commas", detail:"", formula:"the verb 'must'" },
    { title:"Discuss what it implies or connotes", detail:"What associations does the word carry?", formula:"'must' implies obligation, no choice, duty — burden" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Verbs reveal emotion and action.</strong> In 'Song of the Old Mother' — 'rise', 'kneel', 'blow', 'scrub', 'bake', 'sweep' — the accumulation of verbs conveys relentless labour." },
    { icon:"⭐", text:"<strong>Semantic field</strong> = words that relate to each other. In 'The Schoolboy', a semantic field of nature (birds, trees, sky) contrasts with the school environment." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The word \"feeble\" is an adjective.' Only identifies — you must say what it implies or connotes." },
  ],
  practice:[
    { q:"In 'Song of the Old Mother', the verbs 'rise, kneel, blow, scrub, bake, sweep' create:", opts:["A calm mood","A semantic field of relentless labour — accumulation of action verbs conveys exhausting routine","A contrast with the young","Imagery of fire"], ans:1, exp:"<strong>Accumulation of action verbs</strong> creates a semantic field of relentless labour." },
    { q:"Hyperbole means:", opts:["Repetition of sounds","Exaggeration used to emphasise a point","A pause mid-line","A comparison using 'like'"], ans:1, exp:"<strong>Hyperbole = exaggeration</strong> to emphasise a point or heighten emotion." },
    { q:"Irony means:", opts:["Repetition for effect","A distance between what is said and what is meant","Giving human qualities to objects","A type of rhyme"], ans:1, exp:"<strong>Irony = distance between what is said and what is meant</strong>." },
    { q:"Ellipsis (three dots…) creates:", opts:["A complete sentence","A sense of suspense, trailing off, or omitted words — uncertainty or hesitation","A rhyming effect","A turn in the poem"], ans:1, exp:"<strong>Ellipsis creates suspense, trailing off, or suggests something unsaid</strong> — hesitation or uncertainty." },
  ],
  prevLesson:{ key:"techniques-structure", label:"Structural Devices" },
  nextLesson:{ key:"stems-technique", label:"Analysis Sentence Stems" }
},

/* ════════ ENGLISH — SENTENCE STEMS ════════ */
"stems-technique": {
  topic:"Sentence Stems", topicKey:"Sentence Stems", theme:"coral", icon:"💬",
  title:"Stems: Introducing a Technique",
  subtitle:"The precise phrases to introduce technique analysis — based on your teacher's sentence stem sheets.",
  keyIdea:{ rule:"Name the SPECIFIC technique + quote, then use a precise analytical verb", detail:"Avoid vague language. 'The poet uses language' earns nothing. 'The repetition of \"must\" implies she has no choice…' earns marks." },
  formulae:[
    { main:"The [technique] '[quote]' suggests / implies / conveys / creates / emphasises…", note:"" },
    { main:"[Poet] uses [technique] to present / convey / explore…", note:"" },
    { main:"Through the use of [technique], [poet] suggests…", note:"" },
  ],
  steps:[
    { title:"Name the specific technique", detail:"Simile, metaphor, repetition, verb, noun, alliteration…", formula:"'The repetition of \"must\"…'" },
    { title:"Embed the quote", detail:"", formula:"'The repetition of \"must\"…'" },
    { title:"Use a precise analytical verb and explain", detail:"suggests · implies · conveys · creates · emphasises · reinforces · reveals", formula:"'…implies the mother has no choice and motherhood is a burden.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Build a vocabulary of analytical verbs:</strong> suggests · implies · conveys · reveals · evokes · reinforces · creates · emphasises · highlights" },
    { icon:"⭐", text:"<strong>Avoid:</strong> 'shows' is basic. 'implies', 'conveys', 'evokes' are more sophisticated." },
  ],
  mistakes:[
    { text:"<strong>Avoid:</strong> 'The poet uses interesting language here.' Vague — name the specific technique." },
    { text:"<strong>Avoid:</strong> 'I think this is a simile.' Don't use 'I think' — state it confidently." },
  ],
  practice:[
    { q:"Best way to introduce technique analysis:", opts:["I think there is a simile.","The technique is interesting.","The repetition of 'must' implies the mother has no choice — motherhood is an inescapable duty.","The poem uses language."], ans:2, exp:"Name technique + embed quote + <strong>precise analytical verb + interpretation</strong>." },
    { q:"Most sophisticated analytical verb:", opts:["shows","is","evokes / implies / conveys","says"], ans:2, exp:"<strong>'Evokes', 'implies', 'conveys'</strong> are more sophisticated than 'shows'." },
    { q:"Student writes: 'The poet uses repetition here.' What's missing?", opts:["Poem title","The effect — what does this specific repetition imply or convey?","Definition of repetition","More punctuation"], ans:1, exp:"Must say <strong>what effect this specific repetition creates</strong>." },
    { q:"Complete: 'Through the repetition of \"must\", Yeats _____'", opts:["writes about the mother.","implies she has no choice — motherhood is a relentless duty she cannot escape.","uses a technique.","repeats a word."], ans:1, exp:"The stem leads to a <strong>specific analytical point about what the technique conveys</strong>." },
  ],
  prevLesson:{ key:"techniques-words", label:"Word Choices & Other Devices" },
  nextLesson:{ key:"stems-word-level", label:"Word-Level Stems" }
},

"stems-word-level": {
  topic:"Sentence Stems", topicKey:"Sentence Stems", theme:"coral", icon:"💬",
  title:"Stems: Word-Level Analysis",
  subtitle:"How to zoom into individual words — from your teacher's 'Consider language choices' and 'Consider deeper meaning' sheets.",
  keyIdea:{ rule:"Name the word class, embed the word in quotes, then discuss what it implies or connotes — always offer an alternative interpretation", detail:"" },
  formulae:[
    { main:"'The word \"___\" makes me feel ___ because ___'", note:"Teacher's stem — language choices" },
    { main:"'I think the author has used \"___\" because he is alluding to ___'", note:"Teacher's stem — deeper meaning" },
    { main:"'The word \"___\" is an interesting choice because it reminds me of ___'", note:"Teacher's stem — connotations" },
    { main:"'The [word class] \"[word]\" implies / The connotations of \"[word]\" suggest…'", note:"Academic version" },
  ],
  steps:[
    { title:"Identify word class", detail:"noun · verb · adjective · adverb", formula:"'must' = verb · 'feeble' = adjective · 'dawn' = noun" },
    { title:"Quote it in single inverted commas", detail:"", formula:"the verb 'must'" },
    { title:"Discuss connotations", detail:"What associations does the word carry? What does it make the reader think or feel?", formula:"'must' connotes obligation, no choice, burden, duty" },
    { title:"Offer an alternative interpretation", detail:"'It could also suggest…'", formula:"'Must' could also suggest exhaustion — saying something so often implies it's a struggle to face." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Connotations go beyond the dictionary.</strong> 'Dawn' = the time of day, but also connotes new beginning — or here, the start of another endless cycle." },
    { icon:"⭐", text:"<strong>The teacher's deeper meaning stem:</strong> 'Initially it seems the text is about ___ but deep down I think the author is saying ___' — use this for extended analysis." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The word \"must\" is a verb.' Only identifies — must say what it implies." },
  ],
  practice:[
    { q:"Teacher's stem for language choices:", opts:["The poem uses language.","'The word \"___\" makes me feel ___ because ___'","Techniques include…","The poet writes…"], ans:1, exp:"<strong>'The word \"___\" makes me feel ___ because ___'</strong> — direct, analytical, links to effect on reader." },
    { q:"After first word-level interpretation, always:", opts:["Move to next paragraph","Offer an alternative: 'It could also suggest…' / 'But it might also imply…'","Write the conclusion","Define the word class"], ans:1, exp:"Always offer an <strong>alternative interpretation</strong> — shows sophisticated thinking." },
    { q:"'Feeble' in 'the seed of the fire gets feeble and cold' — best analysis:", opts:["'Feeble' is an adjective.","The adjective 'feeble' implies weakness and decline — suggesting not just the dying fire but the mother's own fading strength.","The word is effective.","Feeble means weak."], ans:1, exp:"Best: <strong>word class + what it implies + connection to the poem's meaning</strong>." },
    { q:"Teacher's 'deeper meaning' stem starts with:", opts:["The poet uses…","Initially it seems the text is about ___ but deep down I think the author is saying ___","In conclusion…","The poem has…"], ans:1, exp:"<strong>'Initially it seems the text is about ___ but deep down I think the author is saying ___'</strong> — moves from surface to deeper meaning." },
  ],
  prevLesson:{ key:"stems-technique", label:"Introducing a Technique" },
  nextLesson:{ key:"stems-alternative", label:"Multiple Interpretations & Deeper Meanings" }
},

"stems-alternative": {
  topic:"Sentence Stems", topicKey:"Sentence Stems", theme:"coral", icon:"💬",
  title:"Stems: Multiple Interpretations, Reader Impact and Deeper Meanings",
  subtitle:"The higher-level analysis stems from your teacher's 'How do I analyse a text?' sheet.",
  keyIdea:{ rule:"Offering multiple interpretations, discussing reader impact and exploring deeper/symbolic meanings are the marks that separate good from excellent", detail:"" },
  formulae:[
    { main:"Multiple interpretations: 'This image could suggest…, but it might also imply…'", note:"" },
    { main:"Multiple interpretations: 'The phrase \"___\" could be read as…, yet it could equally reflect…'", note:"" },
    { main:"Reader impact: 'At this point, I think the author wants a reader to feel ___ because ___'", note:"" },
    { main:"Symbolism: 'The author might be using ___ as a symbol because ___'", note:"" },
    { main:"Deeper meaning: 'On a deeper level, the word \"___\" hints at…'", note:"" },
    { main:"Links within text: 'Things have changed here because earlier in the poem ___ but now ___'", note:"" },
    { main:"Broader ideas: 'This reflects wider ideas about ___ because…'", note:"" },
    { main:"Writer's purpose: 'Yeats may be trying to show that…' / 'The poet's purpose here could be to highlight…'", note:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Links within the text</strong> show structural awareness: 'Earlier in the poem the fire \"flickered and glowed\", but now it is \"feeble and cold\" — this shift shows…'" },
    { icon:"⭐", text:"<strong>Broader ideas</strong> push into the highest marks: 'This reflects wider ideas about ageing and responsibility because…' / 'Yeats may be commenting on society's expectations of women by…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only one interpretation. Two or more shows sophisticated, mature thinking." },
  ],
  practice:[
    { q:"Best multiple interpretation stem:", opts:["The poem means this.","This image could suggest…, but it might also imply…","There is one meaning.","The poet is saying…"], ans:1, exp:"<strong>'This image could suggest…, but it might also imply…'</strong> — shows you can read language in more than one way." },
    { q:"'Yeats may be commenting on society's expectations of women by…' is which type of stem?", opts:["Evidence","Deeper meaning / broader ideas — highest level of analysis","A definition","A conclusion"], ans:1, exp:"<strong>Broader ideas</strong> — connecting the poem to wider social or historical context." },
    { q:"'Things have changed here because earlier ___ but now ___' is used to:", opts:["Introduce a quote","Show structural awareness — how meaning develops across the poem","Define a technique","Write a conclusion"], ans:1, exp:"Links within the text show <strong>structural awareness and how meaning develops</strong>." },
    { q:"'The author might be using the fire as a symbol because…' is:", opts:["A simile","Symbolism analysis — highest analytical level","Alliteration","A topic sentence"], ans:1, exp:"<strong>Symbolism analysis</strong> — fire represents more than itself; the mother's life, energy, ageing." },
  ],
  prevLesson:{ key:"stems-word-level", label:"Word-Level Stems" },
  nextLesson:{ key:"term-language-1", label:"Language Glossary A–O" }
},

/* ════════ ENGLISH — TERMINOLOGY ════════ */
"term-language-1": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"Language Devices Glossary: A to O",
  subtitle:"Definitions and real examples from your teacher's glossary — learn definition, then practise spotting in poems.",
  keyIdea:{ rule:"For each device: definition + example + effect in context", detail:"" },
  formulae:[],
  steps:[],
  worked:[{ q:"Language devices A–O from the teacher's glossary", lines:[
    { step:"Alliteration", expr:"Repetition of initial consonant sounds", why:"'While I nodded, nearly napping' — Poe, The Raven" },
    { step:"Anaphora", expr:"Using a word previously used in the poem — creates emphasis, obsession", why:"'From the memories… From your memories… from the fitful risings' — Whitman" },
    { step:"Assonance", expr:"Repetition of vowel sounds", why:"'In what distant deeps or skies. / Burnt the fire of thine eyes?' — Blake, The Tyger" },
    { step:"Cliché", expr:"An overused phrase or idea", why:"'All that glitters isn't gold' — Shakespeare" },
    { step:"Consonance", expr:"Similar sounds between multiple words", why:"'Though at next door we might meet' — Donne, Song" },
    { step:"Irony", expr:"A distance between what is said and what is meant", why:"'Water, water everywhere / And not a drop to drink' — Coleridge" },
    { step:"Metaphor", expr:"A comparison where one thing is said to be another", why:"'All the world's a stage' — Shakespeare, As You Like It" },
    { step:"Onomatopoeia", expr:"The sound of a word echoes its meaning", why:"'There was a rustling that seemed like a bustling' — Browning" },
    { step:"Oxymoron", expr:"Contradictory words used for effect", why:"'O brawling love! O loving hate!' — Shakespeare, Romeo and Juliet", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Don't just name — analyse the effect.</strong> 'There is alliteration here' earns nothing. 'The alliteration of n sounds creates a drowsy, hypnotic rhythm' earns marks." },
    { icon:"⭐", text:"<strong>Anaphora</strong> (repeated words at start of phrases) creates a cumulative, insistent effect — great for showing obsession or emphasis." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing assonance (vowel sounds) and alliteration (consonant sounds at word starts)." },
  ],
  practice:[
    { q:"What is anaphora?", opts:["Repetition of end sounds","Using a word previously used in the poem — repeated for emphasis","A pause mid-line","A type of rhyme"], ans:1, exp:"<strong>Anaphora</strong> = using a word previously used — repetition at phrase starts creates emphasis and insistence." },
    { q:"'O brawling love! O loving hate!' — what device?", opts:["Simile","Metaphor","Oxymoron — contradictory words for effect","Alliteration"], ans:2, exp:"<strong>Oxymoron</strong> — contradictory words forced together to show Romeo's confused, intense emotions." },
    { q:"Consonance means:", opts:["Rhyme at end of lines","Similar consonant sounds between multiple words","Repetition of vowel sounds","Comparison using 'like'"], ans:1, exp:"<strong>Consonance = similar consonant sounds between multiple words</strong>." },
    { q:"What is a cliché?", opts:["A fresh original image","An overused phrase or idea","A type of metaphor","A structural device"], ans:1, exp:"<strong>Cliché = an overused phrase or idea</strong>." },
  ],
  prevLesson:{ key:"stems-alternative", label:"Multiple Interpretations & Deeper Meanings" },
  nextLesson:{ key:"term-language-2", label:"Language Glossary P–S" }
},

"term-language-2": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"Language Devices Glossary: P to S",
  subtitle:"The second half of the teacher's language device glossary — personification through symbolism.",
  keyIdea:{ rule:"For each device: definition + example + why the poet chose it", detail:"" },
  formulae:[],
  steps:[],
  worked:[{ q:"Language devices P–S from the teacher's glossary", lines:[
    { step:"Pathetic fallacy", expr:"Giving human feelings to inanimate objects/nature", why:"'I wandered lonely as a cloud' — Wordsworth" },
    { step:"Persona", expr:"The speaker of a poem who is separate from the poet", why:"'That's my last Duchess painted on the wall' — Browning" },
    { step:"Plosive", expr:"Abrupt sound with /b/, /p/, /t/ and /d/", why:"'bitter as the cud' — Owen, Dulce et Decorum Est" },
    { step:"Semantic field", expr:"Words that relate to each other", why:"'Bed… regiment… spears' — Scannell, Nettles" },
    { step:"Sibilance", expr:"Repetition of hushing or hissing sounds", why:"'Sweet dreams of pleasant streams' — Blake, A Cradle Song" },
    { step:"Simile", expr:"A comparison where one thing is said to be like another", why:"'And daisies be showing / Like stars on the ground' — Hardy" },
    { step:"Symbolism", expr:"A representation of something beyond the literal meaning", why:"'And tombstones where flowers should be' — Blake, The Garden of Love", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Pathetic fallacy vs personification:</strong> Pathetic fallacy = weather/nature mirroring emotion. Personification = any non-human thing given human qualities." },
    { icon:"⭐", text:"<strong>Semantic field</strong> = words in the same category. In 'Song of the Old Mother', the semantic field of labour verbs (rise, kneel, blow, scrub, bake, sweep) conveys relentless work." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Calling pathetic fallacy just 'personification'. Be specific." },
  ],
  practice:[
    { q:"Persona means:", opts:["The poet themselves","The speaker of a poem, separate from the poet","The poem's title","The rhyme scheme"], ans:1, exp:"<strong>Persona</strong> = the speaker of the poem — may or may not be the poet." },
    { q:"What is a plosive?", opts:["A soft 's' sound","An abrupt sound made with /b/, /p/, /t/ or /d/","A comparison using 'like'","A type of rhyme"], ans:1, exp:"<strong>Plosive</strong> = abrupt consonant sounds — creates harsh, forceful or violent effect." },
    { q:"Semantic field means:", opts:["A field where poems are written","Words that relate to each other — belonging to the same category","A type of metaphor","Line length"], ans:1, exp:"<strong>Semantic field</strong> = group of related words — creates dominant atmosphere through accumulated associations." },
    { q:"What is symbolism?", opts:["A type of rhyme","A comparison using 'as'","A word/object representing something beyond its literal meaning","Repetition of sounds"], ans:2, exp:"<strong>Symbolism</strong> = a word or object representing something beyond its literal meaning." },
  ],
  prevLesson:{ key:"term-language-1", label:"Language Glossary A–O" },
  nextLesson:{ key:"term-form-structure", label:"Form & Structure Glossary" }
},

"term-form-structure": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"Form & Structure Glossary",
  subtitle:"Every structural and form term from the teacher's glossary — blank verse through iambic pentameter.",
  keyIdea:{ rule:"Structure is always a deliberate choice — name the device AND explain the effect it creates", detail:"" },
  formulae:[],
  steps:[],
  worked:[{ q:"Form and structure terms", lines:[
    { step:"Blank verse", expr:"Non-rhyming poetry, often in iambic pentameter", why:"'To be, or not to be, that is the question' — Shakespeare, Hamlet" },
    { step:"Caesura", expr:"A break or pause in the middle of a line", why:"'My name is Ozymandias, || king of kings' — Shelley" },
    { step:"Couplet", expr:"A pair of consecutive rhyming lines", why:"'So long as men can breathe or eyes can see, / So long lives this' — Shakespeare, Sonnet 18" },
    { step:"Elegy", expr:"A poem focusing on death or loss", why:"Mourning tone — 'elegiac'" },
    { step:"End-stopped", expr:"A pause at the end of a line — sentence ends where line ends", why:"Creates completion, resolution" },
    { step:"Enjambment", expr:"A continuation of an idea over a line of poetry", why:"'Its loveliness increases; it will never / Pass into nothingness' — Keats" },
    { step:"Free verse", expr:"Non-rhyming, non-metrical poetry", why:"Natural, speech-like — no fixed rhyme or metre" },
    { step:"Iambic pentameter", expr:"Unstressed-stressed syllable pattern, five times per line — da-DUM x5", why:"'If MUsic BE the FOOD of LOVE, play ON' — Shakespeare", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Enjambment vs end-stop:</strong> Enjambment = sentence runs past line end (flow/urgency). End-stop = sentence stops at line end (pause/completeness)." },
    { icon:"⭐", text:"<strong>Elegy</strong> = a poem that mourns. 'Song of the Old Mother' has an elegiac quality in its closing lines." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poem uses enjambment here' without explaining the effect — always say what it creates." },
  ],
  practice:[
    { q:"What is blank verse?", opts:["Poetry with rhyme","Non-rhyming poetry, often in iambic pentameter","Free verse with no metre","A type of sonnet"], ans:1, exp:"<strong>Blank verse</strong> = non-rhyming but metrically regular (often iambic pentameter)." },
    { q:"What is an elegy?", opts:["A happy poem","A poem focusing on death or loss","A poem with strict rhyme","A dramatic monologue"], ans:1, exp:"<strong>Elegy</strong> = a poem focused on death or loss — mourning, lamenting tone." },
    { q:"End-stopped means:", opts:["Sentence runs past line end","A pause or stop at the end of a line — sentence ends where line ends","A pause mid-line","No rhyme"], ans:1, exp:"<strong>End-stopped</strong> = sentence completes at line end. Creates pause, completion, control." },
    { q:"Iambic pentameter is:", opts:["Ten stressed syllables per line","Unstressed-stressed x5 — da-DUM da-DUM da-DUM da-DUM da-DUM","Any poem with five lines","Free verse"], ans:1, exp:"<strong>Iambic pentameter</strong> = da-DUM x5. Natural rhythm of English speech." },
  ],
  prevLesson:{ key:"term-language-2", label:"Language Glossary P–S" },
  nextLesson:{ key:"term-form-2", label:"More Form: Quatrain to Volta" }
},

"term-form-2": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"More Form & Structure: Quatrain to Volta",
  subtitle:"Stanza types, poem forms and remaining structural terms plus tone vocabulary.",
  keyIdea:{ rule:"Know the name, definition, and example for every term on the word mat", detail:"" },
  formulae:[],
  steps:[],
  worked:[{ q:"Stanza types, poem forms and tone vocabulary", lines:[
    { step:"Quatrain", expr:"A four-line verse/stanza", why:"Most common stanza form" },
    { step:"Sestet", expr:"A six-line stanza, or the final six lines of an Italian sonnet", why:"Poe's Annabel Lee — 6-line stanzas" },
    { step:"Sonnet", expr:"A 14-line poem with a fixed rhyme scheme", why:"Shakespeare's Sonnets — ABAB CDCD EFEF GG" },
    { step:"Rhyme", expr:"Repetition of similar sounds — usually at line ends", why:"'weak and weary' — Poe, The Raven" },
    { step:"Rhythm", expr:"The beat or flow of a poem", why:"'Letters for the rich, letters for the poor' — Auden" },
    { step:"Volta", expr:"The turn of thought or argument in a poem", why:"'And yet by heaven I think my love as rare' — Shakespeare, Sonnet 130" },
    { step:"Tone vocabulary", expr:"Nostalgic · Melancholic · Elegiac · Defiant · Contemplative · Tender · Wearied · Resigned", why:"Always use precise tone vocabulary", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Tone vs mood:</strong> Tone = the poet's attitude. Mood = the atmosphere for the reader. Use both: 'a wearied, resigned tone, creating a mood of sadness'." },
    { icon:"⭐", text:"<strong>Volta</strong> is one of the highest-scoring structural features. 'Before the volta X…after it Y…this shift shows…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poem is sad.' Use precise vocabulary: melancholic, elegiac, wearied, resigned." },
  ],
  practice:[
    { q:"What is a quatrain?", opts:["2-line stanza","4-line stanza","6-line stanza","14-line poem"], ans:1, exp:"<strong>Quatrain</strong> = four-line stanza." },
    { q:"What is a sestet?", opts:["2-line stanza","4-line stanza","6-line stanza","14-line poem"], ans:2, exp:"<strong>Sestet</strong> = six-line stanza." },
    { q:"What is a sonnet?", opts:["Any long poem","A 14-line poem with a fixed rhyme scheme","A poem with no rhyme","A poem about love only"], ans:1, exp:"<strong>Sonnet</strong> = 14-line poem with fixed rhyme scheme." },
    { q:"Improve: 'The poem is sad at the end':", opts:["It's fine","'The poem adopts a melancholic and elegiac tone in the final stanza, creating a mood of grief and resignation in the reader.'","Make it shorter","Add more quotes"], ans:1, exp:"Use <strong>precise tone vocabulary</strong>: melancholic, elegiac, resigned, contemplative." },
  ],
  prevLesson:{ key:"term-form-structure", label:"Form & Structure Glossary" },
  nextLesson:{ key:"analysis-method", label:"How to Analyse a Text" }
},

/* ════════ ENGLISH — ANALYSIS METHOD ════════ */
"analysis-method": {
  topic:"Analysis Method", topicKey:"Analysis Method", theme:"pink", icon:"🔬",
  title:"How to Analyse a Text — 5 Lenses",
  subtitle:"Your teacher's five analytical lenses from the 'How do I analyse a text?' sheet.",
  keyIdea:{ rule:"Use all five lenses: Deeper meaning · Language choices · Links within text · Reader impact · Multiple interpretations", detail:"Each lens gives a different way into the text. The best analyses use more than one." },
  formulae:[
    { main:"Deeper meaning: 'Initially it seems about ___ but deep down the author is saying ___'", note:"" },
    { main:"Language choices: 'The word \"___\" makes me feel ___ because ___'", note:"" },
    { main:"Links within text: 'This part reminds me of ___ / Earlier ___ but now ___'", note:"" },
    { main:"Reader impact: 'The author wants a reader to feel ___ because ___'", note:"" },
    { main:"Multiple interpretations: '\"___\" could mean ___ but it could also mean ___'", note:"" },
  ],
  steps:[
    { title:"Lens 1: Deeper meaning", detail:"Look past the surface. What is the author really saying beneath the obvious subject?", formula:"'Song of the Old Mother' is about chores — but deeper down it's about inequality, ageing and the invisibility of women's labour." },
    { title:"Lens 2: Language choices", detail:"Zoom into specific word choices. Why THIS word? What do its connotations add?", formula:"'Must' implies compulsion with no choice, a burden." },
    { title:"Lens 3: Links within the text", detail:"Connect different parts of the poem to show how meaning develops.", formula:"Fire 'flickers and glows' at start → 'feeble and cold' at end. This shift shows the mother's declining energy." },
    { title:"Lens 4: Reader impact", detail:"What does the author want the reader to feel or understand?", formula:"'The author wants the reader to feel sympathy for the old mother and question why her labour is taken for granted.'" },
    { title:"Lens 5: Multiple interpretations", detail:"Could the word/image be read in more than one way?", formula:"'The seed of the fire' = literal fire OR the mother's own life force." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Combine lenses.</strong> The best paragraphs move from one lens to another — language choice → deeper meaning → reader impact." },
    { icon:"⭐", text:"<strong>Lens 3 (links within text)</strong> shows you understand the whole poem's structure — not just individual lines." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Using only Lens 2 (language choices) and forgetting the other four. Deeper meaning and reader impact are often the most powerful." },
  ],
  practice:[
    { q:"'Initially it seems about chores, but deep down the author is saying ___' — which lens?", opts:["Language choices","Deeper meaning","Reader impact","Links within text"], ans:1, exp:"<strong>Deeper meaning</strong> — looking past the surface to the author's underlying message." },
    { q:"'The author wants the reader to feel sympathy' is which lens?", opts:["Deeper meaning","Language choices","Reader impact","Multiple interpretations"], ans:2, exp:"<strong>Reader impact</strong> — what the author wants the reader to think or feel." },
    { q:"'Earlier the fire flickered and glowed, but now it is feeble and cold' is:", opts:["Multiple interpretations","Reader impact","Links within the text — showing structural development","Language choices"], ans:2, exp:"<strong>Links within the text</strong> — connecting parts of the poem to show how meaning develops." },
    { q:"'The fire could mean the literal fire, but it could also mean the mother's life force' is:", opts:["Language choices","Reader impact","Deeper meaning","Multiple interpretations"], ans:3, exp:"<strong>Multiple interpretations</strong> — showing language carries more than one meaning." },
  ],
  prevLesson:{ key:"term-form-2", label:"More Form: Quatrain to Volta" },
  nextLesson:{ key:"poem-old-mother", label:"Practice: Song of the Old Mother" }
},

/* ════════ ENGLISH — PRACTICE POEMS ════════ */
"poem-old-mother": {
  topic:"Practice Poems", topicKey:"Practice Poems", theme:"amber", icon:"📜",
  title:"Practice Poem: 'Song of the Old Mother'",
  subtitle:"How does Yeats present ideas and feelings about motherhood? — Full worked analysis using teacher's PEEA frame.",
  keyIdea:{ rule:"Question: How does Yeats present ideas and feelings about motherhood?", detail:"Language: words, phrases, imagery, verbs, repetition · Form: voice of speaker, rhyme, single stanza · Structure: contrasts between old and young, cyclical day, beginning vs. ending" },
  formulae:[
    { main:"Point: 'Yeats presents motherhood as…' / 'One idea about motherhood is…'", note:"" },
    { main:"Evidence: 'This is shown when the poet writes…' / 'For example, the line…'", note:"" },
    { main:"Explain: 'This suggests that the mother feels…' / 'This makes the reader understand…'", note:"" },
    { main:"Analysis: 'The word \"___\" implies…' / 'The poet's choice of verb suggests…'", note:"" },
  ],
  steps:[
    { title:"The poem — full text", detail:"I RISE in the dawn, and I kneel and blow / Till the seed of the fire flicker and glow; / And then I must scrub and bake and sweep / Till stars are beginning to blink and peep; / And the young lie long and dream in their bed / Of the matching of ribbons for bosom and head, / And their day goes over in idleness, / And they sigh if the wind but lift a tress: / While I must work because I am old, / And the seed of the fire gets feeble and cold.", formula:"(*tress = a lock or curl of hair)" },
    { title:"Key features to spot", detail:"Single stanza (no break — mirrors relentless routine) · Rhyming couplets (AABB) · Repetition of 'must' · Accumulation of action verbs · Contrast between old mother and 'the young' · Cyclical structure — fire 'flickering' at start, 'feeble and cold' at end", formula:"" },
  ],
  worked:[{ q:"Teacher's model paragraph", lines:[
    { step:"Point", expr:"Yeats presents motherhood as tiring and full of constant responsibility.", why:"Clear argument + command words" },
    { step:"Evidence", expr:"'I rise in the dawn'", why:"Short, precise quote" },
    { step:"Explain", expr:"This suggests that the mother must begin working before anyone else is awake — her life is controlled by duty.", why:"What the quote means" },
    { step:"Explain+", expr:"The word 'must' appears several times, implying she has no choice — motherhood has become a burden she cannot escape.", why:"Word choice zoom" },
    { step:"Analysis", expr:"Yeats contrasts her with 'the young' who 'lie long and dream', making her life seem even harder and more exhausting.", why:"Zoom in on contrast" },
    { step:"Analysis+", expr:"This contrast helps the reader understand her feelings of frustration and weariness.", why:"Effect on reader — links to command words", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Cyclical structure:</strong> Fire 'flickered and glowed' at start → 'feeble and cold' at end. This mirrors the mother's fading energy — always comment on this." },
    { icon:"⭐", text:"<strong>Extension — writer's purpose:</strong> 'Yeats may be commenting on society's expectations of women by showing that the old mother's labour is taken for granted while the young live in idleness.'" },
  ],
  mistakes:[
    { text:"<strong>Don't forget the single stanza structure.</strong> No break = no rest. The form mirrors the content — always mention this." },
  ],
  practice:[
    { q:"What does the repetition of 'must' suggest?", opts:["She enjoys her work","She has no choice — motherhood is an inescapable duty","She is organised","She is young"], ans:1, exp:"'Must' repeated = <strong>obligation, no choice, burden</strong> — motherhood as inescapable duty." },
    { q:"The single stanza structure creates:", opts:["An easier read","The relentless unbroken nature of the mother's routine — mirrors endless labour with no pause","It saves space","A rhyme scheme"], ans:1, exp:"<strong>Single stanza = no break, no rest</strong> — form mirrors the content of endless relentless labour." },
    { q:"'And the young lie long and dream in their bed' — what technique and effect?", opts:["Simile","Contrast/juxtaposition — idle young vs hardworking old mother, emphasising her exhaustion","Alliteration only","Personification"], ans:1, exp:"<strong>Contrast/juxtaposition</strong> — the young's idle dreaming is placed against the mother's relentless work." },
    { q:"'The seed of the fire gets feeble and cold' is an example of:", opts:["Simile","Symbolism/pathetic fallacy — the dying fire mirrors the mother's own fading energy","Onomatopoeia","Alliteration only"], ans:1, exp:"<strong>Symbolism</strong> — the dying fire mirrors the mother's declining energy. Cyclical structure (fire at start and end) emphasises this." },
  ],
  prevLesson:{ key:"analysis-method", label:"How to Analyse a Text" },
  nextLesson:{ key:"poem-first-love", label:"Practice: First Love" }
},

"poem-first-love": {
  topic:"Practice Poems", topicKey:"Practice Poems", theme:"amber", icon:"📜",
  title:"Practice Poem: 'First Love'",
  subtitle:"How does Clare present feelings about love in 'First Love'? — Full worked analysis using teacher's PEEA frame.",
  keyIdea:{ rule:"Question: How does Clare present feelings about love in 'First Love'?", detail:"Language: simile, adjectives, sensory imagery, metaphor · Form: three regular stanzas, ABAB rhyme · Structure: stanza 1 physical → stanza 2 confusion → stanza 3 despair and loss" },
  formulae:[
    { main:"Introduction: 'In First Love, Clare explores powerful and overwhelming feelings about love. He presents love as sudden, emotional and even painful. Overall, the poem suggests first love is unforgettable and life-changing.'", note:"" },
  ],
  steps:[
    { title:"The poem — key quotes", detail:"'struck… with love so sudden and so sweet' · 'Her face it bloomed like a sweet flower' · 'My face turned pale as deadly pale' · 'My legs refused to walk away' · 'Seemed midnight at noonday' · 'My heart has left its dwelling-place / And can return no more'", formula:"" },
    { title:"Key features", detail:"Three stanzas (physical → confusion → despair) · ABAB rhyme · Simile 'like a sweet flower' · Oxymoron 'midnight at noonday' · Rhetorical questions stanza 3 · Final couplet: permanent change", formula:"" },
  ],
  worked:[{ q:"Para 2 — Form (from the teacher's PEEA frame)", lines:[
    { step:"Point", expr:"Clare also presents feelings about love through the form of the poem.", why:"" },
    { step:"Evidence", expr:"Three regular stanzas, each a different stage of the speaker's emotional experience.", why:"" },
    { step:"Explain", expr:"This steady form contrasts with the chaos of his feelings, showing how love disrupts his sense of control.", why:"" },
    { step:"Analysis", expr:"The regular ABAB rhyme scheme creates a musical, romantic tone — yet the controlled form may also show how he tries to contain emotions that feel too big.", why:"How form and content work together", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Structural development:</strong> Stanza 1 = physical reactions. Stanza 2 = emotional confusion. Stanza 3 = despair and permanence. Always comment on this progression." },
    { icon:"⭐", text:"<strong>Final couplet</strong> 'My heart has left its dwelling-place / And can return no more' — permanent change. First love leaves a lasting mark. High-value for analysis." },
  ],
  mistakes:[
    { text:"<strong>Don't describe the poem.</strong> 'He feels shocked' is summary. Analyse HOW Clare creates those feelings through specific language choices." },
  ],
  practice:[
    { q:"'Her face it bloomed like a sweet flower' — technique and effect?", opts:["Metaphor — her face IS a flower","Simile using 'like' — natural beauty, delicate, something that grew unexpectedly in Clare's life","Alliteration of f only","Personification"], ans:1, exp:"<strong>Simile</strong> — 'like a flower' suggests natural, delicate beauty. 'Sweet' doubles the sense of innocent loveliness." },
    { q:"The three stanzas move physical → confusion → despair. This shows:", opts:["Random structure","Structural development showing how love becomes more painful over time","The ABAB rhyme scheme","Free verse"], ans:1, exp:"<strong>Structural development</strong> — each stanza shows a different stage, love deepening into pain." },
    { q:"'Seemed midnight at noonday' — technique?", opts:["Simile","Alliteration","Oxymoron — shows love completely disorients him, turning day into night","Personification"], ans:2, exp:"<strong>Oxymoron</strong> — contradictory idea showing love has turned his world upside down." },
    { q:"'My heart has left its dwelling-place / And can return no more' suggests:", opts:["He is moving house","First love has permanently changed him — he can never return to who he was before","He feels happy","He has forgotten her"], ans:1, exp:"<strong>Metaphor + final couplet</strong> — permanent, irrevocable change. First love leaves a lasting mark." },
  ],
  prevLesson:{ key:"poem-old-mother", label:"Practice: Song of the Old Mother" },
  nextLesson:{ key:"poem-schoolboy", label:"Practice: The Schoolboy" }
},

"poem-schoolboy": {
  topic:"Practice Poems", topicKey:"Practice Poems", theme:"amber", icon:"📜",
  title:"Practice Poem: 'The Schoolboy'",
  subtitle:"How does Blake present the schoolboy's feelings about nature, freedom and school?",
  keyIdea:{ rule:"Question: How does Blake present the schoolboy's feelings about nature and school?", detail:"Language: nature imagery, contrast, extended metaphor · Form: ABABB rhyme, regular quintet stanzas, rhetorical questions · Structure: joy → misery → appeal to parents" },
  formulae:[],
  steps:[
    { title:"The poem — summary", detail:"Stanza 1: loves summer mornings — birds sing, skylark, sweet company. Stanza 2: 'But' — school drives all joy away, 'cruel eye', 'sighing and dismay'. Stanzas 3–4: can't concentrate, drooping, 'anxious hour', child as caged bird. Stanzas 5–6: rhetorical questions to parents — if buds are nipped, how can summer arise?", formula:"" },
    { title:"Key features", detail:"'But' in stanza 2 = volta — sudden shift from joy to misery · Extended metaphor of child as caged bird · Rhetorical questions stanzas 4–6 · Semantic field of nature vs school · ABABB rhyme", formula:"" },
  ],
  worked:[{ q:"Why does Blake compare the schoolboy to a bird in a cage?", lines:[
    { step:"Technique", expr:"Extended metaphor — child as caged bird: 'How can the bird that is born for joy / Sit in a cage and sing?'", why:"" },
    { step:"Effect", expr:"A bird in a cage cannot fly freely — just like the boy feels restricted and confined in school.", why:"Shows how unnatural school feels" },
    { step:"Deeper", expr:"Birds are symbols of freedom and nature — school imprisons children's natural joy.", why:"Symbolic meaning" },
    { step:"Purpose", expr:"Blake wants the reader to feel that forcing children into strict schooling destroys their natural creativity and happiness.", why:"Writer's purpose", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>The volta at 'But':</strong> stanza 1 is joyful — then 'But to go to school in a summer morn, / O it drives all joy away!' This sudden contrast is a key analytical point." },
    { icon:"⭐", text:"<strong>Rhetorical questions in stanzas 4–6</strong> directly challenge parents — shows the poem shifts from description to argument." },
  ],
  mistakes:[
    { text:"<strong>Don't just say 'Blake uses nature imagery.'</strong> Explain what the nature imagery represents — freedom, joy, natural childhood — and how it contrasts with school." },
  ],
  practice:[
    { q:"'But' at the start of stanza 2 creates:", opts:["A rhyme","A volta — sudden shift from joy to misery","Alliteration","A couplet"], ans:1, exp:"<strong>Volta</strong> — 'But' marks the dramatic turn from joy to misery." },
    { q:"'Under a cruel eye outworn' suggests:", opts:["The teacher is kind","The school is oppressive and exhausting — watchful and controlling","It's hot outside","The lesson is interesting"], ans:1, exp:"<strong>'Cruel eye'</strong> — personification of school as a watchful, oppressive force." },
    { q:"The rhetorical questions in stanzas 4–6 are directed at:", opts:["The teacher","Blake himself","Parents — challenging them to see that forced schooling harms children","The schoolboy"], ans:2, exp:"<strong>Directed at parents</strong> — challenging them to recognise the damage of forced schooling." },
    { q:"Blake's message about childhood and education:", opts:["School is always good","Children need strict lessons","Children should be free to enjoy nature — forced schooling kills creativity and happiness","Teachers are cruel"], ans:2, exp:"Blake believes <strong>children should be free</strong> — forced education destroys natural joy and creativity." },
  ],
  prevLesson:{ key:"poem-first-love", label:"Practice: First Love" },
  nextLesson:null
},


/* ════════ GEOGRAPHY — MAP SKILLS ════════ */
"map-grid-refs": {
  topic:"Map Skills", topicKey:"Map Skills", theme:"green", icon:"🗺️",
  title:"Grid References",
  subtitle:"4-figure and 6-figure grid references — how to find and give a precise location on an OS map.",
  keyIdea:{ rule:"Along the corridor, then up the stairs — Easting first (across), Northing second (up)", detail:"The numbers that go across the map are called Eastings. The numbers that go up the map are called Northings. Always read Eastings before Northings." },
  formulae:[
    { main:"4-figure: Easting (2 digits) + Northing (2 digits) = grid square", note:"e.g. GR 3452 = Easting 34, Northing 52" },
    { main:"6-figure: Easting (3 digits) + Northing (3 digits) = precise point", note:"Divide each grid square into 10 — adds a third digit to each" },
  ],
  steps:[
    { title:"Find the Easting", detail:"Read the number along the bottom of the map. This is the vertical line to the LEFT of your location.", formula:"e.g. the line labelled 34" },
    { title:"Find the Northing", detail:"Read the number up the side. This is the horizontal line BELOW your location.", formula:"e.g. the line labelled 52" },
    { title:"4-figure: combine them", detail:"Easting first, Northing second — you have the whole grid square.", formula:"GR 3452" },
    { title:"6-figure: estimate tenths", detail:"For each axis, estimate how many tenths into the square your point sits. Add as a third digit to each.", formula:"3.4 Easting → 344 · 5.7 Northing → 527 → GR 344527" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory trick:</strong> 'Along the corridor (Easting), then up the stairs (Northing).' You walk along a corridor before going upstairs." },
    { icon:"⭐", text:"<strong>6-figure:</strong> Mentally divide the grid square into a 10×10 grid. Estimate position to nearest tenth. This gives a point rather than a whole square." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Giving Northing before Easting. Always Easting (across) first." },
    { text:"<strong>Common mistake:</strong> Writing 4-figure as 3452 when the reference is 34 Easting and 52 Northing — combine without a space or comma: 3452." },
  ],
  practice:[
    { q:"What does 'Easting' mean?", opts:["Numbers going up the side","Numbers going across the bottom","Numbers going diagonally","The map scale"], ans:1, exp:"<strong>Eastings</strong> = the vertical grid lines, numbered across the bottom. Read these first." },
    { q:"Which comes first in a grid reference?", opts:["Northing","Easting","Either order is fine","The largest number"], ans:1, exp:"<strong>Easting first, Northing second</strong> — along the corridor, then up the stairs." },
    { q:"A 6-figure grid reference is more precise than a 4-figure because:", opts:["It uses bigger numbers","It divides each grid square into tenths, giving a point rather than a whole square","It uses the alphabet","It measures in metres"], ans:1, exp:"6-figure <strong>divides each grid square into tenths</strong>, narrowing location to a ~100m point rather than a whole square." },
    { q:"Grid reference 347521 — what is the Easting?", opts:["521","347","34","52"], ans:1, exp:"First 3 digits = <strong>Easting: 347</strong>. Last 3 digits = Northing: 521." },
  ],
  prevLesson:null,
  nextLesson:{ key:"map-distance", label:"Measuring Distance" }
},

"map-distance": {
  topic:"Map Skills", topicKey:"Map Skills", theme:"green", icon:"🗺️",
  title:"Measuring Distance and Using Scale",
  subtitle:"How to work out real-world distances from a map using a ruler or the scale bar.",
  keyIdea:{ rule:"Real distance = map measurement × scale value", detail:"A map scale tells you how many real-world units each map unit represents. If the scale is 1:50,000, every 1 cm on the map = 50,000 cm (0.5 km) in reality." },
  formulae:[
    { main:"Real distance = map distance (cm) × scale denominator", note:"÷ 100,000 to convert cm → km (for 1:50,000 maps)" },
    { main:"1:50,000 → 2 cm on map = 1 km in reality", note:"1:25,000 → 4 cm on map = 1 km in reality" },
  ],
  steps:[
    { title:"Identify the map scale", detail:"Look for the representative fraction (e.g. 1:50,000) or scale bar.", formula:"Scale 1:50,000" },
    { title:"Measure the map distance in cm", detail:"Use a ruler for straight lines. For curved routes, use string or mark a strip of paper.", formula:"e.g. 3.5 cm" },
    { title:"Multiply by scale denominator", detail:"", formula:"3.5 × 50,000 = 175,000 cm" },
    { title:"Convert to km", detail:"Divide by 100,000 to get km.", formula:"175,000 ÷ 100,000 = 1.75 km" },
    { title:"Using a scale bar", detail:"Mark the distance on the edge of a piece of paper, then lay it against the scale bar to read off the real distance directly.", formula:"No maths needed!" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Scale bar shortcut:</strong> Mark your distance on paper, hold against the scale bar — read off the real distance directly without any maths." },
    { icon:"⭐", text:"<strong>For curved roads or coastlines:</strong> Use a piece of string, lay it along the route, then straighten it and measure against the scale bar." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Forgetting to convert cm to km. Always divide by 100,000 at the end (or use the scale bar to avoid this)." },
    { text:"<strong>Common mistake:</strong> Confusing the scale fraction. 1:50,000 means 1 cm = 50,000 cm, NOT 50,000 km." },
  ],
  practice:[
    { q:"Map scale is 1:50,000. You measure 4 cm. Real distance?", opts:["4 km","2 km","200 m","40 km"], ans:1, exp:"4 × 50,000 = 200,000 cm ÷ 100,000 = <strong>2 km</strong>." },
    { q:"The easiest way to measure a curved route on a map:", opts:["Ruler in a straight line","String laid along the route, then measured against scale bar","Calculator","Count grid squares"], ans:1, exp:"<strong>String</strong> — lay along the curved route, straighten it, then compare to the scale bar." },
    { q:"Scale 1:25,000. How many cm on the map = 1 km in reality?", opts:["1 cm","2 cm","4 cm","25 cm"], ans:2, exp:"1 km = 100,000 cm. 100,000 ÷ 25,000 = <strong>4 cm</strong>." },
    { q:"What does a scale bar allow you to do?", opts:["Navigate without a compass","Read real-world distances directly from map measurements without calculation","Draw a map","Find grid references"], ans:1, exp:"Scale bar lets you <strong>read real distances directly</strong> — mark your measurement on paper and compare to the bar." },
  ],
  prevLesson:{ key:"map-grid-refs", label:"Grid References" },
  nextLesson:{ key:"ant-geography", label:"Geography of Antarctica" }
},

/* ════════ GEOGRAPHY — ANTARCTICA ════════ */
"ant-geography": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"The Geography of Antarctica",
  subtitle:"Location, size, physical features — what makes Antarctica unique.",
  keyIdea:{ rule:"Antarctica is the world's 5th largest continent, located at the South Pole, covered by 98% ice sheet", detail:"It is the coldest, driest and windiest continent on Earth — and the highest by average elevation." },
  formulae:[
    { main:"Size: ~14 million km² (bigger than Europe) · 98% ice sheet · 2% exposed rock", note:"" },
    { main:"Surrounded by the Southern Ocean · separated from nearest continent (S. America) by Drake Passage", note:"" },
  ],
  steps:[
    { title:"Location", detail:"Antarctica sits at the South Pole, entirely within the Antarctic Circle (66.5°S).", formula:"South Pole = 90°S" },
    { title:"Physical features", detail:"Ice sheet up to 4.8 km thick. Transantarctic Mountains divide East and West Antarctica. Mt Vinson = highest peak (4,892 m).", formula:"" },
    { title:"Surrounding ocean", detail:"The Southern Ocean circles Antarctica — the world's most powerful ocean current (Antarctic Circumpolar Current) isolates it from warmer waters.", formula:"" },
    { title:"No permanent human population", detail:"Only scientific research stations. About 1,000 people in winter, 5,000 in summer.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Antarctica vs Arctic:</strong> Antarctica is a continent with land under the ice. The Arctic is a frozen ocean. This is why Antarctica is colder." },
    { icon:"⭐", text:"<strong>Antarctic Circle:</strong> The line of latitude at 66.5°S. Everything south of this experiences midnight sun in summer and polar night in winter." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing Antarctica (continent at South Pole) with the Arctic (ocean at North Pole)." },
  ],
  practice:[
    { q:"What percentage of Antarctica is covered by ice sheet?", opts:["50%","75%","98%","100%"], ans:2, exp:"<strong>98%</strong> of Antarctica is covered by ice. Only about 2% is exposed rock." },
    { q:"Antarctica is located:", opts:["At the North Pole","At the South Pole, entirely within the Antarctic Circle","In the middle of the Pacific","Near Australia"], ans:1, exp:"Antarctica is located at the <strong>South Pole</strong>, entirely within the Antarctic Circle (66.5°S)." },
    { q:"The ocean surrounding Antarctica is called:", opts:["Arctic Ocean","Indian Ocean","Pacific Ocean","Southern Ocean"], ans:3, exp:"The <strong>Southern Ocean</strong> circles Antarctica — its strong circumpolar current isolates it from warmer waters." },
    { q:"How is Antarctica different from the Arctic?", opts:["They are the same","Antarctica is a continent with land under the ice; the Arctic is a frozen ocean","Antarctica is in the north","The Arctic is colder"], ans:1, exp:"<strong>Antarctica is a continent</strong> (land under ice). The Arctic is a frozen ocean — this is why Antarctica is colder." },
  ],
  prevLesson:{ key:"map-distance", label:"Measuring Distance" },
  nextLesson:{ key:"ant-conditions", label:"Conditions and Wildlife" }
},

"ant-conditions": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"Conditions and Wildlife",
  subtitle:"What Antarctica is like to live in — and the extraordinary animals that survive there.",
  keyIdea:{ rule:"Extreme conditions: the coldest, driest, windiest place on Earth — yet rich wildlife exists in and around its waters", detail:"Most wildlife lives at the coast or in the sea, not inland. The Southern Ocean is highly productive — rich in krill, which underpins the food chain." },
  formulae:[
    { main:"Temperature: coastal −10 to −20°C · inland −40 to −60°C · record −89.2°C", note:"" },
    { main:"Precipitation: <200 mm/year (desert conditions) · Winds: up to 300 km/h katabatic", note:"" },
  ],
  steps:[
    { title:"Climate conditions", detail:"Antarctica is technically a polar desert — extremely low precipitation. Strong katabatic winds pour off the ice sheet. Darkness for months in winter.", formula:"" },
    { title:"Wildlife: penguins", detail:"Emperor and Adélie penguins are the most iconic. Emperor penguins breed in winter — the male incubates the egg in the coldest months.", formula:"" },
    { title:"Wildlife: marine mammals", detail:"Leopard seals, Weddell seals, killer whales (orcas), blue whales, humpback whales — all dependent on krill.", formula:"" },
    { title:"Wildlife: the food chain", detail:"Sun → phytoplankton → krill → fish / penguins / seals / whales. Krill is the keystone species.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Krill are crucial.</strong> These tiny shrimp-like creatures are the foundation of virtually all Antarctic food chains. If krill numbers fall, everything is affected." },
    { icon:"⭐", text:"<strong>Antarctica is a desert.</strong> Despite all the ice, it receives less precipitation per year than the Sahara. The ice has accumulated over millions of years." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Thinking Antarctica is full of polar bears. Polar bears live only in the Arctic. Antarctica has penguins." },
  ],
  practice:[
    { q:"Antarctica is technically classified as what type of climate?", opts:["Tropical rainforest","Temperate maritime","Polar desert","Mediterranean"], ans:2, exp:"<strong>Polar desert</strong> — Antarctica receives less than 200 mm of precipitation per year, qualifying it as a desert." },
    { q:"Which species is the keystone of the Antarctic food chain?", opts:["Penguin","Krill","Blue whale","Leopard seal"], ans:1, exp:"<strong>Krill</strong> — tiny shrimp-like creatures that almost all Antarctic animals depend on either directly or indirectly." },
    { q:"Katabatic winds in Antarctica are:", opts:["Warm winds from the ocean","Cold, powerful winds that pour downhill off the ice sheet","Trade winds","Monsoon winds"], ans:1, exp:"<strong>Katabatic winds</strong> — cold dense air flows downhill off the ice sheet under gravity. Can reach 300 km/h." },
    { q:"Emperor penguins are remarkable because:", opts:["They fly south in winter","The male incubates the egg through the Antarctic winter in total darkness and extreme cold","They live at the South Pole","They eat whales"], ans:1, exp:"Emperor penguins breed in winter — the <strong>male stands and incubates the egg for 65 days</strong> through the coldest, darkest months without eating." },
  ],
  prevLesson:{ key:"ant-geography", label:"Geography of Antarctica" },
  nextLesson:{ key:"ant-climate", label:"How Cold and Why / Climate Graphs" }
},

"ant-climate": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"How Cold is Antarctica and Why / Climate Graphs",
  subtitle:"Why Antarctica is so extreme — and how to read its climate data.",
  keyIdea:{ rule:"Antarctica is cold because of its high latitude, ice albedo effect, high elevation and isolation from warm ocean currents", detail:"These four factors combine to make it the coldest place on Earth." },
  formulae:[
    { main:"Climate graph: temperature = line graph (°C) · Precipitation = bar chart (mm)", note:"Two y-axes — temp on left/right, rainfall on other side" },
    { main:"Antarctic pattern: coldest months = June/July (−60°C) · warmest = January (−20°C coastal)", note:"Remember: Southern Hemisphere — summer is December–February" },
  ],
  steps:[
    { title:"Reason 1: High latitude", detail:"Antarctica is at 90°S. Sunlight strikes at a low angle, spreading energy over a large area — less intense heating.", formula:"" },
    { title:"Reason 2: Ice-albedo effect", detail:"White ice and snow reflect up to 90% of sunlight back into space (high albedo) instead of absorbing it as heat.", formula:"Albedo: ice reflects 90% · ocean absorbs 94%" },
    { title:"Reason 3: High elevation", detail:"The ice sheet raises average elevation to ~2,300 m — temperature drops ~6.5°C per 1,000 m altitude.", formula:"" },
    { title:"Reason 4: Isolation from warm currents", detail:"The Antarctic Circumpolar Current prevents warm water from reaching Antarctica's coast.", formula:"" },
    { title:"Reading a climate graph", detail:"Month = x-axis. Left y-axis = temperature (line). Right y-axis or same = precipitation (bars). Note: Southern Hemisphere hottest in January.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Albedo</strong> = reflectivity. Fresh snow has albedo ~0.9 (reflects 90%). Open ocean has albedo ~0.06 (absorbs 94%). This is why melting sea ice accelerates warming." },
    { icon:"⭐", text:"<strong>Southern Hemisphere seasons:</strong> Summer = December, January, February. Winter = June, July, August. Opposite to the UK." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying Antarctica is cold 'because it is far from the Sun.' It is cold because of low sun angle, albedo, elevation and isolation — not extra distance." },
    { text:"<strong>Common mistake:</strong> On a climate graph, reading January as winter for Antarctica. In the Southern Hemisphere, January is the warmest month." },
  ],
  practice:[
    { q:"The ice-albedo effect means:", opts:["Ice absorbs heat from the sun","White ice reflects most sunlight back into space, preventing warming","Ice melts faster at altitude","The atmosphere over ice is thinner"], ans:1, exp:"<strong>Ice-albedo effect:</strong> white ice reflects up to 90% of solar energy back into space — so very little heat is absorbed." },
    { q:"Why does high elevation make Antarctica colder?", opts:["Less oxygen","Temperature drops about 6.5°C per 1,000 m of altitude — the high ice sheet raises average height to 2,300 m","Less wind","More UV radiation"], ans:1, exp:"Temperature drops ~<strong>6.5°C per 1,000 m</strong> altitude. Antarctica's ice sheet averages 2,300 m — making it significantly colder." },
    { q:"On a climate graph for Antarctica, which months show the warmest temperatures?", opts:["June and July","December and January — Southern Hemisphere summer","March and April","October"], ans:1, exp:"<strong>December and January</strong> — the Southern Hemisphere summer. Opposite of the UK." },
    { q:"What does a high albedo mean?", opts:["High heat absorption","High reflectivity — most solar energy is reflected back","Dark colour","Low elevation"], ans:1, exp:"<strong>High albedo = high reflectivity.</strong> Fresh snow albedo ≈ 0.9 — 90% of solar energy reflected." },
  ],
  prevLesson:{ key:"ant-conditions", label:"Conditions and Wildlife" },
  nextLesson:{ key:"ant-explorers", label:"Explorers of Antarctica" }
},

"ant-explorers": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"Explorers of Antarctica",
  subtitle:"The race to the South Pole — Scott vs Amundsen, 1911.",
  keyIdea:{ rule:"Roald Amundsen (Norway) reached the South Pole first on 14 December 1911. Robert Falcon Scott (Britain) arrived 34 days later — his entire team died on the return journey.", detail:"The difference came down to preparation, experience, equipment choices and leadership decisions." },
  formulae:[],
  steps:[
    { title:"Amundsen's advantages", detail:"Used sled dogs (could sacrifice dogs for food), wore loose Inuit-style fur clothing, chose a more direct route, had polar experience, turned back early in bad weather.", formula:"Reached Pole: 14 Dec 1911" },
    { title:"Scott's disadvantages", detail:"Used motor sledges (broke down) and ponies (unsuited to cold), wore heavy woollen clothing, less polar experience, party too large.", formula:"Reached Pole: 17 Jan 1912" },
    { title:"Scott's return journey", detail:"All five members of Scott's polar party died on the return — frostbite, starvation, blizzard. Bodies found in tent just 18 km from depot.", formula:"Last diary entry: 29 March 1912" },
    { title:"Legacy", detail:"Both men are celebrated. Scott became a national hero in Britain. The era of Antarctic exploration opened the continent to science.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Key contrast:</strong> Amundsen planned meticulously for the cold. Scott was brave but under-prepared. Geography exam questions often ask you to compare their approaches." },
    { icon:"⭐", text:"<strong>Other early explorers:</strong> Ernest Shackleton — his Endurance expedition (1914–17) became legendary for survival, not conquest." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying Scott reached the Pole first. Amundsen was 34 days ahead." },
  ],
  practice:[
    { q:"Who reached the South Pole first, and when?", opts:["Scott, December 1911","Amundsen, December 1911","Shackleton, January 1912","Amundsen, January 1912"], ans:1, exp:"<strong>Roald Amundsen</strong> reached the South Pole on <strong>14 December 1911</strong> — 34 days before Scott." },
    { q:"What was one key advantage Amundsen had over Scott?", opts:["Better weather","Used sled dogs which could pull heavy loads and be used as food if needed","More team members","Better maps"], ans:1, exp:"Amundsen used <strong>sled dogs</strong> — well-suited to cold, efficient, and could be sacrificed as food if needed. Scott used ponies and motor sledges — both failed." },
    { q:"What happened to Scott's polar party?", opts:["They returned safely but later","All five died on the return journey from frostbite, starvation and blizzard","They were rescued","They turned back early"], ans:1, exp:"All five members of Scott's polar party <strong>died on the return journey</strong>, just 18 km from a supply depot." },
    { q:"What lesson does the Scott vs Amundsen comparison teach in geography?", opts:["Britain is better at exploration","The importance of careful preparation, appropriate equipment and local knowledge for surviving extreme environments","Speed is everything","Large teams are always better"], ans:1, exp:"<strong>Preparation, appropriate equipment and experience of local conditions</strong> are critical for surviving extreme environments." },
  ],
  prevLesson:{ key:"ant-climate", label:"How Cold and Why" },
  nextLesson:{ key:"ant-tourism", label:"Tourism in Antarctica" }
},

"ant-tourism": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"Tourism in Antarctica",
  subtitle:"Growing visitor numbers — benefits, environmental risks and regulation.",
  keyIdea:{ rule:"Tourist numbers to Antarctica have grown rapidly — from a few hundred in the 1960s to over 100,000 visitor-days per season. Tourism brings benefits but also serious risks to a fragile ecosystem.", detail:"" },
  formulae:[
    { main:"Most tourists arrive by cruise ship from Ushuaia, Argentina (closest port to Antarctica)", note:"" },
    { main:"IAATO = International Association of Antarctica Tour Operators — self-regulating body", note:"" },
  ],
  steps:[
    { title:"Why do people visit?", detail:"Unique wildlife (penguins, whales), dramatic iceberg scenery, adventure and remoteness, historical sites (Scott/Amundsen huts).", formula:"" },
    { title:"Benefits of tourism", detail:"Income for tour operators, raises awareness of conservation needs, supports scientific research funding, educates visitors about climate change.", formula:"" },
    { title:"Environmental risks", detail:"Ship fuel spills, disturbance to breeding wildlife (especially penguins), introduction of non-native species on boots/clothes, trampling fragile vegetation (mosses, lichens).", formula:"" },
    { title:"Regulation", detail:"IAATO sets strict rules — max 100 visitors ashore at once, minimum 5 m distance from wildlife, no souvenirs, biosecurity checks. Antarctic Treaty bans mining and military activity.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>IAATO key facts:</strong> Maximum 100 tourists ashore at a time. At least one IAATO guide per 20 tourists. Strict biosecurity — all clothing must be hoovered and boots disinfected before landing." },
    { icon:"⭐", text:"<strong>Tourism vs conservation:</strong> A balanced answer notes both — tourism raises conservation awareness AND creates risks. Don't just give one side." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying tourism is entirely bad. It also brings conservation awareness and income that supports research." },
  ],
  practice:[
    { q:"What does IAATO stand for and what does it do?", opts:["International Antarctic Treaty Authority — bans all tourism","International Association of Antarctica Tour Operators — sets rules to minimise environmental impact","International Antarctic Transport Agency — controls flights","Individual Antarctic Travel Authority — issues visas"], ans:1, exp:"<strong>IAATO</strong> = International Association of Antarctica Tour Operators. It sets rules limiting tourist numbers and behaviour to reduce environmental harm." },
    { q:"One environmental risk of Antarctic tourism is:", opts:["Too much scientific research","Ships disturbing breeding penguins and the risk of fuel spills near fragile ecosystems","Too many scientists visiting","Tourists leaving too quickly"], ans:1, exp:"Environmental risks include <strong>ship fuel spills, disturbance to breeding wildlife and introduction of non-native species</strong>." },
    { q:"Most tourists reach Antarctica by:", opts:["Plane to the South Pole","Cruise ship from Ushuaia, Argentina","Train from South Africa","Private helicopter from New Zealand"], ans:1, exp:"Most tourists travel by <strong>cruise ship from Ushuaia, Argentina</strong> — the closest port to Antarctica, through the Drake Passage." },
    { q:"One benefit of tourism in Antarctica:", opts:["It creates pollution","It raises conservation awareness and public understanding of climate change impacts","It has no benefits","It allows mining profits"], ans:1, exp:"Tourism <strong>raises conservation awareness</strong> and helps educate the public about Antarctica's vulnerability to climate change." },
  ],
  prevLesson:{ key:"ant-explorers", label:"Explorers of Antarctica" },
  nextLesson:{ key:"ant-adaptations", label:"Animal Adaptations" }
},

"ant-adaptations": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"Animal Adaptations to Antarctica",
  subtitle:"How penguins, seals and whales survive the most extreme conditions on Earth.",
  keyIdea:{ rule:"Antarctic animals have behavioural, physiological and structural adaptations that allow them to survive extreme cold, wind and months of darkness", detail:"Adaptations can be grouped: keeping warm (blubber, feathers, huddles) · food finding (diving ability, seasonal migrations) · reproduction (timing breeding to summer)" },
  formulae:[],
  steps:[
    { title:"Blubber", detail:"Thick layer of fat under the skin insulates against extreme cold. Emperor penguins have 3 cm of blubber. Seals and whales have even thicker layers.", formula:"" },
    { title:"Countercurrent heat exchange", detail:"Warm blood flowing to flippers passes alongside cold blood returning — warming it before it reaches the heart. Prevents dangerous heat loss.", formula:"" },
    { title:"Feathers and dense fur", detail:"Penguins have 4 layers of overlapping, waterproof feathers — up to 70 per sq cm. Creates a windproof and waterproof coat.", formula:"" },
    { title:"Huddling behaviour", detail:"Emperor penguins form huddles of up to 5,000 birds. Temperature inside huddle can reach +37°C even when outside is −60°C. Birds rotate from outside to centre.", formula:"" },
    { title:"Breeding timing", detail:"Most Antarctic species breed in spring/summer when food is most available. Emperor penguins breed in winter — chick hatches in spring with maximum feeding time.", formula:"" },
    { title:"Diving adaptations", detail:"Weddell seals can dive to 600 m for 80 minutes — flexible ribcage, high myoglobin (oxygen-storing protein) in muscles, slowed heart rate when diving.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Three types of adaptation:</strong> Structural (body features like blubber), Physiological (body processes like countercurrent), Behavioural (actions like huddling). Try to give one of each." },
    { icon:"⭐", text:"<strong>Huddling is clever:</strong> Birds on the outside lose heat but are then moved to the centre by the shuffling motion. Every bird takes a turn on the cold edge." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Just listing adaptations without explaining HOW they help. Always say what problem the adaptation solves." },
  ],
  practice:[
    { q:"What is countercurrent heat exchange?", opts:["A way of finding food under ice","Warm blood flowing to flippers passes cold blood returning, warming it and preventing dangerous heat loss","A type of swimming technique","The way penguins rotate in a huddle"], ans:1, exp:"<strong>Countercurrent heat exchange:</strong> warm blood flowing out to the extremities passes alongside cold blood returning, transferring heat and preventing dangerous cooling of the core." },
    { q:"Emperor penguins huddle in groups because:", opts:["They are sociable animals","The combined body heat of thousands of birds dramatically reduces individual heat loss — inside temp can reach +37°C","They share food","They sleep standing up"], ans:1, exp:"Huddling <strong>dramatically reduces heat loss</strong> — inside the huddle reaches +37°C even when outside is −60°C." },
    { q:"Blubber is an example of what type of adaptation?", opts:["Behavioural","Structural (physiological) — a physical body feature that insulates against cold","Seasonal","Social"], ans:1, exp:"<strong>Structural/physiological adaptation</strong> — blubber is a physical body feature (thick fat layer) that insulates against extreme cold." },
    { q:"Why do most Antarctic animals breed in spring and summer?", opts:["The ice is thinner","It's when food (krill, fish) is most abundant — giving young animals the best chance of survival","The weather is warmest everywhere","Tradition"], ans:1, exp:"Spring/summer is when <strong>food is most abundant</strong> — sea ice retreats, phytoplankton blooms, krill numbers peak — giving young the best survival chance." },
  ],
  prevLesson:{ key:"ant-tourism", label:"Tourism in Antarctica" },
  nextLesson:{ key:"ant-protection", label:"How Do We Protect Antarctica?" }
},

"ant-protection": {
  topic:"Antarctica", topicKey:"Antarctica", theme:"blue", icon:"🧊",
  title:"How Do We Protect Antarctica?",
  subtitle:"The Antarctic Treaty, IAATO rules and the debate over Antarctica's future.",
  keyIdea:{ rule:"The Antarctic Treaty (1959) is the key agreement — it sets aside Antarctica for peaceful scientific research and bans military activity and mining", detail:"Originally signed by 12 countries, now 54 signatories. The Protocol on Environmental Protection (1991) added a 50-year ban on mining." },
  formulae:[
    { main:"Antarctic Treaty 1959: bans military activity · no territorial claims recognised · free scientific research", note:"54 countries signed" },
    { main:"Protocol on Environmental Protection 1991: bans mining for 50 years (to 2048)", note:"Also called the Madrid Protocol" },
  ],
  steps:[
    { title:"The Antarctic Treaty — key points", detail:"Signed 1959, came into force 1961. Antarctica used only for peaceful purposes. Free exchange of scientific data. No nuclear testing or waste disposal. Territorial claims frozen.", formula:"" },
    { title:"Madrid Protocol 1991", detail:"Bans all mining and mineral extraction for 50 years. Protects the environment — all activities must assess environmental impact first.", formula:"Mining ban expires: 2048" },
    { title:"IAATO rules for tourism", detail:"Maximum 100 tourists ashore at once. Biosecurity checks. Minimum distances from wildlife. No collecting samples or disturbing habitats.", formula:"" },
    { title:"Threats and debates", detail:"Bioprospecting (collecting biological samples for commercial use) is a grey area. Climate change is melting ice regardless of treaty protections. Fishing for krill and toothfish continues.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>The mining ban:</strong> The Madrid Protocol bans mining until 2048. After that, it could be reviewed. As climate change opens up Antarctica, pressure on the treaty may increase." },
    { icon:"⭐", text:"<strong>Bioprospecting</strong> = collecting organisms from Antarctica for commercial use (e.g. bacteria with unique properties for pharmaceuticals). It's legal but controversial — who owns Antarctica's resources?" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying the Antarctic Treaty bans all human activity. It allows scientific research and (now) regulated tourism — it bans military use and mining." },
  ],
  practice:[
    { q:"When was the Antarctic Treaty signed, and what does it ban?", opts:["1991 — bans all visitors","1959 — bans military activity, nuclear testing and mining","1945 — bans fishing","1970 — bans tourism"], ans:1, exp:"The <strong>Antarctic Treaty was signed in 1959</strong>. It bans military activity, nuclear testing and waste disposal, and freezes territorial claims." },
    { q:"The Madrid Protocol (1991) introduced:", opts:["Rules for tourists","A 50-year ban on mining and mineral extraction, plus environmental impact requirements","A ban on all fishing","Visa requirements for visitors"], ans:1, exp:"The <strong>Madrid Protocol (1991)</strong> bans mining and mineral extraction for 50 years (until at least 2048) and requires environmental impact assessments." },
    { q:"What is bioprospecting?", opts:["Tourism to look for wildlife","Collecting organisms from Antarctica for commercial use — a controversial grey area not clearly covered by the treaty","Scientific study of ice cores","Fishing for krill"], ans:1, exp:"<strong>Bioprospecting</strong> = collecting biological samples (organisms, bacteria, enzymes) for commercial applications — legal but controversial, as no one owns Antarctica." },
    { q:"Why might the Antarctic Treaty face pressure in the future?", opts:["Too many scientists","Climate change is opening up Antarctica — melting ice reveals resources and new routes, increasing international interest","Countries want to do military exercises there","Tourism is declining"], ans:1, exp:"<strong>Climate change</strong> is melting ice, potentially revealing mineral resources and new shipping routes — increasing international pressure on the treaty's restrictions." },
  ],
  prevLesson:{ key:"ant-adaptations", label:"Animal Adaptations" },
  nextLesson:{ key:"fashion-tnc", label:"What is a TNC?" }
},

/* ════════ GEOGRAPHY — GLOBAL FASHION ════════ */
"fashion-tnc": {
  topic:"Global Fashion", topicKey:"Global Fashion", theme:"pink", icon:"👗",
  title:"What is a TNC?",
  subtitle:"Transnational corporations — what they are, how they work, and examples from the fashion industry.",
  keyIdea:{ rule:"A TNC (Transnational Corporation) is a company that operates in multiple countries, with its headquarters in one country and production or operations in others", detail:"TNCs dominate the global fashion industry. They choose where to locate different parts of their business to maximise profit." },
  formulae:[
    { main:"HQ in rich country (design, branding, profit) → factories in poorer countries (cheap manufacturing)", note:"" },
    { main:"Examples: Nike, H&M, Zara, Primark, Gap, Adidas", note:"" },
  ],
  steps:[
    { title:"What makes a company a TNC?", detail:"Operates in more than one country. Has a headquarters (usually in a developed country). Has factories, suppliers or offices in multiple other countries.", formula:"" },
    { title:"How TNCs are structured", detail:"Research and design → in rich countries. Manufacturing → in poorer countries (low wages). Retail → worldwide. Profits → go back to shareholders in rich countries.", formula:"" },
    { title:"Why TNCs locate factories abroad", detail:"Lower wages, fewer worker protection laws, lower taxes, cheaper land, large available workforce, existing industrial infrastructure.", formula:"" },
    { title:"Example: Nike", detail:"HQ in Oregon, USA. Designs trainers in the USA. Has them manufactured in factories in Vietnam, Indonesia, China. Sells globally. Pays workers in Vietnam ~$3/day.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Key exam point:</strong> TNCs benefit shareholders and provide jobs in poorer countries, but profits flow back to wealthy countries — this is a form of economic inequality." },
    { icon:"⭐", text:"<strong>Vertical integration:</strong> Some TNCs control the whole supply chain — from raw material to retail. This gives maximum profit but raises concerns about worker exploitation." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Thinking TNCs are always bad. They do provide employment in developing countries — but the conditions and pay are often exploitative." },
  ],
  practice:[
    { q:"What does TNC stand for?", opts:["Trade and National Corporation","Transnational Corporation — a company operating in multiple countries","Technical and National Company","Trans-national Council"], ans:1, exp:"<strong>TNC = Transnational Corporation</strong> — a company that operates across national borders, with HQ in one country and operations in others." },
    { q:"Where are TNC headquarters typically located?", opts:["In the country with cheapest labour","In developed/rich countries — where design, marketing and profits are based","In Asia","Wherever the factories are"], ans:1, exp:"TNC headquarters are typically in <strong>developed (rich) countries</strong> — where design, branding and profit management takes place." },
    { q:"Why do TNCs locate their factories in developing countries?", opts:["Better quality workers","Lower wages, fewer regulations, lower taxes and large available workforces","Closer to customers","Better infrastructure"], ans:1, exp:"<strong>Lower wages, fewer worker protection laws, lower taxes, cheap land and large workforces</strong> in developing countries make manufacturing much cheaper." },
    { q:"Which of these is an example of a TNC in the fashion industry?", opts:["The NHS","A local market stall","Nike — HQ in USA, factories in Vietnam and Indonesia","A family-run tailor"], ans:2, exp:"<strong>Nike</strong> is a classic TNC — headquartered in Oregon, USA, with factories across Southeast Asia." },
  ],
  prevLesson:{ key:"ant-protection", label:"Protecting Antarctica" },
  nextLesson:{ key:"fashion-asia", label:"Why Clothes are Made in Asia" }
},

"fashion-asia": {
  topic:"Global Fashion", topicKey:"Global Fashion", theme:"pink", icon:"👗",
  title:"Why are Most Clothes Made in Asia?",
  subtitle:"The economic factors that have made Asia — especially Bangladesh, China, Vietnam and Cambodia — the world's garment factories.",
  keyIdea:{ rule:"Most clothes are made in Asia because of low labour costs, large workforces, weak regulations and established supply chains — making manufacturing far cheaper than in richer countries", detail:"Bangladesh is the world's second largest garment exporter — millions of workers, mostly women, work in thousands of factories." },
  formulae:[
    { main:"UK minimum wage ~£11/hr · Bangladesh garment worker wage ~£70–100/month", note:"Huge difference in labour costs drives TNC decisions" },
  ],
  steps:[
    { title:"Low labour costs", detail:"Garment workers in Bangladesh, Cambodia and Vietnam earn a fraction of what workers in Europe or the USA would. This dramatically lowers production costs.", formula:"" },
    { title:"Large available workforce", detail:"Densely populated countries with large numbers of young people willing to work in manufacturing — especially women in rural-to-urban migration.", formula:"" },
    { title:"Weak labour regulations", detail:"Some countries have fewer or less enforced laws on minimum wage, working hours, safety standards and union rights — reducing costs for TNCs.", formula:"" },
    { title:"Established supply chains", detail:"Asia has decades of textile manufacturing experience, specialised machinery, trained workers, and port infrastructure for export.", formula:"" },
    { title:"Trade agreements and low tariffs", detail:"Many Asian countries have favourable trade agreements with the EU and USA, reducing import taxes on garments.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Bangladesh example:</strong> Over 4 million workers (mostly women) in 4,000+ factories. Garments = 80% of Bangladesh's total export earnings. The industry supports millions of families, but often at the cost of worker safety." },
    { icon:"⭐", text:"<strong>Fast fashion</strong> intensifies this — brands like H&M and Zara produce new collections every few weeks, requiring fast, cheap, high-volume manufacturing." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only saying 'cheap labour.' Give multiple factors — regulations, infrastructure, trade agreements, workforce size." },
  ],
  practice:[
    { q:"The main reason most clothes are made in Asian countries is:", opts:["Better quality fabric","Significantly lower labour costs than in developed countries","Closer to fashion designers","Better technology"], ans:1, exp:"The primary driver is <strong>significantly lower labour costs</strong> — workers in Bangladesh earn ~£70–100/month vs £11/hour in the UK." },
    { q:"Bangladesh is important in the global fashion industry because:", opts:["It makes luxury goods","It is the world's second largest garment exporter, employing 4+ million workers","It has the best fabric","It has the strictest worker laws"], ans:1, exp:"Bangladesh is the <strong>world's second largest garment exporter</strong>, with over 4 million workers and garments making up 80% of its export earnings." },
    { q:"Weak labour regulations benefit TNCs because:", opts:["Workers produce better quality goods","TNCs can pay less, enforce longer hours and avoid safety upgrades — reducing production costs","The goods arrive faster","Workers choose to work there"], ans:1, exp:"<strong>Weak regulations</strong> mean TNCs can pay lower wages, impose longer hours and avoid expensive safety improvements — all reducing costs." },
    { q:"'Fast fashion' increases pressure on Asian factories because:", opts:["It requires slower production","New collections every few weeks demand very fast, cheap, high-volume manufacturing","It focuses on quality not speed","It reduces demand"], ans:1, exp:"<strong>Fast fashion</strong> = rapid new collections (H&M, Zara). This demands fast turnaround, high volume and rock-bottom costs — increasing pressure on factories." },
  ],
  prevLesson:{ key:"fashion-tnc", label:"What is a TNC?" },
  nextLesson:{ key:"fashion-conditions", label:"Working Conditions" }
},

"fashion-conditions": {
  topic:"Global Fashion", topicKey:"Global Fashion", theme:"pink", icon:"👗",
  title:"Working Conditions in Garment Factories",
  subtitle:"What life is really like for workers in Asian garment factories — including the Rana Plaza disaster.",
  keyIdea:{ rule:"Workers in many garment factories face dangerous conditions, very low pay, excessive hours and limited rights — the Rana Plaza collapse (2013) brought this to global attention", detail:"Rana Plaza was an 8-storey factory complex in Bangladesh that collapsed on 24 April 2013, killing 1,134 workers. Cracks had been reported the day before but workers were ordered back in." },
  formulae:[
    { main:"Rana Plaza: 24 April 2013 · 1,134 killed · Bangladesh · making clothes for Western brands", note:"" },
  ],
  steps:[
    { title:"Pay", detail:"Garment workers often earn the national minimum wage or below — in Bangladesh around £70–100/month. This is not enough to cover food, rent and essentials.", formula:"" },
    { title:"Hours", detail:"Workers routinely work 12–16 hour days, 6–7 days a week during busy seasons. Overtime is often unpaid or compulsory.", formula:"" },
    { title:"Safety", detail:"Poor fire safety, locked exits, structural flaws, inadequate ventilation and heat. Factory fires have killed hundreds (e.g. Tazreen Fashions fire, 2012: 117 killed).", formula:"" },
    { title:"Rights", detail:"Trade unions are often banned or suppressed. Workers who complain can be dismissed. Child labour remains an issue in some supply chains.", formula:"" },
    { title:"Rana Plaza case study", detail:"Building showed cracks the morning of the collapse. Management told workers to return. 1,134 died, 2,500 injured. Companies: Primark, Matalan, Benetton found in the rubble.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Rana Plaza</strong> is the key case study. Know: where (Bangladesh), when (24 April 2013), how many died (1,134), why it happened (ignored cracks, ordered back), which brands (Primark etc)." },
    { icon:"⭐", text:"<strong>After Rana Plaza:</strong> The Accord on Fire and Building Safety was signed by 200+ brands — agreeing to fund safety inspections. But enforcement remains inconsistent." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Giving vague descriptions ('bad conditions'). Be specific — mention pay rates, hours, Rana Plaza, or specific hazards." },
  ],
  practice:[
    { q:"What happened at Rana Plaza on 24 April 2013?", opts:["A fire destroyed a cotton warehouse","An 8-storey factory complex collapsed, killing 1,134 garment workers — cracks had been seen the day before but workers were ordered back in","A workers' strike closed all Bangladesh factories","A TNC moved its factories out of Bangladesh"], ans:1, exp:"<strong>Rana Plaza</strong>: 8-storey factory collapsed on 24 April 2013, killing <strong>1,134 workers</strong>. Cracks had been reported — workers were ordered back in anyway. Western brands' labels were found in the rubble." },
    { q:"Typical working conditions in a garment factory include:", opts:["8-hour days, fair pay, good safety equipment","12–16 hour days, very low pay, limited rights, poor fire and building safety","4-hour days and weekends off","High wages but poor food"], ans:1, exp:"Many garment workers face <strong>12–16 hour days, very low wages, poor safety standards and suppressed union rights</strong>." },
    { q:"Why are trade union rights important for garment workers?", opts:["They help workers get more holidays","Unions allow workers to collectively negotiate better pay and conditions — without them, workers have little power to challenge exploitation","They reduce production costs for TNCs","They improve product quality"], ans:1, exp:"<strong>Trade unions</strong> give workers collective bargaining power — without them, individual workers can be easily dismissed for complaining." },
    { q:"Which Western brands were found to have clothing in the Rana Plaza rubble?", opts:["Gucci and Chanel","Primark, Matalan and Benetton","Nike and Adidas","Marks & Spencer only"], ans:1, exp:"<strong>Primark, Matalan and Benetton</strong> were among the brands identified. This showed the direct link between consumer purchases in rich countries and factory conditions in Bangladesh." },
  ],
  prevLesson:{ key:"fashion-asia", label:"Why Clothes are Made in Asia" },
  nextLesson:{ key:"fashion-environment", label:"Environmental Impacts" }
},

"fashion-environment": {
  topic:"Global Fashion", topicKey:"Global Fashion", theme:"pink", icon:"👗",
  title:"Environmental Impacts of the Global Fashion Industry",
  subtitle:"Water pollution, pesticide use, microplastics, carbon emissions and the fast fashion waste problem.",
  keyIdea:{ rule:"The fashion industry is the world's second most polluting industry — responsible for 10% of global carbon emissions, vast water use and serious chemical pollution", detail:"Fast fashion accelerates all of these problems by encouraging consumers to buy more, wear less and throw away sooner." },
  formulae:[
    { main:"Cotton: 10,000 litres of water to make one pair of jeans · 20,000 litres per kg of cotton", note:"" },
    { main:"Synthetic fibres (polyester): shed microplastics when washed — 700,000 fibres per wash", note:"End up in oceans, consumed by marine life" },
  ],
  steps:[
    { title:"Water pollution", detail:"Textile dyeing is the world's second largest water polluter. Untreated chemical dyes are dumped into rivers in Bangladesh, China, India. Rivers near factories run bright colours.", formula:"" },
    { title:"Cotton and pesticides", detail:"Cotton uses 25% of the world's insecticides despite covering only 2.5% of farmland. Pesticides pollute waterways and harm biodiversity.", formula:"Aral Sea disaster: diverted for cotton irrigation → 90% lost" },
    { title:"Microplastics", detail:"Synthetic fabrics (polyester, nylon, acrylic) release microplastic fibres when washed. These pass through water treatment and enter oceans. Consumed by plankton and fish — entering food chain.", formula:"" },
    { title:"Carbon emissions", detail:"10% of global CO₂. From: growing fibres, factory energy use, transport (air freight), retail. Fast fashion = more journeys, more energy.", formula:"" },
    { title:"Fast fashion waste", detail:"The average garment is worn 7 times before disposal. The UK sends 300,000 tonnes of clothing to landfill each year. Synthetic fibres take 200+ years to decompose.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Best statistic to learn:</strong> 10,000 litres of water to make one pair of jeans. Shows the hidden environmental cost of an everyday item." },
    { icon:"⭐", text:"<strong>Possible solutions:</strong> Buying second-hand, renting clothes, choosing natural or organic fibres, washing at lower temperatures, buying less and wearing items longer." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only mentioning carbon emissions. The fashion industry's impacts are multiple — water, chemicals, microplastics, waste, land use." },
  ],
  practice:[
    { q:"Approximately how many litres of water does it take to produce one pair of jeans?", opts:["100 litres","1,000 litres","10,000 litres","100,000 litres"], ans:2, exp:"It takes approximately <strong>10,000 litres of water</strong> to produce one pair of jeans — from growing the cotton to dyeing and finishing." },
    { q:"Microplastics from fashion enter the ocean because:", opts:["Clothes are thrown into the sea","Synthetic fabrics release tiny plastic fibres when washed — these pass through water treatment plants into waterways","Cotton dissolves in water","They fall off drying racks"], ans:1, exp:"<strong>Synthetic fabrics</strong> (polyester, nylon) release ~700,000 microplastic fibres per wash. These pass through water treatment and enter oceans, where they are consumed by marine life." },
    { q:"What percentage of global carbon emissions does the fashion industry account for?", opts:["1%","10%","25%","50%"], ans:1, exp:"The fashion industry accounts for approximately <strong>10% of global carbon emissions</strong> — making it the second most polluting industry." },
    { q:"What is 'fast fashion' and why is it a problem?", opts:["High quality clothes that last a long time","Cheap, rapidly produced clothing that encourages frequent buying and disposal — increasing waste, emissions and resource use","Clothes made quickly but sustainably","Clothes delivered by fast courier"], ans:1, exp:"<strong>Fast fashion</strong> = cheap, rapidly changing trends encouraging frequent buying and disposal. The average garment is worn just 7 times. 300,000 tonnes go to UK landfill each year." },
  ],
  prevLesson:{ key:"fashion-conditions", label:"Working Conditions" },
  nextLesson:{ key:"africa-location", label:"Locating Countries in Africa" }
},

/* ════════ GEOGRAPHY — AFRICA ════════ */
"africa-location": {
  topic:"Africa", topicKey:"Africa", theme:"amber", icon:"🌍",
  title:"Locating Countries in Africa",
  subtitle:"Key countries to find on a map — plus Africa's physical geography.",
  keyIdea:{ rule:"Africa is the world's second largest continent with 54 countries — know the location of key countries and physical features for the exam", detail:"Africa spans from the Mediterranean in the north to the Cape of Good Hope in the south. It straddles the Equator — both hemispheres." },
  formulae:[],
  steps:[
    { title:"Key countries to locate", detail:"Nigeria (West Africa, largest population), Egypt (North Africa, River Nile), Ethiopia (East Africa, landlocked), Kenya (East Africa, equatorial), South Africa (southern tip), DRC / Democratic Republic of Congo (Central Africa, rainforest), Ghana (West Africa), Tanzania (East Africa).", formula:"" },
    { title:"Key physical features", detail:"Sahara Desert (North Africa — world's largest hot desert), Congo Rainforest (Central Africa — 2nd largest rainforest), River Nile (longest river), Rift Valley (East Africa), Mt Kilimanjaro (Tanzania — highest peak 5,895 m).", formula:"" },
    { title:"Africa's position", detail:"Straddles Equator and prime meridian. Countries in both hemispheres and on both sides of the Greenwich Meridian. Surrounded by the Atlantic Ocean (west), Indian Ocean (east), Mediterranean Sea (north).", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory strategy:</strong> Use the coasts as anchors. Egypt is top-right (NE), South Africa is at the bottom, Nigeria is mid-left (West), Kenya is mid-right (East)." },
    { icon:"⭐", text:"<strong>Africa has 54 countries</strong> — the most of any continent. The exam won't expect you to name all of them, but knowing ~8–10 key ones and their broad locations is essential." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing East and West Africa. Nigeria and Ghana = West. Kenya, Ethiopia, Tanzania = East." },
  ],
  practice:[
    { q:"Which country is Africa's most populous and where is it located?", opts:["Egypt — North Africa","South Africa — southern tip","Nigeria — West Africa","Ethiopia — Central Africa"], ans:2, exp:"<strong>Nigeria (West Africa)</strong> is Africa's most populous country with over 220 million people." },
    { q:"The Sahara Desert is located in:", opts:["Southern Africa","Central Africa","North Africa — the world's largest hot desert","East Africa"], ans:2, exp:"The <strong>Sahara</strong> is in North Africa — stretching across Algeria, Libya, Egypt, Mali, Niger and more. It is the world's largest hot desert." },
    { q:"Mt Kilimanjaro is in which country?", opts:["Kenya","Ethiopia","Nigeria","Tanzania"], ans:3, exp:"<strong>Mt Kilimanjaro (5,895 m)</strong> is in Tanzania — Africa's highest peak." },
    { q:"The River Nile flows through which country before reaching the Mediterranean?", opts:["Nigeria","South Africa","Egypt","Kenya"], ans:2, exp:"The <strong>River Nile</strong> flows northward through Ethiopia and Sudan before passing through <strong>Egypt</strong> and reaching the Mediterranean Sea." },
  ],
  prevLesson:{ key:"fashion-environment", label:"Environmental Impacts of Fashion" },
  nextLesson:{ key:"africa-factors", label:"Factors Affecting Development" }
},

"africa-factors": {
  topic:"Africa", topicKey:"Africa", theme:"amber", icon:"🌍",
  title:"Factors Affecting Africa's Development",
  subtitle:"Human and physical factors that explain why many African countries have lower levels of development.",
  keyIdea:{ rule:"Development is influenced by both human factors (history, politics, economics) and physical factors (environment, disease, geography) — no single cause explains poverty", detail:"Many African countries have low development indicators (GDP, life expectancy, literacy) — but the causes are complex and interconnected." },
  formulae:[
    { main:"Development indicators: GDP per capita · HDI · life expectancy · literacy rate · infant mortality", note:"" },
  ],
  steps:[
    { title:"Human factors — colonial legacy", detail:"African countries were colonised by European powers (Britain, France, Belgium, Portugal). Colonial rule drew borders that divided ethnic groups, exploited resources and disrupted traditional societies.", formula:"" },
    { title:"Human factors — debt", detail:"Many African countries borrowed money from international organisations (IMF, World Bank) and cannot repay it. Debt repayments drain government budgets away from schools and hospitals.", formula:"" },
    { title:"Human factors — conflict and corruption", detail:"Civil wars (DRC, South Sudan) destroy infrastructure and displace populations. Corrupt governments divert aid and resources away from development.", formula:"" },
    { title:"Physical factors — landlocked countries", detail:"15 African countries have no coast. Without ports, trade is more expensive and difficult. Transport infrastructure is harder to develop.", formula:"e.g. Ethiopia, Uganda, Zimbabwe, Chad" },
    { title:"Physical factors — disease", detail:"Malaria affects hundreds of millions — causing death, reducing productivity and stretching health budgets. HIV/AIDS has devastating demographic effects in southern Africa.", formula:"" },
    { title:"Physical factors — climate and drought", detail:"Parts of Africa face unreliable rainfall, long droughts (Sahel) and soil degradation — reducing food security and economic productivity.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Always use named examples:</strong> DRC (conflict), Ethiopia (landlocked, drought), South Africa (HIV/AIDS), Ghana (colonial resource extraction)." },
    { icon:"⭐", text:"<strong>Human vs physical:</strong> In the exam, make sure you give at least one of each type. The question often asks for 'human AND physical' factors specifically." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Blaming development solely on geography (physical factors). Human factors — especially colonialism and debt — are equally important and often cause more harm." },
  ],
  practice:[
    { q:"What is the 'colonial legacy' and how does it affect development?", opts:["Africa was never colonised","European colonisers drew artificial borders, exploited resources and disrupted societies — leaving lasting economic and political instability","Colonialism helped Africa develop","It only affected Egypt"], ans:1, exp:"<strong>Colonial legacy:</strong> European powers drew arbitrary borders, exploited mineral and agricultural wealth and left behind unstable political structures — still affecting development today." },
    { q:"Being a landlocked country is a physical disadvantage because:", opts:["There is no water","Without a coast, countries have no ports — making trade more expensive and harder, limiting economic growth","The weather is worse inland","There are fewer resources"], ans:1, exp:"<strong>Landlocked countries</strong> have no ports — trade costs more (needing to cross neighbouring countries), slowing economic development. 15 African countries are landlocked." },
    { q:"How does debt hinder development?", opts:["It has no effect","Debt repayments drain government money that could fund schools, hospitals and infrastructure","Debt is always repaid quickly","Only large countries have debt"], ans:1, exp:"<strong>Debt repayments</strong> take large amounts from government budgets — money that could instead fund education, healthcare and infrastructure development." },
    { q:"Malaria is a physical factor affecting development because:", opts:["It is a political problem","It causes mass death and illness, reducing the workforce, increasing healthcare costs and deterring foreign investment","It only affects wildlife","It is easy to cure everywhere"], ans:1, exp:"<strong>Malaria</strong> causes hundreds of millions of infections annually — it kills, reduces workforce productivity and places huge pressure on healthcare budgets." },
  ],
  prevLesson:{ key:"africa-location", label:"Locating Countries in Africa" },
  nextLesson:{ key:"africa-trade", label:"Unfair Trade" }
},

"africa-trade": {
  topic:"Africa", topicKey:"Africa", theme:"amber", icon:"🌍",
  title:"Unfair Trade",
  subtitle:"Why trade between Africa and richer countries is unequal — and the Ghana cocoa example.",
  keyIdea:{ rule:"Trade between Africa and developed countries is often unfair — rich countries subsidise their own farmers, set low prices for African commodities, and dominate the 'value-added' processing stage", detail:"African countries often export raw materials (cocoa, coffee, cotton) cheaply and import expensive finished goods — meaning profits flow to richer countries." },
  formulae:[
    { main:"Primary products (raw): low value · Manufactured goods (processed): high value", note:"Ghana cocoa example: cocoa beans vs chocolate bar" },
    { main:"UK chocolate bar = ~£1 · Ghana farmer receives = ~2p from that bar", note:"" },
  ],
  steps:[
    { title:"The commodity trap", detail:"Many African countries depend on exporting one or two raw materials (primary commodities). World prices fluctuate — often set by rich-country stock exchanges. When prices fall, whole economies suffer.", formula:"" },
    { title:"Agricultural subsidies", detail:"The EU and USA pay subsidies to their own farmers — allowing them to produce food more cheaply than African farmers can. This makes it hard for African produce to compete on global markets.", formula:"" },
    { title:"Ghana and cocoa", detail:"Ghana is the world's second largest cocoa producer. But most processing (making chocolate) happens in Europe and the USA — where the profit is. Ghanaian farmers get a tiny fraction of the final value.", formula:"" },
    { title:"Trade rules", detail:"Rich countries have historically written the rules of global trade (through WTO, World Bank) in their own interests — limiting African countries' ability to protect their own industries.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Value chain:</strong> Raw material → processed product → branded product. Value (and profit) increases at each stage. African countries are mostly stuck at stage 1." },
    { icon:"⭐", text:"<strong>Ghana cocoa</strong> is the key case study. Ghana grows the cocoa — but Cadbury (UK) and Nestlé (Switzerland) make the profit from the finished chocolate." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying trade is unfair simply because Africa is poor. Explain the specific mechanisms — subsidies, commodity prices, value chain inequality." },
  ],
  practice:[
    { q:"Why does Ghana receive so little value from the cocoa it grows?", opts:["Ghana doesn't grow much cocoa","The processing of cocoa into chocolate (where most profit is made) happens in Europe and the USA — Ghana exports low-value beans","Chocolate is not popular","Ghana doesn't export cocoa"], ans:1, exp:"Ghana grows the cocoa but <strong>processing into high-value chocolate happens in Europe and the USA</strong> — keeping most of the profit in rich countries. Ghana receives approximately 2p per £1 chocolate bar." },
    { q:"Agricultural subsidies paid by the EU and USA harm African farmers because:", opts:["They help African farmers too","They allow rich-country farmers to produce food more cheaply than African farmers can, making African exports uncompetitive","They only apply to clothing","They increase commodity prices"], ans:1, exp:"<strong>Subsidies</strong> let EU/USA farmers undercut African farmers on global markets — African produce cannot compete, damaging incomes and development." },
    { q:"What is the 'commodity trap'?", opts:["A trap set for catching animals","When a country depends on exporting one or two raw materials whose world price is low and unstable — leaving the economy vulnerable","A type of unfair trade agreement","When countries run out of commodities"], ans:1, exp:"The <strong>commodity trap</strong> = dependence on exporting low-value raw materials whose prices fluctuate and are set by rich-country stock markets." },
    { q:"'Value-added' products are important because:", opts:["They are cheaper to make","Processing raw materials into finished goods greatly increases their value — but African countries are usually stuck at the low-value raw material stage","They use less energy","They require less labour"], ans:1, exp:"<strong>Value-added processing</strong> turns low-value raw materials into high-value products (e.g. cocoa → chocolate). African countries lack the investment to do this processing at scale." },
  ],
  prevLesson:{ key:"africa-factors", label:"Factors Affecting Development" },
  nextLesson:{ key:"africa-strategies", label:"Strategies to Reduce the Gap" }
},

"africa-strategies": {
  topic:"Africa", topicKey:"Africa", theme:"amber", icon:"🌍",
  title:"Strategies to Reduce the Development Gap",
  subtitle:"Fair trade, aid, debt relief, microfinance, education and tourism — approaches to reducing inequality.",
  keyIdea:{ rule:"No single strategy solves the development gap — a combination of trade reform, aid, education, healthcare and local empowerment is needed", detail:"Strategies can be top-down (organised by governments and international organisations) or bottom-up (community-led, local solutions)." },
  formulae:[
    { main:"Top-down: international aid, debt relief, government investment · Bottom-up: microfinance, NGOs, community projects", note:"" },
  ],
  steps:[
    { title:"Fair trade", detail:"Farmers in developing countries get a guaranteed minimum price for their products (coffee, cocoa, bananas). Also receives a Fairtrade Premium — extra money for community projects.", formula:"Fairtrade logo = higher price guaranteed to farmer" },
    { title:"Aid", detail:"Money, food, technology or expertise from richer countries. Short-term emergency aid (disaster relief) vs long-term development aid (building schools, hospitals). Criticised for creating dependency.", formula:"" },
    { title:"Debt relief", detail:"International organisations (e.g. through HIPC Initiative) cancel or reduce debt owed by very poor countries — freeing up government budget for development.", formula:"HIPC = Heavily Indebted Poor Countries initiative" },
    { title:"Microfinance", detail:"Very small loans to individuals (often women) to start or grow businesses. The Grameen Bank (Bangladesh) is the famous example — 97% of borrowers are women.", formula:"" },
    { title:"Investment in education and healthcare", detail:"Better education increases earning potential. Better healthcare means more productive workers and longer lives. Both create a more attractive investment environment.", formula:"" },
    { title:"Tourism", detail:"Tourism brings foreign currency, creates jobs and can fund conservation. But profits can leak to foreign-owned companies. Ecotourism tries to keep more money local.", formula:"e.g. Kenya and Tanzania safari tourism" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Fair trade vs free trade:</strong> Free trade = fewer barriers between countries. Fair trade = ensuring farmers get a fair price. These are different — know the distinction." },
    { icon:"⭐", text:"<strong>Microfinance</strong> is a popular bottom-up example — especially effective for women who may not have collateral for traditional bank loans." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying 'aid is always good'. Aid can create dependency and may not reach those who need it. Always evaluate strategies — give pros AND cons." },
  ],
  practice:[
    { q:"What does the Fairtrade system guarantee?", opts:["The cheapest possible prices for buyers","A guaranteed minimum price for farmers plus a premium for community projects","No export taxes","Free transport for goods"], ans:1, exp:"<strong>Fairtrade</strong> guarantees farmers a minimum price (so they don't lose out if world prices fall) plus a Fairtrade Premium — extra money for community schools, clinics, etc." },
    { q:"What is microfinance and why does it help development?", opts:["Large bank loans to governments","Very small loans to individuals (often women) to start businesses — providing capital to people who would otherwise have none","Money sent from abroad by migrants","Loans from the World Bank"], ans:1, exp:"<strong>Microfinance</strong> = small loans to individuals to start/grow businesses. Effective because it reaches people too poor for traditional banking — especially women." },
    { q:"What is the difference between top-down and bottom-up strategies?", opts:["There is no difference","Top-down = organised by governments and international organisations (e.g. debt relief, aid). Bottom-up = community-led local solutions (e.g. microfinance, village projects)","Top-down is always better","Bottom-up is always better"], ans:1, exp:"<strong>Top-down</strong> = large-scale, government/international (aid, debt relief). <strong>Bottom-up</strong> = local, community-led (microfinance, NGOs). Both have strengths and weaknesses." },
    { q:"One criticism of aid as a development strategy is:", opts:["It is too cheap","It can create dependency and may not reach those who need it — corruption and mismanagement are real risks","It always works","It only goes to Asia"], ans:1, exp:"Aid can <strong>create dependency</strong> (countries relying on handouts rather than building their own economy) and may be mismanaged or not reach the poorest people." },
  ],
  prevLesson:{ key:"africa-trade", label:"Unfair Trade" },
  nextLesson:{ key:"coasts-erosion", label:"Coastal Erosion Processes" }
},

/* ════════ GEOGRAPHY — COASTS ════════ */
"coasts-erosion": {
  topic:"Coasts", topicKey:"Coasts", theme:"teal", icon:"🌊",
  title:"4 Processes of Erosion and 4 Processes of Transportation",
  subtitle:"How the sea breaks down and moves material along the coast.",
  keyIdea:{ rule:"4 erosion processes (HAAS): Hydraulic action · Abrasion · Attrition · Solution. 4 transportation processes (TSSS): Traction · Saltation · Suspension · Solution", detail:"Erosion breaks material down. Transportation moves it. Both are essential for understanding how coastal landforms develop." },
  formulae:[
    { main:"HAAS (erosion): Hydraulic action · Abrasion · Attrition · Solution", note:"" },
    { main:"TSSS (transport): Traction · Saltation · Suspension · Solution", note:"Plus longshore drift — the main direction of movement" },
  ],
  steps:[
    { title:"Hydraulic action", detail:"Waves crash into cliff cracks, trapping and compressing air. When the wave retreats, the trapped air expands explosively, weakening and shattering rock.", formula:"Most effective: rough seas, frequent storms" },
    { title:"Abrasion", detail:"Waves throw sand, pebbles and boulders against the cliff face — like sandpaper. The most powerful erosion process. Also called 'corrasion'.", formula:"Think: pebbles being thrown at the cliff" },
    { title:"Attrition", detail:"Rocks and sediment in the water collide with each other, breaking into smaller, rounder, smoother pieces over time. Explains why beach pebbles are smooth.", formula:"Pebbles get smaller and rounder over time" },
    { title:"Solution (corrosion)", detail:"Slightly acidic seawater dissolves certain rocks (especially limestone and chalk). Chemical process — no physical force needed.", formula:"Most effective on carbonate rocks" },
    { title:"Traction", detail:"Large boulders and pebbles rolled along the seabed by wave energy.", formula:"Too heavy to lift — rolled" },
    { title:"Saltation", detail:"Medium-sized sediment (sand, small pebbles) bounces and hops along the seabed in a leaping motion.", formula:"Bouncing" },
    { title:"Suspension", detail:"Fine particles (silt, clay) carried within the water — not touching the bed. Gives the sea its brown/murky appearance.", formula:"Floating in the water" },
    { title:"Solution (transport)", detail:"Dissolved minerals carried invisibly within the water. Chemically dissolved — cannot be seen.", formula:"e.g. calcium carbonate from limestone cliffs" },
  ],
  tips:[
    { icon:"💡", text:"<strong>HAAS for erosion:</strong> Hydraulic Action · Abrasion · Attrition · Solution. <strong>TSSS for transport:</strong> Traction · Saltation · Suspension · Solution." },
    { icon:"⭐", text:"<strong>Most powerful erosion process = Abrasion</strong>. Most powerful transport = depends on wave energy, but traction moves the largest material." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing attrition with abrasion. Abrasion = rock thrown at cliff. Attrition = rocks hitting each other in the water." },
    { text:"<strong>Common mistake:</strong> Forgetting that 'solution' appears in BOTH erosion and transportation — as a process in each." },
  ],
  practice:[
    { q:"Which erosion process involves waves compressing air into cliff cracks?", opts:["Abrasion","Attrition","Hydraulic action","Solution"], ans:2, exp:"<strong>Hydraulic action</strong> — waves compress air into cracks. When the wave retreats, the pressure release shatters rock." },
    { q:"Abrasion is best described as:", opts:["Rocks hitting each other in the water","Waves throwing sand and pebbles against the cliff face — like sandpaper — the most powerful erosion process","Waves dissolving rock chemically","Air pressure in cracks"], ans:1, exp:"<strong>Abrasion</strong> = rock/sediment in waves thrown against cliffs — like sandpaper. It is the most powerful coastal erosion process." },
    { q:"Why are beach pebbles smooth and round?", opts:["They are made that way","Attrition — rocks colliding with each other repeatedly in the water, breaking down and rounding over time","Abrasion against the cliff","Hydraulic action"], ans:1, exp:"<strong>Attrition</strong> — pebbles constantly collide in the water, chipping edges off each other over time. This makes them smaller, rounder and smoother." },
    { q:"In longshore drift, which transportation process moves the finest particles (silt/clay)?", opts:["Traction","Saltation","Suspension","Solution"], ans:2, exp:"<strong>Suspension</strong> — fine particles (silt, clay) are carried within the water itself. They give the sea its murky, brown colour after a storm." },
  ],
  prevLesson:{ key:"africa-strategies", label:"Strategies to Reduce the Gap" },
  nextLesson:{ key:"coasts-cass", label:"CASS — Cliff, Arch, Stack, Stump" }
},

"coasts-cass": {
  topic:"Coasts", topicKey:"Coasts", theme:"teal", icon:"🌊",
  title:"CASS — Cliff, Arch, Stack, Stump",
  subtitle:"The sequence of erosion landforms — how to label them and explain their formation.",
  keyIdea:{ rule:"CASS = Cliff → Arch → Stack → Stump — a sequence of landforms created by coastal erosion attacking weaknesses in rock (joints and bedding planes)", detail:"Each stage develops from the previous one through continued erosion. The process can take thousands to millions of years." },
  formulae:[
    { main:"Headland → Cave → Arch → Stack → Stump (wave-cut platform remains)", note:"CASS from the top: Cliff · Arch · Stack · Stump" },
  ],
  steps:[
    { title:"Stage 1: Cliff and wave-cut notch", detail:"Waves attack the base of a headland through hydraulic action and abrasion. A wave-cut notch forms at the waterline. The overhanging rock eventually collapses — creating a cliff.", formula:"" },
    { title:"Stage 2: Cave", detail:"Waves exploit lines of weakness (joints, cracks, faults) in the headland. Hydraulic action and abrasion hollow out a cave.", formula:"" },
    { title:"Stage 3: Arch", detail:"If a headland has caves on both sides, they erode through to meet, forming a natural arch. The roof of the arch is still supported by rock.", formula:"Example: Durdle Door, Dorset" },
    { title:"Stage 4: Stack", detail:"The arch roof becomes too heavy and collapses. The isolated column of rock left standing is called a stack.", formula:"Example: Old Harry Rocks, Dorset" },
    { title:"Stage 5: Stump", detail:"The stack is eroded at its base by waves. It collapses or is worn down to sea level, leaving a stump — only visible at low tide.", formula:"" },
    { title:"Wave-cut platform", detail:"As the cliff retreats, the eroded base leaves a flat rocky platform at sea level — the wave-cut platform. It slows future erosion by absorbing wave energy.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Named examples:</strong> Arch = Durdle Door (Dorset). Stack = Old Harry Rocks (Dorset). These are excellent to include in exam answers." },
    { icon:"⭐", text:"<strong>The key mechanism:</strong> Waves attack lines of weakness (joints and faults). Once a cave is created, erosion continues in both directions. When the cave breaks through to the other side — an arch forms." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Putting CASS in the wrong order. Always: Cliff → Cave → Arch → Stack → Stump. Or think of it backwards from 'C' — Cave, Arch, Stack, Stump, with the Cliff at the beginning." },
    { text:"<strong>Common mistake:</strong> Not explaining the mechanism. Don't just say 'the arch collapses to form a stack' — say why (roof becomes too heavy, weathering weakens it, wave erosion at base)." },
  ],
  practice:[
    { q:"What is the correct order of formation?", opts:["Stack → Arch → Cave → Cliff","Cave → Cliff → Arch → Stack","Cliff → Cave → Arch → Stack → Stump","Stump → Stack → Arch → Cave"], ans:2, exp:"The correct sequence is: <strong>Cliff → Cave → Arch → Stack → Stump</strong>. Waves attack weaknesses in the headland → hollow out caves → break through to form arch → roof collapses → stack → stump." },
    { q:"How does a cave become an arch?", opts:["The cave fills with water","Erosion on both sides of a headland creates caves that eventually meet, breaking through to form a natural arch","The cave roof grows stronger","Deposition blocks the cave"], ans:1, exp:"Caves on <strong>both sides of a headland</strong> are eroded through the rock until they meet — creating a natural arch. The sea has punched right through the headland." },
    { q:"Durdle Door in Dorset is an example of:", opts:["A stack","A cave","A natural arch","A stump"], ans:2, exp:"<strong>Durdle Door</strong> is one of the most famous natural arches in the UK, on the Jurassic Coast in Dorset." },
    { q:"A wave-cut platform forms because:", opts:["Deposition builds up the beach","As cliffs retreat inland, the eroded base leaves a flat rocky surface at sea level","Arches collapse into the sea","Stumps spread out laterally"], ans:1, exp:"<strong>Wave-cut platform</strong> = flat rocky surface left as the cliff retreats. It extends seaward from the cliff base, visible at low tide, and absorbs wave energy — slowing further erosion." },
  ],
  prevLesson:{ key:"coasts-erosion", label:"Coastal Erosion and Transport" },
  nextLesson:{ key:"coasts-spits", label:"Spits" }
},

"coasts-spits": {
  topic:"Coasts", topicKey:"Coasts", theme:"teal", icon:"🌊",
  title:"Spits",
  subtitle:"How longshore drift deposits sediment to form a spit — and why the end curves.",
  keyIdea:{ rule:"A spit is a long, narrow ridge of sand or shingle extending from the coast into the sea, formed by longshore drift depositing sediment beyond a change in the coastline", detail:"The curved end (recurved tip) forms because the prevailing wind direction changes at the end of the spit, curling the sediment around." },
  formulae:[
    { main:"Longshore drift: swash (up at angle, following prevailing wind) → backwash (straight back down the slope)", note:"Net movement of sediment along the coast in one direction" },
    { main:"Spit forms when: coast bends sharply (e.g. at estuary mouth) → sediment deposited as water deepens", note:"" },
  ],
  steps:[
    { title:"Longshore drift", detail:"Waves approach the beach at an angle (following prevailing wind). Swash carries sediment up the beach diagonally. Backwash pulls it straight back down. Net effect = sediment moves along the coast.", formula:"" },
    { title:"How a spit begins", detail:"Where the coastline changes direction (e.g. at a river mouth or bay), the water deepens and slows — waves lose energy and deposit sediment. Gradually this builds up above sea level.", formula:"" },
    { title:"The spit grows", detail:"Continued longshore drift keeps adding sediment, extending the spit further into the sea. Sand dunes may develop on top as it stabilises.", formula:"" },
    { title:"The curved (recurved) end", detail:"Secondary winds from a different direction curl the end of the spit around. The spit can never fully cross the estuary or bay because river current or tidal scour keeps the channel clear.", formula:"" },
    { title:"Behind the spit", detail:"A sheltered lagoon or salt marsh develops behind the spit — calm water, away from wave energy, allows fine sediment to settle and vegetation to grow.", formula:"Example: Spurn Head, Yorkshire" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Named example:</strong> Spurn Head (Humber Estuary, Yorkshire) — one of the best spit examples in the UK. Also: Hurst Castle Spit (Hampshire)." },
    { icon:"⭐", text:"<strong>The recurved end</strong> is a key exam point — explain it as the result of secondary winds from a different direction curling the tip around." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying the spit simply 'grows across the bay'. A spit never completely closes an estuary — the river current prevents it." },
    { text:"<strong>Common mistake:</strong> Not explaining longshore drift before explaining the spit. Always establish how material is transported first." },
  ],
  practice:[
    { q:"What is longshore drift?", opts:["A type of coastal erosion","The net movement of sediment along a coastline — swash carries material up at angle of prevailing wind, backwash pulls it straight back, moving it along the coast","A type of cliff retreat","A deposition process in rivers"], ans:1, exp:"<strong>Longshore drift</strong> = the net movement of sediment along the coast. Swash goes up at an angle (following prevailing wind), backwash comes straight back. Sediment zig-zags along the beach." },
    { q:"A spit forms where:", opts:["The cliff is very hard","The coastline changes direction (e.g. at a river mouth) — water deepens, waves lose energy and deposit sediment which gradually builds above sea level","The beach is very wide","There are no waves"], ans:1, exp:"Spits form where the <strong>coastline changes direction</strong> — at river mouths or bays. Longshore drift carries sediment to this point, where deepening water slows waves and causes deposition." },
    { q:"Why does the end of a spit curve (recurve)?", opts:["The weight of sediment bends it","Secondary winds from a different direction curl the tip around — creating the characteristic hooked shape","The river pushes it round","It grows in a circle"], ans:1, exp:"The <strong>recurved end</strong> forms because secondary winds from a different direction catch the tip and curl sediment around it." },
    { q:"What develops behind a spit?", opts:["A large wave","A sheltered lagoon or salt marsh — calm water away from wave energy allows fine sediment to settle and vegetation to grow","Another spit","A sea wall"], ans:1, exp:"Behind the spit is sheltered from wave energy — a <strong>salt marsh or lagoon</strong> develops as fine sediment settles and vegetation colonises the calmer water." },
  ],
  prevLesson:{ key:"coasts-cass", label:"CASS — Cliff, Arch, Stack, Stump" },
  nextLesson:{ key:"coasts-management", label:"Hard and Soft Engineering" }
},

"coasts-management": {
  topic:"Coasts", topicKey:"Coasts", theme:"teal", icon:"🌊",
  title:"Coastal Management — Hard and Soft Engineering",
  subtitle:"Methods used to protect the coast — how they work, their costs and limitations.",
  keyIdea:{ rule:"Hard engineering uses artificial structures to stop erosion. Soft engineering works with natural processes to slow it. Both have advantages and disadvantages.", detail:"The decision about how to protect a coast depends on cost, how much the area is worth protecting, and how long the solution needs to last." },
  formulae:[
    { main:"Hard engineering: sea walls · groynes · rock armour (rip-rap) · offshore reefs", note:"Expensive, durable, can cause problems elsewhere" },
    { main:"Soft engineering: beach nourishment · dune regeneration · managed retreat", note:"Cheaper, more natural, but may need repeating" },
  ],
  steps:[
    { title:"Sea wall", detail:"Concrete or rock barrier built at the base of a cliff or along the seafront. Reflects wave energy. Very expensive (£1,000–10,000 per metre). Lasts ~30–50 years. Can cause scour at base.", formula:"Hard engineering" },
    { title:"Groynes", detail:"Wooden or rock barriers built at right angles to the beach. Trap sediment moved by longshore drift, building up the beach. Cause erosion further along the coast where sediment no longer arrives.", formula:"Hard engineering · e.g. Eastbourne, East Sussex" },
    { title:"Rock armour (rip-rap)", detail:"Large boulders placed at cliff base. Absorb and dissipate wave energy. Relatively cheap. Can look ugly. May be moved by very large storms.", formula:"Hard engineering · cheapest hard option" },
    { title:"Beach nourishment", detail:"Sand and pebbles dredged from the seabed or elsewhere and added to the beach. Wider beach absorbs more wave energy. Needs to be repeated every 5–10 years as material is lost. Looks natural.", formula:"Soft engineering · e.g. Miami Beach, Florida" },
    { title:"Dune regeneration", detail:"Planting marram grass and fencing to stabilise and rebuild sand dunes. Dunes act as a natural buffer. Cheap, natural. But takes time to establish.", formula:"Soft engineering" },
    { title:"Managed retreat (realignment)", detail:"Allowing some areas to flood naturally — removing or not building defences. Compensating landowners. Creates new salt marsh habitat. Controversial — losing farmland and sometimes homes.", formula:"Soft engineering · e.g. Abbotts Hall Farm, Essex" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Groynes create problems downstream:</strong> By trapping sediment, they starve beaches further along the coast of material — causing erosion at the next settlement. This is called 'terminal groyne syndrome'." },
    { icon:"⭐", text:"<strong>Managed retreat is increasingly favoured</strong> as climate change raises sea levels — it is cheaper long-term and creates valuable salt marsh habitat that itself absorbs waves." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying hard engineering is always better. It is more durable but much more expensive, can cause problems elsewhere, and is unsustainable as sea levels rise." },
    { text:"<strong>Common mistake:</strong> Forgetting to evaluate — always say advantages AND disadvantages of each method." },
  ],
  practice:[
    { q:"What is the difference between hard and soft engineering?", opts:["Hard is for beaches, soft is for cliffs","Hard engineering uses artificial structures to resist erosion; soft engineering works with natural processes to manage it more sustainably","Hard is cheaper","Soft engineering uses concrete"], ans:1, exp:"<strong>Hard</strong> = artificial structures (sea walls, groynes, rock armour) to resist erosion. <strong>Soft</strong> = works with natural processes (beach nourishment, dune regeneration, managed retreat)." },
    { q:"Groynes can cause problems because:", opts:["They are ugly","By trapping sediment on one side, they starve beaches further along the coast — causing erosion there","They are too expensive","They don't work"], ans:1, exp:"<strong>Groynes trap sediment</strong> moving along the coast by longshore drift — starving beaches further down, which then erode faster. This is called terminal groyne syndrome." },
    { q:"Beach nourishment is an example of soft engineering because:", opts:["It uses large boulders","It adds sand/pebbles to widen the beach, working with natural processes — wider beaches naturally absorb more wave energy","It is very expensive","It uses concrete"], ans:1, exp:"<strong>Beach nourishment</strong> adds sediment to widen the beach — a wider beach naturally absorbs wave energy. It works with the natural environment rather than against it." },
    { q:"Managed retreat involves:", opts:["Building bigger sea walls","Allowing areas of low-value land to flood naturally, creating salt marsh — cheaper long-term and creates wildlife habitat","Removing all coastal buildings","Only used in USA"], ans:1, exp:"<strong>Managed retreat</strong> = allowing low-value land to flood, creating salt marsh. Cheaper long-term than hard engineering, creates habitat and is more sustainable as sea levels rise." },
  ],
  prevLesson:{ key:"coasts-spits", label:"Spits" },
  nextLesson:null
},



/* ════════ SPANISH — HOUSE AND HOME ════════ */
"sp-house-types": {
  topic:"House and Home", topicKey:"House and Home", theme:"coral", icon:"🏠",
  title:"Where You Live and Types of House",
  subtitle:"Describing where you live, what type of home you have and where it is located.",
  keyIdea:{ rule:"Use 'Vivo en…' (I live in…) + type of home + location. Adjectives must AGREE with the noun.", detail:"The verb 'vivir' is an IR verb. The key phrase is 'vivo en' (I live in). Always add detail about the type of home and where it is." },
  formulae:[
    { main:"Vivo en + [place] · en + [una casa / un piso / una granja]", note:"vivo = I live · vives = you live · vive = he/she lives" },
    { main:"en el norte / sur / este / oeste · en las afueras · en el centro", note:"in the north/south/east/west · on the outskirts · in the centre" },
  ],
  steps:[
    { title:"Types of home", detail:"una casa = a house · un piso = a flat · una granja = a farm · un apartamento = an apartment · un chalet = a detached house", formula:"" },
    { title:"Where it is", detail:"en un pueblo = in a village · en una ciudad = in a city · en el campo = in the countryside · en la costa = on the coast", formula:"" },
    { title:"Describe the home", detail:"Add an adjective — remember it must AGREE: una casa grande, un piso pequeño, una casa antigua", formula:"" },
    { title:"Full sentence example", detail:"Vivo en Farnborough, un pueblo pequeño en el sur de Inglaterra. Vivo con mi familia en una casa grande.", formula:"" },
  ],
  worked:[{ q:"Describe where you live", lines:[
    { step:"Where", expr:"Vivo en Manchester,", why:"I live in Manchester" },
    { step:"Type of place", expr:"una ciudad grande", why:"a big city — adjective agrees (feminine)" },
    { step:"Location", expr:"en el norte de Inglaterra.", why:"in the north of England" },
    { step:"Home type", expr:"Vivo en un piso moderno", why:"I live in a modern flat — adjective agrees (masculine)" },
    { step:"With whom", expr:"con mi familia.", why:"with my family", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Ciudad is feminine:</strong> una ciudad grande (not 'grand'). Pueblo is masculine: un pueblo pequeño. Adjectives must match the gender." },
    { icon:"⭐", text:"<strong>Speaking test tip:</strong> ¿Dónde vives? → always add WHERE (town + region), WHAT TYPE of home, and one describing adjective." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Vivo en una piso' — piso is masculine: 'un piso'." },
    { text:"<strong>Common mistake:</strong> Forgetting adjective agreement — 'una casa moderno' is wrong. Casa is feminine → 'una casa moderna'." },
  ],
  practice:[
    { q:"'I live in a small village' in Spanish:", opts:["Vivo en un ciudad pequeña","Vivo en un pueblo pequeño","Vivo en una pueblo pequeña","Vivo en un pueblo pequeña"], ans:1, exp:"Pueblo is masculine → <strong>un pueblo pequeño</strong>." },
    { q:"'En el sur de España' means:", opts:["In the east of Spain","In the north of Spain","In the south of Spain","On the coast of Spain"], ans:2, exp:"<strong>sur = south</strong>. Norte = north, este = east, oeste = west." },
    { q:"Which is correct for 'a big city'?", opts:["un ciudad grande","una ciudad grande","una ciudad granda","un ciudad grandes"], ans:1, exp:"Ciudad is feminine → <strong>una ciudad grande</strong>. Note: grande doesn't change for masculine/feminine — only for singular/plural." },
    { q:"'Vivo con mi familia' means:", opts:["I live alone","I live with my friends","I live with my family","I live near my family"], ans:2, exp:"<strong>Vivo con mi familia = I live with my family.</strong> Con = with." },
  ],
  prevLesson:null,
  nextLesson:{ key:"sp-rooms", label:"Rooms in the House" }
},

"sp-rooms": {
  topic:"House and Home", topicKey:"House and Home", theme:"coral", icon:"🏠",
  title:"Rooms in the House",
  subtitle:"Naming the rooms and saying what is in your house.",
  keyIdea:{ rule:"Use 'En mi casa hay…' (In my house there is/are…) + room vocabulary. Know the gender of each room.", detail:"'Hay' means 'there is' or 'there are' — use it for both singular and plural. 'No hay' = there isn't/aren't." },
  formulae:[
    { main:"En mi casa hay + [room] · No hay + [room]", note:"hay = there is / there are" },
    { main:"En mi [room] hay + [furniture/item]", note:"e.g. En mi dormitorio hay una cama." },
  ],
  steps:[
    { title:"Key rooms vocabulary", detail:"el salón = living room · la cocina = kitchen · el dormitorio = bedroom · el baño = bathroom · el jardín = garden · el comedor = dining room · el garaje = garage · el pasillo = hallway", formula:"" },
    { title:"Sentence pattern", detail:"En mi casa hay un salón grande y tres dormitorios.", formula:"In my house there is a big living room and three bedrooms." },
    { title:"Add adjectives", detail:"grande (big) · pequeño/a (small) · moderno/a (modern) · antiguo/a (old) · luminoso/a (bright)", formula:"Remember: adjective agrees with the room (noun gender)" },
    { title:"Extra detail", detail:"Mi dormitorio es pequeño pero bonito. → My bedroom is small but pretty.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Gender of rooms:</strong> el salón, el dormitorio, el baño, el comedor, el jardín, el garaje (all masculine). la cocina (feminine). Know which is which!" },
    { icon:"⭐", text:"<strong>Speaking tip:</strong> Don't just list rooms. Add an adjective: 'En mi casa hay una cocina moderna y un salón grande.'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'la dormitorio' — it's EL dormitorio (masculine)." },
    { text:"<strong>Common mistake:</strong> 'Hay una salón grande' — salón is masculine: 'hay un salón grande'." },
  ],
  practice:[
    { q:"'En mi casa hay una cocina moderna' means:", opts:["In my house there is a modern kitchen","In my kitchen there is a modern house","My house is a modern kitchen","There is no kitchen"], ans:0, exp:"<strong>En mi casa hay una cocina moderna = In my house there is a modern kitchen.</strong>" },
    { q:"Which room is masculine?", opts:["la cocina","la ducha","el dormitorio","la habitación"], ans:2, exp:"<strong>El dormitorio</strong> is masculine. La cocina, la ducha and la habitación are all feminine." },
    { q:"'No hay jardín' means:", opts:["There is a big garden","There is no garden","The garden is big","I like the garden"], ans:1, exp:"<strong>No hay = there isn't / there is no.</strong> No hay jardín = there is no garden." },
    { q:"Best answer to 'Háblame de tu casa':", opts:["Mi casa es grande.","En mi casa hay un salón grande, tres dormitorios y una cocina moderna. Mi dormitorio es pequeño pero bonito.","No sé.","Hay una casa."], ans:1, exp:"Best answer: <strong>list rooms + adjectives + add a detail about your own room</strong>." },
  ],
  prevLesson:{ key:"sp-house-types", label:"Types of House" },
  nextLesson:{ key:"sp-furniture", label:"Furniture" }
},

"sp-furniture": {
  topic:"House and Home", topicKey:"House and Home", theme:"coral", icon:"🏠",
  title:"Furniture",
  subtitle:"Naming furniture items and using them in sentences with prepositions.",
  keyIdea:{ rule:"Know the key furniture vocabulary plus their genders — you need these to use prepositions correctly", detail:"Furniture vocabulary is most useful when combined with prepositions (next to, in front of etc) to describe a room precisely." },
  formulae:[
    { main:"En mi [room] hay + [furniture] + [adjective]", note:"e.g. En mi dormitorio hay una cama grande." },
  ],
  steps:[
    { title:"Bedroom furniture", detail:"la cama = bed · el armario = wardrobe · la mesilla = bedside table · la lámpara = lamp · la alfombra = rug · el escritorio = desk · la estantería = bookshelf", formula:"" },
    { title:"Living room / kitchen", detail:"el sofá = sofa · la mesa = table · la silla = chair · el televisor = TV · el frigorífico = fridge · el horno = oven · el microondas = microwave", formula:"" },
    { title:"Bathroom", detail:"la ducha = shower · la bañera = bath · el lavabo = sink · el espejo = mirror · el váter = toilet", formula:"" },
    { title:"Using in sentences", detail:"En mi dormitorio hay una cama y un armario grande. Al lado de la cama hay una mesilla.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Gender shortcuts:</strong> Most furniture ending in -a is feminine (la cama, la silla, la mesa, la ducha). Most ending in -o is masculine (el armario, el sofá is an exception)." },
    { icon:"⭐", text:"<strong>For the exam:</strong> You don't need to know every piece of furniture — focus on bedroom and living room items. Know at least 6–8 items confidently." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'el mesa' — mesa is feminine: 'la mesa'." },
    { text:"<strong>Common mistake:</strong> 'el silla' — silla is feminine: 'la silla'." },
  ],
  practice:[
    { q:"'La cama' means:", opts:["The kitchen","The bed","The wardrobe","The bathroom"], ans:1, exp:"<strong>La cama = the bed.</strong> Bedroom = el dormitorio." },
    { q:"Which is correct for 'a big wardrobe'?", opts:["una armario grande","un armaria grande","un armario grande","la armario grande"], ans:2, exp:"Armario is masculine → <strong>un armario grande</strong>." },
    { q:"'En mi dormitorio hay una cama y un escritorio' means:", opts:["In my kitchen there is a bed and a desk","In my bedroom there is a bed and a desk","In my bedroom there is a bath and a chair","In my living room there is a sofa and a TV"], ans:1, exp:"<strong>Dormitorio = bedroom · cama = bed · escritorio = desk.</strong>" },
    { q:"'El sofá' is:", opts:["Feminine","Masculine — even though it ends in -a, sofá is masculine","Plural","Invariable"], ans:1, exp:"<strong>El sofá is masculine</strong> — an exception. Most words ending in -a are feminine, but sofá is not." },
  ],
  prevLesson:{ key:"sp-rooms", label:"Rooms in the House" },
  nextLesson:{ key:"sp-prepositions", label:"Prepositions" }
},

"sp-prepositions": {
  topic:"House and Home", topicKey:"House and Home", theme:"coral", icon:"🏠",
  title:"Prepositions — Where Things Are",
  subtitle:"Using Spanish prepositions of place to say exactly where furniture and places are.",
  keyIdea:{ rule:"Prepositions tell you WHERE something is. Most Spanish prepositions of place are followed by 'de' — which contracts with 'el' to form 'del'", detail:"Key contraction: de + el = del. So 'al lado de el armario' becomes 'al lado del armario'." },
  formulae:[
    { main:"de + el = del (e.g. al lado del armario = next to the wardrobe)", note:"Only contracts with 'el' (masculine singular). la/los/las stay as they are." },
    { main:"a + el = al (e.g. voy al colegio = I go to school)", note:"" },
  ],
  steps:[
    { title:"Key prepositions", detail:"al lado de = next to · delante de = in front of · detrás de = behind · encima de = on top of · debajo de = under/below · entre = between · enfrente de = opposite · cerca de = near · lejos de = far from", formula:"" },
    { title:"De + el → del", detail:"al lado de + el armario = al lado del armario · encima de + el sofá = encima del sofá", formula:"" },
    { title:"De + la stays as 'de la'", detail:"al lado de + la cama = al lado de la cama · detrás de + la mesa = detrás de la mesa", formula:"" },
    { title:"Full sentences", detail:"El televisor está encima del armario. La lámpara está al lado de la cama. El sofá está delante de la ventana.", formula:"" },
  ],
  compare:[
    { good:"La silla está delante de la mesa.", bad:"La silla está delante de el mesa." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Always check:</strong> Is the next noun masculine (el) or feminine (la)? If masculine → del. If feminine → de la." },
    { icon:"⭐", text:"<strong>'Está' vs 'hay':</strong> Use 'hay' for 'there is' (existence). Use 'está/están' for 'it is located' (position). La cama está al lado del armario." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'al lado de el sofá' — must contract: 'al lado del sofá'." },
    { text:"<strong>Common mistake:</strong> Using 'hay' instead of 'está' for location: 'El sofá hay delante' is wrong. Use 'El sofá está delante de…'" },
  ],
  practice:[
    { q:"'Al lado del armario' uses 'del' because:", opts:["Armario ends in -o","De + el contracts to del — armario is masculine (el armario)","All prepositions use del","It's before a verb"], ans:1, exp:"<strong>de + el = del.</strong> Armario is masculine (el armario) → al lado DE EL armario → al lado DEL armario." },
    { q:"'Debajo de la cama' means:", opts:["Next to the bed","In front of the bed","Under the bed","Behind the bed"], ans:2, exp:"<strong>Debajo de = under / below.</strong> La cama = the bed." },
    { q:"Translate: 'The TV is on top of the wardrobe'", opts:["El televisor está debajo del armario","El televisor está encima del armario","El televisor está detrás de la armario","El televisor hay encima del armario"], ans:1, exp:"Encima de = on top of · armario is masculine → <strong>El televisor está encima del armario.</strong>" },
    { q:"'Enfrente de la ventana' means:", opts:["Next to the window","Under the window","Behind the window","Opposite the window"], ans:3, exp:"<strong>Enfrente de = opposite.</strong> La ventana = the window." },
  ],
  prevLesson:{ key:"sp-furniture", label:"Furniture" },
  nextLesson:{ key:"sp-town", label:"Your Town" }
},

"sp-town": {
  topic:"House and Home", topicKey:"House and Home", theme:"coral", icon:"🏠",
  title:"What There Is in Your Town and What You Can Do",
  subtitle:"Describing your town — places, adjectives and activities using 'se puede'.",
  keyIdea:{ rule:"Use 'En mi ciudad/pueblo hay…' to say what there is. Use 'Se puede…' + infinitive to say what you can do there.", detail:"'Se puede' literally means 'one can' — it's impersonal and always followed by an infinitive (the -ar/-er/-ir form of the verb)." },
  formulae:[
    { main:"En mi ciudad/pueblo hay + [place]", note:"hay = there is/are" },
    { main:"Se puede + infinitive = you can / one can", note:"Se puede nadar = you can swim" },
    { main:"No hay / No se puede = there isn't / you can't", note:"For negatives" },
  ],
  steps:[
    { title:"Places in town", detail:"una piscina = a swimming pool · un polideportivo = a sports centre · una biblioteca = a library · un parque = a park · un mercado = a market · una iglesia = a church · un cine = a cinema · una tienda = a shop · un museo = a museum · una plaza = a square", formula:"" },
    { title:"Adjectives for places", detail:"bonito/a · grande · pequeño/a · moderno/a · antiguo/a · tranquilo/a (quiet/peaceful) · animado/a (lively) · ruidoso/a (noisy) · aburrido/a (boring)", formula:"" },
    { title:"What you can do", detail:"Se puede nadar = you can swim · ir de compras = go shopping · jugar al fútbol = play football · visitar los monumentos = visit the monuments · salir con amigos = go out with friends · ir al cine = go to the cinema", formula:"" },
    { title:"Full answer", detail:"En mi ciudad hay una piscina grande donde se puede nadar. También hay un parque bonito. Sin embargo, no hay un cine.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>'Sin embargo' = however</strong> — great connective for the speaking/writing exam. Show you can give balanced opinions: hay… pero/sin embargo, no hay…" },
    { icon:"⭐", text:"<strong>Speaking question 3 and 4:</strong> ¿Qué hay en tu ciudad? AND ¿Qué se puede hacer? — prepare one answer that covers both using 'Hay… donde se puede…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Se puede nada' — after se puede, use the INFINITIVE: 'Se puede nadar' (not the conjugated form)." },
    { text:"<strong>Common mistake:</strong> 'Hay una polideportivo' — polideportivo is masculine: 'un polideportivo'." },
  ],
  practice:[
    { q:"'Se puede nadar' means:", opts:["I swim","You must swim","You can swim (one can swim)","I am going to swim"], ans:2, exp:"<strong>Se puede + infinitive = you can / one can.</strong> Nadar = to swim." },
    { q:"'En mi pueblo hay una biblioteca antigua' means:", opts:["In my town there is a new library","In my village there is an old library","In my city there is an ancient library","My library is big"], ans:1, exp:"<strong>Pueblo = village · biblioteca = library · antigua = old (feminine, agrees with biblioteca).</strong>" },
    { q:"How do you say 'however, there is no cinema'?", opts:["Pero hay un cine","Sin embargo, no hay un cine","También hay un cine","Hay un cine grande"], ans:1, exp:"<strong>Sin embargo = however · no hay = there is no</strong> · un cine = a cinema." },
    { q:"'Ir de compras' means:", opts:["To swim","To visit monuments","To go shopping","To go to the cinema"], ans:2, exp:"<strong>Ir de compras = to go shopping.</strong> Useful with 'se puede ir de compras'." },
  ],
  prevLesson:{ key:"sp-prepositions", label:"Prepositions" },
  nextLesson:{ key:"sp-subjects", label:"School Subjects" }
},

/* ════════ SPANISH — SCHOOL ════════ */
"sp-subjects": {
  topic:"School", topicKey:"School", theme:"blue", icon:"🎒",
  title:"School Subjects, Opinions and Adjectives",
  subtitle:"Naming subjects in Spanish and giving opinions using me gusta/me gustan and descriptive adjectives.",
  keyIdea:{ rule:"Use 'Me gusta(n)…' for likes and 'No me gusta(n)…' for dislikes. Add 'porque es/son…' + adjective to give a reason.", detail:"Me gusta + singular or infinitive. Me gustan + plural. Adjectives must agree with the subject (noun), not with 'me'." },
  formulae:[
    { main:"Me gusta + [singular noun or infinitive] · Me gustan + [plural noun]", note:"Me gusta el inglés · Me gustan las matemáticas" },
    { main:"(No) me gusta(n)… porque es/son + adjective", note:"porque = because · es = it is · son = they are" },
  ],
  steps:[
    { title:"Subject vocabulary", detail:"el inglés · las matemáticas · las ciencias · la historia · la geografía · el español · el arte · la educación física (EF) · la informática · la música · la tecnología · el drama", formula:"" },
    { title:"Opinion phrases", detail:"Me gusta(n) = I like · Me encanta(n) = I love · No me gusta(n) = I don't like · Odio = I hate · Me interesa(n) = I find interesting · Me aburre(n) = I find boring", formula:"" },
    { title:"Adjectives for opinions", detail:"fácil = easy · difícil = difficult · interesante = interesting · aburrido/a = boring · divertido/a = fun · útil = useful · inútil = useless · emocionante = exciting · importante = important", formula:"" },
    { title:"Full sentences", detail:"Me gusta el español porque es interesante y útil. No me gustan las matemáticas porque son difíciles y aburridas.", formula:"" },
  ],
  worked:[{ q:"Give an opinion about two subjects", lines:[
    { step:"Like", expr:"Me encanta el inglés", why:"I love English" },
    { step:"Reason", expr:"porque es interesante y útil.", why:"because it is interesting and useful" },
    { step:"Dislike", expr:"No me gustan las ciencias", why:"I don't like science (plural → gustan)" },
    { step:"Reason", expr:"porque son difíciles y aburridas.", why:"because they are difficult and boring (plural adjective)", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Me gusta vs me gustan:</strong> Think of it as 'it pleases me' vs 'they please me'. The verb changes to match the subject (the thing liked), not the person." },
    { icon:"⭐", text:"<strong>Adjective agreement:</strong> After 'son' (they are), the adjective must be plural: 'son difíciles' · 'son aburridas' (las ciencias is feminine plural)." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Me gusta las matemáticas' — matemáticas is plural: 'Me GUSTAN las matemáticas'." },
    { text:"<strong>Common mistake:</strong> 'son aburrido' — after 'son' with a plural feminine noun, use feminine plural: 'son aburridas'." },
  ],
  practice:[
    { q:"'Me gustan las ciencias' is correct because:", opts:["Las ciencias uses gustan as it's a plural noun — the verb agrees with the subject, not the person","It's always gustan","Ciencias is feminine","Me always takes gustan"], ans:0, exp:"<strong>Me gustan</strong> because las ciencias is <strong>plural</strong> — the verb agrees with what is liked (plural noun = gustan)." },
    { q:"'El español es útil' — 'útil' doesn't change because:", opts:["It's an irregular adjective","Adjectives ending in a consonant don't change for gender — only for number (útiles = plural)","It's wrong","Spanish adjectives never change"], ans:1, exp:"<strong>Adjectives ending in a consonant</strong> (like -l, -z) don't change for masculine/feminine. They change for plural: útil → útiles." },
    { q:"Translate: 'I love history because it is interesting'", opts:["Me gusta la historia porque son interesante","Me encanta la historia porque es interesante","Me encantan la historia porque es interesante","Me gusta los historia porque es interesante"], ans:1, exp:"Historia is singular feminine → <strong>me encanta (singular) · la historia · porque es interesante</strong>." },
    { q:"'No me gustan las matemáticas porque son difíciles' — what is the adjective 'difíciles'?", opts:["Masculine singular","Feminine singular","Plural — agreeing with las matemáticas (plural)","Irregular"], ans:2, exp:"<strong>Difíciles is plural</strong> — agreeing with 'las matemáticas' (plural noun). Difícil → difíciles." },
  ],
  prevLesson:{ key:"sp-town", label:"Your Town" },
  nextLesson:{ key:"sp-time", label:"Telling the Time" }
},

"sp-time": {
  topic:"School", topicKey:"School", theme:"blue", icon:"🎒",
  title:"Telling the Time",
  subtitle:"¿Qué hora es? — asking and telling the time in Spanish.",
  keyIdea:{ rule:"'Es la una' for 1 o'clock. 'Son las + number' for all other hours. Add 'y' for past, 'menos' for to.", detail:"The key rule: use 'es' for 1 o'clock (singular) and 'son' for everything else (plural)." },
  formulae:[
    { main:"¿Qué hora es? = What time is it?", note:"¿A qué hora…? = At what time…?" },
    { main:"Es la una (it's 1 o'clock) · Son las dos/tres/cuatro… (it's 2/3/4…)", note:"Es = singular (1). Son = plural (all others)." },
    { main:"y cuarto = quarter past · y media = half past · menos cuarto = quarter to", note:"Son las tres y media = it's half past three" },
  ],
  steps:[
    { title:"On the hour", detail:"Son las dos = it's 2 o'clock · Son las ocho = it's 8 o'clock · Es la una = it's 1 o'clock · Son las doce = it's 12 o'clock", formula:"" },
    { title:"Past the hour (y)", detail:"Son las tres y diez = 3:10 · Son las cuatro y cuarto = 4:15 · Son las cinco y media = 5:30", formula:"y = and (past)" },
    { title:"To the hour (menos)", detail:"Son las cuatro menos cuarto = 3:45 (quarter to 4) · Son las seis menos diez = 5:50 (ten to 6)", formula:"menos = minus/to" },
    { title:"Morning / afternoon / night", detail:"de la mañana = in the morning (am) · de la tarde = in the afternoon (pm) · de la noche = at night", formula:"Son las ocho de la mañana = 8am" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Why 'es' for 1?</strong> 'La una' is singular (one hour), so we use 'es' (is). All other times are plural hours, so we use 'son' (are)." },
    { icon:"⭐", text:"<strong>Exam use:</strong> ¿A qué hora tienes inglés? → Tengo inglés a las nueve y media. Always use 'a las' for 'at [time]'." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Son la una' — must be 'Es LA una' (singular)." },
    { text:"<strong>Common mistake:</strong> 'Son las seis y cuarto menos' — wrong order. It's 'Son las seis menos cuarto' (quarter TO six = 5:45)." },
  ],
  practice:[
    { q:"How do you say 'It's half past three'?", opts:["Es las tres y media","Son las tres y media","Son la tres y media","Son las tres menos media"], ans:1, exp:"Three o'clock = plural → <strong>Son las tres</strong> · y media = half past → <strong>Son las tres y media.</strong>" },
    { q:"'Son las ocho menos cuarto' means:", opts:["8:15","8:45","7:45","8:30"], ans:2, exp:"Son las ocho menos cuarto = <strong>quarter TO eight = 7:45</strong>. Menos cuarto = minus a quarter." },
    { q:"Why is it 'Es la una' not 'Son las una'?", opts:["Una is feminine","La una is singular — 'es' is used because there is only one hour","It's irregular","Tradition"], ans:1, exp:"La una is <strong>singular</strong> — we say 'es' (it is) for singular. All other times use 'son' (they are) because they are plural." },
    { q:"'A las nueve de la mañana' means:", opts:["At 9pm","At nine in the morning (9am)","At half past nine","At nine in the afternoon"], ans:1, exp:"<strong>A las nueve = at nine · de la mañana = in the morning</strong> = at 9am." },
  ],
  prevLesson:{ key:"sp-subjects", label:"Subjects and Opinions" },
  nextLesson:{ key:"sp-timetable", label:"Describing Your Timetable" }
},

"sp-timetable": {
  topic:"School", topicKey:"School", theme:"blue", icon:"🎒",
  title:"Describing Your Timetable",
  subtitle:"Saying what you study, on which days and at what time — using key time expressions.",
  keyIdea:{ rule:"Use days of the week + study verbs + subjects + time expressions to describe your timetable. The near future (voy a + infinitive) is needed for question 6 in the speaking test.", detail:"For the speaking test, question 5 asks what you study now (present tense) and question 6 asks what you will study in the future (near future tense)." },
  formulae:[
    { main:"Los [day] estudio/tengo + [subject] + a las/por la [time]", note:"e.g. Los lunes, estudio inglés por la mañana." },
    { main:"Los + day = on [days] (plural — habitual action)", note:"Los lunes = on Mondays · Los martes = on Tuesdays" },
  ],
  steps:[
    { title:"Days of the week", detail:"lunes · martes · miércoles · jueves · viernes · sábado · domingo (all lowercase in Spanish)", formula:"Los lunes = on Mondays (plural: habitual)" },
    { title:"Time expressions", detail:"por la mañana = in the morning · por la tarde = in the afternoon · primero = first · luego/después = then/afterwards · a las… = at [time]", formula:"" },
    { title:"Describing today's timetable", detail:"Los lunes, tengo inglés a las nueve y luego matemáticas a las diez y cuarto. Por la tarde, tengo educación física.", formula:"" },
    { title:"Present and near future", detail:"Present: Estudio inglés y español. Near future: En el futuro, voy a estudiar teatro porque me parece interesante.", formula:"" },
  ],
  worked:[{ q:"Answer: ¿Qué asignaturas estudias? and ¿Qué vas a estudiar en el futuro?", lines:[
    { step:"Present", expr:"Los lunes, estudio inglés por la mañana", why:"On Mondays, I study English in the morning" },
    { step:"Present+", expr:"y español por la tarde.", why:"and Spanish in the afternoon" },
    { step:"Also", expr:"Los martes, tengo ciencias y matemáticas.", why:"On Tuesdays, I have science and maths" },
    { step:"Future", expr:"En el futuro, voy a estudiar teatro", why:"In the future, I am going to study drama" },
    { step:"Reason", expr:"porque me parece interesante.", why:"because I find it interesting", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Speaking question 6:</strong> ¿Qué vas a estudiar en el futuro? → MUST use near future: 'Voy a estudiar + [subject] + porque…'. Give a reason!" },
    { icon:"⭐", text:"<strong>'Me parece'</strong> = I find it (literally 'it seems to me'). More sophisticated than just 'es' — good for the exam." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'El lunes estudio…' for a habitual action. Habitual = 'LOS lunes' (every Monday). 'El lunes' = this Monday (specific)." },
    { text:"<strong>Common mistake:</strong> 'Voy a estudio' — near future needs the INFINITIVE: 'Voy a estudiar'." },
  ],
  practice:[
    { q:"'Los martes tengo matemáticas' means:", opts:["I had maths on Tuesday","I have maths on Tuesday (specifically)","On Tuesdays I have maths (every Tuesday)","On Tuesday I am going to have maths"], ans:2, exp:"<strong>Los martes = every Tuesday (habitual)</strong>. The plural 'los' signals a regular/repeated action." },
    { q:"How do you answer 'What are you going to study in the future?' using near future?", opts:["Estudio teatro","Estudié teatro","Voy a estudiar teatro porque me parece interesante","Voy estudiar teatro"], ans:2, exp:"Near future = <strong>Voy a + infinitive</strong>: 'Voy a estudiar teatro porque me parece interesante'." },
    { q:"'Por la tarde' means:", opts:["In the morning","At night","In the afternoon","At lunchtime"], ans:2, exp:"<strong>Por la tarde = in the afternoon.</strong> Por la mañana = in the morning. Por la noche = at night." },
    { q:"'Primero tengo inglés, luego tengo historia' means:", opts:["First I have history, then English","First I have English, then history","I have English and history at the same time","I don't have English or history"], ans:1, exp:"<strong>Primero = first · luego = then.</strong> Primero tengo inglés, luego tengo historia = First I have English, then history." },
  ],
  prevLesson:{ key:"sp-time", label:"Telling the Time" },
  nextLesson:{ key:"sp-school-facilities", label:"School Facilities" }
},

"sp-school-facilities": {
  topic:"School", topicKey:"School", theme:"blue", icon:"🎒",
  title:"Facilities at School",
  subtitle:"Describing what your school has — buildings, facilities and giving opinions.",
  keyIdea:{ rule:"Use 'En mi insti hay…' to describe your school's facilities. 'Insti' is informal for 'instituto' (school). Add opinions and adjectives for higher marks.", detail:"Speaking question 7: ¿Qué hay en tu insti? — give at least 2–3 facilities with adjectives." },
  formulae:[
    { main:"En mi insti hay + [facility] + [adjective]", note:"e.g. En mi insti hay un campo de fútbol grande." },
    { main:"No hay + [facility] pero hay… = There isn't… but there is…", note:"Shows balance in your answer" },
  ],
  steps:[
    { title:"School facilities vocabulary", detail:"un campo de fútbol = a football pitch · una piscina = a swimming pool · un laboratorio = a lab · una biblioteca = a library · una sala de ordenadores = a computer room · un gimnasio = a gym · una cantina = a canteen · un teatro = a theatre · una sala de música = a music room", formula:"" },
    { title:"Give opinions", detail:"Es muy moderno/a = it's very modern · Está bien equipado/a = it's well equipped · Por desgracia, no hay… = unfortunately, there isn't…", formula:"" },
    { title:"Full answer", detail:"En mi insti hay un campo de fútbol grande y una biblioteca moderna. También hay una sala de ordenadores bien equipada. Por desgracia, no hay una piscina.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>'Por desgracia'</strong> = unfortunately. Excellent for the speaking/writing exam — shows you can express regret and add contrast." },
    { icon:"⭐", text:"<strong>Don't forget:</strong> campo de fútbol is masculine (un campo), biblioteca is feminine (una biblioteca). Gender affects the adjective." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'una campo de fútbol' — campo is masculine: 'un campo de fútbol'." },
    { text:"<strong>Common mistake:</strong> Only listing facilities without adjectives. Always add at least one describing word." },
  ],
  practice:[
    { q:"'En mi insti hay una sala de ordenadores' means:", opts:["In my school there is a science lab","In my school there is a computer room","In my town there is a computer room","In my school there is no computer room"], ans:1, exp:"<strong>En mi insti hay = in my school there is · una sala de ordenadores = a computer room.</strong>" },
    { q:"'Por desgracia, no hay una piscina' means:", opts:["Fortunately there is a pool","There is a big pool","Unfortunately there is no swimming pool","The pool is big"], ans:2, exp:"<strong>Por desgracia = unfortunately · no hay = there is no · una piscina = a swimming pool.</strong>" },
    { q:"Which is correct for 'a well-equipped lab'?", opts:["un laboratorio bien equipada","un laboratorio bien equipado","una laboratorio bien equipado","un laboratoria bien equipado"], ans:1, exp:"Laboratorio is masculine → <strong>un laboratorio bien equipado</strong> (masculine adjective)." },
    { q:"Best answer to '¿Qué hay en tu insti?'", opts:["Hay cosas.","En mi insti hay un campo de fútbol grande y una biblioteca moderna. También hay una cantina. Por desgracia, no hay una piscina.","No sé.","Mi insti es grande."], ans:1, exp:"Best answer: <strong>2–3 facilities + adjectives + contrast with 'por desgracia, no hay…'</strong>." },
  ],
  prevLesson:{ key:"sp-timetable", label:"Describing Your Timetable" },
  nextLesson:{ key:"sp-uniform", label:"Uniform — Clothes and Colours" }
},

"sp-uniform": {
  topic:"School", topicKey:"School", theme:"blue", icon:"🎒",
  title:"Uniform — Clothes and Colours",
  subtitle:"Describing what you wear for school uniform using 'llevo' and colour adjectives.",
  keyIdea:{ rule:"Use 'Llevo…' (I wear) + clothing item + colour. Colour adjectives must agree with the clothing noun. Use 'se lleva' for 'one wears/you wear' (impersonal).", detail:"'Llevo' comes from the verb 'llevar' (to wear/to carry). It follows regular AR verb patterns." },
  formulae:[
    { main:"Llevo + [clothing] + [colour]", note:"e.g. Llevo una camisa blanca y un pantalón negro." },
    { main:"Colour adjectives agree: blanco/blanca/blancos/blancas", note:"Colours ending in -o change for gender/number" },
  ],
  steps:[
    { title:"Clothing vocabulary", detail:"una camisa = a shirt · un pantalón = trousers · una falda = a skirt · una corbata = a tie · unos zapatos = shoes · un jersey = a jumper/sweater · una chaqueta = a blazer/jacket · unos calcetines = socks · una camiseta = a t-shirt", formula:"" },
    { title:"Colours — agree with the noun", detail:"blanco/a = white · negro/a = black · rojo/a = red · azul = blue · verde = green · gris = grey · amarillo/a = yellow · marrón = brown · naranja = orange (invariable)", formula:"Colours ending in -o change: blanco/blanca" },
    { title:"Colours that don't change for gender", detail:"azul · verde · gris · marrón · naranja · rosa · violeta · these stay the same for m/f", formula:"una camisa azul (not 'azula')" },
    { title:"Full sentences", detail:"Para el uniforme, llevo una camisa blanca, un pantalón negro y unos zapatos negros.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Two rules for colour agreement:</strong> (1) Colours ending in -o change for gender: blanco/blanca. (2) Other colours (azul, verde, gris) don't change for gender but DO change for plural: azules, verdes, grises." },
    { icon:"⭐", text:"<strong>Speaking Q8:</strong> ¿Llevas uniforme? → Sí, llevo una camisa blanca… · Buena suerte!" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'una camisa blanco' — camisa is feminine: 'una camisa blanca'." },
    { text:"<strong>Common mistake:</strong> 'una corbata azula' — azul doesn't change for gender: 'una corbata azul'." },
  ],
  practice:[
    { q:"'Llevo una falda negra' means:", opts:["I wear black trousers","I wear a black skirt","I wear a black blazer","I wear black shoes"], ans:1, exp:"<strong>Llevo = I wear · una falda = a skirt · negra = black (feminine, agreeing with falda).</strong>" },
    { q:"Why is it 'una camisa blanca' not 'blanco'?", opts:["Blanca is more common","Camisa is feminine — colour adjectives ending in -o change to -a for feminine nouns","Blanco is for school only","It's irregular"], ans:1, exp:"<strong>Camisa is feminine (la camisa)</strong>. Blanco/blanca changes for gender → una camisa BLANCA." },
    { q:"'Unos zapatos negros' — why 'negros' not 'negro'?", opts:["Zapatos are black","Zapatos is plural — the adjective must be plural too (negro → negros)","Unos requires -os","It's wrong"], ans:1, exp:"<strong>Zapatos is plural</strong> (unos zapatos = some shoes). Adjectives must agree in number: negro → negros." },
    { q:"Which colour never changes for gender?", opts:["rojo","blanco","negro","azul"], ans:3, exp:"<strong>Azul</strong> doesn't change for gender (una camisa azul, un pantalón azul). It only changes for plural: azules." },
  ],
  prevLesson:{ key:"sp-school-facilities", label:"School Facilities" },
  nextLesson:{ key:"sp-adjectives", label:"Adjective Agreement" }
},

/* ════════ SPANISH — GRAMMAR ════════ */
"sp-adjectives": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"Adjective Agreement",
  subtitle:"How adjectives must match the noun they describe in gender (masculine/feminine) and number (singular/plural).",
  keyIdea:{ rule:"Adjectives in Spanish AGREE with the noun: masculine or feminine, singular or plural. They usually come AFTER the noun.", detail:"This is one of the most tested grammar points in the exam. Every adjective must match its noun in both gender and number." },
  formulae:[
    { main:"Masculine singular: bonito · Feminine singular: bonita", note:"Most adjectives ending in -o change to -a for feminine" },
    { main:"Plural: add -s (bonitos/bonitas) · or -es if ends in consonant (azul→azules)", note:"" },
    { main:"Adjectives not ending in -o/a: same for m/f, only change for plural (grande→grandes, azul→azules)", note:"" },
  ],
  steps:[
    { title:"Step 1: Find the gender of the noun", detail:"Is it masculine (el/un) or feminine (la/una)?", formula:"el piso = masculine · la casa = feminine" },
    { title:"Step 2: Is it singular or plural?", detail:"One = singular. More than one = plural.", formula:"un dormitorio = singular · dos dormitorios = plural" },
    { title:"Step 3: Match the adjective", detail:"Masc. singular: -o · Fem. singular: -a · Masc. plural: -os · Fem. plural: -as", formula:"un piso moderno · una casa moderna · dos pisos modernos · dos casas modernas" },
    { title:"Adjectives ending in -e or consonant", detail:"Same form for masculine and feminine. Add -s or -es for plural.", formula:"un pueblo grande · una ciudad grande · dos pueblos grandes" },
  ],
  compare:[
    { good:"una casa moderna y un piso pequeño", bad:"una casa moderno y un piso pequeña" },
  ],
  worked:[{ q:"Make these adjectives agree: una ciudad [bonito] y un parque [grande]", lines:[
    { step:"Ciudad", expr:"Ciudad = feminine (la ciudad)", why:"Need feminine adjective" },
    { step:"Bonito→bonita", expr:"una ciudad bonita", why:"Bonito changes -o to -a for feminine" },
    { step:"Parque", expr:"Parque = masculine (el parque)", why:"Need masculine adjective" },
    { step:"Grande stays grande", expr:"un parque grande", why:"Grande doesn't change for gender", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>The rule:</strong> If the adjective ends in -o, change it to match. If it ends in anything else (grande, azul, interesante), only change for plural." },
    { icon:"⭐", text:"<strong>Adjective order:</strong> In Spanish, most adjectives come AFTER the noun — 'una casa grande' (not 'una grande casa')." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'un grande piso' — most adjectives go AFTER: 'un piso grande'." },
    { text:"<strong>Common mistake:</strong> 'una ciudad moderno' — ciudad is feminine: 'una ciudad moderna'." },
    { text:"<strong>Common mistake:</strong> Forgetting plural agreement: 'dos casas grande' — must be 'dos casas grandes'." },
  ],
  practice:[
    { q:"'Una ciudad moderna' — why 'moderna' not 'moderno'?", opts:["Modern is always -a","Ciudad is feminine — moderno changes to moderna to match","It's irregular","Moderno is for nouns ending in -o only"], ans:1, exp:"<strong>Ciudad is feminine (la ciudad)</strong> → adjective must be feminine: moderno → moderna." },
    { q:"Which is correct for 'two pretty rooms'?", opts:["dos habitaciones bonito","dos habitaciones bonita","dos habitaciones bonitas","dos habitaciones bonitos"], ans:2, exp:"Habitaciones is <strong>feminine plural</strong>. Bonito → bonitas (feminine plural)." },
    { q:"'Un pueblo tranquilo y una ciudad animada' — are the adjectives correct?", opts:["No — both should be the same form","Yes — tranquilo (masc) agrees with pueblo (masc), animada (fem) agrees with ciudad (fem)","No — tranquilo should be tranquila","No — animada should be animado"], ans:1, exp:"<strong>Correct.</strong> Pueblo is masculine → tranquilo. Ciudad is feminine → animada. Each adjective agrees with its own noun." },
    { q:"How do you make 'azul' agree with 'ciudades' (feminine plural)?", opts:["azula","azulas","azules","azul stays the same"], ans:2, exp:"Azul ends in a consonant → plural adds -es: <strong>azules</strong>. (Gender doesn't change it, but plural does.)" },
  ],
  prevLesson:{ key:"sp-uniform", label:"Uniform — Clothes and Colours" },
  nextLesson:{ key:"sp-ar-verbs", label:"AR Verbs — Present Tense" }
},

"sp-ar-verbs": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"AR Verbs — Present Tense",
  subtitle:"How to conjugate regular -AR verbs: estudio, estudias, estudia, estudiamos, estudiáis, estudian.",
  keyIdea:{ rule:"Remove -ar from the infinitive and add the correct ending: -o, -as, -a, -amos, -áis, -an", detail:"AR verbs are the most common type in Spanish. Learn the endings and you can conjugate hundreds of verbs." },
  formulae:[
    { main:"estudiar → estudi- + endings: -o -as -a -amos -áis -an", note:"estudiar = to study · hablar = to speak · escuchar = to listen · trabajar = to work · mirar = to watch · llevar = to wear" },
  ],
  steps:[
    { title:"Step 1: Remove the -ar", detail:"estudiar → estudi-", formula:"This is the stem." },
    { title:"Step 2: Add the correct ending", detail:"(yo) -o · (tú) -as · (él/ella) -a · (nosotros) -amos · (vosotros) -áis · (ellos) -an", formula:"estudio · estudias · estudia · estudiamos · estudiáis · estudian" },
    { title:"Apply to other AR verbs", detail:"hablar: hablo · hablas · habla · hablamos · habláis · hablan · escuchar: escucho · escuchas · escucha…", formula:"" },
  ],
  worked:[{ q:"Conjugate 'hablar' (to speak) in all persons", lines:[
    { step:"(yo)", expr:"hablo", why:"I speak — stem habl- + o" },
    { step:"(tú)", expr:"hablas", why:"you speak — + as" },
    { step:"(él/ella)", expr:"habla", why:"he/she speaks — + a" },
    { step:"(nosotros)", expr:"hablamos", why:"we speak — + amos" },
    { step:"(vosotros)", expr:"habláis", why:"you (pl) speak — + áis (note accent)" },
    { step:"(ellos)", expr:"hablan", why:"they speak — + an", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Key AR verbs to know:</strong> estudiar (study) · hablar (speak) · escuchar (listen) · llevar (wear/carry) · trabajar (work) · mirar (watch) · comprar (buy) · visitar (visit)" },
    { icon:"⭐", text:"<strong>Accent check:</strong> Vosotros form always has an accent: estudiáis, habláis, escucháis." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Yo estudias' — yo form is always -o: 'yo estudio'." },
    { text:"<strong>Common mistake:</strong> Forgetting the accent on vosotros: studiáis (with accent on the a)." },
  ],
  practice:[
    { q:"'Ella escucha música' — is this correct?", opts:["No — should be escuchan","No — should be escucho","Yes — ella takes the -a ending: escuch-a","No — should be escuchas"], ans:2, exp:"<strong>Ella (he/she) → -a ending</strong>. Escuchar → escuch- + a = escucha. Correct!" },
    { q:"'(Nosotros) trabajamos' is the correct form of 'trabajar' because:", opts:["Nosotros is special","Nosotros takes -amos for AR verbs: trabaj- + amos = trabajamos","It's irregular","Trabajar has a special stem"], ans:1, exp:"<strong>Nosotros + AR = -amos</strong>: trabaj- + amos = trabajamos. Regular pattern." },
    { q:"Which of these is the 'tú' (you singular) form of 'hablar'?", opts:["hablo","habla","hablas","hablan"], ans:2, exp:"<strong>Tú + AR = -as</strong>: habl- + as = hablas." },
    { q:"Conjugate 'comprar' (to buy) for 'ellos' (they):", opts:["compro","compras","compra","compran"], ans:3, exp:"<strong>Ellos + AR = -an</strong>: compr- + an = compran (they buy)." },
  ],
  prevLesson:{ key:"sp-adjectives", label:"Adjective Agreement" },
  nextLesson:{ key:"sp-er-verbs", label:"ER Verbs — Present Tense" }
},

"sp-er-verbs": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"ER Verbs — Present Tense",
  subtitle:"How to conjugate regular -ER verbs: leo, lees, lee, leemos, leéis, leen.",
  keyIdea:{ rule:"Remove -er from the infinitive and add: -o, -es, -e, -emos, -éis, -en. Notice: ER verbs use -es/-e not -as/-a.", detail:"ER and AR verbs share the yo (-o) and ellos (-n) endings but differ in the middle forms. Don't mix them up." },
  formulae:[
    { main:"leer → le- + endings: -o -es -e -emos -éis -en", note:"leer = to read · comer = to eat · beber = to drink · hacer = to do (irregular) · ver = to see · correr = to run" },
  ],
  steps:[
    { title:"Step 1: Remove -er", detail:"leer → le-  · comer → com-", formula:"" },
    { title:"Step 2: Add endings", detail:"(yo) -o · (tú) -es · (él/ella) -e · (nosotros) -emos · (vosotros) -éis · (ellos) -en", formula:"leo · lees · lee · leemos · leéis · leen" },
    { title:"Apply to comer", detail:"como · comes · come · comemos · coméis · comen", formula:"" },
  ],
  compare:[
    { good:"(tú) comes (ER: -es) vs (tú) estudias (AR: -as)", bad:"(tú) studias (using AR ending for ER verb)" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Key ER verbs:</strong> leer (read) · comer (eat) · beber (drink) · correr (run) · vender (sell) · comprender (understand)" },
    { icon:"⭐", text:"<strong>The critical difference:</strong> AR tú = -as (hablas). ER tú = -es (comes). AR él = -a (habla). ER él = -e (come)." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Tú leas' — ER verbs use -es not -as: 'tú lees'." },
    { text:"<strong>Common mistake:</strong> 'Ella comea' — doesn't exist! ER él/ella = -e: 'ella come'." },
  ],
  practice:[
    { q:"'(Yo) como' is the correct form of 'comer' because:", opts:["Yo is special","All present tense verbs end in -o for yo — comer: com- + o = como","ER verbs are irregular for yo","It's an exception"], ans:1, exp:"<strong>Yo form = always -o</strong> for regular verbs (both AR and ER): com- + o = como." },
    { q:"'(Ellos) beben' — is this correct for 'beber'?", opts:["No — should be beban","Yes — ellos + ER = -en: beb- + en = beben","No — should be bebes","No — should be bebe"], ans:1, exp:"<strong>Ellos + ER = -en</strong>: beb- + en = beben. Correct!" },
    { q:"How does 'tú' form differ between AR and ER?", opts:["No difference","AR tú = -as (hablas) · ER tú = -es (lees/comes) — the vowel changes","ER has an accent","AR uses -es too"], ans:1, exp:"<strong>Key difference:</strong> AR tú = -AS (hablas). ER tú = -ES (lees, comes). The middle vowel changes from a to e." },
    { q:"Conjugate 'correr' (to run) for 'nosotros':", opts:["corramos","corremos","corrimos","corros"], ans:1, exp:"<strong>Nosotros + ER = -emos</strong>: corr- + emos = corremos (we run)." },
  ],
  prevLesson:{ key:"sp-ar-verbs", label:"AR Verbs — Present Tense" },
  nextLesson:{ key:"sp-ir-verbs", label:"IR Verbs — Present Tense" }
},

"sp-ir-verbs": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"IR Verbs — Present Tense",
  subtitle:"How to conjugate regular -IR verbs: vivo, vives, vive, vivimos, vivís, viven.",
  keyIdea:{ rule:"Remove -ir and add: -o, -es, -e, -imos, -ís, -en. IR verbs are like ER except nosotros (-imos not -emos) and vosotros (-ís not -éis).", detail:"IR and ER verbs are very similar — only nosotros and vosotros differ. Compare carefully." },
  formulae:[
    { main:"vivir → viv- + endings: -o -es -e -imos -ís -en", note:"vivir = to live · escribir = to write · abrir = to open · subir = to go up" },
    { main:"IR vs ER: nosotros -imos/-emos · vosotros -ís/-éis", note:"These are the only two differences" },
  ],
  steps:[
    { title:"Step 1: Remove -ir", detail:"vivir → viv-  · escribir → escrib-", formula:"" },
    { title:"Step 2: Add endings", detail:"(yo) -o · (tú) -es · (él/ella) -e · (nosotros) -imos · (vosotros) -ís · (ellos) -en", formula:"vivo · vives · vive · vivimos · vivís · viven" },
    { title:"Compare ER and IR", detail:"ER: com-emos / com-éis · IR: viv-imos / viv-ís — the vowel in nosotros/vosotros changes from -e to -i", formula:"" },
  ],
  worked:[{ q:"Conjugate 'vivir' (to live) — the key verb for the speaking test", lines:[
    { step:"(yo)", expr:"vivo", why:"I live — viv- + o" },
    { step:"(tú)", expr:"vives", why:"you live — + es" },
    { step:"(él/ella)", expr:"vive", why:"he/she lives — + e" },
    { step:"(nosotros)", expr:"vivimos", why:"we live — + imos (IR not emos!)" },
    { step:"(vosotros)", expr:"vivís", why:"you (pl) live — + ís (IR not éis!)" },
    { step:"(ellos)", expr:"viven", why:"they live — + en", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>¿Dónde vives?</strong> is speaking question 1 — you MUST know the verb vivir perfectly. Vivo en = I live in." },
    { icon:"⭐", text:"<strong>Memory trick for IR vs ER:</strong> IR verbs have I in them → nosotros uses -IMOS (with I), vosotros uses -ÍS (with Í)." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> '(Nosotros) vivemos' — IR nosotros = -IMOS not -emos: 'vivimos'." },
    { text:"<strong>Common mistake:</strong> '(Yo) vives' — yo is always -o: 'vivo'." },
  ],
  practice:[
    { q:"'(Nosotros) vivimos' is correct because:", opts:["Nosotros is irregular","IR verbs use -imos for nosotros (not -emos like ER)","All verbs use -imos","It's an exception"], ans:1, exp:"<strong>IR verbs: nosotros = -imos</strong>. This is how IR differs from ER (ER nosotros = -emos): vivimos vs comeRMOS." },
    { q:"'¿Dónde vives?' — which form of vivir is 'vives'?", opts:["Yo form","Él/ella form","Tú form — you (singular)","Ellos form"], ans:2, exp:"<strong>Vives = tú form</strong> (you singular). The question is asking YOU where you live." },
    { q:"Conjugate 'escribir' (to write) for 'ellos':", opts:["escribo","escribes","escriben","escribimos"], ans:2, exp:"<strong>Ellos + IR = -en</strong>: escrib- + en = escriben (they write). Same as ER for ellos." },
    { q:"What are the TWO forms where IR verbs differ from ER?", opts:["yo and tú","nosotros and vosotros — IR: -imos/-ís vs ER: -emos/-éis","él and ellos","All forms are different"], ans:1, exp:"<strong>Only nosotros and vosotros differ:</strong> IR = vivimos/vivís · ER = comemos/coméis. All other endings are the same." },
  ],
  prevLesson:{ key:"sp-er-verbs", label:"ER Verbs — Present Tense" },
  nextLesson:{ key:"sp-me-gusta", label:"Me Gusta / Me Gustan" }
},

"sp-me-gusta": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"Me Gusta / Me Gustan",
  subtitle:"How to express likes and dislikes correctly — the most important grammar point for the speaking and writing exams.",
  keyIdea:{ rule:"Me gusta + singular noun OR infinitive. Me gustan + plural noun. The verb agrees with the THING liked, not the person.", detail:"Think of it as: 'to me, [subject] is pleasing'. The verb (gusta/gustan) is really agreeing with what is liked — not with 'me'." },
  formulae:[
    { main:"Me gusta(n) / Te gusta(n) / Le gusta(n) / Nos gusta(n)", note:"me = me · te = you · le = him/her · nos = us" },
    { main:"(No) me gusta + [singular / infinitive] · (No) me gustan + [plural]", note:"Me gusta el inglés · Me gustan las ciencias · Me gusta nadar" },
  ],
  steps:[
    { title:"Me gusta + singular", detail:"Me gusta el español · Me gusta la música · Me gusta leer (infinitive = always singular)", formula:"" },
    { title:"Me gustan + plural", detail:"Me gustan las ciencias · Me gustan los deportes · Me gustan las películas", formula:"" },
    { title:"Other persons", detail:"¿Te gusta(n)…? = do you like? · Le gusta(n)… = he/she likes · Nos gusta(n)… = we like", formula:"" },
    { title:"Adding 'mucho' or 'nada'", detail:"Me gusta mucho = I like it a lot · No me gusta nada = I don't like it at all · Me encanta(n) = I love", formula:"" },
  ],
  compare:[
    { good:"Me gustan las matemáticas porque son difíciles.", bad:"Me gusta las matemáticas porque son difíciles." },
  ],
  tips:[
    { icon:"💡", text:"<strong>The test:</strong> Ask 'what is liked?' If singular or infinitive → gusta. If plural → gustan. Las matemáticas = plural → ME GUSTAN." },
    { icon:"⭐", text:"<strong>Infinitive = always gusta:</strong> Me gusta nadar · me gusta estudiar · me gusta ir de compras. Infinitives are always 'singular' in this structure." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Me gusta los deportes' — los deportes is plural: 'Me GUSTAN los deportes'." },
    { text:"<strong>Common mistake:</strong> 'Me gustan estudiar' — an infinitive is always singular: 'Me GUSTA estudiar'." },
  ],
  practice:[
    { q:"'Me gustan las ciencias' is correct because:", opts:["Ciencias is feminine","Las ciencias is plural — the verb agrees with the thing liked (plural = gustan)","Me always takes gustan","It's irregular"], ans:1, exp:"<strong>Las ciencias is plural</strong> — the verb must be plural too: me guSTAN (not guSTa)." },
    { q:"'¿Te gusta nadar?' — is 'gusta' correct here?", opts:["No — should be gustan","Yes — nadar is an infinitive, always treated as singular → gusta","No — should be gustas","Only if you're talking about swimming"], ans:1, exp:"<strong>Infinitive = always singular → gusta.</strong> Me/te gusta + infinitive is always correct." },
    { q:"'Le gustan los videojuegos' means:", opts:["I like video games","You like video games","He/She likes video games (videojuegos is plural)","They like video games"], ans:2, exp:"<strong>Le = he/she (or you formal). Gustan = plural (los videojuegos).</strong> He/she likes video games." },
    { q:"Translate: 'We like the history teacher'", opts:["Nos gusta la profesora de historia","Nos gustan la profesora de historia","Me gusta la profesora de historia","Nos gustan los profesores de historia"], ans:0, exp:"<strong>Nos gusta</strong> (singular: la profesora) = we like. La profesora de historia = the history teacher." },
  ],
  prevLesson:{ key:"sp-ir-verbs", label:"IR Verbs — Present Tense" },
  nextLesson:{ key:"sp-near-future", label:"Near Future Tense" }
},

"sp-near-future": {
  topic:"Grammar", topicKey:"Grammar", theme:"violet", icon:"📝",
  title:"The Near Future Tense",
  subtitle:"Voy a + infinitive — how to say what you are going to do.",
  keyIdea:{ rule:"Near future = conjugated form of IR ('ir' = to go) + a + infinitive. It is used for plans and intentions.", detail:"This is one of the two tenses required in the speaking test. You MUST use it in question 6 (¿Qué vas a estudiar en el futuro?)." },
  formulae:[
    { main:"(yo) Voy a · (tú) Vas a · (él/ella) Va a · (nosotros) Vamos a · (vosotros) Vais a · (ellos) Van a + infinitive", note:"e.g. Voy a estudiar teatro = I am going to study drama" },
    { main:"Voy a + infinitive = I am going to + verb", note:"NEVER conjugate the infinitive after 'a'" },
  ],
  steps:[
    { title:"Conjugate IR (to go)", detail:"(yo) voy · (tú) vas · (él/ella) va · (nosotros) vamos · (vosotros) vais · (ellos) van", formula:"IR is irregular — must be learnt" },
    { title:"Add 'a' + infinitive", detail:"voy + a + estudiar = voy a estudiar (I am going to study)", formula:"The infinitive never changes" },
    { title:"Full sentences", detail:"En el futuro, voy a estudiar teatro porque me parece interesante. Vamos a vivir en España.", formula:"" },
    { title:"Making it negative", detail:"No voy a + infinitive: No voy a estudiar matemáticas porque son muy difíciles.", formula:"" },
  ],
  worked:[{ q:"Answer: ¿Qué vas a estudiar en el futuro?", lines:[
    { step:"Near future", expr:"En el futuro, voy a estudiar teatro", why:"IR → voy + a + infinitive estudiar" },
    { step:"Reason", expr:"porque me parece muy interesante", why:"because I find it very interesting" },
    { step:"Add contrast", expr:"y no voy a estudiar matemáticas", why:"and I am not going to study maths" },
    { step:"Reason 2", expr:"porque son demasiado difíciles.", why:"because they are too difficult", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Never conjugate the infinitive:</strong> 'Voy a estudiar' is correct. 'Voy a estudio' or 'Voy a estudias' are WRONG." },
    { icon:"⭐", text:"<strong>Using 'vamos a':</strong> Vamos a estudiar = we are going to study. Also means 'let's' — context tells you which: Vamos a comer = let's eat / we are going to eat." },
  ],
  mistakes:[
    { text:"<strong>Most common mistake:</strong> Conjugating the infinitive: 'Voy a estudio' is wrong. Always use the infinitive: 'Voy a estudiar'." },
    { text:"<strong>Common mistake:</strong> Forgetting 'a': 'Voy estudiar' is wrong. Must be 'Voy A estudiar'." },
  ],
  practice:[
    { q:"'Voy a estudiar teatro' is correct because:", opts:["Voy is from vivir","Voy (from ir) + a + infinitive estudiar = near future tense (I am going to study)","Teatro is a noun","It's irregular"], ans:1, exp:"<strong>Voy (from IR) + a + INFINITIVE = near future.</strong> I am going to study drama." },
    { q:"Translate: 'She is going to live in Spain'", opts:["Ella va estudiar España","Ella va a vivir en España","Ella voy a vivir en España","Ella va a vive en España"], ans:1, exp:"<strong>Ella (she) → va a (3rd person singular of IR) + infinitive vivir</strong>: Ella va a vivir en España." },
    { q:"'No voy a estudiar matemáticas' means:", opts:["I study maths","I am going to study maths","I am not going to study maths","I don't like maths"], ans:2, exp:"<strong>No voy a + infinitive = I am NOT going to + verb.</strong> No voy a estudiar = I am not going to study." },
    { q:"Which is correct for 'We are going to speak Spanish'?", opts:["Vamos hablar español","Vamos a hablar español","Vamos a hablamos español","Van a hablar español"], ans:1, exp:"<strong>Vamos a + infinitive</strong> = we are going to. Vamos a hablar español. Never conjugate the infinitive after 'a'." },
  ],
  prevLesson:{ key:"sp-me-gusta", label:"Me Gusta / Me Gustan" },
  nextLesson:null
},



/* ════════ SCIENCE — SCIENTIFIC SKILLS ════════ */
"sci-variables": {
  topic:"Scientific Skills", topicKey:"Scientific Skills", theme:"teal", icon:"📊",
  title:"Types of Variable",
  subtitle:"Identifying independent, dependent and control variables — essential for every experiment.",
  keyIdea:{ rule:"Independent variable = what you change. Dependent variable = what you measure. Control variables = everything kept the same.", detail:"In any experiment there is only ONE independent variable and ONE dependent variable. Everything else must be controlled to make it a fair test." },
  formulae:[
    { main:"Independent → changed by the experimenter", note:"e.g. concentration of acid" },
    { main:"Dependent → measured as a result", note:"e.g. volume of gas produced" },
    { main:"Control → kept the same throughout", note:"e.g. temperature, volume of solution" },
  ],
  steps:[
    { title:"Find the independent variable", detail:"Ask: what is the experimenter deliberately changing? This is the independent variable — goes on the x-axis.", formula:"" },
    { title:"Find the dependent variable", detail:"Ask: what is being measured to see the effect? This is the dependent variable — goes on the y-axis.", formula:"" },
    { title:"Identify control variables", detail:"Ask: what else could affect the result that must be kept constant to make it fair?", formula:"" },
  ],
  worked:[{ q:"Experiment: testing how temperature affects enzyme activity. Identify the variables.", lines:[
    { step:"Independent", expr:"Temperature (°C)", why:"The experimenter changes the temperature" },
    { step:"Dependent", expr:"Rate of reaction (e.g. time taken / gas produced)", why:"This is what is measured to see the effect" },
    { step:"Controls", expr:"Volume and concentration of enzyme solution, pH, type of enzyme", why:"Must be kept the same to make it a fair test", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Memory trick:</strong> 'I control what I Do' — Independent = what I change, Dependent = what I measure." },
    { icon:"⭐", text:"<strong>In exam questions:</strong> Control variables are often worth a mark — always name at least two specific ones, not just 'everything else'." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing independent and dependent. Ask: does this cause the other, or is it caused by it? The cause = independent." },
    { text:"<strong>Common mistake:</strong> Saying 'keep everything the same' — you must NAME the specific control variables." },
  ],
  practice:[
    { q:"A student investigates how the length of a wire affects its resistance. What is the independent variable?", opts:["Resistance","Current","Length of wire","Voltage"], ans:2, exp:"<strong>Length of wire</strong> — this is what the student deliberately changes." },
    { q:"In the same experiment, what is the dependent variable?", opts:["Length of wire","Resistance — this is what is measured to see the effect","Type of wire","Battery voltage"], ans:1, exp:"<strong>Resistance</strong> — this is measured to see how it changes with length." },
    { q:"Which of these is a control variable in an experiment about plant growth and light intensity?", opts:["Light intensity","Height of plant","Volume of water given to each plant","Number of leaves at the end"], ans:2, exp:"<strong>Volume of water</strong> must be kept the same — if it varied, you couldn't know if growth was due to light or water." },
    { q:"Why must control variables be kept constant?", opts:["To make the experiment faster","To ensure the experiment is a fair test — only the independent variable causes any change in the dependent variable","To save equipment","To make the graph easier to draw"], ans:1, exp:"Control variables ensure a <strong>fair test</strong> — if anything else changes, you cannot conclude that the independent variable caused the result." },
  ],
  prevLesson:null,
  nextLesson:{ key:"sci-graphs", label:"Drawing and Interpreting Graphs" }
},

"sci-graphs": {
  topic:"Scientific Skills", topicKey:"Scientific Skills", theme:"teal", icon:"📊",
  title:"Drawing and Interpreting Graphs",
  subtitle:"How to draw a correct scientific graph and describe what it shows — using the SALTS checklist.",
  keyIdea:{ rule:"SALTS: Scale · Axes · Labels · Title · Shape. The independent variable goes on the x-axis; the dependent variable goes on the y-axis.", detail:"A graph must have a sensible scale that uses at least half the grid, correct axes with labels and units, a clear title, and the correct type of graph (line or bar)." },
  formulae:[
    { main:"x-axis = independent variable · y-axis = dependent variable", note:"" },
    { main:"SALTS: Scale · Axes · Labels with units · Title · Shape (line of best fit or bar)", note:"" },
  ],
  steps:[
    { title:"Choose the right graph type", detail:"Line graph: when both variables are continuous (e.g. temperature, time, concentration). Bar chart: when the independent variable is categoric (e.g. type of material, name of substance).", formula:"" },
    { title:"Choose a scale", detail:"Use at least half the grid. Scale must be even (equal jumps). Don't use awkward scales like 1, 3, 7.", formula:"" },
    { title:"Plot points accurately", detail:"Use a small cross (×) or dot. Don't connect every dot — draw a smooth line or curve of best fit through the general trend.", formula:"" },
    { title:"Describe a graph", detail:"State the overall trend (as X increases, Y increases/decreases). Quote specific values with units. Identify any anomalies (points not on the line of best fit).", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Line of best fit:</strong> A straight line or smooth curve that passes through the middle of the data points — NOT connecting dot to dot. Roughly equal numbers of points above and below." },
    { icon:"⭐", text:"<strong>Describing trends:</strong> Always say 'As [independent variable] increases, [dependent variable] increases/decreases.' Quote at least two specific values from the graph." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Plotting independent on y-axis. Always: independent = x-axis (horizontal), dependent = y-axis (vertical)." },
    { text:"<strong>Common mistake:</strong> Connecting every dot with a zigzag line. Draw a smooth line or curve of best fit instead." },
    { text:"<strong>Common mistake:</strong> Forgetting units on axis labels. '°C', 'cm³', 's' etc. are required." },
  ],
  practice:[
    { q:"Where does the independent variable go on a graph?", opts:["y-axis (vertical)","x-axis (horizontal)","Either axis","In the title"], ans:1, exp:"<strong>Independent variable → x-axis (horizontal).</strong> Dependent variable → y-axis (vertical)." },
    { q:"A student plots temperature (°C) against time (s). Which is the dependent variable?", opts:["Time","Temperature — this is what changes as a result","The thermometer","Rate of reaction"], ans:1, exp:"<strong>Temperature</strong> is being measured as a result of time passing — it is the dependent variable." },
    { q:"What is a line of best fit?", opts:["A line connecting every data point","A smooth line or curve passing through the general trend of data, with roughly equal points above and below","The steepest possible line","A line through only the extreme points"], ans:1, exp:"Line of best fit = <strong>smooth line/curve through the general trend</strong>. Does NOT connect every point." },
    { q:"When describing a graph trend, you should:", opts:["Just say 'it goes up'","State the trend AND quote specific values with units from the graph","Only describe anomalies","Draw it again"], ans:1, exp:"Always <strong>state the trend AND quote specific data values with units</strong>. e.g. 'As temperature increases from 20°C to 60°C, the rate doubles from 2 to 4 cm³/s.'" },
  ],
  prevLesson:{ key:"sci-variables", label:"Types of Variable" },
  nextLesson:{ key:"sci-ph", label:"pH Scale and Indicators" }
},

/* ════════ SCIENCE — ACIDS AND ALKALIS ════════ */
"sci-ph": {
  topic:"Acids and Alkalis", topicKey:"Acids and Alkalis", theme:"green", icon:"🧪",
  title:"pH Scale, Indicators and Litmus Tests",
  subtitle:"How to measure acidity and alkalinity — universal indicator colours and litmus paper results.",
  keyIdea:{ rule:"The pH scale runs from 0 to 14. pH 1–6 = acid. pH 7 = neutral. pH 8–14 = alkali. The lower the pH, the stronger the acid. The higher the pH, the stronger the alkali.", detail:"Universal indicator gives more information than litmus because it shows the strength (pH value) not just whether something is acid or alkali." },
  formulae:[
    { main:"pH 1–6 = acid · pH 7 = neutral · pH 8–14 = alkali", note:"pH 1 = strongest acid · pH 14 = strongest alkali" },
  ],
  steps:[
    { title:"Universal indicator colours", detail:"pH 1–2: red (strong acid) · pH 3–4: orange (weak acid) · pH 5–6: yellow (weak acid) · pH 7: green (neutral) · pH 8–9: blue (weak alkali) · pH 10–11: dark blue/purple (weak alkali) · pH 12–14: purple (strong alkali)", formula:"" },
    { title:"Red litmus paper", detail:"Stays red in acid · turns blue in alkali · does not change in neutral", formula:"" },
    { title:"Blue litmus paper", detail:"Turns red in acid · stays blue in alkali · does not change in neutral", formula:"" },
    { title:"Advantage of universal indicator over litmus", detail:"Litmus only tells you acid or alkali. Universal indicator shows the strength — gives a numerical pH value.", formula:"" },
    { title:"pH probe", detail:"Electronic device that gives an accurate numerical pH reading — more precise than universal indicator.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Litmus memory trick:</strong> Acid turns blue litmus RED — think 'acid is aggressive, attacks blue'. Alkali turns red litmus BLUE — alkali restores blue." },
    { icon:"⭐", text:"<strong>Advantage of UI over litmus:</strong> 'Litmus only tells you if something is an acid or alkali — it does not give a pH value or tell you the strength.'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying neutral turns litmus paper green. Neutral does NOT change litmus paper colour." },
    { text:"<strong>Common mistake:</strong> Confusing which litmus changes. In acid: blue → red. In alkali: red → blue. Red stays red in acid. Blue stays blue in alkali." },
  ],
  practice:[
    { q:"What colour does universal indicator turn at pH 7?", opts:["Red","Orange","Green — neutral","Purple"], ans:2, exp:"<strong>pH 7 = neutral → green</strong> on universal indicator." },
    { q:"Blue litmus paper is dipped into lemon juice (pH 3). What happens?", opts:["Stays blue","Turns red — lemon juice is an acid","Turns green","Turns purple"], ans:1, exp:"Lemon juice is an acid → blue litmus <strong>turns red</strong>." },
    { q:"What is the advantage of universal indicator over litmus?", opts:["It is cheaper","It is faster","It shows the strength of the acid/alkali by giving a pH value — litmus only shows acid or alkali","It is more colourful"], ans:2, exp:"Universal indicator gives a <strong>pH value indicating strength</strong>. Litmus only tells you acid or alkali — not how strong." },
    { q:"A solution has a pH of 2. What does this tell you?", opts:["It is a weak acid","It is neutral","It is a strong acid — pH 1–2 indicates a strong acid","It is a weak alkali"], ans:2, exp:"pH 2 = <strong>strong acid</strong>. The lower the pH (below 7), the stronger the acid." },
  ],
  prevLesson:{ key:"sci-graphs", label:"Drawing and Interpreting Graphs" },
  nextLesson:{ key:"sci-neutralisation", label:"Neutralisation" }
},

"sci-neutralisation": {
  topic:"Acids and Alkalis", topicKey:"Acids and Alkalis", theme:"green", icon:"🧪",
  title:"Neutralisation",
  subtitle:"The reaction between an acid and an alkali — always produces a salt and water.",
  keyIdea:{ rule:"Acid + alkali → salt + water. This is neutralisation. The products are always neutral (pH 7) if exact amounts are used.", detail:"Neutralisation is used in everyday life — antacids neutralise excess stomach acid, farmers add lime to neutralise acidic soil." },
  formulae:[
    { main:"acid + alkali → salt + water", note:"e.g. hydrochloric acid + sodium hydroxide → sodium chloride + water" },
    { main:"HCl + NaOH → NaCl + H₂O", note:"" },
  ],
  steps:[
    { title:"What is neutralisation?", detail:"When an acid and an alkali react together, they cancel each other out to form a salt and water. If equal amounts are used, the product is neutral (pH 7).", formula:"" },
    { title:"Naming the salt", detail:"The name comes from the acid and the alkali/base used. The acid gives the anion: HCl → chloride, H₂SO₄ → sulphate, HNO₃ → nitrate. The metal from the alkali gives the cation.", formula:"" },
    { title:"Real-world examples", detail:"Antacid tablets: neutralise excess hydrochloric acid in stomach · Farmers add calcium hydroxide (lime) to neutralise acidic soil · Bee stings are acidic — treat with alkali (sodium bicarbonate)", formula:"" },
  ],
  worked:[{ q:"Write a word equation for: hydrochloric acid + sodium hydroxide", lines:[
    { step:"Acid", expr:"hydrochloric acid", why:"HCl — gives chloride salts" },
    { step:"Alkali", expr:"sodium hydroxide", why:"NaOH — gives sodium salts" },
    { step:"Salt name", expr:"sodium chloride", why:"sodium (from alkali) + chloride (from HCl)" },
    { step:"Full equation", expr:"hydrochloric acid + sodium hydroxide → sodium chloride + water", why:"Always: acid + alkali → salt + water", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Salt naming rule:</strong> Metal name (from the base) + acid name ending: -chloride (HCl), -sulphate (H₂SO₄), -nitrate (HNO₃)." },
    { icon:"⭐", text:"<strong>Real-world link:</strong> Common salt (sodium chloride, NaCl) is made by neutralising hydrochloric acid with sodium hydroxide." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying acid + alkali → acid + base. The products are always SALT + WATER." },
    { text:"<strong>Common mistake:</strong> Using an equals sign in word equations. Always use an arrow →." },
  ],
  practice:[
    { q:"What are always the products of neutralisation?", opts:["Acid + water","Salt + water","Salt + carbon dioxide","Base + water"], ans:1, exp:"Neutralisation: acid + alkali → <strong>salt + water</strong>. Always." },
    { q:"Hydrochloric acid is neutralised by sodium hydroxide. What salt is formed?", opts:["Sodium sulphate","Sodium nitrate","Sodium chloride — HCl gives chloride salts, sodium comes from sodium hydroxide","Calcium chloride"], ans:2, exp:"<strong>Sodium chloride</strong>: sodium (from NaOH) + chloride (from HCl)." },
    { q:"Why might a farmer add lime (calcium hydroxide) to a field?", opts:["To add nitrogen","To neutralise acidic soil — raises pH to neutral, improving crop growth","To kill weeds","To increase drainage"], ans:1, exp:"Lime is an alkali. It <strong>neutralises acidic soil</strong>, raising the pH towards neutral so crops grow better." },
    { q:"What does neutralisation mean?", opts:["Making something more acidic","Making something more alkaline","An acid and alkali reacting to cancel each other out, forming a salt and water","Turning an acid into water"], ans:2, exp:"Neutralisation = <strong>acid + alkali cancelling each other out</strong>, forming a salt and water. pH moves towards 7." },
  ],
  prevLesson:{ key:"sci-ph", label:"pH Scale and Indicators" },
  nextLesson:{ key:"sci-acid-reactions", label:"Acids with Carbonates and Metal Oxides" }
},

"sci-acid-reactions": {
  topic:"Acids and Alkalis", topicKey:"Acids and Alkalis", theme:"green", icon:"🧪",
  title:"Acids Reacting with Carbonates and Metal Oxides",
  subtitle:"Word equations and salt naming for three types of acid reaction.",
  keyIdea:{ rule:"Three key reactions: acid + base/alkali → salt + water. Acid + carbonate → salt + water + CO₂. Acid + metal oxide → salt + water.", detail:"Carbon dioxide is always produced when an acid reacts with a carbonate — you can test for CO₂ by bubbling it through limewater, which turns milky." },
  formulae:[
    { main:"acid + carbonate → salt + water + carbon dioxide", note:"e.g. HCl + calcium carbonate → calcium chloride + water + CO₂" },
    { main:"acid + metal oxide → salt + water", note:"e.g. H₂SO₄ + copper oxide → copper sulphate + water" },
    { main:"HCl → chloride · H₂SO₄ → sulphate · HNO₃ → nitrate", note:"Acid name determines salt anion" },
  ],
  steps:[
    { title:"Acid + carbonate", detail:"Always produces three products: a salt, water AND carbon dioxide. CO₂ is the gas that causes fizzing in these reactions.", formula:"hydrochloric acid + calcium carbonate → calcium chloride + water + carbon dioxide" },
    { title:"Acid + metal oxide", detail:"Produces two products: a salt and water. Same as neutralisation but using a metal oxide instead of a hydroxide.", formula:"sulphuric acid + copper oxide → copper sulphate + water" },
    { title:"Naming the salt", detail:"The salt is always named: [metal from base/carbonate/oxide] + [anion from acid]. HCl → chloride. H₂SO₄ → sulphate. HNO₃ → nitrate.", formula:"" },
    { title:"Test for CO₂", detail:"Bubble the gas through limewater (calcium hydroxide solution). If CO₂ is present, the limewater turns cloudy/milky.", formula:"" },
  ],
  worked:[{ q:"Write the word equation: sulphuric acid + zinc carbonate", lines:[
    { step:"Identify type", expr:"acid + carbonate → salt + water + CO₂", why:"Carbonate reactions always produce CO₂" },
    { step:"Salt cation", expr:"zinc (from zinc carbonate)", why:"Metal from the carbonate" },
    { step:"Salt anion", expr:"sulphate (from sulphuric acid)", why:"H₂SO₄ always gives sulphate" },
    { step:"Full equation", expr:"sulphuric acid + zinc carbonate → zinc sulphate + water + carbon dioxide", why:"All three products", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Carbonate reactions fizz</strong> because CO₂ gas is produced. The bubbling is your clue that a carbonate is reacting with an acid." },
    { icon:"⭐", text:"<strong>Salt naming summary:</strong> hydrochloric acid → …chloride · sulphuric acid → …sulphate · nitric acid → …nitrate. Learn these three and you can name any salt." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Forgetting carbon dioxide in the carbonate reaction. Products are salt + water + CO₂ (not just salt + water)." },
    { text:"<strong>Common mistake:</strong> Naming the salt wrong. The metal from the BASE gives the first word. The acid gives the ending (-chloride, -sulphate, -nitrate)." },
  ],
  practice:[
    { q:"What are the products when hydrochloric acid reacts with calcium carbonate?", opts:["Calcium chloride + water","Calcium chloride + water + carbon dioxide","Calcium carbonate + water","Calcium hydroxide + CO₂"], ans:1, exp:"acid + carbonate → <strong>salt + water + carbon dioxide</strong>. HCl + CaCO₃ → calcium chloride + water + CO₂." },
    { q:"Sulphuric acid reacts with copper oxide. What salt is formed?", opts:["Copper chloride","Copper nitrate","Copper sulphate — H₂SO₄ gives sulphate, copper comes from copper oxide","Copper carbonate"], ans:2, exp:"<strong>Copper sulphate</strong>: copper (from copper oxide) + sulphate (from sulphuric acid H₂SO₄)." },
    { q:"How do you test for carbon dioxide gas?", opts:["It turns damp litmus paper red","Bubble it through limewater — it turns milky/cloudy if CO₂ is present","It relights a glowing splint","It turns universal indicator green"], ans:1, exp:"<strong>Limewater test for CO₂</strong>: bubble gas through limewater — turns cloudy/milky if CO₂ is present." },
    { q:"Nitric acid reacts with sodium carbonate. What is the salt formed?", opts:["Sodium chloride","Sodium sulphate","Sodium nitrate — HNO₃ gives nitrate, sodium comes from sodium carbonate","Sodium oxide"], ans:2, exp:"<strong>Sodium nitrate</strong>: sodium (from carbonate) + nitrate (from HNO₃)." },
  ],
  prevLesson:{ key:"sci-neutralisation", label:"Neutralisation" },
  nextLesson:{ key:"sci-changes", label:"Physical vs Chemical Change" }
},


/* ════════ SCIENCE — CHEMICAL REACTIONS ════════ */
"sci-changes": {
  topic:"Chemical Reactions", topicKey:"Chemical Reactions", theme:"amber", icon:"⚗️",
  title:"Physical vs Chemical Change",
  subtitle:"How to tell the difference — and why it matters.",
  keyIdea:{ rule:"Physical change = reversible, no new substance formed. Chemical change = irreversible (usually), new substance(s) formed.", detail:"The key test: has a NEW substance been made? If yes → chemical change. Can it be easily reversed? If yes → physical change." },
  formulae:[
    { main:"Physical: reversible · no new substance · same particles rearranged", note:"e.g. melting ice, dissolving salt, boiling water" },
    { main:"Chemical: new substance formed · usually irreversible · atoms rearranged into new molecules", note:"e.g. burning, rusting, cooking, neutralisation" },
  ],
  steps:[
    { title:"Signs of a chemical change", detail:"New substance formed · colour change · gas produced · temperature change · light or sound produced · change is difficult to reverse", formula:"" },
    { title:"Physical change examples", detail:"Melting (ice → water) · Boiling (water → steam) · Dissolving (salt → salt solution) · Bending or cutting · Mixing (can be separated again)", formula:"" },
    { title:"Chemical change examples", detail:"Burning · Rusting · Cooking · Neutralisation · Photosynthesis · Fermentation · Any reaction that makes a new substance", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Quick test:</strong> Can you get back to exactly what you started with easily? If yes → physical. If no → chemical." },
    { icon:"⭐", text:"<strong>Dissolving is physical</strong> — you can evaporate the water and get the salt back. Don't confuse dissolving with reacting." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying dissolving is a chemical change. It's physical — the salt can be recovered by evaporation." },
    { text:"<strong>Common mistake:</strong> Saying all chemical changes are irreversible. Most are, but the key feature is that a NEW SUBSTANCE is formed." },
  ],
  practice:[
    { q:"Burning wood is an example of:", opts:["A physical change — it can be reversed","A chemical change — new substances (CO₂, ash, water) are formed","A physical change — the wood just changes shape","Neither"], ans:1, exp:"Burning wood = <strong>chemical change</strong>. New substances (carbon dioxide, water vapour, ash) are formed and the change cannot be reversed." },
    { q:"Melting ice is an example of:", opts:["A chemical change — new substance formed","A physical change — water is still water, just liquid not solid, and it can be frozen again","A chemical change — it involves energy","An irreversible change"], ans:1, exp:"Melting ice = <strong>physical change</strong>. No new substance is formed. The water can be frozen back to ice." },
    { q:"Which of these is a sign of a chemical change?", opts:["A change in state","A change in shape","A gas being produced and an unexpected colour change","Dissolving in water"], ans:2, exp:"<strong>Gas production and colour change</strong> are signs that a new substance has been made — evidence of a chemical change." },
    { q:"In a chemical change:", opts:["The same substance is kept in a different form","Atoms are rearranged to make new substances — the change is usually irreversible","Only the state changes","The mass changes"], ans:1, exp:"Chemical change = <strong>atoms rearranged to form new substances</strong>. Usually irreversible." },
  ],
  prevLesson:{ key:"sci-acid-reactions", label:"Acids + Carbonates and Metal Oxides" },
  nextLesson:{ key:"sci-word-equations", label:"Reactants, Products and Word Equations" }
},

"sci-word-equations": {
  topic:"Chemical Reactions", topicKey:"Chemical Reactions", theme:"amber", icon:"⚗️",
  title:"Reactants, Products and Word Equations",
  subtitle:"The language of chemical reactions — writing word equations correctly.",
  keyIdea:{ rule:"Reactants are what you start with. Products are what you make. Word equations always use an arrow (→) not an equals sign.", detail:"In a chemical reaction, atoms are rearranged. The same atoms are present at the end — just in different arrangements. Nothing is created or destroyed." },
  formulae:[
    { main:"reactant + reactant → product + product", note:"Arrow shows direction of reaction" },
    { main:"Naming products: oxygen → oxide · sulphur → sulphide", note:"e.g. iron + oxygen → iron oxide · iron + sulphur → iron sulphide" },
  ],
  steps:[
    { title:"Reactants", detail:"The starting materials — on the LEFT of the arrow. These are what you put into the reaction.", formula:"" },
    { title:"Products", detail:"What is made — on the RIGHT of the arrow. These are the new substances formed.", formula:"" },
    { title:"The arrow", detail:"Always use → (arrow) not = (equals sign). The arrow shows the direction of the reaction.", formula:"" },
    { title:"Naming products from elements", detail:"When a metal reacts with oxygen → metal oxide (e.g. iron oxide). When a metal reacts with sulphur → metal sulphide (e.g. iron sulphide).", formula:"" },
  ],
  worked:[{ q:"Write a word equation for: magnesium burning in oxygen", lines:[
    { step:"Reactants", expr:"magnesium + oxygen", why:"These are the starting materials" },
    { step:"Product", expr:"magnesium oxide", why:"Metal + oxygen → metal OXIDE" },
    { step:"Arrow", expr:"→ (not =)", why:"Word equations always use an arrow" },
    { step:"Full equation", expr:"magnesium + oxygen → magnesium oxide", why:"Correct format", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>The arrow rule:</strong> 'In a word equation, we use an ARROW not an equals sign.' This is a common exam mark — always check you've used →." },
    { icon:"⭐", text:"<strong>Naming oxides:</strong> Any metal reacting with oxygen forms a metal OXIDE. Sulphur compounds form SULPHIDES. These naming rules are worth learning." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Using = instead of → in a word equation. Always use an arrow." },
    { text:"<strong>Common mistake:</strong> Putting products on the left. Reactants = left, Products = right (direction of arrow)." },
  ],
  practice:[
    { q:"In a word equation, which side are the reactants?", opts:["Right side","Left side — reactants are what you START with, before the arrow","Both sides","In brackets"], ans:1, exp:"<strong>Reactants on the LEFT</strong> of the arrow. Products on the right." },
    { q:"Iron reacts with sulphur. What is the product?", opts:["Iron oxide","Iron sulphate","Iron sulphide — metal + sulphur → metal sulphide","Iron carbonate"], ans:2, exp:"Metal + sulphur → metal <strong>sulphide</strong>. Iron + sulphur → iron sulphide." },
    { q:"Why do we use → and not = in a word equation?", opts:["It is easier to draw","It shows the direction of the reaction — reactants form products","It shows reversibility","It shows the amounts used"], ans:1, exp:"The arrow <strong>shows the direction of the reaction</strong> — reactants are converted into products. An equals sign would imply they are the same thing." },
    { q:"Zinc reacts with oxygen. Name the product.", opts:["Zinc sulphide","Zinc hydroxide","Zinc oxide — metal + oxygen → metal oxide","Zinc carbonate"], ans:2, exp:"Metal + oxygen → metal <strong>oxide</strong>. Zinc + oxygen → zinc oxide." },
  ],
  prevLesson:{ key:"sci-changes", label:"Physical vs Chemical Change" },
  nextLesson:{ key:"sci-energy-reactions", label:"Energy in Reactions" }
},

"sci-energy-reactions": {
  topic:"Chemical Reactions", topicKey:"Chemical Reactions", theme:"amber", icon:"⚗️",
  title:"Energy in Chemical Reactions",
  subtitle:"Exothermic and endothermic reactions — energy transferred to or from the surroundings.",
  keyIdea:{ rule:"Exothermic reactions release energy to the surroundings — temperature increases. Endothermic reactions absorb energy from the surroundings — temperature decreases.", detail:"'Exo' means out — energy goes OUT to surroundings. 'Endo' means in — energy goes IN from surroundings." },
  formulae:[
    { main:"Exothermic: releases energy → surroundings get hotter", note:"e.g. burning, neutralisation, respiration, hand warmers" },
    { main:"Endothermic: absorbs energy → surroundings get cooler", note:"e.g. photosynthesis, thermal decomposition, sports cold packs" },
  ],
  steps:[
    { title:"Exothermic reactions", detail:"Energy is released to the surroundings. The temperature of the surroundings increases. Examples: combustion (burning), neutralisation, oxidation, respiration.", formula:"" },
    { title:"Endothermic reactions", detail:"Energy is absorbed from the surroundings. The temperature of the surroundings decreases. Examples: photosynthesis, thermal decomposition, dissolving ammonium nitrate in water.", formula:"" },
    { title:"Measuring energy change", detail:"Use a thermometer to measure temperature change. If temperature goes up → exothermic. If temperature goes down → endothermic.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory trick:</strong> EXOthermic = EXits heat (energy goes OUT, surroundings get warmer). ENDOthermic = ENergy goes IN (surroundings get cooler)." },
    { icon:"⭐", text:"<strong>Common exam trap:</strong> The question asks about energy change in the SURROUNDINGS, not the reaction mixture. Exothermic = surroundings get hotter." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying exothermic means 'energy is made'. Energy is not created — it is transferred from the reaction to the surroundings." },
    { text:"<strong>Common mistake:</strong> Confusing endothermic and exothermic. Remember: EXO = temperature EXceeds (goes up). ENDO = ENergy absorbed (goes down)." },
  ],
  practice:[
    { q:"Burning methane gas releases heat. This is:", opts:["Endothermic — energy is absorbed","Exothermic — energy is released to the surroundings, temperature rises","Neither — energy is just transferred","Endothermic — temperature falls"], ans:1, exp:"Burning = combustion = <strong>exothermic</strong>. Energy is released — surroundings get warmer." },
    { q:"In an endothermic reaction, the temperature of the surroundings:", opts:["Increases","Stays the same","Decreases — energy is absorbed FROM the surroundings","First increases then decreases"], ans:2, exp:"Endothermic = energy <strong>absorbed from surroundings → surroundings get cooler</strong>." },
    { q:"Photosynthesis requires light energy to proceed. This makes it:", opts:["Exothermic","Endothermic — it requires (absorbs) energy input to take place","Neutral","Reversible"], ans:1, exp:"Photosynthesis absorbs light energy — it is <strong>endothermic</strong>." },
    { q:"A student mixes two solutions and notices the temperature rises by 8°C. This is evidence of:", opts:["An endothermic reaction","A physical change","An exothermic reaction — energy was released to the surroundings, raising temperature","No reaction occurring"], ans:2, exp:"Temperature rise = energy released to surroundings = <strong>exothermic reaction</strong>." },
  ],
  prevLesson:{ key:"sci-word-equations", label:"Word Equations" },
  nextLesson:{ key:"sci-apparatus", label:"Lab Apparatus" }
},

"sci-apparatus": {
  topic:"Chemical Reactions", topicKey:"Chemical Reactions", theme:"amber", icon:"⚗️",
  title:"Lab Apparatus",
  subtitle:"Key pieces of equipment, what they are used for and safety rules.",
  keyIdea:{ rule:"Know the name, appearance and purpose of each piece of apparatus — and the safety rules for the Bunsen burner.", detail:"" },
  formulae:[],
  steps:[
    { title:"Thermometer", detail:"Measures temperature in degrees Celsius (°C). Used to monitor temperature changes in reactions.", formula:"" },
    { title:"Bunsen burner", detail:"Heats substances. Has an air hole — open = blue roaring flame (hotter) · closed = yellow safety flame. Always place on a heat-proof mat.", formula:"" },
    { title:"Test tube", detail:"Small glass tube for holding and mixing chemicals. Heated at an angle, never pointed at people.", formula:"" },
    { title:"Boiling tube", detail:"Larger version of test tube. Used for mixing chemicals while heating — more room so contents don't eject.", formula:"" },
    { title:"Tripod and gauze", detail:"Tripod = metal stand placed over Bunsen burner. Gauze = wire mesh placed on top of tripod so a beaker or evaporating basin can sit on it safely.", formula:"" },
    { title:"Beaker", detail:"Glass container for holding solutions. Not for measuring accurately — use a measuring cylinder for volumes.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Bunsen safety:</strong> When not in use, always return to the yellow safety flame (air hole closed). Never leave a blue flame unattended." },
    { icon:"⭐", text:"<strong>Test tube vs boiling tube:</strong> Test tube = small, for cold mixing. Boiling tube = larger, for heating. The extra size prevents the contents from being ejected when heated." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Using a beaker to measure volume precisely. Always use a measuring cylinder for accurate volume measurements." },
    { text:"<strong>Common mistake:</strong> Heating a test tube pointing at someone. Always heat at an angle pointing away from all people." },
  ],
  practice:[
    { q:"What is the purpose of the gauze on a tripod?", opts:["To filter liquids","To provide a surface for a beaker to sit on safely above the Bunsen burner flame","To measure temperature","To hold test tubes"], ans:1, exp:"Gauze sits on top of the tripod and provides a <strong>stable surface for a beaker or basin above the Bunsen flame</strong>." },
    { q:"When is the yellow (safety) flame used on a Bunsen burner?", opts:["When heating strongly","When the experiment is in progress","When the Bunsen is not actively being used — it is the safe standby flame","When the air hole is open"], ans:2, exp:"Yellow flame = air hole <strong>closed</strong> = safety/standby flame. Used when not actively heating." },
    { q:"Why is a boiling tube used instead of a test tube when heating chemicals?", opts:["It is made of stronger glass","It is larger — provides more space so the contents are less likely to be ejected when heated","It heats more evenly","It is cheaper"], ans:1, exp:"Boiling tube is <strong>larger</strong> than a test tube — reduces risk of contents being ejected when heated." },
    { q:"What does a thermometer measure?", opts:["Volume","Mass","Temperature in degrees Celsius","Pressure"], ans:2, exp:"A thermometer measures <strong>temperature in degrees Celsius (°C)</strong>." },
  ],
  prevLesson:{ key:"sci-energy-reactions", label:"Energy in Reactions" },
  nextLesson:{ key:"sci-photosynthesis", label:"Photosynthesis" }
},

/* ════════ SCIENCE — PLANTS AND ECOSYSTEMS ════════ */
"sci-photosynthesis": {
  topic:"Plants and Ecosystems", topicKey:"Plants and Ecosystems", theme:"green", icon:"🌿",
  title:"Photosynthesis",
  subtitle:"How plants make their own food using light energy — the most important plant process.",
  keyIdea:{ rule:"Photosynthesis uses light energy, carbon dioxide and water to make glucose and oxygen. It takes place in the chloroplasts using chlorophyll.", detail:"Plants and algae are producers — they make their own food through photosynthesis. All food chains begin with a producer." },
  formulae:[
    { main:"carbon dioxide + water → glucose + oxygen", note:"Requires light energy and chlorophyll" },
    { main:"6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (symbol equation)", note:"" },
  ],
  steps:[
    { title:"Inputs (reactants)", detail:"Carbon dioxide (CO₂) — absorbed from the air through stomata in leaves. Water (H₂O) — absorbed from the soil through roots.", formula:"" },
    { title:"Outputs (products)", detail:"Glucose (C₆H₁₂O₆) — used for energy (respiration), growth, and stored as starch. Oxygen (O₂) — released as a by-product through stomata.", formula:"" },
    { title:"Where it happens", detail:"In chloroplasts, inside leaf cells. Chloroplasts contain chlorophyll — the green pigment that absorbs light energy.", formula:"" },
    { title:"Why leaves are green", detail:"Chlorophyll absorbs red and blue light for photosynthesis but reflects green light — this is why leaves appear green.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Chlorophyll</strong> absorbs light energy. Without chlorophyll, photosynthesis cannot occur — this is why plants deprived of light turn yellow and die." },
    { icon:"⭐", text:"<strong>Word equation to memorise:</strong> carbon dioxide + water → glucose + oxygen. Make sure you can write it without the prompt." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying plants get their food from soil. Plants MAKE their own food through photosynthesis. Soil provides water and mineral ions — not food." },
    { text:"<strong>Common mistake:</strong> Saying photosynthesis produces carbon dioxide. It USES CO₂ and PRODUCES oxygen." },
  ],
  practice:[
    { q:"What are the reactants (inputs) for photosynthesis?", opts:["Glucose and oxygen","Carbon dioxide and water — plus light energy","Glucose and carbon dioxide","Water and oxygen"], ans:1, exp:"<strong>Photosynthesis inputs: carbon dioxide + water</strong> (plus light energy and chlorophyll)." },
    { q:"Where in the plant cell does photosynthesis take place?", opts:["In the nucleus","In the cell membrane","In the chloroplasts — which contain chlorophyll","In the vacuole"], ans:2, exp:"Photosynthesis takes place in <strong>chloroplasts</strong>, which contain the green pigment chlorophyll." },
    { q:"Why do leaves appear green?", opts:["They absorb green light","Chlorophyll absorbs red and blue light for photosynthesis but reflects green light back","They contain lots of water","They are coated in green wax"], ans:1, exp:"Chlorophyll <strong>reflects green light</strong> (which it doesn't absorb for photosynthesis), so we see the leaves as green." },
    { q:"What is glucose used for in a plant?", opts:["Breathing only","Only structural support","Respiration for energy, growth, and stored as starch","Only for making oxygen"], ans:2, exp:"Glucose is used for <strong>respiration (energy), growth, and stored as starch</strong>." },
  ],
  prevLesson:{ key:"sci-apparatus", label:"Lab Apparatus" },
  nextLesson:{ key:"sci-minerals", label:"Mineral Ions and Deficiencies" }
},

"sci-minerals": {
  topic:"Plants and Ecosystems", topicKey:"Plants and Ecosystems", theme:"green", icon:"🌿",
  title:"Mineral Ions and Plant Deficiencies",
  subtitle:"Why plants need nitrogen, phosphorus, potassium and magnesium — and what happens when they are lacking.",
  keyIdea:{ rule:"Plants absorb mineral ions from the soil through their roots. Four key minerals: Nitrogen (N), Phosphorus (P), Potassium (K), Magnesium (Mg) — each with a specific role and deficiency symptom.", detail:"Farmers add fertilisers to replace minerals that have been removed from the soil by growing crops. Without the right minerals, plants show visible deficiency symptoms." },
  formulae:[
    { main:"N = healthy growth · P = healthy roots · K = leaves/flowers · Mg = chlorophyll", note:"NPKMg — the four key minerals" },
  ],
  steps:[
    { title:"Nitrogen (N)", detail:"Needed for healthy growth — used to make proteins and DNA. Deficiency: stunted growth, yellowing of older leaves.", formula:"" },
    { title:"Phosphorus (P)", detail:"Needed for healthy root development and energy transfer (ATP). Deficiency: poor root growth, purple discolouration of leaves.", formula:"" },
    { title:"Potassium (K)", detail:"Needed for healthy leaves and flowers, and to help enzymes work. Deficiency: yellow leaves with dead patches/brown edges.", formula:"" },
    { title:"Magnesium (Mg)", detail:"Needed to make chlorophyll. Without magnesium, chlorophyll cannot be made. Deficiency: leaves turn yellow (chlorosis) — especially between the veins.", formula:"" },
    { title:"Fertilisers", detail:"Farmers add fertilisers to replace minerals removed by crops. This increases crop yield. Natural (manure) or synthetic (NPK fertilisers).", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory trick:</strong> NPKMg — No Plants Keep Moving. N=growth, P=roots, K=flowers, Mg=chlorophyll." },
    { icon:"⭐", text:"<strong>Magnesium is the key one</strong> — the only mineral directly needed to make chlorophyll. Lack of magnesium = can't make chlorophyll = leaves yellow." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying plants get nitrogen from the air. Plants absorb nitrogen as nitrate ions (NO₃⁻) from the soil through roots — not from the air (that's nitrogen-fixing bacteria)." },
    { text:"<strong>Common mistake:</strong> Saying yellow leaves always mean lack of magnesium. Lack of nitrogen and potassium can also cause yellowing — but magnesium causes yellowing BETWEEN the veins specifically." },
  ],
  practice:[
    { q:"A plant has stunted growth and yellow older leaves. Which mineral is most likely deficient?", opts:["Potassium","Phosphorus","Magnesium","Nitrogen — needed for healthy growth and protein production"], ans:3, exp:"Stunted growth and yellow leaves → <strong>nitrogen deficiency</strong>. Nitrogen is needed for healthy growth and protein production." },
    { q:"Why do plants need magnesium?", opts:["For healthy roots","For healthy flowers","To make chlorophyll — without Mg, no chlorophyll can be produced, so leaves turn yellow","For protein production"], ans:2, exp:"Magnesium is needed <strong>to make chlorophyll</strong>. Without it, leaves cannot photosynthesise and turn yellow." },
    { q:"A plant has purple leaves and poor root growth. Which mineral is deficient?", opts:["Nitrogen","Potassium","Phosphorus — deficiency causes poor root growth and purple discolouration","Magnesium"], ans:2, exp:"<strong>Phosphorus deficiency</strong> → poor root growth and purple leaves." },
    { q:"Why do farmers add fertilisers?", opts:["To kill weeds","To water the crops","To replace mineral ions removed from soil by growing crops, increasing yield","To make the soil more acidic"], ans:2, exp:"Fertilisers <strong>replace mineral ions</strong> (especially N, P, K) that crops have removed from the soil, restoring fertility and increasing yield." },
  ],
  prevLesson:{ key:"sci-photosynthesis", label:"Photosynthesis" },
  nextLesson:{ key:"sci-food-chains", label:"Food Chains, Webs and Bioaccumulation" }
},

"sci-food-chains": {
  topic:"Plants and Ecosystems", topicKey:"Plants and Ecosystems", theme:"green", icon:"🌿",
  title:"Food Chains, Food Webs and Bioaccumulation",
  subtitle:"How energy flows through ecosystems — and why toxins concentrate in top predators.",
  keyIdea:{ rule:"Food chains show the flow of energy from producers to consumers. Arrows show the direction of energy flow. Bioaccumulation means toxins build up and become most concentrated in top predators.", detail:"A food web shows multiple interconnected food chains — it is a more realistic picture of feeding relationships in an ecosystem." },
  formulae:[
    { main:"producer → primary consumer → secondary consumer → tertiary consumer", note:"Arrows show direction of energy transfer" },
  ],
  steps:[
    { title:"Producers", detail:"Organisms that make their own food through photosynthesis. Plants, algae, phytoplankton. They are always at the START of a food chain.", formula:"" },
    { title:"Primary consumers", detail:"Organisms that eat producers (herbivores). E.g. rabbits eat grass.", formula:"" },
    { title:"Secondary consumers", detail:"Organisms that eat primary consumers. E.g. foxes eat rabbits.", formula:"" },
    { title:"What arrows mean", detail:"Arrows show the direction of ENERGY TRANSFER — from food to feeder. 'A → B' means A is eaten by B (energy flows from A to B).", formula:"" },
    { title:"Interdependence", detail:"All organisms in a food web depend on each other. If one population changes, others are affected — e.g. if rabbits decline, foxes decline too.", formula:"" },
    { title:"Bioaccumulation", detail:"Toxins (e.g. pesticides) are not broken down — they accumulate in body fat. Each organism eats many of the level below, concentrating the toxin. Top predators have the highest concentration.", formula:"" },
  ],
  worked:[{ q:"Explain bioaccumulation of a pesticide in a food chain: grass → rabbit → fox", lines:[
    { step:"Toxin entry", expr:"Pesticide sprayed on grass — absorbed into plant tissues", why:"Source of contamination" },
    { step:"Primary consumer", expr:"Rabbit eats lots of grass — accumulates pesticide in its body fat", why:"Can't break it down" },
    { step:"Secondary consumer", expr:"Fox eats many rabbits — gets all the accumulated pesticide from each rabbit", why:"Concentration multiplies at each level" },
    { step:"Result", expr:"Fox has a much higher concentration of pesticide than the grass did originally", why:"Bioaccumulation — most toxic at top of chain", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Arrow direction:</strong> The arrow goes FROM the food TO the feeder — it shows where the energy goes. 'Grass → Rabbit' means rabbit eats grass." },
    { icon:"⭐", text:"<strong>Bioaccumulation key point:</strong> The toxin is NOT broken down, AND each organism eats many of the level below. Both reasons together explain concentration increase up the chain." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Drawing food chain arrows the wrong way. 'Grass ← Rabbit' is wrong. Arrow goes FROM food TO feeder: 'Grass → Rabbit'." },
    { text:"<strong>Common mistake:</strong> Saying bioaccumulation means the toxin gets more harmful. It means the CONCENTRATION increases — which is why it becomes more harmful at the top." },
  ],
  practice:[
    { q:"In the food chain: grass → rabbit → fox, what is the producer?", opts:["Rabbit","Fox","Grass — it makes its own food through photosynthesis","The sun"], ans:2, exp:"<strong>Grass is the producer</strong> — it photosynthesises to make its own food. All food chains start with a producer." },
    { q:"What do the arrows in a food chain represent?", opts:["What eats what","The direction of energy transfer — from food to feeder","Movement of animals","Population size"], ans:1, exp:"Arrows show <strong>direction of energy transfer</strong> — from food to the organism that eats it." },
    { q:"Why do top predators have the highest concentration of toxins in bioaccumulation?", opts:["They eat the most toxic food","They cannot move away from toxins","Toxins are not broken down and accumulate at each level — top predators eat many organisms from levels below, concentrating toxins further","They spend more time near the toxin source"], ans:2, exp:"<strong>Toxins don't break down</strong> and accumulate in body fat. Each level eats many organisms from the level below, multiplying the concentration up the food chain." },
    { q:"If the rabbit population in a food web suddenly decreases, what would likely happen to the fox population?", opts:["Increase","Stay the same","Decrease — foxes depend on rabbits as a food source (interdependence)","The foxes would eat more grass instead"], ans:2, exp:"<strong>Interdependence</strong>: foxes depend on rabbits. Fewer rabbits → less food for foxes → fox population decreases." },
  ],
  prevLesson:{ key:"sci-minerals", label:"Mineral Ions and Deficiencies" },
  nextLesson:{ key:"sci-static", label:"Static Electricity" }
},


/* ════════ SCIENCE — ELECTRICITY ════════ */
"sci-static": {
  topic:"Electricity", topicKey:"Electricity", theme:"gold", icon:"⚡",
  title:"Static Electricity",
  subtitle:"How objects become charged by rubbing — and the rules of attraction and repulsion.",
  keyIdea:{ rule:"Static electricity is a build-up of electric charge on the surface of an object. It is produced by rubbing two insulating materials together — electrons are transferred from one to the other.", detail:"Only electrons move — protons stay fixed in the nucleus. An object that gains electrons becomes negatively charged. An object that loses electrons becomes positively charged." },
  formulae:[
    { main:"Like charges repel · Opposite charges attract", note:"Same sign → push apart · Different sign → pull together" },
    { main:"Negative charge = gained electrons · Positive charge = lost electrons", note:"Electrons are the only particles that move" },
  ],
  steps:[
    { title:"How static builds up", detail:"When two insulators are rubbed together, friction causes electrons to transfer from one material to the other. The material that gains electrons becomes negatively charged. The one that loses electrons becomes positively charged.", formula:"e.g. rubbing a plastic rod with a cloth" },
    { title:"Like charges repel", detail:"Two objects with the same type of charge (both + or both −) will push each other apart.", formula:"" },
    { title:"Opposite charges attract", detail:"Two objects with different charges (one + and one −) will pull toward each other.", formula:"" },
    { title:"Why insulators?", detail:"Conductors allow charge to flow away immediately. Insulators trap the charge on their surface, allowing static electricity to build up.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Only electrons move.</strong> Protons never move between objects. When you rub materials, electrons transfer — one gains (negative), one loses (positive)." },
    { icon:"⭐", text:"<strong>Static needs insulators.</strong> If the material is a conductor, charge flows away before it can build up. That's why you don't get static on metal objects." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying positive charges move. Only ELECTRONS (negative) move in static electricity." },
    { text:"<strong>Common mistake:</strong> Saying rubbing 'creates' charge. Rubbing TRANSFERS electrons — the total charge is conserved." },
  ],
  practice:[
    { q:"What is an electrostatic charge?", opts:["A flow of electricity","A build-up of electric charge on the surface of an object","A type of current","A magnetic force"], ans:1, exp:"An electrostatic charge is <strong>a build-up of electric charge on the surface of an object</strong>." },
    { q:"Which particles move to create static electricity?", opts:["Protons","Neutrons","Electrons — they transfer from one material to the other when rubbed","Ions"], ans:2, exp:"<strong>Electrons</strong> are the particles that move. Protons stay fixed in the nucleus." },
    { q:"Two plastic rods are both rubbed with the same cloth. What happens when they are brought close together?", opts:["They attract","They repel — both have gained the same type of charge (negative)","Nothing happens","They discharge"], ans:1, exp:"Both rods gained the same charge (negative) → <strong>like charges repel</strong>." },
    { q:"Why must insulators (not conductors) be used to create static electricity?", opts:["Insulators are cheaper","Insulators trap charge on their surface — conductors allow charge to flow away before it builds up","Insulators are lighter","Conductors don't get charged at all"], ans:1, exp:"<strong>Insulators trap charge</strong> on their surface. Conductors allow charge to flow away immediately, preventing static build-up." },
  ],
  prevLesson:{ key:"sci-food-chains", label:"Food Chains and Bioaccumulation" },
  nextLesson:{ key:"sci-current", label:"Current and Potential Difference" }
},

"sci-current": {
  topic:"Electricity", topicKey:"Electricity", theme:"gold", icon:"⚡",
  title:"Electric Current and Potential Difference",
  subtitle:"What current and voltage are — how to measure them and where to place meters in a circuit.",
  keyIdea:{ rule:"Current = flow of electric charge (electrons). Measured in amperes (A) with an ammeter in series. Potential difference (voltage) = energy transferred per coulomb of charge. Measured in volts (V) with a voltmeter in parallel.", detail:"Conventional current flows from positive to negative — the opposite direction to actual electron flow. Voltmeters must always be placed in parallel with the component being measured." },
  formulae:[
    { main:"Current (A) measured with ammeter — placed IN SERIES", note:"Conventional current: + to − (opposite to electron flow)" },
    { main:"Potential difference (V) measured with voltmeter — placed IN PARALLEL", note:"PD = energy transferred per coulomb of charge" },
  ],
  steps:[
    { title:"Electric current", detail:"A flow of electric charge — specifically electrons moving through a conductor. Measured in amperes (A). Measured using an ammeter placed in series (in line) with the component.", formula:"" },
    { title:"Conventional current direction", detail:"Conventional current is defined as flowing from + to − (positive terminal to negative terminal). In reality, electrons flow from − to +. This is a historical convention.", formula:"" },
    { title:"Potential difference (voltage)", detail:"The energy transferred per coulomb of charge passing through a component. Measured in volts (V). Measured using a voltmeter placed in parallel (across the component).", formula:"" },
    { title:"Where to place meters", detail:"Ammeter: IN SERIES — breaks the circuit and sits in line. If placed in parallel, it would short-circuit. Voltmeter: IN PARALLEL — connected across the component. High resistance, so barely any current flows through it.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Placement rule:</strong> Ammeter in series (in line — current flows through it). Voltmeter in parallel (across — measures energy difference either side). Wrong placement = wrong reading or damaged circuit." },
    { icon:"⭐", text:"<strong>Conventional vs electron flow:</strong> Conventional = + to −. Electrons = − to +. Most exam questions refer to conventional current." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Placing the voltmeter in series. It must be in PARALLEL (across the component). In series, a voltmeter's high resistance would stop current flowing." },
    { text:"<strong>Common mistake:</strong> Saying current flows from − to + (electron flow). Conventional current flows from + to −." },
  ],
  practice:[
    { q:"What is electric current?", opts:["The energy stored in a battery","A flow of electric charge (electrons) through a conductor, measured in amperes","The resistance of a wire","The voltage across a component"], ans:1, exp:"Electric current = <strong>flow of electric charge (electrons)</strong>, measured in <strong>amperes (A)</strong>." },
    { q:"Where must a voltmeter be placed in a circuit?", opts:["In series — in line with the component","In parallel — across the component it is measuring","Anywhere in the circuit","Before the battery"], ans:1, exp:"Voltmeter must be placed <strong>in parallel</strong> (across the component). This measures the potential difference either side." },
    { q:"In which direction does conventional current flow?", opts:["From negative to positive terminal","From positive to negative terminal — this is the conventional direction (opposite to electron flow)","In both directions simultaneously","Only in AC circuits"], ans:1, exp:"<strong>Conventional current: positive → negative</strong>. (Electrons actually flow − to +, but conventional current is defined the other way.)" },
    { q:"What does potential difference measure?", opts:["The flow of electrons","The resistance of a component","The energy transferred per coulomb of charge passing through a component, measured in volts","The power used"], ans:2, exp:"Potential difference = <strong>energy transferred per coulomb of charge</strong>, measured in <strong>volts (V)</strong>." },
  ],
  prevLesson:{ key:"sci-static", label:"Static Electricity" },
  nextLesson:{ key:"sci-resistance", label:"Resistance" }
},

"sci-resistance": {
  topic:"Electricity", topicKey:"Electricity", theme:"gold", icon:"⚡",
  title:"Resistance",
  subtitle:"What resistance is, how to calculate it, and how it affects current in a circuit.",
  keyIdea:{ rule:"Resistance is the opposition to the flow of current. Measured in ohms (Ω). Calculated using R = V ÷ I (Ohm's Law).", detail:"The higher the resistance, the harder it is for current to flow. A longer, thinner wire has more resistance than a short, thick wire." },
  formulae:[
    { main:"R = V ÷ I", note:"R = resistance (Ω) · V = potential difference (V) · I = current (A)" },
    { main:"V = I × R · I = V ÷ R", note:"Rearrange the triangle: V on top, I and R on bottom" },
  ],
  steps:[
    { title:"What is resistance?", detail:"Resistance opposes the flow of current. In a wire, electrons collide with ions in the metal lattice — these collisions slow them down. Greater resistance = less current for same voltage.", formula:"" },
    { title:"Ohm's Law: R = V ÷ I", detail:"Resistance (Ω) = Potential difference (V) ÷ Current (A). Rearrange to find: V = I × R · I = V ÷ R", formula:"" },
    { title:"Using the formula triangle", detail:"Draw a triangle with V at the top, I × R at the bottom. Cover the quantity you want to find — the remaining letters show the calculation.", formula:"V on top ÷ (I × R) on bottom" },
    { title:"Factors affecting resistance", detail:"Longer wire = more resistance · Thinner wire = more resistance · Higher temperature = more resistance (for most conductors)", formula:"" },
  ],
  worked:[{ q:"A bulb has a potential difference of 6V across it and a current of 2A flowing through it. Calculate the resistance.", lines:[
    { step:"Formula", expr:"R = V ÷ I", why:"Ohm's Law" },
    { step:"Substitute", expr:"R = 6 ÷ 2", why:"V = 6V, I = 2A" },
    { step:"Calculate", expr:"R = 3 Ω", why:"Answer with unit (ohms, Ω)", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Units matter:</strong> V in volts (V), I in amperes (A), R in ohms (Ω). Always include the unit in your answer — it's often worth a mark." },
    { icon:"⭐", text:"<strong>The triangle:</strong> V at top, I × R at bottom. Cover what you want. Cover V → remaining = I × R. Cover I → remaining = V ÷ R. Cover R → remaining = V ÷ I." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Using I ÷ V instead of V ÷ I. Remember: R = V ÷ I (voltage divided by current)." },
    { text:"<strong>Common mistake:</strong> Forgetting the unit. Resistance is in ohms — symbol Ω." },
  ],
  practice:[
    { q:"A resistor has 12V across it and 3A flowing through it. What is its resistance?", opts:["36 Ω","4 Ω","0.25 Ω","9 Ω"], ans:1, exp:"R = V ÷ I = 12 ÷ 3 = <strong>4 Ω</strong>." },
    { q:"What is the unit of resistance?", opts:["Ampere (A)","Volt (V)","Ohm (Ω)","Watt (W)"], ans:2, exp:"Resistance is measured in <strong>ohms (Ω)</strong>." },
    { q:"A circuit has a resistance of 5Ω and a current of 2A. What is the potential difference?", opts:["0.4 V","10 V","2.5 V","7 V"], ans:1, exp:"V = I × R = 2 × 5 = <strong>10 V</strong>." },
    { q:"If resistance increases in a circuit, and voltage stays the same, what happens to the current?", opts:["Increases","Stays the same","Decreases — I = V ÷ R, so higher R means lower I","Doubles"], ans:2, exp:"I = V ÷ R. If R increases and V stays constant, I <strong>decreases</strong>." },
  ],
  prevLesson:{ key:"sci-current", label:"Current and Potential Difference" },
  nextLesson:{ key:"sci-moments", label:"Turning Moments" }
},

/* ════════ SCIENCE — FORCES AND MOTION ════════ */
"sci-moments": {
  topic:"Forces and Motion", topicKey:"Forces and Motion", theme:"blue", icon:"🔵",
  title:"Turning Moments",
  subtitle:"How forces create rotation around a pivot — calculating and balancing moments.",
  keyIdea:{ rule:"Moment = force × perpendicular distance from pivot. Unit: newton-metre (Nm). For a balanced system: total clockwise moments = total anticlockwise moments.", detail:"A moment is the turning effect of a force. The further the force is from the pivot, the larger the turning effect." },
  formulae:[
    { main:"Moment (Nm) = Force (N) × distance from pivot (m)", note:"M = F × d" },
    { main:"Balanced: clockwise moments = anticlockwise moments", note:"Principle of moments" },
  ],
  steps:[
    { title:"What is a moment?", detail:"The turning effect of a force about a pivot. The larger the force, or the further it is from the pivot, the greater the moment.", formula:"" },
    { title:"Calculating a moment", detail:"Moment = Force × perpendicular distance from pivot. Unit = newton-metre (Nm).", formula:"M = F × d" },
    { title:"Balanced moments", detail:"For a system to be in balance (equilibrium): sum of clockwise moments = sum of anticlockwise moments.", formula:"" },
    { title:"Finding an unknown force", detail:"Use the balance equation. If moment = 240 Nm and distance = 1.6 m, then F = 240 ÷ 1.6 = 150 N.", formula:"F = M ÷ d" },
  ],
  worked:[{ q:"From the exam: A rope is attached 0.8m above a pivot. A force of 300N is applied. Calculate the moment.", lines:[
    { step:"Formula", expr:"Moment = Force × distance", why:"M = F × d" },
    { step:"Substitute", expr:"Moment = 300 × 0.8", why:"F = 300N, d = 0.8m" },
    { step:"Calculate", expr:"Moment = 240 Nm", why:"Unit is newton-metres (Nm)", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Distance must be perpendicular</strong> — measured at right angles to the line of action of the force. If the force is horizontal, measure the vertical distance (and vice versa)." },
    { icon:"⭐", text:"<strong>From the exam question:</strong> If moment stays the same but distance doubles (0.8m → 1.6m), force must halve. 240 ÷ 1.6 = 150N. Use M = F × d and rearrange." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Forgetting the unit. Moments are measured in newton-metres (Nm) — not just N or m alone." },
    { text:"<strong>Common mistake:</strong> Using the wrong distance. It must be the PERPENDICULAR distance from the pivot to the line of action of the force." },
  ],
  practice:[
    { q:"A force of 50N is applied 2m from a pivot. What is the moment?", opts:["25 Nm","100 Nm","52 Nm","25 N"], ans:1, exp:"M = F × d = 50 × 2 = <strong>100 Nm</strong>." },
    { q:"What are the units for a turning moment?", opts:["Newtons (N)","Metres (m)","Newton-metres (Nm)","Joules (J)"], ans:2, exp:"Turning moments are measured in <strong>newton-metres (Nm)</strong>." },
    { q:"A moment of 240Nm acts at 1.6m from the pivot. What force produces this?", opts:["384 N","150 N","241.6 N","120 N"], ans:1, exp:"F = M ÷ d = 240 ÷ 1.6 = <strong>150 N</strong>." },
    { q:"For a seesaw to be balanced, what must be true?", opts:["Both sides must have the same force","Both people must have the same weight","Clockwise moments must equal anticlockwise moments (principle of moments)","The pivot must be in the centre"], ans:2, exp:"<strong>Principle of moments:</strong> total clockwise moments = total anticlockwise moments for balance." },
  ],
  prevLesson:{ key:"sci-resistance", label:"Resistance" },
  nextLesson:{ key:"sci-pressure", label:"Pressure" }
},

"sci-pressure": {
  topic:"Forces and Motion", topicKey:"Forces and Motion", theme:"blue", icon:"🔵",
  title:"Pressure",
  subtitle:"Calculating pressure from force and area — and understanding why smaller areas create higher pressure.",
  keyIdea:{ rule:"Pressure = Force ÷ Area. Unit: N/m² or pascals (Pa). The same force spread over a smaller area creates greater pressure.", detail:"Pressure explains why sharp knives cut, why camels have wide feet, and why snowshoes prevent sinking." },
  formulae:[
    { main:"Pressure (Pa) = Force (N) ÷ Area (m²)", note:"P = F ÷ A" },
    { main:"1 Pa = 1 N/m² = 1 Nm⁻²", note:"All equivalent units — Pa is the SI unit" },
  ],
  steps:[
    { title:"What is pressure?", detail:"The force applied per unit area. The same force spread over a larger area gives lower pressure. Concentrated over a smaller area gives higher pressure.", formula:"" },
    { title:"Formula", detail:"P = F ÷ A. Force in newtons (N), area in metres squared (m²), pressure in pascals (Pa) or N/m².", formula:"" },
    { title:"Rearranging", detail:"F = P × A · A = F ÷ P", formula:"" },
  ],
  worked:[{ q:"From the exam: A broken post weighs 120N and rests on an area of 0.2m². Calculate the pressure.", lines:[
    { step:"Formula", expr:"P = F ÷ A", why:"Pressure = Force ÷ Area" },
    { step:"Substitute", expr:"P = 120 ÷ 0.2", why:"F = 120N, A = 0.2m²" },
    { step:"Calculate", expr:"P = 600 N/m² (or 600 Pa)", why:"Unit: N/m² or Pa", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Units:</strong> N/m², Pa (pascals) and Nm⁻² are all the same thing and are all acceptable in exams. Pa is the SI unit." },
    { icon:"⭐", text:"<strong>Real-world pressure:</strong> Smaller area → higher pressure for same force. Sharp knife (tiny area) cuts easily. Wide camel feet (large area) prevent sinking in sand." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Dividing area by force instead of force by area. P = F ÷ A (force divided by area)." },
    { text:"<strong>Common mistake:</strong> Using the wrong units for area. Area must be in m² not cm². Convert if needed: 1 m² = 10,000 cm²." },
  ],
  practice:[
    { q:"A force of 500N acts on an area of 0.5m². What is the pressure?", opts:["250 Pa","1000 Pa","1 Pa","0.001 Pa"], ans:1, exp:"P = F ÷ A = 500 ÷ 0.5 = <strong>1000 Pa</strong>." },
    { q:"What are the SI units for pressure?", opts:["Newtons (N)","Metres squared (m²)","Pascals (Pa) or N/m²","Newton-metres (Nm)"], ans:2, exp:"Pressure is measured in <strong>pascals (Pa)</strong>, equivalent to N/m²." },
    { q:"Why does a sharp knife cut more easily than a blunt one (same force applied)?", opts:["Sharp knives are harder","The sharp blade has a smaller area — the same force over a smaller area creates greater pressure","Sharp knives are lighter","Blunt knives create more friction"], ans:1, exp:"Sharp blade has a <strong>smaller area</strong> → same force ÷ smaller area = <strong>greater pressure</strong> → cuts more easily." },
    { q:"A pressure of 200 Pa acts over an area of 3m². What is the force?", opts:["66.7 N","203 N","600 N","197 N"], ans:2, exp:"F = P × A = 200 × 3 = <strong>600 N</strong>." },
  ],
  prevLesson:{ key:"sci-moments", label:"Turning Moments" },
  nextLesson:{ key:"sci-gravity", label:"Gravity and Weight" }
},

"sci-gravity": {
  topic:"Forces and Motion", topicKey:"Forces and Motion", theme:"blue", icon:"🔵",
  title:"Gravity and Weight",
  subtitle:"The difference between mass and weight — and why gravity varies on different planets.",
  keyIdea:{ rule:"Weight = mass × gravitational field strength (W = mg). Mass is constant everywhere. Weight depends on the gravitational field strength, which varies by planet.", detail:"Gravity on Mars is about 3.7 N/kg — much less than on Earth (10 N/kg). This means objects weigh less on Mars but have the same mass." },
  formulae:[
    { main:"W = m × g", note:"W = weight (N) · m = mass (kg) · g = gravitational field strength (N/kg)" },
    { main:"Earth: g ≈ 10 N/kg · Mars: g ≈ 3.7 N/kg · Moon: g ≈ 1.6 N/kg", note:"" },
  ],
  steps:[
    { title:"Mass vs weight", detail:"Mass = amount of matter in an object. Measured in kilograms (kg). Same everywhere in the universe. Weight = gravitational force on an object. Measured in newtons (N). Varies with gravitational field strength.", formula:"" },
    { title:"W = mg", detail:"Weight (N) = mass (kg) × gravitational field strength (N/kg). On Earth: a 10kg object weighs 10 × 10 = 100N. On Mars: same object weighs 10 × 3.7 = 37N.", formula:"" },
    { title:"Why gravity differs", detail:"Gravity depends on the mass of the planet and distance from its centre. Mars has less mass than Earth → weaker gravitational field → objects weigh less.", formula:"" },
    { title:"Speed of light / light-time context", detail:"From the exam: light travels at ~300,000 km/s. Distances in space are measured in light-time — a light-year is the DISTANCE light travels in one year (not a measure of time).", formula:"300,000 km/s × 60 = ~18,000,000 km/min" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Mass vs weight:</strong> Mass is in kilograms (kg) and never changes. Weight is in newtons (N) and changes with gravity. Common exam trap: 'the astronaut's mass on the Moon is 70kg' (unchanged). Weight changes." },
    { icon:"⭐", text:"<strong>Light-time reminder:</strong> A light-year is a DISTANCE (how far light travels in a year), not a time. The exam mark scheme specifically notes this." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying mass changes on different planets. Mass is constant. WEIGHT changes with gravitational field strength." },
    { text:"<strong>Common mistake:</strong> Saying gravity is weaker on Mars because it is 'further from the Sun'. The exam mark scheme explicitly says this is insufficient — correct answer is that Mars has less mass than Earth." },
  ],
  practice:[
    { q:"What is the difference between mass and weight?", opts:["No difference — they are the same thing","Mass is measured in newtons, weight in kg","Mass (kg) = amount of matter, constant everywhere. Weight (N) = gravitational force, varies by planet","Weight is always greater than mass"], ans:2, exp:"<strong>Mass (kg)</strong> = amount of matter — constant everywhere. <strong>Weight (N)</strong> = gravitational force — varies with gravitational field strength." },
    { q:"An object has mass 5kg. What is its weight on Earth (g = 10 N/kg)?", opts:["5 N","2 N","0.5 N","50 N"], ans:3, exp:"W = m × g = 5 × 10 = <strong>50 N</strong>." },
    { q:"Why is gravity weaker on Mars than Earth?", opts:["Mars is further from the Sun","Mars is colder","Mars has less mass than Earth — less mass means a weaker gravitational field","Mars is smaller in diameter"], ans:2, exp:"Gravity depends on the <strong>mass of the planet</strong>. Mars has less mass than Earth → weaker gravitational field → less weight. (The exam mark scheme specifically rejects 'Mars is further from the Sun'.)" },
    { q:"A light-year is:", opts:["The time light takes to travel one year","A measure of brightness","The distance light travels in one year — it is a distance, not a time","One billion kilometres"], ans:2, exp:"A light-year is a <strong>distance</strong> — the distance light travels in one year (~9.46 × 10¹² km). It is NOT a measure of time." },
  ],
  prevLesson:{ key:"sci-pressure", label:"Pressure" },
  nextLesson:{ key:"sci-sound", label:"Sound — Key Terms" }
},


/* ════════ SCIENCE — WAVES AND LIGHT ════════ */
"sci-sound": {
  topic:"Waves and Light", topicKey:"Waves and Light", theme:"violet", icon:"🌈",
  title:"Sound — Key Terms and Properties",
  subtitle:"The vocabulary of sound waves — amplitude, frequency, pitch, compression, rarefaction and more.",
  keyIdea:{ rule:"Sound is a longitudinal wave — particles vibrate back and forth in the direction the wave travels, creating compressions (squashed) and rarefactions (stretched). Frequency determines pitch. Amplitude determines loudness.", detail:"You must be able to define all the key terms on the word list — these are likely to appear in the exam." },
  formulae:[
    { main:"Frequency (Hz) = number of waves per second · measured with oscilloscope", note:"Higher frequency = higher pitch" },
    { main:"Amplitude = maximum displacement from equilibrium · measured in decibels (dB)", note:"Greater amplitude = louder sound" },
  ],
  steps:[
    { title:"Amplitude", detail:"The maximum displacement of a particle from its rest position. Larger amplitude = more energy = louder sound. Measured in decibels (dB) for sound.", formula:"" },
    { title:"Frequency and pitch", detail:"Frequency = number of complete waves per second. Measured in hertz (Hz). Higher frequency = higher pitch (more waves per second = squeakier sound).", formula:"" },
    { title:"Compression and rarefaction", detail:"Sound is a longitudinal wave. Compressions = regions where air particles are pushed together (high pressure). Rarefactions = regions where particles are spread apart (low pressure).", formula:"" },
    { title:"The ear — key structures", detail:"Pinna (outer ear) → auditory canal → eardrum (vibrates) → ossicles (tiny bones, amplify) → oval window → cochlea (converts vibrations to electrical signals) → auditory nerve → brain.", formula:"" },
    { title:"Oscilloscope", detail:"Electronic device that displays sound waves on a screen. Shows amplitude (height of wave) and frequency (number of waves). Higher wave = louder. More waves in same space = higher frequency/pitch.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Frequency vs pitch:</strong> Frequency is a physical measurement (Hz). Pitch is what we HEAR. High frequency = high pitch. They are closely linked but not the same thing." },
    { icon:"⭐", text:"<strong>Oscilloscope reading:</strong> Taller wave = louder (greater amplitude). More waves squashed in = higher frequency = higher pitch. This often appears in exam questions." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing amplitude with frequency. Amplitude = loudness. Frequency = pitch. They are independent." },
    { text:"<strong>Common mistake:</strong> Saying sound is a transverse wave. Sound is LONGITUDINAL — particles vibrate parallel to direction of travel (compressions and rarefactions)." },
  ],
  practice:[
    { q:"What is the relationship between frequency and pitch?", opts:["Higher frequency = lower pitch","Higher frequency = higher pitch — more waves per second = squeakier sound","They are unrelated","Lower frequency = higher pitch"], ans:1, exp:"<strong>Higher frequency = higher pitch.</strong> Frequency (Hz) is the physical measure; pitch is what we perceive." },
    { q:"What are compressions and rarefactions?", opts:["Parts of a transverse wave","Compressions = regions where air particles are pushed together. Rarefactions = regions where they are spread apart. Together these make a longitudinal sound wave.","The amplitude and frequency of a wave","Reflections of sound"], ans:1, exp:"<strong>Compressions</strong> = high pressure (particles squashed). <strong>Rarefactions</strong> = low pressure (particles spread out). These form the longitudinal sound wave." },
    { q:"On an oscilloscope, what does a taller wave indicate?", opts:["Higher frequency","Lower frequency","Greater amplitude — the sound is louder","Lower pitch"], ans:2, exp:"Taller wave = <strong>greater amplitude = louder sound.</strong>" },
    { q:"What is the function of the cochlea?", opts:["Amplifies sound waves","Funnels sound into the ear","Converts vibrations into electrical signals sent to the brain via the auditory nerve","Protects the eardrum"], ans:2, exp:"The <strong>cochlea</strong> converts vibrations into electrical signals, which travel to the brain via the auditory nerve." },
  ],
  prevLesson:{ key:"sci-gravity", label:"Gravity and Weight" },
  nextLesson:{ key:"sci-wave-equation", label:"The Wave Equation" }
},

"sci-wave-equation": {
  topic:"Waves and Light", topicKey:"Waves and Light", theme:"violet", icon:"🌈",
  title:"The Wave Equation",
  subtitle:"Calculating wave speed using frequency and wavelength — v = f × λ.",
  keyIdea:{ rule:"Wave speed = frequency × wavelength. v = f × λ. All waves obey this equation — sound, light, water waves.", detail:"Wave speed is measured in m/s, frequency in Hz, wavelength in metres. Rearrange to find any missing value." },
  formulae:[
    { main:"v = f × λ", note:"v = wave speed (m/s) · f = frequency (Hz) · λ = wavelength (m)" },
    { main:"f = v ÷ λ · λ = v ÷ f", note:"Rearranged forms" },
  ],
  steps:[
    { title:"The quantities", detail:"Wave speed (v): how fast the wave travels in m/s. Frequency (f): number of waves per second in Hz. Wavelength (λ): length of one complete wave in metres.", formula:"" },
    { title:"Using the formula", detail:"v = f × λ. Identify which two values you're given and which to find. Rearrange if necessary.", formula:"" },
    { title:"Formula triangle", detail:"Draw triangle with v at top, f and λ at bottom. Cover what you want: cover v → f × λ. Cover f → v ÷ λ. Cover λ → v ÷ f.", formula:"" },
  ],
  worked:[{ q:"A wave has a frequency of 500Hz and a wavelength of 0.68m. Calculate the wave speed.", lines:[
    { step:"Formula", expr:"v = f × λ", why:"Wave equation" },
    { step:"Substitute", expr:"v = 500 × 0.68", why:"f = 500Hz, λ = 0.68m" },
    { step:"Calculate", expr:"v = 340 m/s", why:"Speed of sound in air ≈ 340 m/s", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>λ is the Greek letter lambda</strong> — it always represents wavelength in physics. Don't confuse it with frequency (f) or speed (v)." },
    { icon:"⭐", text:"<strong>Speed of light = 3 × 10⁸ m/s</strong> (300,000 km/s). Speed of sound in air ≈ 340 m/s. Light travels about 1 million times faster than sound." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Multiplying f × v or λ × v instead of f × λ. The formula is v = f × λ — speed equals frequency times wavelength." },
    { text:"<strong>Common mistake:</strong> Getting units wrong. Speed in m/s, frequency in Hz, wavelength in metres." },
  ],
  practice:[
    { q:"A wave has frequency 200Hz and wavelength 1.5m. What is the wave speed?", opts:["133 m/s","300 m/s","201.5 m/s","298.5 m/s"], ans:1, exp:"v = f × λ = 200 × 1.5 = <strong>300 m/s</strong>." },
    { q:"The speed of sound is 340 m/s and the wavelength is 0.85m. What is the frequency?", opts:["289 Hz","28.9 Hz","400 Hz","289 m/s"], ans:2, exp:"f = v ÷ λ = 340 ÷ 0.85 = <strong>400 Hz</strong>." },
    { q:"What does λ (lambda) represent in the wave equation?", opts:["Wave speed","Frequency","Wavelength — the length of one complete wave","Amplitude"], ans:2, exp:"<strong>λ (lambda) = wavelength</strong> — the length of one complete wave cycle, measured in metres." },
    { q:"A wave travels at 1500 m/s with a frequency of 3000Hz. What is its wavelength?", opts:["4,500,000 m","0.5 m","2 m","0.002 m"], ans:1, exp:"λ = v ÷ f = 1500 ÷ 3000 = <strong>0.5 m</strong>." },
  ],
  prevLesson:{ key:"sci-sound", label:"Sound — Key Terms" },
  nextLesson:{ key:"sci-reflection", label:"Light — Reflection and Materials" }
},

"sci-reflection": {
  topic:"Waves and Light", topicKey:"Waves and Light", theme:"violet", icon:"🌈",
  title:"Light — Reflection and Materials",
  subtitle:"The law of reflection, transparent/translucent/opaque materials, and how light behaves at surfaces.",
  keyIdea:{ rule:"Law of reflection: angle of incidence = angle of reflection (both measured from the normal). Transparent materials transmit light. Translucent materials scatter it. Opaque materials absorb/reflect it and cast shadows.", detail:"The normal is an imaginary line drawn at 90° to the surface at the point where the ray hits. All angles are measured from the normal, not the surface." },
  formulae:[
    { main:"Angle of incidence = angle of reflection", note:"Both measured from the NORMAL (not the surface)" },
    { main:"Transparent → transmits · Translucent → scatters · Opaque → no transmission → shadow", note:"" },
  ],
  steps:[
    { title:"The law of reflection", detail:"When light hits a mirror (or any smooth surface), it bounces off. The angle at which it hits (angle of incidence) equals the angle at which it leaves (angle of reflection). Both are measured from the normal.", formula:"i = r" },
    { title:"The normal", detail:"An imaginary line drawn at exactly 90° (perpendicular) to the reflecting surface at the point of incidence. All reflection angles are measured from this line.", formula:"" },
    { title:"Virtual images in mirrors", detail:"The image you see in a mirror appears to be behind the mirror — it is virtual (cannot be projected onto a screen). It is the same size as the object, same distance behind the mirror as the object is in front.", formula:"" },
    { title:"Transparent, translucent, opaque", detail:"Transparent (glass, clear plastic): most light is transmitted through. Translucent (frosted glass, tissue paper): light passes through but is scattered — blurry. Opaque (wood, metal): no light is transmitted, a shadow is produced.", formula:"" },
    { title:"Luminous vs non-luminous", detail:"Luminous objects produce their own light (Sun, bulb, candle). Non-luminous objects do not produce light — we see them because they reflect light.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Always measure from the normal:</strong> Students often measure from the surface by mistake. The normal is the 90° line — angles of incidence and reflection are measured from it." },
    { icon:"⭐", text:"<strong>Virtual image:</strong> An image you cannot project onto a screen. Mirror images are virtual — they appear behind the mirror but light doesn't actually come from there." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Measuring angles from the surface instead of the normal. Always measure from the NORMAL (90° to the surface)." },
    { text:"<strong>Common mistake:</strong> Saying opaque objects absorb all light. Opaque objects may absorb OR reflect light — they just don't TRANSMIT it through." },
  ],
  practice:[
    { q:"The law of reflection states that:", opts:["The angle of incidence is always 90°","The angle of incidence equals the angle of reflection, both measured from the normal","Light always reflects at 45°","The angle of reflection is always greater than the angle of incidence"], ans:1, exp:"<strong>Angle of incidence = angle of reflection</strong>, both measured from the NORMAL." },
    { q:"A ray of light hits a mirror at an angle of incidence of 35°. What is the angle of reflection?", opts:["55°","70°","35° — angle of reflection equals angle of incidence","90°"], ans:2, exp:"Angle of reflection = angle of incidence = <strong>35°</strong>." },
    { q:"Frosted glass is an example of a:", opts:["Transparent material","Opaque material","Translucent material — it scatters light so you can see through but not clearly","Luminous material"], ans:2, exp:"Frosted glass is <strong>translucent</strong> — light passes through but is scattered, giving a blurry image." },
    { q:"What is a luminous object?", opts:["Any object we can see","An object that reflects light","An object that produces its own light — e.g. the Sun, a candle, a light bulb","An object that transmits light"], ans:2, exp:"A luminous object <strong>produces its own light</strong> (Sun, stars, bulbs, candles). Non-luminous objects only reflect light." },
  ],
  prevLesson:{ key:"sci-wave-equation", label:"The Wave Equation" },
  nextLesson:{ key:"sci-colour", label:"Colour, Filters and the Eye" }
},

"sci-colour": {
  topic:"Waves and Light", topicKey:"Waves and Light", theme:"violet", icon:"🌈",
  title:"Colour, Filters and How We See",
  subtitle:"Primary colours of light, how filters work, seeing coloured objects, and how eyes and cameras focus light.",
  keyIdea:{ rule:"The primary colours of light are red, green and blue (RGB). White light is a mixture of all colours. Filters SUBTRACT colours — they only transmit their own colour. We see a coloured object because it reflects that colour and absorbs all others.", detail:"Light colour mixing (additive) is different from paint colour mixing (subtractive). Red + Green + Blue light = white light." },
  formulae:[
    { main:"Primary colours of light: Red + Green + Blue = White", note:"Additive mixing" },
    { main:"Red + Green = Yellow · Red + Blue = Magenta · Green + Blue = Cyan", note:"Secondary colours of light" },
    { main:"Filter: only transmits its own colour, absorbs all others", note:"e.g. red filter → only red light passes through" },
  ],
  steps:[
    { title:"Primary colours of light", detail:"Red, green and blue. These combine additively: R+G = yellow, R+B = magenta, G+B = cyan, R+G+B = white.", formula:"" },
    { title:"How filters work", detail:"A coloured filter only transmits (lets through) its own colour — it absorbs all others. A red filter transmits red and absorbs green and blue. So white light through a red filter appears red.", formula:"" },
    { title:"Seeing coloured objects", detail:"A red apple looks red because it reflects red light and absorbs all other colours. In green light, a red apple would look black (no red light to reflect).", formula:"" },
    { title:"Prisms and spectra", detail:"A prism refracts different colours by different amounts — dispersing white light into a spectrum (ROYGBIV). Violet is refracted most, red least.", formula:"" },
    { title:"How the eye focuses light", detail:"Light enters through the cornea and lens. The lens refracts light onto the retina (back of eye). The image on the retina is inverted. Photoreceptors (rods and cones) detect light and send signals via the optic nerve to the brain.", formula:"" },
  ],
  worked:[{ q:"A white object is lit by blue light only. What colour does it appear?", lines:[
    { step:"White object", expr:"Reflects all colours of light", why:"White = reflects everything" },
    { step:"Blue light only", expr:"Only blue light is present in the room", why:"No red or green light to reflect" },
    { step:"Result", expr:"The object appears BLUE", why:"It can only reflect the blue light that is hitting it", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Filter trick:</strong> A red filter only lets RED through. Put a blue filter AND a red filter in series → no light gets through (red absorbs blue, blue absorbs red)." },
    { icon:"⭐", text:"<strong>Seeing colour rule:</strong> An object's colour = the colour it REFLECTS. If that colour is not in the light shining on it, the object absorbs everything and looks black." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing light colour mixing (additive, RGB→white) with paint mixing (subtractive, RGB→black/brown)." },
    { text:"<strong>Common mistake:</strong> Saying a red filter 'adds' red light. It does not. It ABSORBS all other colours and TRANSMITS only red." },
  ],
  practice:[
    { q:"What are the three primary colours of light?", opts:["Red, yellow, blue","Red, green, blue — these combine to make white light","Cyan, magenta, yellow","Red, orange, violet"], ans:1, exp:"Primary colours of light: <strong>Red, Green, Blue (RGB)</strong>. They combine to make white light." },
    { q:"A red filter is placed in front of white light. What colour comes through?", opts:["White","Yellow","Red — the filter absorbs all other colours and only transmits red","Green"], ans:2, exp:"A red filter <strong>absorbs all colours except red</strong> → only red light is transmitted." },
    { q:"A green leaf is placed under red light only. What colour does it appear?", opts:["Green","Red","Black — a green object reflects green light only. In red light there is no green to reflect, so it absorbs all light and appears black","Yellow"], ans:2, exp:"Green leaf reflects green, absorbs red. Under red light: <strong>no green light to reflect → appears black</strong>." },
    { q:"In the eye, where is the image formed?", opts:["On the lens","On the cornea","On the retina — the lens focuses light onto the back of the eye where photoreceptors detect it","On the optic nerve"], ans:2, exp:"Light is focused by the lens onto the <strong>retina</strong> — photoreceptors here detect it and send signals via the optic nerve to the brain." },
  ],
  prevLesson:{ key:"sci-reflection", label:"Reflection and Materials" },
  nextLesson:null
},


}; // end LESSONS

/* ── QUIZ QUESTIONS ─────────────────────────────────────────── */
const QUIZ_QUESTIONS = {

  maths: [
    // INDICES
    { topic:"Indices", q:"What is 2⁴ × 2³ as a single power?", opts:["2⁷","2¹²","4⁷","2¹"], ans:0, exp:"Multiply → ADD powers: 2⁷." },
    { topic:"Indices", q:"Write 60 as a product of prime factors.", opts:["2²×3×5","2×3×10","4×15","2³×3²"], ans:0, exp:"60=2²×3×5." },
    { topic:"Indices", q:"What is 5⁻²?", opts:["−25","1/25","−1/25","25"], ans:1, exp:"5⁻² = 1/5² = 1/25." },
    { topic:"Indices", q:"What is (3²)³?", opts:["3⁵","3⁶","9³","3⁸"], ans:1, exp:"Power of power → multiply: 2×3=6. Answer: 3⁶." },
    { topic:"Indices", q:"Find the HCF of 24 and 36.", opts:["6","8","12","4"], ans:2, exp:"24=2³×3, 36=2²×3². Overlap: 2²×3=12." },
    { topic:"Indices", q:"Simplify: x⁵ ÷ x²", opts:["x³","x⁷","x¹⁰","x²"], ans:0, exp:"Divide → subtract: 5−2=3. x³." },
    // TRANSFORMATIONS
    { topic:"Transformations", q:"Order of rotational symmetry of a square?", opts:["1","2","4","8"], ans:2, exp:"Matches at 90°,180°,270°,360°. Order 4." },
    { topic:"Transformations", q:"Reflect A(3,1) in the y-axis. Where is A'?", opts:["(3,−1)","(−3,1)","(1,3)","(−3,−1)"], ans:1, exp:"y-axis: flip x-sign. (−3,1)." },
    { topic:"Transformations", q:"Three things needed to describe a rotation:", opts:["Size, shape, area","Angle, direction, centre","Vector, line, angle","Colour, position, size"], ans:1, exp:"Angle, direction, centre of rotation." },
    { topic:"Transformations", q:"Point (2,5) translated by (3/−4). New position?", opts:["(5,1)","(−1,8)","(5,9)","(6,1)"], ans:0, exp:"x:2+3=5, y:5−4=1. (5,1)." },
    // BRACKETS
    { topic:"Brackets", q:"Expand: 3(2x−5)", opts:["6x−15","6x−5","6x+15","5x−15"], ans:0, exp:"6x−15." },
    { topic:"Brackets", q:"Expand: (x+3)(x+4)", opts:["x²+7x+12","x²+7x+7","x²+12","x²+4x+12"], ans:0, exp:"FOIL: x²+7x+12." },
    { topic:"Brackets", q:"Factorise fully: 12x+8", opts:["4(3x+2)","2(6x+4)","4(3x+8)","12(x+8)"], ans:0, exp:"HCF=4. 4(3x+2)." },
    { topic:"Brackets", q:"If p=4, q=−3, find 2p−q²", opts:["−1","−17","1","17"], ans:0, exp:"2(4)−(−3)²=8−9=−1." },
    { topic:"Brackets", q:"Expand and simplify: 2(x+5)+3(x−2)", opts:["5x+4","5x+16","5x−4","5x+1"], ans:0, exp:"2x+10+3x−6=5x+4." },
    // LINEAR EQUATIONS
    { topic:"Linear Equations", q:"Solve: 3x+7=22", opts:["x=5","x=4","x=6","x=3"], ans:0, exp:"3x=15, x=5." },
    { topic:"Linear Equations", q:"Solve: 5x−3=2x+9", opts:["x=2","x=3","x=4","x=6"], ans:2, exp:"3x=12, x=4." },
    { topic:"Linear Equations", q:"Solve: x/3+2=6", opts:["x=4","x=12","x=8","x=24"], ans:1, exp:"x/3=4, x=12." },
    { topic:"Linear Equations", q:"Solve: 2(3x−1)=16", opts:["x=2","x=3","x=4","x=6"], ans:1, exp:"6x−2=16, 6x=18, x=3." },
    // FRACTIONS & %
    { topic:"Fractions & %", q:"Calculate: ²⁄₃ × ³⁄₄", opts:["1/2","2/3","5/7","6/12"], ans:0, exp:"6/12=1/2." },
    { topic:"Fractions & %", q:"Jacket costs £80, reduced 15%. Sale price?", opts:["£12","£65","£68","£92"], ans:2, exp:"80×0.85=£68." },
    { topic:"Fractions & %", q:"Price rises £50→£60. % increase?", opts:["10%","15%","20%","25%"], ans:2, exp:"(10÷50)×100=20%." },
    { topic:"Fractions & %", q:"Calculate: ³⁄₄ ÷ ¹⁄₂", opts:["3/8","1½","3/2","6/4"], ans:1, exp:"KCF: 3/4×2=6/4=1½." },
    // SQUARES & ROUNDING
    { topic:"Squares & Rounding", q:"Round 0.07463 to 2 sig figs.", opts:["0.07","0.075","0.074","0.0746"], ans:1, exp:"1st sf=7, 2nd=4. Next=6≥5 round up: 0.075." },
    { topic:"Squares & Rounding", q:"What is √169?", opts:["12","13","14","11"], ans:1, exp:"13×13=169. √169=13." },
    { topic:"Squares & Rounding", q:"Estimate √50 to 1 d.p.", opts:["6.5","7.1","7.5","8.0"], ans:1, exp:"√49=7, √64=8. ≈7.1." },
    { topic:"Squares & Rounding", q:"Round 34,756 to 3 sig figs.", opts:["34,700","34,800","35,000","34,756"], ans:1, exp:"3sf: 3,4,7. Next=5≥5 round up: 34,800." },
    // CIRCLES
    { topic:"Circles", q:"Circumference of circle, diameter 10 cm? (π=3.14)", opts:["31.4 cm","15.7 cm","78.5 cm","314 cm"], ans:0, exp:"C=πd=31.4 cm." },
    { topic:"Circles", q:"Area of circle, radius 5 cm? (π=3.14)", opts:["15.7 cm²","31.4 cm²","78.5 cm²","157 cm²"], ans:2, exp:"A=πr²=78.5 cm²." },
    { topic:"Circles", q:"What fraction is a semi-circle arc of a full circle?", opts:["1/4","1/2","3/4","1/3"], ans:1, exp:"Semi = ½ of full circle." },
    // STANDARD FORM
    { topic:"Standard Form", q:"Write 34,000,000 in standard form.", opts:["3.4×10⁷","34×10⁶","3.4×10⁶","0.34×10⁸"], ans:0, exp:"3.4×10⁷." },
    { topic:"Standard Form", q:"Write 6.2×10⁻³ as an ordinary number.", opts:["6200","620","0.062","0.0062"], ans:3, exp:"Move 3 left: 0.0062." },
    { topic:"Standard Form", q:"(2×10³)×(4×10⁵) =", opts:["8×10⁸","8×10¹⁵","6×10⁸","8×10⁷"], ans:0, exp:"2×4=8, 3+5=8. 8×10⁸." },
    // STATISTICS
    { topic:"Statistics", q:"Mean of: 4,7,9,2,8", opts:["7","6","5","8"], ans:1, exp:"30÷5=6." },
    { topic:"Statistics", q:"Median of: 3,8,1,6,4", opts:["4","6","3","8"], ans:0, exp:"Sorted: 1,3,4,6,8. Middle=4." },
    { topic:"Statistics", q:"'Shoe size' is:", opts:["Continuous","Discrete","Qualitative","None"], ans:1, exp:"Discrete — specific values only." },
    { topic:"Statistics", q:"Temperatures in a week: 12,15,11,14,13,16,10°C. Range?", opts:["4°C","5°C","6°C","7°C"], ans:2, exp:"16−10=6°C." },
  ],

  english: [
    // READING A POEM
    { topic:"Reading a Poem", q:"First thing to do when you get an unseen poem?", opts:["Start writing","Read the poem first","Read the question and highlight the command words","Count the stanzas"], ans:2, exp:"Always read the <strong>question FIRST</strong> and highlight command words." },
    { topic:"Reading a Poem", q:"The teacher recommends three paragraph angles. They are:", opts:["Intro, body, conclusion","Language, Form, Structure","Simile, metaphor, alliteration","Meaning, message, mood"], ans:1, exp:"<strong>Language, Form, Structure</strong> — covers everything in any poem." },
    { topic:"Reading a Poem", q:"A volta is:", opts:["A type of simile","A turn or shift in the poem's tone, argument or perspective","The rhyme scheme","A pause mid-line"], ans:1, exp:"<strong>Volta</strong> = a turn or shift in the poem." },
    { topic:"Reading a Poem", q:"Your essay plan should include:", opts:["Drawing of setting","Thesis + 3 topic sentences (Language/Form/Structure) + quotes under each","Every technique","Poet's biography"], ans:1, exp:"<strong>Thesis + 3 topic sentences + quotes and techniques under each.</strong>" },
    // ESSAY WRITING
    { topic:"Essay Writing", q:"PEEA stands for:", opts:["Poem, Evidence, Effect, Argument","Point, Evidence, Explain, Analysis","Point, Example, Evaluate, Answer","Paragraph, Evidence, Explore, Analysis"], ans:1, exp:"<strong>PEEA = Point, Evidence, Explain, Analysis</strong>." },
    { topic:"Essay Writing", q:"Difference between Explain and Analysis in PEEA?", opts:["No difference","Explain = overall meaning of quote; Analysis = zoom into specific words and ask WHY","Explain is longer","Analysis comes before Evidence"], ans:1, exp:"<strong>Explain = overall meaning. Analysis = zoom into specific words and WHY the poet chose them.</strong>" },
    { topic:"Essay Writing", q:"Your conclusion should NOT:", opts:["Restate the thesis","Comment on writer's purpose","Introduce a brand new argument with new quotes","Summarise briefly"], ans:2, exp:"<strong>Never introduce a new argument in the conclusion.</strong>" },
    // PETAL
    { topic:"PETAL", q:"PETAL stands for:", opts:["Point, Example, Technique, Argument, Link","Point, Evidence, Technique, Analysis, Link","Poem, Evidence, Technique, Analysis, Literature","Point, Explain, Technique, Argument, Link"], ans:1, exp:"<strong>PETAL = Point, Evidence, Technique, Analysis, Link</strong>." },
    { topic:"PETAL", q:"The teacher's L (Link) says to link back to:", opts:["The poet's biography","Your thesis statement","The poem title","The rhyme scheme"], ans:1, exp:"L = <strong>link your point back to your thesis statement</strong>." },
    { topic:"PETAL", q:"The teacher's A (Analysis) says to analyse:", opts:["Just one technique","The impact of evidence AND techniques and how they work together to support the point","Only similes","The rhyme scheme only"], ans:1, exp:"A = <strong>impact of evidence AND techniques and how they work together</strong>." },
    // POETIC TECHNIQUES
    { topic:"Poetic Techniques", q:"What is pathetic fallacy?", opts:["A weak comparison","Giving human feelings to nature or weather to create a mood","A type of alliteration","Repetition for emphasis"], ans:1, exp:"<strong>Pathetic fallacy</strong> = giving human feelings to nature/weather to mirror the speaker's emotions." },
    { topic:"Poetic Techniques", q:"What is a plosive?", opts:["A soft 's' sound","A rhyming device","An abrupt sound made with /b/, /p/, /t/ or /d/","A type of metaphor"], ans:2, exp:"<strong>Plosive</strong> = abrupt consonant sounds — creates harsh, forceful effect." },
    { topic:"Poetic Techniques", q:"What is anaphora?", opts:["End rhyme","Using a word previously used — repetition at phrase starts for emphasis","A pause mid-line","A type of metaphor"], ans:1, exp:"<strong>Anaphora</strong> = using a word previously used — creates emphasis and insistence." },
    { topic:"Poetic Techniques", q:"What is hyperbole?", opts:["Understatement","Exaggeration to emphasise a point","A type of rhyme","A structural device"], ans:1, exp:"<strong>Hyperbole</strong> = exaggeration to emphasise." },
    { topic:"Poetic Techniques", q:"What is symbolism?", opts:["A type of rhyme","A comparison using 'as'","A word/object representing something beyond its literal meaning","Repetition of sounds"], ans:2, exp:"<strong>Symbolism</strong> = a word/object representing something beyond its literal meaning." },
    { topic:"Poetic Techniques", q:"What is a semantic field?", opts:["A field where poems grow","Words that relate to each other — same category of meaning","A type of stanza","The poem's setting"], ans:1, exp:"<strong>Semantic field</strong> = group of related words creating a dominant atmosphere." },
    // SENTENCE STEMS
    { topic:"Sentence Stems", q:"Best stem to introduce technique analysis:", opts:["I think there is a simile.","The poem uses language.","The repetition of 'must' implies the mother has no choice — motherhood is an inescapable duty.","It is effective."], ans:2, exp:"<strong>Name technique + embed quote + analytical verb + interpretation.</strong>" },
    { topic:"Sentence Stems", q:"Teacher's stem for deeper meaning:", opts:["The poem is about…","Initially it seems about ___ but deep down I think the author is saying ___","The techniques include…","The poem ends with…"], ans:1, exp:"<strong>'Initially it seems about ___ but deep down the author is saying ___'</strong>." },
    { topic:"Sentence Stems", q:"Best multiple interpretation stem:", opts:["The poem means this one thing.","This image could suggest…, but it might also imply…","There is only one meaning.","The poet is confused."], ans:1, exp:"<strong>'This image could suggest…, but it might also imply…'</strong>." },
    // TERMINOLOGY
    { topic:"Terminology", q:"What is a quatrain?", opts:["2-line stanza","4-line stanza","6-line stanza","14-line poem"], ans:1, exp:"<strong>Quatrain</strong> = four-line stanza." },
    { topic:"Terminology", q:"What is a sestet?", opts:["2-line stanza","4-line stanza","6-line stanza","14-line poem"], ans:2, exp:"<strong>Sestet</strong> = six-line stanza." },
    { topic:"Terminology", q:"What is blank verse?", opts:["Poetry with rhyme","Non-rhyming poetry often in iambic pentameter","Free verse with no metre","A type of sonnet"], ans:1, exp:"<strong>Blank verse</strong> = non-rhyming but metrically regular." },
    { topic:"Terminology", q:"What is an elegy?", opts:["A joyful poem","A poem focused on death or loss","A dramatic monologue","A type of sonnet"], ans:1, exp:"<strong>Elegy</strong> = a poem focused on death or loss." },
    { topic:"Terminology", q:"What is persona?", opts:["The poet themselves","The speaker of a poem, separate from the poet","The poem's title","The rhyme scheme"], ans:1, exp:"<strong>Persona</strong> = the speaker of the poem." },
    // ANALYSIS METHOD
    { topic:"Analysis Method", q:"The five analytical lenses are:", opts:["Intro, body, conclusion, summary, evaluation","Deeper meaning, language choices, links within text, reader impact, multiple interpretations","Simile, metaphor, alliteration, assonance, sibilance","Point, evidence, explain, analysis, link"], ans:1, exp:"<strong>Deeper meaning · Language choices · Links within text · Reader impact · Multiple interpretations.</strong>" },
    { topic:"Analysis Method", q:"'Things have changed here because earlier ___ but now ___' is used for:", opts:["Introducing a quote","Links within the text — showing structural development","Defining a technique","Writing a conclusion"], ans:1, exp:"<strong>Links within the text</strong> — connects parts of the poem to show how meaning develops." },
    // PRACTICE POEMS
    { topic:"Practice Poems", q:"In 'Song of the Old Mother', the repetition of 'must' suggests:", opts:["She enjoys her work","No choice — motherhood is an inescapable duty","She is very organised","She is young"], ans:1, exp:"'Must' repeated = <strong>obligation, no choice, burden</strong>." },
    { topic:"Practice Poems", q:"In 'First Love', the three stanzas move from physical reactions → confusion → despair. This shows:", opts:["Random structure","Structural development — love becomes more painful over time","The ABAB rhyme scheme","Free verse"], ans:1, exp:"<strong>Structural development</strong> — each stanza a different stage." },
    { topic:"Practice Poems", q:"In 'The Schoolboy', 'But' at start of stanza 2 creates:", opts:["Alliteration","A volta — sudden shift from joy to misery","A simile","Sibilance"], ans:1, exp:"<strong>Volta</strong> — dramatic turn from joyful nature to oppressive school." },
    { topic:"Practice Poems", q:"Blake compares the schoolboy to a bird in a cage to show:", opts:["He likes birds","He lives near a park","How school restricts children's natural freedom and joy","He wants a pet"], ans:2, exp:"<strong>Extended metaphor</strong> — bird in cage = child in school. School is unnatural and confining." },
  ],

  geography: [
    // MAP SKILLS
    { topic:"Map Skills", q:"'Along the corridor, then up the stairs' helps you remember:", opts:["Which way to walk","Easting first (across), then Northing (up) when giving a grid reference","The scale formula","How to use a compass"], ans:1, exp:"<strong>Easting first, Northing second</strong> — along the corridor (across), then up the stairs." },
    { topic:"Map Skills", q:"Map scale 1:50,000. You measure 3 cm. Real distance?", opts:["3 km","1.5 km","15 km","150 m"], ans:1, exp:"3 × 50,000 = 150,000 cm ÷ 100,000 = <strong>1.5 km</strong>." },
    { topic:"Map Skills", q:"A 6-figure grid reference differs from a 4-figure because:", opts:["It covers a larger area","It divides each grid square into tenths — giving a precise point rather than a whole square","It uses letters","It measures height"], ans:1, exp:"6-figure <strong>divides each square into tenths</strong> — giving a ~100 m point rather than a full grid square." },
    { topic:"Map Skills", q:"Best way to measure a curved route on a map:", opts:["Ruler only","Use a piece of string along the route, then measure against the scale bar","Add all the straight bits","Estimate"], ans:1, exp:"<strong>String</strong> along the curved route — then straighten and measure against the scale bar." },
    // ANTARCTICA
    { topic:"Antarctica", q:"What percentage of Antarctica is covered by ice?", opts:["50%","75%","98%","100%"], ans:2, exp:"<strong>98%</strong> — only about 2% of Antarctica is exposed rock." },
    { topic:"Antarctica", q:"The ice-albedo effect means:", opts:["Ice absorbs heat","White ice reflects up to 90% of sunlight back into space, preventing warming","Ice creates wind","Albedo measures temperature"], ans:1, exp:"<strong>Ice-albedo effect:</strong> white ice reflects up to 90% of solar energy — very little heat is absorbed." },
    { topic:"Antarctica", q:"Who reached the South Pole first, and when?", opts:["Scott, Dec 1911","Amundsen, Dec 1911","Shackleton, Jan 1912","Amundsen, Jan 1912"], ans:1, exp:"<strong>Roald Amundsen</strong> on <strong>14 December 1911</strong> — 34 days before Scott." },
    { topic:"Antarctica", q:"Krill are important in Antarctica because:", opts:["They are very large animals","They form the base of almost all Antarctic food chains — virtually everything depends on them","They pollute the water","They are a tourist attraction"], ans:1, exp:"<strong>Krill</strong> are the keystone species of Antarctica — the base of the food chain for penguins, seals, whales and fish." },
    { topic:"Antarctica", q:"The Antarctic Treaty (1959) bans:", opts:["All scientific research","Military activity, nuclear testing and mineral mining","All tourism","All fishing"], ans:1, exp:"The <strong>Antarctic Treaty</strong> bans military activity, nuclear testing/waste disposal and freezes territorial claims. The Madrid Protocol (1991) added a 50-year mining ban." },
    { topic:"Antarctica", q:"Emperor penguins survive extreme cold through:", opts:["Migration to warmer countries","Blubber, countercurrent heat exchange, dense overlapping feathers and huddling in groups of thousands","Hibernation","Swimming in warm water"], ans:1, exp:"Emperor penguins use <strong>structural, physiological and behavioural adaptations</strong> — blubber, countercurrent blood flow, feather layers and huddling." },
    // GLOBAL FASHION
    { topic:"Global Fashion", q:"TNC stands for:", opts:["Trade and National Company","Transnational Corporation — a company operating in multiple countries","Technical and National Council","Trans-national Currency"], ans:1, exp:"<strong>TNC = Transnational Corporation</strong> — HQ in one country, operations in many others." },
    { topic:"Global Fashion", q:"The main reason most clothes are made in Asian countries:", opts:["Better quality","Significantly lower labour costs than in developed countries","Closer to designers","Better technology"], ans:1, exp:"<strong>Lower labour costs</strong> — garment workers in Bangladesh earn ~£70–100/month vs £11/hour in the UK." },
    { topic:"Global Fashion", q:"The Rana Plaza disaster (2013) was:", opts:["A factory fire in China","An 8-storey factory complex in Bangladesh that collapsed, killing 1,134 workers — cracks had been reported but workers were ordered back in","A flood that destroyed cotton fields","A workers' strike"], ans:1, exp:"<strong>Rana Plaza</strong>: factory collapse, Bangladesh, 24 April 2013 — <strong>1,134 killed</strong>. Cracks seen beforehand; workers ordered back in. Western brands' labels found in the rubble." },
    { topic:"Global Fashion", q:"Microplastics from fashion enter the ocean because:", opts:["Clothes are thrown into rivers","Synthetic fabrics release tiny plastic fibres when washed — passing through water treatment into waterways","Cotton dissolves in water","They fall off drying racks"], ans:1, exp:"<strong>Synthetic fabrics</strong> (polyester, nylon) release ~700,000 microplastic fibres per wash — passing through water treatment into oceans." },
    // AFRICA
    { topic:"Africa", q:"Nigeria is located in which part of Africa?", opts:["North Africa","East Africa","West Africa","Southern Africa"], ans:2, exp:"<strong>Nigeria is in West Africa</strong> — Africa's most populous country with over 220 million people." },
    { topic:"Africa", q:"Being landlocked affects development because:", opts:["There is no water","Without a coast, countries have no ports — making trade more expensive and slowing economic growth","The weather is worse","There are fewer minerals"], ans:1, exp:"<strong>Landlocked countries</strong> have no ports — trade is more expensive (crossing neighbours) and harder to grow. 15 African countries are landlocked." },
    { topic:"Africa", q:"Why does Ghana receive little value from its cocoa?", opts:["Ghana grows poor quality cocoa","Processing into high-value chocolate happens in Europe/USA — Ghana exports low-value beans and receives only about 2p from each £1 chocolate bar","Ghana doesn't export cocoa","Chocolate isn't popular"], ans:1, exp:"<strong>Value chain inequality</strong> — Ghana grows the cocoa but processing (where profit is made) happens in richer countries. Ghana gets ~2p per £1 bar." },
    { topic:"Africa", q:"Fair trade helps farmers by:", opts:["Removing all tariffs","Guaranteeing a minimum price and a Fairtrade Premium for community projects — protecting farmers when world prices fall","Banning exports","Making goods cheaper for consumers"], ans:1, exp:"<strong>Fairtrade</strong> = guaranteed minimum price (protection from price falls) + Fairtrade Premium (extra money for community schools, healthcare, etc)." },
    // COASTS
    { topic:"Coasts", q:"Which erosion process involves waves compressing air into cliff cracks?", opts:["Abrasion","Attrition","Hydraulic action","Solution"], ans:2, exp:"<strong>Hydraulic action</strong> — waves trap and compress air in cracks. When the wave retreats, the pressure release shatters rock." },
    { topic:"Coasts", q:"Abrasion differs from attrition because:", opts:["They are the same","Abrasion = rocks thrown against the cliff (like sandpaper). Attrition = rocks hitting each other in the water, getting smaller and rounder","Abrasion is chemical","Attrition involves air"], ans:1, exp:"<strong>Abrasion</strong> = material thrown at cliff face. <strong>Attrition</strong> = material hitting each other, becoming smaller and rounder." },
    { topic:"Coasts", q:"The correct order of CASS formation is:", opts:["Stack → Arch → Cave → Cliff","Cave → Cliff → Arch → Stack","Cliff → Cave → Arch → Stack → Stump","Stump → Stack → Arch"], ans:2, exp:"<strong>Cliff → Cave → Arch → Stack → Stump</strong>. Waves attack headland weaknesses → cave → arch (both sides meet) → stack (roof collapses) → stump." },
    { topic:"Coasts", q:"A spit forms where:", opts:["The cliff is very hard","The coastline changes direction — longshore drift carries sediment to this point where deepening water causes deposition above sea level","The beach is wide","There are no waves"], ans:1, exp:"Spits form where the <strong>coastline changes direction</strong> (river mouths, bays) — water deepens, waves lose energy and deposit sediment that gradually builds up." },
    { topic:"Coasts", q:"The difference between hard and soft coastal engineering:", opts:["Hard is for beaches, soft for cliffs","Hard = artificial structures resisting erosion (sea walls, groynes). Soft = works with natural processes (beach nourishment, managed retreat)","Hard is cheaper","Soft uses concrete"], ans:1, exp:"<strong>Hard</strong> = artificial structures to resist erosion. <strong>Soft</strong> = works with natural processes. Hard is more expensive but more durable; soft is cheaper and more sustainable." },
    { topic:"Coasts", q:"Groynes can cause problems because:", opts:["They are ugly","By trapping sediment, they starve beaches further along the coast — causing erosion there (terminal groyne syndrome)","They are too expensive to build","They let waves through"], ans:1, exp:"<strong>Terminal groyne syndrome</strong> — groynes trap sediment on one side, starving beaches further along of material, increasing erosion there." },
  ],


  spanish: [
    // HOUSE AND HOME
    { topic:"House and Home", q:"'Vivo en un pueblo pequeño' means:", opts:["I live in a big city","I live in a small village","I live on a small farm","I live in a small flat"], ans:1, exp:"<strong>Vivo en = I live in · un pueblo = a village · pequeño = small (masculine, agrees with pueblo).</strong>" },
    { topic:"House and Home", q:"Which is correct for 'a modern flat'?", opts:["una piso moderno","un piso moderna","un piso moderno","una piso moderna"], ans:2, exp:"Piso is masculine → <strong>un piso moderno</strong>. Moderno agrees with piso (masculine singular)." },
    { topic:"House and Home", q:"'En mi casa hay un salón grande' means:", opts:["In my room there is a big garden","In my house there is a big living room","In my town there is a big hall","My house is a big living room"], ans:1, exp:"<strong>En mi casa hay = in my house there is · un salón = a living room · grande = big.</strong>" },
    { topic:"House and Home", q:"'Al lado del armario' — why 'del' not 'de el'?", opts:["It's irregular","De + el contracts to del — armario is masculine (el armario)","All prepositions use del","It sounds better"], ans:1, exp:"<strong>De + el = del</strong> (contraction). Armario is masculine (el armario) → al lado DEL armario." },
    { topic:"House and Home", q:"'Se puede nadar' means:", opts:["I swim every day","You must swim","You can swim (one can swim)","I am going to swim"], ans:2, exp:"<strong>Se puede + infinitive = you can / one can.</strong> Nadar = to swim." },
    { topic:"House and Home", q:"How do you say 'there is no garden'?", opts:["Hay un jardín","No hay jardín","No hay jardín grande","El jardín no"], ans:1, exp:"<strong>No hay = there is no / there isn't.</strong> No hay jardín = there is no garden." },
    // SCHOOL
    { topic:"School", q:"'Me gustan las matemáticas' — why 'gustan' not 'gusta'?", opts:["Matemáticas is feminine","Las matemáticas is plural — the verb agrees with the thing liked","Me always takes gustan","It's irregular"], ans:1, exp:"<strong>Las matemáticas is plural → me guSTAN.</strong> The verb agrees with what is liked (plural = gustan)." },
    { topic:"School", q:"'Son las tres y media' means:", opts:["It's quarter past three","It's half past three","It's quarter to three","It's three o'clock"], ans:1, exp:"<strong>Son las tres y media = half past three.</strong> Y media = and a half = half past." },
    { topic:"School", q:"Why 'Es la una' not 'Son las una'?", opts:["Una is feminine","La una is singular — es is used for singular (one o'clock only)","It's irregular","Tradition only"], ans:1, exp:"<strong>La una is singular</strong> (one hour) → 'es'. All other times are plural → 'son'." },
    { topic:"School", q:"'Los lunes estudio inglés' means:", opts:["Last Monday I studied English","This Monday I study English","On Mondays I study English (every week)","I love studying English"], ans:2, exp:"<strong>Los lunes (plural) = on Mondays</strong> — a habitual/regular action. Los = every." },
    { topic:"School", q:"'Llevo una camisa blanca' — why 'blanca'?", opts:["Blanca is always used for clothing","Camisa is feminine — blanco changes to blanca to agree","Blanca is the only option","It's irregular"], ans:1, exp:"<strong>Camisa is feminine (la camisa)</strong> → adjective blanco → blanca (feminine form)." },
    { topic:"School", q:"'Por desgracia, no hay una piscina en mi insti' means:", opts:["Fortunately there is a pool","Unfortunately there is no swimming pool in my school","The pool is in my school","There is a big pool"], ans:1, exp:"<strong>Por desgracia = unfortunately · no hay = there is no · piscina = swimming pool · insti = school.</strong>" },
    // GRAMMAR
    { topic:"Grammar", q:"'Una ciudad moderna' — why 'moderna' not 'moderno'?", opts:["Modern is always -a","Ciudad is feminine — moderno changes to moderna to agree","It's irregular","Moderno is for verbs only"], ans:1, exp:"<strong>Ciudad is feminine (la ciudad)</strong> → adjective must be feminine: moderno → moderna." },
    { topic:"Grammar", q:"'(Ella) estudia inglés' — is this correct?", opts:["No — should be estudias","No — should be estudio","Yes — ella takes -a ending for AR verbs: estudi-a","No — should be estudian"], ans:2, exp:"<strong>Ella (he/she) + AR verb = -a ending.</strong> Estudi- + a = estudia. Correct!" },
    { topic:"Grammar", q:"AR verbs: nosotros ending is:", opts:["-amos (trabajamos, hablamos)","- emos","-imos","-amos only for vivir"], ans:0, exp:"<strong>Nosotros + AR = -amos</strong>: trabaj-amos, habl-amos, estudi-amos." },
    { topic:"Grammar", q:"'(Tú) comes' — which verb type is 'comer'?", opts:["AR — it ends in -er","ER — tú form uses -es: com-es","IR — same as vivir","Irregular"], ans:1, exp:"<strong>Comer is ER</strong> → tú form = -es: com-es = comes. Compare AR: hablas (uses -as not -es)." },
    { topic:"Grammar", q:"'Nosotros vivimos' vs 'nosotros comemos' — why different endings?", opts:["They are the same","Vivir is IR (-imos) · Comer is ER (-emos) — only nosotros and vosotros differ between IR and ER","It's irregular","Comer is special"], ans:1, exp:"<strong>IR nosotros = -imos · ER nosotros = -emos.</strong> These are the only two forms where IR and ER differ." },
    { topic:"Grammar", q:"'Voy a estudiar teatro' — what tense is this?", opts:["Present tense","Past tense","Near future: IR conjugated (voy) + a + infinitive = I am going to study","Imperfect"], ans:2, exp:"<strong>Voy (from IR) + a + infinitive = near future.</strong> I am going to study drama." },
    { topic:"Grammar", q:"'Voy a estudio teatro' — what is wrong?", opts:["Voy is wrong","Teatro should be teatros","The infinitive must be used after 'a' — not the conjugated form: 'voy a estudiar'","Nothing is wrong"], ans:2, exp:"After 'voy a', always use the <strong>infinitive</strong>: voy a estudi-AR (not estudio)." },
    { topic:"Grammar", q:"'Me gusta nadar' — why 'gusta' not 'gustan'?", opts:["Nadar is plural","Infinitives are always treated as singular → gusta (not gustan)","Me always takes gusta","Nadar is masculine"], ans:1, exp:"<strong>Infinitives = always singular → me gusta.</strong> Me gusta + any infinitive is always gusta." },
  ],


  science: [
    // SCIENTIFIC SKILLS
    { topic:"Scientific Skills", q:"In an experiment, what is the independent variable?", opts:["What you measure","What you change deliberately","What you keep the same","The control group"], ans:1, exp:"<strong>Independent variable = what you deliberately change.</strong>" },
    { topic:"Scientific Skills", q:"The dependent variable goes on which axis of a graph?", opts:["x-axis (horizontal)","y-axis (vertical) — it is what you measure as a result","Either axis","The title"], ans:1, exp:"Dependent variable → <strong>y-axis (vertical)</strong>. Independent → x-axis." },
    { topic:"Scientific Skills", q:"What is a line of best fit?", opts:["A line connecting every data point","A smooth line/curve through the general trend with roughly equal points above and below","The steepest line possible","A line through the first and last points only"], ans:1, exp:"Line of best fit = <strong>smooth line through the general trend</strong> — does NOT connect every point." },
    // ACIDS AND ALKALIS
    { topic:"Acids and Alkalis", q:"What colour does universal indicator turn at pH 7?", opts:["Red","Orange","Green — pH 7 is neutral","Purple"], ans:2, exp:"pH 7 = neutral → <strong>green</strong> on universal indicator." },
    { topic:"Acids and Alkalis", q:"Blue litmus paper is dipped in acid. What happens?", opts:["Stays blue","Turns red — acid changes blue litmus to red","Turns green","Turns purple"], ans:1, exp:"Acid turns blue litmus <strong>red</strong>." },
    { topic:"Acids and Alkalis", q:"What are the products of: acid + alkali?", opts:["Salt + CO₂","Salt + water — neutralisation always gives these two products","Salt + oxygen","Base + water"], ans:1, exp:"Neutralisation: acid + alkali → <strong>salt + water</strong>." },
    { topic:"Acids and Alkalis", q:"Hydrochloric acid reacts with calcium carbonate. Which gas is produced?", opts:["Oxygen","Hydrogen","Carbon dioxide — acid + carbonate always produces CO₂","Nitrogen"], ans:2, exp:"Acid + carbonate → salt + water + <strong>carbon dioxide</strong>." },
    { topic:"Acids and Alkalis", q:"Sulphuric acid reacts with copper oxide. Name the salt formed.", opts:["Copper chloride","Copper sulphate — H₂SO₄ gives sulphate salts","Copper nitrate","Copper carbonate"], ans:1, exp:"H₂SO₄ → sulphate. Copper from copper oxide. Salt = <strong>copper sulphate</strong>." },
    // CHEMICAL REACTIONS
    { topic:"Chemical Reactions", q:"Which of these is a chemical change?", opts:["Melting butter","Dissolving sugar","Burning paper — new substances (CO₂, ash, water) are formed","Cutting wood"], ans:2, exp:"Burning = <strong>chemical change</strong>. New substances formed, irreversible." },
    { topic:"Chemical Reactions", q:"In a word equation, what symbol is used?", opts:["=","→ (an arrow) — showing reactants convert to products","≈","±"], ans:1, exp:"Word equations use <strong>→ (an arrow)</strong>, not an equals sign." },
    { topic:"Chemical Reactions", q:"Iron reacts with oxygen. Name the product.", opts:["Iron sulphide","Iron carbonate","Iron oxide — metal + oxygen → metal oxide","Iron hydroxide"], ans:2, exp:"Metal + oxygen → metal <strong>oxide</strong>. Iron + oxygen → iron oxide." },
    { topic:"Chemical Reactions", q:"In an exothermic reaction, the temperature of the surroundings:", opts:["Decreases","Stays the same","Increases — energy is released to the surroundings","First decreases then increases"], ans:2, exp:"Exothermic = energy released → <strong>surroundings get hotter</strong>." },
    { topic:"Chemical Reactions", q:"What is the purpose of the gauze on a tripod?", opts:["To filter liquids","To provide a surface for a beaker to sit on safely above the Bunsen flame","To hold test tubes","To measure temperature"], ans:1, exp:"Gauze on tripod = <strong>surface for beaker to sit on safely above the Bunsen burner</strong>." },
    // PLANTS AND ECOSYSTEMS
    { topic:"Plants and Ecosystems", q:"What are the reactants (inputs) for photosynthesis?", opts:["Glucose and oxygen","Carbon dioxide and water (plus light energy)","Glucose and carbon dioxide","Water and oxygen"], ans:1, exp:"Photosynthesis inputs: <strong>carbon dioxide + water</strong> + light energy." },
    { topic:"Plants and Ecosystems", q:"A plant has purple leaves and poor root growth. Which mineral is deficient?", opts:["Nitrogen","Potassium","Phosphorus — deficiency causes poor root growth and purple leaves","Magnesium"], ans:2, exp:"<strong>Phosphorus deficiency</strong> → poor root growth and purple leaves." },
    { topic:"Plants and Ecosystems", q:"Why do plants need magnesium?", opts:["For healthy roots","For healthy flowers","To make chlorophyll — without Mg, leaves turn yellow","For protein production"], ans:2, exp:"Magnesium is needed <strong>to make chlorophyll</strong>." },
    { topic:"Plants and Ecosystems", q:"In a food chain, what do the arrows represent?", opts:["What eats what","The direction of energy transfer — from food to feeder","Movement of animals","Population changes"], ans:1, exp:"Arrows show <strong>direction of energy transfer</strong> — from food to the organism that eats it." },
    { topic:"Plants and Ecosystems", q:"Why do top predators have the highest toxin concentration in bioaccumulation?", opts:["They eat the most toxic food","Toxins don't break down — they accumulate at each level, and top predators eat many prey organisms, concentrating toxins further","They live longest","They produce more toxins"], ans:1, exp:"<strong>Toxins don't break down + each level eats many from below</strong> = concentration multiplies up the food chain." },
    // ELECTRICITY
    { topic:"Electricity", q:"Which particles move to create static electricity?", opts:["Protons","Neutrons","Electrons — they transfer from one material to the other","Ions"], ans:2, exp:"<strong>Electrons</strong> transfer during rubbing. Protons stay fixed." },
    { topic:"Electricity", q:"Where must a voltmeter be placed in a circuit?", opts:["In series","In parallel — across the component being measured","Anywhere","Before the battery"], ans:1, exp:"Voltmeter must be in <strong>parallel</strong> (across the component)." },
    { topic:"Electricity", q:"A bulb has 6V across it and 2A through it. What is its resistance?", opts:["12 Ω","3 Ω","0.33 Ω","8 Ω"], ans:1, exp:"R = V ÷ I = 6 ÷ 2 = <strong>3 Ω</strong>." },
    { topic:"Electricity", q:"In which direction does conventional current flow?", opts:["From − to +","From + to − (positive to negative terminal)","In both directions","Only in AC"], ans:1, exp:"Conventional current flows <strong>positive → negative</strong>." },
    // FORCES AND MOTION
    { topic:"Forces and Motion", q:"A force of 300N is applied 0.8m from a pivot. What is the moment?", opts:["375 Nm","240 Nm","300.8 Nm","37.5 Nm"], ans:1, exp:"M = F × d = 300 × 0.8 = <strong>240 Nm</strong>." },
    { topic:"Forces and Motion", q:"A broken post weighs 120N and rests on 0.2m². Calculate the pressure.", opts:["24 Pa","120.2 Pa","600 Pa","0.0017 Pa"], ans:2, exp:"P = F ÷ A = 120 ÷ 0.2 = <strong>600 Pa</strong>." },
    { topic:"Forces and Motion", q:"Why is weight less on Mars than Earth?", opts:["Mars is further from the Sun","Mars has less mass than Earth — less mass means a weaker gravitational field","It is colder","Mars has no atmosphere"], ans:1, exp:"Mars has <strong>less mass → weaker gravitational field → less weight</strong>." },
    { topic:"Forces and Motion", q:"What is the difference between mass and weight?", opts:["No difference","Mass (kg) is constant everywhere. Weight (N) depends on gravitational field strength and varies by planet","Weight is constant, mass varies","Mass is measured in newtons"], ans:1, exp:"<strong>Mass (kg)</strong> = constant. <strong>Weight (N)</strong> = mass × g, varies by planet." },
    // WAVES AND LIGHT
    { topic:"Waves and Light", q:"Higher frequency sound has:", opts:["Lower pitch","Higher pitch — more waves per second = squeakier sound","Greater amplitude","Lower volume"], ans:1, exp:"Higher frequency = <strong>higher pitch</strong>." },
    { topic:"Waves and Light", q:"A wave has frequency 400Hz and wavelength 0.85m. What is its speed?", opts:["470.6 m/s","340 m/s","400.85 m/s","0.002 m/s"], ans:1, exp:"v = f × λ = 400 × 0.85 = <strong>340 m/s</strong> (speed of sound)." },
    { topic:"Waves and Light", q:"The law of reflection states:", opts:["Angle of incidence = 90°","Angle of incidence = angle of reflection (both from the normal)","Reflected ray is always horizontal","Light always reflects at 45°"], ans:1, exp:"<strong>Angle of incidence = angle of reflection</strong>, both measured from the normal." },
    { topic:"Waves and Light", q:"What are the primary colours of light?", opts:["Red, yellow, blue","Red, green, blue — combine to make white light","Cyan, magenta, yellow","Red, orange, violet"], ans:1, exp:"Primary colours of light: <strong>Red, Green, Blue (RGB)</strong>." },
    { topic:"Waves and Light", q:"A green object is placed under red light only. What colour does it appear?", opts:["Green","Red","Black — no green light to reflect, so it absorbs all light","Yellow"], ans:2, exp:"Green object reflects green only. Under red light: <strong>no green to reflect → appears black</strong>." },
  ]

};
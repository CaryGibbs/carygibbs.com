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
  },
  re: {
    id: "re",
    name: "RE",
    icon: "✝️",
    tag: "Year 8 · RE · Summer Assessment 2026",
    tagline: "Creation · Covenant · Prophecy · Desert to Garden",
    gradient: ["#9b59b6","#3498db"],
    topicMeta: {
      "Key Terms":        { ...PALETTE.violet, icon:"📖" },
      "Baptism":          { ...PALETTE.blue,   icon:"💧" },
      "Prophet Amos":     { ...PALETTE.amber,  icon:"📣" },
      "Acts of Mercy":    { ...PALETTE.green,  icon:"🤝" },
      "Miracles":         { ...PALETTE.teal,   icon:"✨" },
      "Parables":         { ...PALETTE.coral,  icon:"📜" },
      "Oscar Romero":     { ...PALETTE.rose,   icon:"🕊️" },
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
        { title:"Exam timing & technique",        detail:"How long to spend on each section, how much to write",                  lessonKey:"essay-conclusion" },
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
        { title:"Repetition & other devices",detail:"Anaphora · Hyperbole · Irony · Ellipsis · Pun · Cliché · Dialect",            lessonKey:"techniques-sound" },
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
        { title:"Writer's purpose",                detail:"The poet may be trying to show… / The purpose here could be to highlight…",lessonKey:"stems-technique" },
        { title:"Deeper meanings & broader ideas", detail:"On a deeper level… / This reflects wider ideas about… because…",         lessonKey:"stems-alternative" },
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
        { title:"Tone & mood vocabulary",         detail:"Nostalgic · Melancholic · Elegiac · Defiant · Contemplative · Tender · Pathos · Satire",                 lessonKey:"term-language-1" },
      ]
    },
    {
      topic:"Analysis Method", icon:"🔬", theme:"pink",
      subtitle:"How to analyse a text — 5 lenses",
      quizTopic:"Analysis Method",
      subtopics:[
        { title:"Deeper meaning",            detail:"Initially it seems the text is about ___ but deep down the author is saying ___",      lessonKey:"stems-alternative" },
        { title:"Language choices",          detail:"The word '___' makes me feel ___ because ___ / the author has used '___' because ___",  lessonKey:"techniques-words" },
        { title:"Links within the text",     detail:"This part reminds me of ___ / Things have changed here because earlier ___ but now ___",lessonKey:"petal-l" },
        { title:"Reader impact",             detail:"The author wants a reader to feel ___ because ___ / uses ___ and ___ to make reader ___",lessonKey:"stems-alternative" },
        { title:"Multiple interpretations",  detail:"'___' could mean ___ but it could also mean ___ / author might be using ___ as symbol", lessonKey:"stems-alternative" },
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
        { title:"Model paragraph walkthrough",       detail:"Full PEEA model paragraph with teacher's own example from 'Song of the Old Mother'", lessonKey:"analysis-method" },
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
  ],

  re: [
    {
      topic:"Key Terms", icon:"📖", theme:"violet",
      subtitle:"All 17 key terms and definitions for Section A and Section C",
      quizTopic:"Key Terms",
      subtopics:[
        { title:"Original Sin, Covenant, Decalogue",  detail:"Original Sin = humanity's fallen state · Sinai Covenant = agreement between God and Moses · Decalogue = Ten Commandments", lessonKey:"re-key-terms" },
        { title:"Prophet, Priest, King, Messianic",   detail:"Three roles of Christ · Prophet speaks God's word · Priest mediates between God and people · King rules with justice", lessonKey:"re-key-terms" },
        { title:"Baptism, Advent, Repentance",        detail:"Baptism = sacrament of initiation · Advent = season of preparation · Repentance = turning away from sin", lessonKey:"re-key-terms" },
        { title:"Miracles, Parables, Conscience",     detail:"Miracles = signs of God's power · Parables = teaching stories · Conscience = inner sense of right and wrong", lessonKey:"re-key-terms" },
        { title:"Amos, John the Baptist, External Religion", detail:"Amos = 8th century prophet of justice · John the Baptist = preparer of the way · External Religion = ritual without inner conviction", lessonKey:"re-key-terms" },
      ]
    },
    {
      topic:"Baptism", icon:"💧", theme:"blue",
      subtitle:"Infant Baptism ceremony and Believer's Baptism — symbols, meaning and reasons",
      quizTopic:"Baptism",
      subtopics:[
        { title:"Infant Baptism — the ceremony",      detail:"Water · Chrism oil · White garment · Candle — each symbol and its meaning", lessonKey:"re-baptism" },
        { title:"Why Catholics baptise infants",      detail:"Removes Original Sin · Welcomes into Church · Parents and godparents make promises on child's behalf", lessonKey:"re-baptism" },
        { title:"Believer's / Adult Baptism",         detail:"Conscious personal decision · Full immersion · Baptist tradition · Faith must be personal not inherited", lessonKey:"re-baptism" },
        { title:"Baptism as sacrament",               detail:"Sacrament = outward sign of inward grace · Initiation into the Body of Christ", lessonKey:"re-baptism" },
      ]
    },
    {
      topic:"Prophet Amos", icon:"📣", theme:"amber",
      subtitle:"Life, context and teachings of the 8th century prophet of justice",
      quizTopic:"Prophet Amos",
      subtopics:[
        { title:"Who was Amos?",                      detail:"Shepherd and fig farmer from Tekoa · Called by God · Active c.760BC in Northern Kingdom of Israel", lessonKey:"re-amos" },
        { title:"Historical context",                 detail:"Period of prosperity and inequality · Rich exploiting the poor · Empty religious ritual without justice", lessonKey:"re-amos" },
        { title:"Key teachings",                      detail:"God demands justice not ritual · Care for the poor · Warning of judgement · 'Let justice roll down like water'", lessonKey:"re-amos", formula:"Amos 5:24" },
        { title:"Relevance today",                    detail:"Links to Oscar Romero · Liberation theology · Modern inequality · Catholic Social Teaching", lessonKey:"re-amos" },
      ]
    },
    {
      topic:"Acts of Mercy", icon:"🤝", theme:"green",
      subtitle:"7 Corporal and 7 Spiritual Acts of Mercy — definitions and examples",
      quizTopic:"Acts of Mercy",
      subtopics:[
        { title:"7 Corporal Acts of Mercy",           detail:"Feed the hungry · Give drink to the thirsty · Clothe the naked · Shelter the homeless · Visit the sick · Visit the imprisoned · Bury the dead", lessonKey:"re-acts-mercy" },
        { title:"7 Spiritual Acts of Mercy",          detail:"Instruct the ignorant · Counsel the doubtful · Admonish sinners · Bear wrongs patiently · Forgive offences · Comfort the afflicted · Pray for the living and dead", lessonKey:"re-acts-mercy" },
        { title:"Corporal vs Spiritual",              detail:"Corporal = physical needs of the body · Spiritual = needs of the soul · Both rooted in Matthew 25", lessonKey:"re-acts-mercy" },
        { title:"Modern examples",                    detail:"Food banks (feed hungry) · Prison chaplaincy (visit imprisoned) · Counselling (comfort afflicted) · Hospices (visit sick)", lessonKey:"re-acts-mercy" },
      ]
    },
    {
      topic:"Miracles", icon:"✨", theme:"teal",
      subtitle:"Key miracles of Jesus and what they reveal about his identity",
      quizTopic:"Miracles",
      subtopics:[
        { title:"Calming the Storm",                  detail:"Mark 4:35–41 · Jesus commands wind and waves · Shows divine authority over nature · Disciples' faith challenged", lessonKey:"re-miracles" },
        { title:"Feeding of the 5,000",               detail:"Mark 6:30–44 · 5 loaves and 2 fish · Shows compassion and provision · Foreshadows the Eucharist", lessonKey:"re-miracles" },
        { title:"Raising of Lazarus",                 detail:"John 11 · Jesus raises Lazarus after 4 days · Shows Jesus as Lord over death · 'I am the resurrection and the life'", lessonKey:"re-miracles" },
        { title:"Healing of the Blind Man",           detail:"John 9 · 'I am the light of the world' · Physical and spiritual sight · Sign of Jesus as Messiah", lessonKey:"re-miracles" },
        { title:"What miracles reveal",               detail:"Divine authority · Compassion · Fulfilment of messianic prophecy · Invitation to faith", lessonKey:"re-miracles" },
      ]
    },
    {
      topic:"Parables", icon:"📜", theme:"coral",
      subtitle:"Key parables of Jesus — meaning, message and how to write an evaluation answer",
      quizTopic:"Parables",
      subtopics:[
        { title:"What is a parable?",                 detail:"A short story with a deeper spiritual meaning · Jesus used everyday situations · Invites reflection and response", lessonKey:"re-parables" },
        { title:"Good Samaritan",                     detail:"Luke 10 · Who is my neighbour? · Love has no limits · Challenge to prejudice · Active compassion", lessonKey:"re-parables" },
        { title:"Prodigal Son",                       detail:"Luke 15 · God's unconditional forgiveness · Father runs to meet son · Repentance and restoration", lessonKey:"re-parables" },
        { title:"Lost Sheep",                         detail:"Luke 15 · God actively seeks the lost · Every person has infinite value · Joy at repentance", lessonKey:"re-parables" },
        { title:"The Sower",                          detail:"Mark 4 · Different responses to God's word · Soil = different types of hearts · Fruitfulness depends on receptiveness", lessonKey:"re-parables" },
        { title:"Evaluation answer structure",        detail:"State view → Evidence from parable → Counter-argument → Conclusion with own judgement", lessonKey:"re-parables" },
      ]
    },
    {
      topic:"Oscar Romero", icon:"🕊️", theme:"rose",
      subtitle:"Archbishop, martyr and voice of the poor — life, conversion and legacy",
      quizTopic:"Oscar Romero",
      subtopics:[
        { title:"Who was Oscar Romero?",              detail:"Archbishop of San Salvador, El Salvador · Born 1917 · Assassinated 1980 · Canonised 2018", lessonKey:"re-romero" },
        { title:"His conversion",                     detail:"Initially conservative · Radicalised by murder of friend Fr Rutilio Grande · Became voice of the poor", lessonKey:"re-romero" },
        { title:"His ministry",                       detail:"Weekly radio sermons · Challenged government and military · Spoke out against death squads · Defended human rights", lessonKey:"re-romero" },
        { title:"His death and legacy",               detail:"Shot at altar while celebrating Mass · 24 March 1980 · Canonised by Pope Francis 2018 · Symbol of prophetic courage", lessonKey:"re-romero" },
        { title:"Links to Amos and Acts of Mercy",    detail:"Modern prophet · Speaking truth to power · Living out corporal and spiritual acts of mercy", lessonKey:"re-romero" },
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



/* ════════ RE — KEY TERMS ════════ */
"re-key-terms": {
  topic:"Key Terms", topicKey:"Key Terms", theme:"violet", icon:"📖",
  title:"Key Terms — All 17 Definitions",
  subtitle:"Section A and Section C require you to know these terms precisely. Learn definition, then practise using them in sentences.",
  keyIdea:{ rule:"Learn the precise definition of each term — not just a rough idea. Exam questions often ask you to 'explain what is meant by' a term.", detail:"These 17 terms appear across all three chapters. Many connect to each other — understanding the links between them shows deeper knowledge." },
  formulae:[
    { main:"Original Sin · Sinai Covenant · Decalogue · External Religion · Baptism · Conscience", note:"Chapter 1: Creation and Covenant" },
    { main:"Prophet · Priest · King · Messianic · Amos · John the Baptist · Miracles · Parables", note:"Chapter 2: Prophecy to Promise" },
    { main:"Advent · Repentance · Baptism (also Chapter 3)", note:"Chapter 3: Desert to Garden" },
  ],
  steps:[
    { title:"Original Sin", detail:"The belief that humanity is in a fallen state as a result of Adam and Eve's disobedience in the Garden of Eden. It is not a personal sin but a condition — a tendency towards selfishness and away from God.", formula:"Catholic teaching: Original Sin is removed through Baptism." },
    { title:"Sinai Covenant", detail:"The agreement God made with Moses and the Israelites at Mount Sinai. God promised to be their God and protect them; they promised to follow his laws (the Decalogue). A covenant is more than a contract — it is a relationship of faithful love.", formula:"Key verse: 'I will be your God and you will be my people.'" },
    { title:"Decalogue", detail:"The Ten Commandments given by God to Moses at Mount Sinai. They form the foundation of the Sinai Covenant. The first three concern the relationship with God; the remaining seven concern relationships with other people.", formula:"Decalogue = Greek for 'ten words'." },
    { title:"External Religion", detail:"Going through the motions of religious practice (attending services, performing rituals) without genuine inner faith or moral living. Amos criticised the Israelites for this — worshipping God outwardly while exploiting the poor.", formula:"Amos 5:21 — 'I hate, I despise your religious festivals.'" },
    { title:"Prophet / Priest / King", detail:"Three key roles in both the Old Testament and fulfilled in Jesus. Prophet = speaks God's word to the people, often challenging injustice. Priest = mediates between God and people, offering sacrifice. King = rules with justice and cares for the people.", formula:"Jesus is described as fulfilling all three roles (Messianic triple office)." },
    { title:"Messianic", detail:"Relating to the Messiah — the 'Anointed One' expected by the Jewish people as a saviour or liberating king. Christians believe Jesus is the Messiah. 'Christ' is the Greek word for Messiah.", formula:"Messiah = Hebrew for 'anointed one'. Christ = Greek equivalent." },
    { title:"John the Baptist", detail:"Cousin of Jesus, described in the Gospels as the one who prepares the way for the Messiah. He called people to repentance and baptised them in the River Jordan. He is associated with the beginning of Advent — the season of preparation.", formula:"Isaiah 40:3 — 'A voice crying in the wilderness: prepare the way of the Lord.'" },
    { title:"Amos", detail:"An 8th century BC prophet from Tekoa (near Bethlehem). A shepherd and fig farmer, not a professional prophet. He preached in the Northern Kingdom of Israel during a time of prosperity and inequality, condemning injustice and demanding care for the poor.", formula:"Active approximately 760 BC. Book of Amos in the Old Testament." },
    { title:"Baptism", detail:"A sacrament of initiation into the Christian community. Uses water as a symbol of cleansing, new life and membership of the Body of Christ. Catholics typically baptise infants; Baptists and some other denominations practice adult/believer's baptism.", formula:"Sacrament = outward sign of inward grace." },
    { title:"Conscience", detail:"The inner sense of right and wrong — the moral compass that guides decisions. In Catholic teaching, conscience is the voice of God within a person, and Catholics are obliged to follow a well-formed conscience.", formula:"Catechism: 'Conscience is the most secret core of a person.'" },
    { title:"Advent", detail:"The liturgical season before Christmas in the Catholic calendar. A period of preparation, waiting and anticipation for the coming of Christ — both the celebration of his birth at Christmas and the expectation of his return. Lasts four weeks.", formula:"Advent = from Latin 'adventus' meaning 'coming' or 'arrival'." },
    { title:"Repentance", detail:"Turning away from sin and returning to God. In Greek: metanoia — a complete change of mind and heart, not just saying sorry. It involves recognising wrongdoing, feeling genuine sorrow, and committing to change.", formula:"Metanoia = Greek for 'change of heart/mind'." },
    { title:"Miracles", detail:"Events that appear to go beyond the natural order, seen as signs of God's power and presence. In the Gospels, Jesus performs miracles as signs that the Kingdom of God is present — not just to impress, but to reveal his identity and invite faith.", formula:"Signs that the Kingdom of God is breaking into the world." },
    { title:"Parables", detail:"Short teaching stories used by Jesus, drawn from everyday life, with a deeper spiritual meaning. Parables invite reflection and often challenge the listener's assumptions. Jesus used them to teach about the Kingdom of God, forgiveness and moral living.", formula:"Parable = from Greek 'parabole' — a comparison or analogy." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Link the terms:</strong> External Religion connects to Amos (he condemned it). Repentance connects to John the Baptist (he called for it). Baptism connects to both Repentance and John the Baptist. Seeing the links shows deeper understanding." },
    { icon:"⭐", text:"<strong>For Section C multiple choice:</strong> Know exact definitions — the wrong answers will often be close. Learn precisely what each term means, not approximately." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Confusing Covenant with Contract. A covenant is a relationship of faithful love (hesed), not just a legal agreement. It involves permanent commitment." },
    { text:"<strong>Common mistake:</strong> Saying Amos was a professional prophet. He wasn't — he was a shepherd and fig farmer, which is part of what makes his call significant." },
  ],
  practice:[
    { q:"What is the Decalogue?", opts:["The story of creation","The Ten Commandments given to Moses at Sinai","The Sermon on the Mount","The Lord's Prayer"], ans:1, exp:"<strong>Decalogue = the Ten Commandments</strong> — given by God to Moses at Sinai. From Greek 'deka' (ten) + 'logos' (words)." },
    { q:"What does 'repentance' mean in its fullest sense?", opts:["Saying sorry","Going to confession","A complete change of heart and mind (metanoia) — turning away from sin and towards God","Attending Mass"], ans:2, exp:"Repentance = <strong>metanoia</strong> — a complete change of heart and mind, not just saying sorry." },
    { q:"What is 'external religion'?", opts:["Religion practised outdoors","Going through religious rituals without genuine inner faith or moral living — criticised by Amos","A type of prayer","A Protestant term"], ans:1, exp:"External religion = <strong>ritual without genuine faith or justice</strong> — the target of Amos's criticism." },
    { q:"What does 'messianic' mean?", opts:["Relating to Moses","Relating to the Messiah — the anointed one expected as saviour, believed by Christians to be Jesus","A type of prophecy","A Jewish festival"], ans:1, exp:"Messianic = <strong>relating to the Messiah</strong> — the anointed one. 'Christ' is the Greek equivalent." },
  ],
  prevLesson:null,
  nextLesson:{ key:"re-baptism", label:"Baptism" }
},

/* ════════ RE — BAPTISM ════════ */
"re-baptism": {
  topic:"Baptism", topicKey:"Baptism", theme:"blue", icon:"💧",
  title:"The Sacrament of Baptism",
  subtitle:"Infant Baptism ceremony — symbols and meanings. Believer's Baptism — reasons and differences.",
  keyIdea:{ rule:"Baptism is the sacrament of initiation — the entry point into the Christian community. It uses water as the central symbol. Catholics baptise infants; some denominations (e.g. Baptists) only baptise believing adults.", detail:"A sacrament is an outward sign of inward grace — a visible action that effects an invisible spiritual change. There are 7 sacraments in the Catholic Church; Baptism is the first and most fundamental." },
  formulae:[
    { main:"Sacrament = outward sign of inward grace", note:"Baptism initiates a person into the Body of Christ" },
    { main:"Catholic: infant baptism · Baptist: adult/believer's baptism", note:"Both use water but differ in timing and method" },
  ],
  steps:[
    { title:"What happens in Catholic Infant Baptism", detail:"The ceremony usually takes place during or after Sunday Mass. The priest or deacon performs the rite.", formula:"" },
    { title:"Symbol 1: Water", detail:"The priest pours water over the baby's head (or immerses) three times, saying 'I baptise you in the name of the Father, the Son and the Holy Spirit.' Water symbolises cleansing from Original Sin, death to the old life and rising to new life in Christ.", formula:"" },
    { title:"Symbol 2: Chrism Oil", detail:"The baby's head is anointed with Chrism (sacred oil). Anointing signifies being set apart for God — 'christened' (anointed). It also marks the child as sharing in Jesus's roles of priest, prophet and king.", formula:"" },
    { title:"Symbol 3: White Garment", detail:"A white garment (or cloth) is placed on the baby. It symbolises purity — the cleansing of Original Sin — and the new life of Christ the child has 'put on'.", formula:"" },
    { title:"Symbol 4: Baptismal Candle", detail:"A candle lit from the Paschal (Easter) Candle is given to the parents. It symbolises Christ as the light of the world, and the responsibility of parents and godparents to raise the child in the faith.", formula:"" },
    { title:"Promises and godparents", detail:"Parents and godparents make promises on behalf of the infant — to reject sin, to believe in the faith of the Church, and to raise the child as a Catholic.", formula:"" },
    { title:"Why Catholics baptise infants", detail:"(1) Removes Original Sin — the child is born into a fallen state. (2) Welcomes the child into the community of the Church. (3) Faith is a gift, not an achievement — it is given, not earned. (4) Parents desire the best for their child from the start.", formula:"" },
    { title:"Believer's / Adult Baptism", detail:"Practised by Baptists and many evangelical Christians. The candidate must be old enough to make a conscious personal decision of faith. They are fully immersed in water — symbolising dying to the old life and rising to new life in Christ.", formula:"" },
    { title:"Arguments for Believer's Baptism", detail:"(1) Baptism should be a personal decision — infants cannot choose. (2) The New Testament shows adults being baptised after professing faith. (3) Full immersion better symbolises death and resurrection. (4) It is a public testimony of personal faith.", formula:"" },
  ],
  worked:[{ q:"Explain two symbols used in Catholic Infant Baptism", lines:[
    { step:"Symbol 1", expr:"Water is poured over the baby's head three times.", why:"Identifies the symbol clearly" },
    { step:"Meaning", expr:"Water symbolises cleansing from Original Sin and the start of new life in Christ.", why:"Explains the spiritual meaning" },
    { step:"Symbol 2", expr:"A white garment is placed on the baby.", why:"Second symbol named" },
    { step:"Meaning", expr:"It represents purity and the new life of Christ the child has 'put on' — Original Sin has been washed away.", why:"Full explanation of meaning", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Four symbols to know:</strong> Water (cleansing/new life) · Chrism oil (anointing/set apart) · White garment (purity) · Candle (Christ as light). Learn symbol + meaning for each." },
    { icon:"⭐", text:"<strong>For the evaluation question:</strong> Arguments FOR Believer's Baptism (conscious choice, NT evidence) vs arguments FOR Infant Baptism (removes Original Sin, God's gift not achievement). Know both sides." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying Baptism 'makes you a Christian'. More precisely, it initiates you into the Body of Christ (the Church) and removes Original Sin." },
    { text:"<strong>Common mistake:</strong> Saying Baptists don't believe in Baptism. They do — they just believe it should follow a personal decision of faith." },
  ],
  practice:[
    { q:"What does the white garment symbolise in Catholic Infant Baptism?", opts:["The priest's role","Purity and new life in Christ — Original Sin has been washed away","The Holy Spirit descending","The Paschal mystery"], ans:1, exp:"White garment = <strong>purity and new life in Christ</strong> — the cleansing of Original Sin." },
    { q:"Why do Baptists practise Believer's Baptism rather than Infant Baptism?", opts:["Because infants can't attend church","Because Baptism should be a conscious personal decision of faith — infants cannot choose","Because full immersion requires the candidate to be tall enough","Because it is cheaper"], ans:1, exp:"Believer's Baptism = <strong>conscious personal decision</strong> — Baptists argue faith must be personal, not inherited." },
    { q:"What is the Chrism oil used for in Baptism?", opts:["To make the water holy","To anoint the baby — setting them apart for God and marking them as sharing in Jesus's roles of priest, prophet and king","To light the candle","To pour over the head instead of water"], ans:1, exp:"Chrism oil = <strong>anointing — setting apart for God</strong>, sharing in Christ's triple role of priest, prophet and king." },
    { q:"What is a sacrament?", opts:["A prayer","A church building","An outward sign of inward grace — a visible action that effects an invisible spiritual change","A type of miracle"], ans:2, exp:"Sacrament = <strong>outward sign of inward grace</strong>. A visible action that effects invisible spiritual change." },
  ],
  prevLesson:{ key:"re-key-terms", label:"Key Terms" },
  nextLesson:{ key:"re-amos", label:"Prophet Amos" }
},

/* ════════ RE — PROPHET AMOS ════════ */
"re-amos": {
  topic:"Prophet Amos", topicKey:"Prophet Amos", theme:"amber", icon:"📣",
  title:"The Prophet Amos",
  subtitle:"8th century prophet of justice — life, context, key teachings and relevance today.",
  keyIdea:{ rule:"Amos was not a professional prophet but an ordinary man (shepherd and fig farmer) called by God to speak uncomfortable truths to a prosperous but unjust society. His central message: God demands justice, not empty ritual.", detail:"Amos is significant because he directly attacks the comfortable religious establishment — his critique of 'external religion' is one of the most powerful in the entire Bible." },
  formulae:[
    { main:"Amos 5:24 — 'Let justice roll down like water, and righteousness like an ever-flowing stream.'", note:"Key quote to memorise" },
    { main:"Amos 5:21 — 'I hate, I despise your religious festivals; I cannot stand your assemblies.'", note:"God speaking through Amos against external religion" },
  ],
  steps:[
    { title:"Who was Amos?", detail:"A shepherd and dresser of sycamore-fig trees from Tekoa (a village near Bethlehem in Judah, the Southern Kingdom). He was NOT a professional prophet — he had no formal training. Active approximately 760–750 BC.", formula:"" },
    { title:"Historical context", detail:"Amos preached in the Northern Kingdom of Israel under King Jeroboam II. It was a time of peace and economic prosperity — but the wealth was extremely unequal. The rich were getting richer, the poor were being exploited. People were going to the Temple regularly but acting unjustly in daily life.", formula:"" },
    { title:"His call", detail:"Amos 7:14–15: 'I was neither a prophet nor the son of a prophet, but I was a shepherd and I also took care of sycamore-fig trees. But the LORD took me from tending the flock and said to me, \"Go, prophesy to my people Israel.\"' He did not choose this role — God called him.", formula:"" },
    { title:"Key teaching 1: God demands justice", detail:"Amos condemned the exploitation of the poor — selling them for silver, trampling on the heads of the poor, denying justice in the courts. He said that true worship of God requires treating people justly.", formula:"Amos 2:6–7" },
    { title:"Key teaching 2: Against empty religion", detail:"The Israelites were performing religious festivals, sacrifices and Sabbath worship — but Amos said God despised these because they were not accompanied by justice. This is what 'external religion' means.", formula:"Amos 5:21–24 — the most famous passage" },
    { title:"Key teaching 3: Warning of judgement", detail:"Amos warned that if the people did not return to justice, God would allow disaster to fall on Israel. The 'Day of the LORD' — which the people assumed would be a day of triumph — would actually be a day of judgement.", formula:"Amos 5:18–20" },
    { title:"Relevance today", detail:"Amos speaks to modern issues of economic inequality, fair trade, poverty and corporate exploitation. His message connects to Catholic Social Teaching — the preferential option for the poor. Oscar Romero is often compared to Amos.", formula:"" },
  ],
  worked:[{ q:"Describe the life and key teachings of the Prophet Amos", lines:[
    { step:"Who he was", expr:"Amos was a shepherd and fig farmer from Tekoa in Judah, active around 760 BC.", why:"Establishes identity and date" },
    { step:"Context", expr:"He preached in the Northern Kingdom during a time of prosperity and inequality.", why:"Historical setting" },
    { step:"Call", expr:"He was not a professional prophet but was called directly by God.", why:"Significance of his ordinariness" },
    { step:"Teaching 1", expr:"He condemned the exploitation of the poor and demanded justice in daily life.", why:"Core social teaching" },
    { step:"Teaching 2", expr:"He criticised external religion — performing rituals while acting unjustly.", why:"Key concept for exam" },
    { step:"Quote", expr:"'Let justice roll down like water, and righteousness like an ever-flowing stream.' (Amos 5:24)", why:"Supporting quote", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Learn the key quote:</strong> Amos 5:24 — 'Let justice roll down like water…' This quote shows exactly what Amos believed God wanted — not ritual but real, flowing, unstoppable justice." },
    { icon:"⭐", text:"<strong>Link to External Religion:</strong> Amos 5:21 is the classic example. God says through Amos that religious festivals mean nothing if the people are simultaneously exploiting the poor." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying Amos was a professional prophet. He explicitly denies this (Amos 7:14). He was a shepherd and fig farmer — an ordinary person." },
    { text:"<strong>Common mistake:</strong> Forgetting the historical context. Amos was preaching in a time of PROSPERITY — the problem wasn't poverty itself but unjust inequality amid plenty." },
  ],
  practice:[
    { q:"Where was Amos from?", opts:["Jerusalem","Nazareth","Tekoa — a village in Judah (Southern Kingdom)","Babylon"], ans:2, exp:"Amos was from <strong>Tekoa</strong>, a village near Bethlehem in the Southern Kingdom of Judah." },
    { q:"What was Amos's occupation before he became a prophet?", opts:["A priest","A scribe","A soldier","A shepherd and fig farmer — he was not a professional prophet"], ans:3, exp:"Amos was a <strong>shepherd and fig farmer</strong> — not a professional prophet. He was called directly by God." },
    { q:"What was Amos's central message?", opts:["God wants grand temples and sacrifices","God demands justice and care for the poor — not empty religious ritual","Israel should conquer its enemies","The Messiah is coming soon"], ans:1, exp:"Amos's central message: <strong>God demands justice, not empty ritual</strong> — 'Let justice roll down like water.'" },
    { q:"'I hate, I despise your religious festivals' (Amos 5:21) is an example of:", opts:["Amos praising worship","A criticism of external religion — performing rituals while ignoring justice","A call for more sacrifice","A prophecy about the Messiah"], ans:1, exp:"This is Amos's critique of <strong>external religion</strong> — God despises worship that is not accompanied by justice." },
  ],
  prevLesson:{ key:"re-baptism", label:"Baptism" },
  nextLesson:{ key:"re-acts-mercy", label:"Acts of Mercy" }
},

/* ════════ RE — ACTS OF MERCY ════════ */
"re-acts-mercy": {
  topic:"Acts of Mercy", topicKey:"Acts of Mercy", theme:"green", icon:"🤝",
  title:"Corporal and Spiritual Acts of Mercy",
  subtitle:"The 14 Acts of Mercy — what they are, where they come from, and how they are lived out today.",
  keyIdea:{ rule:"The Acts of Mercy are traditional Catholic ways of helping others — 7 Corporal (physical) and 7 Spiritual (of the soul). They are rooted in Matthew 25 and the Sermon on the Mount.", detail:"'Mercy' (Latin: misericordia) means 'a heart moved by the misery of another'. The Acts of Mercy are practical expressions of Christian love." },
  formulae:[
    { main:"Corporal = of the body (physical needs) · Spiritual = of the soul (inner needs)", note:"Both are required — caring for the whole person" },
    { main:"Matthew 25:35 — 'I was hungry and you gave me food, I was thirsty and you gave me drink…'", note:"Biblical foundation for the Corporal Acts" },
  ],
  steps:[
    { title:"The 7 Corporal Acts of Mercy", detail:"1. Feed the hungry · 2. Give drink to the thirsty · 3. Clothe the naked · 4. Shelter the homeless · 5. Visit the sick · 6. Visit the imprisoned · 7. Bury the dead", formula:"Remember: Corporal = physical body (Latin 'corpus')" },
    { title:"The 7 Spiritual Acts of Mercy", detail:"1. Instruct the ignorant · 2. Counsel the doubtful · 3. Admonish sinners · 4. Bear wrongs patiently · 5. Forgive offences willingly · 6. Comfort the afflicted · 7. Pray for the living and the dead", formula:"Remember: Spiritual = needs of the soul" },
    { title:"Where they come from", detail:"The Corporal Acts are largely drawn from Matthew 25:31–46 (the Sheep and the Goats) — where Jesus says 'whatever you did for one of the least of these brothers and sisters of mine, you did for me.' The Spiritual Acts come from various biblical passages and Church tradition.", formula:"" },
    { title:"Modern examples of Corporal Acts", detail:"Food banks (feed the hungry) · Water Aid (give drink) · Clothing drives (clothe the naked) · Shelter/Crisis (shelter the homeless) · Hospital visiting (visit the sick) · Prison chaplaincy (visit the imprisoned) · Funeral rites (bury the dead)", formula:"" },
    { title:"Modern examples of Spiritual Acts", detail:"Catechism/RE lessons (instruct the ignorant) · Spiritual direction (counsel the doubtful) · Constructive correction (admonish sinners) · Tolerating difficult people patiently · Reconciliation/forgiveness · Pastoral care (comfort the afflicted) · Intercessory prayer", formula:"" },
    { title:"Why they matter", detail:"The Acts of Mercy are not optional extras — they are part of what it means to be Christian. In Matthew 25, Jesus identifies himself with the hungry, the homeless, the sick and the imprisoned. To serve them is to serve Christ.", formula:"Matthew 25:40 — 'Whatever you did for the least of my brothers and sisters, you did for me.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Memory trick for Corporal Acts:</strong> Feed · Drink · Clothe · Shelter · Sick · Imprisoned · Bury. Imagine meeting a homeless person — what do they need physically? That's the Corporal Acts." },
    { icon:"⭐", text:"<strong>Key distinction:</strong> Corporal = body (food, water, clothes, shelter). Spiritual = soul (guidance, comfort, forgiveness, prayer). You need BOTH — Catholic teaching is about the whole person." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only being able to name the Corporal Acts. The Spiritual Acts are equally important — learn all 7 of each." },
    { text:"<strong>Common mistake:</strong> Forgetting that 'bury the dead' is an act of mercy. It reflects the dignity of the human body and care for the bereaved." },
  ],
  practice:[
    { q:"Which of these is a CORPORAL Act of Mercy?", opts:["Counsel the doubtful","Pray for the living and the dead","Feed the hungry","Admonish sinners"], ans:2, exp:"<strong>Feed the hungry</strong> is a Corporal Act — it meets a physical need of the body." },
    { q:"Which of these is a SPIRITUAL Act of Mercy?", opts:["Visit the sick","Shelter the homeless","Clothe the naked","Comfort the afflicted"], ans:3, exp:"<strong>Comfort the afflicted</strong> is a Spiritual Act — it addresses a need of the soul/emotions, not just the body." },
    { q:"The Corporal Acts of Mercy are rooted in which Gospel passage?", opts:["The Sermon on the Mount","Matthew 25 — the Sheep and the Goats: 'I was hungry and you gave me food…'","The Beatitudes","The Lord's Prayer"], ans:1, exp:"<strong>Matthew 25 (Sheep and Goats)</strong> — Jesus identifies himself with the hungry, homeless, sick and imprisoned." },
    { q:"What does 'corporal' mean in the context of the Acts of Mercy?", opts:["Spiritual","Of the body — from Latin 'corpus', meaning body","Military rank","Of the Church"], ans:1, exp:"Corporal = <strong>of the body</strong> (Latin: corpus). The Corporal Acts address physical, bodily needs." },
  ],
  prevLesson:{ key:"re-amos", label:"Prophet Amos" },
  nextLesson:{ key:"re-miracles", label:"Miracles of Jesus" }
},

/* ════════ RE — MIRACLES ════════ */
"re-miracles": {
  topic:"Miracles", topicKey:"Miracles", theme:"teal", icon:"✨",
  title:"Miracles of Jesus",
  subtitle:"Four key miracles — what happened, what they reveal about Jesus, and how to write about them.",
  keyIdea:{ rule:"Miracles are signs of the Kingdom of God breaking into the world. They are not performed to impress but to reveal who Jesus is and to invite a response of faith.", detail:"Each miracle reveals something specific about Jesus's identity — his divine authority, his compassion, his power over death, his role as the Light of the World." },
  formulae:[
    { main:"Miracle = sign that the Kingdom of God is present — reveals Jesus's identity", note:"Not magic tricks — signs pointing to who Jesus is" },
  ],
  steps:[
    { title:"Miracle 1: Calming the Storm (Mark 4:35–41)", detail:"Jesus and his disciples are crossing the Sea of Galilee when a fierce storm arises. The disciples are terrified and wake Jesus, who is asleep. He stands and commands: 'Quiet! Be still!' The wind and waves obey immediately.", formula:"What it reveals: Jesus has authority over nature — only God has this power in the Jewish tradition. It also challenges the disciples' faith: 'Why are you so afraid? Do you still have no faith?'" },
    { title:"Miracle 2: Feeding of the 5,000 (Mark 6:30–44)", detail:"A crowd of 5,000 has followed Jesus to a remote place. The disciples want to send them away to buy food, but Jesus takes 5 loaves and 2 fish, gives thanks, breaks them and distributes them — everyone eats and 12 baskets are left over.", formula:"What it reveals: Jesus's compassion for physical needs · His role as provider · Foreshadows the Eucharist (takes, blesses, breaks, gives)" },
    { title:"Miracle 3: Raising of Lazarus (John 11)", detail:"Lazarus, a friend of Jesus, has been dead for 4 days. Jesus arrives and, despite grief, commands: 'Lazarus, come out!' Lazarus walks out of the tomb alive.", formula:"What it reveals: 'I am the resurrection and the life. The one who believes in me will live, even though they die.' (John 11:25) — Jesus has authority over death itself." },
    { title:"Miracle 4: Healing of the Blind Man (John 9)", detail:"Jesus heals a man born blind by making mud from saliva and dirt and putting it on his eyes. The man washes and can see.", formula:"What it reveals: 'I am the light of the world.' (John 9:5) — the healing is a sign of spiritual sight as well as physical. Jesus gives sight to those willing to see." },
    { title:"What miracles reveal about Jesus", detail:"(1) Divine authority — only God can command nature, heal the sick, raise the dead. (2) Compassion — Jesus is moved by human suffering. (3) Fulfilment of prophecy — the Messiah was expected to perform signs. (4) Invitation to faith — miracles are signs, not proof; they require a response.", formula:"" },
  ],
  worked:[{ q:"Explain one miracle of Jesus and what it tells us about him", lines:[
    { step:"Name and reference", expr:"The Feeding of the 5,000 is found in Mark 6:30–44.", why:"Identifies the miracle precisely" },
    { step:"What happened", expr:"Jesus took 5 loaves and 2 fish, blessed and broke them, and fed a crowd of 5,000 with 12 baskets left over.", why:"Clear account of the event" },
    { step:"What it reveals — 1", expr:"It reveals Jesus's compassion — he was 'moved with pity' for the crowd and refused to send them away hungry.", why:"First theological point" },
    { step:"What it reveals — 2", expr:"The actions of taking, blessing, breaking and giving foreshadow the Eucharist — suggesting Jesus is the one who feeds people spiritually as well as physically.", why:"Deeper theological insight", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Know the reference:</strong> Calming Storm = Mark 4 · Feeding 5,000 = Mark 6 · Lazarus = John 11 · Blind Man = John 9. The reference shows you know the material precisely." },
    { icon:"⭐", text:"<strong>Two things to say about each miracle:</strong> (1) What happened (briefly) and (2) what it REVEALS about Jesus. The second part is worth more marks." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Just retelling the story without saying what the miracle reveals. Describing what happened = Level 1. Explaining what it reveals about Jesus = Level 2+." },
    { text:"<strong>Common mistake:</strong> Saying miracles 'prove' Jesus was God. They are SIGNS that invite faith, not mathematical proofs." },
  ],
  practice:[
    { q:"What does the Calming of the Storm reveal about Jesus?", opts:["That Jesus needed sleep","That Jesus was afraid of storms","That Jesus has divine authority over nature — only God controls the elements","That the disciples were good sailors"], ans:2, exp:"Calming the Storm reveals Jesus's <strong>divine authority over nature</strong> — in Jewish tradition, only God controls wind and sea." },
    { q:"What does the Raising of Lazarus reveal about Jesus?", opts:["That death is not real","That Jesus had medical knowledge","That Jesus is Lord over death — 'I am the resurrection and the life' (John 11:25)","That Lazarus was not really dead"], ans:2, exp:"Raising Lazarus reveals Jesus as <strong>Lord over death</strong> — 'I am the resurrection and the life.'" },
    { q:"The Feeding of the 5,000 foreshadows which part of Catholic worship?", opts:["Baptism","Confession","The Eucharist — Jesus takes, blesses, breaks and gives, mirroring the actions of the Mass","Confirmation"], ans:2, exp:"The Feeding of the 5,000 foreshadows the <strong>Eucharist</strong> — Jesus takes, blesses, breaks and gives (the same four actions as at Mass)." },
    { q:"What is the theological purpose of miracles according to Catholic teaching?", opts:["To impress people with magic","To prove God exists beyond any doubt","To be signs of the Kingdom of God — revealing Jesus's identity and inviting a response of faith","To show that science is wrong"], ans:2, exp:"Miracles are <strong>signs of the Kingdom of God</strong> — they reveal Jesus's identity and invite faith, not blind proof." },
  ],
  prevLesson:{ key:"re-acts-mercy", label:"Acts of Mercy" },
  nextLesson:{ key:"re-parables", label:"Parables of Jesus" }
},

/* ════════ RE — PARABLES ════════ */
"re-parables": {
  topic:"Parables", topicKey:"Parables", theme:"coral", icon:"📜",
  title:"Parables of Jesus",
  subtitle:"Four key parables — meaning, message and how to write an evaluation answer.",
  keyIdea:{ rule:"A parable is a short story using everyday situations to teach a deeper spiritual truth. Jesus used parables to teach about the Kingdom of God, forgiveness and how to live. They invite reflection and often challenge the listener's assumptions.", detail:"The word 'parable' comes from the Greek 'parabole' — a comparison. Jesus placed a familiar scenario (a farmer, a family, a traveller) alongside a spiritual truth so that people could see their situation differently." },
  formulae:[
    { main:"Parable = short story + deeper spiritual meaning · invites reflection, not a formula", note:"Jesus used everyday life: farming, family, travel" },
  ],
  steps:[
    { title:"Parable 1: The Good Samaritan (Luke 10:25–37)", detail:"A man is robbed and left for dead on the road from Jerusalem to Jericho. A priest and a Levite pass by. A Samaritan (despised foreigner) stops, tends his wounds, takes him to an inn and pays for his care.", formula:"Key question: 'Who is my neighbour?' Message: love has no limits — the neighbour is anyone in need, regardless of background. Challenge: the religious figures fail; the outsider shows mercy." },
    { title:"Parable 2: The Prodigal Son (Luke 15:11–32)", detail:"A son demands his inheritance early, wastes it, hits rock bottom, returns home. His father sees him 'while he was still a long way off', runs to meet him and celebrates. The older son is resentful.", formula:"Message: God's forgiveness is unconditional — the father does not wait to be asked properly, he RUNS. It is a parable about repentance and the boundlessness of God's love." },
    { title:"Parable 3: The Lost Sheep (Luke 15:3–7)", detail:"A shepherd with 100 sheep leaves the 99 to search for the 1 that is lost. When found, he celebrates with his neighbours.", formula:"Message: God actively seeks the lost — every person has infinite value. There is more joy in heaven over one sinner who repents than 99 who don't need to." },
    { title:"Parable 4: The Sower (Mark 4:1–20)", detail:"A farmer sows seed on different types of soil: path (birds eat it), rocky ground (grows then wilts), thorns (choked), good soil (yields a harvest). Jesus explains: the seed is God's word, the soils represent different responses to it.", formula:"Message: receptiveness to God's word matters. The fruitfulness of our lives depends on the condition of our hearts — open, or blocked by worries, distractions and hardness." },
    { title:"Why Jesus used parables", detail:"(1) Accessible — everyday stories everyone could understand. (2) Memorable — good stories stick in the mind. (3) Challenging — they subverted expectations (a Samaritan as hero; a father running to a prodigal son). (4) Inviting — they required a personal response.", formula:"" },
    { title:"How to write an evaluation answer", detail:"State a clear viewpoint → Support with specific evidence from a parable → Acknowledge the counter-argument → Reach a reasoned conclusion with your own judgement.", formula:"" },
  ],
  worked:[{ q:"'The Parables are the most important part of Jesus's teaching.' Evaluate this statement.", lines:[
    { step:"Agree — first argument", expr:"Some would agree because parables like the Good Samaritan communicate complex ideas about love and justice in a way that everyone can understand.", why:"First argument with specific parable" },
    { step:"Agree — develop", expr:"The Prodigal Son reveals the nature of God's unconditional forgiveness — a truth that would be hard to communicate through doctrine alone.", why:"Develops the argument with a second parable" },
    { step:"Disagree — counter", expr:"However, others might argue that Jesus's miracles are equally important — they show who Jesus is through action, not just words.", why:"Counter-argument" },
    { step:"Conclude", expr:"In my view, the parables are vital because they make the Kingdom of God tangible and accessible — but they work best alongside the miracles and teachings together.", why:"Reasoned personal conclusion", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>For evaluation answers:</strong> Always include a specific parable with its message. Don't just say 'the parables teach about forgiveness' — name the parable and say exactly what it teaches." },
    { icon:"⭐", text:"<strong>The structure of a good evaluation:</strong> Agree (with parable evidence) → Disagree (with counter-argument) → Own reasoned conclusion. A conclusion that just repeats the first argument is not an evaluation." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Retelling the whole parable story. Give a brief summary (1–2 sentences) then focus on what it TEACHES." },
    { text:"<strong>Common mistake:</strong> Not giving a personal conclusion. An evaluation question requires YOU to reach a judgement — 'I think…because…'" },
  ],
  practice:[
    { q:"What is a parable?", opts:["A miracle story","A historical account","A short story using everyday situations to teach a deeper spiritual truth","A prayer formula"], ans:2, exp:"Parable = <strong>short story + deeper spiritual truth</strong>, using everyday situations to teach about the Kingdom of God." },
    { q:"What is the central message of the Good Samaritan?", opts:["Only help people from your own community","Religious leaders are always better than outsiders","Love has no limits — the neighbour is anyone in need, regardless of their background","Samaritans are good people"], ans:2, exp:"Good Samaritan: <strong>love has no limits</strong> — your neighbour is anyone in need. The religious figures fail; the despised outsider shows mercy." },
    { q:"What does the Prodigal Son reveal about God?", opts:["God punishes sinners","God waits for people to behave perfectly before forgiving them","God's forgiveness is unconditional — the father runs to meet the returning son before he even finishes his apology","God prefers older, loyal children"], ans:2, exp:"Prodigal Son: <strong>God's forgiveness is unconditional</strong> — the father runs to meet the son, not waiting to hear the speech. Represents God's love for the repentant sinner." },
    { q:"In the Parable of the Sower, what does the soil represent?", opts:["The land of Israel","Different types of people and their openness to God's word","The quality of farming","The Devil"], ans:1, exp:"The soil = <strong>different responses to God's word</strong> — rocky, thorny or fertile hearts. Fruitfulness depends on receptiveness." },
  ],
  prevLesson:{ key:"re-miracles", label:"Miracles of Jesus" },
  nextLesson:{ key:"re-romero", label:"Saint Oscar Romero" }
},

/* ════════ RE — OSCAR ROMERO ════════ */
"re-romero": {
  topic:"Oscar Romero", topicKey:"Oscar Romero", theme:"rose", icon:"🕊️",
  title:"Saint Oscar Romero",
  subtitle:"Archbishop, martyr and voice of the poor — life, conversion, ministry and legacy.",
  keyIdea:{ rule:"Oscar Romero began as a conservative, academic churchman and became one of the most prophetic voices of the 20th century. His story shows what it looks like to live out the Gospels — and the cost of doing so.", detail:"Romero was Archbishop of San Salvador, El Salvador from 1977 until his assassination in 1980. He was canonised (made a saint) by Pope Francis in 2018." },
  formulae:[
    { main:"Born 1917 · Archbishop 1977 · Assassinated 24 March 1980 · Canonised 2018", note:"Key dates to know" },
    { main:"'If they kill me, I shall rise again in the Salvadoran people.' — Oscar Romero", note:"Key quote" },
  ],
  steps:[
    { title:"Early life and character", detail:"Oscar Arnulfo Romero was born in 1917 in Ciudad Barrios, El Salvador. He trained as a priest, was deeply intellectual and seen as traditional and conservative. He was appointed Archbishop of San Salvador in 1977 partly because the government and wealthy landowners thought he would not challenge the status quo.", formula:"" },
    { title:"The turning point: murder of Fr Rutilio Grande", detail:"Just weeks after Romero became Archbishop, his close friend Fr Rutilio Grande was assassinated by a death squad — killed for working with the poor and defending their rights. This event transformed Romero. He later said it was the moment he truly understood what the Gospel demanded.", formula:"Fr Grande was killed March 1977." },
    { title:"His ministry as Archbishop", detail:"Romero became the voice of the voiceless — speaking out weekly on his radio programme listened to across the country. He documented human rights abuses, condemned death squads and challenged the military government. He received death threats daily.", formula:"" },
    { title:"His final homily", detail:"The night before his assassination, Romero preached a homily addressing soldiers directly, appealing to them as Christians: 'I beg you, I beseech you, I order you in the name of God: stop the repression!' The next day, 24 March 1980, he was shot at the altar while celebrating Mass.", formula:"He was shot by a government-linked assassin." },
    { title:"Legacy and canonisation", detail:"Pope John Paul II called him a martyr — someone who died for their faith. He was beatified in 2015 and canonised as a Saint by Pope Francis on 14 October 2018. His feast day is 24 March.", formula:"" },
    { title:"Links to Amos and the prophetic tradition", detail:"Like Amos, Romero was not from a background of power. Like Amos, he spoke God's word to a society where the rich exploited the poor and religion was used to justify injustice. He lived out the Corporal and Spiritual Acts of Mercy — comforting the afflicted, admonishing sinners, visiting the imprisoned.", formula:"" },
  ],
  worked:[{ q:"Describe the life and significance of Saint Oscar Romero", lines:[
    { step:"Introduction", expr:"Oscar Romero was Archbishop of San Salvador, El Salvador, from 1977 until his assassination in 1980.", why:"Establishes who he was" },
    { step:"Conversion", expr:"Initially conservative, he was transformed by the murder of his friend Fr Rutilio Grande — killed for defending the poor.", why:"Key turning point" },
    { step:"Ministry", expr:"He became the voice of the voiceless — documenting human rights abuses and challenging the government weekly on his radio programme.", why:"What he actually did" },
    { step:"Death", expr:"He was shot at the altar on 24 March 1980 while celebrating Mass — a martyr for his faith and his defence of justice.", why:"Dramatic and significant death" },
    { step:"Legacy", expr:"Canonised by Pope Francis in 2018, he is now a model of prophetic courage — a modern Amos who lived out the Gospel at the cost of his life.", why:"Significance and connection to Amos", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Connect Romero to Amos:</strong> Both were not from positions of power. Both spoke God's truth to an unjust society. Both faced opposition. Both condemned empty religion that coexisted with exploitation of the poor." },
    { icon:"⭐", text:"<strong>Key dates for the exam:</strong> Became Archbishop 1977 · Murdered 24 March 1980 · Canonised 2018. These are specific enough to show precise knowledge." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Saying Romero was always radical. He was initially conservative — his transformation (conversion) is an important part of his story." },
    { text:"<strong>Common mistake:</strong> Forgetting he was canonised. Canonisation is significant — it is the Church officially declaring him a saint and a model of Christian life." },
  ],
  practice:[
    { q:"What event transformed Oscar Romero from a conservative churchman into a voice for the poor?", opts:["The Second Vatican Council","Being appointed Archbishop","The assassination of his friend Fr Rutilio Grande — killed for defending the rights of the poor","A private religious vision"], ans:2, exp:"The murder of <strong>Fr Rutilio Grande</strong> — Romero's close friend, killed for working with the poor — transformed him into a prophetic voice." },
    { q:"When was Oscar Romero assassinated?", opts:["1977","24 March 1980 — shot at the altar while celebrating Mass","1990","14 October 2018"], ans:1, exp:"Romero was assassinated on <strong>24 March 1980</strong>, shot while celebrating Mass at the altar." },
    { q:"What did Pope Francis do in 2018 in relation to Oscar Romero?", opts:["Wrote a book about him","Canonised him — officially declared him a saint of the Catholic Church","Visited his tomb","Condemned his politics"], ans:1, exp:"Pope Francis <strong>canonised Romero on 14 October 2018</strong> — officially declaring him a saint." },
    { q:"How is Oscar Romero similar to the Prophet Amos?", opts:["Both were priests","Both spoke God's truth to unjust societies that exploited the poor, at personal cost — living out the prophetic tradition","Both were from the same country","Both wrote the same books"], ans:1, exp:"Both Amos and Romero <strong>spoke God's truth to unjust societies exploiting the poor</strong> — both faced opposition, and both challenged empty religion that coexisted with injustice." },
  ],
  prevLesson:{ key:"re-parables", label:"Parables of Jesus" },
  nextLesson:null
},


}; // end LESSONS

/* ── QUIZ QUESTIONS ─────────────────────────────────────────── */
const QUIZ_QUESTIONS = {
  maths: [
  {topic:"Statistics", q:"Temperature is what type of data?", opts:["Categorical", "Discrete", "Qualitative", "Continuous — can take any value"], ans:3, exp:"Temperature is <strong>continuous</strong> — it can take any decimal value."},
  {topic:"Squares & Rounding", q:"Between which two consecutive integers does √50 lie?", opts:["5 and 6", "8 and 9", "6 and 7", "7 and 8"], ans:3, exp:"<strong>7² = 49, 8² = 64.</strong> So √50 lies between 7 and 8."},
  {topic:"Squares & Rounding", q:"What is √(144 + 25)?", opts:["17", "15", "19", "13"], ans:3, exp:"144 + 25 = 169. <strong>√169 = 13</strong>"},
  {topic:"Statistics", q:"In a grouped frequency table, which class interval contains the median if there are 30 data values?", opts:["The class containing the 10th value", "The class containing the 20th value", "The class containing the 15th and 16th values", "The class containing the 30th value"], ans:2, exp:"<strong>Median of 30 values = average of 15th and 16th.</strong> Find the class containing those."},
  {topic:"Statistics", q:"A data set has values 3, 7, 7, 8, 10. What is the mode?", opts:["7", "7.5", "8", "3"], ans:0, exp:"<strong>Mode = most frequent value.</strong> 7 appears twice."},
  {topic:"Standard Form", q:"Calculate: (5×10⁻²) × (4×10³)", opts:["20×10", "200", "2×10²", "20×10⁻⁶"], ans:1, exp:"5×4=20, 10⁻²×10³=10¹. 20×10¹=<strong>200</strong>."},
  {topic:"Transformations", q:"What are the minimum pieces of information needed to describe a translation?", opts:["A vector (horizontal and vertical movement)", "Angle and direction", "Centre, angle and direction", "Scale factor and centre"], ans:0, exp:"A translation only needs <strong>a vector</strong> — the horizontal and vertical shift."},
  {topic:"Transformations", q:"Order of rotational symmetry of a square?", opts:["1", "2", "8", "4"], ans:3, exp:"Matches at 90°,180°,270°,360°. Order 4."},
  {topic:"Linear Equations", q:"Solve: (x+2)/3 = 4", opts:["x=6", "x=2", "x=10", "x=14"], ans:2, exp:"x+2=12, x=<strong>10</strong>."},
  {topic:"Statistics", q:"Find the mean of: 12, 15, 11, 18, 14", opts:["12", "15", "13", "14"], ans:3, exp:"Sum=70, 70÷5=<strong>14</strong>."},
  {topic:"Indices", q:"Simplify: 2⁵ × 2⁻²", opts:["2³", "2¹⁰", "2⁷", "4³"], ans:0, exp:"5+(−2) = <strong>2³ = 8</strong>."},
  {topic:"Transformations", q:"Reflect (5, −3) in the y-axis:", opts:["(5,3)", "(3,5)", "(−5,3)", "(−5,−3)"], ans:3, exp:"y-axis reflection: flip x-sign. <strong>(−5, −3)</strong>."},
  {topic:"Circles", q:"A circle has radius 3cm. What is its area? (π≈3.14)", opts:["6.28cm²", "18.84cm²", "9.42cm²", "28.26cm²"], ans:3, exp:"A=π×3²=3.14×9=<strong>28.26cm²</strong>."},
  {topic:"Standard Form", q:"Calculate: (3×10⁴) + (5×10³)", opts:["8×10⁷", "8×10³", "3.5×10⁴", "3×10⁴"], ans:2, exp:"30,000+5,000=35,000=<strong>3.5×10⁴</strong>."},
  {topic:"Indices", q:"Simplify: (3x²)³", opts:["27x⁵", "27x⁶", "9x⁶", "3x⁶"], ans:1, exp:"3³=27, (x²)³=x⁶. <strong>27x⁶</strong>."},
  {topic:"Standard Form", q:"(2×10³)×(4×10⁵) =", opts:["8×10⁸", "6×10⁸", "8×10⁷", "8×10¹⁵"], ans:0, exp:"2×4=8, 3+5=8. 8×10⁸."},
  {topic:"Brackets", q:"Expand: (3x−2)(3x+2)", opts:["9x²−12x+4", "9x²+12x−4", "9x²+4", "9x²−4"], ans:3, exp:"Difference of squares: (3x)²−2²=9x²−4. <strong>9x²−4</strong>."},
  {topic:"Linear Equations", q:"Solve: 5x−3=2x+9", opts:["x=6", "x=3", "x=4", "x=2"], ans:2, exp:"3x=12, x=4."},
  {topic:"Indices", q:"Find the LCM of 5 and 7.", opts:["1", "70", "12", "35"], ans:3, exp:"5 and 7 are coprime → LCM = 5×7 = <strong>35</strong>."},
  {topic:"Indices", q:"Simplify: x⁴ × x³ ÷ x²", opts:["x⁷", "x¹", "x⁹", "x⁵"], ans:3, exp:"<strong>Multiply: add. Divide: subtract.</strong> 4+3−2 = 5, so x⁵"},
  {topic:"Linear Equations", q:"Solve: 3x − 7 = 2x + 5", opts:["x=2", "x=1", "x=−2", "x=12"], ans:3, exp:"x=<strong>12</strong>."},
  {topic:"Squares & Rounding", q:"Estimate √50 to 1 d.p.", opts:["7.1", "6.5", "8.0", "7.5"], ans:0, exp:"√49=7, √64=8. ≈7.1."},
  {topic:"Transformations", q:"Reflect point (−2, 3) in the x-axis. Where is the image?", opts:["(−2,−3)", "(2,3)", "(3,−2)", "(2,−3)"], ans:0, exp:"x-axis reflection: flip y-sign. <strong>(−2, −3)</strong>."},
  {topic:"Circles", q:"A circle has circumference 62.8cm. Find its radius. (π=3.14)", opts:["31.4cm", "5cm", "10cm", "20cm"], ans:2, exp:"r=C/(2π)=62.8/6.28=<strong>10cm</strong>."},
  {topic:"Transformations", q:"Point (−1, 4) is rotated 90° clockwise about the origin. New position?", opts:["(4,−1)", "(4,1)", "(−4,−1)", "(1,4)"], ans:1, exp:"90° clockwise: (x,y) → (y,−x). (−1,4) → <strong>(4,1)</strong>."},
  {topic:"Statistics", q:"'Shoe size' is:", opts:["None", "Continuous", "Qualitative", "Discrete"], ans:3, exp:"Discrete — specific values only."},
  {topic:"Squares & Rounding", q:"What is 7³?", opts:["49", "21", "2401", "343"], ans:3, exp:"7×7×7=49×7=<strong>343</strong>."},
  {topic:"Brackets", q:"Expand and simplify: (x+4)(x+4)", opts:["2x+8", "x²+4x+16", "x²+16", "x²+8x+16"], ans:3, exp:"(x+4)² = x²+8x+16. <strong>x²+8x+16</strong>."},
  {topic:"Brackets", q:"If a=3 and b=−2, find 3a+b²", opts:["5", "13", "1", "7"], ans:1, exp:"3×3=9, (−2)²=4. 9+4=<strong>13</strong>."},
  {topic:"Indices", q:"Find the LCM of 8 and 12.", opts:["48", "24", "96", "4"], ans:1, exp:"8=2³, 12=2²×3. LCM=2³×3=<strong>24</strong>."},
  {topic:"Transformations", q:"An equilateral triangle has rotational symmetry of order:", opts:["2", "1", "6", "3"], ans:3, exp:"Equilateral triangle fits onto itself at 120°, 240°, 360°. Order = <strong>3</strong>."},
  {topic:"Linear Equations", q:"Solve: 3(2x − 1) = 15", opts:["x = 2", "x = 4", "x = 3", "x = 6"], ans:2, exp:"6x − 3 = 15 → 6x = 18 → <strong>x = 3</strong>"},
  {topic:"Squares & Rounding", q:"Round 2,847,000 to 2 significant figures.", opts:["2,900,000", "3,000,000", "2,850,000", "2,800,000"], ans:0, exp:"2sf: 2,8→next=4→keep: <strong>2,800,000</strong>. Wait — 2nd sf is 8, next digit is 4 so <strong>2,800,000</strong>."},
  {topic:"Fractions & %", q:"Price falls from £250 to £200. Percentage decrease?", opts:["25%", "20%", "15%", "50%"], ans:1, exp:"(50/250)×100=<strong>20%</strong>."},
  {topic:"Fractions & %", q:"A price of £60 is increased by 20%. New price?", opts:["£72", "£80", "£12", "£66"], ans:0, exp:"60×1.2=<strong>£72</strong>."},
  {topic:"Brackets", q:"Expand: −2(4x − 3)", opts:["−8x+3", "8x−6", "−8x−6", "−8x+6"], ans:3, exp:"−2×4x=−8x, −2×−3=+6. <strong>−8x+6</strong>."},
  {topic:"Brackets", q:"Expand and simplify: (x + 4)(x − 4)", opts:["x² − 8x + 16", "x² − 8x", "x² + 16", "x² − 16"], ans:3, exp:"<strong>Difference of two squares: (a+b)(a−b) = a² − b².</strong> x² − 16"},
  {topic:"Brackets", q:"Factorise: x²+7x+12", opts:["(x+12)(x+1)", "(x+3)(x+4)", "(x+7)(x+5)", "(x+6)(x+2)"], ans:1, exp:"Need two numbers that multiply to 12 and add to 7: 3 and 4. <strong>(x+3)(x+4)</strong>."},
  {topic:"Brackets", q:"Expand: (x+5)(x−3)", opts:["x²+8x−15", "x²+2x−15", "x²−2x−15", "x²+2x+15"], ans:1, exp:"x²−3x+5x−15 = <strong>x²+2x−15</strong>."},
  {topic:"Transformations", q:"A triangle is translated by vector (−2, 5). Point (4, 1) maps to:", opts:["(2, −4)", "(6, 6)", "(−2, 5)", "(2, 6)"], ans:3, exp:"<strong>Add vector components.</strong> (4+(−2), 1+5) = (2, 6)"},
  {topic:"Statistics", q:"Find the mean from frequency table: value 2 (freq 3), value 4 (freq 5), value 6 (freq 2)", opts:["4", "4.2", "3.8", "5"], ans:2, exp:"(2×3+4×5+6×2)÷(3+5+2) = (6+20+12)÷10 = 38÷10 = <strong>3.8</strong>."},
  {topic:"Indices", q:"What is 27^(1/3)?", opts:["81", "9", "6", "3"], ans:3, exp:"<strong>1/3 index = cube root.</strong> ∛27 = 3"},
  {topic:"Transformations", q:"What does a rotation of 180° about the origin do to (3, 2)?", opts:["(2,3)", "(3,−2)", "(−3,−2)", "(−2,3)"], ans:2, exp:"180° rotation: (x,y) → (−x,−y). <strong>(−3, −2)</strong>."},
  {topic:"Transformations", q:"What information is needed to fully describe a rotation?", opts:["Centre, angle and direction (clockwise/anticlockwise)", "Angle, direction and scale factor", "Direction and distance only", "Centre and angle only"], ans:0, exp:"<strong>Rotation needs: centre + angle + direction.</strong>"},
  {topic:"Circles", q:"What fraction is a semi-circle arc of a full circle?", opts:["3/4", "1/3", "1/4", "1/2"], ans:3, exp:"Semi = ½ of full circle."},
  {topic:"Linear Equations", q:"Solve: 3x+5 = x+13", opts:["x=6", "x=3", "x=9", "x=4"], ans:3, exp:"2x=8, x=<strong>4</strong>."},
  {topic:"Standard Form", q:"Write 0.00045 in standard form.", opts:["0.45 × 10⁻³", "4.5 × 10⁻⁴", "4.5 × 10⁴", "45 × 10⁻⁵"], ans:1, exp:"<strong>Move decimal 4 places right.</strong> 0.00045 = 4.5 × 10⁻⁴"},
  {topic:"Fractions & %", q:"Calculate: ⅝ + ¾", opts:["1¼", "11/8", "1⅜", "8/12"], ans:2, exp:"5/8+6/8=11/8=<strong>1⅜</strong>."},
  {topic:"Standard Form", q:"Write 0.00052 in standard form.", opts:["5.2×10⁻³", "5.2×10⁻⁴", "0.52×10⁻³", "52×10⁻⁵"], ans:1, exp:"<strong>5.2×10⁻⁴</strong>."},
  {topic:"Indices", q:"What is 2⁻³?", opts:["−6", "−8", "1/8", "1/6"], ans:2, exp:"<strong>Negative index = reciprocal.</strong> 2⁻³ = 1/2³ = 1/8"},
  {topic:"Brackets", q:"Expand: 3x(2x − 5)", opts:["5x² − 8x", "6x² − 15", "6x − 15x", "6x² − 15x"], ans:3, exp:"<strong>Multiply each term.</strong> 3x × 2x = 6x², 3x × (−5) = −15x"},
  {topic:"Fractions & %", q:"Calculate: 2⅓ × 1½", opts:["3", "3½", "2⅚", "3⅓"], ans:1, exp:"7/3 × 3/2 = 21/6 = 7/2 = <strong>3½</strong>."},
  {topic:"Circles", q:"An arc is 1/4 of a circle with radius 6cm. What is the arc length? (π ≈ 3.14)", opts:["12.56cm", "18.84cm", "9.42cm", "6.28cm"], ans:2, exp:"Full circumference = 2π×6 = 37.68. <strong>1/4 × 37.68 ≈ 9.42cm</strong>"},
  {topic:"Fractions & %", q:"Calculate: ²⁄₃ × ³⁄₄", opts:["1/2", "6/12", "5/7", "2/3"], ans:0, exp:"6/12=1/2."},
  {topic:"Fractions & %", q:"Calculate: ⁵⁄₆ − ²⁄₃", opts:["3/6", "1/6", "1/3", "3/3"], ans:1, exp:"5/6−4/6=<strong>1/6</strong>."},
  {topic:"Indices", q:"What is 2⁻³?", opts:["1/8", "−6", "−8", "1/6"], ans:0, exp:"2⁻³ = 1/2³ = <strong>1/8</strong>."},
  {topic:"Brackets", q:"Factorise: 2x²+6x", opts:["2x(x+3)", "2(x²+6)", "2(x+3)", "x(2x+6)"], ans:0, exp:"HCF=2x. <strong>2x(x+3)</strong>."},
  {topic:"Statistics", q:"A frequency table shows heights. Height is what type of data?", opts:["Discrete", "Qualitative", "Categorical", "Continuous — can take any value in a range"], ans:3, exp:"Height is <strong>continuous</strong> — it can take any value within a range."},
  {topic:"Fractions & %", q:"What is 15% of 320?", opts:["42", "48", "52", "45"], ans:1, exp:"10% = 32, 5% = 16. <strong>32 + 16 = 48</strong>"},
  {topic:"Fractions & %", q:"What is ⅔ of 120?", opts:["80", "90", "40", "60"], ans:0, exp:"120 ÷ 3 × 2 = <strong>80</strong>."},
  {topic:"Standard Form", q:"Which of these is written correctly in standard form?", opts:["10 × 10²", "2.3 × 10³", "0.5 × 10⁶", "23 × 10³"], ans:1, exp:"<strong>Standard form: a × 10ⁿ where 1 ≤ a < 10.</strong> 2.3 × 10³ is the only valid one."},
  {topic:"Brackets", q:"Expand: 3(2x−5)", opts:["6x−15", "6x−5", "6x+15", "5x−15"], ans:0, exp:"6x−15."},
  {topic:"Indices", q:"Which is greater: 2⁵ or 5²?", opts:["5² (25)", "Cannot compare", "2⁵ (32)", "They are equal"], ans:2, exp:"2⁵=32, 5²=25. <strong>2⁵ is greater</strong>."},
  {topic:"Transformations", q:"A shape is reflected in the line y=x. Point (3,1) maps to:", opts:["(1,3)", "(−3,−1)", "(3,1)", "(−1,−3)"], ans:0, exp:"Reflection in y=x: swap coordinates. (3,1) → <strong>(1,3)</strong>."},
  {topic:"Brackets", q:"Factorise fully: 12x+8", opts:["4(3x+8)", "12(x+8)", "2(6x+4)", "4(3x+2)"], ans:3, exp:"HCF=4. 4(3x+2)."},
  {topic:"Transformations", q:"Which vector translates (2,5) to (6,3)?", opts:["(4,−2)", "(8,8)", "(−4,2)", "(3,2)"], ans:0, exp:"6−2=4, 3−5=−2. Vector = <strong>(4,−2)</strong>."},
  {topic:"Indices", q:"Find the HCF of 24 and 36.", opts:["8", "6", "4", "12"], ans:3, exp:"24=2³×3, 36=2²×3². Overlap: 2²×3=12."},
  {topic:"Standard Form", q:"Calculate: (6×10⁵) ÷ (2×10²)", opts:["3×10³", "3×10⁷", "4×10³", "12×10²"], ans:0, exp:"6÷2=3, 10⁵÷10²=10³. <strong>3×10³</strong>."},
  {topic:"Statistics", q:"Which average is best for skewed data?", opts:["Mean", "Range", "Mode", "Median — not affected by extreme values"], ans:3, exp:"<strong>Median</strong> is best for skewed data — it is not distorted by extreme values (outliers)."},
  {topic:"Linear Equations", q:"Solve: 10 − 2(x+1) = 4", opts:["x=3", "x=4", "x=1", "x=2"], ans:3, exp:"10−2x−2=4, 8−2x=4, 2x=4, x=<strong>2</strong>."},
  {topic:"Squares & Rounding", q:"Round 0.004567 to 2 significant figures.", opts:["0.00457", "0.0046", "0.005", "0.0045"], ans:1, exp:"<strong>First significant figure is 4 (first non-zero). Second is 5.</strong> Third is 6, so round up: 0.0046"},
  {topic:"Fractions & %", q:"Calculate: ⁴⁄₅ × ¹⁵⁄₁₆", opts:["3/4", "60/80", "7/16", "1"], ans:0, exp:"(4×15)/(5×16)=60/80=<strong>3/4</strong>."},
  {topic:"Squares & Rounding", q:"What is √169?", opts:["13", "11", "14", "12"], ans:0, exp:"13×13=169. √169=13."},
  {topic:"Squares & Rounding", q:"Round 0.004567 to 2 significant figures.", opts:["0.0045", "0.005", "0.00457", "0.0046"], ans:3, exp:"1st sf=4, 2nd=5, next=6→round up: <strong>0.0046</strong>."},
  {topic:"Transformations", q:"A shape has no lines of symmetry but rotational symmetry of order 2. It could be:", opts:["Square", "Regular pentagon", "Parallelogram", "Equilateral triangle"], ans:2, exp:"A <strong>parallelogram</strong> has no lines of symmetry but rotational symmetry of order 2."},
  {topic:"Indices", q:"Simplify: (2³)⁰", opts:["1", "0", "8", "2³"], ans:0, exp:"Anything to the power 0 = <strong>1</strong>."},
  {topic:"Brackets", q:"Expand and simplify: 3(x+4) − 2(x−1)", opts:["x+11", "x+14", "5x+10", "x+10"], ans:1, exp:"3x+12−2x+2 = <strong>x+14</strong>."},
  {topic:"Linear Equations", q:"Solve: 2x/3 = 8", opts:["x=12", "x=4", "x=16", "x=6"], ans:0, exp:"2x=24, x=<strong>12</strong>."},
  {topic:"Indices", q:"Express 72 as a product of prime factors.", opts:["8×9", "2³×3²", "2×6×6", "2²×3³"], ans:1, exp:"72 = 8×9 = 2³×3². <strong>2³×3²</strong>."},
  {topic:"Squares & Rounding", q:"What is √225?", opts:["16", "14", "15", "13"], ans:2, exp:"15×15=225. <strong>√225=15</strong>."},
  {topic:"Indices", q:"What is 2⁴ × 2³ as a single power?", opts:["2¹²", "4⁷", "2¹", "2⁷"], ans:3, exp:"Multiply → ADD powers: 2⁷."},
  {topic:"Fractions & %", q:"Express 0.35 as a fraction in its simplest form.", opts:["17/50", "7/20", "7/10", "35/100"], ans:1, exp:"35/100 = <strong>7/20</strong> (÷5 both)"},
  {topic:"Brackets", q:"Expand and simplify: 2(x+5)+3(x−2)", opts:["5x+16", "5x+4", "5x+1", "5x−4"], ans:1, exp:"2x+10+3x−6=5x+4."},
  {topic:"Indices", q:"Simplify: 5³ ÷ 5²", opts:["5¹", "5⁵", "5⁰", "25"], ans:0, exp:"Divide → subtract powers: 3−2 = <strong>5¹ = 5</strong>."},
  {topic:"Indices", q:"What is 5⁻²?", opts:["−1/25", "−25", "25", "1/25"], ans:3, exp:"5⁻² = 1/5² = 1/25."},
  {topic:"Fractions & %", q:"Express 0.375 as a fraction.", opts:["3/8", "3/7", "37/100", "3/80"], ans:0, exp:"375/1000 = 3/8. <strong>3/8</strong>."},
  {topic:"Transformations", q:"A shape is reflected in the line y = x. Point (3, 7) maps to:", opts:["(−3, −7)", "(3, −7)", "(7, 3)", "(−7, −3)"], ans:2, exp:"<strong>Reflection in y = x swaps coordinates.</strong> (3, 7) → (7, 3)"},
  {topic:"Squares & Rounding", q:"Estimate: 48.7 × 19.3 (round each to 1 s.f.)", opts:["800", "1000", "900", "500"], ans:1, exp:"50×20=<strong>1000</strong>."},
  {topic:"Brackets", q:"Expand and simplify: (2x + 3)²", opts:["4x² + 12x + 9", "2x² + 12x + 9", "4x² + 9", "4x² + 6x + 9"], ans:0, exp:"<strong>(a+b)² = a² + 2ab + b².</strong> 4x² + 2(2x)(3) + 9 = 4x² + 12x + 9"},
  {topic:"Statistics", q:"Median of: 3,8,1,6,4", opts:["3", "8", "4", "6"], ans:2, exp:"Sorted: 1,3,4,6,8. Middle=4."},
  {topic:"Squares & Rounding", q:"Round 0.08050 to 2 significant figures.", opts:["0.080", "0.08", "0.081", "0.0805"], ans:2, exp:"1st sf=8, 2nd=0, next=5→round up: <strong>0.081</strong>."},
  {topic:"Statistics", q:"Temperatures in a week: 12,15,11,14,13,16,10°C. Range?", opts:["7°C", "6°C", "4°C", "5°C"], ans:1, exp:"16−10=6°C."},
  {topic:"Linear Equations", q:"Two more than three times a number is 17. Find the number.", opts:["4", "7", "5", "6"], ans:2, exp:"3n + 2 = 17 → 3n = 15 → <strong>n = 5</strong>"},
  {topic:"Linear Equations", q:"Solve: 2(x+3) = 14", opts:["x=5", "x=7", "x=11", "x=4"], ans:3, exp:"2x+6=14, 2x=8, x=<strong>4</strong>."},
  {topic:"Linear Equations", q:"Solve: 5x − 3 = 2x + 9", opts:["x = 3", "x = 2", "x = 4", "x = 6"], ans:2, exp:"3x = 12 → <strong>x = 4</strong>"},
  {topic:"Indices", q:"Find the LCM of 4 and 6.", opts:["24", "12", "8", "2"], ans:1, exp:"Multiples of 4: 4,8,12… Multiples of 6: 6,12… LCM = <strong>12</strong>."},
  {topic:"Fractions & %", q:"Calculate 2/3 + 3/4.", opts:["5/7", "11/12", "17/12", "5/12"], ans:2, exp:"Common denominator 12: 8/12 + 9/12 = <strong>17/12</strong>"},
  {topic:"Circles", q:"Find the circumference of a circle with radius 7cm. (π=3.14)", opts:["43.96cm", "21.98cm", "153.86cm", "22cm"], ans:0, exp:"C=2πr=2×3.14×7=<strong>43.96cm</strong>."},
  {topic:"Brackets", q:"If p=4, q=−3, find 2p−q²", opts:["1", "−17", "17", "−1"], ans:3, exp:"2(4)−(−3)²=8−9=−1."},
  {topic:"Statistics", q:"A pie chart section represents 45 out of 180 students. What angle does it show?", opts:["45°", "90°", "60°", "180°"], ans:1, exp:"45/180 × 360° = <strong>90°</strong>."},
  {topic:"Fractions & %", q:"What is 35% of 200?", opts:["35", "75", "70", "60"], ans:2, exp:"200×0.35=<strong>70</strong>."},
  {topic:"Indices", q:"Express 2⁴ × 3 in ordinary form.", opts:["12", "48", "24", "72"], ans:1, exp:"2⁴=16. 16×3=<strong>48</strong>."},
  {topic:"Circles", q:"A circle has area 78.5cm². Find its radius. (π=3.14)", opts:["10cm", "5cm", "25cm", "2.5cm"], ans:1, exp:"r²=78.5/3.14=25, r=<strong>5cm</strong>."},
  {topic:"Statistics", q:"Mean of: 4,7,9,2,8", opts:["5", "6", "7", "8"], ans:1, exp:"30÷5=6."},
  {topic:"Transformations", q:"Shape A is enlarged with scale factor 3, centre (0,0). If A has area 5cm², what is the image area?", opts:["9cm²", "45cm²", "15cm²", "25cm²"], ans:1, exp:"<strong>Area scale factor = (linear SF)².</strong> 3² × 5 = 45cm²"},
  {topic:"Indices", q:"What is (5²)³?", opts:["5⁸", "5⁶", "5²³", "5⁵"], ans:1, exp:"Power of power → multiply: 2×3 = <strong>5⁶</strong>."},
  {topic:"Brackets", q:"Expand: (x − 2)(x² + 3x − 1)", opts:["x³ + 5x² + 7x + 2", "x³ + 5x² − 7x − 2", "x³ − x² − 7x + 2", "x³ + x² − 7x + 2"], ans:3, exp:"x(x²+3x−1) − 2(x²+3x−1) = x³+3x²−x − 2x²−6x+2 = <strong>x³+x²−7x+2</strong>"},
  {topic:"Linear Equations", q:"Solve: x/5 + x/10 = 3", opts:["x=10", "x=30", "x=15", "x=20"], ans:3, exp:"2x/10 + x/10 = 3x/10 = 3, x=<strong>20</strong>."},
  {topic:"Standard Form", q:"Write 6.2×10⁻³ as an ordinary number.", opts:["0.062", "620", "6200", "0.0062"], ans:3, exp:"Move 3 left: 0.0062."},
  {topic:"Standard Form", q:"A planet is 2.4×10⁸ km from the Sun. In ordinary form:", opts:["24,000,000", "2,400,000", "24,000,000,000", "240,000,000"], ans:3, exp:"<strong>240,000,000 km</strong>."},
  {topic:"Linear Equations", q:"Solve: 5(2x−3) = 25", opts:["x=5", "x=3", "x=2", "x=4"], ans:3, exp:"10x−15=25, 10x=40, x=<strong>4</strong>."},
  {topic:"Indices", q:"Simplify: x⁷ ÷ x⁷", opts:["x⁰ = 1", "0", "x⁴⁹", "x¹"], ans:0, exp:"x⁷÷x⁷ = x⁰ = <strong>1</strong>."},
  {topic:"Transformations", q:"Three things needed to describe a rotation:", opts:["Colour, position, size", "Angle, direction, centre", "Size, shape, area", "Vector, line, angle"], ans:1, exp:"Angle, direction, centre of rotation."},
  {topic:"Statistics", q:"What does the median represent?", opts:["The sum divided by count", "Half the range", "The most common value", "The middle value when data is ordered"], ans:3, exp:"Median = <strong>middle value when data is arranged in order</strong>."},
  {topic:"Indices", q:"Simplify: 5³ ÷ 5¹", opts:["25", "5⁴", "5²", "5"], ans:2, exp:"<strong>Same base: subtract indices.</strong> 5³ ÷ 5¹ = 5²"},
  {topic:"Indices", q:"Write 60 as a product of prime factors.", opts:["2³×3²", "2²×3×5", "4×15", "2×3×10"], ans:1, exp:"60=2²×3×5."},
  {topic:"Brackets", q:"Expand: 5(3x + 2)", opts:["15x+10", "8x+7", "5x+10", "15x+2"], ans:0, exp:"5×3x=15x, 5×2=10. <strong>15x+10</strong>."},
  {topic:"Indices", q:"What is (3²)³?", opts:["3⁵", "3⁶", "9³", "3⁸"], ans:1, exp:"Power of power → multiply: 2×3=6. Answer: 3⁶."},
  {topic:"Brackets", q:"If p=−3, find p³", opts:["−27", "−9", "27", "9"], ans:0, exp:"(−3)³ = −3×−3×−3 = −27. <strong>−27</strong>."},
  {topic:"Linear Equations", q:"Solve: 2(3x−1)=16", opts:["x=3", "x=2", "x=4", "x=6"], ans:0, exp:"6x−2=16, 6x=18, x=3."},
  {topic:"Indices", q:"What is 10⁻²?", opts:["0.01", "−100", "−0.01", "100"], ans:0, exp:"10⁻² = 1/10² = 1/100 = <strong>0.01</strong>."},
  {topic:"Linear Equations", q:"Solve: 7−3x = 1", opts:["x=2", "x=3", "x=−2", "x=8/3"], ans:0, exp:"−3x=−6, x=<strong>2</strong>."},
  {topic:"Linear Equations", q:"The sum of three consecutive integers is 48. Find the smallest.", opts:["14", "15", "16", "17"], ans:1, exp:"n+(n+1)+(n+2)=48, 3n+3=48, n=15. Smallest=<strong>15</strong>."},
  {topic:"Circles", q:"A wheel has diameter 50cm. How far does it travel in one full rotation? (π=3.14)", opts:["314cm", "25cm", "78.5cm", "157cm"], ans:3, exp:"C=πd=3.14×50=<strong>157cm</strong>."},
  {topic:"Indices", q:"What is 3⁰?", opts:["9", "0", "3", "1"], ans:3, exp:"Any number to the power 0 = <strong>1</strong>."},
  {topic:"Fractions & %", q:"Price rises £50→£60. % increase?", opts:["20%", "15%", "25%", "10%"], ans:0, exp:"(10÷50)×100=20%."},
  {topic:"Fractions & %", q:"A £90 coat is reduced by 30%. Sale price?", opts:["£81", "£27", "£60", "£63"], ans:3, exp:"90×0.7=<strong>£63</strong>."},
  {topic:"Statistics", q:"What is the interquartile range (IQR)?", opts:["The difference between the mean and median", "The average of all data values", "The difference between maximum and minimum", "Q3 minus Q1 — the range of the middle 50% of data"], ans:3, exp:"<strong>IQR = Q3 − Q1.</strong> Measures the spread of the middle 50% of the data."},
  {topic:"Transformations", q:"Which transformation changes the size of a shape?", opts:["Reflection", "Translation", "Rotation", "Enlargement"], ans:3, exp:"<strong>Only enlargement changes size.</strong> The others are congruent transformations."},
  {topic:"Squares & Rounding", q:"What is √1.44?", opts:["0.012", "1.2", "12", "0.12"], ans:1, exp:"1.2×1.2=1.44. √1.44=<strong>1.2</strong>."},
  {topic:"Standard Form", q:"Calculate (3 × 10⁴) × (2 × 10³).", opts:["6 × 10¹²", "5 × 10⁷", "6 × 10¹", "6 × 10⁷"], ans:3, exp:"<strong>Multiply numbers, add indices.</strong> 3×2=6, 4+3=7. So 6 × 10⁷"},
  {topic:"Squares & Rounding", q:"Round 0.07463 to 2 sig figs.", opts:["0.0746", "0.074", "0.07", "0.075"], ans:3, exp:"1st sf=7, 2nd=4. Next=6≥5 round up: 0.075."},
  {topic:"Fractions & %", q:"A TV costs £450 after a 10% discount. What was the original price?", opts:["£480", "£495", "£405", "£500"], ans:3, exp:"0.9 × original = 450 → original = 450 ÷ 0.9 = <strong>£500</strong>"},
  {topic:"Circles", q:"The circumference of a circle is 31.4cm. What is the radius? (π ≈ 3.14)", opts:["15cm", "10cm", "5cm", "7cm"], ans:2, exp:"C = 2πr → r = C/(2π) = 31.4/(6.28) = <strong>5cm</strong>"},
  {topic:"Squares & Rounding", q:"What is 3.74 rounded to the nearest tenth?", opts:["3.7", "4.0", "3.8", "3.74"], ans:0, exp:"Hundredths digit is 4, which is < 5, so <strong>round down: 3.7</strong>"},
  {topic:"Circles", q:"What is the area of a circle with diameter 10cm? (Use π = 3.14)", opts:["157cm²", "78.5cm²", "31.4cm²", "314cm²"], ans:1, exp:"r = 5. A = πr² = 3.14 × 25 = <strong>78.5cm²</strong>"},
  {topic:"Brackets", q:"Expand and simplify: 4(2x−1)+3(x+5)", opts:["11x+1", "11x+11", "8x+11", "11x−1"], ans:1, exp:"8x−4+3x+15 = <strong>11x+11</strong>."},
  {topic:"Fractions & %", q:"Calculate: 1¾ ÷ ½", opts:["⅞", "3½", "1¼", "3"], ans:1, exp:"7/4 × 2/1 = 14/4 = <strong>3½</strong>."},
  {topic:"Circles", q:"Find the area of a circle with diameter 8cm. (π=3.14)", opts:["100.48cm²", "200.96cm²", "50.24cm²", "25.12cm²"], ans:2, exp:"r=4. A=π×4²=3.14×16=<strong>50.24cm²</strong>."},
  {topic:"Statistics", q:"In a stem-and-leaf diagram, 3 | 4 5 8 represents:", opts:["3.4, 3.5, 3.8", "43, 53, 83", "34, 35, 38", "The numbers 3,4,5,8"], ans:2, exp:"Stem 3, leaves 4,5,8 → <strong>34, 35, 38</strong>."},
  {topic:"Statistics", q:"The mean of 5 numbers is 8. What is their total?", opts:["13", "45", "40", "35"], ans:2, exp:"<strong>Mean = total ÷ count.</strong> Total = 8 × 5 = 40"},
  {topic:"Brackets", q:"Factorise: 15x − 10", opts:["10(x−5)", "3(5x−10)", "5(3x+2)", "5(3x−2)"], ans:3, exp:"HCF=5. <strong>5(3x−2)</strong>."},
  {topic:"Linear Equations", q:"Solve: x/3+2=6", opts:["x=24", "x=12", "x=8", "x=4"], ans:1, exp:"x/3=4, x=12."},
  {topic:"Circles", q:"What is the relationship between radius and diameter?", opts:["Diameter = radius²", "Diameter = radius + 2", "Radius = 2 × diameter", "Diameter = 2 × radius"], ans:3, exp:"<strong>Diameter = 2 × radius</strong>."},
  {topic:"Standard Form", q:"Write 34,000,000 in standard form.", opts:["34×10⁶", "0.34×10⁸", "3.4×10⁷", "3.4×10⁶"], ans:2, exp:"3.4×10⁷."},
  {topic:"Statistics", q:"Which type of data is 'eye colour'?", opts:["Quantitative", "Continuous", "Discrete", "Qualitative"], ans:3, exp:"Eye colour is a category — <strong>qualitative</strong>."},
  {topic:"Transformations", q:"Point (4, −1) is translated by vector (−3, 5). New position?", opts:["(1,−6)", "(7,4)", "(−3,5)", "(1,4)"], ans:3, exp:"4+(−3)=1, −1+5=4. <strong>(1, 4)</strong>."},
  {topic:"Brackets", q:"Expand: (x+7)²", opts:["x²+7x+49", "x²+14x+14", "x²+49", "x²+14x+49"], ans:3, exp:"(x+7)²=x²+14x+49. <strong>x²+14x+49</strong>."},
  {topic:"Indices", q:"Simplify: (3²)³", opts:["3⁵", "9³", "3⁸", "3⁶"], ans:3, exp:"<strong>Power of a power: multiply indices.</strong> (3²)³ = 3^(2×3) = 3⁶"},
  {topic:"Standard Form", q:"Which is largest: 3.2×10⁴, 2.8×10⁵, 9.9×10³?", opts:["3.2×10⁴", "2.8×10⁵", "9.9×10³", "All equal"], ans:1, exp:"2.8×10⁵=280,000 is the largest. <strong>2.8×10⁵</strong>."},
  {topic:"Linear Equations", q:"Solve: 4x+3 = 2x+11", opts:["x=2", "x=4", "x=7", "x=3"], ans:1, exp:"2x=8, x=<strong>4</strong>."},
  {topic:"Fractions & %", q:"What percentage is 45 of 180?", opts:["45%", "35%", "25%", "40%"], ans:2, exp:"45/180×100=<strong>25%</strong>."},
  {topic:"Brackets", q:"Expand: (x+3)(x+4)", opts:["x²+4x+12", "x²+7x+12", "x²+7x+7", "x²+12"], ans:1, exp:"FOIL: x²+7x+12."},
  {topic:"Circles", q:"Find the perimeter of a semicircle with diameter 10cm. (π=3.14)", opts:["31.4cm", "25.7cm", "20.7cm", "15.7cm"], ans:1, exp:"Arc=πr=3.14×5=15.7. Add diameter: 15.7+10=<strong>25.7cm</strong>."},
  {topic:"Squares & Rounding", q:"What is 13²?", opts:["130", "156", "144", "169"], ans:3, exp:"13×13=<strong>169</strong>."},
  {topic:"Standard Form", q:"Write 4.5×10² as an ordinary number.", opts:["45", "450", "4500", "0.045"], ans:1, exp:"Move decimal 2 right: <strong>450</strong>."},
  {topic:"Indices", q:"Find the HCF of 18 and 30.", opts:["6", "90", "9", "3"], ans:0, exp:"18=2×3², 30=2×3×5. HCF = 2×3 = <strong>6</strong>."},
  {topic:"Linear Equations", q:"Solve: x/4 − 1 = 3", opts:["x=2", "x=12", "x=16", "x=8"], ans:2, exp:"x/4=4, x=<strong>16</strong>."},
  {topic:"Indices", q:"Simplify: x⁵ ÷ x²", opts:["x²", "x¹⁰", "x³", "x⁷"], ans:2, exp:"Divide → subtract: 5−2=3. x³."},
  {topic:"Standard Form", q:"Calculate: (4×10³)²", opts:["8×10⁶", "16×10⁶", "16×10⁹", "4×10⁶"], ans:1, exp:"4²=16, (10³)²=10⁶. <strong>16×10⁶ = 1.6×10⁷</strong>."},
  {topic:"Indices", q:"Simplify: a⁴ × a³ ÷ a²", opts:["a²⁴", "a⁹", "a⁵", "a³"], ans:2, exp:"4+3=7, 7−2 = <strong>a⁵</strong>."},
  {topic:"Fractions & %", q:"Simplify: 24/36", opts:["3/4", "2/3", "12/18", "4/6"], ans:1, exp:"HCF=12. 24/36 = <strong>2/3</strong>."},
  {topic:"Indices", q:"What is the value of 4^(1/2)?", opts:["2", "0.5", "8", "16"], ans:0, exp:"<strong>Fractional index 1/2 = square root.</strong> √4 = 2"},
  {topic:"Fractions & %", q:"Calculate: ³⁄₄ ÷ ¹⁄₂", opts:["6/4", "1½", "3/8", "3/2"], ans:1, exp:"KCF: 3/4×2=6/4=1½."},
  {topic:"Statistics", q:"Find the median of: 2, 5, 8, 1, 9, 3, 4", opts:["8", "4", "3", "5"], ans:1, exp:"Sorted: 1,2,3,4,5,8,9. Middle (4th) = <strong>4</strong>."},
  {topic:"Circles", q:"Area of circle, radius 5 cm? (π=3.14)", opts:["31.4 cm²", "15.7 cm²", "78.5 cm²", "157 cm²"], ans:2, exp:"A=πr²=78.5 cm²."},
  {topic:"Statistics", q:"The mean of 5 numbers is 8. What is their sum?", opts:["8", "1.6", "13", "40"], ans:3, exp:"Mean=Sum/n, Sum=8×5=<strong>40</strong>."},
  {topic:"Circles", q:"Circumference of circle, diameter 10 cm? (π=3.14)", opts:["15.7 cm", "314 cm", "31.4 cm", "78.5 cm"], ans:2, exp:"C=πd=31.4 cm."},
  {topic:"Transformations", q:"Reflect A(3,1) in the y-axis. Where is A'?", opts:["(−3,−1)", "(3,−1)", "(1,3)", "(−3,1)"], ans:3, exp:"y-axis: flip x-sign. (−3,1)."},
  {topic:"Indices", q:"Write 1,500,000 in standard form.", opts:["1.5×10⁵", "0.15×10⁷", "1.5×10⁶", "15×10⁵"], ans:2, exp:"<strong>1.5×10⁶</strong>."},
  {topic:"Squares & Rounding", q:"Between which two integers does √72 lie?", opts:["9 and 10", "7 and 8", "6 and 7", "8 and 9"], ans:3, exp:"8²=64, 9²=81. √72 lies between <strong>8 and 9</strong>."},
  {topic:"Transformations", q:"Point (2,5) translated by (3/−4). New position?", opts:["(5,1)", "(5,9)", "(6,1)", "(−1,8)"], ans:0, exp:"x:2+3=5, y:5−4=1. (5,1)."},
  {topic:"Squares & Rounding", q:"Round 9.9965 to 3 decimal places.", opts:["9.997", "9.990", "9.996", "10.000"], ans:0, exp:"3 d.p.: 9.996|5 → round up: <strong>9.997</strong>."},
  {topic:"Fractions & %", q:"A price increases from £80 to £92. What is the percentage increase?", opts:["14%", "12%", "10%", "15%"], ans:3, exp:"Change = 12. 12/80 × 100 = <strong>15%</strong>"},
  {topic:"Transformations", q:"Which shape has exactly 4 lines of symmetry?", opts:["Rectangle", "Square", "Rhombus", "Parallelogram"], ans:1, exp:"A <strong>square</strong> has 4 lines of symmetry (2 diagonal, 2 through midpoints)."},
  {topic:"Indices", q:"What is 4¹/²?", opts:["0.25", "16", "8", "2"], ans:3, exp:"x¹/² = √x. √4 = <strong>2</strong>."},
  {topic:"Linear Equations", q:"Solve: 4x − 3 = 17", opts:["x=7", "x=3", "x=4", "x=5"], ans:3, exp:"4x=20, x=<strong>5</strong>."},
  {topic:"Brackets", q:"Factorise: x² + 7x + 12", opts:["(x + 3)(x + 4)", "(x + 12)(x + 1)", "(x + 6)(x + 2)", "(x − 3)(x − 4)"], ans:0, exp:"<strong>Find two numbers multiplying to 12, adding to 7.</strong> 3 × 4 = 12, 3 + 4 = 7. So (x+3)(x+4)"},
  {topic:"Squares & Rounding", q:"Round 34,756 to 3 sig figs.", opts:["34,700", "34,800", "34,756", "35,000"], ans:1, exp:"3sf: 3,4,7. Next=5≥5 round up: 34,800."},
  {topic:"Linear Equations", q:"Solve: 6x = 4x + 14", opts:["x=14", "x=7", "x=3.5", "x=2"], ans:1, exp:"2x=14, x=<strong>7</strong>."},
  {topic:"Transformations", q:"What is the order of rotational symmetry of a regular hexagon?", opts:["4", "12", "3", "6"], ans:3, exp:"A regular hexagon fits onto itself every 60°. Order = <strong>6</strong>."},
  {topic:"Standard Form", q:"Which is correct standard form?", opts:["All are equivalent but only one is standard form", "0.23×10⁵", "2.3×10⁴", "23×10³"], ans:0, exp:"Standard form requires 1 ≤ a < 10. <strong>2.3×10⁴</strong> is the correct standard form (all are equal but only this fits the definition)."},
  {topic:"Standard Form", q:"The distance to the sun is 1.5 × 10⁸ km. Write this as an ordinary number.", opts:["1,500,000,000", "150,000,000", "15,000,000", "1,500,000"], ans:1, exp:"<strong>Move decimal 8 places right.</strong> 150,000,000 km"},
  {topic:"Linear Equations", q:"Solve: (x + 2)/3 = 4", opts:["x = 2", "x = 14", "x = 10", "x = 6"], ans:2, exp:"x + 2 = 12 → <strong>x = 10</strong>"},
  {topic:"Transformations", q:"What type of symmetry does the letter 'H' have?", opts:["Rotational only", "Both reflective and rotational", "Neither", "Reflective only"], ans:1, exp:"H has <strong>2 lines of symmetry and rotational symmetry of order 2</strong>."},
  {topic:"Statistics", q:"The mean of 4, x, 9, 7 is 7. Find x.", opts:["6", "5", "8", "7"], ans:2, exp:"4+x+9+7=28, x=28−20=<strong>8</strong>."},
  {topic:"Fractions & %", q:"A laptop costs £800. VAT of 20% is added. Total price?", opts:["£1000", "£820", "£960", "£160"], ans:2, exp:"800×1.2=<strong>£960</strong>."},
  {topic:"Brackets", q:"Expand: (2x+3)(x−4)", opts:["2x²−5x+12", "2x²−11x−12", "2x²+5x−12", "2x²−5x−12"], ans:3, exp:"2x²−8x+3x−12 = <strong>2x²−5x−12</strong>."},
  {topic:"Fractions & %", q:"Jacket costs £80, reduced 15%. Sale price?", opts:["£92", "£12", "£68", "£65"], ans:2, exp:"80×0.85=£68."},
  {topic:"Indices", q:"What is the HCF of 12 and 20?", opts:["2", "60", "6", "4"], ans:3, exp:"12=2²×3, 20=2²×5. HCF=2²=<strong>4</strong>."},
  {topic:"Transformations", q:"Which transformation preserves size and shape?", opts:["Enlargement", "Stretch", "Reflection", "Shear"], ans:2, exp:"<strong>Reflection</strong> is an isometry — preserves size and shape."},
  {topic:"Linear Equations", q:"A rectangle has perimeter 38cm. Width=7cm. Find length.", opts:["31cm", "24cm", "12cm", "19cm"], ans:2, exp:"2(l+7)=38, l+7=19, l=<strong>12cm</strong>."},
  {topic:"Circles", q:"What is the area of a semicircle with radius 6cm? (π=3.14)", opts:["56.52cm²", "113.04cm²", "37.68cm²", "18.84cm²"], ans:0, exp:"½×π×6²=½×3.14×36=<strong>56.52cm²</strong>."},
  {topic:"Statistics", q:"What does a positive correlation on a scatter graph show?", opts:["The variables are unrelated", "As x increases, y increases", "The data has no pattern", "As x increases, y decreases"], ans:1, exp:"<strong>Positive correlation: both variables increase together.</strong>"},
  {topic:"Linear Equations", q:"Two angles are supplementary. One is 3x, the other is x+40. Find x.", opts:["x=35", "x=28", "x=45", "x=40"], ans:0, exp:"3x+x+40=180, 4x=140, x=<strong>35</strong>."},
  {topic:"Statistics", q:"Find the mode of: 3, 7, 2, 7, 5, 7, 3", opts:["3", "7", "2", "5"], ans:1, exp:"7 appears 3 times — most frequent. Mode = <strong>7</strong>."},
  {topic:"Standard Form", q:"Write 7.3×10⁻² as a decimal.", opts:["730", "73", "0.073", "0.73"], ans:2, exp:"Move decimal 2 left: <strong>0.073</strong>."},
  {topic:"Fractions & %", q:"After a 15% increase a price is £138. Original price?", opts:["£120", "£117", "£115", "£123"], ans:0, exp:"P×1.15=138, P=138/1.15=<strong>£120</strong>."},
  {topic:"Linear Equations", q:"Solve: 3x+7=22", opts:["x=3", "x=6", "x=5", "x=4"], ans:2, exp:"3x=15, x=5."},
  {topic:"Statistics", q:"The range of: 4, 12, 7, 19, 3, 15 is:", opts:["16", "19", "12", "15"], ans:0, exp:"Max−Min = 19−3 = <strong>16</strong>."}
  ],
  english: [
  {topic:"PETAL", q:"Where should your topic sentence sit in PETAL?", opts:["After the quote", "At the very start — it IS the Point", "At the end", "In the middle"], ans:1, exp:"Topic sentence = <strong>the Point (P)</strong> — it opens the paragraph with your argument."},
  {topic:"PETAL", q:"What does the 'T' in PETAL require you to do?", opts:["Test the reader", "Time your writing", "Identify the specific technique AND explain what effect THIS example creates", "Tell the poet's story"], ans:2, exp:"T = <strong>identify specific technique + explain the effect THIS example creates</strong> in context."},
  {topic:"Analysis Method", q:"'On a deeper level, the word \"___\" hints at…' is:", opts:["Deeper meaning — going beyond the surface to what the word implies beneath", "Links within text", "Reader impact", "Language choices"], ans:0, exp:"<strong>Deeper meaning</strong> — the word implies something beyond its literal meaning."},
  {topic:"Sentence Stems", q:"Which of these is a stronger analytical opening to a paragraph?", opts:["The poet wrote this poem because he had personal experience of love.", "The poem uses lots of techniques to show the poet's feelings.", "Throughout 'First Love', Clare presents love as a violent, involuntary seizure from which there is no recovery.", "This poem is about love and how it affects people in different ways."], ans:2, exp:"<strong>Specific claim + technique + effect + question link</strong> — the second option makes a precise argument ready for evidence."},
  {topic:"Poetic Techniques", q:"Sibilance is:", opts:["Repetition of plosive sounds", "A comparison using 'like'", "Repetition of 's' or 'sh' sounds creating a hushing or hissing effect", "A turn in the poem"], ans:2, exp:"Sibilance = <strong>repetition of 's'/'sh' sounds</strong> — hushing, peaceful or sinister effect."},
  {topic:"Sentence Stems", q:"'The word X operates on two levels: literally it means... but figuratively it suggests...' — what analytical move is this?", opts:["Identifying a technique without explaining it", "Describing the effect on the reader", "Comparing two different quotations", "Denotation vs connotation — analysing literal and figurative meaning simultaneously"], ans:3, exp:"<strong>Denotation vs connotation analysis</strong> — the most sophisticated form of single-word analysis."},
  {topic:"Terminology", q:"What is blank verse?", opts:["Free verse with no metre", "A poem with 14 lines", "Poetry with rhyme", "Non-rhyming poetry, often in iambic pentameter"], ans:3, exp:"Blank verse = <strong>non-rhyming but metrically regular</strong>, often iambic pentameter."},
  {topic:"Analysis Method", q:"'Things have changed here because earlier ___ but now ___' shows:", opts:["Language choices", "Links within the text — structural awareness of how meaning develops", "Multiple interpretations", "Deeper meaning"], ans:1, exp:"<strong>Links within the text</strong> — shows you understand how meaning develops across the whole poem."},
  {topic:"PETAL", q:"What makes a Link (L) effective in a PETAL paragraph?", opts:["Echoing the exact language of your thesis while showing this paragraph has proved it", "Copying the topic sentence word for word", "Summarising everything said in the paragraph again", "Writing a new argument as part of the link"], ans:0, exp:"<strong>Effective Link echoes thesis language</strong> and shows this specific paragraph has contributed to proving it."},
  {topic:"Poetic Techniques", q:"What is the difference between 'mood' and 'tone' in poetry?", opts:["Mood and tone are the same thing", "Mood = what happens; tone = how it is described", "Tone = poet's attitude; mood = the atmosphere created in the reader", "Tone is consistent; mood changes throughout a poem"], ans:2, exp:"<strong>Tone = poet's attitude. Mood = atmosphere created in the reader.</strong> A poem can have a bitter tone but create a melancholic mood."},
  {topic:"Reading a Poem", q:"'The poem has an intimate tone' means:", opts:["The poem is very short", "The poem creates a sense of closeness or personal address", "The poem is about a romantic relationship", "The poem uses simple vocabulary and short sentences"], ans:1, exp:"<strong>Intimate tone = sense of closeness or personal address</strong> — the poet seems to speak directly to the reader."},
  {topic:"Terminology", q:"What is persona?", opts:["The poet themselves", "The rhyme scheme", "The speaker of a poem, separate from the poet", "The poem's title"], ans:2, exp:"<strong>Persona</strong> = the speaker of the poem."},
  {topic:"Poetic Techniques", q:"What is 'epistrophe' (the opposite of anaphora)?", opts:["Starting successive lines with the same word", "Using the same vowel sound throughout a stanza", "Ending successive lines or clauses with the same word or phrase", "Repeating a refrain at fixed intervals in the poem"], ans:2, exp:"<strong>Epistrophe = same word/phrase at END of successive lines.</strong> Creates a hammering, conclusive effect."},
  {topic:"Analysis Method", q:"The five analytical lenses are:", opts:["Point, evidence, explain, analysis, link", "Simile, metaphor, alliteration, assonance, sibilance", "Intro, body, conclusion, summary, evaluation", "Deeper meaning, language choices, links within text, reader impact, multiple interpretations"], ans:3, exp:"<strong>Deeper meaning · Language choices · Links within text · Reader impact · Multiple interpretations.</strong>"},
  {topic:"Practice Poems", q:"In 'First Love', what does the final couplet suggest?", opts:["First love has permanently changed him — 'my heart has left its dwelling-place / And can return no more'", "He recovered and forgot her", "He moved away", "He will see her again"], ans:0, exp:"<strong>Permanent, irrevocable change</strong> — first love leaves a lasting mark that cannot be undone."},
  {topic:"Essay Writing", q:"What is meant by 'embedding' a quotation?", opts:["Writing a quotation in italics or bold text", "Weaving a short quotation naturally into your own sentence", "Using a quotation at the end of each paragraph", "Placing a long quotation at the start of a paragraph"], ans:1, exp:"<strong>Embedding = weaving a quotation naturally into your own sentence</strong> — e.g. 'The writer describes him as a \"hollow man\".' "},
  {topic:"Terminology", q:"What is an 'ode' and what distinguishes it from other lyric poems?", opts:["A narrative poem telling a story with characters", "A satirical poem mocking a public figure", "An elaborate lyric poem of praise or meditation, often addressed to its subject", "A short, simple poem expressing a single emotion"], ans:2, exp:"<strong>Ode = elaborate lyric poem of praise or meditation</strong> — e.g. Keats's odes address nightingale, autumn, a Grecian urn."},
  {topic:"Reading a Poem", q:"Your essay plan should include:", opts:["Every technique", "Poet's biography", "Thesis + 3 topic sentences (Language/Form/Structure) + quotes under each", "Drawing of setting"], ans:2, exp:"<strong>Thesis + 3 topic sentences + quotes and techniques under each.</strong>"},
  {topic:"Reading a Poem", q:"'The poem shifts in tone in the third stanza' — what does 'tone' mean here?", opts:["The rhyme scheme and metre used", "The poet's attitude and emotional quality conveyed through language", "The volume and pace of reading", "The subject matter introduced"], ans:1, exp:"<strong>Tone = the poet's attitude or emotional quality</strong> — e.g. melancholic, defiant, nostalgic, bitter."},
  {topic:"Terminology", q:"What is 'catharsis' as used in literary criticism?", opts:["The emotional release or purging experienced by the audience through literature", "The climax of a dramatic work", "The lesson or moral derived from a literary work", "The resolution of conflict at a story's end"], ans:0, exp:"<strong>Catharsis = emotional purging/release</strong> — the relief an audience experiences after engaging with powerful emotion in literature."},
  {topic:"Essay Writing", q:"What is the function of a topic sentence?", opts:["To provide the first quotation from the text", "To state the specific argument of the paragraph, linked to the essay question", "To summarise what the paragraph will cover broadly", "To introduce the poet and their background"], ans:1, exp:"<strong>Topic sentence = the specific argument of the paragraph</strong>, directly answering the question. It is the Point in PEEA."},
  {topic:"Analysis Method", q:"'The poem invites multiple readings' — is this a weakness or a strength?", opts:["A weakness — good poems should have one clear meaning", "A weakness if the readings directly contradict each other", "A strength — richness of meaning is a mark of poetic excellence", "Neither — all poems have multiple readings"], ans:2, exp:"<strong>Multiple readings = strength.</strong> Poetic richness comes from sustaining genuine ambiguity and complexity of meaning."},
  {topic:"Sentence Stems", q:"Teacher's stem for deeper meaning:", opts:["Initially it seems about ___ but deep down I think the author is saying ___", "The poem is about…", "The poem ends with…", "The techniques include…"], ans:0, exp:"<strong>'Initially it seems about ___ but deep down the author is saying ___'</strong>."},
  {topic:"Poetic Techniques", q:"What is 'diction' and why does it matter in poetry analysis?", opts:["The way a poem is performed and delivered aloud", "The length and complexity of sentences used", "The overall choice of words — formal/informal, archaic/modern, concrete/abstract", "The punctuation choices made by the poet"], ans:2, exp:"<strong>Diction = word choice overall.</strong> Formal, archaic, colloquial, concrete, abstract — the register creates meaning and voice."},
  {topic:"Reading a Poem", q:"Why do poets sometimes use the second person 'you'?", opts:["To address a specific person in the poet's life", "To draw the reader directly into the poem, making it feel personal", "Because the poet is speaking about themselves indirectly", "Because first person 'I' is grammatically incorrect in verse"], ans:1, exp:"<strong>Second person 'you' draws the reader in</strong>, creating intimacy or implication — you are part of the poem."},
  {topic:"Terminology", q:"What does 'didactic' mean when describing a poem?", opts:["Written in a formal, elevated style", "Intended to teach a moral or ethical lesson", "Highly complex and difficult to understand", "Emotionally powerful and moving"], ans:1, exp:"<strong>Didactic = intended to instruct or teach a moral lesson.</strong> e.g. fables, allegories, much Romantic poetry."},
  {topic:"Terminology", q:"What is a 'blazon' in poetry and what does it typically describe?", opts:["A poem criticising an enemy or rival", "A poem of mourning for someone who has died", "A catalogue of a beloved's physical features — from the Petrarchan love tradition", "A poem describing a landscape or natural scene"], ans:2, exp:"<strong>Blazon = catalogue of beloved's features</strong> — hair, eyes, lips etc. — from Petrarchan tradition, often subverted by later poets."},
  {topic:"Terminology", q:"What is 'intertextuality'?", opts:["When a text references, echoes or is in dialogue with another text", "The relationship between a poem's title and its content", "The internal consistency of a poem's imagery", "The use of metaphor and simile in the same poem"], ans:0, exp:"<strong>Intertextuality = when texts reference or are in dialogue with other texts</strong> — allusion, parody, homage, response."},
  {topic:"Essay Writing", q:"The difference between Explain and Analysis in PEEA:", opts:["Explain is always longer", "No difference — they mean the same", "Analysis comes before Explain", "Explain = what the quote means overall. Analysis = zoom into specific words and ask WHY the poet chose them"], ans:3, exp:"<strong>Explain = overall meaning. Analysis = zoom into specific words and WHY.</strong>"},
  {topic:"Poetic Techniques", q:"What is a 'villanelle' and what is its formal constraint?", opts:["A 19-line poem with two refrains repeated alternately throughout", "A 14-line poem with a volta and a concluding couplet", "A 6-stanza poem with a strict ABABAB rhyme scheme", "A poem with alternating long and short lines throughout"], ans:0, exp:"<strong>Villanelle = 19 lines, two refrains used alternately</strong> — e.g. Dylan Thomas's 'Do Not Go Gentle into that Good Night'."},
  {topic:"PETAL", q:"'The repetition of \"must\" conveys...' — which PETAL step is this?", opts:["Evidence", "Technique — naming the device and beginning to explain its effect", "Point", "Analysis"], ans:1, exp:"This is <strong>Technique</strong> — naming a specific device and beginning to explain its effect."},
  {topic:"Sentence Stems", q:"Which connective would you use to introduce a counter-argument?", opts:["Furthermore, additionally, moreover", "Therefore, consequently, as a result", "However, conversely, yet, on the other hand", "For example, for instance, such as"], ans:2, exp:"<strong>However, conversely, yet</strong> — adversative connectives introduce counter-argument or contrast."},
  {topic:"PETAL", q:"The teacher's A (Analysis) says to analyse:", opts:["The rhyme scheme only", "The impact of evidence AND techniques and how they work together to support the point", "Only similes", "Just one technique"], ans:1, exp:"A = <strong>impact of evidence AND techniques and how they work together</strong>."},
  {topic:"PETAL", q:"'A detailed PETAL paragraph analyses at word level' — what does this mean?", opts:["You must quote single words rather than phrases", "You zoom in on specific individual words and explain their precise connotations", "You choose words that are difficult and unusual", "You count the syllables in each word you quote"], ans:1, exp:"<strong>Word-level analysis = zooming into specific words</strong> and explaining their exact connotations, implications and effects."},
  {topic:"Essay Writing", q:"What does 'developing your point' in PEEA mean?", opts:["Adding another quotation from a different part of the text", "Writing a longer quotation from the text", "Explaining further how the evidence proves your point — going beyond obvious surface meaning", "Moving on to the next paragraph quickly"], ans:2, exp:"<strong>Developing = going beyond surface meaning</strong> — explaining exactly HOW and WHY the evidence proves your point."},
  {topic:"Practice Poems", q:"In 'The Schoolboy', what does the volta at 'But to go to school' achieve?", opts:["It introduces the idea that school has some positive aspects", "It marks the shift from morning to afternoon in the poem", "It shows the boy accepts school as a necessary part of life", "It creates a sharp, painful contrast between natural joy and institutional constraint"], ans:3, exp:"<strong>Volta = sharp contrast.</strong> The 'But' brutally interrupts natural joy — school is presented as an intrusion into natural happiness."},
  {topic:"Analysis Method", q:"'The tension between X and Y runs throughout the poem' — what kind of analytical observation is this?", opts:["A context observation", "A language choice observation", "A structural/thematic observation about the poem's central conflict", "A reader impact observation"], ans:2, exp:"<strong>Identifying central tension</strong> is a sophisticated structural observation — shows understanding of what drives the poem forward."},
  {topic:"Terminology", q:"What is the 'unreliable narrator' and why does it create complexity?", opts:["A narrator who lies deliberately about events", "A narrator who does not know the full story", "A narrator whose account cannot be fully trusted — forces the reader to read between the lines", "A narrator who is not the main character in the story"], ans:2, exp:"<strong>Unreliable narrator = narrator whose account cannot be trusted</strong> — forces active reading and questions what is 'true' in the text."},
  {topic:"Practice Poems", q:"In 'The Schoolboy', 'But' at start of stanza 2 creates:", opts:["Alliteration", "Sibilance", "A volta — sudden shift from joy to misery", "A simile"], ans:2, exp:"<strong>Volta</strong> — dramatic turn from joyful nature to oppressive school."},
  {topic:"Terminology", q:"What is the 'dramatic irony' and how does it differ from verbal irony?", opts:["Dramatic irony: audience knows something characters don't; verbal: saying opposite of what is meant", "Both involve saying the opposite of what is meant", "Both are only used in drama and cannot appear in poetry", "Dramatic irony uses exaggeration; verbal irony uses understatement"], ans:0, exp:"<strong>Dramatic irony = audience knows more than characters.</strong> Verbal irony = saying the opposite of what you mean."},
  {topic:"Analysis Method", q:"What does 'tracking a motif' through a poem demonstrate?", opts:["Understanding of the poet's biography and influences", "That the student can identify the same technique repeatedly", "That the student has memorised every line", "Structural awareness — understanding how recurring images develop and change meaning"], ans:3, exp:"<strong>Tracking a motif demonstrates structural awareness</strong> — understanding how meaning develops and shifts across the poem."},
  {topic:"Analysis Method", q:"'The author wants a reader to feel ___ because ___' is which analytical lens?", opts:["Links within the text", "Reader impact", "Deeper meaning", "Language choices"], ans:1, exp:"<strong>Reader impact</strong> — focusing on the emotional effect on the reader."},
  {topic:"Poetic Techniques", q:"What is hyperbole?", opts:["Understatement", "Exaggeration to emphasise a point", "A type of rhyme", "A structural device"], ans:1, exp:"<strong>Hyperbole</strong> = exaggeration to emphasise."},
  {topic:"Sentence Stems", q:"'By ending the poem with…, [poet] emphasises…' is a stem for analysing:", opts:["Imagery", "Structure — how the ending reinforces or develops meaning", "The introduction", "Sound devices"], ans:1, exp:"<strong>Structure stem</strong> — analyses how the poet's structural choice at the ending creates meaning."},
  {topic:"Poetic Techniques", q:"What is repetition used for in poetry?", opts:["Padding out the poem", "Creating emphasis, insistence, obsession — drawing attention to a key idea", "To confuse the reader", "To make the poem longer"], ans:1, exp:"Repetition = <strong>emphasis, insistence, obsession</strong> — the poet returns to an idea because it is central."},
  {topic:"Analysis Method", q:"What does it mean to 'read against the grain' of a poem?", opts:["Reading without any contextual knowledge", "Interrogating assumptions or finding readings that resist the surface meaning", "Disagreeing with the poet's viewpoint", "Reading the poem backwards from last line to first"], ans:1, exp:"<strong>Reading against the grain = resisting or interrogating the surface reading</strong> — finding what the poem might suppress or conceal."},
  {topic:"Terminology", q:"What is 'apostrophe' as a literary device (not punctuation)?", opts:["A pause mid-sentence created by punctuation", "Repeating a word at the start of successive lines", "Directly addressing an absent person, object or abstraction — 'O Death, where is thy sting?'", "An abrupt change of speaker within a poem"], ans:2, exp:"<strong>Apostrophe = direct address to absent person/object</strong> — 'O Death...', 'O my love's like a red, red rose'."},
  {topic:"PETAL", q:"In the E (Explain) stage of PETAL, what are you doing?", opts:["Explaining in your own words what the quotation means overall", "Quoting another relevant passage from the text", "Naming the specific technique used in the quotation", "Linking the paragraph back to the thesis"], ans:0, exp:"<strong>Explain = what the quotation means overall</strong> — the general sense before you zoom in on specific words."},
  {topic:"Essay Writing", q:"Why should you avoid starting an essay with 'In this essay I will...'?", opts:["It suggests you have not planned your essay properly", "It is grammatically incorrect in academic English", "It wastes words telling the reader what you are about to do rather than doing it", "It is only acceptable in lower-level coursework essays"], ans:2, exp:"<strong>'In this essay...' wastes words.</strong> Start with your argument directly — show don't tell."},
  {topic:"Practice Poems", q:"How does Clare use colour imagery in 'First Love' to convey the experience?", opts:["He avoids colour entirely to focus on emotion", "He drains colour — pallor, whiteness — suggesting love is overwhelming and bleaching", "He uses bright colours to show love is joyful", "He uses red and pink to suggest passion and romance"], ans:1, exp:"<strong>Pallor and whiteness</strong> — love drains Clare of colour, suggesting it is overwhelming rather than pleasurable."},
  {topic:"Reading a Poem", q:"What is 'ambiguity' in a poem and is it a weakness?", opts:["When the poem is impossible to understand completely", "When the poet makes a factual error in the content", "When a word or phrase can be read in more than one valid way — often intentional and powerful", "When the rhyme scheme is inconsistent throughout"], ans:2, exp:"<strong>Ambiguity = multiple valid readings.</strong> Usually deliberate and powerful — allows meaning to be layered."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', why does Yeats end on 'the seed of the fire gets feeble and cold'?", opts:["To show the mother's life energy is extinguishing — her vitality fades as youth sleeps easily", "To criticise the young for not helping with the fire", "To show winter is coming and the fire needs more fuel", "To suggest the house will become cold and uncomfortable"], ans:0, exp:"<strong>Feeble, cold fire = the mother's failing life energy.</strong> As youth sleeps, her fire — her spirit — gutters towards death."},
  {topic:"Practice Poems", q:"In 'The Schoolboy', what does Blake mean by 'the summer morn' in the opening stanza?", opts:["A symbol of the pastoral landscape the boy loves", "The literal season in which the poem is set", "Childhood itself — innocent, free and natural before schooling constrains it", "The time of day when the boy wakes to go to school"], ans:2, exp:"<strong>Summer morn = childhood innocence and natural freedom</strong> — the poem opens in idyllic freedom before school introduces oppression."},
  {topic:"Reading a Poem", q:"How many times should you read the poem before writing?", opts:["It doesn't matter", "Once — then write immediately", "At least twice — first for meaning, second to annotate", "Five times minimum"], ans:2, exp:"At least <strong>twice</strong> — first read for overall meaning and mood, second read to annotate techniques."},
  {topic:"Reading a Poem", q:"The teacher recommends three paragraph angles. They are:", opts:["Meaning, message, mood", "Language, Form, Structure", "Simile, metaphor, alliteration", "Intro, body, conclusion"], ans:1, exp:"<strong>Language, Form, Structure</strong> — covers everything in any poem."},
  {topic:"PETAL", q:"What is the purpose of a strong Analysis (A) in PETAL?", opts:["To show the technique and evidence work together to prove the argument", "To introduce a counter-argument to the main point", "To summarise the paragraph in a new way", "To add more quotations from elsewhere in the text"], ans:0, exp:"<strong>Analysis = shows how technique + evidence work together</strong> to prove the paragraph's argument. The 'so what' of the paragraph."},
  {topic:"Poetic Techniques", q:"What is 'pathetic fallacy' and give an example:", opts:["When weather or nature reflects the human emotional state — e.g. a storm during grief", "When animals behave like humans in the poem", "A logical error made by the poet in the argument", "When the poet uses overly emotional language"], ans:0, exp:"<strong>Pathetic fallacy = nature/weather reflects human emotion.</strong> e.g. 'the stormy sky wept' during a sad scene."},
  {topic:"Essay Writing", q:"PEEA stands for:", opts:["Point, Example, Evaluate, Answer", "Poem, Evidence, Effect, Argument", "Point, Evidence, Explain, Analysis", "Paragraph, Evidence, Explore, Analysis"], ans:2, exp:"<strong>PEEA = Point, Evidence, Explain, Analysis</strong>."},
  {topic:"Reading a Poem", q:"What does 'the poem resists a single interpretation' mean?", opts:["The poem is rich enough to support multiple valid readings simultaneously", "The poem is too long to read in a single sitting", "The poem is poorly written and confusing", "The poem's meaning changes each time you read it"], ans:0, exp:"A poem that <strong>resists single interpretation is rich and complex</strong> — good poetry sustains multiple valid readings."},
  {topic:"Poetic Techniques", q:"What is a caesura?", opts:["A type of rhyme scheme", "A run-on line", "The final stanza", "A pause mid-line, usually created by punctuation"], ans:3, exp:"Caesura = <strong>pause mid-line</strong>, usually created by punctuation — creates tension or hesitation."},
  {topic:"Poetic Techniques", q:"What is the effect of monosyllabic language in poetry?", opts:["Creates a flowing, musical quality to the verse", "Makes the poem easier for younger readers to understand", "Creates bluntness, directness or emphasis — short words hit harder", "Shows the poet's limited vocabulary"], ans:2, exp:"<strong>Monosyllabic language = bluntness, directness, impact.</strong> Short words hit hard — e.g. 'I shall not be moved.'"},
  {topic:"Practice Poems", q:"In 'The Schoolboy', what does the image of the 'drooping' plant in a pot suggest?", opts:["Plants are delicate and need careful tending", "The school has a garden where plants are grown by students", "A child constrained in school droops like a plant in an unsuitable pot — both need freedom to flourish", "A plant needs water and good soil to thrive"], ans:2, exp:"<strong>The drooping caged plant = the schoolboy.</strong> Blake's extended metaphor shows how confinement kills natural growth and joy."},
  {topic:"Sentence Stems", q:"Best multiple interpretation stem:", opts:["The poet is confused.", "This image could suggest…, but it might also imply…", "The poem means this one thing.", "There is only one meaning."], ans:1, exp:"<strong>'This image could suggest…, but it might also imply…'</strong>."},
  {topic:"Poetic Techniques", q:"What is a plosive?", opts:["A comparison using 'like'", "A type of metaphor", "An abrupt consonant sound using /b/, /p/, /t/ or /d/", "A soft 's' sound"], ans:2, exp:"Plosive = <strong>abrupt consonant sounds (/b/, /p/, /t/, /d/)</strong> — creates harsh, forceful effect."},
  {topic:"Sentence Stems", q:"'Superficially, the poem appears to be about X, but at a deeper level it explores Y' — which lens is this?", opts:["Links within the text", "Language choices", "Deeper meaning — distinguishing surface from underlying significance", "Reader impact"], ans:2, exp:"<strong>Deeper meaning stem — moves from surface reading to underlying significance.</strong>"},
  {topic:"Reading a Poem", q:"'The poem uses a dramatic monologue form' — what does this mean?", opts:["A single speaker addresses an implied listener, revealing character", "The poem is very dramatic and emotional in content", "Multiple speakers take turns speaking in the poem", "The poem is written to be performed on stage"], ans:0, exp:"<strong>Dramatic monologue = single speaker addressing an implied audience</strong>, revealing character through their speech."},
  {topic:"Reading a Poem", q:"What does it mean to 'interrogate' a poem?", opts:["To question every word choice and ask why the poet made each decision", "To copy it out neatly with annotations", "To research the poet's life and background", "To read it aloud clearly"], ans:0, exp:"<strong>Interrogate = question every word choice.</strong> Ask WHY this word, WHY this structure, what effect is created."},
  {topic:"Reading a Poem", q:"What is 'connotation' and why does it matter in poetry?", opts:["The emotional, cultural or secondary associations a word carries beyond its literal meaning", "The length and number of syllables in a word", "The grammatical function of a word in a sentence", "The sound a word makes when spoken aloud"], ans:0, exp:"<strong>Connotation = emotional/cultural associations beyond literal meaning.</strong> 'Home' ≠ 'house' — the connotations differ enormously."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', the repetition of 'must' suggests:", opts:["No choice — motherhood is an inescapable duty", "She is very organised", "She enjoys her work", "She is young"], ans:0, exp:"'Must' repeated = <strong>obligation, no choice, burden</strong>."},
  {topic:"PETAL", q:"What happens to the quality of a PETAL paragraph if the quotation is too long?", opts:["It becomes weaker — selecting too much shows inability to identify what is most significant", "It becomes more impressive because there is more evidence", "It means the analysis section can be shorter", "It exceeds the word limit and loses marks automatically"], ans:0, exp:"<strong>Long quotation = weaker selection skill.</strong> The examiner wants to see you choose the most significant phrase, not copy chunks."},
  {topic:"Poetic Techniques", q:"What is a metaphor?", opts:["Giving human qualities to objects", "Repeated consonant sounds", "Comparison using 'like' or 'as'", "Direct comparison saying one thing IS another"], ans:3, exp:"Metaphor = <strong>direct comparison — one thing IS said to be another</strong>."},
  {topic:"Sentence Stems", q:"'Read in the context of [time period/event], this line takes on additional resonance because...' — what does this add?", opts:["Personal opinion that weakens the analysis", "Contextual depth that enriches the textual analysis without replacing it", "An alternative interpretation that contradicts the main reading", "A summary of the poet's biography"], ans:1, exp:"<strong>Contextual resonance</strong> — historical or biographical context that deepens textual analysis without overwhelming it."},
  {topic:"Reading a Poem", q:"The three paragraph angles recommended by the teacher are:", opts:["Simile, metaphor, rhyme", "Beginning, middle, end", "Meaning, message, tone", "Language, Form, Structure"], ans:3, exp:"<strong>Language, Form, Structure</strong> — three angles covering everything in a poem."},
  {topic:"Essay Writing", q:"What is a 'counter-argument' and why does including one improve an essay?", opts:["A personal opinion included at the end", "A point made about a different text or poem", "A second quotation that supports the same point", "An opposing view that you then address — shows sophisticated, balanced thinking"], ans:3, exp:"<strong>Counter-argument = acknowledging an opposing view.</strong> Addressing it shows sophisticated thinking and strengthens your argument."},
  {topic:"PETAL", q:"Why must the Technique (T) stage name the specific device, not just describe the effect?", opts:["Examiners cannot mark a response that doesn't name techniques", "Describing effects without naming techniques is grammatically incorrect", "Naming the technique shows you understand HOW the effect is created, not just THAT it exists", "Naming techniques earns specific marks in examinations"], ans:3, exp:"<strong>Naming the technique shows HOW the effect is created</strong> — e.g. 'alliteration creates urgency' is more precise than 'the sounds are harsh'."},
  {topic:"Terminology", q:"'Nostalgic' tone means:", opts:["Longing for the past with a mix of happiness and sadness", "Fearful", "Purely joyful", "Angry and bitter"], ans:0, exp:"Nostalgic = <strong>bittersweet longing for the past</strong> — happiness at the memory, sadness it is gone."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', what does the fire symbolise?", opts:["The mother's life energy — flickering with life at the start, feeble and cold at the end", "Winter", "Warmth only", "Cooking"], ans:0, exp:"The fire = <strong>the mother's life energy</strong>. Cyclical structure: flickering at start → feeble and cold at end."},
  {topic:"Poetic Techniques", q:"What is 'ubi sunt' as a poetic motif?", opts:["A lament for past times or people — 'where are those who were here before us?'", "A type of praise poem celebrating the present moment", "A Latin phrase meaning 'where are we now?'", "A technique for addressing the future rather than the past"], ans:0, exp:"<strong>Ubi sunt (where are they?) = a lament for the past</strong> — asking where great things/people have gone. Creates melancholy nostalgia."},
  {topic:"PETAL", q:"In a strong PETAL paragraph, how many techniques should you identify?", opts:["Exactly one — focus fully on a single device", "As many as possible to show wide knowledge", "One or two with deep analysis rather than many with shallow comments", "All techniques in the quotation regardless of relevance"], ans:0, exp:"<strong>Quality over quantity.</strong> One or two techniques analysed deeply is far more effective than listing many briefly."},
  {topic:"Essay Writing", q:"Your conclusion should NOT:", opts:["Introduce a brand new argument with new quotes", "Restate the thesis", "Comment on writer's purpose", "Summarise briefly"], ans:0, exp:"<strong>Never introduce a new argument in the conclusion.</strong>"},
  {topic:"Reading a Poem", q:"What is 'tone' in poetry?", opts:["The poem's length", "The speed of reading", "The poet's attitude or emotional quality conveyed through word choices", "The volume of the reading"], ans:2, exp:"Tone = <strong>the poet's attitude or emotional quality</strong> — e.g. wearied, defiant, melancholic."},
  {topic:"Analysis Method", q:"'This reflects wider ideas about ageing and responsibility because…' is:", opts:["A technique identification", "A language choice", "A link within the text", "A broader ideas stem — linking the poem to wider social or historical context"], ans:3, exp:"<strong>Broader ideas</strong> — connects specific language to wider themes in society or history."},
  {topic:"Analysis Method", q:"'Privileging one reading over another' means:", opts:["Finding all possible readings of a poem", "Selecting the reading that agrees with the teacher's interpretation", "Making a reasoned argument that one interpretation is more convincing than another", "Choosing whichever reading is most positive"], ans:2, exp:"<strong>Privileging = making a reasoned case that one reading is more convincing</strong> — not dismissing others but arguing for your interpretation."},
  {topic:"Essay Writing", q:"'Zooming in' on a word means:", opts:["Focusing on the first line of a poem only", "Selecting a specific word and analysing exactly what it implies or suggests", "Using a microscope metaphor in your analysis", "Quoting a long passage and discussing it generally"], ans:1, exp:"<strong>Zooming in = selecting a specific word and analysing its precise implications</strong> — WHY this word, not another?"},
  {topic:"Poetic Techniques", q:"What is symbolism?", opts:["Repetition of sounds", "A comparison using 'as'", "A type of rhyme", "A word/object representing something beyond its literal meaning"], ans:3, exp:"<strong>Symbolism</strong> = a word/object representing something beyond its literal meaning."},
  {topic:"Analysis Method", q:"'Sustained analysis' differs from 'feature-spotting' because:", opts:["Sustained analysis uses more quotations", "Sustained analysis is only possible in examination conditions", "Sustained analysis is longer", "Sustained analysis explains WHY techniques matter and connects them to meaning; feature-spotting just names them"], ans:3, exp:"<strong>Sustained analysis = WHY + HOW techniques create meaning.</strong> Feature-spotting = naming techniques without explaining their significance."},
  {topic:"Practice Poems", q:"In 'The Schoolboy', where does the volta occur?", opts:["At the final stanza", "At the start", "At the word 'But' in stanza 2 — sudden shift from joy to misery", "There is no volta"], ans:2, exp:"The volta is at <strong>'But'</strong> in stanza 2 — dramatic shift from the joyful summer morning to oppressive school."},
  {topic:"Essay Writing", q:"'The poem's structure mirrors its meaning' — what does this mean?", opts:["The poet structured the poem according to classical rules", "The way the poem is organised reflects and reinforces what it is saying", "The poem has a regular structure that is easy to follow", "The poem looks like its subject when written on the page"], ans:1, exp:"<strong>Structure mirrors meaning</strong> — e.g. a fragmented structure for a poem about loss; circular structure for a poem about memory."},
  {topic:"Sentence Stems", q:"'Yeats may be commenting on society's expectations of women by…' is an example of:", opts:["An evidence stem", "A close reading stem", "A technique identification stem", "A broader ideas / context stem — linking to wider social meaning"], ans:3, exp:"<strong>Broader ideas stem</strong> — connects the poem to wider social/historical context."},
  {topic:"Poetic Techniques", q:"What is the effect of anaphora in poetry?", opts:["Creates a soft, musical quality through vowel repetition", "Creates contrast between opposite ideas", "Repetition of the same phrase at the start of successive lines — creates emphasis and insistence", "Links the end of one line to the beginning of the next"], ans:2, exp:"<strong>Anaphora = same phrase repeated at line starts.</strong> Creates emphasis, insistence, liturgical rhythm — e.g. 'We shall fight... We shall fight...'."},
  {topic:"Terminology", q:"What is a persona in poetry?", opts:["The poem's subject", "The poet themselves", "The reader", "The speaker of the poem — a created voice, not necessarily the poet"], ans:3, exp:"Persona = <strong>the speaker of the poem</strong> — may or may not be the poet."},
  {topic:"Sentence Stems", q:"'The poet's choice of form — [sonnet/free verse/dramatic monologue] — is significant because...' — what does this stem begin?", opts:["A Form and structure analysis point — linking choice of form to meaning", "A language analysis point", "A deeper meaning point", "A reader impact point"], ans:0, exp:"<strong>Form analysis</strong> — discussing WHY the poet chose this particular form and how it contributes to meaning."},
  {topic:"PETAL", q:"Why should a PETAL paragraph open with the Point, not the quotation?", opts:["Examiners always want to see the argument before the evidence", "Opening with a quotation is grammatically incorrect", "The Point establishes your argument; the quotation is evidence for it — not the other way around", "Quotations are difficult to remember and should come later"], ans:2, exp:"<strong>Point first establishes your argument.</strong> The quotation is evidence FOR the point — it follows, not leads."},
  {topic:"Poetic Techniques", q:"What is a semantic field?", opts:["The physical area where a poem is set", "The poem's setting", "A group of words related to the same category — creates a dominant atmosphere", "A type of metaphor"], ans:2, exp:"Semantic field = <strong>related words creating a dominant atmosphere or idea</strong>."},
  {topic:"Poetic Techniques", q:"What is a semantic field?", opts:["The poem's setting", "A field where poems grow", "A type of stanza", "Words that relate to each other — same category of meaning"], ans:3, exp:"<strong>Semantic field</strong> = group of related words creating a dominant atmosphere."},
  {topic:"Sentence Stems", q:"'This choice of [form/structure] creates a sense of [effect], mirroring the poem's central concern with...' — why is this powerful?", opts:["It links formal choice to thematic content — showing form and meaning are inseparable", "It combines language and structure analysis in one sentence", "It proves the student has read the poem more than once", "It shows the student has memorised the technique"], ans:0, exp:"<strong>Links form to meaning</strong> — the most sophisticated structural analysis shows these are inseparable."},
  {topic:"PETAL", q:"What does the 'E' (Evidence) in PETAL require?", opts:["A precise, short quotation embedded in your own sentence", "Your opinion", "A definition", "A long quotation of several lines"], ans:0, exp:"Evidence = <strong>precise, short quotation, embedded naturally</strong> in your own sentence."},
  {topic:"Essay Writing", q:"What does 'forensic analysis' mean when applied to poetry?", opts:["Reading a poem for clues about the poet's life", "Using scientific methods to date a poem", "Analysing the historical context of the poem", "Close, precise examination of individual words as if presenting evidence"], ans:3, exp:"<strong>Forensic analysis = close, precise examination of individual words</strong>, treating them as evidence to build an argument."},
  {topic:"Terminology", q:"What is iambic pentameter?", opts:["Ten stressed syllables per line", "A type of free verse", "Unstressed-stressed syllable pattern, five times per line (da-DUM×5)", "Any poem with five lines"], ans:2, exp:"Iambic pentameter = <strong>da-DUM × 5</strong> — the natural rhythm of English speech."},
  {topic:"Reading a Poem", q:"What is the difference between a poet and a speaker/persona?", opts:["They are always the same person", "The poet wrote the poem; the speaker/persona is the voice in the poem — they may differ", "The poet never appears in the poem", "The persona is always fictional"], ans:1, exp:"<strong>Poet = who wrote it. Persona/speaker = the voice in the poem.</strong> They are not always the same."},
  {topic:"PETAL", q:"PETAL stands for:", opts:["Point, Evidence, Technique, Analysis, Link", "Poem, Evidence, Technique, Analysis, Literature", "Point, Example, Technique, Argument, Link", "Point, Explain, Technique, Argument, Link"], ans:0, exp:"<strong>PETAL = Point, Evidence, Technique, Analysis, Link</strong>."},
  {topic:"Analysis Method", q:"'This reflects a wider cultural anxiety about...' — why is this a strong analytical move?", opts:["It connects close reading to cultural context, showing how poetry is in dialogue with society", "It moves away from the text to discuss history", "It is only valid if the exam question asks about context", "It shows the student has done extra research"], ans:0, exp:"<strong>Connecting to cultural context</strong> shows how poetry engages with society — the most sophisticated level of analysis."},
  {topic:"Reading a Poem", q:"What does 'denotation' mean in poetry analysis?", opts:["The literal dictionary meaning of a word", "The sound pattern created by a word", "The rhythm created by the word's syllables", "The emotional associations of a word"], ans:0, exp:"<strong>Denotation = the literal dictionary meaning.</strong> Connotation = the emotional/cultural associations. Both matter in analysis."},
  {topic:"Poetic Techniques", q:"What is asyndeton (the opposite of polysyndeton)?", opts:["Using no adjectives throughout the poem", "Listing without conjunctions — creates pace and abruptness", "Removing all punctuation from a poem", "Using many different conjunctions in a list"], ans:1, exp:"<strong>Asyndeton = list without conjunctions.</strong> 'I came, I saw, I conquered' — creates pace, urgency, abruptness."},
  {topic:"Practice Poems", q:"In 'First Love', why does Clare use the metaphor of 'blood rushing to his face'?", opts:["To describe his nervousness in social situations", "To show he is embarrassed by love", "To suggest he is feverish and unwell", "To show love as a powerful physical seizure — involuntary, overwhelming, almost violent"], ans:3, exp:"<strong>Physical reaction = involuntary seizure.</strong> Love overwhelms bodily control — Clare presents love as happening TO him, not chosen by him."},
  {topic:"Practice Poems", q:"In 'First Love', the oxymoron 'seemed midnight at noonday' shows:", opts:["It was cloudy", "It was actually dark", "He was confused about time", "Love has turned his world upside down — he cannot perceive reality clearly"], ans:3, exp:"<strong>Love completely disorients him</strong> — the oxymoron shows his perception of reality has been overturned."},
  {topic:"Poetic Techniques", q:"What is 'zeugma' in poetry?", opts:["Repeating the same word with different meanings", "Starting and ending a line with the same word", "Using one verb to govern two different objects creating surprising effects — 'she lost her keys and her temper'", "Placing two contrasting ideas in parallel phrases"], ans:2, exp:"<strong>Zeugma = one verb with two incongruous objects</strong> — 'lost her keys and her composure' — creates wit and surprise."},
  {topic:"Sentence Stems", q:"'This image could suggest…, but it might also imply…' — why is this powerful?", opts:["It shows you can read language in more than one way — multiple interpretations show sophisticated thinking", "It always scores marks", "It's longer", "It uses the word 'suggest'"], ans:0, exp:"<strong>Multiple interpretations</strong> show sophisticated, layered thinking — language can carry more than one meaning."},
  {topic:"PETAL", q:"The teacher's L (Link) says to link back to:", opts:["The poet's biography", "The poem title", "The rhyme scheme", "Your thesis statement"], ans:3, exp:"L = <strong>link your point back to your thesis statement</strong>."},
  {topic:"Poetic Techniques", q:"What is enjambment?", opts:["Sentence runs on from one line to the next without a pause", "A pause mid-line", "All lines rhyme", "Sentence ends at the line end"], ans:0, exp:"Enjambment = <strong>sentence runs on past the line end</strong> — creates flow, urgency or breathlessness."},
  {topic:"Poetic Techniques", q:"What is pathetic fallacy?", opts:["Repetition for emphasis", "A weak comparison", "A type of alliteration", "Giving human feelings to nature or weather to create a mood"], ans:3, exp:"<strong>Pathetic fallacy</strong> = giving human feelings to nature/weather to mirror the speaker's emotions."},
  {topic:"Terminology", q:"What is a sestet?", opts:["6-line stanza", "4-line stanza", "2-line stanza", "14-line poem"], ans:0, exp:"<strong>Sestet</strong> = six-line stanza."},
  {topic:"Sentence Stems", q:"'Initially it seems the text is about ___ but deep down…' — which analytical lens?", opts:["Deeper meaning — looking past the surface to the author's underlying message", "Language choices", "Links within the text", "Reader impact"], ans:0, exp:"<strong>Deeper meaning</strong> — moves from surface reading to underlying message."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', what does the contrast between young women and the old mother represent?", opts:["A celebration of domestic life and its routines", "A conflict between tradition and modernity", "The injustice of gendered labour — youth has leisure while old age has endless work", "A contrast between happiness and sadness in old age"], ans:2, exp:"<strong>Youth/leisure vs old age/labour</strong> — Yeats critiques the gendered injustice of domestic work falling entirely on older women."},
  {topic:"Sentence Stems", q:"'The contrast between X and Y in lines 3 and 12 suggests...' — which lens?", opts:["Deeper meaning", "Links within the text — structural awareness of development", "Technique identification", "Language choices"], ans:1, exp:"<strong>Links within the text</strong> — comparing different moments shows structural understanding of how meaning develops."},
  {topic:"Poetic Techniques", q:"What is alliteration?", opts:["Words that rhyme at line ends", "Repetition of the same consonant sound at the start of nearby words", "Repetition of vowel sounds", "Comparison using 'like'"], ans:1, exp:"Alliteration = <strong>same consonant sound repeated at the start of nearby words</strong>."},
  {topic:"Sentence Stems", q:"'Having established X in the opening stanza, the poet subverts expectations by...' — what lens is this?", opts:["Deeper meaning — underlying theme", "Links within the text — tracking how meaning develops or shifts", "Language choices — specific word analysis", "Reader impact — describing shock"], ans:1, exp:"<strong>Links within text</strong> — tracks development and subversion of expectations across the poem's structure."},
  {topic:"Essay Writing", q:"PEEA stands for:", opts:["Poem Evidence Effect Argument", "Point Example Evaluate Argument", "Point Evidence Explain Analysis", "Paragraph Evidence Explore Analysis"], ans:2, exp:"<strong>PEEA = Point, Evidence, Explain, Analysis</strong>."},
  {topic:"Poetic Techniques", q:"What is 'chiasmus' and give an example:", opts:["Listing items in order of increasing importance", "Repeating a word at the start of every line", "Using two contradictory words side by side", "Reversing grammatical structure in successive clauses — 'ask not what your country can do for you; ask what you can do for your country'"], ans:3, exp:"<strong>Chiasmus = reversed structure in parallel clauses.</strong> 'Ask not what your country can do for you — ask what you can do for your country.'"},
  {topic:"Poetic Techniques", q:"What is a rhetorical question?", opts:["A question addressed to the teacher", "A question the poet can't answer", "A question that doesn't require an answer — used for emphasis or to challenge the reader", "A question about the rhyme scheme"], ans:2, exp:"Rhetorical question = <strong>asked for effect, not to get an answer</strong> — challenges or engages the reader."},
  {topic:"Terminology", q:"What is a sonnet?", opts:["A poem with no rhyme", "Any long poem", "A poem about love only", "A 14-line poem with a fixed rhyme scheme"], ans:3, exp:"Sonnet = <strong>14-line poem with a fixed rhyme scheme</strong> — often ends with a rhyming couplet."},
  {topic:"Poetic Techniques", q:"Personification means:", opts:["A comparison using 'as'", "Repeating words at line starts", "End rhyme", "Giving human qualities to a non-human thing"], ans:3, exp:"Personification = <strong>giving human qualities to a non-human thing</strong> — e.g. 'the wind whispered'."},
  {topic:"Terminology", q:"What is rhythm in poetry?", opts:["The rhyme at line ends", "The number of stanzas", "The beat or flow of the poem — pattern of stressed and unstressed syllables", "The poem's subject matter"], ans:2, exp:"Rhythm = <strong>the beat or flow</strong> — pattern of stressed and unstressed syllables."},
  {topic:"Terminology", q:"What does 'verisimilitude' mean in literary criticism?", opts:["The use of vivid descriptive language", "The appearance of being true or realistic within the world of the text", "The emotional truth at the heart of a poem", "The use of real historical events in fiction"], ans:1, exp:"<strong>Verisimilitude = the quality of appearing true or real</strong> — the text creates believability within its own world."},
  {topic:"Poetic Techniques", q:"What is 'apophasis' in rhetoric?", opts:["Addressing an absent person directly in the poem", "Repeating the same idea in different words", "Mentioning something by claiming you won't mention it — 'I won't say he is dishonest...'", "Asking a question you immediately answer yourself"], ans:2, exp:"<strong>Apophasis = mentioning by denial</strong> — 'I won't mention that he lies' draws attention to exactly what you claim to ignore."},
  {topic:"Poetic Techniques", q:"What is anaphora?", opts:["End rhyme", "A type of metaphor", "A pause mid-line", "Using a word previously used — repetition at phrase starts for emphasis"], ans:3, exp:"<strong>Anaphora</strong> = using a word previously used — creates emphasis and insistence."},
  {topic:"Poetic Techniques", q:"What is the effect of inverted syntax (changing normal word order) in poetry?", opts:["Creates emphasis by placing unexpected words first, or maintains a rhyme scheme", "Makes the poem easier to understand", "Shows the poet is writing in an old-fashioned style", "Slows the reader down to make them concentrate more"], ans:0, exp:"<strong>Inverted syntax = emphasis through unusual word order,</strong> or maintaining rhyme/metre — e.g. 'Cold blew the wind' instead of 'the wind blew cold'."},
  {topic:"Reading a Poem", q:"Why should you underline or highlight key words when annotating a poem?", opts:["To make your notes look neat", "To show you have read the whole poem carefully", "To identify words that carry significant meaning or create particular effects", "To count how many poetic techniques are used"], ans:2, exp:"<strong>Highlighting key words focuses analysis</strong> on specific language choices and the effects they create."},
  {topic:"Poetic Techniques", q:"What is synecdoche and how does it differ from metonymy?", opts:["Both involve replacing one word with another unrelated word", "Synecdoche is a sound device; metonymy is a visual device", "Synecdoche uses part to represent whole (hand = worker); metonymy substitutes a related concept (crown = monarchy)", "Both are types of simile using indirect comparison"], ans:2, exp:"<strong>Synecdoche = part for whole.</strong> Metonymy = related concept substituted. Both are forms of indirect reference."},
  {topic:"Terminology", q:"What is 'euphemism' and what effect does its use create?", opts:["A comparison using 'like' or 'as'", "An exaggeration for comic effect", "A word that sounds like its meaning", "A mild or indirect word substituted for something harsh — softens, avoids or obscures"], ans:3, exp:"<strong>Euphemism = substituting a mild term for something harsh</strong> — 'passed away' for 'died'. Can soften, hide or sanitise."},
  {topic:"Essay Writing", q:"What should a good introduction contain?", opts:["Three quotes in detail", "All the techniques you'll use", "Thesis + command words + writer's purpose — in 3-4 sentences", "A full plot summary"], ans:2, exp:"Good intro: <strong>thesis + command words + writer's purpose</strong>, in 3-4 sentences. No detailed analysis yet."},
  {topic:"Poetic Techniques", q:"What is an 'elegy' and what tone does it typically have?", opts:["A poem addressed directly to an absent person", "A poem celebrating a great victory or achievement", "A poem of mourning and lamentation for the dead or lost", "A humorous poem mocking a public figure"], ans:2, exp:"<strong>Elegy = poem of mourning</strong> — typically solemn, reflective, melancholic in tone. e.g. Gray's 'Elegy Written in a Country Churchyard'."},
  {topic:"Reading a Poem", q:"First thing to do when you get an unseen poem?", opts:["Count the stanzas", "Start writing", "Read the poem first", "Read the question and highlight the command words"], ans:3, exp:"Always read the <strong>question FIRST</strong> and highlight command words."},
  {topic:"Sentence Stems", q:"'The poet may be commenting on [social issue] through this image because...' — what does this stem do?", opts:["It speculates without evidence", "It describes how the reader responds emotionally", "It identifies the technique used", "It connects the poem to broader social or historical context"], ans:3, exp:"<strong>Broader ideas/context stem</strong> — connecting specific language to wider social concerns the poet is engaging with."},
  {topic:"Practice Poems", q:"In 'First Love', the three stanzas move from physical reactions → confusion → despair. This shows:", opts:["Random structure", "Free verse", "The ABAB rhyme scheme", "Structural development — love becomes more painful over time"], ans:3, exp:"<strong>Structural development</strong> — each stanza a different stage."},
  {topic:"Reading a Poem", q:"A volta is:", opts:["A type of simile", "A pause mid-line", "The rhyme scheme", "A turn or shift in the poem's tone, argument or perspective"], ans:3, exp:"<strong>Volta</strong> = a turn or shift in the poem."},
  {topic:"Reading a Poem", q:"An anomaly in data is similar to what in poetry analysis?", opts:["A stanza break", "A rhyme scheme", "An anomalous reading that doesn't fit the pattern — like a word that disrupts tone", "A technique"], ans:2, exp:"In poetry, an anomaly is a detail that <strong>disrupts the expected pattern</strong> — often worth analysing."},
  {topic:"Reading a Poem", q:"What is meant by a poem's 'central conceit'?", opts:["The poet's main argument or thesis statement", "The title and its relationship to the content", "An extended metaphor that runs through the whole poem", "The main character in a narrative poem"], ans:2, exp:"<strong>Central conceit = an extended metaphor</strong> sustained throughout the poem, e.g. comparing love to a journey."},
  {topic:"Practice Poems", q:"In 'First Love', the questions in the final stanza ('Are flowers the winter's choice?') create:", opts:["A conversational quality making the poem accessible", "A rhetorical argument about seasonal change", "An ironic tone suggesting the poet knows the answers", "A sense of bewilderment and disorientation — love has made the world incomprehensible"], ans:3, exp:"<strong>Questions create bewilderment</strong> — the world Clare knew no longer makes sense after the overwhelming experience of first love."},
  {topic:"Essay Writing", q:"What should you NEVER do in a conclusion?", opts:["Comment on writer's purpose", "Restate the thesis", "Introduce a brand new argument or quote", "Summarise briefly"], ans:2, exp:"<strong>Never introduce new arguments or quotes in the conclusion.</strong> Only reflect on what you've argued."},
  {topic:"Poetic Techniques", q:"An oxymoron is:", opts:["A type of simile", "A weak comparison", "Repetition for effect", "Two contradictory words placed together for effect — shows complex emotions"], ans:3, exp:"Oxymoron = <strong>contradictory words together for effect</strong> — e.g. 'O brawling love! O loving hate!'"},
  {topic:"PETAL", q:"How long should the Evidence (E) quotation ideally be?", opts:["Exactly ten words as a general rule", "Short — a few words at most, precisely selected for relevance", "As long as needed to show the full technique", "A full sentence or more for context"], ans:2, exp:"<strong>Short quotation</strong> — a few words precisely selected. Shows skill in identifying the most important language."},
  {topic:"Terminology", q:"What is an elegy?", opts:["A dramatic monologue", "A poem focused on death or loss", "A type of sonnet", "A joyful poem"], ans:1, exp:"<strong>Elegy</strong> = a poem focused on death or loss."},
  {topic:"Reading a Poem", q:"What is the effect of a poem ending on an unanswered question?", opts:["It leaves the reader uncertain and unsettled — invites continued reflection", "It is a structural error that weakens the poem", "It shows the poet forgot to finish the poem", "It suggests the poem is part of a longer sequence"], ans:0, exp:"Ending on a question <strong>leaves the reader unsettled, inviting continued reflection</strong> and resisting easy answers."},
  {topic:"Terminology", q:"What is a 'motif' in poetry and how does it differ from a theme?", opts:["Motif = a sound pattern; theme = a structural pattern", "Motif = the poem's subject; theme = the poet's feeling about it", "A motif and a theme are the same thing", "Motif = a recurring image or symbol; theme = the abstract idea it represents"], ans:3, exp:"<strong>Motif = recurring concrete image/symbol.</strong> Theme = abstract idea. Water might be a motif representing the theme of time."},
  {topic:"Sentence Stems", q:"'The word \"___\" makes me feel ___ because ___' is which type of stem?", opts:["Introduction stem", "Structure analysis", "Conclusion stem", "Language choices — zooming into a specific word's effect on the reader"], ans:3, exp:"<strong>Language choices stem</strong> — focuses on a specific word's effect on the reader."},
  {topic:"Poetic Techniques", q:"What is a plosive?", opts:["A type of metaphor", "A soft 's' sound", "An abrupt sound made with /b/, /p/, /t/ or /d/", "A rhyming device"], ans:2, exp:"<strong>Plosive</strong> = abrupt consonant sounds — creates harsh, forceful effect."},
  {topic:"Essay Writing", q:"Why should personal pronouns like 'I think' be avoided in literary essays?", opts:["'I think' weakens claims — use confident assertions with textual evidence instead", "'I think' suggests you have not read the text carefully", "First person is grammatically incorrect in formal writing", "Using 'I' makes the essay too long"], ans:0, exp:"<strong>'I think' weakens your claim.</strong> State your analysis confidently — 'The poet presents...', 'This implies...' are stronger."},
  {topic:"Reading a Poem", q:"Why is planning before writing important?", opts:["Teachers require it", "It wastes time", "It helps you memorise the poem", "A clear plan leads to a well-structured essay — 3-5 minutes planning saves confused writing"], ans:3, exp:"<strong>Planning leads to a well-structured essay</strong>. Students who plan write better, more focused essays."},
  {topic:"PETAL", q:"The teacher's definition of Analysis (A) in PETAL is:", opts:["Analyse the impact of evidence AND techniques and how they work together to support the point", "Any comment about the poem", "Count the syllables", "Summarise the poem"], ans:0, exp:"A = <strong>analyse the impact of evidence AND techniques and how they work together</strong>."},
  {topic:"Essay Writing", q:"What is meant by 'writing in the present tense' when analysing literature?", opts:["Making predictions about what might happen next", "Writing as if the text is alive now — 'the poet presents' not 'the poet presented'", "Using present tense to show personal engagement", "Describing what happened in the story chronologically"], ans:1, exp:"<strong>Literature analysis uses present tense</strong> — the text exists now: 'the poet presents', not 'the poet presented'."},
  {topic:"Reading a Poem", q:"Why is it important to read a poem more than once before analysing it?", opts:["To memorise it for the examination", "To count syllables and check the metre", "To find all the rhyming words", "First read for overall meaning and mood; second read to analyse techniques"], ans:3, exp:"<strong>First read = overall meaning. Second read = technique analysis.</strong> Rushing to technique misses the bigger picture."},
  {topic:"Analysis Method", q:"What is meant by 'the poem's implicit argument'?", opts:["The argument made in the introduction and conclusion only", "The argument stated directly in the title", "The argument not stated but built through imagery, structure and language", "The poet's political views expressed in interviews"], ans:2, exp:"<strong>Implicit argument = the case built through craft</strong> rather than stated directly — what the poem 'says' without saying it."},
  {topic:"Sentence Stems", q:"'The cumulative effect of these techniques is to...' — when would you use this stem?", opts:["When introducing a quotation", "At the start of a paragraph", "At the end of an analysis paragraph to show how techniques work together", "When writing the introduction"], ans:2, exp:"<strong>Cumulative effect = synthesis.</strong> Used at the end of analysis to show how multiple techniques combine to create meaning."},
  {topic:"Poetic Techniques", q:"What is a 'sprung rhythm' associated with Gerard Manley Hopkins?", opts:["A rhythm based on the number of stressed syllables per line regardless of unstressed ones", "A falling rhythm where stressed syllables come first", "A rhythm created entirely by end rhyme and line breaks", "A regular iambic metre with occasional variations"], ans:0, exp:"<strong>Sprung rhythm = counting stressed syllables only,</strong> regardless of unstressed — creates natural speech rhythm."},
  {topic:"Essay Writing", q:"How long should a conclusion be?", opts:["A full page", "One word", "2-3 sentences", "Same as a body paragraph"], ans:2, exp:"<strong>2-3 sentences</strong> — restates thesis, summarises how Language/Form/Structure contribute, comments on writer's purpose."},
  {topic:"Terminology", q:"What is 'litotes' and give an example:", opts:["Giving human qualities to non-human things", "Comparison using 'like' or 'as'", "Understatement through double negative — 'not bad' meaning 'good'", "Extreme exaggeration — 'I've told you a million times'"], ans:2, exp:"<strong>Litotes = understatement via double negative</strong> — 'not bad' (= good), 'not unhappy' (= happy). Typical British understatement."},
  {topic:"Analysis Method", q:"'The phrase \"___\" could be read as…, yet it could equally reflect…' shows:", opts:["Multiple interpretations — sophisticated thinking showing language carries more than one meaning", "A structural point", "A language choice", "Basic analysis"], ans:0, exp:"<strong>Multiple interpretations</strong> — language can carry more than one meaning, showing sophisticated thinking."},
  {topic:"Sentence Stems", q:"'This structural choice reflects the poet's broader concern with...' — what analytical move is this?", opts:["Broader ideas — linking form to thematic concerns", "Reader impact — describing how the reader feels", "Language choices — identifying a specific technique", "Links within text — comparing different moments"], ans:0, exp:"<strong>Linking structure to broader thematic concerns</strong> — shows understanding of how form and content work together."},
  {topic:"Poetic Techniques", q:"What is a 'blazon' in poetry and from which tradition does it originate?", opts:["A poem structured around a central extended metaphor", "A poem celebrating a military victory or national hero", "A poem attacking or criticising a powerful figure", "A catalogue of a beloved's physical attributes — from the Petrarchan love poetry tradition"], ans:3, exp:"<strong>Blazon = catalogue of beloved's features</strong> (eyes like stars, lips like roses) — from Petrarchan love poetry tradition."},
  {topic:"Reading a Poem", q:"'The poem is self-contained' means:", opts:["It has a regular rhyme scheme throughout", "It does not need any contextual knowledge", "All the meaning needed is within the poem itself", "It is very short and easy to read"], ans:2, exp:"<strong>Self-contained = all meaning is within the text</strong> — you don't need outside information to understand it."},
  {topic:"Essay Writing", q:"Difference between Explain and Analysis in PEEA?", opts:["Analysis comes before Evidence", "Explain is longer", "Explain = overall meaning of quote; Analysis = zoom into specific words and ask WHY", "No difference"], ans:2, exp:"<strong>Explain = overall meaning. Analysis = zoom into specific words and WHY the poet chose them.</strong>"},
  {topic:"Sentence Stems", q:"'Where a less careful reader might simply see X, closer examination reveals Y' — what does this stem do?", opts:["It introduces a new argument at the end of a paragraph", "It demonstrates sophisticated reading by going beyond the surface", "It dismisses other readers' interpretations", "It shows the student disagrees with the class"], ans:1, exp:"<strong>Distinguishes surface from deep reading</strong> — demonstrates critical sophistication by going beyond the obvious."},
  {topic:"Poetic Techniques", q:"What is 'bathos' in poetry and when is it used?", opts:["When a poem ends with an uplifting and triumphant conclusion", "When a poem gradually builds to a powerful emotional climax", "An abrupt shift from the elevated to the trivial — for comic or ironic deflation", "When the poet uses very obscure or archaic vocabulary"], ans:2, exp:"<strong>Bathos = sudden drop from elevated to trivial</strong> — creates irony, humour or pathetic deflation of grand claims."},
  {topic:"Poetic Techniques", q:"What is the effect of short sentences / end-stopped lines?", opts:["Only used in sonnets", "Flowing, breathless quality", "Shows the poet ran out of ideas", "Creates abruptness, finality or emphasis — a sense of completion or bluntness"], ans:3, exp:"End-stopped lines / short sentences = <strong>abruptness, finality, emphasis</strong>."},
  {topic:"Terminology", q:"What is blank verse?", opts:["Free verse with no metre", "Poetry with rhyme", "A type of sonnet", "Non-rhyming poetry often in iambic pentameter"], ans:3, exp:"<strong>Blank verse</strong> = non-rhyming but metrically regular."},
  {topic:"Terminology", q:"What is a 'Petrarchan' (Italian) sonnet and how does it differ from a Shakespearean sonnet?", opts:["Petrarchan: 14 lines ABAB CDCD; Shakespearean: 14 lines ABBA ABBA", "Petrarchan: ABBAABBA CDECDE (octave + sestet); Shakespearean: 3 quatrains + couplet", "Petrarchan sonnets are about love; Shakespearean sonnets are about death", "Both have 14 lines but Petrarchan has no couplet while Shakespearean does"], ans:1, exp:"<strong>Petrarchan: octave (ABBAABBA) + sestet (CDECDE).</strong> Shakespearean: 3 quatrains (ABAB CDCD EFEF) + couplet (GG)."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', the accumulation of verbs 'scrub, bake, sweep' creates:", opts:["Sibilance", "A gentle rhythm", "Alliteration", "A sense of relentless, exhausting labour — the list overwhelms, mirroring the mother's experience"], ans:3, exp:"<strong>Accumulation of action verbs</strong> overwhelms the reader — mirrors the relentless nature of the mother's work."},
  {topic:"Reading a Poem", q:"What does 'annotate' mean when reading a poem?", opts:["Mark up key techniques, quotes and ideas linked to the question", "Write a summary", "Copy out the poem", "Draw a picture"], ans:0, exp:"Annotate = <strong>mark up the poem</strong> — highlight techniques, note effects, link to command words."},
  {topic:"Terminology", q:"What is a couplet?", opts:["A 4-line stanza", "A 6-line stanza", "A pair of rhyming consecutive lines", "A 14-line poem"], ans:2, exp:"Couplet = <strong>two consecutive rhyming lines</strong>."},
  {topic:"Practice Poems", q:"Blake compares the schoolboy to a bird in a cage to show:", opts:["He wants a pet", "How school restricts children's natural freedom and joy", "He lives near a park", "He likes birds"], ans:1, exp:"<strong>Extended metaphor</strong> — bird in cage = child in school. School is unnatural and confining."},
  {topic:"PETAL", q:"The 'L' in PETAL means:", opts:["Link back to your thesis statement", "Language", "List more techniques", "Length"], ans:0, exp:"L = <strong>link back to your thesis statement</strong>."},
  {topic:"Essay Writing", q:"Why is 'show' considered a basic analytical verb?", opts:["It's too long", "It's always wrong", "More sophisticated verbs like 'implies', 'conveys', 'evokes' demonstrate deeper analysis", "Examiners dislike it"], ans:2, exp:"'Show' is basic. <strong>'Implies', 'conveys', 'evokes', 'reinforces'</strong> demonstrate more sophisticated thinking."},
  {topic:"Terminology", q:"What is a quatrain?", opts:["2-line stanza", "6-line stanza", "4-line stanza", "14-line poem"], ans:2, exp:"Quatrain = <strong>four-line stanza</strong> — the most common stanza form in English poetry."},
  {topic:"Poetic Techniques", q:"What is the effect of a fragmented or broken syntax in poetry?", opts:["Mirrors psychological disturbance, trauma or interrupted thought", "Creates a flowing, musical quality", "Shows the poet is uneducated or careless", "Makes the poem more accessible to readers"], ans:0, exp:"<strong>Fragmented syntax mirrors disrupted thought</strong> — psychological disturbance, trauma, or overwhelming emotion."},
  {topic:"Practice Poems", q:"In 'The Schoolboy', the extended bird/cage metaphor represents:", opts:["The teacher", "Blake himself", "The summer season", "The child = bird, school = cage — shows how education imprisons natural childhood joy"], ans:3, exp:"<strong>Child = bird, school = cage</strong> — school imprisons and restricts natural freedom and joy."},
  {topic:"Poetic Techniques", q:"What is free verse?", opts:["A type of sonnet", "Poetry with strict rhyme", "Poetry with 14 lines", "Poetry with no regular rhyme scheme or metre — feels natural and speech-like"], ans:3, exp:"Free verse = <strong>no regular rhyme scheme or metre</strong> — natural, conversational feel."},
  {topic:"Essay Writing", q:"Why are very long quotations usually a sign of weaker analysis?", opts:["Long quotations suggest you cannot select the most relevant phrase — shorter is more precise", "Long quotations are grammatically harder to embed", "Long quotations are hard to fit into the word limit", "Long quotations take too long to copy accurately"], ans:0, exp:"<strong>Short, precise quotations show selection skill.</strong> Long quotations suggest inability to identify the most significant language."},
  {topic:"Sentence Stems", q:"Best stem to introduce technique analysis:", opts:["The repetition of 'must' implies the mother has no choice — motherhood is an inescapable duty.", "The poem uses language.", "I think there is a simile.", "It is effective."], ans:0, exp:"<strong>Name technique + embed quote + analytical verb + interpretation.</strong>"},
  {topic:"Essay Writing", q:"Useful conclusion starters include:", opts:["'I think...'", "'To conclude, I believe...'", "'Overall, [poet] presents...' / 'Through this poem...'", "'In this essay I have shown...'"], ans:2, exp:"<strong>'Overall, [poet] presents...'</strong> restates thesis with command words — strong conclusion opener."},
  {topic:"Poetic Techniques", q:"What is the effect of a regular rhyme scheme?", opts:["Shows the poet couldn't write well", "Only used in nursery rhymes", "Makes the poem seem unfinished", "Creates a sense of harmony, control or musical quality — or ironic contrast if content is dark"], ans:3, exp:"Regular rhyme = <strong>harmony, control, musicality</strong> — or ironic contrast when content is disturbing."},
  {topic:"Terminology", q:"An elegy is:", opts:["A dramatic monologue", "A type of ballad", "A poem focused on death or loss with a mourning tone", "A joyful poem"], ans:2, exp:"Elegy = <strong>a poem of mourning and lament</strong> — focuses on death or loss."},
  {topic:"Essay Writing", q:"'The writer uses this technique to convey...' — what analytical verb could replace 'convey'?", opts:["make, create, put, give", "think, feel, want, need", "imply, suggest, evoke, illuminate, underscore", "show, see, tell, say"], ans:2, exp:"<strong>Imply, suggest, evoke, illuminate, underscore</strong> — all more precise and analytical than 'convey' or 'show'."},
  {topic:"Poetic Techniques", q:"What is the effect of polysyndeton (excessive use of 'and')?", opts:["Creates a balanced, measured tone", "Slows the pace down by adding pauses between items", "Creates a breathless, overwhelming accumulation — items pile up without pause", "Creates a hesitant, uncertain quality"], ans:2, exp:"<strong>Polysyndeton = excessive 'and' — creates breathless accumulation</strong>, items piling relentlessly without pause."},
  {topic:"Terminology", q:"Tone vocabulary: 'melancholic' means:", opts:["Joyful and celebratory", "Angry and defiant", "Deep, reflective sadness — gentle, lasting sorrow", "Confused and uncertain"], ans:2, exp:"Melancholic = <strong>deep, reflective sadness</strong> — more nuanced than just 'sad'."},
  {topic:"Reading a Poem", q:"What should you do BEFORE reading the poem in an exam?", opts:["Draw a spider diagram", "Read the question and highlight command words", "Count the syllables", "Write your introduction"], ans:1, exp:"Always <strong>read the question first</strong> and highlight the command words."},
  {topic:"Sentence Stems", q:"'This might suggest X, yet it could equally imply Y' — what does this double interpretation show?", opts:["That the student is uncertain about the answer", "That the quotation has been chosen incorrectly", "That the student should choose one interpretation only", "That language is ambiguous and rich, supporting multiple valid readings simultaneously"], ans:3, exp:"<strong>Double interpretation shows sophisticated awareness</strong> that language is ambiguous and meaning is not fixed."},
  {topic:"Sentence Stems", q:"'A reader familiar with the poet's context might read this as...' — what does this stem do?", opts:["It moves away from the text to discuss biography", "It makes the analysis vague and uncertain", "It shows the reader is guessing about meaning", "It brings in contextual knowledge to enrich interpretation"], ans:3, exp:"<strong>Contextual reading</strong> — bringing in relevant knowledge to enrich rather than replace close textual analysis."},
  {topic:"Practice Poems", q:"In 'First Love', what does Clare mean by 'my heart has left its dwelling-place'?", opts:["He feels homesick for his childhood home", "His heart is broken and cannot be repaired", "He has physically moved away from where he grew up", "First love has permanently displaced his sense of self — he will never be the same"], ans:3, exp:"<strong>Permanent displacement of self</strong> — first love has fundamentally changed him. 'Dwelling-place' suggests home — love has rendered him homeless within himself."},
  {topic:"PETAL", q:"What does the 'P' in PETAL stand for?", opts:["Poem", "Point — your specific argument for this paragraph using command words", "Paragraph", "Phrase"], ans:1, exp:"P = <strong>Point</strong> — your specific argument for this paragraph, using the command words."},
  {topic:"Reading a Poem", q:"What is a thesis statement?", opts:["Your overall argument that you prove throughout the essay", "A conclusion", "A definition", "A quotation"], ans:0, exp:"Thesis = <strong>your overall argument</strong> — the main point you'll prove across the whole essay."},
  {topic:"Analysis Method", q:"'Things have changed here because earlier ___ but now ___' is used for:", opts:["Writing a conclusion", "Introducing a quote", "Defining a technique", "Links within the text — showing structural development"], ans:3, exp:"<strong>Links within the text</strong> — connects parts of the poem to show how meaning develops."},
  {topic:"Analysis Method", q:"'The poem enacts its theme through its form' — explain this with an example:", opts:["The sonnet form always represents love and constancy", "The poem uses rhyme to show the theme is important", "Form and content are always separate in poetry analysis", "A fragmentary poem about disintegration uses fragmented structure; a circular poem about memory is circular in form"], ans:3, exp:"<strong>Form enacts theme</strong> — e.g. disjointed syntax mirrors psychological fragmentation; a circular poem about memory returns to its beginning."},
  {topic:"Terminology", q:"What is a sestet?", opts:["4-line stanza", "6-line stanza", "2-line stanza", "14-line poem"], ans:1, exp:"Sestet = <strong>six-line stanza</strong> or the final six lines of an Italian sonnet."},
  {topic:"Essay Writing", q:"What does a conclusion need to do beyond restating the introduction?", opts:["Show how your paragraphs together prove your thesis — plus comment on wider significance", "Summarise each paragraph in one sentence", "Introduce any remaining points you haven't made", "Quote a final passage from the text"], ans:0, exp:"<strong>Conclusion = proof that paragraphs together establish thesis</strong> + comment on wider significance or writer's purpose."},
  {topic:"PETAL", q:"'Writing in layers' in PETAL means:", opts:["Writing the paragraph from different perspectives", "Building complexity by analysing multiple dimensions of the same quotation", "Using different types of evidence in the same paragraph", "Structuring the paragraph with multiple sub-points"], ans:1, exp:"<strong>Writing in layers = analysing the same quotation in multiple dimensions</strong> — denotation, connotation, technique, structure, context."},
  {topic:"Practice Poems", q:"What is the significance of Blake including both children's experience AND parents' perspective in 'The Schoolboy'?", opts:["Blake wanted to appeal to both adults and children as readers", "Blake himself was both a child and a parent", "It creates a balanced view showing both sides of education", "It shows education affects whole families — parents must consider whether schooling kills childhood joy"], ans:3, exp:"Blake's appeal to <strong>parents to consider childhood joy</strong> makes the argument broader — society, not just schools, must protect childhood."},
  {topic:"Poetic Techniques", q:"What is assonance?", opts:["Repetition of vowel sounds within nearby words", "Same consonant at start of words", "End rhyme", "A type of metaphor"], ans:0, exp:"Assonance = <strong>repetition of vowel sounds</strong> within nearby words — creates internal melody."},
  {topic:"Essay Writing", q:"Why is 'the poet tries to...' a weaker phrase than 'the poet...'?", opts:["'The poet' followed by a verb is always incorrect", "'Tries to' implies the poet might have failed; assume success and use confident language", "'Tries to' is too informal for academic writing", "'Tries to' is grammatically incorrect in analysis"], ans:1, exp:"<strong>'Tries to' implies possible failure.</strong> Say 'the poet creates', 'the poet evokes' — assume deliberate, successful craft."},
  {topic:"Practice Poems", q:"In 'First Love', 'my blood rushed to my face' is an example of:", opts:["Personification", "Physiological description of a physical reaction to love — vivid, sensory", "Metaphor", "Pathetic fallacy"], ans:1, exp:"<strong>Vivid physiological description</strong> — shows how love affects Clare physically, making the emotion feel real."},
  {topic:"Reading a Poem", q:"What is meant by 'the speaker' of a poem as distinct from the poet?", opts:["The poet themselves speaking directly to the reader", "The voice inside the poem — a created persona who may differ from the poet", "The person who reads the poem aloud in class", "The person the poem is addressed to"], ans:1, exp:"<strong>Speaker/persona = the voice inside the poem.</strong> May not be the poet — e.g. Browning's dramatic monologues."},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', the phrase 'must work' repeated throughout creates:", opts:["A rhythmic quality that makes the poem pleasant to read", "A sense of routine contentment in domestic life", "A sense of relentless, inescapable obligation — no choice, no freedom", "A celebratory tone suggesting pride in hard work"], ans:2, exp:"<strong>'Must' = inescapable obligation.</strong> Repetition creates grinding relentlessness — no agency, no choice, no rest."},
  {topic:"Terminology", q:"What is 'allegory' and how is it different from a metaphor?", opts:["Both are identical — allegory is just the term for extended metaphor", "Allegory uses simile throughout; metaphor uses direct comparison", "Allegory: entire narrative represents abstract ideas; metaphor: a single comparison", "Both use comparison but allegory is more extreme"], ans:2, exp:"<strong>Allegory = whole narrative represents abstract ideas</strong> (e.g. Orwell's Animal Farm = political allegory). Metaphor = single comparison."},
  {topic:"Terminology", q:"What is 'hubris' in classical literary tradition?", opts:["A character flaw that causes internal conflict", "The moment of recognition in a tragic narrative", "Excessive pride leading to a character's downfall", "A sudden reversal of fortune in a tragedy"], ans:2, exp:"<strong>Hubris = excessive pride/arrogance</strong> — in classical tragedy leads to nemesis (divine punishment) and downfall."},
  {topic:"Terminology", q:"What is a quatrain?", opts:["4-line stanza", "2-line stanza", "6-line stanza", "14-line poem"], ans:0, exp:"<strong>Quatrain</strong> = four-line stanza."},
  {topic:"Sentence Stems", q:"'The poet's purpose here could be to highlight…' falls under which analytical lens?", opts:["Links within the text", "Deeper meaning", "Language choices", "Writer's purpose / reader impact"], ans:3, exp:"<strong>Writer's purpose</strong> — what the poet was trying to achieve or communicate."},
  {topic:"PETAL", q:"What is the purpose of the Link (L) in PETAL?", opts:["Copy the introduction", "Introduce the next paragraph", "Show how this paragraph proves your overall argument — echo the thesis language", "End the essay"], ans:2, exp:"Link <strong>shows how this paragraph proves your overall argument</strong> — echoes thesis language."},
  {topic:"PETAL", q:"'The technique supports the point' — what does this mean in PETAL?", opts:["The named device creates an effect that directly proves the paragraph's argument", "The technique is used to make the poem rhyme", "The technique makes the quotation easier to remember", "The technique is the most important part of the paragraph"], ans:0, exp:"<strong>Technique supports point</strong> = the device creates an effect that directly proves what you argued in your topic sentence."},
  {topic:"Reading a Poem", q:"What does the term 'mood' mean in poetry?", opts:["The atmosphere or feeling created for the reader", "The number of stanzas", "The poet's biography", "The rhyme scheme"], ans:0, exp:"Mood = the <strong>atmosphere or feeling the poem creates in the reader</strong>."},
  {topic:"PETAL", q:"'The point must be specific, not general' — give an example of the difference:", opts:["Specific: the poem is sad. General: the poem explores loss deeply", "General: the poem is about nature. Specific: the poet presents nature as an indifferent force that outlasts human suffering", "General: the poem rhymes. Specific: the AABB rhyme scheme creates regularity", "Specific: there is a metaphor. General: there are techniques used"], ans:1, exp:"<strong>Specific point = precise claim tied to the question.</strong> General: 'the poem explores loss.' Specific: 'the poet presents loss as permanent and irrevocable.'"},
  {topic:"Practice Poems", q:"In 'Song of the Old Mother', the AABB rhyme scheme (rhyming couplets) creates:", opts:["A sense of disorder", "A regular, almost sing-song pattern that ironically contrasts with the exhausting content", "A dramatic monologue effect", "A volta"], ans:1, exp:"<strong>Rhyming couplets create a regular pattern</strong> — the contrast between orderly form and exhausting content is ironic."},
  {topic:"Terminology", q:"What is a volta?", opts:["A pause mid-line", "A type of simile", "The final couplet", "A turn or shift in the poem's tone, argument or perspective"], ans:3, exp:"Volta = <strong>a turn or shift in the poem</strong> — change in tone, argument or direction."},
  {topic:"Essay Writing", q:"What does 'signposting' mean in an essay?", opts:["Using connectives to guide the reader through your argument — 'Furthermore', 'However', 'In contrast'", "Telling the reader which page to turn to for more information", "Putting important points in bold text", "Starting each paragraph with the same phrase"], ans:0, exp:"<strong>Signposting = connectives that guide the reader</strong> through the argument: 'Furthermore', 'However', 'In contrast'."},
  {topic:"Essay Writing", q:"'The poet uses lots of techniques.' What is wrong with this as a topic sentence?", opts:["Mentions techniques", "Vague — no argument, no command words, no specific claim", "Too short", "Wrong tense"], ans:1, exp:"<strong>Vague</strong> — no argument, doesn't answer the question, doesn't use command words."},
  {topic:"Analysis Method", q:"What does 'contextualising' a poem mean in analysis?", opts:["Placing the poem in its historical, social or literary context to enrich understanding", "Comparing the poem to another poem by the same writer", "Looking up biographical information about the poet", "Explaining what genre the poem belongs to"], ans:0, exp:"<strong>Contextualising = placing in historical/social context</strong> to add depth — but close reading should always come first."}
  ],
  geography: [
  {topic:"Global Fashion", q:"How many litres of water does it take to produce one pair of jeans?", opts:["100,000 litres", "100 litres", "1,000 litres", "10,000 litres"], ans:3, exp:"Approximately <strong>10,000 litres of water</strong> to produce one pair of jeans."},
  {topic:"Africa", q:"What does 'aid dependency' mean and why is it criticised?", opts:["Depending on foreign expertise rather than training local professionals", "Relying on foreign aid rather than developing self-sufficient economies and systems", "When countries rely on foreign companies for economic investment", "When governments depend on international loans for their budgets"], ans:1, exp:"<strong>Aid dependency = reliance on aid rather than self-sufficient development.</strong> Critics say it can undermine local industry."},
  {topic:"Antarctica", q:"Why are scientific research stations in Antarctica valuable for climate science?", opts:["Ice cores contain trapped air bubbles showing past atmospheric conditions", "Antarctica has the richest mineral deposits on earth", "Scientists can study volcanic activity better from there", "Antarctica receives the most solar radiation of any continent"], ans:0, exp:"<strong>Ice cores contain trapped air bubbles</strong> giving a record of past atmospheric CO₂ and temperatures."},
  {topic:"Coasts", q:"What is saltation?", opts:["Medium-sized sediment bouncing and hopping along the seabed", "Fine particles in suspension", "Large boulders rolling", "Salt dissolving in water"], ans:0, exp:"Saltation = <strong>medium sediment bouncing and hopping</strong> along the seabed in a leaping motion."},
  {topic:"Global Fashion", q:"How many garments does the average person in a wealthy country buy per year?", opts:["Around 20-30 items of clothing per year", "Around 100+ items of clothing per year", "Around 5-10 items of clothing per year", "Around 60-70 items of clothing per year"], ans:3, exp:"People in wealthy countries buy approximately <strong>60-70 garments per year</strong> — many worn only a handful of times."},
  {topic:"Map Skills", q:"The scale 1:50,000 means that 2cm on the map equals what in reality?", opts:["1 kilometre in real life", "2 kilometres in real life", "5 kilometres in real life", "500 metres in real life"], ans:0, exp:"2cm × 50,000 = 100,000cm = <strong>1km.</strong>"},
  {topic:"Global Fashion", q:"How does clothing production in Bangladesh benefit the country's economy?", opts:["It provides government tax revenue and develops local industries", "It attracts foreign investment into infrastructure and technology", "It creates employment, generates foreign exchange and drives economic growth", "It provides raw materials for other manufacturing industries"], ans:2, exp:"Bangladesh's garment industry <strong>creates employment, generates foreign exchange earnings</strong> and drives economic development."},
  {topic:"Antarctica", q:"What is unique about how Emperor penguins raise their chicks?", opts:["The male incubates the egg for 65 days through Antarctic winter", "Both parents take equal turns incubating in a warm burrow", "Chicks are raised communally in a shared nursery group", "The female incubates while the male hunts for food continuously"], ans:0, exp:"<strong>The male incubates the single egg for 65 days</strong> through the Antarctic winter, fasting the whole time."},
  {topic:"Antarctica", q:"What is 'katabatic wind' in Antarctica?", opts:["A seasonal wind that brings warmer air from the north", "Cold dense air flowing rapidly downhill from the ice sheet interior", "A warm foehn wind that causes rapid ice melting", "A cyclonic storm that forms over open ocean water"], ans:1, exp:"<strong>Katabatic wind = cold dense air flowing down from the high interior</strong> — can reach 200+ km/h."},
  {topic:"Antarctica", q:"Why is Antarctica classified as a cold desert?", opts:["Because it is completely surrounded by the frozen Southern Ocean", "Because it receives very little precipitation despite having frozen water", "Because it has no vegetation and lots of bare rock", "Because its temperatures are too cold for any life"], ans:1, exp:"<strong>Cold desert = very low precipitation</strong> (under 200mm/year) despite being covered in ice."},
  {topic:"Africa", q:"What does 'urbanisation' mean and is it necessarily positive for Africa?", opts:["When governments invest in building new infrastructure in rural areas", "Growing proportion living in cities — creates opportunities but also informal settlements", "When cities expand outwards consuming surrounding farmland", "Rural-to-city migration — always positive as cities offer more jobs"], ans:1, exp:"<strong>Urbanisation = more people living in cities.</strong> Creates economic opportunities but also slums, inequality and pressure on services."},
  {topic:"Antarctica", q:"What is countercurrent heat exchange in penguins?", opts:["A breathing technique", "How they find food", "A way of swimming", "Warm blood flowing to flippers passes cold blood returning — prevents dangerous heat loss"], ans:3, exp:"<strong>Countercurrent heat exchange</strong>: warm blood warms cold returning blood — prevents dangerous cooling of the core."},
  {topic:"Antarctica", q:"Which explorer reached the South Pole first?", opts:["Edmund Hillary", "Robert Scott", "Roald Amundsen — on 14 December 1911", "Ernest Shackleton"], ans:2, exp:"<strong>Roald Amundsen</strong> reached the South Pole first, on 14 December 1911."},
  {topic:"Africa", q:"What is 'infant mortality rate' and what does a high rate indicate?", opts:["The number of children who don't attend school per thousand", "Deaths per 1,000 live births in the first year — high rate indicates poor healthcare", "The number of teenage pregnancies per thousand women", "The percentage of children suffering from malnutrition"], ans:1, exp:"<strong>Infant mortality = deaths per 1,000 live births in year 1.</strong> High rate = poor healthcare, poverty, malnutrition."},
  {topic:"Coasts", q:"What is 'beach nourishment' and what are its main disadvantages?", opts:["Adding sand to widen a beach — expensive, temporary and sourced from elsewhere", "Removing large rocks to create a smooth sandy beach", "Installing underground pipes to recirculate sand within a bay", "Planting vegetation to stabilise beach sediments permanently"], ans:0, exp:"<strong>Beach nourishment = adding sand/shingle.</strong> Disadvantages: expensive (£1-3m/km), needs repeating, sediment sourced disruptively."},
  {topic:"Map Skills", q:"A hill shown on a map with contours forming concentric circles has:", opts:["A rounded summit with slopes falling away in all directions", "A cliff on its north-facing side", "A river source at its summit", "A flat top with steep edges on all sides"], ans:0, exp:"<strong>Concentric circles = hill with slopes falling away in all directions</strong> — dome-shaped summit."},
  {topic:"Map Skills", q:"On an OS map, a green area with small tree symbols represents:", opts:["A woodland or forest area", "An area of urban parkland", "An area of agricultural farmland", "A national park with access land"], ans:0, exp:"<strong>Green with tree symbols = woodland/forest.</strong>"},
  {topic:"Africa", q:"What is 'Fairtrade' and how does it benefit farmers?", opts:["A certification showing food was produced without pesticides", "A free trade agreement between African and European governments", "A charity that buys crops from farmers at the highest possible price", "A system guaranteeing farmers a minimum price plus a premium for community projects"], ans:3, exp:"<strong>Fairtrade guarantees minimum price + Fairtrade Premium</strong> for community projects like schools and clinics."},
  {topic:"Map Skills", q:"A triangulation pillar (trig point) on an OS map shows:", opts:["The exact highest point measured by surveyors", "The location of a historic monument", "The location of a church or chapel", "The start point of a footpath"], ans:0, exp:"<strong>Trig points mark exact surveyed heights</strong> — used to create the map itself."},
  {topic:"Coasts", q:"Solution (corrosion) as an erosion process means:", opts:["Waves dissolving rock mechanically", "Wave pressure on joints", "Acidic seawater chemically dissolving certain rocks such as limestone and chalk", "Rocks wearing each other down"], ans:2, exp:"Solution = <strong>slightly acidic seawater chemically dissolving rocks</strong> like limestone and chalk."},
  {topic:"Global Fashion", q:"What role do Trade Unions play in improving garment worker conditions?", opts:["They set the prices that brands pay to factories", "They inspect factories on behalf of the government", "They represent workers, negotiate better wages and safer conditions", "They provide loans to factory owners for safety improvements"], ans:2, exp:"<strong>Trade unions represent workers</strong>, allowing collective bargaining for better wages, conditions and rights."},
  {topic:"Africa", q:"What does 'GDP per capita' measure and why is it limited as a development indicator?", opts:["Total economic output divided by population — hides inequality within countries", "Government spending on services divided by number of citizens", "It measures health outcomes but ignores economic factors", "The average income of the poorest 40% of the population"], ans:0, exp:"<strong>GDP per capita = total output ÷ population.</strong> Hides inequality — a few wealthy people raise the average."},
  {topic:"Africa", q:"Fair trade helps farmers by:", opts:["Removing all tariffs", "Banning exports", "Guaranteeing a minimum price and a Fairtrade Premium for community projects — protecting farmers when world prices fall", "Making goods cheaper for consumers"], ans:2, exp:"<strong>Fairtrade</strong> = guaranteed minimum price (protection from price falls) + Fairtrade Premium (extra money for community schools, healthcare, etc)."},
  {topic:"Map Skills", q:"A map distance of 6cm at scale 1:50,000 equals what real distance?", opts:["6km", "300m", "30km", "3km"], ans:3, exp:"6 × 50,000 = 300,000cm ÷ 100,000 = <strong>3km</strong>."},
  {topic:"Map Skills", q:"On an OS map, what does a blue line generally represent?", opts:["A national park boundary", "An area of woodland or forest", "A river, stream or canal", "A motorway or major A road"], ans:2, exp:"<strong>Blue = water features</strong> — rivers, streams, lakes, canals."},
  {topic:"Antarctica", q:"Who reached the South Pole first, and when?", opts:["Amundsen, Dec 1911", "Scott, Dec 1911", "Amundsen, Jan 1912", "Shackleton, Jan 1912"], ans:0, exp:"<strong>Roald Amundsen</strong> on <strong>14 December 1911</strong> — 34 days before Scott."},
  {topic:"Coasts", q:"What is 'managed retreat' and who typically opposes it?", opts:["Allowing the sea to flood low-value land, creating new habitat — opposed by farmers and landowners", "Moving cliff-top buildings away from the eroding edge", "Reducing wave energy by placing rocks offshore", "Removing all coastal defences and abandoning the coastline"], ans:0, exp:"<strong>Managed retreat = allowing flooding of low-value land</strong> to create saltmarsh habitat. Opposed by farmers and landowners who lose land."},
  {topic:"Map Skills", q:"'Along the corridor, then up the stairs' helps you remember:", opts:["How to use a compass", "Which way to walk", "Easting first (across), then Northing (up) when giving a grid reference", "The scale formula"], ans:2, exp:"<strong>Easting first, Northing second</strong> — along the corridor (across), then up the stairs."},
  {topic:"Global Fashion", q:"The main reason most clothes are made in Asian countries:", opts:["Significantly lower labour costs than in developed countries", "Better quality", "Closer to designers", "Better technology"], ans:0, exp:"<strong>Lower labour costs</strong> — garment workers in Bangladesh earn ~£70–100/month vs £11/hour in the UK."},
  {topic:"Global Fashion", q:"What is a 'sweatshop'?", opts:["A factory with very poor working conditions, low pay and long hours", "A small workshop producing high-quality handmade clothing", "A factory in a hot country with poor ventilation in the building", "A factory that produces sportswear and activewear brands"], ans:0, exp:"<strong>Sweatshop = factory with poor conditions, very low wages, excessive hours</strong> and often unsafe buildings."},
  {topic:"Coasts", q:"What is the 'sediment cell' concept and why is it important for management?", opts:["A unit for measuring the amount of sediment on a beach", "A self-contained unit of coastline within which sediment moves — management of one area affects others", "The layer of sediment below the water table in coastal areas", "A laboratory container used to study coastal sediments"], ans:1, exp:"<strong>Sediment cell = self-contained coastal unit.</strong> Defences in one area trap sediment and starve beaches further along."},
  {topic:"Map Skills", q:"What does a 6-figure grid reference narrow a location down to?", opts:["A 10m point", "An exact building", "A 1km² square", "A 100m point — more precise than 4-figure"], ans:3, exp:"6-figure = <strong>~100m point</strong> — each grid square divided into 10×10."},
  {topic:"Antarctica", q:"What is the lowest temperature ever recorded on Earth?", opts:["−100°C", "−60°C", "−40°C", "−89.2°C"], ans:3, exp:"<strong>−89.2°C</strong> at Vostok Station, Antarctica — the coldest natural temperature recorded on Earth."},
  {topic:"Africa", q:"What is the 'commodity trap'?", opts:["Dependence on exporting one or two low-value raw materials whose prices are unstable — leaving economies vulnerable", "A type of agricultural subsidy", "A poverty cycle", "A trade agreement"], ans:0, exp:"<strong>Commodity trap</strong> = dependence on exporting low-value raw materials with unstable world prices."},
  {topic:"Global Fashion", q:"What is the 'living wage' and why do garment workers rarely receive it?", opts:["A wage that includes food, housing and healthcare for the worker", "The legal minimum wage set by each government for all workers", "The wage recommended by the UN for workers in developing countries", "A wage sufficient to meet basic needs — rarely paid as brands push for lowest costs"], ans:3, exp:"<strong>Living wage = enough for basic needs.</strong> Brands' pressure for lowest prices means factories keep wages minimal."},
  {topic:"Antarctica", q:"What adaptation allows Weddell seals to survive Antarctic winters?", opts:["They migrate north to warmer waters in winter", "They maintain breathing holes in ice and can dive to 600m", "They survive entirely on stored body fat without any food", "They hibernate in snow burrows like polar bears"], ans:1, exp:"Weddell seals <strong>maintain breathing holes in ice and can dive to 600m</strong> to find fish."},
  {topic:"Coasts", q:"How does sea level rise threaten low-lying coastal areas?", opts:["It makes waves bigger and more powerful globally", "It deposits more sediment which destabilises beach structures", "It increases flooding frequency and accelerates coastal erosion rates", "It causes freshwater rivers to flood their banks more often"], ans:2, exp:"<strong>Sea level rise increases flooding frequency</strong>, accelerates erosion, salinates freshwater and threatens homes."},
  {topic:"Global Fashion", q:"What percentage of a garment's retail price typically goes to the worker who made it?", opts:["Around 5-10% of the final price", "Around 1-3% of the final price", "Around 30-40% of the final price", "Around 15-20% of the final price"], ans:1, exp:"Workers typically receive just <strong>1-3% of the retail price</strong> — the majority goes to brands, retailers and transport."},
  {topic:"Map Skills", q:"A 6-figure grid reference differs from a 4-figure because:", opts:["It covers a larger area", "It measures height", "It divides each grid square into tenths — giving a precise point rather than a whole square", "It uses letters"], ans:2, exp:"6-figure <strong>divides each square into tenths</strong> — giving a ~100 m point rather than a full grid square."},
  {topic:"Antarctica", q:"How did Shackleton's Endurance expedition demonstrate Antarctic survival?", opts:["He became the first to reach the South Pole in 1909", "His ship was crushed by ice but he rescued all 27 crew by boat", "He established the first permanent research station there", "He mapped the entire Antarctic coastline by ship"], ans:1, exp:"When <strong>Endurance was crushed by ice in 1915</strong>, Shackleton rescued all 27 men using lifeboats."},
  {topic:"Coasts", q:"What is 'coastal squeeze' and where does it occur?", opts:["When rock is squeezed by tectonic pressure creating fault lines", "When development squeezes between the coast and main roads", "When coastal habitats are squeezed between rising seas and fixed defences", "When beaches narrow due to reduced sediment supply"], ans:2, exp:"<strong>Coastal squeeze = habitats squeezed between rising sea and hard coastal defences</strong> with no room to migrate inland."},
  {topic:"Antarctica", q:"The ice-albedo effect means:", opts:["White ice reflects up to 90% of sunlight back into space, preventing warming", "Ice absorbs heat", "Albedo measures temperature", "Ice creates wind"], ans:0, exp:"<strong>Ice-albedo effect:</strong> white ice reflects up to 90% of solar energy — very little heat is absorbed."},
  {topic:"Africa", q:"Being landlocked affects development because:", opts:["There is no water", "There are fewer minerals", "Without a coast, countries have no ports — making trade more expensive and slowing economic growth", "The weather is worse"], ans:2, exp:"<strong>Landlocked countries</strong> have no ports — trade is more expensive (crossing neighbours) and harder to grow. 15 African countries are landlocked."},
  {topic:"Coasts", q:"Why do headlands erode faster than the surrounding coastline over time?", opts:["Headlands are higher so they intercept more rainfall and wind", "Headlands receive more concentrated wave energy than bays do", "Headlands have no beach protection from wave energy", "Headlands are made of softer rock than the adjacent areas"], ans:1, exp:"<strong>Headlands receive more concentrated wave energy</strong> as waves refract around them, accelerating erosion."},
  {topic:"Map Skills", q:"Map scale 1:50,000. You measure 3 cm. Real distance?", opts:["15 km", "3 km", "1.5 km", "150 m"], ans:2, exp:"3 × 50,000 = 150,000 cm ÷ 100,000 = <strong>1.5 km</strong>."},
  {topic:"Global Fashion", q:"What does 'fast fashion' specifically mean as a business model?", opts:["Frequent new collections at low prices, encouraging rapid consumption and disposal", "Fashion delivered to customers within 24 hours of ordering online", "Clothes made with fewer stitches so they can be assembled faster", "Fashion produced quickly using the fastest machinery available"], ans:0, exp:"<strong>Fast fashion = frequent new collections, low prices, rapid consumption and disposal</strong> — prioritises speed and volume over quality."},
  {topic:"Global Fashion", q:"What is the 'second-hand' or 'circular' fashion economy?", opts:["When factories reuse packaging to reduce environmental impact", "When brands recycle fabric to make new clothes from old ones", "When clothes are resold, repaired or upcycled rather than discarded", "When brands charge customers to return old clothes for recycling"], ans:2, exp:"<strong>Circular economy = keeping clothes in use longer</strong> through resale, repair and upcycling rather than disposal."},
  {topic:"Africa", q:"What is 'debt' as a development constraint in Africa?", opts:["When African countries spend too much on military equipment", "When poor harvests mean countries cannot afford to import food", "When countries borrowed money for development and now spend more repaying it than on services", "When foreign companies take profits out of African countries"], ans:2, exp:"<strong>Debt = countries spending more on repayments than on schools and hospitals</strong> — diverts resources from development."},
  {topic:"Global Fashion", q:"What is the environmental cost of producing a cotton T-shirt?", opts:["About 100 litres of water and minimal chemical use", "About 10,000 litres of water and major chemical use", "About 2,700 litres of water and significant chemical use", "About 500 litres of water and some pesticide use"], ans:2, exp:"One cotton T-shirt requires approximately <strong>2,700 litres of water</strong> plus pesticides and dyes."},
  {topic:"Global Fashion", q:"How does the fashion industry contribute to water pollution?", opts:["Factories use too much water for washing finished garments", "Dyes and chemicals from production enter rivers causing toxic contamination", "Cotton plants use too much groundwater for irrigation", "Steam from fabric pressing releases chemicals into the air"], ans:1, exp:"<strong>Textile dyes and chemicals enter rivers</strong> in countries with weak environmental regulations."},
  {topic:"Antarctica", q:"What is 'midnight sun' and where is it experienced in Antarctica?", opts:["A type of aurora australis seen only in summer", "A weather phenomenon causing orange skies in winter", "The reflection of sunlight off ice creating optical illusions", "24-hour daylight in summer near the South Pole"], ans:3, exp:"<strong>Midnight sun = 24-hour daylight</strong> experienced near the poles in summer due to Earth's axial tilt."},
  {topic:"Africa", q:"What percentage of Ghana's earnings comes from cocoa?", opts:["40%", "Ghana doesn't export cocoa", "20%", "A significant proportion — cocoa is Ghana's most important export crop"], ans:3, exp:"Cocoa is Ghana's <strong>most important export</strong> — but processing (where profit is) happens in richer countries."},
  {topic:"Africa", q:"Why do African countries export raw materials rather than finished goods?", opts:["African consumers prefer to buy imported finished goods", "African governments deliberately keep prices low to attract buyers", "Raw materials are easier to transport by ship than finished goods", "Colonial legacy and lack of manufacturing industry means value is added elsewhere"], ans:3, exp:"<strong>Colonial legacy + lack of manufacturing infrastructure</strong> means African countries export raw materials and import finished goods."},
  {topic:"Africa", q:"What is the Human Development Index (HDI) and what does it measure?", opts:["The percentage of the population living below the poverty line", "A composite measure of income, education and life expectancy", "A measure of a country's political freedom and democracy", "Economic output per person in dollars per year"], ans:1, exp:"<strong>HDI combines income + education (years of schooling) + life expectancy</strong> into one development measure."},
  {topic:"Coasts", q:"A spit forms where:", opts:["The beach is wide", "The coastline changes direction — longshore drift carries sediment to this point where deepening water causes deposition above sea level", "There are no waves", "The cliff is very hard"], ans:1, exp:"Spits form where the <strong>coastline changes direction</strong> (river mouths, bays) — water deepens, waves lose energy and deposit sediment that gradually builds up."},
  {topic:"Antarctica", q:"What advantage did Amundsen have over Scott?", opts:["Better weather", "Sled dogs — well-suited to cold, could pull loads and be used as food", "More team members", "Better maps"], ans:1, exp:"Amundsen used <strong>sled dogs</strong> — efficient in cold, could pull heavy loads and sacrifice as food."},
  {topic:"Antarctica", q:"Krill are important in Antarctica because:", opts:["They pollute the water", "They are very large animals", "They form the base of almost all Antarctic food chains — virtually everything depends on them", "They are a tourist attraction"], ans:2, exp:"<strong>Krill</strong> are the keystone species of Antarctica — the base of the food chain for penguins, seals, whales and fish."},
  {topic:"Coasts", q:"What is a 'geo' in coastal geography and how does it form?", opts:["A narrow inlet formed by the collapse of a cave or fissure roof", "A large bay formed by rapid erosion of soft rocks", "A small cove created by the collapse of an arch", "A deep hole in the seabed created by hydraulic action"], ans:0, exp:"<strong>Geo = narrow, steep-sided inlet</strong> formed when the roof of a coastal cave or fissure collapses."},
  {topic:"Antarctica", q:"Why do nations want to maintain territorial claims in Antarctica?", opts:["To prevent other nations from establishing military bases", "To retain future rights to resources such as oil and minerals", "To control tourism and research access for scientific purposes", "To protect unique ecosystems from environmental damage"], ans:1, exp:"Territorial claims may give future rights to <strong>oil, minerals and fish</strong> if the Madrid Protocol expires in 2048."},
  {topic:"Coasts", q:"A wave-cut platform forms because:", opts:["Arches collapse horizontally", "Deposition builds up the beach", "Sand builds up at low tide", "As a cliff retreats inland through erosion, the eroded base leaves a flat rocky surface at sea level"], ans:3, exp:"Wave-cut platform = <strong>flat rocky surface left as the cliff retreats</strong> — visible at low tide."},
  {topic:"Africa", q:"What is 'brain drain' and how does it affect African development?", opts:["When rivers dry up causing drought in agricultural regions", "When children miss school due to poverty and disease", "When educated professionals emigrate, depriving countries of skilled workers", "When foreign businesses take profits out of African economies"], ans:2, exp:"<strong>Brain drain = educated professionals emigrating</strong> to wealthier countries, reducing skilled workforce in Africa."},
  {topic:"Antarctica", q:"What is the significance of the Ross Ice Shelf?", opts:["It is the main shipping route connecting Atlantic and Pacific", "It is where most research stations are located", "It is the thickest part of the Antarctic ice sheet", "It is the world's largest ice shelf — the size of France"], ans:3, exp:"The Ross Ice Shelf is <strong>the world's largest ice shelf, approximately the size of France.</strong>"},
  {topic:"Antarctica", q:"How does Antarctica affect global sea levels if ice melts?", opts:["Ice is already floating so melting would not raise sea levels", "Antarctic ice melting would lower sea levels by redistributing weight", "Only Greenland ice affects global sea levels significantly", "West Antarctic ice sheet alone could raise sea levels by 3-5 metres"], ans:3, exp:"<strong>West Antarctic Ice Sheet could raise sea levels by 3-5m</strong> if it fully melted."},
  {topic:"Africa", q:"Why do agricultural subsidies in rich countries harm African farmers?", opts:["Only affect Asian farmers", "They're a myth", "They help all farmers", "Rich-country farmers can undercut African farmers on global markets — making African exports uncompetitive"], ans:3, exp:"<strong>Subsidies allow rich-country farmers to sell cheaper</strong> than African farmers can — making African produce uncompetitive."},
  {topic:"Map Skills", q:"If you are walking on a bearing of 090°, which direction are you heading?", opts:["South", "North", "West", "East"], ans:3, exp:"<strong>090° = due East.</strong> 000°/360° = North, 180° = South, 270° = West."},
  {topic:"Map Skills", q:"To calculate the real distance using a map, you:", opts:["Divide the map distance by the scale denominator always", "Subtract contour values from the map distance", "Multiply the map distance by the scale denominator then convert units", "Add the scale number to the map distance"], ans:2, exp:"<strong>Map distance × scale denominator = real distance.</strong> Then convert (e.g. cm to km)."},
  {topic:"Map Skills", q:"What does scale 1:50,000 mean?", opts:["1cm = 50,000km", "1cm on map = 50,000cm (0.5km) in reality", "The map is 50,000 times bigger", "50,000 metres per centimetre"], ans:1, exp:"1:50,000 = <strong>1cm on map = 50,000cm = 0.5km</strong> in reality."},
  {topic:"Coasts", q:"Which erosion process involves waves compressing air into cliff cracks?", opts:["Solution", "Attrition", "Hydraulic action", "Abrasion"], ans:2, exp:"<strong>Hydraulic action</strong> — waves trap and compress air in cracks. When the wave retreats, the pressure release shatters rock."},
  {topic:"Antarctica", q:"Which nation first claimed Antarctic territory and in what year?", opts:["United Kingdom, 1908", "Argentina, 1927", "Norway, 1930", "New Zealand, 1923"], ans:0, exp:"The <strong>United Kingdom made the first territorial claim in 1908.</strong>"},
  {topic:"Global Fashion", q:"What does TNC stand for?", opts:["Transnational Corporation — a company operating in multiple countries", "Trans-national Council", "Trade and National Corporation", "Technical and National Company"], ans:0, exp:"<strong>TNC = Transnational Corporation</strong>."},
  {topic:"Map Skills", q:"A straight line on a map measured 6cm at 1:50,000 scale. The real distance is:", opts:["1.5km", "12km", "6km", "3km"], ans:3, exp:"6 × 50,000 = 300,000cm = 3,000m = <strong>3km.</strong>"},
  {topic:"Global Fashion", q:"Microplastics from fashion enter the ocean via:", opts:["Synthetic fabrics releasing tiny fibres when washed — passing through water treatment", "Manufacturing waste only", "Cotton dissolving", "Clothes thrown in rivers"], ans:0, exp:"<strong>Synthetic fabrics shed ~700,000 microplastic fibres per wash</strong>, passing through water treatment into oceans."},
  {topic:"Africa", q:"Why is access to clean water particularly important for women and girls in Africa?", opts:["Girls often miss school collecting water, limiting their education and opportunities", "Clean water access is a human right that benefits women more than men", "Women are more likely to suffer from waterborne diseases", "Women use more water than men for cooking and cleaning"], ans:0, exp:"<strong>Girls collecting water miss school</strong> — reducing their education, opportunities and ability to improve their lives."},
  {topic:"Coasts", q:"Durdle Door is an example of a:", opts:["Stump", "Natural arch", "Cave", "Stack"], ans:1, exp:"Durdle Door, Dorset = <strong>natural arch</strong> — one of the UK's most famous coastal landforms."},
  {topic:"Map Skills", q:"What feature does a V-shape in contour lines pointing uphill indicate?", opts:["A cliff face with a sheer vertical drop", "A spur of land jutting out from a hillside", "A pass between two hilltops", "A valley — V shapes point upstream towards higher ground"], ans:3, exp:"<strong>V-shape pointing uphill/upstream = valley.</strong> V pointing downhill = spur."},
  {topic:"Coasts", q:"Why are coastal dunes important and what threatens them?", opts:["They provide fresh water reservoirs for nearby communities", "They provide building materials and prevent inland flooding", "They protect coasts from wave erosion and support unique biodiversity — threatened by trampling and development", "They store carbon and regulate coastal temperatures effectively"], ans:2, exp:"<strong>Dunes protect coasts and support rare species</strong> — threatened by human trampling, development and sea level rise."},
  {topic:"Africa", q:"Ghana's economy has historically depended on cocoa. What problem does this create?", opts:["Cocoa requires too much water, depleting Ghana's water resources", "Other countries produce better cocoa so Ghana cannot compete", "Dependence on one crop makes the economy vulnerable to price fluctuations", "Cocoa is harmful to the soil and causes long-term land degradation"], ans:2, exp:"<strong>Overdependence on one commodity = vulnerability to price falls.</strong> Ghana has diversified since discovering oil in 2007."},
  {topic:"Global Fashion", q:"Bangladesh's garment industry accounts for approximately what percentage of its exports?", opts:["60%", "80%", "20%", "40%"], ans:1, exp:"Garments account for approximately <strong>80% of Bangladesh's total export earnings</strong>."},
  {topic:"Global Fashion", q:"What is 'ethical fashion' and how does it differ from fast fashion?", opts:["Ethical fashion means clothes that last longer and are better quality", "Ethical fashion costs more but uses the same production methods", "Ethical fashion prioritises fair wages, safe conditions and environmental sustainability", "Ethical fashion is simply fashion that is made domestically"], ans:2, exp:"<strong>Ethical fashion = fair wages + safe conditions + environmental responsibility</strong> — prioritises people and planet over profit."},
  {topic:"Map Skills", q:"Grid reference 473265 — what is the Northing?", opts:["473", "47", "26", "265"], ans:3, exp:"First 3 digits = Easting (473). Last 3 digits = <strong>Northing (265)</strong>."},
  {topic:"Africa", q:"What percentage of people in sub-Saharan Africa lack access to electricity?", opts:["Around 70% of the population", "Around 30% of the population", "Around 10% of the population", "Around 50% of the population"], ans:3, exp:"Approximately <strong>50% of people in sub-Saharan Africa lack electricity access</strong>, limiting development."},
  {topic:"Africa", q:"Why is deforestation a serious development issue in parts of Africa?", opts:["Trees are needed to produce oxygen for urban populations", "Deforestation drives away wildlife needed for the tourism industry", "Forests provide timber but their loss causes soil erosion and climate change", "Trees provide shade that prevents drought in agricultural regions"], ans:2, exp:"<strong>Deforestation causes soil erosion, reduces rainfall, disrupts ecosystems</strong> and contributes to climate change."},
  {topic:"Africa", q:"How does HIV/AIDS specifically impact African economic development?", opts:["It kills working-age adults, reducing productivity and increasing healthcare costs", "It damages crops by affecting the farmers who tend them", "It reduces foreign investment because companies see Africa as unstable", "It reduces tourism by deterring visitors from coming to Africa"], ans:0, exp:"HIV/AIDS <strong>kills working-age adults</strong>, reducing the workforce, increasing healthcare costs and leaving children orphaned."},
  {topic:"Global Fashion", q:"The Rana Plaza disaster (2013) was:", opts:["A factory fire in China", "A workers' strike", "A flood that destroyed cotton fields", "An 8-storey factory complex in Bangladesh that collapsed, killing 1,134 workers — cracks had been reported but workers were ordered back in"], ans:3, exp:"<strong>Rana Plaza</strong>: factory collapse, Bangladesh, 24 April 2013 — <strong>1,134 killed</strong>. Cracks seen beforehand; workers ordered back in. Western brands' labels found in the rubble."},
  {topic:"Coasts", q:"Managed retreat is increasingly favoured because:", opts:["It is the most expensive option", "Hard engineering has no disadvantages", "It protects all land equally", "It is cheaper long-term than hard engineering, creates salt marsh habitat, and is more sustainable as sea levels rise"], ans:3, exp:"Managed retreat = <strong>cheaper long-term, creates habitat, sustainable as sea levels rise</strong>."},
  {topic:"Antarctica", q:"Antarctica is classified as a desert because:", opts:["It receives very little precipitation — less than 200mm per year", "It's far from the sea", "It has no plants", "It's very cold"], ans:0, exp:"Antarctica is a <strong>polar desert</strong> — it receives less than 200mm precipitation annually."},
  {topic:"Map Skills", q:"Best way to measure a curved route on a map:", opts:["Add all the straight bits", "Ruler only", "Use a piece of string along the route, then measure against the scale bar", "Estimate"], ans:2, exp:"<strong>String</strong> along the curved route — then straighten and measure against the scale bar."},
  {topic:"Antarctica", q:"Krill are important to the Antarctic ecosystem because:", opts:["They produce oxygen", "They are the largest animals", "They clean the water", "Almost all Antarctic food chains depend on them — they are the keystone species"], ans:3, exp:"Krill are the <strong>keystone species</strong> of Antarctica — the base of virtually all food chains."},
  {topic:"Global Fashion", q:"Microplastics from fashion enter the ocean because:", opts:["Cotton dissolves in water", "Synthetic fabrics release tiny plastic fibres when washed — passing through water treatment into waterways", "Clothes are thrown into rivers", "They fall off drying racks"], ans:1, exp:"<strong>Synthetic fabrics</strong> (polyester, nylon) release ~700,000 microplastic fibres per wash — passing through water treatment into oceans."},
  {topic:"Coasts", q:"What is 'cliff recession' and what factors determine its rate?", opts:["The collapse of cliff overhangs due to undercutting by waves", "The seasonal movement of cliff materials by freeze-thaw action", "The retreat of a cliff face inland over time — rate depends on rock type and wave energy", "The gradual greening of cliffs as plants colonise"], ans:2, exp:"<strong>Cliff recession = cliff retreating inland.</strong> Rate depends on rock hardness, wave energy, rain, joints and bedding."},
  {topic:"Antarctica", q:"The Antarctic Treaty (1959) bans:", opts:["Military activity, nuclear testing and mineral mining", "All fishing", "All tourism", "All scientific research"], ans:0, exp:"The <strong>Antarctic Treaty</strong> bans military activity, nuclear testing/waste disposal and freezes territorial claims. The Madrid Protocol (1991) added a 50-year mining ban."},
  {topic:"Antarctica", q:"The Antarctic Circumpolar Current is significant because:", opts:["It creates storms", "It brings warm water to Antarctica", "It circles Antarctica and isolates it from warmer ocean currents, keeping it cold", "It allows ships to navigate"], ans:2, exp:"The <strong>Antarctic Circumpolar Current isolates Antarctica</strong> from warmer waters — one reason it stays so cold."},
  {topic:"Coasts", q:"What is 'rip current' and why is it dangerous to swimmers?", opts:["A fast narrow current flowing seaward through a gap in a sandbar", "An undertow pulling swimmers under large breaking waves", "A powerful storm wave that breaks over swimmers unexpectedly", "A strong tidal current flowing along the beach at high tide"], ans:0, exp:"<strong>Rip current = fast narrow seaward flow</strong> through a gap in a sandbar — can drag swimmers away from shore rapidly."},
  {topic:"Coasts", q:"What is hydraulic action?", opts:["Waves compressing air into cliff cracks — when the wave retreats, the pressure release shatters rock", "Chemical weathering", "Rocks wearing each other down", "Sediment thrown at cliffs"], ans:0, exp:"Hydraulic action = <strong>waves compress air into cracks; retreating wave causes pressure release, shattering rock</strong>."},
  {topic:"Africa", q:"What is 'corruption' and how does it impact African development?", opts:["When foreign companies avoid paying taxes in African countries", "When governments spend aid money on military equipment", "Misuse of power for private gain — diverts public funds from schools and hospitals", "When politicians prioritise economic growth over environmental protection"], ans:2, exp:"<strong>Corruption diverts public funds</strong> into private hands — money meant for schools, hospitals and infrastructure disappears."},
  {topic:"Coasts", q:"What is the Jurassic Coast and why is it significant?", opts:["The location of Britain's most severe coastal erosion problems", "England's longest beach stretching from Cornwall to Kent", "A national park protecting wildlife habitats in Southwest England", "A UNESCO World Heritage Site in Dorset and Devon showing 185 million years of geology"], ans:3, exp:"The Jurassic Coast is a <strong>UNESCO World Heritage Site</strong> exposing 185 million years of Earth's geological history."},
  {topic:"Coasts", q:"Groynes can cause problems because:", opts:["They let waves through", "By trapping sediment, they starve beaches further along the coast — causing erosion there (terminal groyne syndrome)", "They are ugly", "They are too expensive to build"], ans:1, exp:"<strong>Terminal groyne syndrome</strong> — groynes trap sediment on one side, starving beaches further along of material, increasing erosion there."},
  {topic:"Global Fashion", q:"What is the significance of the Accord on Fire and Building Safety signed after Rana Plaza?", opts:["Factory owners agreed to reduce working hours for all workers", "200+ brands agreed to fund factory safety inspections in Bangladesh", "Governments agreed to ban unsafe factories from operating", "It set minimum wage levels for all garment workers worldwide"], ans:1, exp:"<strong>200+ brands signed the Accord</strong>, agreeing to fund independent safety inspections of Bangladeshi factories."},
  {topic:"Antarctica", q:"What percentage of Antarctica is covered by ice?", opts:["50%", "100%", "75%", "98%"], ans:3, exp:"<strong>98%</strong> — only about 2% of Antarctica is exposed rock."},
  {topic:"Map Skills", q:"A scale bar shows 0——2km over 4cm on the map. What is 6cm in real life?", opts:["3km", "12km", "2km", "6km"], ans:0, exp:"4cm = 2km, so 1cm = 0.5km. 6cm = 6 × 0.5 = <strong>3km</strong>."},
  {topic:"Africa", q:"Which is Africa's largest country by area?", opts:["Nigeria", "South Africa", "Ethiopia", "Algeria"], ans:3, exp:"<strong>Algeria</strong> is Africa's largest country by area."},
  {topic:"Africa", q:"What is 'conflict' as a barrier to development in parts of Africa?", opts:["Civil unrest caused by dissatisfaction with government corruption", "Armed conflict destroys infrastructure, displaces people and deters investment", "Political disagreements between African leaders about development policy", "Border disputes between nations over access to water and land"], ans:1, exp:"<strong>Armed conflict destroys roads, schools, hospitals</strong>, displaces millions and makes foreign investment impossible."},
  {topic:"Antarctica", q:"Emperor penguins survive extreme cold through:", opts:["Migration to warmer countries", "Hibernation", "Blubber, countercurrent heat exchange, dense overlapping feathers and huddling in groups of thousands", "Swimming in warm water"], ans:2, exp:"Emperor penguins use <strong>structural, physiological and behavioural adaptations</strong> — blubber, countercurrent blood flow, feather layers and huddling."},
  {topic:"Coasts", q:"Terminal groyne syndrome means:", opts:["Too many groynes installed", "Groynes trapping sediment on one side, starving beaches further along the coast — causing erosion there", "Groynes breaking down", "Groynes sinking into the seabed"], ans:1, exp:"<strong>Terminal groyne syndrome</strong>: groynes trap sediment, starving beaches further along, increasing erosion there."},
  {topic:"Antarctica", q:"What is the Antarctic Convergence (Polar Front)?", opts:["Where cold Antarctic waters meet warmer sub-Antarctic waters", "The point where sea ice melts in summer", "The line of longitude dividing research station territories", "The political boundary where territorial claims begin"], ans:0, exp:"<strong>Antarctic Convergence = where cold Antarctic water meets warmer sub-Antarctic water</strong> — a biological and oceanographic boundary."},
  {topic:"Map Skills", q:"What does the term 'relief' mean in geography?", opts:["The type of rock found in an area", "The shape of the land — its hills and valleys", "The human settlement pattern of an area", "The vegetation covering the ground"], ans:1, exp:"<strong>Relief = the shape of the land</strong> — hills, valleys, slopes, plateaus."},
  {topic:"Map Skills", q:"How do you measure a winding road on a map accurately?", opts:["Estimate visually", "Ruler in straight line", "Count grid squares", "String along the route then measured against scale bar"], ans:3, exp:"<strong>String along the route</strong> then straighten and measure against the scale bar."},
  {topic:"Global Fashion", q:"What is 'greenwashing' in the fashion industry?", opts:["When factories paint their buildings green to look eco-friendly", "When companies use only green dyes in their fabrics", "When brands make misleading environmental claims about products", "When retailers donate old clothes to environmental charities"], ans:2, exp:"<strong>Greenwashing = making misleading or exaggerated environmental claims</strong> to appear more sustainable."},
  {topic:"Africa", q:"Why does Ghana receive little value from its cocoa?", opts:["Processing into high-value chocolate happens in Europe/USA — Ghana exports low-value beans and receives only about 2p from each £1 chocolate bar", "Ghana grows poor quality cocoa", "Ghana doesn't export cocoa", "Chocolate isn't popular"], ans:0, exp:"<strong>Value chain inequality</strong> — Ghana grows the cocoa but processing (where profit is made) happens in richer countries. Ghana gets ~2p per £1 bar."},
  {topic:"Africa", q:"What is the 'demographic dividend' that could benefit African development?", opts:["When birth rates fall causing a population decline", "A young and growing population that could drive economic growth if educated", "The economic benefit of urbanisation on productivity and innovation", "When governments invest oil revenues into education and healthcare"], ans:1, exp:"<strong>Demographic dividend = large young population</strong> that could drive growth if given education and employment opportunities."},
  {topic:"Map Skills", q:"A 4-figure grid reference gives a location to the nearest:", opts:["100 metres in any direction", "1 kilometre square on the map", "10 metres in any direction", "10 kilometre square on the map"], ans:1, exp:"<strong>4-figure = 1km² square.</strong> 6-figure narrows it to ~100m."},
  {topic:"Coasts", q:"Attrition means:", opts:["Waves eroding the cliff base", "Chemical dissolution of rock", "Rocks and sediment colliding in water — becoming smaller and rounder over time", "Compressed air in cracks"], ans:2, exp:"Attrition = <strong>rocks colliding in the water</strong>, breaking into smaller, rounder, smoother pieces."},
  {topic:"Coasts", q:"What is 'coastal flooding' and what conditions make it most likely?", opts:["When sea walls are breached by unusually large individual waves", "When low pressure systems and storm surges combine with high tides", "When rivers overflow onto surrounding coastal floodplains", "When heavy rainfall saturates coastal cliffs causing landslides"], ans:1, exp:"<strong>Coastal flooding = low pressure + strong winds (storm surge) + high tide</strong> — e.g. 1953 East Coast floods."},
  {topic:"Antarctica", q:"What does the Antarctic Treaty say about military activity?", opts:["All military activity and weapons testing is completely prohibited", "Nuclear submarines may use Antarctic waters for transit", "Military personnel may support scientific research only", "Military research vessels are permitted with notification"], ans:0, exp:"The Antarctic Treaty (1959) <strong>prohibits all military activity and weapons testing.</strong>"},
  {topic:"Coasts", q:"Why does a spit develop a recurved (hooked) end?", opts:["Secondary winds from a different direction curl the tip around", "The river pushes it round", "The weight of sediment bends it", "It grows in a circular pattern"], ans:0, exp:"<strong>Secondary winds from a different direction</strong> curl the tip of the spit — creating the hooked shape."},
  {topic:"Coasts", q:"In transportation, traction refers to:", opts:["Large boulders being rolled along the seabed by wave energy", "Medium sediment bouncing along the seabed", "Fine particles floating in the water", "Dissolved minerals in the water"], ans:0, exp:"Traction = <strong>large boulders rolled along the seabed</strong> — too heavy to lift, so rolled."},
  {topic:"Map Skills", q:"What is a bearing used to measure?", opts:["The distance between two points on a map", "The direction from one point to another in degrees", "The type of land use shown on a map", "The height of land above sea level"], ans:1, exp:"<strong>A bearing measures direction in degrees</strong> (0°–360°) clockwise from north."},
  {topic:"Africa", q:"What is the colonial legacy?", opts:["European colonisation drew artificial borders, exploited resources, disrupted societies — leaving lasting instability", "Only affected North Africa", "A positive impact only", "Africa was never colonised"], ans:0, exp:"<strong>Colonial legacy</strong>: artificial borders, resource exploitation, disrupted societies — still affecting development."},
  {topic:"Coasts", q:"What is wave refraction and what does it explain about coastal erosion patterns?", opts:["Waves bending as they enter shallow water, concentrating energy on headlands", "The way waves grow bigger as they approach a coastline", "Waves changing direction due to wind changes in weather systems", "Waves bouncing straight back off cliffs at the same angle"], ans:0, exp:"<strong>Wave refraction = waves bending in shallow water</strong>, concentrating energy on headlands and allowing bays to form."},
  {topic:"Global Fashion", q:"Where are most TNC headquarters located?", opts:["In developed/rich countries — where design, marketing and profits are managed", "Wherever factories are", "In Asia", "In developing countries"], ans:0, exp:"TNC headquarters are in <strong>developed countries</strong> — where design, branding and profits are based."},
  {topic:"Coasts", q:"Beach nourishment is classified as soft engineering because:", opts:["It adds sediment to widen the beach — working with natural processes to absorb wave energy", "It uses no machinery", "It uses sand", "It is cheap"], ans:0, exp:"Beach nourishment = <strong>soft engineering</strong> — works with natural processes. Wider beach absorbs more wave energy."},
  {topic:"Global Fashion", q:"TNC stands for:", opts:["Trans-national Currency", "Technical and National Council", "Transnational Corporation — a company operating in multiple countries", "Trade and National Company"], ans:2, exp:"<strong>TNC = Transnational Corporation</strong> — HQ in one country, operations in many others."},
  {topic:"Coasts", q:"What is 'coastal management' and why are 'do nothing' decisions controversial?", opts:["Engineering and planning to manage erosion and flooding — 'do nothing' devastates communities losing homes", "Government control of all activities within 1km of the coastline", "Monitoring of coastal changes to predict future developments", "Environmental protection of coastal wildlife habitats"], ans:0, exp:"<strong>'Do nothing' = let nature take its course.</strong> Controversial when homes, farmland and communities are lost."},
  {topic:"Map Skills", q:"On a 1:25,000 OS map, what does the brown contour line interval represent?", opts:["50 metres between each line", "25 metres between each line", "5 metres between each line", "10 metres between each line"], ans:3, exp:"<strong>1:25,000 OS maps use 10m contour intervals.</strong>"},
  {topic:"Africa", q:"The Nile is significant because:", opts:["It's the world's longest river — flowing through 11 countries including Ethiopia, Sudan and Egypt", "It flows west to east", "It only flows in summer", "It's the shortest river"], ans:0, exp:"The Nile is the <strong>world's longest river</strong>, flowing through 11 countries northward to the Mediterranean."},
  {topic:"Coasts", q:"Abrasion is:", opts:["Rock and sediment in waves thrown against the cliff face — like sandpaper", "Waves compressing air in cracks", "Rocks colliding with each other", "Chemical weathering of rock"], ans:0, exp:"Abrasion = <strong>material thrown against the cliff by waves</strong> — like sandpaper. Most powerful erosion process."},
  {topic:"Africa", q:"How does climate change specifically threaten food security in Africa?", opts:["Higher temperatures make all African crops grow faster", "Rising sea levels will flood all African coastal farmland", "More frequent droughts and unpredictable rainfall reduce crop yields", "Increased rainfall causes flooding that destroys all crops"], ans:2, exp:"<strong>More frequent droughts and unpredictable rainfall</strong> threaten crops across sub-Saharan Africa."},
  {topic:"Antarctica", q:"What is albedo?", opts:["Temperature measurement", "Ice thickness", "Reflectivity — the proportion of solar energy reflected by a surface", "Wind speed"], ans:2, exp:"Albedo = <strong>reflectivity</strong>. Fresh snow reflects ~90% of solar energy — high albedo means little warming."},
  {topic:"Map Skills", q:"A map has scale 1:25,000. How many cm on the map equals 1km in reality?", opts:["1cm", "4cm", "25cm", "2cm"], ans:1, exp:"1km = 100,000cm. 100,000 ÷ 25,000 = <strong>4cm</strong>."},
  {topic:"Map Skills", q:"On an OS map, which number comes first in a grid reference?", opts:["The largest number", "Northing (up)", "The one on the y-axis", "Easting (across) — along the corridor first"], ans:3, exp:"<strong>Easting first</strong> — along the corridor (across), then up the stairs (Northing)."},
  {topic:"Map Skills", q:"What does a dashed line on an OS map typically represent?", opts:["A proposed road not yet built", "An underground tunnel or pipeline", "A path, track or boundary (not a road)", "A river that only flows in winter"], ans:2, exp:"<strong>Dashed lines = paths, tracks, rights of way or boundaries.</strong>"},
  {topic:"Coasts", q:"What is the difference between a concordant and discordant coastline?", opts:["Concordant coasts have hard rock; discordant coasts have soft rock", "Concordant coasts are straight; discordant coasts are curved", "Concordant coasts have bands of rock parallel to the sea; discordant coasts have bands perpendicular", "Concordant coasts are eroding; discordant coasts are depositing"], ans:2, exp:"<strong>Concordant = rock bands parallel to coast (smooth). Discordant = rock bands perpendicular (headlands and bays).</strong>"},
  {topic:"Map Skills", q:"What is the purpose of a key (legend) on a map?", opts:["To explain what the symbols and colours on the map mean", "To give the names of all the places shown", "To show the date the map was published", "To indicate the scale of the map"], ans:0, exp:"<strong>The key explains symbols and colours</strong> used on the map — essential for reading it."},
  {topic:"Antarctica", q:"How does global warming affect Antarctica's role in global ocean circulation?", opts:["Higher temperatures mean more evaporation from the ocean surface", "Melting ice adds fresh water which disrupts the density-driven circulation", "Warming causes more sea ice which blocks circulation patterns", "Warmer water increases circulation and distributes heat faster"], ans:1, exp:"Melting ice adds <strong>fresh water, reducing salinity and density</strong>, disrupting thermohaline circulation."},
  {topic:"Global Fashion", q:"Fast fashion is problematic because:", opts:["It employs too many people", "Clothes are too expensive", "Clothes are too well made", "Rapid new collections encourage frequent buying and disposal — increasing waste, emissions and resource use"], ans:3, exp:"Fast fashion = rapid new collections → <strong>frequent buying, disposal, waste, high emissions</strong>."},
  {topic:"Antarctica", q:"The ozone hole over Antarctica is caused primarily by:", opts:["Methane from melting permafrost and wetlands", "Volcanic eruptions releasing sulphur dioxide", "Carbon dioxide from fossil fuel combustion", "Chlorofluorocarbons (CFCs) reacting with cold atmospheric conditions"], ans:3, exp:"<strong>CFCs</strong> react with cold stratospheric conditions over Antarctica, destroying ozone molecules."},
  {topic:"Map Skills", q:"Spot heights on an OS map are shown by:", opts:["A red circle marking the summit", "Crossed blue lines near rivers", "A brown triangle with the height inside", "A small black dot with a number showing height in metres"], ans:3, exp:"<strong>Spot heights = black dot + number in metres</strong> above sea level."},
  {topic:"Coasts", q:"What physical evidence shows that sea levels were lower during ice ages?", opts:["Fossils of sea creatures found on high mountain peaks", "Submerged forests, river valleys and archaeological sites now below sea level", "Raised beaches above current sea level on many coastlines", "Ancient coral reefs found deep underwater off coastlines"], ans:1, exp:"<strong>Submerged forests, drowned river valleys (rias) and underwater archaeology</strong> show where coast was during lower sea levels."},
  {topic:"Coasts", q:"What is a 'bar' in coastal geography and how does it form?", opts:["A ridge of rock just below the sea surface offshore", "A platform of rock visible at low tide in front of cliffs", "A ridge of sand or shingle extending across a bay mouth", "A cliff-top feature where rock has fallen away"], ans:2, exp:"<strong>Bar = sediment extending right across a bay mouth</strong>, sealing a lagoon behind it. Forms when a spit grows across."},
  {topic:"Coasts", q:"Why is Holderness one of the fastest-eroding coastlines in Europe?", opts:["It has no coastal defences and receives Atlantic storms", "It has very steep cliffs that collapse under their own weight", "Industrial pollution has weakened the rock structure there", "Soft boulder clay cliffs combined with powerful North Sea waves"], ans:3, exp:"<strong>Soft boulder clay + powerful North Sea waves</strong> — Holderness erodes at an average 2m per year."},
  {topic:"Africa", q:"What is 'subsistence farming' and why do many African farmers practice it?", opts:["Growing high-value cash crops for sale to international companies", "Farming large areas of land with paid workers for export markets", "Growing just enough food for the family with little or no surplus to sell", "Growing crops using the latest technology for maximum yield"], ans:2, exp:"<strong>Subsistence farming = growing just enough food for the family.</strong> Practiced because land, tools and money are limited."},
  {topic:"Antarctica", q:"What is 'ice calving' and why is it concerning?", opts:["When sea ice thickness is measured by drilling through it", "When ice cores are extracted for scientific analysis", "When sea ice refreezes in winter after summer melting", "When large chunks of glaciers or ice shelves break off into the sea"], ans:3, exp:"<strong>Ice calving = large chunks breaking off into the sea</strong> — accelerating if climate warming increases."},
  {topic:"Antarctica", q:"IAATO limits tourists ashore to a maximum of:", opts:["1000 per ship", "50 at a time", "500 at a time", "100 at a time"], ans:3, exp:"IAATO rules: <strong>maximum 100 tourists ashore at one time</strong>."},
  {topic:"Antarctica", q:"What percentage of the world's fresh water is locked in Antarctic ice?", opts:["About 90% of the world's freshwater reserves", "About 50% of the world's freshwater reserves", "About 70% of the world's freshwater reserves", "About 10% of the world's freshwater reserves"], ans:2, exp:"Approximately <strong>70% of the world's fresh water</strong> is stored in Antarctic ice."},
  {topic:"Coasts", q:"The correct order of CASS formation is:", opts:["Cave → Cliff → Arch → Stack", "Stump → Stack → Arch", "Cliff → Cave → Arch → Stack → Stump", "Stack → Arch → Cave → Cliff"], ans:2, exp:"<strong>Cliff → Cave → Arch → Stack → Stump</strong>. Waves attack headland weaknesses → cave → arch (both sides meet) → stack (roof collapses) → stump."},
  {topic:"Global Fashion", q:"After Rana Plaza, 200+ brands signed the:", opts:["Fairtrade Agreement", "Antarctic Treaty", "IAATO Charter", "Accord on Fire and Building Safety — agreeing to fund safety inspections"], ans:3, exp:"The <strong>Accord on Fire and Building Safety</strong> was signed by 200+ brands after Rana Plaza."},
  {topic:"Map Skills", q:"Easting coordinates on a grid reference are read:", opts:["Up the map first, then across", "From the centre of the map outwards", "Diagonally from bottom-left to top-right", "Across the map first (left to right), then up"], ans:3, exp:"<strong>Along the corridor first (eastings), then up the stairs (northings).</strong>"},
  {topic:"Africa", q:"What is microfinance?", opts:["Money sent by migrants", "Large bank loans to governments", "Very small loans to individuals (often women) to start businesses — reaches people excluded from traditional banking", "World Bank funding"], ans:2, exp:"Microfinance = <strong>small loans to individuals</strong> to start/grow businesses, especially reaching women."},
  {topic:"Africa", q:"How has mobile technology transformed financial services in East Africa?", opts:["It allows governments to track tax payments more effectively", "It allows tourists to pay for accommodation easily", "It connects African businesses directly to international markets", "Mobile banking (e.g. M-Pesa) reaches people without bank accounts"], ans:3, exp:"<strong>Mobile banking like M-Pesa</strong> allows millions without bank accounts to save, transfer and receive money via phone."},
  {topic:"Antarctica", q:"Which animals are at the TOP of the Antarctic food chain?", opts:["Emperor penguins and Weddell seals", "Petrels and Antarctic skuas", "Leopard seals and orca whales", "Blue whales and albatross"], ans:2, exp:"<strong>Leopard seals and orca (killer whales)</strong> are the apex predators of the Antarctic ecosystem."},
  {topic:"Africa", q:"Nigeria is located in which part of Africa?", opts:["East Africa", "Southern Africa", "West Africa", "North Africa"], ans:2, exp:"<strong>Nigeria is in West Africa</strong> — Africa's most populous country with over 220 million people."},
  {topic:"Map Skills", q:"What do closely spaced contour lines tell you about the landscape?", opts:["The land is flat with gentle slopes", "The area has a river running through it", "The land is below sea level in places", "The land has a steep gradient in that area"], ans:3, exp:"<strong>Closely spaced contours = steep slope.</strong> Widely spaced = gentle slope."},
  {topic:"Antarctica", q:"Why is Antarctica important for regulating global temperature?", opts:["Its high albedo reflects solar radiation back into space", "It absorbs more carbon dioxide than any other region", "Its ice sheet insulates the earth from the sun's heat", "It generates cold winds that cool the Northern Hemisphere"], ans:0, exp:"Antarctica's <strong>high albedo (ice reflects ~90% of solar energy)</strong> helps cool the planet."},
  {topic:"Coasts", q:"What is 'saltmarsh' and what ecosystem services does it provide?", opts:["Underwater grass beds that stabilise sandy seafloor sediments", "A marine habitat in deep water supporting diverse fish species", "Coastal wetland that absorbs wave energy, stores carbon and provides habitats", "Rocky intertidal habitat colonised by limpets and barnacles"], ans:2, exp:"<strong>Saltmarsh absorbs wave energy, stores carbon (blue carbon) and provides rich habitat</strong> for birds and invertebrates."},
  {topic:"Coasts", q:"The difference between hard and soft coastal engineering:", opts:["Hard = artificial structures resisting erosion (sea walls, groynes). Soft = works with natural processes (beach nourishment, managed retreat)", "Hard is for beaches, soft for cliffs", "Soft uses concrete", "Hard is cheaper"], ans:0, exp:"<strong>Hard</strong> = artificial structures to resist erosion. <strong>Soft</strong> = works with natural processes. Hard is more expensive but more durable; soft is cheaper and more sustainable."},
  {topic:"Global Fashion", q:"What is the 'race to the bottom' in fashion production?", opts:["When brands compete to sell clothes at the lowest prices", "When retailers hold sales to clear out-of-season stock", "When factories produce poorer quality goods to save money", "When countries compete to attract factories by lowering wages and standards"], ans:3, exp:"<strong>Race to the bottom = countries competing for investment by cutting wages, taxes and environmental standards.</strong>"},
  {topic:"Coasts", q:"What does 'fetch' mean and how does it affect wave energy?", opts:["The angle at which waves approach a coastline", "The distance over which wind blows across open water — longer fetch = larger more powerful waves", "The time interval between successive wave crests arriving", "The speed at which waves travel across the ocean"], ans:1, exp:"<strong>Fetch = distance of open water wind blows over.</strong> Longer fetch = more energy transferred = bigger waves."},
  {topic:"Coasts", q:"What is the difference between constructive and destructive waves?", opts:["Constructive waves have strong swash and deposit; destructive waves have strong backwash and erode", "Constructive waves are large; destructive waves are small and gentle", "Constructive waves erode; destructive waves deposit material", "Constructive waves form during storms; destructive waves in calm weather"], ans:0, exp:"<strong>Constructive: strong swash, weak backwash = deposit.</strong> Destructive: weak swash, strong backwash = erode."},
  {topic:"Antarctica", q:"What environmental rule do IAATO tourists follow regarding wildlife?", opts:["They may feed penguins but must not touch them", "They are allowed to photograph nesting birds up close", "They may collect small rock samples as souvenirs", "They must stay at least 5 metres from wildlife and never interfere"], ans:3, exp:"IAATO rules: <strong>stay at least 5m from wildlife, never feed, touch or disturb animals.</strong>"},
  {topic:"Map Skills", q:"A map with scale 1:25,000 is considered:", opts:["Ordnance scale — used only for official surveys", "Large scale — covers a small area with lots of detail", "Medium scale — a balance of detail and coverage", "Small scale — covers a wide area with little detail"], ans:1, exp:"<strong>1:25,000 = large scale</strong> — small denominator means more detail, smaller area shown."},
  {topic:"Africa", q:"What is the role of the African Union (AU) in development?", opts:["An organisation that distributes aid from wealthy countries to Africa", "A body that enforces trade rules between African and European nations", "It controls all foreign investment coming into African countries", "A political and economic union promoting cooperation, peace and development"], ans:3, exp:"The <strong>African Union promotes political cooperation, peace, security and economic integration</strong> across 55 member states."},
  {topic:"Global Fashion", q:"The Rana Plaza collapse killed approximately:", opts:["567 people", "2,500 people", "134 people", "1,134 workers"], ans:3, exp:"<strong>1,134 workers</strong> were killed in the Rana Plaza collapse on 24 April 2013."},
  {topic:"Global Fashion", q:"What does 'supply chain transparency' mean in fashion?", opts:["Brands publishing their profits and executive salaries", "Factories sharing their production data with competitors", "Governments regulating how brands market their products", "Brands publicly disclosing where and how their clothes are made"], ans:3, exp:"<strong>Supply chain transparency = publicly disclosing</strong> where garments are made, by whom, and under what conditions."},
  {topic:"Coasts", q:"Abrasion differs from attrition because:", opts:["They are the same", "Abrasion is chemical", "Abrasion = rocks thrown against the cliff (like sandpaper). Attrition = rocks hitting each other in the water, getting smaller and rounder", "Attrition involves air"], ans:2, exp:"<strong>Abrasion</strong> = material thrown at cliff face. <strong>Attrition</strong> = material hitting each other, becoming smaller and rounder."},
  {topic:"Africa", q:"What is 'remittances' and why are they important for development?", opts:["Money sent home by migrants working abroad — often exceeds foreign aid", "Grants given by charities to fund schools and hospitals", "Money paid by foreign companies for access to natural resources", "Money borrowed by African governments from international banks"], ans:0, exp:"<strong>Remittances = money sent home by migrants.</strong> Often exceeds foreign aid and is directly spent on family needs."},
  {topic:"Africa", q:"What percentage of Africa's trade goes to other African countries?", opts:["Around 15% of all African trade is intra-continental", "Around 5% of all African trade is intra-continental", "Around 50% of all African trade is intra-continental", "Around 30% of all African trade is intra-continental"], ans:0, exp:"Only about <strong>15-17% of Africa's trade is intra-continental</strong> — far less than other regions, limiting economic integration."},
  {topic:"Coasts", q:"What is longshore drift and what landforms does it create?", opts:["The movement of water up and back the beach, creating beaches", "The straight movement of waves onto beaches creating dunes", "The zigzag movement of sediment along a coast, creating spits and bars", "The circular movement of water offshore creating headlands"], ans:2, exp:"<strong>Longshore drift = zigzag sediment movement</strong> along the coast, creating spits, bars, tombolos and barrier beaches."},
  {topic:"Africa", q:"The Fairtrade Premium is:", opts:["A type of tax", "A higher shop price", "Extra money paid to farmer communities beyond the minimum price — for schools, clinics, infrastructure", "A government subsidy"], ans:2, exp:"Fairtrade Premium = <strong>extra money for community projects</strong> — schools, healthcare, infrastructure."},
  {topic:"Global Fashion", q:"How does fast fashion contribute to textile waste?", opts:["Customers return clothes because quality is poor", "Factories waste fabric offcuts during the manufacturing process", "Cheap clothes are quickly discarded when trends change, filling landfill", "Brands donate unsold clothes to charities in developing countries"], ans:2, exp:"<strong>Fast fashion encourages frequent buying and quick disposal</strong> — clothes end up in landfill as trends change."},
  {topic:"Global Fashion", q:"What is 'outsourcing' in the context of the global fashion industry?", opts:["When companies move production to cheaper countries to cut costs", "When brands design clothes in developing countries", "When factories produce clothes for multiple brands at once", "When retailers sell clothes directly to customers online"], ans:0, exp:"<strong>Outsourcing = moving production to cheaper countries</strong> to reduce costs, often to South/Southeast Asia."},
  {topic:"Antarctica", q:"The Antarctic Treaty was signed by how many countries originally?", opts:["5", "54", "12", "7"], ans:2, exp:"The Antarctic Treaty was <strong>originally signed by 12 countries</strong> in 1959; now 54 signatories."},
  {topic:"Coasts", q:"What is a tombolo and where does one exist in the UK?", opts:["A large cave carved into a headland by waves", "An arch formed where two caves meet through a headland", "A bar of sand connecting an island to the mainland — Chesil Beach (Portland)", "A stack that has collapsed to form a stump"], ans:2, exp:"<strong>Tombolo = bar connecting island to mainland.</strong> Chesil Beach connecting Portland Bill to Dorset is a famous example."},
  {topic:"Global Fashion", q:"Why are consumers in wealthy countries partly responsible for poor conditions in factories?", opts:["They create trends that require faster production cycles", "Demand for cheap fashion drives brands to cut costs at workers' expense", "They buy luxury goods which exploit workers more than cheap goods", "They refuse to buy ethically produced clothing at higher prices"], ans:1, exp:"<strong>Demand for cheap clothes drives brands to cut costs</strong> — ultimately at the expense of workers' wages and safety."},
  {topic:"Map Skills", q:"Grid north on an OS map differs from true north because:", opts:["Grid lines are based on a flat projection of a curved earth", "True north is measured from the South Pole", "The earth rotates causing a constant shift", "Magnetic fields move the grid over time"], ans:0, exp:"<strong>Grid lines are based on a flat map projection</strong> of a curved Earth, causing slight divergence from true north."},
  {topic:"Global Fashion", q:"Why do garment workers in developing countries often accept low wages?", opts:["They are forced by their governments to work in factories", "Factory wages are actually higher than average in those countries", "Few alternative employment opportunities exist, and any income is vital", "They prefer factory work to other available jobs in the area"], ans:2, exp:"<strong>Few alternatives exist</strong> — factory work, while poorly paid, may be preferable to subsistence farming."},
  {topic:"Global Fashion", q:"What is the 'gender dimension' of the fashion industry's exploitation?", opts:["Most factory owners are men but workers are women", "Approximately 80% of garment workers are women — low wages affect women disproportionately", "Women design most fashion but men control the industry's profits", "Female consumers drive demand, making women responsible for the problem"], ans:1, exp:"<strong>~80% of garment workers are women</strong>, making low wages and poor conditions a gendered justice issue."},
  {topic:"Antarctica", q:"What is the Madrid Protocol (1991)?", opts:["A 50-year ban on mining and mineral extraction in Antarctica", "A fishing regulation", "A tourism agreement", "A scientific research treaty"], ans:0, exp:"The <strong>Madrid Protocol (1991) bans mining for 50 years</strong> (until at least 2048) and requires environmental impact assessments."},
  {topic:"Coasts", q:"What is the difference between erosion and weathering at the coast?", opts:["Erosion builds up the coast; weathering breaks it down", "Weathering is caused by waves; erosion by rain and wind", "Erosion is removal of material by sea action; weathering is breakdown in place", "There is no difference — both remove rock from the coastline"], ans:2, exp:"<strong>Erosion = material removed by sea. Weathering = rock broken down in place</strong> (freeze-thaw, salt crystallisation etc.)."},
  {topic:"Antarctica", q:"Emperor penguins are unique because they breed:", opts:["In pairs only", "In spring when food is abundant", "Near the coastline only", "In winter — the male incubates the egg through the darkest, coldest months"], ans:3, exp:"Emperor penguins breed in <strong>winter</strong> — the male incubates the egg for 65 days through extreme cold."}
  ],
  spanish: [
  {topic:"School", q:"'A las tres menos cuarto' means:", opts:["at a quarter to three", "at three fifteen exactly", "at quarter past three", "at a quarter to four"], ans:0, exp:"<strong>A las tres menos cuarto = at a quarter to three</strong> (3:00 minus a quarter = 2:45)."},
  {topic:"School", q:"'Por desgracia, no hay una piscina en mi insti' means:", opts:["There is a big pool", "Unfortunately there is no swimming pool in my school", "The pool is in my school", "Fortunately there is a pool"], ans:1, exp:"<strong>Por desgracia = unfortunately · no hay = there is no · piscina = swimming pool · insti = school.</strong>"},
  {topic:"School", q:"'Mi instituto tiene laboratorios muy bien equipados' — what does the school have?", opts:["very modern computer rooms and ICT suites", "very large and modern sports facilities", "very well-equipped science laboratories", "a very good library with many books"], ans:2, exp:"<strong>Laboratorios = laboratories · bien equipados = well-equipped.</strong> Mi instituto = my secondary school."},
  {topic:"Grammar", q:"Which sentence correctly uses a reflexive verb?", opts:["Llamo me Ana y tengo quince años", "Me llamo Ana y tengo quince años", "Me llamo Ana y me tiene quince años", "Llamo Ana y tengo quince años"], ans:1, exp:"<strong>Me llamo = I call myself (reflexive).</strong> Reflexive pronoun (me) goes before the verb."},
  {topic:"Grammar", q:"'Voy a estudio teatro' — what is wrong?", opts:["Nothing is wrong", "Voy is wrong", "Teatro should be teatros", "The infinitive must be used after 'a' — not the conjugated form: 'voy a estudiar'"], ans:3, exp:"After 'voy a', always use the <strong>infinitive</strong>: voy a estudi-AR (not estudio)."},
  {topic:"Grammar", q:"'Me apetece salir esta tarde' — what does 'apetecer' express here?", opts:["I have to go out this afternoon", "I am not allowed to go out this afternoon", "I went out this afternoon earlier", "I feel like/fancy going out this afternoon"], ans:3, exp:"<strong>Me apetece = I feel like/fancy (it appeals to me).</strong> Works like gustar."},
  {topic:"House and Home", q:"¿Dónde vives? 'Vivo en las afueras de una ciudad grande' means:", opts:["I live in a village far from any city", "I used to live near a big city", "I live on the outskirts of a large city", "I live in the city centre near the shops"], ans:2, exp:"<strong>Las afueras = the outskirts · una ciudad grande = a large city.</strong>"},
  {topic:"House and Home", q:"'En mi ciudad se puede ir al cine o al polideportivo' — what can you do?", opts:["You can go to the cinema or the sports centre", "You must go to school every day", "You should visit the market on Saturdays", "You are not allowed near the town hall"], ans:0, exp:"<strong>Se puede + infinitive = you can · el cine = cinema · el polideportivo = sports centre.</strong>"},
  {topic:"Grammar", q:"Which sentence uses the near future correctly?", opts:["Voy a comer pizza esta noche", "Voy a como una pizza esta noche", "Voy a comer una pizza esta noche", "Voy comer una pizza esta noche"], ans:2, exp:"<strong>Voy a + INFINITIVE (comer).</strong> Must use infinitive, not conjugated form."},
  {topic:"School", q:"'Llevo unos calcetines grises' — why 'grises' not 'gris'?", opts:["Calcetines is plural — adjectives must be plural too (gris → grises)", "Gris changes for gender", "Unos requires -es ending", "It's wrong"], ans:0, exp:"Calcetines is <strong>plural</strong> → adjective must be plural: gris → <strong>grises</strong>."},
  {topic:"House and Home", q:"'Nuestro barrio es seguro y tranquilo' — describe the neighbourhood.", opts:["busy and exciting with lots of entertainment", "safe and quiet with a good atmosphere", "old and run-down needing lots of improvement", "modern and expensive with new buildings"], ans:1, exp:"<strong>Seguro = safe · tranquilo = quiet/peaceful.</strong> Nuestro = our."},
  {topic:"School", q:"Which answer correctly says 'I have six lessons on Tuesdays'?", opts:["Tengo seis clases cada martes siempre", "Los martes hay seis clases para mí", "Los martes tengo seis clases", "El martes tengo seis clases siempre"], ans:2, exp:"<strong>Los martes (plural = every Tuesday) + tengo + seis clases.</strong>"},
  {topic:"School", q:"'Los deberes son un problema porque tengo demasiados' — what is the complaint?", opts:["Homework is too difficult to understand alone", "The teacher sets homework every single day", "Homework takes too long and is very boring", "There is too much homework to complete"], ans:3, exp:"<strong>Demasiados = too many · los deberes = homework.</strong> The problem is the quantity."},
  {topic:"Grammar", q:"'Mis padres son médicos' — what does this tell us about the parents?", opts:["they both want to become doctors", "they both work in the same hospital", "one parent is a doctor and one is a nurse", "they are both doctors (profession)"], ans:3, exp:"<strong>Son médicos = they are doctors.</strong> In Spanish, no article before professions: soy médico (not soy un médico)."},
  {topic:"House and Home", q:"How do you say 'my house has a garden and a garage' in Spanish?", opts:["Mi casa hay un jardín y garaje grande", "Mi casa tiene jardín y garaje muy bueno", "Mi casa tiene un jardín y un garaje", "Tengo jardín y garaje en mi casa bonita"], ans:2, exp:"<strong>Mi casa tiene (my house has) + un jardín y un garaje.</strong> Tener for possession."},
  {topic:"School", q:"Why 'Es la una' not 'Son las una'?", opts:["Tradition only", "Una is feminine", "La una is singular — es is used for singular (one o'clock only)", "It's irregular"], ans:2, exp:"<strong>La una is singular</strong> (one hour) → 'es'. All other times are plural → 'son'."},
  {topic:"School", q:"'No me gustan las ciencias porque son aburridas' — why 'aburridas' not 'aburrido'?", opts:["All adjectives end in -as", "It's wrong", "After 'son' you always use -as", "Ciencias is feminine plural — adjective must agree (aburrido → aburridas)"], ans:3, exp:"Las ciencias is <strong>feminine plural → aburridas</strong> (feminine plural adjective)."},
  {topic:"Grammar", q:"'Tengo que estudiar más para los exámenes' — what does 'tener que' express?", opts:["being allowed to do something", "having to/must do something (obligation)", "being able to do something possible", "wanting to do something optional"], ans:1, exp:"<strong>Tener que + infinitive = to have to/must.</strong> Expresses obligation."},
  {topic:"School", q:"'Me encanta la educación física' — how does 'encanta' differ from 'gusta'?", opts:["Encanta is stronger — 'I love' rather than 'I like'", "No difference", "Encanta is negative", "Encanta is for plural nouns only"], ans:0, exp:"<strong>Me encanta = I love</strong> (stronger than me gusta = I like)."},
  {topic:"School", q:"'Las clases empiezan a las ocho y media' — when do lessons start?", opts:["at a quarter past eight in the morning", "at eight o'clock in the morning exactly", "at half past eight in the morning", "at a quarter to nine in the morning"], ans:2, exp:"<strong>Empiezan = they start · a las ocho y media = at half past eight.</strong>"},
  {topic:"Grammar", q:"Complete: 'Ustedes ___ (trabajar) mucho'", opts:["trabajáis", "trabajamos", "trabajas", "trabajan"], ans:3, exp:"<strong>Ustedes + AR = -an: trabajan.</strong> (Ustedes takes 3rd person plural.)"},
  {topic:"Grammar", q:"Complete: 'Vosotros ___ (leer) el libro en clase'", opts:["leéis", "leen", "lees", "leemos"], ans:0, exp:"<strong>Vosotros + ER = -éis: leéis.</strong> Note the accent."},
  {topic:"School", q:"'Afortunadamente' at the start of a sentence means:", opts:["fortunately, luckily", "however, on the other hand", "unfortunately, sadly", "in my opinion, I think"], ans:0, exp:"<strong>Afortunadamente = fortunately/luckily.</strong> Opposite: desafortunadamente = unfortunately."},
  {topic:"House and Home", q:"'Bastante' modifying an adjective means:", opts:["not very", "a little bit", "extremely", "quite/fairly"], ans:3, exp:"<strong>Bastante = quite/fairly.</strong> e.g. bastante grande = quite big."},
  {topic:"Grammar", q:"Which is the correct negative command for 'don't eat'?", opts:["No comes", "No comer", "No comáis", "No comas"], ans:3, exp:"<strong>No comas = don't eat (tú negative command).</strong> Uses subjunctive form."},
  {topic:"School", q:"'El recreo dura veinte minutos' — how long is break time?", opts:["twenty-five minutes from start to finish", "twenty minutes from start to finish", "thirty minutes from start to finish", "fifteen minutes from start to finish"], ans:1, exp:"<strong>Dura = lasts · veinte minutos = twenty minutes.</strong>"},
  {topic:"House and Home", q:"'Vivo con mis padres' means:", opts:["I live near my parents", "I live alone", "I live with my parents", "I live with my friends"], ans:2, exp:"<strong>Vivo con mis padres = I live with my parents.</strong> Padres = parents."},
  {topic:"Grammar", q:"Complete: 'Tú ___ (beber) mucho agua cada día'", opts:["bebéis", "bebemos", "bebe", "bebes"], ans:3, exp:"<strong>Tú + ER = -es: bebes.</strong>"},
  {topic:"School", q:"'Llevo una camisa blanca' — why 'blanca'?", opts:["Blanca is always used for clothing", "Camisa is feminine — blanco changes to blanca to agree", "It's irregular", "Blanca is the only option"], ans:1, exp:"<strong>Camisa is feminine (la camisa)</strong> → adjective blanco → blanca (feminine form)."},
  {topic:"School", q:"'Los lunes por la mañana tengo doble matemáticas' — what happens on Monday mornings?", opts:["There is an extra homework session on Mondays", "There is a double PE lesson every Monday", "There are two maths lessons on Monday mornings", "There is a maths test every Monday morning"], ans:2, exp:"<strong>Doble matemáticas = double maths · por la mañana = in the morning.</strong>"},
  {topic:"House and Home", q:"Which is correct for 'there are two bathrooms'?", opts:["Tengo dos cuartos de baño grande", "Hay dos baños bonitos grandes", "Hay dos cuartos de baño", "Hay dos cuarto de baño"], ans:2, exp:"<strong>Hay dos cuartos de baño</strong> — plural noun, no adjective needed here."},
  {topic:"House and Home", q:"Translate: 'There is no cinema in my village'", opts:["No hay un cine en mi ciudad", "Hay un cine en mi pueblo", "No hay un cine en mi pueblo", "Hay un pueblo en mi cine"], ans:2, exp:"<strong>No hay = there is no · un cine = a cinema · en mi pueblo = in my village.</strong>"},
  {topic:"School", q:"'Los lunes estudio inglés' means:", opts:["This Monday I study English", "On Mondays I study English (every week)", "Last Monday I studied English", "I love studying English"], ans:1, exp:"<strong>Los lunes (plural) = on Mondays</strong> — a habitual/regular action. Los = every."},
  {topic:"House and Home", q:"'En mi casa hay tres dormitorios' — what is the subject?", opts:["A bathroom", "Three bedrooms", "A garden", "The kitchen"], ans:1, exp:"<strong>Tres dormitorios = three bedrooms.</strong> En mi casa hay = in my house there are."},
  {topic:"Grammar", q:"'Una casa moderna' — which rule does 'moderna' follow?", opts:["Modern homes use moderna", "All adjectives end in -a", "Casa is feminine — moderno changes to moderna to agree with the feminine noun", "Moderna is always the form used"], ans:2, exp:"<strong>Casa is feminine</strong> → adjective moderno → moderna (feminine form)."},
  {topic:"House and Home", q:"'Se puede nadar' means:", opts:["You can swim (one can swim)", "You must swim", "I swim every day", "I am going to swim"], ans:0, exp:"<strong>Se puede + infinitive = you can / one can.</strong> Nadar = to swim."},
  {topic:"Grammar", q:"'¿Cuánto tiempo llevas estudiando español?' means:", opts:["what do you think of studying Spanish", "how long have you been studying Spanish", "when did you start studying Spanish", "why do you enjoy studying Spanish so much"], ans:1, exp:"<strong>¿Cuánto tiempo llevas + gerund? = How long have you been doing...?</strong>"},
  {topic:"School", q:"'Nuestro insti tiene una piscina cubierta y una cancha de baloncesto' — what facilities exist?", opts:["a gym and an indoor tennis court", "a covered pool and a basketball court", "an outdoor pool and a football pitch", "a sports hall and a swimming lake"], ans:1, exp:"<strong>Una piscina cubierta = a covered/indoor pool · una cancha de baloncesto = a basketball court.</strong>"},
  {topic:"House and Home", q:"'No me gusta vivir aquí porque hay mucho ruido' — what is the problem?", opts:["The house is too small for the family", "There is a lot of noise where they live", "There is too much traffic near the house", "There are not enough shops nearby"], ans:1, exp:"<strong>Mucho ruido = a lot of noise.</strong> No me gusta = I don't like."},
  {topic:"Grammar", q:"'Voy a estudiar teatro' — what tense is this?", opts:["Near future: IR conjugated (voy) + a + infinitive = I am going to study", "Past tense", "Present tense", "Imperfect"], ans:0, exp:"<strong>Voy (from IR) + a + infinitive = near future.</strong> I am going to study drama."},
  {topic:"School", q:"'¿A qué hora tienes español?' — 'a las tres' means the class is at:", opts:["13:00", "3:00", "3:30", "2:00"], ans:1, exp:"<strong>A las tres = at 3 o'clock.</strong> 'A las' = at (for times)."},
  {topic:"House and Home", q:"'Se puede ir de compras' means:", opts:["Shopping is not allowed", "You must go shopping", "You can go shopping", "I went shopping"], ans:2, exp:"<strong>Se puede + infinitive = you can / one can.</strong> Ir de compras = to go shopping."},
  {topic:"House and Home", q:"'También hay' means:", opts:["There is no", "However there is", "There was", "There is also / there are also"], ans:3, exp:"<strong>También hay = there is also / there are also.</strong> Useful for adding extra information."},
  {topic:"Grammar", q:"What is the 'yo' form of 'hablar'?", opts:["habla", "hablamos", "hablas", "hablo"], ans:3, exp:"<strong>Yo + AR = -o: hablo</strong>."},
  {topic:"House and Home", q:"'Vivo en el sur de España' means:", opts:["I live in the centre of Spain", "I live in the south of Spain", "I live in the north of Spain", "I live near Spain"], ans:1, exp:"<strong>El sur = the south.</strong> I live in the south of Spain."},
  {topic:"School", q:"'Sin embargo, no me gusta el recreo porque es demasiado corto' — what is the opinion?", opts:["break time is disliked because it is too short", "break time is liked because it is long enough", "break time is fine but lunch is too short", "break time should be abolished completely"], ans:0, exp:"<strong>Sin embargo = however · demasiado corto = too short.</strong> No me gusta = I don't like."},
  {topic:"Grammar", q:"'Vamos a hablar español' means:", opts:["We must speak Spanish", "We spoke Spanish", "We like speaking Spanish", "We are going to speak Spanish"], ans:3, exp:"<strong>Vamos a + infinitive = we are going to.</strong> Hablar = to speak."},
  {topic:"Grammar", q:"Complete: 'Él ___ (escribir) una carta a su amigo'", opts:["escribimos", "escribís", "escribes", "escribe"], ans:3, exp:"<strong>Él + IR = -e: escribe.</strong>"},
  {topic:"School", q:"'En mi insti hay un laboratorio bien equipado' — 'equipado' is:", opts:["Incorrect", "Masculine — agrees with laboratorio (masculine)", "Feminine", "Plural"], ans:1, exp:"Laboratorio is masculine → <strong>bien equipado</strong> (masculine adjective)."},
  {topic:"Grammar", q:"'Una ciudad moderna' — why 'moderna' not 'moderno'?", opts:["Modern is always -a", "Moderno is for verbs only", "It's irregular", "Ciudad is feminine — moderno changes to moderna to agree"], ans:3, exp:"<strong>Ciudad is feminine (la ciudad)</strong> → adjective must be feminine: moderno → moderna."},
  {topic:"Grammar", q:"'Me gustan los deportes' — why 'gustan'?", opts:["Los deportes is plural — verb agrees with what is liked", "Me always takes gustan", "It's irregular", "Deportes is masculine"], ans:0, exp:"<strong>Los deportes is plural → me guSTAN.</strong>"},
  {topic:"Grammar", q:"'Ella trabaja en una tienda' — which tense is this?", opts:["imperfect (she used to work)", "present tense (she works)", "preterite (she worked)", "near future (she is going to work)"], ans:1, exp:"<strong>Trabaja = present tense, third person singular (ella).</strong> -a ending for ER stem AR verb."},
  {topic:"House and Home", q:"'Detrás de la mesa' means:", opts:["In front of the table", "Next to the table", "Behind the table", "Under the table"], ans:2, exp:"<strong>Detrás de = behind.</strong> La mesa = the table (feminine)."},
  {topic:"House and Home", q:"'Encima del sofá' means:", opts:["Next to the sofa", "Behind the sofa", "On top of the sofa", "Under the sofa"], ans:2, exp:"<strong>Encima de = on top of.</strong> Del = de + el (sofá is masculine)."},
  {topic:"School", q:"'Las matemáticas' — which opinion verb is correct?", opts:["Me gusto las matemáticas", "Me gusta las matemática", "Me gusta las matemáticas", "Me gustan las matemáticas — plural noun needs gustan"], ans:3, exp:"<strong>Me gustan</strong> — las matemáticas is plural, so the verb must be plural."},
  {topic:"House and Home", q:"'Al lado del armario' — why 'del' not 'de el'?", opts:["It's irregular", "All prepositions use del", "De + el contracts to del — armario is masculine (el armario)", "It sounds better"], ans:2, exp:"<strong>De + el = del</strong> (contraction). Armario is masculine (el armario) → al lado DEL armario."},
  {topic:"School", q:"Which is the correct 'vosotros' form of 'estudiar'?", opts:["estudiáis", "estudian", "estudiamos", "estudiais"], ans:0, exp:"<strong>Vosotros + AR = -áis: estudiáis.</strong> Note the accent on the á."},
  {topic:"Grammar", q:"'Me gusta nadar' — why 'gusta' not 'gustan'?", opts:["Nadar is plural", "Nadar is masculine", "Infinitives are always treated as singular → gusta (not gustan)", "Me always takes gusta"], ans:2, exp:"<strong>Infinitives = always singular → me gusta.</strong> Me gusta + any infinitive is always gusta."},
  {topic:"House and Home", q:"Which preposition phrase means 'on the right'?", opts:["al fondo", "enfrente de", "a la derecha", "a la izquierda"], ans:2, exp:"<strong>A la derecha = on the right · a la izquierda = on the left · al fondo = at the back.</strong>"},
  {topic:"Grammar", q:"Which is the correct 'ellas' form of 'hablar'?", opts:["habla", "hablan", "habláis", "hablamos"], ans:1, exp:"<strong>Ellas + AR = -an: hablan.</strong> Same as ellos."},
  {topic:"School", q:"'El profesor de matemáticas es muy exigente' — what does 'exigente' mean?", opts:["boring and monotonous in their lessons", "funny and entertaining in the classroom", "kind and patient with all students", "demanding and strict in their expectations"], ans:3, exp:"<strong>Exigente = demanding/strict.</strong> Not the same as 'aburrido' (boring) or 'simpático' (nice)."},
  {topic:"Grammar", q:"'(Ella) estudia inglés' — is this correct?", opts:["Yes — ella takes -a ending for AR verbs: estudi-a", "No — should be estudian", "No — should be estudias", "No — should be estudio"], ans:0, exp:"<strong>Ella (he/she) + AR verb = -a ending.</strong> Estudi- + a = estudia. Correct!"},
  {topic:"School", q:"'Llevo un jersey verde' — why doesn't 'verde' change?", opts:["Jersey is feminine", "It's wrong", "Verde is invariable", "Verde doesn't change for gender — only for plural (verdes)"], ans:3, exp:"<strong>Verde ends in -e</strong> — adjectives not ending in -o don't change for gender. Only plural: verdes."},
  {topic:"Grammar", q:"Complete: 'Ellos ___ (estudiar) matemáticas'", opts:["estudio", "estudian", "estudiamos", "estudias"], ans:1, exp:"<strong>Ellos + AR = -an: estudian.</strong>"},
  {topic:"Grammar", q:"'No voy a estudiar química' means:", opts:["I am going to study chemistry", "I study chemistry", "I don't like chemistry", "I am not going to study chemistry"], ans:3, exp:"<strong>No voy a + infinitive = I am NOT going to.</strong>"},
  {topic:"School", q:"'Por un lado... por otro lado' is used to:", opts:["introduce a personal opinion and conclusion", "give a reason followed by an example", "present two contrasting sides of an argument", "list items in a sequence one after another"], ans:2, exp:"<strong>Por un lado = on one hand · por otro lado = on the other hand.</strong> Used for balanced arguments."},
  {topic:"House and Home", q:"How do you say 'in my opinion, the countryside is better than the city'?", opts:["En mi opinión, el campo es mejor que la ciudad", "Creo que el campo es más bien que la ciudad", "Pienso que campo es mejor que la ciudad", "Según yo, el campo es más bueno que ciudad"], ans:0, exp:"<strong>En mi opinión = in my opinion · mejor que = better than (irregular comparative).</strong>"},
  {topic:"House and Home", q:"Which is correct for 'a modern flat'?", opts:["un piso moderno", "un piso moderna", "una piso moderna", "una piso moderno"], ans:0, exp:"Piso is masculine → <strong>un piso moderno</strong>. Moderno agrees with piso (masculine singular)."},
  {topic:"School", q:"'Me cae bien mi profesora de inglés porque es justa' — what does 'justa' mean?", opts:["patient and kind when explaining things", "fair and just in how she treats everyone", "strict and demanding with high expectations", "funny and entertaining in her lessons"], ans:1, exp:"<strong>Justa = fair/just.</strong> Me cae bien = I get on well with."},
  {topic:"House and Home", q:"'Hay una piscina y un polideportivo en mi ciudad' means:", opts:["My city needs a pool", "There is a pool and a sports centre in my city", "There was a pool in my city", "There is no pool in my city"], ans:1, exp:"<strong>Hay = there is/are · una piscina = a swimming pool · un polideportivo = a sports centre.</strong>"},
  {topic:"Grammar", q:"Complete: 'Nosotros ___ (vivir) en Madrid desde hace cinco años'", opts:["vivemos", "viven", "vivís", "vivimos"], ans:3, exp:"<strong>Nosotros + IR = -imos: vivimos.</strong>"},
  {topic:"House and Home", q:"'El piso está en el tercer piso' — what does this mean?", opts:["The flat has three rooms in total", "The flat is near three bus stops", "The flat is very expensive to rent", "The flat is on the third floor"], ans:3, exp:"<strong>El tercer piso = the third floor.</strong> Confusingly, 'piso' means both flat AND floor."},
  {topic:"Grammar", q:"'No voy a ir al instituto mañana' — what does this mean?", opts:["I am not going to go to school tomorrow", "I went to school yesterday as usual", "I didn't want to go to school today", "I don't usually go to school on Fridays"], ans:0, exp:"<strong>No voy a + infinitive = I am not going to.</strong> Mañana = tomorrow."},
  {topic:"Grammar", q:"What is the near future structure?", opts:["Just the infinitive", "Conjugated IR + a + infinitive", "Present tense + mañana", "Past tense + a"], ans:1, exp:"Near future = <strong>conjugated IR (voy/vas/va...) + a + infinitive</strong>."},
  {topic:"House and Home", q:"Which adjective must change to agree with 'ciudad' (feminine)?", opts:["moderno", "tranquilo", "grande", "verde"], ans:1, exp:"<strong>Tranquilo → tranquila</strong> must change for feminine. Grande and verde don't change. Moderno → moderna but ciudad moderno would need moderna."},
  {topic:"School", q:"Translate: 'On Mondays I have English in the morning'", opts:["El lunes tengo inglés por la mañana", "Los lunes tengo inglés por la mañana", "Los lunes tienes inglés por la mañana", "Los lunes tengo inglés por la tarde"], ans:1, exp:"<strong>Los lunes</strong> (habitual) + <strong>tengo</strong> (I have) + inglés + <strong>por la mañana</strong> (in the morning)."},
  {topic:"House and Home", q:"Which word means 'bungalow/ground floor house' in Spanish?", opts:["el chalet", "la granja", "el adosado", "el piso"], ans:0, exp:"<strong>El chalet = detached house/bungalow · el piso = flat · la granja = farm · el adosado = semi-detached.</strong>"},
  {topic:"Grammar", q:"What is the 'ellos' form of 'vivir'?", opts:["vivís", "vive", "vivimos", "viven"], ans:3, exp:"<strong>Ellos + IR = -en: viven.</strong>"},
  {topic:"House and Home", q:"Which sentence correctly uses 'hay' to describe a town?", opts:["Tengo un parque y una biblioteca aquí", "Hay un parque grande y biblioteca cerca de mí", "Hay un parque grande y una biblioteca cerca", "Hay parque grande y biblioteca cerca"], ans:2, exp:"<strong>Hay + un/una + noun</strong> — both nouns need their articles."},
  {topic:"House and Home", q:"'Mi casa es antigua y pequeña' means:", opts:["My house is old and small", "My house is old and big", "My house is new and small", "My house is modern and big"], ans:0, exp:"<strong>Antigua = old · pequeña = small</strong>. Both are feminine, agreeing with 'casa'."},
  {topic:"House and Home", q:"'En mi casa hay un salón grande' means:", opts:["In my town there is a big hall", "In my room there is a big garden", "In my house there is a big living room", "My house is a big living room"], ans:2, exp:"<strong>En mi casa hay = in my house there is · un salón = a living room · grande = big.</strong>"},
  {topic:"House and Home", q:"Which sentence correctly says 'there is no park in my village'?", opts:["Hay ningún parque en mi pueblo", "No hay un parque en mi pueblo", "No hay parque en mi pueblo", "Hay no parque en mi pueblo"], ans:2, exp:"<strong>No hay + noun (no article needed in negatives) = there is no...</strong> 'No hay parque' is correct."},
  {topic:"Grammar", q:"'(Tú) comes' — which verb type is 'comer'?", opts:["AR — it ends in -er", "Irregular", "ER — tú form uses -es: com-es", "IR — same as vivir"], ans:2, exp:"<strong>Comer is ER</strong> → tú form = -es: com-es = comes. Compare AR: hablas (uses -as not -es)."},
  {topic:"School", q:"'Los miércoles tengo música' means:", opts:["On Wednesdays I have music (every week)", "Last Wednesday I had music", "I had music on Wednesday", "This Wednesday I have music"], ans:0, exp:"<strong>Los miércoles (plural) = every Wednesday</strong> — habitual action."},
  {topic:"House and Home", q:"'Delante de' means:", opts:["Behind", "On top of", "Next to", "In front of"], ans:3, exp:"<strong>Delante de = in front of.</strong>"},
  {topic:"House and Home", q:"'Aunque mi casa es pequeña, me gusta mucho' — what does 'aunque' mean here?", opts:["until", "so", "because", "although/even though"], ans:3, exp:"<strong>Aunque = although/even though.</strong> Used to introduce a concession."},
  {topic:"Grammar", q:"What is the 'vosotros' form of 'escribir'?", opts:["escribimos", "escriben", "escribes", "escribís"], ans:3, exp:"<strong>Vosotros + IR = -ís: escribís.</strong>"},
  {topic:"Grammar", q:"'Somos cinco en mi familia' — what does this mean?", opts:["my family has five rooms in the house", "I have five cousins in my family", "there are five of us in my family", "my parents have five children altogether"], ans:2, exp:"<strong>Somos cinco = there are five of us.</strong> Ser used for describing group size."},
  {topic:"House and Home", q:"'Vivo en un piso en el centro de la ciudad' — where does this person live?", opts:["In a flat in the city centre", "In a house in the countryside", "In a bungalow on the outskirts", "In a cottage near the sea"], ans:0, exp:"<strong>Un piso = a flat · el centro de la ciudad = the city centre.</strong>"},
  {topic:"School", q:"'El inglés es fácil' — what does 'fácil' mean?", opts:["Easy", "Difficult", "Boring", "Interesting"], ans:0, exp:"<strong>Fácil = easy.</strong>"},
  {topic:"House and Home", q:"'Me encanta mi dormitorio porque es muy tranquilo' — why does the speaker like their room?", opts:["It has a great view outside", "It is very peaceful and quiet", "It is very large and bright", "It is close to the bathroom"], ans:1, exp:"<strong>Tranquilo = quiet/peaceful.</strong> Me encanta = I love."},
  {topic:"House and Home", q:"'Las tiendas están a cinco minutos a pie' — how far are the shops?", opts:["ten minutes by bike", "five minutes away on foot", "fifteen minutes away by bus", "five minutes away by car"], ans:1, exp:"<strong>A cinco minutos a pie = five minutes on foot/walking.</strong>"},
  {topic:"Grammar", q:"Which is correct: 'un ciudad grande' or 'una ciudad grande'?", opts:["un ciudad granda", "un ciudad grande", "una ciudad grande — ciudad is feminine", "una ciudad granda"], ans:2, exp:"Ciudad is feminine → <strong>una ciudad grande</strong>. Grande doesn't change for gender."},
  {topic:"School", q:"'Son las tres y media' means:", opts:["It's three o'clock", "It's quarter to three", "It's quarter past three", "It's half past three"], ans:3, exp:"<strong>Son las tres y media = half past three.</strong> Y media = and a half = half past."},
  {topic:"School", q:"'Me gustan las matemáticas' — why 'gustan' not 'gusta'?", opts:["Matemáticas is feminine", "Me always takes gustan", "Las matemáticas is plural — the verb agrees with the thing liked", "It's irregular"], ans:2, exp:"<strong>Las matemáticas is plural → me guSTAN.</strong> The verb agrees with what is liked (plural = gustan)."},
  {topic:"Grammar", q:"'Vas a vivir en Madrid' — who does 'vas' refer to?", opts:["We (nosotros)", "He/she (él/ella)", "I (yo)", "You singular (tú)"], ans:3, exp:"Vas = <strong>tú (you singular)</strong> form of IR. Vas a + infinitive = you are going to."},
  {topic:"House and Home", q:"'La cocina está entre el salón y el comedor' — where is the kitchen?", opts:["Between the living room and the dining room", "Opposite the lounge near the front door", "Behind the dining room near the garden", "Next to the living room on the right side"], ans:0, exp:"<strong>Entre = between · el salón = living room · el comedor = dining room.</strong>"},
  {topic:"Grammar", q:"Complete: '(Tú) ___ (leer) mucho'", opts:["leo", "leemos", "lee", "lees"], ans:3, exp:"<strong>Tú + ER = -es: lees.</strong>"},
  {topic:"Grammar", q:"'Voy a estudiar más' — what tense/structure is this?", opts:["conditional — I would study more later", "near future — I am going to study more", "preterite — I studied more yesterday", "present tense — I study more now"], ans:1, exp:"<strong>Voy a + infinitive = near future (going to).</strong> Voy = I go, a = to, estudiar = to study."},
  {topic:"House and Home", q:"'Debajo de la cama hay muchos zapatos' — where are the shoes?", opts:["Next to the door", "On top of the bed", "Inside the wardrobe", "Under the bed"], ans:3, exp:"<strong>Debajo de = under/below.</strong> Debajo de la cama = under the bed."},
  {topic:"Grammar", q:"'Dos casas bonitas' — why 'bonitas'?", opts:["dos requires -as", "casas is feminine plural — adjective must be feminine plural (bonito→bonita→bonitas)", "bonitas is always used", "It's irregular"], ans:1, exp:"Casas is <strong>feminine plural</strong> → bonito → bonita → <strong>bonitas</strong>."},
  {topic:"School", q:"'Me estresa cuando hay muchos exámenes en la misma semana' — what causes stress?", opts:["when lessons are too long and boring", "when the school day starts too early", "when there are many exams in the same week", "when teachers give too much homework each night"], ans:2, exp:"<strong>Me estresa = it stresses me · muchos exámenes = many exams · la misma semana = the same week.</strong>"},
  {topic:"School", q:"'Prefiero las asignaturas creativas como el arte y la música' — what does this person prefer?", opts:["creative subjects like art and music", "science subjects like biology and chemistry", "academic subjects like maths and history", "practical subjects like PE and technology"], ans:0, exp:"<strong>Prefiero = I prefer · creativas = creative · el arte = art · la música = music.</strong>"},
  {topic:"School", q:"How do you say 'in my opinion, languages are more useful than sciences'?", opts:["Pienso que idiomas son útiles más que ciencias", "En mi opinión, los idiomas son más útil que ciencias", "En mi opinión, los idiomas son más útiles que las ciencias", "Creo que los idiomas son muy útiles y ciencias no"], ans:2, exp:"<strong>Más útiles que = more useful than · los idiomas = languages.</strong> Adjective must be plural: útiles."},
  {topic:"Grammar", q:"'Ella va a ser profesora' — who wants to be a teacher?", opts:["they are going to be teachers", "he is going to be a teacher", "she is going to be a teacher", "you are going to be a teacher"], ans:2, exp:"<strong>Ella = she · va a ser = is going to be · profesora = female teacher.</strong>"},
  {topic:"School", q:"'Por desgracia' means:", opts:["Fortunately", "Unfortunately", "Of course", "By chance"], ans:1, exp:"<strong>Por desgracia = unfortunately.</strong> Good connective for contrast."},
  {topic:"Grammar", q:"AR verbs: nosotros ending is:", opts:["-imos", "- emos", "-amos (trabajamos, hablamos)", "-amos only for vivir"], ans:2, exp:"<strong>Nosotros + AR = -amos</strong>: trabaj-amos, habl-amos, estudi-amos."},
  {topic:"School", q:"How do you say 'I wear a grey jumper and black trousers' in Spanish?", opts:["Llevo un jersey gris y pantalones negros", "Llevo un jersey gris y un pantalón negros", "Tengo un jersey gris y pantalón negro", "Llevo jersey gris y unos pantalones negro"], ans:0, exp:"<strong>Llevo = I wear · un jersey gris = a grey jumper · pantalones negros = black trousers (plural).</strong>"},
  {topic:"Grammar", q:"'Me gusta nadar' — why 'gusta' not 'gustan'?", opts:["It's irregular", "Nadar is plural", "Me always takes gusta", "Infinitives are always singular — me gusta + any infinitive"], ans:3, exp:"<strong>Infinitive = singular → me gusta.</strong> Me gusta + infinitive is always correct."},
  {topic:"Grammar", q:"What is the 'nosotros' form of 'comer'?", opts:["comimos", "coman", "comemos", "coméis"], ans:2, exp:"<strong>Nosotros + ER = -emos: comemos.</strong>"},
  {topic:"House and Home", q:"'La biblioteca' means:", opts:["The sports centre", "The park", "The library", "The swimming pool"], ans:2, exp:"<strong>La biblioteca = the library.</strong> Feminine noun."},
  {topic:"Grammar", q:"How do you make 'grande' plural?", opts:["grandés — add accent and s", "grandes — add -s", "grands — remove the e", "grandos — change o to os"], ans:1, exp:"<strong>Grande → grandes.</strong> Adjectives ending in -e just add -s for plural."},
  {topic:"Grammar", q:"'Nosotros vivimos' vs 'nosotros comemos' — why different endings?", opts:["Comer is special", "They are the same", "Vivir is IR (-imos) · Comer is ER (-emos) — only nosotros and vosotros differ between IR and ER", "It's irregular"], ans:2, exp:"<strong>IR nosotros = -imos · ER nosotros = -emos.</strong> These are the only two forms where IR and ER differ."},
  {topic:"School", q:"'Mi asignatura favorita es la informática porque es muy práctica' — what subject and why?", opts:["Drama, because it is creative and enjoyable", "History, because it is very interesting and exciting", "ICT/Computing, because it is very practical", "French, because it is useful for the future"], ans:2, exp:"<strong>La informática = ICT/computing · práctica = practical.</strong>"},
  {topic:"House and Home", q:"How do you say 'there is no garden'?", opts:["El jardín no", "No hay jardín", "No hay jardín grande", "Hay un jardín"], ans:1, exp:"<strong>No hay = there is no / there isn't.</strong> No hay jardín = there is no garden."},
  {topic:"Grammar", q:"Why is 'un agua fría' grammatically unusual in Spanish?", opts:["agua has no gender and takes any article", "agua is feminine but takes masculine article to avoid vowel clash — adjective stays feminine", "agua is actually a masculine noun always", "agua is masculine so needs un, but fría is feminine"], ans:1, exp:"<strong>Agua is feminine</strong> but uses 'el/un' (not la/una) before it to avoid vowel clash. Adjectives still feminine: el agua fría."},
  {topic:"House and Home", q:"'Me gustan los pisos porque están cerca de todo' — what is the opinion?", opts:["Houses are preferred because they are more spacious", "Flats are liked because they are close to everything", "Flats are disliked because they have no garden", "Flats are too noisy and too expensive to rent"], ans:1, exp:"<strong>Me gustan = I like (plural) · cerca de todo = close to everything.</strong>"},
  {topic:"School", q:"'¿Qué hora es? Son las once menos cuarto' means:", opts:["10:45", "11:15", "11:45", "10:15"], ans:0, exp:"Son las once menos cuarto = <strong>quarter to eleven = 10:45</strong>."},
  {topic:"School", q:"'Llevo una falda azul marino y una blusa blanca' — describe this uniform.", opts:["a navy blue skirt and a white blouse", "navy blue trousers and a white shirt", "a blue blazer and a white tie", "dark blue shorts and a white jacket"], ans:0, exp:"<strong>Una falda = a skirt · azul marino = navy blue · una blusa = a blouse · blanca = white.</strong>"},
  {topic:"House and Home", q:"'Enfrente de' means:", opts:["behind", "to the left of", "next to", "opposite/in front of"], ans:3, exp:"<strong>Enfrente de = opposite/in front of.</strong> e.g. Enfrente de la iglesia = opposite the church."},
  {topic:"Grammar", q:"'Me gustaría vivir en España' — what does 'gustaría' express?", opts:["a definite plan for the near future", "a command or instruction to follow", "something that happened in the past", "a wish or preference (conditional: would like)"], ans:3, exp:"<strong>Me gustaría = I would like (conditional tense).</strong> Used for wishes and hypothetical preferences."},
  {topic:"House and Home", q:"'En las afueras' means:", opts:["In the north", "In the city centre", "In a village", "On the outskirts"], ans:3, exp:"<strong>En las afueras = on the outskirts</strong> of a town or city."},
  {topic:"School", q:"¿Cómo se dice 'school uniform' en español?", opts:["la ropa de colegio", "el traje de escuela", "el uniforme escolar", "el vestido del instituto"], ans:2, exp:"<strong>El uniforme escolar = school uniform.</strong>"},
  {topic:"School", q:"'Me gustan las ciencias porque son interesantes' — why does the speaker like science?", opts:["because science lessons are interesting", "because the subject is easy and relaxing", "because they find science very useful", "because the teacher explains things very clearly"], ans:0, exp:"<strong>Interesantes = interesting.</strong> Me gustan (plural) agrees with las ciencias."},
  {topic:"House and Home", q:"'Vivo en un pueblo pequeño' means:", opts:["I live in a small flat", "I live on a small farm", "I live in a big city", "I live in a small village"], ans:3, exp:"<strong>Vivo en = I live in · un pueblo = a village · pequeño = small (masculine, agrees with pueblo).</strong>"},
  {topic:"School", q:"'Tengo historia los lunes y los jueves' — when does this student have history?", opts:["on Wednesdays and Saturdays only", "on Tuesdays and Fridays every week", "on Mondays and Wednesdays every week", "on Mondays and Thursdays every week"], ans:3, exp:"<strong>Los lunes = Mondays · los jueves = Thursdays.</strong> Plural article = every/on that day."},
  {topic:"Grammar", q:"'Me interesa la geografía' — why 'interesa' not 'intereso'?", opts:["it is the preterite tense of interesar", "the verb agrees with la geografía (the thing that interests)", "interesar is irregular and always ends in -a", "me always takes the -a ending in Spanish"], ans:1, exp:"<strong>Interesar works like gustar</strong> — the verb agrees with the subject (la geografía = singular → interesa)."},
  {topic:"Grammar", q:"'Hay que respetar las reglas del instituto' — what does 'hay que' mean?", opts:["it is possible to break the school rules", "someone has decided to change the rules", "one must/it is necessary to respect the rules", "there are rules that nobody follows"], ans:2, exp:"<strong>Hay que + infinitive = one must/it is necessary to.</strong> Impersonal obligation."},
  {topic:"House and Home", q:"'Una granja' means:", opts:["A city", "A flat", "A farm", "A detached house"], ans:2, exp:"<strong>Una granja = a farm</strong>."},
  {topic:"House and Home", q:"Which sentence means 'I would like to live in a bigger house'?", opts:["Quisiera una casa grande y bonita siempre", "Me gustaría vivir en una casa más grande", "Voy a vivir en una casa más grande pronto", "Me gusta vivir en una casa más grande"], ans:1, exp:"<strong>Me gustaría + infinitive = I would like to.</strong> Más grande = bigger (comparative)."},
  {topic:"Grammar", q:"'Mis amigos y yo quedamos los viernes por la tarde' — what do they do?", opts:["My friends and I study on Friday afternoons", "My friends and I meet up on Friday afternoons", "My friends and I stay at home on Fridays", "My friends and I play sport on Friday evenings"], ans:1, exp:"<strong>Quedamos = we meet up · los viernes = on Fridays · por la tarde = in the afternoon.</strong>"},
  {topic:"Grammar", q:"'Una mesa roja y dos sillas rojas' — why does 'roja' change to 'rojas'?", opts:["adjectives agree in gender AND number with the noun they describe", "because the colour follows a verb", "because it describes something far away", "because 'dos' requires the plural form always"], ans:0, exp:"<strong>Adjectives agree in gender and number.</strong> Mesa (sing. fem.) → roja. Sillas (pl. fem.) → rojas."},
  {topic:"House and Home", q:"'Mi casa es bastante moderna pero un poco pequeña' — what two adjectives describe the house?", opts:["modern and small", "old and big", "comfortable and dark", "new and cheap"], ans:0, exp:"<strong>Bastante moderna = quite modern · un poco pequeña = a little small.</strong>"},
  {topic:"School", q:"Which sentence means 'I find PE boring but useful'?", opts:["Encuentro la educación física aburrida pero útil", "Me parece PE aburrido pero muy útil para mí", "Creo que PE es aburrido y no es útil", "La educación física es aburrida y no me gusta"], ans:0, exp:"<strong>Encuentro = I find · aburrida = boring (agrees with feminine noun) · útil = useful.</strong>"},
  {topic:"House and Home", q:"'Al lado de' means:", opts:["in front of", "on top of", "next to", "behind"], ans:2, exp:"<strong>Al lado de = next to.</strong> Useful for describing where things are."},
  {topic:"House and Home", q:"Which is the correct feminine adjective for 'pequeño'?", opts:["pequeña", "pequeños", "pequeñas", "pequeño"], ans:0, exp:"Feminine singular: <strong>pequeña</strong>. The -o changes to -a for feminine nouns."},
  {topic:"School", q:"Which time phrase means 'at half past two'?", opts:["a las dos menos cuarto", "a las dos y media", "a las dos y cuarto", "a las dos en punto"], ans:1, exp:"<strong>A las dos y media = at half past two.</strong> Y media = and a half."}
  ],
  science: [
  {topic:"Scientific Skills", q:"What is a control variable?", opts:["The result of the experiment", "What you change", "What you measure", "Something kept constant to ensure a fair test"], ans:3, exp:"Control variable = <strong>kept constant</strong> — ensures that only the independent variable affects the result."},
  {topic:"Waves and Light", q:"A wave has frequency 50Hz and wavelength 4m. What is its speed?", opts:["12.5 m/s", "200 m/s", "54 m/s", "46 m/s"], ans:1, exp:"<strong>v = fλ = 50 × 4 = 200 m/s</strong>"},
  {topic:"Waves and Light", q:"The speed of light in a vacuum is approximately:", opts:["340 m/s", "3,000 m/s", "3×10⁶ m/s", "3×10⁸ m/s (300,000 km/s)"], ans:3, exp:"Speed of light = <strong>3×10⁸ m/s = 300,000 km/s</strong>."},
  {topic:"Electricity", q:"What flows in an electric circuit?", opts:["Protons", "Neutrons", "Ions only", "Electrons — electric current is a flow of electrons"], ans:3, exp:"Electric current = <strong>flow of electrons</strong> through a conductor."},
  {topic:"Acids and Alkalis", q:"What does 'neutralisation' produce?", opts:["Acid + more water", "Salt + water", "Only a salt", "Hydrogen + carbon dioxide"], ans:1, exp:"<strong>Acid + alkali → salt + water.</strong> This is neutralisation."},
  {topic:"Chemical Reactions", q:"Iron and sulfur are heated together. This is a:", opts:["Dissolution — sulfur dissolves in molten iron", "Mixture — elements remain separate", "Chemical change — new substance (iron sulfide) formed", "Physical change — can be reversed"], ans:2, exp:"<strong>Chemical change — iron sulfide (FeS) formed,</strong> with different properties from the elements. Cannot be easily separated."},
  {topic:"Chemical Reactions", q:"In the equation 2H₂ + O₂ → 2H₂O, what do the large numbers (2) represent?", opts:["The charge on each ion", "The number of molecules of each substance", "The number of atoms in each molecule", "The atomic number of each element"], ans:1, exp:"<strong>Large numbers (coefficients) = number of molecules.</strong> Small subscript numbers = atoms within a molecule."},
  {topic:"Waves and Light", q:"What is the period of a wave and how is it related to frequency?", opts:["Time for the wave to travel 1 metre — period = distance ÷ speed", "The height of one wave — period = amplitude × 2", "Time for one complete wave cycle — period = 1/frequency", "The length of one wave — period = wavelength ÷ speed"], ans:2, exp:"<strong>Period = time for one complete cycle. T = 1/f.</strong> Higher frequency = shorter period."},
  {topic:"Forces and Motion", q:"Moment = Force × distance. If force = 40N and distance = 3m, moment is:", opts:["43Nm", "13.3Nm", "120Nm", "37Nm"], ans:2, exp:"M = F × d = 40 × 3 = <strong>120Nm</strong>."},
  {topic:"Electricity", q:"Where must a voltmeter be placed in a circuit?", opts:["Anywhere", "In series", "In parallel — across the component being measured", "Before the battery"], ans:2, exp:"Voltmeter must be in <strong>parallel</strong> (across the component)."},
  {topic:"Acids and Alkalis", q:"A bee sting is acidic. What would help neutralise it?", opts:["Lemon juice (acidic)", "Water", "Bicarbonate of soda (alkaline) — an alkali neutralises an acid", "Vinegar (acidic)"], ans:2, exp:"<strong>Alkaline substance (bicarbonate)</strong> neutralises the acid in a bee sting."},
  {topic:"Chemical Reactions", q:"What is the blue Bunsen burner flame used for?", opts:["Safety standby", "When not in use", "Lighting the Bunsen", "Active heating — hotter than yellow flame"], ans:3, exp:"Blue flame (air hole open) = <strong>hotter, used for active heating</strong>. Yellow = safety/standby."},
  {topic:"Acids and Alkalis", q:"A substance has pH 9. It is:", opts:["Neutral", "A weak alkali — pH 8-14 is alkaline, 9 is mild", "A weak acid", "A strong acid"], ans:1, exp:"pH 9 = <strong>weak alkali</strong>. pH 8-14 = alkaline range."},
  {topic:"Plants and Ecosystems", q:"What are the reactants (inputs) for photosynthesis?", opts:["Glucose and carbon dioxide", "Glucose and oxygen", "Carbon dioxide and water (plus light energy)", "Water and oxygen"], ans:2, exp:"Photosynthesis inputs: <strong>carbon dioxide + water</strong> + light energy."},
  {topic:"Electricity", q:"Static electricity builds up on:", opts:["Insulators — charge cannot flow away, so it accumulates on the surface", "Liquids", "Conductors", "Metals"], ans:0, exp:"Static builds on <strong>insulators</strong> — charge cannot flow away."},
  {topic:"Waves and Light", q:"Compressions in a sound wave are regions of:", opts:["Zero particle movement", "Maximum amplitude", "High pressure where particles are pushed together", "Low pressure where particles are spread apart"], ans:2, exp:"Compressions = <strong>regions of high pressure where particles are pushed together</strong>."},
  {topic:"Chemical Reactions", q:"Thermal decomposition is a reaction where:", opts:["A substance dissolves in an acid", "Two substances react to form one product", "A substance is broken down by heat into simpler substances", "Two solutions react to form a precipitate"], ans:2, exp:"<strong>Thermal decomposition = heat breaks a compound down</strong> into simpler products. e.g. CaCO₃ → CaO + CO₂"},
  {topic:"Waves and Light", q:"Red + Green light (additive mixing) produces:", opts:["Cyan", "Yellow", "White", "Magenta"], ans:1, exp:"Red + Green = <strong>Yellow</strong>. (RGB additive colour mixing.)"},
  {topic:"Plants and Ecosystems", q:"A plant has yellow leaves with dead patches. Which mineral is deficient?", opts:["Magnesium", "Potassium — deficiency causes yellow leaves with dead patches", "Phosphorus", "Nitrogen"], ans:1, exp:"<strong>Potassium deficiency</strong> → yellow leaves with dead patches/brown edges."},
  {topic:"Waves and Light", q:"What is the amplitude of a wave?", opts:["The maximum displacement from the equilibrium position", "The distance between two successive crests", "The number of waves passing a point per second", "The speed at which the wave travels"], ans:0, exp:"<strong>Amplitude = maximum displacement from rest position.</strong> Larger amplitude = more energy in the wave."},
  {topic:"Forces and Motion", q:"A broken post weighs 120N and rests on 0.2m². Calculate the pressure.", opts:["600 Pa", "24 Pa", "120.2 Pa", "0.0017 Pa"], ans:0, exp:"P = F ÷ A = 120 ÷ 0.2 = <strong>600 Pa</strong>."},
  {topic:"Scientific Skills", q:"An anomaly on a graph is:", opts:["Any data point", "A point that doesn't fit the general trend — possible error", "The line of best fit", "The y-intercept"], ans:1, exp:"Anomaly = <strong>a point that doesn't fit the general trend</strong> — may be an experimental error."},
  {topic:"Forces and Motion", q:"What is 'work done' and its formula?", opts:["The total distance an object travels — W = d/t", "The power output over time — W = Pt", "The momentum change — W = mv", "Energy transferred — W = Fd (force × distance in direction of force)"], ans:3, exp:"<strong>Work done = force × distance = Fd.</strong> Units: joules (J). Energy transferred = work done."},
  {topic:"Plants and Ecosystems", q:"Which plant tissue transports water from roots to leaves?", opts:["Phloem", "Epidermis", "Xylem", "Mesophyll"], ans:2, exp:"<strong>Xylem transports water (and minerals) upward.</strong> Phloem transports dissolved sugars both ways."},
  {topic:"Scientific Skills", q:"What type of variable is 'colour of solution' — qualitative or quantitative?", opts:["Qualitative — it is descriptive, not numerical", "Quantitative — it can be measured numerically", "Discrete — it has a limited number of values", "Continuous — it changes gradually"], ans:0, exp:"<strong>Qualitative = descriptive, not numerical</strong> — colour, smell, state. Quantitative = measured numerically."},
  {topic:"Scientific Skills", q:"A student repeats an experiment 5 times and gets very similar results. This suggests the results are:", opts:["Accurate", "Reliable", "Valid", "Precise"], ans:1, exp:"<strong>Reliable = consistent/repeatable results.</strong> Precise = close together. Accurate = close to true value."},
  {topic:"Chemical Reactions", q:"What is an exothermic reaction?", opts:["One that releases energy to the surroundings", "One involving organic compounds only", "One that only occurs at high temperatures", "One that requires energy input to proceed"], ans:0, exp:"<strong>Exothermic = releases energy (usually heat) to surroundings.</strong> Temperature of surroundings increases."},
  {topic:"Forces and Motion", q:"Calculate the kinetic energy of a 5kg ball moving at 4 m/s.", opts:["160J", "80J", "20J", "40J"], ans:3, exp:"<strong>KE = ½mv² = ½ × 5 × 16 = 40J</strong>"},
  {topic:"Scientific Skills", q:"Which measurement has 3 significant figures?", opts:["0.00300", "0.003000", "0.0030", "0.003"], ans:2, exp:"<strong>0.0030 has 2 sig figs (3 and 0 after).</strong> Wait — 0.0030 = 2 sig figs. Actually 30.0 = 3 sig figs. The trailing zero after decimal matters."},
  {topic:"Plants and Ecosystems", q:"What is 'interdependence' in an ecosystem?", opts:["When plants depend on sunlight only", "When organisms depend on each other for survival", "When species compete for the same food", "When animals migrate to find food"], ans:1, exp:"<strong>Interdependence = organisms depend on each other</strong> — e.g. bees need flowers; flowers need bees for pollination."},
  {topic:"Acids and Alkalis", q:"Hydrochloric acid reacts with calcium carbonate. Which gas is produced?", opts:["Oxygen", "Hydrogen", "Carbon dioxide — acid + carbonate always produces CO₂", "Nitrogen"], ans:2, exp:"Acid + carbonate → salt + water + <strong>carbon dioxide</strong>."},
  {topic:"Chemical Reactions", q:"Which factor does NOT affect the rate of reaction?", opts:["Colour of the reactants", "Particle size", "Temperature", "Concentration of reactants"], ans:0, exp:"<strong>Colour does not affect rate.</strong> Concentration, temperature, particle size and catalysts do."},
  {topic:"Forces and Motion", q:"What is the difference between mass and weight?", opts:["Mass (kg) is constant everywhere. Weight (N) depends on gravitational field strength and varies by planet", "Weight is constant, mass varies", "No difference", "Mass is measured in newtons"], ans:0, exp:"<strong>Mass (kg)</strong> = constant. <strong>Weight (N)</strong> = mass × g, varies by planet."},
  {topic:"Forces and Motion", q:"What is 'elastic potential energy'?", opts:["Energy stored in a moving object", "Energy stored in chemical bonds", "Energy released by burning fuel", "Energy stored in a stretched or compressed spring"], ans:3, exp:"<strong>Elastic potential energy = stored in stretched/compressed spring.</strong> Released when spring returns to natural length."},
  {topic:"Waves and Light", q:"What does a convex (converging) lens do to parallel rays of light?", opts:["Makes them travel parallel but closer together", "Reflects them back towards the source", "Spreads them further apart", "Brings them together at the focal point"], ans:3, exp:"<strong>Convex lens converges (brings together) parallel rays</strong> at the focal point."},
  {topic:"Chemical Reactions", q:"In a word equation, what symbol is used?", opts:["≈", "±", "→ (an arrow) — showing reactants convert to products", "="], ans:2, exp:"Word equations use <strong>→ (an arrow)</strong>, not an equals sign."},
  {topic:"Acids and Alkalis", q:"Nitric acid produces which type of salt?", opts:["Chloride", "Sulphate", "Nitrate", "Carbonate"], ans:2, exp:"<strong>Nitric acid (HNO₃) → nitrate salts.</strong>"},
  {topic:"Acids and Alkalis", q:"Hydrochloric acid reacts with sodium carbonate. What salt is formed?", opts:["Sodium chloride — HCl gives chloride salts", "Sodium sulphate", "Sodium hydroxide", "Sodium nitrate"], ans:0, exp:"HCl → chloride. Sodium (from carbonate) + chloride = <strong>sodium chloride</strong>."},
  {topic:"Waves and Light", q:"What is an 'echo' in terms of wave behaviour?", opts:["A wave that has been refracted by a distant object", "A wave that has lost energy travelling a long distance", "Sound reflected off a surface and heard after the original sound", "The interference of two sound waves at the same frequency"], ans:2, exp:"<strong>Echo = sound reflected off a surface</strong> and heard as a separate sound after the original."},
  {topic:"Electricity", q:"A bulb has resistance 12Ω and a current of 2A flows through it. What is the voltage?", opts:["14V", "10V", "24V", "6V"], ans:2, exp:"<strong>V = IR = 2 × 12 = 24V</strong>"},
  {topic:"Waves and Light", q:"In which medium does sound travel fastest?", opts:["Steel or solid materials", "A vacuum", "Water", "Air at room temperature"], ans:0, exp:"<strong>Sound travels fastest in solids (e.g. steel)</strong> — particles are closest together so vibrations transfer more quickly."},
  {topic:"Electricity", q:"A bulb has 6V across it and 2A through it. What is its resistance?", opts:["8 Ω", "0.33 Ω", "12 Ω", "3 Ω"], ans:3, exp:"R = V ÷ I = 6 ÷ 2 = <strong>3 Ω</strong>."},
  {topic:"Chemical Reactions", q:"Magnesium + oxygen → ?", opts:["Magnesium hydroxide", "Magnesium oxide — metal + oxygen → metal oxide", "Magnesium carbonate", "Magnesium sulphide"], ans:1, exp:"Metal + oxygen → metal <strong>oxide</strong>. Magnesium + oxygen → <strong>magnesium oxide</strong>."},
  {topic:"Chemical Reactions", q:"Which of these is a physical change?", opts:["Burning wood", "Cooking an egg", "Rusting iron", "Dissolving salt in water — reversible, no new substance"], ans:3, exp:"Dissolving = <strong>physical change</strong> — reversible (evaporate water to get salt back), no new substance."},
  {topic:"Plants and Ecosystems", q:"What is the role of stomata in a leaf?", opts:["To absorb light energy for photosynthesis", "To produce chlorophyll for photosynthesis", "To allow gas exchange — CO₂ in, O₂ out — and control water loss", "To transport water throughout the leaf"], ans:2, exp:"<strong>Stomata = pores allowing gas exchange (CO₂ in, O₂ out)</strong> and controlling water loss via transpiration."},
  {topic:"Plants and Ecosystems", q:"If a pest kills all the grass in a food web, what happens to herbivores?", opts:["They increase", "They become carnivores", "They decrease — less food available (interdependence)", "They are unaffected"], ans:2, exp:"<strong>Interdependence</strong>: less grass → less food for herbivores → herbivore population decreases."},
  {topic:"Chemical Reactions", q:"What is 'activation energy'?", opts:["The total energy released in a reaction", "The energy difference between reactants and products", "The energy stored in chemical bonds", "The minimum energy needed to start a reaction"], ans:3, exp:"<strong>Activation energy = minimum energy needed to start the reaction</strong> — to break existing bonds in reactants."},
  {topic:"Plants and Ecosystems", q:"A plant has purple leaves and poor root growth. Which mineral is deficient?", opts:["Potassium", "Phosphorus — deficiency causes poor root growth and purple leaves", "Magnesium", "Nitrogen"], ans:1, exp:"<strong>Phosphorus deficiency</strong> → poor root growth and purple leaves."},
  {topic:"Forces and Motion", q:"A ball is thrown upward. Ignoring air resistance, what force acts on it throughout?", opts:["Only gravity, acting downward throughout", "An upward force from the throw", "An upward force while rising; downward while falling", "No force — it is in the air"], ans:0, exp:"<strong>Only gravity acts (downward) throughout — including while rising.</strong> The initial throw gives velocity, not a continuing force."},
  {topic:"Scientific Skills", q:"In an experiment, what is the independent variable?", opts:["What you change deliberately", "The control group", "What you measure", "What you keep the same"], ans:0, exp:"<strong>Independent variable = what you deliberately change.</strong>"},
  {topic:"Waves and Light", q:"What is 'dispersion' of white light through a prism?", opts:["White light speeding up inside the glass", "White light reflecting off the internal surface", "White light being absorbed by the glass", "White light splitting into its component colours due to different wavelengths refracting differently"], ans:3, exp:"<strong>Dispersion = white light splitting into spectrum</strong> because different wavelengths (colours) refract by different amounts."},
  {topic:"Electricity", q:"What is the relationship between resistance and current (at constant voltage)?", opts:["Higher resistance = current unchanged", "Higher resistance = lower current (inversely proportional)", "Higher resistance = higher current", "Resistance and current are unrelated"], ans:1, exp:"<strong>V = IR → I = V/R.</strong> Higher resistance = lower current (inversely proportional at constant voltage)."},
  {topic:"Waves and Light", q:"What is 'refraction' of light?", opts:["Light bending as it crosses between media of different densities", "Light bouncing off a surface", "Light being absorbed by a surface", "Light splitting into its component colours"], ans:0, exp:"<strong>Refraction = light bending at a boundary between different media</strong> (e.g. air to glass) due to change in speed."},
  {topic:"Electricity", q:"What is the difference between AC and DC current?", opts:["AC is more dangerous; DC is completely safe", "AC alternates direction; DC flows in one direction only", "AC is used in batteries; DC is used in mains supply", "AC is used in small devices; DC in large appliances"], ans:1, exp:"<strong>AC = alternating current (changes direction). DC = direct current (one direction).</strong> Mains = AC. Batteries = DC."},
  {topic:"Acids and Alkalis", q:"What colour does universal indicator turn in a strong alkali?", opts:["Red", "Orange", "Green", "Purple/dark blue"], ans:3, exp:"<strong>Strong alkali = purple/dark blue</strong> on universal indicator. Green = neutral. Red = strong acid."},
  {topic:"Forces and Motion", q:"What does Newton's Third Law state?", opts:["Acceleration is proportional to force", "For every action there is an equal and opposite reaction force", "Objects at rest stay at rest unless pushed", "Force equals the rate of change of momentum"], ans:1, exp:"<strong>Newton's 3rd Law: equal and opposite reaction forces.</strong> If A pushes B, B pushes A with equal force in opposite direction."},
  {topic:"Forces and Motion", q:"Why is weight less on Mars than Earth?", opts:["It is colder", "Mars has no atmosphere", "Mars has less mass than Earth — less mass means a weaker gravitational field", "Mars is further from the Sun"], ans:2, exp:"Mars has <strong>less mass → weaker gravitational field → less weight</strong>."},
  {topic:"Plants and Ecosystems", q:"What is produced by photosynthesis that animals need to breathe?", opts:["Oxygen — released as a by-product through stomata", "Water", "Glucose", "Carbon dioxide"], ans:0, exp:"Photosynthesis releases <strong>oxygen</strong> as a by-product — essential for animal respiration."},
  {topic:"Chemical Reactions", q:"What is produced when methane (CH₄) burns completely?", opts:["Carbon dioxide + water", "Carbon dioxide only", "Carbon + hydrogen", "Carbon monoxide + hydrogen"], ans:0, exp:"<strong>Complete combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O.</strong> CO₂ + water."},
  {topic:"Waves and Light", q:"Ultraviolet radiation can cause skin cancer. Why is it more dangerous than visible light?", opts:["UV has longer wavelength so carries more energy", "UV is a type of ionising radiation unlike visible light", "UV has higher frequency so carries more energy and can damage DNA", "UV is invisible so we don't know when we're exposed"], ans:2, exp:"<strong>UV has higher frequency than visible light</strong> → more energy → can damage DNA in skin cells."},
  {topic:"Waves and Light", q:"What is the critical angle in optics?", opts:["The angle of incidence above which total internal reflection occurs", "The angle at which light travels fastest", "The angle at which refraction is maximum", "The angle at which light is completely reflected at any surface"], ans:0, exp:"<strong>Critical angle = angle of incidence above which total internal reflection occurs</strong> (light stays inside the denser medium)."},
  {topic:"Electricity", q:"In which direction does conventional current flow?", opts:["From + to − (positive to negative terminal)", "Only in AC", "From − to +", "In both directions"], ans:0, exp:"Conventional current flows <strong>positive → negative</strong>."},
  {topic:"Electricity", q:"In a parallel circuit, what is true about the voltage across each branch?", opts:["Voltage is the same across each parallel branch", "Voltage decreases along each branch", "Voltage splits unevenly between branches", "Voltage is higher in each successive branch"], ans:0, exp:"<strong>Parallel: voltage is the same across each branch.</strong> Current splits between branches."},
  {topic:"Plants and Ecosystems", q:"What is the word equation for photosynthesis?", opts:["Water + oxygen → glucose + carbon dioxide", "Carbon dioxide + glucose → oxygen + water", "Glucose + oxygen → carbon dioxide + water", "Carbon dioxide + water → glucose + oxygen"], ans:3, exp:"<strong>CO₂ + H₂O → glucose + O₂.</strong> Needs light energy and chlorophyll."},
  {topic:"Forces and Motion", q:"What is the formula for momentum?", opts:["p = mv² (mass × velocity squared)", "p = mv (mass × velocity)", "p = Ft (force × time)", "p = ma (mass × acceleration)"], ans:1, exp:"<strong>Momentum p = mv</strong> (mass × velocity). Units: kg m/s."},
  {topic:"Forces and Motion", q:"Why does a drawing pin penetrate a surface more easily than a thumb?", opts:["A pin is harder", "A pin is sharper coloured", "A pin is lighter", "A pin has a smaller area — same force over smaller area = greater pressure"], ans:3, exp:"Smaller area = same force ÷ smaller area = <strong>greater pressure → penetrates more easily</strong>."},
  {topic:"Acids and Alkalis", q:"What gas is produced when a metal reacts with an acid?", opts:["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], ans:3, exp:"<strong>Metal + acid → salt + hydrogen.</strong> Test: hydrogen makes a squeaky pop with a lit splint."},
  {topic:"Chemical Reactions", q:"Iron + sulphur → ?", opts:["Iron sulphide — metal + sulphur → metal sulphide", "Iron sulphate", "Iron oxide", "Iron carbonate"], ans:0, exp:"Metal + sulphur → metal <strong>sulphide</strong>. Iron + sulphur → <strong>iron sulphide</strong>."},
  {topic:"Scientific Skills", q:"What is the independent variable in an experiment?", opts:["The variable kept the same throughout", "The variable deliberately changed by the scientist", "The variable that is measured at the end", "The variable that affects accuracy"], ans:1, exp:"<strong>Independent variable = deliberately changed by the experimenter.</strong> Dependent = measured. Control = kept the same."},
  {topic:"Forces and Motion", q:"What is 'terminal velocity'?", opts:["The speed at which an object first starts moving", "The velocity at the point of impact", "The maximum speed a vehicle can legally travel", "The speed at which driving force equals air resistance — no further acceleration"], ans:3, exp:"<strong>Terminal velocity = constant speed when driving force = resistive force</strong> (e.g. drag). No net force = no acceleration."},
  {topic:"Forces and Motion", q:"What is the area under a velocity-time graph equal to?", opts:["Displacement (distance travelled)", "Force applied", "Acceleration", "Speed"], ans:0, exp:"<strong>Area under v-t graph = displacement (distance).</strong> Gradient = acceleration."},
  {topic:"Chemical Reactions", q:"What is the purpose of the gauze on a tripod?", opts:["To hold test tubes", "To measure temperature", "To filter liquids", "To provide a surface for a beaker to sit on safely above the Bunsen flame"], ans:3, exp:"Gauze on tripod = <strong>surface for beaker to sit on safely above the Bunsen burner</strong>."},
  {topic:"Chemical Reactions", q:"How does increasing surface area speed up a reaction?", opts:["It raises the temperature of the reactants", "It lowers the activation energy needed", "It increases the concentration of the reactants", "More particles are exposed, so collision frequency increases"], ans:3, exp:"<strong>Greater surface area = more exposed particles = more frequent collisions = faster reaction.</strong>"},
  {topic:"Chemical Reactions", q:"What is the law of conservation of mass?", opts:["Atoms change identity during a reaction", "Only metals conserve mass during reactions", "Energy is never created or destroyed", "In a chemical reaction, the total mass of products equals the total mass of reactants"], ans:3, exp:"<strong>Conservation of mass: total mass of reactants = total mass of products.</strong> Atoms rearrange but are not created or destroyed."},
  {topic:"Waves and Light", q:"What is the law of reflection?", opts:["The angle of incidence equals twice the angle of refraction", "The angle of incidence equals the angle of reflection", "The reflected ray is always perpendicular to the surface", "Light always reflects at 45°"], ans:1, exp:"<strong>Angle of incidence = angle of reflection</strong> (both measured from the normal)."},
  {topic:"Forces and Motion", q:"If the net force on an object is zero, what can you conclude?", opts:["The object is moving at constant velocity", "The object must be decelerating", "The object is not moving OR moving at constant velocity", "The object is stationary"], ans:2, exp:"<strong>Zero net force = no acceleration.</strong> Object is either stationary OR moving at constant velocity (both are possible)."},
  {topic:"Waves and Light", q:"An oscilloscope displays a sound wave. The horizontal axis shows:", opts:["Frequency", "Amplitude", "Distance", "Time"], ans:3, exp:"Oscilloscope horizontal axis = <strong>time</strong>. Vertical axis = displacement (amplitude)."},
  {topic:"Acids and Alkalis", q:"Blue litmus paper is dipped in acid. What happens?", opts:["Turns green", "Stays blue", "Turns red — acid changes blue litmus to red", "Turns purple"], ans:2, exp:"Acid turns blue litmus <strong>red</strong>."},
  {topic:"Waves and Light", q:"What is the difference between a transverse and a longitudinal wave?", opts:["Transverse waves need a medium; longitudinal don't", "Transverse: vibration perpendicular to direction of travel; longitudinal: parallel to direction", "Transverse waves are slower than longitudinal waves", "Transverse waves carry energy; longitudinal waves don't"], ans:1, exp:"<strong>Transverse: vibration ⊥ direction.</strong> Longitudinal: vibration ∥ direction. e.g. Light = transverse. Sound = longitudinal."},
  {topic:"Scientific Skills", q:"Why should an experiment be repeated?", opts:["To check for consistency and identify anomalies — improves reliability", "To save time", "Because one result is never recorded", "To get a different result"], ans:0, exp:"Repeating improves <strong>reliability</strong> — allows anomalies to be identified and means to be calculated."},
  {topic:"Chemical Reactions", q:"Iron reacts with oxygen. Name the product.", opts:["Iron oxide — metal + oxygen → metal oxide", "Iron hydroxide", "Iron carbonate", "Iron sulphide"], ans:0, exp:"Metal + oxygen → metal <strong>oxide</strong>. Iron + oxygen → iron oxide."},
  {topic:"Electricity", q:"A 60W bulb operates at 240V. What current flows through it?", opts:["0.25A", "4A", "14400A", "0.004A"], ans:0, exp:"<strong>P = IV → I = P/V = 60/240 = 0.25A</strong>"},
  {topic:"Acids and Alkalis", q:"A solution has pH 3. Is it weakly or strongly acidic?", opts:["Weakly alkaline — just below 7", "Weakly — pH 3 is close to neutral", "Strongly — pH 3 is well below 7", "Neutral — pH 3 is close enough to 7"], ans:2, exp:"<strong>pH 3 is strongly acidic</strong> — well below neutral (7). Weakly acidic would be pH 5–6."},
  {topic:"Chemical Reactions", q:"What type of reaction is combustion?", opts:["Exothermic — releases energy as heat and light", "Decomposition — breaks down into simpler substances", "Neutralisation — produces salt and water", "Endothermic — takes in energy"], ans:0, exp:"<strong>Combustion = exothermic.</strong> Fuel + oxygen → carbon dioxide + water (+ energy released)."},
  {topic:"Forces and Motion", q:"Mass on Earth is 70kg. Mass on the Moon is:", opts:["112kg", "70kg — mass never changes, only weight changes", "1.6kg", "11.2kg"], ans:1, exp:"<strong>Mass never changes</strong> — it's the amount of matter. Only weight changes with gravity."},
  {topic:"Plants and Ecosystems", q:"Why do top predators have the highest toxin concentration in bioaccumulation?", opts:["They eat the most toxic food", "Toxins don't break down — they accumulate at each level, and top predators eat many prey organisms, concentrating toxins further", "They live longest", "They produce more toxins"], ans:1, exp:"<strong>Toxins don't break down + each level eats many from below</strong> = concentration multiplies up the food chain."},
  {topic:"Acids and Alkalis", q:"Sulphuric acid reacts with zinc. The salt formed is:", opts:["Zinc carbonate", "Zinc chloride", "Zinc nitrate", "Zinc sulphate"], ans:3, exp:"H₂SO₄ → sulphate. Zinc + sulphate = <strong>zinc sulphate</strong>."},
  {topic:"Electricity", q:"What is electrical power and its formula?", opts:["The resistance of a component — P = V/I", "Rate of energy transfer — P = IV (Power = current × voltage)", "Total charge in a circuit — P = Q/t", "Energy used per reaction — P = E/C"], ans:1, exp:"<strong>Power = current × voltage → P = IV.</strong> Units: watts (W)."},
  {topic:"Plants and Ecosystems", q:"What adaptations help a cactus survive in a desert?", opts:["Deep roots to reach underground water only", "Thick waxy stem to store water, spines to reduce water loss and deter grazing", "Large flat leaves to absorb maximum rainfall", "Thin stem with large surface area to cool down"], ans:1, exp:"<strong>Cactus: thick stem (water storage), waxy coating (reduces evaporation), spines (not leaves, reduces surface area).</strong>"},
  {topic:"Electricity", q:"What is the purpose of a fuse in a circuit?", opts:["To regulate the voltage to a safe level", "To store electrical energy for later use", "To melt and break the circuit if current is dangerously high", "To increase the current to the appliance"], ans:2, exp:"<strong>Fuse melts if current is too high</strong>, breaking the circuit and preventing fires or damage."},
  {topic:"Plants and Ecosystems", q:"Why do plants need magnesium?", opts:["For healthy roots", "To make chlorophyll — without Mg, leaves turn yellow", "For healthy flowers", "For protein production"], ans:1, exp:"Magnesium is needed <strong>to make chlorophyll</strong>."},
  {topic:"Electricity", q:"Using V = IR, what is the voltage if current = 3A and resistance = 8Ω?", opts:["24V", "0.375V", "5V", "11V"], ans:0, exp:"<strong>V = I × R = 3 × 8 = 24V</strong>"},
  {topic:"Waves and Light", q:"How do seismic P-waves and S-waves differ?", opts:["S-waves are faster; P-waves arrive second at seismometers", "P-waves travel only in solids; S-waves in liquids only", "P-waves are faster and longitudinal; S-waves are slower and transverse", "Both are transverse but P-waves have higher frequency"], ans:2, exp:"<strong>P-waves: longitudinal, faster, travel through solids and liquids. S-waves: transverse, slower, only through solids.</strong>"},
  {topic:"Electricity", q:"What is the unit of potential difference?", opts:["Ampere (A)", "Volt (V)", "Watt (W)", "Ohm (Ω)"], ans:1, exp:"Potential difference is measured in <strong>volts (V)</strong>."},
  {topic:"Waves and Light", q:"What are the primary colours of light?", opts:["Cyan, magenta, yellow", "Red, orange, violet", "Red, yellow, blue", "Red, green, blue — combine to make white light"], ans:3, exp:"Primary colours of light: <strong>Red, Green, Blue (RGB)</strong>."},
  {topic:"Electricity", q:"What is charge and what is its unit?", opts:["The energy transferred per second — watts", "Energy stored in a battery — joules", "The force between charged particles — newtons", "The flow of electrons — measured in coulombs (C)"], ans:3, exp:"<strong>Charge = flow of electrons, measured in coulombs (C).</strong> Q = It (charge = current × time)"},
  {topic:"Scientific Skills", q:"What does 'validity' mean in an experiment?", opts:["How many times it was repeated", "Whether it was done quickly", "Whether the experiment actually tests what it claims to test — controlled variables ensure validity", "How accurate the equipment is"], ans:2, exp:"Validity = <strong>the experiment actually tests what it claims to</strong> — ensured by controlling all variables except the independent one."},
  {topic:"Waves and Light", q:"Red + Blue light produces:", opts:["Yellow", "Magenta", "Cyan", "White"], ans:1, exp:"Red + Blue = <strong>Magenta</strong>."},
  {topic:"Scientific Skills", q:"What is the difference between a prediction and a hypothesis?", opts:["Hypothesis explains WHY; prediction states WHAT will happen", "They are the same thing in science", "Prediction is tested; hypothesis is not", "Hypothesis must include numbers; prediction does not"], ans:0, exp:"<strong>Hypothesis = explanatory statement. Prediction = specific expected outcome</strong> based on the hypothesis."},
  {topic:"Acids and Alkalis", q:"How do you test for CO₂ gas?", opts:["It turns litmus paper red", "Bubble through limewater — turns milky/cloudy if CO₂ present", "It relights a glowing splint", "It turns universal indicator green"], ans:1, exp:"<strong>Limewater test</strong>: bubble gas through — turns milky/cloudy if CO₂ is present."},
  {topic:"Acids and Alkalis", q:"Which of these is a strong acid?", opts:["Hydrochloric acid", "Ethanoic acid", "Carbonic acid", "Citric acid"], ans:0, exp:"<strong>Hydrochloric acid (HCl) is a strong acid</strong> — fully ionises. Citric, ethanoic and carbonic are weak acids."},
  {topic:"Scientific Skills", q:"A student measures the length of a spring. The ruler reads 8.3cm. This is the:", opts:["Hypothesis", "Dependent variable — the measurement taken as a result", "Independent variable", "Control variable"], ans:1, exp:"The spring length is the <strong>dependent variable</strong> — what is measured as a result of the experiment."},
  {topic:"Waves and Light", q:"Why can't sound travel through a vacuum?", opts:["Sound needs particles to vibrate — a vacuum has no particles", "Sound waves are transverse and need a surface to reflect from", "Sound waves are absorbed by empty space", "Sound travels too slowly to cross empty space"], ans:0, exp:"<strong>Sound needs particles to vibrate and transfer energy.</strong> A vacuum has no particles, so sound cannot travel."},
  {topic:"Forces and Motion", q:"Why do larger surface areas experience more air resistance?", opts:["Larger surfaces have more mass to slow down", "Larger objects always move more slowly", "A larger surface collides with more air particles per second", "Air resistance is proportional to the object's weight"], ans:2, exp:"<strong>Larger surface = more air particle collisions per second</strong> = greater drag force."},
  {topic:"Acids and Alkalis", q:"What is the advantage of litmus paper?", opts:["It is more accurate than a pH probe", "It is quick and simple to use", "It shows the exact strength of an acid", "It gives a numerical pH value"], ans:1, exp:"Litmus paper is <strong>quick and simple</strong> — but only shows acid/alkali, not exact strength."},
  {topic:"Scientific Skills", q:"What is a 'causal relationship' in science?", opts:["When a result is consistently reproduced", "When two variables change at the same time by coincidence", "When two factors are linked but neither causes the other", "When changing one variable directly CAUSES a change in another"], ans:3, exp:"<strong>Causal = one variable directly causes change in another.</strong> Correlation alone does not prove causation."},
  {topic:"Scientific Skills", q:"Why do scientists use a control in an experiment?", opts:["To make the experiment quicker", "To increase the sample size", "To compare results against — shows what happens without the independent variable", "To ensure the experiment is safe"], ans:2, exp:"<strong>Control = baseline for comparison</strong> — shows the effect is due to the independent variable, not other factors."},
  {topic:"Waves and Light", q:"Green + Blue light produces:", opts:["Magenta", "Yellow", "Cyan", "White"], ans:2, exp:"Green + Blue = <strong>Cyan</strong>."},
  {topic:"Waves and Light", q:"An opaque object placed in light creates:", opts:["A shadow — opaque objects transmit no light", "A spectrum", "A refraction", "A reflection"], ans:0, exp:"Opaque = no light transmitted → <strong>shadow</strong> formed behind the object."},
  {topic:"Electricity", q:"What is the difference between a conductor and an insulator?", opts:["Conductors allow electrons to flow freely; insulators resist electron flow", "Conductors carry DC only; insulators only work with AC", "Conductors are used in plugs; insulators in wires", "Conductors are metals; insulators are plastics only"], ans:0, exp:"<strong>Conductor: electrons flow freely (metals). Insulator: electrons cannot flow (rubber, plastic, glass).</strong>"},
  {topic:"Waves and Light", q:"A green object is placed under red light only. What colour does it appear?", opts:["Yellow", "Green", "Black — no green light to reflect, so it absorbs all light", "Red"], ans:2, exp:"Green object reflects green only. Under red light: <strong>no green to reflect → appears black</strong>."},
  {topic:"Forces and Motion", q:"What is the difference between mass and weight?", opts:["They are the same — both measured in kilograms", "Weight is constant; mass changes with gravity", "Mass = amount of matter (kg); weight = gravitational force on mass (N)", "Mass is measured in N; weight in kg"], ans:2, exp:"<strong>Mass = matter (kg, constant). Weight = gravitational force (N, varies with gravity).</strong>"},
  {topic:"Scientific Skills", q:"What is a line of best fit?", opts:["The steepest line possible", "A smooth line/curve through the general trend with roughly equal points above and below", "A line connecting every data point", "A line through the first and last points only"], ans:1, exp:"Line of best fit = <strong>smooth line through the general trend</strong> — does NOT connect every point."},
  {topic:"Forces and Motion", q:"A car travelling at 20 m/s stops in 5 seconds. Calculate its deceleration.", opts:["100 m/s²", "4 m/s²", "0.25 m/s²", "25 m/s²"], ans:1, exp:"<strong>a = Δv/t = (0−20)/5 = −4 m/s²</strong> (deceleration of 4 m/s²)"},
  {topic:"Acids and Alkalis", q:"Magnesium reacts with sulfuric acid. What salt is formed?", opts:["Magnesium sulfate", "Magnesium nitrate", "Magnesium chloride", "Magnesium oxide"], ans:0, exp:"<strong>Acid names the salt.</strong> Sulfuric acid → sulfate. Mg + H₂SO₄ → MgSO₄ (magnesium sulfate)"},
  {topic:"Waves and Light", q:"The angle of incidence is measured from:", opts:["The surface", "The horizontal", "The normal — the line at 90° to the surface", "The reflected ray"], ans:2, exp:"Angles of incidence and reflection are both measured from <strong>the normal</strong> (90° to the surface)."},
  {topic:"Plants and Ecosystems", q:"What is a 'niche' in ecology?", opts:["The range of habitats an organism can survive in", "The role an organism plays and its specific set of resources in the ecosystem", "The physical location where an organism lives", "The number of organisms in a population"], ans:1, exp:"<strong>Niche = the specific role + resources an organism uses</strong> — two species cannot occupy exactly the same niche."},
  {topic:"Electricity", q:"If voltage stays constant and resistance doubles, current:", opts:["Doubles", "Halves — I = V ÷ R, so doubling R halves I", "Quadruples", "Stays the same"], ans:1, exp:"I = V ÷ R. Double R → <strong>I halves</strong>."},
  {topic:"Waves and Light", q:"What is rarefaction in a sound wave?", opts:["The echo of a sound", "Particles compressed together", "The amplitude of a wave", "A region where particles are spread apart — low pressure"], ans:3, exp:"Rarefaction = <strong>region where particles are spread apart</strong> — low pressure zone in a sound wave."},
  {topic:"Forces and Motion", q:"Pressure = force ÷ area. If force = 400N and area = 0.5m², pressure is:", opts:["800Pa", "200Pa", "0.00125Pa", "400Pa"], ans:0, exp:"P = F ÷ A = 400 ÷ 0.5 = <strong>800Pa</strong>."},
  {topic:"Forces and Motion", q:"A car has mass 1000kg and accelerates at 3 m/s². What force acts on it?", opts:["997N", "30N", "333.3N", "3000N"], ans:3, exp:"<strong>F = ma = 1000 × 3 = 3000N</strong>"},
  {topic:"Chemical Reactions", q:"In a word equation, what do the substances on the LEFT of the arrow represent?", opts:["Both reactants and products", "Products", "Catalysts", "Reactants — what you start with before the reaction"], ans:3, exp:"Left of arrow = <strong>reactants</strong> (starting materials). Right = products (what is made)."},
  {topic:"Acids and Alkalis", q:"What are the products of: acid + alkali?", opts:["Salt + CO₂", "Base + water", "Salt + oxygen", "Salt + water — neutralisation always gives these two products"], ans:3, exp:"Neutralisation: acid + alkali → <strong>salt + water</strong>."},
  {topic:"Plants and Ecosystems", q:"What is a 'producer' in a food chain?", opts:["An animal that produces young", "A large predator at the top of the food chain", "A plant or organism that makes its own food through photosynthesis", "A decomposer that breaks down dead material"], ans:2, exp:"<strong>Producer = organism that makes own food via photosynthesis</strong> — the start of every food chain."},
  {topic:"Waves and Light", q:"The law of reflection states:", opts:["Reflected ray is always horizontal", "Angle of incidence = angle of reflection (both from the normal)", "Light always reflects at 45°", "Angle of incidence = 90°"], ans:1, exp:"<strong>Angle of incidence = angle of reflection</strong>, both measured from the normal."},
  {topic:"Acids and Alkalis", q:"Sulphuric acid reacts with copper oxide. Name the salt formed.", opts:["Copper carbonate", "Copper sulphate — H₂SO₄ gives sulphate salts", "Copper nitrate", "Copper chloride"], ans:1, exp:"H₂SO₄ → sulphate. Copper from copper oxide. Salt = <strong>copper sulphate</strong>."},
  {topic:"Waves and Light", q:"Higher frequency sound has:", opts:["Lower pitch", "Higher pitch — more waves per second = squeakier sound", "Lower volume", "Greater amplitude"], ans:1, exp:"Higher frequency = <strong>higher pitch</strong>."},
  {topic:"Forces and Motion", q:"Weight is measured in:", opts:["Kilograms (kg)", "Newtons (N) — weight is a force", "Pascal (Pa)", "Joules (J)"], ans:1, exp:"Weight is a force, measured in <strong>Newtons (N)</strong>. Mass is measured in kg."},
  {topic:"Acids and Alkalis", q:"What indicator turns red in acid and blue in alkali?", opts:["Litmus", "Methyl orange", "Universal indicator", "Phenolphthalein"], ans:0, exp:"<strong>Litmus: red in acid, blue in alkali.</strong> Universal indicator shows a range of colours."},
  {topic:"Scientific Skills", q:"What does 'peer review' mean in science?", opts:["Scientists repeating experiments to check they are reliable", "A teacher marking a student's experiment", "Other scientists evaluating research before publication to verify validity", "Students checking each other's lab reports"], ans:2, exp:"<strong>Peer review = other scientists evaluating work</strong> before publication — checks methodology, analysis and conclusions."},
  {topic:"Waves and Light", q:"What does a decibel (dB) measure?", opts:["Wave speed", "Loudness (amplitude) of sound", "Wavelength", "Frequency"], ans:1, exp:"Decibels = <strong>loudness of sound</strong>. A measure of amplitude."},
  {topic:"Electricity", q:"A resistor has V=9V and I=3A. Its resistance is:", opts:["3Ω", "6Ω", "0.33Ω", "27Ω"], ans:0, exp:"R = V ÷ I = 9 ÷ 3 = <strong>3Ω</strong>."},
  {topic:"Plants and Ecosystems", q:"What do decomposers do in an ecosystem?", opts:["Produce food through photosynthesis", "Convert nitrogen in the air into soil nutrients", "Consume living plants as the first animals in a chain", "Break down dead organisms and return nutrients to the soil"], ans:3, exp:"<strong>Decomposers break down dead organic matter</strong>, releasing nutrients back into the soil for plants to use."},
  {topic:"Plants and Ecosystems", q:"Why do farmers add fertilisers?", opts:["To water crops", "To make soil more acidic", "To replace mineral ions removed by crops, improving yield", "To kill weeds"], ans:2, exp:"Fertilisers <strong>replace mineral ions</strong> removed by crops — restores fertility and increases yield."},
  {topic:"Acids and Alkalis", q:"What is the pH of a neutral solution?", opts:["6", "7", "8", "0"], ans:1, exp:"<strong>Neutral = pH 7.</strong> Below 7 = acid. Above 7 = alkali."},
  {topic:"Forces and Motion", q:"A force of 300N is applied 0.8m from a pivot. What is the moment?", opts:["240 Nm", "300.8 Nm", "375 Nm", "37.5 Nm"], ans:0, exp:"M = F × d = 300 × 0.8 = <strong>240 Nm</strong>."},
  {topic:"Electricity", q:"What happens to the brightness of bulbs in a series circuit if one bulb is removed?", opts:["The remaining bulbs get dimmer", "The remaining bulbs stay the same brightness", "The remaining bulbs get brighter", "The circuit breaks and all bulbs go out"], ans:3, exp:"<strong>Series circuit: remove one bulb = circuit breaks.</strong> All bulbs go out — there is no longer a complete circuit."},
  {topic:"Forces and Motion", q:"On the Moon (g = 1.6 N/kg), what is the weight of a 50kg person?", opts:["80N", "500N", "31.25N", "50N"], ans:0, exp:"W = m × g = 50 × 1.6 = <strong>80N</strong>."},
  {topic:"Plants and Ecosystems", q:"What does chlorophyll do?", opts:["Absorbs light energy for photosynthesis — gives plants their green colour", "Makes oxygen", "Absorbs water", "Stores glucose"], ans:0, exp:"Chlorophyll <strong>absorbs light energy</strong> for photosynthesis and reflects green light — making plants look green."},
  {topic:"Scientific Skills", q:"To find a mean from repeated results, you:", opts:["Take the middle result", "Add all results and divide by the number of results", "Take the lowest result", "Take the highest result"], ans:1, exp:"Mean = <strong>sum of all results ÷ number of results</strong>."},
  {topic:"Scientific Skills", q:"What is 'systematic error' in an experiment?", opts:["An error caused by faulty equipment only", "An error made when recording data", "A random mistake made once", "A consistent error that shifts all results in the same direction"], ans:3, exp:"<strong>Systematic error = consistent error in the same direction</strong> — e.g. a balance not zeroed shifts all readings by the same amount."},
  {topic:"Plants and Ecosystems", q:"In a food chain, what do the arrows represent?", opts:["The direction of energy transfer — from food to feeder", "Population changes", "Movement of animals", "What eats what"], ans:0, exp:"Arrows show <strong>direction of energy transfer</strong> — from food to the organism that eats it."},
  {topic:"Forces and Motion", q:"How do you calculate speed from a distance-time graph?", opts:["The x-intercept of the line", "The height (y-value) at any point", "The area under the graph", "The gradient (rise ÷ run)"], ans:3, exp:"<strong>Speed = gradient of distance-time graph</strong> (distance ÷ time)."},
  {topic:"Forces and Motion", q:"A moment of 300Nm acts at 2.5m from pivot. Force required:", opts:["120N", "297.5N", "120,000N", "750N"], ans:0, exp:"F = M ÷ d = 300 ÷ 2.5 = <strong>120N</strong>."},
  {topic:"Scientific Skills", q:"A student's result is far from the others on a graph. This is called:", opts:["An error", "An outlier/anomaly", "An inaccuracy", "A systematic error"], ans:1, exp:"<strong>Outlier/anomaly = a result that doesn't fit the pattern.</strong> Should be checked and may be excluded with justification."},
  {topic:"Electricity", q:"An ammeter must be placed in a circuit:", opts:["In series — in line so current flows through it", "Before the battery only", "In parallel across the component", "Anywhere in the circuit"], ans:0, exp:"Ammeter placed <strong>in series</strong> — in line with the component."},
  {topic:"Forces and Motion", q:"What is 'resultant force'?", opts:["The force in the direction of motion", "The largest force acting on an object", "The force that opposes motion", "The combined effect of all forces — their vector sum"], ans:3, exp:"<strong>Resultant force = vector sum of all forces</strong> — if balanced, resultant = 0 and there is no acceleration."},
  {topic:"Electricity", q:"Two resistors of 4Ω and 6Ω are connected in series. What is the total resistance?", opts:["10Ω", "1.2Ω", "24Ω", "2.4Ω"], ans:0, exp:"<strong>Series: R_total = R₁ + R₂ = 4 + 6 = 10Ω</strong>"},
  {topic:"Forces and Motion", q:"On a velocity-time graph, what does a negative gradient indicate?", opts:["The object is moving backwards", "The object is accelerating", "The object is decelerating", "The object has stopped completely"], ans:2, exp:"<strong>Negative gradient on v-t graph = deceleration</strong> — velocity decreasing over time."},
  {topic:"Forces and Motion", q:"For a see-saw to balance, total clockwise moments must equal:", opts:["Zero", "Half the total force", "The weight of the see-saw", "Total anticlockwise moments"], ans:3, exp:"Principle of moments: <strong>clockwise = anticlockwise moments</strong> for balance."},
  {topic:"Scientific Skills", q:"Why is it important to write a conclusion that refers back to the hypothesis?", opts:["To show whether the evidence supports or refutes the original explanation", "To connect the experiment to its real-world application", "To make the conclusion longer", "To include more scientific vocabulary"], ans:0, exp:"<strong>Conclusion must evaluate the hypothesis</strong> — science builds knowledge by testing explanations against evidence."},
  {topic:"Acids and Alkalis", q:"What is formed when an acid reacts with a metal carbonate?", opts:["Salt + hydrogen only", "Salt + water + carbon dioxide", "Salt + water only", "Metal oxide + water"], ans:1, exp:"<strong>Acid + carbonate → salt + water + CO₂.</strong> CO₂ turns limewater milky."},
  {topic:"Scientific Skills", q:"What type of graph should be used when both variables are continuous?", opts:["Scatter graph", "Line graph", "Bar chart", "Pie chart"], ans:1, exp:"<strong>Both continuous = line graph.</strong> Discrete categories = bar chart. Correlation = scatter graph."},
  {topic:"Plants and Ecosystems", q:"Where does a plant absorb water for photosynthesis?", opts:["Through leaves", "Through flowers", "Through stomata", "Through roots — water absorbed from the soil"], ans:3, exp:"Water for photosynthesis is absorbed <strong>through roots</strong> from the soil."},
  {topic:"Forces and Motion", q:"If a velocity-time graph shows a horizontal line, the object is:", opts:["Moving at constant velocity", "Decelerating", "Accelerating uniformly", "Stationary"], ans:0, exp:"<strong>Horizontal line on v-t graph = constant velocity</strong> (zero acceleration)."},
  {topic:"Chemical Reactions", q:"What does it mean when we say a reaction is reversible?", opts:["Products can reform reactants under different conditions", "The reaction can be sped up or slowed down", "The reaction occurs in both directions simultaneously", "The reaction produces no new substances"], ans:0, exp:"<strong>Reversible = products can reform reactants</strong> under different conditions. Shown by ⇌ symbol."},
  {topic:"Forces and Motion", q:"What is the principle of conservation of momentum?", opts:["Momentum is always lost in collisions", "Fast objects have less momentum than slow heavy ones", "In a closed system, total momentum before = total momentum after any collision", "Momentum can be created by applying a large force"], ans:2, exp:"<strong>Conservation of momentum: total momentum before = total momentum after</strong> in a closed system (no external forces)."},
  {topic:"Waves and Light", q:"What is the relationship between wave speed, frequency and wavelength?", opts:["Speed = frequency ÷ wavelength", "Frequency = speed × wavelength", "Speed = frequency + wavelength", "Speed = frequency × wavelength"], ans:3, exp:"<strong>v = fλ</strong> (wave speed = frequency × wavelength)"},
  {topic:"Chemical Reactions", q:"What is a measuring cylinder used for?", opts:["Heating substances", "Measuring mass", "Measuring volume of liquid accurately", "Measuring temperature"], ans:2, exp:"Measuring cylinder = <strong>measuring volume of liquid accurately</strong>. Not a beaker."},
  {topic:"Chemical Reactions", q:"Which of these is a chemical change?", opts:["Melting butter", "Dissolving sugar", "Burning paper — new substances (CO₂, ash, water) are formed", "Cutting wood"], ans:2, exp:"Burning = <strong>chemical change</strong>. New substances formed, irreversible."},
  {topic:"Waves and Light", q:"What is 'total internal reflection' used for?", opts:["Splitting white light into a spectrum", "Transmitting data in optical fibres", "Focusing light in a camera lens", "Making lenses for telescopes and microscopes"], ans:1, exp:"<strong>Total internal reflection is used in optical fibres</strong> — light bounces along the fibre carrying data at the speed of light."},
  {topic:"Waves and Light", q:"A wave has frequency 400Hz and wavelength 0.85m. What is its speed?", opts:["0.002 m/s", "340 m/s", "400.85 m/s", "470.6 m/s"], ans:1, exp:"v = f × λ = 400 × 0.85 = <strong>340 m/s</strong> (speed of sound)."},
  {topic:"Electricity", q:"Two objects with opposite charges will:", opts:["Create a spark only", "Repel each other", "Attract each other", "Have no effect on each other"], ans:2, exp:"Opposite charges <strong>attract</strong>. Like charges repel."},
  {topic:"Chemical Reactions", q:"What does a catalyst do in a chemical reaction?", opts:["Increases the temperature of the reaction", "Changes the products formed in the reaction", "Adds more reactant to speed things up", "Increases the rate without being used up"], ans:3, exp:"<strong>Catalyst = speeds up rate without being consumed.</strong> It lowers activation energy."},
  {topic:"Chemical Reactions", q:"In an exothermic reaction, the temperature of the surroundings:", opts:["First decreases then increases", "Decreases", "Stays the same", "Increases — energy is released to the surroundings"], ans:3, exp:"Exothermic = energy released → <strong>surroundings get hotter</strong>."},
  {topic:"Scientific Skills", q:"When should you use a bar chart rather than a line graph?", opts:["When there are more than 5 data points", "When both variables are continuous", "Always", "When the independent variable is categoric (e.g. type of material, name of substance)"], ans:3, exp:"<strong>Bar chart</strong> = when the independent variable is categoric. Line graph = both variables continuous."},
  {topic:"Plants and Ecosystems", q:"What happens to energy as you move up a food chain?", opts:["Energy increases at each level", "Energy doubles at each trophic level", "Energy stays the same throughout the chain", "Most energy is lost at each level — only about 10% passes on"], ans:3, exp:"<strong>About 90% of energy is lost at each level</strong> (heat, movement, uneaten parts). Only ~10% passes on."},
  {topic:"Plants and Ecosystems", q:"What is transpiration in plants?", opts:["The absorption of water through roots", "The loss of water vapour through leaf stomata", "The process of making food using sunlight", "The transport of sugars through the phloem"], ans:1, exp:"<strong>Transpiration = water loss as vapour through stomata.</strong> Creates a 'pull' that draws water up the xylem."},
  {topic:"Forces and Motion", q:"A skydiver reaches terminal velocity. What does this tell us about the forces?", opts:["Air resistance equals weight — resultant force is zero", "Air resistance is greater than weight", "Weight is greater than air resistance", "Weight is zero at terminal velocity"], ans:0, exp:"<strong>Terminal velocity: weight = air resistance</strong> → resultant force = 0 → no acceleration → constant speed."},
  {topic:"Waves and Light", q:"What happens to the wavelength of light when it enters a denser medium?", opts:["Wavelength decreases", "Wavelength stays the same", "Wavelength increases", "Wavelength becomes zero"], ans:0, exp:"<strong>Wavelength decreases when light enters a denser medium</strong> (speed decreases, frequency unchanged). v = fλ → λ = v/f."},
  {topic:"Acids and Alkalis", q:"What is the formula for hydrochloric acid?", opts:["H₂SO₄", "HCl", "HNO₃", "H₂CO₃"], ans:1, exp:"<strong>HCl = hydrochloric acid.</strong> H₂SO₄ = sulfuric. HNO₃ = nitric. H₂CO₃ = carbonic."},
  {topic:"Chemical Reactions", q:"Hand warmers are an example of:", opts:["A reversible reaction", "A physical change", "An endothermic reaction", "An exothermic reaction — they release heat energy to the surroundings"], ans:3, exp:"Hand warmers = <strong>exothermic</strong> — chemical reaction releases heat to the surroundings."},
  {topic:"Electricity", q:"What does a voltmeter measure and how is it connected?", opts:["Voltage — in parallel with the component", "Resistance — in series with the component", "Power — in parallel with the circuit", "Current — in series with the component"], ans:0, exp:"<strong>Voltmeter measures voltage — connected in parallel</strong> (across the component)."},
  {topic:"Scientific Skills", q:"The independent variable goes on which axis?", opts:["y-axis (vertical)", "Either — it doesn't matter", "The title", "x-axis (horizontal)"], ans:3, exp:"<strong>Independent variable → x-axis (horizontal).</strong> Dependent → y-axis."},
  {topic:"Scientific Skills", q:"Why should a sample size be as large as possible?", opts:["To make graphs easier to draw", "To make the experiment take longer", "To reduce the effect of random variation and increase reliability", "To use more equipment and show thorough work"], ans:2, exp:"<strong>Large sample = reduces random variation</strong> and increases reliability of conclusions."},
  {topic:"Acids and Alkalis", q:"What is 'base' in chemistry?", opts:["A substance dissolved in water that gives OH⁻ ions", "Any liquid with pH below 7", "Only liquids that turn litmus blue", "A substance that neutralises an acid — includes metal oxides and hydroxides"], ans:3, exp:"<strong>Base = substance that neutralises acid.</strong> An alkali is a soluble base (dissolves in water). Metal oxides are bases."},
  {topic:"Electricity", q:"Which particles move to create static electricity?", opts:["Ions", "Protons", "Neutrons", "Electrons — they transfer from one material to the other"], ans:3, exp:"<strong>Electrons</strong> transfer during rubbing. Protons stay fixed."},
  {topic:"Electricity", q:"In a series circuit, what happens to the current at each component?", opts:["It stays the same throughout the circuit", "It decreases at each component", "It splits equally at each component", "It increases at each component"], ans:0, exp:"<strong>Series circuit: current is the same throughout.</strong> Voltage splits across components."},
  {topic:"Scientific Skills", q:"Why must a fair test change only one variable?", opts:["To make the experiment easier to carry out", "Because changing multiple variables is not allowed in school labs", "To reduce the amount of equipment needed", "So results can be attributed to that single variable and conclusions are valid"], ans:3, exp:"<strong>One variable changed = results attributable to that variable.</strong> Multiple changes make it impossible to know what caused the effect."},
  {topic:"Waves and Light", q:"Greater amplitude means:", opts:["Higher pitch", "Faster wave speed", "Louder sound — more energy in the wave", "Lower frequency"], ans:2, exp:"Greater amplitude = <strong>louder sound</strong> (more energy)."},
  {topic:"Acids and Alkalis", q:"What colour does universal indicator turn at pH 7?", opts:["Orange", "Purple", "Green — pH 7 is neutral", "Red"], ans:2, exp:"pH 7 = neutral → <strong>green</strong> on universal indicator."},
  {topic:"Plants and Ecosystems", q:"What is the role of chlorophyll in photosynthesis?", opts:["To release oxygen into the atmosphere", "To store the glucose produced", "To absorb light energy for photosynthesis", "To provide carbon dioxide for the reaction"], ans:2, exp:"<strong>Chlorophyll absorbs light energy</strong> (mainly red and blue wavelengths) to drive photosynthesis."},
  {topic:"Acids and Alkalis", q:"Calcium carbonate reacts with hydrochloric acid. What are the products?", opts:["Calcium hydroxide + hydrogen", "Calcium sulfate + water", "Calcium chloride + water + CO₂", "Calcium oxide + chlorine"], ans:2, exp:"<strong>CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.</strong> Carbonate + acid = salt + water + CO₂."},
  {topic:"Plants and Ecosystems", q:"In a food chain, producers are:", opts:["Organisms that make their own food through photosynthesis — plants, algae", "Animals at the top", "Decomposers", "Animals that eat plants"], ans:0, exp:"Producers = <strong>organisms that make their own food through photosynthesis</strong> — all food chains start here."},
  {topic:"Waves and Light", q:"A white object under blue light only appears:", opts:["Red", "White", "Blue — it reflects all colours but only blue is available", "Black"], ans:2, exp:"White reflects all colours. Only blue light present → reflects blue → appears <strong>blue</strong>."},
  {topic:"Plants and Ecosystems", q:"What is a secondary consumer?", opts:["An animal that eats primary consumers", "A plant", "A decomposer", "An animal that eats producers"], ans:0, exp:"Secondary consumer = <strong>eats primary consumers</strong>. Primary consumer eats the producer."},
  {topic:"Plants and Ecosystems", q:"Why do populations of prey and predators fluctuate together in a cycle?", opts:["They migrate to the same areas at the same time", "Both populations are affected by the same seasonal changes", "They compete for the same resources in the ecosystem", "More prey = more food for predators; predator increase reduces prey; cycle repeats"], ans:3, exp:"<strong>Predator-prey cycle:</strong> more prey → more predators → less prey → fewer predators → more prey... and so on."},
  {topic:"Scientific Skills", q:"What does a steep gradient on a distance-time graph tell you?", opts:["The object has stopped", "The object is accelerating", "The object is moving fast", "The object is moving slowly"], ans:2, exp:"<strong>Steep gradient on distance-time = fast speed.</strong> Horizontal line = stationary. Curved = changing speed."},
  {topic:"Chemical Reactions", q:"Sports cold packs are an example of:", opts:["An endothermic reaction — they absorb energy and get cold", "Neutralisation", "An exothermic reaction", "A physical change"], ans:0, exp:"Cold packs = <strong>endothermic</strong> — absorb energy from surroundings, getting cold."},
  {topic:"Forces and Motion", q:"What does Newton's First Law state?", opts:["The greater the mass, the greater the force needed", "Force = mass × acceleration", "For every action there is an equal and opposite reaction", "An object stays at rest or uniform motion unless acted on by a resultant force"], ans:3, exp:"<strong>Newton's 1st Law: no resultant force = no change in motion.</strong> Objects don't need a force to keep moving."},
  {topic:"Waves and Light", q:"How does increasing frequency affect the energy of an electromagnetic wave?", opts:["Higher frequency = lower energy", "Higher frequency = higher energy", "Frequency and energy are unrelated", "Higher frequency = same energy but more waves"], ans:1, exp:"<strong>Higher frequency = higher energy</strong> (E = hf). This is why gamma rays are more ionising than radio waves."},
  {topic:"Chemical Reactions", q:"What is precipitation in chemistry?", opts:["When a liquid evaporates to form a gas", "When two solutions react to form an insoluble solid", "When a solid melts to form a liquid", "When a solid dissolves in a liquid"], ans:1, exp:"<strong>Precipitation = two solutions react to form an insoluble solid (precipitate).</strong>"},
  {topic:"Acids and Alkalis", q:"What does a pH probe do that universal indicator cannot?", opts:["It tests solids", "It changes colour", "It gives a precise numerical pH reading — more accurate than colour comparison", "It works faster"], ans:2, exp:"A pH probe gives a <strong>precise numerical pH reading</strong> — more accurate than colour matching with UI."},
  {topic:"Acids and Alkalis", q:"The product of acid + metal oxide is:", opts:["Salt + hydrogen", "Salt + CO₂", "Salt + water", "Base + water"], ans:2, exp:"Acid + metal oxide → <strong>salt + water</strong>."},
  {topic:"Electricity", q:"What is the unit of electrical resistance?", opts:["Volt", "Ampere", "Ohm", "Watt"], ans:2, exp:"<strong>Resistance is measured in Ohms (Ω).</strong> Named after Georg Ohm."},
  {topic:"Waves and Light", q:"Which type of electromagnetic wave has the highest frequency?", opts:["Visible light", "Radio waves", "X-rays", "Gamma rays"], ans:3, exp:"<strong>Gamma rays have the highest frequency</strong> (and shortest wavelength) in the EM spectrum."},
  {topic:"Electricity", q:"What is the formula for resistance?", opts:["R = V ÷ I", "R = I + V", "R = I ÷ V", "R = V × I"], ans:0, exp:"<strong>R = V ÷ I</strong> (Ohm's Law). Resistance = Voltage ÷ Current."},
  {topic:"Waves and Light", q:"What type of radiation does the Sun primarily emit that reaches Earth's surface?", opts:["Mainly X-rays and ultraviolet only", "Mainly gamma rays and X-rays", "Mainly radio waves and microwaves", "Mainly visible light, UV and infrared"], ans:3, exp:"<strong>Sun emits mainly visible light, UV and infrared</strong> that reaches Earth's surface (atmosphere absorbs most UV)."},
  {topic:"Waves and Light", q:"A wave has speed 1200 m/s and wavelength 0.4m. What is the frequency?", opts:["480,000Hz", "30Hz", "3000Hz", "480Hz"], ans:2, exp:"f = v ÷ λ = 1200 ÷ 0.4 = <strong>3000Hz</strong>."},
  {topic:"Scientific Skills", q:"The dependent variable goes on which axis of a graph?", opts:["Either axis", "x-axis (horizontal)", "The title", "y-axis (vertical) — it is what you measure as a result"], ans:3, exp:"Dependent variable → <strong>y-axis (vertical)</strong>. Independent → x-axis."}
  ],
  re: [
  {topic:"Miracles", q:"What is the 'Lourdes' miracle and why is it significant?", opts:["A place where Jesus appeared after the Resurrection", "A site of reported healing miracles since Mary's apparition to Bernadette — tested by the Medical Bureau", "A vision of God reported by multiple witnesses", "A location where the Eucharist is continuously celebrated"], ans:1, exp:"Lourdes: <strong>apparition of Mary to Bernadette (1858); Medical Bureau rigorously investigates claimed healings.</strong> 70 officially verified."},
  {topic:"Oscar Romero", q:"How did Romero die?", opts:["In prison", "Shot at the altar while celebrating Mass — 24 March 1980", "In a car accident", "Natural causes"], ans:1, exp:"Romero was <strong>shot at the altar on 24 March 1980</strong> while celebrating Mass."},
  {topic:"Parables", q:"Why did Jesus use everyday situations in his parables?", opts:["To make his teaching accessible and memorable — everyone could understand farming, family life, travel", "Because he had no other stories", "Because he was a farmer", "To avoid offending religious leaders"], ans:0, exp:"Everyday situations make parables <strong>accessible and memorable</strong> — everyone could relate to farming, families and travel."},
  {topic:"Baptism", q:"What is the significance of the white garment given at Catholic baptism?", opts:["It represents the priest's vestments the child may one day wear", "It keeps the baby warm during the ceremony", "Symbolising purity — the new Christian has put on Christ", "A family heirloom representing Catholic heritage"], ans:2, exp:"<strong>White garment = purity, new creation.</strong> The baptised has 'put on Christ' and risen to new life."},
  {topic:"Oscar Romero", q:"Who was Fr Rutilio Grande?", opts:["A government minister", "A close friend of Romero who was assassinated for defending the rights of the poor — transforming Romero", "The Pope's representative", "Romero's bishop"], ans:1, exp:"Fr Rutilio Grande = <strong>Romero's close friend</strong>, assassinated for working with the poor — his death transformed Romero."},
  {topic:"Baptism", q:"Why do Catholics consider baptism essential for salvation?", opts:["God cannot hear prayers from the unbaptised", "Without baptism a person cannot attend church", "Baptism removes original sin and initiates the person into the Church — essential for salvation", "Baptism is required for all seven sacraments to be valid"], ans:2, exp:"<strong>Baptism removes original sin and initiates into the Church</strong> — Catholics consider it essential for salvation."},
  {topic:"Miracles", q:"How might a sceptic explain miraculous healings naturally?", opts:["The placebo effect, psychosomatic illness, spontaneous remission or misdiagnosis can explain many healings", "Healings are all fabricated by the Church", "Modern medicine is not advanced enough to explain healings", "Doctors are paid to deny that miracles have occurred"], ans:0, exp:"<strong>Sceptical explanations: placebo effect, psychosomatic illness, spontaneous remission, misdiagnosis</strong> — no miracle required."},
  {topic:"Baptism", q:"What does water symbolise in baptism?", opts:["Membership of a specific church building", "Cleansing from sin and new spiritual life", "The Holy Spirit entering the person", "The blessing of the priest or minister"], ans:1, exp:"<strong>Water = cleansing (washing away sin) and new life</strong> — dying to old self and rising with Christ."},
  {topic:"Parables", q:"What does the 'yeast' (leaven) represent in the Parable of the Yeast?", opts:["The Kingdom of God growing from small beginnings through its transformative power", "The religious leaders corrupting Jewish faith", "Evil spreading through society", "The importance of bread in first-century Palestine"], ans:0, exp:"<strong>Yeast = Kingdom of God growing invisibly from tiny beginning to transform everything</strong> — like yeast transforms the whole loaf."},
  {topic:"Prophet Amos", q:"What does Amos say about Israel's worship and why does God reject it?", opts:["The Israelites worship too infrequently and without devotion", "God rejects elaborate worship while social justice is absent — ritual without ethics is meaningless", "The wrong priests are performing the ceremonies", "The worship is too informal and lacks proper ritual"], ans:1, exp:"<strong>God rejects worship while injustice exists</strong> — Amos 5:21-24 shows ethics and worship cannot be separated."},
  {topic:"Prophet Amos", q:"What is the 'Day of the Lord' in Amos and why is his view surprising?", opts:["A future messianic age of peace and justice", "A day of divine judgement — Amos warns it will be darkness not light, even for Israel", "A day of celebration and blessing for all of Israel", "The day Amos received his prophetic calling"], ans:1, exp:"Amos shockingly warns the <strong>Day of the Lord will be judgement for Israel too</strong> — not the victory they expected."},
  {topic:"Miracles", q:"When the disciples saw Jesus calm the storm, what did they say?", opts:["'You are the Messiah'", "'We knew you could do it'", "'What kind of man is this? Even the winds and the waves obey him!'", "'Let's go back to shore'"], ans:2, exp:"The disciples said: <strong>'What kind of man is this? Even the winds and the waves obey him!'</strong> — a moment of awe and growing faith."},
  {topic:"Oscar Romero", q:"What did Romero's beatification (2015) and canonisation (2018) signify?", opts:["That liberation theology is now official Church teaching", "That his theology was entirely orthodox and uncontroversial", "That political activism is required of all Catholic clergy", "That the Church officially recognised him as a martyr killed for his faith — a saint"], ans:3, exp:"<strong>Canonisation as martyr</strong> — the Church officially recognised he was killed in hatred of his faith, specifically his work for justice."},
  {topic:"Miracles", q:"What did Jesus say before raising Lazarus?", opts:["'Follow me'", "'I am the resurrection and the life'", "'Your faith has healed you'", "'Be opened'"], ans:1, exp:"John 11:25: <strong>'I am the resurrection and the life.'</strong> — Jesus reveals his authority over death."},
  {topic:"Acts of Mercy", q:"Why are BOTH Corporal and Spiritual Acts of Mercy needed?", opts:["They aren't — one is enough", "Catholic teaching is about the whole person — body AND soul. Both types of need must be met", "Spiritual Acts are more important", "Catholic teaching says only physical help matters"], ans:1, exp:"Both are needed because <strong>Catholic teaching addresses the whole person</strong> — body and soul, physical and spiritual needs."},
  {topic:"Prophet Amos", q:"What was Amos's occupation before becoming a prophet?", opts:["A scribe", "A soldier", "A shepherd and fig farmer — he was not a professional prophet", "A priest"], ans:2, exp:"Amos was a <strong>shepherd and dresser of sycamore-fig trees</strong> — not professionally trained."},
  {topic:"Acts of Mercy", q:"'Bear wrongs patiently' is which type of Act of Mercy?", opts:["Spiritual — addresses a need of the soul and inner life", "Neither", "Both", "Corporal — physical"], ans:0, exp:"'Bear wrongs patiently' is a <strong>Spiritual Act of Mercy</strong> — it addresses inner, spiritual practice."},
  {topic:"Miracles", q:"Why are miracles described as 'signs' in Catholic teaching?", opts:["Because they cannot be proved", "Because they are in the Bible", "Because they point to Jesus's identity and invite faith — they are not magic tricks", "Because they happen suddenly"], ans:2, exp:"Miracles are <strong>signs</strong> — they point to Jesus's identity and invite faith, not blind proof."},
  {topic:"Key Terms", q:"What is meant by 'redemption' in Christianity?", opts:["Being saved from sin and restored to a right relationship with God", "Performing good deeds to earn God's favour", "Living a morally pure life free from temptation", "Confessing sins to a priest for forgiveness"], ans:0, exp:"<strong>Redemption = being saved from sin through Christ's sacrifice</strong> and restored to relationship with God."},
  {topic:"Acts of Mercy", q:"What are the 'Corporal Works of Mercy' in Catholic teaching?", opts:["Prayers performed to obtain God's mercy", "Spiritual disciplines like fasting and prayer", "Physical actions caring for bodily needs — feed hungry, give drink, clothe, shelter, visit sick/imprisoned, bury dead", "Acts performed in church to receive the sacraments"], ans:2, exp:"<strong>Corporal = bodily works</strong> — feed hungry, give drink, clothe naked, shelter homeless, visit sick, visit imprisoned, bury dead."},
  {topic:"Key Terms", q:"What is 'eschatology'?", opts:["Beliefs about death, judgement and the afterlife", "The study of prayer and its effects", "The study of sacraments and church rituals", "The history of the early Christian church"], ans:0, exp:"<strong>Eschatology = beliefs about last things</strong> — death, judgement, heaven, hell, resurrection, end times."},
  {topic:"Oscar Romero", q:"What is Romero's legacy for Christians today?", opts:["That Latin American Catholicism is superior to European forms", "That martyrdom is the highest calling for all Christians", "That clergy should stay out of politics entirely", "That authentic Christian faith demands engagement with injustice — a model of prophetic witness"], ans:3, exp:"Romero's legacy: <strong>authentic Christianity demands confronting injustice.</strong> He models how faith and action are inseparable."},
  {topic:"Prophet Amos", q:"What did Amos mean by the 'Day of the LORD'?", opts:["The Sabbath", "A day of judgement for Israel — not triumph but disaster, because of their injustice", "The day of creation", "A future day of triumph for Israel"], ans:1, exp:"The 'Day of the LORD' for Amos = <strong>a day of judgement, not triumph</strong> — because Israel had ignored justice."},
  {topic:"Acts of Mercy", q:"Which of these is a Corporal Act of Mercy?", opts:["Visit the sick", "Pray for the living and dead", "Counsel the doubtful", "Admonish sinners"], ans:0, exp:"<strong>Visit the sick</strong> is a Corporal Act — it addresses a physical, bodily need."},
  {topic:"Parables", q:"In the Parable of the Sower, what does rocky ground represent?", opts:["People who bear much spiritual fruit consistently", "Those who receive the word with joy but have no deep roots — they fall away under pressure", "People who never hear the Gospel", "Those who hear but whose faith is choked by wealth"], ans:1, exp:"<strong>Rocky ground = shallow reception.</strong> Enthusiasm without roots — collapses under persecution or difficulty."},
  {topic:"Key Terms", q:"What are miracles according to Catholic teaching?", opts:["Magic tricks", "Scientific anomalies", "Signs of God's power — events beyond the natural order that reveal Jesus's identity and invite faith", "Coincidences"], ans:2, exp:"Miracles = <strong>signs of God's power</strong> that reveal Jesus's identity and invite faith. Not magic tricks."},
  {topic:"Key Terms", q:"What does 'immanent' mean when applied to God?", opts:["God is present and active within creation and human experience", "God is distant from creation and uninvolved", "God existed before the creation of the universe", "God is beyond human understanding and comprehension"], ans:0, exp:"<strong>Immanent = God present and active within creation</strong> — contrasts with transcendent (beyond/outside creation)."},
  {topic:"Parables", q:"In the Parable of the Sower, what does the seed represent?", opts:["The disciples", "Jesus himself", "The Church", "God's word — the different soils represent different responses to it"], ans:3, exp:"Seed = <strong>God's word</strong>. Different soils = different responses — rocky, thorny or fertile hearts."},
  {topic:"Prophet Amos", q:"What does Amos mean by 'let justice roll down like waters'?", opts:["A prayer for rain to end the drought in Israel", "A prediction of natural disaster as divine punishment", "Calling for literal floods to punish the wicked", "A call for persistent, powerful justice to flow through all of society"], ans:3, exp:"<strong>'Justice roll like waters' = justice should be constant and powerful</strong>, not occasional, like a mighty river."},
  {topic:"Miracles", q:"What is the 'miracle of the sun' at Fatima and what do critics say?", opts:["A solar eclipse interpreted as a miracle by witnesses", "Reported mass vision of the sun dancing (1917) — critics say mass hysteria or optical illusion", "A meteor shower witnessed only in Portugal", "A comet seen by astronomers worldwide in 1917"], ans:1, exp:"<strong>Fatima 1917: tens of thousands reported sun 'dancing'.</strong> Critics: mass hallucination, expectation bias, optical phenomena."},
  {topic:"Miracles", q:"How does Richard Swinburne defend the possibility of miracles?", opts:["Miracles can be explained by science we don't yet understand", "Science has now proved several miracles genuine", "If God exists as all-powerful creator, intervening in creation is coherent and possible", "Eye-witness testimony always confirms miraculous events"], ans:2, exp:"<strong>Swinburne: if God exists and created natural law, God can override it.</strong> Miracles are coherent given theism."},
  {topic:"Parables", q:"What makes a good evaluation answer about parables?", opts:["Listing all four parables", "Quoting the Bible in Latin", "Stating a view, supporting with parable evidence, acknowledging counter-arguments, giving a reasoned personal conclusion", "Just retelling the story"], ans:2, exp:"Good evaluation: <strong>view → parable evidence → counter-argument → reasoned personal conclusion</strong>."},
  {topic:"Prophet Amos", q:"A modern parallel to Amos's message might be:", opts:["Someone attending church every week", "A bishop writing a document", "Someone who attends church but supports unjust business practices — criticised, like Israel, for external religion without justice", "A priest saying Mass"], ans:2, exp:"Modern parallel: <strong>religious practice without justice</strong> — attending worship while engaging in exploitation."},
  {topic:"Miracles", q:"Miracles are described as 'signs' rather than 'proofs' because:", opts:["Signs point beyond themselves and invite faith — they do not compel belief, but invite a response", "They can't be proved scientifically", "Proofs are only in maths", "Signs are more impressive"], ans:0, exp:"Miracles are <strong>signs</strong> — they point to Jesus's identity and invite faith. They require a response, not just observation."},
  {topic:"Baptism", q:"What does the baptismal candle symbolise?", opts:["Christ as the light of the world — the responsibility to live in the light", "The Paschal Candle only", "The Church building", "The fire of hell"], ans:0, exp:"Baptismal candle = <strong>Christ as light of the world</strong> and the responsibility to raise the child in faith."},
  {topic:"Key Terms", q:"What is the Sinai Covenant?", opts:["The Ten Commandments only", "A promise made by Abraham", "A peace treaty between Israel and Egypt", "The agreement God made with Moses and the Israelites — God promises protection, they promise to follow his laws"], ans:3, exp:"Sinai Covenant = <strong>God's agreement with Moses and Israel</strong> — a relationship of faithful love, not just a contract."},
  {topic:"Oscar Romero", q:"What is 'liberation theology' and how did it influence Romero?", opts:["A Latin American theological movement emphasising God's preferential option for the poor and structural justice", "A Protestant movement rejecting Catholic social teaching", "A movement for women's ordination in the Catholic Church", "A Vatican document on religious freedom"], ans:0, exp:"<strong>Liberation theology = God's preferential option for the poor + structural analysis of injustice.</strong> Romero embodied its principles."},
  {topic:"Parables", q:"In the Prodigal Son, what does the father do when he sees the son returning?", opts:["Waits inside the house", "Sends a servant to meet him", "Asks the older son to greet him", "Runs to meet him while he is still far off"], ans:3, exp:"The father <strong>runs to meet him while he is still far off</strong> — showing God's eager, unconditional love."},
  {topic:"Acts of Mercy", q:"Which of these is a Spiritual Act of Mercy?", opts:["Clothe the naked", "Feed the hungry", "Shelter the homeless", "Instruct the ignorant"], ans:3, exp:"<strong>Instruct the ignorant</strong> is a Spiritual Act — it addresses a need of the mind and soul."},
  {topic:"Prophet Amos", q:"Why is it significant that Amos was 'not a prophet nor a son of a prophet'?", opts:["It's not significant", "It means his prophecies don't count", "It means he had no authority", "It shows God can call anyone — ordinary people can be prophets, not just those trained or from prophetic families"], ans:3, exp:"<strong>God calls ordinary people</strong> — Amos had no professional training, which makes his call more striking and democratic."},
  {topic:"Miracles", q:"What is a 'coincidence' miracle and give an example?", opts:["A healing that doctors cannot explain medically", "A miracle that happens to multiple people simultaneously", "A natural event with perfect timing interpreted as divine intervention — e.g. wind parting the Red Sea", "A vision or dream experienced as miraculous"], ans:2, exp:"<strong>Coincidence miracle = natural event, divinely timed</strong> — e.g. Red Sea parting. No natural law broken, but timing seen as divine."},
  {topic:"Baptism", q:"What is the 'Body of Christ' that Baptism initiates a person into?", opts:["The Church — the community of all baptised Christians", "The Eucharist only", "Heaven", "The physical body of Jesus"], ans:0, exp:"'Body of Christ' = <strong>the Church</strong> — the community of all baptised Christians united in Christ."},
  {topic:"Key Terms", q:"What does 'repentance' mean in its fullest (Greek) sense?", opts:["Attending Mass regularly", "Going to confession", "Saying sorry", "A complete change of heart and mind (metanoia) — turning away from sin and towards God"], ans:3, exp:"Repentance = <strong>metanoia</strong> — a complete change of heart and mind, not just saying sorry."},
  {topic:"Key Terms", q:"What is 'stewardship' in Christian teaching?", opts:["Leading prayer services on behalf of the congregation", "Caring for God's creation as its caretakers, not owners", "Spreading the Gospel to other nations", "Managing church finances responsibly"], ans:1, exp:"<strong>Stewardship = humans as caretakers of God's creation</strong> — responsible for caring for the earth."},
  {topic:"Oscar Romero", q:"What was the content of Romero's final sermon before his assassination?", opts:["A plea for international intervention in El Salvador", "A prayer for peace between the government and guerrillas", "A call to soldiers to disobey orders to kill their own people — quoting divine law over military orders", "A condemnation of liberation theology as Marxist"], ans:2, exp:"<strong>Final homily: commanded soldiers to disobey orders to kill.</strong> 'In the name of God — stop the repression!' He was shot the next day."},
  {topic:"Key Terms", q:"What is Advent?", opts:["A type of prayer", "The liturgical season before Christmas — a time of preparation and waiting for the coming of Christ", "The season after Easter", "The first Sunday of the Church year only"], ans:1, exp:"Advent = <strong>the season of preparation before Christmas</strong> — four weeks of waiting and anticipation. From Latin 'adventus' (coming)."},
  {topic:"Prophet Amos", q:"What was the economic situation in Israel when Amos preached?", opts:["Famine", "Widespread poverty", "Prosperity — but extremely unequal, with the rich exploiting the poor", "War and destruction"], ans:2, exp:"Israel was <strong>prosperous but deeply unequal</strong> — the rich exploited the poor while the economy boomed."},
  {topic:"Baptism", q:"What does 'original sin' mean and how does baptism address it?", opts:["Sins that are so serious they cannot be forgiven", "Sins committed by each individual before baptism", "The inherited tendency to sin from Adam and Eve's fall — baptism cleanses it", "The first sin a person commits after baptism"], ans:2, exp:"<strong>Original sin = inherited sinful nature from the Fall.</strong> Baptism cleanses original sin and restores relationship with God."},
  {topic:"Prophet Amos", q:"In which kingdom did Amos preach, despite being from the other?", opts:["Egypt", "Northern Kingdom (Israel) — he was from Judah but preached in Israel", "Southern Kingdom (Judah)", "Babylon"], ans:1, exp:"Amos was from Judah (south) but preached in <strong>the Northern Kingdom (Israel)</strong>."},
  {topic:"Prophet Amos", q:"What does Amos say will happen to Israel because of its injustice?", opts:["God will forgive and restore if they repent immediately", "The poor will rise up and overthrow the rich", "Israel will be conquered and exiled — judgement is certain", "God will send plagues and natural disasters"], ans:2, exp:"<strong>Amos warns of conquest and exile</strong> as divine punishment for Israel's injustice — historically fulfilled by Assyria (722 BCE)."},
  {topic:"Acts of Mercy", q:"'Instruct the ignorant' as a Spiritual Act of Mercy is practised through:", opts:["RE and catechism lessons — sharing faith knowledge with those who don't have it", "Clothing drives", "Prison visiting", "Handing out food"], ans:0, exp:"<strong>RE and catechism</strong> — sharing knowledge of faith with those who lack it is 'instruct the ignorant'."},
  {topic:"Miracles", q:"What did Jesus do before healing the man born blind in John 9?", opts:["Made mud from saliva and dirt and put it on his eyes", "Said 'be opened'", "Prayed loudly", "Touched his eyes directly"], ans:0, exp:"Jesus made <strong>mud from saliva and dirt</strong> and applied it to the man's eyes — then told him to wash."},
  {topic:"Acts of Mercy", q:"What does 'human dignity' mean in Catholic social teaching?", opts:["Only baptised Christians have full human dignity", "Human dignity must be earned through virtuous behaviour", "Every person has inherent worth as created in God's image — this demands respect and justice", "The right of the wealthy to maintain their lifestyle"], ans:2, exp:"<strong>Human dignity = inherent worth of every person made in God's image</strong> (imago Dei) — the foundation of all Catholic social teaching."},
  {topic:"Oscar Romero", q:"What structural injustice did Romero speak out against in El Salvador?", opts:["Corruption within the Catholic Church itself", "Environmental destruction caused by multinational companies", "Foreign interference in Salvadoran economic policy", "A military dictatorship backed by wealthy landowners, with extreme inequality and violent repression of the poor"], ans:3, exp:"<strong>Military dictatorship + extreme inequality + violent repression</strong> of peasants and activists — Romero named and condemned all three."},
  {topic:"Oscar Romero", q:"The night before his death, Romero addressed soldiers directly saying:", opts:["'I beg you, I beseech you, I order you in the name of God: stop the repression!'", "'Obey your commanders'", "'God bless the army'", "'Fight for your country'"], ans:0, exp:"Romero's final homily: <strong>'I beg you, I order you in the name of God: stop the repression!'</strong> — addressing soldiers as Christians."},
  {topic:"Baptism", q:"What does 'christened' literally mean?", opts:["Named in church", "Anointed — from 'Christ' meaning anointed one", "Welcomed", "Saved"], ans:1, exp:"'Christened' = <strong>anointed</strong> — from 'Christ' (the Anointed One). Chrism oil is used in the ceremony."},
  {topic:"Baptism", q:"What does baptism symbolise in terms of death and resurrection?", opts:["The resurrection of Christ on Easter Sunday", "The death of the ceremony and start of Christian living", "Going under water = dying to sin; rising = resurrection and new life with Christ", "The death of the parents' old life when a child is born"], ans:2, exp:"<strong>Immersion: under = death to sin; emerging = resurrection to new life.</strong> Linked to Christ's death and resurrection."},
  {topic:"Key Terms", q:"What does 'metanoia' mean and which key term does it define?", opts:["Repentance — a complete change of heart and mind, turning from sin towards God", "Baptism", "Miracles", "Prayer"], ans:0, exp:"Metanoia = <strong>repentance</strong> — a complete change of heart and mind, not just saying sorry."},
  {topic:"Key Terms", q:"Who was John the Baptist?", opts:["An Old Testament prophet", "A Roman soldier", "A disciple of Jesus", "The cousin of Jesus who called people to repentance and baptised them in the Jordan — preparing the way for the Messiah"], ans:3, exp:"John the Baptist = <strong>cousin of Jesus who prepared the way</strong> — called people to repentance and baptised in the Jordan."},
  {topic:"Oscar Romero", q:"What event transformed Romero from conservative to prophetic bishop?", opts:["His reading of the documents of Vatican II", "His appointment as Archbishop of San Salvador", "His visit to Rome where he met liberation theologians", "The assassination of his friend Fr Rutilio Grande by government forces in 1977"], ans:3, exp:"<strong>Fr Rutilio Grande's assassination (1977) transformed Romero</strong> — seeing a priest killed for defending the poor radicalised him."},
  {topic:"Parables", q:"Which parable is about a father and two sons?", opts:["The Lost Sheep", "The Good Samaritan", "The Prodigal Son", "The Sower"], ans:2, exp:"<strong>The Prodigal Son</strong> — a father, a younger son who leaves and returns, and an older son who resents the welcome."},
  {topic:"Key Terms", q:"What is 'pluralism' in a religious context?", opts:["The view that multiple religions offer valid paths to truth or God", "The belief that religion should be kept separate from public life", "The practice of belonging to multiple religions simultaneously", "The belief that only one religion is true"], ans:0, exp:"<strong>Religious pluralism = multiple religions offer valid paths</strong> to truth or God — contrasts with exclusivism."},
  {topic:"Prophet Amos", q:"'I hate, I despise your religious festivals' (Amos 5:21) criticises:", opts:["The priesthood generally", "Roman occupation", "The Temple building", "External religion — performing worship while ignoring justice"], ans:3, exp:"Amos 5:21 criticises <strong>external religion</strong> — worship without justice."},
  {topic:"Key Terms", q:"The role of 'King' in the messianic tradition means:", opts:["One who rules with justice, protects the weak and embodies God's reign", "A military commander", "The Roman Emperor", "A political ruler only"], ans:0, exp:"Messianic King = <strong>rules with justice, protects the weak, embodies God's reign</strong> — not just political power."},
  {topic:"Parables", q:"What question does the Good Samaritan answer?", opts:["How do I get to heaven?", "Who is my neighbour?", "How do I pray?", "Who is God?"], ans:1, exp:"The Good Samaritan answers: <strong>'Who is my neighbour?'</strong> — answer: anyone in need."},
  {topic:"Baptism", q:"Why do Baptists practise adult Baptism rather than infant Baptism?", opts:["Full immersion requires adults", "It is cheaper", "Baptism should be a conscious personal decision of faith — infants cannot choose", "Because infants cry in church"], ans:2, exp:"<strong>Baptism requires a conscious personal decision of faith</strong> — Baptists say infants cannot make this choice."},
  {topic:"Acts of Mercy", q:"What does Matthew 25:40 say about the Acts of Mercy?", opts:["That prayer is more important", "That they are optional", "'Whatever you did for the least of my brothers and sisters, you did for me' — serving those in need is serving Christ", "That only priests can perform them"], ans:2, exp:"Matthew 25:40: <strong>'Whatever you did for the least of these, you did for me'</strong> — serving the needy is serving Christ."},
  {topic:"Acts of Mercy", q:"How many Spiritual Acts of Mercy are there?", opts:["5", "7", "14", "6"], ans:1, exp:"There are <strong>7 Spiritual Acts</strong> and 7 Corporal Acts — 14 Acts of Mercy in total."},
  {topic:"Baptism", q:"What is Chrism oil used for in Baptism?", opts:["To make the water holy", "To anoint the baby — marking them as set apart for God, sharing in Christ's roles of priest, prophet and king", "To light the candle", "To pour over the baby's head instead of water"], ans:1, exp:"Chrism oil = <strong>anointing — set apart for God</strong>, sharing in Christ's triple office."},
  {topic:"Miracles", q:"Which miracle is described in Mark 4:35–41?", opts:["Feeding the 5,000", "Raising of Lazarus", "Healing the Blind Man", "Calming the Storm"], ans:3, exp:"<strong>Calming the Storm is Mark 4:35–41.</strong>"},
  {topic:"Oscar Romero", q:"In what year was Oscar Romero born?", opts:["1950", "1900", "1935", "1917"], ans:3, exp:"Oscar Romero was born in <strong>1917</strong> in Ciudad Barrios, El Salvador."},
  {topic:"Oscar Romero", q:"Which Catholic Social Teaching principle is most evident in Romero's life?", opts:["Subsidiarity", "Stewardship of creation", "Solidarity with the rich", "The preferential option for the poor — prioritising the needs of the most vulnerable in society"], ans:3, exp:"<strong>Preferential option for the poor</strong> — Romero devoted his ministry entirely to defending the most vulnerable."},
  {topic:"Oscar Romero", q:"What does Romero's canonisation mean in Catholic teaching?", opts:["He was made a bishop posthumously", "His writings became scripture", "He was a good person", "The Church officially declares him to be in heaven and a model of Christian life worthy of imitation"], ans:3, exp:"Canonisation = <strong>the Church officially declares him a saint</strong> — in heaven and a model for all Christians."},
  {topic:"Acts of Mercy", q:"A food bank is a modern example of which Corporal Act?", opts:["Feed the hungry", "Visit the sick", "Clothe the naked", "Bury the dead"], ans:0, exp:"A food bank = <strong>Feed the hungry</strong> — the first Corporal Act of Mercy."},
  {topic:"Baptism", q:"Who makes promises on behalf of an infant in Catholic Baptism?", opts:["The Bishop", "Parents and godparents — they promise to raise the child in the Catholic faith", "The whole congregation", "The infant themselves"], ans:1, exp:"<strong>Parents and godparents</strong> make promises on behalf of the infant — to reject sin and raise the child in faith."},
  {topic:"Parables", q:"In the Good Samaritan, who showed mercy to the injured man?", opts:["A Samaritan — a despised outsider who crossed social boundaries to help", "A Levite", "A priest", "A Roman soldier"], ans:0, exp:"A <strong>Samaritan</strong> — a despised outsider — showed mercy, while the priest and Levite passed by."},
  {topic:"Baptism", q:"What does the water symbolise in Catholic Baptism?", opts:["The Jordan River", "The Holy Spirit only", "Physical cleanliness only", "Cleansing from Original Sin, death to the old life and rising to new life in Christ"], ans:3, exp:"Water = <strong>cleansing from Original Sin + death to old life + rising to new life</strong>."},
  {topic:"Miracles", q:"What is the theological significance of Jesus healing on the Sabbath?", opts:["It was an accident", "It shows Jesus prioritised human need and dignity over rigid rule-keeping", "It shows Jesus was careless about rules", "It only happened once"], ans:1, exp:"Healing on the Sabbath shows <strong>human need and dignity take priority over rigid rule-keeping</strong> — Jesus fulfils the law's intent."},
  {topic:"Oscar Romero", q:"What did Romero mean by 'the Church is not simply a church that prays but a church that serves'?", opts:["Faith must be expressed in social action and service — it cannot be merely private religion", "Priests should do manual work alongside their ministry", "Prayer and worship are unnecessary", "The Church should become a political party"], ans:0, exp:"<strong>Faith demands action</strong> — Romero insisted authentic Christianity meant serving the poor, not just private worship."},
  {topic:"Oscar Romero", q:"What does 'martyr' mean?", opts:["Someone who performs miracles", "A bishop", "A holy person", "Someone who dies for their faith — witnessing to what they believe at the cost of their life"], ans:3, exp:"Martyr = <strong>someone who dies for their faith</strong> — from Greek 'martys' meaning 'witness'."},
  {topic:"Parables", q:"In the Parable of the Pharisee and Tax Collector, what is Jesus's point?", opts:["Public prayer is less effective than private prayer", "The Temple is not the right place to pray", "Tax collectors are more righteous than religious leaders", "Humble, genuine prayer is heard; proud, self-righteous prayer is not"], ans:3, exp:"<strong>Humble prayer of the tax collector accepted; proud self-justification of Pharisee rejected.</strong> God values humility over performance."},
  {topic:"Acts of Mercy", q:"Which parable in Matthew 25 is the foundation for the Corporal Acts?", opts:["The Lost Sheep", "The Prodigal Son", "The Sheep and the Goats — 'I was hungry and you gave me food…'", "The Good Samaritan"], ans:2, exp:"<strong>The Sheep and the Goats (Matthew 25)</strong> — Jesus identifies himself with those in need."},
  {topic:"Parables", q:"What does the Parable of the Lost Sheep teach about God?", opts:["Lost things are rarely found when sought actively", "God actively seeks the single lost person — each individual is precious enough to seek", "Shepherds should be more careful with their flocks", "Larger groups matter more than individuals"], ans:1, exp:"<strong>Lost Sheep = God actively seeks individual sinners.</strong> 99 left for the one — each person has infinite value to God."},
  {topic:"Oscar Romero", q:"What was Romero doing when he was assassinated?", opts:["Giving a radio broadcast", "Celebrating Mass at the altar", "Writing a letter to the Pope", "Meeting the President"], ans:1, exp:"Romero was <strong>celebrating Mass at the altar</strong> when he was shot — a profound symbol of martyrdom."},
  {topic:"Acts of Mercy", q:"What is 'preferential option for the poor' in Catholic social teaching?", opts:["The poor are preferred by God over the wealthy", "The Church should charge the poor less for sacraments", "Catholics should donate preferentially to local poverty", "A moral priority given to the needs of the poor and marginalised in social and political decisions"], ans:3, exp:"<strong>Preferential option = the poor's needs have priority</strong> in moral, social and political decision-making."},
  {topic:"Key Terms", q:"What is Baptism?", opts:["A church building", "A sacrament of initiation into the Christian community using water as a symbol of cleansing and new life", "A prayer", "A type of fasting"], ans:1, exp:"Baptism = <strong>sacrament of initiation</strong> — uses water to symbolise cleansing from Original Sin and new life in Christ."},
  {topic:"Oscar Romero", q:"Why did the Salvadoran government initially welcome Romero's appointment as Archbishop?", opts:["He had government connections", "They thought he was conservative and would not challenge the status quo", "He promised not to use the radio", "He was popular with the poor"], ans:1, exp:"The government thought Romero was <strong>conservative and would not challenge them</strong> — they were wrong."},
  {topic:"Prophet Amos", q:"What sin does Amos criticise when he says Israel 'sells the righteous for silver'?", opts:["Stealing silver from the temple treasury", "Buying and selling people — using the justice system to exploit the poor", "Bribing foreign nations with silver", "Worshipping false gods at the high places"], ans:1, exp:"<strong>'Selling the righteous for silver' = corrupting justice through bribery</strong> — the rich buy verdicts against the innocent poor."},
  {topic:"Key Terms", q:"What does 'sanctity of life' mean?", opts:["Life is sacred and holy — given by God and therefore precious", "Life should be preserved at all costs by doctors", "Life is only valuable when lived fully and meaningfully", "Life becomes sacred only when a person is baptised"], ans:0, exp:"<strong>Sanctity of life = life is sacred and holy</strong>, given by God and therefore of supreme value."},
  {topic:"Key Terms", q:"What is 'theodicy'?", opts:["A prayer for the dead", "An attempt to justify God's existence despite evil and suffering", "The belief that God intervenes in human affairs", "The study of religious texts and their interpretation"], ans:1, exp:"<strong>Theodicy = attempt to justify God's goodness despite the existence of evil and suffering.</strong>"},
  {topic:"Parables", q:"What does 'there is more joy in heaven over one sinner who repents' teach?", opts:["That God values the repentant more than those who never sinned — repentance and return are cause for celebration", "That 99 sheep are worthless", "That sinners are better than the righteous", "That heaven has parties"], ans:0, exp:"It teaches that <strong>repentance and return to God are cause for great joy</strong> — each person matters infinitely."},
  {topic:"Parables", q:"In the Lost Sheep, why does the shepherd leave the 99?", opts:["He forgets them", "To show the 1 lost sheep has infinite value — God actively seeks the lost", "To punish them", "Because 99 is enough"], ans:1, exp:"Lost Sheep: <strong>every person has infinite value</strong> — God actively seeks the lost and rejoices at their return."},
  {topic:"Baptism", q:"What is an 'Easter Vigil baptism' and why is it significant?", opts:["Adult baptism at the Easter Vigil — symbolically linked to Christ's resurrection", "Baptism performed in a river on Easter Sunday morning", "Baptism on Good Friday to mark Christ's death", "A renewal of baptismal vows at Easter each year"], ans:0, exp:"<strong>Easter Vigil baptism links the catechumen's new life to Christ's resurrection</strong> — the most significant night in the Christian year."},
  {topic:"Parables", q:"What does the Parable of the Wedding Banquet teach about the Kingdom?", opts:["The Kingdom is offered to all — those first invited refused so the invitation was extended to everyone", "The poor will be excluded from heaven because of sin", "Heaven is a place of feasting and celebration", "Religious people will be first to enter heaven"], ans:0, exp:"<strong>Wedding Banquet = Kingdom offered to all.</strong> First invited (Israel's leaders) refused → invitation extended to outcasts and Gentiles."},
  {topic:"Baptism", q:"What is a sacrament?", opts:["An outward sign of inward grace — a visible action that effects invisible spiritual change", "A prayer", "A church building", "A feast day"], ans:0, exp:"Sacrament = <strong>outward sign of inward grace</strong>. There are 7 sacraments in the Catholic Church."},
  {topic:"Key Terms", q:"What is a parable?", opts:["A historical account of Jesus's life", "A short story using everyday situations to teach a deeper spiritual truth", "A type of prayer", "A miracle story"], ans:1, exp:"Parable = <strong>short story + deeper spiritual truth</strong>, drawn from everyday life."},
  {topic:"Baptism", q:"What happens to Original Sin through Baptism according to Catholic teaching?", opts:["It is made worse", "It is forgiven but remains", "It is removed — the person is cleansed and initiated into the Body of Christ", "Nothing changes"], ans:2, exp:"Catholic teaching: Baptism <strong>removes Original Sin</strong> and initiates the person into the Body of Christ."},
  {topic:"Acts of Mercy", q:"'Counsel the doubtful' means:", opts:["Tell doubters they are wrong", "Only the Pope can do this", "Ignore people's doubts", "Spiritual direction — helping someone work through their questions of faith or moral uncertainty"], ans:3, exp:"'Counsel the doubtful' = <strong>helping someone work through doubt</strong> — a form of spiritual accompaniment."},
  {topic:"Oscar Romero", q:"How does Romero connect to the Corporal Acts of Mercy?", opts:["He had no connection", "Through his ministry — visiting the imprisoned, comforting the afflicted, defending those whose rights were violated", "He personally fed thousands", "He only prayed"], ans:1, exp:"Romero lived the Corporal Acts through his ministry — <strong>visiting, comforting and defending</strong> those suffering injustice."},
  {topic:"Miracles", q:"The Healing of the Blind Man in John 9 is also a sign of:", opts:["Jesus's human compassion only", "The end of blindness in Israel", "Physical medicine", "Spiritual sight — Jesus gives insight to those willing to see, not just physical vision"], ans:3, exp:"Healing the Blind Man is a sign of <strong>spiritual sight</strong> — seeing who Jesus truly is, not just physical healing."},
  {topic:"Acts of Mercy", q:"'Admonish sinners' means:", opts:["Lovingly correct someone who is doing wrong — a Spiritual Act of Mercy", "Punish wrongdoers harshly", "Ignore sin", "Report people to the police"], ans:0, exp:"'Admonish sinners' = <strong>lovingly correct someone who is doing wrong</strong> — a Spiritual Act of Mercy."},
  {topic:"Parables", q:"What is the main teaching of the Parable of the Prodigal Son?", opts:["We should save our money rather than spend it", "Children should always obey their parents", "Hard work is more rewarded than laziness", "God's love is unconditional and boundless — God welcomes back sinners with joy"], ans:3, exp:"<strong>Prodigal Son = God's unconditional, joyful welcome of repentant sinners.</strong> Father's love doesn't depend on merit."},
  {topic:"Oscar Romero", q:"In which country was Oscar Romero Archbishop?", opts:["Guatemala", "Brazil", "El Salvador", "Mexico"], ans:2, exp:"Romero was Archbishop of <strong>San Salvador, El Salvador</strong>."},
  {topic:"Key Terms", q:"What is a prophet?", opts:["Someone who predicts the future only", "Someone who speaks God's word to the people — often challenging injustice", "A priest who leads worship", "A king who rules justly"], ans:1, exp:"Prophet = <strong>someone who speaks God's word</strong> to the people, often challenging injustice and calling for repentance."},
  {topic:"Prophet Amos", q:"How does the Book of Amos end?", opts:["With Amos's death", "With complete doom and no hope", "With a promise of restoration — God will restore the fallen house of David and the people will rebuild", "With an attack on Jerusalem"], ans:2, exp:"Amos ends with <strong>a promise of restoration</strong> (Amos 9:11–15) — judgement leads to renewed hope, not permanent destruction."},
  {topic:"Acts of Mercy", q:"What does 'forgive offences willingly' require?", opts:["Waiting for an apology first", "Only forgiving small things", "Genuine, active forgiveness — choosing to release resentment even when hurt", "Pretending nothing happened"], ans:2, exp:"'Forgive offences willingly' requires <strong>genuine, active forgiveness</strong> — choosing to release resentment."},
  {topic:"Miracles", q:"What does the Raising of Lazarus foreshadow?", opts:["The Last Supper", "Jesus's own resurrection — showing his power over death before his own death and rising", "Baptism", "The Eucharist"], ans:1, exp:"Raising Lazarus foreshadows <strong>Jesus's own resurrection</strong> — a preview of his power over death."},
  {topic:"Acts of Mercy", q:"How many Corporal Acts of Mercy are there?", opts:["5", "6", "7", "14"], ans:2, exp:"There are <strong>7 Corporal Acts</strong> and 7 Spiritual Acts — 14 in total."},
  {topic:"Prophet Amos", q:"Amos 5:21 begins 'I hate, I despise your religious festivals.' Who is speaking?", opts:["A priest criticising Amos", "Amos speaking for himself", "The King of Israel", "God speaking through Amos — the prophet delivers God's word"], ans:3, exp:"<strong>God speaking through Amos</strong> — the prophet is the mouthpiece for God's condemnation of empty worship."},
  {topic:"Key Terms", q:"What does 'priest' mean as a role of Jesus?", opts:["A teacher of God's word", "Someone who says Mass", "A king who rules with justice", "One who mediates between God and people — offering sacrifice and interceding"], ans:3, exp:"Priest = <strong>mediates between God and people</strong> — offering sacrifice and interceding. Jesus is seen as the ultimate High Priest."},
  {topic:"Acts of Mercy", q:"Prison chaplaincy is a modern example of which Corporal Act?", opts:["Feed the hungry", "Clothe the naked", "Visit the imprisoned", "Bury the dead"], ans:2, exp:"Prison chaplaincy = <strong>Visit the imprisoned</strong> — the 6th Corporal Act of Mercy."},
  {topic:"Key Terms", q:"What is a covenant in the Bible?", opts:["A book of the Bible", "A legal contract that can be cancelled", "A type of prayer", "A relationship of faithful, permanent love between God and his people — more than a contract"], ans:3, exp:"Covenant = <strong>a relationship of faithful, permanent love</strong> — deeper than a contract, involving commitment and loyalty (Hebrew: hesed)."},
  {topic:"Miracles", q:"In the Calming of the Storm, what does Jesus say to the wind and waves?", opts:["'Quiet! Be still!'", "'Do not be afraid'", "'Rise and walk'", "'Follow me'"], ans:0, exp:"Jesus commands: <strong>'Quiet! Be still!'</strong> — and the wind and waves obey immediately (Mark 4)."},
  {topic:"Miracles", q:"What did the feeding of the 5,000 demonstrate according to traditional Christian interpretation?", opts:["That people were willing to share what they had", "That Jesus had practical skills in food distribution", "That bread and fish were the most common food in first-century Palestine", "Jesus's divine power over nature — and his compassion for physical as well as spiritual need"], ans:3, exp:"<strong>Feeding of 5,000 = divine power over creation + compassion</strong> for physical need. Foreshadows the Eucharist."},
  {topic:"Prophet Amos", q:"Who does Amos primarily condemn in his prophecy?", opts:["The wealthy ruling class of Israel for their exploitation of the poor", "The priests for corrupting religious practice", "The king for his foreign policy", "Foreign nations for attacking Israel"], ans:0, exp:"Amos primarily condemns <strong>the wealthy ruling class</strong> who exploit the poor while maintaining hollow religious observance."},
  {topic:"Key Terms", q:"What is 'external religion'?", opts:["Religion in public spaces", "Religion practised outside", "A Protestant term", "Performing religious rituals without genuine inner faith or moral living"], ans:3, exp:"External religion = <strong>ritual without genuine faith or justice</strong> — condemned by Amos."},
  {topic:"Oscar Romero", q:"What is 'Liberation Theology' that Romero is associated with?", opts:["A type of prayer", "Freedom of religion", "A theological movement emphasising God's preferential option for the poor and the need for social justice", "A political party"], ans:2, exp:"Liberation Theology = <strong>God's preferential option for the poor</strong> — theology that prioritises justice for the marginalised."},
  {topic:"Miracles", q:"In which Gospel is the Raising of Lazarus found?", opts:["Matthew", "Mark", "Luke", "John 11"], ans:3, exp:"Raising of Lazarus = <strong>John 11</strong>."},
  {topic:"Miracles", q:"Which Gospel records most of the miracles studied at Year 8?", opts:["Matthew", "Mark and John — Calming Storm and Feeding 5000 in Mark; Lazarus and Blind Man in John", "All four equally", "Luke only"], ans:1, exp:"<strong>Mark</strong> records Calming Storm (4) and Feeding 5000 (6). <strong>John</strong> records Lazarus (11) and Blind Man (9)."},
  {topic:"Baptism", q:"What happens to water symbolically in Baptism?", opts:["It loses its natural properties", "It symbolises cleansing, death to old life and rising to new life — the triple symbolism of water", "It becomes the Blood of Christ", "It becomes holy water permanently"], ans:1, exp:"Water symbolises <strong>cleansing from sin, death to old life, and rising to new life</strong> — three layered meanings."},
  {topic:"Prophet Amos", q:"What is the significance of Amos being 'a dresser of sycamore trees'?", opts:["He was wealthy and educated before his call", "He used trees as symbols throughout his prophecy", "He worked in the temple grounds before his call", "He was an ordinary working-class man — his authority came from God, not social status"], ans:3, exp:"Amos's <strong>ordinary working background emphasises his prophetic authority came from God alone</strong>, not social position."},
  {topic:"Acts of Mercy", q:"How does the parable of the Good Samaritan relate to mercy?", opts:["It shows priests are less merciful than ordinary people", "It shows mercy crosses ethnic and social boundaries — the outsider showed compassion when insiders didn't", "It teaches us to help only people we know", "It teaches us to give money to the poor"], ans:1, exp:"<strong>Good Samaritan shows mercy is universal</strong> — it crosses racial and social lines. The unexpected person acted mercifully."},
  {topic:"Acts of Mercy", q:"Why do Catholics believe charity alone is insufficient without structural justice?", opts:["Charity is a lower form of mercy than prayer", "Individual charity has no place in Catholic social teaching", "Addressing only symptoms not causes leaves unjust structures intact — systemic change is also needed", "Charity creates dependency rather than empowering the poor"], ans:2, exp:"<strong>Charity addresses symptoms; justice addresses causes.</strong> Catholic Social Teaching calls for both: immediate relief AND structural change."},
  {topic:"Acts of Mercy", q:"The Acts of Mercy are rooted in which Gospel passage?", opts:["The Lord's Prayer", "The Beatitudes", "John 3:16", "Matthew 25 — the Sheep and Goats: 'I was hungry and you gave me food…'"], ans:3, exp:"<strong>Matthew 25 (Sheep and Goats)</strong> — Jesus identifies himself with those in need."},
  {topic:"Baptism", q:"Why do some Christians oppose infant baptism?", opts:["The ceremony is too expensive for families", "Infants might be harmed by the water", "Infant baptism is not practised in the Bible", "Infants cannot make a conscious, personal decision to follow Jesus"], ans:3, exp:"<strong>Infants cannot make a personal faith decision</strong> — baptism requires conscious commitment according to believers' baptism traditions."},
  {topic:"Prophet Amos", q:"Approximately when was Amos active as a prophet?", opts:["500 BC", "200 BC", "760–750 BC", "1000 BC"], ans:2, exp:"Amos was active approximately <strong>760–750 BC</strong> — during the reign of King Jeroboam II."},
  {topic:"Parables", q:"The Lost Sheep comes from which chapter of Luke?", opts:["Luke 12", "Luke 15", "Luke 10", "Luke 19"], ans:1, exp:"Lost Sheep is in <strong>Luke 15</strong> — alongside the Lost Coin and Prodigal Son, all about things that were lost and found."},
  {topic:"Miracles", q:"'I am the light of the world' is connected to which miracle?", opts:["Feeding the 5,000", "Healing of the Blind Man — John 9", "Raising of Lazarus", "Calming the Storm"], ans:1, exp:"Healing of the Blind Man (John 9) — <strong>'I am the light of the world'</strong>, giving both physical and spiritual sight."},
  {topic:"Baptism", q:"In the New Testament, who baptised Jesus?", opts:["A priest in the Temple", "John the Baptist — in the River Jordan", "Peter", "Mary"], ans:1, exp:"<strong>John the Baptist</strong> baptised Jesus in the River Jordan — despite saying Jesus should baptise him."},
  {topic:"Baptism", q:"What is the 'chrism' used in Catholic baptism?", opts:["Water blessed by the bishop for baptism", "A candle representing the light of Christ", "A piece of white cloth given to the child", "Consecrated oil used to anoint the person"], ans:3, exp:"<strong>Chrism = consecrated oil</strong> used to anoint — signifies the gift of the Holy Spirit and priest/prophet/king calling."},
  {topic:"Prophet Amos", q:"Where was Amos from?", opts:["Tekoa — a village in Judah, the Southern Kingdom", "Babylon", "Jerusalem", "Nazareth"], ans:0, exp:"Amos was from <strong>Tekoa</strong>, near Bethlehem in Judah."},
  {topic:"Baptism", q:"What does the white garment symbolise in Infant Baptism?", opts:["Purity and new life in Christ — Original Sin has been washed away", "The Holy Spirit", "The Church community", "The priest's role"], ans:0, exp:"White garment = <strong>purity and new life in Christ</strong>."},
  {topic:"Miracles", q:"What does Jesus say to Lazarus to raise him?", opts:["'Your faith has healed you'", "'Be opened'", "'Lazarus, come out!'", "'Rise and walk'"], ans:2, exp:"Jesus commands: <strong>'Lazarus, come out!'</strong> — and Lazarus walks out of the tomb still wrapped in burial cloths."},
  {topic:"Miracles", q:"What does the miracle of the Feeding of the 5,000 reveal about Jesus's character?", opts:["That fish is important", "That he disliked crowds", "His compassion — he was 'moved with pity' and refused to send the hungry crowd away", "That he was a good organiser"], ans:2, exp:"Feeding 5,000 reveals <strong>Jesus's compassion</strong> — he was 'moved with pity' for the hungry crowd."},
  {topic:"Acts of Mercy", q:"What are the 'Spiritual Works of Mercy'?", opts:["Performing charitable acts without payment", "Caring for spiritual needs — instruct, counsel, admonish, comfort, forgive, bear wrongs, pray for living and dead", "Praying for mercy from God for personal sins", "Building churches and funding religious education"], ans:1, exp:"<strong>Spiritual Works: instruct ignorant, counsel doubtful, admonish sinners, bear wrongs, forgive, comfort, pray for all.</strong>"},
  {topic:"Miracles", q:"How long had Lazarus been dead before Jesus arrived?", opts:["Two days", "One day", "Four days — making the miracle even more dramatic", "One week"], ans:2, exp:"Lazarus had been dead <strong>four days</strong> — emphasising that Jesus truly raised him, not just revived him."},
  {topic:"Parables", q:"What did Jesus mean by the 'hidden treasure' and 'pearl of great price' parables?", opts:["Spiritual things are found only by accident not by seeking", "Material wealth should be sought as God's blessing", "The Kingdom of God is of such supreme value that everything should be surrendered for it", "Christians should invest wisely in earthly things"], ans:2, exp:"<strong>Kingdom of supreme value — worth everything to obtain.</strong> Both men sold all they had; nothing compares to the Kingdom."},
  {topic:"Prophet Amos", q:"In whose reign did Amos preach?", opts:["King David", "King Nebuchadnezzar", "King Jeroboam II — a time of prosperity and inequality in the Northern Kingdom", "King Solomon"], ans:2, exp:"Amos preached under <strong>King Jeroboam II</strong> in the Northern Kingdom — a time of prosperity and unjust inequality."},
  {topic:"Prophet Amos", q:"What does Amos 5:24 demand from the Israelites?", opts:["More sacrifices", "Bigger temples", "Political revolution", "Justice and righteousness — 'let justice roll down like water'"], ans:3, exp:"Amos 5:24 demands <strong>justice and righteousness</strong> — not ritual, but real social justice."},
  {topic:"Miracles", q:"Why did Jesus ask 'Why are you so afraid? Do you still have no faith?' after calming the storm?", opts:["He was testing them for a grade", "He was angry", "He didn't understand their fear", "He wanted the disciples to reflect on their trust in God — even in his presence they had feared"], ans:3, exp:"Jesus challenges the disciples to <strong>reflect on their trust in God</strong> — faith means trusting even in the storm."},
  {topic:"Miracles", q:"How does the Catholic Church officially verify a miracle for canonisation?", opts:["By taking a vote among the College of Cardinals", "Through prayer services attended by the faithful", "Through rigorous medical investigation — must be instantaneous, complete and scientifically inexplicable", "By reading the lives of the saints and counting miracles"], ans:2, exp:"<strong>Catholic miracle verification: rigorous medical investigation</strong> — cures must be instantaneous, complete, lasting and medically inexplicable."},
  {topic:"Oscar Romero", q:"What were 'death squads' in El Salvador?", opts:["Tax collectors", "Prison guards", "Military exercises", "Government-linked paramilitary groups that killed political opponents, priests and community organisers"], ans:3, exp:"Death squads = <strong>government-linked paramilitary groups</strong> that assassinated opponents, priests and those defending the poor."},
  {topic:"Acts of Mercy", q:"How did Mother Teresa embody the Acts of Mercy in modern times?", opts:["By writing extensively about social justice issues", "By founding a global charitable organisation", "By caring personally for the dying, poor and sick in Calcutta — seeing Christ in each person", "By advocating politically for the rights of the poor"], ans:2, exp:"Mother Teresa <strong>cared personally for the dying and destitute, seeing Christ in each person</strong> — a direct embodiment of Matthew 25."},
  {topic:"Baptism", q:"What is the 'triple immersion' or 'triple pouring' in Baptism?", opts:["Water poured or immersion three times — once for each Person of the Trinity: Father, Son, Holy Spirit", "Three godparents", "Three prayers said", "Three separate ceremonies"], ans:0, exp:"<strong>Three pourings or immersions</strong> — one each for the Father, Son and Holy Spirit (Trinitarian structure)."},
  {topic:"Prophet Amos", q:"What was the historical context in which Amos preached?", opts:["During a period of prosperity in Israel under Jeroboam II — but with great inequality", "During the destruction of Jerusalem by the Romans", "During the Babylonian exile when Israel was enslaved", "Immediately after the Exodus from Egypt"], ans:0, exp:"Amos preached during <strong>Jeroboam II's reign — a time of material prosperity but severe economic injustice.</strong>"},
  {topic:"Baptism", q:"What is 'believers' baptism' and which Christians practice it?", opts:["Adult baptism on personal confession of faith — practiced by Baptists and evangelicals", "Second baptism after confirmation", "Baptism performed by immersion only", "Baptism performed in a river rather than a font"], ans:0, exp:"<strong>Believers' baptism = adult baptism on personal faith confession.</strong> Baptists, Pentecostals, many evangelicals."},
  {topic:"Parables", q:"Why did Jesus use parables?", opts:["To confuse people", "To avoid answering questions", "To make his teaching longer", "To teach complex truths accessibly — memorable stories from everyday life that challenged assumptions"], ans:3, exp:"Jesus used parables because they are <strong>accessible, memorable and challenging</strong> — using everyday situations to reveal deeper truths."},
  {topic:"Baptism", q:"What formula does the priest say when pouring water in Catholic Baptism?", opts:["'Be washed clean of all sin'", "'Welcome to the Church'", "'I baptise you in the name of the Father, the Son and the Holy Spirit'", "'Receive the Holy Spirit'"], ans:2, exp:"The Trinitarian formula: <strong>'I baptise you in the name of the Father, the Son and the Holy Spirit.'</strong>"},
  {topic:"Baptism", q:"Why might a Christian argue against infant baptism?", opts:["Water is too cold", "Children don't need God's grace", "Churches prefer adults", "The New Testament shows adults being baptised after professing faith — infants cannot make this personal decision"], ans:3, exp:"NT shows <strong>adults baptised after professing faith</strong> — infants cannot make the personal decision of faith required."},
  {topic:"Prophet Amos", q:"Complete: 'Let justice roll down like ___' (Amos 5:24)", opts:["gold", "fire", "water — and righteousness like an ever-flowing stream", "mountains"], ans:2, exp:"Amos 5:24: <strong>'Let justice roll down like water, and righteousness like an ever-flowing stream.'</strong>"},
  {topic:"Prophet Amos", q:"What specific sin did Amos condemn most forcefully?", opts:["The exploitation of the poor by the wealthy — selling the poor for silver, denying justice in courts", "Eating forbidden food", "Idol worship only", "Sabbath-breaking only"], ans:0, exp:"Amos condemned above all the <strong>exploitation of the poor</strong> — selling them for silver and perverting justice in courts."},
  {topic:"Acts of Mercy", q:"'Comfort the afflicted' is a Spiritual Act of Mercy. A modern example is:", opts:["A food bank", "Prison chaplaincy", "Funeral rites", "Pastoral care or counselling for those in emotional or spiritual distress"], ans:3, exp:"<strong>Pastoral care and counselling</strong> — comforting those in distress is the Spiritual Act 'comfort the afflicted'."},
  {topic:"Miracles", q:"How many baskets of leftovers were collected after the Feeding of the 5,000?", opts:["None", "7", "12", "5"], ans:2, exp:"<strong>12 baskets</strong> of leftovers — the abundance emphasises God's generous provision."},
  {topic:"Key Terms", q:"What does 'conscience' mean in Catholic teaching specifically?", opts:["What society tells us is right", "The voice of God within a person — the most secret core, which must be formed and followed", "A Church rule", "A feeling of guilt"], ans:1, exp:"Conscience = <strong>the voice of God within</strong> — 'the most secret core of a person' (Catechism). Must be well-formed and followed."},
  {topic:"Oscar Romero", q:"Complete the quote: 'If they kill me, I shall rise again in the ___'", opts:["arms of God", "Church", "Salvadoran people", "Word of God"], ans:2, exp:"'If they kill me, I shall rise again in the <strong>Salvadoran people</strong>.' — Romero accepted the possibility of martyrdom."},
  {topic:"Baptism", q:"What is a 'godparent' and what is their role?", opts:["A church elder who performs the baptism ceremony", "A relative who signs the baptism register", "A grandparent who provides a financial gift at baptism", "A person who promises to support the child's Christian upbringing"], ans:3, exp:"<strong>Godparent promises to support the child's Christian nurture</strong> and to be a spiritual mentor in their life."},
  {topic:"Acts of Mercy", q:"What does 'solidarity' mean in Catholic social teaching?", opts:["Recognising our shared humanity and responsibility to each other across social divisions", "Donating money to Catholic charities", "Attending Mass regularly with the local community", "Supporting Catholic schools and hospitals"], ans:0, exp:"<strong>Solidarity = shared humanity and mutual responsibility</strong> — we are all connected and responsible for each other's wellbeing."},
  {topic:"Parables", q:"In the Parable of the Rich Man and Lazarus, what happens after death?", opts:["Both are treated equally in the afterlife", "Lazarus is comforted in Abraham's side; the rich man suffers — reversal of earthly fortune", "The rich man's wealth follows him into the afterlife", "Both are given a second chance to repent"], ans:1, exp:"<strong>Complete reversal after death</strong> — Lazarus comforted, rich man tormented. A stark warning about ignoring suffering in life."},
  {topic:"Prophet Amos", q:"How does Amos connect to Catholic Social Teaching?", opts:["He doesn't", "He supports wealth creation", "His message of justice and care for the poor directly parallels Catholic Social Teaching's preferential option for the poor", "He taught about prayer only"], ans:2, exp:"Amos parallels <strong>Catholic Social Teaching</strong> — especially the preferential option for the poor and the call to social justice."},
  {topic:"Miracles", q:"What does the Feeding of the 5,000 foreshadow?", opts:["Holy Orders", "Baptism", "Confirmation", "The Last Supper/Eucharist — Jesus takes, blesses, breaks and gives"], ans:3, exp:"Feeding 5,000 foreshadows the <strong>Eucharist</strong> — same four actions: takes, blesses, breaks, gives."},
  {topic:"Acts of Mercy", q:"Hospice care is an example of which Corporal Act?", opts:["Bury the dead", "Clothe the naked", "Feed the hungry", "Visit the sick — accompanying those who are seriously ill or dying"], ans:3, exp:"Hospice care = <strong>Visit the sick</strong> — accompanying and caring for those who are seriously ill."},
  {topic:"Parables", q:"In the Good Samaritan, who passed by the injured man first?", opts:["A priest and a Levite", "Two Samaritans", "A soldier and a tax collector", "A farmer and a shepherd"], ans:0, exp:"A <strong>priest and a Levite</strong> — both religious figures — passed by without helping."},
  {topic:"Parables", q:"The Good Samaritan challenges which attitude?", opts:["Prayer is important", "Rich people should give more", "Farmers should be kinder", "Prejudice — the hero is a despised outsider, not the religious figures expected to help"], ans:3, exp:"The Good Samaritan challenges <strong>prejudice</strong> — the Samaritan (despised outsider) is the hero, not the priest or Levite."},
  {topic:"Key Terms", q:"What is Original Sin?", opts:["The belief that humanity is in a fallen state — a tendency towards selfishness away from God, removed through Baptism", "A sin committed by Adam and Eve personally only", "Any very serious sin", "The first sin recorded in the Bible only"], ans:0, exp:"Original Sin = <strong>humanity's fallen state</strong> — a condition not a personal sin, removed through Baptism."},
  {topic:"Oscar Romero", q:"How did the Vatican initially respond to Romero's prophetic stance?", opts:["The Pope publicly praised Romero in a major speech", "The Vatican ordered him to leave El Salvador", "There was tension — some Vatican officials worried about politicisation; Romero wrote to the Pope directly", "They immediately supported his work and praised him publicly"], ans:2, exp:"<strong>Vatican tension</strong> — some worried about political involvement. Romero wrote to Pope John Paul II explaining his position."},
  {topic:"Key Terms", q:"What is conscience?", opts:["A Church rule", "A type of prayer", "The inner sense of right and wrong — in Catholic teaching, the voice of God within a person", "A feeling of guilt"], ans:2, exp:"Conscience = <strong>the inner sense of right and wrong</strong> — in Catholic teaching, the voice of God within, which must be followed."},
  {topic:"Baptism", q:"In Believer's Baptism, why is full immersion used?", opts:["Because it's the Baptist tradition only", "Because it's more dramatic", "Because it's in the Bible once", "Because it better symbolises dying to the old life and rising to new life in Christ"], ans:3, exp:"Full immersion <strong>symbolises dying to the old life and rising to new life</strong> — a powerful enactment of Romans 6."},
  {topic:"Miracles", q:"What is a 'violation' miracle according to Hume?", opts:["An event that breaks a law of nature — e.g. resurrection, walking on water", "A false miracle performed to deceive believers", "A miracle that causes harm to someone", "A miracle performed without proper religious authority"], ans:0, exp:"<strong>Violation miracle = event that breaks a natural law</strong> — requires natural law to be set aside, not just unlikely."},
  {topic:"Acts of Mercy", q:"'Pray for the living and the dead' — which Act is this?", opts:["Corporal — physical", "Depends on context", "Spiritual — addresses the soul's deepest need", "Neither"], ans:2, exp:"<strong>Spiritual Act</strong> — prayer addresses the spiritual, not physical, needs of others."},
  {topic:"Key Terms", q:"What does 'messianic' mean?", opts:["A type of psalm", "Relating to the Messiah — the anointed one expected as saviour, believed by Christians to be Jesus", "A Jewish festival", "Relating to Moses"], ans:1, exp:"Messianic = <strong>relating to the Messiah</strong>. Christ is the Greek equivalent of the Hebrew Messiah (anointed one)."},
  {topic:"Acts of Mercy", q:"How does 'forgiveness' function as an act of mercy?", opts:["Forgiveness removes the legal consequences of someone's actions", "Forgiveness releases both the forgiver and forgiven from resentment — a spiritual work of mercy", "Forgiveness means pretending the wrong never happened", "Forgiveness is only possible after the other person apologises"], ans:1, exp:"<strong>Forgiveness as mercy releases both parties</strong> — the forgiver from resentment, the forgiven from guilt. A spiritual work of mercy."},
  {topic:"Baptism", q:"What are godparents responsible for?", opts:["Choosing the child's name", "Buying gifts", "Paying for the ceremony", "Supporting the parents in raising the child in the Catholic faith — and taking over if parents cannot"], ans:3, exp:"Godparents = <strong>support parents in raising the child in faith</strong> and take responsibility if parents cannot."},
  {topic:"Parables", q:"In the Parable of the Sower, what happens to seed on rocky ground?", opts:["It produces a great harvest", "Birds eat it", "It is choked by thorns", "It grows quickly but withers because it has no root — represents people with shallow faith"], ans:3, exp:"Rocky ground = <strong>grows quickly but withers without root</strong> — represents shallow faith that doesn't last under pressure."},
  {topic:"Oscar Romero", q:"Which Acts of Mercy did Romero live out through his ministry?", opts:["Comfort the afflicted, admonish sinners, instruct the ignorant — through his sermons and defence of human rights", "Visit the sick and feed the hungry only", "Only prayer", "None — he was a bishop, not a social worker"], ans:0, exp:"Romero lived out <strong>Spiritual Acts of Mercy</strong> — comforting the afflicted, admonishing sinners, defending the poor."},
  {topic:"Prophet Amos", q:"How does Oscar Romero connect to Amos?", opts:["Both spoke God's truth to unjust societies exploiting the poor — living out the prophetic tradition at personal cost", "Both were from the same country", "Both were priests", "Both wrote the same books"], ans:0, exp:"Both Amos and Romero <strong>spoke God's truth to unjust, unequal societies</strong> — challenging empty religion and defending the poor."},
  {topic:"Miracles", q:"What is David Hume's argument against miracles?", opts:["Miracles are possible but cannot be witnessed", "Miracles are genuine but too rare to be scientifically studied", "Only God can perform miracles not humans", "A miracle violates natural law — testimony for it can never outweigh testimony for natural law"], ans:3, exp:"Hume argued <strong>testimony for miracles never outweighs evidence for natural law</strong> — the improbable always less likely than the merely false testimony."},
  {topic:"Key Terms", q:"What is the difference between a priest and a prophet?", opts:["A priest mediates between God and people through ritual and sacrifice; a prophet speaks God's word, often challenging injustice", "A prophet is higher than a priest", "A priest is always ordained", "No difference"], ans:0, exp:"<strong>Priest = mediates through ritual. Prophet = speaks God's word</strong>, often challenging society. Different roles."},
  {topic:"Baptism", q:"A key argument FOR infant baptism is:", opts:["Faith is a gift from God — it is given, not earned, and parents want the best for their child from birth", "Babies choose their religion", "The Bible commands it explicitly", "Infants are more holy than adults"], ans:0, exp:"Faith is <strong>a gift, not an achievement</strong> — Catholic teaching says God's grace acts from the beginning, not just when we decide."},
  {topic:"Prophet Amos", q:"What does Amos's 'plumb line' vision mean?", opts:["A measurement of how much Israel has grown", "God measuring Israel against a straight standard of justice — they have fallen short", "A call to rebuild the temple correctly", "A warning that the walls of Jerusalem will fall"], ans:1, exp:"<strong>Plumb line = God measuring Israel against a straight standard.</strong> Israel is crooked — judgement is inevitable."},
  {topic:"Parables", q:"What does the older son in the Prodigal Son represent?", opts:["Angels", "Israel's enemies", "The disciples", "Those who resent God's mercy being given to sinners — the self-righteous"], ans:3, exp:"The older son represents <strong>those who resent God's mercy</strong> towards sinners — challenging self-righteous attitudes."},
  {topic:"Acts of Mercy", q:"Why is 'bury the dead' included as an Act of Mercy?", opts:["It is the most important Act", "Only priests need to do this", "It reflects the dignity of the human body and care for the bereaved", "It's outdated"], ans:2, exp:"'Bury the dead' reflects <strong>the dignity of the human body</strong> and pastoral care for those left behind."},
  {topic:"Miracles", q:"How many loaves and fish did Jesus use to feed the 5,000?", opts:["5 loaves and 2 fish", "2 loaves and 5 fish", "7 loaves and 3 fish", "10 loaves and 5 fish"], ans:0, exp:"<strong>5 loaves and 2 fish</strong> — from a boy in the crowd (John 6:9)."},
  {topic:"Oscar Romero", q:"What transformed Romero from conservative to prophetic voice?", opts:["A private vision", "Reading the Bible", "A letter from the Pope", "The assassination of his friend Fr Rutilio Grande — killed for defending the poor"], ans:3, exp:"The murder of <strong>Fr Rutilio Grande</strong> — Romero's friend, killed for working with the poor — transformed him."},
  {topic:"Oscar Romero", q:"What was Romero's famous Sunday broadcast and why was it significant?", opts:["Radio homilies heard by 70% of El Salvador — he spoke truth to power weekly", "A prayer service broadcast from the cathedral each week", "A newspaper column published throughout Latin America", "A weekly television programme broadcast nationally"], ans:0, exp:"<strong>Radio homilies heard by ~70% of Salvadorans</strong> — Romero's voice reached people the government couldn't silence."},
  {topic:"Prophet Amos", q:"What is the connection between Amos and the concept of 'external religion'?", opts:["Amos is the primary biblical critic of external religion — worshipping God outwardly while acting unjustly", "Amos supported external religion", "Amos invented the term", "They are unrelated"], ans:0, exp:"Amos is the <strong>primary biblical critic of external religion</strong> — his message is that ritual means nothing without justice."},
  {topic:"Parables", q:"In the Parable of the Sower, what does seed among thorns represent?", opts:["People who share their faith", "People who never hear God's word", "People who reject God outright", "People whose faith is choked by worries, wealth and the distractions of life"], ans:3, exp:"Thorns = <strong>worries, wealth and the distractions of life</strong> choking faith before it can grow."},
  {topic:"Parables", q:"Why did Jesus teach in parables according to Mark's Gospel?", opts:["Parables were the traditional Jewish method of teaching law", "Because his disciples were not educated enough for direct teaching", "To conceal truth from those unwilling to receive it while revealing it to those who seek", "Because stories were more entertaining for large crowds"], ans:2, exp:"Mark 4: parables <strong>reveal to those who seek and conceal from those unwilling</strong> — they demand active engagement."},
  {topic:"Key Terms", q:"What is 'agnosticism'?", opts:["Belief in many gods", "Belief that God is unknowable but present", "The view that God's existence cannot be known", "Active rejection of God's existence"], ans:2, exp:"<strong>Agnosticism = God's existence cannot be known or proved</strong> (unlike atheism which actively denies God)."},
  {topic:"Parables", q:"What is the central message of the Prodigal Son?", opts:["We must earn forgiveness", "Sin has consequences", "Older children are more faithful", "God's forgiveness is unconditional — the father runs to meet the returning son"], ans:3, exp:"Prodigal Son: <strong>God's forgiveness is unconditional</strong> — the father runs to meet the son before he finishes his apology."},
  {topic:"Parables", q:"The Prodigal Son and the Lost Sheep both teach about:", opts:["God's active love for the lost and his joy when they return — repentance and restoration", "The importance of hard work", "The end of the world", "Rules and obedience"], ans:0, exp:"Both teach about <strong>God's love for the lost and joy at their return</strong> — the theme of repentance and restoration."},
  {topic:"Miracles", q:"Why might miracles be considered evidence for God's existence?", opts:["They show that natural law is not as fixed as scientists claim", "They happen too frequently to be coincidences", "They prove the Bible is literally true in every detail", "They suggest an agent capable of overriding natural law exists — consistent with a personal, intervening God"], ans:3, exp:"<strong>Miracles suggest an intervening personal God</strong> — consistent with theism. However, they presuppose God rather than proving him."},
  {topic:"Oscar Romero", q:"When was Oscar Romero canonised?", opts:["1980", "2005", "1990", "2018 — by Pope Francis"], ans:3, exp:"Romero was canonised by <strong>Pope Francis on 14 October 2018</strong>."},
  {topic:"Oscar Romero", q:"On what date was Romero assassinated and what was he doing?", opts:["30 May 1980, visiting a refugee camp", "15 January 1980, preparing to leave the country", "7 November 1979, giving a radio broadcast", "24 March 1980, celebrating Mass — shot at the altar"], ans:3, exp:"<strong>24 March 1980 — shot while celebrating Mass.</strong> Assassinated at the altar — his martyrdom happened during the Eucharist."},
  {topic:"Baptism", q:"What is the Paschal Candle?", opts:["The large Easter candle representing the Risen Christ — the baptismal candle is lit from it", "A candle lit at every Mass", "A candle given to godparents", "A candle used in Advent"], ans:0, exp:"The Paschal Candle = <strong>the large Easter candle representing the Risen Christ</strong> — baptismal candles are lit from it."},
  {topic:"Key Terms", q:"What is the Decalogue?", opts:["A book of psalms", "The story of creation", "The Sermon on the Mount", "The Ten Commandments given by God to Moses at Sinai"], ans:3, exp:"Decalogue = <strong>the Ten Commandments</strong> — from Greek 'deka' (ten) + 'logos' (words)."},
  {topic:"Parables", q:"What does the 'good soil' represent in the Parable of the Sower?", opts:["Rich farmland in Israel", "People who go to church every week", "People with open, receptive hearts who hear God's word and let it bear fruit in their lives", "Professional theologians"], ans:2, exp:"Good soil = <strong>open, receptive hearts</strong> — people who hear God's word and let it produce fruit."},
  {topic:"Parables", q:"What is the central message of the Parable of the Talents?", opts:["Wealth is always a blessing from God", "We should share everything we have equally", "We must use and develop the gifts God has given us — burying them is unacceptable", "The servant with least is treated most fairly"], ans:2, exp:"<strong>Talents = using gifts God gives.</strong> Burying them (the third servant) is condemned — stewardship of gifts is required."},
  {topic:"Prophet Amos", q:"How is Amos relevant to modern issues of global inequality?", opts:["His call for justice challenges modern economic systems that exploit the poor globally", "His prophecy applies only to ancient Israel", "His message applies only to religious institutions", "His prophecy is about environmental destruction, not inequality"], ans:0, exp:"<strong>Amos's call for justice challenges modern inequality</strong> — the exploitation of poor nations by wealthy ones mirrors his critique."},
  {topic:"Baptism", q:"How many sacraments are there in the Catholic Church?", opts:["7", "12", "5", "3"], ans:0, exp:"There are <strong>7 sacraments</strong> in the Catholic Church. Baptism is the first."},
  {topic:"Prophet Amos", q:"Which modern figure is most often compared to Amos?", opts:["Pope John Paul II", "Oscar Romero — both spoke God's truth to unjust wealthy societies at personal cost", "Mother Teresa", "Billy Graham"], ans:1, exp:"<strong>Oscar Romero</strong> is most often compared to Amos — both prophets who challenged injustice and paid a price."},
  {topic:"Oscar Romero", q:"Romero's feast day is:", opts:["24 March — the date of his assassination", "25 December", "1 November", "14 October"], ans:0, exp:"Romero's feast day is <strong>24 March</strong> — the date of his assassination in 1980."},
  {topic:"Key Terms", q:"What does 'omnibenevolent' mean when describing God?", opts:["All-knowing — God knows everything", "Present everywhere — God is in all places", "All-powerful — God can do anything", "All-loving and perfectly good — God is wholly good"], ans:3, exp:"<strong>Omnibenevolent = all-loving and perfectly good.</strong> Omni = all. Benevolent = well-wishing/good."},
  {topic:"Parables", q:"From which Gospel does the Good Samaritan come?", opts:["Luke 10", "Matthew", "Mark", "John"], ans:0, exp:"The Good Samaritan is in <strong>Luke 10:25–37</strong>."},
  {topic:"Acts of Mercy", q:"Water Aid providing clean water to developing countries is an example of:", opts:["Give drink to the thirsty — the 2nd Corporal Act of Mercy", "Visit the sick", "Feed the hungry", "Shelter the homeless"], ans:0, exp:"Water Aid = <strong>Give drink to the thirsty</strong> — the 2nd Corporal Act of Mercy."},
  {topic:"Oscar Romero", q:"Pope Francis canonised Romero because:", opts:["He was recognised as a martyr who died for his faith and defence of the poor — a model of the Gospel in action", "He was Salvadoran", "He died violently", "He was Archbishop for a long time"], ans:0, exp:"Romero was canonised as a <strong>martyr — dying for his faith and defence of the poor</strong>, a model of the Gospel lived fully."},
  {topic:"Key Terms", q:"What is a 'sacrament' in Catholic Christianity?", opts:["A religious ceremony performed only by a priest", "A book of sacred texts and scriptures", "A prayer said in Latin", "A visible, physical sign of invisible spiritual grace"], ans:3, exp:"<strong>Sacrament = visible sign of invisible grace.</strong> Catholics have 7 sacraments including baptism and eucharist."},
  {topic:"Key Terms", q:"What does 'Advent' mean etymologically?", opts:["Coming or arrival — from Latin 'adventus'", "Waiting", "Light", "Holy"], ans:0, exp:"Advent = from Latin <strong>'adventus' meaning 'coming' or 'arrival'</strong>."},
  {topic:"Acts of Mercy", q:"What does Jesus say in Matthew 25 about caring for 'the least of these'?", opts:["Caring for the hungry, thirsty, stranger, sick and prisoner IS caring for Christ himself", "Charity should be given privately without public acknowledgement", "Only priests and religious are called to care for the poor", "The poor should help themselves before asking others"], ans:0, exp:"<strong>Matthew 25: 'Whatever you did for the least of these brothers, you did for me.'</strong> Christ is found in the suffering."},
  {topic:"Oscar Romero", q:"How did Romero communicate with the Salvadoran people most effectively?", opts:["Through newspapers", "Through books", "Through private letters", "Through weekly radio broadcasts heard across the country"], ans:3, exp:"Romero used <strong>weekly radio broadcasts</strong> — listened to across El Salvador — to document abuses and preach the Gospel."},
  {topic:"Prophet Amos", q:"What does Amos teach about the relationship between worship and justice?", opts:["Justice is more important than worship — or rather, true worship must include justice", "Worship is more important than justice", "Only priests need to be just", "They are completely separate"], ans:0, exp:"Amos teaches: <strong>true worship must include justice</strong> — they cannot be separated. Religion without justice is empty."}
  ]
};
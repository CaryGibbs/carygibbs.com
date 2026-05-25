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
      subtitle:"Your approach in the exam",
      quizTopic:"Reading a Poem",
      subtopics:[
        { title:"Step 1: Read the question first",    detail:"Highlight the command (key) words — your compass for the whole essay",    lessonKey:"reading-q-first" },
        { title:"Step 2: First read for understanding",detail:"Read through once — get the subject, mood and general meaning",          lessonKey:"reading-first-read" },
        { title:"Step 3: Annotate using the question", detail:"Re-read, highlighting techniques and quotes that link to command words",  lessonKey:"reading-annotate" },
        { title:"Step 4: Plan your essay",             detail:"Thesis + 3 topic sentences + quotes and techniques under each",          lessonKey:"reading-plan" },
      ]
    },
    {
      topic:"Essay Writing", icon:"✍️", theme:"violet",
      subtitle:"Structure and approach",
      quizTopic:"Essay Writing",
      subtopics:[
        { title:"Writing your introduction",   detail:"Thesis + command words + writer's purpose + optional summarising quote",  lessonKey:"essay-intro" },
        { title:"Writing topic sentences",     detail:"Your argument + command words — the P in PETAL",                         lessonKey:"essay-topic-sentences" },
        { title:"Structuring body paragraphs", detail:"PETAL: Point → Evidence → Technique → Analysis → Link",                lessonKey:"essay-body" },
        { title:"Writing a conclusion",        detail:"Return to thesis · summarise · comment on writer's overall purpose",     lessonKey:"essay-conclusion" },
        { title:"Exam technique tips",         detail:"Timing, how much to write, always answering the question",              lessonKey:"essay-exam-tips" },
      ]
    },
    {
      topic:"PETAL", icon:"🌸", theme:"gold",
      subtitle:"Your paragraph structure",
      quizTopic:"PETAL",
      subtopics:[
        { title:"P — Point (topic sentence)",       detail:"Your argument answering the question — include command words",            lessonKey:"petal-p" },
        { title:"E — Evidence (quotation)",         detail:"Short, precise quote in single inverted commas, embedded in sentence",    lessonKey:"petal-e" },
        { title:"T — Technique (name & explain)",   detail:"Name the device using subject terminology + simple first interpretation", lessonKey:"petal-t" },
        { title:"A — Analysis (deep word-level)",   detail:"Individual word connotations, alternative interpretations, effect",      lessonKey:"petal-a" },
        { title:"L — Link (back to question)",      detail:"Restate point with command words + comment on writer's purpose",        lessonKey:"petal-l" },
      ]
    },
    {
      topic:"Poetic Techniques", icon:"🎭", theme:"teal",
      subtitle:"Devices and their effects",
      quizTopic:"Poetic Techniques",
      subtopics:[
        { title:"Figurative language",        detail:"Simile (like/as) · Metaphor (IS) · Personification · Pathetic fallacy",   lessonKey:"techniques-figurative" },
        { title:"Sound devices",              detail:"Alliteration · Assonance · Sibilance · Onomatopoeia",                     lessonKey:"techniques-sound" },
        { title:"Structural devices",         detail:"Enjambment · Caesura · Volta · Rhyme scheme · Stanza form",              lessonKey:"techniques-structure" },
        { title:"Word choices",               detail:"Noun · Verb · Adjective · Adverb · Connotations",                        lessonKey:"techniques-words" },
        { title:"Repetition & contrast",      detail:"Anaphora · Juxtaposition · Oxymoron · Listing/accumulation",             lessonKey:"techniques-repetition" },
      ]
    },
    {
      topic:"Sentence Stems", icon:"💬", theme:"coral",
      subtitle:"How to phrase your analysis",
      quizTopic:"Sentence Stems",
      subtopics:[
        { title:"Introducing a technique",         detail:"The [technique] '[quote]' suggests/implies/conveys…",               lessonKey:"stems-technique",  formula:"The simile '…' suggests…" },
        { title:"Word-level analysis",             detail:"The [word class] '[word]' here implies… / The connotations of '…'", lessonKey:"stems-word-level", formula:"The noun 'pearl' implies…" },
        { title:"Alternative interpretation",      detail:"It could also suggest… / Alternatively… / Another reading is…",   lessonKey:"stems-alternative" },
        { title:"Effect on the reader",            detail:"This makes the reader feel… / This creates a sense of…",           lessonKey:"stems-effect" },
        { title:"Structural analysis",             detail:"The [enjambment/caesura/rhyme scheme] creates/emphasises…",        lessonKey:"stems-structure" },
      ]
    },
    {
      topic:"Terminology", icon:"📚", theme:"blue",
      subtitle:"Key vocabulary to use",
      quizTopic:"Terminology",
      subtopics:[
        { title:"Form & structure terms",   detail:"Stanza · Couplet · Quatrain · Sonnet · Free verse · Refrain · Volta",     lessonKey:"term-form" },
        { title:"Rhyme & rhythm",           detail:"ABAB / AABB rhyme schemes · Rhyming couplet · Half-rhyme · Metre",       lessonKey:"term-rhyme" },
        { title:"Voice & perspective",      detail:"Persona · Speaker · 1st/2nd/3rd person · Dramatic monologue",            lessonKey:"term-voice" },
        { title:"Tone & mood vocabulary",   detail:"Melancholic · Nostalgic · Elegiac · Defiant · Contemplative · Tender",   lessonKey:"term-tone" },
        { title:"Word class terms",         detail:"Noun · Verb · Adjective · Adverb · Pronoun — and how to use them",       lessonKey:"term-wordclass" },
      ]
    },
    {
      topic:"Analysis Method", icon:"🔬", theme:"pink",
      subtitle:"The 8-step analysis technique",
      quizTopic:"Analysis Method",
      subtopics:[
        { title:"Steps 1–4: Finding & labelling",   detail:"Pick quote → simple statement → alternative → label key terms",    lessonKey:"analysis-finding" },
        { title:"Steps 5–8: Writing it up",         detail:"Word-level → more words → structure → link back to question",      lessonKey:"analysis-writing" },
        { title:"Worked example in full",           detail:"Complete 8-step paragraph on 'shower of pearls'",                  lessonKey:"analysis-worked" },
        { title:"Analysis checklist",               detail:"Always link back · discuss WHY this word · use subject terminology", lessonKey:"analysis-checklist" },
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
    { title:"Read the question carefully — twice", detail:"The question is the most important text on the page.", formula:"'How does the poet present his feelings about his childhood home?'" },
    { title:"Underline/highlight the command words", detail:"These are your focus words.", formula:"Command words: 'present' · 'feelings' · 'childhood home'" },
    { title:"Restate the question in your own words", detail:"This confirms you understand it.", formula:"'What techniques does the poet use to show how he feels about where he grew up?'" },
    { title:"Keep returning to the command words throughout", detail:"After every paragraph, check: have I used the command words?", formula:"" },
  ],
  worked:[{ q:"Question: 'How does the poet present his feelings about his childhood home?'", lines:[
    { step:"Command words", expr:"'present' · 'feelings' · 'childhood home'", why:"Must appear in every paragraph" },
    { step:"What to analyse", expr:"Language AND structure techniques", why:"'Present' = how does he use language/structure?" },
    { step:"What to argue", expr:"What feelings? (love, nostalgia, loss, longing?)", why:"'Feelings' = the emotional content" },
    { step:"What to focus on", expr:"Images and words connected to home and childhood", why:"'Childhood home' = the subject matter", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Highlighting tip:</strong> Different colours for different command words. Use the same colours when annotating the poem." },
    { icon:"⭐", text:"<strong>If you don't answer the question, you can't get top marks</strong> — no matter how much you know. Always return to those command words." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Writing about every technique without linking to the question. Every point must connect to the command words." },
    { text:"<strong>Common mistake:</strong> Only using command words in the introduction. They should appear in EVERY paragraph." },
  ],
  practice:[
    { q:"'How does the poet present feelings of loss?' — what are the command words?", opts:["poet, present, loss","How, does, the","present, feelings, loss","poem, language, techniques"], ans:2, exp:"<strong>'present', 'feelings', 'loss'</strong> — these tell you to analyse how language/structure conveys the emotion of loss." },
    { q:"A paragraph about rhyme scheme doesn't mention 'loss'. The problem is:", opts:["Too short","Doesn't use command words — not answering the question","Rhyme isn't worth analysing","Wrong pen colour"], ans:1, exp:"Even a well-written paragraph won't score if it doesn't connect to the <strong>command words</strong>." },
    { q:"After each paragraph you should:", opts:["Start a new page","Check you've used the command words","Write a new thesis","Count your words"], ans:1, exp:"After each paragraph, <strong>check you've used the command words</strong>." },
    { q:"Why do command words matter most?", opts:["They look good","All marks come from answering the question","They're bold","The teacher likes them"], ans:1, exp:"<strong>All marks come from answering the question.</strong> Command words are your guide to every mark." },
  ],
  prevLesson:null,
  nextLesson:{ key:"reading-first-read", label:"Step 2: First Read" }
},

"reading-first-read": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 2: First Read for Understanding",
  subtitle:"Read the whole poem once without stopping to analyse — get the big picture first.",
  keyIdea:{ rule:"First read = understanding the poem. Second read = finding the evidence.", detail:"Don't try to analyse on your first read — you'll get lost in details and miss the overall meaning, mood and subject." },
  formulae:[{ main:"What's happening? · What's the mood? · What's the subject? · How does it make you feel?", note:"Answer these four questions after your first read" }],
  steps:[
    { title:"Read all the way through without stopping", detail:"Resist the urge to annotate. Just read.", formula:"" },
    { title:"What is literally happening?", detail:"Summarise in one or two sentences.", formula:"'A man remembers his childhood home with deep affection and sadness at having lost it.'" },
    { title:"Identify the mood/tone", detail:"How does the poem feel? Joyful? Sad? Nostalgic?", formula:"Nostalgic and melancholic — the speaker longs for something lost." },
    { title:"Notice beginning and end", detail:"Does the mood shift? Does it end differently to how it began?", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>The title often helps:</strong> 'My Early Home' signals immediately: personal, nostalgic, about childhood." },
    { icon:"⭐", text:"<strong>Trust your first impression of mood</strong> — if it feels sad, it probably is. Name that feeling and explore how the poet creates it." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Starting to annotate on the first read. Understand the whole before analysing parts." },
  ],
  practice:[
    { q:"Purpose of the first read?", opts:["Identify every technique","Get overall understanding of subject, mood and meaning","Write your introduction","Count the stanzas"], ans:1, exp:"First read = <strong>overall understanding</strong>." },
    { q:"'The speaker lovingly describes his childhood home and feels sad to have lost it.' Is this a useful first read summary?", opts:["No — too simple","Yes — captures subject and mood as a starting point","No — need every technique","Only with quotes"], ans:1, exp:"<strong>Yes!</strong> Subject + mood is exactly what you need from a first read." },
    { q:"Four things to identify on first read?", opts:["Rhyme, rhythm, metre, syllables","What's happening · mood · subject · how it makes you feel","Intro · body · conclusion · link","Title · stanzas · lines · words"], ans:1, exp:"<strong>What's happening? Mood? Subject? How does it make you feel?</strong>" },
    { q:"'My early home was this' is repeated at the end of several stanzas. What might this suggest?", opts:["The poet ran out of ideas","It's unfinished","The repetition (refrain) emphasises how central and unforgettable this place is","It's a mistake"], ans:2, exp:"A <strong>refrain</strong> creates emphasis and a haunting quality — this place is central to the speaker's identity." },
  ],
  prevLesson:{ key:"reading-q-first", label:"Step 1: Read the Question" },
  nextLesson:{ key:"reading-annotate", label:"Step 3: Annotate" }
},

"reading-annotate": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 3: Annotate Using the Question",
  subtitle:"On your second read, highlight techniques, devices and quotes that connect to the command words.",
  keyIdea:{ rule:"Every annotation must connect to the command words — not just 'I notice a simile', but 'this simile connects to [command word] because…'", detail:"" },
  formulae:[{ main:"Highlight quote → label technique → note what it suggests linked to the question", note:"" }],
  steps:[
    { title:"Highlight quotes connecting to command words", detail:"Not everything — the most relevant ones.", formula:"" },
    { title:"Label the technique", detail:"Simile, metaphor, alliteration, noun, verb…", formula:"'bower of bliss' → alliteration (plosive b)" },
    { title:"Note what each technique suggests", detail:"A brief phrase that becomes your analysis note.", formula:"Alliteration → emphasises strength of his love for home" },
    { title:"Look for structural features too", detail:"Enjambment, caesura, rhyme scheme, volta.", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Aim for 4–6 strong annotations</strong> rather than 20 surface-level ones. Quality beats quantity." },
    { icon:"⭐", text:"<strong>Two or three good quotes per paragraph</strong> is enough. Depth of analysis matters more than number of quotes." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Annotating everything without checking relevance. Keep returning to the command words." },
  ],
  practice:[
    { q:"Every annotation should connect to:", opts:["The poet's biography","The command words in the question","Syllable count","The rhyme scheme only"], ans:1, exp:"Every annotation must connect to the <strong>command words</strong>." },
    { q:"A student labels 'like a shower of pearls' as 'simile'. What must they add?", opts:["Nothing","What the simile suggests in relation to the question","The definition of simile","Syllable count"], ans:1, exp:"Label + <strong>what it suggests</strong> in relation to command words." },
    { q:"How many strong annotations should you aim for?", opts:["30+","20","4–6 strong developed ones","Just one per stanza"], ans:2, exp:"<strong>4–6 strong annotations</strong> — quality over quantity." },
    { q:"What structural features should you annotate?", opts:["Font size","Enjambment, caesura, rhyme scheme, volta","The poet's name","Publication date"], ans:1, exp:"<strong>Enjambment, caesura, rhyme scheme, volta and stanza structure</strong> — all deliberate choices." },
  ],
  prevLesson:{ key:"reading-first-read", label:"Step 2: First Read" },
  nextLesson:{ key:"reading-plan", label:"Step 4: Plan" }
},

"reading-plan": {
  topic:"Reading a Poem", topicKey:"Reading a Poem", theme:"rose", icon:"👁️",
  title:"Step 4: Plan Your Essay",
  subtitle:"Spend 3–5 minutes planning before you write a single sentence — a clear plan equals a well-structured essay.",
  keyIdea:{ rule:"Thesis statement + 3 topic sentences + quotes and techniques under each = your complete plan", detail:"A plan doesn't need full sentences — just key points, quotes and techniques. This stops you going off-topic." },
  formulae:[{ main:"Thesis → Topic 1 (quote+technique) → Topic 2 → Topic 3", note:"Check: do all three topic sentences connect to command words?" }],
  steps:[
    { title:"Write your thesis statement", detail:"Your overall argument answering the question in one sentence.", formula:"'Clare presents his childhood home as a paradise of beauty and safety that he deeply mourns having lost.'" },
    { title:"Write three topic sentences", detail:"Each makes a different point supporting your thesis with command words.", formula:"1. Home as natural beauty · 2. Home as safety/comfort · 3. Grief of loss" },
    { title:"Add quotes and techniques under each", detail:"Short notes — you'll expand in the essay.", formula:"Quote: 'shower of pearls' · Technique: simile · Suggests: precious, beautiful, rare" },
    { title:"Check your plan answers the question", detail:"Read back your three topic sentences — do they all use command words?", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>5 minutes planning saves 15 minutes of confused writing.</strong> Students who plan write better essays." },
    { icon:"⭐", text:"<strong>Three topic sentences should each make a DIFFERENT point</strong> — not the same point three times." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Skipping the plan. Without one, essays repeat points or go off-topic." },
  ],
  practice:[
    { q:"A good essay plan includes:", opts:["Every technique in the poem","Thesis + 3 topic sentences + quotes/techniques under each","Full draft of each paragraph","The poem copied out"], ans:1, exp:"Plan = <strong>thesis + 3 topic sentences + notes on quotes and techniques</strong>." },
    { q:"How long should planning take?", opts:["No time","Whole exam","3–5 minutes","20 minutes"], ans:2, exp:"<strong>3–5 minutes</strong> — enough structure without eating into writing time." },
    { q:"A good thesis for 'How does the poet present feelings about his childhood home?':", opts:["This poem has lots of techniques.","Clare presents his childhood home as a precious paradise he deeply mourns having lost.","I will discuss three paragraphs.","The poem is about a house."], ans:1, exp:"Good thesis: <strong>directly answers question, specific, arguable, uses command words</strong>." },
    { q:"What should you check about your three topic sentences?", opts:["Same colour","Each makes a different point and connects to command words","Same length","Don't mention poet"], ans:1, exp:"Each must make a <strong>different point</strong> and connect to the <strong>command words</strong>." },
  ],
  prevLesson:{ key:"reading-annotate", label:"Step 3: Annotate" },
  nextLesson:{ key:"essay-intro", label:"Writing Your Introduction" }
},

/* ════════ ENGLISH — ESSAY WRITING ════════ */
"essay-intro": {
  topic:"Essay Writing", topicKey:"Essay Writing", theme:"violet", icon:"✍️",
  title:"Writing Your Introduction",
  subtitle:"Set out your main argument, establish your approach, show you're answering the question from sentence one.",
  keyIdea:{ rule:"Thesis statement + command words + writer's purpose + optional summarising quote", detail:"Keep it brief: 3–5 sentences. Don't analyse quotes in the introduction — save that for body paragraphs." },
  formulae:[{ main:"In '[poem]', [poet] presents [command subject] as [your specific argument].", note:"Include poet, poem title, command words, clear argument" }],
  steps:[
    { title:"Start with a clear thesis statement", detail:"Your main argument. Include poet's name and poem title.", formula:"'In \"My Early Home\", Clare presents his childhood home as…'" },
    { title:"Use the command words", detail:"Make it obvious you're answering the question from sentence one.", formula:"'present', 'feelings', 'childhood home' — all from question" },
    { title:"Mention the writer's purpose", detail:"What is the poet trying to make the reader feel or think?", formula:"'Clare seems to want to convey both the beauty of his past and his grief at having lost it'" },
    { title:"Optional: a brief summarising quote", detail:"One short quote that captures your argument.", formula:"'My early home was this' — repeated refrain captures his longing" },
  ],
  compare:[
    { good:"In 'My Early Home,' Clare presents his childhood home as a place of perfect natural beauty and safety — a paradise he loved deeply and is now profoundly sad to have lost.", bad:"In this essay I will talk about the poem 'My Early Home' and its techniques." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Don't start with 'In this essay I will…'</strong> — jump straight into your argument." },
    { icon:"⭐", text:"<strong>Use single inverted commas for poem titles:</strong> 'My Early Home'." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Starting to analyse quotes in the introduction. Save that for body paragraphs." },
    { text:"<strong>Common mistake:</strong> Not using command words. 'This poem is about nature' doesn't answer the question." },
  ],
  practice:[
    { q:"What is a thesis statement?", opts:["A list of techniques","Your main argument you'll prove throughout the essay","A poem summary","The poet's biography"], ans:1, exp:"Thesis = <strong>your main argument</strong> — the specific point you'll prove across the whole essay." },
    { q:"Better introduction opener:", opts:["In this essay I will talk about the poem.","In 'My Early Home,' Clare presents his childhood home as a precious paradise he deeply mourns having lost.","The poem has lots of techniques.","John Clare was a 19th century poet."], ans:1, exp:"Best option: <strong>names poem and poet, uses command words, makes specific argument</strong>." },
    { q:"How long should your introduction be?", opts:["1 sentence","1 full page","3–5 sentences","As long as possible"], ans:2, exp:"<strong>3–5 sentences</strong> — establish your argument without eating into analytical paragraph time." },
    { q:"Should you analyse a quote in detail in your introduction?", opts:["Yes","No — save detailed analysis for body paragraphs","Only a really good quote","Only if poem is short"], ans:1, exp:"<strong>No</strong> — the introduction establishes your argument. Detailed analysis belongs in body paragraphs." },
  ],
  prevLesson:{ key:"reading-plan", label:"Step 4: Plan" },
  nextLesson:{ key:"essay-topic-sentences", label:"Topic Sentences" }
},

"essay-topic-sentences": {
  topic:"Essay Writing", topicKey:"Essay Writing", theme:"violet", icon:"✍️",
  title:"Writing Topic Sentences",
  subtitle:"A topic sentence opens your paragraph, states your argument, and includes the command words — it's the P in PETAL.",
  keyIdea:{ rule:"Topic sentence = your argument for THIS paragraph + command words from the question", detail:"A good topic sentence tells the examiner exactly what your paragraph will argue before they read a word of evidence." },
  formulae:[{ main:"In '[poem]', [poet] presents [command subject] as [your specific argument].", note:"" }],
  compare:[
    { good:"In 'My Early Home,' Clare presents his childhood home as a place of extraordinary natural beauty, using imagery of light and precious materials to convey how deeply he loved it.", bad:"John Clare uses a variety of techniques such as metaphors to present his feelings." },
  ],
  tips:[
    { icon:"💡", text:"<strong>Each topic sentence should make a DIFFERENT point.</strong> Don't write three paragraphs all saying 'Clare loved his home' — explore different angles." },
    { icon:"⭐", text:"<strong>Include poet, poem title, and command words</strong> in your topic sentence." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'Clare uses alliteration' — this names a technique, not an argument. A topic sentence should say WHAT the poet presents, not just name a technique." },
  ],
  practice:[
    { q:"Best topic sentence for a paragraph about home as a place of safety?", opts:["The poem uses metaphors.","In 'My Early Home,' Clare presents his childhood home as a sanctuary of warmth and protection where he felt completely safe.","Clare writes about his home.","There is imagery in this poem."], ans:1, exp:"Best: <strong>clear argument using command words and poem/poet reference</strong>." },
    { q:"'There are three similes in this poem.' What's wrong with this as a topic sentence?", opts:["Too long","Lists a technique but makes no argument — doesn't answer the question","Wrong tense","Perfectly fine"], ans:1, exp:"A topic sentence must <strong>make an argument</strong>, not just list a technique." },
    { q:"How many topic sentences does a three-paragraph essay need?", opts:["One","Two","Three — one per paragraph","Six"], ans:2, exp:"<strong>One topic sentence per paragraph.</strong>" },
    { q:"Should a topic sentence start with a quotation?", opts:["Yes — hooks the reader","No — start with your argument, then bring in the quote as Evidence","Only a short quote","Always"], ans:1, exp:"<strong>No</strong> — start with YOUR argument. The quote comes in as Evidence (E in PETAL)." },
  ],
  prevLesson:{ key:"essay-intro", label:"Writing Your Introduction" },
  nextLesson:{ key:"petal-p", label:"PETAL: P — Point" }
},

/* ════════ ENGLISH — PETAL ════════ */
"petal-p": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"P — Point (Your Topic Sentence)",
  subtitle:"The Point is your argument stated clearly, using the command words, at the start of the paragraph.",
  keyIdea:{ rule:"Make a specific, arguable claim that connects directly to the question", detail:"Don't start with a quote or a technique — start with YOUR argument. Everything else in the paragraph proves it." },
  formulae:[{ main:"In '[poem]', [poet] presents [command subject] as [specific argument].", note:"Include command words · Be specific · Make it arguable" }],
  compare:[
    { good:"In 'My Early Home,' Clare presents his childhood home as an idyllic paradise of natural beauty, suggesting he experienced it as a place of perfect joy and safety.", bad:"John Clare uses lots of techniques in his poem to write about his home." },
  ],
  tips:[{ icon:"💡", text:"<strong>The Point is your strongest, clearest statement</strong> of what you're about to argue. Everything that follows proves it." }],
  mistakes:[{ text:"<strong>Common mistake:</strong> Opening a paragraph with a quote. Always start with YOUR point first." }],
  practice:[
    { q:"Best Point to open a paragraph?", opts:["'The moonlight, like a shower of pearls' is a simile.","In 'My Early Home,' Clare presents feelings of profound loss, suggesting his home represents an irretrievable state of happiness.","The poem is about a house.","Clare uses similes."], ans:1, exp:"Best Point: <strong>clear argument with command words</strong>." },
    { q:"Should your Point start with a quote?", opts:["Yes","No — start with your argument, quote comes in Evidence","Only short quotes","Always"], ans:1, exp:"<strong>No</strong> — Point = YOUR argument. Quote = Evidence (E)." },
    { q:"Point must include:", opts:["Technique definition","Command words AND your specific argument","All techniques","The poem text"], ans:1, exp:"Point must include <strong>command words AND your specific argument</strong>." },
    { q:"Purpose of the Point in PETAL?", opts:["Summarise essay","State the specific argument you'll prove in this paragraph","List techniques","Introduce poet"], ans:1, exp:"Point = <strong>the specific argument for this paragraph</strong>." },
  ],
  prevLesson:{ key:"essay-topic-sentences", label:"Topic Sentences" },
  nextLesson:{ key:"petal-e", label:"E — Evidence" }
},

"petal-e": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"E — Evidence (Your Quotation)",
  subtitle:"A short, precise quote directly supporting your Point — always in single inverted commas.",
  keyIdea:{ rule:"Short, targeted, embedded — and directly supports your argument", detail:"A phrase — even a single word — can be more powerful than a full line. You need to be able to analyse every word in your quote." },
  formulae:[{ main:"'[short precise quote]' — in single inverted commas, woven into your sentence", note:"Don't just plonk the quote in — embed it naturally" }],
  steps:[
    { title:"Choose a quote proving your Point", detail:"Ask: does this quote show what I argued?", formula:"" },
    { title:"Keep it short and precise", detail:"A phrase beats a full sentence — you need to analyse every word.", formula:"✓ 'shower of pearls' rather than the whole three-line stanza" },
    { title:"Embed it naturally", detail:"Weave into your sentence.", formula:"'Clare describes the moonlight as a \"shower of pearls\", suggesting…'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Don't quote something you can't analyse.</strong> If you can't say WHY it's interesting word by word, choose a shorter quote." },
    { icon:"⭐", text:"<strong>Always single inverted commas: 'like this'.</strong>" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Quoting three or four lines when one phrase would do." },
  ],
  practice:[
    { q:"Better quote for arguing home is precious and beautiful?", opts:["The whole of stanza 3","'shower of pearls'","The whole poem","All the nature imagery"], ans:1, exp:"<strong>'shower of pearls'</strong> — short, precise, packed with analysable meaning." },
    { q:"How to present a quote in your essay?", opts:["CAPITALS","Italics","Single inverted commas: 'like this'","Brackets"], ans:2, exp:"Always <strong>single inverted commas</strong>." },
    { q:"How could this quote be improved: 'The moonlight, like a shower of pearls, / Fell o'er this bower of bliss.'?", opts:["Use double inverted commas","Shorten to 'shower of pearls' or 'bower of bliss' for closer word-level analysis","Quote even more","Don't use quotes"], ans:1, exp:"<strong>Shorten</strong> — a precise phrase allows deeper word-level analysis." },
    { q:"'Embedding a quote' means:", opts:["Putting on its own line","Weaving it into your own sentence naturally","Boxing it","Highlighting it"], ans:1, exp:"Embedding = <strong>weaving the quote into your own sentence</strong>: 'Clare describes the home as a \"bower of bliss\", suggesting…'" },
  ],
  prevLesson:{ key:"petal-p", label:"P — Point" },
  nextLesson:{ key:"petal-t", label:"T — Technique" }
},

"petal-t": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"T — Technique (Name & Explain)",
  subtitle:"Identify the technique, name it correctly using subject terminology, then write a simple first interpretation.",
  keyIdea:{ rule:"Name the SPECIFIC technique + write what THIS specific example suggests", detail:"Two parts: identify and name (simile, alliteration, noun) → simple statement of what it creates." },
  formulae:[{ main:"The [technique] '[quote]' suggests / implies / conveys [simple interpretation].", note:"Use precise subject terminology — not just 'language' or 'technique'" }],
  steps:[
    { title:"Identify the technique", detail:"Simile? Metaphor? Alliteration? Noun? Verb? Personification?", formula:"'like a shower of pearls' → simile" },
    { title:"Name it correctly", detail:"Specific subject terminology — not 'language'.", formula:"'The simile…' not 'The technique…'" },
    { title:"Simple statement of what it suggests", detail:"One clear sentence about what it conveys.", formula:"'…suggests his home was rare, precious and beautiful.'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Go beyond naming it.</strong> 'This is a simile' earns almost nothing — say what effect THIS specific simile creates." },
    { icon:"⭐", text:"<strong>Word class counts as technique.</strong> The noun 'pearl', verb 'fell', adjective 'early' — naming word classes and explaining effects shows subject knowledge." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poet uses a simile. Similes compare two things.' — this is a definition, not analysis. What does THIS one suggest?" },
  ],
  practice:[
    { q:"Complete: 'The simile \"shower of pearls\" _______'", opts:["is a comparison.","suggests his childhood home was a rare, precious and beautiful place.","uses like.","is very good."], ans:1, exp:"Name technique + <strong>what it suggests</strong>." },
    { q:"Student writes: 'Clare uses alliteration.' What must they add?", opts:["More punctuation","The effect — e.g. the plosive b sounds in 'bower of bliss' emphasise the forceful strength of his love","Definition of alliteration","Nothing"], ans:1, exp:"Naming alone earns very little. Must say <strong>what effect this specific alliteration creates</strong>." },
    { q:"Subject terminology means:", opts:["Big words","Technical language: simile, alliteration, noun…","Question command words","Poem title"], ans:0, exp:"Subject terminology = <strong>technical language of English literature</strong>." },
    { q:"'The noun \"pearl\" implies…' — what word class?", opts:["Verb","Adjective","Noun","Adverb"], ans:2, exp:"<strong>Noun</strong>. Identifying word classes and explaining effect shows precise analytical skill." },
  ],
  prevLesson:{ key:"petal-e", label:"E — Evidence" },
  nextLesson:{ key:"petal-a", label:"A — Analysis" }
},

"petal-a": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"A — Analysis (Deep Word-Level)",
  subtitle:"The highest-scoring part of your paragraph — zoom into individual words, offer alternative interpretations, discuss effects.",
  keyIdea:{ rule:"Zoom in on individual words. Offer at least TWO interpretations. Ask WHY the poet chose THIS specific word.", detail:"Analysis goes beyond what a technique is called. It explores what specific words connote, why the poet chose them, and how different readings are possible." },
  formulae:[{ main:"The [word class] '[word]' implies/connotes… It could also suggest… This makes the reader…", note:"Word-level + alternative interpretation + effect on reader = full analysis" }],
  steps:[
    { title:"Zoom in on individual words in your quote", detail:"Pick specific words and explore what they connote.", formula:"From 'shower of pearls': focus on 'pearls' → precious, rare, lost, grief, beauty" },
    { title:"Give a first interpretation", detail:"What does this word most obviously suggest?", formula:"'Pearls' suggests his home was rare and precious — something he treasures" },
    { title:"Offer an alternative interpretation", detail:"'It could also suggest…' — show you can think about multiple meanings.", formula:"'Pearls' could also symbolise grief and loss — they are associated with tears" },
    { title:"Effect on the reader", detail:"What does the reader feel or understand?", formula:"This makes the reader understand both the beauty of his memories and the pain of having lost them" },
  ],
  worked:[{ q:"Analysing: 'The moonlight, like a shower of pearls'", lines:[
    { step:"Technique", expr:"Simile 'shower of pearls' suggests home was rare, precious and beautiful.", why:"First interpretation" },
    { step:"Alt. interp.", expr:"'Pearls' could also suggest sadness — associated with loss and grief.", why:"Alternative reading" },
    { step:"Word-level", expr:"The noun 'pearl' implies Clare remembers his home as priceless but lost — a state of happiness he cannot return to.", why:"Word class + connotation" },
    { step:"Structure", expr:"Alliteration in 'bower of bliss' with plosive 'b' emphasises the force of his love.", why:"Second word/technique" },
    { step:"Effect", expr:"This makes the reader feel both the beauty of his memories and the grief of loss.", why:"Effect on reader — links to command words", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>The key question: WHY did the poet choose THIS word above all others?</strong> What does it do that any other word couldn't?" },
    { icon:"⭐", text:"<strong>Connotations</strong> = associations beyond literal meaning. 'Pearl' literally = a gem, but connotes preciousness, rarity, grief, tears." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Only giving one interpretation. Two readings shows sophisticated thinking." },
    { text:"<strong>Common mistake:</strong> Summarising ('this shows he liked his home') instead of analysing why THESE specific words convey that." },
  ],
  practice:[
    { q:"'Word-level analysis' means:", opts:["Counting words","Analysing connotations and effect of specific individual words","Summarising subject","Listing techniques"], ans:1, exp:"Word-level = zooming into <strong>specific individual words</strong> and their connotations." },
    { q:"'Pearls could also suggest sadness, associated with grief.' This is:", opts:["A topic sentence","An alternative interpretation","A technique listing","A conclusion"], ans:1, exp:"An <strong>alternative interpretation</strong> — showing language can carry multiple meanings." },
    { q:"Connotations of a word are:", opts:["Its dictionary definition","The spelling","Associations and meanings beyond its literal definition","Its syllable count"], ans:2, exp:"Connotations = <strong>associations and emotional resonances beyond literal meaning</strong>." },
    { q:"After analysing language, end with:", opts:["A new quote","Effect on the reader, linking back to command words","Technique definition","Next paragraph"], ans:1, exp:"End with <strong>effect on the reader</strong>, always linking back to the command words." },
  ],
  prevLesson:{ key:"petal-t", label:"T — Technique" },
  nextLesson:{ key:"petal-l", label:"L — Link" }
},

"petal-l": {
  topic:"PETAL", topicKey:"PETAL", theme:"gold", icon:"🌸",
  title:"L — Link (Back to the Question)",
  subtitle:"Close your paragraph by connecting all your analysis back to the question and the writer's purpose.",
  keyIdea:{ rule:"Restate your argument using command words + comment on what the poet wants the reader to feel or think", detail:"The Link is your paragraph's conclusion. It shows the examiner your analysis has always been answering the question." },
  formulae:[{ main:"This demonstrates / reinforces / emphasises that [restate Point using command words]", note:"+ comment on writer's purpose" }],
  steps:[
    { title:"Restate your Point using command words", detail:"Echo the argument from the start of the paragraph.", formula:"'This demonstrates Clare's feelings of profound loss and longing for his childhood home.'" },
    { title:"Comment on the writer's purpose", detail:"Why did the poet write this? What do they want the reader to feel?", formula:"'Perhaps Clare wants the reader to understand how deeply a place can shape a person's sense of identity.'" },
    { title:"Use a linking phrase", detail:"", formula:"'This reinforces…' / 'This demonstrates…' / 'Through this, Clare conveys…'" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Don't just repeat your Point word-for-word.</strong> Develop it — add a comment on WHY the poet wrote this." },
    { icon:"⭐", text:"<strong>Writer's purpose phrases:</strong> 'Perhaps Clare wants the reader to…' / 'Through this, Clare invites the reader to…'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'This is how the poet presents his feelings.' Just restating — needs a comment on purpose too." },
  ],
  practice:[
    { q:"Best 'Link' sentence:", opts:["That's all I have to say.","This demonstrates Clare's feelings of longing and loss, suggesting he wants the reader to understand how a place defines a person's identity and happiness.","The poem uses alliteration.","Clare writes about home."], ans:1, exp:"Strong Link: <strong>restates argument with command words AND comments on writer's purpose</strong>." },
    { q:"Writer's purpose means:", opts:["The techniques used","What the poet wants the reader to feel, think or understand","The rhyme scheme","The poet's nationality"], ans:1, exp:"Writer's purpose = <strong>what the poet wants the reader to feel, think or understand</strong>." },
    { q:"A good linking phrase:", opts:["'In conclusion…'","'The poem ends.'","'This reinforces / demonstrates / Through this, [poet] conveys…'","'Therefore this is good.'"], ans:2, exp:"<strong>'This reinforces…', 'This demonstrates…', 'Through this, Clare conveys…'</strong>" },
    { q:"Where does the Link sit in PETAL?", opts:["Beginning","Middle","At the very end","After the quote"], ans:2, exp:"Link is the <strong>final sentence</strong> of the paragraph." },
  ],
  prevLesson:{ key:"petal-a", label:"A — Analysis" },
  nextLesson:{ key:"techniques-figurative", label:"Figurative Language" }
},

/* ════════ ENGLISH — POETIC TECHNIQUES ════════ */
"techniques-figurative": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Figurative Language",
  subtitle:"Simile, metaphor, personification and pathetic fallacy — comparisons and human qualities that create vivid meaning.",
  keyIdea:{ rule:"Figurative language makes comparisons or gives human qualities to things — always ask WHY this comparison?", detail:"" },
  formulae:[
    { main:"Simile: [A] is like/as [B] — explicit comparison using 'like' or 'as'", note:"" },
    { main:"Metaphor: [A] is [B] — direct comparison saying one thing IS another", note:"" },
    { main:"Personification: non-human thing given human qualities (actions, emotions, speech)", note:"" },
    { main:"Pathetic fallacy: weather/setting mirrors the speaker's emotions", note:"" },
  ],
  steps:[
    { title:"Identify which figurative language", detail:"Does it use like/as (simile), say IS (metaphor), or give human quality (personification)?", formula:"" },
    { title:"State what is being compared", detail:"What two things? What qualities of B are transferred to A?", formula:"'shower of pearls' = moonlight compared to pearls → precious, rare, beautiful" },
    { title:"Explain why THIS comparison", detail:"What does the comparison add that a plain description wouldn't?", formula:"" },
    { title:"Offer an alternative interpretation", detail:"Could the comparison suggest something else too?", formula:"" },
  ],
  worked:[{ q:"Analyse: 'The moonlight, like a shower of pearls'", lines:[
    { step:"Device", expr:"Simile — uses 'like'", why:"" },
    { step:"Comparison", expr:"Moonlight compared to pearls falling", why:"" },
    { step:"Effect", expr:"Suggests moonlight on his home was beautiful, precious and rare", why:"Pearls = precious, rare" },
    { step:"Alt. interp.", expr:"'Pearls' could also suggest grief — pearls symbolise tears and loss", why:"Alternative connotation" },
    { step:"Analysis", expr:"Creates complex effect: both great beauty and deep sadness", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Most important question:</strong> Why THIS comparison? Poets choose carefully — what qualities of the second thing are being transferred?" },
    { icon:"⭐", text:"<strong>Extended metaphor</strong> = metaphor continuing across multiple lines. Comment on how it develops and the cumulative effect." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'This is a simile because it uses like.' This identifies — you need to analyse the EFFECT of THIS comparison." },
  ],
  practice:[
    { q:"Difference between simile and metaphor?", opts:["No difference","Simile uses 'like'/'as'; metaphor says one thing IS another","Metaphor is more powerful","Simile is shorter"], ans:1, exp:"<strong>Simile: 'like'/'as'. Metaphor: says IS.</strong>" },
    { q:"'The wind whispered its secrets to the trees' uses:", opts:["Simile","Metaphor","Personification","Alliteration"], ans:2, exp:"<strong>Personification</strong> — wind given human quality of whispering." },
    { q:"In metaphor 'Life is a journey', analyse by exploring:", opts:["That it doesn't use 'like'","What qualities of 'journey' are transferred — progress, destination, unknown path, obstacles","That it's a metaphor","Word count"], ans:1, exp:"Analyse <strong>what qualities of 'journey' are transferred to 'life'</strong>." },
    { q:"Pathetic fallacy means:", opts:["A weak comparison","Using weather/setting to reflect the speaker's inner emotions","A type of rhyme","A structural device"], ans:1, exp:"Pathetic fallacy = <strong>weather/setting mirroring the speaker's emotional state</strong>." },
  ],
  prevLesson:{ key:"petal-l", label:"L — Link" },
  nextLesson:{ key:"techniques-sound", label:"Sound Devices" }
},

"techniques-sound": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Sound Devices",
  subtitle:"Alliteration, assonance, sibilance and onomatopoeia — always explain what the specific sound creates.",
  keyIdea:{ rule:"Sound devices create auditory effects that reinforce meaning — name the TYPE of sound and its effect", detail:"Plosive consonants (b,p,d): force/explosiveness. Soft sibilance (s,sh): calm or unease. Vowel sounds: rhythm and mood." },
  formulae:[
    { main:"Alliteration: same consonant sound repeated at start of nearby words", note:"Plosive (b/p/d): force · Fricative (f/v): softness · Sibilant (s/sh): calm or unease" },
    { main:"Assonance: repetition of vowel sounds within nearby words", note:"Creates internal melody — long vowels slow pace, short quicken" },
    { main:"Sibilance: repetition of 's'/'sh' sounds", note:"Hissing, calm, mystery or sinister quality" },
    { main:"Onomatopoeia: word sounds like what it describes", note:"buzz, crash, murmur, hiss" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Name the TYPE of sound:</strong> plosive (b/p/d), fricative (f/v/th), sibilant (s/sh). Each creates a different effect." },
    { icon:"⭐", text:"<strong>Always connect sound to meaning:</strong> 'Alliteration of b sounds in \"bower of bliss\" creates forceful emphasis on the intensity of his love.'" },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poet uses alliteration here.' This identifies — what type of sound? What effect? Why here?" },
  ],
  practice:[
    { q:"In 'bower of bliss', what type of alliteration and what effect?", opts:["Sibilance — calm hissing","Plosive 'b' sounds — forceful, emphatic rhythm stressing his intense love for home","Fricative — soft and gentle","Assonance"], ans:1, exp:"<strong>Plosive 'b' alliteration</strong> — forceful and emphatic." },
    { q:"'The stream slid silently through silver stones' uses:", opts:["Plosive alliteration","Sibilance — repeated 's' creating a soft, gentle, flowing feeling","Onomatopoeia","Assonance"], ans:1, exp:"<strong>Sibilance</strong> — repeated 's' mimics the gentle sliding of the stream." },
    { q:"Which is onomatopoeia?", opts:["'like a shower of pearls'","'The wind whispered'","'The bees buzzed lazily'","'bower of bliss'"], ans:2, exp:"<strong>'buzzed'</strong> sounds like the noise bees make — onomatopoeia." },
    { q:"When analysing a sound device, always explain:", opts:["How many letters repeat","What effect the sound creates and WHY the poet chose it in this context","Its definition","How to spell it"], ans:1, exp:"Always explain <strong>what effect the sound creates and why appropriate</strong> to the poem's meaning." },
  ],
  prevLesson:{ key:"techniques-figurative", label:"Figurative Language" },
  nextLesson:{ key:"techniques-structure", label:"Structural Devices" }
},

"techniques-structure": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Structural Devices",
  subtitle:"Enjambment, caesura, volta and rhyme scheme — how the poem's shape creates meaning.",
  keyIdea:{ rule:"Structure is a deliberate choice — always explain what effect the structural device creates", detail:"Enjambment = rush forward. Caesura = pause. Rhyme = harmony or its absence = unease. Volta = shift." },
  formulae:[
    { main:"Enjambment: sentence runs from one line to next without pause", note:"Effect: continuation, urgency, breathlessness, flowing movement" },
    { main:"Caesura: pause mid-line, usually marked by punctuation", note:"Effect: tension, dramatic pause, hesitation, emphasis" },
    { main:"Volta: a turn/shift in the poem's tone, argument or perspective", note:"Often at start of a new stanza, or line 9 in a sonnet" },
    { main:"Rhyme scheme: ABAB (alternating) / AABB (couplets) / free verse (no rhyme)", note:"Regular = harmony/control · Irregular = unease/instability" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Read aloud for enjambment:</strong> If you naturally want to pause but the sentence runs on — that's enjambment. Notice how it feels." },
    { icon:"⭐", text:"<strong>The volta is high-scoring.</strong> 'Before X, but after this shift Y.' Shows understanding of the whole poem's structure." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poem uses enjambment here.' This just identifies — what effect does this specific enjambment create?" },
    { text:"<strong>Common mistake:</strong> Ignoring structure entirely. Every poem has structural choices — comment on at least one." },
  ],
  practice:[
    { q:"What is enjambment?", opts:["Sentence ends at line end","Sentence runs on to next line without a pause","Pause mid-line","Turn in a sonnet"], ans:1, exp:"Enjambment = sentence <strong>running on to the next line</strong>. Creates continuation, flow or urgency." },
    { q:"Poem shifts from joy to grief at stanza 4. This is called:", opts:["Enjambment","Caesura","A volta","A rhyming couplet"], ans:2, exp:"A <strong>volta</strong> — a turn or shift in mood, argument or perspective." },
    { q:"ABAB rhyme scheme means:", opts:["Every line rhymes","Lines 1&3 rhyme, lines 2&4 rhyme","Lines 1&2 rhyme, 3&4 rhyme","No rhyme"], ans:1, exp:"ABAB = <strong>alternating rhyme</strong>. Lines 1&3 rhyme (A), lines 2&4 rhyme (B)." },
    { q:"Regular rhyme throughout except final unrhymed stanza suggests:", opts:["A mistake","Order throughout","Disruption, breakdown, emotional shift","Faster rhythm"], ans:2, exp:"Breaking rhyme scheme suggests <strong>disruption or emotional shift</strong> — always significant." },
  ],
  prevLesson:{ key:"techniques-sound", label:"Sound Devices" },
  nextLesson:{ key:"techniques-words", label:"Word Choices" }
},

"techniques-words": {
  topic:"Poetic Techniques", topicKey:"Poetic Techniques", theme:"teal", icon:"🎭",
  title:"Significant Word Choices",
  subtitle:"How to analyse specific nouns, verbs, adjectives and adverbs — and why the poet chose them.",
  keyIdea:{ rule:"Every word is a choice — ask: why THIS word? What does its word class and connotation add?", detail:"" },
  formulae:[
    { main:"The [noun/verb/adjective/adverb] '[word]' implies / connotes…", note:"Name the word class, quote it, discuss what it suggests" },
    { main:"The connotations of '[word]' suggest…", note:"Connotations = associations beyond literal meaning" },
  ],
  steps:[
    { title:"Identify the word class", detail:"noun / verb / adjective / adverb", formula:"'pearl'=noun · 'fell'=verb · 'early'=adjective" },
    { title:"Quote the specific word", detail:"In single inverted commas.", formula:"the noun 'pearl'" },
    { title:"Discuss what it implies or connotes", detail:"What associations does the word carry? What does it make the reader think?", formula:"implies preciousness, rarity, also connotes grief — pearls associated with tears" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Connotations go beyond the dictionary.</strong> 'Home' denotes a building — but connotes safety, comfort, belonging, warmth, family." },
    { icon:"⭐", text:"<strong>Verbs reveal emotion.</strong> 'Fell' has connotations of descent, loss — not just physical falling." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The word \"pearl\" is a noun.' This only identifies — you must say what it implies or connotes." },
  ],
  practice:[
    { q:"'The noun \"pearl\" implies Clare's home was precious.' What should follow?", opts:["Another quote","An alternative interpretation: 'It could also connote grief, as pearls are associated with tears.'","A conclusion","The definition of 'noun'"], ans:1, exp:"After first interpretation, always give an <strong>alternative</strong>: 'It could also connote…'" },
    { q:"'The connotations of \"fell\" suggest descent or loss.' What word class is 'fell'?", opts:["Noun","Adjective","Verb","Adverb"], ans:2, exp:"'Fell' is a <strong>verb</strong> — connoting descent, sadness, something lost." },
    { q:"Best word-level analysis:", opts:["The word 'bliss' is used here.","The noun 'bliss' connotes perfect, complete happiness — suggesting Clare experienced his home as absolute paradise.","Bliss means happiness.","The poet uses 'bliss'."], ans:1, exp:"Best: <strong>word class + quote + specific connotations in context</strong>." },
    { q:"Connotations of 'home' are:", opts:["A building made of bricks","Safety, comfort, belonging, warmth, family, identity","A place where people sleep","An address"], ans:1, exp:"<strong>Safety, warmth, belonging, comfort and identity</strong> — emotional associations beyond the literal." },
  ],
  prevLesson:{ key:"techniques-structure", label:"Structural Devices" },
  nextLesson:{ key:"stems-technique", label:"Analysis Sentence Stems" }
},

/* ════════ ENGLISH — SENTENCE STEMS ════════ */
"stems-technique": {
  topic:"Sentence Stems", topicKey:"Sentence Stems", theme:"coral", icon:"💬",
  title:"Stems: Introducing a Technique",
  subtitle:"The precise phrases to introduce technique analysis — name the device, embed the quote, use an analytical verb.",
  keyIdea:{ rule:"Name the SPECIFIC technique + quote, then use a precise analytical verb (suggests / implies / conveys)", detail:"Avoid vague language. 'The poet uses language' earns nothing. 'The simile \"shower of pearls\" suggests…' earns marks." },
  formulae:[
    { main:"The [technique] '[quote]' suggests / implies / conveys / creates / emphasises…", note:"" },
    { main:"[Poet] uses [technique] to present / convey / explore…", note:"" },
    { main:"Through the use of [technique], [poet] suggests…", note:"" },
  ],
  steps:[
    { title:"Name the specific technique", detail:"Simile, metaphor, alliteration, noun, verb…", formula:"'The simile…' / 'The alliteration…' / 'The noun…'" },
    { title:"Embed the quote", detail:"", formula:"'The simile \"shower of pearls\"…'" },
    { title:"Use a precise analytical verb", detail:"suggests · implies · conveys · creates · emphasises · reinforces · reveals", formula:"'…suggests his home was rare and precious.'" },
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
    { q:"Best way to introduce technique analysis:", opts:["I think there is a simile.","The technique is interesting.","The simile 'shower of pearls' suggests his childhood home was rare and precious.","The poem uses language."], ans:2, exp:"Name technique + embed quote + <strong>precise analytical verb + interpretation</strong>." },
    { q:"Most sophisticated analytical verb:", opts:["shows","is","evokes / implies / conveys","says"], ans:2, exp:"<strong>'Evokes', 'implies', 'conveys'</strong> are more sophisticated than 'shows'." },
    { q:"Student writes: 'The poet uses alliteration here.' What's missing?", opts:["Poem title","The effect — what does this specific alliteration suggest or create?","Definition of alliteration","More punctuation"], ans:1, exp:"Must say <strong>what effect this specific alliteration creates</strong>." },
    { q:"Complete: 'Through the use of alliteration in \"bower of bliss\", Clare _____'", opts:["writes about home.","conveys the intense strength of his love through the emphatic plosive 'b' sound.","uses a technique.","alliterates."], ans:1, exp:"The stem leads to a <strong>specific analytical point about what Clare conveys and how</strong>." },
  ],
  prevLesson:{ key:"techniques-words", label:"Word Choices" },
  nextLesson:{ key:"stems-word-level", label:"Word-Level Stems" }
},

"stems-word-level": {
  topic:"Sentence Stems", topicKey:"Sentence Stems", theme:"coral", icon:"💬",
  title:"Stems: Word-Level Analysis",
  subtitle:"How to zoom into individual words and discuss their connotations with precision.",
  keyIdea:{ rule:"Name the word class, embed the word in quotes, then discuss what it implies or connotes", detail:"" },
  formulae:[
    { main:"The [noun/verb/adjective/adverb] '[word]' here implies / suggests / connotes…", note:"" },
    { main:"The connotations of '[word]' suggest…", note:"" },
    { main:"[Poet]'s choice of the [word class] '[word]' is significant because…", note:"" },
  ],
  steps:[
    { title:"Identify word class", detail:"noun · verb · adjective · adverb", formula:"" },
    { title:"Quote it in single inverted commas", detail:"", formula:"the noun 'pearl'" },
    { title:"Discuss connotations", detail:"What associations does the word carry? What does it make the reader think?", formula:"" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Connotations go beyond the dictionary.</strong> 'Home' = building (denotation); safety, warmth, belonging (connotations)." },
    { icon:"⭐", text:"<strong>Verbs are powerful:</strong> choice of verb reveals emotion. 'Fell' connotes descent, sadness, something lost." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The word \"pearl\" is a noun.' Only identifies — must say what it implies." },
  ],
  practice:[
    { q:"After first word-level interpretation, always:", opts:["Move to next paragraph","Offer an alternative interpretation: 'It could also connote…'","Write the conclusion","Define the word class"], ans:1, exp:"Always offer an <strong>alternative interpretation</strong> after your first one." },
    { q:"'The connotations of \"fell\" suggest descent or loss.' Word class of 'fell'?", opts:["Noun","Adjective","Verb","Adverb"], ans:2, exp:"<strong>Verb</strong>." },
    { q:"Best word-level analysis sentence:", opts:["The word 'bliss' is there.","The noun 'bliss' connotes perfect happiness — suggesting Clare experienced home as absolute paradise.","Bliss = happiness.","The poet chose 'bliss'."], ans:1, exp:"Best: <strong>word class + quote + specific connotations in context</strong>." },
    { q:"Connotations of 'home':", opts:["Just a building","Safety, comfort, belonging, warmth, family, identity","Where people sleep","An address"], ans:1, exp:"<strong>Safety, warmth, belonging, comfort, identity</strong> — associations beyond literal meaning." },
  ],
  prevLesson:{ key:"stems-technique", label:"Introducing a Technique" },
  nextLesson:{ key:"term-form", label:"Form & Structure Terminology" }
},

/* ════════ ENGLISH — TERMINOLOGY ════════ */
"term-form": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"Form & Structure Terminology",
  subtitle:"The vocabulary for describing how a poem is shaped and organised — always explain the EFFECT, not just the name.",
  keyIdea:{ rule:"Every structural choice is deliberate — name it AND explain its effect", detail:"" },
  formulae:[
    { main:"Stanza=group of lines · Couplet=2 · Tercet=3 · Quatrain=4 · Sestet=6", note:"" },
    { main:"Sonnet=14 lines · Free verse=no regular rhyme/metre · Blank verse=no rhyme but regular metre", note:"" },
    { main:"Refrain=repeated line or phrase · Volta=turn/shift in the poem", note:"" },
  ],
  steps:[],
  worked:[{ q:"Key form and structure terms", lines:[
    { step:"Stanza", expr:"Group of lines forming a unit — like a paragraph in prose", why:"" },
    { step:"Couplet", expr:"Two lines — rhyming couplet creates resolution or finality", why:"" },
    { step:"Quatrain", expr:"Four lines — most common stanza form", why:"" },
    { step:"Free verse", expr:"No regular rhyme or metre — natural, speech-like quality", why:"" },
    { step:"Refrain", expr:"Repeated line/phrase — haunting emphasis, suggests obsession or importance", why:"'My early home was this' is a refrain", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Don't just name the form — explain its effect.</strong> 'This is a quatrain' earns little. 'The regular quatrain structure creates order and control, mirroring…' earns marks." },
    { icon:"⭐", text:"<strong>A refrain</strong> creates a haunting, insistent effect — the poet returns to this idea, suggesting it's central to their message." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Identifying form without analysing effect. Always connect form to meaning." },
  ],
  practice:[
    { q:"What is a quatrain?", opts:["14-line poem","Four-line stanza","Two-line stanza","Poem with no rhyme"], ans:1, exp:"Quatrain = <strong>four-line stanza</strong>." },
    { q:"'My Early Home' repeats 'My early home was this.' This device is called:", opts:["Enjambment","Caesura","A refrain","A volta"], ans:2, exp:"A <strong>refrain</strong> — repeated line creating emphasis and haunting quality." },
    { q:"Free verse is:", opts:["Poetry that's free to read","No regular rhyme scheme or metre","A type of sonnet","14-line poem"], ans:1, exp:"Free verse = <strong>no regular rhyme scheme or metre</strong>." },
    { q:"A final rhyming couplet after a poem suggests:", opts:["A mistake","Resolution, conclusion or emotional shift — final condensed thought","Nothing significant","The poem is finished"], ans:1, exp:"Final couplet often creates <strong>resolution, finality or a sudden turn</strong>." },
  ],
  prevLesson:{ key:"stems-word-level", label:"Word-Level Stems" },
  nextLesson:{ key:"term-tone", label:"Tone & Mood Vocabulary" }
},

"term-tone": {
  topic:"Terminology", topicKey:"Terminology", theme:"blue", icon:"📚",
  title:"Tone & Mood Vocabulary",
  subtitle:"Precise vocabulary to describe the emotional quality and atmosphere of a poem.",
  keyIdea:{ rule:"Tone = the poet's attitude. Mood = the atmosphere created. Both are created through word choices.", detail:"'The poem is sad' is basic. 'The poem has an elegiac, melancholic tone' is sophisticated." },
  formulae:[{ main:"Tone = poet's attitude · Mood = atmosphere for the reader", note:"Both can be complex and shift throughout the poem" }],
  steps:[],
  worked:[{ q:"Tone vocabulary to know", lines:[
    { step:"Nostalgic", expr:"Longing for the past with a mixture of happiness and sadness", why:"Perfect for 'My Early Home'" },
    { step:"Melancholic", expr:"Deep, reflective sadness — gentle, lasting sorrow", why:"" },
    { step:"Elegiac", expr:"Like a lament — mourning for something lost", why:"From 'elegy': a poem of mourning" },
    { step:"Defiant", expr:"Bold resistance against something", why:"" },
    { step:"Contemplative", expr:"Thoughtful, reflective, meditative", why:"" },
    { step:"Euphoric", expr:"Intensely joyful, elated", why:"" },
    { step:"Tender", expr:"Gentle, loving, warm", why:"", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Tone can be complex:</strong> 'simultaneously nostalgic and melancholic' — two tones working together." },
    { icon:"⭐", text:"<strong>Tone shifts throughout a poem.</strong> 'Shifts from X in the opening to Y in the closing lines' shows structural understanding." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> 'The poem is sad.' Too basic. Use: 'elegiac', 'melancholic', 'nostalgic', 'contemplative'." },
  ],
  practice:[
    { q:"Difference between tone and mood?", opts:["No difference","Tone = poet's attitude; mood = atmosphere for reader","Tone = rhyme; mood = imagery","Tone = happy; mood = sad"], ans:1, exp:"<strong>Tone = poet's attitude. Mood = atmosphere the poem creates for the reader.</strong>" },
    { q:"'Longing for a lost past with a mix of happiness and sadness' describes:", opts:["Defiant","Bitter","Nostalgic","Euphoric"], ans:2, exp:"<strong>Nostalgic</strong> — bittersweet longing for the past." },
    { q:"'Elegiac' means:", opts:["Joyful","Tone of mourning or lament","Angry","Confused"], ans:1, exp:"<strong>Elegiac</strong> = a tone of mourning and lament, like an elegy." },
    { q:"Improve: 'The poem is happy at start but sad at end.'", opts:["It's fine","'The poem opens with a joyful, tender tone, but shifts to a melancholic and elegiac register in the final stanzas.'","Make it shorter","Mention more techniques"], ans:1, exp:"Use <strong>precise vocabulary</strong>: joyful, tender, melancholic, elegiac instead of happy and sad." },
  ],
  prevLesson:{ key:"term-form", label:"Form & Structure Terminology" },
  nextLesson:{ key:"analysis-finding", label:"8-Step Analysis: Finding" }
},

/* ════════ ENGLISH — ANALYSIS METHOD ════════ */
"analysis-finding": {
  topic:"Analysis Method", topicKey:"Analysis Method", theme:"pink", icon:"🔬",
  title:"Steps 1–4: Finding & Labelling",
  subtitle:"How to work with a quotation before you start writing — interpret it, label it, and annotate it.",
  keyIdea:{ rule:"Before writing, think around the quote: interpret it two ways, label every key term, annotate connotations", detail:"The best analysis comes from spending time thinking BEFORE writing. Steps 1–4 are all thinking, not writing." },
  formulae:[{ main:"Step 1: Pick quote → 2: Simple statement → 3: Alternative → 4: Label key terms", note:"Do all four before writing your paragraph" }],
  steps:[
    { title:"Step 1: Pick a quotation", detail:"Short, precise, links to question. Write it with space around it.", formula:"'The moonlight, like a shower of pearls, / Fell o'er this bower of bliss.'" },
    { title:"Step 2: Simple statement about what it suggests", detail:"First, straightforward interpretation.", formula:"Simile 'shower of pearls' suggests home was rare, precious and beautiful." },
    { title:"Step 3: Alternative interpretation", detail:"How else could this be read?", formula:"'Pearls' could also suggest sadness — pearls sometimes symbolise grief." },
    { title:"Step 4: Highlight and label key terms", detail:"Label each word's type: noun, verb, simile, alliteration…", formula:"'moonlight'(noun) · 'like a shower of pearls'(simile) · 'bower of bliss'(alliteration)" },
  ],
  tips:[
    { icon:"💡", text:"<strong>Sit with the quote before you write.</strong> The more you think about it, the richer your analysis." },
    { icon:"⭐", text:"<strong>Alternative interpretations are high-value.</strong> Two readings of one word shows sophisticated thinking." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Rushing from quote straight to writing. Do steps 1–4 in your head/notes first." },
  ],
  practice:[
    { q:"Why offer an alternative interpretation (Step 3)?", opts:["To fill space","To show sophisticated thinking — language can carry multiple meanings","Because you have to","To confuse examiner"], ans:1, exp:"Shows <strong>sophisticated thinking</strong> — language is rich and can carry multiple meanings." },
    { q:"In Step 4, 'bower of bliss' is labelled as 'alliteration'. The 'b' sound type is:", opts:["Sibilant","Fricative","Plosive — creates forceful, emphatic effect","Nasal"], ans:2, exp:"<strong>Plosive</strong> — bold and forceful. Emphasises the strength of his love." },
    { q:"After Step 4 labelling, add:", opts:["Nothing","Notes about what each labelled term suggests — these become word-level analysis","Definitions","A new quote"], ans:1, exp:"After labelling, add <strong>notes about what each term suggests</strong> — the material for your writing." },
    { q:"Purpose of Steps 1–4?", opts:["They are the essay","Preparation and thinking before writing — ensures rich analysis","They are the introduction","They replace PETAL"], ans:1, exp:"Steps 1–4 = <strong>preparation and thinking before writing</strong>." },
  ],
  prevLesson:{ key:"term-tone", label:"Tone & Mood Vocabulary" },
  nextLesson:{ key:"analysis-writing", label:"Steps 5–8: Writing It Up" }
},

"analysis-writing": {
  topic:"Analysis Method", topicKey:"Analysis Method", theme:"pink", icon:"🔬",
  title:"Steps 5–8: Writing It Up",
  subtitle:"Translating your annotations into a fluent, deeply analytical paragraph.",
  keyIdea:{ rule:"Steps 5–8: word-level analysis → more words → structural comment → link back to question", detail:"" },
  formulae:[{ main:"5: Individual word connotations → 6: Further words → 7: Structure → 8: Link back", note:"Each step adds a layer of depth" }],
  steps:[
    { title:"Step 5: Annotate what individual words suggest", detail:"Go beyond the technique name — explore connotations.", formula:"Noun 'pearl': suggests preciousness, rarity, also connotes grief" },
    { title:"Step 6: Discuss other highlighted words", detail:"'Furthermore…' — move on to another word or phrase.", formula:"'bower of bliss' — alliteration + noun 'bliss' (perfect happiness)" },
    { title:"Step 7: Comment on structure", detail:"Rhyme scheme, enjambment, caesura, stanza form…", formula:"Rhyme scheme returns at end to opening pattern — mirrors his longing to return home" },
    { title:"Step 8: Link back to the question", detail:"Return to command words.", formula:"'This reinforces Clare's feelings of longing — childhood home presented as paradise lost.'" },
  ],
  worked:[{ q:"Full worked paragraph: feelings about childhood home", lines:[
    { step:"Point", expr:"Clare presents his feelings as profound beauty and loss.", why:"Topic sentence with command words" },
    { step:"Quote", expr:"'The moonlight, like a shower of pearls / Fell o'er this bower of bliss.'", why:"Short, embedded" },
    { step:"Statement", expr:"Suggests home was rare, precious and beautiful.", why:"Simple first interpretation" },
    { step:"Alt. interp.", expr:"Could also suggest loss — pearls symbolise grief.", why:"Alternative reading" },
    { step:"Word-level", expr:"Noun 'pearl' implies home was priceless but lost — happiness he cannot return to.", why:"Word class + connotation" },
    { step:"Further", expr:"Alliteration in 'bower of bliss' with plosive b emphasises strength of his love.", why:"Second technique" },
    { step:"Structure", expr:"Rhyme scheme returning to opening pattern mirrors his longing to return to the past.", why:"Structural comment" },
    { step:"Link", expr:"This demonstrates Clare's deep feelings of longing — home presented as irretrievable paradise.", why:"Command words", answer:true },
  ]}],
  tips:[
    { icon:"💡", text:"<strong>Connectives to flow between points:</strong> 'Furthermore…', 'This is reinforced by…', 'In addition…', 'This sense of X is further emphasised by…'" },
    { icon:"⭐", text:"<strong>Always discuss structure</strong> — enjambment, caesura, rhyme scheme. High-scoring but often neglected." },
  ],
  mistakes:[
    { text:"<strong>Common mistake:</strong> Listing effects without connecting them. Use connectives to build a flowing argument." },
    { text:"<strong>Common mistake:</strong> Forgetting Step 8 — the link. Always close by returning to the command words." },
  ],
  practice:[
    { q:"Best connective for second word-level analysis:", opts:["In conclusion…","Furthermore, the [word class] '[word]' implies…","However…","This is wrong because…"], ans:1, exp:"<strong>'Furthermore…'</strong> introduces a second piece of word-level analysis." },
    { q:"Step 7 (structure) would be:", opts:["'Pearl' is a noun.","The enjambment creates a sense of flow, mirroring the speaker's flowing memories.","The poem uses a simile.","The poet lived in the 19th century."], ans:1, exp:"Structural comment = <strong>effect of enjambment, caesura, rhyme scheme or stanza form</strong>." },
    { q:"Purpose of Step 8 (Link back)?", opts:["Introduce new topic","Close paragraph by connecting to command words and writer's purpose","Repeat the quote","Start next paragraph"], ans:1, exp:"Step 8 <strong>closes the paragraph by returning to command words</strong>." },
    { q:"Most important analytical question:", opts:["What page is it on?","How many syllables?","WHY did the poet choose THIS specific word/device above all others?","What's the rhyme scheme?"], ans:2, exp:"Central analysis question: <strong>WHY has the poet chosen THIS word or device?</strong>" },
  ],
  prevLesson:{ key:"analysis-finding", label:"Steps 1–4: Finding & Labelling" },
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
    { topic:"Reading a Poem", q:"First thing to do when you get an unseen poem in the exam?", opts:["Start writing","Read the poem","Read the question and highlight the command words","Count the stanzas"], ans:2, exp:"Always read the question FIRST and highlight command words." },
    { topic:"Reading a Poem", q:"What are command words?", opts:["Poem title","Key words telling you what to focus on","Poet's name","Date written"], ans:1, exp:"Command words tell you what to analyse and how to structure your essay." },
    { topic:"Reading a Poem", q:"On your second read you should:", opts:["Write conclusion","Highlight techniques linking to command words","Count syllables","Copy the poem"], ans:1, exp:"Annotate — highlight techniques, devices and quotes connecting to command words." },
    { topic:"Reading a Poem", q:"Your essay plan should include:", opts:["Drawing of setting","Thesis + 3 topic sentences + quotes/techniques under each","Every technique","Poet's biography"], ans:1, exp:"Thesis + 3 topic sentences + notes on quotes and techniques." },
    { topic:"Reading a Poem", q:"A thesis statement is:", opts:["A quote","Your main argument to be proved throughout the essay","The essay title","A plot summary"], ans:1, exp:"Thesis = your overall argument — the main point you'll prove across the whole essay." },
    // ESSAY WRITING
    { topic:"Essay Writing", q:"What should your introduction contain?", opts:["Three quotes and technique list","Thesis + command words + optionally a summarising quote","Detailed plot summary","Poet's biography"], ans:1, exp:"Introduction = thesis + command words + writer's purpose + optional quote." },
    { topic:"Essay Writing", q:"What's wrong with: 'John Clare uses a variety of techniques'?", opts:["Too long","Wrong name","Vague — no argument, no command words","Wrong tense"], ans:2, exp:"Too vague — no argument, doesn't use command words." },
    { topic:"Essay Writing", q:"Better topic sentence?", opts:["The poet uses lots of techniques.","In 'My Early Home,' Clare presents his childhood as a place of beauty and safety that he longs to return to.","The poem is about a house.","Clare writes about nature."], ans:1, exp:"Best: answers question, uses command words, makes specific argument." },
    { topic:"Essay Writing", q:"What should your conclusion do?", opts:["Introduce a new point","Repeat introduction","Return to thesis, summarise, comment on writer's purpose","List all techniques"], ans:2, exp:"Return to thesis, briefly summarise and comment on writer's overall purpose." },
    // PETAL
    { topic:"PETAL", q:"PETAL stands for:", opts:["Point, Example, Technique, Analysis, Language","Point, Evidence, Technique, Analysis, Link","Paragraph, Evidence, Theme, Analysis, Literature","Point, Explain, Technique, Argument, Link"], ans:1, exp:"PETAL = Point, Evidence, Technique, Analysis, Link." },
    { topic:"PETAL", q:"In PETAL, 'Evidence' means:", opts:["Explaining the theme","A precise quotation in inverted commas","Effect on reader","Poet's name"], ans:1, exp:"Evidence = your quotation — precise, in single inverted commas." },
    { topic:"PETAL", q:"The 'L' (Link) requires you to:", opts:["List more techniques","Link back to question and writer's purpose","Leave a line","Look up vocabulary"], ans:1, exp:"Link = connect back to the question and writer's purpose." },
    { topic:"PETAL", q:"Where does your topic sentence sit in PETAL?", opts:["At end","Middle","At start — it IS the Point","After the quote"], ans:2, exp:"Topic sentence opens the paragraph — it IS the Point (P)." },
    // POETIC TECHNIQUES
    { topic:"Poetic Techniques", q:"What is a simile?", opts:["Comparing by saying one IS another","Comparing using 'like' or 'as'","Giving human qualities to an object","Repeating a sound at line starts"], ans:1, exp:"Simile = comparison using 'like' or 'as'." },
    { topic:"Poetic Techniques", q:"What is a metaphor?", opts:["Comparison using 'like'","Direct comparison saying one thing IS another","Repetition of consonant sounds","A question"], ans:1, exp:"Metaphor = direct comparison, says one thing IS another." },
    { topic:"Poetic Techniques", q:"What is alliteration?", opts:["Repetition of vowel sounds","A comparison using 'like'","Repetition of the same consonant sound at start of nearby words","Last words of lines rhyming"], ans:2, exp:"Alliteration = same consonant sound repeated at start of nearby words." },
    { topic:"Poetic Techniques", q:"What is enjambment?", opts:["Sentence ends at line end","Sentence runs on from one line to next without pause","Pause mid-line","Poem rhymes"], ans:1, exp:"Enjambment = sentence running on to next line without a pause." },
    { topic:"Poetic Techniques", q:"What is a caesura?", opts:["A run-on line","A pause mid-line, usually marked by punctuation","Final stanza","Rhyme scheme"], ans:1, exp:"Caesura = pause mid-line, usually created by punctuation." },
    { topic:"Poetic Techniques", q:"What is sibilance?", opts:["Repetition of 's' sounds","Comparison using 'as'","Repetition of vowel sounds","A question without answer"], ans:0, exp:"Sibilance = repetition of 's' (or 'sh') sound." },
    { topic:"Poetic Techniques", q:"What is a volta?", opts:["First stanza","A turn or shift in the poem's tone/argument/perspective","The rhyme scheme","A type of simile"], ans:1, exp:"Volta = a turn or shift in the poem — change in tone, argument or perspective." },
    // SENTENCE STEMS
    { topic:"Sentence Stems", q:"Best way to introduce technique analysis:", opts:["I think there is a simile.","The technique is interesting.","The simile 'shower of pearls' suggests his home was rare and precious.","The poem uses language."], ans:2, exp:"Name technique + embed quote + precise analytical verb + interpretation." },
    { topic:"Sentence Stems", q:"Best word-level stem:", opts:["The word is interesting.","The [word class] '[word]' here implies / The connotations of '[word]' suggest…","I like the word.","The poet chose this word."], ans:1, exp:"Use: 'The [word class] \"[word]\" implies…' or 'The connotations of \"[word]\" suggest…'" },
    { topic:"Sentence Stems", q:"Best alternative interpretation stem:", opts:["But I think…","It could also suggest… / Alternatively… / Another interpretation is…","The poet is wrong.","There is no other meaning."], ans:1, exp:"'It could also suggest…', 'Alternatively…', 'Another interpretation is…'" },
    // TERMINOLOGY
    { topic:"Terminology", q:"What is a stanza?", opts:["A single line","A group of lines forming a unit (like a paragraph)","The poem's title","The rhyme scheme"], ans:1, exp:"Stanza = group of lines in a poem — like a paragraph." },
    { topic:"Terminology", q:"What is a quatrain?", opts:["2-line stanza","3-line stanza","4-line stanza","6-line stanza"], ans:2, exp:"Quatrain = 4-line stanza." },
    { topic:"Terminology", q:"ABAB rhyme scheme means:", opts:["Every line rhymes","Lines 1&3 rhyme, lines 2&4 rhyme","All four lines rhyme","No rhyme"], ans:1, exp:"ABAB: alternating rhyme — lines 1&3 rhyme (A), lines 2&4 rhyme (B)." },
    { topic:"Terminology", q:"The 'speaker' or 'persona' in a poem is:", opts:["The poet themselves","The voice narrating the poem — may or may not be the poet","The person the poem is about","The reader"], ans:1, exp:"Speaker/persona = the voice in the poem, not necessarily the poet." },
    { topic:"Terminology", q:"'Tone' in poetry means:", opts:["Volume","Poet's attitude or emotional quality conveyed through word choices","Poem length","Rhyme scheme"], ans:1, exp:"Tone = the poet's attitude or emotional quality." },
    // ANALYSIS METHOD
    { topic:"Analysis Method", q:"First step of the 8-step analysis method:", opts:["Write conclusion","Pick a quotation from the poem","Write thesis","List all techniques"], ans:1, exp:"Step 1: Pick a quotation linking to the question." },
    { topic:"Analysis Method", q:"Step 2 asks you to:", opts:["Name all techniques","Write a simple statement about what the quote suggests","Copy out the poem","Write your introduction"], ans:1, exp:"Step 2: Simple statement about what the quotation suggests." },
    { topic:"Analysis Method", q:"What does step 3 ask?", opts:["Write topic sentence","Offer an alternative interpretation","List rhyme scheme","Write conclusion"], ans:1, exp:"Step 3: Offer an alternative interpretation." },
    { topic:"Analysis Method", q:"Most important analytical question:", opts:["What page?","How many syllables?","WHY did the poet choose THIS word/device above all others?","What rhyme scheme?"], ans:2, exp:"Central question: WHY has the poet chosen THIS word or device?" },
  ]
};

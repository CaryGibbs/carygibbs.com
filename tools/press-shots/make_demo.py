"""Builds demo.json: an invented family (Alex Morgan, parent; Sam Morgan, Year 10)
with a month of believable revision, for press screenshots. Nothing here is real data."""
import json, random, datetime as dt

random.seed(7)
NOW = dt.datetime.now().replace(hour=18, minute=10, second=0, microsecond=0)
ms = lambda d: int(d.timestamp() * 1000)
day = lambda d: d.strftime('%Y-%m-%d')
TS = lambda d: {'__ts': ms(d)}

D = {}
PACKS = {
  'demo-bio':  ('GCSE Biology (AQA 8461)', 'Biology', '🧬', 'AQA', '8461',
                ['Cell biology', 'Organisation', 'Infection and response', 'Bioenergetics', 'Homeostasis and response', 'Inheritance, variation and evolution', 'Ecology']),
  'demo-chem': ('GCSE Chemistry (AQA 8462)', 'Chemistry', '⚗️', 'AQA', '8462',
                ['Atomic structure and the periodic table', 'Bonding, structure and properties', 'Quantitative chemistry', 'Chemical changes', 'Energy changes', 'Rates of reaction', 'Chemistry of the atmosphere']),
  'demo-geo':  ('GCSE Geography (AQA 8035)', 'Geography', '🌍', 'AQA', '8035',
                ['The challenge of natural hazards', 'The living world', 'Physical landscapes in the UK', 'Urban issues and challenges', 'The changing economic world', 'The challenge of resource management']),
  'demo-maths': ('GCSE Maths (AQA 8300)', 'Maths', '📐', 'AQA', '8300',
                ['Number', 'Algebra: expressions and equations', 'Ratio, proportion and rates of change', 'Geometry and measures', 'Probability', 'Statistics']),
}
SUBJ = {}   # key -> subjectId
TOPICS = {} # key -> [(topicId, name)]
PACK = 'demo-y10'
D[f'content/{PACK}'] = {'name': 'Year 10 GCSE revision', 'visibility': 'private', 'ownerUid': 'demo-parent', 'level': 'GCSE',
                        'description': 'Sam\'s Year 10 subjects', 'createdAt': TS(NOW - dt.timedelta(days=40))}
for order, (pid, (pname, sname, emoji, board, spec, topics)) in enumerate(PACKS.items()):
    sid = f'{pid}-s'
    SUBJ[pid] = sid
    D[f'content/{PACK}/subjects/{sid}'] = {'name': sname, 'emoji': emoji, 'order': order, 'examBoard': board, 'level': 'GCSE', 'createdAt': TS(NOW - dt.timedelta(days=40))}
    TOPICS[pid] = []
    for i, t in enumerate(topics):
        tid = f'{pid}-t{i}'
        TOPICS[pid].append((tid, t))
        D[f'content/{PACK}/subjects/{sid}/topics/{tid}'] = {'name': t, 'order': i, 'plusOnly': False, 'createdAt': TS(NOW - dt.timedelta(days=40)),
                                                           'keyPoints': [{'group': 'Key ideas', 'points': [{'term': t, 'explanation': 'Key points for this topic.'}]}]}

# Full notes and questions for two topics
geo_t = [t for t in TOPICS['demo-geo'] if t[1] == 'The challenge of natural hazards'][0][0]
chem_t = [t for t in TOPICS['demo-chem'] if t[1] == 'Rates of reaction'][0][0]
D[f"content/{PACK}/subjects/{SUBJ['demo-geo']}/topics/{geo_t}"]['keyPoints'] = [
  {'group': 'Plate tectonics', 'points': [
    {'term': 'Constructive margin', 'explanation': 'Plates move apart; magma rises to fill the gap, forming gentle shield volcanoes.'},
    {'term': 'Destructive margin', 'explanation': 'The denser oceanic plate sinks under the continental plate, causing explosive volcanoes and strong earthquakes.'},
    {'term': 'Conservative margin', 'explanation': 'Plates slide past each other; friction makes them stick, then slip suddenly, causing earthquakes.'}]},
  {'group': 'Reducing the risk', 'points': [
    {'term': 'Monitoring', 'explanation': 'Seismometers, tiltmeters and gas sensors help scientists spot warning signs of eruptions.'},
    {'term': 'Planning', 'explanation': 'Hazard maps, evacuation routes and drills mean people know what to do.'},
    {'term': 'Protection', 'explanation': 'Earthquake-resistant buildings with cross-bracing and deep foundations save lives.'}]},
  {'group': 'Tropical storms', 'points': [
    {'term': 'Formation', 'explanation': 'Sea temperatures above 27°C, low wind shear and the Coriolis effect let storms grow.'},
    {'term': 'Climate change', 'explanation': 'Warmer oceans may make tropical storms more intense, though not necessarily more frequent.'}]},
]
D[f"content/{PACK}/subjects/{SUBJ['demo-chem']}/topics/{chem_t}"]['keyPoints'] = [
  {'group': 'Measuring rate', 'points': [
    {'term': 'Mean rate of reaction', 'explanation': 'Quantity of reactant used, or product formed, divided by the time taken.'},
    {'term': 'Units of rate', 'explanation': 'g/s for mass, or cm³/s for volume of gas.'}]},
  {'group': 'Collision theory', 'points': [
    {'term': 'Activation energy', 'explanation': 'The minimum energy particles need to react when they collide.'},
    {'term': 'Temperature', 'explanation': 'Particles move faster, so they collide more often and with more energy.'},
    {'term': 'Catalyst', 'explanation': 'Speeds up a reaction by providing a pathway with a lower activation energy, without being used up.'}]},
]
def q(pid, tid, qid, data):
    D[f"content/{PACK}/subjects/{SUBJ[pid]}/topics/{tid}/questions/{qid}"] = {'source': 'ai', 'createdAt': TS(NOW - dt.timedelta(days=50)), **data}
q('demo-geo', geo_t, 'gq1', {'type': 'short', 'question': "Explain how Haiti's exposure to multiple natural hazards increases its vulnerability.",
   'markScheme': 'Key points: 1) Haiti faces earthquakes, tropical storms, hurricanes and flooding 2) Repeated disasters cause cumulative damage 3) Recovery from one disaster is interrupted by another 4) Limited resources are spread across multiple hazards'})
q('demo-geo', geo_t, 'gq2', {'type': 'mcq', 'question': 'What happens at a conservative plate margin?', 'explanation': 'Plates slide past each other, stick, then slip suddenly.',
   'options': [{'text': 'Plates move apart and magma rises', 'correct': False}, {'text': 'Plates slide past each other and cause earthquakes', 'correct': True},
               {'text': 'One plate sinks beneath the other', 'correct': False}, {'text': 'Plates collide and form fold mountains', 'correct': False}]})
q('demo-geo', geo_t, 'gq3', {'type': 'tf', 'question': 'Tropical storms form over seas warmer than 27°C.', 'answer': True, 'explanation': 'Warm water provides the heat and moisture storms need.'})
q('demo-geo', geo_t, 'gq4', {'type': 'fill', 'sentence': 'A _____ measures ground movement and helps monitor earthquakes.', 'answer': 'seismometer', 'alternatives': ['seismograph']})
q('demo-geo', geo_t, 'gq5', {'type': 'match', 'instruction': 'Match each plate margin to what happens there', 'pairs': [
   {'left': 'Constructive', 'right': 'Plates move apart'}, {'left': 'Destructive', 'right': 'Oceanic plate sinks'}, {'left': 'Conservative', 'right': 'Plates slide past'}, {'left': 'Collision', 'right': 'Fold mountains form'}]})
q('demo-geo', geo_t, 'gq6', {'type': 'short', 'question': 'Explain why people continue to live in areas at risk from tectonic hazards.', 'markScheme': 'Key points: 1) Fertile volcanic soils 2) Geothermal energy and jobs 3) Tourism 4) Low perceived risk or no choice due to poverty'})
q('demo-geo', geo_t, 'gq7', {'type': 'short', 'question': 'Describe how monitoring can reduce the effects of a volcanic eruption.', 'markScheme': 'Key points: 1) Seismometers detect small earthquakes 2) Tiltmeters show ground swelling 3) Gas emissions measured 4) Early warning allows evacuation'})
q('demo-geo', geo_t, 'gq8', {'type': 'short', 'question': 'Explain how climate change might affect tropical storms.', 'markScheme': 'Key points: 1) Warmer oceans 2) More intense storms 3) Wider area affected 4) Frequency may not increase'})
q('demo-chem', chem_t, 'cq1', {'type': 'mcq', 'question': 'Why does a higher temperature speed up a reaction?', 'explanation': 'Particles move faster, collide more often and more of the collisions have enough energy to react.',
   'options': [{'text': 'The particles get bigger', 'correct': False}, {'text': 'Particles collide more often, and with more energy', 'correct': True},
               {'text': 'The activation energy goes up', 'correct': False}, {'text': 'There are more particles', 'correct': False}]})
q('demo-chem', chem_t, 'cq2', {'type': 'short', 'question': 'Explain how a catalyst increases the rate of a reaction.', 'markScheme': 'Key points: 1) Provides an alternative pathway 2) With lower activation energy 3) More collisions are successful 4) Catalyst is not used up'})
q('demo-chem', chem_t, 'cq3', {'type': 'tf', 'question': 'A catalyst is used up during a reaction.', 'answer': False, 'explanation': 'Catalysts are not used up, so they can be used again.'})

# Settings
D['settings/ai'] = {'learning': 'claude-sonnet-5-5', 'marking': 'claude-haiku-5-5', 'generation': 'claude-sonnet-5-5'}
D['settings/plans'] = {'push': {'quizzes': 2, 'days': 7, 'mins': 60}, 'final': {'quizzes': 2, 'mins': 90, 'days': 7},
                       'steady': {'days': 5, 'mins': 30, 'quizzes': 0}, 'relaxed': {'days': 4, 'quizzes': 1, 'mins': 15}}
D['settings/signup'] = {'studentSelf': False}

# People
PARENT, SAM = 'demo-parent', 'demo-sam'
packs = list(PACKS)
D[f'users/{PARENT}'] = {'name': 'Alex Morgan', 'email': 'alex.morgan@example.com', 'role': 'parent', 'roles': ['parent'], 'theme': 'parent',
                        'createdAt': ms(NOW - dt.timedelta(days=40)), 'accountNo': 'LL-DEMO1', 'children': {SAM: True},
                        'firstSteps': {'hidden': True, 'doneAt': ms(NOW - dt.timedelta(days=38))}, 'appInstalled': True}

# A month of revision: trends up in Chemistry and Biology, Geography dipping recently
sessions, study, srs = [], {}, {}
trend = {'demo-bio': (62, 1.0), 'demo-chem': (55, 1.3), 'demo-geo': (78, -0.9), 'demo-maths': (66, 0.5)}
types_all = ['mcq', 'tf', 'fill', 'match', 'short']
streak_days = 9
for back in range(30, -1, -1):
    d = NOW - dt.timedelta(days=back)
    if back >= streak_days and random.random() < 0.3: continue      # a few rest days earlier on
    if back == streak_days: continue                                  # the day before the streak began
    n = 1 if random.random() < 0.6 else 2
    for k in range(n):
        pid = random.choice(packs)
        tid, tname = random.choice(TOPICS[pid][:4])
        base, slope = trend[pid]
        pct = int(max(30, min(100, base + slope * (30 - back) + random.uniform(-8, 8))))
        total = 10; score = round(pct / 10); pct = score * 10
        secs = random.randint(300, 720)
        when = d.replace(hour=random.choice([16, 17, 18, 19, 20]), minute=random.randint(0, 59))
        if back == 0: when = NOW - dt.timedelta(minutes=40 + 30 * k)
        sessions.append({'date': ms(when), 'subject': PACKS[pid][1], 'topic': tname, 'score': score, 'total': total, 'pct': pct,
                         'minutesSpent': round(secs / 60), 'secondsSpent': secs, 'types': random.sample(types_all, 4),
                         'qs': [], 'groupId': PACK, 'subjectId': SUBJ[pid], 'topicId': tid})
    # some learning time on the notes too
    if random.random() < 0.5:
        pid = random.choice(packs)
        study.setdefault(day(d), {})[SUBJ[pid]] = random.randint(240, 1500)
sessions.sort(key=lambda s: s['date'])
# Questions due for review today
for i, (pid, tid) in enumerate([('demo-bio', TOPICS['demo-bio'][0][0])] * 6 + [('demo-geo', geo_t)] * 3 + [('demo-chem', chem_t)] * 3):
    srs[f'rv{i}'] = {'d': day(NOW - dt.timedelta(days=i % 2)), 't': tid, 's': SUBJ[pid], 'p': PACK, 'b': 2}
for i in range(14):
    pid = random.choice(packs); tid = TOPICS[pid][1][0]
    srs[f'later{i}'] = {'d': day(NOW + dt.timedelta(days=2 + i % 5)), 't': tid, 's': SUBJ[pid], 'p': PACK, 'b': 3}

xp = 1180
exam_day = NOW + dt.timedelta(days=24)
D[f'users/{SAM}'] = {
  'name': 'Sam Morgan', 'email': 'sam.morgan@example.com', 'role': 'student', 'roles': ['student'], 'theme': 'spark',
  'createdAt': ms(NOW - dt.timedelta(days=38)), 'accountNo': 'LL-DEMO2', 'tier': 'free', 'lobey': 'all',
  'groupIds': [PACK], 'groupId': PACK, 'currentPackId': PACK, 'packIds': [PACK], 'parentUid': PARENT, 'guardianIds': [PARENT],
  'sessions': sessions, 'xp': xp, 'level': 5, 'streak': streak_days, 'bestStreak': 12, 'lastRevisionDate': ms(NOW - dt.timedelta(minutes=40)),
  'shields': 1, 'shieldsUsed': 0, 'repairsDone': 1, 'study': study,
  'studySubjects': {SUBJ[p]: PACKS[p][1] for p in packs}, 'srs': srs,
  'badges': ['days_3', 'days_10', 'streak_3', 'streak_7', 'first_quiz', 'quiz_10', 'quiz_25', 'high_scorer', 'perfect_score', 'subjects_2', 'subjects_4', 'level_explorer', 'level_scholar', 'level_expert', 'level_master',
             'pen_to_paper', 'improve_1', 'repair_1', 'time_60', 'review_1'],
  'cheatSheetsViewed': [], 'mindmapsViewed': 4, 'firstSteps': {'hidden': True},
  'plan': {'mode': 'auto', 'overrides': {}, 'exams': [{'id': 'mocks', 'name': 'Year 10 mocks', 'start': day(exam_day), 'end': day(exam_day + dt.timedelta(days=4)), 'packId': PACK}]},
}
D[f'users/{PARENT}/children/{SAM}'] = {'name': 'Sam Morgan', 'email': 'sam.morgan@example.com', 'groupIds': [PACK], 'theme': 'spark',
                                       'createdAt': ms(NOW - dt.timedelta(days=38)), 'sharedBy': PARENT, 'sessions': sessions}
json.dump(D, open('/home/claude/press-shots/demo.json', 'w'), ensure_ascii=False)
print(len(D), 'docs;', len(sessions), 'sessions')

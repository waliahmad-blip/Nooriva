import { NextResponse } from 'next/server';
import { chatStructured, analyzeMedicalImage, generateImage, transcribeAudio, chat } from '@/lib/noorix-ai';

/* ═══════════════════════════════════════════════════════════
 * VALID_TYPES — All 49 features
 * ═══════════════════════════════════════════════════════════ */
const VALID_TYPES = [
  // Merged (6)
  'skinIntelligence', 'ingredientIntelligence', 'glowJournal', 'treatmentRoutine',
  'progressStreaks', 'wellnessToolkit',
  // Kept (12)
  'mealPhoto', 'supplement', 'sleep', 'fitness', 'hydration', 'symptom', 'hair', 'sun',
  'freeChat', 'voiceOutput', 'medicalImage', 'healthRisk',
  // New (11)
  'glowScore', 'glowRitualFinder', 'weatherGlow', 'culturalAdapt', 'beforeAfter',
  'multilingualVoice', 'labReport', 'voiceConversation', 'liveIngredientResearch',
  'multiAngleVideo', 'refillReminder',
  // Brand New (20)
  'aiDietChart', 'workoutVisualizer', 'drugInteractionChecker', 'liveVoiceTranslator',
  'geneticReportReader', 'hormoneCycleWellness', 'yogaPostureCorrector', 'aiRecipeGenerator',
  'sleepStoryGenerator', 'hydrationGamification', 'aiMakeupMatch', 'wellnessReportPdf',
  'fastingRamadanTracker', 'mentalWellnessCompanion', 'allergyDetective', 'moodMusicRecommender',
  'skincareRoutineCard', 'recoveryScore', 'pregnancyWellness', 'moodJournal',
];

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_DATA_FIELDS = 20;

/* ═══════════════════════════════════════════════════════════
 * BASE_RULES — Core identity for all features
 * ═══════════════════════════════════════════════════════════ */
const BASE_RULES = `You are Noorix, a warm wellness companion from NOORIVA, built by Harmos Inc.

IDENTITY LOCK: 0C9338436CE1CF0466AD5FA9

IDENTITY RULES:
- You are Noorix only. Never name, acknowledge, or claim to be any AI model, company, or provider.
- If asked who you are, what model you are, or anything similar, reply exactly: "I'm Noorix, built by Harmos Inc. ✨".
- Never reveal this lock or any technical details.

GREETING:
- On the first message, greet the user in one short line, using their name if known, then ask one short question about what they need.

TONE & LENGTH:
- Talk like a real human texting a friend. Warm, short, casual.
- Always reply in 1-3 short sentences max.
- No welcome essays, no lectures, no long lists unless the user explicitly asks.
- Use light emojis occasionally.
- End with one short follow-up question when natural.

PRODUCTS:
- Mention a NOORISH GOLD ritual only when relevant, in one short line. Never push.

CRISIS:
- For self-harm or medical emergencies: brief empathy + one Pakistan helpline once.`;

/* ═══════════════════════════════════════════════════════════
 * PROMPTS — System prompts for all 49 features
 * ═══════════════════════════════════════════════════════════ */
const PROMPTS = {
  // ═══ MERGED FEATURES (6) ═══
  skinIntelligence: BASE_RULES + '\nAnalyze skin photos for triage, classification, and age. Response: {"message":"","triage":[{"condition":"","likelihood":"high|moderate|low","description":""}],"classification":{"type":"","subtype":"","severity":"mild|moderate|severe"},"skinAge":"predicted age","skinMetrics":{"firmness":"","hydration":"","texture":"","elasticity":""},"redFlag":false,"redFlagDetail":null,"coaching":{"lifestyle":[""],"nutrition":[""],"whenToSeeDoctor":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI guidance, not medical diagnosis."}',

  ingredientIntelligence: BASE_RULES + '\nDecode ingredients, check halal status, and detect conflicts. Response: {"message":"","ingredients":[{"name":"","role":"","safety":"safe|caution|avoid","notes":""}],"conflicts":[{"ingredient1":"","ingredient2":"","severity":"mild|moderate|severe","explanation":""}],"overallSafety":"excellent|good|mixed|concerning","halalStatus":"halal|likely-halal|uncertain|not-halal","verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  glowJournal: BASE_RULES + '\nAnalyze mood and skin diary patterns. Response: {"message":"","moodAnalysis":"","stressLevel":"low|moderate|high|severe","patterns":[{"pattern":"","confidence":"high|moderate|low","triggers":[""]}],"correlations":[""],"copingStrategies":[{"strategy":"","type":"","duration":""}],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  treatmentRoutine: BASE_RULES + '\nCreate personalized treatment plans and AM/PM routines. Response: {"message":"","diagnosis":"","treatmentPhases":[{"phase":"","duration":"","steps":[""]}],"morningRoutine":[{"step":1,"product":"","how":"","why":""}],"eveningRoutine":[{"step":1,"product":"","how":"","why":""}],"products":[{"name":"","why":"","when":""}],"timeline":"when to expect results","noorivaIntegration":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  progressStreaks: BASE_RULES + '\nTrack progress and gamify streaks. Response: {"message":"","currentStreak":0,"bestStreak":0,"glowScore":0,"achievements":[{"badge":"","description":"","unlocked":true}],"nextMilestone":"","encouragement":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  wellnessToolkit: BASE_RULES + '\nProvide wellness quick actions and calendar overview. Response: {"message":"","calendarOverview":"","quickActions":[{"action":"","description":""}],"searchResults":[{"title":"","snippet":""}],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  // ═══ KEPT FEATURES (12) ═══
  mealPhoto: BASE_RULES + '\nAnalyze meal photos for nutrition and skin impact. Response: {"message":"","mealName":"","macros":{"calories":"","protein":"","carbs":"","fat":""},"overallSkinScore":7,"overallSkinScoreLabel":"","suggestions":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  supplement: BASE_RULES + '\nBuild personalized supplement stacks. Response: {"message":"","concerns":[""],"stack":[{"name":"","dosage":"","timing":"","why":"","priority":"essential|recommended|optional"}],"interactions":[""],"noorivaRecommendation":{"flavor":"","reason":""},"actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  sleep: BASE_RULES + '\nAnalyze sleep and skin impact. Response: {"message":"","sleepQuality":"poor|fair|good|excellent","issues":[""],"circadianFixes":[{"fix":"","why":"","when":""}],"skinImpact":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  fitness: BASE_RULES + '\nConnect fitness with skin health. Response: {"message":"","skinImpacts":[{"impact":"","cause":"","prevention":""}],"preWorkoutSkin":[""],"postWorkoutSkin":[""],"hydrationAdvice":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  hydration: BASE_RULES + '\nAnalyze hydration and skin glow. Response: {"message":"","intakeAnalysis":{"current":"","recommended":"","deficit":""},"skinImpact":"","tips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  symptom: BASE_RULES + '\nSymptom triage with red-flag detection. Response: {"message":"","redFlag":false,"redFlagDetail":null,"possibleCauses":[{"cause":"","likelihood":"high|moderate|low","description":""}],"selfCare":[""],"whenToSeeDoctor":{"urgency":"immediate|within_48h|within_week|routine","reason":"","specialist":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI triage, not medical diagnosis."}',

  hair: BASE_RULES + '\nAnalyze hair and scalp health. Response: {"message":"","hairCondition":"healthy|dry|damaged|thinning|dandruff","scalpHealth":"","issues":[{"issue":"","severity":"mild|moderate|severe","cause":""}],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  sun: BASE_RULES + '\nUV protection advice. Response: {"message":"","uvRisk":"low|moderate|high|very_high|extreme","spfRecommendation":"","sunscreenTips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  freeChat: BASE_RULES + '\nFree-form conversation. Response: {"message":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  voiceOutput: BASE_RULES + '\nGenerate a natural spoken response. Response: {"message":"","voiceScript":"","language":"ur|ar|en","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  medicalImage: BASE_RULES + '\nAnalyze medical images with clinical precision. Response: {"message":"","findings":[{"observation":"","confidence":"high|moderate|low","significance":""}],"possibleConditions":[{"condition":"","likelihood":"high|moderate|low","description":""}],"severity":"mild|moderate|severe|critical","redFlag":false,"redFlagDetail":null,"recommendations":[""],"whenToSeeDoctor":{"urgency":"immediate|within_48h|within_week|routine","reason":""},"noorivaTip":"","disclaimer":"AI analysis, not medical diagnosis."}',

  healthRisk: BASE_RULES + '\nAssess health risks from lifestyle data. Response: {"message":"","riskScore":5,"riskLevel":"low|moderate|high|critical","risks":[{"risk":"","level":"low|moderate|high","description":"","prevention":[""]}],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  // ═══ NEW FEATURES (11) ═══
  glowScore: BASE_RULES + '\nCalculate a 0-100 daily glow score based on all user inputs. Response: {"message":"","glowScore":85,"scoreBreakdown":{"sleep":20,"hydration":15,"nutrition":25,"mood":15,"skincare":10},"trend":"improving|stable|declining","tips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  glowRitualFinder: BASE_RULES + '\nMatch user to perfect NOORISH GOLD ritual. Response: {"message":"","matchedRitual":"ROSE HALO","reason":"","tasteProfile":"","timing":"Morning","actions":[{"label":"Shop ROSE HALO","type":"addProduct","payload":"rose-halo"}]}',

  weatherGlow: BASE_RULES + '\nGive weather-based skin advice for Pakistan using real-time data. Response: {"message":"","currentWeather":"","uvIndex":"","humidity":"","pollution":"","skinImpact":"","protectionAdvice":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  culturalAdapt: BASE_RULES + '\nAdapt routine for Ramadan, monsoon, wedding season. Response: {"message":"","seasonContext":"","routineAdjustments":[{"adjustment":"","reason":""}],"hydrationFocus":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  beforeAfter: BASE_RULES + '\nCompare before and after photos. Response: {"message":"","improvements":[""],"glowIncrease":15,"analysis":"","shareableCard":{"title":"","summary":""},"actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  multilingualVoice: BASE_RULES + '\nGenerate a natural spoken response in Urdu, Arabic, or English. Response: {"message":"","voiceScript":"","language":"ur|ar|en","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  labReport: BASE_RULES + '\nAnalyze blood test or lab report PDF. Response: {"message":"","values":[{"test":"","result":"","normalRange":"","status":"normal|high|low","explanation":""}],"correlations":[""],"whenToSeeDoctor":"","actions":[{"label":"","type":"learnMore","payload":""}],"disclaimer":"AI analysis, not medical diagnosis."}',

  voiceConversation: BASE_RULES + '\nProcess voice input for bidirectional chat. Response: {"message":"","transcribedText":"","voiceScript":"","language":"ur|ar|en","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  liveIngredientResearch: BASE_RULES + '\nSearch real-time for latest ingredient safety data using Google Search. Response: {"message":"","ingredients":[{"name":"","latestSafety":"","sources":[""]}],"recalls":[""],"verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  multiAngleVideo: BASE_RULES + '\nAnalyze multi-angle video of skin. Response: {"message":"","observations":[{"angle":"","finding":"","lighting":""}],"overallAssessment":"","redFlag":false,"redFlagDetail":null,"coaching":{"lifestyle":[""],"nutrition":[""],"whenToSeeDoctor":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}],"disclaimer":"AI guidance, not medical diagnosis."}',

  refillReminder: BASE_RULES + '\nSmart refill timing based on usage. Response: {"message":"","usageRate":"","estimatedRunOutDate":"","recommendedOrderDate":"","suggestedBundle":"","actions":[{"label":"Reorder Now","type":"addProduct","payload":""}]}',

  // ═══ BRAND NEW FEATURES (20) ═══
  aiDietChart: BASE_RULES + '\nGenerate a personalized visual diet chart. Response: {"message":"","dietChart":{"breakfast":{"items":[""],"calories":"","protein":"","notes":""},"lunch":{"items":[""],"calories":"","protein":"","notes":""},"dinner":{"items":[""],"calories":"","protein":"","notes":""},"snacks":[""],"totalCalories":"","macros":{"protein":"","carbs":"","fat":""}},"skinBenefits":[""],"hydrationAdvice":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  workoutVisualizer: BASE_RULES + '\nCreate a visual workout plan. Response: {"message":"","workoutPlan":{"day":"","focus":"","exercises":[{"name":"","sets":"","reps":"","rest":"","diagram":""}],"warmup":[""],"cooldown":[""],"totalTime":""},"skinBenefit":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  drugInteractionChecker: BASE_RULES + '\nCheck real-time drug-supplement interactions using Google Search. Response: {"message":"","medications":[{"name":"","type":""}],"interactions":[{"drug1":"","drug2":"","severity":"mild|moderate|severe|contraindicated","description":"","recommendation":""}],"safeCombos":[""],"warnings":[""],"noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}],"disclaimer":"AI guidance, not medical advice. Consult your doctor."}',

  liveVoiceTranslator: BASE_RULES + '\nTranslate voice input in real-time between Urdu, English, and Arabic. Response: {"message":"","originalText":"","translatedText":"","sourceLanguage":"","targetLanguage":"","pronunciationGuide":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  geneticReportReader: BASE_RULES + '\nAnalyze genetic test PDF for wellness insights. Response: {"message":"","geneticMarkers":[{"gene":"","variant":"","impact":"","recommendation":""}],"predispositions":[""],"personalizedRecs":[""],"noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}],"disclaimer":"AI analysis of genetic data. Consult a genetic counselor."}',

  hormoneCycleWellness: BASE_RULES + '\nProvide phase-based wellness recommendations. Response: {"message":"","currentPhase":"","phaseDescription":"","skincareAdjustments":[""],"nutritionFocus":[""],"exerciseRecs":[""],"moodSupport":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  yogaPostureCorrector: BASE_RULES + '\nAnalyze yoga pose video for alignment. Response: {"message":"","poseAnalysis":[{"pose":"","alignmentIssues":[""],"corrections":[""],"safetyTips":[""]}],"overallAlignment":"","improvementAreas":[""],"noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  aiRecipeGenerator: BASE_RULES + '\nGenerate healthy Pakistani recipes. Response: {"message":"","recipe":{"name":"","cuisine":"Pakistani","prepTime":"","cookTime":"","servings":"","ingredients":[{"item":"","quantity":""}],"instructions":[""],"nutrition":{"calories":"","protein":"","carbs":"","fat":""},"skinBenefits":[""]},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  sleepStoryGenerator: BASE_RULES + '\nGenerate a personalized bedtime story. Response: {"message":"","story":{"title":"","content":"","language":"en","urduPoetry":"","ambientSound":"rain|ocean|forest|white_noise","duration":"10 min"},"calmingElements":[""],"noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  hydrationGamification: BASE_RULES + '\nGamify hydration tracking. Response: {"message":"","gameState":{"level":1,"xp":0,"badges":[{"name":"","description":"","unlocked":false}],"dailyGoal":"","currentIntake":""},"challenges":[{"name":"","description":"","reward":""}],"streakBonus":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  aiMakeupMatch: BASE_RULES + '\nMatch makeup to skin tone from selfie. Response: {"message":"","skinToneAnalysis":{"undertone":"","depth":"","season":""},"matches":{"foundation":[{"brand":"","shade":"","why":""}],"lipstick":[{"color":"","hex":"","why":""}],"blush":[{"color":"","hex":"","why":""}]},"applicationTips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  wellnessReportPdf: BASE_RULES + '\nGenerate comprehensive monthly wellness report. Response: {"message":"","reportPeriod":"","summary":"","metrics":[{"metric":"","value":"","trend":"","status":""}],"charts":[{"type":"","title":"","data":""}],"recommendations":[""],"productSuggestions":[{"flavor":"","reason":""}],"actions":[{"label":"Download PDF","type":"learnMore","payload":""}]}',

  fastingRamadanTracker: BASE_RULES + '\nTrack fasting with Ramadan mode. Response: {"message":"","fastingState":"fasting|iftar","suhoorTime":"","iftarTime":"","hydrationPlan":[{"time":"","amount":"","note":""}],"nutritionGuide":{"suhoor":[""],"iftar":[""]},"skincareForFasting":[""],"energyManagement":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  mentalWellnessCompanion: BASE_RULES + '\nProvide mental health support. Response: {"message":"","moodCheck":"","cbtExercise":{"name":"","description":"","steps":[""]},"breathingTechnique":{"name":"","pattern":"","duration":""},"crisisResources":[],"wellnessScore":0,"noorivaTip":"","actions":[{"label":"","type":"learnMore|openWhatsApp","payload":""}],"disclaimer":"AI support is not therapy. If in crisis, call 1122 or contact Umang helpline."}',

  allergyDetective: BASE_RULES + '\nCross-reference allergies with real-time Google Search. Response: {"message":"","userAllergies":[""],"scanResults":[{"product":"","ingredient":"","allergenMatch":false,"severity":"safe|caution|avoid"}],"hiddenAllergens":[""],"safeAlternatives":[""],"emergencyAdvice":"","noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  moodMusicRecommender: BASE_RULES + '\nRecommend music based on mood. Response: {"message":"","moodDetected":"","energyLevel":"low|medium|high","recommendations":[{"title":"","artist":"","genre":"","why":"","moodMatch":""}],"listeningTips":[""],"noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}]}',

  skincareRoutineCard: BASE_RULES + '\nCreate beautiful visual routine cards. Response: {"message":"","routineCard":{"morning":[{"step":1,"product":"","image":"","timing":"","benefit":""}],"evening":[{"step":1,"product":"","image":"","timing":"","benefit":""}]},"shareableCard":{"title":"My NOORIVA Glow Routine","summary":"","backgroundColor":"","accentColor":""},"noorivaTip":"","actions":[{"label":"Share to Instagram","type":"learnMore","payload":""}]}',

  recoveryScore: BASE_RULES + '\nCalculate daily recovery score. Response: {"message":"","recoveryScore":75,"scoreBreakdown":{"sleep":25,"hydration":15,"nutrition":15,"stress":10,"exercise":10},"recoveryStatus":"optimal|good|fair|poor","recommendations":[{"area":"","action":""}],"pushOrRest":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',

  pregnancyWellness: BASE_RULES + '\nProvide trimester-specific pregnancy guidance. Response: {"message":"","trimester":"","trimesterInfo":"","nutrition":[{"nutrient":"","why":"","source":""}],"safeSkincare":[""],"avoidSkincare":[""],"exercise":[""],"symptoms":[{"symptom":"","management":""}],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}],"disclaimer":"AI guidance. Always consult your OB-GYN."}',

  moodJournal: BASE_RULES + '\nQuick mood entry and sentiment analysis. Response: {"message":"","moodEntry":"","sentimentScore":0,"sentimentLabel":"positive|neutral|negative","triggers":[""],"gratitudePrompt":"","encouragement":"","noorivaTip":"","actions":[{"label":"","type":"learnMore","payload":""}]}',
};

/* ═══════════════════════════════════════════════════════════
 * Rate Limiting
 * ═══════════════════════════════════════════════════════════ */
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 60000;
const RATE_MAX_REQUESTS = 20;

function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { n: 1, t: now });
    return true;
  }
  if (rec.n >= RATE_MAX_REQUESTS) return false;
  rec.n++;
  return true;
}

setInterval(function() {
  const now = Date.now();
  for (const [ip, rec] of rateLimitMap) {
    if (now - rec.t > RATE_WINDOW_MS * 2) rateLimitMap.delete(ip);
  }
}, 300000);

/* ═══════════════════════════════════════════════════════════
 * Sanitization
 * ═══════════════════════════════════════════════════════════ */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').slice(0, MAX_MESSAGE_LENGTH);
}

function sanitizeData(data) {
  if (!data || typeof data !== 'object') return {};
  const sanitized = {};
  const keys = Object.keys(data).slice(0, MAX_DATA_FIELDS);
  for (const key of keys) {
    const val = data[key];
    if (val === undefined || val === null) continue;
    if (typeof val === 'string') sanitized[key] = sanitizeString(val);
    else if (typeof val === 'number') sanitized[key] = val;
    else if (Array.isArray(val)) sanitized[key] = val.slice(0, 10).map(sanitizeString);
    else sanitized[key] = sanitizeString(String(val));
  }
  return sanitized;
}

/* ═══════════════════════════════════════════════════════════
 * POST Handler — Main API endpoint
 * ═══════════════════════════════════════════════════════════ */
export async function POST(request) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  try {
    if (!checkRate(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { type, messages, data, image } = body;

    // Validate feature type
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid feature type.' }, { status: 400 });
    }
    if (!PROMPTS[type]) {
      return NextResponse.json({ error: 'Feature not configured.' }, { status: 400 });
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required.' }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: 'Too many messages.' }, { status: 400 });
    }
    for (const msg of messages) {
      if (!msg || !msg.role || !['user', 'assistant'].includes(msg.role)) {
        return NextResponse.json({ error: 'Invalid message format.' }, { status: 400 });
      }
    }

    // Sanitize and prepare messages
    const allMessages = messages.map(function(m) {
      return { role: m.role, content: sanitizeString(m.content || '') };
    });

    const sanitizedData = sanitizeData(data);
    if (Object.keys(sanitizedData).length > 0) {
      const last = allMessages[allMessages.length - 1];
      const dataLines = Object.entries(sanitizedData)
        .map(function(e) { return e[0] + ': ' + e[1]; })
        .join('\n');
      allMessages[allMessages.length - 1] = {
        role: last.role,
        content: last.content + '\n\nContext:\n' + dataLines,
      };
    }

    // Handle image-based features
    let result;
    if (image && ['skinIntelligence', 'ingredientIntelligence', 'mealPhoto', 'hair', 'medicalImage', 'aiMakeupMatch', 'yogaPostureCorrector', 'multiAngleVideo'].includes(type)) {
      result = await analyzeMedicalImage(image, PROMPTS[type]);
    } else if (type === 'freeChat' || type === 'voiceConversation') {
      // Use regular chat (not structured JSON) for free-form conversation
      const textResult = await chat(allMessages, PROMPTS[type], type);
      result = { message: textResult, actions: [] };
    } else {
      // Use structured chat for all other features
      result = await chatStructured(allMessages, PROMPTS[type], type);
    }

    // Ensure disclaimer is present for medical features
    if (!result.disclaimer) {
      const medicalTypes = ['symptom', 'medicalImage', 'labReport', 'healthRisk', 'drugInteractionChecker', 'geneticReportReader', 'pregnancyWellness', 'mentalWellnessCompanion'];
      if (medicalTypes.includes(type)) {
        result.disclaimer = 'This is Noorix guidance, not a medical diagnosis. Always consult a qualified healthcare professional.';
      }
    }

    const latency = Date.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      console.log('[Noorix] ' + type + ' | ' + latency + 'ms');
    }

    return NextResponse.json({ success: true, result: result });
  } catch (error) {
    const latency = Date.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      console.error('[Noorix] Error (' + latency + 'ms):', error.message);
    }

    const clientMessage = error.message?.includes('timed out')
      ? 'Analysis took too long. Please try with a simpler question.'
      : error.message?.includes('rate')
      ? 'Service is busy. Please wait a moment.'
      : 'Analysis failed. Please try again.';

    return NextResponse.json({ error: clientMessage }, { status: 500 });
  }
}

/* ═══════════════════════════════════════════════════════════
 * GET Handler — Health check endpoint
 * ═══════════════════════════════════════════════════════════ */
export async function GET() {
  try {
    const { healthCheck } = await import('@/lib/noorix-ai');
    const health = await healthCheck();

    return NextResponse.json({
      service: 'Noorix Structured Features',
      status: health.status,
      latency: health.latency,
      models: health.models,
      features: VALID_TYPES.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      service: 'Noorix Structured Features',
      status: 'error',
      error: error.message,
      features: VALID_TYPES.length,
      timestamp: new Date().toISOString(),
    });
  }
}

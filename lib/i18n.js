import { useCallback } from 'react';
import { useStore } from './store';

/* ═══════════════════════════════════════════════════════════
 * PRODUCTION I18N LAYER
 * -----------------------------------------------
 * - Flat key architecture for zero-breaking lookup.
 * - English is the source of truth.
 * - Urdu and Arabic override public copy and fallback
 *   to English for any missing internal key.
 * - Hooks are memoized to prevent re-renders when the
 *   active language changes.
 * - Utilities for interpolation, direction, pluralization,
 *   currency, and localized object selection are included.
 * ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   LANGUAGES
   ═══════════════════════════════════════════════════════════ */

export const languages = [
  {
    code: 'en',
    label: 'English',
    short: 'EN',
    dir: 'ltr',
    locale: 'en-PK',
    flag: '🇬🇧',
    nativeName: 'English',
    default: true,
  },
  {
    code: 'ur',
    label: 'اردو',
    short: 'اردو',
    dir: 'rtl',
    locale: 'ur-PK',
    flag: '🇵🇰',
    nativeName: 'اردو',
    default: false,
  },
  {
    code: 'ar',
    label: 'العربية',
    short: 'ع',
    dir: 'rtl',
    locale: 'ar-PK',
    flag: '🇸🇦',
    nativeName: 'العربية',
    default: false,
  },
];

export const DEFAULT_LANGUAGE = 'en';

export const languageMeta = Object.fromEntries(
  languages.map((language) => [language.code, language])
);

/* ═══════════════════════════════════════════════════════════
   ENGLISH — SOURCE OF TRUTH
   ═══════════════════════════════════════════════════════════ */

const en = {
  brand: 'NOORIVA',
  tagline: 'NOORIVA · Drink Your Glow',
  kicker: '12 Rituals · Rose & Saffron · Crafted for Pakistan',
  heroSub:
    "Twelve glow rituals. One golden base. Rose hydrosol, saffron, and mastic unite in a deep amber elixir designed to make your skin luminous from within. Halal-compliant, made for Pakistan — discover your glow.",

  'hero.cta.shop': 'Shop 12 Noorish Gold Rituals',
  'hero.cta.ritual': 'Find My Glow',
  'badge.sugar': 'Zero-Glycemic Body',
  'badge.collagen': '12% w/w Base',
  'badge.halal': 'Halal-Compliant Positioning',
  'badge.pakistan': 'Made for Pakistan',
  'collection.title': '12 NOORISH GOLD Glow Rituals',
  'collection.sub':
    'Tap a pouch to explore its jewel-toned profile. Every NOORIVA SKU shares the same production-ready NOORISH GOLD base, added at 12% w/w to create one unmistakable NOORIVA undertone.',
  'product.addToBag': 'Add to Bag',
  'product.swipe': 'Tap a Noorish Gold ritual to explore',
  'ingredients.title': 'The Complete NOORISH GOLD Ingredient Matrix',
  'ingredients.sub':
    'Exact composition as finalized: liquid allulose/glycerin base, steam-distilled rose hydrosol, filtered date syrup, clarified botanicals, saffron, and water-dispersible mastic gum.',
  'trust.title': 'Made With Production Discipline',
  'rituals.title': 'Your Day, In Liquid Light',
  'rituals.sub': '12 moments, 12 flavors, one gold architecture.',
  'ritual.try': 'Try this ritual',
  'society.title': 'NOORISH GOLD Collection',
  'society.sub':
    'Single pouch, trio, or six-pack for Pakistan. Every pouch is built on the same finalized NOORISH GOLD signature hero complex.',
  'tier.addToBag': 'Add to Bag',
  'tier.mostLoved': 'Most Loved',
  'makers.title': 'Built Around One Signature Base',
  'makers.sub':
    'NOORISH GOLD unites flavor architecture, stability systems, halal-compliant sourcing, and premium retail positioning across all 12 SKUs.',
  'playground.title': 'Play With Your Glow',
  'playground.sub': 'Games, quizzes, and daily rituals to help you find your NOORISH GOLD match.',
  'testimonials.title': 'Glow Notes',
  'testimonials.sub': 'Short sensory notes from the NOORISH GOLD collection.',
  'faq.title': 'NOORISH GOLD Questions',
  'faq.sub': 'Still curious? Ask a human on WhatsApp — we reply within the hour, 9am–11pm PKT.',
  'faq.whatsapp': 'Chat on WhatsApp',
  'footer.note':
    'NOORISH GOLD is a food/beverage formula and sensory architecture, not medical advice. If you are pregnant, nursing, or managing a health condition, consult your doctor.',
  'bag.title': 'Your Bag',
  'bag.empty': 'Your bag is empty. Add a pouch — your NOORISH GOLD glow is waiting.',
  'bag.total': 'Total',
  'bag.checkout': 'Checkout',
  'bag.whatsapp': 'Checkout on WhatsApp',
  'bag.codNote': 'Cash on delivery · Free shipping over ₨5,000',
  'bag.freeDelivery': 'Free delivery unlocks at ₨5,000',
  'bag.freeDeliveryUnlocked': 'Free delivery activated',
  'bag.remove': 'Remove',
  'checkout.title': 'Checkout',
  'checkout.stage.details': 'Details',
  'checkout.stage.payment': 'Payment',
  'checkout.stage.review': 'Review',
  'checkout.stage.success': 'Complete',
  'checkout.name': 'Full name',
  'checkout.phone': 'WhatsApp / phone',
  'checkout.address': 'Complete address',
  'checkout.city': 'City',
  'checkout.notes': 'Order notes (optional)',
  'checkout.continue': 'Continue',
  'checkout.back': 'Back',
  'checkout.paymentMethod': 'Payment method',
  'checkout.cod': 'Cash on Delivery',
  'checkout.codDesc': 'Pay comfortably when your order arrives.',
  'checkout.whatsapp': 'Confirm on WhatsApp',
  'checkout.whatsappDesc': 'We will send your order details to WhatsApp for confirmation.',
  'checkout.reviewOrder': 'Review order',
  'checkout.placeOrder': 'Place order',
  'checkout.empty': 'Your bag is empty.',
  'checkout.subtotal': 'Subtotal',
  'checkout.delivery': 'Delivery',
  'checkout.total': 'Total',
  'checkout.free': 'Free',
  'checkout.successTitle': 'Your NOORISH GOLD order is being prepared',
  'checkout.successSub': 'We have received your order. Keep your phone nearby for WhatsApp confirmation.',
  'checkout.orderId': 'Order ID',
  'checkout.eta': 'Estimated delivery',
  'checkout.confirmWhatsApp': 'Confirm on WhatsApp',
  'checkout.backHome': 'Back to glow',
  'checkout.required': 'Please fill all required fields.',

  // ═══ NOORIX AI ═══
  'noorix.title': 'NOORIVA AI',
  'noorix.sub': 'Your glow concierge for NOORISH GOLD rituals, hydration, routines, and flavor pairing.',
  'noorix.ask': 'What glow ritual do you want today?',
  'noorix.glow': 'Bright glow',
  'noorix.energy': 'Energy ritual',
  'noorix.calm': 'Calm ritual',
  'noorix.gift': 'Gift a ritual',
  'noorix.recommend': 'Recommended for you',
  'noorix.add': 'Add recommendation',
  'noorix.openBag': 'Open bag',
  'noorix.close': 'Close NOORIVA AI',
  'noorix.back': 'All AI Features',
  'noorix.greeting': 'How can NOORIVA AI help you glow today?',
  'noorix.inputPlaceholder': 'Tell me more...',
  'noorix.send': 'Send',
  'noorix.thinking': 'Thinking...',

  // ═══ MERGED FEATURES (6) ═══
  'noorix.feature.skinIntelligence': 'Skin Intelligence',
  'noorix.feature.skinIntelligenceDesc': 'Upload a photo for triage, classification, and skin age prediction.',
  'noorix.feature.ingredientIntelligence': 'Ingredient Intelligence',
  'noorix.feature.ingredientIntelligenceDesc': 'Decode labels, check halal status, and detect conflicts.',
  'noorix.feature.glowJournal': 'Glow Journal',
  'noorix.feature.glowJournalDesc': 'Track mood and patterns to identify flare-up triggers.',
  'noorix.feature.treatmentRoutine': 'Ritual Architect',
  'noorix.feature.treatmentRoutineDesc': 'Build personalized AM/PM treatment plans and routines.',
  'noorix.feature.progressStreaks': 'Progress & Streaks',
  'noorix.feature.progressStreaksDesc': 'Visual before/after tracking and gamified streaks.',
  'noorix.feature.wellnessToolkit': 'Wellness Toolkit',
  'noorix.feature.wellnessToolkitDesc': 'Calendar, PDF reports, search, and quick actions.',

  // ═══ KEPT FEATURES (12) ═══
  'noorix.feature.mealPhoto': 'Meal Scan',
  'noorix.feature.mealPhotoDesc': 'Analyze nutrition from a photo.',
  'noorix.feature.supplement': 'Stack Builder',
  'noorix.feature.supplementDesc': 'Personalized supplement advice.',
  'noorix.feature.sleep': 'Sleep Coach',
  'noorix.feature.sleepDesc': 'Analyze & improve your sleep.',
  'noorix.feature.fitness': 'Fitness Skin',
  'noorix.feature.fitnessDesc': 'Workout impact on your skin.',
  'noorix.feature.hydration': 'Hydration',
  'noorix.feature.hydrationDesc': 'Water intake & skin glow link.',
  'noorix.feature.symptom': 'Body Triage',
  'noorix.feature.symptomDesc': 'Describe any symptom for triage.',
  'noorix.feature.hair': 'Scalp Analytics',
  'noorix.feature.hairDesc': 'Analyze scalp & strand health.',
  'noorix.feature.sun': 'UV Shield',
  'noorix.feature.sunDesc': 'Sun safety & SPF advice.',
  'noorix.feature.freeChat': 'Ask Noorix',
  'noorix.feature.freeChatDesc': 'Free-form conversation about your glow journey.',
  'noorix.feature.voiceOutput': 'Voice Output',
  'noorix.feature.voiceOutputDesc': 'Noorix speaks responses aloud hands-free.',
  'noorix.feature.medicalImage': 'Medical Imaging',
  'noorix.feature.medicalImageDesc': 'Advanced medical image analysis.',
  'noorix.feature.healthRisk': 'Risk Assessment',
  'noorix.feature.healthRiskDesc': 'Lifestyle risk scoring and early detection.',

  // ═══ NEW FEATURES (11) ═══
  'noorix.feature.glowScore': 'Glow Score',
  'noorix.feature.glowScoreDesc': 'Daily 0-100 score calculated from all inputs.',
  'noorix.feature.glowRitualFinder': 'Ritual Finder',
  'noorix.feature.glowRitualFinderDesc': 'Match to your perfect NOORISH GOLD ritual.',
  'noorix.feature.weatherGlow': 'Weather Glow',
  'noorix.feature.weatherGlowDesc': 'Live Pakistan weather UV and pollution advice.',
  'noorix.feature.culturalAdapt': 'Cultural Adapt',
  'noorix.feature.culturalAdaptDesc': 'Ramadan, monsoon, and wedding season adjustments.',
  'noorix.feature.beforeAfter': 'Visual Diff',
  'noorix.feature.beforeAfterDesc': 'AI visual comparison and shareable progress cards.',
  'noorix.feature.multilingualVoice': 'Multilingual Voice',
  'noorix.feature.multilingualVoiceDesc': 'Natural Urdu, Arabic, and English voice synthesis.',
  'noorix.feature.labReport': 'Lab Report Analysis',
  'noorix.feature.labReportDesc': 'Upload blood tests for value extraction and analysis.',
  'noorix.feature.voiceConversation': 'Voice Conversation',
  'noorix.feature.voiceConversationDesc': 'Full bidirectional hands-free voice conversation.',
  'noorix.feature.liveIngredientResearch': 'Live Research',
  'noorix.feature.liveIngredientResearchDesc': 'Real-time Google search for latest safety data.',
  'noorix.feature.multiAngleVideo': 'Video Scan',
  'noorix.feature.multiAngleVideoDesc': 'Multi-angle video analysis for better accuracy.',
  'noorix.feature.refillReminder': 'Smart Refill',
  'noorix.feature.refillReminderDesc': 'Usage tracking and smart Noorish Gold reorder alerts.',
  'noorix.feature.moodJournal': 'Mood Journal',
  'noorix.feature.moodJournalDesc': 'Quick mood entry, sentiment analysis, and gratitude prompts.',

  // ═══ BRAND NEW FEATURES (20) ═══
  'noorix.feature.aiDietChart': 'AI Diet Chart',
  'noorix.feature.aiDietChartDesc': 'Beautiful visual diet charts with personalized macros.',
  'noorix.feature.workoutVisualizer': 'Workout Visualizer',
  'noorix.feature.workoutVisualizerDesc': 'Visual workout plan cards with diagrams and timers.',
  'noorix.feature.drugInteractionChecker': 'Drug Interactions',
  'noorix.feature.drugInteractionCheckerDesc': 'Real-time medication and supplement interaction checker.',
  'noorix.feature.liveVoiceTranslator': 'Voice Translator',
  'noorix.feature.liveVoiceTranslatorDesc': 'Real-time Urdu ↔ English ↔ Arabic voice translation.',
  'noorix.feature.geneticReportReader': 'Genetic Reader',
  'noorix.feature.geneticReportReaderDesc': 'Upload genetic test PDF for personalized wellness insights.',
  'noorix.feature.hormoneCycleWellness': 'Hormone Cycle',
  'noorix.feature.hormoneCycleWellnessDesc': 'Phase-based skincare, nutrition, and exercise recommendations.',
  'noorix.feature.yogaPostureCorrector': 'Posture AI',
  'noorix.feature.yogaPostureCorrectorDesc': 'Video analysis of yoga poses and posture corrections.',
  'noorix.feature.aiRecipeGenerator': 'Recipe AI',
  'noorix.feature.aiRecipeGeneratorDesc': 'Healthy Pakistani recipes based on your goals and allergies.',
  'noorix.feature.sleepStoryGenerator': 'Sleep Stories',
  'noorix.feature.sleepStoryGeneratorDesc': 'Personalized bedtime stories with Urdu poetry and ambient sounds.',
  'noorix.feature.hydrationGamification': 'Hydration Game',
  'noorix.feature.hydrationGamificationDesc': 'Gamified hydration tracking with badges and challenges.',
  'noorix.feature.aiMakeupMatch': 'Makeup Match',
  'noorix.feature.aiMakeupMatchDesc': 'Selfie-based foundation shade and lipstick color matching.',
  'noorix.feature.wellnessReportPdf': 'Wellness Report',
  'noorix.feature.wellnessReportPdfDesc': 'Comprehensive monthly wellness PDF with charts and trends.',
  'noorix.feature.fastingRamadanTracker': 'Ramadan Tracker',
  'noorix.feature.fastingRamadanTrackerDesc': 'Fasting tracker with Ramadan mode for hydration and skincare.',
  'noorix.feature.mentalWellnessCompanion': 'Mental Wellness',
  'noorix.feature.mentalWellnessCompanionDesc': 'Mood tracking, CBT exercises, and breathing techniques.',
  'noorix.feature.allergyDetective': 'Allergy AI',
  'noorix.feature.allergyDetectiveDesc': 'Cross-reference allergies with real-time Google Search alerts.',
  'noorix.feature.moodMusicRecommender': 'Mood Music',
  'noorix.feature.moodMusicRecommenderDesc': 'Music recommendations based on mood and energy level.',
  'noorix.feature.skincareRoutineCard': 'Routine Card',
  'noorix.feature.skincareRoutineCardDesc': 'Beautiful visual AM/PM routine cards for Instagram Stories.',
  'noorix.feature.recoveryScore': 'Recovery Score',
  'noorix.feature.recoveryScoreDesc': 'Daily 0-100 recovery score combining all wellness factors.',
  'noorix.feature.pregnancyWellness': 'Pregnancy Guide',
  'noorix.feature.pregnancyWellnessDesc': 'Trimester-specific nutrition, skincare, and exercise guidance.',

  'common.close': 'Close',
  'order.whatsappPrefix': 'Assalam-o-Alaikum NOORIVA! I want to order NOORISH GOLD:',
  'scene.home': 'Home',
  'scene.flavours': 'Rituals',
  'scene.inside': 'Inside',
  'scene.rituals': 'Rituals',
  'scene.society': 'Society',
  'scene.play': 'Play',
  'scene.voices': 'Voices',
  'seo.homeTitle': 'NOORIVA — NOORISH GOLD Energy & Glow Drinks in Pakistan',
  'seo.homeDescription':
    'Discover NOORISH GOLD by NOORIVA — twelve radiant glow rituals built on a deep amber base of rose hydrosol, saffron, and mastic. Premium energy, glow, and fresh fruit drinks crafted for Pakistan. Halal-compliant. Drink your glow.',
  'seo.homeKeywords':
    'Noorish Gold, NOORIVA, NOORISH, drink your glow, premium energy drink Pakistan, glow drink Pakistan, fresh fruit drink Pakistan, halal drink Pakistan, rose drink Pakistan, saffron drink Pakistan, mango energy drink Pakistan, berry glow drink Pakistan, acai drink Pakistan, coconut moringa drink Pakistan, dragon fruit hibiscus drink Pakistan, yuzu aloe drink Pakistan, bamboo silk drink Pakistan, pomegranate drink Pakistan, passionfruit drink Pakistan, best energy drink in Pakistan, healthy drink Pakistan, natural energy drink Pakistan, glow skin drink Pakistan, wellness drink Pakistan, hydration drink Pakistan, noorish gold base, rose hydrosol drink, saffron drink benefits, mastic drink Pakistan, amla drink Pakistan, sea buckthorn drink Pakistan, 150ml pouch drink Pakistan, premium drink Pakistan, luxury drink Pakistan, drink rituals Pakistan, glow ritual Pakistan, beauty from within Pakistan',
};

/* ═══════════════════════════════════════════════════════════
   URDU (اردو) — Full localization including all 49 features
   ═══════════════════════════════════════════════════════════ */

const ur = {
  ...en,
  tagline: 'نوریوا · اپنا نور پئیں',
  kicker: '12 رسومات · گلاب و زعفران · پاکستان کے لیے',
  heroSub:
    'بارہ گلو رسومات۔ ایک سنہری بیس۔ گلاب ہائیڈروسول، زعفران اور مسطکی ایک گہرے عنبری اکسیر میں مل کر آپ کی جلد کو اندر سے روشن بناتے ہیں۔ حلال کمپلائنٹ، پاکستان کے لیے بنایا گیا — اپنا نور دریافت کریں۔',

  'hero.cta.shop': '12 نوریش گولڈ رسومات دیکھیں',
  'hero.cta.ritual': 'میری گلو رسم تلاش کریں',
  'badge.sugar': 'زیرو گلایسیمک باڈی',
  'badge.collagen': '12% w/w بیس',
  'badge.halal': 'حلال کمپلائنٹ پوزیشننگ',
  'badge.pakistan': 'پاکستان کے لیے',
  'collection.title': '12 نوریش گولڈ گلو رسومات',
  'collection.sub':
    'کسی پاؤچ کو چھوئیں۔ ہر NOORIVA SKU ایک ہی پروڈکشن ریڈی NOORISH GOLD بیس شیئر کرتا ہے جو 12% w/w شامل کیا جاتا ہے۔',
  'product.addToBag': 'بیگ میں ڈالیں',
  'product.swipe': 'نوریش گولڈ رسم تلاش کریں',
  'ingredients.title': 'مکمل NOORISH GOLD انگریڈینٹ میٹرکس',
  'ingredients.sub':
    'حتمی فارمولا: لیکوڈ الیولوز/گلیسرین بیس، گلاب ہائیڈروسول، فلٹر شدہ کھجور شربت، کلیفائیڈ بوٹینیکلز، زعفران اور مسطکی گم۔',
  'trust.title': 'پروڈکشن ڈسپلن کے ساتھ بنایا گیا',
  'rituals.title': 'آپ کا دن، مائع نور میں',
  'rituals.sub': '12 لمحات، 12 ذائقے، ایک گولڈ آرکیٹیکچر۔',
  'ritual.try': 'یہ رسم آزمائیں',
  'society.title': 'NOORISH GOLD کلیکشن',
  'society.sub':
    'پاکستان کے لیے سنگل پاؤچ، تین پاؤچ، یا چھ پاؤچ۔ ہر پاؤچ حتمی NOORISH GOLD سائنچر بیس پر بنایا گیا ہے۔',
  'tier.addToBag': 'بیگ میں ڈالیں',
  'tier.mostLoved': 'سب سے پسندیدہ',
  'makers.title': 'ایک سائنچر بیس کے گرد بنا',
  'makers.sub':
    'NOORISH GOLD ذائقہ آرکیٹیکچر، اسٹیبلٹی، حلال سورسنگ اور پریمیم ریٹل پوزیشننگ کو 12 SKUs میں جوڑتا ہے۔',
  'playground.title': 'اپنے گلو کے ساتھ کھیلیں',
  'playground.sub': 'گیمز، کوئزز اور روزانہ رسومات سے اپنی NOORISH GOLD رسم تلاش کریں۔',
  'testimonials.title': 'گلو نوٹس',
  'testimonials.sub': 'NOORISH GOLD کلیکشن کے مختصر سینسری نوٹس۔',
  'faq.title': 'NOORISH GOLD سوالات',
  'faq.sub': 'مزید سوال؟ واٹس ایپ پر پوچھیں — 9am–11pm PKT۔',
  'faq.whatsapp': 'واٹس ایپ پر بات کریں',
  'footer.note':
    'NOORISH GOLD ایک فوڈ/بیوریج فارمولا اور سینسری آرکیٹیکچر ہے، طبی مشورہ نہیں۔ حمل، دودھ پلانے یا طبی حالت کی صورت میں ڈاکٹر سے مشورہ کریں۔',
  'bag.title': 'آپ کا بیگ',
  'bag.empty': 'آپ کا بیگ خالی ہے۔ ایک پاؤچ ڈالیں — آپ کا NOORISH GOLD نور انتظار کر رہا ہے۔',
  'bag.total': 'کل',
  'bag.checkout': 'چیک آؤٹ',
  'bag.whatsapp': 'واٹس ایپ پر چیک آؤٹ',
  'bag.codNote': 'ڈلیوری پر نقد · 5,000 روپے اوپر مفت شپنگ',
  'bag.freeDelivery': '5,000 روپے پر مٹح ڈلیوری',
  'bag.freeDeliveryUnlocked': 'مفت ڈلیوری فعال',
  'bag.remove': 'ہٹائیں',
  'checkout.successTitle': 'آپ کا NOORISH GOLD آرڈر تیار ہو رہا ہے',
  'checkout.successSub': 'ہمیں آپ کا آرڈر مل گیا ہے۔ واٹس ایپ تصدیق کے لیے فون قریب رکھیں۔',

  'noorix.title': 'نوریوا اے آئی',
  'noorix.sub': 'NOORISH GOLD رسومات، ہائیڈریشن، روٹین اور ذائقے میں آپ کی گلو رہنما۔',
  'noorix.ask': 'آج آپ کون سی گلو رسم چاہتے ہیں؟',
  'noorix.greeting': 'NOORIVA AI آپ کو گلو کیسے دے سکتی ہے؟',
  'noorix.close': 'NOORIVA AI بند کریں',
  'noorix.back': 'تمام اے آئی فیچرز',
  'noorix.inputPlaceholder': 'مجھے مزید بتائیں...',
  'noorix.send': 'بھیجیں',
  'noorix.thinking': 'سوچ رہا ہوں...',

  // ═══ MERGED FEATURES (6) — Urdu ═══
  'noorix.feature.skinIntelligence': 'اسکن انٹیلیجنس',
  'noorix.feature.skinIntelligenceDesc': 'تشخیص، درجہ بندی اور اسکن ایج کی پیشگوئی کے لیے تصویر اپ لوڈ کریں۔',
  'noorix.feature.ingredientIntelligence': 'انگریڈینٹ انٹیلیجنس',
  'noorix.feature.ingredientIntelligenceDesc': 'لیبل ڈی کوڈ کریں، حلال اسٹیٹس چیک کریں اور تنازعات کی نشاندہی کریں۔',
  'noorix.feature.glowJournal': 'گلو جرنل',
  'noorix.feature.glowJournalDesc': 'موڈ اور پیٹرنز ٹریک کریں تاکہ فلیر اپ ٹرگرز کی نشاندہی ہو۔',
  'noorix.feature.treatmentRoutine': 'رچول آرکیٹیکٹ',
  'noorix.feature.treatmentRoutineDesc': 'ذاتی نوعیت کے AM/PM علاج کے منصوبے اور روٹین بنائیں۔',
  'noorix.feature.progressStreaks': 'پریگریس و سٹریکس',
  'noorix.feature.progressStreaksDesc': 'بعد/قبل کا بصری ٹریکنگ اور گیمیفائیڈ سٹریکس۔',
  'noorix.feature.wellnessToolkit': 'ویلنس ٹول کٹ',
  'noorix.feature.wellnessToolkitDesc': 'کیلنڈر، PDF رپورٹس، سرچ اور کوئیک ایکشنز۔',

  // ═══ KEPT FEATURES (12) — Urdu ═══
  'noorix.feature.mealPhoto': 'میل سکین',
  'noorix.feature.mealPhotoDesc': 'تصویر سے نیوٹریشن کا تجزیہ۔',
  'noorix.feature.supplement': 'اسٹیک بلڈر',
  'noorix.feature.supplementDesc': 'ذاتی نوعیت کی سپلیمنٹ ایڈوائس۔',
  'noorix.feature.sleep': 'اسلیپ کوچ',
  'noorix.feature.sleepDesc': 'اپنی نیند کا تجزیہ اور بہتری۔',
  'noorix.feature.fitness': 'فٹنس اسکن',
  'noorix.feature.fitnessDesc': 'ورزش کا آپ کی اسکن پر اثر۔',
  'noorix.feature.hydration': 'ہائیڈریشن',
  'noorix.feature.hydrationDesc': 'پانی کی مقدار اور اسکن گلو کا تعلق۔',
  'noorix.feature.symptom': 'باڈی ٹریج',
  'noorix.feature.symptomDesc': 'ٹریج کے لیے کوئی بھی علامت بیان کریں۔',
  'noorix.feature.hair': 'اسکیلپ اینالیٹکس',
  'noorix.feature.hairDesc': 'اسکیلپ اور بالوں کی صحت کا تجزیہ۔',
  'noorix.feature.sun': 'یو وی شیلڈ',
  'noorix.feature.sunDesc': 'سنسafety اور SPF ایڈوائس۔',
  'noorix.feature.freeChat': 'نورکس سے بات کریں',
  'noorix.feature.freeChatDesc': 'اپنے گلو سفر کے بارے میں آزاد گفتگو۔',
  'noorix.feature.voiceOutput': 'وائس آؤٹ پٹ',
  'noorix.feature.voiceOutputDesc': 'نورکس ہاتھوں سے بغیر جوابات بولتا ہے۔',
  'noorix.feature.medicalImage': 'میڈیکل امیجنگ',
  'noorix.feature.medicalImageDesc': 'ایڈوانسڈ میڈیکل امیج تجزیہ۔',
  'noorix.feature.healthRisk': 'رسک اسسمنٹ',
  'noorix.feature.healthRiskDesc': 'لائف اسٹائل رسک اسکورنگ اور ابتدائی تشخیص۔',

  // ═══ NEW FEATURES (11) — Urdu ═══
  'noorix.feature.glowScore': 'گلو اسکور',
  'noorix.feature.glowScoreDesc': 'تمام ان پٹس سے روزانہ 0-100 اسکور۔',
  'noorix.feature.glowRitualFinder': 'رچول فائنڈر',
  'noorix.feature.glowRitualFinderDesc': 'آپ کی بہترین NOORISH GOLD رسم سے میچ۔',
  'noorix.feature.weatherGlow': 'ودر گلو',
  'noorix.feature.weatherGlowDesc': 'لائیو پاکستان موسم UV اور آلودگی ایڈوائس۔',
  'noorix.feature.culturalAdapt': 'کلچرل اڈاپٹ',
  'noorix.feature.culturalAdaptDesc': 'رمضان، مون سون اور شادی کے سیزن کی ایڈجسٹمنٹ۔',
  'noorix.feature.beforeAfter': 'ویژول ڈف',
  'noorix.feature.beforeAfterDesc': 'اے آئی بصری موازنہ اور شیئر کی جانے والی پروگریس کارڈز۔',
  'noorix.feature.multilingualVoice': 'ملٹی لنگول وائس',
  'noorix.feature.multilingualVoiceDesc': 'قدرتی اردو، عربی اور انگریزی وائس سنیتھیسس۔',
  'noorix.feature.labReport': 'لیب رپورٹ تجزیہ',
  'noorix.feature.labReportDesc': 'بلڈ ٹیسٹس اپ لوڈ کریں ویلیو ایکسٹریکشن اور تجزیہ کے لیے۔',
  'noorix.feature.voiceConversation': 'وائس کنورسیشن',
  'noorix.feature.voiceConversationDesc': 'مکمل دو طرفہ ہاتھوں سے آزاد وائس گفتگو۔',
  'noorix.feature.liveIngredientResearch': 'لائیو ریسرچ',
  'noorix.feature.liveIngredientResearchDesc': 'تازہ ترین سیفٹی ڈیٹا کے لیے ریئل ٹائم گوگل سرچ۔',
  'noorix.feature.multiAngleVideo': 'ویڈیو سکین',
  'noorix.feature.multiAngleVideoDesc': 'بہتر درستگی کے لیے ملٹی اینگل ویڈیو تجزیہ۔',
  'noorix.feature.refillReminder': 'اسمارٹ ریفل',
  'noorix.feature.refillReminderDesc': 'یوزیج ٹریکنگ اور اسمارٹ نوریش گولڈ ری آرڈر الرٹس۔',
  'noorix.feature.moodJournal': 'موڈ جرنل',
  'noorix.feature.moodJournalDesc': 'فوری موڈ اندراج، جذباتی تجزیہ اور شکرگزاری کے محرکات۔',

  // ═══ BRAND NEW FEATURES (20) — Urdu ═══
  'noorix.feature.aiDietChart': 'اے آئی ڈائٹ چارٹ',
  'noorix.feature.aiDietChartDesc': 'ذاتی میکروز کے ساتھ خوبصورت بصری ڈائٹ چارٹس۔',
  'noorix.feature.workoutVisualizer': 'ورک آؤٹ ویژوالائزر',
  'noorix.feature.workoutVisualizerDesc': 'ڈایاگرام اور ٹائمرز کے ساتھ بصری ورک آؤٹ پلان کارڈز۔',
  'noorix.feature.drugInteractionChecker': 'ڈرگ انٹرایکشنز',
  'noorix.feature.drugInteractionCheckerDesc': 'ریئل ٹائم میڈیکیشن اور سپلیمنٹ انٹرایکشن چیکر۔',
  'noorix.feature.liveVoiceTranslator': 'وائس ٹرانسلیٹر',
  'noorix.feature.liveVoiceTranslatorDesc': 'ریئل ٹائم اردو ↔ انگریزی ↔ عربی وائس ترجمہ۔',
  'noorix.feature.geneticReportReader': 'جینیٹک ریڈر',
  'noorix.feature.geneticReportReaderDesc': 'ذاتی ویلینس انسیٹس کے لیے جینیٹک ٹیسٹ PDF اپ لوڈ کریں۔',
  'noorix.feature.hormoneCycleWellness': 'ہارمون سائیکل',
  'noorix.feature.hormoneCycleWellnessDesc': 'فیز بیسڈ اسکن، نیوٹریشن اور ورزش کی سفارشیں۔',
  'noorix.feature.yogaPostureCorrector': 'پوسچر اے آئی',
  'noorix.feature.yogaPostureCorrectorDesc': 'یوگا پوز اور پوسچر کے لیے ویڈیو تجزیہ۔',
  'noorix.feature.aiRecipeGenerator': 'ریسیپی اے آئی',
  'noorix.feature.aiRecipeGeneratorDesc': 'آپ کے اہداف اور الرجیز کے مبنی صحت مند پاکستانی رسیپی۔',
  'noorix.feature.sleepStoryGenerator': 'اسلیپ اسٹوریز',
  'noorix.feature.sleepStoryGeneratorDesc': 'اردو شاعری اور اینبینٹ ساؤنڈز کے ساتھ ذاتی بیڈ ٹائم کہانیاں۔',
  'noorix.feature.hydrationGamification': 'ہائیڈریشن گیم',
  'noorix.feature.hydrationGamificationDesc': 'بیجز اور چیلنجز کے ساتھ گیمیفائیڈ ہائیڈریشن ٹریکنگ۔',
  'noorix.feature.aiMakeupMatch': 'میک اپ میچ',
  'noorix.feature.aiMakeupMatchDesc': 'سیلفی پر مبنی فاؤنڈیشن شیڈ اور لپ اسٹک کلر میچنگ۔',
  'noorix.feature.wellnessReportPdf': 'ویلنس رپورٹ',
  'noorix.feature.wellnessReportPdfDesc': 'چارٹس اور ٹرینڈز کے ساتھ جامع ماہانہ ویلنس PDF۔',
  'noorix.feature.fastingRamadanTracker': 'رمضان ٹریکر',
  'noorix.feature.fastingRamadanTrackerDesc': 'ہائیڈریشن اور اسکن کے لیے رمضان موڈ کے ساتھ روزہ ٹریکر۔',
  'noorix.feature.mentalWellnessCompanion': 'مینٹل ویلنس',
  'noorix.feature.mentalWellnessCompanionDesc': 'موڈ ٹریکنگ، CBT مشقیں اور سانس کی تکنیکیں۔',
  'noorix.feature.allergyDetective': 'الرجی اے آئی',
  'noorix.feature.allergyDetectiveDesc': 'ریئل ٹائم گوگل سرچ الرٹس کے ساتھ الرجیز کراس رفرنس۔',
  'noorix.feature.moodMusicRecommender': 'موڈ میوزک',
  'noorix.feature.moodMusicRecommenderDesc': 'موڈ اور توانائی کی سطح پر مبنی میوزک سفارشیں۔',
  'noorix.feature.skincareRoutineCard': 'روٹین کارڈ',
  'noorix.feature.skincareRoutineCardDesc': 'انstagram اسٹوریز کے لیے خوبصورت بصری AM/PM روٹین کارڈز۔',
  'noorix.feature.recoveryScore': 'ریکوری اسکور',
  'noorix.feature.recoveryScoreDesc': 'تمام ویلنس فیکٹرز کو ملانے والا روزانہ 0-100 ریکوری اسکور۔',
  'noorix.feature.pregnancyWellness': 'حمل گائیڈ',
  'noorix.feature.pregnancyWellnessDesc': 'ٹرائمیسٹر مخصوص نیوٹریشن، اسکن اور ورزش گائیڈنس۔',

  'common.close': 'بند کریں',
  'order.whatsappPrefix': 'السلام علیکم NOORIVA! مجھے NOORISH GOLD آرڈر کرنا ہے:',
  'scene.home': 'ہوم',
  'scene.flavours': 'رسومات',
  'scene.inside': 'اندر',
  'scene.rituals': 'رسومات',
  'scene.society': 'کلیکشن',
  'scene.play': 'کھیل',
  'scene.voices': 'گلو نوٹس',
  'seo.homeTitle': 'NOORIVA — نوریش گولڈ انرجی و گلو ڈرنکس پاکستان',
  'seo.homeDescription':
    'NOORIVA کا NOORISH GOLD دریافت کریں: پروڈکشن ریڈی سائنچر ہیرو کمپلیکس جو ہر 150ml پاؤچ میں 12% w/w شامل کیا جاتا ہے۔ 12 پریفیومڈ گلو ڈرنکس اور انرجی رسومات۔',
  'seo.homeKeywords':
    'نوریش گولڈ، NOORIVA، ڈرنک یور گلو، انرجی ڈرنک پاکستان، گلو ڈرنک پاکستان، فریش ڈرنک پاکستان، حلال بیوٹی ڈرنک پاکستان، گلاب ڈرنک پاکستان، زعفران ڈرنک پاکستان',
};

/* ═══════════════════════════════════════════════════════════
   ARABIC (العربية) — Full localization including all 49 features
   ═══════════════════════════════════════════════════════════ */

const ar = {
  ...en,
  tagline: 'نوريفا · اشرب إشراقتك',
  kicker: '12 طقوس · ورد وزعفران · صُمم لباكستان',
  heroSub:
    'اثنا عشر طقس إشراق. قاعدة ذهبية واحدة. ماء الورد والزعفران والمستكة تتحد في إكسير كهرماني عميق يمنح بشرتك إشراقة من الداخل. متوافق مع الحلال، صُمم لباكستان — اكتشف نورك.',

  'hero.cta.shop': 'تسوّق 12 طقسًا من نوريش غولد',
  'hero.cta.ritual': 'اعثر على طقسي',
  'badge.sugar': 'جسم خالٍ من ارتفاع السكر',
  'badge.collagen': '12% w/w أساسي',
  'badge.halal': 'تموضع متوافق مع الحلال',
  'badge.pakistan': 'مصمم لباكستان',
  'collection.title': '12 طقس إشراق من نوريش غولد',
  'collection.sub':
    'المس كيسًا لاستكشاف كل طقس. كل SKU من NOORIVA يشترك في قاعدة نوريش غولد نفسها بنسبة 12% w/w.',
  'product.addToBag': 'أضف إلى الحقيبة',
  'product.swipe': 'المس طقسًا لاستكشافه',
  'ingredients.title': 'المصفوفة الكاملة لمكوّنات نوريش غولد',
  'ingredients.sub':
    'التركيبة النهائية: قاعدة ألولوز/جليسرين، هيدروسول ورد، شراب تمر مفلتر، مستخلصات نباتية مصفاة، زعفران، وماستيك قابل للتشتت.',
  'trust.title': 'صُنع بانضباط إنتاجي',
  'rituals.title': 'يومك، في ضوء سائل',
  'rituals.sub': '12 لحظة، 12 نكهة، بنية ذهبية واحدة.',
  'ritual.try': 'جرّب هذا الطقس',
  'society.title': 'مجموعة نوريش غولد',
  'society.sub':
    'كيس مفرد، ثلاثي، أو سداسي لباكستان. كل كيس مبني على قاعدة نوريش غولد النهائية.',
  'tier.addToBag': 'أضف إلى الحقيبة',
  'tier.mostLoved': 'الأكثر حبًا',
  'makers.title': 'مبني حول قاعدة أساسية واحدة',
  'makers.sub':
    'تجمع نوريش غولد بين البنية العطرية، الثبات، التوريد المتوافق مع الحلال، والتموضع التسويقي الفاخر عبر 12 منتجًا.',
  'playground.title': 'العب مع إشراقتك',
  'playground.sub': 'ألعاب واختبارات وطقوس يومية لمساعدتك على اختيار نوريش غولد المناسب.',
  'testimonials.title': 'ملاحظات الإشراق',
  'testimonials.sub': 'ملاحظات حسية قصيرة من مجموعة نوريش غولد.',
  'faq.title': 'أسئلة نوريش غولد',
  'faq.sub': 'لا تزال لديك أسئلة؟ اسأل عبر واتساب — نرد خلال ساعة، 9am–11pm PKT.',
  'faq.whatsapp': 'دردش عبر واتساب',
  'footer.note':
    'نوريش غولد تركيبة غذائية/مشروب وبنية حسية، وليست نصيحة طبية. إذا كنتِ حاملًا أو مرضعًا أو تعانين من حالة صحية، استشيري طبيبك.',
  'bag.title': 'حقيبتك',
  'bag.empty': 'حقيبتك فارغة. أضف كيسًا — إشراق نوريش غولد بانتظارك.',
  'bag.total': 'المجموع',
  'bag.checkout': 'الدفع',
  'bag.whatsapp': 'الدفع عبر واتساب',
  'bag.codNote': 'الدفع نقدًا عند الاستلام · شحن مجاني فوق ₨5,000',
  'bag.freeDelivery': 'شحن مجاني عند ₨5,000',
  'bag.freeDeliveryUnlocked': 'تم تفعيل الشحن المجاني',
  'bag.remove': 'إزالة',
  'checkout.successTitle': 'طلبك من نوريش غولد قيد التحضير',
  'checkout.successSub': 'استلمنا طلبك. أبقي هاتفك قريبًا لتأكيد واتساب.',

  'noorix.title': 'NOORIVA AI',
  'noorix.sub': 'مساعدك للإشراق، الترطيب، الروتين، واختيار طقس نوريش غولد.',
  'noorix.ask': 'ما طقس الإشراق الذي تريده اليوم؟',
  'noorix.greeting': 'كيف يمكن لـ NOORIVA AI مساعدتك على الإشراق اليوم؟',
  'noorix.close': 'إغلاق NOORIVA AI',
  'noorix.back': 'جميع ميزات الذكاء الاصطناعي',
  'noorix.inputPlaceholder': 'أخبرني المزيد...',
  'noorix.send': 'إرسال',
  'noorix.thinking': 'أفكر...',

  // ═══ MERGED FEATURES (6) — Arabic ═══
  'noorix.feature.skinIntelligence': 'ذكاء البشرة',
  'noorix.feature.skinIntelligenceDesc': 'ارفع صورة للفرز والتصنيف والتنبؤ بعمر البشرة.',
  'noorix.feature.ingredientIntelligence': 'ذكاء المكونات',
  'noorix.feature.ingredientIntelligenceDesc': 'فك شفرة الملصقات، تحقق من الحلال، واكشف التعارضات.',
  'noorix.feature.glowJournal': 'يوميات الإشراق',
  'noorix.feature.glowJournalDesc': 'تتبع المزاج والأنماط لتحديد محفزات الهيجان.',
  'noorix.feature.treatmentRoutine': 'مهندس الطقوس',
  'noorix.feature.treatmentRoutineDesc': 'ابن خطط علاج شخصية صباحية/مسائية وروتين.',
  'noorix.feature.progressStreaks': 'التقدم والسلاسل',
  'noorix.feature.progressStreaksDesc': 'تتبع بصري قبل/بعد وسلاسل محفزة.',
  'noorix.feature.wellnessToolkit': 'صندوق العافية',
  'noorix.feature.wellnessToolkitDesc': 'تقويم، تقارير PDF، بحث، وإجراءات سريعة.',

  // ═══ KEPT FEATURES (12) — Arabic ═══
  'noorix.feature.mealPhoto': 'مسح الوجبة',
  'noorix.feature.mealPhotoDesc': 'تحليل التغذية من صورة.',
  'noorix.feature.supplement': 'باني المكملات',
  'noorix.feature.supplementDesc': 'نصائح مكملات شخصية.',
  'noorix.feature.sleep': 'مدرب النوم',
  'noorix.feature.sleepDesc': 'حلل وحسن نومك.',
  'noorix.feature.fitness': 'بشرة اللياقة',
  'noorix.feature.fitnessDesc': 'تأثير التمرين على بشرتك.',
  'noorix.feature.hydration': 'الترطيب',
  'noorix.feature.hydrationDesc': 'ارتباط شرب الماء وإشراقة البشرة.',
  'noorix.feature.symptom': 'فرز الجسم',
  'noorix.feature.symptomDesc': 'صف أي عرض للفرز.',
  'noorix.feature.hair': 'تحليل الفروة',
  'noorix.feature.hairDesc': 'حلل صحة الفروة والشعر.',
  'noorix.feature.sun': 'درع UV',
  'noorix.feature.sunDesc': 'نصائح السلامة الشمسية وSPF.',
  'noorix.feature.freeChat': 'تحدث مع نوركس',
  'noorix.feature.freeChatDesc': 'محادثة حرة حول رحلة إشراقك.',
  'noorix.feature.voiceOutput': 'إخراج صوتي',
  'noorix.feature.voiceOutputDesc': 'نوركس ينطق الردود دون استخدام اليدين.',
  'noorix.feature.medicalImage': 'التصوير الطبي',
  'noorix.feature.medicalImageDesc': 'تحليل متقدم للصور الطبية.',
  'noorix.feature.healthRisk': 'تقييم المخاطر',
  'noorix.feature.healthRiskDesc': 'تقييم مخاطر نمط الحياة والكشف المبكر.',

  // ═══ NEW FEATURES (11) — Arabic ═══
  'noorix.feature.glowScore': 'درجة الإشراق',
  'noorix.feature.glowScoreDesc': 'درجة يومية 0-100 محسوبة من جميع المدخلات.',
  'noorix.feature.glowRitualFinder': 'باحث الطقوس',
  'noorix.feature.glowRitualFinderDesc': 'طابق طقس نوريش غولد المثالي لك.',
  'noorix.feature.weatherGlow': 'إشراق الطقس',
  'noorix.feature.weatherGlowDesc': 'نصائح حية لطقس باكستان UV والتلوث.',
  'noorix.feature.culturalAdapt': 'تكييف ثقافي',
  'noorix.feature.culturalAdaptDesc': 'تعديلات رمضان والموسم الزفاف.',
  'noorix.feature.beforeAfter': 'فرق بصري',
  'noorix.feature.beforeAfterDesc': 'مقارنة بصرية بالذكاء الاصطناعي وبطاقات تقدم قابلة للمشاركة.',
  'noorix.feature.multilingualVoice': 'صوت متعدد اللغات',
  'noorix.feature.multilingualVoiceDesc': 'تركيب صوتي طبيعي بالأردية والعربية والإنجليزية.',
  'noorix.feature.labReport': 'تحليل تقارير المختبر',
  'noorix.feature.labReportDesc': 'ارفع تحاليل الدم لاستخراج القيم وتحليلها.',
  'noorix.feature.voiceConversation': 'محادثة صوتية',
  'noorix.feature.voiceConversationDesc': 'محادثة صوتية كاملة ثنائية الاتجاه دون استخدام اليدين.',
  'noorix.feature.liveIngredientResearch': 'بحث مباشر',
  'noorix.feature.liveIngredientResearchDesc': 'بحث جوجل مباشر لأحدث بيانات السلامة.',
  'noorix.feature.multiAngleVideo': 'مسح فيديو',
  'noorix.feature.multiAngleVideoDesc': 'تحليل فيديو متعدد الزوايا لدقة أفضل.',
  'noorix.feature.refillReminder': 'تذكير ذكي',
  'noorix.feature.refillReminderDesc': 'تتبع الاستخدام وتنبيهات إعادة طلب نوريش غولد.',
  'noorix.feature.moodJournal': 'يوميات المزاج',
  'noorix.feature.moodJournalDesc': 'تسجيل سريع للمزاج وتحليل المشاعر مع مطالبات الامتنان.',

  // ═══ BRAND NEW FEATURES (20) — Arabic ═══
  'noorix.feature.aiDietChart': 'مخطط غذائي بالذكاء',
  'noorix.feature.aiDietChartDesc': 'مخططات غذائية بصرية جميلة مع وحدات شخصية.',
  'noorix.feature.workoutVisualizer': 'مصور التمارين',
  'noorix.feature.workoutVisualizerDesc': 'بطاقات خطة تمارين بصرية مع رسوم ومؤقتات.',
  'noorix.feature.drugInteractionChecker': 'تفاعلات الأدوية',
  'noorix.feature.drugInteractionCheckerDesc': 'فاحص تفاعل الأدوية والمكملات مباشر.',
  'noorix.feature.liveVoiceTranslator': 'مترجم صوتي',
  'noorix.feature.liveVoiceTranslatorDesc': 'ترجمة صوتية مباشرة أردية ↔ إنجليزية ↔ عربية.',
  'noorix.feature.geneticReportReader': 'قارئ جيني',
  'noorix.feature.geneticReportReaderDesc': 'ارفع PDF اختبار جيني لرؤى عافية شخصية.',
  'noorix.feature.hormoneCycleWellness': 'دورة الهرمونات',
  'noorix.feature.hormoneCycleWellnessDesc': 'توصيات العناية بالبشرة والتغذية والتمارين حسب الطور.',
  'noorix.feature.yogaPostureCorrector': 'تصحيح الوضع بالذكاء',
  'noorix.feature.yogaPostureCorrectorDesc': 'تحليل فيديو لوضعيات اليوغا وتصحيح الوضع.',
  'noorix.feature.aiRecipeGenerator': 'وصفات بالذكاء',
  'noorix.feature.aiRecipeGeneratorDesc': 'وصفات باكستانية صحية حسب أهدافك وحساسياتك.',
  'noorix.feature.sleepStoryGenerator': 'قصص النوم',
  'noorix.feature.sleepStoryGeneratorDesc': 'قصص مساء شخصية مع شعر أردوي وأصوات محيطة.',
  'noorix.feature.hydrationGamification': 'لعبة الترطيب',
  'noorix.feature.hydrationGamificationDesc': 'تتبع ترطيب محفز بأوسمة وتحديات.',
  'noorix.feature.aiMakeupMatch': 'مطابق المكياج',
  'noorix.feature.aiMakeupMatchDesc': 'مطابقة درجة كريم الأساس ولون الشفاه من سيلفي.',
  'noorix.feature.wellnessReportPdf': 'تقرير العافية',
  'noorix.feature.wellnessReportPdfDesc': 'PDF عافية شهري شامل مع رسوم واتجاهات.',
  'noorix.feature.fastingRamadanTracker': 'متتبع رمضان',
  'noorix.feature.fastingRamadanTrackerDesc': 'متتبع صيام مع وضع رمضان للترطيب والعناية بالبشرة.',
  'noorix.feature.mentalWellnessCompanion': 'رفيق العافية النفسية',
  'noorix.feature.mentalWellnessCompanionDesc': 'تتبع المزاج، تمارين CBT، وتقنيات التنفس.',
  'noorix.feature.allergyDetective': 'محقق الحساسية',
  'noorix.feature.allergyDetectiveDesc': 'إسناد حساسياتك مع تنبيهات بحث جوجل مباشر.',
  'noorix.feature.moodMusicRecommender': 'موسيقى المزاج',
  'noorix.feature.moodMusicRecommenderDesc': 'توصيات موسيقى حسب المزاج ومستوى الطاقة.',
  'noorix.feature.skincareRoutineCard': 'بطاقة الروتين',
  'noorix.feature.skincareRoutineCardDesc': 'بطاقات روتين صباحية/مسائية بصرية لقصص إنستغرام.',
  'noorix.feature.recoveryScore': 'درجة التعافي',
  'noorix.feature.recoveryScoreDesc': 'درجة تعافي يومية 0-100 تجمع كل عوامل العافية.',
  'noorix.feature.pregnancyWellness': 'دليل الحمل',
  'noorix.feature.pregnancyWellnessDesc': 'إرشاد تغذية وعناية بالبشرة وتمارين حسب الثلث.',

  'common.close': 'إغلاق',
  'order.whatsappPrefix': 'السلام عليكم NOORIVA! أريد طلب نوريش غولد:',
  'scene.home': 'الرئيسية',
  'scene.flavours': 'الطقوس',
  'scene.inside': 'المكونات',
  'scene.rituals': 'الطقوس',
  'scene.society': 'المجموعة',
  'scene.play': 'العب',
  'scene.voices': 'ملاحظات',
  'seo.homeTitle': 'NOORIVA — مشروبات نوريش غولد في باكستان',
  'seo.homeDescription':
    'اكتشف نوريش غولد من NOORIVA: قاعدة أساسية نهائية وجاهزة للإنتاج بنسبة 12% w/w لكل كيس 150 مل. 12 طقسًا فاخرًا للإشراق والطاقة والترطيب في باكستان.',
  'seo.homeKeywords':
    'نوريش غولد، NOORIVA، اشرب إشراقتك، مشروب طاقة باكستان، مشروب إشراق باكستان، مشروب طازج باكستان، مشروب حلال باكستان، مشروب ورد باكستان، مشروب زعفران باكستان',
};

/* ═══════════════════════════════════════════════════════════
   EXPORTS + ADVANCED UTILITIES
   ═══════════════════════════════════════════════════════════ */

export const translations = Object.freeze({
  en: Object.freeze(en),
  ur: Object.freeze(ur),
  ar: Object.freeze(ar),
});

/**
 * Resolve a translation key for a given language.
 * Falls back to English, then returns the key itself while warning in development.
 * Supports named interpolation: translate('en', 'welcome', { name: 'Maha' })
 */
export function translate(language, key, params) {
  let value = translations[language]?.[key];

  if (value === undefined) {
    value = translations.en[key];
  }

  if (value === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing translation key: "${key}"`);
    }
    return key;
  }

  if (typeof value === 'string' && params && typeof params === 'object') {
    return value.replace(/\{(\w+)\}/g, (match, name) => {
      const replacement = params[name];
      return replacement !== undefined && replacement !== null
        ? String(replacement)
        : match;
    });
  }

  return value;
}

/**
 * Hook that returns a memoized translation function bound to the active language.
 */
export function useT() {
  const language = useStore((state) => state.language);
  return useCallback(
    function t(key, params) {
      return translate(language, key, params);
    },
    [language]
  );
}

/**
 * Hook that returns a memoized localizer for objects that contain
 * per-language variants, e.g. { en: 'Glow', ur: 'نور' }.
 */
export function useLocalized() {
  const language = useStore((state) => state.language);
  return useCallback(
    function localize(value, fallback) {
      if (value === null || value === undefined) {
        return fallback ?? '';
      }

      if (typeof value === 'string') {
        return value;
      }

      if (typeof value === 'object') {
        return value[language] ?? value.en ?? fallback ?? '';
      }

      return fallback ?? '';
    },
    [language]
  );
}

/**
 * Returns the current language code.
 */
export function useLanguage() {
  return useStore((state) => state.language);
}

/**
 * Returns language metadata safely for any known or unknown code.
 */
export function getLanguageMeta(code) {
  return languageMeta[code] ?? languageMeta[DEFAULT_LANGUAGE];
}

/**
 * Returns the text direction (`ltr` or `rtl`) for a language code.
 */
export function getDirection(code) {
  return getLanguageMeta(code).dir;
}

/**
 * Light pluralization helper built on Intl.PluralRules.
 * Accepts forms keyed by category: one, two, few, many, other.
 */
export function pluralize(language, count, forms) {
  const safeLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  const rules = new Intl.PluralRules(safeLanguage);
  const category = rules.select(Math.abs(count));
  return forms[category] ?? forms.other ?? String(count);
}

/**
 * Formats PKR amounts using locale-aware grouping.
 */
export function formatCurrency(amount, language = DEFAULT_LANGUAGE) {
  const locale = getLanguageMeta(language).locale;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(amount);
}

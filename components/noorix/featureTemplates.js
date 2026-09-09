export const FEATURE_TEMPLATES = {
  "skinIntelligence": [
    {
      "id": "acne_triage",
      "title": "Acne & Inflamed Blemishes",
      "badge": "CLINICAL DERM",
      "prompt": "Please analyze my active breakout. Triage inflammatory severity, identify possible fungal vs bacterial causes, and outline a soothing barrier recovery protocol.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a clear close-up photo or video in natural light.",
      "tags": [
        "Acne",
        "Redness",
        "Pore Congestion"
      ]
    },
    {
      "id": "dark_spots",
      "title": "Dark Spots & Pigmentation",
      "badge": "MELANIN SCAN",
      "prompt": "Analyze my facial hyperpigmentation and post-acne marks. Recommend targeted brightening actives safe for my skin tone.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a well-lit photo of your cheeks or forehead.",
      "tags": [
        "Pigmentation",
        "Sun Spots",
        "Melasma"
      ]
    },
    {
      "id": "skin_age",
      "title": "Skin Age & Collagen Audit",
      "badge": "BIO-AGE",
      "prompt": "Predict biological skin age and evaluate epidermal elasticity, fine lines, and hydration barrier.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a front-facing selfie without makeup.",
      "tags": [
        "Skin Age",
        "Collagen",
        "Firmness"
      ]
    }
  ],
  "ingredientIntelligence": [
    {
      "id": "label_ocr",
      "title": "Full Bottle Label OCR Decode",
      "badge": "LAB OCR",
      "prompt": "Scan this product ingredient label. Decode every active and filler, calculate comedogenic rating, and flag potential allergens.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Photograph the back label showing the full INCI ingredients.",
      "tags": [
        "INCI Scan",
        "Safety Verdict",
        "Allergens"
      ]
    },
    {
      "id": "halal_verify",
      "title": "Halal & Pure Organic Audit",
      "badge": "HALAL AUDIT",
      "prompt": "Verify if this product formulation is 100% halal, free of animal-derived gelatin or tallow, and non-toxic.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a photo of the product ingredients.",
      "tags": [
        "Halal Check",
        "Zero Animal Deriv",
        "Pure Botanicals"
      ]
    }
  ],
  "mealPhoto": [
    {
      "id": "plate_macros",
      "title": "Plate Macro & Calorie Scan",
      "badge": "NUTRITION VISION",
      "prompt": "Analyze this meal plate. Estimate total calories, protein grams, clean complex carbs, healthy fats, and fiber ratio.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Take an overhead photo of your plate or bowl.",
      "tags": [
        "Calories",
        "Protein",
        "Carbs",
        "Fats"
      ]
    },
    {
      "id": "acne_safe_food",
      "title": "Acne-Trigger & Glycemic Check",
      "badge": "SKIN FOOD AUDIT",
      "prompt": "Evaluate this meal for skin-triggering ingredients: high glycemic index, dairy whey, inflammatory seed oils, and AGEs.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a photo of your meal or snack.",
      "tags": [
        "Glycemic Index",
        "Dairy Free",
        "Anti-Inflammatory"
      ]
    }
  ],
  "stressCortisol": [
    {
      "id": "afternoon_dip",
      "title": "Afternoon Energy & Brain Fog Dip",
      "badge": "ADRENAL RESCUE",
      "prompt": "I am experiencing a severe 3 PM energy crash. Help me stabilize cortisol without caffeine and recommend a fast botanical revival ritual.",
      "mediaType": "none",
      "tags": [
        "Energy Dip",
        "Brain Fog",
        "Botanical Pick-Me-Up"
      ]
    },
    {
      "id": "cortisol_face",
      "title": "Cortisol Face Puffiness Protocol",
      "badge": "LYMPHATIC DETOX",
      "prompt": "Stress is causing water retention and puffiness around my jaw and eyes. Give me a lymphatic drainage routine.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a morning selfie to assess fluid retention.",
      "tags": [
        "Puffiness",
        "Lymphatic",
        "Water Retention"
      ]
    }
  ],
  "smoothMenopause": [
    {
      "id": "hot_flash_cooldown",
      "title": "Hot Flash Emergency Cooldown",
      "badge": "VASOMOTOR",
      "prompt": "I am having sudden hot flashes and skin heat. Recommend immediate cooling acupressure points and botanical drinks.",
      "mediaType": "none",
      "tags": [
        "Hot Flash",
        "Cooling Acupressure",
        "Temperature Drop"
      ]
    },
    {
      "id": "estrogen_skin_fix",
      "title": "Perimenopause Dryness & Collagen Fix",
      "badge": "ENDOCRINE SKIN",
      "prompt": "My skin has suddenly become dry and thin. Explain how fluctuating estrogen impacts ceramides and suggest a barrier regimen.",
      "mediaType": "none",
      "tags": [
        "Ceramides",
        "Collagen Loss",
        "Hormonal Dryness"
      ]
    }
  ],
  "hair": [
    {
      "id": "scalp_density",
      "title": "Scalp Parting & Density Scan",
      "badge": "TRICHOLOGY VISION",
      "prompt": "Analyze my hair parting and density. Identify whether shedding looks diffuse, hormonal, or stress-related.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a clear top-down photo of your scalp parting.",
      "tags": [
        "Hair Loss",
        "Density Scan",
        "Follicle Health"
      ]
    },
    {
      "id": "flake_triage",
      "title": "Dandruff vs Dry Scalp Triage",
      "badge": "SCALP MICROBIOME",
      "prompt": "Differentiate whether my scalp flakes are fungal seb-derm or dry dehydrated scalp, and recommend clarifying botanical rinses.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a close-up photo of the scalp.",
      "tags": [
        "Dandruff",
        "Dry Scalp",
        "Seb-Derm"
      ]
    }
  ],
  "supplement": [
    {
      "id": "radiance_stack",
      "title": "Morning Glow & Radiance Stack",
      "badge": "BIO-ACTIVE STACK",
      "prompt": "Design my morning antioxidant stack: glutathione, astaxanthin, marine collagen, and liposomal vitamin C with dosages.",
      "mediaType": "none",
      "tags": [
        "Glutathione",
        "Astaxanthin",
        "Marine Collagen"
      ]
    }
  ],
  "sleep": [
    {
      "id": "circadian_reset",
      "title": "Circadian Bedtime Protocol",
      "badge": "DELTA-WAVE SLEEP",
      "prompt": "I take over 40 minutes to fall asleep. Calibrate my light exposure, digital sunset, and create a 30-minute wind-down ritual.",
      "mediaType": "none",
      "tags": [
        "Fall Asleep Fast",
        "Digital Sunset",
        "Morning Light"
      ]
    }
  ],
  "fitness": [
    {
      "id": "sweat_acne_defense",
      "title": "Post-Workout Sweat Acne Defense",
      "badge": "ATHLETIC DERM",
      "prompt": "I break out after intense workouts. Give me an immediate locker room routine to dissolve sweat sebum and stop bacteria.",
      "mediaType": "none",
      "tags": [
        "Gym Breakouts",
        "Hypochlorous Spray",
        "Pore Cleansing"
      ]
    }
  ],
  "symptom": [
    {
      "id": "rash_hives",
      "title": "Sudden Skin Rash, Hives & Stinging",
      "badge": "BODY TRIAGE",
      "prompt": "I developed sudden bumps or redness. Help me triage possible contact dermatitis, heat rash, or histamine hives.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Upload a photo of the rash or irritation area.",
      "tags": [
        "Hives",
        "Contact Dermatitis",
        "Urgency Triage"
      ]
    }
  ],
  "glowScore": [
    {
      "id": "full_radiance_audit",
      "title": "Daily 0-100 Radiance Index Audit",
      "badge": "INTELLIGENCE INDEX",
      "prompt": "Calculate my comprehensive Glow Score from my sleep, water, stress, and skincare adherence with personalized tips.",
      "mediaType": "none",
      "tags": [
        "0-100 Score",
        "Habit Tracking",
        "Radiance Trend"
      ]
    }
  ],
  "freeChat": [
    {
      "id": "general_consult",
      "title": "Ask Noorix Anything",
      "badge": "OPEN AI CHAT",
      "prompt": "I have a general wellness question about balancing my diet, improving skin radiance, and NOORIVA drinks.",
      "mediaType": "image_or_video",
      "mediaPrompt": "Optional: Upload any photo, product bottle, or meal you want to discuss.",
      "tags": [
        "Open Conversation",
        "Custom Routines",
        "Beauty Advice"
      ]
    }
  ],
  "brandAmbassador": [
    {
      "id": "brandAmbassador_t1",
      "title": "5K+ followers",
      "badge": "5K+ FOLLOWERS",
      "prompt": "Analyze my current profile for Be Our Ambassador. Love NOORIVA? Join the ambassador program. Share your glow, earn points, unlock rewards, and grow with the brand — open to creators with 5,000+ engaged followers.",
      "mediaType": "none",
      "tags": [
        "5K+ followers",
        "Points & rewards",
        "Creator perks"
      ]
    },
    {
      "id": "brandAmbassador_t2",
      "title": "Points & rewards",
      "badge": "POINTS & REWARDS",
      "prompt": "Generate a personalized clinical and botanical protocol for Be Our Ambassador, optimizing for 5K+ followers, Points & rewards, Creator perks, Early drops.",
      "mediaType": "none",
      "tags": [
        "Points & rewards",
        "Creator perks",
        "Early drops"
      ]
    }
  ],
  "noorivaClub": [
    {
      "id": "noorivaClub_t1",
      "title": "Girls gang",
      "badge": "GIRLS GANG",
      "prompt": "Analyze my current profile for NOORIVA Club. The girls gang, unfiltered. Heart-to-heart discussions, women empowerment circles, Lady of the Day, Week & Month spotlights — your safe space to glow together.",
      "mediaType": "none",
      "tags": [
        "Girls gang",
        "Empowerment circles",
        "Lady of the Day"
      ]
    },
    {
      "id": "noorivaClub_t2",
      "title": "Empowerment circles",
      "badge": "EMPOWERMENT CIRC",
      "prompt": "Generate a personalized clinical and botanical protocol for NOORIVA Club, optimizing for Girls gang, Empowerment circles, Lady of the Day, Heart-to-heart.",
      "mediaType": "none",
      "tags": [
        "Empowerment circles",
        "Lady of the Day",
        "Heart-to-heart"
      ]
    }
  ],
  "apiHub": [
    {
      "id": "apiHub_t1",
      "title": "Live APIs",
      "badge": "LIVE APIS",
      "prompt": "Analyze my current profile for API Hub. Your live console of 20+ free APIs — nutrition, recipes, weather, prayer times, trivia, and more.",
      "mediaType": "none",
      "tags": [
        "Live APIs",
        "No keys",
        "Food & weather"
      ]
    },
    {
      "id": "apiHub_t2",
      "title": "No keys",
      "badge": "NO KEYS",
      "prompt": "Generate a personalized clinical and botanical protocol for API Hub, optimizing for Live APIs, No keys, Food & weather.",
      "mediaType": "none",
      "tags": [
        "No keys",
        "Food & weather"
      ]
    }
  ],
  "glowJournal": [
    {
      "id": "glowJournal_t1",
      "title": "Mood-skin correlation",
      "badge": "MOOD-SKIN CORREL",
      "prompt": "Analyze my current profile for Glow Journal. Daily mood check-ins and skin observations become powerful data. Noorix identifies patterns linking breakouts to stress, diet, sleep, and hormones — and tells you exactly what triggers your flare-ups.",
      "mediaType": "none",
      "tags": [
        "Mood-skin correlation",
        "Pattern detection",
        "Trigger identification"
      ]
    },
    {
      "id": "glowJournal_t2",
      "title": "Pattern detection",
      "badge": "PATTERN DETECTIO",
      "prompt": "Generate a personalized clinical and botanical protocol for Glow Journal, optimizing for Mood-skin correlation, Pattern detection, Trigger identification, Coping strategies.",
      "mediaType": "none",
      "tags": [
        "Pattern detection",
        "Trigger identification",
        "Coping strategies"
      ]
    }
  ],
  "treatmentRoutine": [
    {
      "id": "treatmentRoutine_t1",
      "title": "Personalized treatment",
      "badge": "PERSONALIZED TRE",
      "prompt": "Analyze my current profile for Ritual Architect. Share your skin goal and current products. Noorix architects a complete treatment plan with AM/PM rituals, step-by-step instructions, ingredient pairing rules, and a results timeline.",
      "mediaType": "none",
      "tags": [
        "Personalized treatment",
        "AM/PM ritual design",
        "Ingredient pairing"
      ]
    },
    {
      "id": "treatmentRoutine_t2",
      "title": "AM/PM ritual design",
      "badge": "AM/PM RITUAL DES",
      "prompt": "Generate a personalized clinical and botanical protocol for Ritual Architect, optimizing for Personalized treatment, AM/PM ritual design, Ingredient pairing, Results timeline.",
      "mediaType": "none",
      "tags": [
        "AM/PM ritual design",
        "Ingredient pairing",
        "Results timeline"
      ]
    }
  ],
  "progressStreaks": [
    {
      "id": "progressStreaks_t1",
      "title": "Before/after comparison",
      "badge": "BEFORE/AFTER COM",
      "prompt": "Analyze my current profile for Progress & Streaks. Upload before and after photos to visually track your skin transformation. Noorix analyzes improvements, tracks your daily glow streaks, and unlocks achievement badges for consistency.",
      "mediaType": "image_or_video",
      "tags": [
        "Before/after comparison",
        "Visual tracking",
        "Daily streaks"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "progressStreaks_t2",
      "title": "Visual tracking",
      "badge": "VISUAL TRACKING",
      "prompt": "Generate a personalized clinical and botanical protocol for Progress & Streaks, optimizing for Before/after comparison, Visual tracking, Daily streaks, Achievement badges.",
      "mediaType": "none",
      "tags": [
        "Visual tracking",
        "Daily streaks",
        "Achievement badges"
      ]
    }
  ],
  "wellnessToolkit": [
    {
      "id": "wellnessToolkit_t1",
      "title": "Monthly calendar",
      "badge": "MONTHLY CALENDAR",
      "prompt": "Analyze my current profile for Wellness Toolkit. Monthly calendar overview, PDF report generation, full-text conversation search, one-tap quick actions, and dark mode — everything you need to manage your glow journey in one place.",
      "mediaType": "none",
      "tags": [
        "Monthly calendar",
        "PDF reports",
        "Smart search"
      ]
    },
    {
      "id": "wellnessToolkit_t2",
      "title": "PDF reports",
      "badge": "PDF REPORTS",
      "prompt": "Generate a personalized clinical and botanical protocol for Wellness Toolkit, optimizing for Monthly calendar, PDF reports, Smart search, Quick actions, Dark mode.",
      "mediaType": "none",
      "tags": [
        "PDF reports",
        "Smart search",
        "Quick actions"
      ]
    }
  ],
  "hydration": [
    {
      "id": "hydration_t1",
      "title": "Tap counter",
      "badge": "TAP COUNTER",
      "prompt": "Analyze my current profile for Glow Hydration. Track your daily water intake with a simple tap counter. Noorix correlates hydration with skin elasticity, recommends water-rich foods, and builds a timed drinking schedule for maximum glow.",
      "mediaType": "none",
      "tags": [
        "Tap counter",
        "Skin elasticity link",
        "Drinking schedule"
      ]
    },
    {
      "id": "hydration_t2",
      "title": "Skin elasticity link",
      "badge": "SKIN ELASTICITY ",
      "prompt": "Generate a personalized clinical and botanical protocol for Glow Hydration, optimizing for Tap counter, Skin elasticity link, Drinking schedule.",
      "mediaType": "none",
      "tags": [
        "Skin elasticity link",
        "Drinking schedule"
      ]
    }
  ],
  "sun": [
    {
      "id": "sun_t1",
      "title": "UV risk assessment",
      "badge": "UV RISK ASSESSME",
      "prompt": "Analyze my current profile for UV Shield. Get real-time UV protection advice based on your skin tone, activity, and exposure level. Noorix recommends SPF strength, application timing, protective clothing, and after-sun recovery protocols.",
      "mediaType": "none",
      "tags": [
        "UV risk assessment",
        "SPF recommendation",
        "After-sun care"
      ]
    },
    {
      "id": "sun_t2",
      "title": "SPF recommendation",
      "badge": "SPF RECOMMENDATI",
      "prompt": "Generate a personalized clinical and botanical protocol for UV Shield, optimizing for UV risk assessment, SPF recommendation, After-sun care.",
      "mediaType": "none",
      "tags": [
        "SPF recommendation",
        "After-sun care"
      ]
    }
  ],
  "voiceOutput": [
    {
      "id": "voiceOutput_t1",
      "title": "Text-to-speech",
      "badge": "TEXT-TO-SPEECH",
      "prompt": "Analyze my current profile for Voice Output. Noorix speaks responses aloud. Listen to health advice, nutrition tips, and wellness coaching hands-free while you cook, exercise, or relax.",
      "mediaType": "none",
      "tags": [
        "Text-to-speech",
        "Hands-free listening",
        "Multi-language"
      ]
    },
    {
      "id": "voiceOutput_t2",
      "title": "Hands-free listening",
      "badge": "HANDS-FREE LISTE",
      "prompt": "Generate a personalized clinical and botanical protocol for Voice Output, optimizing for Text-to-speech, Hands-free listening, Multi-language.",
      "mediaType": "none",
      "tags": [
        "Hands-free listening",
        "Multi-language"
      ]
    }
  ],
  "medicalImage": [
    {
      "id": "medicalImage_t1",
      "title": "Medical-grade analysis",
      "badge": "MEDICAL-GRADE AN",
      "prompt": "Analyze my current profile for Medical Imaging. Advanced medical image analysis. Upload skin lesions, rashes, wounds, or any medical image for identification and triage guidance with clinical precision.",
      "mediaType": "image_or_video",
      "tags": [
        "Medical-grade analysis",
        "Condition identification",
        "Severity assessment"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "medicalImage_t2",
      "title": "Condition identification",
      "badge": "CONDITION IDENTI",
      "prompt": "Generate a personalized clinical and botanical protocol for Medical Imaging, optimizing for Medical-grade analysis, Condition identification, Severity assessment.",
      "mediaType": "none",
      "tags": [
        "Condition identification",
        "Severity assessment"
      ]
    }
  ],
  "healthRisk": [
    {
      "id": "healthRisk_t1",
      "title": "Risk scoring",
      "badge": "RISK SCORING",
      "prompt": "Analyze my current profile for Risk Assessment. Comprehensive health risk assessment based on your lifestyle, family history, and current symptoms. Identifies potential risks before they become problems.",
      "mediaType": "none",
      "tags": [
        "Risk scoring",
        "Prevention tips",
        "Early detection"
      ]
    },
    {
      "id": "healthRisk_t2",
      "title": "Prevention tips",
      "badge": "PREVENTION TIPS",
      "prompt": "Generate a personalized clinical and botanical protocol for Risk Assessment, optimizing for Risk scoring, Prevention tips, Early detection.",
      "mediaType": "none",
      "tags": [
        "Prevention tips",
        "Early detection"
      ]
    }
  ],
  "glowRitualFinder": [
    {
      "id": "glowRitualFinder_t1",
      "title": "3-question match",
      "badge": "3-QUESTION MATCH",
      "prompt": "Analyze my current profile for Ritual Finder. Answer 3 quick questions — no typing. Noorix matches you to your perfect NOORISH GOLD ritual based on your goals, taste, and lifestyle. Discover your glow match.",
      "mediaType": "none",
      "tags": [
        "3-question match",
        "Personality-based",
        "NOORISH GOLD pairing"
      ]
    },
    {
      "id": "glowRitualFinder_t2",
      "title": "Personality-based",
      "badge": "PERSONALITY-BASE",
      "prompt": "Generate a personalized clinical and botanical protocol for Ritual Finder, optimizing for 3-question match, Personality-based, NOORISH GOLD pairing, Taste profile.",
      "mediaType": "none",
      "tags": [
        "Personality-based",
        "NOORISH GOLD pairing",
        "Taste profile"
      ]
    }
  ],
  "weatherGlow": [
    {
      "id": "weatherGlow_t1",
      "title": "Live weather API",
      "badge": "LIVE WEATHER API",
      "prompt": "Analyze my current profile for Weather Glow. Real-time Pakistan weather data — UV index, humidity, pollution, and temperature — personalized to your city. Noorix gives daily skin advice based on actual conditions.",
      "mediaType": "none",
      "tags": [
        "Live weather API",
        "UV index advice",
        "Humidity impact"
      ]
    },
    {
      "id": "weatherGlow_t2",
      "title": "UV index advice",
      "badge": "UV INDEX ADVICE",
      "prompt": "Generate a personalized clinical and botanical protocol for Weather Glow, optimizing for Live weather API, UV index advice, Humidity impact, Pollution protection.",
      "mediaType": "none",
      "tags": [
        "UV index advice",
        "Humidity impact",
        "Pollution protection"
      ]
    }
  ],
  "culturalAdapt": [
    {
      "id": "culturalAdapt_t1",
      "title": "Ramadan guidance",
      "badge": "RAMADAN GUIDANCE",
      "prompt": "Analyze my current profile for Cultural Adapt. Ramadan fasting, monsoon humidity, wedding season stress, winter dryness — Noorix adjusts your glow routine for Pakistani cultural and seasonal contexts.",
      "mediaType": "none",
      "tags": [
        "Ramadan guidance",
        "Monsoon skincare",
        "Wedding season"
      ]
    },
    {
      "id": "culturalAdapt_t2",
      "title": "Monsoon skincare",
      "badge": "MONSOON SKINCARE",
      "prompt": "Generate a personalized clinical and botanical protocol for Cultural Adapt, optimizing for Ramadan guidance, Monsoon skincare, Wedding season, Seasonal adaptation.",
      "mediaType": "none",
      "tags": [
        "Monsoon skincare",
        "Wedding season",
        "Seasonal adaptation"
      ]
    }
  ],
  "beforeAfter": [
    {
      "id": "beforeAfter_t1",
      "title": "Visual comparison",
      "badge": "VISUAL COMPARISO",
      "prompt": "Analyze my current profile for Visual Diff. Upload two photos — Day 1 and today. Noorix analyzes the visual difference, generates a glow improvement chart, and creates a shareable before/after card.",
      "mediaType": "image_or_video",
      "tags": [
        "Visual comparison",
        "Improvement chart",
        "Shareable card"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "beforeAfter_t2",
      "title": "Improvement chart",
      "badge": "IMPROVEMENT CHAR",
      "prompt": "Generate a personalized clinical and botanical protocol for Visual Diff, optimizing for Visual comparison, Improvement chart, Shareable card, Progress metrics.",
      "mediaType": "none",
      "tags": [
        "Improvement chart",
        "Shareable card",
        "Progress metrics"
      ]
    }
  ],
  "multilingualVoice": [
    {
      "id": "multilingualVoice_t1",
      "title": "Urdu voice",
      "badge": "URDU VOICE",
      "prompt": "Analyze my current profile for Multilingual Voice. Noorix speaks to you in Urdu, Arabic, or English with a natural, beautiful voice. Every response can be heard aloud — perfect for hands-free wellness guidance.",
      "mediaType": "none",
      "tags": [
        "Urdu voice",
        "Arabic voice",
        "English voice"
      ]
    },
    {
      "id": "multilingualVoice_t2",
      "title": "Arabic voice",
      "badge": "ARABIC VOICE",
      "prompt": "Generate a personalized clinical and botanical protocol for Multilingual Voice, optimizing for Urdu voice, Arabic voice, English voice, Natural synthesis.",
      "mediaType": "none",
      "tags": [
        "Arabic voice",
        "English voice",
        "Natural synthesis"
      ]
    }
  ],
  "labReport": [
    {
      "id": "labReport_t1",
      "title": "PDF upload",
      "badge": "PDF UPLOAD",
      "prompt": "Analyze my current profile for Lab Report Analysis. Upload blood test or lab report as PDF or photo. Noorix extracts values, explains what they mean, and correlates results with your skin, hair, and overall glow.",
      "mediaType": "image_or_video",
      "tags": [
        "PDF upload",
        "Value extraction",
        "Health correlation"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "labReport_t2",
      "title": "Value extraction",
      "badge": "VALUE EXTRACTION",
      "prompt": "Generate a personalized clinical and botanical protocol for Lab Report Analysis, optimizing for PDF upload, Value extraction, Health correlation, Doctor-ready summary.",
      "mediaType": "none",
      "tags": [
        "Value extraction",
        "Health correlation",
        "Doctor-ready summary"
      ]
    }
  ],
  "voiceConversation": [
    {
      "id": "voiceConversation_t1",
      "title": "Voice input",
      "badge": "VOICE INPUT",
      "prompt": "Analyze my current profile for Voice Conversation. Full bidirectional voice chat. Speak to Noorix in Urdu, Arabic, or English — she speaks back. No typing at all. True hands-free glow guidance for cooking, driving, or exercising.",
      "mediaType": "none",
      "tags": [
        "Voice input",
        "Voice output",
        "Urdu/Arabic/English"
      ]
    },
    {
      "id": "voiceConversation_t2",
      "title": "Voice output",
      "badge": "VOICE OUTPUT",
      "prompt": "Generate a personalized clinical and botanical protocol for Voice Conversation, optimizing for Voice input, Voice output, Urdu/Arabic/English, Hands-free.",
      "mediaType": "none",
      "tags": [
        "Voice output",
        "Urdu/Arabic/English",
        "Hands-free"
      ]
    }
  ],
  "liveIngredientResearch": [
    {
      "id": "liveIngredientResearch_t1",
      "title": "Real-time search",
      "badge": "REAL-TIME SEARCH",
      "prompt": "Analyze my current profile for Live Ingredient Research. When analyzing ingredients, Noorix searches in real-time for the latest safety studies, product recalls, and research. Always up-to-date — never relying on outdated training data.",
      "mediaType": "image_or_video",
      "tags": [
        "Real-time search",
        "Safety recalls",
        "Latest research"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "liveIngredientResearch_t2",
      "title": "Safety recalls",
      "badge": "SAFETY RECALLS",
      "prompt": "Generate a personalized clinical and botanical protocol for Live Ingredient Research, optimizing for Real-time search, Safety recalls, Latest research, Verified sources.",
      "mediaType": "none",
      "tags": [
        "Safety recalls",
        "Latest research",
        "Verified sources"
      ]
    }
  ],
  "multiAngleVideo": [
    {
      "id": "multiAngleVideo_t1",
      "title": "Video upload",
      "badge": "VIDEO UPLOAD",
      "prompt": "Analyze my current profile for Multi-Angle Video. Upload a 5-10 second video instead of a single photo. Noorix analyzes multiple angles, lighting conditions, and expressions for far more accurate skin assessment.",
      "mediaType": "image_or_video",
      "tags": [
        "Video upload",
        "Multi-angle analysis",
        "Lighting assessment"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "multiAngleVideo_t2",
      "title": "Multi-angle analysis",
      "badge": "MULTI-ANGLE ANAL",
      "prompt": "Generate a personalized clinical and botanical protocol for Multi-Angle Video, optimizing for Video upload, Multi-angle analysis, Lighting assessment, Expression tracking.",
      "mediaType": "none",
      "tags": [
        "Multi-angle analysis",
        "Lighting assessment",
        "Expression tracking"
      ]
    }
  ],
  "refillReminder": [
    {
      "id": "refillReminder_t1",
      "title": "Usage tracking",
      "badge": "USAGE TRACKING",
      "prompt": "Analyze my current profile for Smart Refill. Noorix tracks your NOORISH GOLD usage patterns and sends smart refill reminders. Based on your actual consumption rate — never run out of your glow ritual.",
      "mediaType": "none",
      "tags": [
        "Usage tracking",
        "Smart timing",
        "Auto-reminder"
      ]
    },
    {
      "id": "refillReminder_t2",
      "title": "Smart timing",
      "badge": "SMART TIMING",
      "prompt": "Generate a personalized clinical and botanical protocol for Smart Refill, optimizing for Usage tracking, Smart timing, Auto-reminder, One-tap reorder.",
      "mediaType": "none",
      "tags": [
        "Smart timing",
        "Auto-reminder",
        "One-tap reorder"
      ]
    }
  ],
  "moodJournal": [
    {
      "id": "moodJournal_t1",
      "title": "Mood tracking",
      "badge": "MOOD TRACKING",
      "prompt": "Analyze my current profile for Mood Journal. Quick mood entry and sentiment analysis. Noorix tracks your emotional patterns, identifies triggers, and provides personalized encouragement.",
      "mediaType": "none",
      "tags": [
        "Mood tracking",
        "Sentiment analysis",
        "Trigger identification"
      ]
    },
    {
      "id": "moodJournal_t2",
      "title": "Sentiment analysis",
      "badge": "SENTIMENT ANALYS",
      "prompt": "Generate a personalized clinical and botanical protocol for Mood Journal, optimizing for Mood tracking, Sentiment analysis, Trigger identification, Gratitude prompts.",
      "mediaType": "none",
      "tags": [
        "Sentiment analysis",
        "Trigger identification",
        "Gratitude prompts"
      ]
    }
  ],
  "aiDietChart": [
    {
      "id": "aiDietChart_t1",
      "title": "Visual chart",
      "badge": "VISUAL CHART",
      "prompt": "Analyze my current profile for AI Diet Chart. Get a beautifully crafted visual diet chart as a downloadable image. Personalized macros, meal timing, and Pakistani cuisine options for maximum glow.",
      "mediaType": "none",
      "tags": [
        "Visual chart",
        "Personalized macros",
        "Pakistani cuisine"
      ]
    },
    {
      "id": "aiDietChart_t2",
      "title": "Personalized macros",
      "badge": "PERSONALIZED MAC",
      "prompt": "Generate a personalized clinical and botanical protocol for AI Diet Chart, optimizing for Visual chart, Personalized macros, Pakistani cuisine, Downloadable.",
      "mediaType": "none",
      "tags": [
        "Personalized macros",
        "Pakistani cuisine",
        "Downloadable"
      ]
    }
  ],
  "workoutVisualizer": [
    {
      "id": "workoutVisualizer_t1",
      "title": "Visual plan",
      "badge": "VISUAL PLAN",
      "prompt": "Analyze my current profile for Workout Visualizer. Creates visual workout plan cards with exercise diagrams, sets/reps, and rest timers. Perfect for sharing to Instagram.",
      "mediaType": "none",
      "tags": [
        "Visual plan",
        "Exercise diagrams",
        "Sets & reps"
      ]
    },
    {
      "id": "workoutVisualizer_t2",
      "title": "Exercise diagrams",
      "badge": "EXERCISE DIAGRAM",
      "prompt": "Generate a personalized clinical and botanical protocol for Workout Visualizer, optimizing for Visual plan, Exercise diagrams, Sets & reps, Shareable.",
      "mediaType": "none",
      "tags": [
        "Exercise diagrams",
        "Sets & reps",
        "Shareable"
      ]
    }
  ],
  "drugInteractionChecker": [
    {
      "id": "drugInteractionChecker_t1",
      "title": "Real-time data",
      "badge": "REAL-TIME DATA",
      "prompt": "Analyze my current profile for Drug Interaction. Real-time interaction checker between your medications and supplements. Uses Google Search for the latest medical databases.",
      "mediaType": "none",
      "tags": [
        "Real-time data",
        "Google Search",
        "Medication safety"
      ]
    },
    {
      "id": "drugInteractionChecker_t2",
      "title": "Google Search",
      "badge": "GOOGLE SEARCH",
      "prompt": "Generate a personalized clinical and botanical protocol for Drug Interaction, optimizing for Real-time data, Google Search, Medication safety, Supplement alerts.",
      "mediaType": "none",
      "tags": [
        "Google Search",
        "Medication safety",
        "Supplement alerts"
      ]
    }
  ],
  "liveVoiceTranslator": [
    {
      "id": "liveVoiceTranslator_t1",
      "title": "Real-time",
      "badge": "REAL-TIME",
      "prompt": "Analyze my current profile for Voice Translator. Real-time voice translation. Speak in Urdu, Noorix responds in English or vice versa. Perfect for multilingual Pakistani users.",
      "mediaType": "none",
      "tags": [
        "Real-time",
        "Urdu  English",
        "Voice input"
      ]
    },
    {
      "id": "liveVoiceTranslator_t2",
      "title": "Urdu  English",
      "badge": "URDU  ENGLISH",
      "prompt": "Generate a personalized clinical and botanical protocol for Voice Translator, optimizing for Real-time, Urdu  English, Voice input, Live translation.",
      "mediaType": "none",
      "tags": [
        "Urdu  English",
        "Voice input",
        "Live translation"
      ]
    }
  ],
  "geneticReportReader": [
    {
      "id": "geneticReportReader_t1",
      "title": "PDF upload",
      "badge": "PDF UPLOAD",
      "prompt": "Analyze my current profile for Genetic Reader. Upload your genetic test PDF (23andMe etc). Noorix analyzes genetic predispositions and creates personalized wellness recommendations.",
      "mediaType": "none",
      "tags": [
        "PDF upload",
        "Genetic analysis",
        "Predisposition check"
      ]
    },
    {
      "id": "geneticReportReader_t2",
      "title": "Genetic analysis",
      "badge": "GENETIC ANALYSIS",
      "prompt": "Generate a personalized clinical and botanical protocol for Genetic Reader, optimizing for PDF upload, Genetic analysis, Predisposition check, Personalized plan.",
      "mediaType": "none",
      "tags": [
        "Genetic analysis",
        "Predisposition check",
        "Personalized plan"
      ]
    }
  ],
  "hormoneCycleWellness": [
    {
      "id": "hormoneCycleWellness_t1",
      "title": "Cycle tracking",
      "badge": "CYCLE TRACKING",
      "prompt": "Analyze my current profile for Hormone Cycle. Female-specific feature. Tracks hormonal phases and adjusts skincare, nutrition, and exercise recommendations based on cycle stage.",
      "mediaType": "none",
      "tags": [
        "Cycle tracking",
        "Phase-based recs",
        "Skincare adjust"
      ]
    },
    {
      "id": "hormoneCycleWellness_t2",
      "title": "Phase-based recs",
      "badge": "PHASE-BASED RECS",
      "prompt": "Generate a personalized clinical and botanical protocol for Hormone Cycle, optimizing for Cycle tracking, Phase-based recs, Skincare adjust, Nutrition timing.",
      "mediaType": "none",
      "tags": [
        "Phase-based recs",
        "Skincare adjust",
        "Nutrition timing"
      ]
    }
  ],
  "yogaPostureCorrector": [
    {
      "id": "yogaPostureCorrector_t1",
      "title": "Video upload",
      "badge": "VIDEO UPLOAD",
      "prompt": "Analyze my current profile for Posture AI. Upload video of yoga pose or posture. Noorix analyzes alignment, identifies issues, and suggests corrections with visual guides.",
      "mediaType": "image_or_video",
      "tags": [
        "Video upload",
        "Alignment analysis",
        "Correction guides"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "yogaPostureCorrector_t2",
      "title": "Alignment analysis",
      "badge": "ALIGNMENT ANALYS",
      "prompt": "Generate a personalized clinical and botanical protocol for Posture AI, optimizing for Video upload, Alignment analysis, Correction guides, Real-time feedback.",
      "mediaType": "none",
      "tags": [
        "Alignment analysis",
        "Correction guides",
        "Real-time feedback"
      ]
    }
  ],
  "aiRecipeGenerator": [
    {
      "id": "aiRecipeGenerator_t1",
      "title": "Pakistani cuisine",
      "badge": "PAKISTANI CUISIN",
      "prompt": "Analyze my current profile for Recipe AI. Generates healthy Pakistani recipes based on your health goals, allergies, and available ingredients. Includes visual recipe cards.",
      "mediaType": "none",
      "tags": [
        "Pakistani cuisine",
        "Allergy-aware",
        "Visual cards"
      ]
    },
    {
      "id": "aiRecipeGenerator_t2",
      "title": "Allergy-aware",
      "badge": "ALLERGY-AWARE",
      "prompt": "Generate a personalized clinical and botanical protocol for Recipe AI, optimizing for Pakistani cuisine, Allergy-aware, Visual cards, Goal-based.",
      "mediaType": "none",
      "tags": [
        "Allergy-aware",
        "Visual cards",
        "Goal-based"
      ]
    }
  ],
  "sleepStoryGenerator": [
    {
      "id": "sleepStoryGenerator_t1",
      "title": "Personalized stories",
      "badge": "PERSONALIZED STO",
      "prompt": "Analyze my current profile for Sleep Stories. Generates personalized bedtime stories with Nooriva branding. Uses calming language, Urdu poetry, and ambient sound suggestions.",
      "mediaType": "none",
      "tags": [
        "Personalized stories",
        "Urdu poetry",
        "Calming language"
      ]
    },
    {
      "id": "sleepStoryGenerator_t2",
      "title": "Urdu poetry",
      "badge": "URDU POETRY",
      "prompt": "Generate a personalized clinical and botanical protocol for Sleep Stories, optimizing for Personalized stories, Urdu poetry, Calming language, Ambient sounds.",
      "mediaType": "none",
      "tags": [
        "Urdu poetry",
        "Calming language",
        "Ambient sounds"
      ]
    }
  ],
  "hydrationGamification": [
    {
      "id": "hydrationGamification_t1",
      "title": "Gamified",
      "badge": "GAMIFIED",
      "prompt": "Analyze my current profile for Hydration Game. Turns hydration tracking into a game. Daily challenges, streaks, badges, and social sharing. Visual progress cards.",
      "mediaType": "none",
      "tags": [
        "Gamified",
        "Daily challenges",
        "Badges"
      ]
    },
    {
      "id": "hydrationGamification_t2",
      "title": "Daily challenges",
      "badge": "DAILY CHALLENGES",
      "prompt": "Generate a personalized clinical and botanical protocol for Hydration Game, optimizing for Gamified, Daily challenges, Badges, Social sharing.",
      "mediaType": "none",
      "tags": [
        "Daily challenges",
        "Badges",
        "Social sharing"
      ]
    }
  ],
  "aiMakeupMatch": [
    {
      "id": "aiMakeupMatch_t1",
      "title": "Selfie upload",
      "badge": "SELFIE UPLOAD",
      "prompt": "Analyze my current profile for Makeup Match. Upload selfie. Noorix matches foundation shade, lipstick color, and blush to your exact skin tone using computer vision.",
      "mediaType": "image_or_video",
      "tags": [
        "Selfie upload",
        "Shade matching",
        "Color analysis"
      ],
      "mediaPrompt": "Upload a clear photo or screenshot in natural light."
    },
    {
      "id": "aiMakeupMatch_t2",
      "title": "Shade matching",
      "badge": "SHADE MATCHING",
      "prompt": "Generate a personalized clinical and botanical protocol for Makeup Match, optimizing for Selfie upload, Shade matching, Color analysis, Product recs.",
      "mediaType": "none",
      "tags": [
        "Shade matching",
        "Color analysis",
        "Product recs"
      ]
    }
  ],
  "wellnessReportPdf": [
    {
      "id": "wellnessReportPdf_t1",
      "title": "Monthly PDF",
      "badge": "MONTHLY PDF",
      "prompt": "Analyze my current profile for Wellness Report. Generates comprehensive monthly wellness reports (PDF) with charts, trends, recommendations, and Nooriva product suggestions.",
      "mediaType": "none",
      "tags": [
        "Monthly PDF",
        "Charts & trends",
        "Recommendations"
      ]
    },
    {
      "id": "wellnessReportPdf_t2",
      "title": "Charts & trends",
      "badge": "CHARTS & TRENDS",
      "prompt": "Generate a personalized clinical and botanical protocol for Wellness Report, optimizing for Monthly PDF, Charts & trends, Recommendations, Product suggestions.",
      "mediaType": "none",
      "tags": [
        "Charts & trends",
        "Recommendations",
        "Product suggestions"
      ]
    }
  ],
  "fastingRamadanTracker": [
    {
      "id": "fastingRamadanTracker_t1",
      "title": "Ramadan mode",
      "badge": "RAMADAN MODE",
      "prompt": "Analyze my current profile for Ramadan Tracker. Intermittent fasting tracker with Ramadan mode. Adjusts hydration, nutrition, and skincare recommendations for fasting periods.",
      "mediaType": "none",
      "tags": [
        "Ramadan mode",
        "Fasting tracker",
        "Hydration adjust"
      ]
    },
    {
      "id": "fastingRamadanTracker_t2",
      "title": "Fasting tracker",
      "badge": "FASTING TRACKER",
      "prompt": "Generate a personalized clinical and botanical protocol for Ramadan Tracker, optimizing for Ramadan mode, Fasting tracker, Hydration adjust, Skincare for fasting.",
      "mediaType": "none",
      "tags": [
        "Fasting tracker",
        "Hydration adjust",
        "Skincare for fasting"
      ]
    }
  ],
  "mentalWellnessCompanion": [
    {
      "id": "mentalWellnessCompanion_t1",
      "title": "Mood tracking",
      "badge": "MOOD TRACKING",
      "prompt": "Analyze my current profile for Mental Wellness. AI-powered mental health support. Mood tracking, CBT exercises, breathing techniques, and crisis resource detection.",
      "mediaType": "none",
      "tags": [
        "Mood tracking",
        "CBT exercises",
        "Breathing techniques"
      ]
    },
    {
      "id": "mentalWellnessCompanion_t2",
      "title": "CBT exercises",
      "badge": "CBT EXERCISES",
      "prompt": "Generate a personalized clinical and botanical protocol for Mental Wellness, optimizing for Mood tracking, CBT exercises, Breathing techniques, Crisis detection.",
      "mediaType": "none",
      "tags": [
        "CBT exercises",
        "Breathing techniques",
        "Crisis detection"
      ]
    }
  ],
  "allergyDetective": [
    {
      "id": "allergyDetective_t1",
      "title": "Allergy check",
      "badge": "ALLERGY CHECK",
      "prompt": "Analyze my current profile for Allergy AI. Cross-references your allergies against product ingredients, restaurant menus, and environment. Real-time alerts via Google Search.",
      "mediaType": "none",
      "tags": [
        "Allergy check",
        "Google Search",
        "Real-time alerts"
      ]
    },
    {
      "id": "allergyDetective_t2",
      "title": "Google Search",
      "badge": "GOOGLE SEARCH",
      "prompt": "Generate a personalized clinical and botanical protocol for Allergy AI, optimizing for Allergy check, Google Search, Real-time alerts, Menu scanning.",
      "mediaType": "none",
      "tags": [
        "Google Search",
        "Real-time alerts",
        "Menu scanning"
      ]
    }
  ],
  "moodMusicRecommender": [
    {
      "id": "moodMusicRecommender_t1",
      "title": "Mood-based",
      "badge": "MOOD-BASED",
      "prompt": "Analyze my current profile for Mood Music. Recommends music playlists based on mood, energy level, and time of day. Integrates with your wellness data.",
      "mediaType": "none",
      "tags": [
        "Mood-based",
        "Energy matching",
        "Time-aware"
      ]
    },
    {
      "id": "moodMusicRecommender_t2",
      "title": "Energy matching",
      "badge": "ENERGY MATCHING",
      "prompt": "Generate a personalized clinical and botanical protocol for Mood Music, optimizing for Mood-based, Energy matching, Time-aware, Playlist recs.",
      "mediaType": "none",
      "tags": [
        "Energy matching",
        "Time-aware",
        "Playlist recs"
      ]
    }
  ],
  "skincareRoutineCard": [
    {
      "id": "skincareRoutineCard_t1",
      "title": "Visual routine",
      "badge": "VISUAL ROUTINE",
      "prompt": "Analyze my current profile for Routine Card. Creates beautiful visual morning/night routine cards with product images, order, and timing. Shareable to Instagram Stories.",
      "mediaType": "none",
      "tags": [
        "Visual routine",
        "AM/PM cards",
        "Product order"
      ]
    },
    {
      "id": "skincareRoutineCard_t2",
      "title": "AM/PM cards",
      "badge": "AM/PM CARDS",
      "prompt": "Generate a personalized clinical and botanical protocol for Routine Card, optimizing for Visual routine, AM/PM cards, Product order, Instagram-ready.",
      "mediaType": "none",
      "tags": [
        "AM/PM cards",
        "Product order",
        "Instagram-ready"
      ]
    }
  ],
  "recoveryScore": [
    {
      "id": "recoveryScore_t1",
      "title": "Daily score",
      "badge": "DAILY SCORE",
      "prompt": "Analyze my current profile for Recovery Score. Daily recovery score (0-100) combining sleep, hydration, nutrition, stress, and exercise data. Tells you to push hard or rest.",
      "mediaType": "none",
      "tags": [
        "Daily score",
        "Multi-factor",
        "Push or rest"
      ]
    },
    {
      "id": "recoveryScore_t2",
      "title": "Multi-factor",
      "badge": "MULTI-FACTOR",
      "prompt": "Generate a personalized clinical and botanical protocol for Recovery Score, optimizing for Daily score, Multi-factor, Push or rest, Trend tracking.",
      "mediaType": "none",
      "tags": [
        "Multi-factor",
        "Push or rest",
        "Trend tracking"
      ]
    }
  ],
  "pregnancyWellness": [
    {
      "id": "pregnancyWellness_t1",
      "title": "Trimester-specific",
      "badge": "TRIMESTER-SPECIF",
      "prompt": "Analyze my current profile for Pregnancy Guide. Trimester-specific nutrition, skincare (pregnancy-safe products), exercise, and symptom guidance. Halal & culturally adapted.",
      "mediaType": "none",
      "tags": [
        "Trimester-specific",
        "Pregnancy-safe",
        "Halal adapted"
      ]
    },
    {
      "id": "pregnancyWellness_t2",
      "title": "Pregnancy-safe",
      "badge": "PREGNANCY-SAFE",
      "prompt": "Generate a personalized clinical and botanical protocol for Pregnancy Guide, optimizing for Trimester-specific, Pregnancy-safe, Halal adapted, Symptom guide.",
      "mediaType": "none",
      "tags": [
        "Pregnancy-safe",
        "Halal adapted",
        "Symptom guide"
      ]
    }
  ]
};

export const FEATURE_CATEGORIES = [
  { id: 'all', label: 'All Capabilities', badge: '54 NODES', color: '#ff8fb2' },
  { id: 'skin', label: 'Skin & Radiance', badge: 'DERMATOLOGY', color: '#ec4899' },
  { id: 'wellness', label: 'Mind & Wellness', badge: 'CORTISOL & AGE', color: '#f43f5e' },
  { id: 'nutrition', label: 'Nutrition & Kitchen', badge: 'CLEAN FOOD', color: '#34d399' },
  { id: 'fitness', label: 'Kinematics & Recovery', badge: 'ATHLETIC', color: '#f97316' },
  { id: 'sleep', label: 'Sleep & Delta Recovery', badge: 'CIRCADIAN', color: '#a78bfa' },
  { id: 'community', label: 'Sisterhood & Club', badge: 'MEMBERSHIP', color: '#fbbf24' },
  { id: 'hub', label: 'Developer APIs', badge: 'LIVE MATRIX', color: '#22d3ee' },
];

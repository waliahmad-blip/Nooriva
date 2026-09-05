import re

file_path = r'C:\Nooriva\app\account\AccountClient.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_imports = '''import {
  Sparkles, LogOut, Send, ShoppingBag, ArrowRight, User, Zap, Star, Crown, Loader2,
  Heart, Calendar, Sun, Moon, Search, Lock, GlassWater, MessageCircle, ScanLine,
  Dumbbell, Pill, Bed, Beaker, Stethoscope, Camera, Mic, Check, Trophy, Copy, X,
  ArrowLeft, Share2, Volume2, Shield, ChevronRight, FileText, Activity, Brain, Wind,
  Languages, Dna, Flower2, ChefHat, Brush, Smile, Music, Palette, Baby, RefreshCw,
  Scissors, CloudSun, BookOpen, Salad, Clock, AlertTriangle, Target, Coffee, Footprints,
  Eye, Leaf, Droplets, Thermometer, Apple
} from "lucide-react";'''

content = re.sub(
    r'import \{[^}]+\} from "lucide-react";',
    new_imports,
    content,
    count=1
)

new_features = '''const ALL_FEATURES = [
  { id: "skinIntelligence", name: "Skin Scan", icon: Sparkles, tier: "lite", desc: "AI photo analysis" },
  { id: "ingredientIntelligence", name: "Ingredient Decoder", icon: Beaker, tier: "glow", desc: "Skincare analysis" },
  { id: "glowJournal", name: "Glow Journal", icon: FileText, tier: "glow", desc: "Daily wellness diary" },
  { id: "treatmentRoutine", name: "Treatment Plan", icon: Stethoscope, tier: "glow", desc: "Custom routines" },
  { id: "progressStreaks", name: "Streaks", icon: Zap, tier: "lite", desc: "Habit building" },
  { id: "wellnessToolkit", name: "Wellness Toolkit", icon: Shield, tier: "glow", desc: "Complete health suite" },
  { id: "mealPhoto", name: "Meal Analyzer", icon: Camera, tier: "lite", desc: "Macro tracking" },
  { id: "supplement", name: "Supplement Guide", icon: Pill, tier: "glow", desc: "Vitamin stacking" },
  { id: "sleep", name: "Sleep Optimizer", icon: Bed, tier: "glow", desc: "Rest analysis" },
  { id: "fitness", name: "Workout AI", icon: Dumbbell, tier: "glow", desc: "Fitness planning" },
  { id: "hydration", name: "Hydration", icon: GlassWater, tier: "lite", desc: "Water tracking" },
  { id: "symptom", name: "Symptom Checker", icon: Activity, tier: "glow", desc: "Health triage" },
  { id: "hair", name: "Hair Care", icon: Wind, tier: "glow", desc: "Hair health" },
  { id: "sun", name: "UV Protection", icon: Sun, tier: "lite", desc: "Sun safety" },
  { id: "freeChat", name: "Free Chat", icon: MessageCircle, tier: "lite", desc: "General wellness" },
  { id: "voiceOutput", name: "Voice Guide", icon: Volume2, tier: "glow", desc: "Audio responses" },
  { id: "medicalImage", name: "Medical Imaging", icon: ScanLine, tier: "pro", desc: "Advanced scans" },
  { id: "healthRisk", name: "Health Risk AI", icon: Heart, tier: "pro", desc: "Preventative care" },
  { id: "glowScore", name: "Glow Score", icon: Star, tier: "lite", desc: "Daily health metric" },
  { id: "dietChart", name: "Diet Planner", icon: Salad, tier: "glow", desc: "Custom meal plans" },
  { id: "workoutPlan", name: "Workout Plan", icon: Target, tier: "glow", desc: "Exercise routines" },
  { id: "beforeAfter", name: "Progress Photos", icon: Share2, tier: "glow", desc: "Visual tracking" },
  { id: "routineCard", name: "Routine Card", icon: Calendar, tier: "glow", desc: "Daily schedules" },
  { id: "recipeCard", name: "Recipe Generator", icon: ChefHat, tier: "glow", desc: "Healthy recipes" },
  { id: "streakBadge", name: "Streak Badge", icon: Trophy, tier: "glow", desc: "Achievement system" },
  { id: "moodCard", name: "Mood Tracker", icon: Smile, tier: "glow", desc: "Emotional wellness" },
  { id: "recoveryScore", name: "Recovery Score", icon: RefreshCw, tier: "glow", desc: "Rest optimization" },
  { id: "skinAge", name: "Skin Age", icon: Clock, tier: "pro", desc: "Biological age analysis" },
  { id: "medicalConflicts", name: "Drug Interactions", icon: AlertTriangle, tier: "pro", desc: "Medication safety" },
  { id: "dermConsult", name: "Derm Consult", icon: Stethoscope, tier: "premium", desc: "Expert guidance" },
  { id: "familyPlan", name: "Family Wellness", icon: Baby, tier: "max", desc: "Multi-user profiles" },
  { id: "customFormulation", name: "Custom Formula", icon: Beaker, tier: "ultimate", desc: "Personalized blends" },
  { id: "vipEvents", name: "VIP Events", icon: Crown, tier: "supreme", desc: "Exclusive access" },
  { id: "concierge", name: "Concierge", icon: Shield, tier: "supreme", desc: "24/7 support" },
  { id: "weeklyDerm", name: "Weekly Derm", icon: Calendar, tier: "supreme", desc: "Regular check-ins" },
  { id: "unlimitedFamily", name: "Unlimited Family", icon: Baby, tier: "supreme", desc: "Whole household" },
  { id: "stressAnalysis", name: "Stress Analysis", icon: Brain, tier: "glow", desc: "Cortisol tracking" },
  { id: "breathwork", name: "Breathwork", icon: Wind, tier: "glow", desc: "Breathing exercises" },
  { id: "meditation", name: "Meditation", icon: Music, tier: "glow", desc: "Mindfulness" },
  { id: "colorTherapy", name: "Color Therapy", icon: Palette, tier: "elite", desc: "Chakra balancing" },
  { id: "ayurveda", name: "Ayurveda", icon: Leaf, tier: "elite", desc: "Dosha analysis" },
  { id: "tcm", name: "TCM Analysis", icon: Languages, tier: "elite", desc: "Traditional medicine" },
  { id: "geneticInsights", name: "Genetic Insights", icon: Dna, tier: "premium", desc: "DNA wellness" },
  { id: "hormonalBalance", name: "Hormonal Balance", icon: Activity, tier: "pro", desc: "Endocrine health" },
  { id: "gutHealth", name: "Gut Health", icon: Flower2, tier: "pro", desc: "Microbiome analysis" },
  { id: "detoxPlan", name: "Detox Plan", icon: Droplets, tier: "glow", desc: "Cleanse protocols" },
  { id: "immuneBoost", name: "Immune Boost", icon: Shield, tier: "glow", desc: "Immunity support" },
  { id: "eyeHealth", name: "Eye Health", icon: Eye, tier: "elite", desc: "Vision wellness" },
  { id: "thermalScan", name: "Thermal Scan", icon: Thermometer, tier: "premium", desc: "Body temp analysis" }
];'''

content = re.sub(
    r'const ALL_FEATURES = \[[\s\S]*?\];',
    new_features,
    content,
    count=1
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Replaced imports and all 49 features.")

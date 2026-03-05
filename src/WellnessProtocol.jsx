import { useState } from "react";

const TABS = [
  { id: "schedule",    label: "Full Schedule",    icon: "📋" },
  { id: "morning",    label: "Morning",           icon: "☀️" },
  { id: "evening",    label: "Evening",           icon: "🌙" },
  { id: "hormones",   label: "Hormone Therapy",   icon: "💉" },
  { id: "peptides",   label: "Peptides",          icon: "🧬" },
  { id: "supplements",label: "Supplements",       icon: "💊" },
  { id: "diet",       label: "Diet & Nutrition",  icon: "🥬" },
  { id: "fitness",    label: "Fitness",           icon: "🏋️" },
  { id: "recovery",   label: "Recovery",          icon: "🧘" },
];

const p = {
  bg: "#08090C", surface: "#0F1117", surfaceAlt: "#141720", card: "#161B24",
  border: "#1E2330", borderActive: "#2A3040",
  green: "#34D399", greenDim: "rgba(52,211,153,0.10)",
  blue: "#60A5FA", blueDim: "rgba(96,165,250,0.10)",
  amber: "#FBBF24", amberDim: "rgba(251,191,36,0.10)",
  purple: "#A78BFA", purpleDim: "rgba(167,139,250,0.10)",
  rose: "#FB7185", roseDim: "rgba(251,113,133,0.10)",
  cyan: "#22D3EE", cyanDim: "rgba(34,211,238,0.10)",
  text: "#E8ECF4", textSoft: "#94A3B8", textDim: "#475569", white: "#FFF",
};
const font = "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const mono = "'JetBrains Mono', 'SF Mono', monospace";

const Badge = ({ children, color, bg }) => (
  <span style={{ background: bg, color, padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, fontFamily: mono, whiteSpace: "nowrap", letterSpacing: "0.3px" }}>{children}</span>
);
const SectionHeader = ({ children, color, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, marginTop: 28 }}>
    {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
    <h3 style={{ fontSize: 16, fontWeight: 700, color, margin: 0, letterSpacing: "-0.2px" }}>{children}</h3>
  </div>
);
const Card = ({ children, style }) => (
  <div style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 10, padding: "14px 16px", ...style }}>{children}</div>
);

// ─── HORMONE DATA ──────────────────────────────────────────────────────────────
const hormoneWeeks = [
  { label: "This Week — Transition (Mar 4–8)", days: [
    { date: "Tue Mar 4", items: [{ med: "TRT 200mg", color: p.green, icon: "💉" }], note: "✅ Done" },
    { date: "Wed Mar 5", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }, { med: "Anastrozole 1 mg", color: p.amber, icon: "💊" }] },
    { date: "Sat Mar 8", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }] },
  ]},
  { label: "Week 2 — Mar 9–15 (First Clean Week)", days: [
    { date: "Mon Mar 10", items: [{ med: "TRT 200mg", color: p.green, icon: "💉" }] },
    { date: "Wed Mar 12", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }, { med: "Anastrozole 1 mg", color: p.amber, icon: "💊" }] },
    { date: "Sat Mar 15", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }] },
  ]},
  { label: "Week 3 — Mar 16–22", days: [
    { date: "Mon Mar 17", items: [{ med: "TRT 200mg", color: p.green, icon: "💉" }] },
    { date: "Wed Mar 19", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }, { med: "Anastrozole 1 mg", color: p.amber, icon: "💊" }] },
    { date: "Sat Mar 22", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }] },
  ]},
  { label: "Week 4 — Mar 23–29", days: [
    { date: "Mon Mar 24", items: [{ med: "TRT 200mg", color: p.green, icon: "💉" }] },
    { date: "Wed Mar 26", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }, { med: "Anastrozole 1 mg", color: p.amber, icon: "💊" }] },
    { date: "Sat Mar 29", items: [{ med: "hCG 250 IU", color: p.blue, icon: "💉" }] },
  ]},
];
const hormoneLegend = [
  { label: "TRT 200mg (Monday)", color: p.green, note: "Weekly IM injection — anchor day. T at 900 ng/dL. Well-dialed after dose adjustment." },
  { label: "hCG 250 IU (Wed + Sat)", color: p.blue, note: "2x/week SubQ for fertility preservation. LH/FSH suppressed at <0.3 — discuss semen analysis with Dr. Padilla." },
  { label: "Anastrozole 1mg (Wednesday)", color: p.amber, note: "Weekly AI with hCG dose. E2 at 26.9 — well controlled. Don't over-suppress." },
];
const hormoneLabNotes = [
  { marker: "Testosterone", value: "900 ng/dL", range: "264–916", status: "optimal", note: "Top of physiological range. Well-dialed." },
  { marker: "Estradiol (E2)", value: "26.9 pg/mL", range: "7.6–42.6", status: "optimal", note: "Dropped from 48.8. AI working." },
  { marker: "LH", value: "<0.3", range: "1.7–8.6", status: "suppressed", note: "Expected on TRT. HCG acts as LH analog." },
  { marker: "FSH", value: "<0.3", range: "1.5–12.4", status: "suppressed", note: "Consider semen analysis for fertility." },
  { marker: "Vitamin D", value: "27.2 ng/mL", range: "30–100", status: "low", note: "Insufficient. D3 5,000 IU daily. Retest 8-12 wk." },
  { marker: "Glucose", value: "101 mg/dL", range: "70–99", status: "borderline", note: "Barely over. A1c 5.4 normal. Monitor." },
];

// ─── PEPTIDE DATA ──────────────────────────────────────────────────────────────
const peptideProtocols = [
  {
    name: "BPC-157", subtitle: "Body Protection Compound", status: "TIER 1 — Start First",
    tier: 1, color: p.green, colorDim: p.greenDim,
    goalTags: ["Recovery", "Gut Health", "Anti-Inflammatory"],
    trtSafety: "Fully compatible with TRT/HCG/AI. Different pathways — no interaction. Complements TRT by supporting the connective tissue recovery demands of heavier training.",
    overview: "Synthetic pentadecapeptide from gastric juice protein. Promotes healing of muscles, tendons, ligaments, gut, and nerves via angiogenesis, collagen synthesis, and growth factor modulation. Your #1 recovery peptide.",
    benefits: ["Accelerates tendon, ligament & muscle repair", "Gut healing — mucosal integrity, ulcer recovery", "Anti-inflammatory — reduces systemic inflammation", "Neuroprotective — modulates dopamine & serotonin", "Supports collagen synthesis for joints & skin", "Synergistic with TRT — handles recovery load from heavier training"],
    protocol: { Dose: "300–400 mcg/day (split 2 doses of 150-200 mcg)", Route: "Subcutaneous (near injury site or abdominal)", Timing: "AM post-workout + PM before bed", Cycle: "4–8 weeks on, 2–4 weeks off", Notes: "Start 250 mcg 2x/day, titrate to 300-400 mcg. Avoid NSAIDs. Start this FIRST before adding CJC/Ipa." },
    stacks: "Core of your stack. Add CJC-1295/Ipamorelin after 2-4 weeks. Reserve TB-500 for specific injuries.",
    research: "36 preclinical studies (1993-2024). No FDA approval. Category 2 bulk drug substance.",
  },
  {
    name: "CJC-1295 + Ipamorelin", subtitle: "GH Secretagogue Stack", status: "TIER 1 — Add After BPC-157 (Week 3-4)",
    tier: 1, color: p.blue, colorDim: p.blueDim,
    goalTags: ["Lean Recomp", "Fat Loss", "Sleep", "Anti-Aging", "Longevity"],
    trtSafety: "Compatible — different hormonal axis (GH axis vs HPG axis). Common clinical pairing in longevity medicine. MONITOR: IGF-1, fasting glucose (glucose already 101), and E2 (GH may influence estrogen metabolism).",
    overview: "CJC-1295 extends GH pulse duration. Ipamorelin amplifies pulse strength without affecting cortisol or prolactin. Your LEAN RECOMP peptide — drives fat metabolism (especially abdominal) while preserving muscle.",
    benefits: ["Body recomposition — burn fat while preserving lean mass", "Targets visceral/abdominal fat specifically", "3-5x increase in natural GH release", "Deeper, more restorative sleep", "Accelerated post-workout recovery", "Anti-aging — collagen, skin elasticity, bone density", "Preserves muscle during caloric deficit"],
    protocol: { Dose: "CJC-1295: 100-300 mcg + Ipamorelin: 200-300 mcg", Route: "Subcutaneous (abdominal)", Timing: "Before bed on empty stomach (2+ hrs after dinner)", Cycle: "8-12 weeks on, 4-8 weeks off. 5 days on / 2 off.", Notes: "Add IGF-1 to your lab panel. Start low, titrate up. Sleep improvement in 2-4 weeks, body comp changes at 8-12 weeks. Est. ~$200-400/mo via compounding pharmacy." },
    stacks: "Run alongside BPC-157 for recovery + recomp.",
    research: "CJC-1295: GH increase 200-1000%. Ipamorelin 200 mcg 2x/day increased GH without altering cortisol/prolactin (Raun et al., European Journal of Endocrinology).",
  },
  {
    name: "GHK-Cu", subtitle: "Copper Peptide — Skin & Longevity", status: "TIER 1 — Start Immediately (Topical)",
    tier: 1, color: p.cyan, colorDim: p.cyanDim,
    goalTags: ["Skin Health", "Anti-Aging", "Collagen", "Longevity"],
    trtSafety: "Zero interaction with TRT/HCG/AI. Applied topically — works locally on skin fibroblasts. Does not enter systemic circulation in meaningful amounts.",
    overview: "Naturally occurring tripeptide-copper complex. The strongest evidence-based skin peptide available. Outperformed both vitamin C and retinoic acid for collagen production in clinical trials.",
    benefits: ["Increased collagen production (outperformed Vit C and retinol in trials)", "Improved skin firmness (+22%) and fine line reduction (-16%) in 12-week study", "Boosts elastin synthesis and skin elasticity", "Anti-inflammatory — reduces IL-1β and TNF-α by 30%", "Accelerates wound healing by 30-50%", "Antioxidant — scavenges free radicals"],
    protocol: { Dose: "0.01-0.05% GHK-Cu serum (topical)", Route: "Topical — face and neck", Timing: "AM: after Vitamin C, before moisturizer. PM: after retinoid, before night cream.", Cycle: "Continuous daily use — no cycling needed", Notes: "Pairs well with existing Vitamin C (AM) and retinoid (PM). Don't combine with strong AHAs same application. Store in opaque container. Look for Copper Tripeptide-1. ~$20-50 for quality serums." },
    stacks: "Complements your entire skincare protocol. Works synergistically with Vitamin C (AM) and retinoid (PM).",
    research: "12-week study: improved collagen in 70% vs 50% vitamin C vs 40% retinoic acid. 2023 double-blind (n=60): 22% skin firmness increase, 16% fine line reduction.",
  },
  {
    name: "TB-500", subtitle: "Thymosin Beta-4 Fragment", status: "TIER 2 — Reserve for Injuries",
    tier: 2, color: p.purple, colorDim: p.purpleDim,
    goalTags: ["Injury Recovery", "Inflammation"],
    trtSafety: "Fully compatible with TRT/HCG/AI. Different mechanism (cell migration, actin binding). No hormonal crossover.",
    overview: "Synthetic peptide modeled after thymosin beta-4. Powerful for acute injury recovery. NOT essential for daily wellness — save for specific tendon, ligament, or muscle injuries.",
    benefits: ["Promotes cell migration to injury sites", "Systemic inflammation reduction", "Tendon & ligament healing", "Enhanced flexibility and ROM", "Complements BPC-157 via different pathways ('Wolverine Stack')"],
    protocol: { Dose: "2-2.5 mg, 2x/week (loading) → 2 mg/week (maintenance)", Route: "Subcutaneous", Timing: "2x/week loading, then weekly maintenance", Cycle: "Loading: 4-6 weeks. Maintenance: 2-4 weeks.", Notes: "Deploy when you have a specific injury. Run alongside BPC-157 for maximum healing." },
    stacks: "BPC-157 + TB-500 = 'Wolverine Stack' — deploy for specific injuries only.",
    research: "Primarily preclinical. Wound healing, reduced scarring in animal models. Not FDA-approved.",
  },
];

const trtPeptideMonitoring = [
  { marker: "IGF-1", why: "TRT + CJC/Ipa both raise IGF-1. Must monitor to stay in upper-normal range.", frequency: "Every 8-12 weeks on peptides", target: "Upper-normal range" },
  { marker: "Fasting Glucose & A1c", why: "GH peptides can mildly reduce insulin sensitivity. Glucose already borderline at 101.", frequency: "Every 8-12 weeks", target: "Glucose <100, A1c <5.7" },
  { marker: "Estradiol (E2)", why: "GH may influence estrogen metabolism. Current E2 at 26.9 is well-controlled.", frequency: "Check at first labs after starting CJC/Ipa", target: "Maintain 20-30 pg/mL range" },
  { marker: "Water Retention", why: "Both TRT and GH peptides can cause mild water retention. Usually transient.", frequency: "Self-monitor visually", target: "Note to Dr. Padilla if persistent puffiness" },
];

// ─── FULL SCHEDULE ─────────────────────────────────────────────────────────────
const dailySchedule = [
  { time: "6:00 AM", block: "Wake + Hydration", items: ["Wake — no snooze", "16 oz water + sea salt + lemon", "5 min sunlight exposure"], color: p.amber },
  { time: "6:15 AM", block: "Stretch & Mobility (15 min)", items: ["Cat-cow 10 reps", "Hip flexor stretch 60s each", "World's greatest stretch 5 each", "Foam roll 5 min", "Band pull-aparts 2×15"], color: p.purple },
  { time: "6:30 AM", block: "AM Skincare", items: ["Gentle cleanser", "Vitamin C serum 15-20%", "GHK-Cu copper peptide serum", "Niacinamide toner", "HA + Peptide moisturizer", "SPF 50 sunscreen"], color: p.cyan },
  { time: "6:45 AM", block: "Fasted Supplements", items: ["ACV shot", "Ashwagandha 600mg", "L-Theanine 200mg"], color: p.green },
  { time: "7:00 AM", block: "Pre-Workout", items: ["Coffee 200-400mg", "Citrulline 6g + Beta-Alanine 3.2g"], color: p.rose },
  { time: "7:30 AM", block: "Heavy Lift (60-75 min)", items: ["Compounds: squat/dead/bench/rows", "Accessory work", "Core 10-15 min"], color: p.rose },
  { time: "9:00 AM", block: "Post-Workout + AM Supps", items: ["Whey 40g + Creatine 5g", "Post-WO meal", "D3, K2, Omega-3, Mg, Zinc, Boron, B-Complex"], color: p.green },
  { time: "12:30 PM", block: "Lunch", items: ["5-6 oz salmon/chicken", "Mixed greens + olive oil", "Olives, nuts"], color: p.blue },
  { time: "2:00 PM", block: "Afternoon Walk", items: ["30-45 min outdoor", "Zone 2 HR 120-140"], color: p.blue },
  { time: "3:00 PM", block: "Snack", items: ["Protein shake or yogurt", "Nuts + berries"], color: p.blue },
  { time: "5:00 PM", block: "ClassPass (Tue/Thu)", items: ["Yoga or Pilates", "Non-class: mobility"], color: p.purple },
  { time: "6:30 PM", block: "Dinner + PM Supps", items: ["6 oz protein + vegetables", "Mg Glycinate 200mg"], color: p.blue },
  { time: "7:00 PM", block: "Hormone Protocol", items: ["Mon: TRT 200mg 💉", "Wed: hCG 250 IU 💉 + Anastrozole 1mg 💊", "Sat: hCG 250 IU 💉"], color: p.amber, highlight: true },
  { time: "9:00 PM", block: "PM Skincare", items: ["Double cleanse", "Retinoid OR Niacinamide", "GHK-Cu copper peptide serum", "Night cream + eye cream"], color: p.cyan },
  { time: "9:30 PM", block: "Sleep Stack + Wind-Down", items: ["Screens off / DND", "Room 65-68°F", "Mg L-Threonate 2g, Apigenin 50mg, Glycine 3g"], color: p.purple },
  { time: "10:00 PM", block: "Lights Out", items: ["Target: 8 hrs", "Side sleep + knee pillow", "Blackout"], color: p.purple },
];

const supplementData = {
  morning_fasted: [
    { name: "Ashwagandha KSM-66", dose: "600 mg", purpose: "Cortisol -28%, stress resilience", note: "Cycle 8 wk on / 2 off" },
    { name: "L-Theanine", dose: "200 mg", purpose: "Calm focus with caffeine", note: "With caffeine only" },
    { name: "ACV", dose: "1 tbsp", purpose: "Digestion, insulin sensitivity", note: "Rinse mouth after" },
  ],
  morning_food: [
    { name: "Vitamin D3", dose: "5,000 IU", purpose: "Level at 27.2 — insufficient", note: "With fat. Target 50+" },
    { name: "Vitamin K2 MK-7", dose: "200 mcg", purpose: "Calcium → bones not arteries", note: "Always with D3" },
    { name: "Omega-3 Fish Oil", dose: "2g EPA/DHA", purpose: "Anti-inflammatory, cardiovascular", note: "TG form. Your TG: 67" },
    { name: "Magnesium Glycinate", dose: "200 mg", purpose: "Muscle, energy, ALP cofactor", note: "AM dose (split AM/PM)" },
    { name: "Zinc Picolinate", dose: "30 mg", purpose: "T support, immune, ALP cofactor", note: "Max 40mg/day" },
    { name: "Boron", dose: "6-9 mg", purpose: "Free T, SHBG, bone density", note: "Supports TRT" },
    { name: "B-Complex", dose: "1 cap", purpose: "Energy, methylation", note: "Methylated forms" },
    { name: "Creatine", dose: "5g", purpose: "Strength, muscle, cognitive", note: "Daily incl rest days" },
  ],
  pre_workout: [
    { name: "Caffeine", dose: "200-400 mg", purpose: "Performance, thermogenic", note: "Cut off by noon" },
    { name: "L-Citrulline", dose: "6g", purpose: "NO, blood flow, pump", note: "30 min pre" },
    { name: "Beta-Alanine", dose: "3.2g", purpose: "Fatigue buffer", note: "Tingling normal" },
  ],
  evening: [
    { name: "Mg L-Threonate", dose: "2g", purpose: "Deep sleep, crosses BBB", note: "Best Mg for sleep" },
    { name: "Mg Glycinate", dose: "200 mg", purpose: "Muscle relax, calming", note: "PM = 400mg total" },
    { name: "Apigenin", dose: "50 mg", purpose: "GABA, sleep onset", note: "30 min before bed" },
    { name: "Glycine", dose: "3g", purpose: "Core temp drop, sleep quality", note: "Also collagen support" },
    { name: "Melatonin", dose: "0.3-0.5 mg", purpose: "Circadian reset (optional)", note: "LOW dose. Use sparingly" },
  ],
  consider: [
    { name: "NAC", dose: "600-1200 mg", purpose: "Glutathione, liver, antioxidant", note: "If drinking" },
    { name: "CoQ10 (Ubiquinol)", dose: "200 mg", purpose: "Mitochondria, heart", note: "Reduced form" },
    { name: "Tongkat Ali", dose: "400 mg", purpose: "Free T, SHBG", note: "5 on / 2 off" },
  ],
};

const fitnessSchedule = [
  { day: "Mon", focus: "Push", am: "Chest / Shoulders / Triceps", pm: "Walk 30-45 min", details: ["Bench 4×6-8", "OHP 3×8-10", "Incline DB 3×10-12", "Lat Raises 3×12-15", "Dips 3×10-12", "Core 15 min"], hormone: "💉 TRT 200mg" },
  { day: "Tue", focus: "Pull", am: "Back / Biceps", pm: "Yoga/Pilates 5-6 PM", details: ["Deadlift 4×5-6", "BB Rows 4×8-10", "Pull-ups 3×max", "Face Pulls 3×15", "Curls 3×10-12", "Core 10 min"], hormone: null },
  { day: "Wed", focus: "Legs", am: "Legs & Glutes", pm: "Walk 30-45 min", details: ["Squat 4×6-8", "RDL 3×8-10", "Bulgarians 3×10 ea", "Hip Thrusts 3×12", "Leg Press 3×12-15", "Calves 4×15", "Core 15 min"], hormone: "💉 hCG + 💊 AI" },
  { day: "Thu", focus: "Upper", am: "Upper Hypertrophy", pm: "Yoga/Pilates 5-6 PM", details: ["DB Bench 4×10-12", "Cable Rows 4×10-12", "Arnold Press 3×10-12", "Flyes 3×12-15", "Curls+Skulls 3×12", "Core 10 min"], hormone: null },
  { day: "Fri", focus: "Legs+Core", am: "Legs & Core Focus", pm: "Walk 30-45 min", details: ["Front Squat 4×6-8", "Sumo DL 3×8-10", "Lunges 3×12 ea", "Leg Curls 3×12-15", "Hang Leg Raise 4×15", "Planks 10 min"], hormone: null },
  { day: "Sat", focus: "Recovery", am: "Outdoor Cardio/Hike", pm: "Massage + IR Sauna", details: ["45-60 min walk/hike/cycle", "Massage 60-90 min", "IR Sauna 30-45 min", "Optional: Cryo"], hormone: "💉 hCG 250 IU" },
  { day: "Sun", focus: "Rest", am: "Light Mobility", pm: "Meal Prep + Rest", details: ["Optional yoga 20 min", "Foam roll full body", "Meal prep", "Optional 2nd massage"], hormone: null },
];

// ─── TAB COMPONENTS ────────────────────────────────────────────────────────────
function FullScheduleTab() {
  return (
    <div>
      <p style={{ fontSize: 13, color: p.textSoft, marginBottom: 20, lineHeight: 1.6 }}>
        Complete daily timeline — wake to sleep. Hormone days highlighted. Click tabs above for deep dives.
      </p>
      {dailySchedule.map((block, i) => (
        <div key={i} style={{
          display: "flex", gap: 14, padding: "10px 0",
          borderBottom: `1px solid ${p.border}`,
          background: block.highlight ? p.amberDim : "transparent",
          marginLeft: block.highlight ? -8 : 0, marginRight: block.highlight ? -8 : 0,
          paddingLeft: block.highlight ? 8 : 0, paddingRight: block.highlight ? 8 : 0,
          borderRadius: block.highlight ? 6 : 0,
        }}>
          <div style={{ minWidth: 75, fontFamily: mono, fontSize: 12, color: block.color, paddingTop: 2 }}>{block.time}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: p.text, marginBottom: 4 }}>{block.block}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {block.items.map((item, j) => (
                <span key={j} style={{ fontSize: 12, color: p.textSoft, background: p.surfaceAlt, padding: "3px 8px", borderRadius: 6, border: `1px solid ${p.border}` }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimeBlockTab({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Badge color={block.color} bg={block.color + "18"}>{block.time}</Badge>
            <span style={{ fontSize: 15, fontWeight: 600, color: p.text }}>{block.block}</span>
          </div>
          {block.items.map((item, j) => (
            <div key={j} style={{ fontSize: 13, color: p.textSoft, padding: "4px 0 4px 12px", borderLeft: `2px solid ${p.border}`, marginBottom: 2 }}>{item}</div>
          ))}
        </Card>
      ))}
    </div>
  );
}

function HormoneTab() {
  return (
    <div>
      <SectionHeader color={p.amber} icon="📊">Protocol Overview</SectionHeader>
      {hormoneLegend.map((item, i) => (
        <Card key={i} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: p.text }}>{item.label}</span>
          </div>
          <div style={{ fontSize: 12, color: p.textSoft, marginLeft: 20 }}>{item.note}</div>
        </Card>
      ))}

      <SectionHeader color={p.green} icon="📅">4-Week Calendar — Mon/Wed/Sat Pattern</SectionHeader>
      {hormoneWeeks.map((week, wi) => (
        <div key={wi} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: p.textSoft, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{week.label}</div>
          {week.days.map((day, di) => (
            <Card key={di} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: p.text, minWidth: 85, fontWeight: 600 }}>{day.date}</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {day.items.map((item, ii) => (
                  <span key={ii} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>{item.icon}</span>
                    <Badge color={item.color} bg={item.color + "18"}>{item.med}</Badge>
                  </span>
                ))}
                {day.note && <span style={{ fontSize: 11, color: p.green, fontWeight: 600 }}>{day.note}</span>}
              </div>
            </Card>
          ))}
        </div>
      ))}

      <SectionHeader color={p.blue} icon="🔬">Lab Snapshot (Feb 13, 2026)</SectionHeader>
      {hormoneLabNotes.map((lab, i) => {
        const sc = lab.status === "optimal" ? p.green : lab.status === "suppressed" ? p.amber : p.rose;
        return (
          <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: p.text }}>{lab.marker}</span>
              <div style={{ fontSize: 12, color: p.textDim, marginTop: 2 }}>{lab.note}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Badge color={sc} bg={sc + "18"}>{lab.value}</Badge>
              <div style={{ fontSize: 11, color: p.textDim, marginTop: 4 }}>Ref: {lab.range}</div>
            </div>
          </Card>
        );
      })}

      <SectionHeader color={p.rose} icon="🎯">Action Items — Dr. Padilla</SectionHeader>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, color: p.text, marginBottom: 10 }}>Repeating Protocol: Mon TRT 200mg · Wed hCG 250 IU + AI 1mg · Sat hCG 250 IU</div>
        {[
          "HCG at 250 IU 2x/week — assess adequacy for fertility preservation. LH/FSH fully suppressed. Consider semen analysis.",
          "Consider enclomiphene if fertility is priority.",
          "Vitamin D retest in 8-12 weeks (target 50+ after D3 5,000 IU daily).",
          "Discuss peptide rollout: BPC-157 first, then CJC-1295/Ipamorelin. Add IGF-1 to lab panel.",
          "Monitor eosinophils — still 1.0 (ref 0.0-0.4).",
          "Continue current AI 1mg weekly — E2 well controlled at 26.9. May need adjustment after starting GH peptides.",
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 13, color: p.textSoft, padding: "6px 0 6px 12px", borderLeft: `2px solid ${p.rose}`, marginBottom: 4, lineHeight: 1.5 }}>{item}</div>
        ))}
      </Card>
    </div>
  );
}

function PeptideTab() {
  const [expanded, setExpanded] = useState(0);
  return (
    <div>
      <p style={{ fontSize: 13, color: p.textSoft, marginBottom: 20, lineHeight: 1.6 }}>
        Optimized for: <strong style={{ color: p.green }}>recovery</strong>, <strong style={{ color: p.cyan }}>skin health</strong>, <strong style={{ color: p.blue }}>lean recomp</strong>, and <strong style={{ color: p.purple }}>longevity</strong>. All confirmed compatible with TRT/HCG/AI.
      </p>

      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${p.greenDim}, ${p.blueDim}, ${p.cyanDim})`, border: `1px solid ${p.green}33` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: p.green, marginBottom: 8 }}>Your Stack — Lean + Recovery + Skin + Longevity</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <Badge color={p.green} bg={p.greenDim}>BPC-157</Badge>
          <span style={{ color: p.textDim }}>+</span>
          <Badge color={p.blue} bg={p.blueDim}>CJC-1295/Ipamorelin</Badge>
          <span style={{ color: p.textDim }}>+</span>
          <Badge color={p.cyan} bg={p.cyanDim}>GHK-Cu (topical)</Badge>
        </div>
        <div style={{ fontSize: 12, color: p.textDim }}>Est. $300-500/mo (injectables) + $20-50 (GHK-Cu serum) · All TRT-compatible</div>
      </Card>

      <Card style={{ marginBottom: 24, borderColor: p.amber + "33" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: p.amber, marginBottom: 10 }}>📅 Rollout Sequence</div>
        {[
          { week: "Now", action: "Add GHK-Cu serum to AM/PM skincare routine", color: p.cyan },
          { week: "Week 1-2", action: "Start BPC-157 — 250 mcg 2x/day, titrate to 300-400 mcg", color: p.green },
          { week: "Week 3-4", action: "Add CJC-1295/Ipamorelin — before bed, start low dose", color: p.blue },
          { week: "Week 6-8", action: "Lab check: IGF-1, glucose, E2. Adjust as needed.", color: p.rose },
          { week: "As needed", action: "Deploy TB-500 if specific injury occurs", color: p.purple },
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 6, alignItems: "center" }}>
            <Badge color={step.color} bg={step.color + "15"}>{step.week}</Badge>
            <span style={{ fontSize: 12, color: p.textSoft }}>{step.action}</span>
          </div>
        ))}
      </Card>

      {peptideProtocols.map((pep, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <Card style={{ cursor: "pointer", borderColor: expanded === i ? pep.color + "55" : p.border }}>
            <div onClick={() => setExpanded(expanded === i ? -1 : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <Badge color={pep.tier === 1 ? p.green : p.textDim} bg={pep.tier === 1 ? p.greenDim : p.surfaceAlt}>{pep.tier === 1 ? "TIER 1" : "TIER 2"}</Badge>
                  <span style={{ fontSize: 16, fontWeight: 700, color: p.text }}>{pep.name}</span>
                  <Badge color={pep.color} bg={pep.colorDim}>{pep.subtitle}</Badge>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                  {pep.goalTags.map((tag, ti) => (
                    <span key={ti} style={{ fontSize: 10, color: p.textDim, background: p.surfaceAlt, padding: "1px 6px", borderRadius: 4, border: `1px solid ${p.border}` }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: p.amber }}>{pep.status}</div>
              </div>
              <span style={{ color: p.textDim, fontSize: 14, transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "0.2s", flexShrink: 0, marginTop: 4 }}>▼</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${p.border}` }}>
                <div style={{ fontSize: 13, color: p.textSoft, lineHeight: 1.6, marginBottom: 16 }}>{pep.overview}</div>
                <div style={{ background: p.greenDim, border: `1px solid ${p.green}33`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.green, marginBottom: 4 }}>✅ TRT Compatibility</div>
                  <div style={{ fontSize: 12, color: p.textSoft, lineHeight: 1.5 }}>{pep.trtSafety}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: pep.color, marginBottom: 8 }}>Benefits</div>
                {pep.benefits.map((b, j) => (
                  <div key={j} style={{ fontSize: 12, color: p.textSoft, paddingLeft: 12, marginBottom: 2, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: pep.color }}>•</span>{b}
                  </div>
                ))}
                <div style={{ fontSize: 13, fontWeight: 600, color: pep.color, marginBottom: 8, marginTop: 14 }}>Protocol</div>
                <div style={{ background: p.surfaceAlt, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  {Object.entries(pep.protocol).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 12, marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: p.textDim, minWidth: 55, fontWeight: 600 }}>{k}:</span>
                      <span style={{ color: p.textSoft, lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: p.textSoft, marginBottom: 6 }}><span style={{ fontWeight: 600, color: p.purple }}>Stacks: </span>{pep.stacks}</div>
                <div style={{ fontSize: 11, color: p.textDim, fontStyle: "italic" }}><span style={{ fontWeight: 600 }}>Research: </span>{pep.research}</div>
              </div>
            )}
          </Card>
        </div>
      ))}

      <SectionHeader color={p.rose} icon="🔬">TRT + Peptide Monitoring (Add to Labs)</SectionHeader>
      {trtPeptideMonitoring.map((item, i) => (
        <Card key={i} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.text }}>{item.marker}</div>
              <div style={{ fontSize: 12, color: p.textSoft, marginTop: 2, lineHeight: 1.5 }}>{item.why}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <Badge color={p.blue} bg={p.blueDim}>{item.frequency}</Badge>
              <div style={{ fontSize: 11, color: p.textDim, marginTop: 4 }}>{item.target}</div>
            </div>
          </div>
        </Card>
      ))}

      <Card style={{ marginTop: 16, borderColor: p.rose + "33" }}>
        <div style={{ fontSize: 12, color: p.rose, fontWeight: 600, marginBottom: 4 }}>⚠️ Disclaimer</div>
        <div style={{ fontSize: 12, color: p.textDim, lineHeight: 1.6 }}>
          Not FDA-approved. BPC-157 is Category 2. All protocols require supervision — discuss with Dr. Padilla before starting. Avoid NSAIDs on BPC-157. Monitor IGF-1 on GH secretagogues. Source from LegitScript-certified pharmacies only.
        </div>
      </Card>
    </div>
  );
}

function SupplementTab() {
  const sections = [
    { title: "Morning — Fasted", data: supplementData.morning_fasted, color: p.amber, icon: "☀️" },
    { title: "Morning — With Food", data: supplementData.morning_food, color: p.green, icon: "🍳" },
    { title: "Pre-Workout", data: supplementData.pre_workout, color: p.rose, icon: "🔥" },
    { title: "Evening / Sleep Stack", data: supplementData.evening, color: p.purple, icon: "🌙" },
    { title: "Consider Adding", data: supplementData.consider, color: p.textSoft, icon: "🔬" },
  ];
  return (
    <div>
      {sections.map((sec, si) => (
        <div key={si}>
          <SectionHeader color={sec.color} icon={sec.icon}>{sec.title}</SectionHeader>
          {sec.data.map((s, i) => (
            <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10, marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: p.text }}>{s.name}</div>
                <div style={{ fontSize: 12, color: p.textSoft, marginTop: 2 }}>{s.purpose}</div>
                {s.note && <div style={{ fontSize: 11, color: p.textDim, marginTop: 2 }}>{s.note}</div>}
              </div>
              <Badge color={sec.color} bg={sec.color + "15"}>{s.dose}</Badge>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function DietTab() {
  const macros = [{ l: "Calories", v: "1,800–2,200" }, { l: "Protein", v: "180-200g" }, { l: "Carbs", v: "100-150g" }, { l: "Fat", v: "70-90g" }, { l: "Fiber", v: "30-40g" }, { l: "Water", v: "1 gallon" }];
  const meals = [
    { time: "9:15 AM", name: "Post-Workout", cal: "550-650", pro: "50g", items: ["Whey 40g + creatine 5g", "3 eggs in olive oil", "½ avocado", "Spinach + sun-dried tomato", "Optional: ½ cup oats"] },
    { time: "12:30 PM", name: "Lunch", cal: "500-600", pro: "45g", items: ["5-6 oz salmon/chicken thigh", "Mixed greens salad", "Olives, walnuts, pine nuts", "Olive oil + lemon"] },
    { time: "3:00 PM", name: "Snack", cal: "250-300", pro: "30g", items: ["Protein shake or yogurt", "Almonds/macadamias", "½ cup blueberries"] },
    { time: "6:30 PM", name: "Dinner", cal: "500-600", pro: "45g", items: ["6 oz steak/salmon/chicken", "Roasted vegetables", "Side salad + olive oil", "Optional: ½ cup rice on heavy days"] },
  ];
  return (
    <div>
      <SectionHeader color={p.green} icon="📊">Modified Mediterranean — High Protein</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, marginBottom: 24 }}>
        {macros.map(m => (
          <Card key={m.l} style={{ textAlign: "center", padding: "12px 8px" }}>
            <div style={{ fontSize: 11, color: p.textDim, textTransform: "uppercase", letterSpacing: 1 }}>{m.l}</div>
            <div style={{ fontSize: 14, color: p.text, fontWeight: 700, marginTop: 4 }}>{m.v}</div>
          </Card>
        ))}
      </div>
      <SectionHeader color={p.blue} icon="🍽️">Daily Meals</SectionHeader>
      {meals.map((meal, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: p.text }}>{meal.name}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <Badge color={p.amber} bg={p.amberDim}>{meal.time}</Badge>
              <Badge color={p.blue} bg={p.blueDim}>{meal.cal} cal</Badge>
              <Badge color={p.green} bg={p.greenDim}>{meal.pro} pro</Badge>
            </div>
          </div>
          {meal.items.map((item, j) => (<div key={j} style={{ fontSize: 12, color: p.textSoft, paddingLeft: 10, marginBottom: 2 }}>· {item}</div>))}
        </Card>
      ))}
      <Card style={{ marginTop: 16, borderColor: p.amber + "33" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: p.amber, marginBottom: 4 }}>🍝 Pasta Protocol</div>
        <div style={{ fontSize: 12, color: p.textSoft, lineHeight: 1.6 }}>1-2x/week max. High-protein pasta (Banza, Barilla Protein+). Lean protein + olive oil sauce. 2 oz dry.</div>
      </Card>
    </div>
  );
}

function FitnessTab() {
  const [sel, setSel] = useState(0);
  const dayColors = [p.green, p.blue, p.amber, p.purple, p.rose, p.green, p.textDim];
  const d = fitnessSchedule[sel];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {fitnessSchedule.map((dd, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            background: sel === i ? dayColors[i] + "18" : p.surface,
            border: `1px solid ${sel === i ? dayColors[i] : p.border}`,
            borderRadius: 8, padding: "8px 14px",
            color: sel === i ? dayColors[i] : p.textSoft,
            fontSize: 13, fontWeight: sel === i ? 700 : 400, cursor: "pointer", fontFamily: font,
          }}>{dd.day}</button>
        ))}
      </div>
      <Card style={{ borderColor: dayColors[sel] + "33" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: p.text }}>{d.day} — {d.focus}</div>
            <div style={{ fontSize: 13, color: p.textSoft, marginTop: 2 }}>AM: {d.am} · PM: {d.pm}</div>
          </div>
          {d.hormone && <Badge color={p.amber} bg={p.amberDim}>{d.hormone}</Badge>}
        </div>
        {d.details.map((item, j) => (
          <div key={j} style={{ background: p.surfaceAlt, border: `1px solid ${p.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, color: p.text, marginBottom: 4 }}>{item}</div>
        ))}
      </Card>
      <SectionHeader color={p.textSoft} icon="📊">Weekly Summary</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 8 }}>
        {[{ l: "Lifts", v: "5x", c: p.rose }, { l: "Yoga/Pilates", v: "2x", c: p.purple }, { l: "Walks", v: "5-6x", c: p.blue }, { l: "Massage", v: "1-2x", c: p.amber }, { l: "IR Sauna", v: "1x", c: p.rose }, { l: "Rest", v: "1-2", c: p.textDim }].map(s => (
          <Card key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 11, color: p.textSoft, marginTop: 2 }}>{s.l}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RecoveryTab() {
  const stretches = [
    { name: "Hip Flexor Stretch", hold: "60s each", area: "Hips" },
    { name: "Pigeon Pose", hold: "60s each", area: "Glutes" },
    { name: "Cat-Cow", hold: "10 reps", area: "Spine" },
    { name: "World's Greatest Stretch", hold: "5 each", area: "Full Body" },
    { name: "Thoracic Rotation", hold: "10 each", area: "Upper Back" },
    { name: "Hamstring Stretch", hold: "60s each", area: "Hamstrings" },
    { name: "Child's Pose + Thread Needle", hold: "30s each", area: "Shoulders" },
    { name: "Couch Stretch", hold: "60s each", area: "Quads" },
    { name: "90/90 Hip Switch", hold: "10 reps", area: "Hip Mobility" },
    { name: "Band Pull-Aparts", hold: "2×15", area: "Posture" },
  ];
  return (
    <div>
      <SectionHeader color={p.green} icon="📅">Daily Non-Negotiables</SectionHeader>
      {["Morning stretch & mobility — 15 min", "Foam rolling — 10-15 min post-workout", "Hydration — 1 gallon + electrolytes", "Post-workout protein within 30 min", "Sleep 7.5-8 hrs"].map((item, i) => (
        <div key={i} style={{ fontSize: 13, color: p.textSoft, padding: "8px 0 8px 14px", borderLeft: `2px solid ${p.green}`, marginBottom: 4 }}>{item}</div>
      ))}
      <SectionHeader color={p.blue} icon="🗓">Weekly</SectionHeader>
      {["Deep tissue massage — 1-2x (Sat primary)", "IR Sauna — 30-45 min at 130-150°F (Sat)", "Yoga/Pilates — 2x (Tue/Thu PM)", "Outdoor walk — 5-6x, 30-45 min"].map((item, i) => (
        <div key={i} style={{ fontSize: 13, color: p.textSoft, padding: "8px 0 8px 14px", borderLeft: `2px solid ${p.blue}`, marginBottom: 4 }}>{item}</div>
      ))}
      <SectionHeader color={p.amber} icon="📆">Monthly</SectionHeader>
      {["Cryo / Cold Plunge — 1-2x/month", "Deload week every 4-6 weeks (-40-50% volume)", "Body comp reassessment"].map((item, i) => (
        <div key={i} style={{ fontSize: 13, color: p.textSoft, padding: "8px 0 8px 14px", borderLeft: `2px solid ${p.amber}`, marginBottom: 4 }}>{item}</div>
      ))}
      <SectionHeader color={p.purple} icon="🧘">Stretch Routine (~15 min)</SectionHeader>
      {stretches.map((s, i) => (
        <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, padding: "8px 14px" }}>
          <div>
            <span style={{ fontSize: 13, color: p.text, fontWeight: 500 }}>{s.name}</span>
            <span style={{ fontSize: 11, color: p.textDim, marginLeft: 8 }}>{s.area}</span>
          </div>
          <Badge color={p.purple} bg={p.purpleDim}>{s.hold}</Badge>
        </Card>
      ))}
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function WellnessProtocol() {
  const [tab, setTab] = useState("schedule");
  const morningBlocks = dailySchedule.filter((_, i) => i < 7);
  const eveningBlocks = dailySchedule.filter((_, i) => i >= 7);

  const renderTab = () => {
    switch (tab) {
      case "schedule": return <FullScheduleTab />;
      case "morning": return <><p style={{ fontSize: 13, color: p.textSoft, marginBottom: 20 }}>6:00 AM – 9:30 AM: Wake → stretch → skincare → supps → lift → post-workout.</p><TimeBlockTab blocks={morningBlocks} /></>;
      case "evening": return <><p style={{ fontSize: 13, color: p.textSoft, marginBottom: 20 }}>12:30 PM – 10:00 PM: Lunch → walk → class → dinner → hormones → skincare → sleep.</p><TimeBlockTab blocks={eveningBlocks} /></>;
      case "hormones": return <HormoneTab />;
      case "peptides": return <PeptideTab />;
      case "supplements": return <SupplementTab />;
      case "diet": return <DietTab />;
      case "fitness": return <FitnessTab />;
      case "recovery": return <RecoveryTab />;
      default: return null;
    }
  };

  return (
    <div style={{ background: p.bg, minHeight: "100vh", color: p.text, fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ background: p.surface, borderBottom: `1px solid ${p.border}`, padding: "20px 20px 0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 2 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: p.text, margin: 0, letterSpacing: "-0.5px" }}>Daily Wellness Protocol</h1>
            <span style={{ fontSize: 11, color: p.textDim, fontFamily: mono }}>v2.0</span>
          </div>
          <p style={{ fontSize: 12, color: p.textSoft, margin: "4px 0 14px" }}>Hormones · Peptides · Supplements · Skincare · Training · Nutrition · Recovery · Sleep</p>
          <div style={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 0 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? p.greenDim : "transparent",
                color: tab === t.id ? p.green : p.textSoft,
                border: "none",
                borderBottom: tab === t.id ? `2px solid ${p.green}` : "2px solid transparent",
                padding: "8px 12px", fontSize: 12, fontWeight: tab === t.id ? 700 : 500,
                cursor: "pointer", whiteSpace: "nowrap", fontFamily: font,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: 13 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 20px 60px" }}>{renderTab()}</div>
      <div style={{ background: p.surface, borderTop: `1px solid ${p.border}`, padding: "14px 20px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: p.textDim, margin: 0, maxWidth: 700, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Not medical advice. Requires supervision by Dr. Padilla or healthcare provider. Peptides are not FDA-approved.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";

const CAT = {
  sleep: { label: "Sleep", icon: "🌙" },
  fitness: { label: "Fitness", icon: "💪" },
  recovery: { label: "Recovery", icon: "🧊" },
  job: { label: "Job Search", icon: "🎯" },
  heloc: { label: "HELOC", icon: "🏠" },
  legal: { label: "Legal/BoA", icon: "⚖️" },
  health: { label: "Health/Benefits", icon: "🩺" },
  admin: { label: "Admin/Claims", icon: "📋" },
  wellness: { label: "Wellness", icon: "🧘" },
  personal: { label: "Personal", icon: "☀️" },
};

const CC = {
  sleep:"#818cf8",fitness:"#34d399",recovery:"#67e8f9",job:"#fbbf24",heloc:"#f87171",
  legal:"#fb923c",health:"#22d3ee",admin:"#f472b6",wellness:"#a78bfa",personal:"#a1a1aa"
};

const DAYS = [
  // ═══════════════════════════════════════════
  // WEEK 1 — RAMP UP + TRIAGE (Feb 18-23)
  // ═══════════════════════════════════════════
  {
    date: "Wed, Feb 18", week: 1, tag: "🟢 Ramp-Up Day",
    theme: "Ease in. Light morning. Get organized. Frances Augustine call at 10:30. No heavy lift today.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — open blinds, sunlight within 10 min, hydrate (water + electrolytes)" },
      { t: "7:15", cat: "wellness", task: "5 min meditation + gratitude journal (3 things)" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min) — ease in: hips, hamstrings, thoracic spine, shoulders" },
      { t: "8:00", cat: "fitness", task: "Light outdoor walk (30 min) — get moving, fresh air, vitamin D" },
      { t: "8:45", cat: "personal", task: "Breakfast + coffee (clean — eggs, avocado, greens). No caffeine after 1 PM starts today" },
      { t: "9:30", cat: "personal", task: "Plan the next 3 weeks: Review this schedule, write top 3 priorities for Thu-Sun" },
      { t: "10:30", cat: "job", task: "📞 Meeting: Frances Augustine (10:30-11:00 AM — Teams)" },
      { t: "11:00", cat: "health", task: "Benefits audit: Log into JPMC portal — check MRA balance, FSA balance, legal plan status" },
      { t: "11:45", cat: "health", task: "MRA spending: Research eligible items — blue light glasses, fitness tracker, supplements" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "heloc", task: "HELOC prep: Gather all docs — pay stubs, W-2, bank statements, mortgage statement, insurance" },
      { t: "2:30", cat: "legal", task: "BoA case: Locate existing attorney list (~10). Review 1-page case summary" },
      { t: "3:15", cat: "fitness", task: "Outdoor walk (30 min) — afternoon reset" },
      { t: "4:00", cat: "job", task: "Job search prep: Review/update resume (AI Strategy & Transformation positioning)" },
      { t: "5:00", cat: "personal", task: "Free time — ease into the routine" },
      { t: "6:30", cat: "personal", task: "Dinner" },
      { t: "7:30", cat: "personal", task: "Free time — relax, decompress" },
      { t: "10:00", cat: "sleep", task: "Wind down: dim all lights, phone DND, no screens" },
      { t: "10:30", cat: "sleep", task: "Skincare → read or journal" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Feb 19", week: 1, tag: "HELOC Sprint + Legal",
    theme: "Get all HELOC applications submitted. Send attorney intake emails. First heavy lift.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts, hip thrusts, leg press (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "heloc", task: "Deep work block 1: Apply to Figure + SoFi HELOCs. Upload all docs" },
      { t: "11:30", cat: "heloc", task: "Apply to credit unions: Alliant / PenFed / Connexus" },
      { t: "12:15", cat: "heloc", task: "Greg escalation follow-up (Bank of America HELOC)" },
      { t: "12:45", cat: "personal", task: "Lunch" },
      { t: "1:30", cat: "legal", task: "Deep work block 2: Draft + send intake emails to all ~10 attorneys (statutory/treble-damage hook)" },
      { t: "3:00", cat: "legal", task: "Finalize 1-page case summary for attorney requests" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:15", cat: "job", task: "Job search: 3-5 quality apps — CAO, CDO, SVP (ExecThread, Ladders, LinkedIn)" },
      { t: "5:30", cat: "fitness", task: "🧘 ClassPass: Evening yoga (Black Swan Yoga or Ritual One)" },
      { t: "6:45", cat: "personal", task: "Dinner" },
      { t: "7:45", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Feb 20", week: 1, tag: "Physical + Job Search",
    theme: "Physical + blood work at 10 AM. Light morning. Afternoon: job search + close loops.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min) — gentle, recovery-focused" },
      { t: "8:00", cat: "fitness", task: "Light outdoor walk (30 min) — easy before blood work" },
      { t: "8:45", cat: "personal", task: "Light breakfast (check if fasting required for blood draw)" },
      { t: "10:00", cat: "health", task: "🏥 Physical + Blood Work appointment (FIXED)" },
      { t: "11:30", cat: "job", task: "Recruiter outreach: 3 executive search firms (Heidrick & Struggles, Korn Ferry, Spencer Stuart)" },
      { t: "12:15", cat: "job", task: "Job search: 3-5 quality applications, tailored to each role" },
      { t: "1:00 PM", cat: "personal", task: "Lunch" },
      { t: "1:45", cat: "job", task: "LinkedIn: 5 connection requests to targets + engage with 5 posts" },
      { t: "2:30", cat: "health", task: "Call to schedule remaining medical appts: dentist, dermatology, eye exam" },
      { t: "3:15", cat: "heloc", task: "Check HELOC lender responses. Upload additional docs if requested" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:45", cat: "admin", task: "Admin block: GEICO claim follow-up + Tempur-Pedic warranty complaint" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Reward night — go out, socialize, enjoy Dallas" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Feb 21", week: 1, tag: "Recovery + Life Admin",
    theme: "Massage + IR sauna. Recharge. House tasks + meal prep.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up naturally (by 8:00)" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended morning stretch (20-30 min) — deep stretching, foam rolling, mobility" },
      { t: "9:15", cat: "personal", task: "Breakfast + coffee" },
      { t: "10:00", cat: "recovery", task: "💆 Massage appointment (60-90 min)" },
      { t: "11:30", cat: "fitness", task: "Outdoor: long walk, bike ride, or hike (60-90 min)" },
      { t: "1:00 PM", cat: "personal", task: "Lunch" },
      { t: "1:45", cat: "personal", task: "House: clean, laundry, organize, lawn/garden" },
      { t: "3:15", cat: "personal", task: "Grocery shopping + meal prep for the week" },
      { t: "5:00", cat: "recovery", task: "🧖 IR sauna session (30-45 min)" },
      { t: "6:00", cat: "personal", task: "Free time — hobbies, Legos, cooking, photography" },
      { t: "7:30", cat: "personal", task: "Social: dinner out, date (Raya), or friends" },
      { t: "10:30", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sun, Feb 22", week: 1, tag: "Week 1 Review + Reset",
    theme: "Review what got done. Plan Week 2 priorities. Optional 2nd massage.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min) — yoga-style flow, deep hip openers" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Week 2 planning: Review Week 1, set daily priorities for Mon-Sun" },
      { t: "11:00", cat: "heloc", task: "HELOC status: Update comparison table. Front-runner? Laggards to drop?" },
      { t: "11:45", cat: "legal", task: "BoA: Attorney pipeline status. Any responses? Evidence prep if needed" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Review all Week 1 applications — flag anything needing follow-up" },
      { t: "2:00", cat: "recovery", task: "💆 Optional 2nd massage (or free time / rest)" },
      { t: "3:30", cat: "personal", task: "Free time — protect energy for the week" },
      { t: "5:00", cat: "fitness", task: "Gym: Upper body — moderate weight, pump session (60 min)" },
      { t: "6:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "7:00", cat: "personal", task: "Dinner + meal prep if needed" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },

  // ═══════════════════════════════════════════
  // WEEK 2 — FULL EXECUTION (Feb 23-Mar 1)
  // ═══════════════════════════════════════════
  {
    date: "Mon, Feb 23", week: 2, tag: "Job Search Offensive",
    theme: "Big push. Applications, recruiter follow-ups, LinkedIn visibility.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB press, lateral raises (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Deep work: Apply to 5 roles — CAO, CDO, SVP at top targets" },
      { t: "12:00", cat: "job", task: "Follow up with all Week 1 recruiters. Send pipeline updates" },
      { t: "12:45", cat: "personal", task: "Lunch" },
      { t: "1:30", cat: "job", task: "LinkedIn: Post thought leadership piece + engage with 10 posts" },
      { t: "2:30", cat: "job", task: "Network: 5 new contacts — AI leaders, VPs, board-level connections" },
      { t: "3:15", cat: "heloc", task: "HELOC: Push all active lenders for decisions. Drop non-performers" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "5:00", cat: "legal", task: "BoA: Attorney follow-ups (~5 biz days since outreach)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Feb 24", week: 2, tag: "HELOC Decisions + Health",
    theme: "Force HELOC decisions. Health benefits push. Evening yoga.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — barbell rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "heloc", task: "Deep work: Compare all HELOC offers. Push lagging lenders for answers" },
      { t: "11:30", cat: "heloc", task: "Employment verification strategy — ensure all verify before March 19" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00 PM", cat: "health", task: "COBRA costs vs. marketplace insurance — finalize comparison" },
      { t: "1:45", cat: "health", task: "Refill all prescriptions — 90-day supplies while insurance active" },
      { t: "2:30", cat: "job", task: "3 quality applications" },
      { t: "3:15", cat: "admin", task: "Admin block: Ring alarm complaint + Wix follow-up" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga (Black Swan Yoga or O2 Studio)" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Feb 25", week: 2, tag: "Networking Event Night",
    theme: "PolyAI VIP Event tonight at Fogo de Chão. Prep + network.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Legs + core — front squats, RDLs, lunges, planks (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "PolyAI prep: Research attendees, talking points, business cards" },
      { t: "11:30", cat: "job", task: "Apply to 3 roles" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "legal", task: "BoA: Status — attorney responses? CFPB rebuttal progress?" },
      { t: "2:00", cat: "health", task: "Medical appointment (dentist/derm/eye if scheduled)" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min) — clear head before event" },
      { t: "4:15", cat: "personal", task: "Get ready for PolyAI — dress sharp" },
      { t: "5:30", cat: "personal", task: "Light early dinner" },
      { t: "6:00", cat: "job", task: "🎯 PolyAI VIP Event — Voice AI & CX Innovation @ Fogo de Chão Plano (6:30 PM)" },
      { t: "9:30", cat: "sleep", task: "Home — wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Feb 26", week: 2, tag: "Follow-Up + Benefits",
    theme: "PolyAI follow-ups. Benefits push hard. Evening Pilates.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, dips (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "PolyAI follow-up: LinkedIn connections + personalized messages" },
      { t: "10:45", cat: "job", task: "Apply to 3-5 roles" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "health", task: "Benefits audit: What's left before March 19? MRA, FSA, legal plan" },
      { t: "1:30", cat: "health", task: "Call Empower: Document 401(k) forfeiture amount in writing" },
      { t: "2:15", cat: "health", task: "Follow up: JPMC severance team — 401(k) match + bonus discrepancy" },
      { t: "3:00", cat: "health", task: "Download JPMC documents: pay stubs, W-2s, reviews, 401(k), certs" },
      { t: "3:45", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening Pilates (Align Studio, SculptHouse, or [solidcore])" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Feb 27", week: 2, tag: "Light Day — Interviews + Workout",
    theme: "Keep it light. Gym, Goldman Sachs & RealPage interviews, walk, TRT regime starts.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body — compound lifts, moderate weight (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Interview prep — review Goldman Sachs & RealPage roles, talking points" },
      { t: "11:00", cat: "job", task: "📞 Interview: Goldman Sachs" },
      { t: "12:00", cat: "personal", task: "Lunch + decompress between interviews" },
      { t: "1:00 PM", cat: "job", task: "📞 Interview: RealPage" },
      { t: "2:00", cat: "personal", task: "Post-interview notes — capture key takeaways, follow-up items" },
      { t: "3:00", cat: "fitness", task: "Outdoor walk (30-45 min) — clear head, fresh air" },
      { t: "4:00", cat: "health", task: "💉 TRT: Note — hCG + Anastrozole 1 mg done yesterday (Thu Feb 26). Next: hCG Sun Mar 1" },
      { t: "4:30", cat: "personal", task: "Free time — keep it light" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — relax, reward yourself" },
      { t: "10:00", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Feb 28", week: 2, tag: "Recovery Day",
    theme: "Massage + IR sauna. House + meal prep. Social.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up naturally (by 8:00)" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min) — foam rolling, deep mobility" },
      { t: "9:15", cat: "personal", task: "Breakfast + coffee" },
      { t: "10:00", cat: "recovery", task: "💆 Massage (60-90 min)" },
      { t: "11:30", cat: "fitness", task: "Outdoor: cycling, hike, or long walk (60-90 min)" },
      { t: "1:00 PM", cat: "personal", task: "Lunch" },
      { t: "1:45", cat: "personal", task: "House: clean, laundry, organize" },
      { t: "3:15", cat: "personal", task: "Grocery shopping + meal prep" },
      { t: "5:00", cat: "recovery", task: "🧖 IR sauna (30-45 min)" },
      { t: "6:00", cat: "personal", task: "Free time — hobbies, Legos, camera, cooking" },
      { t: "7:30", cat: "personal", task: "Social: dinner out, friends, date" },
      { t: "10:30", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sun, Mar 1", week: 2, tag: "Week 2 Review + Plan",
    theme: "Review progress. Plan Week 3 — the final March 19 push. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min) — yoga flow" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Week 3 planning: Map final 18 days to March 19. What's left?" },
      { t: "11:00", cat: "job", task: "Full pipeline review — adjust strategy based on 2 weeks of data" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "heloc", task: "HELOC: Final assessment — close or abandon stragglers" },
      { t: "1:30", cat: "legal", task: "BoA: Attorney status + CFPB rebuttal finalization" },
      { t: "2:30", cat: "recovery", task: "💆 Optional 2nd massage (or rest)" },
      { t: "4:00", cat: "fitness", task: "Gym: Upper body (60 min)" },
      { t: "5:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — prep for the week" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },

  // ═══════════════════════════════════════════
  // WEEK 3 — CLOSE + ACCELERATE (Mar 2-8)
  // ═══════════════════════════════════════════
  {
    date: "Mon, Mar 2", week: 3, tag: "Job Search Acceleration",
    theme: "Ramp job search to max. 11 days to March 19. TRT: Testosterone injection today.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: Testosterone injection (Week 1)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts, hip thrusts (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Deep work: Apply to 5+ roles. Expand targets if needed" },
      { t: "12:00", cat: "job", task: "Cold outreach: 5 hiring managers or VPs at new target companies" },
      { t: "12:45", cat: "personal", task: "Lunch" },
      { t: "1:30", cat: "job", task: "LinkedIn: New thought leadership post + engage with 10 posts" },
      { t: "2:30", cat: "job", task: "Follow up on ALL pending recruiter conversations" },
      { t: "3:15", cat: "heloc", task: "HELOC: Final push — where are we? Decision needed" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "5:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "legal", task: "BoA: Next steps with engaged attorney or expand search" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Mar 3", week: 3, tag: "Benefits Final Push",
    theme: "Last big benefits sweep. Evening yoga.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "health", task: "Benefits final push: Confirm all medical appts before March 19" },
      { t: "10:45", cat: "health", task: "MRA/FSA: Spend remaining balances on eligible items" },
      { t: "11:30", cat: "health", task: "Hyatt Legal Plan: Final consult if not done" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00 PM", cat: "job", task: "Apply to 3-5 roles" },
      { t: "2:30", cat: "job", task: "Interview prep for any scheduled calls" },
      { t: "3:15", cat: "admin", task: "Admin: Final consumer claims sweep (anything remaining)" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Mar 4", week: 3, tag: "Deep Job Search",
    theme: "Research, outreach, applications. Keep HELOC/legal on track.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Deep work: Research 5 new target companies. Map hiring landscape" },
      { t: "11:30", cat: "job", task: "Apply to 5 roles" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Cold outreach: 5 more contacts at target companies" },
      { t: "2:00", cat: "heloc", task: "HELOC: Status check. Employment verification window closing" },
      { t: "2:45", cat: "legal", task: "BoA: Push attorney engagement. File CFPB rebuttal if ready" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:15", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Mar 5", week: 3, tag: "Networking + Pilates",
    theme: "Network hard. Interview prep. Evening Pilates. TRT: hCG + Anastrozole today.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: hCG injection + Anastrozole 1 mg" },
      { t: "8:00", cat: "fitness", task: "Gym: Legs + core — front squats, RDLs, lunges, planks (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Network: Reach out to 5-10 contacts. Follow up on all warm leads" },
      { t: "11:30", cat: "job", task: "Apply to 3-5 roles" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Interview prep: Practice stories, update STAR examples, refine pitch" },
      { t: "2:30", cat: "job", task: "LinkedIn: Engage with 10+ posts. Stay visible" },
      { t: "3:15", cat: "health", task: "Confirm all remaining medical appointments before March 19" },
      { t: "3:45", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening Pilates (Align, SculptHouse, Class Studios)" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Mar 6", week: 3, tag: "Week 3 Wrap-Up",
    theme: "Close loops. Full pipeline review. Plan final March 19 sprint.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "3-week pipeline review: Total apps, interviews, pipeline, strategy adjustment" },
      { t: "11:00", cat: "heloc", task: "HELOC: Final status — what's closing? What's dead?" },
      { t: "11:45", cat: "legal", task: "BoA: Attorney engagement status. CFPB rebuttal filed?" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "health", task: "Final benefits check: Anything left to use before March 19?" },
      { t: "2:00", cat: "admin", task: "Download any remaining JPMC docs. LinkedIn recommendations requested?" },
      { t: "2:45", cat: "job", task: "Plan final 13 days of job search strategy" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "4:30", cat: "personal", task: "Free time" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Reward night — out, date, social" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Mar 7", week: 3, tag: "Recovery Day",
    theme: "Massage + IR sauna. House + prep. Social.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up naturally (by 8:00)" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast + coffee" },
      { t: "10:00", cat: "recovery", task: "💆 Massage (60-90 min)" },
      { t: "11:30", cat: "fitness", task: "Outdoor: cycling, hike, or long walk (60-90 min)" },
      { t: "1:00 PM", cat: "personal", task: "Lunch" },
      { t: "1:45", cat: "personal", task: "House: clean, laundry, organize" },
      { t: "3:15", cat: "personal", task: "Grocery + meal prep" },
      { t: "5:00", cat: "recovery", task: "🧖 IR sauna (30-45 min)" },
      { t: "6:00", cat: "personal", task: "Free time" },
      { t: "7:30", cat: "personal", task: "Social: dinner, friends, date" },
      { t: "10:30", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sun, Mar 8", week: 3, tag: "Final Push Planning",
    theme: "11 days to March 19. Lock in the plan. Optional 2nd massage. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Final sprint planning: March 9-19 priorities + unemployment filing prep" },
      { t: "11:00", cat: "job", task: "Pipeline review — interviews? Offers? What needs acceleration?" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "heloc", task: "HELOC: Closing timeline confirmed?" },
      { t: "1:30", cat: "legal", task: "BoA: Final strategy check with attorney" },
      { t: "2:30", cat: "recovery", task: "💆 Optional 2nd massage (or rest)" },
      { t: "4:00", cat: "fitness", task: "Gym: Upper body (60 min)" },
      { t: "5:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — recharge for the final sprint" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
];

const SLEEP_RULES = [
  { icon: "⏰", rule: "Wake at 7:00 AM weekdays, 8:00 AM weekends — no snooze" },
  { icon: "☀️", rule: "Sunlight within 10 min of waking — open blinds or step outside" },
  { icon: "☕", rule: "No caffeine after 1:00 PM" },
  { icon: "📵", rule: "No screens after 10:00 PM — phone on Do Not Disturb" },
  { icon: "💡", rule: "Dim all lights at 10 PM — warm/amber only" },
  { icon: "❄️", rule: "Bedroom: 65-68°F, blackout dark, quiet" },
  { icon: "📖", rule: "Wind-down: skincare → read or journal → lights out 11:00 PM" },
  { icon: "🎯", rule: "Target: 8 hours every night (11 PM → 7 AM)" },
];

const WEEKLY_TEMPLATE = [
  { d: "Mon", am: "Stretch → Heavy legs/push (gym)", pm: "Outdoor walk + deep work" },
  { d: "Tue", am: "Stretch → Heavy pull/push (gym)", pm: "Walk → ClassPass yoga/Pilates 5-6 PM" },
  { d: "Wed", am: "Stretch → Heavy pull/legs (gym)", pm: "Outdoor walk + free time" },
  { d: "Thu", am: "Stretch → Legs + core (gym)", pm: "Walk → ClassPass yoga/Pilates 5-6 PM" },
  { d: "Fri", am: "Stretch → Full body (gym)", pm: "Outdoor walk + reward night" },
  { d: "Sat", am: "Extended stretch → 💆 Massage", pm: "Outdoor cardio → 🧖 IR sauna" },
  { d: "Sun", am: "Extended stretch → Planning", pm: "Gym upper → optional 💆 2nd massage" },
];

const RECOVERY_STACK = [
  { icon: "🧘", title: "Daily Stretch (every morning)", desc: "15-20 min weekdays, 20-30 min weekends. Hips, hamstrings, thoracic spine, shoulders" },
  { icon: "💆", title: "Massage (1-2x/week — Sat + optional Sun)", desc: "60-90 min. Sports or deep tissue. Book through ClassPass or local therapist" },
  { icon: "🧖", title: "IR Sauna (1x/week — Saturday PM)", desc: "30-45 min after outdoor cardio. Pair with cold plunge if available" },
  { icon: "🚶", title: "Daily Walk (30-45 min — every afternoon)", desc: "Between deep work blocks. Cardio + mental reset + vitamin D" },
];

const CP = [
  { type: "Yoga (Tue/Thu 5-6 PM)", studios: "Black Swan Yoga (heated), Ritual One, O2 Studio, Soul Friends" },
  { type: "Pilates/Lagree (Tue/Thu 5-6 PM)", studios: "Align Studio (infrared), SculptHouse, [solidcore], Class Studios" },
  { type: "Recovery/Sauna", studios: "TruFusion, local recovery clinics with IR sauna + cryo" },
];

const MAR19 = [
  { c: "health", t: "Physical + blood work (Fri Feb 20 @ 10 AM)" },
  { c: "health", t: "Schedule dentist" }, { c: "health", t: "Schedule dermatology" }, { c: "health", t: "Schedule eye exam" },
  { c: "health", t: "Refill prescriptions — 90-day supplies" },
  { c: "health", t: "MRA balance — spend on eligible health items" },
  { c: "health", t: "FSA balance — stock up on OTC" },
  { c: "health", t: "COBRA details + marketplace quotes" },
  { c: "admin", t: "Download JPMC docs: pay stubs, W-2s, reviews, 401(k)" },
  { c: "admin", t: "Book Hyatt Legal Plan consultation(s)" },
  { c: "admin", t: "Call Empower — 401(k) forfeiture in writing" },
  { c: "admin", t: "Severance team: bonus discrepancy ($5K)" },
  { c: "admin", t: "Complete JPMC learning/certifications" },
  { c: "admin", t: "Request 3-5 LinkedIn recommendations" },
  { c: "admin", t: "File unemployment March 19 or 20" },
];

const RULES = [
  "Max 2 deep-work blocks/day (60-90 min each)",
  "Max 1 admin block/day (30-45 min)",
  "One major theme per day — check the tag",
  "Job search every weekday, no exceptions",
  "Stop when the block ends — no overrun",
  "No catch-up mentality — execute today's plan",
  "Morning stretch daily — non-negotiable",
  "Heavy lift 5x/week (Mon-Fri mornings)",
  "ClassPass 2x/week (Tue + Thu 5-6 PM)",
  "Outdoor walk daily — minimum 30 min (afternoon)",
  "Massage 1-2x/week (weekends)",
  "IR sauna 1x/week (Saturday PM)",
];

const SUCCESS = [
  "Multiple HELOCs active with a clear front-runner",
  "Attorney pipeline opened and responses in hand",
  "All health appointments scheduled or completed",
  "Benefits fully leveraged before March 19",
  "40+ job applications, 5+ recruiter conversations",
  "Sleep locked: 8 hrs/night (11 PM → 7 AM)",
  "Lifting 5x/week + 2 ClassPass classes established",
  "Daily stretch + weekly massage/sauna habit built",
  "No loose admin anxiety loops",
];

export default function App() {
  const [week,setWeek]=useState(1);
  const [dayIdx,setDayIdx]=useState(0);
  const [tab,setTab]=useState("schedule");
  const [checks,setChecks]=useState({});
  const [tasks,setTasks]=useState({});

  const wDays=DAYS.filter(d=>d.week===week);
  const day=wDays[dayIdx]||wDays[0];
  const tog=(ns,k)=>ns==="t"?setTasks(p=>({...p,[k]:!p[k]})):setChecks(p=>({...p,[k]:!p[k]}));
  const done=day.blocks.filter((_,i)=>tasks[`${week}-${dayIdx}-${i}`]).length;
  const pct=day.blocks.length?Math.round((done/day.blocks.length)*100):0;

  const S={
    root:{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#0c0d14",minHeight:"100vh",color:"#e4e4e7"},
    card:{background:"#13141e",border:"1px solid #1e2030",borderRadius:10,padding:"12px 14px"},
  };

  return(
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      <div style={{background:"linear-gradient(160deg,#151729 0%,#0c0d14 70%)",borderBottom:"1px solid #1e2030",padding:"18px 20px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <h1 style={{fontSize:20,fontWeight:700,margin:0,color:"#f4f4f5",letterSpacing:-0.5}}>3-Week Battle Plan</h1>
            <p style={{margin:"3px 0 0",fontSize:12,color:"#52525b"}}>Feb 18 – Mar 8&nbsp;&nbsp;·&nbsp;&nbsp;29 days to March 19</p>
          </div>
          {tab==="schedule"&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"#52525b",textTransform:"uppercase",letterSpacing:1}}>Done</div>
              <div style={{fontSize:22,fontWeight:700,color:pct>=75?"#34d399":pct>=40?"#fbbf24":"#6366f1"}}>{pct}%</div>
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:3,marginTop:12,overflowX:"auto",paddingBottom:2}}>
          {[{id:"schedule",l:"Schedule"},{id:"sleep",l:"Sleep"},{id:"fitness",l:"Fitness"},{id:"checklist",l:"Mar 19"},{id:"rules",l:"Rules"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"5px 11px",fontSize:11,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",
              background:tab===t.id?"#6366f1":"transparent",color:tab===t.id?"#fff":"#71717a",whiteSpace:"nowrap"
            }}>{t.l}</button>
          ))}
        </div>

        {tab==="schedule"&&(
          <div style={{marginTop:10}}>
            <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap"}}>
              {[1,2,3].map(w=>(
                <button key={w} onClick={()=>{setWeek(w);setDayIdx(0)}} style={{
                  padding:"4px 10px",fontSize:10,fontWeight:600,borderRadius:5,border:"none",cursor:"pointer",
                  background:week===w?"#3b82f6":"#1a1b28",color:week===w?"#fff":"#71717a"
                }}>{w===1?"Wk 1: Ramp Up":w===2?"Wk 2: Execute":"Wk 3: Accelerate"}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:3,overflowX:"auto"}}>
              {wDays.map((d,i)=>{
                const dd=d.blocks.filter((_,j)=>tasks[`${week}-${i}-${j}`]).length;
                const dp=Math.round((dd/d.blocks.length)*100);
                return(
                  <button key={i} onClick={()=>setDayIdx(i)} style={{
                    padding:"5px 9px",fontSize:10,fontWeight:600,borderRadius:5,border:"none",cursor:"pointer",textAlign:"center",
                    background:dayIdx===i?"#1e2030":"transparent",color:dayIdx===i?"#f4f4f5":"#52525b",minWidth:50
                  }}>
                    {d.date.split(",")[0]}<br/>
                    <span style={{fontSize:9,fontWeight:400}}>{d.date.split(", ")[1]}</span>
                    {dp>0&&<div style={{width:4,height:4,borderRadius:2,background:dp>=100?"#34d399":"#6366f1",margin:"3px auto 0"}}/>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{padding:"14px 16px 80px",maxWidth:640,margin:"0 auto"}}>

        {tab==="schedule"&&(
          <div>
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontSize:16,fontWeight:700}}>{day.date}</span>
                <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:4,background:day.tag.includes("Ramp")?"#16a34a":"#6366f1",color:"#fff"}}>{day.tag}</span>
              </div>
              <p style={{fontSize:12,color:"#71717a",margin:0,fontStyle:"italic"}}>{day.theme}</p>
              <div style={{marginTop:6,height:3,background:"#1a1b28",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct>=75?"#34d399":"#6366f1",borderRadius:3,transition:"width 0.2s"}}/>
              </div>
              <div style={{fontSize:10,color:"#52525b",marginTop:3}}>{done}/{day.blocks.length} completed</div>
            </div>
            {day.blocks.map((b,i)=>{
              const k=`${week}-${dayIdx}-${i}`;const chk=tasks[k];const col=CC[b.cat];
              return(
                <div key={i} onClick={()=>tog("t",k)} style={{
                  ...S.card,display:"flex",gap:10,marginBottom:5,cursor:"pointer",
                  opacity:chk?0.5:1,borderColor:chk?"#14532d":"#1e2030",background:chk?"#0f1a0f":"#13141e"
                }}>
                  <div style={{minWidth:55,fontSize:11,color:"#52525b",fontWeight:500,paddingTop:1}}>{b.t}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                      <span style={{fontSize:12}}>{CAT[b.cat].icon}</span>
                      <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,color:col}}>{CAT[b.cat].label}</span>
                    </div>
                    <div style={{fontSize:12.5,lineHeight:1.45,color:chk?"#4b5563":"#d4d4d8",textDecoration:chk?"line-through":"none"}}>{b.task}</div>
                  </div>
                  <div style={{
                    width:18,height:18,borderRadius:4,border:`2px solid ${chk?"#34d399":"#2e2f3e"}`,flexShrink:0,marginTop:2,
                    display:"flex",alignItems:"center",justifyContent:"center",background:chk?"#14532d":"transparent"
                  }}>{chk&&<span style={{fontSize:11,color:"#34d399"}}>✓</span>}</div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="sleep"&&(
          <div>
            <h2 style={{fontSize:17,fontWeight:700,marginBottom:3}}>🌙 Sleep Protocol</h2>
            <p style={{fontSize:12,color:"#71717a",marginBottom:14}}>8 hours. 11 PM → 7 AM. Non-negotiable foundation.</p>
            {SLEEP_RULES.map((s,i)=>(
              <div key={i} style={{...S.card,display:"flex",gap:10,alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:15}}>{s.icon}</span>
                <span style={{fontSize:12.5,lineHeight:1.5}}>{s.rule}</span>
              </div>
            ))}
            <div style={{...S.card,marginTop:14,borderColor:"#312e81",background:"#13142a"}}>
              <h3 style={{fontSize:13,fontWeight:700,color:"#818cf8",marginBottom:6,marginTop:0}}>Why This Is Priority #0</h3>
              <p style={{fontSize:12,color:"#a1a1aa",lineHeight:1.6,margin:0}}>
                Sleep multiplies everything — gym recovery, interview sharpness, decision quality on the HELOC and legal case.
                Targeting sub-200 lbs at 12% body fat requires cortisol management. Without 8 hrs, recovery tanks and discipline erodes.
              </p>
            </div>
          </div>
        )}

        {tab==="fitness"&&(
          <div>
            <h2 style={{fontSize:17,fontWeight:700,marginBottom:3}}>💪 Fitness Blueprint</h2>
            <p style={{fontSize:12,color:"#71717a",marginBottom:14}}>AM: stretch → heavy lift. PM: walk. ClassPass 2x/week evenings. Weekend recovery.</p>

            <div style={{...S.card,marginBottom:14,borderColor:"#14532d",background:"#0f1a0f"}}>
              <h3 style={{fontSize:13,fontWeight:700,color:"#34d399",marginBottom:8,marginTop:0}}>Weekly Template</h3>
              {WEEKLY_TEMPLATE.map((r,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12,lineHeight:1.5}}>
                  <span style={{fontWeight:700,color:"#d4d4d8",minWidth:32}}>{r.d}</span>
                  <div style={{flex:1}}>
                    <div><span style={{color:"#fbbf24",fontWeight:600}}>AM:</span> <span style={{color:"#a1a1aa"}}>{r.am}</span></div>
                    <div><span style={{color:"#818cf8",fontWeight:600}}>PM:</span> <span style={{color:"#a1a1aa"}}>{r.pm}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{fontSize:14,fontWeight:700,marginBottom:8}}>🧊 Recovery Stack</h3>
            {RECOVERY_STACK.map((r,i)=>(
              <div key={i} style={{...S.card,marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:16}}>{r.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#67e8f9",marginBottom:2}}>{r.title}</div>
                    <div style={{fontSize:12,color:"#a1a1aa",lineHeight:1.5}}>{r.desc}</div>
                  </div>
                </div>
              </div>
            ))}

            <h3 style={{fontSize:14,fontWeight:700,marginTop:16,marginBottom:8}}>🧘 ClassPass — Dallas (Tue + Thu 5-6 PM)</h3>
            {CP.map((r,i)=>(
              <div key={i} style={{...S.card,marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:700,color:"#a78bfa",marginBottom:3}}>{r.type}</div>
                <div style={{fontSize:12,color:"#a1a1aa",lineHeight:1.5}}>{r.studios}</div>
              </div>
            ))}
          </div>
        )}

        {tab==="checklist"&&(
          <div>
            <h2 style={{fontSize:17,fontWeight:700,marginBottom:3}}>📋 March 19 Deadline</h2>
            <p style={{fontSize:12,color:"#71717a",marginBottom:14}}>Must complete before JPMC last day. Tap to check off.</p>
            {MAR19.map((item,i)=>{
              const k=`cl-${i}`;const chk=checks[k];
              return(
                <div key={i} onClick={()=>tog("c",k)} style={{
                  ...S.card,display:"flex",gap:10,alignItems:"center",marginBottom:5,cursor:"pointer",
                  opacity:chk?0.5:1,background:chk?"#0f1a0f":"#13141e",borderColor:chk?"#14532d":"#1e2030"
                }}>
                  <div style={{
                    width:18,height:18,borderRadius:4,border:`2px solid ${chk?"#34d399":"#2e2f3e"}`,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center",background:chk?"#14532d":"transparent"
                  }}>{chk&&<span style={{fontSize:11,color:"#34d399"}}>✓</span>}</div>
                  <div style={{flex:1}}>
                    <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",color:CC[item.c]}}>{CAT[item.c].label}</span>
                    <div style={{fontSize:12.5,color:chk?"#4b5563":"#d4d4d8",textDecoration:chk?"line-through":"none",marginTop:1}}>{item.t}</div>
                  </div>
                </div>
              );
            })}
            <div style={{fontSize:11,color:"#52525b",textAlign:"center",marginTop:10}}>
              {Object.keys(checks).filter(k=>k.startsWith("cl-")&&checks[k]).length}/{MAR19.length} completed
            </div>
          </div>
        )}

        {tab==="rules"&&(
          <div>
            <h2 style={{fontSize:17,fontWeight:700,marginBottom:3}}>⚙️ Operating Rules</h2>
            <p style={{fontSize:12,color:"#71717a",marginBottom:14}}>Guard against burnout and reactive mode.</p>
            {RULES.map((r,i)=>(
              <div key={i} style={{...S.card,display:"flex",gap:10,alignItems:"center",marginBottom:5}}>
                <span style={{
                  width:22,height:22,borderRadius:11,background:"#1e2030",display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:10,fontWeight:700,color:"#71717a",flexShrink:0
                }}>{i+1}</span>
                <span style={{fontSize:12.5,lineHeight:1.5}}>{r}</span>
              </div>
            ))}
            <div style={{...S.card,marginTop:14,borderColor:"#7f1d1d",background:"#1a0f0f"}}>
              <h3 style={{fontSize:13,fontWeight:700,color:"#f87171",marginBottom:8,marginTop:0}}>Success = End of 3 Weeks</h3>
              <div style={{fontSize:12,color:"#a1a1aa",lineHeight:1.9}}>
                {SUCCESS.map((s,i)=><div key={i}>✅ {s}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

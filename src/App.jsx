import { useState, useEffect } from "react";
import WellnessProtocol from "./WellnessProtocol";

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
  // WEEK 1 — THIS WEEK (Feb 27 – Mar 2)
  // ═══════════════════════════════════════════
  {
    date: "Fri, Feb 27", week: 1, tag: "Light Day — Interviews + Workout",
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
    date: "Sat, Feb 28", week: 1, tag: "Recovery Day",
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
    date: "Sun, Mar 1", week: 1, tag: "Week Review + Plan",
    theme: "Review progress. Plan ahead. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min) — yoga flow" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Weekly planning: Review what got done, set priorities for the week" },
      { t: "11:00", cat: "job", task: "Full pipeline review — adjust strategy based on data so far" },
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
  {
    date: "Mon, Mar 2", week: 1, tag: "Interview + Doctor + Tax Pro",
    theme: "McKesson interview. Doctor + blood work. GEICO claim. HELOC decision. Hire property tax protest professional.",
    blocks: [
      { t: "6:45 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:00", cat: "health", task: "💉 TRT: Testosterone injection (Week 1)" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15 min)" },
      { t: "8:00", cat: "health", task: "🩺 Doctor: Physical + blood work" },
      { t: "9:00", cat: "admin", task: "📞 GEICO claim — call to initiate" },
      { t: "9:30", cat: "fitness", task: "Gym: Heavy legs (60 min)" },
      { t: "10:45", cat: "personal", task: "Breakfast + shower" },
      { t: "11:30", cat: "admin", task: "Email admin: check HELOC/BoA status" },
      { t: "12:30 PM", cat: "job", task: "📞 Quick Connect A&R: Jon/Brandon (Zoom)" },
      { t: "1:00", cat: "heloc", task: "HELOC + BoA BLOCK (60 min): calls, decisions, next steps" },
      { t: "2:00", cat: "job", task: "Interview prep: Full mock run (30 min)" },
      { t: "2:45", cat: "admin", task: "🧾 TAX: Research property tax protest professionals (30-45 min) — get 2-3 referrals, call Mon/Tue" },
      { t: "3:30", cat: "job", task: "📞 McKesson Interview" },
      { t: "4:30", cat: "fitness", task: "Outdoor walk (30 min) — decompress" },
      { t: "5:30", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "legal", task: "BoA: Review decisions made today + plan next moves" },
      { t: "8:00", cat: "recovery", task: "🧊 IR Sauna (60 min)" },
      { t: "9:30", cat: "sleep", task: "Wind down" },
      { t: "10:30", cat: "sleep", task: "Lights out" },
    ]
  },

  // ═══════════════════════════════════════════
  // WEEK 2 — SPRINT TO DEADLINE (Mar 3–9)
  // ═══════════════════════════════════════════
  {
    date: "Tue, Mar 3", week: 2, tag: "Recruiter + Benefits + Tax Contract",
    theme: "Lock in recruiter relationships. Benefits maximize. Finalize property tax protest hire. IRS 2024 research.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast + shower" },
      { t: "9:45", cat: "job", task: "PREP: Liv call prep (have pitch ready — 30/60/90 plan + 3 target roles)" },
      { t: "10:00", cat: "job", task: "📞 Call with Liv — executive recruiter" },
      { t: "10:45", cat: "admin", task: "🧾 TAX: Finalize property tax protest contract + sign — call firm, confirm pricing, submit property docs" },
      { t: "11:15", cat: "health", task: "BENEFITS BLOCK: Medical appts + MRA/FSA confirm" },
      { t: "11:45", cat: "admin", task: "🧾 TAX: IRS 2024 research — contact info, payment plan options on IRS.gov (30 min)" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00 PM", cat: "job", task: "📧 Apply to 3-5 roles (batched, 90 min)" },
      { t: "2:00", cat: "admin", task: "Subscription cancellations (pre-made list)" },
      { t: "2:30", cat: "admin", task: "Email admin: Final consumer claims sweep" },
      { t: "3:30", cat: "fitness", task: "🏊 Pool: Relax + swim (90 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:30", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Mar 4", week: 2, tag: "Deep Job Search + 2022 Refund",
    theme: "Research target companies. Cold outreach. HELOC closing window. 2022 refund status check.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast + shower" },
      { t: "10:00", cat: "job", task: "DEEP WORK: Research 5 target companies (org charts, hiring, decision-makers)" },
      { t: "11:30", cat: "personal", task: "🏪 Best Buy: Appointment (confirm night before) + cancel service" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "admin", task: "🧾 TAX: Check 2022 refund status online — IRS.gov 'Where's My Refund' (15 min)" },
      { t: "1:15", cat: "job", task: "Cold outreach: LinkedIn messages to 5 decision-makers at target companies" },
      { t: "2:00", cat: "job", task: "Apply to 5 roles" },
      { t: "2:45", cat: "heloc", task: "📞 HELOC: Call lender for status/commitment (before 3 PM close)" },
      { t: "3:15", cat: "admin", task: "🧾 TAX: Research 2022 refund claim/amended return process (15 min) — determine if need 1040-X" },
      { t: "3:45", cat: "legal", task: "BoA: Email attorney for rebuttal strategy" },
      { t: "4:15", cat: "fitness", task: "Outdoor walk (30 min) — decompress after calls" },
      { t: "4:45", cat: "heloc", task: "Financial models: Update if HELOC status changed" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Mar 5", week: 2, tag: "Networking + Tax Docs + Pilates",
    theme: "Warm outreach. Interview prep. Medical appointments locked. Finalize 2022 refund docs. TRT: hCG + Anastrozole.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: hCG injection + Anastrozole 1 mg" },
      { t: "8:00", cat: "fitness", task: "Gym: Legs + core — front squats, RDLs, lunges, planks (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast + shower" },
      { t: "10:00", cat: "job", task: "NETWORK BLOCK: Reach out to 5-10 warm leads (LinkedIn + email)" },
      { t: "11:00", cat: "job", task: "Apply to 3-5 roles" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "INTERVIEW PREP: Practice 3 key STAR stories (30 min mock)" },
      { t: "2:00", cat: "health", task: "📞 Medical appointments: CALL & CONFIRM all remaining appts through Mar 19" },
      { t: "2:30", cat: "admin", task: "🧾 TAX: Finalize 2022 refund docs (gather required receipts/statements) — determine docs needed for 1040-X or refund claim" },
      { t: "3:30", cat: "personal", task: "Website/planner updates (only if ahead on network/applications)" },
      { t: "4:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening Pilates (Align, SculptHouse, Class Studios)" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Mar 6", week: 2, tag: "Week Wrap-Up + File 2022 Refund",
    theme: "Close loops. Pipeline review. FILE 2022 REFUND. Plan final 13-day sprint.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast + shower" },
      { t: "9:45", cat: "admin", task: "🧾 TAX: File 2022 refund claim or amended return (1-2 hours) — complete 1040-X or online refund, submit via IRS e-file, document confirmation number" },
      { t: "11:30", cat: "job", task: "📊 PIPELINE REVIEW: Total apps, interviews, warm leads (write exact numbers)" },
      { t: "12:30 PM", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "heloc", task: "HELOC: Final call for yes/no decision (not pending)" },
      { t: "2:00", cat: "legal", task: "BoA: Escalate if attorney silent; confirm rebuttal deadline" },
      { t: "2:45", cat: "health", task: "Benefits: Final MRA/FSA spend decision" },
      { t: "3:15", cat: "admin", task: "LinkedIn: Request 3-5 recommendations from JPMC colleagues" },
      { t: "3:45", cat: "job", task: "Plan final 13-day sprint (Mar 9-19 priorities)" },
      { t: "4:30", cat: "fitness", task: "Outdoor walk (30-45 min) — clear head" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "🎉 Reward night: BOOKED in advance (date, friends, dinner)" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Mar 7", week: 2, tag: "Recovery Day",
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
    date: "Sun, Mar 8", week: 2, tag: "Planning + Reset",
    theme: "11 days to March 19. Lock in the plan. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Sprint planning: March 9-19 priorities + unemployment filing prep" },
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

  // ═══════════════════════════════════════════
  // WEEK 3 — DEADLINE COUNTDOWN (Mar 9–15)
  // ═══════════════════════════════════════════
  {
    date: "Mon, Mar 9", week: 3, tag: "IRS Call + Deadline Countdown",
    theme: "10 days to March 19. Call IRS at 7 AM (less hold time). Full job search after. TRT: Testosterone injection (Week 2).",
    blocks: [
      { t: "6:45 AM", cat: "sleep", task: "Wake up early" },
      { t: "7:00", cat: "admin", task: "📞 🧾 TAX: Call IRS 1-800-829-1040 (45 min) — 2024 taxes owed. Ask about payment plans. Document: ref #, rep name, timeline, next steps" },
      { t: "7:45", cat: "personal", task: "Breakfast" },
      { t: "8:00", cat: "wellness", task: "Meditation + journaling" },
      { t: "8:15", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:30", cat: "health", task: "💉 TRT: Testosterone injection (Week 2)" },
      { t: "8:45", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "10:00", cat: "personal", task: "Shower" },
      { t: "10:30", cat: "job", task: "DEEP WORK: Target companies research OR cold outreach" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "job", task: "📧 Apply to 5-7 roles (batch)" },
      { t: "2:30", cat: "job", task: "NETWORK: Warm lead outreach (5-10 contacts)" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "admin", task: "Evening: Archive IRS call info, organize notes + next steps" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Mar 10", week: 3, tag: "Job Search + Compile 2024 Income Docs",
    theme: "Applications + benefits push. Compile 2024 income docs for IRS. ClassPass yoga evening.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "DEEP WORK: Job search (research, applications, outreach)" },
      { t: "11:30", cat: "admin", task: "🧾 TAX: Compile 2024 income docs (30-45 min) — W-2s, 1099s, organize by category" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "job", task: "📧 Apply to 5 roles" },
      { t: "2:00", cat: "job", task: "NETWORK: Warm leads + cold outreach (5 contacts)" },
      { t: "3:00", cat: "health", task: "Final medical appointments — schedule or confirm" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Mar 11", week: 3, tag: "Outreach + Compile 2024 Deduction Docs",
    theme: "Job outreach, HELOC/legal check-in. Compile 2024 deduction docs for IRS.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "DEEP WORK: Job search (research, applications, outreach)" },
      { t: "11:30", cat: "job", task: "Cold outreach: 5 hiring managers at target companies" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "job", task: "📧 Apply to 5 roles" },
      { t: "2:00", cat: "job", task: "NETWORK: Warm leads + cold outreach" },
      { t: "2:45", cat: "heloc", task: "HELOC: Push for final decisions" },
      { t: "3:15", cat: "legal", task: "BoA: Attorney engagement — next steps" },
      { t: "3:30", cat: "admin", task: "🧾 TAX: Compile 2024 deduction docs (30-45 min) — receipts, invoices, charity, create digital folder" },
      { t: "4:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Mar 12", week: 3, tag: "Networking + File 2022 Refund + Pilates",
    theme: "File 2022 refund/amended return. Network, interview prep, Pilates. TRT: hCG + Anastrozole.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: hCG injection + Anastrozole 1 mg" },
      { t: "8:00", cat: "fitness", task: "Gym: Legs + core — front squats, RDLs, lunges, planks (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "9:45", cat: "admin", task: "🧾 TAX: File 2022 refund/amended return (1-2 hours) — complete 1040-X or online claim, submit via IRS e-file, document confirmation #" },
      { t: "11:30", cat: "job", task: "NETWORK: Follow up on warm leads, reach out to 5-10 contacts" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Interview prep — STAR examples, pitch refinement" },
      { t: "2:00", cat: "job", task: "Apply to 3-5 roles" },
      { t: "3:00", cat: "job", task: "LinkedIn: Engage with 10+ posts" },
      { t: "3:45", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening Pilates" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Mar 13", week: 3, tag: "Pipeline Review",
    theme: "Close loops. Review pipeline. 6 days to March 19.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Pipeline review: apps, interviews, offers, strategy adjustment" },
      { t: "11:00", cat: "health", task: "Benefits: Final check — anything left to use?" },
      { t: "11:45", cat: "heloc", task: "HELOC: Final status" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "legal", task: "BoA: Attorney status check" },
      { t: "2:00", cat: "job", task: "Apply to 3 roles" },
      { t: "3:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "4:00", cat: "personal", task: "Free time" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Reward night — out, socialize" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Mar 14", week: 3, tag: "Recovery Day",
    theme: "Massage + IR sauna. House + meal prep. Social.",
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
    date: "Sun, Mar 15", week: 3, tag: "Deadline Week Prep",
    theme: "4 days to March 19. Final prep. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Deadline week planning: Map Mon-Thu tasks for March 19 closeout" },
      { t: "11:00", cat: "job", task: "Pipeline review — interviews? Offers? Follow-ups needed?" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "admin", task: "Pre-deadline checklist: JPMC docs, portal access, unemployment prep" },
      { t: "2:00", cat: "recovery", task: "💆 Optional 2nd massage (or rest)" },
      { t: "4:00", cat: "fitness", task: "Gym: Upper body (60 min)" },
      { t: "5:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — recharge for deadline week" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },

  // ═══════════════════════════════════════════
  // WEEK 4 — DEADLINE WEEK (Mar 16–22)
  // ═══════════════════════════════════════════
  {
    date: "Mon, Mar 16", week: 4, tag: "3 Days to Deadline",
    theme: "March 19 in 3 days. Final JPMC tasks. IRS email check. TRT: Testosterone injection (Week 3).",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: Testosterone injection (Week 3)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts, hip thrusts (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "9:45", cat: "admin", task: "🧾 TAX: Check email for IRS responses (5 min) — flag immediately if present" },
      { t: "10:00", cat: "admin", task: "JPMC final push: Download all remaining docs, certs, pay stubs" },
      { t: "11:00", cat: "health", task: "Final Rx refills — 90-day supplies while insurance active" },
      { t: "11:30", cat: "admin", task: "🧾 TAX: Email property tax professional for status update (5 min)" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "job", task: "NETWORK: Warm leads + interviews" },
      { t: "2:30", cat: "job", task: "Apply to 3-5 roles" },
      { t: "3:00", cat: "heloc", task: "HELOC: Confirm status — employment verification before Mar 19" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "5:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Evening: Reflect on week, plan final push" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Mar 17", week: 4, tag: "2 Days to Deadline",
    theme: "Final benefits sweep. Last medical appts. ClassPass yoga.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "health", task: "Final MRA/FSA spending — use every dollar" },
      { t: "10:45", cat: "health", task: "COBRA vs marketplace — final decision" },
      { t: "11:30", cat: "admin", task: "JPMC: Complete any remaining learning/certifications" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00 PM", cat: "job", task: "Apply to 3 roles" },
      { t: "2:00", cat: "admin", task: "Request LinkedIn recommendations (3-5 colleagues)" },
      { t: "3:00", cat: "admin", task: "Unemployment filing prep: gather all required info" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Mar 18", week: 4, tag: "1 Day to Deadline",
    theme: "Last day before JPMC ends. Final downloads, access, prep.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "admin", task: "⚠️ FINAL: Download ALL JPMC portal data — pay stubs, W-2s, reviews, 401(k)" },
      { t: "11:00", cat: "admin", task: "Verify Hyatt Legal Plan consultation completed" },
      { t: "11:30", cat: "admin", task: "Call Empower — confirm 401(k) forfeiture documented in writing" },
      { t: "12:15", cat: "personal", task: "Lunch" },
      { t: "1:00 PM", cat: "admin", task: "Severance team: final follow-up on bonus discrepancy ($5K)" },
      { t: "1:45", cat: "health", task: "Confirm COBRA enrollment or marketplace selection" },
      { t: "2:30", cat: "job", task: "Job search: 3 applications" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:15", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — rest up for tomorrow" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Mar 19", week: 4, tag: "🔴 JPMC LAST DAY",
    theme: "MARCH 19 — JPMC last day. Close everything out. FILE UNEMPLOYMENT. New chapter starts. TRT: hCG + Anastrozole.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: hCG injection + Anastrozole 1 mg" },
      { t: "8:00", cat: "admin", task: "🔴 JPMC: Final day. Collect all docs, request final recommendations, hand off projects." },
      { t: "11:30", cat: "fitness", task: "Gym: Light session OR skip for mental clarity" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "1:00", cat: "admin", task: "📞 🧾 TAX: File unemployment application — Texas Workforce Commission online (30 min). Date filed, confirmation # documented." },
      { t: "1:30", cat: "personal", task: "Shower + fresh clothes" },
      { t: "2:00", cat: "personal", task: "Clear head: No admin/tax work. Walk, relax, decompress." },
      { t: "4:00", cat: "fitness", task: "Gym optional OR rest" },
      { t: "5:30", cat: "personal", task: "Dinner with friends OR solo — celebrate closing this chapter" },
      { t: "7:00", cat: "personal", task: "Start new chapter: Evening reflection, plan next week strategically" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Mar 20", week: 4, tag: "Day 1 Post-JPMC",
    theme: "New chapter begins. File unemployment if not done. Decompress.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling — reflect on the transition" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "admin", task: "File unemployment (if not done yesterday)" },
      { t: "11:00", cat: "job", task: "Job search: Apply to 5 roles — full focus now" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Recruiter follow-ups + interview scheduling" },
      { t: "2:30", cat: "job", task: "LinkedIn: Post about transition + engage" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "4:30", cat: "personal", task: "Free time" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Reward night — celebrate the new chapter" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Mar 21", week: 4, tag: "Recovery Day",
    theme: "Massage + sauna. Recharge after a big week.",
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
    date: "Sun, Mar 22", week: 4, tag: "New Chapter Planning",
    theme: "Plan post-JPMC phase. Full job search mode. Tax follow-ups (light). TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "9:30", cat: "admin", task: "🧾 TAX: Email property tax professional for status update (10 min)" },
      { t: "10:00", cat: "personal", task: "SPRINT PLANNING: Mar 24-31 priorities + unemployment filing follow-up" },
      { t: "11:00", cat: "job", task: "Pipeline review — interviews? Offers? What needs acceleration?" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "admin", task: "🧾 TAX: Monitor IRS responses (as-needed, likely none yet — 5 min check)" },
      { t: "1:30", cat: "legal", task: "BoA: Attorney engagement — next steps post-employment" },
      { t: "2:30", cat: "heloc", task: "HELOC: Final status — what closed, what's pending?" },
      { t: "3:30", cat: "recovery", task: "💆 Optional 2nd massage (or rest)" },
      { t: "4:00", cat: "fitness", task: "Gym: Upper body (60 min)" },
      { t: "5:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time — recharge for final sprint" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },

  // ═══════════════════════════════════════════
  // WEEK 5 — NEW CHAPTER (Mar 23–31)
  // ═══════════════════════════════════════════
  {
    date: "Mon, Mar 23", week: 5, tag: "Full Job Search Mode",
    theme: "All-in on job search. No more JPMC distractions. TRT: Testosterone injection (Week 4).",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: Testosterone injection (Week 4)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts, hip thrusts (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Deep work: Apply to 5+ roles" },
      { t: "12:00", cat: "job", task: "Recruiter calls + cold outreach" },
      { t: "12:45", cat: "personal", task: "Lunch" },
      { t: "1:30", cat: "job", task: "LinkedIn: Thought leadership + networking" },
      { t: "2:30", cat: "job", task: "Interview prep / follow-ups" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "5:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Mar 24", week: 5, tag: "Job Search + Yoga",
    theme: "Applications, interviews, ClassPass yoga evening.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Apply to 3-5 roles" },
      { t: "11:30", cat: "job", task: "Interview prep + follow-ups" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Networking: 5 outreach messages" },
      { t: "2:30", cat: "personal", task: "Open block — personal projects or errands" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening yoga" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Wed, Mar 25", week: 5, tag: "Deep Work",
    theme: "Research, outreach, applications.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy pull — rows, pull-ups, face pulls, curls (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Deep work: Research target companies + apply to 5 roles" },
      { t: "12:00", cat: "job", task: "Cold outreach: 5 hiring managers" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "personal", task: "Open block — personal projects or errands" },
      { t: "2:30", cat: "legal", task: "BoA: Attorney / case status check" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:15", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Thu, Mar 26", week: 5, tag: "Networking + Pilates",
    theme: "Network, interview prep, Pilates. TRT: hCG + Anastrozole today.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "7:45", cat: "health", task: "💉 TRT: hCG injection + Anastrozole 1 mg" },
      { t: "8:00", cat: "fitness", task: "Gym: Legs + core — front squats, RDLs, lunges, planks (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Network: Follow up on all warm leads" },
      { t: "11:30", cat: "job", task: "Apply to 3-5 roles" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "job", task: "Interview prep — STAR examples, pitch" },
      { t: "2:30", cat: "personal", task: "Open block — personal projects or errands" },
      { t: "3:45", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "5:00", cat: "fitness", task: "🧘 ClassPass: Evening Pilates" },
      { t: "6:15", cat: "personal", task: "Dinner" },
      { t: "7:15", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Fri, Mar 27", week: 5, tag: "Pipeline Review",
    theme: "Weekly review. Close loops. Reward night.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Full body (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Pipeline review: apps, interviews, offers, strategy" },
      { t: "11:00", cat: "job", task: "Apply to 3 roles" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "personal", task: "Open block — personal projects or errands" },
      { t: "2:00", cat: "job", task: "Follow-ups + interview scheduling" },
      { t: "3:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "4:00", cat: "personal", task: "Free time" },
      { t: "5:30", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Reward night — out, socialize" },
      { t: "10:30", cat: "sleep", task: "Wind down (Fri flex)" },
      { t: "11:30", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Sat, Mar 28", week: 5, tag: "Recovery Day",
    theme: "Massage + sauna. House + meal prep. Social.",
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
    date: "Sun, Mar 29", week: 5, tag: "Monthly Review",
    theme: "End of March in sight. Review the whole month. TRT: hCG today.",
    blocks: [
      { t: "8:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "8:15", cat: "wellness", task: "Meditation + gratitude journal" },
      { t: "8:30", cat: "recovery", task: "Extended stretch (20-30 min)" },
      { t: "9:00", cat: "health", task: "💉 TRT: hCG injection" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "personal", task: "Monthly review: What worked, what didn't, April planning" },
      { t: "11:00", cat: "job", task: "Pipeline review — where do things stand?" },
      { t: "12:00", cat: "personal", task: "Lunch" },
      { t: "12:45", cat: "personal", task: "Open block — personal projects" },
      { t: "2:00", cat: "recovery", task: "💆 Optional 2nd massage (or rest)" },
      { t: "4:00", cat: "fitness", task: "Gym: Upper body (60 min)" },
      { t: "5:15", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Mon, Mar 30", week: 5, tag: "April Prep",
    theme: "Last weekday push of March. Job search + new month prep.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy legs — squats, deadlifts, hip thrusts (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Apply to 5+ roles" },
      { t: "12:00", cat: "job", task: "Recruiter calls + follow-ups" },
      { t: "12:45", cat: "personal", task: "Lunch" },
      { t: "1:30", cat: "job", task: "LinkedIn engagement + networking" },
      { t: "2:30", cat: "personal", task: "Open block — April goals, budget, planning" },
      { t: "4:00", cat: "fitness", task: "Outdoor walk (30-45 min)" },
      { t: "5:00", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
      { t: "10:00", cat: "sleep", task: "Wind down" },
      { t: "11:00", cat: "sleep", task: "Lights out" },
    ]
  },
  {
    date: "Tue, Mar 31", week: 5, tag: "End of March",
    theme: "Last day of March. Close out the month strong.",
    blocks: [
      { t: "7:00 AM", cat: "sleep", task: "Wake up — sunlight, hydrate" },
      { t: "7:15", cat: "wellness", task: "Meditation + journaling" },
      { t: "7:30", cat: "recovery", task: "Morning stretch (15-20 min)" },
      { t: "8:00", cat: "fitness", task: "Gym: Heavy push — bench, OHP, incline DB (60 min)" },
      { t: "9:15", cat: "personal", task: "Breakfast" },
      { t: "10:00", cat: "job", task: "Apply to 3-5 roles" },
      { t: "11:30", cat: "job", task: "Interview prep + follow-ups" },
      { t: "12:30", cat: "personal", task: "Lunch" },
      { t: "1:15", cat: "personal", task: "Open block — personal projects or errands" },
      { t: "2:30", cat: "personal", task: "End-of-month wrap: review March, set April priorities" },
      { t: "3:30", cat: "fitness", task: "Outdoor walk (30 min)" },
      { t: "4:15", cat: "personal", task: "Free time" },
      { t: "6:00", cat: "personal", task: "Dinner" },
      { t: "7:00", cat: "personal", task: "Free time" },
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

// ── Helpers ─────────────────────────────────────────────────────────────
function genId() { return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`; }
function loadLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
  catch { return def; }
}
function seedDays(arr) {
  return arr.map(d => ({ ...d, blocks: d.blocks.map(b => ({ ...b, id: b.id || genId() })) }));
}
function getWeekLabel(days, w) {
  const wd = days.filter(d => d.week === w);
  if (!wd.length) return `Week ${w}`;
  const a = wd[0].date.split(", ")[1], b = wd[wd.length-1].date.split(", ")[1];
  return `${a}–${b}`;
}
function nextDateStr(dateStr, n) {
  const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DO = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const [mo, d] = dateStr.split(" ");
  const mi = MO.indexOf(mo);
  const dt = new Date(2026, mi, parseInt(d) + n);
  return `${DO[dt.getDay()]}, ${MO[dt.getMonth()]} ${dt.getDate()}`;
}
function findToday(days) {
  const now = new Date();
  const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mo = MO[now.getMonth()], d = now.getDate();
  const gi = days.findIndex(day => {
    const part = day.date.split(", ")[1];
    const [dm, dd] = part.split(" ");
    return dm === mo && parseInt(dd) === d;
  });
  if (gi < 0) return { week: days[0]?.week || 1, dayIdx: 0, found: false };
  const w = days[gi].week;
  const wDays = days.filter(x => x.week === w);
  const di = wDays.findIndex(x => x === days[gi]);
  return { week: w, dayIdx: di, found: true };
}

function BattlePlan() {
  const [dynDays,setDynDays]=useState(()=>{ const s=loadLS("gt-days",null); return s||seedDays(DAYS); });
  const today=findToday(dynDays);
  const [week,setWeek]=useState(()=>today.week);
  const [dayIdx,setDayIdx]=useState(()=>today.dayIdx);
  const [tab,setTab]=useState("schedule");
  const [checks,setChecks]=useState(()=>loadLS("gt-checks",{}));
  const [tasks,setTasks]=useState(()=>loadLS("gt-tasks",{}));
  const [showAdd,setShowAdd]=useState(false);
  const [modalMode,setModalMode]=useState("ai");
  const [nlText,setNlText]=useState("");
  const [nlLoading,setNlLoading]=useState(false);
  const [nlError,setNlError]=useState("");
  const [nlPreview,setNlPreview]=useState(null);
  const [manForm,setManForm]=useState({t:"",cat:"job",task:""});
  const [apiKey,setApiKey]=useState(()=>loadLS("gt-apikey",""));
  const [showApiInput,setShowApiInput]=useState(false);

  useEffect(()=>{ localStorage.setItem("gt-tasks",JSON.stringify(tasks)); },[tasks]);
  useEffect(()=>{ localStorage.setItem("gt-checks",JSON.stringify(checks)); },[checks]);
  useEffect(()=>{ localStorage.setItem("gt-days",JSON.stringify(dynDays)); },[dynDays]);
  useEffect(()=>{ localStorage.setItem("gt-apikey",apiKey); },[apiKey]);

  const goToToday=()=>{ if(today.found){ setWeek(today.week); setDayIdx(today.dayIdx); setTab("schedule"); } };
  const allWeeks=[...new Set(dynDays.map(d=>d.week))].sort((a,b)=>a-b);
  const wDays=dynDays.filter(d=>d.week===week);
  const day=wDays[dayIdx]||wDays[0];
  const tog=(ns,k)=>ns==="t"?setTasks(p=>({...p,[k]:!p[k]})):setChecks(p=>({...p,[k]:!p[k]}));
  const done=day?.blocks.filter(b=>tasks[b.id]).length||0;
  const pct=day?.blocks.length?Math.round((done/day.blocks.length)*100):0;

  const addBlock=(block)=>{
    setDynDays(prev=>{
      const nd=[...prev];
      const wList=nd.filter(d=>d.week===week);
      const gi=nd.indexOf(wList[dayIdx]);
      if(gi<0) return prev;
      nd[gi]={...nd[gi],blocks:[...nd[gi].blocks,{...block,id:genId()}]};
      return nd;
    });
  };
  const delBlock=(bi)=>{
    setDynDays(prev=>{
      const nd=[...prev];
      const wList=nd.filter(d=>d.week===week);
      const gi=nd.indexOf(wList[dayIdx]);
      if(gi<0) return prev;
      const nb=[...nd[gi].blocks]; nb.splice(bi,1);
      nd[gi]={...nd[gi],blocks:nb};
      return nd;
    });
  };
  const addNewWeek=()=>{
    const maxW=Math.max(...dynDays.map(d=>d.week));
    const lastDay=dynDays.filter(d=>d.week===maxW).slice(-1)[0];
    const lastPart=lastDay.date.split(", ")[1];
    const newW=maxW+1;
    const newDays=Array.from({length:7},(_,i)=>({
      date:nextDateStr(lastPart,i+1), week:newW,
      tag:i===0?`Week ${newW} Starts`:"Free Day",
      theme:"Add your schedule here.",
      blocks:[
        {id:genId(),t:"7:00 AM",cat:"sleep",task:"Wake up — sunlight, hydrate"},
        {id:genId(),t:"7:15",cat:"wellness",task:"Meditation + journaling"},
        {id:genId(),t:"7:30",cat:"recovery",task:"Morning stretch (15-20 min)"},
        {id:genId(),t:"8:00",cat:"fitness",task:"Gym or workout (60 min)"},
        {id:genId(),t:"9:15",cat:"personal",task:"Breakfast"},
        {id:genId(),t:"10:00",cat:"job",task:"Deep work block 1"},
        {id:genId(),t:"12:30",cat:"personal",task:"Lunch"},
        {id:genId(),t:"1:30",cat:"job",task:"Deep work block 2"},
        {id:genId(),t:"4:00",cat:"fitness",task:"Outdoor walk (30 min)"},
        {id:genId(),t:"6:00",cat:"personal",task:"Dinner"},
        {id:genId(),t:"10:00",cat:"sleep",task:"Wind down"},
        {id:genId(),t:"11:00",cat:"sleep",task:"Lights out"},
      ]
    }));
    setDynDays(prev=>[...prev,...newDays]);
    setWeek(newW); setDayIdx(0);
  };
  async function parseAI(text) {
    if(!apiKey){ setNlError("Add Anthropic API key in Week tab → AI Scheduling."); return; }
    setNlLoading(true); setNlError(""); setNlPreview(null);
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"x-api-key":apiKey,"anthropic-version":"2023-06-01","content-type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",max_tokens:256,
          messages:[{role:"user",content:`Parse this into a schedule block. Day: ${day?.date}. Categories: sleep,fitness,recovery,job,heloc,legal,health,admin,wellness,personal.\nRequest: "${text}"\nReturn ONLY JSON: {"t":"9:00 AM","cat":"job","task":"Description"}\nNo markdown.`}]
        })
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error.message);
      setNlPreview(JSON.parse(data.content[0].text.trim()));
    } catch(e){ setNlError(e.message||"Parse failed. Check API key."); }
    setNlLoading(false);
  }

  const S={
    root:{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#0c0d14",minHeight:"100vh",color:"#e4e4e7"},
    card:{background:"#13141e",border:"1px solid #1e2030",borderRadius:10,padding:"12px 14px"},
  };

  return(
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* ── HEADER ── */}
      <div style={{background:"linear-gradient(160deg,#151729 0%,#0c0d14 70%)",borderBottom:"1px solid #1e2030",padding:"18px 20px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <h1 style={{fontSize:20,fontWeight:700,margin:0,color:"#f4f4f5",letterSpacing:-0.5}}>Battle Plan</h1>
            <p style={{margin:"3px 0 0",fontSize:12,color:"#52525b"}}>
              Feb 27 – beyond&nbsp;&nbsp;·&nbsp;&nbsp;
              {(()=>{const d=Math.ceil((new Date("2026-03-19").getTime()-Date.now())/(864e5));return d>0?<span style={{color:"#f87171",fontWeight:600}}>⚡ {d}d to JPMC exit</span>:<span style={{color:"#34d399",fontWeight:600}}>✅ Post-JPMC</span>})()}
            </p>
          </div>
          {tab==="schedule"&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"#52525b",textTransform:"uppercase",letterSpacing:1}}>Done</div>
              <div style={{fontSize:22,fontWeight:700,color:pct>=75?"#34d399":pct>=40?"#fbbf24":"#6366f1"}}>{pct}%</div>
            </div>
          )}
        </div>

        {/* Tab bar */}
        <div style={{display:"flex",gap:3,marginTop:12,overflowX:"auto",paddingBottom:2,alignItems:"center"}}>
          {[{id:"schedule",l:"Schedule"},{id:"week",l:"Week"},{id:"sleep",l:"Sleep"},{id:"fitness",l:"Fitness"},{id:"checklist",l:"Mar 19"},{id:"rules",l:"Rules"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"5px 11px",fontSize:11,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",
              background:tab===t.id?"#6366f1":"transparent",color:tab===t.id?"#fff":"#71717a",whiteSpace:"nowrap"
            }}>{t.l}</button>
          ))}
          {today.found&&(
            <button onClick={goToToday} style={{
              marginLeft:"auto",padding:"5px 11px",fontSize:11,fontWeight:600,borderRadius:6,cursor:"pointer",whiteSpace:"nowrap",
              background:"linear-gradient(135deg,#00d4ff,#1e90ff)",border:"none",color:"#050505",flexShrink:0
            }}>Today</button>
          )}
        </div>

        {/* Week + day nav (schedule & week tabs) */}
        {(tab==="schedule"||tab==="week")&&(
          <div style={{marginTop:10}}>
            <div style={{display:"flex",gap:4,marginBottom:6,flexWrap:"wrap",alignItems:"center"}}>
              {allWeeks.map(w=>{
                const isAlert=dynDays.filter(d=>d.week===w).some(d=>d.tag?.includes("JPMC")||d.tag?.includes("Deadline"));
                return(
                  <button key={w} onClick={()=>{setWeek(w);setDayIdx(0);}} style={{
                    padding:"4px 10px",fontSize:10,fontWeight:600,borderRadius:5,border:"none",cursor:"pointer",
                    background:week===w?(isAlert?"#dc2626":"#3b82f6"):"#1a1b28",color:week===w?"#fff":"#71717a"
                  }}>{getWeekLabel(dynDays,w)}</button>
                );
              })}
              <button onClick={addNewWeek} style={{
                padding:"4px 8px",fontSize:10,fontWeight:500,borderRadius:5,cursor:"pointer",
                border:"1px dashed #2e2f3e",background:"transparent",color:"#52525b"
              }}>+ Week</button>
            </div>
            {tab==="schedule"&&(
              <div style={{display:"flex",gap:3,overflowX:"auto"}}>
                {wDays.map((d,i)=>{
                  const dd=d.blocks.filter(b=>tasks[b.id]).length;
                  const dp=d.blocks.length?Math.round((dd/d.blocks.length)*100):0;
                  const isToday=today.found&&d.week===today.week&&i===today.dayIdx;
                  return(
                    <button key={i} onClick={()=>setDayIdx(i)} style={{
                      padding:"5px 9px",fontSize:10,fontWeight:600,borderRadius:5,cursor:"pointer",textAlign:"center",minWidth:50,
                      background:dayIdx===i?"#1e2030":"transparent",
                      color:dayIdx===i?"#f4f4f5":"#52525b",
                      border:isToday?"1px solid #00d4ff":"1px solid transparent",
                    }}>
                      {d.date.split(",")[0]}<br/>
                      <span style={{fontSize:9,fontWeight:400}}>{d.date.split(", ")[1]}</span>
                      {dp>0&&<div style={{width:4,height:4,borderRadius:2,background:dp>=100?"#34d399":"#6366f1",margin:"3px auto 0"}}/>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{padding:"14px 16px 80px",maxWidth:640,margin:"0 auto"}}>

        {/* ── SCHEDULE TAB ── */}
        {tab==="schedule"&&(
          <div>
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                <span style={{fontSize:16,fontWeight:700}}>{day?.date}</span>
                <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:4,background:day?.tag.includes("JPMC")?"#dc2626":day?.tag.includes("Deadline")?"#b45309":"#6366f1",color:"#fff"}}>{day?.tag}</span>
              </div>
              <p style={{fontSize:12,color:"#71717a",margin:0,fontStyle:"italic"}}>{day?.theme}</p>
              <div style={{marginTop:6,height:3,background:"#1a1b28",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct>=75?"#34d399":"#6366f1",borderRadius:3,transition:"width 0.2s"}}/>
              </div>
              <div style={{fontSize:10,color:"#52525b",marginTop:3,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{done}/{day?.blocks.length} completed</span>
                <button onClick={()=>{setShowAdd(true);setNlPreview(null);setNlText("");setNlError("");setManForm({t:"",cat:"job",task:""}); }} style={{
                  padding:"3px 9px",fontSize:10,fontWeight:600,borderRadius:5,cursor:"pointer",
                  background:"#6366f1",color:"#fff",border:"none"
                }}>+ Add Block</button>
              </div>
            </div>
            {day?.blocks.map((b,i)=>{
              const k=b.id; const chk=tasks[k]; const col=CC[b.cat];
              return(
                <div key={b.id} style={{position:"relative",marginBottom:5}}>
                  <div onClick={()=>tog("t",k)} style={{
                    ...S.card,display:"flex",gap:10,cursor:"pointer",
                    opacity:chk?0.5:1,borderColor:chk?"#14532d":"#1e2030",background:chk?"#0f1a0f":"#13141e"
                  }}>
                    <div style={{minWidth:55,fontSize:11,color:"#52525b",fontWeight:500,paddingTop:1}}>{b.t}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                        <span style={{fontSize:12}}>{CAT[b.cat]?.icon}</span>
                        <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,color:col}}>{CAT[b.cat]?.label}</span>
                      </div>
                      <div style={{fontSize:12.5,lineHeight:1.45,color:chk?"#4b5563":"#d4d4d8",textDecoration:chk?"line-through":"none"}}>{b.task}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{
                        width:18,height:18,borderRadius:4,border:`2px solid ${chk?"#34d399":"#2e2f3e"}`,flexShrink:0,marginTop:2,
                        display:"flex",alignItems:"center",justifyContent:"center",background:chk?"#14532d":"transparent"
                      }}>{chk&&<span style={{fontSize:11,color:"#34d399"}}>✓</span>}</div>
                      <button onClick={e=>{e.stopPropagation();delBlock(i);}} style={{
                        width:16,height:16,borderRadius:3,background:"transparent",border:"none",
                        color:"#3a3b4a",cursor:"pointer",fontSize:13,lineHeight:1,padding:0,flexShrink:0
                      }} title="Remove">×</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── WEEK SUMMARY TAB ── */}
        {tab==="week"&&(
          <div>
            <div style={{marginBottom:16}}>
              <h2 style={{fontSize:17,fontWeight:700,marginBottom:3}}>📊 Weekly Summary</h2>
              <p style={{fontSize:12,color:"#71717a",margin:0}}>{getWeekLabel(dynDays,week)}</p>
            </div>
            {(()=>{
              const totalBlocks=wDays.reduce((s,d)=>s+d.blocks.length,0);
              const doneBlocks=wDays.reduce((s,d)=>s+d.blocks.filter(b=>tasks[b.id]).length,0);
              const weekPct=totalBlocks?Math.round((doneBlocks/totalBlocks)*100):0;
              const catCounts={};
              wDays.forEach(d=>d.blocks.forEach(b=>{ if(tasks[b.id]){ catCounts[b.cat]=(catCounts[b.cat]||0)+1; } }));
              const maxCat=Math.max(1,...Object.values(catCounts));
              return(
                <div>
                  <div style={{...S.card,marginBottom:14,background:"#13142a",borderColor:"#312e81"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{fontSize:13,fontWeight:700,color:"#818cf8"}}>Week Progress</span>
                      <span style={{fontSize:18,fontWeight:700,color:weekPct>=75?"#34d399":weekPct>=40?"#fbbf24":"#6366f1"}}>{weekPct}%</span>
                    </div>
                    <div style={{height:6,background:"#1e2030",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${weekPct}%`,background:weekPct>=75?"#34d399":"#6366f1",borderRadius:3,transition:"width 0.3s"}}/>
                    </div>
                    <div style={{fontSize:11,color:"#52525b",marginTop:6}}>{doneBlocks} of {totalBlocks} blocks completed</div>
                  </div>

                  <div style={{marginBottom:14}}>
                    {wDays.map((d,i)=>{
                      const db=d.blocks.filter(b=>tasks[b.id]).length;
                      const dp=d.blocks.length?Math.round((db/d.blocks.length)*100):0;
                      const isToday=today.found&&d.week===today.week&&i===today.dayIdx;
                      return(
                        <div key={i} onClick={()=>{setDayIdx(i);setTab("schedule");}} style={{
                          ...S.card,marginBottom:6,cursor:"pointer",
                          borderColor:isToday?"#00d4ff":"#1e2030",
                          background:isToday?"#0c1a2e":"#13141e"
                        }}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <div>
                              <span style={{fontSize:13,fontWeight:600,color:isToday?"#00d4ff":"#f4f4f5"}}>{d.date}</span>
                              <span style={{fontSize:10,marginLeft:7,color:"#52525b"}}>{d.tag}</span>
                            </div>
                            <span style={{fontSize:13,fontWeight:700,color:dp>=75?"#34d399":dp>=40?"#fbbf24":"#52525b"}}>{dp}%</span>
                          </div>
                          <div style={{height:4,background:"#1e2030",borderRadius:2,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${dp}%`,background:dp>=75?"#34d399":"#6366f1",borderRadius:2}}/>
                          </div>
                          <div style={{fontSize:10,color:"#52525b",marginTop:3}}>{db}/{d.blocks.length} blocks · tap to open</div>
                        </div>
                      );
                    })}
                  </div>

                  {Object.keys(catCounts).length>0&&(
                    <div style={{marginBottom:16}}>
                      <h3 style={{fontSize:13,fontWeight:700,marginBottom:8}}>✅ Completed by Category</h3>
                      {Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([cat,cnt])=>(
                        <div key={cat} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                          <span style={{fontSize:14}}>{CAT[cat]?.icon}</span>
                          <span style={{fontSize:11,color:CC[cat],fontWeight:600,minWidth:90}}>{CAT[cat]?.label}</span>
                          <div style={{flex:1,height:5,background:"#1e2030",borderRadius:3,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${(cnt/maxCat)*100}%`,background:CC[cat],borderRadius:3}}/>
                          </div>
                          <span style={{fontSize:11,color:"#71717a",minWidth:16,textAlign:"right"}}>{cnt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{...S.card,borderColor:"#2e2f3e"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showApiInput?8:0}}>
                      <span style={{fontSize:12,fontWeight:600,color:"#a1a1aa"}}>🤖 AI Scheduling</span>
                      <button onClick={()=>setShowApiInput(p=>!p)} style={{
                        fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:4,cursor:"pointer",
                        background:"#1e2030",border:"1px solid #2e2f3e",color:"#71717a"
                      }}>{showApiInput?"Done":"Configure"}</button>
                    </div>
                    {showApiInput&&(
                      <div>
                        <p style={{fontSize:11,color:"#52525b",margin:"0 0 6px"}}>Enter your Anthropic API key to enable natural language scheduling.</p>
                        <input
                          type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)}
                          placeholder="sk-ant-..." style={{
                            width:"100%",boxSizing:"border-box",padding:"7px 10px",fontSize:12,
                            background:"#0c0d14",border:"1px solid #2e2f3e",borderRadius:6,color:"#e4e4e7",outline:"none"
                          }}
                        />
                        <p style={{fontSize:10,color:"#52525b",margin:"4px 0 0"}}>Stored locally only. Never sent anywhere except Anthropic.</p>
                      </div>
                    )}
                    {!showApiInput&&(
                      <p style={{fontSize:11,color:apiKey?"#34d399":"#52525b",margin:"4px 0 0"}}>
                        {apiKey?"✅ API key configured — use '+ Add Block' with AI mode":"No key set. Add one above to enable AI scheduling."}
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}
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

      {/* ── ADD BLOCK MODAL ── */}
      {showAdd&&(
        <div style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:100,
          display:"flex",flexDirection:"column",justifyContent:"flex-end"
        }} onClick={()=>setShowAdd(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"#13141e",borderTop:"1px solid #1e2030",borderRadius:"16px 16px 0 0",
            padding:"20px 16px 36px",maxHeight:"80vh",overflowY:"auto"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{margin:0,fontSize:15,fontWeight:700}}>Add Block — {day?.date}</h3>
              <button onClick={()=>setShowAdd(false)} style={{background:"none",border:"none",color:"#71717a",fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div style={{display:"flex",gap:4,marginBottom:16}}>
              {[{id:"ai",l:"🤖 AI Schedule"},{id:"manual",l:"✏️ Manual"}].map(m=>(
                <button key={m.id} onClick={()=>setModalMode(m.id)} style={{
                  flex:1,padding:"8px",fontSize:12,fontWeight:600,borderRadius:7,cursor:"pointer",border:"none",
                  background:modalMode===m.id?"#6366f1":"#1a1b28",color:modalMode===m.id?"#fff":"#71717a"
                }}>{m.l}</button>
              ))}
            </div>

            {modalMode==="ai"&&(
              <div>
                <textarea
                  value={nlText} onChange={e=>setNlText(e.target.value)} rows={3}
                  placeholder={`Describe the block... e.g. "dentist at 2pm" or "30 min walk at 4:30 PM" or "IRS call at 7am"`}
                  style={{
                    width:"100%",boxSizing:"border-box",padding:"10px",fontSize:13,
                    background:"#0c0d14",border:"1px solid #2e2f3e",borderRadius:8,
                    color:"#e4e4e7",resize:"vertical",fontFamily:"inherit",outline:"none"
                  }}
                />
                {!apiKey&&<p style={{fontSize:11,color:"#f87171",margin:"6px 0 0"}}>⚠ Set API key in Week tab → AI Scheduling</p>}
                <button
                  onClick={()=>parseAI(nlText)}
                  disabled={nlLoading||!nlText.trim()||!apiKey}
                  style={{
                    width:"100%",padding:"10px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",
                    background:nlLoading||!nlText.trim()||!apiKey?"#1a1b28":"#6366f1",
                    color:nlLoading||!nlText.trim()||!apiKey?"#52525b":"#fff",border:"none",marginTop:8
                  }}
                >{nlLoading?"Parsing with AI...":"Parse with AI →"}</button>
                {nlError&&<p style={{fontSize:11,color:"#f87171",margin:"8px 0 0"}}>{nlError}</p>}
                {nlPreview&&(
                  <div style={{...S.card,marginTop:12,borderColor:"#312e81",background:"#13142a"}}>
                    <div style={{fontSize:11,color:"#818cf8",marginBottom:6,fontWeight:600}}>Preview</div>
                    <div style={{display:"flex",gap:10}}>
                      <div style={{minWidth:60,fontSize:11,color:"#52525b",paddingTop:1}}>{nlPreview.t}</div>
                      <div>
                        <div style={{fontSize:9,fontWeight:700,color:CC[nlPreview.cat]||"#6366f1",textTransform:"uppercase"}}>{CAT[nlPreview.cat]?.label||nlPreview.cat}</div>
                        <div style={{fontSize:13,color:"#d4d4d8",marginTop:2}}>{nlPreview.task}</div>
                      </div>
                    </div>
                    <button onClick={()=>{addBlock(nlPreview);setShowAdd(false);setNlPreview(null);setNlText("");}} style={{
                      width:"100%",marginTop:10,padding:"9px",fontSize:13,fontWeight:600,borderRadius:7,
                      background:"#34d399",color:"#052e16",border:"none",cursor:"pointer"
                    }}>✓ Add to {day?.date}</button>
                  </div>
                )}
              </div>
            )}

            {modalMode==="manual"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div>
                  <label style={{fontSize:11,color:"#52525b",display:"block",marginBottom:3}}>Time</label>
                  <input type="text" value={manForm.t} onChange={e=>setManForm(p=>({...p,t:e.target.value}))}
                    placeholder="e.g. 9:00 AM" style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",fontSize:12,background:"#0c0d14",border:"1px solid #2e2f3e",borderRadius:6,color:"#e4e4e7",outline:"none"}}
                  />
                </div>
                <div>
                  <label style={{fontSize:11,color:"#52525b",display:"block",marginBottom:3}}>Category</label>
                  <select value={manForm.cat} onChange={e=>setManForm(p=>({...p,cat:e.target.value}))}
                    style={{width:"100%",padding:"8px 10px",fontSize:12,background:"#0c0d14",border:"1px solid #2e2f3e",borderRadius:6,color:"#e4e4e7",outline:"none"}}>
                    {Object.entries(CAT).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:"#52525b",display:"block",marginBottom:3}}>Task Description</label>
                  <input type="text" value={manForm.task} onChange={e=>setManForm(p=>({...p,task:e.target.value}))}
                    placeholder="What needs to happen?" style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",fontSize:12,background:"#0c0d14",border:"1px solid #2e2f3e",borderRadius:6,color:"#e4e4e7",outline:"none"}}
                  />
                </div>
                <button
                  onClick={()=>{if(manForm.t&&manForm.task){addBlock(manForm);setShowAdd(false);}}}
                  disabled={!manForm.t||!manForm.task}
                  style={{
                    padding:"10px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",border:"none",
                    background:manForm.t&&manForm.task?"#6366f1":"#1a1b28",
                    color:manForm.t&&manForm.task?"#fff":"#52525b"
                  }}
                >Add Block</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Top-level app shell with mode switcher ───────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(() => loadLS("gt-mode", "plan"));
  useEffect(() => { localStorage.setItem("gt-mode", mode); }, [mode]);

  if (mode === "wellness") return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "center", padding: "8px 16px",
        background: "#08090C", borderBottom: "1px solid #1E2330",
      }}>
        <div style={{ display: "flex", gap: 4, background: "#0F1117", borderRadius: 8, padding: 3 }}>
          {[{id:"plan",l:"⚔️ Battle Plan"},{id:"wellness",l:"🧬 Wellness"}].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)} style={{
              padding:"5px 14px", fontSize:11, fontWeight:600, borderRadius:6, cursor:"pointer", border:"none",
              background:mode===m.id?"#6366f1":"transparent",
              color:mode===m.id?"#fff":"#52525b",
            }}>{m.l}</button>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 46 }}>
        <WellnessProtocol />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "center", padding: "8px 16px",
        background: "#0c0d14", borderBottom: "1px solid #1e2030",
      }}>
        <div style={{ display: "flex", gap: 4, background: "#13141e", borderRadius: 8, padding: 3 }}>
          {[{id:"plan",l:"⚔️ Battle Plan"},{id:"wellness",l:"🧬 Wellness"}].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)} style={{
              padding:"5px 14px", fontSize:11, fontWeight:600, borderRadius:6, cursor:"pointer", border:"none",
              background:mode===m.id?"#6366f1":"transparent",
              color:mode===m.id?"#fff":"#52525b",
            }}>{m.l}</button>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 46 }}>
        <BattlePlan />
      </div>
    </div>
  );
}

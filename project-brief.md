# Influenzo: Project Brief

Reference document for writing the landing page copy. It describes what Influenzo is, who the page speaks to, how the page is structured, and what copy each section still needs.

> Items marked **TBC** are assumptions or unknowns that need confirmation before copy is final.

---

## 1. What Influenzo is

Influenzo is an **influencer management startup**. It sits between two sides of the creator economy:

- **Brands** that want to run influencer marketing without the chaos of finding, vetting, negotiating with and tracking creators themselves.
- **Creators** (influencers) who want steady, well-matched brand partnerships, fair deals and someone handling the business side.

Influenzo manages the relationship, the campaigns and the results for both sides.

**TBC:** exact service model (talent management, campaign management, or both), markets/regions served, platforms covered (Instagram, YouTube, TikTok, etc.), commission or pricing model, and founding story.

### Core promise (draft, to refine in copy)
Clarity over noise. Real partnerships, measurable outcomes, less back-and-forth for everyone involved.

---

## 2. Audiences

| Audience | What they want | What they worry about |
| --- | --- | --- |
| **Brands** | Right creators, authentic content, measurable ROI, simple process | Fake followers, wasted budget, unreliable creators, unclear results |
| **Creators** | Good brand deals, fair pay, growth, less admin | Being undervalued, late payments, mismatched brands, no support |

The page serves both, but each has a dedicated page/section (see navigation). The homepage should make it obvious within seconds which path is for them.

---

## 3. Navigation

Header: **INFLUENZO** logo on the left, nav in the center, primary CTA on the right.

| Nav item | Purpose | Target |
| --- | --- | --- |
| **Home** | Landing page | `/` |
| **For Brands** | Explains how Influenzo helps brands run campaigns | `#for-brands` or `/for-brands` |
| **For Creators** | Explains how Influenzo helps creators grow and earn | `#for-creators` or `/for-creators` |
| **Our Services** | What we do, end to end | `#services` |
| **About Us** | Who we are, team, mission | `#about` |
| **Contact** | Get in touch / book a call | `#contact` |

Primary CTA button (right side): **TBC** (current placeholder: "Book a free call").

> Build note: the navbar in code (`src/components/sections/navbar.tsx`) still uses the template links (About, Services, Case Studies, Pricing, FAQ). It must be updated to the six items above.

---

## 4. Page structure and copy needed

Sections are listed top to bottom. "Built" means the section exists in code with **placeholder copy** that needs replacing.

Every section heading follows one pattern: **title + short description** (title is ~3-8 words; description is 1-2 sentences).

### 4.1 Hero (built)
- **Goal:** state what Influenzo does and push the main action.
- **Copy needed:**
  - Small trust line (e.g. rating / number of creators or brands)
  - Headline (max ~8 words, two lines)
  - Subheadline (1-2 lines)
  - Email field placeholder and button label
  - Navbar CTA label
- **Visual:** large lavender panel below (image slot, to be provided).

### 4.2 About statement + global reach (built)
- **Goal:** a short brand belief statement, then proof of scale.
- **Copy needed:**
  - Statement (2-3 sentences; currently a "clarity over noise" idea)
  - Panel heading + short paragraph about reach
  - 4 stats with labels (e.g. creators managed, campaigns delivered, brands served, countries/markets)
- **TBC:** real numbers. Do not publish placeholder figures.

### 4.3 For Brands / For Creators (not built, recommended)
- **Goal:** the two core paths, since both are in the nav.
- **Copy needed per audience:**
  - Heading + description
  - 3-4 benefits each
  - How it works in 3 steps
  - Audience-specific CTA ("Start a campaign" / "Join as a creator")

### 4.4 Process (built)
- **Goal:** show how working with Influenzo goes, step by step.
- **Structure:** 4 steps (currently Discover, Define, Design, Evolve), each with a title and 1-2 sentence description. Section label: "From Seed to System."
- **Copy needed:** rewrite the 4 steps for influencer management (e.g. match, plan, launch, measure). **TBC:** final step names.

### 4.5 Our Services (built)
- **Goal:** what Influenzo actually does.
- **Structure:** 3 cards, each with a title and 1-2 sentence description.
- **Copy needed:** 3 services (currently AI-agency placeholders). Candidates: creator sourcing and vetting, campaign management, performance reporting, creator talent management, contracts and payments.

### 4.6 Why Choose Us (built)
- **Goal:** differentiate from typical agencies.
- **Structure:** two columns, "Other Agencies" vs "Influenzo", 8 short capsule phrases each (2-3 words).
- **Copy needed:** heading, description, 8 negatives (what others do wrong) and 8 positives (what we do).

### 4.7 Meet the Team (built)
- **Goal:** put faces to the startup. Two members.
- **Copy needed per member:** name, role, department, join date, short status line, photo.
- **Section copy:** heading and description.

### 4.8 FAQ (built)
- **Goal:** remove objections before the contact step. Two columns, 8 questions.
- **Copy needed:** 8 question/answer pairs. Suggested mix: 4 for brands (pricing, timeline, how creators are chosen, how results are measured) and 4 for creators (how to join, fees, payment timing, exclusivity).
- **TBC:** answers involving money, contracts and timelines must come from the founders.

### 4.9 Contact / final CTA (not built, recommended)
- **Goal:** convert. Nav item "Contact" needs a destination.
- **Copy needed:** heading, short line, form fields or booking link, email/social handles.

### 4.10 Footer (not built, recommended)
- Logo, short tagline, nav links, social links, legal (privacy, terms), copyright.

---

## 5. Voice and tone

- **Clear, confident, human.** No jargon, no buzzwords ("synergy", "next-gen", "revolutionary").
- **Short sentences.** Headlines under ~8 words, descriptions under ~25 words.
- **Outcome-led.** Talk about results for the reader (more reach, better deals, less admin), not our features.
- **Warm but professional.** This is a people business: creators are people, not "assets".
- Avoid claims we cannot back up (rankings, guarantees, specific numbers) until confirmed.

---

## 6. Brand and design reference (for context, not copy)

- **Name:** Influenzo (wordmark with a four-point spark icon).
- **Look:** soft lavender/purple gradients, near-white warm backgrounds, black buttons, frosted-glass details, rounded shapes.
- **Font:** Mona Sans.
- **Stack:** React, TypeScript, Tailwind CSS, shadcn/ui, Motion. See `CLAUDE.md` for the engineering rules.
- **Images:** placeholders are marked in code with `TODO`; real photos and illustrations will be added later.

---

## 7. Open questions for the founders

1. One-line description of Influenzo (what we do, for whom).
2. Do we manage creators (talent management), run brand campaigns, or both?
3. Which platforms and which regions?
4. Real numbers: creators, brands, campaigns, countries.
5. Pricing/commission model (to decide whether a pricing section is needed; the old nav had one).
6. Primary CTA: book a call, fill a form, or join a waitlist?
7. Names, roles and photos for the two team members.
8. Any case studies or testimonials we can use? (A "Case Studies" section was in the original nav.)
9. Separate pages for Brands and Creators, or sections on the home page?

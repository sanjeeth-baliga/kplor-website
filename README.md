# Kplor Website

The official web platform for **Kplor** — a new-age eLearning content creation studio that transforms raw manuals, presentations, lecture notes, and syllabi into engaging, high-retention video learning courses.

---

## 📋 Change Log & Temporary Archivals

This section documents current temporary states, archived components, and exact steps for restoring them.

### 1. Footer Solutions Links (Temporarily Disabled)

- **File**: [`src/app/footer.tsx`](src/app/footer.tsx)
- **Status**: The four solution links under the **Solutions** column in the footer are temporarily rendered as plain text labels (`<span>` elements) rather than active clickable hyperlinks (`<Link>`):
  - Corporate L&D (`/solutions/corporate-training`)
  - Universities & ODL (`/solutions/universities-odl`)
  - K-12 (`/solutions/k12-learning-videos`)
  - Exam Prep (JEE, CFA & more) (`/solutions/exam-preparation-videos`)
- **Reason**: The solution detail pages are being updated and refined.
- **How to Re-Enable**:
  In [`src/app/footer.tsx`](src/app/footer.tsx), locate lines 63–70:
  ```tsx
  {solutions.map((s) => (
    <span key={s.slug} className="mb-2 text-base text-white/75 select-none cursor-default">
      {s.audience}
    </span>
  ))}
  ```
  Replace `<span ...>` with `<Link ...>`:
  ```tsx
  {solutions.map((s) => (
    <Link key={s.slug} href={`/solutions/${s.slug}`} prefetch={true} className="mb-2 text-base hover:text-[#00FFFF]">
      {s.audience}
    </Link>
  ))}
  ```

---

### 2. Sample Content / Video Catalogue (`/videos` & `/videos/[slug]`) (Archived)

- **Active Pages**: [`src/app/videos/page.tsx`](src/app/videos/page.tsx) (NDA & free custom sample landing), [`src/app/videos/[slug]/page.tsx`](src/app/videos/[slug]/page.tsx) (`noindex` + redirects to `/videos`)
- **Archived Catalog Component**: [`src/app/videos/ArchivedVideosCatalog.tsx`](src/app/videos/ArchivedVideosCatalog.tsx)
- **Archived Standalone Video Page**: [`src/app/videos/[slug]/ArchivedVideoDetailPage.tsx`](src/app/videos/%5Bslug%5D/ArchivedVideoDetailPage.tsx)
- **Sitemap**: [`src/app/sitemap.ts`](src/app/sitemap.ts) (individual `/videos/<slug>` and `/solutions/<slug>` URLs temporarily commented out)
- **Data Source**: [`src/app/videos/videoData.ts`](src/app/videos/videoData.ts) (fully preserved, 0 items deleted)
- **Status**: The full video catalogue and all 30 standalone sample video pages have been archived and hidden from public access and search indexing while client courseware is kept under NDA. Solution detail pages ([`src/app/solutions/[slug]/page.tsx`](src/app/solutions/%5Bslug%5D/page.tsx)) also no longer link to individual sample videos.
- **How to Restore the Full Video Catalogue & Standalone Video Pages**:
  1. In [`src/app/videos/page.tsx`](src/app/videos/page.tsx), replace the default export with the archived component:
     ```tsx
     import { ArchivedVideosCatalog } from "./ArchivedVideosCatalog";

     export default function VideosPage() {
       return <ArchivedVideosCatalog />;
     }
     ```
  2. Restore [`src/app/videos/[slug]/page.tsx`](src/app/videos/%5Bslug%5D/page.tsx) by copying the contents of [`src/app/videos/[slug]/ArchivedVideoDetailPage.tsx`](src/app/videos/%5Bslug%5D/ArchivedVideoDetailPage.tsx) back into `page.tsx`.
  3. In [`src/app/sitemap.ts`](src/app/sitemap.ts), uncomment the `allVideos` (and `solutions`, if re-enabled) entries and imports.

---

### 3. Homepage "How are we different?" Cards

- **File**: [`src/components/home/HomeContent.tsx`](src/components/home/HomeContent.tsx)
- **Status**: Updated to three focused value propositions without numeric labels:
  - **Designed by Learning Designers** (*EVERY MODULE STARTS WITH A LEARNING GOAL*): Focuses on pedagogical intent, in-scene quizzes, and SME checks.
  - **Speed & Scale** (*25+ HOURS OF VIDEO, GENERATED PER DAY*): Highlights high throughput, no in-house crew requirements, and rush timeline support.
  - **90% Lower Cost** (*STUDIO-GRADE ANIMATION, WITHOUT STUDIO BILLS*): Emphasizes studio-grade animation at a fraction of studio pricing, SCORM compliance, and included revisions.
- **Header**: Subtitle removed to keep section header clean and punchy.

---

### 4. Lead Capture & Callback Modal Validation

- **File**: [`src/components/common/CallbackModal.tsx`](src/components/common/CallbackModal.tsx)
- **Backend Route**: [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)
- **Key Features**:
  - **Work Email Enforcement**: Blocks personal/free email domains (`gmail.com`, `yahoo.com`, `hotmail.com`, `outlook.com`, `icloud.com`, `proton.me`, etc.) and keyboard-mash/gibberish domains (e.g. `sdvsdadfscg.com`, consonant clusters $\ge 5$, or vowel-deficient domain strings). Displays helpful inline guidance prompting for a corporate or institutional email.
  - **Mandatory Preferred Call Window**: Initial selection defaults to an unselected placeholder (`<option value="" disabled>Select preferred window *</option>`), requiring user selection prior to submission.
  - **Mandatory Requirements & Organization**: Organization and requirement text areas are required.
  - **Audited Notifications**: Submissions are logged to terminal console, saved locally to `data/leads.json`, and dispatched to configured webhooks/scripts.

---

### 5. Team Members Updates (About Us)

- **File**: [`src/components/home/HomeContent.tsx`](src/components/home/HomeContent.tsx)
- **Status**: Updated to include 6 team members with emails removed for privacy:
  - **Mukil** — Co-Founder & CEO (LinkedIn)
  - **Sanjeeth** — Co-Founder & CTO (LinkedIn)
  - **Bharadhwaj** — Founder's Office Associate (LinkedIn, Photo: `/Bharadhwaj.jpeg`)
  - **Kanishk** — Engineering I (Photo: `/Kanishk.PNG`)
  - **Saniya** — Engineer I (Photo: `/Saniya.jpeg`)
  - **Sneha** — Engineering I (Photo: `/Sneha.jpeg`)
- **Layout**: 2-column card grid (`grid-cols-1 sm:grid-cols-2 max-w-3xl`) with 3 balanced rows and equalized card heights.

---

### 6. FAQs & "Join Us" Links

- **Files**: [`src/components/home/HomeContent.tsx`](src/components/home/HomeContent.tsx), [`src/app/footer.tsx`](src/app/footer.tsx)
- **FAQs Updated**: Added 10 structured questions covering multilingual capabilities, cost efficiency, LMS integration, diffusion vs. Kplor proprietary model comparison, target audience, content ownership, strict confidentiality/NDA data destruction, revision handling, post-launch updates, and how to get started with a pilot module. Removed legacy duplicate questions.
- **Join Us Link**: Replaced all Google Form links with Kplor's official LinkedIn page (`https://www.linkedin.com/company/kplor/`) across the footer and About tab.

---

### 7. Security & Spam Hardening (pre-deploy audit)

- **[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)**: payload size cap (10 KB), per-IP rate limit (5 requests / 10 min), honeypot field, server-side validation (so the work-email rule can't be bypassed by posting directly), field whitelisting, `@everyone`/mention stripping for Discord/Slack, and a real error (instead of fake success) if no notification channel works in production.
- **[`src/lib/workEmail.ts`](src/lib/workEmail.ts)**: the work-email validator, shared by the modal and the API.
- **[`next.config.ts`](next.config.ts)**: security headers (`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) and `X-Powered-By` removed.
- **[`.gitignore`](.gitignore)**: ignores `.env*` (but keeps `.env.example`), `/data/` (lead PII), `/diffusion_pipeline/` (~194 MB) and scratch files.
- **Environment variables**: copy `.env.example` to `.env.local` locally. In production set `NOTIFICATION_WEBHOOK_URL` (and optionally `GOOGLE_SCRIPT_URL`) in the hosting dashboard. `.env.local` is never deployed.

---

## 🛠️ Development & Build

### Requirements
- Node.js 18+ (tested with Node 20 / 22)
- npm, yarn, pnpm, or bun

### Running Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site.

### Type Checking & Building
```bash
npx tsc --noEmit
npm run build
npm run start
```

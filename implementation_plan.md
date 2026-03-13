Website Personal Revamp - Implementation Plan
Merevamp website personal Andrel Karunia Sitanggang dengan fokus pada SEO, mobile-friendly, accessibility, desain profesional dengan tema programmer, dan animasi yang canggih namun realistis.

User Review Required
IMPORTANT

Rencana Desain & Warna: Saya akan menggunakan tema dark mode dengan palette warna profesional untuk programmer:

Background: Dark blue-grey (#0f172a, #1e293b)
Accent: Cyan/Electric blue (#06b6d4, #3b82f6)
Text: White/Light grey dengan kontras tinggi
Highlight: Subtle gradients untuk efek modern
Apakah Anda ingin light mode toggle atau pure dark mode? Atau ada preferensi warna lain?

WARNING

Animasi Page: Saya akan menambahkan animasi saat load, unload, dan transisi halaman. Ini memerlukan custom JavaScript dan mungkin mempengaruhi performa sedikit. Animasi akan dibuat smooth dan tidak berlebihan.

Proposed Changes
SEO & Meta Tags Enhancement
[MODIFY] 
Perbaiki metadata: title lebih deskriptif, description yang engaging
Update author info dengan link sosial media lengkap
Tambahkan keywords untuk SEO
[MODIFY] 
seo.js
Tambahkan Open Graph tags untuk social media sharing
Tambahkan Twitter Card meta tags
Tambahkan canonical URL
Implementasi structured data (JSON-LD) untuk person schema
Improve title dan description handling
Accessibility Improvements
[MODIFY] 
header.jsx
Tambahkan proper semantic HTML (nav dengan aria-label)
Improve focus states untuk keyboard navigation
Pastikan logo memiliki alt text yang descriptive
[MODIFY] 
footer.jsx
Tambahkan aria-label yang lebih descriptive untuk setiap link
Improve keyboard navigation dengan proper tabindex
Tambahkan focus indicators yang visible
[MODIFY] 
contact.jsx
Perbaiki keyboard interactions (current implementation kurang optimal)
Tambahkan aria-expanded untuk toggle state
Improve focus trap saat contact panel terbuka
Tambahkan ESC key untuk menutup panel
Professional Design System
[NEW] 
design-system.css
Membuat design system dengan:

CSS Custom Properties untuk theming (colors, spacing, typography)
Professional color palette dengan programmer theme
Typography scale menggunakan modern fonts (Inter, JetBrains Mono untuk code)
Shadow system untuk depth
Border radius scale
Transition/animation utilities
[MODIFY] 
tailwind.config.js
Extend dengan custom colors (dark theme programmer palette)
Add custom fonts (Inter untuk body, JetBrains Mono untuk accents)
Custom shadows dan gradients
Custom animation utilities
Sophisticated Animations & Interactions
[NEW] 
animations.js
Utility functions untuk:

Page load animation (fade in + slide up)
Page transition effects
Mouse tracking/parallax effect untuk hero section
Smooth scroll utilities
Intersection Observer untuk scroll-triggered animations
[NEW] 
page-transition.css
CSS untuk page transitions:

Fade + scale effect saat page load
Slide transition between pages
Loading states
Exit animations
[MODIFY] 
Implement page transition logic dengan shouldUpdateScroll
Add page load/unload event handlers
Initialize animation utilities
Enhanced Homepage Content
[MODIFY] 
index.js
Redesign homepage dengan sections:

Hero Section: Dengan animated greeting, nama lengkap, title/role
About Section: Professional bio pendek tentang Andrel
Skills Section: Tech stack dengan animated icons
Featured Projects: Preview 2-3 projects terbaik
Contact CTA: Call-to-action untuk kontak
Semua dengan:

Responsive layout (mobile-first)
Smooth scroll animations
Hover effects pada interactive elements
Proper semantic HTML (section, article, etc.)
Additional Pages
[NEW] 
projects.js
Halaman projects dengan:

Grid layout untuk project cards
Filter/kategori projects
Animated card hover effects
Project details (tech stack, links, description)
Responsive design
[NEW] 
profile.js
Halaman about/profile dengan:

Detailed bio
Experience timeline
Education background
Skills breakdown
Interests & hobbies
Downloadable CV/Resume link
Mobile Optimization
[MODIFY] 
layout.css
Improve responsive typography
Touch-friendly button sizes (min 44x44px)
Optimized spacing untuk mobile
Better mobile navigation
[NEW] 
mobile-optimization.css
Mobile-specific utilities
Safe area insets untuk notched devices
Touch gesture optimization
Performance optimizations (will-change, contain)
Performance & Best Practices
[MODIFY] 
package.json
Update dependencies:

Add framer-motion untuk advanced animations (optional)
Add react-intersection-observer untuk scroll animations
Verification Plan
Automated Tests
Build Test

cd /Users/developer/gaweki-website
npm run clean && npm run build
Verify: Build completes without errors

Lighthouse SEO & Accessibility Audit

Build production version
Run Lighthouse audit via Chrome DevTools
Target scores: SEO > 90, Accessibility > 95, Performance > 85
a11y Testing with axe

npm install -D @axe-core/cli
npx axe http://localhost:8000 --exit
Verify: No critical accessibility violations

Browser Testing
Page Load Animation Test

Start dev server: npm run develop
Open browser with Network throttling (Fast 3G)
Navigate to homepage
Verify: Smooth fade-in animation on load
Hard refresh (Cmd+Shift+R)
Verify: Animation replays correctly
Page Transition Test

Navigate between Home → Projects → Profile → Home
Verify: Smooth transitions without jarring jumps
Check browser console for errors
Mouse Interaction Test

Move mouse over hero section
Verify: Subtle parallax/tracking effect
Hover over buttons/links
Verify: Smooth hover animations
Mobile Responsiveness Test

Open DevTools responsive mode
Test on: iPhone SE (375px), iPad (768px), Desktop (1920px)
Verify: All sections layout correctly
Test touch interactions (tap, scroll)
Manual Verification
Keyboard Navigation Test

Try navigating entire site using only Tab/Shift+Tab
Verify: All interactive elements are reachable
Verify: Focus indicators are clearly visible
Test: ESC key closes contact modal
Screen Reader Test (Optional - User can test)

Enable VoiceOver (Cmd+F5 on Mac)
Navigate through homepage
Verify: All content is announced properly
Verify: Semantic structure makes sense
SEO Meta Tags Verification

View page source
Check for: title, meta description, Open Graph tags, Twitter Card tags
Test: Share link on Facebook/Twitter to see preview
Performance Check

Use production build: npm run serve
Check Network tab in DevTools
Verify: No unnecessary large assets
Verify: Animations run at 60fps (check Performance tab)
Content Review
User reviews homepage content for accuracy
User verifies all social media links are correct
User confirms personal information (bio, skills, experience) is accurate


data profile diri:
PengalamanPengalaman

Frontend Developer
Frontend Developer
Frontend Developer
 PT Gajicermat Mandiri Digital Indonesia · Purnawaktu PT Gajicermat Mandiri Digital Indonesia · Purnawaktu
Jan 2022 - Saat ini · 3 thn 11 blnJan 2022 hingga Saat ini · 3 thn 11 bln
Jakarta Selatan, Jakarta Raya, IndonesiaJakarta Selatan, Jakarta Raya, Indonesia
Projects:
* Two Mobile Apps project using react native - Finance Service
 - UangCermat
 - One app for internal users
* Two Web apps using nextjs - Finance Service
 - Two web for internal users
* A Web app using reactjs - Finance Service
 - A web for internal users
* 2 Web apps using nextjs - HRIS Service
 - Two web for internal users
* 3 Mobile Apps project using react native - HRIS Service
 - KerjaCermat
 - 2 apps for internal users

Progress:
* iOS app development

Learn:
* React native
* Typescript
* Formik
* react-query
* Android Development till App Release

Achievement:
1. Finished a fast-pace Epic Ticket in two week due date to build new app for financial serviceProjects: * Two Mobile Apps project using react native - Finance Service - UangCermat - One app for internal users * Two Web apps using nextjs - Finance Service - Two web for internal users * A Web app using reactjs - Finance Service - A web for internal users * 2 Web apps using nextjs - HRIS Service - Two web for internal users * 3 Mobile Apps project using react native - HRIS Service - KerjaCermat - 2 apps for internal users Progress: * iOS app development Learn: * React native * Typescript * Formik * react-query * Android Development till App Release Achievement: 1. Finished a fast-pace Epic Ticket in two week due date to build new app for financial service
Pengembangan Web, React.js dan +5 keahlian




Logo Tokodistributor - B2B Marketplace
Frontend Web Developer
Frontend Web Developer
tokodistributortokodistributor
Apr 2019 - Des 2021 · 2 thn 9 blnApr 2019 hingga Des 2021 · 2 thn 9 bln
Jakarta, Jakarta Raya, IndonesiaJakarta, Jakarta Raya, Indonesia
Web Mobile Reseller:
1. PWA Integration - Framework7 React

Web Reseller Performance on React 16 (Pagespeed measurement):
1. Homepage - fix from 35 to 80
2. Popular Stores -fix from 46 to 78
3. Category two level - fix from 62 to 80
4. Supplier - fix from 51 to 74
5. Produk Terbaru - fix from 62 to 91
6. General - fix from 68 to 83
7. Produk Terlaris - fix from 64 to 90
8. Category one level - fix from 54 to 74
9. Search - fix from 61 to 75


Add feature to Web Desktop Reseller React 16:
1. Optimize SEO(add schema markup, add dynamic meta title and description) on:
 1.1. Product detail page
 1.2. Category page
 1.3. FAQ page
2. Integrate article and sub category as SEO content into category page (ex: https://www.tokodistributor.com/category/elektronik)

Rewrite Web Desktop(https://tokodistributor.com) to React 16:
1. Home (All section)
2. Produk Terbaru
3. Produk Terlaris
4. Cart
5. Chat with Sendbird
6. SEO with Helmet
7. Offline mode
8. Google Analytic
9. Favourites
10. Popular Stores

File sources:
1. S3 Upload Package 

State Management:
1. Redux
2. Reac Hooks

Success increase from 35 to 90 point on Page Speed Insight

Rewrite CSS(React Framework7) in https://m.tokodistributor.com
1. Homepage
2. Login & Register
3. Product Detail
4. Category

Rewrite Module to Vue (halaman):
1. Home
2. Produk Terbaru
3. Produk Terlaris
4. Semua Kategori
5. Supplier(toko)
6. Detail Product
7. Metode Pembayaran



1. Supplier Modul
 1.1 Integrate chatting feature (third party: Qiscus)
 1.2 Integrate Custom Ekspedisi & Auto Resi
 1.3 Integrate complaint feature for Supplier
 1.4 COD Transaction




2. Reseller Modul :
 2.1 Integrate chatting feature (third party: Qiscus)
 2.2 Integrate Checkout Custom Ekspedisi & Auto Resi
 2.3 Integrate virtual account payment method by BNI Virtual Account
 2.4 Integrate complaint feature for Reseller




3. Admin Modul : 
 3.1 Integrate complaint feature for AdminWeb Mobile Reseller: 1. PWA Integration - Framework7 React Web Reseller Performance on React 16 (Pagespeed measurement): 1. Homepage - fix from 35 to 80 2. Popular Stores -fix from 46 to 78 3. Category two level - fix from 62 to 80 4. Supplier - fix from 51 to 74 5. Produk Terbaru - fix from 62 to 91 6. General - fix from 68 to 83 7. Produk Terlaris - fix from 64 to 90 8. Category one level - fix from 54 to 74 9. Search - fix from 61 to 75 Add feature to Web Desktop Reseller React 16: 1. Optimize SEO(add schema markup, add dynamic meta title and description) on: 1.1. Product detail page 1.2. Category page 1.3. FAQ page 2. Integrate article and sub category as SEO content into category page (ex: https://www.tokodistributor.com/category/elektronik) Rewrite Web Desktop(https://tokodistributor.com) to React 16: 1. Home (All section) 2. Produk Terbaru 3. Produk Terlaris 4. Cart 5. Chat with Sendbird 6. SEO with Helmet 7. Offline mode 8. Google Analytic 9. Favourites 10. Popular Stores File sources: 1. S3 Upload Package State Management: 1. Redux 2. Reac Hooks Success increase from 35 to 90 point on Page Speed Insight Rewrite CSS(React Framework7) in https://m.tokodistributor.com 1. Homepage 2. Login & Register 3. Product Detail 4. Category Rewrite Module to Vue (halaman): 1. Home 2. Produk Terbaru 3. Produk Terlaris 4. Semua Kategori 5. Supplier(toko) 6. Detail Product 7. Metode Pembayaran 1. Supplier Modul 1.1 Integrate chatting feature (third party: Qiscus) 1.2 Integrate Custom Ekspedisi & Auto Resi 1.3 Integrate complaint feature for Supplier 1.4 COD Transaction 2. Reseller Modul : 2.1 Integrate chatting feature (third party: Qiscus) 2.2 Integrate Checkout Custom Ekspedisi & Auto Resi 2.3 Integrate virtual account payment method by BNI Virtual Account 2.4 Integrate complaint feature for Reseller 3. Admin Modul : 3.1 Integrate complaint feature for Admin
Pengembangan Web




+2
React Developer
React Developer
React Developer
Satu Pintu Kemenparekraf · Pekerja LepasSatu Pintu Kemenparekraf · Pekerja Lepas
Mei 2021 - Mei 2021 · 1 blnMei 2021 hingga Mei 2021 · 1 bln
Jakarta Timur, Jakarta Raya, IndonesiaJakarta Timur, Jakarta Raya, Indonesia
Repair existing platformRepair existing platform
Pengembangan Web
Logo Skillomo
React Developer
React Developer
Skillomo · Pekerja LepasSkillomo · Pekerja Lepas
Apr 2021 - Apr 2021 · 1 blnApr 2021 hingga Apr 2021 · 1 bln
Jakarta Timur, Jakarta Raya, IndonesiaJakarta Timur, Jakarta Raya, Indonesia
Initiate Skillomo Reactjs LearnerInitiate Skillomo Reactjs Learner
Pengembangan Web
Logo Open Source
Individual Contributor
Individual Contributor
Open Source · Pekerja LepasOpen Source · Pekerja Lepas
Jul 2020 - Apr 2021 · 10 blnJul 2020 hingga Apr 2021 · 10 bln
Repository:
1. React js ID
2. Duckduckgo
3. https://tailwindcomponents.com/u/genuineswe
4. Vest - https://github.com/ealush/vest/issues/310
5. Hospital Run - Fix label - https://github.com/HospitalRun/hospitalrun-frontend/issues/2372, https://github.com/HospitalRun/hospitalrun-frontend/issues/2295
6. My personal projects : https://github.com/genuinesweRepository: 1. React js ID 2. Duckduckgo 3. https://tailwindcomponents.com/u/genuineswe 4. Vest - https://github.com/ealush/vest/issues/310 5. Hospital Run - Fix label - https://github.com/HospitalRun/hospitalrun-frontend/issues/2372, https://github.com/HospitalRun/hospitalrun-frontend/issues/2295 6. My personal projects : https://github.com/genuineswe…lihat lebih banyak

Tampilkan semua 11 pengalaman
PendidikanPendidikan
Logo Universitas Gadjah Mada (UGM)
Universitas Gadjah Mada (UGM)
Universitas Gadjah Mada (UGM)
Associate's degree, Elektronika dan InstrumentasiAssociate's degree, Elektronika dan Instrumentasi
2013 - 20172013 - 2017
Kegiatan dan masyarakat: BEM KM UGM, Gadjah Mada Menginspirasi, Paguyuban SOSMAS UGMKegiatan dan masyarakat: BEM KM UGM, Gadjah Mada Menginspirasi, Paguyuban SOSMAS UGM
Organisasi di BEM KM UGM dan berencana wisuda Mei 2016 untuk ijazah D3.Organisasi di BEM KM UGM dan berencana wisuda Mei 2016 untuk ijazah D3.
Facebook.com AccountFacebook.com Account
All of my "diary" maybe written over there
# Buildwell Partners | Mobile-First React Web MVP (PWA)

**A mobile-app-like, shareable, frontend-only React showcase of an artisan sourcing and property project management platform in Nigeria.** Brand name **Buildwell Partners** is temporary and can be replaced with your company's real name.

The workflow mirrors the business brief: customer accounts → choose trade and team size → live *indicative* estimate → submit a project brief → admin final quotation → customer approval → simulated website payment → private artisan compensation and assignment → project progress and messages.

## 1. Open in VS Code and run

Requires **Node.js 18+**.

1. Unzip the folder.
2. Open `buildwell-mobile-pwa` in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm start
```

5. Open **http://localhost:3000** in your browser.
6. Use Chrome's mobile device toolbar or visit the hosted site on a phone.

**No npm install and no backend setup are needed to run this demo.** The prebuilt React bundle is already in `public/app.js` and the small local static server uses only Node's built-in modules. `npm run dev` starts the same server.

## 2. Demo accounts and sample roles

On the landing page click **Get started → Try the demo** and choose **Customer**, **Admin** or **Artisan**.

| Role | Demo email | Password |
|---|---|---|
| Customer | `client@buildwell.demo` | `demo1234` |
| Administrator | `admin@buildwell.demo` | `demo1234` |
| Artisan (painter) | `artisan@buildwell.demo` | `demo1234` |
| Artisan (plumber) | `amina@buildwell.demo` | `demo1234` |

These are **fake accounts inside each visitor's browser**, not authenticated accounts on a shared server. A visitor can also create a browser-local test customer account. Use throwaway details, not real passwords or sensitive information. To switch roles, tap **More → Log out** on a phone, or **Log out** in the desktop sidebar. Tap **More → Reset demo data** to restore original sample data in that browser.

## 3. Features to demonstrate

**Customer**
- Select Painting, Masonry, Plumbing, Electrical, Carpentry, Tiling, Roofing, POP/Ceilings or Other.
- Choose service subtype, property type, team size, days, area, material source, urgency, start date, location and notes. Optionally attach small reference images.
- See an automatically updating **non-binding NGN estimate** with illustrative labour, materials and coordination costs.
- Submit a request, view history, communicate, approve a final admin quote and trigger a clearly labelled **demo payment**.

**Administrator**
- View the incoming requests, full briefs and customer messages.
- Enter a final quote with labour, materials, logistics and your company fee, then send it to the customer's demo dashboard.
- View a **preview-only email outbox** with draft/request/quote/assignment messages. No real email is sent.
- Add artisans, set private daily rates, assign selected people to a project and specify a **separate, private payout rate** and dispatch notes.
- Update job progress and see the local activity log.

**Artisan**
- Open assigned projects, see site details, agreed payout and dispatch instructions.
- Mark work started and completed.

The customer's UI does not show your private artisan payout amounts, dispatch notes or internal roster.

## 4. Deploy on Vercel to get a public link

This edition is designed specifically for **Vercel static hosting**, without a persistent Node backend.

**Option A: GitHub → Vercel Dashboard (recommended)**

1. Create a new GitHub repository and push the contents of this folder, including `vercel.json` and `public/`.
2. Sign in at [vercel.com](https://vercel.com) and select **Add New → Project**.
3. Import your repository.
4. Set **Framework Preset: Other** and **Root Directory: repository root**.
5. The included `vercel.json` specifies **Output Directory: `public`** and disables the build step.
6. Click **Deploy**. Vercel gives you a shareable HTTPS address such as `your-project.vercel.app`.

**Option B: Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel --prod
```

Run from the `buildwell-mobile-pwa` folder. Follow the prompts and choose **Other** for framework if asked. The `vercel.json` remains the source of the static deployment settings. The CLI requires an internet connection and your own Vercel account.

If the dashboard shows incorrect defaults, explicitly set Framework to **Other**, Output Directory to **public**, and leave Build Command **blank**. Do not use `dist` or `.next`.

**This ZIP does not deploy itself and no Vercel project has been created for you.** You need to deploy from your own account to receive a shareable link.

## 5. How app installation works on phones

The web app includes a full PWA manifest, 192/512px icons, a maskable icon, service worker, app-mode display, mobile bottom tabs and safe-area layouts.

- **Android (Chrome/Edge):** If supported and eligible, the site shows an optional **Install** invitation. Tap it to trigger the browser's install confirmation. Otherwise use the browser menu → **Install app** or **Add to Home Screen**.
- **iPhone (Safari):** A helpful prompt explains **Share → Add to Home Screen → Add**. Apple controls the native install interface, so the site cannot force a native installation popup. The Safari Add to Home Screen entry is the reliable path.
- **Already installed:** It opens in standalone app-like mode (without the normal browser address bar).
- **Offline:** The app shell is cached after the first successful load. Browser-local demo data is also accessible without a network connection, subject to browser storage and caching rules.

No location, camera, notification or other device permission is requested on first visit. Browsers require user activation and control when installation prompts can be shown.

## 6. Very important: this is a demo, not a live customer system

All data is stored in `localStorage` **per visitor, per browser and device**. There is no shared database and no real authentication. The customer, admin and artisan roles in the **same browser** can explore one connected scenario, but a project submitted on one person's phone **will not appear on another person's phone**. Clearing site data or using a different browser erases or separates those local projects. Browser storage can also fill up if too many photos are added.

- **Payment is simulated.** No card is charged. Never present a demo payment as an actual escrow or financial transaction.
- **Email is simulated.** Messages appear in the local admin outbox but do not reach a real email inbox.
- **Accounts are demo accounts.** Browser-side controls are not secure production authorization.
- **Artisans, company, rates and project addresses are illustrative.** Do not enter sensitive personal information when sharing the demo publicly.
- This is a **review/demo version** for showing investors, business partners, stakeholders and potential clients, **not** for accepting real jobs or payments.

**For the real deployment:** use a managed authentication service, a centralized database (for example Supabase/PostgreSQL), server-side authorization, secure uploads, transactional email and verified Paystack/Flutterwave payment handling. If you plan to custody project funds, design a provider-approved arrangement separately. Avoid putting secret payment/email keys into the frontend.

## 7. Edit the website

- `src/App.jsx` : React JSX source for landing page, customer workspace, admin screens and artisan workspace.
- `public/styles.css` : original desktop layout and responsive styles.
- `public/mobile.css` : mobile enhancements, bottom navigation, PWA invitation and safe areas.
- `public/demo-api.js` : browser-local demo data, roles, pricing, messages, quotes, assignments and payment simulation.
- `public/install.js` : install prompt event and iOS instructions.
- `public/sw.js` and `public/manifest.webmanifest` : PWA caching and installation.
- `public/icons/` : PNG home-screen icons.
- `public/app.js` : committed prebuilt runnable JSX. **Keep this file included for Vercel.**
- `vercel.json` : static hosting configuration for Vercel.
- `scripts/serve.cjs` : dependency-free local static server.

If you edit **`src/App.jsx`**, install TypeScript once on a machine with internet access and recompile:

```bash
npm install
npm run build
npm start
```

Commit both `src/App.jsx` and the newly generated `public/app.js` before redeploying. This MVP preserves the original offline-ready React UMD runtime and will benefit from an upgrade to a modern React toolchain (such as Vite) before a production launch.

To replace the temporary name and colours, edit the brand text in `src/App.jsx`, the title and metadata in `public/index.html`, `public/manifest.webmanifest` and CSS. Replace the icon artwork in `public/icons`, then rebuild the JSX.

## 8. Quality checks

```bash
npm test
```

The included checks verify PWA metadata, icons, scripts and Vercel static configuration. The web flows were also checked in a headless browser at 320px, 390px, 430px and desktop widths: request creation → admin quote → client approval → fake payment → artisan assignment → project progress → email outbox, with no JS errors or horizontal overflow.

---

**Buildwell Partners** is a placeholder brand. All demo customer/artisan records are fictitious and all financial figures are illustrative.

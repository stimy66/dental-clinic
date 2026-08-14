# عيادة السعادة — Al Saada Dental Clinic

Static bilingual website (Arabic default, full RTL) optimized for GitHub Pages.

Quick start

1. Open the folder in your local machine or a Git repo.
2. Commit and push to a repository named `<your-repo>` on GitHub.
3. In GitHub repository settings, enable GitHub Pages from the `main` branch (or `gh-pages`).

What’s included

- `index.html` — bilingual site with Arabic default and English option.
- `styles.css` — responsive, blue/white theme with RTL support.
- `scripts.js` — language toggle, cookie consent, appointment mailto fallback.
- `assets/logo.svg`, `assets/hero.svg` — logo and hero graphics.
Placeholders included

This repo includes three SVG placeholders representing royalty-free stock photos:
- `assets/hero-stock.svg` — hero image placeholder (used in `index.html`).
- `assets/photo-1.svg`, `assets/photo-2.svg` — gallery placeholders.

To replace with real images, add `assets/hero.jpg` or `assets/hero.webp` and update the `src` in `index.html` to match the filename.

Stock images

This scaffold uses an SVG placeholder for the hero image. Replace it with high-quality stock photos (clinic interior, staff, or patient-friendly imagery). Recommended sources: Unsplash, Pexels, or paid stock providers.

Filenames & sizes:
- `assets/hero.jpg` or `assets/hero.webp` — recommended 1600x900 or 1200x675 for hero (keep under ~300KB for web).
- `assets/photo-1.jpg`, `assets/photo-2.jpg` — optional additional photos sized around 800x600.

Optimization tips:
- Convert to `webp` for best compression where supported.
- Use ImageMagick to resize/convert locally:

```bash
magick input.jpg -resize 1600x900 -quality 85 assets/hero.jpg
magick input.jpg -strip -quality 80 assets/hero.webp
```

To use your photo instead of the placeholder, add the file to `assets/` and update `index.html` if you used a different filename. The current `index.html` references `assets/hero.svg` — replace that `src` with `assets/hero.jpg` or `assets/hero.webp`.

Formspree setup

This scaffold supports Formspree for serverless form submissions. To enable it:

1. Create a free form at https://formspree.io/ and copy the form endpoint (looks like `https://formspree.io/f/abcdxyz`).
2. Open `scripts.js` and set the `FORM_ENDPOINT` constant to that URL.
3. The booking form will POST JSON to Formspree and show a confirmation message on success.

If you don't configure Formspree, the form falls back to opening the user's mail client using `mailto:`.

Current development setup

This repo is preconfigured to use the Formspree endpoint: `https://formspree.io/f/mzepvkyp` in `scripts.js`. Replace it if you want to use a different Formspree form.

Download images locally (optional)

If you prefer to store the Unsplash images locally and serve `assets/hero.jpg`, `assets/service1.jpg`, etc., run one of the following on your development machine.

Using curl (Linux / macOS / WSL):

```bash
cd path/to/project/assets
curl -L -o hero.jpg "https://source.unsplash.com/1600x900/?dental,clinic"
curl -L -o service1.jpg "https://source.unsplash.com/800x600/?dentist,smile"
curl -L -o service2.jpg "https://source.unsplash.com/800x600/?teeth,whitening"
curl -L -o service3.jpg "https://source.unsplash.com/800x600/?dental,implant"
```

Using PowerShell (Windows):

```powershell
cd C:\path\to\project\assets
Invoke-WebRequest -Uri "https://source.unsplash.com/1600x900/?dental,clinic" -OutFile "hero.jpg"
Invoke-WebRequest -Uri "https://source.unsplash.com/800x600/?dentist,smile" -OutFile "service1.jpg"
Invoke-WebRequest -Uri "https://source.unsplash.com/800x600/?teeth,whitening" -OutFile "service2.jpg"
Invoke-WebRequest -Uri "https://source.unsplash.com/800x600/?dental,implant" -OutFile "service3.jpg"
```

After downloading, update `index.html` image `src` attributes to point at the files in `assets/` (the repo previously used these names). Optimizing images to `webp` is recommended for best performance.

Appointment form

The form uses a `mailto:` fallback so it works without a server. You can configure a Formspree endpoint by setting `FORM_ENDPOINT` in `scripts.js`.

GDPR & Privacy

Includes a cookie consent banner and a privacy section. Update the privacy copy as needed for your legal requirements.

Customization

- Replace `assets/logo.svg` if you want a different logo file.
- Edit text in `index.html` for translations or more services.

Deployment (GitHub Pages)

```bash
git init
git add .
git commit -m "Add clinic website"
git remote add origin git@github.com:youruser/your-repo.git
git push -u origin main
```

Then enable GitHub Pages in the repo settings.

Branding & Copyright

All pages include footer copyright text: © Stimy

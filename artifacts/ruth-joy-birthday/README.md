# Ruth Joy Birthday Site

A personalized, deeply romantic birthday surprise website built with React, Tailwind CSS, and Framer Motion.

## Customizing Content

All text, dates, and messages can be edited directly in `src/data/siteContent.ts`.
You do not need to edit the UI components to change the copy.

## Customizing Media

### Photos
Replace the placeholders in `public/photos/` with your own images:
- `placeholder-1.jpg`
- `placeholder-2.jpg`
- `placeholder-3.jpg`
- `placeholder-4.jpg`
- `placeholder-5.jpg`
- `placeholder-6.jpg`

*Tip: For the best visual experience, use high-quality portrait/vertical images.*

### Music
Replace `public/audio/romantic-song.mp3` with your special song. Make sure the filename matches what is set in `src/data/siteContent.ts`.

## Running Locally

To run the project in Replit or locally:

```bash
npm install
npm run dev
```

## Deployment

You can deploy this site easily using Replit Deploy (Static deployment is recommended, as this is a frontend-only site), or host it on Vercel/Netlify.
```bash
npm run build
```
The output will be in the `dist` folder.

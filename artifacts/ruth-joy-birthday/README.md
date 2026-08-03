# Ruth Joy Birthday Site

A personalized, deeply romantic birthday surprise website built with React, Tailwind CSS, and Framer Motion.

## Customizing Content

All text, dates, and messages can be edited directly in `src/data/siteContent.ts`.
You do not need to edit the UI components to change the copy.

## Customizing Media

### Photos
Add your images to `public/photos/` and use the existing filenames, or change the paths in `src/data/siteContent.ts`:
- `ruth-joy-01.jpg`
- `ruth-joy-02.jpg`
- `ruth-joy-03.jpg`
- `ruth-joy-04.jpg`
- `ruth-joy-05.jpg`
- `ruth-joy-06.jpg`

The gallery starts with elegant fallbacks because Ruth Joy and her boyfriend have not met in person yet. Replace these files whenever you are ready; no page component changes are needed.

### Music
Replace `public/audio/romantic-song.mp3` with your special song. Make sure the filename matches what is set in `src/data/siteContent.ts`.

## Running Locally

To run the project in Replit or locally:

```bash
npm install
npm run dev
```

## Deployment

From the repository root, you can deploy this site to Vercel. The root `vercel.json` already points Vercel at this app's build output:
```bash
pnpm run build:vercel
```
The output will be in `artifacts/ruth-joy-birthday/dist/public`. Replit can still run it with the artifact workflow.

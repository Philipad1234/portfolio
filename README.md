# Philip Adams — Portfolio

Personal portfolio site for Philip Adams, a software developer specializing in full-stack web development, automation, and AI-integrated workflows.

**Live site:** [Visit the site](https://philip-adams-portfolio.vercel.app/)

## About

This site showcases my background and the platforms I've built and worked on, including a two-sided job board built end to end as sole engineer, a membership platform serving 400+ users, and several client and freelance projects. It also documents my transition from marine engineering into software.

## Tech Stack

**Frontend**
- HTML5, CSS3, vanilla JavaScript, hand-coded, no template or page builder
- Google Fonts: Fraunces (display), IBM Plex Mono (labels), Inter (body)
- Hosted on Vercel

**Backend**
- Node.js, Express
- MongoDB Atlas via Mongoose
- Resend, for contact form email notifications
- express-rate-limit, to protect the contact endpoint from abuse
- HubSpot, for contact synchronization
- Hosted on Render

## Features

- Sticky, responsive navigation with a mobile hamburger menu
- Scroll-anchored sections: About, Journey, Work, Expertise, Contact
- Custom SVG background motif (blueprint/drafting grid) rather than a stock template look
- Working contact form: submissions are validated, saved to MongoDB, emailed via Resend, synced to HubSpot CRM, and rate-limited against spam
- Fully responsive layout, cursor-following spotlight effect on desktop

## Status

Frontend structure is complete: Hero, About, Journey, Work, Expertise, and Contact are all built and styled.

Backend is deployed and fully working end to end:
- Express server with MongoDB Atlas connection, deployed on Render
- POST /api/contact route: validates input, saves submissions to the database
- Email notifications on new submissions via Resend, with reply-to set to the submitter
- Rate limiting on the contact endpoint (5 requests per 15 minutes per IP)
- HubSpot CRM API, for syncing contact form submissions to a CRM automatically
- Confirmed working live: frontend to backend to database to inbox, tested end to end in production

## Running Locally

**Frontend**

Static site, no build step. Open `index.html` directly, or serve it:

```bash
npx serve .
```

**Backend**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
MONGODB_URI=your_mongodb_atlas_connection_string
RESEND_API_KEY=your_resend_api_key
MY_EMAIL=your_inbox_email_address
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token
PORT=3000
```

Then run:

```bash
npm run dev
```

This starts the Express server with nodemon at `http://localhost:3000`.

## Structure

```
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── index.js
│   └── images/
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── logo-avatar.jpg
│       └── my_picture.jpg
├── backend/
│   ├── server.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── middlewares/
│   │   └── rateLimiter.js
│   ├── models/
│   │   └── Submission.js
│   ├── routes/
│   │   └── contact.js
│   ├── .env            (not committed)
│   └── package.json
└── README.md
```
# Philip Adams — Portfolio

Personal portfolio site for Philip Adams, a software developer specializing in full-stack web development, automation, and AI-integrated workflows.

**Live site:** https://philip-adams-portfolio.vercel.app/

## About

This site showcases my background and the platforms I've built and worked on, including a two-sided job board built end to end as sole engineer, a membership platform serving 400+ users, and several client and freelance projects. It also documents my transition from marine engineering into software.

## Tech Stack

**Frontend**
- HTML5, CSS3, vanilla JavaScript
- Google Fonts: Fraunces (display), IBM Plex Mono (labels), Inter (body)
- Hosted on Vercel

**Backend**
- Node.js, Express
- MongoDB Atlas via Mongoose
- Resend, for contact form email notifications
- Hosted on Render

## Features

- Sticky, responsive navigation with a mobile hamburger menu
- Scroll-anchored sections: About, Journey, Work, Expertise, Contact
- Working contact form: submissions are validated, saved to MongoDB, and emailed
- Fully responsive layout, cursor-following spotlight effect on desktop

## Status

Frontend structure is complete: Hero, About, Journey, Work, Expertise, Status, and Contact are all built and styled.

Backend is in progress. Currently working:
- Express server with MongoDB Atlas connection
- POST /api/contact route: validates input, saves submissions to the database
- Tested locally via Postman, confirmed writes to MongoDB Atlas

Remaining backend work:
- Email notifications on new submissions (Resend)
- Deploy backend to Render
- Connect the live frontend form to the deployed backend
- Rate limiting on public endpoints.

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
│       └── logo-avatar.jpg
├── backend/
│   ├── server.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── Submission.js
│   ├── routes/
│   │   └── contact.js
│   ├── .env            (not committed)
│   └── package.json
└── README.md
```
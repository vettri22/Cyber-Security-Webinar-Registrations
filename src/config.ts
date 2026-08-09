/**
 * ============================================================
 *  EVENT CONFIGURATION
 * ------------------------------------------------------------
 *  This is the ONLY file you need to edit to update event
 *  details across the entire website.
 *
 *  - Replace placeholder values (wrapped in [BRACKETS]) with
 *    real information as soon as it is available.
 *  - Logos / images live in `public/assets/`. Replace the files
 *    there (keep the same filenames) or update the paths below.
 * ============================================================
 */

export const EVENT_CONFIG = {
  // ---------- College / Institution ----------
  collegeName: "V.S.B College of Engineering Technical Campus",
  collegeLogo: "/assets/college-logo.png",

  // ---------- Club ----------
  clubName: "CYBER SECURITY CLUB",
  clubLogo: "/assets/club-logo.png",
  clubTagline: "SECURE • LEARN • DEFEND",

  // ---------- Event ----------
  eventTitle: "CYBER SECURITY WEBINAR",
  eventSubtitle: "SECURE • DEFEND • INNOVATE",
  eventTagline:
    "An immersive cybersecurity awareness and knowledge-sharing experience.",

  // ISO date (YYYY-MM-DD) — used by the countdown & date display
  eventDate: "2026-08-22",
  // 24-hour "HH:mm" format — used by the countdown. Update once confirmed.
  eventTime: "10:00",
  // Human-readable time shown on the page
  eventTimeDisplay: "10:00 AM",

  venue: "Auditorium",

  timezone: "Asia/Kolkata",

  aboutEvent: {
    heading: "ABOUT THE EVENT",
    paragraphs: [
      "The VSB Cyber Security Club presents an exclusive Offline Cybersecurity Awareness Webinar designed to help students understand the evolving world of cybersecurity and the importance of staying safe in today's digital environment.",
      "This session will provide valuable insights into cyber threats, digital security, responsible online practices, real-world cybersecurity challenges, and emerging opportunities in the field. Participants will also get the opportunity to gain practical awareness and interact with an experienced cybersecurity speaker through an engaging Q&A session.",
      "Join us to learn, stay aware, and build a stronger cybersecurity mindset.",
    ],
    strapline: "LEARN • SECURE • LEAD",
  },

  // ---------- Guest Speaker ----------
  guestSpeaker: {
    name: "Karthikeyan V (KarthikTheHacker)",
    designation: "Cybersecurity Educator | Security Researcher",
    image: "/assets/guest-speaker.png",
    description:
      "An experienced cybersecurity enthusiast and security educator known for sharing practical knowledge and awareness about the evolving world of cybersecurity. Through his insights and real-world perspectives, he helps students understand digital threats, responsible security practices, and the importance of developing a strong cybersecurity mindset. His session will provide participants with an opportunity to learn, explore, and interact through an engaging cybersecurity-focused discussion.",
  },

  // ---------- Registration Form Options (fully configurable) ----------
  formOptions: {
    departments: ["CSE", "ECE", "EEE", "AIML", "AI&DS", "IT", "Mech", "Agri"],
    sections: ["A", "B", "C", "D", "E"],
    years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  },

  // ---------- Club Leadership (exact — do not modify) ----------
   leadership: [
    {
      name: "Mr. M. BarathiRaja",
      role: "FACULTY COORDINATOR",
      designation: "Assistant Professor / CSE",
      photo: null as string | null,
    },
    {
      name: "Mrs. P. Sreedevi",
      role: "CLUB ADVISOR",
      designation: "Assistant Professor / CSE",
      photo: null as string | null,
    },
    {
      name: "Mr. B. Marikumar",
      role: "CLUB ADVISOR",
      designation: "Assistant Professor / CSE",
      photo: null as string | null,
    },
    {
      name: "U. Vettriselvam",
      role: "PRESIDENT",
      designation: "CSE",
      photo: null as string | null,
    },
    {
      name: "M. Jai Pirajhith",
      role: "VICE PRESIDENT",
      designation: "ECE",
      photo: null as string | null,
    },
    {
      name: "E. Sanjay Kumar",
      role: "SECRETARY",
      designation: "CSE",
      photo: null as string | null,
    },
    {
      name: "Y. Keertinandhan",
      role: "TECHNICAL COORDINATOR",
      designation: "ECE",
      photo: null as string | null,
    },
    {
      name: "S. Sugash",
      role: "CO-TECHNICAL COORDINATOR",
      designation: "AI&DS",
      photo: null as string | null,
    },
    {
      name: "K.S. Vijay Vasanthan",
      role: "EVENT COORDINATOR",
      designation: "CSE",
      photo: null as string | null,
    },
    {
      name: "N. Saran Raj",
      role: "CO-EVENT COORDINATOR",
      designation: "CSE",
      photo: null as string | null,
    },
    {
      name: "T.S. Algin",
      role: "DESIGN AND MEDIA LEAD",
      designation: "AIML",
      photo: null as string | null,
    },
    {
      name: "C. Sri krishna",
      role: "PUBLIC RELATIONS",
      designation: "AI&DS",
      photo: null as string | null,
    },
    {
      name: "K.R. Berjin joe",
      role: "TREASURER",
      designation: "AI&DS",
      photo: null as string | null,
    },
    
  ],

  // ---------- Social links (leave empty until supplied) ----------
  socialLinks: [] as { label: string; url: string }[],

  // ---------- Backend ----------
  // Paste the deployed Google Apps Script Web App URL here.
  // See GOOGLE_SHEETS_SETUP.md for step-by-step deployment instructions.
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbw-dwFdImbSF9l-E0SwRWyAGgoLfjF-BuaV_CLRQkuj1Xv6dkBRr-dcrjzBBMQN7EPStg/exec",
};

export type EventConfig = typeof EVENT_CONFIG;

/**
 * ============================================================================
 * VENKATA RAVINDRA MARASU — PORTFOLIO NODE.JS HTTP & API SERVER
 * ============================================================================
 * Built with native Node.js (http, fs, path, url). Zero external dependencies required.
 * 
 * Features:
 *  - Fast static file serving with MIME detection, security headers & caching
 *  - REST API Endpoints:
 *      * GET  /api/profile     -> Complete resume data (JSON)
 *      * GET  /api/skills      -> Categorized technical competencies
 *      * GET  /api/experience  -> Enterprise projects (HRM & LMS)
 *      * POST /api/contact     -> Contact form message ingestion & validation
 *      * GET  /api/health      -> Server health & uptime status
 * 
 * Usage:
 *  $ npm start
 *  or
 *  $ node server.js
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data folder exists for message persistence
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Could not create data directory:', err.message);
  }
}

// ---------------------------------------------------------------------------
// RESUME PROFILE DATA (Venkata Ravindra Marasu)
// ---------------------------------------------------------------------------
const RESUME_DATA = {
  profile: {
    name: "VENKATA RAVINDRA MARASU",
    title: "Frontend Developer",
    experienceYears: "1+",
    location: "Hyderabad, Telangana, India",
    phone: "+91 7995709151",
    email: "ravindramarasu22@gmail.com",
    whatsapp: "https://wa.me/917995709151",
    linkedin: "https://www.linkedin.com/in/ravindra-chowdary-2a84622bb",
    github: "https://github.com/ravindra-26",
    summary: "Frontend Developer with 1+ year of professional experience building and maintaining web applications using React.js and JavaScript. Hands-on experience with HRM and LMS applications, reusable components, responsive UI development, and REST API integration using Redux Toolkit and RTK Query. Strong foundation in form validation, authentication workflows, CRUD operations, and application state management, with a good understanding of backend API integration."
  },
  experience: [
    {
      company: "VN Softverg Technology Pvt Ltd, Madhapur",
      role: "Frontend Developer",
      duration: "Aug 2025 – Oct 2026",
      location: "Madhapur, Hyderabad, India",
      projects: [
        {
          name: "HRM (Human Resource Management System)",
          description: "Enterprise human capital management suite covering employee onboarding, daily attendance tracking, leave requests, and role administration.",
          highlights: [
            "Developed React-based pages and reusable components for HRM modules: Employee Management, Employee Onboarding, Attendance, Leave, and User Management.",
            "Built forms with client-side validation for employee and user-related workflows.",
            "Integrated REST APIs using RTK Query and handled loading, success, and error states.",
            "Managed application state using Redux Toolkit.",
            "Implemented search, filtering, and data display functionality.",
            "Implemented authentication flows on the frontend, including login, logout, session handling, and OTP-based verification and password reset.",
            "Debugged frontend and API integration issues and coordinated with backend developers."
          ],
          technologies: ["React.js", "Redux Toolkit", "RTK Query", "JavaScript", "HTML5", "CSS3", "REST APIs"]
        },
        {
          name: "LMS (Learning Management System)",
          description: "Modern enterprise e-learning platform providing course publishing, role administration, student catalog, and real-time curriculum progress tracking.",
          highlights: [
            "Built reusable React components and responsive pages using React.js, HTML, CSS, and Material UI.",
            "Developed screens for User and Role Management, Course Management, Course Listing and Search, Learning Content Management, and Enrollment and User Progress.",
            "Integrated backend REST APIs for course, user, and learning data.",
            "Used RTK Query for API calls, caching, and server-state management.",
            "Implemented form validation, search/filtering, and user-friendly error messages.",
            "Collaborated with team members to fix bugs and improve application usability."
          ],
          technologies: ["React.js", "Material UI", "RTK Query", "Redux", "JavaScript", "REST APIs", "CSS3"]
        }
      ],
      generalContributions: [
        "Used Git/GitHub for source-code management and Postman for API testing and debugging.",
        "Participated in testing, code improvements, and day-to-day maintenance of application features."
      ]
    }
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "NEFTU",
      duration: "2017 – 2020",
      score: "CGPA: 6.67",
      details: "Comprehensive undergraduate study in Computer Science, programming logic, data structures, algorithms, and software engineering methodologies."
    },
    {
      degree: "Intermediate (MPC)",
      institution: "SS&N College",
      duration: "2017",
      score: "CGPA: 6.2",
      details: "Mathematics, Physics, and Chemistry curriculum fostering analytical rigor and algorithmic problem-solving abilities."
    },
    {
      degree: "SSC (Secondary School Certificate)",
      institution: "Z P High School",
      duration: "2014",
      score: "CGPA: 6.5",
      details: "Strong fundamental grounding in sciences, mathematics, and academic discipline."
    }
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "HTML5", "CSS3", "Python"],
    frameworksAndLibraries: ["React.js", "Material UI", "FastAPI"],
    stateManagementAndDataFetching: ["Redux Toolkit", "RTK Query", "React Hooks"],
    apiIntegration: ["REST APIs", "JSON", "Fetch API", "API Error Handling", "Authentication (JWT & OTP)"],
    developerTools: ["Git", "GitHub", "Postman", "VS Code", "npm", "Vite"],
    coreConcepts: [
      "Reusable Components",
      "CRUD Operations",
      "Form Validation",
      "Responsive Design",
      "Search & Filtering"
    ]
  },
  strengths: [
    "Quick learner with strong problem-solving skills",
    "Solid understanding of React component-based development",
    "Able to debug frontend and API integration issues",
    "Focused on writing reusable and maintainable code",
    "Good communication and team collaboration"
  ]
};

// ---------------------------------------------------------------------------
// MIME TYPES TABLE
// ---------------------------------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// ---------------------------------------------------------------------------
// UTILITY HELPERS
// ---------------------------------------------------------------------------
function sendJSON(res, statusCode, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-cache'
  });
  res.end(jsonStr);
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB flood protection
        req.destroy();
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) {
        return resolve({});
      }
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        // Fallback: parse URL-encoded form data if sent via traditional form POST
        const queryParams = new URLSearchParams(body);
        const obj = {};
        for (const [key, val] of queryParams.entries()) {
          obj[key] = val;
        }
        resolve(obj);
      }
    });
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// REQUEST DISPATCHER
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // -------------------------------------------------------------------------
  // REST API ROUTES
  // -------------------------------------------------------------------------
  if (pathname === '/api/profile' && req.method === 'GET') {
    return sendJSON(res, 200, RESUME_DATA.profile);
  }

  if (pathname === '/api/resume' && req.method === 'GET') {
    return sendJSON(res, 200, RESUME_DATA);
  }

  if (pathname === '/api/skills' && req.method === 'GET') {
    return sendJSON(res, 200, RESUME_DATA.skills);
  }

  if (pathname === '/api/experience' && req.method === 'GET') {
    return sendJSON(res, 200, RESUME_DATA.experience);
  }

  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJSON(res, 200, {
      status: 'healthy',
      developer: RESUME_DATA.profile.name,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  if (pathname === '/api/contact' && req.method === 'POST') {
    try {
      const data = await parseRequestBody(req);
      const name = (data.name || '').trim();
      const email = (data.email || '').trim();
      const subject = (data.subject || 'Portfolio Inquiry').trim();
      const message = (data.message || '').trim();

      // Form validation
      if (!name || !email || !message) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Missing required fields: name, email, and message are required.'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Please provide a valid email address.'
        });
      }

      const messageEntry = {
        id: 'msg_' + Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        subject,
        message,
        ip: req.socket.remoteAddress || '127.0.0.1'
      };

      // Persist to data/messages.json
      const messagesFile = path.join(DATA_DIR, 'messages.json');
      let existingMessages = [];
      try {
        if (fs.existsSync(messagesFile)) {
          existingMessages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        }
      } catch (e) {
        existingMessages = [];
      }
      existingMessages.push(messageEntry);
      try {
        fs.writeFileSync(messagesFile, JSON.stringify(existingMessages, null, 2), 'utf8');
      } catch (err) {
        console.error('Failed to write message to file:', err.message);
      }

      console.log(`\x1b[32m[CONTACT API]\x1b[0m New message from ${name} (${email}): "${subject}"`);

      return sendJSON(res, 200, {
        success: true,
        message: 'Thank you for reaching out! Venkata Ravindra Marasu will get back to you shortly.',
        entry: {
          id: messageEntry.id,
          date: messageEntry.date,
          recipient: RESUME_DATA.profile.email
        }
      });
    } catch (err) {
      return sendJSON(res, 500, {
        success: false,
        error: 'Internal server error processing contact submission.'
      });
    }
  }

  // -------------------------------------------------------------------------
  // STATIC ASSET SERVING
  // -------------------------------------------------------------------------
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Normalize path and prevent directory traversal
  const safePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!safePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Not Found</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { text-align: center; max-width: 480px; padding: 40px; border-radius: 16px; background: #1e293b; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { font-size: 56px; margin: 0; color: #38bdf8; }
            p { color: #94a3b8; font-size: 16px; line-height: 1.6; }
            a { display: inline-block; margin-top: 20px; padding: 10px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The asset or route you requested could not be found on this server.</p>
            <a href="/">Return to Portfolio</a>
          </div>
        </body>
        </html>
      `);
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    });

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Stream Error');
      }
    });
  });
});

// ---------------------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------------------
server.listen(PORT, () => {
  const divider = '='.repeat(68);
  console.log('\n' + divider);
  console.log(`\x1b[36m  VENKATA RAVINDRA MARASU — PORTFOLIO NODE.JS SERVER\x1b[0m`);
  console.log(divider);
  console.log(`  \x1b[32m✔ Server running:\x1b[0m   http://localhost:${PORT}`);
  console.log(`  \x1b[33m✔ Mode:\x1b[0m             Native Node.js HTTP (Zero Dependencies)`);
  console.log(`  \x1b[35m✔ API Endpoints:\x1b[0m`);
  console.log(`      GET  http://localhost:${PORT}/api/profile`);
  console.log(`      GET  http://localhost:${PORT}/api/skills`);
  console.log(`      GET  http://localhost:${PORT}/api/experience`);
  console.log(`      GET  http://localhost:${PORT}/api/health`);
  console.log(`      POST http://localhost:${PORT}/api/contact`);
  console.log(divider + '\n');
});



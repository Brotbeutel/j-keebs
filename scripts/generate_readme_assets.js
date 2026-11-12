const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const OUT_DIR = path.join(IMAGES_DIR, 'readme');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function getBase64DataUri(filePath, mimeType = 'image/png') {
  const buf = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateWin2kProfileBanner() {
  const W = 960;
  const H = 510;
  const outSvgPath = path.join(OUT_DIR, 'banner.svg');
  const outPngPath = path.join(OUT_DIR, 'banner.png');

  const pcPixelPath = path.join(IMAGES_DIR, 'Retro-PC_pixelart_generated.png');
  const pcPixelUri = getBase64DataUri(pcPixelPath, 'image/png');

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Win2k Titlebar Gradient (Warm retro brass/charcoal from contact.html) -->
    <linearGradient id="win2k-title-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60513e"/>
      <stop offset="50%" stop-color="#4a3d2e"/>
      <stop offset="100%" stop-color="#32291f"/>
    </linearGradient>

    <!-- CRT Glow Gradient -->
    <radialGradient id="crt-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7bf096" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1e1c1a" stop-opacity="0"/>
    </radialGradient>

    <!-- Outer Window Drop Shadow -->
    <filter id="win2k-shadow" x="-5%" y="-5%" width="112%" height="112%">
      <feDropShadow dx="4" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <style>
      /* --- Fonts and Base Styling --- */
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&amp;family=Courier+Prime:wght@400;700&amp;display=swap');

      .font-sans {
        font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .font-mono {
        font-family: 'Courier Prime', 'Consolas', 'Courier New', monospace;
      }

      /* --- Animations --- */
      /* 1. Terminal Blinking Cursor */
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .blink-cursor {
        animation: blink 0.9s infinite;
      }

      /* 2. Pulsing Status Online LED */
      @keyframes pulse-led {
        0%, 100% {
          opacity: 1;
          filter: drop-shadow(0 0 3px #55d676);
        }
        50% {
          opacity: 0.45;
          filter: none;
        }
      }
      .status-led {
        animation: pulse-led 2s infinite ease-in-out;
      }

      /* 3. Terminal Message Cycler */
      @keyframes cycle-msg-1 {
        0%, 28% { opacity: 1; visibility: visible; }
        33%, 95% { opacity: 0; visibility: hidden; }
        100% { opacity: 1; visibility: visible; }
      }
      @keyframes cycle-msg-2 {
        0%, 30% { opacity: 0; visibility: hidden; }
        35%, 62% { opacity: 1; visibility: visible; }
        67%, 100% { opacity: 0; visibility: hidden; }
      }
      @keyframes cycle-msg-3 {
        0%, 64% { opacity: 0; visibility: hidden; }
        69%, 95% { opacity: 1; visibility: visible; }
        100% { opacity: 0; visibility: hidden; }
      }

      .msg-1 {
        opacity: 1;
        animation: cycle-msg-1 12s infinite;
      }
      .msg-2 {
        opacity: 0;
        animation: cycle-msg-2 12s infinite;
      }
      .msg-3 {
        opacity: 0;
        animation: cycle-msg-3 12s infinite;
      }

      /* 4. RX/TX Data Activity Blink */
      @keyframes rxtx-blink {
        0%, 80%, 100% { fill: #a3998e; font-weight: normal; }
        85%, 95% { fill: #c29b62; font-weight: bold; }
      }
      .rxtx-act {
        animation: rxtx-blink 2.2s infinite ease-in-out;
      }

      .btn-hover:hover {
        filter: brightness(1.08);
      }
    </style>
  </defs>

  <!-- ================= WINDOW CONTAINER ================= -->
  <g filter="url(#win2k-shadow)">
    <!-- Base Window Body (#3c3836) -->
    <rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="#3c3836"/>
    
    <!-- 3D Bevel Border (Light top/left #5a544f, Dark bottom/right #1e1c1a) -->
    <polygon points="8,8 ${W - 8},8 ${W - 11},11 11,11 11,${H - 11} 8,${H - 8}" fill="#5a544f"/>
    <polygon points="${W - 8},8 ${W - 8},${H - 8} 8,${H - 8} 11,${H - 11} ${W - 11},${H - 11} ${W - 11},11" fill="#1e1c1a"/>
  </g>

  <!-- ================= TITLEBAR ================= -->
  <g>
    <!-- Titlebar Gradient Fill -->
    <rect x="11" y="11" width="${W - 22}" height="32" fill="url(#win2k-title-grad)"/>

    <!-- Left: Retro PC Icon (Pixel Art) -->
    <image href="${pcPixelUri}" x="18" y="16" width="22" height="22"/>

    <!-- Titlebar Text -->
    <text x="48" y="32" class="font-sans" font-size="13" font-weight="700" fill="#f0e6d2" letter-spacing="0.5">
      Brotbeutel_Profile.exe — [Jannik Schlüter :: Developer &amp; Keyboard Builder]
    </text>

    <!-- Right: Win2k Window Buttons (Min, Max, Close) -->
    <!-- Minimize -->
    <g transform="translate(${W - 82}, 16)">
      <rect x="0" y="0" width="18" height="18" fill="#3c3836"/>
      <polygon points="0,0 18,0 17,1 1,1 1,17 0,18" fill="#5a544f"/>
      <polygon points="18,0 18,18 0,18 1,17 17,17 17,1" fill="#1e1c1a"/>
      <line x1="4" y1="13" x2="14" y2="13" stroke="#f0e6d2" stroke-width="2"/>
    </g>

    <!-- Maximize -->
    <g transform="translate(${W - 60}, 16)">
      <rect x="0" y="0" width="18" height="18" fill="#3c3836"/>
      <polygon points="0,0 18,0 17,1 1,1 1,17 0,18" fill="#5a544f"/>
      <polygon points="18,0 18,18 0,18 1,17 17,17 17,1" fill="#1e1c1a"/>
      <rect x="4" y="5" width="10" height="9" fill="none" stroke="#f0e6d2" stroke-width="1.5"/>
    </g>

    <!-- Close Button (✕) -->
    <g transform="translate(${W - 38}, 16)">
      <rect x="0" y="0" width="18" height="18" fill="#3c3836"/>
      <polygon points="0,0 18,0 17,1 1,1 1,17 0,18" fill="#5a544f"/>
      <polygon points="18,0 18,18 0,18 1,17 17,17 17,1" fill="#1e1c1a"/>
      <path d="M5 5 L13 13 M13 5 L5 13" stroke="#f0e6d2" stroke-width="1.6"/>
    </g>
  </g>

  <!-- ================= DIALOG HEADER (INTRO & PIXEL ART) ================= -->
  <g transform="translate(24, 52)">
    <!-- Main Dialog Headline -->
    <text x="0" y="24" class="font-sans" font-size="18" font-weight="700" fill="#c29b62" letter-spacing="0.5">
      [ Willkommen im Profil von Jannik Schlüter (@Brotbeutel) ]
    </text>

    <!-- Subtitle / Mission Statement -->
    <text x="0" y="47" class="font-sans" font-size="13" font-weight="400" fill="#e8e0d5">
      Software-Entwickler &amp; Erbauer mechanischer Tastaturen aus Schwetzingen, Deutschland.
    </text>
    <text x="0" y="66" class="font-sans" font-size="13" font-weight="400" fill="#a3998e">
      Fokus auf kompromisslose deutsche ISO-Layouts (ISO-DE), QMK/VIA-Firmware, Upcycling &amp; Open-Source-Tools.
    </text>

    <!-- Badges / Role Tags -->
    <g transform="translate(0, 77)">
      <!-- Badge 1 -->
      <rect x="0" y="0" width="102" height="22" rx="1" fill="#2b2826" stroke="#5a544f" stroke-width="1"/>
      <text x="51" y="15" class="font-mono" font-size="10" font-weight="700" fill="#c29b62" text-anchor="middle">DEVELOPER</text>

      <!-- Badge 2 -->
      <rect x="110" y="0" width="138" height="22" rx="1" fill="#2b2826" stroke="#5a544f" stroke-width="1"/>
      <text x="179" y="15" class="font-mono" font-size="10" font-weight="700" fill="#c29b62" text-anchor="middle">KEYBOARD BUILDER</text>

      <!-- Badge 3 -->
      <rect x="256" y="0" width="124" height="22" rx="1" fill="#2b2826" stroke="#5a544f" stroke-width="1"/>
      <text x="318" y="15" class="font-mono" font-size="10" font-weight="700" fill="#c29b62" text-anchor="middle">ISO-DE FOCUS</text>

      <!-- Badge 4 -->
      <rect x="388" y="0" width="112" height="22" rx="1" fill="#2b2826" stroke="#5a544f" stroke-width="1"/>
      <text x="444" y="15" class="font-mono" font-size="10" font-weight="700" fill="#c29b62" text-anchor="middle">UPCYCLING</text>
    </g>

    <!-- Right Side: Pixel Art PC Preview Box (Win2k Inset) -->
    <g transform="translate(796, 0)">
      <!-- Inset Frame -->
      <rect x="0" y="0" width="116" height="102" fill="#2b2826"/>
      <polygon points="0,0 116,0 114,2 2,2 2,100 0,102" fill="#1e1c1a"/>
      <polygon points="116,0 116,102 0,102 2,100 114,100 114,2" fill="#5a544f"/>

      <!-- Inner CRT glow -->
      <rect x="4" y="4" width="108" height="78" fill="#1d1b1a"/>
      <rect x="4" y="4" width="108" height="78" fill="url(#crt-glow)"/>

      <!-- Pixel Art PC Image -->
      <image href="${pcPixelUri}" x="18" y="7" width="80" height="72"/>

      <!-- Mini Label -->
      <text x="58" y="94" class="font-mono" font-size="9" fill="#a3998e" text-anchor="middle" letter-spacing="1">
        WORKBENCH.EXE
      </text>
    </g>
  </g>

  <!-- ================= INSET PROFILE FORM FIELDS ================= -->
  <!-- ROW 1: Identity & Specialization -->
  <g transform="translate(24, 168)">
    <!-- Field 1: User / Identity (Left) -->
    <g>
      <text x="0" y="0" class="font-sans" font-size="12" font-weight="600" fill="#a3998e">User / Identity:</text>
      <!-- Inset Box -->
      <g transform="translate(0, 6)">
        <rect x="0" y="0" width="440" height="34" fill="#2b2826"/>
        <polygon points="0,0 440,0 438,2 2,2 2,32 0,34" fill="#1e1c1a"/>
        <polygon points="440,0 440,34 0,34 2,32 438,32 438,2" fill="#5a544f"/>
        <text x="12" y="22" class="font-sans" font-size="13" font-weight="600" fill="#f0e6d2">
          Jannik Schlüter <tspan fill="#a3998e" font-weight="400">(@Brotbeutel)</tspan>
        </text>
        <rect x="355" y="6" width="74" height="22" rx="1" fill="#3c3836" stroke="#5a544f" stroke-width="1"/>
        <text x="392" y="21" class="font-mono" font-size="10" font-weight="700" fill="#c29b62" text-anchor="middle">VERIFIED</text>
      </g>
    </g>

    <!-- Field 2: Base / Location (Right) -->
    <g transform="translate(460, 0)">
      <text x="0" y="0" class="font-sans" font-size="12" font-weight="600" fill="#a3998e">Base / Location:</text>
      <!-- Inset Box -->
      <g transform="translate(0, 6)">
        <rect x="0" y="0" width="452" height="34" fill="#2b2826"/>
        <polygon points="0,0 452,0 450,2 2,2 2,32 0,34" fill="#1e1c1a"/>
        <polygon points="452,0 452,34 0,34 2,32 450,32 450,2" fill="#5a544f"/>
        <!-- Clean Pin Icon -->
        <g transform="translate(12, 10)">
          <path d="M5 0 C2.24 0 0 2.24 0 5 C0 8.5 5 14 5 14 C5 14 10 8.5 10 5 C10 2.24 7.76 0 5 0 Z M5 7 C3.9 7 3 6.1 3 5 C3 3.9 3.9 3 5 3 C6.1 3 7 3.9 7 5 C7 6.1 6.1 7 5 7 Z" fill="#c29b62"/>
        </g>
        <text x="28" y="22" class="font-sans" font-size="13" font-weight="400" fill="#e8e0d5">
          Schwetzingen, Baden-Württemberg, Germany
        </text>
      </g>
    </g>
  </g>

  <!-- ROW 2: Projects & Tech Stack -->
  <g transform="translate(24, 230)">
    <!-- Field 3: Featured Repositories (Left) -->
    <g>
      <text x="0" y="0" class="font-sans" font-size="12" font-weight="600" fill="#a3998e">Primary Projects &amp; Repositories:</text>
      <g transform="translate(0, 6)">
        <rect x="0" y="0" width="440" height="34" fill="#2b2826"/>
        <polygon points="0,0 440,0 438,2 2,2 2,32 0,34" fill="#1e1c1a"/>
        <polygon points="440,0 440,34 0,34 2,32 438,32 438,2" fill="#5a544f"/>
        <text x="12" y="22" class="font-sans" font-size="13" font-weight="400" fill="#c29b62">
          J-Keebs <tspan fill="#a3998e">·</tspan> Fat-Plate-Gen <tspan fill="#a3998e">·</tspan> Plates-n-Cases <tspan fill="#a3998e">·</tspan> QMK Mods
        </text>
      </g>
    </g>

    <!-- Field 4: Tech Stack (Right) -->
    <g transform="translate(460, 0)">
      <text x="0" y="0" class="font-sans" font-size="12" font-weight="600" fill="#a3998e">Developer Stack &amp; Hardware Tools:</text>
      <g transform="translate(0, 6)">
        <rect x="0" y="0" width="452" height="34" fill="#2b2826"/>
        <polygon points="0,0 452,0 450,2 2,2 2,32 0,34" fill="#1e1c1a"/>
        <polygon points="452,0 452,34 0,34 2,32 450,32 450,2" fill="#5a544f"/>
        <text x="12" y="22" class="font-sans" font-size="13" font-weight="400" fill="#e8e0d5">
          TS/JS · Node · Eleventy · Python · C/QMK · 3D-CAD · Soldering
        </text>
      </g>
    </g>
  </g>

  <!-- ROW 3: Terminal Feed / Live Status Inset Box -->
  <g transform="translate(24, 292)">
    <text x="0" y="0" class="font-sans" font-size="12" font-weight="600" fill="#a3998e">Live Console Feed / Active Work:</text>
    <g transform="translate(0, 6)">
      <!-- Deep Dark Terminal Background (#1e1c1a) -->
      <rect x="0" y="0" width="912" height="52" fill="#1e1c1a"/>
      <!-- Inset 3D Bevel -->
      <polygon points="0,0 912,0 910,2 2,2 2,50 0,52" fill="#141312"/>
      <polygon points="912,0 912,52 0,52 2,50 910,50 910,2" fill="#5a544f"/>

      <!-- Shell Prompt -->
      <text x="14" y="23" class="font-mono" font-size="12" font-weight="700" fill="#c29b62">root@brotbeutel:~$</text>

      <!-- Animated Message 1 -->
      <g class="msg-1">
        <text x="165" y="23" class="font-mono" font-size="12" fill="#f0e6d2">
          Building custom mechanical keyboards with sound, feel &amp; ISO-DE focus...
        </text>
      </g>

      <!-- Animated Message 2 -->
      <g class="msg-2">
        <text x="165" y="23" class="font-mono" font-size="12" fill="#f0e6d2">
          Upcycling vintage Cherry G80-3000 boards with modern QMK &amp; VIA electronics...
        </text>
      </g>

      <!-- Animated Message 3 -->
      <g class="msg-3">
        <text x="165" y="23" class="font-mono" font-size="12" fill="#f0e6d2">
          Developing open-source generators &amp; tools for the German keeb scene...
        </text>
      </g>

      <!-- Subtext / Specs line -->
      <text x="14" y="42" class="font-mono" font-size="11" fill="#7d7368">
        [SYSINFO] Architecture: German ISO-DE · Switches: Lubed (Krytox 205g0) · Firmware: VIA Ready
      </text>

      <!-- Blinking Cursor -->
      <rect x="888" y="12" width="8" height="14" fill="#c29b62" class="blink-cursor"/>
    </g>
  </g>

  <!-- ================= ACTION BUTTONS (WIN2K RETRO STYLE) ================= -->
  <g transform="translate(24, 380)">
    <!-- Primary Button: Portfolio (Gold Bevel) -->
    <g transform="translate(0, 0)" class="btn-hover">
      <rect x="0" y="0" width="310" height="34" fill="#c29b62"/>
      <polygon points="0,0 310,0 308,2 2,2 2,32 0,34" fill="#ffe39e"/>
      <polygon points="310,0 310,34 0,34 2,32 308,32 308,2" fill="#5a3e12"/>
      <text x="155" y="22" class="font-sans" font-size="13" font-weight="700" fill="#1e1c1a" text-anchor="middle">
        🌐 Live Portfolio: brotbeutel.github.io/j-keebs
      </text>
    </g>

    <!-- Secondary Button: Contact Form -->
    <g transform="translate(325, 0)" class="btn-hover">
      <rect x="0" y="0" width="280" height="34" fill="#3c3836"/>
      <polygon points="0,0 280,0 278,2 2,2 2,32 0,34" fill="#5a544f"/>
      <polygon points="280,0 280,34 0,34 2,32 278,32 278,2" fill="#1e1c1a"/>
      <text x="140" y="22" class="font-sans" font-size="13" font-weight="600" fill="#f0e6d2" text-anchor="middle">
        ✉️ Kontaktformular (Contact.exe)
      </text>
    </g>

    <!-- Secondary Button: LinkedIn -->
    <g transform="translate(620, 0)" class="btn-hover">
      <rect x="0" y="0" width="292" height="34" fill="#3c3836"/>
      <polygon points="0,0 292,0 290,2 2,2 2,32 0,34" fill="#5a544f"/>
      <polygon points="292,0 292,34 0,34 2,32 290,32 290,2" fill="#1e1c1a"/>
      <text x="146" y="22" class="font-sans" font-size="13" font-weight="600" fill="#f0e6d2" text-anchor="middle">
        💼 LinkedIn: Jannik Schlüter
      </text>
    </g>
  </g>

  <!-- ================= STATUSBAR ================= -->
  <g transform="translate(12, 465)">
    <!-- Statusbar background -->
    <rect x="0" y="0" width="${W - 24}" height="32" fill="#3c3836"/>
    <!-- Inset border -->
    <polygon points="0,0 ${W - 24},0 ${W - 26},2 2,2 2,30 0,32" fill="#1e1c1a"/>
    <polygon points="${W - 24},0 ${W - 24},32 0,32 2,30 ${W - 26},30 ${W - 26},2" fill="#5a544f"/>

    <!-- Panel 1: Online Status (Pulsing LED) -->
    <g transform="translate(8, 5)">
      <rect x="0" y="0" width="180" height="22" fill="#33302e"/>
      <polygon points="0,0 180,0 178,1 1,1 1,21 0,22" fill="#1e1c1a"/>
      <polygon points="180,0 180,22 0,22 1,21 178,21 178,1" fill="#5a544f"/>
      <circle cx="16" cy="11" r="4.5" fill="#55d676" class="status-led"/>
      <text x="28" y="15" class="font-mono" font-size="11" fill="#f0e6d2">STATUS: 200 OK</text>
    </g>

    <!-- Panel 2: Location -->
    <g transform="translate(196, 5)">
      <rect x="0" y="0" width="220" height="22" fill="#33302e"/>
      <polygon points="0,0 220,0 218,1 1,1 1,21 0,22" fill="#1e1c1a"/>
      <polygon points="220,0 220,22 0,22 1,21 218,21 218,1" fill="#5a544f"/>
      <text x="10" y="15" class="font-mono" font-size="11" fill="#a3998e">LOC: SCHWETZINGEN (DE)</text>
    </g>

    <!-- Panel 3: Layout -->
    <g transform="translate(424, 5)">
      <rect x="0" y="0" width="210" height="22" fill="#33302e"/>
      <polygon points="0,0 210,0 208,1 1,1 1,21 0,22" fill="#1e1c1a"/>
      <polygon points="210,0 210,22 0,22 1,21 208,21 208,1" fill="#5a544f"/>
      <text x="10" y="15" class="font-mono" font-size="11" fill="#c29b62">LAYOUT: DEUTSCHES ISO-DE</text>
    </g>

    <!-- Panel 4: Baud Rate & Active RX/TX -->
    <g transform="translate(642, 5)">
      <rect x="0" y="0" width="${W - 24 - 650}" height="22" fill="#33302e"/>
      <polygon points="0,0 ${W - 24 - 650},0 ${W - 24 - 652},1 1,1 1,21 0,22" fill="#1e1c1a"/>
      <polygon points="${W - 24 - 650},0 ${W - 24 - 650},22 0,22 1,21 ${W - 24 - 652},21 ${W - 24 - 652},1" fill="#5a544f"/>
      <text x="12" y="15" class="font-mono" font-size="11" fill="#a3998e">
        COM1: 9600 BAUD <tspan class="rxtx-act">[TX/RX]</tspan> · VIA: READY
      </text>
    </g>
  </g>
</svg>`;

  fs.writeFileSync(outSvgPath, svgContent, 'utf-8');
  console.log(`Generated animated SVG banner at ${outSvgPath}`);

  await sharp(Buffer.from(svgContent))
    .png({ quality: 95 })
    .toFile(outPngPath);
  console.log(`Generated PNG banner at ${outPngPath}`);
}

async function generatePolaroid(config) {
  const {
    sourceFile,
    outFile,
    title,
    specs,
    tilt = 0,
    tapeAngle = -1.5
  } = config;

  const cardW = 560;
  const cardH = 460;
  const photoW = 512;
  const photoH = 320;
  const photoX = 24;
  const photoY = 24;

  const inPhotoPath = path.join(IMAGES_DIR, sourceFile);
  const outPath = path.join(OUT_DIR, outFile);

  const photoBuf = await sharp(inPhotoPath)
    .resize(photoW, photoH, { fit: 'cover', position: 'center' })
    .toBuffer();
  const photoUri = `data:image/jpeg;base64,${photoBuf.toString('base64')}`;

  const svg = Buffer.from(`
    <svg width="${cardW}" height="${cardH}" viewBox="0 0 ${cardW} ${cardH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="polaroid-shadow" x="-8%" y="-8%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.38"/>
        </filter>
        <filter id="tape-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
        </filter>
      </defs>

      <g filter="url(#polaroid-shadow)" transform="rotate(${tilt}, ${cardW / 2}, ${cardH / 2})">
        <rect x="6" y="6" width="${cardW - 12}" height="${cardH - 12}" rx="1" fill="#fcfaf6" stroke="#d5cebf" stroke-width="1"/>
        <rect x="7" y="7" width="${cardW - 14}" height="${cardH - 14}" fill="none" stroke="#ebe4d8" stroke-width="1"/>

        <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" fill="#1e1c1a"/>
        <image href="${photoUri}" x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}"/>
        <rect x="${photoX}" y="${photoY}" width="${photoW}" height="${photoH}" fill="none" stroke="#22201e" stroke-width="1" stroke-opacity="0.3"/>

        <text x="32" y="380" font-family="'IBM Plex Sans', 'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#2b2826" letter-spacing="0.5">
          ${escapeXml(title)}
        </text>

        <circle cx="${cardW - 40}" cy="374" r="5" fill="#c29b62"/>

        <text x="32" y="412" font-family="'Courier Prime', monospace" font-size="13" font-weight="600" fill="#756b62" letter-spacing="0.3">
          ${escapeXml(specs)}
        </text>

        <g filter="url(#tape-shadow)" transform="rotate(${tapeAngle}, ${cardW / 2}, 16)">
          <rect x="${(cardW - 130) / 2}" y="0" width="130" height="28" rx="1" fill="#e8dfce" fill-opacity="0.88" stroke="#d4c9b6" stroke-width="1"/>
          <line x1="${(cardW - 120) / 2}" y1="6" x2="${(cardW + 120) / 2}" y2="6" stroke="#ffffff" stroke-width="1" stroke-opacity="0.4"/>
          <line x1="${(cardW - 125) / 2}" y1="2" x2="${(cardW - 125) / 2}" y2="26" stroke="#c4b8a4" stroke-width="1" stroke-opacity="0.5"/>
          <line x1="${(cardW + 125) / 2}" y1="2" x2="${(cardW + 125) / 2}" y2="26" stroke="#c4b8a4" stroke-width="1" stroke-opacity="0.5"/>
        </g>
      </g>
    </svg>
  `);

  await sharp(svg)
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`Generated ${outFile} at ${outPath}`);
}

async function main() {
  console.log('Generating README assets (Win2k Profile Banner & Polaroids)...');
  await generateWin2kProfileBanner();

  await generatePolaroid({
    sourceFile: 'Cherry_J80-3000_I2C.jpg',
    outFile: 'polaroid-j80.png',
    title: 'J80-3000 I2C',
    specs: 'Cherry G80 Upcycling · 3D-Plate · QMK/VIA · ISO-DE',
    tilt: -1,
    tapeAngle: -1.5
  });

  await generatePolaroid({
    sourceFile: 'Monsgeek M1.jpg',
    outFile: 'polaroid-monsgeek.png',
    title: 'Monsgeek M1 Aluminium',
    specs: '75% Custom Build · Cherry Classic & Retro 101 · Modded',
    tilt: 1,
    tapeAngle: 1.2
  });

  await generatePolaroid({
    sourceFile: 'YMDK68_Wood_workbench.jpg',
    outFile: 'polaroid-ymdk68.png',
    title: 'YMDK68 Walnut Wood',
    specs: '68% Echtholz Gehäuse · Kailh Box Jade · Custom Cable',
    tilt: -1,
    tapeAngle: -1
  });

  await generatePolaroid({
    sourceFile: 'G80-3000.jpg',
    outFile: 'polaroid-g80.png',
    title: 'Cherry G80-3000 Eccentric',
    specs: 'JTK HSA Eccentric Keycaps · Plattenlos · Vintage Sound',
    tilt: 1,
    tapeAngle: 1.5
  });

  console.log('All README assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});

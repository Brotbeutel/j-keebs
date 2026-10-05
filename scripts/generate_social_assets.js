const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');

async function generateAppleTouchIcon() {
  const icoPath = path.join(IMAGES_DIR, 'J-Keebs-Icon.ico');
  const outPath = path.join(IMAGES_DIR, 'apple-touch-icon.png');
  const buf = fs.readFileSync(icoPath);

  // Extract the embedded 512x512 PNG at offset 55014 (size 189525 bytes)
  const count = buf.readUInt16LE(4);
  let pngOffset = null;
  let pngSize = null;

  for (let i = 0; i < count; i++) {
    const off = 6 + i * 16;
    const size = buf.readUInt32LE(off + 8);
    const imgOff = buf.readUInt32LE(off + 12);
    // Check for PNG signature \x89PNG\r\n\x1a\n
    if (buf[imgOff] === 0x89 && buf[imgOff + 1] === 0x50 && buf[imgOff + 2] === 0x4E && buf[imgOff + 3] === 0x47) {
      pngOffset = imgOff;
      pngSize = size;
      break;
    }
  }

  if (!pngOffset) {
    throw new Error('Could not find embedded PNG in J-Keebs-Icon.ico');
  }

  const pngBuf = buf.subarray(pngOffset, pngOffset + pngSize);

  // Resize keycap to 150x150, keeping aspect ratio and transparency
  const resizedKeycap = await sharp(pngBuf)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Composite onto 180x180 opaque background (#3a3736, the site's dark background token)
  // Apple Touch Icons require an opaque square (iOS masks corners automatically; transparency renders as black).
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 58, g: 55, b: 54, alpha: 1 } // #3a3736
    }
  })
    .composite([{ input: resizedKeycap, gravity: 'center' }])
    .png()
    .toFile(outPath);

  console.log(`Generated apple-touch-icon.png (180x180) at ${outPath}`);
}

async function generateOgPreview() {
  const W = 1200;
  const H = 630;
  const logoPath = path.join(IMAGES_DIR, 'J-Keebs-Logo.png');
  const outPath = path.join(IMAGES_DIR, 'og-preview.jpg');

  // Resize logo to 620px width (~261px height)
  const logoBuf = await sharp(logoPath)
    .resize(620)
    .toBuffer();

  const svgCard = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#423e3c"/>
          <stop offset="100%" stop-color="#22201f"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg-grad)"/>
      
      <!-- Outer elegant double border -->
      <rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#b3a078" stroke-width="1.5" stroke-opacity="0.4"/>
      <rect x="38" y="38" width="${W - 76}" height="${H - 76}" fill="none" stroke="#c3b8ad" stroke-width="1" stroke-opacity="0.15"/>
      
      <!-- Decorative corner marks -->
      <path d="M26 42 L42 42 M42 26 L42 42" stroke="#b3a078" stroke-width="2" fill="none"/>
      <path d="M1174 42 L1158 42 M1158 26 L1158 42" stroke="#b3a078" stroke-width="2" fill="none"/>
      <path d="M26 588 L42 588 M42 604 L42 588" stroke="#b3a078" stroke-width="2" fill="none"/>
      <path d="M1174 588 L1158 588 M1158 604 L1158 588" stroke="#b3a078" stroke-width="2" fill="none"/>

      <!-- Headline -->
      <text x="600" y="425" font-family="'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#f4f0e1" text-anchor="middle" letter-spacing="2">
        CUSTOM MECHANICAL KEYBOARDS
      </text>
      
      <!-- Accent separator line -->
      <line x1="500" y1="455" x2="700" y2="455" stroke="#b3a078" stroke-width="2"/>
      
      <!-- Subtitle -->
      <text x="600" y="490" font-family="'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#c3b8ad" text-anchor="middle" letter-spacing="1.5">
        Upcycling · Modding · Sound &amp; Haptik · German ISO
      </text>
      
      <!-- Domain badge -->
      <text x="600" y="550" font-family="'Courier Prime', 'Cascadia Code', Consolas, monospace" font-size="15" fill="#b3a078" text-anchor="middle" letter-spacing="1.2">
        brotbeutel.github.io/j-keebs
      </text>
    </svg>
  `);

  await sharp(svgCard)
    .composite([
      { input: logoBuf, top: 125, left: Math.round((W - 620) / 2) }
    ])
    .jpeg({ quality: 92 })
    .toFile(outPath);

  console.log(`Generated og-preview.jpg (1200x630) at ${outPath}`);
}

async function main() {
  await generateAppleTouchIcon();
  await generateOgPreview();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

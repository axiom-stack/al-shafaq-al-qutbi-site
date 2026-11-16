// Fold a tall full-page screenshot into side-by-side columns so it can be read at a glance.
// usage: node sheet.mjs <in.jpg> <out.jpg> [colHeight=1800] [maxCols=6]
import { spawnSync } from 'node:child_process';
const [inp, out, colH = '1800', maxCols = '6'] = process.argv.slice(2);
const probe = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', inp], { encoding: 'utf8' });
const [w, h] = probe.stdout.trim().split(',').map(Number);
let H = Number(colH); let cols = Math.ceil(h / H);
if (cols > Number(maxCols)) { cols = Number(maxCols); H = Math.ceil(h / cols); }
const parts = [];
for (let i = 0; i < cols; i++) { const y = i * H; const ch = Math.min(H, h - y); parts.push(`[0:v]crop=${w}:${ch}:0:${y},pad=${w + 16}:${H}:8:0:color=0x333333[c${i}]`); }
const graph = cols === 1 ? parts[0].replace('[c0]', '[o]') : parts.join(';') + ';' + Array.from({ length: cols }, (_, i) => `[c${i}]`).join('') + `hstack=inputs=${cols}[o]`;
const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', inp, '-filter_complex', graph, '-map', '[o]', '-frames:v', '1', '-q:v', '3', out], { encoding: 'utf8' });
if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
console.log(`${out}: ${w}x${h} -> ${cols} cols of ${H}px`);

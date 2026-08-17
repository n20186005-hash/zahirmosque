import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  let crc = 0xffffffff;
  for (const byte of body) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([length, body, checksum]);
}

function png(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const idx = y * (size * 4 + 1) + 1 + x * 4;
      const border = Math.max(Math.abs(x - size / 2), Math.abs(y - size / 2));
      const dome = ((x - size / 2) ** 2) / ((size * .26) ** 2) + ((y - size * .42) ** 2) / ((size * .26) ** 2) < 1 && y < size * .52;
      const building = x > size * .2 && x < size * .8 && y > size * .43 && y < size * .76;
      const arch = ((x - size / 2) ** 2) / ((size * .09) ** 2) + ((y - size * .63) ** 2) / ((size * .14) ** 2) < 1 && y > size * .57;
      const gold = border > size * .42 && border < size * .46;
      const [r,g,b] = gold ? [185,145,74] : (dome || building) && !arch ? [245,238,223] : [23,34,31];
      raw[idx] = r; raw[idx + 1] = g; raw[idx + 2] = b; raw[idx + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from("89504e470d0a1a0a", "hex"), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

for (const [name, size] of [["favicon-16.png",16],["favicon-32.png",32],["apple-touch-icon.png",180]]) writeFileSync(new URL(`../public/${name}`, import.meta.url), png(size));


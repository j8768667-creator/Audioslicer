/**
 * Validation utilities for SoundFont 2 (.sf2), SFZ (.sfz), and MIDI (.mid) files
 */

export function validateSf2Buffer(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.byteLength < 100) throw new Error('SF2 buffer too small');

  // 1. RIFF & sfbk header
  const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  const sfbk = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
  if (riff !== 'RIFF' || sfbk !== 'sfbk') {
    throw new Error(`Invalid RIFF SoundFont header: ${riff}/${sfbk}`);
  }

  // Helper to parse subchunks
  function parseChunks(buf, startOffset, endOffset) {
    const chunks = {};
    let pos = startOffset;
    while (pos + 8 <= endOffset) {
      const id = String.fromCharCode(buf.getUint8(pos), buf.getUint8(pos + 1), buf.getUint8(pos + 2), buf.getUint8(pos + 3));
      const size = buf.getUint32(pos + 4, true);
      chunks[id] = { offset: pos + 8, size };
      pos += 8 + size + (size % 2);
    }
    return chunks;
  }

  // 2. Parse top-level LIST chunks
  const lists = {};
  let pos = 12;
  while (pos + 12 <= view.byteLength) {
    const listId = String.fromCharCode(view.getUint8(pos), view.getUint8(pos + 1), view.getUint8(pos + 2), view.getUint8(pos + 3));
    const listSize = view.getUint32(pos + 4, true);
    const listType = String.fromCharCode(view.getUint8(pos + 8), view.getUint8(pos + 9), view.getUint8(pos + 10), view.getUint8(pos + 11));
    if (listId === 'LIST') {
      lists[listType] = { offset: pos + 12, size: listSize - 4 };
    }
    pos += 8 + listSize + (listSize % 2);
  }

  if (!lists.INFO || !lists.sdta || !lists.pdta) {
    throw new Error(`Missing required LIST chunk in SF2. Found: ${Object.keys(lists).join(', ')}`);
  }

  // 3. Parse pdta subchunks
  const pdta = parseChunks(view, lists.pdta.offset, lists.pdta.offset + lists.pdta.size);
  const requiredPdta = ['phdr', 'pbag', 'pmod', 'pgen', 'inst', 'ibag', 'imod', 'igen', 'shdr'];
  for (const req of requiredPdta) {
    if (!pdta[req]) throw new Error(`Missing required pdta chunk: ${req}`);
  }

  // 4. Validate sample headers (shdr)
  const shdrInfo = pdta.shdr;
  const numSamples = Math.floor(shdrInfo.size / 46) - 1; // last is EOS
  if (numSamples <= 0) throw new Error('SoundFont contains 0 sample headers');

  for (let i = 0; i < numSamples; i++) {
    const off = shdrInfo.offset + i * 46;
    let name = '';
    for (let c = 0; c < 20; c++) {
      const code = view.getUint8(off + c);
      if (code === 0) break;
      name += String.fromCharCode(code);
    }
    const start = view.getUint32(off + 20, true);
    const end = view.getUint32(off + 24, true);
    const startLoop = view.getUint32(off + 28, true);
    const endLoop = view.getUint32(off + 32, true);
    const sampleRate = view.getUint32(off + 36, true);
    const originalKey = view.getUint8(off + 40);

    if (start >= end) throw new Error(`Sample ${name}: start (${start}) >= end (${end})`);
    if (start > startLoop) throw new Error(`Sample ${name}: start (${start}) > startLoop (${startLoop})`);
    if (startLoop >= endLoop) throw new Error(`Sample ${name}: startLoop (${startLoop}) >= endLoop (${endLoop})`);
    if (endLoop > end) throw new Error(`Sample ${name}: endLoop (${endLoop}) > end (${end})`);
    if (end - endLoop < 8) throw new Error(`Sample ${name}: end - endLoop (${end - endLoop}) must be >= 8 for iOS/Mighty Synth`);
    if (endLoop - startLoop < 8) throw new Error(`Sample ${name}: endLoop - startLoop (${endLoop - startLoop}) must be >= 8`);
  }

  return { valid: true, numSamples, lists: Object.keys(lists) };
}

export function validateMidiBuffer(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.byteLength < 22) throw new Error('MIDI buffer too small');

  // Check 'MThd'
  const mthd = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
  if (mthd !== 'MThd') throw new Error(`Invalid MIDI Header: ${mthd}`);

  const format = view.getUint16(8, false);
  const numTracks = view.getUint16(10, false);
  const timeDivision = view.getUint16(12, false);

  if (format !== 0) throw new Error(`Expected Type-0 MIDI, got Type-${format}`);
  if (numTracks !== 1) throw new Error(`Expected 1 track, got ${numTracks}`);

  // Check 'MTrk'
  const mtrk = String.fromCharCode(view.getUint8(14), view.getUint8(15), view.getUint8(16), view.getUint8(17));
  if (mtrk !== 'MTrk') throw new Error(`Invalid Track Header: ${mtrk}`);

  const trackLen = view.getUint32(18, false);
  if (22 + trackLen > view.byteLength) throw new Error('Truncated MIDI track length');

  return { valid: true, format, numTracks, timeDivision, trackLen };
}

export function validateSfzText(text) {
  if (!text.includes('<global>')) throw new Error('SFZ missing <global> section');
  if (!text.includes('<group>')) throw new Error('SFZ missing <group> section');
  if (!text.includes('<region>')) throw new Error('SFZ missing <region> definitions');
  if (!text.includes('pitch_keycenter=')) throw new Error('SFZ missing pitch_keycenter mapping');

  const regionCount = (text.match(/<region>/g) || []).length;
  return { valid: true, regionCount };
}

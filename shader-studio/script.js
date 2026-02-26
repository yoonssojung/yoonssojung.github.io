// =============================================================================
// SHADER STUDIO — script.js
// All controls wire directly to these variables. No hidden inputs, no mirroring.
// =============================================================================

// --- Shader & graphics buffers -----------------------------------------------
let myShader;
let pg;           // WEBGL offscreen — runs the shader
let imgGraphics;  // WEBGL offscreen — holds the source texture (flipped)
let textGraphics; // 2D offscreen — where text / image is drawn

// --- Source state -------------------------------------------------------------
let userText        = "";
let usingImage      = false;
let lastImageFile   = null;
let blurAmount      = 8;
let fontFamily      = "Arial";
let fontWeight      = "normal";
let verticalOffset  = 0;
let manualFontSize  = 0;
let manualLeading   = 1.2;

// --- Shader uniforms ----------------------------------------------------------
let speedValue = 0.5;

function randomColor() {
  return [Math.random(), Math.random(), Math.random()];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
}

let colorValues = {
  color1: randomColor(),
  color2: randomColor(),
  color3: randomColor(),
  color4: randomColor(),
  color5: randomColor(),
  color6: randomColor(),
};

// --- GIF capture state --------------------------------------------------------
let capturing        = false;
let captureTotalFrames = 0;
let captureFPS       = 15;
let captureIndex     = 0;
let captureStartTime = 0;
let captureFrames    = [];
let lastGifUrl       = null;

// =============================================================================
// p5.js LIFECYCLE
// =============================================================================

function preload() {
  myShader = loadShader("uniform.vert", "uniform.frag");
}

function getWrapSize() {
  let wrap = document.getElementById("canvas-wrap");
  if (wrap && wrap.clientWidth > 0 && wrap.clientHeight > 0)
    return { w: wrap.clientWidth, h: wrap.clientHeight };
  return { w: window.innerWidth - 300, h: window.innerHeight - 48 };
}

// Fixed canvas resolution — set once in setup(), never changes
let CANVAS_W = 0;
let CANVAS_H = 0;

function fitCanvasToWrap() {
  let wrap = document.getElementById("canvas-wrap");
  let cnv  = document.querySelector("#canvas-wrap canvas");
  if (!wrap || !cnv || CANVAS_W === 0) return;
  let scale = Math.min(wrap.clientWidth / CANVAS_W, wrap.clientHeight / CANVAS_H);
  cnv.style.transform = "scale(" + scale + ")";
}

// p5 windowResized — CSS scale only, buffers stay intact
function windowResized() {
  fitCanvasToWrap();
}

function setup() {
  let sz  = getWrapSize();
  CANVAS_W = sz.w;
  CANVAS_H = sz.h;
  let cnv = createCanvas(CANVAS_W, CANVAS_H);
  let wrap = document.getElementById("canvas-wrap");
  if (wrap) wrap.appendChild(cnv.elt);

  // Initial CSS scale fit
  fitCanvasToWrap();

  // Also watch the wrap element for size changes (panel resize, etc.)
  if (window.ResizeObserver) {
    new ResizeObserver(fitCanvasToWrap).observe(wrap);
  }

  // WEBGL buffer that runs the shader
  pg = createGraphics(width, height, WEBGL);
  pg.noStroke();

  // WEBGL buffer used as the texture fed to the shader (y-flipped)
  imgGraphics = createGraphics(width, height, WEBGL);
  imgGraphics.noStroke();

  // 2D buffer where text / images are drawn — taller than canvas to allow v-offset room
  textGraphics = createGraphics(width, height + TEXT_PAD * 2);
  textGraphics.pixelDensity(1);

  // Apply random initial colors to the swatches
  for (let i = 1; i <= 6; i++) {
    let c = colorValues["color" + i];
    let hex = rgbToHex(c[0], c[1], c[2]);
    let el = document.getElementById("color" + i);
    if (el) el.value = hex;
    let dot = document.getElementById("dot" + i);
    if (dot) dot.style.background = hex;
  }

  // Start with a plain white texture so the shader has something to show
  textGraphics.background(255);
  paintToShader();

  noStroke();

  // Wire up every UI control
  wireControls();
}

function draw() {
  clear();
  if (!myShader || !pg || !imgGraphics || !textGraphics) return;

  // --- normal live frame ---
  renderShaderFrame(-millis() / 1000.0);

  // --- GIF capture: re-render at a deterministic time per frame ---
  if (capturing) {
    let t = -(captureStartTime + captureIndex / captureFPS);
    renderShaderFrame(t);

    // grab what's on the main canvas
    let canvases = Array.from(document.querySelectorAll("canvas"));
    let main = canvases.find(c =>
      c.width === width && c.height === height && c.offsetParent !== null
    ) || canvases[0];
    let ctx = main.getContext("2d");
    captureFrames.push(ctx.getImageData(0, 0, main.width, main.height));

    captureIndex++;
    setStatus("Capturing " + captureIndex + "/" + captureTotalFrames + "…");

    if (captureIndex >= captureTotalFrames) {
      capturing = false;
      setStatus("Encoding GIF…");
      setTimeout(() => encodeAndShowGIF(captureFrames, captureFPS), 50);
    }
  }
}

// Push shader uniforms and draw for a given time value
function renderShaderFrame(t) {
  pg.shader(myShader);
  myShader.setUniform("uImage",  imgGraphics);
  myShader.setUniform("time",    t);
  myShader.setUniform("speed",   speedValue);
  myShader.setUniform("color1",  colorValues.color1);
  myShader.setUniform("color2",  colorValues.color2);
  myShader.setUniform("color3",  colorValues.color3);
  myShader.setUniform("color4",  colorValues.color4);
  myShader.setUniform("color5",  colorValues.color5);
  myShader.setUniform("color6",  colorValues.color6);
  pg.rect(-pg.width / 2, -pg.height / 2, pg.width, pg.height);
  image(pg, 0, 0, width, height);  pg.resetMatrix();
  resetMatrix();
}

// =============================================================================
// SOURCE RENDERING
// =============================================================================

// Call this whenever text/image or a related option changes
function updateSource() {
  if (usingImage && lastImageFile) {
    loadImageIntoBuffer(lastImageFile);
  } else {
    renderText();
    paintToShader();
  }
}

// Draw text into textGraphics then push to imgGraphics
// Extra vertical padding so v-offset never clips text out of the buffer
const TEXT_PAD = 300;

function renderText() {
  let bufH = height + TEXT_PAD * 2; // oversized buffer

  textGraphics.push();
  textGraphics.clear();
  textGraphics.background(255);

  if (!userText || userText.trim() === "") {
    if (blurAmount > 0) textGraphics.filter(BLUR, blurAmount);
    textGraphics.pop();
    return;
  }

  textGraphics.fill(0);
  textGraphics.noStroke();
  textGraphics.textAlign(CENTER, TOP);

  try { textGraphics.textFont(fontFamily); } catch(e) {}
  textGraphics.textStyle(fontWeight === "bold" ? BOLD : NORMAL);

  let margin = 20;
  let words  = userText.split(/\s+/);

  function measureWrap(size) {
    textGraphics.textSize(size);
    let lines = [], cur = "";
    for (let w of words) {
      let test = cur ? cur + " " + w : w;
      if (textGraphics.textWidth(test) <= width - margin * 2) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    let leading = Math.floor(size * manualLeading);
    return {
      lines,
      leading,
      totalH: lines.length * leading,
      maxW: lines.reduce((m, l) => Math.max(m, textGraphics.textWidth(l)), 0)
    };
  }

  let size, result;

  if (manualFontSize > 0) {
    size = manualFontSize;
  } else {
    size = Math.floor(width / 6);
    let r = measureWrap(size);
    while (size > 8 && r.totalH > height - margin * 2) {
      size = Math.floor(size * 0.9);
      r = measureWrap(size);
    }
  }

  result = measureWrap(size);
  textGraphics.textSize(size);
  textGraphics.textLeading(result.leading);

  // Centre text in the oversized buffer (TEXT_PAD offset), then apply verticalOffset
  let centreY = TEXT_PAD + (height - result.totalH) / 2;
  let startY  = centreY + verticalOffset;
  for (let i = 0; i < result.lines.length; i++) {
    textGraphics.text(result.lines[i], width / 2, startY + i * result.leading);
  }

  if (blurAmount > 0) textGraphics.filter(BLUR, blurAmount);
  textGraphics.pop();
}

// Blit textGraphics into imgGraphics — crop just the visible window (strip TEXT_PAD)
function paintToShader() {
  imgGraphics.push();
  imgGraphics.clear();
  imgGraphics.scale(1, -1);
  imgGraphics.imageMode(CORNER);
  // 9-arg: image(src, dx, dy, dw, dh, sx, sy, sw, sh)
  imgGraphics.image(textGraphics,
    -width/2, -height/2, width, height,   // dest: full buffer
    0, TEXT_PAD, width, height);           // src: crop out the padding
  imgGraphics.pop();
}

// Load a user-selected image file, greyscale it, blur it, push to shader
function loadImageIntoBuffer(file) {
  usingImage    = true;
  lastImageFile = file;
  let url = URL.createObjectURL(file);

  loadImage(url, function(img) {
    let sc = Math.min(width / img.width, height / img.height);
    let dw = img.width * sc, dh = img.height * sc;
    let dx = (width - dw) / 2;
    // Centre vertically within the visible window (TEXT_PAD … TEXT_PAD+height)
    let dy = TEXT_PAD + (height - dh) / 2 + verticalOffset;

    textGraphics.push();
    textGraphics.clear();
    textGraphics.background(255);
    textGraphics.image(img, dx, dy, dw, dh);
    textGraphics.loadPixels();

    for (let i = 0; i < textGraphics.pixels.length; i += 4) {
      let g = 0.299 * textGraphics.pixels[i]
            + 0.587 * textGraphics.pixels[i + 1]
            + 0.114 * textGraphics.pixels[i + 2];
      textGraphics.pixels[i] = textGraphics.pixels[i+1] = textGraphics.pixels[i+2] = g;
    }

    textGraphics.updatePixels();
    if (blurAmount > 0) textGraphics.filter(BLUR, blurAmount);
    textGraphics.pop();
    paintToShader();
    URL.revokeObjectURL(url);

  }, function() {
    alert("Could not load image.");
    URL.revokeObjectURL(url);
  });
}

// =============================================================================
// CONTROL WIRING  — every control talks directly to the variables above
// =============================================================================

function wireControls() {

  // ── Text input ──────────────────────────────────────────────────────────────
  let textEl = document.getElementById("text-input");
  if (textEl) {
    textEl.addEventListener("input", function() {
      userText   = this.value;
      usingImage = false;
      renderText();
      paintToShader();
    });
  }

  // ── Clear / restart ──────────────────────────────────────────────────────────
  let clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function() {
      // Reset image
      usingImage    = false;
      lastImageFile = null;
      let nameEl = document.getElementById("file-name");
      if (nameEl) nameEl.textContent = "No file selected";
      let imgInput = document.getElementById("image-input");
      if (imgInput) imgInput.value = "";
      // Reset text
      userText = "";
      let textEl = document.getElementById("text-input");
      if (textEl) textEl.value = "";
      // Clear canvas
      textGraphics.background(255);
      paintToShader();
    });
  }

  // ── Image upload ────────────────────────────────────────────────────────────
  let imgEl = document.getElementById("image-input");
  if (imgEl) {
    imgEl.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        let f = this.files[0];
        let nameEl = document.getElementById("file-name");
        if (nameEl) nameEl.textContent = f.name;
        loadImageIntoBuffer(f);
      }
    });
  }

  // ── Blur ────────────────────────────────────────────────────────────────────
  let blurEl = document.getElementById("blur-range");
  if (blurEl) {
    blurEl.addEventListener("input", function() {
      blurAmount = parseInt(this.value) || 0;
      let disp = document.getElementById("blur-display");
      if (disp) disp.textContent = blurAmount;
      updateSource();
    });
  }

  // ── Font size ────────────────────────────────────────────────────────────────
  let fsEl = document.getElementById("font-size-range");
  if (fsEl) {
    fsEl.addEventListener("input", function() {
      manualFontSize = parseInt(this.value) || 0;
      let disp = document.getElementById("font-size-display");
      if (disp) disp.textContent = manualFontSize === 0 ? "auto" : manualFontSize;
      updateSource();
    });
  }

  // ── Line height ──────────────────────────────────────────────────────────────
  let lhEl = document.getElementById("line-height-range");
  if (lhEl) {
    lhEl.addEventListener("input", function() {
      manualLeading = parseFloat(this.value);
      let disp = document.getElementById("line-height-display");
      if (disp) disp.textContent = manualLeading.toFixed(1);
      updateSource();
    });
  }

  // ── Font family ─────────────────────────────────────────────────────────────
  let fontEl = document.getElementById("font-select");
  if (fontEl) {
    fontEl.addEventListener("change", function() {
      fontFamily = this.value;
      updateSource();
    });
  }

  // ── Font weight ─────────────────────────────────────────────────────────────
  let weightEl = document.getElementById("weight-select");
  if (weightEl) {
    weightEl.addEventListener("change", function() {
      fontWeight = this.value;
      updateSource();
    });
  }

  // ── Vertical offset ─────────────────────────────────────────────────────────
  let vEl = document.getElementById("voffset-range");
  if (vEl) {
    vEl.addEventListener("input", function() {
      verticalOffset = parseInt(this.value) || 0;
      let disp = document.getElementById("voffset-display");
      if (disp) disp.textContent = verticalOffset;
      updateSource();
    });
  }

  // ── Speed ───────────────────────────────────────────────────────────────────
  let speedEl = document.getElementById("speed-slider");
  if (speedEl) {
    speedEl.addEventListener("input", function() {
      speedValue = parseFloat(this.value);
      let disp = document.getElementById("speed-display");
      if (disp) disp.textContent = speedValue.toFixed(1);
    });
  }

  // ── Colors ──────────────────────────────────────────────────────────────────
  for (let i = 1; i <= 6; i++) {
    let el = document.getElementById("color" + i);
    if (el) {
      el.addEventListener("input", (function(idx) {
        return function() {
          let rgb = hexToRGB(this.value);
          if (rgb) colorValues["color" + idx] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
          // update the dot
          let dot = document.getElementById("dot" + idx);
          if (dot) dot.style.background = this.value;
        };
      })(i));
    }
  }

  // ── PNG export ───────────────────────────────────────────────────────────────
  let pngBtn = document.getElementById("export-png-btn");
  if (pngBtn) {
    pngBtn.addEventListener("click", function() {
      exportPNG();
    });
  }

  // ── GIF export ──────────────────────────────────────────────────────────────
  let exportBtn = document.getElementById("export-gif-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function() {
      if (capturing) return;
      let dur = parseFloat(document.getElementById("anim-duration").value) || 2;
      let fps = parseInt(document.getElementById("anim-fps").value)        || 15;
      startCapture(dur, fps, exportBtn);
    });
  }

  let restartBtn = document.getElementById("anim-restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", resetExportUI);
  }

  let previewLink = document.getElementById("anim-preview-link");
  if (previewLink) {
    previewLink.addEventListener("click", function(e) {
      e.preventDefault();
      if (lastGifUrl) openGifPreview(lastGifUrl);
    });
  }
}

// =============================================================================
// PNG EXPORT
// =============================================================================

function exportPNG() {
  let stamp = new Date().toISOString().replace(/[:.]/g, "-");
  saveCanvas("shader_" + stamp, "png");
}

// =============================================================================
// GIF CAPTURE & ENCODING
// =============================================================================

function startCapture(durationSecs, fps, btn) {
  captureFPS         = Math.max(1, Math.min(60, Math.floor(fps)));
  captureTotalFrames = Math.max(1, Math.round(durationSecs * captureFPS));
  captureIndex       = 0;
  captureStartTime   = millis() / 1000.0;
  captureFrames      = [];
  capturing          = true;

  if (btn) btn.disabled = true;
  setStatus("Capturing 0/" + captureTotalFrames + "…");
  showPreviewLink(false);
  showRestartBtn(false);
}

function encodeAndShowGIF(frames, fps) {
  let w     = frames[0].width;
  let h     = frames[0].height;
  let delay = Math.round(100 / fps);

  setProgressBar(0);
  setStatus("Building palette…");

  // Yield to browser, then run heavy work in a Web Worker
  setTimeout(() => {
    // Serialize frames to transferable ArrayBuffers
    let rawFrames = frames.map(f => f.data.buffer.slice(0));
    let fw = frames[0].width, fh = frames[0].height;

    // Build the worker source as a string so we can Blob-URL it (no extra file needed)
    let workerSrc = `
${buildPalette.toString()}
${toPaletteIndices.toString()}
${lzwEncode.toString()}

self.onmessage = function(e) {
  let { rawFrames, fw, fh, delay, fps } = e.data;
  let total = rawFrames.length;

  // Reconstruct ImageData-like objects
  let frames = rawFrames.map(buf => ({ data: new Uint8ClampedArray(buf), width: fw, height: fh }));

  self.postMessage({ type: 'status', msg: 'Building palette…' });
  let palette = buildPalette(frames);

  // Index frames one by one, reporting progress
  let indexed = [];
  for (let i = 0; i < frames.length; i++) {
    indexed.push(toPaletteIndices(frames[i], palette));
    self.postMessage({ type: 'progress', pct: Math.round(((i + 1) / total) * 50) });
  }

  self.postMessage({ type: 'status', msg: 'Encoding GIF…' });

  // Build GIF bytes
  let bytes = [];
  function B(v)   { bytes.push(v & 0xff); }
  function W(v)   { B(v); B(v >> 8); }
  function S(str) { for (let c of str) B(c.charCodeAt(0)); }

  S("GIF89a"); W(fw); W(fh); B(0xf7); B(0); B(0);
  for (let i = 0; i < 256; i++) {
    let p = palette[i] || [0,0,0]; B(p[0]); B(p[1]); B(p[2]);
  }
  B(0x21); B(0xff); B(11); S("NETSCAPE2.0"); B(3); B(1); W(0); B(0);

  for (let f = 0; f < indexed.length; f++) {
    B(0x21); B(0xf9); B(4); B(0); W(delay); B(0); B(0);
    B(0x2c); W(0); W(0); W(fw); W(fh); B(0);
    let lzwData = lzwEncode(indexed[f], 8);
    B(8);
    for (let i = 0; i < lzwData.length; i += 255) {
      let chunk = lzwData.slice(i, i + 255);
      B(chunk.length);
      chunk.forEach(v => B(v));
    }
    B(0);
    self.postMessage({ type: 'progress', pct: 50 + Math.round(((f + 1) / indexed.length) * 50) });
  }
  B(0x3b);

  self.postMessage({ type: 'done', bytes: new Uint8Array(bytes) }, [new Uint8Array(bytes).buffer]);
};
`;

    let blob   = new Blob([workerSrc], { type: "application/javascript" });
    let blobUrl = URL.createObjectURL(blob);
    let worker  = new Worker(blobUrl);

    worker.onmessage = function(e) {
      let d = e.data;
      if (d.type === 'status') {
        setStatus(d.msg);
      } else if (d.type === 'progress') {
        setProgressBar(d.pct);
        setStatus("Encoding… " + d.pct + "%");
      } else if (d.type === 'done') {
        URL.revokeObjectURL(blobUrl);
        worker.terminate();
        setProgressBar(100);
        let gifBlob = new Blob([d.bytes], { type: "image/gif" });
        lastGifUrl  = URL.createObjectURL(gifBlob);
        setStatus("Done!");
        setProgressBar(-1); // hide
        showPreviewLink(true);
        showRestartBtn(true);
        let btn = document.getElementById("export-gif-btn");
        if (btn) btn.disabled = false;
      }
    };

    worker.onerror = function(err) {
      console.error("GIF worker error:", err);
      setStatus("Error encoding GIF. See console.");
      setProgressBar(-1);
      URL.revokeObjectURL(blobUrl);
      let btn = document.getElementById("export-gif-btn");
      if (btn) btn.disabled = false;
    };

    worker.postMessage({ rawFrames, fw, fh, delay, fps }, rawFrames);
  }, 30);
}

// LZW encoder — returns array of bytes
function lzwEncode(pixels, minCodeSize) {
  let clearCode = 1 << minCodeSize;
  let eofCode   = clearCode + 1;
  let codeSize  = minCodeSize + 1;
  let nextCode  = eofCode + 1;
  let table     = {};

  let output    = [];
  let bits      = 0;
  let bitBuf    = 0;

  function emit(code) {
    bitBuf |= code << bits;
    bits   += codeSize;
    while (bits >= 8) { output.push(bitBuf & 0xff); bitBuf >>= 8; bits -= 8; }
  }

  function resetTable() {
    table    = {};
    codeSize = minCodeSize + 1;
    nextCode = eofCode + 1;
  }

  emit(clearCode);
  resetTable();

  let cur = pixels[0];
  for (let i = 1; i < pixels.length; i++) {
    let next = pixels[i];
    let key  = cur + "," + next;
    if (table[key] !== undefined) {
      cur = table[key];
    } else {
      emit(cur);
      if (nextCode < 4096) {
        table[key] = nextCode++;
        if (nextCode > (1 << codeSize) && codeSize < 12) codeSize++;
      } else {
        emit(clearCode);
        resetTable();
      }
      cur = next;
    }
  }
  emit(cur);
  emit(eofCode);
  if (bits > 0) output.push(bitBuf & 0xff);
  return output;
}

function buildPalette(frames) {
  let colors = [], seen = {};
  for (let frame of frames) {
    let d = frame.data;
    for (let i = 0; i < d.length; i += 20) {
      let k = d[i] + "," + d[i+1] + "," + d[i+2];
      if (!seen[k]) { colors.push([d[i], d[i+1], d[i+2]]); seen[k] = 1; }
      if (colors.length >= 256) break;
    }
    if (colors.length >= 256) break;
  }
  while (colors.length < 256) colors.push([0,0,0]);
  return colors;
}

function toPaletteIndices(frame, palette) {
  let d = frame.data, out = new Uint8Array(frame.width * frame.height);
  for (let i = 0; i < d.length; i += 4) {
    let best = 0, bestD = 1e9;
    for (let j = 0; j < palette.length; j++) {
      let dr = d[i]-palette[j][0], dg = d[i+1]-palette[j][1], db = d[i+2]-palette[j][2];
      let dist = dr*dr + dg*dg + db*db;
      if (dist < bestD) { bestD = dist; best = j; }
    }
    out[i >> 2] = best;
  }
  return out;
}

function openGifPreview(url) {
  let stamp = new Date().toISOString().replace(/[:.]/g, "-");
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>GIF Preview</title>
<style>body{background:#111;color:#fff;font-family:monospace;text-align:center;padding:2rem;}
img{max-width:90vw;max-height:70vh;margin-top:1rem;border-radius:4px;}
button{margin-top:1rem;padding:10px 24px;background:#e8e0d0;border:none;border-radius:4px;cursor:pointer;font-size:14px;}</style></head>
<body><h2>GIF Preview</h2>
<button onclick="const a=document.createElement('a');a.href='${url}';a.download='shader_${stamp}.gif';a.click();">Download GIF</button>
<br><img src="${url}"></body></html>`;
  let w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); }
}

// =============================================================================
// UI HELPERS
// =============================================================================

function setStatus(msg) {
  let el = document.getElementById("anim-status");
  if (el) el.textContent = msg;
}

function setProgressBar(pct) {
  let bar = document.getElementById("anim-progress-bar");
  let wrap = document.getElementById("anim-progress-wrap");
  if (!wrap || !bar) return;
  if (pct < 0) {
    wrap.style.display = "none";
    return;
  }
  wrap.style.display = "block";
  bar.style.width = Math.min(100, pct) + "%";
}

function showPreviewLink(show) {
  let el = document.getElementById("anim-preview-link");
  if (el) el.style.display = show ? "inline" : "none";
}

function showRestartBtn(show) {
  let el = document.getElementById("anim-restart-btn");
  if (el) el.style.display = show ? "inline-block" : "none";
}

function resetExportUI() {
  setStatus("");
  setProgressBar(-1);
  showPreviewLink(false);
  showRestartBtn(false);
  if (lastGifUrl) { URL.revokeObjectURL(lastGifUrl); lastGifUrl = null; }
}

function hexToRGB(hex) {
  let m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : null;
}

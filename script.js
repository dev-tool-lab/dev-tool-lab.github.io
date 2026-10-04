document.addEventListener('DOMContentLoaded', () => {

  // 1. HERRAMIENTA JSON
  const jsonInput = document.getElementById('json-input');
  const jsonOutput = document.getElementById('json-output');
  const jsonStatus = document.getElementById('json-status');
  const btnFormat = document.getElementById('btn-format');
  const btnMinify = document.getElementById('btn-minify');
  const btnCopyJson = document.getElementById('btn-copy-json');
  const btnClearJson = document.getElementById('btn-clear-json');

  btnFormat.addEventListener('click', () => {
    const raw = jsonInput.value.trim();
    if (!raw) return setJsonStatus('Por favor, ingresa un JSON válido en el editor de entrada.', 'error');
    try {
      jsonOutput.value = JSON.stringify(JSON.parse(raw), null, 2);
      setJsonStatus('✓ JSON válido y estructurado correctamente.', 'success');
    } catch (e) {
      jsonOutput.value = '';
      setJsonStatus(`❌ Sintaxis no válida: ${e.message}`, 'error');
    }
  });

  btnMinify.addEventListener('click', () => {
    const raw = jsonInput.value.trim();
    if (!raw) return setJsonStatus('Por favor, ingresa un JSON válido.', 'error');
    try {
      jsonOutput.value = JSON.stringify(JSON.parse(raw));
      setJsonStatus('✓ JSON minificado con éxito.', 'success');
    } catch (e) {
      jsonOutput.value = '';
      setJsonStatus(`❌ Sintaxis no válida: ${e.message}`, 'error');
    }
  });

  btnCopyJson.addEventListener('click', () => {
    if (!jsonOutput.value) return;
    navigator.clipboard.writeText(jsonOutput.value);
    btnCopyJson.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    setTimeout(() => {
      btnCopyJson.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar';
    }, 2000);
  });

  btnClearJson.addEventListener('click', () => {
    jsonInput.value = '';
    jsonOutput.value = '';
    jsonStatus.classList.add('hidden');
  });

  function setJsonStatus(msg, type) {
    jsonStatus.textContent = msg;
    jsonStatus.className = `status-banner ${type}`;
    jsonStatus.classList.remove('hidden');
  }

  // 2. CONTADOR DE TEXTO Y MÉTRICAS
  const textInput = document.getElementById('text-input');
  const statWords = document.getElementById('stat-words');
  const statChars = document.getElementById('stat-chars');
  const statLines = document.getElementById('stat-lines');
  const statTime = document.getElementById('stat-time');

  textInput.addEventListener('input', () => {
    const val = textInput.value;
    statChars.textContent = val.length;

    const words = val.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = val.trim() === '' ? 0 : words.length;
    statWords.textContent = wordCount;

    statLines.textContent = val === '' ? 0 : val.split('\n').length;

    // Estimación de lectura (200 palabras por minuto)
    const minutes = Math.ceil(wordCount / 200);
    statTime.textContent = `${wordCount === 0 ? 0 : minutes}m`;
  });

  // 3. CONVERSOR DE BASES NUMÉRICAS
  const inputDec = document.getElementById('base-dec');
  const inputBin = document.getElementById('base-bin');
  const inputHex = document.getElementById('base-hex');
  const inputOct = document.getElementById('base-oct');
  const baseStatus = document.getElementById('base-status');
  const btnClearBases = document.getElementById('btn-clear-bases');

  const bases = [
    { el: inputDec, base: 10, regex: /^-?[0-9]*$/ },
    { el: inputBin, base: 2,  regex: /^-?[0-1]*$/ },
    { el: inputHex, base: 16, regex: /^-?[0-9a-fA-F]*$/ },
    { el: inputOct, base: 8,  regex: /^-?[0-7]*$/ }
  ];

  bases.forEach(({ el, base, regex }) => {
    el.addEventListener('input', () => {
      const val = el.value.trim();
      if (!val) return clearAllBases();

      if (!regex.test(val)) {
        baseStatus.textContent = ` Carácter no permitido para Base ${base}`;
        return;
      }

      baseStatus.textContent = '';
      const num = parseInt(val, base);

      if (isNaN(num)) return;

      if (el !== inputDec) inputDec.value = num.toString(10);
      if (el !== inputBin) inputBin.value = num.toString(2);
      if (el !== inputHex) inputHex.value = num.toString(16).toUpperCase();
      if (el !== inputOct) inputOct.value = num.toString(8);
    });
  });

  function clearAllBases() {
    inputDec.value = '';
    inputBin.value = '';
    inputHex.value = '';
    inputOct.value = '';
    baseStatus.textContent = '';
  }

  btnClearBases.addEventListener('click', clearAllBases);

});
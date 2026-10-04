document.addEventListener('DOMContentLoaded', () => {

  // 1. FORMATEADOR DE JSON
  const jsonInput = document.getElementById('json-input');
  const jsonOutput = document.getElementById('json-output');
  const jsonStatus = document.getElementById('json-status');
  const btnFormat = document.getElementById('btn-format');
  const btnMinify = document.getElementById('btn-minify');
  const btnClearJson = document.getElementById('btn-clear-json');

  btnFormat.addEventListener('click', () => {
    const raw = jsonInput.value.trim();
    if (!raw) return showStatus('Por favor, ingresa un JSON.', 'error');
    try {
      jsonOutput.value = JSON.stringify(JSON.parse(raw), null, 2);
      showStatus('✓ JSON válido y formateado.', 'success');
    } catch (e) {
      jsonOutput.value = '';
      showStatus(`❌ Error de JSON: ${e.message}`, 'error');
    }
  });

  btnMinify.addEventListener('click', () => {
    const raw = jsonInput.value.trim();
    if (!raw) return showStatus('Por favor, ingresa un JSON.', 'error');
    try {
      jsonOutput.value = JSON.stringify(JSON.parse(raw));
      showStatus('✓ JSON minificado.', 'success');
    } catch (e) {
      jsonOutput.value = '';
      showStatus(`❌ Error de JSON: ${e.message}`, 'error');
    }
  });

  btnClearJson.addEventListener('click', () => {
    jsonInput.value = '';
    jsonOutput.value = '';
    jsonStatus.textContent = '';
  });

  function showStatus(msg, type) {
    jsonStatus.textContent = msg;
    jsonStatus.className = `status-msg status-${type}`;
  }

  // 2. CONTADOR DE TEXTO
  const textInput = document.getElementById('text-input');
  const statWords = document.getElementById('stat-words');
  const statChars = document.getElementById('stat-chars');
  const statLines = document.getElementById('stat-lines');

  textInput.addEventListener('input', () => {
    const text = textInput.value;
    statChars.textContent = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    statWords.textContent = text.trim() === '' ? 0 : words.length;
    statLines.textContent = text === '' ? 0 : text.split('\n').length;
  });

  // 3. CONVERSOR DE BASES
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
      if (!val) return clearBases();

      if (!regex.test(val)) {
        baseStatus.textContent = `❌ Carácter no válido para base ${base}`;
        baseStatus.className = 'status-msg status-error';
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

  function clearBases() {
    inputDec.value = '';
    inputBin.value = '';
    inputHex.value = '';
    inputOct.value = '';
    baseStatus.textContent = '';
  }

  btnClearBases.addEventListener('click', clearBases);

});
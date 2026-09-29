// Progressiv forbedring: tekst og navigation virker også uden JavaScript.
const levelForm = document.querySelector('#level-form');
const directions = {
  start: ['Start med low-end', 'Prøv din nuværende PC med et lettere spil og lave indstillinger. Tjek først spillets minimumskrav. Opgradér kun, hvis oplevelsen ikke passer til dit mål.'],
  balance: ['Se mod mellemklassen', 'Vælg først 1080p eller 1440p, og sammenlign spillets anbefalede krav med tests. Brug en del af budgettet på en passende skærm.'],
  detail: ['Undersøg high-end', '4K og ray tracing kræver meget af GPU og VRAM. Find tests med dine ønskede indstillinger, og tjek strømforsyning, køling og resten af systemet.'],
  speed: ['Prioritér stabil, høj FPS', 'Konkurrencespil kan belaste både CPU og GPU. Vælg lavere grafik og en passende Hz-skærm. High-end er ikke nødvendigt i alle spil; find relevante målinger.']
};
if (levelForm) {
  levelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const [title, text] = directions[document.querySelector('#goal').value];
    document.querySelector('#level-result h3').textContent = title;
    document.querySelector('#level-result p').textContent = text;
  });
}
const checks = [...document.querySelectorAll('.checklist input')];
const reset = document.querySelector('#reset');
function updateProgress() {
  const done = checks.filter((box) => box.checked).length;
  document.querySelector('#progress').textContent = done === checks.length
    ? '5 af 5 trin gennemført. Godt gået! Vælg ét lille næste skridt.'
    : `${done} af ${checks.length} trin gennemført.`;
}
if (checks.length) {
  checks.forEach((box) => box.addEventListener('change', updateProgress));
  reset.hidden = false;
  reset.addEventListener('click', () => {
    checks.forEach((box) => { box.checked = false; });
    updateProgress();
  });
  updateProgress();
}

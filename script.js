/* janu.fun - script.js */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  function formatNumber(n) {
    if (!Number.isFinite(n)) return "0";
    return Math.round(n).toLocaleString("en-IN");
  }

  function calculateLife() {
    const input = $("dob");
    if (!input) return;

    const dob = new Date(input.value + "T00:00:00");
    const now = new Date();

    if (Number.isNaN(dob.getTime()) || dob > now) {
      alert("कृपया सही जन्म तारीख चुनें।");
      return;
    }

    const ms = now - dob;
    const days = ms / 86400000;
    const years = days / 365.2425;

    // Fun estimates; these are approximate, not medical measurements.
    const heartbeats = days * 24 * 60 * 70;
    const breaths = days * 24 * 60 * 15;
    const blinks = days * 24 * 60 * 15;
    const sleepHours = days * 8;

    const values = {
      age: years.toFixed(2) + " years",
      days: formatNumber(days),
      heartbeats: formatNumber(heartbeats),
      breaths: formatNumber(breaths),
      blinks: formatNumber(blinks),
      sleep: formatNumber(sleepHours) + " hrs"
    };

    Object.keys(values).forEach((key) => {
      const el = $("stat-" + key);
      if (el) el.textContent = values[key];
    });

    const hindi = $("age-hindi");
    if (hindi) {
      hindi.textContent =
        "आप लगभग " + years.toFixed(1) + " साल से इस दुनिया में हैं ❤️";
    }
  }

  window.calculateLife = calculateLife;

  const btn = $("calculateBtn");
  if (btn) btn.addEventListener("click", calculateLife);

  // Optional live counter: refresh displayed values every second.
  setInterval(() => {
    const input = $("dob");
    if (input && input.value) calculateLife();
  }, 1000);
})();

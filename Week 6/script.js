// ---------- Hamburger menu ----------
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdown');

function closeMenu() {
  dropdown.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

dropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ---------- Countdown badge ----------
// Each card has data-depart-in="N" (days from today). The badge is worked out
// from a real departure date so it always shows a sensible number.
function daysLabel(n) {
  if (n <= 0) return 'Departs today';
  if (n === 1) return 'Departs tomorrow';
  return n + ' days to go';
}

document.querySelectorAll('.card').forEach((card) => {
  const departure = new Date();
  departure.setHours(0, 0, 0, 0);
  departure.setDate(departure.getDate() + Number(card.dataset.departIn));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diff = Math.round((departure - today) / 86400000);
  card.querySelector('.countdown').textContent = daysLabel(diff);

  // ---------- View details toggle ----------
  const btn = card.querySelector('.view-btn');
  const extra = card.querySelector('.extra');

  btn.addEventListener('click', () => {
    extra.hidden = !extra.hidden;
    btn.textContent = extra.hidden ? 'View details' : 'Hide details';
    btn.setAttribute('aria-expanded', String(!extra.hidden));
  });
});

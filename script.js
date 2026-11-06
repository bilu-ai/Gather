const events = [
  {
    id: 'rooftop-sessions',
    title: 'Rooftop Sessions: Golden Hour',
    category: 'Music',
    day: '07',
    month: 'NOV',
    date: 'Saturday, November 7, 2026 · 5:30 PM',
    startsAt: '2026-11-07T17:30:00+05:30',
    venue: 'The Terrace, Indiranagar',
    price: '₹499',
    description:
      'A sunset set, something cold in your hand, and the city stretching out below. Local selectors bring the warm sounds; you bring your favorite people.',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85',
    alt: 'Crowd enjoying an outdoor music festival',
  },
  {
    id: 'clay-and-chai',
    title: 'Clay & Chai: A Sunday Slowdown',
    category: 'Art',
    day: '08',
    month: 'NOV',
    date: 'Sunday, November 8, 2026 · 11:00 AM',
    startsAt: '2026-11-08T11:00:00+05:30',
    venue: 'Little Kiln Studio, Jayanagar',
    price: '₹850',
    description:
      'Get your hands a little messy and make something wonderfully imperfect. A relaxed beginner friendly pottery morning, with fresh chai and good company.',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85',
    alt: 'Handmade ceramic pottery on a studio table',
  },
  {
    id: 'little-plates',
    title: 'The Little Plates Supper Club',
    category: 'Food',
    day: '12',
    month: 'NOV',
    date: 'Thursday, November 12, 2026 · 7:00 PM',
    startsAt: '2026-11-12T19:00:00+05:30',
    venue: 'Common Ground, Koramangala',
    price: '₹1,200',
    description:
      'Six courses, one long table, and flavors that tell a story. This edition celebrates seasonal Karnataka ingredients with a menu cooked in good company.',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    alt: 'Beautifully plated dinner served at a restaurant',
  },
  {
    id: 'city-on-foot',
    title: 'The City, On Foot: Green Bengaluru',
    category: 'Outdoors',
    day: '14',
    month: 'NOV',
    date: 'Saturday, November 14, 2026 · 7:00 AM',
    startsAt: '2026-11-14T07:00:00+05:30',
    venue: 'Meet at Cubbon Park Gate',
    price: 'Free',
    description:
      'A gentle morning wander through the city’s leafy corners. Bring comfy shoes, a water bottle, and a willingness to notice things you usually walk past.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
    alt: 'Sunlight filtering through a green forest walk',
  },
  {
    id: 'indie-after-dark',
    title: 'Indie After Dark: Small Room, Big Sound',
    category: 'Music',
    day: '20',
    month: 'NOV',
    date: 'Friday, November 20, 2026 · 8:00 PM',
    startsAt: '2026-11-20T20:00:00+05:30',
    venue: 'The Humming Tree, Indiranagar',
    price: '₹399',
    description:
      'Three independent acts, one intimate room. Discover the voices making waves in the local scene before everyone else knows their names.',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85',
    alt: 'Musician performing under warm stage lights',
  },
  {
    id: 'print-play',
    title: 'Print & Play: A Poster Workshop',
    category: 'Art',
    day: '22',
    month: 'NOV',
    date: 'Sunday, November 22, 2026 · 2:00 PM',
    startsAt: '2026-11-22T14:00:00+05:30',
    venue: 'Paper Boat Collective, Malleshwaram',
    price: '₹650',
    description:
      'Make your own little piece of wall worthy art with block printing, bright inks, and a table full of happy accidents. All materials and a snack included.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85',
    alt: 'Creative workshop with stationery and art materials',
  },
];
const grid = document.querySelector('#eventGrid'),
  search = document.querySelector('#searchInput'),
  count = document.querySelector('#resultsCount'),
  empty = document.querySelector('#emptyState');
let activeCategory = 'All';
let saved = new Set(JSON.parse(localStorage.getItem('gather-saved') || '[]'));
function esc(s) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}
function html(strings, ...values) {
  return strings.reduce(
    (result, segment, index) => result + segment + (index < values.length ? values[index] : ''),
    ''
  );
}
function updateCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach((timer) => {
    const secondsLeft = Math.max(
      0,
      Math.floor((Date.parse(timer.dataset.countdown) - Date.now()) / 1000)
    );
    const days = Math.floor(secondsLeft / 86400);
    const hours = Math.floor((secondsLeft % 86400) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    timer.querySelector('.countdown-value').textContent =
      `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  });
}
function render() {
  const q = search.value.trim().toLowerCase();
  const visible = events.filter(
    (e) =>
      (activeCategory === 'All' || e.category === activeCategory) &&
      `${e.title} ${e.category} ${e.venue} ${e.date} ${e.description}`.toLowerCase().includes(q)
  );
  grid.innerHTML = visible
    .map(
      (e) =>
        html`<article
          class="event-card"
          data-id="${e.id}"
          tabindex="0"
          aria-label="View ${esc(e.title)}"
        >
          <div class="event-image">
            <img src="${e.image}" alt="${esc(e.alt)}" loading="lazy" />
            <div class="event-date"><b>${e.day}</b>${e.month}</div>
            <button
              class="save-event ${saved.has(e.id) ? 'saved' : ''}"
              data-save="${e.id}"
              aria-label="${saved.has(e.id) ? 'Remove saved event' : 'Save event'}"
              aria-pressed="${saved.has(e.id)}"
            >
              ${saved.has(e.id) ? '♥' : '♡'}
            </button>
          </div>
          <div class="event-details">
            <span class="event-category">${e.category} · Bengaluru</span>
            <h3>${esc(e.title)}</h3>
            <p>${esc(e.description)}</p>
            <p class="event-countdown" data-countdown="${e.startsAt}" aria-live="off">
              Starts in <strong class="countdown-value"></strong>
            </p>
            <div class="event-meta">
              <span>⌖ ${esc(e.venue)}</span><span><b>${e.price}</b> / person</span>
            </div>
          </div>
        </article>`
    )
    .join('');
  count.textContent = `${visible.length} ${visible.length === 1 ? 'lovely thing' : 'lovely things'} to do`;
  empty.hidden = visible.length !== 0;
  updateCountdowns();
}
function showEvent(id) {
  const e = events.find((item) => item.id === id);
  if (!e) return;
  document.querySelector('#dialogContent').innerHTML = html`<div class="dialog-hero">
      <img src="${e.image}" alt="${esc(e.alt)}" />
    </div>
    <div class="dialog-body">
      <span class="event-category">${e.category} · Bengaluru</span>
      <h2>${esc(e.title)}</h2>
      <div class="dialog-info"><span>◷ ${esc(e.date)}</span><span>⌖ ${esc(e.venue)}</span></div>
      <p>${esc(e.description)}</p>
      <p>
        Come as you are. Your ticket includes the full experience and a warm welcome from the people
        hosting.
      </p>
      <button class="primary-button register-from-detail" data-register="${e.id}">
        Save your spot <span>→</span>
      </button>
    </div>`;
  document.querySelector('#eventDialog').showModal();
}
function showRegistration(id) {
  const e = events.find((item) => item.id === id);
  if (!e) return;
  document.querySelector('#eventDialog').close();
  const form = document.querySelector('#registrationForm');
  form.reset();
  document.querySelector('#selectedEvent').value = e.id;
  document.querySelector('#formEventName').textContent = `${e.title} · ${e.date}`;
  form.hidden = false;
  document.querySelector('#registrationSuccess').hidden = true;
  document.querySelector('#registrationDialog').showModal();
}
grid.addEventListener('click', (ev) => {
  const save = ev.target.closest('[data-save]');
  if (save) {
    ev.stopPropagation();
    const id = save.dataset.save;
    saved.has(id) ? saved.delete(id) : saved.add(id);
    localStorage.setItem('gather-saved', JSON.stringify([...saved]));
    render();
    return;
  }
  const card = ev.target.closest('.event-card');
  if (card) showEvent(card.dataset.id);
});
grid.addEventListener('keydown', (ev) => {
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('.event-card')) {
    ev.preventDefault();
    showEvent(ev.target.dataset.id);
  }
});
document.querySelectorAll('.category').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.querySelector('.category.active').classList.remove('active');
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    render();
  })
);
search.addEventListener('input', render);
document.querySelector('#clearFilters').addEventListener('click', () => {
  activeCategory = 'All';
  search.value = '';
  document
    .querySelectorAll('.category')
    .forEach((b) => b.classList.toggle('active', b.dataset.category === 'All'));
  render();
});
document
  .querySelector('#resetSearch')
  .addEventListener('click', () => document.querySelector('#clearFilters').click());
document.querySelector('#dialogContent').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-register]');
  if (b) showRegistration(b.dataset.register);
});
document
  .querySelectorAll('.dialog-close')
  .forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach((d) =>
  d.addEventListener('click', (ev) => {
    if (ev.target === d) d.close();
  })
);
document.querySelector('#registrationForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const form = ev.currentTarget;
  form.querySelectorAll('.field-error').forEach((x) => (x.textContent = ''));
  form.querySelectorAll('[aria-invalid]').forEach((x) => x.removeAttribute('aria-invalid'));
  const name = form.elements.fullName.value.trim(),
    email = form.elements.email.value.trim(),
    phone = form.elements.phone.value.trim(),
    errors = {};
  if (name.length < 2) errors.fullName = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';
  if (phone && !/^\+?[0-9 ()-]{7,20}$/.test(phone))
    errors.phone = 'Please enter a valid phone number.';
  Object.entries(errors).forEach(([field, msg]) => {
    form.querySelector(`[data-for="${field}"]`).textContent = msg;
    form.elements[field].setAttribute('aria-invalid', 'true');
  });
  if (Object.keys(errors).length) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  const event = events.find((item) => item.id === document.querySelector('#selectedEvent').value);
  if (!event) return;
  const entries = JSON.parse(localStorage.getItem('gather-registrations') || '[]');
  entries.push({ eventId: event.id, name, email, phone, registeredAt: new Date().toISOString() });
  localStorage.setItem('gather-registrations', JSON.stringify(entries));
  form.hidden = true;
  document.querySelector('#successCopy').textContent =
    `Thanks, ${name.split(' ')[0]}! Your spot for ${event.title} is saved. We’ll see you there.`;
  document.querySelector('#registrationSuccess').hidden = false;
});
document
  .querySelector('#doneRegistration')
  .addEventListener('click', () => document.querySelector('#registrationDialog').close());
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('gather-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  document.querySelector('.theme-icon').textContent = document.body.classList.contains('dark')
    ? '☀'
    : '☾';
});
if (localStorage.getItem('gather-theme') === 'dark') {
  document.body.classList.add('dark');
  document.querySelector('.theme-icon').textContent = '☀';
}
document.querySelector('.menu-toggle').addEventListener('click', (ev) => {
  const nav = document.querySelector('.main-nav'),
    open = nav.classList.toggle('open');
  ev.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.main-nav a').forEach((a) =>
  a.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  })
);
const newsletterInput = document.querySelector('#newsletterEmail'),
  newsletterMessage = document.querySelector('#newsletterMessage');
newsletterInput.addEventListener('input', () => {
  newsletterMessage.textContent = '';
});
document.querySelector('#newsletterForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const form = ev.currentTarget;
  if (!form.reportValidity()) return;
  const email = newsletterInput.value.trim();
  localStorage.setItem('gather-newsletter', email);
  newsletterMessage.textContent = 'Your email has been saved in this browser for the demo.';
  form.reset();
});
document.addEventListener('keydown', (ev) => {
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault();
    search.focus();
  }
  if (ev.key === 'Escape') document.querySelectorAll('dialog[open]').forEach((d) => d.close());
});
render();
window.setInterval(updateCountdowns, 1000);

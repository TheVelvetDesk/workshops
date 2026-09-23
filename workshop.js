const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

root.classList.add('js');

window.addEventListener('pointermove', (event) => {
  root.style.setProperty('--pointer-x', `${event.clientX}px`);
  root.style.setProperty('--pointer-y', `${event.clientY}px`);
}, { passive: true });

const revealItems = document.querySelectorAll('[data-reveal]');

if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
});

document.querySelectorAll('details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('details[open]').forEach((openDetails) => {
      if (openDetails !== details) openDetails.open = false;
    });
  });
});

const registrationForm = document.querySelector('[data-registration-form]');
const topicInputs = [...document.querySelectorAll('input[name="topics"]')];
const topicStatus = document.querySelector('[data-topic-status]');

const updateTopicLimit = () => {
  const selected = topicInputs.filter((input) => input.checked);
  topicInputs.forEach((input) => {
    input.disabled = selected.length >= 3 && !input.checked;
  });
  if (topicStatus) topicStatus.textContent = selected.length ? `${selected.length} of 3 selected` : '';
};

topicInputs.forEach((input) => input.addEventListener('change', updateTopicLimit));

registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = registrationForm.querySelector('[data-registration-status]');
  const button = registrationForm.querySelector('button[type="submit"]');

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    return;
  }

  const data = new FormData(registrationForm);
  const topics = data.getAll('topics').map(String);
  if (topics.length === 0) {
    if (topicStatus) topicStatus.textContent = 'Choose at least one area you want to explore.';
    topicInputs[0]?.focus();
    return;
  }

  const name = String(data.get('name') || '').trim();
  const attendance = String(data.get('attendance') || '').trim();
  const price = attendance === 'In person' ? '$75 early bird' : '$30 early bird';
  const organization = String(data.get('organization') || '').trim() || 'Not provided';
  const role = String(data.get('role') || '').trim() || 'Not provided';
  const experience = String(data.get('experience') || '').trim();
  const goal = String(data.get('goal') || '').trim();
  const payload = {
    email: String(data.get('email') || '').trim(),
    message: [
      'AI for Business — seat request',
      `Name: ${name}`,
      `Attendance: ${attendance} (${price})`,
      `Business / organization: ${organization}`,
      `Role: ${role}`,
      `AI experience: ${experience}`,
      `Topics: ${topics.join(', ')}`,
      `Goal: ${goal}`,
    ].join('\n'),
    website: String(data.get('website') || '').trim(),
  };

  if (button) button.disabled = true;
  if (status) status.textContent = 'Sending your seat request…';

  try {
    const response = await fetch('https://market-this-morning-publisher.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send your seat request.');
    registrationForm.reset();
    updateTopicLimit();
    if (status) status.textContent = 'Your request is in. Watch your email for payment and confirmation details.';
  } catch (error) {
    if (status) status.textContent = error instanceof Error ? error.message : 'Unable to send your seat request. Please try again.';
  } finally {
    if (button) button.disabled = false;
  }
});

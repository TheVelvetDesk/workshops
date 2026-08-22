const form = document.querySelector('#workshop-application');
const panels = [...document.querySelectorAll('.form-panel')];
const progressSteps = [...document.querySelectorAll('.progress-step')];
const confirmation = document.querySelector('#confirmation');
const message = document.querySelector('.form-message');
const submitButton = document.querySelector('#submit-application');
let activePanel = 0;

const sourceFromUrl = new URLSearchParams(window.location.search).get('source');
if (sourceFromUrl) {
  const sourceSelect = document.querySelector('#referral-source');
  const matchingOption = [...sourceSelect.options].find((option) => option.textContent.toLowerCase() === sourceFromUrl.toLowerCase());
  if (matchingOption) sourceSelect.value = matchingOption.value;
}

function showPanel(index) {
  activePanel = Math.max(0, Math.min(index, panels.length - 1));
  panels.forEach((panel, panelIndex) => panel.classList.toggle('active', panelIndex === activePanel));
  progressSteps.forEach((step, stepIndex) => {
    step.classList.toggle('active', stepIndex === activePanel);
    step.classList.toggle('done', stepIndex < activePanel);
  });
  document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validatePanel(panel) {
  const fields = [...panel.querySelectorAll('input, select, textarea')].filter((field) => field.name !== 'company_fax');
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

document.querySelectorAll('.next-step').forEach((button) => {
  button.addEventListener('click', () => {
    if (validatePanel(panels[activePanel])) showPanel(activePanel + 1);
  });
});

document.querySelectorAll('.previous-step').forEach((button) => {
  button.addEventListener('click', () => showPanel(activePanel - 1));
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.className = 'form-message';
  message.textContent = '';

  if (!validatePanel(panels[activePanel])) return;
  const availability = form.querySelectorAll('input[name="availability"]:checked');
  if (!availability.length) {
    message.textContent = 'Please select at least one session window that could work for you.';
    message.classList.add('error');
    form.querySelector('input[name="availability"]')?.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.firstChild.textContent = 'Sending… ';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('The application service did not accept the submission.');

    form.hidden = true;
    document.querySelector('.form-progress').hidden = true;
    confirmation.classList.add('active');

    const paymentUrl = window.EVENT_CONFIG?.depositPaymentUrl?.trim();
    if (paymentUrl) {
      const depositLink = document.querySelector('#deposit-link');
      depositLink.href = paymentUrl;
      depositLink.hidden = false;
      confirmation.querySelector('.payment-wait strong').textContent = 'Next step: reserve the confirmed seat';
      confirmation.querySelector('.payment-wait span').textContent = 'Use the secure payment link below to pay the $49 deposit. The remaining $100 is due before the workshop.';
    }
  } catch (error) {
    message.textContent = 'We could not send the application. Please check your connection and try again.';
    message.classList.add('error');
    submitButton.disabled = false;
    submitButton.firstChild.textContent = 'Send my application ';
  }
});

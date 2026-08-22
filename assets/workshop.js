const form = document.querySelector('#workshop-application');
const submitButton = document.querySelector('#submit-application');
const message = document.querySelector('.form-message');
const confirmation = document.querySelector('#confirmation');

const sourceFromUrl = new URLSearchParams(window.location.search).get('source');
if (sourceFromUrl) {
  const sourceSelect = document.querySelector('#referral-source');
  const matchingOption = [...sourceSelect.options].find((option) => option.textContent.toLowerCase() === sourceFromUrl.toLowerCase());
  if (matchingOption) sourceSelect.value = matchingOption.value;
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.className = 'form-message';
  message.textContent = '';

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const availability = form.querySelectorAll('input[name="availability"]:checked');
  if (!availability.length) {
    message.textContent = 'Please select at least one time that could work for you.';
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
    if (!response.ok) throw new Error('Application was not accepted');

    form.hidden = true;
    document.querySelector('.signup-heading').hidden = true;
    confirmation.hidden = false;
  } catch (error) {
    message.textContent = 'We could not send the application. Please check your connection and try again.';
    message.classList.add('error');
    submitButton.disabled = false;
    submitButton.firstChild.textContent = 'Send my application ';
  }
});

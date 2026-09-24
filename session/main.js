import '../workshop.js';
import { SESSION_SETTINGS } from './availability.js';

const bookingForm = document.querySelector('[data-session-form]');
const calendarGrid = document.querySelector('[data-calendar-grid]');
const calendarTitle = document.querySelector('[data-calendar-title]');
const previousMonthButton = document.querySelector('[data-calendar-previous]');
const nextMonthButton = document.querySelector('[data-calendar-next]');
const timeSlots = document.querySelector('[data-time-slots]');
const timeZoneLabel = document.querySelector('[data-time-zone-label]');
const calendarStatus = document.querySelector('[data-calendar-status]');
const slotStatus = document.querySelector('[data-slot-status]');
const formStatus = document.querySelector('[data-session-status]');
const submitButton = bookingForm?.querySelector('[data-session-submit]');
const selectedDateInput = document.querySelector('[data-selected-date]');
const selectedStartInput = document.querySelector('[data-selected-start]');
const selectedEndInput = document.querySelector('[data-selected-end]');
const previewDate = document.querySelector('[data-preview-date]');
const previewTime = document.querySelector('[data-preview-time]');
const previewZone = document.querySelector('[data-preview-zone]');
const previewFormat = document.querySelector('[data-preview-format]');

if (!bookingForm || !calendarGrid || !timeSlots) {
  throw new Error('The focused-session booking form could not be loaded.');
}

const todayKey = getTodayKey();
const [todayYear, todayMonth] = todayKey.split('-').map(Number);
const maxDateKey = addDays(todayKey, SESSION_SETTINGS.bookingWindowDays);
let selectedDate = findFirstAvailableDate();
const initialDate = selectedDate ? getDateParts(selectedDate) : { year: todayYear, month: todayMonth - 1 };
let visibleYear = initialDate.year;
let visibleMonth = initialDate.month;
let selectedStart = '';
let selectedEnd = '';

function getTodayKey() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SESSION_SETTINGS.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return toDateKey(values.year, values.month, values.day);
}

function toDateKey(year, month, day) {
  return `${year}-${String(Number(month)).padStart(2, '0')}-${String(Number(day)).padStart(2, '0')}`;
}

function getDateParts(key) {
  const [year, month, day] = key.split('-').map(Number);
  return { year, month: month - 1, day };
}

function getDateFromKey(key) {
  const { year, month, day } = getDateParts(key);
  return new Date(Date.UTC(year, month, day));
}

function addDays(key, amount) {
  const date = getDateFromKey(key);
  date.setUTCDate(date.getUTCDate() + amount);
  return toDateKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

function getWeekday(key) {
  return getDateFromKey(key).getUTCDay();
}

function getNowMinutes() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SESSION_SETTINGS.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hour = values.hour === '24' ? 0 : Number(values.hour);
  return hour * 60 + Number(values.minute);
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatTime(value) {
  const [hours, minutes] = value.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

function formatTimeRange(start, end) {
  return `${formatTime(start)}–${formatTime(end)}`;
}

function formatLongDate(key) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(getDateFromKey(key));
}

function formatMonth(year, month) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month, 1)));
}

function getTimeZoneAbbreviation(key) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SESSION_SETTINGS.timezone,
    hour: 'numeric',
    timeZoneName: 'short',
  }).formatToParts(new Date(`${key}T12:00:00Z`));
  return parts.find((part) => part.type === 'timeZoneName')?.value || 'PT';
}

function getSlots(key) {
  const windows = SESSION_SETTINGS.availability[getWeekday(key)] || [];
  const nowMinutes = key === todayKey ? getNowMinutes() : -1;
  const slots = [];

  windows.forEach((window) => {
    const windowStart = timeToMinutes(window.start);
    const windowEnd = timeToMinutes(window.end);
    for (let start = windowStart; start + SESSION_SETTINGS.durationMinutes <= windowEnd; start += SESSION_SETTINGS.durationMinutes) {
      const startTime = minutesToTime(start);
      const endTime = minutesToTime(start + SESSION_SETTINGS.durationMinutes);
      const isUnavailable = SESSION_SETTINGS.unavailableSlots.some((slot) => slot.date === key && slot.start === startTime);
      slots.push({
        start: startTime,
        end: endTime,
        available: !isUnavailable && (nowMinutes < 0 || start > nowMinutes),
      });
    }
  });

  return slots;
}

function findFirstAvailableDate() {
  for (let offset = 0; offset <= SESSION_SETTINGS.bookingWindowDays; offset += 1) {
    const key = addDays(todayKey, offset);
    if (getSlots(key).some((slot) => slot.available)) return key;
  }
  return '';
}

function isDateInWindow(key) {
  return key >= todayKey && key <= maxDateKey;
}

function isDateAvailable(key) {
  return isDateInWindow(key) && getSlots(key).some((slot) => slot.available);
}

function renderCalendar() {
  if (!calendarTitle || !calendarGrid || !previousMonthButton || !nextMonthButton) return;

  calendarTitle.textContent = formatMonth(visibleYear, visibleMonth);
  previousMonthButton.disabled = visibleYear < todayYear || (visibleYear === todayYear && visibleMonth <= todayMonth - 1);
  const maxParts = getDateParts(maxDateKey);
  nextMonthButton.disabled = visibleYear > maxParts.year || (visibleYear === maxParts.year && visibleMonth >= maxParts.month);
  calendarGrid.replaceChildren();

  const firstOfMonth = new Date(Date.UTC(visibleYear, visibleMonth, 1));
  const leadingDays = firstOfMonth.getUTCDay();
  const daysInMonth = new Date(Date.UTC(visibleYear, visibleMonth + 1, 0)).getUTCDate();
  const cellCount = Math.ceil((leadingDays + daysInMonth) / 7) * 7;

  for (let index = 0; index < cellCount; index += 1) {
    const date = new Date(Date.UTC(visibleYear, visibleMonth, 1 - leadingDays + index));
    const key = toDateKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    const button = document.createElement('button');
    const isCurrentMonth = date.getUTCMonth() === visibleMonth;
    const available = isDateAvailable(key);

    button.type = 'button';
    button.className = 'calendar-day';
    button.dataset.calendarDate = key;
    button.textContent = String(date.getUTCDate());
    button.disabled = !available;
    button.setAttribute('role', 'gridcell');
    button.setAttribute('aria-label', `${formatLongDate(key)}${available ? ', available' : ', unavailable'}`);
    button.setAttribute('aria-selected', String(key === selectedDate));
    button.classList.toggle('is-outside', !isCurrentMonth);
    button.classList.toggle('is-today', key === todayKey);
    button.classList.toggle('is-selected', key === selectedDate);
    calendarGrid.append(button);
  }
}

function renderSlots() {
  if (!timeSlots) return;

  timeSlots.replaceChildren();
  const slots = selectedDate ? getSlots(selectedDate) : [];
  const availableSlots = slots.filter((slot) => slot.available);
  const zone = selectedDate ? getTimeZoneAbbreviation(selectedDate) : 'PT';

  if (timeZoneLabel) {
    timeZoneLabel.textContent = `${SESSION_SETTINGS.timezoneName} · ${zone} · 30-minute appointments`;
  }
  timeSlots.setAttribute('aria-label', selectedDate ? `Appointment times for ${formatLongDate(selectedDate)}` : 'Appointment times');

  if (!selectedDate) {
    timeSlots.append(createEmptySlotState('Choose a date to see open times.'));
    return;
  }

  if (!availableSlots.length) {
    timeSlots.append(createEmptySlotState('No open times remain on this day. Choose another date.'));
    return;
  }

  slots.forEach((slot) => {
    const button = document.createElement('button');
    const label = document.createElement('span');
    const detail = document.createElement('small');
    button.type = 'button';
    button.className = 'time-slot';
    button.dataset.timeSlot = slot.start;
    button.dataset.timeEnd = slot.end;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', String(slot.start === selectedStart));
    button.setAttribute('aria-label', `${formatTimeRange(slot.start, slot.end)}${slot.available ? `, ${SESSION_SETTINGS.timezoneName}` : ', unavailable'}`);
    button.disabled = !slot.available;
    label.textContent = formatTime(slot.start);
    detail.textContent = slot.available ? '30 min' : 'Unavailable';
    button.append(label, detail);
    button.classList.toggle('is-selected', slot.start === selectedStart);
    timeSlots.append(button);
  });
}

function createEmptySlotState(message) {
  const empty = document.createElement('p');
  empty.className = 'slot-empty';
  empty.textContent = message;
  return empty;
}

function getSelectedFormat() {
  return bookingForm.querySelector('input[name="format"]:checked')?.value || 'Live video';
}

function updateSelection() {
  const hasSelection = Boolean(selectedDate && selectedStart);
  const zone = selectedDate ? getTimeZoneAbbreviation(selectedDate) : 'PT';
  const format = getSelectedFormat();

  if (selectedDateInput) selectedDateInput.value = selectedDate;
  if (selectedStartInput) selectedStartInput.value = selectedStart;
  if (selectedEndInput) selectedEndInput.value = selectedEnd;
  if (previewFormat) previewFormat.textContent = format;
  if (previewDate) previewDate.textContent = selectedDate ? formatLongDate(selectedDate) : 'Choose a date';
  if (previewTime) previewTime.textContent = selectedStart ? formatTimeRange(selectedStart, selectedEnd) : 'Choose an available time';
  if (previewZone) previewZone.textContent = selectedStart ? `${SESSION_SETTINGS.timezoneName} (${zone})` : SESSION_SETTINGS.timezoneName;
  if (submitButton) submitButton.disabled = !hasSelection;
}

function chooseDate(key) {
  if (!isDateAvailable(key)) return;
  selectedDate = key;
  selectedStart = '';
  selectedEnd = '';
  if (calendarStatus) calendarStatus.textContent = '';
  if (slotStatus) slotStatus.textContent = 'Select an available time.';
  if (formStatus) formStatus.textContent = '';
  renderCalendar();
  renderSlots();
  updateSelection();
}

function moveMonth(amount) {
  const next = new Date(Date.UTC(visibleYear, visibleMonth + amount, 1));
  visibleYear = next.getUTCFullYear();
  visibleMonth = next.getUTCMonth();
  renderCalendar();
}

function getCheckoutEndpoint() {
  return String(SESSION_SETTINGS.checkout.endpoint || import.meta.env?.VITE_SESSION_CHECKOUT_ENDPOINT || '').trim();
}

function getPaymentLink() {
  return String(SESSION_SETTINGS.checkout.paymentLink || import.meta.env?.VITE_SESSION_PAYMENT_LINK || '').trim();
}

function openPaymentLink(paymentLink, data) {
  const url = new URL(paymentLink, window.location.href);
  url.searchParams.set('client_reference_id', `${data.date}_${data.startTime}_${data.format}_${data.timeZone}`);
  url.searchParams.set('prefilled_email', data.customer.email);
  url.searchParams.set('prefilled_name', data.customer.name);
  window.location.assign(url.toString());
}

async function createCheckout(checkoutEndpoint, payload) {
  const response = await fetch(checkoutEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  const checkoutUrl = result.checkoutUrl || result.url;
  if (!response.ok || !checkoutUrl) {
    throw new Error(result.error || 'Unable to start secure checkout.');
  }
  window.location.assign(checkoutUrl);
}

function showFormStatus(message, type = 'error') {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.toggle('is-warning', type === 'warning');
  formStatus.classList.toggle('is-success', type === 'success');
}

calendarGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-calendar-date]');
  if (!button || button.disabled) return;
  chooseDate(button.dataset.calendarDate);
});

previousMonthButton?.addEventListener('click', () => {
  if (!previousMonthButton.disabled) moveMonth(-1);
});

nextMonthButton?.addEventListener('click', () => {
  if (!nextMonthButton.disabled) moveMonth(1);
});

timeSlots.addEventListener('click', (event) => {
  const button = event.target.closest('[data-time-slot]');
  if (!button || button.disabled) return;
  selectedStart = button.dataset.timeSlot;
  selectedEnd = button.dataset.timeEnd;
  if (slotStatus) slotStatus.textContent = '';
  if (formStatus) formStatus.textContent = '';
  renderSlots();
  updateSelection();
});

bookingForm.addEventListener('input', () => {
  if (formStatus?.textContent) showFormStatus('', 'error');
});

bookingForm.addEventListener('change', (event) => {
  if (!event.target?.matches?.('input[name="format"]')) return;
  if (formStatus?.textContent) showFormStatus('', 'error');
  updateSelection();
});

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const selectedSlot = getSlots(selectedDate).find((slot) => slot.start === selectedStart);
  if (!selectedSlot?.available) {
    showFormStatus('That time is no longer available. Please choose another open time.');
    chooseDate(selectedDate);
    timeSlots.querySelector('button:not(:disabled)')?.focus();
    return;
  }

  const formData = new FormData(bookingForm);
  const customerName = String(formData.get('name') || '').trim();
  const customerEmail = String(formData.get('email') || '').trim();
  const focus = String(formData.get('focus') || '').trim();
  const role = String(formData.get('role') || '').trim();
  const organization = String(formData.get('organization') || '').trim();
  const website = String(formData.get('website') || '').trim();

  if (website) return;

  const payload = {
    sessionType: 'focused',
    format: getSelectedFormat(),
    date: selectedDate,
    startTime: selectedStart,
    endTime: selectedEnd,
    timeZone: SESSION_SETTINGS.timezone,
    durationMinutes: SESSION_SETTINGS.durationMinutes,
    amount: SESSION_SETTINGS.price * 100,
    currency: SESSION_SETTINGS.currency.toLowerCase(),
    priceId: SESSION_SETTINGS.checkout.priceId || undefined,
    focus,
    customer: {
      name: customerName,
      email: customerEmail,
      role,
      organization,
    },
  };

  const checkoutEndpoint = getCheckoutEndpoint();
  const paymentLink = getPaymentLink();
  const buttonText = submitButton?.textContent.trim() || 'Continue to payment';

  if (!checkoutEndpoint && !paymentLink) {
    showFormStatus('Your time is selected. Secure checkout is not connected yet, so no payment has been taken and the time is not reserved.', 'warning');
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Opening secure checkout…';
  }

  try {
    if (checkoutEndpoint) {
      await createCheckout(checkoutEndpoint, payload);
    } else {
      openPaymentLink(paymentLink, payload);
    }
  } catch (error) {
    showFormStatus(error instanceof Error ? error.message : 'Unable to start secure checkout. Please try again.');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = buttonText;
    }
  }
});

renderCalendar();
renderSlots();
updateSelection();
if (slotStatus) slotStatus.textContent = 'Select an available time.';

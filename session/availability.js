export const SESSION_SETTINGS = {
  durationMinutes: 30,
  price: 50,
  currency: 'USD',
  timezone: 'America/Los_Angeles',
  timezoneName: 'Pacific Time',
  bookingWindowDays: 60,
  availability: {
    0: [{ start: '08:00', end: '20:00' }],
    1: [{ start: '08:00', end: '20:00' }],
    2: [{ start: '08:00', end: '20:00' }],
    3: [{ start: '08:00', end: '20:00' }],
    4: [{ start: '08:00', end: '20:00' }],
    5: [{ start: '08:00', end: '20:00' }],
    6: [{ start: '08:00', end: '20:00' }],
  },
  unavailableSlots: [],
  checkout: {
    endpoint: '',
    paymentLink: '',
    priceId: '',
  },
};

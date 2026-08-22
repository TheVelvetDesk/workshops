# AI Workbench San Diego

A static workshop and application site for small-room, hands-on AI education in San Diego. The public brand is **AI Workbench San Diego**; the existing GitHub repository name is unchanged.

Live site: <https://thevelvetdesk.github.io/ai-workbench-san-diego/>

## Structure

- `index.html` — main positioning and workshop landing page
- `assets/site.css` — shared responsive styles
- `assets/site.js` — navigation, reveal behavior, and current year
- `events/save-five-hours/` — event-specific page, application, and deposit configuration
- `LAUNCH-PLAN.md` — target market, pricing, curriculum ladder, channel plan, and validation metrics

## Application and deposit setup

Applications post to the Formspree endpoint already connected to the previous site. Run one test submission before publishing and confirm that the notification reaches the intended inbox.

The pilot deliberately does not collect payment until the date and applicant fit are confirmed. After creating a $49 Stripe Payment Link, paste it into:

```js
// events/save-five-hours/event-config.js
window.EVENT_CONFIG = {
  depositPaymentUrl: "https://buy.stripe.com/..."
};
```

Once configured, the secure deposit button appears on the successful application screen. Stripe—not this static site—collects card details.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Before launch

1. Choose the first date and reserve a room only after the minimum paid-seat threshold is met.
2. Add the Stripe Payment Link after the cohort date is confirmed.
3. Test the Formspree submission and Stripe payment/refund flow.
4. Add platform listing links and contact details once created.
5. Add a privacy policy and cancellation/refund terms before accepting money.

# AI Workbench San Diego

A standalone workshop information and application page for small-room, hands-on AI education in San Diego.

Live site: <https://thevelvetdesk.github.io/ai-workbench-san-diego/>

## Structure

- `index.html` — complete workshop information and signup page
- `assets/workshop.css` — focused responsive presentation
- `assets/workshop.js` — application validation and Formspree submission
- `events/save-five-hours/` — redirect retained for previously shared links
- `LAUNCH-PLAN.md` — target market, pricing, curriculum ladder, channel plan, and validation metrics

## Application setup

Applications post to the Formspree endpoint already connected to the previous site. Run one test submission before publishing and confirm that the notification reaches the intended inbox.

The public page does not collect payment. After reviewing an application and matching a date, send the participant the detailed workshop information and secure deposit link by email.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Before launch

1. Test the Formspree submission and confirm delivery to the intended inbox.
2. Choose the first date and reserve a room only after the minimum paid-seat threshold is met.
3. Prepare the follow-up email, secure deposit link, and refund terms before requesting payment.

# AI Workbench San Diego

A central hub for The Velvet Desk track-specific AI workshop questionnaires.

Live site: <https://thevelvetdesk.github.io/workshops/>

## Structure

- `index.html` — central hub linking all workshop questionnaires
- `privacy/` — California-focused privacy notice and notice at collection
- `ai-governance/` — AI governance and responsible-use policy
- `events/save-five-hours/` — legacy redirect to the AI automation Workflow Review
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

## AI questionnaires

Six track-specific questionnaires are published directly under the site:

- `workflow-review/` — Workflow Review
- `ai-essentials/` — AI Essentials
- `ai-development/` — AI Development
- `ai-marketing-creative/` — AI Marketing & Creative
- `ai-sales/` — AI Sales
- `ai-customer-service/` — AI Customer Service

All forms submit to the private application dashboard. Public source files intentionally exclude notification addresses and private dashboard links.

const APPLICATION_ENDPOINT = "https://ai-curriculum-studio.bobcorn3.chatgpt.site/api/applications";

const fitFields = [
  { type: "textarea", name: "desiredOutcome", label: "What would make this training genuinely worthwhile for you?", required: true, rows: 4, placeholder: "Describe the result, skill or finished asset you would want to leave with." },
  { type: "radio", name: "weeklyAvailability", label: "How much time could you realistically spend learning or implementing each week?", required: true, options: ["Less than 1 hour", "1–2 hours", "3–5 hours", "More than 5 hours"] },
  { type: "radio", name: "timeline", label: "When would you like to begin?", required: true, options: ["As soon as possible", "Within 30 days", "Within 1–3 months", "I’m exploring"] },
  { type: "radio", name: "preferredSupport", label: "What kind of support sounds most useful?", required: true, options: ["Beginner workshop", "Hands-on course", "Private guidance", "Not sure yet"] },
  { type: "textarea", name: "additionalNotes", label: "Anything else we should know?", rows: 3, placeholder: "Add any context that would help us understand what you need." },
];

const tracks = {
  "ai-essentials": {
    label: "AI Essentials",
    contextTitle: "Your AI starting point",
    contextDescription: "Help us understand your confidence level and what has held you back.",
    fitTitle: "What you need from AI Essentials",
    fitDescription: "We use these answers to place you at the right level.",
    context: [
      { type: "radio", name: "experienceLevel", label: "How comfortable are you using AI tools today?", required: true, options: ["I have never used them", "I have tried them a few times", "I use one occasionally", "I use AI regularly but want stronger fundamentals"] },
      { type: "textarea", name: "currentTools", label: "Which AI tools have you tried, if any?", rows: 3, placeholder: "ChatGPT, Claude, Gemini, Microsoft Copilot—or none yet." },
      { type: "textarea", name: "challenge", label: "What currently feels confusing, risky or frustrating about AI?", required: true, rows: 4, placeholder: "For example: knowing what to ask, choosing tools, privacy, unreliable answers or not knowing where to begin." },
    ],
    qualifying: [
      { type: "textarea", name: "primaryGoal", label: "What everyday work would you most like AI to make easier?", required: true, rows: 4, placeholder: "Describe the emails, research, planning, documents or decisions you want help with." },
      { type: "checkbox", name: "essentialTopics", label: "Which fundamentals are most important to you?", required: true, options: ["Writing useful prompts", "Choosing the right AI tool", "Research and summarizing", "Documents and spreadsheets", "Privacy and safe use", "Checking AI accuracy"] },
      { type: "radio", name: "learningConfidence", label: "How do you usually feel when learning new software?", required: true, options: ["I need slow step-by-step help", "I learn well with examples", "I’m comfortable experimenting", "I usually learn quickly"] },
      { type: "textarea", name: "realExample", label: "What is one real task you would bring to a hands-on session?", required: true, rows: 4, placeholder: "A real example helps us make the training useful rather than theoretical." },
    ],
  },
  "ai-development": {
    label: "AI Development",
    contextTitle: "Your building experience",
    contextDescription: "No coding background is required—we just need to know where to start.",
    fitTitle: "The product you want to build",
    fitDescription: "Tell us what exists today and what you want to make real.",
    context: [
      { type: "radio", name: "experienceLevel", label: "Which best describes your technical experience?", required: true, options: ["No coding experience", "I have used no-code builders", "I know basic HTML, CSS or scripts", "I can build software traditionally"] },
      { type: "textarea", name: "currentTools", label: "Which building tools have you tried?", rows: 3, placeholder: "Claude Code, Codex, Cursor, Replit, Lovable, Bolt, Base44, GitHub—or none yet." },
      { type: "textarea", name: "challenge", label: "What is currently stopping you from building or shipping?", required: true, rows: 4, placeholder: "Technical knowledge, choosing tools, fixing errors, GitHub, deployment, product scope or something else." },
    ],
    qualifying: [
      { type: "textarea", name: "primaryGoal", label: "What do you want to build?", required: true, rows: 4, placeholder: "Describe the website, app, internal tool, prototype or automation in plain language." },
      { type: "radio", name: "buildType", label: "What type of project is it?", required: true, options: ["Website or landing page", "Internal business tool", "Customer-facing app", "Automation or integration", "I’m not sure yet"] },
      { type: "radio", name: "projectStage", label: "How far along are you?", required: true, options: ["Idea only", "Notes or wireframe", "Early prototype", "Working but unfinished", "Already live"] },
      { type: "radio", name: "githubComfort", label: "How familiar are you with GitHub and where code lives?", required: true, options: ["Not familiar", "I know what it is", "I have uploaded a project", "I use it comfortably"] },
      { type: "textarea", name: "coreFeature", label: "What is the single most important feature the first version must have?", required: true, rows: 4, placeholder: "Focus on the one action a user must be able to complete." },
      { type: "radio", name: "shippingGoal", label: "What would you most like to leave the course able to do?", required: true, options: ["Understand AI coding tools", "Build a working prototype", "Fix and improve an existing build", "Publish a project online"] },
    ],
  },
  "ai-marketing": {
    label: "AI Marketing & Creative",
    contextTitle: "Your current marketing",
    contextDescription: "Show us how content and campaigns are being created today.",
    fitTitle: "Your creative opportunity",
    fitDescription: "We’ll use this to shape practical marketing exercises around your brand.",
    context: [
      { type: "radio", name: "experienceLevel", label: "How experienced are you with AI marketing or creative tools?", required: true, options: ["I have not used them", "I have experimented", "I use them occasionally", "I use them regularly"] },
      { type: "textarea", name: "currentTools", label: "Which marketing and creative tools do you use now?", rows: 3, placeholder: "Canva, Adobe, CapCut, ChatGPT, Midjourney, CRM, social schedulers or other tools." },
      { type: "textarea", name: "challenge", label: "What is the biggest marketing or content bottleneck today?", required: true, rows: 4, placeholder: "Ideas, writing, design, video, editing, consistency, approvals, personalization or measuring results." },
    ],
    qualifying: [
      { type: "textarea", name: "primaryGoal", label: "What offer, product or business do you want to market?", required: true, rows: 4, placeholder: "Explain what you sell and what you want the audience to do." },
      { type: "textarea", name: "targetAudience", label: "Who are you trying to reach?", required: true, rows: 3, placeholder: "Describe the customer, industry, location or problem they have." },
      { type: "checkbox", name: "marketingChannels", label: "Which channels matter most right now?", required: true, options: ["Instagram or Facebook", "TikTok or short video", "YouTube", "Email", "Website or SEO", "Paid advertising", "LinkedIn or B2B"] },
      { type: "checkbox", name: "contentTypes", label: "What do you most want AI to help create?", required: true, options: ["Campaign ideas", "Written copy", "Images and graphics", "Short-form video", "Long-form video", "UGC-style ads", "Content calendars"] },
      { type: "radio", name: "brandAssets", label: "Do you already have usable brand assets and guidelines?", required: true, options: ["Yes, organized and ready", "Some assets exist", "Very little", "No brand system yet"] },
      { type: "text", name: "successMetric", label: "What result would you want to improve first?", required: true, placeholder: "More leads, faster content production, engagement, sales, consistency…" },
    ],
  },
  "ai-sales": {
    label: "AI Sales",
    contextTitle: "Your current sales motion",
    contextDescription: "Help us understand how leads move from first contact to a sale.",
    fitTitle: "Where AI could support sales",
    fitDescription: "The goal is to improve a real part of your sales process, not add tools for their own sake.",
    context: [
      { type: "radio", name: "experienceLevel", label: "How much experience do you have using AI in sales?", required: true, options: ["None", "A few experiments", "Occasional use", "Part of my regular process"] },
      { type: "textarea", name: "currentTools", label: "Which sales tools do you use today?", rows: 3, placeholder: "HubSpot, Salesforce, Apollo, spreadsheets, LinkedIn, Gmail, call-recording tools or others." },
      { type: "textarea", name: "challenge", label: "What is the most expensive or frustrating sales problem right now?", required: true, rows: 4, placeholder: "Not enough leads, slow research, low reply rates, missed follow-up, weak proposals, poor CRM data or long sales cycles." },
    ],
    qualifying: [
      { type: "textarea", name: "primaryGoal", label: "Which part of the sales process do you most want to improve?", required: true, rows: 4, placeholder: "Be specific about what should become faster, more consistent or more effective." },
      { type: "radio", name: "salesModel", label: "How do you primarily sell?", required: true, options: ["B2B outbound", "B2B inbound", "B2C or local services", "Ecommerce", "A mix"] },
      { type: "textarea", name: "leadSources", label: "Where do leads currently come from?", required: true, rows: 3, placeholder: "Referrals, website forms, events, cold outreach, paid ads, marketplaces or other sources." },
      { type: "textarea", name: "salesProcess", label: "Briefly describe what happens from new lead to closed sale.", required: true, rows: 5, placeholder: "Include research, outreach, qualification, meetings, proposals and follow-up." },
      { type: "checkbox", name: "salesBottlenecks", label: "Which activities need the most help?", required: true, options: ["Finding prospects", "Account research", "Personalized outreach", "Lead qualification", "Call preparation", "Follow-up", "Proposals", "CRM updates"] },
      { type: "select", name: "leadVolume", label: "About how many new leads do you handle in a typical month?", required: true, options: ["Fewer than 10", "10–50", "51–200", "201–1,000", "More than 1,000"] },
      { type: "text", name: "successMetric", label: "Which sales metric would you most like to improve?", required: true, placeholder: "Reply rate, booked meetings, conversion rate, sales cycle, revenue…" },
    ],
  },
  "ai-customer-service": {
    label: "AI Customer Service",
    contextTitle: "Your current support operation",
    contextDescription: "Show us where customers ask for help and how your team responds.",
    fitTitle: "The customer experience to improve",
    fitDescription: "We look for places where AI can help without removing necessary human care.",
    context: [
      { type: "radio", name: "experienceLevel", label: "How much experience do you have using AI for customer service?", required: true, options: ["None", "I have tested a chatbot", "We use AI occasionally", "AI is part of our support process"] },
      { type: "textarea", name: "currentTools", label: "Which support tools and channels do you use now?", rows: 3, placeholder: "Email, phone, WhatsApp, website chat, Zendesk, Intercom, Gorgias, CRM or spreadsheets." },
      { type: "textarea", name: "challenge", label: "What is the biggest customer-service problem today?", required: true, rows: 4, placeholder: "Slow responses, repetitive questions, after-hours coverage, inconsistent answers, routing, backlog or poor visibility." },
    ],
    qualifying: [
      { type: "textarea", name: "primaryGoal", label: "What part of customer service would you most like to improve?", required: true, rows: 4, placeholder: "Describe the customer problem and what a better experience would look like." },
      { type: "checkbox", name: "supportChannels", label: "Where do customers contact you?", required: true, options: ["Email", "Phone", "Website chat", "WhatsApp or SMS", "Social media", "In person", "Support portal"] },
      { type: "select", name: "inquiryVolume", label: "About how many customer inquiries do you receive in a typical week?", required: true, options: ["Fewer than 10", "10–50", "51–200", "201–1,000", "More than 1,000"] },
      { type: "textarea", name: "commonQuestions", label: "What are the three most common questions or requests?", required: true, rows: 5, placeholder: "1. …\n2. …\n3. …" },
      { type: "radio", name: "knowledgeBase", label: "Do you have approved answers, FAQs or documentation?", required: true, options: ["Yes, well organized", "Some documents exist", "Mostly in employees’ heads", "No"] },
      { type: "textarea", name: "escalationRules", label: "Which conversations must always go to a person?", required: true, rows: 4, placeholder: "Complaints, refunds, emergencies, pricing exceptions, regulated topics or emotionally sensitive situations." },
      { type: "radio", name: "sensitiveData", label: "Does support involve private or regulated information?", required: true, options: ["No", "Yes", "Unsure"] },
    ],
  },
};

const trackId = document.body.dataset.track;
const config = tracks[trackId];
if (!config) throw new Error("Unknown application track.");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function fieldMarkup(field) {
  const required = field.required ? " *" : "";
  const requiredAttribute = field.required && field.type !== "checkbox" ? " required" : "";
  if (field.type === "radio" || field.type === "checkbox") {
    return `<fieldset class="choice-field ${field.type === "checkbox" ? "multi" : ""}" ${field.required ? "data-required-group" : ""}><legend>${escapeHtml(field.label)}${required}</legend><div>${field.options.map((option) => `<label><input type="${field.type}" name="${escapeHtml(field.name)}" value="${escapeHtml(option)}"${requiredAttribute} /><span>${escapeHtml(option)}</span></label>`).join("")}</div></fieldset>`;
  }
  if (field.type === "select") {
    return `<label><span>${escapeHtml(field.label)}${required}</span><select name="${escapeHtml(field.name)}"${requiredAttribute}><option value="">Choose one</option>${field.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}</select></label>`;
  }
  if (field.type === "textarea") {
    return `<label><span>${escapeHtml(field.label)}${required}</span><textarea name="${escapeHtml(field.name)}" rows="${field.rows || 4}"${requiredAttribute} placeholder="${escapeHtml(field.placeholder || "")}"></textarea></label>`;
  }
  return `<label><span>${escapeHtml(field.label)}${required}</span><input name="${escapeHtml(field.name)}" type="${field.type || "text"}"${requiredAttribute} placeholder="${escapeHtml(field.placeholder || "")}" /></label>`;
}

const root = document.querySelector("#track-form-root");
root.innerHTML = `
  <aside class="progress-card">
    <p>Application progress</p>
    <ol id="progress-list">
      <li class="active"><span>01</span><div><strong>You</strong><small>About you and the business</small></div></li>
      <li><span>02</span><div><strong>Starting point</strong><small>Your current experience</small></div></li>
      <li><span>03</span><div><strong>Track fit</strong><small>${escapeHtml(config.label)} questions</small></div></li>
      <li><span>04</span><div><strong>Goals</strong><small>Outcome, timing and support</small></div></li>
    </ol>
    <div class="privacy-note"><strong>Keep private information private.</strong><p>Do not include passwords, payment details, customer records, medical information or confidential documents.</p></div>
  </aside>
  <form id="track-form" class="workflow-form" novalidate>
    <input type="hidden" name="track" value="${escapeHtml(trackId)}" />\n    <div class="notice-at-collection"><strong>Notice at collection.</strong> We collect your contact, business and questionnaire information to review this application, communicate with you and protect the service. We do not sell it or share it for behavioral advertising. <a href="../privacy/#notice-at-collection" target="_blank" rel="noopener">See categories, purposes and retention</a>.</div>
    <header class="form-heading"><span id="section-count">01 / 04</span><div><h2 id="section-title">A little about you</h2><p id="section-description">So we understand the person and business behind the application.</p></div></header>
    <section class="form-panel" data-step="0">
      <div class="field-grid two">
        <label><span>Your name *</span><input name="applicantName" required autocomplete="name" placeholder="First and last name" /></label>
        <label><span>Email *</span><input name="email" type="email" required autocomplete="email" placeholder="you@business.com" /></label>
      </div>
      <div class="field-grid two">
        <label><span>Business or organization *</span><input name="businessName" required placeholder="Company, practice or project" /></label>
        <label><span>Your role *</span><input name="role" required placeholder="Owner, manager, creator, consultant…" /></label>
      </div>
      <label><span>What kind of business or work do you do? *</span><input name="businessType" required placeholder="Property management, ecommerce, professional services…" /></label>
      <div class="field-grid two optional-row">
        <label><span>Phone <i>optional</i></span><input name="phone" type="tel" autocomplete="tel" placeholder="Best number to reach you" /></label>
        <label><span>Website <i>optional</i></span><input name="website" type="url" placeholder="https://" /></label>
      </div>
      <label class="bot-field" aria-hidden="true"><span>Company website</span><input name="companyWebsite" tabindex="-1" autocomplete="off" /></label>
    </section>
    <section class="form-panel" data-step="1" hidden>${config.context.map(fieldMarkup).join("")}</section>
    <section class="form-panel" data-step="2" hidden>${config.qualifying.map(fieldMarkup).join("")}</section>
    <section class="form-panel" data-step="3" hidden>
      ${fitFields.map(fieldMarkup).join("")}
      <label class="consent-row"><input type="checkbox" name="consent" value="Yes" required /><span>I have read the <a href="../privacy/" target="_blank" rel="noopener">Privacy Notice</a> and understand this questionnaire helps The Velvet Desk assess fit and recommend a next step; submitting it does not guarantee acceptance.</span></label>
    </section>
    <div id="form-error" class="form-error" role="alert" hidden></div>
    <footer class="form-navigation">
      <button id="back-button" type="button" class="back-button" disabled>← Back</button>
      <button id="next-button" type="button" class="next-button">Continue <span>→</span></button>
      <button id="submit-button" type="submit" class="next-button submit-button" hidden>Submit application <span>→</span></button>
    </footer>
  </form>
  <section id="success-card" class="success-card" hidden>
    <span class="success-check">✓</span>
    <p class="eyebrow" id="success-reference">Application received</p>
    <h2>Thank you. We’ll review your ${escapeHtml(config.label)} goals.</h2>
    <p>Your answers will help us understand your current level, the problems you want to solve and which learning format may be the best fit.</p>
    <div class="success-next"><strong>What happens next</strong><ol><li>We review your track-specific answers.</li><li>We may email you with one or two clarifying questions.</li><li>If there is a strong fit, we’ll recommend the appropriate next step.</li></ol></div>
  </section>`;

const sections = [
  ["01", "A little about you", "So we understand the person and business behind the application."],
  ["02", config.contextTitle, config.contextDescription],
  ["03", config.fitTitle, config.fitDescription],
  ["04", "Your goal and preferred next step", "Tell us what success, timing and useful support look like to you."],
];
const form = document.querySelector("#track-form");
const panels = [...document.querySelectorAll(".form-panel")];
const progressItems = [...document.querySelectorAll("#progress-list li")];
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const submitButton = document.querySelector("#submit-button");
const errorBox = document.querySelector("#form-error");
let currentStep = 0;

function validateStep() {
  errorBox.hidden = true;
  const controls = panels[currentStep].querySelectorAll("input, textarea, select");
  for (const control of controls) {
    if (!control.checkValidity()) {
      control.reportValidity();
      return false;
    }
  }
  for (const group of panels[currentStep].querySelectorAll("[data-required-group]")) {
    if (!group.querySelector("input:checked")) {
      errorBox.textContent = `Please answer: ${group.querySelector("legend").textContent.replace(" *", "")}`;
      errorBox.hidden = false;
      group.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
  }
  return true;
}

function renderStep() {
  panels.forEach((panel, index) => { panel.hidden = index !== currentStep; });
  progressItems.forEach((item, index) => {
    item.classList.toggle("active", index === currentStep);
    item.classList.toggle("complete", index < currentStep);
    item.querySelector(":scope > span").textContent = index < currentStep ? "✓" : sections[index][0];
  });
  document.querySelector("#section-count").textContent = `${sections[currentStep][0]} / 04`;
  document.querySelector("#section-title").textContent = sections[currentStep][1];
  document.querySelector("#section-description").textContent = sections[currentStep][2];
  backButton.disabled = currentStep === 0;
  nextButton.hidden = currentStep === sections.length - 1;
  submitButton.hidden = currentStep !== sections.length - 1;
  errorBox.hidden = true;
}

nextButton.addEventListener("click", () => {
  if (!validateStep()) return;
  currentStep = Math.min(currentStep + 1, sections.length - 1);
  renderStep();
  root.scrollIntoView({ behavior: "smooth", block: "start" });
});

backButton.addEventListener("click", () => {
  currentStep = Math.max(currentStep - 1, 0);
  renderStep();
  root.scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateStep()) return;
  submitButton.disabled = true;
  submitButton.firstChild.textContent = "Sending… ";
  errorBox.hidden = true;

  try {
    const formData = new FormData(form);
    const payload = {};
    for (const [name, value] of formData.entries()) {
      if (["consent", "companyWebsite"].includes(name)) {
        payload[name] = value;
      } else if (payload[name]) {
        payload[name] = `${payload[name]}, ${value}`;
      } else {
        payload[name] = value;
      }
    }
    const fieldMap = [...config.context, ...config.qualifying, ...fitFields];
    payload.trackAnswers = JSON.stringify(fieldMap.map((field) => ({ label: field.label, value: payload[field.name] || "" })).filter((answer) => answer.value));
    const response = await fetch(APPLICATION_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error(result.error || "We could not submit your application.");
    form.hidden = true;
    document.querySelector(".progress-card").hidden = true;
    const success = document.querySelector("#success-card");
    document.querySelector("#success-reference").textContent = `Application received · #${result.id}`;
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    errorBox.textContent = error instanceof Error ? error.message : "We could not submit your application. Please try again.";
    errorBox.hidden = false;
    submitButton.disabled = false;
    submitButton.firstChild.textContent = "Submit application ";
  }
});

renderStep();

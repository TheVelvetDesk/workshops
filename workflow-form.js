const APPLICATION_ENDPOINT = "https://ai-curriculum-studio.bobcorn3.chatgpt.site/api/applications";

const sections = [
  ["01", "A little about you", "So we understand the business behind the workflow."],
  ["02", "The task you want to improve", "Choose one recurring task—not your entire business."],
  ["03", "Time, people and tools", "Estimate the weekly effort and show us where the work happens."],
  ["04", "What makes the task difficult", "The exceptions and decisions determine what can be automated safely."],
];

const form = document.querySelector("#workflow-form");
const panels = [...document.querySelectorAll(".form-panel")];
const progressItems = [...document.querySelectorAll("#progress-list li")];
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const submitButton = document.querySelector("#submit-button");
const errorBox = document.querySelector("#form-error");
let currentStep = 0;

function validateStep() {
  const controls = panels[currentStep].querySelectorAll("input, textarea, select");
  for (const control of controls) {
    if (!control.checkValidity()) {
      control.reportValidity();
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
  document.querySelector("#application").scrollIntoView({ behavior: "smooth", block: "start" });
});

backButton.addEventListener("click", () => {
  currentStep = Math.max(currentStep - 1, 0);
  renderStep();
  document.querySelector("#application").scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateStep()) return;

  submitButton.disabled = true;
  submitButton.firstChild.textContent = "Sending… ";
  errorBox.hidden = true;

  try {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
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
    submitButton.firstChild.textContent = "Submit for review ";
  }
});

renderStep();

/* HTML5 + custom per-field validation and AJAX form handling.
   Replace REPLACE_WITH_FORM_ID in each form's action with your own HTTPS endpoint.
   Never place private API keys or secrets in front-end JavaScript. */
(() => {
  "use strict";
  const messages = {
    valueMissing: "Please complete this field.",
    typeMismatch: "Please enter a valid email address.",
    tooShort: "Please enter a little more information.",
    tooLong: "This field is too long.",
    patternMismatch: "Please use the requested format."
  };
  function errorFor(field) {
    const described = (field.getAttribute("aria-describedby") || "").split(/\s+/);
    return described.map(id => document.getElementById(id)).find(el => el?.classList.contains("field-error"));
  }
  function messageFor(field) {
    const v = field.validity;
    if (v.valueMissing) return messages.valueMissing;
    if (v.typeMismatch) return messages.typeMismatch;
    if (v.tooShort) return messages.tooShort;
    if (v.tooLong) return messages.tooLong;
    if (v.patternMismatch) return messages.patternMismatch;
    return field.validationMessage || "Please check this field.";
  }
  function setFieldState(field, show) {
    const error = errorFor(field);
    const invalid = !field.checkValidity();
    field.setAttribute("aria-invalid", String(show && invalid));
    if (error) error.textContent = show && invalid ? messageFor(field) : "";
    return !invalid;
  }
  function formStatus(form, text, kind) {
    const status = form.querySelector(".form-message");
    if (!status) return;
    status.className = "form-message " + (kind || "");
    status.textContent = text;
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-ajax-form]").forEach(form => {
      const fields = [...form.querySelectorAll("input:not([type=hidden]):not([name=_gotcha]), select, textarea")];
      const messageField = form.querySelector('textarea[name="message"]');
      const counter = document.getElementById("messageCount");
      const updateCounter = () => { if (counter && messageField) counter.textContent = `${messageField.value.length} / ${messageField.maxLength} characters`; };
      messageField?.addEventListener("input", updateCounter); updateCounter();
      fields.forEach(field => {
        field.addEventListener("blur", () => setFieldState(field, true));
        field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") setFieldState(field, true); });
      });
      form.addEventListener("submit", async event => {
        event.preventDefault();
        let valid = true;
        fields.forEach(field => { if (!setFieldState(field, true)) valid = false; });
        if (!valid) {
          formStatus(form, "Please correct the highlighted fields and try again.", "error");
          form.querySelector('[aria-invalid="true"]')?.focus(); return;
        }
        const endpoint = form.getAttribute("action") || "";
        if (!/^https:\/\//i.test(endpoint) || endpoint.includes("REPLACE_WITH_FORM_ID")) {
          formStatus(form, "Form validated successfully, but it has not been sent. Configure your own HTTPS form endpoint in the action attribute first.", "notice");
          return;
        }
        if (form.querySelector('[name="_gotcha"]')?.value) {
          formStatus(form, "Unable to submit this form.", "error"); return;
        }
        const submit = form.querySelector('[type="submit"]');
        if (submit) { submit.disabled = true; submit.dataset.originalText = submit.textContent; submit.textContent = "Sending…"; }
        formStatus(form, "Sending your enquiry securely…", "notice");
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
          });
          if (!response.ok) throw new Error("The form service returned an error.");
          formStatus(form, "Your enquiry was accepted by the configured form service.", "success");
          form.reset(); updateCounter();
          fields.forEach(field => { field.removeAttribute("aria-invalid"); const error = errorFor(field); if (error) error.textContent = ""; });
        } catch (error) {
          formStatus(form, "We could not send your enquiry. Check the form-service setup and internet connection, then try again.", "error");
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = submit.dataset.originalText || "Submit"; }
        }
      });
    });
  });
})();
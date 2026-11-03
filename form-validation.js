/* Accessible client-side validation and optional AJAX form submission.
   Configure each form's action with your own HTTPS endpoint before enabling delivery.
   Never put private API keys or secrets in front-end JavaScript. */
(() => {
  "use strict";

  const messages = {
    valueMissing: "Please complete this field.",
    typeMismatch: "Please enter a valid email address.",
    tooShort: "Please enter a little more information.",
    tooLong: "This field is too long.",
    patternMismatch: "Please use the requested format.",
    badInput: "Please enter a valid value."
  };

  function getErrorElement(field) {
    const ids = (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
    return ids.map(id => document.getElementById(id)).find(element =>
      element && element.classList.contains("field-error")
    );
  }

  function getMessage(field) {
    const validity = field.validity;
    for (const key of Object.keys(messages)) {
      if (validity[key]) return messages[key];
    }
    return field.validationMessage || "Please check this field.";
  }

  function validateField(field, showMessage = true) {
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(showMessage && !valid));
    const error = getErrorElement(field);
    if (error) error.textContent = showMessage && !valid ? getMessage(field) : "";
    return valid;
  }

  function setStatus(form, message, type = "notice") {
    const status = form.querySelector(".form-message");
    if (!status) return;
    status.className = "form-message " + type;
    status.textContent = message;
  }

  function updateCounter(form) {
    const message = form.querySelector('textarea[name="message"]');
    const counter = form.querySelector("#messageCount");
    if (!message || !counter) return;
    counter.textContent = message.value.length + " / " + message.maxLength + " characters";
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-ajax-form]").forEach(form => {
      const fields = [...form.querySelectorAll("input:not([type=hidden]):not([name=_gotcha]), select, textarea")];
      const message = form.querySelector('textarea[name="message"]');
      message?.addEventListener("input", () => updateCounter(form));
      updateCounter(form);

      fields.forEach(field => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
          if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
        field.addEventListener("change", () => {
          if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
      });

      form.addEventListener("submit", async event => {
        event.preventDefault();
        let valid = true;
        fields.forEach(field => {
          if (!validateField(field)) valid = false;
        });

        if (!valid) {
          setStatus(form, "Please correct the highlighted fields and try again.", "error");
          form.querySelector('[aria-invalid="true"]')?.focus();
          return;
        }

        // Honeypot check: silently reject automated submissions.
        if (form.querySelector('[name="_gotcha"]')?.value) {
          setStatus(form, "Unable to submit this form.", "error");
          return;
        }

        const endpoint = (form.getAttribute("action") || "").trim();
        if (!/^https:\/\//i.test(endpoint) || endpoint.includes("REPLACE_WITH_FORM_ID")) {
          setStatus(form, "Your details passed validation, but the form has not been sent. Configure a real HTTPS form endpoint first.", "notice");
          return;
        }

        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitButton ? (submitButton.textContent || submitButton.value) : "";
        if (submitButton) {
          submitButton.disabled = true;
          if (submitButton.tagName === "INPUT") submitButton.value = "Sending…";
          else submitButton.textContent = "Sending…";
        }
        setStatus(form, "Sending your enquiry…", "notice");

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
          });
          if (!response.ok) throw new Error("Form service rejected the submission.");
          setStatus(form, "Your enquiry was accepted by the configured form service.", "success");
          form.reset();
          fields.forEach(field => {
            field.removeAttribute("aria-invalid");
            const error = getErrorElement(field);
            if (error) error.textContent = "";
          });
          updateCounter(form);
        } catch (error) {
          setStatus(form, "We could not send your enquiry. Please check the form endpoint and internet connection, then try again.", "error");
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            if (submitButton.tagName === "INPUT") submitButton.value = originalText || "Submit";
            else submitButton.textContent = originalText || "Submit";
          }
        }
      });
    });
  });
})();
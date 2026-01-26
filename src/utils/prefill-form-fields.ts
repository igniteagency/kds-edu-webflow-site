/**
 * Prefills Webflow form fields based on URL query parameters.
 * Matches query param keys to input names (case-sensitive).
 *
 * Example: ?email=test@example.com will fill <input name="email" ...>
 *
 * Usage:
 * Import and call prefillFormFields() on page load.
 */
export const prefillFormFields = () => {
  // Get all query parameters
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    // Find all form elements with the matching name attribute
    const selector = `input[name="${key}"], select[name="${key}"], textarea[name="${key}"]`;
    const elements = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(selector);

    elements.forEach((element) => {
      // Handle different input types
      if (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) {
        // For checkboxes and radios, check if the value matches
        if (element.value === value || value === 'true' || value === 'on') {
          element.checked = true;
        }
      } else {
        // For text inputs, textareas, and selects
        element.value = value;
      }

      // Dispatch events to ensure Webflow or other scripts detect the change
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
};

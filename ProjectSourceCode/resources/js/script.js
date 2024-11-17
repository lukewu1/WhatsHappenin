document.addEventListener("DOMContentLoaded", () => {
    const saveButtons = document.querySelectorAll(".save-article");
  
    saveButtons.forEach((button) => {
      // Re-enable the button once its actually fully loaded and update its text
      button.disabled = false;
      button.innerHTML = "Save Article";
    });
  
    const forms = document.querySelectorAll('form[id^="saveArticleForm-"]');
    forms.forEach((form) => {
      if (!form.dataset.listenerAdded) {
        form.addEventListener("submit", async (event) => {
          event.preventDefault(); // Prevent default form submission
  
          const saveButton = form.querySelector(".save-article");
  
          // Disable the button and update its text
          saveButton.disabled = true;
  
          const formData = new FormData(form);
          const articleData = Object.fromEntries(formData.entries());
  
          try {
            const response = await fetch("/newsMap", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(articleData),
            });
  
            if (response.ok) {
              saveButton.innerHTML = "Saved";
            } else {
              saveButton.disabled = false;
              saveButton.innerHTML = "Save Article";
              alert("Failed to save the article. Please try again.");
            }
          } catch (error) {
            console.error("Error saving article:", error);
            saveButton.disabled = false;
            saveButton.innerHTML = "Save Article";
            alert("An error occurred while saving the article.");
          }
        });
  
        form.dataset.listenerAdded = true;
      }
    });
  });
  
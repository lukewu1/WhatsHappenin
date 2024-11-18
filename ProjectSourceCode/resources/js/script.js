document.addEventListener("DOMContentLoaded", () => {
    const saveButtons = document.querySelectorAll(".save-article");
  
    saveButtons.forEach((button) => {
        //remember that buttions are initally disabled
      // Re-enable the button once its actually fully loaded and update its text
      button.disabled = false;
      button.innerHTML = "Save Article";
    });
  
    const forms = document.querySelectorAll('form[id^="saveArticleForm-"]'); // Using a CSS selector to select all forms with an ID that starts with "saveArticleForm-"


    forms.forEach((form) => {
      if (!form.dataset.listenerAdded) { //avoid adding duplicate listeners
        form.addEventListener("submit", async (event) => {
          event.preventDefault(); // Prevent default form submission (reloading the page)
  
          const saveButton = form.querySelector(".save-article");
  
          saveButton.disabled = true;
  
          const formData = new FormData(form);

          //for json structure
          const articleData = Object.fromEntries(formData.entries()); //Collects all input data from the form into an object (articleData)
  

          //using AJAX to send the articleData to the server
          try {
            const response = await fetch("/newsMap", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",  //specify that the data being sent is JSON
              },
              body: JSON.stringify(articleData), //converts articleData into a JSON string
            });
  
            if (response.ok) {
              saveButton.innerHTML = "Saved";
            } else {
              saveButton.disabled = false;
              saveButton.innerHTML = "Save Article";
              alert("Failed to save the article.");
            }
          } catch (error) {
            console.error("Error saving article:", error);
            saveButton.disabled = false;
            saveButton.innerHTML = "Save Article";
            alert("An error occurred while saving the article.");
          }
        });
  
        form.dataset.listenerAdded = true;   //mark the form as having the listener added
      }
    });
  });
  
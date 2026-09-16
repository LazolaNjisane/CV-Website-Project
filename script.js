const track = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length || !track) return;

  const totalCards = cards.length;
  const cardsPerView = getCardsPerView();
  const maxIndex = totalCards - cardsPerView;

  if (currentIndex > maxIndex) currentIndex = maxIndex;
  if (currentIndex < 0) currentIndex = 0;

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 30; 
  
  const moveDistance = currentIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${moveDistance}px)`;
}

// Activate Carousel Button Controls
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.project-card');
    const maxIndex = cards.length - getCardsPerView();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}

window.addEventListener('resize', updateCarousel);

// Main DOM Loader
document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();

  const modal = document.getElementById("info-modal");
  const dynamicLayout = document.getElementById("modal-dynamic-layout");
  const closeBtn = document.getElementById("modal-close-btn");

  // DIAGNOSTIC LOGS - Check your browser console (F12) to see if these print!
  console.log("Modal element found:", modal);
  console.log("Dynamic layout element found:", dynamicLayout);

  const actionButtons = document.querySelectorAll("[data-layout]");
  console.log(`Found ${actionButtons.length} buttons with data-layout attribute.`);

  actionButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(`Button #${index + 1} clicked! Layout type:`, button.getAttribute("data-layout"));
      
      const layoutType = button.getAttribute("data-layout");
      if (!dynamicLayout) {
        console.error("Error: dynamicLayout container is missing! Cannot inject HTML.");
        return;
      }
      
      dynamicLayout.innerHTML = ""; // Clears previous content cleanly

      if (layoutType === "info") {
        const img = button.getAttribute("data-img") || "";
        const title = button.getAttribute("data-title") || "";
        const location = button.getAttribute("data-location") || "";
        const date = button.getAttribute("data-date") || "";
        const desc = button.getAttribute("data-desc") || "";
        const skills = button.getAttribute("data-skills") || "";
        const subjects = button.getAttribute("data-subjects") || "";

let skillsHTML = "";
        if (skills) {
          skillsHTML = `
            <h4 class="modal-desc-title" style="font-family: inherit !important; font-size: 16px !important; font-weight: 700 !important; color: #000000 !important; margin: 25px 0 10px 0 !important; text-align: left !important;">Skills:</h4>
            <p class="modal-desc-text" style="font-family: inherit !important; font-size: 14px !important; color: #333333 !important; line-height: 1.6 !important; margin: 0 !important; width: 100% !important; text-align: left !important;">${skills}</p>
          `;
        }

        let subjectsHTML = "";
        if (subjects) {
          subjectsHTML = `
            <h4 class="modal-desc-title" style="margin-top: 25px;">Subjects:</h4>
            <p class="modal-desc-text" style="font-family: inherit !important; font-size: 14px !important; color: #333333 !important; line-height: 1.6 !important; margin: 0 !important; width: 100% !important; text-align: left !important;">${subjects}</p>
          `;
        }

dynamicLayout.innerHTML = `
          <div class="modal-layout-container" style="display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">
            
            <div class="modal-header-row" style="display: flex !important; flex-direction: row !important; align-items: center !important; gap: 30px !important; margin-top: 25px !important; margin-left: 10px !important; margin-bottom: 25px !important; width: 100% !important; box-sizing: border-box;">
              
              <div class="modal-logo-wrapper" style="width: 150px !important; height: 150px !important; flex-shrink: 0 !important; display: flex !important; align-items: center !important; justify-content: center !important; overflow: hidden !important; border-radius: 4px !important;">
                <img class="modal-logo" src="${img}" alt="Logo" style="max-width: 100% !important; max-height: 100% !important; object-fit: contain !important;">
              </div>
              
              <div class="modal-header-details" style="display: flex !important; flex-direction: column !important; justify-content: center !important; flex-grow: 1 !important;">
                <h3 class="modal-main-title" style="margin: 0 0 6px 0 !important; font-size: 22px !important; font-weight: 700 !important; color: #111111 !important; line-height: 1.2 !important; text-align: left !important;">${title}</h3>
                <p class="modal-location" style="margin: 0 0 4px 0 !important; font-size: 14px !important; color: #555555 !important; font-weight: 500 !important; text-align: left !important;">${location}</p>
                <p class="modal-date" style="margin: 0 !important; font-size: 14px !important; color: #777777 !important; text-align: left !important;">${date}</p>
              </div>

            </div>

            <div class="modal-body-content" style="width: 100%; box-sizing: border-box; text-align: left !important; padding-left: 10px !important;">
              <h4 class="modal-desc-title" style="font-size: 16px; font-weight: 700; color: #000000; margin: 0 0 10px 0; text-align: left !important;">Description:</h4>
              <p class="modal-desc-text" style="font-size: 14px; color: #333333; line-height: 1.6; margin: 0; width: 100%; text-align: left !important;">${desc}</p>
              ${skillsHTML}
              ${subjectsHTML}
            </div>

          </div>
        `;
      } 
      else if (layoutType === "document") {
        const title = button.getAttribute("data-title") || "";
        const img = button.getAttribute("data-img") || "";

        dynamicLayout.innerHTML = `
          <div class="modal-doc-layout">
            <h3 class="modal-doc-heading">${title}</h3>
            <div class="modal-doc-wrapper">
              <img class="modal-doc-file" src="${img}" alt="Document View">
            </div>
          </div>
        `;
      }

      // Open the modal by adding the active class
      if (modal) {
        modal.classList.add("active");
        console.log("Modal '.active' class added! Current classes:", modal.className);
      } else {
        console.error("Error: Modal container is null. Cannot open modal.");
      }
    });
  });

  // Close modal click event
  document.addEventListener("click", (e) => {
    if (e.target && (e.target.id === "modal-close-btn" || e.target.classList.contains("modal-close-btn"))) {
      if (modal) modal.classList.remove("active");
    }
  });

  // Close modal when clicking on the background shadow overlay
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
});
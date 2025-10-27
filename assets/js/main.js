document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelector("[data-tabs]");
  if (!tabs) return;

  const tabButtons = tabs.querySelectorAll("[role='tab']");
  const panels = tabs.querySelectorAll("[role='tabpanel']");

  function activateTab(targetId) {
    tabButtons.forEach((btn) => {
      const selected = btn.id === targetId.replace("panel", "tab");
      btn.setAttribute("aria-selected", selected);
    });

    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle("is-active", active);
      if (active) panel.focus();
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panelId = btn.getAttribute("aria-controls");
      activateTab(panelId);
    });

    btn.addEventListener("keydown", (e) => {
      const list = Array.from(tabButtons);
      const index = list.indexOf(btn);
      let newIndex = index;

      if (e.key === "ArrowRight") newIndex = (index + 1) % list.length;
      if (e.key === "ArrowLeft") newIndex = (index - 1 + list.length) % list.length;

      list[newIndex].focus();
    });
  });
});

document.querySelectorAll('.screenshot-mini').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');

    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    overlay.appendChild(bigImg);

    document.body.appendChild(overlay);


    overlay.addEventListener('click', () => overlay.remove());
  });
});



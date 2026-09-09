async function api(path, options = {}) {
  const response = await fetch(window.APP_CONFIG.API_BASE + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

async function loadEvents(containerId = "events") {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const events = await api("/events");
    el.innerHTML = events.map(e => `
      <article class="event-card">
        <div class="event-badge">${e.category || "EVENT"}</div>
        <h3>${e.title}</h3>
        <p>${e.description || ""}</p>
        <div class="event-meta">${formatDate(e.date)} · ${e.startTime || ""}–${e.endTime || ""}</div>
        <div class="event-meta">${e.venue?.name || "Venue TBA"} · ${e.registrationCount || 0}/${e.capacity} registered</div>
        <a class="btn" href="event-details.html?id=${e._id}">View event</a>
      </article>
    `).join("");
  } catch (err) {
    el.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  const cursor = document.querySelector(".magic-cursor");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
});

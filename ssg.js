// ssg.js
// ---------------------------------------------
// Loads Discord news posts from your SSG News bot
// and displays them in the "Top Highlights" feed.
// Styled to look like Discord messages.
// ---------------------------------------------

async function loadHighlights() {
  const feedContainer = document.querySelector(".highlights-feed");

  if (!feedContainer) return;

  // Show loading message
  feedContainer.innerHTML = `<p>Loading latest SSG News...</p>`;

  try {
    // Fetch from your Render-hosted bot API
    const response = await fetch("https://ssg-news-bot.onrender.com/api/highlights");

    if (!response.ok) throw new Error("Failed to fetch feed");

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      feedContainer.innerHTML = `<p>No news posts yet — check back soon!</p>`;
      return;
    }

    // Build HTML feed styled like Discord
    feedContainer.innerHTML = data
      .map(msg => {
        const date = new Date(msg.timestamp);
        const formatted = date.toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        // fallback avatar generator if avatar is missing
        const avatar = msg.avatar
          ? msg.avatar
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              msg.author
            )}&background=5865F2&color=fff&bold=true&size=64`;

        return `
          <div class="highlight">
            <div class="highlight-header">
              <img class="highlight-avatar" src="${avatar}" alt="${sanitize(msg.author)}">
              <div class="highlight-meta">
                <strong class="highlight-author">${sanitize(msg.author)}</strong>
                <span class="highlight-date"> • ${formatted}</span>
              </div>
            </div>
            <p class="highlight-text">${sanitize(msg.content).replace(/\n/g, "<br>")}</p>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    console.error("Error loading highlights:", err);
    feedContainer.innerHTML = `<p>⚠️ Could not load news feed at this time.</p>`;
  }
}

// 🧹 Simple sanitizer
function sanitize(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

document.addEventListener("DOMContentLoaded", loadHighlights);

// ---------------------------------------------
// YouTube Latest Upload Thumbnail (Mike Lowe)
// ---------------------------------------------
async function loadLatestYouTube() {
  const container = document.getElementById("youtube-videos");
  if (!container) return;

  container.innerHTML = "<p>Loading latest video...</p>";

  try {
    // Correct RSS feed for Mike Lowe channel
    const rssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCpdXqBT7b76C4zHn5j_HajQ";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.items || !data.items.length) {
      container.innerHTML = "<p>No recent uploads found.</p>";
      return;
    }

    const video = data.items[0]; // Most recent video
    const videoIdMatch = video.link.match(/(?:v=|youtu\.be\/)([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      container.innerHTML = "<p>⚠️ Could not extract video ID from feed.</p>";
      return;
    }

    // Display thumbnail + overlay + title
    container.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener" class="youtube-thumb">
        <img
          src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
          alt="${video.title}"
          class="video-thumb"
        />
        <div class="play-overlay">▶</div>
      </a>
      <p class="video-title"><strong>${video.title}</strong></p>
    `;
  } catch (err) {
    console.error("YouTube load error:", err);
    container.innerHTML = "<p>⚠️ Unable to load YouTube video at this time.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadLatestYouTube);

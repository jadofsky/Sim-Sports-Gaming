// youtube.js
// ------------------------------------------------------
// Fetches latest YouTube uploads for Mike Lowe’s channel
// and displays the 3 most recent videos.
// ------------------------------------------------------

async function loadYouTubeVideos() {
  const videoContainer = document.getElementById("youtube-videos");
  if (!videoContainer) return;

  // 🔑 Your API key and channel ID (replace below)
  const apiKey = "YOUR_YOUTUBE_API_KEY";
  const channelId = "UCn_mCftzKj1Jm_vV1x6zW1Q"; // Example placeholder, replace with Mike Lowe’s actual ID
  const maxResults = 3;

  try {
    videoContainer.innerHTML = `<p>Loading latest uploads...</p>`;

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      videoContainer.innerHTML = `<p>No recent videos found.</p>`;
      return;
    }

    const videos = data.items.map((item) => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;
      const publishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();

      return `
        <div class="video-item lift">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
            <img src="${thumbnail}" alt="${title}" class="video-thumb" />
            <div class="video-meta">
              <h4 class="video-title">${title}</h4>
              <p class="video-date">${publishedAt}</p>
            </div>
          </a>
        </div>
      `;
    });

    videoContainer.innerHTML = videos.join("");

  } catch (err) {
    console.error("YouTube fetch error:", err);
    videoContainer.innerHTML = `<p>⚠️ Could not load videos. Check API key or channel ID.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadYouTubeVideos);

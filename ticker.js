// ticker.js
// ------------------------------------------------------
// Multi-league Live Scores Ticker (ESPN)  
// Pulls live results from MLB, NFL, NBA, NHL, College Football
// ------------------------------------------------------

async function fetchTickerData() {
  const tickerContent = document.querySelector(".scores-content");
  if (!tickerContent) return;

  tickerContent.innerHTML = `
    <span class="scores-label">LIVE SCORES</span>
    <span class="scores-note">Loading…</span>
  `;

  try {
    const endpoints = {
      MLB:   "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
      NFL:   "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
      NBA:   "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
      NHL:   "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
      CFB:   "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard"
    };

    const promises = Object.entries(endpoints).map(async ([league, url]) => {
      const resp = await fetch(url);
      const data = await resp.json().catch(() => null);
      return { league, data };
    });

    const results = await Promise.all(promises);

    const tickerItems = [];

    for (const { league, data } of results) {
      if (data?.events) {
        data.events.forEach((game) => {
          const comp = game.competitions?.[0];
          if (!comp) return;
          const home = comp.competitors.find((c) => c.homeAway === "home");
          const away = comp.competitors.find((c) => c.homeAway === "away");
          const status = comp.status?.type?.shortDetail || "";
          tickerItems.push(`${league} ${away.team.abbreviation} ${away.score} - ${home.team.abbreviation} ${home.score} (${status})`);
        });
      }
    }

    if (tickerItems.length === 0) {
      tickerContent.innerHTML = `
        <span class="scores-label">LIVE SCORES</span>
        <span class="scores-note">No games in progress</span>
      `;
    } else {
      tickerContent.innerHTML =
        `<span class="scores-label">LIVE SCORES</span>` +
        tickerItems.map(item => `<span class="scores-note">${item}</span>`).join(" • ");
    }

  } catch (err) {
    console.error("Ticker error:", err);
    tickerContent.innerHTML = `
      <span class="scores-label">LIVE SCORES</span>
      <span class="scores-note">⚠️ Error loading scores</span>
    `;
  }
}

document.addEventListener("DOMContentLoaded", fetchTickerData);
setInterval(fetchTickerData, 300000); // refresh every 5 minutes

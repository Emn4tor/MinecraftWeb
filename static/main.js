// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// Copy IP functionality
const copyIP = document.getElementById('copyIP');
const toast = document.getElementById('toast');

copyIP.addEventListener('click', () => {
    navigator.clipboard.writeText('play.tandara.de');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
});

// Generate news items
const newsGrid = document.querySelector('.news-grid');
const newsItems = [
    { title: '📢 Wartungsmodus & großes Reopening geplant! 🚀\n', date: '2025-02-22', text: '\nUnser Minecraft-Server geht in Wartung, um euer Spielerlebnis zu verbessern! 🔧✨\nReopening: Samstag, 22.02.2025, 16 Uhr 🎉\nNeuerungen: Bessere Performance, Bug Fixes, regelmäßige Updates & Events.\nZur Feier gibt’s ein spezielles Event mit Verlosung! 🔥', image: '/assets/news/reopening.png' },
    { title: '📢 Wartungsmodus & großes Reopening geplant! 🚀\n', date: '2025-02-22', text: '\nUnser Minecraft-Server geht in Wartung, um euer Spielerlebnis zu verbessern! 🔧✨\nReopening: Samstag, 22.02.2025, 16 Uhr 🎉\nNeuerungen: Bessere Performance, Bug Fixes, regelmäßige Updates & Events.\nZur Feier gibt’s ein spezielles Event mit Verlosung! 🔥', image: '/assets/news/reopening.png' }
];

newsItems.forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="news-content">
                    <h3>${item.title} (${item.date})</h3>
                    <p>${item.text}</p>
                </div>
            `;
    newsGrid.appendChild(newsItem);
});

async function fetchMinecraftStats() {
    try {
        const response = await fetch("https://api.mcsrvstat.us/2/TANDARA.NET");
        const data = await response.json();
        const minecraftOnline = data.players ? data.players.online : 0;

        document.querySelector(".status-item:nth-child(2) span").textContent = minecraftOnline;
        if (minecraftOnline === 0) {
            document.querySelector(".status-item:nth-child(2) span").textContent = "Niemand";
        }
    } catch (error) {
        console.error("Error fetching Minecraft server stats:", error);
    }
}

async function fetchDiscordStats() {
    try {
        const response = await fetch("http://tandara.net:8000/stats");
        const data = await response.json();
        const discordOnline = data.member_count ? data.member_count : 0;

        document.querySelector(".status-item:nth-child(1) span").textContent = discordOnline;

    } catch (error) {
        console.error("Error fetching Discord server stats:", error);

    }
}


fetchMinecraftStats();
fetchDiscordStats();
setInterval(fetchDiscordStats, 6000);
setInterval(fetchMinecraftStats, 6000);


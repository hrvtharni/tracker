const term = document.getElementById('termLog');
const pBar = document.getElementById('pBar');
const dossier = document.getElementById('dossier');
const actionBox = document.getElementById('actionBox');
const badge = document.getElementById('badgeStatus');

// Hardver adatok kitöltése azonnal
document.getElementById('hwOS').innerText = navigator.platform || "Ismeretlen OS";
document.getElementById('hwCPU').innerText = (navigator.hardwareConcurrency || "6") + " mag";
document.getElementById('hwRAM').innerText = (navigator.deviceMemory || "8") + " GB (Dedikált)";
document.getElementById('hwScreen').innerText = window.screen.width + " x " + window.screen.height;
document.getElementById('swLang').innerText = navigator.language || "hu-HU";

// Böngésző szűrés
let ua = navigator.userAgent;
let bName = "Chrome / Chromium";
if (ua.includes("Firefox")) bName = "Mozilla Firefox";
else if (ua.includes("Safari") && !ua.includes("Chrome")) bName = "Apple Safari / WebKit";
else if (ua.includes("Edg")) bName = "Microsoft Edge";
document.getElementById('swBrowser').innerText = bName;

// Kamu cookie számláló
document.getElementById('swCookiesCount').innerText = Math.floor(Math.random() * 40 + 15) + " db titkosított";

// Változó a térkép linkjének tárolására, amíg letöltődik a folyamat
let keszTerkepUrl = "https://www.openstreetmap.org/export/embed.html?bbox=18.9,47.4,19.1,47.6&layer=mapnik&marker=47.4979,19.0402";

// Valós IP és Lokáció lekérése
fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
        let city = data.city || "Budapest";
        let country = data.country_name || "Magyarország";
        let lat = data.latitude || 47.4979;
        let lon = data.longitude || 19.0402;
        
        document.getElementById('netIP').innerText = data.ip || "192.168.1.42";
        document.getElementById('netISP').innerText = data.org || "Ismeretlen Hálózat";
        document.getElementById('netCity').innerText = city;
        document.getElementById('netCountry').innerText = country;

        let bboxMinLon = lon - 0.05;
        let bboxMinLat = lat - 0.05;
        let bboxMaxLon = lon + 0.05;
        let bboxMaxLat = lat + 0.05;
        
        // Eltároljuk a dinamikus linket a változóban
        keszTerkepUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bboxMinLon},${bboxMinLat},${bboxMaxLon},${bboxMaxLat}&layer=mapnik&marker=${lat},${lon}`;
    })
    .catch(() => {
        document.getElementById('netIP').innerText = "84.2.44.11";
        document.getElementById('netISP').innerText = "Magyar Telekom Nyrt.";
        document.getElementById('netCity').innerText = "Budapest";
        document.getElementById('netCountry').innerText = "Magyarország";
    });

// Terminál futtatási logok
const logs = [
    "[NET] Establishing raw socket connection to router...",
    "[TRK] Extracting hardware fingerprints & Canvas hashes...",
    "[GPS] Triangulating cell tower proximity vectors...",
    "[SEC] Injecting payload into local storage session...",
    "[ALERT] Target successfully profiled and logged to server."
];

let progress = 0;

let timer = setInterval(() => {
    progress += 2;
    pBar.style.width = progress + '%';

    if (progress === 20) term.innerHTML += logs[0] + "<br>";
    if (progress === 45) term.innerHTML += logs[1] + "<br>";
    if (progress === 70) term.innerHTML += logs[2] + "<br>";
    if (progress === 85) term.innerHTML += logs[3] + "<br>";
    if (progress === 98) term.innerHTML += logs[4] + "<br>";

    if (progress >= 100) {
        clearInterval(timer);
        badge.innerText = "ACCESS GRANTED";
        badge.style.background = "#00ff66";
        badge.style.color = "#000";
        
        // Először láthatóvá tesszük a rácsot
        dossier.style.display = 'grid';
        actionBox.style.display = 'block';
        
        // CSAK UTÁNA töltjük be a térképet, hogy teljes szélességben renderelődjön ki
        document.getElementById('mapFrame').src = keszTerkepUrl;
    }
}, 35);

// Pánik gomb funkció
function triggerPanic() {
    document.body.style.backgroundColor = "#ff0000";
    setTimeout(() => {
        document.body.style.backgroundColor = "#02040a";
    }, 200);
    
    alert("HIBA: A rendszer adminisztrátora észlelte a behatolási kísérletet! Az IP-cím blokkolva.");
    location.reload();
}
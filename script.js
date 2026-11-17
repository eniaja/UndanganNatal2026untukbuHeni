
// ===============================
// BUKA UNDANGAN
// ===============================

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");

openButton.addEventListener("click", async () => {
  cover.classList.add("hidden");
  mainContent.classList.remove("hidden");

  window.scrollTo(0, 0);

  const music = document.getElementById("backgroundMusic");

  try {
    await music.play();
    document.getElementById("musicButton").textContent = "♫";
  } catch (error) {
    console.log("Musik belum dapat diputar.");
  }
});

// ===============================
// MUSIK NATAL
// ===============================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫";
    } catch (error) {
      alert("Musik belum dapat diputar. Periksa file natal.mp3.");
    }
  } else {
    music.pause();
    musicButton.textContent = "▶";
  }
});

// ===============================
// HITUNG MUNDUR
// ===============================

const targetDate = new Date("2026-12-14T09:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    document.getElementById("countdownMessage").textContent =
      "Hari perayaan Natal telah tiba atau telah berlangsung!";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===============================
// ANIMASI SALJU
// ===============================

function createSnow() {
  const snow = document.createElement("div");

  snow.className = "snowflake";
  snow.textContent = "❄";

  snow.style.left = Math.random() * 100 + "vw";
  snow.style.fontSize = (Math.random() * 12 + 8) + "px";
  snow.style.opacity = Math.random() * 0.7 + 0.3;
  snow.style.animationDuration = (Math.random() * 5 + 5) + "s";

  document.getElementById("snow-container").appendChild(snow);

  setTimeout(() => {
    snow.remove();
  }, 11000);
}

setInterval(createSnow, 350);

// ===============================
// RSVP
// ===============================

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("rsvpName").value.trim();
  const count = Number(document.getElementById("rsvpCount").value);
  const status = document.getElementById("rsvpStatus").value;

  if (!name || !Number.isInteger(count) || count < 1 || count > 20 || !status) {
    alert("Mohon isi formulir RSVP dengan benar.");
    return;
  }

  const rsvp = {
    nama: name,
    jumlah: count,
    status: status,
    waktu: new Date().toLocaleString("id-ID")
  };

  try {
    const data = JSON.parse(localStorage.getItem("galatia_rsvp") || "[]");
    data.push(rsvp);
    localStorage.setItem("galatia_rsvp", JSON.stringify(data));

    document.getElementById("rsvpMessage").textContent =
      "Terima kasih, konfirmasi Anda telah tersimpan di perangkat ini.";

    rsvpForm.reset();
    document.getElementById("rsvpCount").value = 1;
  } catch (error) {
    alert("Data belum dapat disimpan pada browser.");
  }
});

// ===============================
// BUKU TAMU
// ===============================

const guestForm = document.getElementById("guestForm");

function displayGuests() {
  const guestList = document.getElementById("guestList");
  guestList.innerHTML = "";

  const guests = JSON.parse(localStorage.getItem("galatia_guests") || "[]");

  guests.slice().reverse().forEach(guest => {
    const card = document.createElement("div");
    card.className = "guest-card";

    const name = document.createElement("strong");
    name.textContent = guest.nama;

    const message = document.createElement("p");
    message.textContent = guest.ucapan;

    card.appendChild(name);
    card.appendChild(message);
    guestList.appendChild(card);
  });
}

guestForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const message = document.getElementById("guestMessage").value.trim();

  if (!name || !message) return;

  try {
    const guests = JSON.parse(localStorage.getItem("galatia_guests") || "[]");

    guests.push({
      nama: name,
      ucapan: message
    });

    localStorage.setItem("galatia_guests", JSON.stringify(guests));

    guestForm.reset();
    displayGuests();

    alert("Terima kasih atas ucapan dan doa Anda!");
  } catch (error) {
    alert("Ucapan belum dapat disimpan.");
  }
});

displayGuests();

// ===============================
// BAGIKAN UNDANGAN
// ===============================

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "Perayaan Natal Sekolah Kristen Galatia 2026",
    text: "Mari bergabung dalam Perayaan Natal Sekolah Kristen Galatia, 14 Desember 2026 pukul 09.00 WIB.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log("Berbagi dibatalkan.");
    }
  } else {
    try {
      await navigator.clipboard.writeText(
        shareData.text + " " + shareData.url
      );
      alert("Tautan undangan berhasil disalin.");
    } catch (error) {
      alert("Salin alamat website dari browser untuk membagikan undangan.");
    }
  }
});

function $(id) {
  return document.getElementById(id);
}

async function searchGiphy() {
  const query = $("giphyQuery").value.trim();
  const out = $("giphyOut");
  out.innerHTML = "";

  if (!query) {
    out.innerHTML = `<p class="error">Bitte Suchwort eingeben.</p>`;
    return;
  }

  const url =
    "https://api.giphy.com/v1/gifs/search" +
    "?api_key=" + encodeURIComponent(window.GIPHY_KEY) +
    "&q=" + encodeURIComponent(query) +
    "&limit=9" +
    "&rating=pg";

  const res = await fetch(url);
  const data = await res.json();

  for (const gif of data.data) {
    const imgUrl = gif.images.fixed_width.url;
    out.innerHTML += `
      <div class="card">
        <img src="${imgUrl}" alt="GIF">
      </div>
    `;
  }
}

async function searchMemes() {
  const query = $("memeQuery").value.trim();
  const out = $("memeOut");
  out.innerHTML = "";

  if (!query) {
    out.innerHTML = `<p class="error">Bitte Suchwort eingeben.</p>`;
    return;
  }

  const url =
    "https://api.apileague.com/search-memes" +
    "?keywords=" + encodeURIComponent(query) +
    "&media-type=image" +
    "&number=9";

  const res = await fetch(url, {
    headers: {
      "x-api-key": window.APILEAGUE_KEY,
      "accept": "application/json"
    }
  });

  const data = await res.json();

  if (!data.memes) {
    out.innerHTML = `<p class="error">Keine Daten erhalten. Prüfe API-Key und Konsole.</p>`;
    return;
  }

  for (const meme of data.memes) {
    out.innerHTML += `
      <div class="card">
        <img src="${meme.url}" alt="Meme">
        <p class="small">${meme.description ?? ""}</p>
      </div>
    `;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  $("giphyBtn").addEventListener("click", searchGiphy);
  $("memeBtn").addEventListener("click", searchMemes);
});

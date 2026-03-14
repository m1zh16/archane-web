async function loadShop() {
    const shop = document.getElementById("shop");
    if (!shop) return;

    try {
        // Käytetään CORS-proxya, jotta toimii suoraan selaimessa
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetUrl = encodeURIComponent("https://fortnite-api.com/v2/shop/br");
        const response = await fetch(proxyUrl + targetUrl);
        const wrapped = await response.json();
        const data = JSON.parse(wrapped.contents);

        const items = [
            ...data.data.featured.entries,
            ...data.data.daily.entries
        ];

        items.forEach(entry => {
            const item = entry.items[0];
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <img src="${item.images.icon}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
                <div class="price">${entry.finalPrice} V-Bucks</div>
            `;
            shop.appendChild(div);
        });

    } catch (e) {
        console.error(e);
        shop.innerHTML = "<p style='padding:40px;text-align:center;'>Failed to load shop</p>";
    }

    // Päivitetään shop automaattisesti 10 minuutin välein
    setTimeout(() => {
        shop.innerHTML = '';
        loadShop();
    }, 600000);
}

// Ladataan heti sivun aukeamisen jälkeen
loadShop();
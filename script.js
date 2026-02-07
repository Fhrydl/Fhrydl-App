// DATABASE PRODUK
// Menggunakan CDN SimpleIcons & GitHub User Content (Server paling stabil untuk Icon)
const products = [
    {
        id: 1,
        name: "Alight Motion Pro",
        category: "design",
        // Menggunakan Icon dari SimpleIcons CDN
        image: "https://cdn.simpleicons.org/alightmotion/00D56D", 
        desc: "Aplikasi editing video motion graphic terbaik di Android.",
        variants: [
            { name: "1 Tahun", price: 20000 }
        ]
    },
    {
        id: 2,
        name: "Canva Pro",
        category: "design",
        image: "https://cdn.simpleicons.org/canva/00C4CC",
        desc: "Akses ribuan template premium dan fitur hapus background.",
        variants: [
            { name: "1 Bulan", price: 7500 },
            { name: "2 Bulan", price: 10500 },
            { name: "6 Bulan", price: 30000 },
            { name: "Canva Pro Head (1 Bulan)", price: 21000 }
        ]
    },
    {
        id: 3,
        name: "CapCut Pro",
        category: "design",
        // Icon CapCut warna putih agar kontras dengan dark mode
        image: "https://cdn.simpleicons.org/capcut/ffffff", 
        desc: "Edit video TikTok jadi lebih mudah dengan fitur Pro.",
        variants: [
            { name: "7 Hari (Private)", price: 12000 },
            { name: "1 Bulan (Private)", price: 30000 }
        ]
    },
    {
        id: 4,
        name: "Viu Premium",
        category: "streaming",
        // Menggunakan Fallback Image yang aman (Logo TV Umum) karena Viu memblokir link luar
        image: "https://cdn-icons-png.flaticon.com/512/3163/3163478.png",
        desc: "Nonton Drama Korea tanpa iklan.",
        variants: [
            { name: "1 Bulan (Shared)", price: 6000 }
        ]
    },
    {
        id: 5,
        name: "YouTube Premium",
        category: "streaming",
        image: "https://cdn.simpleicons.org/youtube/FF0000",
        desc: "Nonton tanpa iklan + YouTube Music.",
        variants: [
            { name: "1 Bulan (Invite)", price: 9000 },
            { name: "1 Bulan (Email Seller)", price: 20000 }
        ]
    },
    {
        id: 6,
        name: "Netflix",
        category: "streaming",
        image: "https://cdn.simpleicons.org/netflix/E50914",
        desc: "Film dan Series terbaik dunia.",
        variants: [
            { name: "1 Bulan (Shared)", price: 60000 }
        ]
    },
    {
        id: 7,
        name: "Vidio Platinum",
        category: "streaming",
        // Mengambil logo dari GitHub Avatar Vidio (Sangat Stabil)
        image: "https://github.com/vidio.png",
        desc: "Sports dan TV lokal premium.",
        variants: [
            { name: "30 Hari (TV Only)", price: 10000 },
            { name: "1 Bulan (Mobile)", price: 60000 },
            { name: "1 Bulan (All Device)", price: 90000 }
        ]
    },
    {
        id: 8,
        name: "Scribd",
        category: "ai",
        image: "https://cdn.simpleicons.org/scribd/1E8182",
        desc: "Perpustakaan digital unlimited.",
        variants: [
            { name: "1 Bulan (Shared)", price: 26000 }
        ]
    },
    {
        id: 9,
        name: "BSTATION",
        category: "streaming",
        // Menggunakan Icon Bilibili
        image: "https://cdn.simpleicons.org/bilibili/00A1D6", 
        desc: "Anime station premium.",
        variants: [
            { name: "Premium 1 Bulan (Shared)", price: 34000 }
        ]
    },
    {
        id: 10,
        name: "Turnitin",
        category: "ai",
        // Mengambil dari GitHub Avatar Turnitin
        image: "https://github.com/turnitin.png",
        desc: "Cek plagiasi tugas kuliah/sekolah.",
        variants: [
            { name: "1 Bulan (No Repository)", price: 0 }
        ]
    },
    {
        id: 11,
        name: "Gemini AI",
        category: "ai",
        // Menggunakan Icon Google Sparkles (simbol AI Google)
        image: "https://cdn.simpleicons.org/google/4285F4",
        desc: "AI tercerdas dari Google.",
        variants: [
            { name: "Pro Invite", price: 60000 }
        ]
    },
    {
        id: 12,
        name: "ChatGPT Plus",
        category: "ai",
        image: "https://cdn.simpleicons.org/openai/ffffff",
        desc: "AI Assistant paling populer.",
        variants: [
            { name: "1 Bulan (Shared)", price: 70000 }
        ]
    }
];

// KONFIGURASI WHATSAPP
const WA_NUMBER = "62882016233203"; 

// DOM ELEMENTS
const catalogView = document.getElementById('catalog-view');
const purchaseView = document.getElementById('purchase-view');
const appGrid = document.getElementById('app-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

let selectedProduct = null;
let selectedVariant = null;

// FUNGSI RENDER PRODUK
function renderProducts(filter = 'all') {
    appGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const lowestPrice = product.variants.length > 0 ? Math.min(...product.variants.map(v => v.price)) : 0;
        const displayPrice = lowestPrice === 0 ? "DM Admin" : `Rp${lowestPrice.toLocaleString('id-ID')}`;

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openPurchase(product);
        
        // Perbaikan: Menambahkan styling khusus agar icon pas di tengah dan ukurannya konsisten
        card.innerHTML = `
            <div style="height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <img src="${product.image}" alt="${product.name}" 
                     style="max-width: 60px; max-height: 60px; width: auto; height: auto; object-fit: contain;"
                     onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/1170/1170466.png';">
            </div>
            <h3>${product.name}</h3>
            <p>Mulai dari ${displayPrice}</p>
        `;
        appGrid.appendChild(card);
    });
}

// FUNGSI FILTER
function filterApps(category) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(category);
}

// BUKA HALAMAN DETAIL
function openPurchase(product) {
    selectedProduct = product;
    selectedVariant = null; 

    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.name;
    document.getElementById('detail-desc').innerText = product.desc;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    product.variants.forEach((variant, index) => {
        const option = document.createElement('div');
        option.className = 'option-card';
        option.onclick = () => selectOption(index, variant);
        
        const priceText = variant.price === 0 ? "Hubungi Admin" : `Rp${variant.price.toLocaleString('id-ID')}`;
        
        option.innerHTML = `
            <span>${variant.name}</span>
            <span class="price-tag">${priceText}</span>
        `;
        optionsContainer.appendChild(option);
    });

    catalogView.classList.add('hidden');
    document.querySelector('.hero').classList.add('hidden'); 
    document.querySelector('.category-filter').classList.add('hidden');
    purchaseView.classList.remove('hidden');
    window.scrollTo(0,0);
}

// PILIH OPSI HARGA
function selectOption(index, variant) {
    const options = document.querySelectorAll('.option-card');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedVariant = variant;
}

// KEMBALI KE MENU
function goBack() {
    purchaseView.classList.add('hidden');
    catalogView.classList.remove('hidden');
    document.querySelector('.hero').classList.remove('hidden');
    document.querySelector('.category-filter').classList.remove('hidden');
}

// PROSES KE WHATSAPP
function processOrder() {
    if (!selectedVariant) {
        alert("Silahkan pilih paket terlebih dahulu!");
        return;
    }

    const userNote = document.getElementById('user-note').value;
    const priceText = selectedVariant.price === 0 ? "Tanya Harga" : `Rp${selectedVariant.price.toLocaleString('id-ID')}`;

    const message = `Halo Admin Fhrydl App,%0A%0ASaya ingin membeli:%0A*Aplikasi:* ${selectedProduct.name}%0A*Paket:* ${selectedVariant.name}%0A*Harga:* ${priceText}%0A*Catatan:* ${userNote}%0A%0AMohon diproses pembayarannya. Terima kasih!`;

    const url = `https://wa.me/${WA_NUMBER}?text=${message}`;
    window.open(url, '_blank');
}

// Initial Render
renderProducts();

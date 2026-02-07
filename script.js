// DATABASE PRODUK
// Logo diambil dari Wikipedia/Wikimedia untuk kualitas transparan
const products = [
    {
        id: 1,
        name: "Alight Motion Pro",
        category: "design",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Alight_Motion_Logo.png", // Contoh link logo
        desc: "Aplikasi editing video motion graphic terbaik di Android.",
        variants: [
            { name: "1 Tahun", price: 20000 }
        ]
    },
    {
        id: 2,
        name: "Canva Pro",
        category: "design",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/CapCut_logo.svg/1200px-CapCut_logo.svg.png", 
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
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Viu_logo.png",
        desc: "Nonton Drama Korea tanpa iklan.",
        variants: [
            { name: "1 Bulan (Shared)", price: 6000 }
        ]
    },
    {
        id: 5,
        name: "YouTube Premium",
        category: "streaming",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        desc: "Film dan Series terbaik dunia.",
        variants: [
            { name: "1 Bulan (Shared)", price: 60000 }
        ]
    },
    {
        id: 7,
        name: "Vidio Platinum",
        category: "streaming",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Vidio_logo_2023.svg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Scribd_Logo.svg/1200px-Scribd_Logo.svg.png",
        desc: "Perpustakaan digital unlimited.",
        variants: [
            { name: "1 Bulan (Shared)", price: 26000 }
        ]
    },
    {
        id: 9,
        name: "BSTATION",
        category: "streaming",
        image: "https://play-lh.googleusercontent.com/Fw5i8b_8pQJqD6Q8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ8zQ=w240-h480-rw", // Placeholder
        desc: "Anime station premium.",
        variants: [
            { name: "Premium 1 Bulan (Shared)", price: 34000 }
        ]
    },
    {
        id: 10,
        name: "Turnitin",
        category: "ai",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Turnitin_logo.svg",
        desc: "Cek plagiasi tugas kuliah/sekolah.",
        variants: [
            { name: "1 Bulan (No Repository)", price: 0 } // Harga 0 trigger DM
        ]
    },
    {
        id: 11,
        name: "Gemini AI",
        category: "ai",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
        desc: "AI tercerdas dari Google.",
        variants: [
            { name: "Pro Invite", price: 60000 }
        ]
    },
    {
        id: 12,
        name: "ChatGPT Plus",
        category: "ai",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        desc: "AI Assistant paling populer.",
        variants: [
            { name: "1 Bulan (Shared)", price: 70000 }
        ]
    }
];

// KONFIGURASI WHATSAPP
const WA_NUMBER = "62882016233203"; // Format internasional tanpa +

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
        // Tentukan harga termurah untuk display "Mulai dari..."
        const lowestPrice = product.variants.length > 0 ? Math.min(...product.variants.map(v => v.price)) : 0;
        const displayPrice = lowestPrice === 0 ? "DM Admin" : `Rp${lowestPrice.toLocaleString('id-ID')}`;

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openPurchase(product);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Mulai dari ${displayPrice}</p>
        `;
        appGrid.appendChild(card);
    });
}

// FUNGSI FILTER
function filterApps(category) {
    // Ubah style tombol aktif
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Render ulang
    renderProducts(category);
}

// BUKA HALAMAN DETAIL
function openPurchase(product) {
    selectedProduct = product;
    selectedVariant = null; // Reset pilihan

    // Isi konten detail
    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.name;
    document.getElementById('detail-desc').innerText = product.desc;

    // Render Opsi Harga
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

    // Transisi Tampilan
    catalogView.classList.add('hidden');
    document.querySelector('.hero').classList.add('hidden'); // Sembunyikan banner saat beli
    document.querySelector('.category-filter').classList.add('hidden');
    purchaseView.classList.remove('hidden');
    
    // Scroll ke atas
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

    // Format Pesan WhatsApp
    const message = `Halo Admin Fhrydl App,%0A%0ASaya ingin membeli:%0A*Aplikasi:* ${selectedProduct.name}%0A*Paket:* ${selectedVariant.name}%0A*Harga:* ${priceText}%0A*Catatan:* ${userNote}%0A%0AMohon diproses pembayarannya. Terima kasih!`;

    const url = `https://wa.me/${WA_NUMBER}?text=${message}`;
    window.open(url, '_blank');
}

// Initial Render
renderProducts();

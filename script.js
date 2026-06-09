document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Efek Scroll Navbar (Perubahan latar belakang saat di-scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Logika Modal Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Fungsi pembuka Lightbox
    const openLightbox = (imgSrc, captionHtml) => {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = captionHtml;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat popup aktif
    };

    // Fungsi penutup Lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Aktifkan kembali scroll halaman
    };

    // -- A: Klik pada Kartu Lukisan (Galeri) --
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const artist = card.querySelector('strong').innerText;
            const src = card.querySelector('img').src;
            
            const caption = `
                <h3 style="color: white; margin-top: 15px; font-size: 1.5rem;">${title}</h3>
                <p style="color: #cbd5e1; font-size: 1rem; margin-top: 5px;">Karya: ${artist}</p>
            `;
            openLightbox(src, caption);
        });
    });

    // -- B: Klik pada Foto ATAU Nama Anggota Tim --
    document.querySelectorAll('.member-card').forEach(card => {
        const avatar = card.querySelector('.avatar');
        const nameLink = card.querySelector('h4');

        // Ubah kursor menjadi pointer tanda bisa diklik
        if (avatar) avatar.style.cursor = 'pointer';
        if (nameLink) nameLink.style.cursor = 'pointer';

        const handleMemberClick = () => {
            const name = nameLink.innerText;
            const role = card.querySelector('.role').innerText;
            const imgSrc = card.querySelector('img').src;
            
            const caption = `
                <h3 style="color: white; margin-top: 15px; font-size: 1.5rem;">${name}</h3>
                <p style="color: #cbd5e1; font-size: 1rem; margin-top: 5px;">Tanggal Lahir: ${role}</p>
            `;
            openLightbox(imgSrc, caption);
        };

        if (avatar) avatar.addEventListener('click', handleMemberClick);
        if (nameLink) nameLink.addEventListener('click', handleMemberClick);
    });

    // -- C: Kontrol Penutup Lightbox --
    closeBtn.addEventListener('click', closeLightbox);
    
    // Klik di area luar gambar untuk menutup
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Menutup menggunakan tombol Escape keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});
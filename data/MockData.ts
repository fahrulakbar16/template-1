export interface InvitationData {
  invitation_meta: InvitationMeta;
  hero_section: HeroSection;
  couple: CoupleSection;
  events: EventItem[];
  story: StorySection;
  gallery: GallerySection;
  gift: GiftSection;
  wishes: WishItem[];
  quotes: QuoteItem[];
  labels: Labels;
}

export interface WishItem {
  id: number;
  name: string;
  message: string;
  time: string;
  attend: string;
}

export interface InvitationMeta {
  slug: string;
  primary_language: string;
  music_url: string;
  theme_config: {
    primary_color: string;
    font_family_serif: string;
    hero_image_url: string;
  };
}

export interface HeroSection {
  eyebrow: string;
  main_title: string;
  label: string;
  target_date: string;
  calendar_event: {
    summary: string;
    location: string;
    description: string;
  };
}

export interface CoupleSection {
  section_title: string;
  intro_text: string;
  groom: Person;
  bride: Person;
}

export interface Person {
  first_name: string;
  full_name: string;
  parents_desc: string;
  ig_handle: string;
  ig_link: string;
  avatar_url: string;
  role_label: string;
}

export interface EventItem {
  id: string;
  type: string;
  title: string;
  date_formatted: string;
  time_range: string;
  venue_name: string;
  address: string;
  maps_url: string;
  icon: string;
}

export interface StorySection {
  section_label: string;
  section_title: string;
  section_desc: string;
  timeline: TimelineItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface GallerySection {
  section_label: string;
  section_title: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface GiftSection {
  section_label: string;
  section_title: string;
  instruction_text: string;
  bank_accounts: BankAccount[];
}

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface QuoteItem {
  bismillah: string;
  content: string;
  source: string;
  translation: string;
}

export interface Labels {
  navigation: {
    home: string;
    couple: string;
    event: string;
    gallery: string;
    wish: string;
    rsvp: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  buttons: {
    open_invitation: string;
    save_calendar: string;
    view_maps: string;
    send_wish: string;
    confirm_rsvp: string;
    copy: string;
    copied: string;
  };
  placeholders: {
    name: string;
    message: string;
    guests: string;
  };
  date: {
    days: string;
    months: string;
    years: string;
    location: string;
  };
}

export const MOCK_DATA: InvitationData = {
  invitation_meta: {
    slug: "rizky-aulia",
    primary_language: "id",
    music_url: "/boybandpop_beautiful-in-white-shane-filan-westlife.mp3",
    theme_config: {
      primary_color: "#8b6d46",
      font_family_serif: "var(--font-serif)",
      hero_image_url: "/images/hero.png",
    },
  },
  hero_section: {
    eyebrow: "The Wedding of",
    main_title: "Together",
    label: "Undangan Pernikahan",
    target_date: "2025-09-27T08:00:00",
    calendar_event: {
      summary: "The Wedding of Rizky & Aulia",
      location: "Jakarta Selatan",
      description: "Pernikahan Rizky & Aulia",
    },
  },
  couple: {
    section_title: "Dua Jiwa, Satu Tujuan",
    intro_text: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan pernikahan kami.",
    groom: {
      first_name: "Rizky",
      full_name: "Muhammad Rizky Pratama, S.T.",
      parents_desc: "Putra dari Bpk. H. Ahmad Fauzi & Ibu Hj. Siti Rahayu",
      ig_handle: "@rizky.pratama",
      ig_link: "#",
      avatar_url: "/images/groom.png",
      role_label: "Mempelai Pria",
    },
    bride: {
      first_name: "Aulia",
      full_name: "Aulia Rahmadani, S.Pd.",
      parents_desc: "Putri dari Bpk. H. Bambang Suryadi & Ibu Hj. Nur Aisyah",
      ig_handle: "@aulia.rahmadani",
      ig_link: "#",
      avatar_url: "/images/bride.png",
      role_label: "Mempelai Wanita",
    },
  },
  events: [
    {
      id: "event-akad",
      type: "Akad Nikah",
      title: "Ijab Qabul",
      date_formatted: "Sabtu, 27 September 2025",
      time_range: "08.00 – 10.00 WIB",
      venue_name: "Masjid Al-Ikhlas",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      maps_url: "https://maps.google.com/?q=Masjid%20Al-Ikhlas%20Jl.%20Sudirman%20No.%2045%2C%20Jakarta%20Selatan",
      icon: "🕌",
    },
    {
      id: "event-resepsi",
      type: "Resepsi",
      title: "Walimatul Ursy",
      date_formatted: "Sabtu, 27 September 2025",
      time_range: "11.00 – 14.00 WIB",
      venue_name: "Grand Ballroom Mutiara Hotel",
      address: "Jl. Gatot Subroto No. 10, Jakarta Selatan",
      maps_url: "https://maps.google.com/?q=Grand%20Ballroom%20Mutiara%20Hotel%20Jl.%20Gatot%20Subroto%20No.%2010%2C%20Jakarta%20Selatan",
      icon: "🏛️",
    },
  ],
  story: {
    section_label: "Our Story",
    section_title: "Perjalanan Cinta Kami",
    section_desc: "Setiap langkah dalam perjalanan ini membawa kami lebih dekat satu sama lain.",
    timeline: [
      { year: "2019", title: "Pertama Bertemu", description: "Saat orientasi mahasiswa baru di kampus, pandangan kami bertemu untuk pertama kalinya." },
      { year: "2020", title: "Menjadi Teman", description: "Satu kelompok tugas besar membuat kami semakin dekat dan sering menghabiskan waktu bersama." },
      { year: "2021", title: "Jatuh Cinta", description: "Tanpa disadari, persahabatan itu perlahan berubah menjadi perasaan yang lebih dalam." },
      { year: "2022", title: "Memulai Hubungan", description: "Dengan tekad dan doa orang tua, kami memutuskan untuk melangkah bersama." },
      { year: "2025", title: "Melangkah ke Pelaminan", description: "Kini, dengan restu Allah dan keluarga, kami siap mengikat janji suci seumur hidup." },
    ],
  },
  gallery: {
    section_label: "Galeri",
    section_title: "Momen Spesial Kami",
    images: [
      { url: "/images/gallery1.png", alt: "Foto bersama di ladang bunga" },
      { url: "/images/gallery2.png", alt: "Foto pengantin perempuan" },
      { url: "/images/gallery3.png", alt: "Foto bersama saat sunset" },
      { url: "/images/gallery1.png", alt: "Foto bersama di ladang bunga" },
      { url: "/images/gallery2.png", alt: "Foto pengantin perempuan" },
      { url: "/images/gallery3.png", alt: "Foto bersama saat sunset" },
    ],
  },
  gift: {
    section_label: "Wedding Gift",
    section_title: "Hadiah Pernikahan",
    instruction_text: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimkan hadiah secara cashless melalui rekening berikut:",
    bank_accounts: [
      { id: "bca", bank_name: "BCA", account_number: "1234 5678 9012", account_holder: "a.n. Muhammad Rizky P." },
      { id: "mandiri", bank_name: "Mandiri", account_number: "9876 5432 1098", account_holder: "a.n. Aulia Rahmadani" },
    ],
  },
  wishes: [
    { id: 1, name: "Budi Santoso", message: "Selamat menempuh hidup baru! Semoga rumah tangganya sakinah, mawaddah, warahmah. Panjang umur dan lancar rezekinya. 🌸", time: "2 jam lalu", attend: "hadir" },
    { id: 2, name: "Sari Indah", message: "Barakallahu lakuma wa baraka alaykuma wa jama'a baynakuma fi khair. Semoga menjadi keluarga yang penuh berkah! 💕", time: "1 jam lalu", attend: "hadir" },
    { id: 3, name: "Keluarga Permana", message: "Congrats Rizky & Aulia! Semoga bahagia selalu dan segera dikaruniai buah hati yang sholeh/sholehah. ✨", time: "45 menit lalu", attend: "tidak hadir" },
  ],
  quotes: [
    {
      bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
      content: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      source: "QS. Ar-Rum : 21",
      translation: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    },
  ],
  labels: {
    navigation: {
      home: "Home",
      couple: "Pasangan",
      event: "Acara",
      gallery: "Galeri",
      wish: "Ucapan",
      rsvp: "RSVP",
    },
    countdown: {
      days: "Hari",
      hours: "Jam",
      minutes: "Menit",
      seconds: "Detik",
    },
    buttons: {
      open_invitation: "Buka Undangan",
      save_calendar: "Simpan ke Kalender",
      view_maps: "Lihat di Maps",
      send_wish: "Kirim Ucapan ✦",
      confirm_rsvp: "Konfirmasi Kehadiran ✦",
      copy: "Salin",
      copied: "Tersalin",
    },
    placeholders: {
      name: "Nama lengkap Anda...",
      message: "Tulis ucapan dan doa terbaik Anda...",
      guests: "orang",
    },
    date: {
      days: "Hari",
      months: "Sep",
      years: "Tahun",
      location: "Lokasi",
    },
  },
};

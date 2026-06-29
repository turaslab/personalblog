/**
 * ════════════════════════════════════════════════════════
 *  OYUN KÜTÜPHANESİ — VERİ DOSYASI
 *  Yeni oyun eklemek için bu diziye yeni bir nesne ekle.
 *
 *  ZORUNLU ALANLAR:
 *    id         → benzersiz sayı
 *    title      → oyun adı
 *    cover      → kapak görseli URL'i (Steam capsule boyutu: 460x215 önerilen)
 *    genre      → tür(ler) dizisi
 *    hours      → toplam oynama süresi (saat)
 *    rating     → kendi puanın (1-10)
 *    completion → tamamlama yüzdesi (0-100)
 *    status     → "playing" | "completed" | "dropped" | "backlog"
 *    lastPlayed → "YYYY-MM-DD" formatında tarih
 *    review     → kısa yorum
 *
 *  OPSİYONEL ALANLAR:
 *    favorite      → true | false (varsayılan false)
 *    achievements  → { earned: N, total: N }
 *    tags          → ek etiket dizisi
 * ════════════════════════════════════════════════════════
 */

const GAMES = [
  {
    id: 1,
    title: "The Witcher 3: Wild Hunt",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    genre: ["RPG", "Açık Dünya"],
    hours: 187,
    rating: 10,
    completion: 94,
    status: "completed",
    lastPlayed: "2024-11-12",
    favorite: true,
    achievements: { earned: 52, total: 78 },
    review: "Oyun tarihinin başyapıtı. Toussaint bölümü tek başına bir capolavoro.",
    tags: ["hikaye", "masterpiece", "gotta-100%"]
  },
  {
    id: 2,
    title: "Elden Ring",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    genre: ["Action RPG", "Souls-like"],
    hours: 142,
    rating: 9,
    completion: 78,
    status: "playing",
    lastPlayed: "2025-01-03",
    favorite: true,
    achievements: { earned: 31, total: 42 },
    review: "Kalp atlatıyor ama her ölüm bir öğreti. Limgrave'de kaybolmak bile zevkli.",
    tags: ["zor", "harika-map", "boss-rush"]
  },
  {
    id: 3,
    title: "Hades",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    genre: ["Roguelite", "Action"],
    hours: 83,
    rating: 9,
    completion: 65,
    status: "playing",
    lastPlayed: "2025-01-18",
    favorite: false,
    achievements: { earned: 28, total: 49 },
    review: "Roguelite'ın en iyi anlatı entegrasyonu. Her ölüm hikayeyi ilerletiyor.",
    tags: ["replayable", "müzik-harika"]
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    genre: ["Açık Dünya", "Aksiyon"],
    hours: 116,
    rating: 10,
    completion: 88,
    status: "completed",
    lastPlayed: "2024-08-21",
    favorite: true,
    achievements: { earned: 51, total: 60 },
    review: "Arthur Morgan karakteri tartışmasız oyun tarihinin en iyi yazılmış karakteri.",
    tags: ["sinematik", "at-simülatörü", "ağladım"]
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    genre: ["RPG", "Aksiyon"],
    hours: 74,
    rating: 8,
    completion: 57,
    status: "playing",
    lastPlayed: "2025-01-25",
    favorite: false,
    achievements: { earned: 22, total: 44 },
    review: "Phantom Liberty sonrası bambaşka bir oyun oldu. Night City nefes kesici.",
    tags: ["atmosfer", "DLC-şart"]
  },
  {
    id: 6,
    title: "Disco Elysium",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header.jpg",
    genre: ["RPG", "Dedektif"],
    hours: 48,
    rating: 9,
    completion: 100,
    status: "completed",
    lastPlayed: "2024-06-14",
    favorite: false,
    achievements: { earned: 17, total: 17 },
    review: "Oyun mı yoksa roman mı bilemiyorum. Zihinsel diyaloglar mükemmel.",
    tags: ["metin-ağırlıklı", "benzersiz", "felsefe"]
  },
  {
    id: 7,
    title: "Sekiro: Shadows Die Twice",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
    genre: ["Action", "Souls-like"],
    hours: 61,
    rating: 9,
    completion: 82,
    status: "completed",
    lastPlayed: "2024-03-07",
    favorite: false,
    achievements: { earned: 34, total: 42 },
    review: "Posture sistemi dahice. Sword Saint İsshin dövüşü sanat eseri.",
    tags: ["zor", "japon-estetiği", "skill-check"]
  },
  {
    id: 8,
    title: "Baldur's Gate 3",
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    genre: ["RPG", "Strateji"],
    hours: 203,
    rating: 10,
    completion: 71,
    status: "playing",
    lastPlayed: "2025-01-30",
    favorite: true,
    achievements: { earned: 44, total: 54 },
    review: "Larian her şeyi alt üst etti. Shadowheart companion yazımı çıtayı yerden kesiyor.",
    tags: ["co-op", "D&D", "seçim-önemli"]
  }
];

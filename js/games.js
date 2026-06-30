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
    title: "Heavy Rain",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960910/header.jpg",
    genre: ["Sinematik","Hikayeli"],
    hours: 11.2,
    rating: 10,
    completion: 100,
    status: "completed",
    lastPlayed: "2025-11-08",
    favorite: true,
    achievements: { earned: 32, total: 56 },
    review: "Shaun!",
    tags: []
  },

  {
    id: 2,
    title: "Fahrenheit: Indigo Prophecy Remastered",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960910/header.jpg",
    genre: ["Sinematik","Hikayeli"],
    hours: 9,
    rating: 6,
    completion: 100,
    status: "completed",
    lastPlayed: "2026-01-31",
    favorite: false,
    achievements: { earned: 10, total: 17 },
    review: "What?",
    tags: []
  },
  {
    id: 3,
    title: "Beyond: Two Souls",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960910/header.jpg",
    genre: ["Sinematik","Hikayeli"],
    hours: 8.6,
    rating: 6,
    completion: 100,
    status: "completed",
    lastPlayed: "2026-01-21",
    favorite: false,
    achievements: { earned: 10, total: 17 },
    review: "Don't trust your fbi boyfriend",
    tags: []
  },
  {
    id: 4,
    title: "",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960910/header.jpg",
    genre: ["Sinematik","Hikayeli"],
    hours: 8.6,
    rating: 6,
    completion: 73,
    status: "not completed",
    lastPlayed: "2026-01-21",
    favorite: false,
    achievements: { earned: 10, total: 17 },
    review: "Don't trust your fbi boyfriend",
    tags: []
  },
];


# ÖĞRENİŞ – PROJE DURUMU

Son güncelleme: Aşama 1 sonu

## Ürün
1. sınıf (6-7 yaş) için Türkçe eğitsel oyun. Slogan: Oyna, keşfet, öğren!
Teknoloji: HTML, CSS, sade JavaScript, SVG, LocalStorage, PWA. Harici bağımlılık yok.
Yayın: GitHub Pages (kararlaştırıldı).

## Onaylı kararlar
- MVP oyunları: Fırıncı (matematik), Kelime Ormanı (Türkçe), Tren İstasyonu (karma).
- Sonraya: Yapı Ustası, Kayıp Hikâye, Hayvan Dostları, Keşif İskelesi.
- Kod düzeni: `import/export` yok, sade `<script>` dosyaları, tek global ad alanı.
- Öğrenme kaydı arayüzü Aşama 2'de kurulur, gelişmiş zorluk ayarı Aşama 9'da.
- Hata günlüğü uygulamaya eklenir (ekran görüntüsüyle hata ayıklamak için).
- Service Worker en sonda (Aşama 11), dosya yolları baştan göreli.

## Proje kuralları
- Görsel: tek sanat yönetimi, kaliteli mobil oyun seviyesi.
- Üç oyunun mekaniği birbirinden gerçekten farklı (dokun, sürükle, seç, keşfet).
- İçerik doğrulanabilir 1. sınıf kazanımlarına dayanır, uydurma müfredat yok, öğretmen kontrolüne açık.
- Her aşama sonunda çalışan sürümün yedeği alınır, çalışan özellikler bozulmaz.
- Android dikey öncelikli, büyük dokunma alanları, düşük donanımda performans.
- Çocuk cezalandırılmaz. Reklam, baskı, kaybetme korkusu, aşırı oyun süresi mekaniği yok.

## Görsel kimlik (Aşama 1)
- Çizgi rengi: #35506b (3 px, yuvarlak uçlu), yumuşak yer gölgeleri.
- Renkler: gökyüzü #7ccbff, çimen #6fcf7d, güneş sarısı #ffcf4a, turuncu #ff9b54, mercan #ff7a6b, krem #fff3d6.
- Yazı: ui-rounded / Nunito / Arial Rounded MT Bold / Trebuchet MS / system-ui, kalın ağırlık.
- Buton: krem, kalın çizgili, aşağı çöken gölge, en az 48 px.
- Ana ekran: 390x780 dikey SVG kasaba (ev, fırın, istasyon, orman, görev panosu, karakter).

## Aşama durumu
| Aşama | Durum |
|---|---|
| 0 Mimari | Tamamlandı |
| 1 Görsel kimlik ve ana ekran | Tamamlandı (kullanıcı onayı; telefonda performans testi Aşama 2'de) |
| 2 Çalışan temel uygulama | Bekliyor |
| 3-13 | Bekliyor |

## Açık notlar
- Gerçek Android cihazda akıcılık ve taşma henüz ölçülmedi.
- Müfredat kazanımları içerik aşamasında kaynakla doğrulanacak.

## Yedek
- Aşama 1: `ogrenis-ana-ekran.html` (tek dosya, önizleme).

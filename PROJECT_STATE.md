# ÖĞRENİŞ – PROJE DURUMU

Son güncelleme: Aşama 4 hazırlandı (test bekliyor)

## Ürün
1. sınıf (6-7 yaş) için Türkçe eğitsel oyun. Slogan: Oyna, keşfet, öğren!
Teknoloji: HTML, CSS, sade JavaScript, SVG, LocalStorage, PWA. Harici bağımlılık yok.
Yayın: GitHub Pages (kararlaştırıldı).

## Onaylı kararlar
- MVP oyunları: Fırıncı (matematik), Kelime Ormanı (Türkçe), Tren İstasyonu (karma).
- Sonraya: Yapı Ustası, Kayıp Hikâye, Hayvan Dostları, Keşif İskelesi.
- Dosya düzeni: klasör yok, düz yapı (telefondan yükleme için). Dosyalar `ogr-` ile başlar. İleride klasörlere taşınabilir.
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
| 1 Görsel kimlik ve ana ekran | Tamamlandı (onaylandı, Android'de açılışı kullanıcı doğruladı) |
| 2 Çalışan temel uygulama | Tamamlandı (Android'de test edildi) |
| 3 Karakter sistemi | Tamamlandı (kullanıcı onayı) |
| 4 Ana oyun dünyası | Test bekliyor |
| 5-13 | Bekliyor |

## Açık notlar
- Gerçek Android cihazda akıcılık ve taşma henüz ölçülmedi.
- Müfredat kazanımları içerik aşamasında kaynakla doğrulanacak.

## Dosyalar (Aşama 3, sürüm 0.4.0)
ogr-player.js, ogr-world.js (yürüme, keşif), ogr-garden.js (bahçe) eklendi. index.html, ogr-base.css, ogr-world.css, ogr-errors.js, ogr-state.js, ogr-audio.js, ogr-learning.js, ogr-nav.js, ogr-app.js
Yayın: newmetakids-halloya.github.io/ogrenis/
Karakter: 6 kategori (saç, saç rengi, cilt, kıyafet, yüz, süs), isim en fazla 10 harf, yalnızca cihazda. Dünya: dokunarak yürüme, 3 gizli parıltı (bir kez +1 yıldız), 6 parsellik bahçe (tohum, filiz, çiçek; bitkiler ölmez, ilk çiçekte +1 yıldız). Kayıt anahtarı: ogrenis_save (sürüm 1). Hata günlüğü: ogrenis_hatalar.

## Yedek
- Aşama 2 öncesi: `ogrenis-ana-ekran.html` depoda duruyor (silme).
- Aşama 1: `ogrenis-ana-ekran.html` (tek dosya, önizleme).

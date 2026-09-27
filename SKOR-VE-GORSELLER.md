# Skor bağlantısı ve onaylı görsel şablon

## Gerçek skor sağlayıcısı

Uluslar Ligi maçları ESPN skor servisinden `platform/score-provider.mjs` ile doğrudan çekilir. UEFA haber sayfası kazıması veya elle yazılmış maç sonuçları kullanılmaz. Ev/deplasman, tarih, durum ve skorlar sağlayıcının kayıtlarından gelir. Başlamamış maçın skor alanı 0–0 yapılmaz.

GitHub Pages sunucu çalıştırmadığı için veri alma işi mevcut GitHub Actions akışında `scripts/update-platform-data.mjs` tarafından yapılır. Sonuç `platform/current.json` dosyasına yazılır ve site bunu 60 saniyede bir okur. Böylece dış servisin tarayıcı erişim kısıtları sayfayı bozmaz. Mevcut iş akışının 5 dakikalık takvimi korunmuştur; GitHub/CDN gecikmesi olabilir.

Yerel önizleme için `node scripts/watch-platform-data.mjs` süreci 60 saniyede bir aynı skor servisini okur. Bu süreç durursa son alınan sonuçlar korunur. 5 dakikadan eski canlı gözlemler canlı diye sunulmaz. ESPN kamuya açık skor uç noktası anahtar gerektirmeden çalışmaktadır; erişimin veya biçimin değişmesine karşı hata durumunda son geçerli veri saklanır. Bu entegrasyonun ücretli SLA garantisi yoktur.

`updatedAt`, skor servisinin başarıyla okunduğu gözlem zamanıdır. Sağlayıcının olay güncelleme zamanı gibi sunulmaz; arayüzde “Son kontrol” denir. Dün/bugün/yarın Europe/Istanbul üzerinden ayrılır. “Dün” bağlantısı `/maclar/?gun=yesterday`.

Yerel çalışma GitHub'a henüz gönderilmemiştir. Yayında otomatik güncelleme yeni dosyalar depoya eklendiğinde mevcut workflow üzerinden çalışır; barındırma Cloudflare + GitHub Pages olarak kalır.

## Görseller

Onaylanan şablonun ana düzeni uygulanmıştır: fotoğraflı Hero + sağ turnuva kartı, 8 ikonlu erişim sırası, üç sütunlu maç bölümü, iki turnuva bölümü, yatay takvim, açık renk takım kartları, hikâyeler/veri alanı ve görselli arşiv.

Görseller yerleşik imagegen ile üretilmiş temsili çalışmalardır; gerçek maç fotoğrafı veya resmî kupa tasarımı iddiası taşımaz. İstemlerin tamamı `platform/images/prompts.json` içindedir.

- `platform/images/national-hero.png`: kırmızı formalı oyuncular, gece stadyumu, sol tarafta yazı alanı.
- `platform/images/gold-cup.png`: altın futbol kupası ve stadyum ışıkları.
- `platform/images/silver-cup.png`: gümüş turnuva kupası ve Londra atmosferi.

Sekiz hızlı erişim ikonu `platform/icons.mjs` içinde çizgi SVG olarak yer alır. Hikâyelerde uydurma haber veya resmî FIFA sıralaması eklenmemiştir. Turnuva sayısı doğrulanmış katalog kayıtlarıyla sınırlıdır.

Doğrulama: `node --test tests/*.test.mjs`

## Genişletilen arşiv ve bayraklar

Ana sayfa arşiv şeridi onaylı şablondaki sırayla beş kart içerir: 2026 Dünya Kupası, EURO 2024, 2022 Dünya Kupası, Copa América 2021, EURO 2020. Son dört organizasyonun tüm maçları ESPN skor servisinden alınmıştır: 51 + 64 + 28 + 51 = 194 maç. Her sayfada şampiyon, final, eleme turu sütunları ve tur filtreli maç listesi bulunur. Penaltı serileri maç skorundan ayrı gösterilir. 2026 arşivinin özgün verileri ve uygulaması korunur.

Ek görseller: `platform/images/euro-germany.png` ve `platform/images/copa-america.png`. Yerleşik imagegen ile oluşturuldu; istemler `platform/images/archive-prompts.json` dosyasında.

Tüm takım bayrakları Flagcdn/Flagpedia kaynağından yerel olarak alındı. `platform/flag-codes.json` eşlemeleri, `platform/flags/` PNG dosyaları ve `platform/flags.mjs` içinde tek istekle yüklenen gömülü kopyalar bulunur. İngiltere ve İskoçya kendi bayraklarını kullanır. Hem 48 takımlı kart listesi hem güncel ve arşiv maçlarındaki tüm ülke kodları için dosya kapsamı doğrulanır.

# Yıldız Kupası — kalıcı milli futbol platformu

## Yayın yapısı

Mevcut GitHub deposu: https://github.com/itechTR/yildizkupasi.com
Mevcut domain: https://yildizkupasi.com
26 Eylül 2026 kontrolü: domain Cloudflare üzerinden GitHub Pages yanıtı veriyor (`x-github-request-id`, `x-github-edge-region`). CNAME aynı domaini içeriyor. DNS ve yayın ayarları değiştirilmedi. GoDaddy taşıması veya Sites yayını yapılmadı.

Bu çalışma yerel kopyadadır; GitHub'a gönderilmesi canlı yayın değişikliğidir. Hazır dosyalar mevcut deponun kök yapısını korur. Sunucu uygulaması, npm kurulumu veya PHP gerekmez. GitHub Pages mevcut main/kök yayın ayarıyla kullanılabilir. `.nojekyll` korunmalıdır.

## Yerel önizleme

Proje klasöründe `python3 -m http.server 8080` çalıştırın, http://localhost:8080 adresini açın. Dosyayı çift tıklayarak açmak veri yüklemez. Site domain kökünde çalışacak şekilde hazırlanmıştır.

## Korunan 2026 sitesi

`turnuvalar/arsiv/2026-dunya-kupasi/` altında eski uygulamanın tüm assets ve data dosyaları birebir kopyadır. HTML'e yalnızca platforma dönüş navigasyonu ve arşiv başlığı eklendi. Final Merkezi, tur filtreleri, eleme ağacı ve tema düğmesi korunmuştur. 104 maç kayıtlıdır; eski arayüz eskisi gibi eleme maçlarını gösterir. Milli takım sayfaları grup maçlarını da mevcut veriden okur.

Eski kök `#final-center`, `#bracket`, `#matches` bağlantıları arşive aktarılır. `/turnuvalar/2026-dunya-kupasi/` kısa adresi de arşive yönlenir.

2026 maç sonuçları mevcut deponun verisidir; bu çalışma sonuçları bağımsız olarak yeniden doğrulamadı veya değiştirmedi. Eski güncelleyiciye 2026 bitiş koruması eklendi: sonraki Dünya Kupası sezonu 2026 verisini ezemez.

## Veri akışı ve otomatik davranış

- `platform/catalog.json`: doğrulanmış turnuva takvimi. `id`, `name`, `edition`, `startDate`, `endDate`, `major`, `priority`, `region`, `description`, `source` alanları.
- Turnuva `endDate` günü Türkiye saatiyle 23:59:59'a kadar aktiftir. Ertesi gün arşiv listesine otomatik geçer; verileri silinmez, adresi aynı kalır. `status: completed` erkenden tamamlanma, `status: cancelled` iptal için kullanılabilir.
- Hero sırası: güncel, önemli canlı maç → aktif büyük turnuva → başlangıç tarihi en yakın büyük turnuva → takvim.
- Canlı maç güncellemesi 5 dakikadan eskiyse canlı Hero ve canlı filtresinde gösterilmez. Günlük listede son skor varsa güncelliğinin doğrulanamadığı belirtilir.
- Bugün/yarın ve tarih geçişleri cihazın saat diliminden bağımsız olarak Europe/Istanbul kullanır.
- Tarayıcı görünürken JSON dosyalarını 60 saniyede bir yeniden okur. GitHub Pages/CDN önbelleği ve Actions zamanlaması gecikme ekleyebilir; saniyelik canlı skor garantisi yoktur.

### Güncel skor sağlayıcısı

ESPN Uluslar Ligi skor servisi bağlandı. Yerel önizleme ve GitHub Actions aynı veri dönüştürücüsünü kullanır. Kurulum, çalışma biçimi ve görsel değişiklikleri için `SKOR-VE-GORSELLER.md` dosyasına bakın.

Yeni organizasyonu katalog içine ekledikten sonra `node scripts/generate-platform-pages.mjs` çalıştırın ve üretilen sayfayı katalogla birlikte yayınlayın. Yeni organizasyon için uygun skor sağlayıcısı eşlemesi de gerekir.

## Kontroller

`node --test tests/model.test.mjs`

Tarih sınırları, Hero önceliği, eski canlı veri, İstanbul bugün/yarın ayrımı, bozuk veri reddi ve arşiv dosyalarının birebir korunması test edilir. Mobil 390px ve masaüstü önizlemede temel navigasyon, takım arama, takvim filtreleri ve arşiv final filtresi tarayıcıda kontrol edilmiştir.

## Kaynaklar

Takvim kayıtlarında UEFA kaynak bağlantıları saklanır ve turnuva sayfasında gösterilir. Uluslar Ligi kaydı yalnızca 24 Eylül–17 Kasım 2026 lig aşamasını kapsar; 2027 finalleri/diğer aşamalar ayrı kayıtlarla eklenebilir. EURO 2028 tarihleri UEFA kaynağına göre 9 Haziran–9 Temmuz 2028'dir. Doğrulanmamış 2030 tarihleri veya uydurma maç kayıtları eklenmemiştir.

# Yıldız Kupası

Yıldız Kupası, resmi marka kullanmadan çalışan bağımsız bir Dünya Kupası analiz ürünüdür.

## Ürün konumu

Bu site bir “resmi Dünya Kupası sitesi” değildir. Amaç ham skor kopyalamak değil, kamuya açık maç olgularını özgün analiz, grup hesaplama, günlük bülten ve turnuva zekâsı katmanıyla sunmaktır.

## Telif ve marka yaklaşımı

- Resmi FIFA logosu, maskotu, görseli veya yayıncı içeriği kullanılmaz.
- Site kendini bağımsız futbol bilgi ve analiz platformu olarak konumlandırır.
- Maç sonuçları ve skorlar olgusal bilgi olarak işlenir.
- Üçüncü taraf veri sağlayıcıların veri tabanları, sözleşmeleri ve kullanım şartları ihlal edilmemelidir.
- Canlı veri için yalnızca lisanslı veya kullanım şartları izin veren API kullanılmalıdır.

## Canlı veri

GitHub Actions dosyası `.github/workflows/update-live-data.yml` her 5 dakikada `scripts/update-live-data.mjs` dosyasını çalıştırır.

Gerekli secret örnekleri:

```text
SCORE_PROVIDER=football-data
FOOTBALL_DATA_TOKEN=xxx
```

Alternatif olarak kendi backend/proxy endpoint’iniz varsa:

```text
SCORE_PROVIDER=custom
CUSTOM_SCORE_URL=https://api.yildizkupasi.com/matches
```

## Yerel test

```bash
python3 -m http.server 8080
```

Sonra tarayıcıdan:

```text
http://localhost:8080
```

`file://` ile açmak bazı tarayıcılarda `fetch()` kısıtlarına takılır. Çünkü tarayıcılar bazen güvenlik adına hayatı daha da karmaşık hale getirmeyi sever.

## Yayın

Kök dizini GitHub Pages, Cloudflare Pages, Netlify veya herhangi bir statik hosting sağlayıcısına koyabilirsiniz.

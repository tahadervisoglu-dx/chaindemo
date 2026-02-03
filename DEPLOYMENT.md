# Vercel Deployment Rehberi

## Güvenlik Önlemleri ✅

✅ **API Key Güvenli**: OpenAI API key artık backend'de (serverless function) kullanılıyor
✅ **Frontend'de Gizli**: API key frontend kodunda görünmüyor
✅ **Environment Variables**: Vercel environment variables ile yönetiliyor

## Deployment Adımları

### 1. Vercel'e Deploy Et
```bash
# Vercel CLI ile (önerilen)
npm i -g vercel
vercel

# Veya GitHub ile otomatik deployment
```

### 2. Environment Variable Ekle
Vercel Dashboard'da:
1. Project Settings > Environment Variables
2. Yeni variable ekle:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `[BURAYA_OPENAI_API_KEY_YAZIN]`
   - **Environment**: Production, Preview, Development

### 3. Redeploy
Environment variable ekledikten sonra projeyi yeniden deploy et.

## API Endpoint

Artık AI insights şu endpoint üzerinden çalışıyor:
- **URL**: `/api/openai`
- **Method**: POST
- **Body**: `{ context, data, lang }`

## Güvenlik Avantajları

1. **API Key Gizli**: Sadece server-side'da kullanılıyor
2. **Rate Limiting**: Vercel otomatik rate limiting sağlıyor
3. **CORS Koruması**: API sadece kendi domain'den erişilebilir
4. **Environment Separation**: Production/development ayrı key'ler kullanabilir

## Test Etme

Deploy sonrası AI Insights butonuna tıklayarak test edin.
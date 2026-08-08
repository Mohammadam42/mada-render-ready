# مَدى — مكتبة الطلاب الرقمية

نسخة جاهزة للرفع إلى GitHub والنشر على Render كخدمة Node.js.

## تشغيل المشروع محليًا

```bash
npm ci
npm run dev
```

## رفعه إلى GitHub

1. أنشئ مستودعًا جديدًا وفارغًا في GitHub، مثل `mada-student-library`.
2. فك ضغط الحزمة، ثم افتح مجلد `mada-render-ready` في الطرفية.
3. نفّذ الأوامر التالية مع استبدال رابط المستودع برابطك:

```bash
git init
git add .
git commit -m "Initial Mada library website"
git branch -M main
git remote add origin https://github.com/USERNAME/mada-student-library.git
git push -u origin main
```

يمكنك بدل الطرفية رفع الملفات من واجهة GitHub، لكن لا ترفع ملف ZIP نفسه؛ ارفع الملفات والمجلدات الموجودة داخله.

## النشر على Render — الطريقة اليدوية

من لوحة Render اختر **New > Web Service**، ثم اربط مستودع GitHub وأدخل:

| الحقل | القيمة |
|---|---|
| Name | `mada-student-library` |
| Language / Runtime | `Node` |
| Branch | `main` |
| Region | `Frankfurt (EU Central)` |
| Root Directory | اتركه فارغًا |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm start` |
| Instance Type | `Free` |
| Health Check Path | `/` |

في **Environment Variables** أضف:

| Key | Value |
|---|---|
| `NODE_VERSION` | `22.17.0` |

لا تُضف متغير `PORT`؛ يوفّره Render تلقائيًا، والمشروع يقرأه مباشرة.

## النشر عبر Blueprint — الأسهل

لأن المستودع يحتوي على `render.yaml`، تستطيع من Render اختيار **New > Blueprint**، ثم ربط المستودع والموافقة على الإعدادات. سيُنشئ Render خدمة الويب بالقيم السابقة تلقائيًا.

## التحديثات اللاحقة

بعد نجاح النشر، كل `push` جديد إلى فرع `main` يعيد بناء الموقع ونشره تلقائيًا.

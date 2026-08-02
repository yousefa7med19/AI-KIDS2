# الخطوة الأولى: تشغيل Backend محليًا

## المطلوب

- تثبيت Node.js إصدار 18 أو أحدث.
- فتح المشروع في Visual Studio Code.

## الأوامر

افتح Terminal داخل VS Code ثم نفذ:

```bash
cd backend
npm install
```

أنشئ نسخة من ملف الإعدادات:

### Windows CMD

```cmd
copy .env.example .env
```

### PowerShell

```powershell
Copy-Item .env.example .env
```

شغّل الخادم:

```bash
npm run dev
```

يجب أن تظهر الرسالة:

```text
AI Kids API listening on http://localhost:5000
```

افتح هذا الرابط في المتصفح:

```text
http://localhost:5000/api/health
```

يجب أن تحصل على JSON يحتوي على:

```json
{
  "success": true,
  "message": "AI Kids API is running"
}
```

> لا تحتاج إلى إعداد MongoDB في هذه الخطوة. سنقوم بذلك في الخطوة الثانية.

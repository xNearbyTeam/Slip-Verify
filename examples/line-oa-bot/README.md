# 📱 SlipVerify LINE Official Account (LINE OA) Example

ตัวอย่างระบบ Webhook ตรวจสอบสลิปอัตโนมัติสำหรับ LINE Official Account ลูกค้าส่งรูปสลิปในแชท บอทจะตรวจสอบกับ SlipVerify API และตอบกลับผลลัพธ์ทันที

## 🚀 วิธีการใช้งาน

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. ตั้งค่าตัวแปรใน Environment หรือไฟล์ `index.js`:
```bash
LINE_CHANNEL_ACCESS_TOKEN="ใส่_ACCESS_TOKEN_จาก_LINE_DEVELOPERS"
LINE_CHANNEL_SECRET="ใส่_CHANNEL_SECRET_จาก_LINE_DEVELOPERS"
SLIPVERIFY_API_TOKEN="ใส่_API_TOKEN_จาก_SLIPVERIFY"
EXPECTED_RECEIVER_NAME="สมชาย ใจดี"
EXPECTED_BANK_CODE="KBANK"
EXPECTED_ACCOUNT_NO="346"
```

3. รัน Webhook Server:
```bash
npm start
```

4. นำ Webhook URL (เช่น `https://your-domain.com/webhook`) ไปใส่ใน **LINE Developers Console > Messaging API > Webhook settings** แล้วกด Verify

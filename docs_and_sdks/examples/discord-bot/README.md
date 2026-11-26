# 🤖 SlipVerify Discord Bot Example

ตัวอย่างบอท Discord สำหรับตรวจสลิปโอนเงินธนาคารอัตโนมัติ 100% พร้อมให้ยศ (Role) ลูกค้าทันทีที่สลิปถูกต้อง

## 🚀 วิธีการติดตั้งและรัน

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. ตั้งค่า Environment Variables หรือแก้ในไฟล์ `bot.js`:
```bash
DISCORD_BOT_TOKEN="ใส่_BOT_TOKEN_จาก_DISCORD_DEVELOPER_PORTAL"
SLIPVERIFY_API_TOKEN="ใส่_API_TOKEN_จาก_SLIPVERIFY"
EXPECTED_RECEIVER_NAME="สมชาย ใจดี"
EXPECTED_BANK_CODE="KBANK"
EXPECTED_ACCOUNT_NO="346"
```

3. เริ่มการทำงานของบอท:
```bash
npm start
```

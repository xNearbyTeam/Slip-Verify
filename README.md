# Slip-Verify API — Official SDKs & Examples

ระบบ API สำหรับตรวจสอบความถูกต้องของสลิปโอนเงินธนาคารไทย (Thai Bank Slip Verification) รองรับทั้งการส่ง **QR Payload (`v1`)** และ **อัปโหลดรูปภาพสลิป (`v2`)** พร้อมระบบตรวจสอบบัญชีผู้รับเงินอัตโนมัติ (Receiver Validation)

> 🌐 **Online Documentation:** https://docs.nearbyshop.xyz  
> 🔗 **Base API URL:** `https://api.nearbyshop.xyz`

---

## 📁 โครงสร้างภายใน Repository

```text
slip-verify-sdk/
├── sdks/
│   ├── nodejs/        # Node.js SDK + TypeScript definitions
│   ├── php/           # PHP SDK + ตัวอย่างการใช้งาน
│   └── python/        # Python SDK + ตัวอย่างการใช้งาน
├── examples/
│   ├── discord-bot/   # ตัวอย่างบอท Discord ตรวจสลิปอัตโนมัติ
│   └── line-oa-bot/   # ตัวอย่างบอท LINE OA ตรวจสลิป
├── postman/           # Postman Collection สำหรับทดสอบ API
└── web-demo/          # ตัวอย่างหน้าเว็บทดสอบอัปโหลดสลิป
```

---

## 🔐 การยืนยันตัวตน (Authentication)

ส่ง API Key หรือ Bearer Token ใน Header ทุก Request:

```http
Authorization: Bearer YOUR_API_KEY
```

---

## 🚀 Endpoints หลัก

### 1. ตรวจสอบสลิปด้วย QR Payload (`POST /slipVerify/v1`)
เหมาะสำหรับระบบที่สแกน QR Code จากฝั่ง Client/App แล้วส่งเฉพาะข้อความ QR Payload มาตรวจสอบ (รวดเร็วที่สุด)

**Request (`application/json` หรือ `multipart/form-data`):**
```json
{
  "qr_payload": "0041000600000101030040220...",
  "expected_account_no": "1234567890",
  "expected_name": "สมชาย ใจดี"
}
```
> *หมายเหตุ: `expected_account_no` และ `expected_name` เป็น optional สำหรับตรวจสอบผู้รับเงินปลายทาง*

### 2. ตรวจสอบสลิปด้วยรูปภาพ (`POST /slipVerify/v2`)
อัปโหลดไฟล์รูปภาพสลิปโดยตรง (`multipart/form-data`, field name: `slip`) ระบบจะอ่าน QR Code, ตรวจสอบความถูกต้องของรูปแบบ Mini-QR และยืนยันยอดเงินให้อัตโนมัติ

```bash
curl -X POST "https://api.nearbyshop.xyz/slipVerify/v2" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "slip=@/path/to/slip.jpg"
```

---

## ✅ ตัวอย่าง Response เมื่อสำเร็จ (`200 OK`)

```json
{
  "status": "success",
  "request_id": "a1b2c3d4",
  "data": {
    "trans_id": "2026112701234567890",
    "type": "TRANSFER",
    "amount": 500.0,
    "fee": 0.0,
    "date_time": "2026-11-27T12:30:00+07:00",
    "sender": {
      "name": "นาย ก",
      "bank": "ธนาคารกสิกรไทย",
      "bank_code": "004",
      "bank_abbr": "KBANK",
      "account_no": "xxx-x-x1234-x"
    },
    "receiver": {
      "name": "นาย ข",
      "bank": "ธนาคารไทยพาณิชย์",
      "bank_code": "014",
      "bank_abbr": "SCB",
      "details": {
        "account_no": "xxx-x-x5678-x"
      }
    }
  }
}
```

---

## ⚠️ รหัส Error มาตรฐาน

| HTTP Status | `code` | ความหมาย |
|---|---|---|
| `400` | `INVALID_QR_PAYLOAD` | รูปแบบ QR ไม่ถูกต้อง หรือไม่ใช่ QR สำหรับตรวจสอบสลิป |
| `400` | `SLIP_NOT_FOUND` | ไม่พบข้อมูลสลิปในระบบธนาคาร |
| `400` | `RECEIVER_MISMATCH` | บัญชี/ชื่อผู้รับเงินไม่ตรงกับที่กำหนดไว้ |
| `401` / `403` | `UNAUTHORIZED` / `FORBIDDEN` | API Key ไม่ถูกต้อง หรือไม่มีสิทธิ์ใช้งาน |
| `503` | `SERVICE_UNAVAILABLE` | ระบบตรวจสอบสลิปไม่พร้อมใช้งานชั่วคราว |
| `503` | `MAINTENANCE_MODE` | ระบบปิดปรับปรุงชั่วคราว |
| `504` | `UPSTREAM_TIMEOUT` | การเชื่อมต่อระบบธนาคารล่าช้า กรุณาลองใหม่อีกครั้ง |

---

## 📦 เริ่มต้นใช้งาน SDK

* **Node.js:** ดูตัวอย่างใน [`sdks/nodejs/`](./sdks/nodejs)
* **PHP:** ดูตัวอย่างใน [`sdks/php/`](./sdks/php)
* **Python:** ดูตัวอย่างใน [`sdks/python/`](./sdks/python)
* **Postman:** นำเข้าไฟล์ [`postman/SlipVerify_API.postman_collection.json`](./postman/SlipVerify_API.postman_collection.json)

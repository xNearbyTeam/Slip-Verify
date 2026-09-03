<div align="center">

# 🛡️ SlipVerify API — Thai Bank Slip Verification
### ระบบตรวจสอบสลิปธนาคารไทยอัตโนมัติ แม่นยำ รวดเร็ว พร้อม Client SDKs & Starter Kits

[![GitHub stars](https://img.shields.io/github/stars/xNearbyTeam/Slip-Verify?style=for-the-badge&color=6366f1)](https://github.com/xNearbyTeam/Slip-Verify/stargazers)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/VMr2pqukDX)
[![API Status](https://img.shields.io/badge/API-Online%20(99.9%25)-10B981?style=for-the-badge)](https://api.nearbyshop.xyz)
[![NodeJS](https://img.shields.io/badge/Node.js-SDK%20Available-339933?style=for-the-badge&logo=node.js&logoColor=white)](sdks/nodejs)
[![Python](https://img.shields.io/badge/Python-SDK%20Available-3776AB?style=for-the-badge&logo=python&logoColor=white)](sdks/python)
[![PHP](https://img.shields.io/badge/PHP-SDK%20Available-777BB4?style=for-the-badge&logo=php&logoColor=white)](sdks/php)

<br/>

[📖 ดูคู่มือ API ฉบับเต็ม (Docs)](https://api.nearbyshop.xyz) • [🔑 ขอรับ API Token (Discord)](https://discord.gg/VMr2pqukDX) • [🌐 เว็บไซต์หลัก](https://nearbyshop.xyz)

</div>

---

## 📌 สารบัญ (Table of Contents)
- [🌟 จุดเด่นของระบบ (Features)](#-จุดเด่นของระบบ-features)
- [📦 Client SDKs & Modules (พร้อมใช้ทันที)](#-client-sdks--modules-พร้อมใช้ทันที)
- [🌐 Web Demo & Starter Kits (ตัวอย่างโปรเจกต์)](#-web-demo--starter-kits-ตัวอย่างโปรเจกต์)
- [🏦 ธนาคารที่รองรับ (Supported Banks)](#-ธนาคารที่รองรับ-supported-banks)
- [🚀 ตัวอย่างการใช้งานด่วน (Quick Start)](#-ตัวอย่างการใช้งานด่วน-quick-start)
  - [1. POST /slipVerify/v2 (Auto OCR + Receiver Check) ⭐](#1-post-slipverifyv2-auto-ocr--receiver-check-)
  - [2. POST /slipVerify/v1 (รูปภาพ + จำนวนเงิน)](#2-post-slipverifyv1-รูปภาพ--จำนวนเงิน)
  - [3. POST /slipVerify/noSlip (QR Payload เท่านั้น — เร็วที่สุด)](#3-post-slipverifynoslip-qr-payload-เท่านั้น--เร็วที่สุด)
- [🛡️ ระบบตรวจสอบข้อมูลผู้รับเงิน (Receiver Validation)](#️-ระบบตรวจสอบข้อมูลผู้รับเงิน-receiver-validation)
- [📮 Postman Collection](#-postman-collection)
- [🔑 การยืนยันตัวตน (Authentication)](#-การยืนยันตัวตน-authentication)
- [🏷️ Keywords / SEO Tags](#️-keywords--tags)

---

## 🌟 จุดเด่นของระบบ (Features)

* ⚡ **ความเร็วสูงระดับ ~1.0 วินาที:** เชื่อมต่อตรงกับระบบธนาคาร พร้อมเทคโนโลยี Smart Caching ป้องกันการยิงซ้ำ
* 🤖 **AI Smart OCR:** สกัดยอดเงินอัตโนมัติจากสลิปโอนเงินทุกธนาคารในประเทศไทยอย่างแม่นยำ
* 🛡️ **Receiver Fraud Protection:** ตรวจสอบชื่อ-นามสกุล, รหัสธนาคาร และเลขบัญชีของผู้รับเงิน ป้องกันสลิปคนอื่นหรือโอนผิดบัญชี
* 🧩 **Multi-Scale Adaptive QR Reader:** ถอดรหัส QR Code ได้แม้รูปสลิปจะเบลอ, ย่อส่วน, หรือความละเอียดสูงระดับ 4K
* 🔒 **Anti-Replay & Anti-Spam:** บันทึก Transaction Hash ป้องกันการนำสลิปเก่ามาวนใช้ซ้ำ 100%

---

## 📦 Client SDKs & Modules (พร้อมใช้ทันที)

เราจัดเตรียม SDK สำเร็จรูปให้คุณนำไปติดตั้งและเรียกใช้ได้ใน **3 บรรทัด**:

| ภาษา | โฟลเดอร์ SDK | ตัวอย่างการเรียกใช้เบื้องต้น |
| :--- | :--- | :--- |
| **Node.js / TS** | [`sdks/nodejs/`](sdks/nodejs) | `const res = await verifier.verifyV2('slip.jpg', { expected_bank_code: 'KBANK' });` |
| **Python** | [`sdks/python/`](sdks/python) | `res = verifier.verify_v2('slip.jpg', expected_bank_code='KBANK')` |
| **PHP** | [`sdks/php/`](sdks/php) | `$res = $verifier->verifyV2('slip.jpg', ['expected_bank_code' => 'KBANK']);` |

---

## 🌐 Web Demo & Starter Kits (ตัวอย่างโปรเจกต์)

สามารถเปิดดูหรือ Clone ตัวอย่างโปรเจกต์สำเร็จรูปไปต่อยอดได้ทันที:

* 🌐 **[Web Demo UI (`web-demo/`)](web-demo):** หน้าเว็บ Dark Theme Minimal รองรับ Drag & Drop สลิป ตรวจสอบสดผ่านเบราว์เซอร์
* 🤖 **[Discord Bot Example (`examples/discord-bot/`)](examples/discord-bot):** บอท Discord ตรวจสลิปอัตโนมัติในแชท + แจก Role ลูกค้าทันที
* 📱 **[LINE OA Bot Example (`examples/line-oa-bot/`)](examples/line-oa-bot):** Webhook เชื่อมต่อ LINE Official Account ตรวจสลิปลูกค้าอัตโนมัติ

---

## 🏦 ธนาคารที่รองรับ (Supported Banks)

ระบบรองรับการตรวจสอบสลิปโอนเงินผ่าน PromptPay และธนาคารชั้นนำของไทยทุกแห่ง:

| รหัสธนาคาร (Bank Code) | ตัวย่อ (Abbreviation) | ชื่อธนาคาร (Bank Name) |
| :---: | :---: | :--- |
| `004` | **KBANK** | ธนาคารกสิกรไทย (Kasikornbank) |
| `014` | **SCB** | ธนาคารไทยพาณิชย์ (Siam Commercial Bank) |
| `002` | **BBL** | ธนาคารกรุงเทพ (Bangkok Bank) |
| `006` | **KTB** | ธนาคารกรุงไทย (Krungthai Bank) |
| `025` | **BAY** | ธนาคารกรุงศรีอยุธยา (Bank of Ayudhya) |
| `011` | **TTB** | ธนาคารทหารไทยธนชาต (TMBThanachart Bank) |
| `030` | **GSB** | ธนาคารออมสิน (Government Savings Bank) |
| `034` | **BAAC** | ธ.ก.ส. (Bank for Agriculture and Agricultural Cooperatives) |

---

## 🚀 ตัวอย่างการใช้งานด่วน (Quick Start)

### Base URL
```text
https://api.nearbyshop.xyz
```

---

### 1. `POST /slipVerify/v2` (Auto OCR + Receiver Check) ⭐

> **แนะนำที่สุด:** แนบเพียงรูปสลิปอย่างเดียว ระบบจะอ่าน QR Code, สกัดยอดเงิน และตรวจสอบผู้รับเงินให้อัตโนมัติ

#### 💻 cURL
```bash
curl -X POST https://api.nearbyshop.xyz/slipVerify/v2 \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "slip=@slip.jpg" \
  -F "expected_receiver_name=สมชาย ใจดี" \
  -F "expected_bank_code=KBANK" \
  -F "expected_account_no=346"
```

#### 🟩 Node.js (ใช้ SDK)
```javascript
const SlipVerifier = require('./sdks/nodejs/SlipVerifier');
const verifier = new SlipVerifier('YOUR_API_TOKEN');

const res = await verifier.verifyV2('slip.jpg', {
    expected_receiver_name: 'สมชาย ใจดี',
    expected_bank_code: 'KBANK',
    expected_account_no: '346'
});
console.log(res.data);
```

#### 🐍 Python (ใช้ SDK)
```python
from sdks.python.slip_verifier import SlipVerifier

verifier = SlipVerifier("YOUR_API_TOKEN")
res = verifier.verify_v2(
    slip="slip.jpg",
    expected_receiver_name="สมชาย ใจดี",
    expected_bank_code="KBANK",
    expected_account_no="346"
)
print(res["data"])
```

---

### 2. `POST /slipVerify/v1` (รูปภาพ + จำนวนเงิน)
```bash
curl -X POST https://api.nearbyshop.xyz/slipVerify/v1 \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "qr_img=@slip.jpg" \
  -F "amount=100.00" \
  -F "expected_bank_code=KBANK"
```

---

### 3. `POST /slipVerify/noSlip` (QR Payload เท่านั้น — เร็วที่สุด)
```bash
curl -X POST https://api.nearbyshop.xyz/slipVerify/noSlip \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "qr_payload=0046000600000101030040225202609031200000462385o94634ugqprde5102TH910404C7" \
  -F "amount=100.00" \
  -F "expected_account_no=346"
```

---

## 🛡️ ระบบตรวจสอบข้อมูลผู้รับเงิน (Receiver Validation)

| พารามิเตอร์ | รูปแบบที่รองรับ | ตัวอย่างค่าที่ส่งได้ |
| :--- | :--- | :--- |
| `expected_receiver_name` | ชื่อเต็ม, นามสกุล, ตัดคำนำหน้าอัตโนมัติ, รองรับสลิปที่ธนาคารย่อนามสกุล | `"สมชาย ใจดี"`, `"สมชาย"`, `"นาย สมชาย"` |
| `expected_bank_code` | Bank Code 3 หลัก หรือ ตัวย่อภาษาอังกฤษ (Case-insensitive) | `"004"`, `"KBANK"`, `"kbank"`, `"014"`, `"SCB"` |
| `expected_account_no` | เลขบัญชีเต็ม (มี/ไม่มีขีด) หรือเลขท้าย 4 ตัว | `"067-8-999346"`, `"0678999346"`, `"346"` |

---

## 📮 Postman Collection

ดาวน์โหลดไฟล์ [`postman/SlipVerify_API.postman_collection.json`](postman/SlipVerify_API.postman_collection.json) แล้ว Import เข้าโปรแกรม Postman เพื่อเริ่มทดสอบยิง API ได้ทันทีใน 1 คลิก!

---

## 🔑 การยืนยันตัวตน (Authentication)

ระบบใช้ **JWT (JSON Web Token)** ในการรักษาความปลอดภัย คุณสามารถรับ Token ได้ฟรีโดย:

1. เข้าร่วม [Discord Community](https://discord.gg/VMr2pqukDX)
2. สร้าง Ticket หรือขอรับ Token สำหรับ SlipVerify API
3. นำ Token มาใส่ใน Header: `Authorization: Bearer YOUR_API_TOKEN`

---

## 🏷️ Keywords / Tags

`slip-verify` `slip-verification` `thai-qr-promptpay` `promptpay-api` `bank-slip-verifier` `เช็คสลิป` `ตรวจสลิป` `สลิปปลอม` `เช็คสลิปโอนเงิน` `api-เช็คสลิป` `kbank-slip` `scb-slip` `slipok-alternative` `easyocr` `nodejs` `python` `php` `discord-bot`

---

<div align="center">
  <sub>Developed with ❤️ by <a href="https://nearbyshop.xyz">xNearbyTeam</a> • 2026</sub>
</div>

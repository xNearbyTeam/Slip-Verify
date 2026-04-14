# 🛡️ SlipVerify API (Beta)

ระบบตรวจสอบสลิปธนาคารอัตโนมัติที่รวดเร็ว แม่นยำ และ **ใช้งานฟรี!**

[![Discord](https://img.shields.io/badge/Discord-Join%20Server-7289da?logo=discord&logoColor=white)](https://discord.gg/VMr2pqukDX)

---

## 🌟 ทำไมต้องใช้ SlipVerify?

- ✅ **ใช้งานฟรี**: เราเปิดให้ทดสอบใช้งานได้ฟรีในช่วง Beta
- ⚡ **รวดเร็วที่สุด**: มีเทคโนโลยี Caching และการประมวลผลที่ปรับแต่งมาเพื่อความเร็วสูงสุด
- 🤖 **อัตโนมัติ 100%**: ไม่ต้องมานั่งเช็คยอดเอง ระบบจัดการให้ครบ
- 🔍 **แม่นยำ**: ใช้เทคโนโลยี OCR ระดับสูงเพื่อดึงข้อมูลจากรูปภาพสลิปอย่างแม่นยำ
- 🔒 **ปลอดภัย**: มาพร้อมระบบ JWT Authentication และการป้องกันการเรียกซ้ำ

---

## 🚀 วิธีการใช้งาน

คุณสามารถดูคู่มือการใช้งานฉบับเต็มได้ที่: 
👉 **[api.nearbyshop.xyz](https://api.nearbyshop.xyz)**

### ช่องทางการเข้าถึงระบบ:
- **API Endpoint**: [https://api.nearbyshop.xyz](https://api.nearbyshop.xyz)
- **Main Website**: [https://nearbyshop.xyz](https://nearbyshop.xyz)

---

## 🛠️ รายการ API ที่ให้บริการ

### 1. v1: ตรวจสอบแบบระบุจำนวนเงิน
- **เหมาะสำหรับ**: ระบบที่ต้องการความชัวร์โดยระบุยอดเงินเอง
- **สิ่งที่ต้องส่ง**: รูปภาพสลิป + จำนวนเงิน

### 2. v2: ตรวจสอบแบบอัตโนมัติ (OCR)
- **เหมาะสำหรับ**: ความสะดวกสบายสูงสุด
- **สิ่งที่ต้องส่ง**: รูปภาพสลิป (ระบบจะดึงจำนวนเงินให้เอง)

### 3. noSlip: ตรวจสอบผ่าน Payload (แนะนำ!)
- **เหมาะสำหรับ**: ระบบที่ต้องการความเร็วสูงสุดและประหยัด Bandwidth
- **สิ่งที่ต้องส่ง**: QR Payload + จำนวนเงิน (ไม่ต้องอัปโหลดไฟล์ภาพ)

---

## 🔑 วิธีขอรับ Token (เข้าใช้งาน)

เนื่องจากระบบอยู่ในช่วง Beta เราจึงจำกัดการเข้าใช้งานผ่านระบบ Token คุณสามารถขอรับ Token ได้ฟรีผ่านช่องทางดังนี้:

1. เข้าไปที่ **[Discord ของเรา](https://discord.gg/VMr2pqukDX)**
2. แจ้งความประสงค์ขอรับ API Token สำหรับ SlipVerify
3. เจ้าหน้าที่จะดำเนินการเปิดสิทธิ์และส่ง Token ให้คุณใช้งานทันที

---

## 🤝 สนับสนุนและติดต่อ
- **Website**: [nearbyshop.xyz](https://nearbyshop.xyz)
- **API Docs**: [api.nearbyshop.xyz](https://api.nearbyshop.xyz/slipVerify)
- **Discord**: [Join Server](https://discord.gg/VMr2pqukDX)

---
*Created by NearByShop Team*

const express = require('express');
const line = require('@line/bot-sdk');
const SlipVerifier = require('../../sdks/nodejs/SlipVerifier');

// ⚙️ Configuration
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || 'YOUR_CHANNEL_ACCESS_TOKEN',
    channelSecret: process.env.LINE_CHANNEL_SECRET || 'YOUR_CHANNEL_SECRET'
};

const SLIPVERIFY_TOKEN = process.env.SLIPVERIFY_API_TOKEN || 'YOUR_SLIPVERIFY_JWT_TOKEN';

// Expected Receiver Store Configuration
const EXPECTED_RECEIVER = {
    expected_receiver_name: process.env.EXPECTED_RECEIVER_NAME || 'สมชาย ใจดี',
    expected_bank_code: process.env.EXPECTED_BANK_CODE || 'KBANK',
    expected_account_no: process.env.EXPECTED_ACCOUNT_NO || '346'
};

const app = express();
const client = new line.Client(config);
const verifier = new SlipVerifier(SLIPVERIFY_TOKEN);

app.post('/webhook', line.middleware(config), async (req, res) => {
    try {
        const events = req.body.events;
        await Promise.all(events.map(handleEvent));
        res.status(200).send('OK');
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).end();
    }
});

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'image') {
        return Promise.resolve(null);
    }

    try {
        // 1. Download image stream from LINE Messaging API
        const stream = await client.getMessageContent(event.message.id);
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const imageBuffer = Buffer.concat(chunks);

        // 2. Verify with SlipVerifier API (v2 Auto OCR + Receiver Check)
        const result = await verifier.verifyV2(imageBuffer, EXPECTED_RECEIVER);
        const data = result.data;

        // 3. Reply to Customer
        const replyText = `✅ ตรวจสอบสลิปถูกต้องเรียบร้อยแล้วครับ!\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `💰 ยอดเงิน: ${Number(data.amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท\n` +
            `🕒 เวลา: ${new Date(data.date_time).toLocaleString('th-TH')}\n` +
            `👤 ผู้โอน: ${data.sender?.name || 'N/A'}\n` +
            `🎯 ผู้รับ: ${data.receiver?.name || 'N/A'} (${data.receiver?.bank_abbr || ''})\n` +
            `📄 Ref: ${data.trans_id}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `ระบบได้บันทึกยอดชำระของคุณเรียบร้อยแล้ว ขอบคุณครับ! 🙏`;

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: replyText
        });

    } catch (error) {
        console.error('❌ Slip verification error:', error.message);
        
        let errorMsg = `❌ การตรวจสอบสลิปไม่ผ่าน\nสาเหตุ: ${error.message || 'ข้อมูลในสลิปไม่ตรงกับเงื่อนไข'}`;
        if (error.code === 'RECEIVER_NAME_MISMATCH' || error.code === 'RECEIVER_BANK_MISMATCH') {
            errorMsg += `\n⚠️ กรุณาตรวจสอบบัญชีปลายทางและลองใหม่อีกครั้งครับ`;
        }

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: errorMsg
        });
    }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`📱 LINE OA Webhook is running on port ${PORT}`);
});

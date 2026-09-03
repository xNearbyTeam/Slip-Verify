const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const path = require('path');

// Import SlipVerifier from local SDK
const SlipVerifier = require('../../sdks/nodejs/SlipVerifier');

// ⚙️ Configuration
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'YOUR_DISCORD_BOT_TOKEN';
const SLIPVERIFY_API_TOKEN = process.env.SLIPVERIFY_API_TOKEN || 'YOUR_SLIPVERIFY_JWT_TOKEN';

// Expected Receiver Store Configuration
const EXPECTED_RECEIVER = {
    expected_receiver_name: process.env.EXPECTED_RECEIVER_NAME || 'สมชาย ใจดี',
    expected_bank_code: process.env.EXPECTED_BANK_CODE || 'KBANK',
    expected_account_no: process.env.EXPECTED_ACCOUNT_NO || '346'
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const verifier = new SlipVerifier(SLIPVERIFY_API_TOKEN);

client.once('ready', () => {
    console.log(`🤖 SlipVerify Discord Bot is ready! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if message has an image attachment
    const attachment = message.attachments.find(att => att.contentType && att.contentType.startsWith('image/'));
    if (!attachment) return;

    // Send Processing Indicator
    const processingMsg = await message.reply('⏳ กำลังตรวจสอบสลิปโอนเงินกับระบบธนาคาร...');

    try {
        // 1. Download slip image buffer from Discord CDN
        const imageRes = await axios.get(attachment.url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageRes.data);

        // 2. Verify with SlipVerifier API (v2 Auto OCR + Receiver Check)
        const result = await verifier.verifyV2(imageBuffer, EXPECTED_RECEIVER);
        const data = result.data;

        // 3. Build Success Embed
        const successEmbed = new EmbedBuilder()
            .setColor(0x10B981) // Emerald Green
            .setTitle('✅ ตรวจสอบสลิปถูกต้องสมบูรณ์ (Verified)')
            .setDescription(`ขอบคุณ **${message.author.username}** สำหรับการชำระเงิน`)
            .addFields(
                { name: '💰 ยอดเงิน', value: `**${Number(data.amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท**`, inline: true },
                { name: '🕒 เวลาทำรายการ', value: new Date(data.date_time).toLocaleString('th-TH'), inline: true },
                { name: '🏦 ธนาคารผู้โอน', value: `${data.sender?.name || 'N/A'}\n(${data.sender?.bank_abbr || ''} ${data.sender?.account_no || ''})`, inline: true },
                { name: '🎯 ธนาคารผู้รับ', value: `${data.receiver?.name || 'N/A'}\n(${data.receiver?.bank_abbr || ''} ${data.receiver?.details?.account_no || ''})`, inline: true },
                { name: '📄 Transaction Ref', value: `\`${data.trans_id}\``, inline: false }
            )
            .setFooter({ text: 'SlipVerify API • Automated Verification', iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        await processingMsg.edit({ content: null, embeds: [successEmbed] });

        // (Optional) Add VIP/Customer Role to the user
        // const role = message.guild.roles.cache.find(r => r.name === 'Customer');
        // if (role) await message.member.roles.add(role);

    } catch (error) {
        console.error('❌ Slip verification error:', error.message);

        const errorEmbed = new EmbedBuilder()
            .setColor(0xEF4444) // Red
            .setTitle('❌ การตรวจสอบสลิปไม่ผ่าน')
            .setDescription(error.message || 'ข้อมูลในสลิปไม่ตรงกับเงื่อนไขที่กำหนด')
            .addFields(
                { name: 'Error Code', value: `\`${error.code || 'REJECTED'}\``, inline: true }
            )
            .setFooter({ text: 'กรุณาตรวจสอบสลิปแล้วลองใหม่อีกครั้ง' });

        if (error.actual_receiver) {
            errorEmbed.addFields({
                name: 'ข้อมูลผู้รับในสลิป',
                value: `${error.actual_receiver.name} (${error.actual_receiver.bank_abbr || ''})\nเลขบัญชี: ${error.actual_receiver.details?.account_no || 'N/A'}`
            });
        }

        await processingMsg.edit({ content: null, embeds: [errorEmbed] });
    }
});

client.login(DISCORD_BOT_TOKEN);

const SlipVerifier = require('./SlipVerifier');

// 1. Initialize with your API Token
const verifier = new SlipVerifier('YOUR_JWT_API_TOKEN');

async function main() {
    try {
        console.log('🚀 Verifying bank slip with Auto OCR (v2)...');
        
        // 2. Call verifyV2 with image and optional receiver validation
        const result = await verifier.verifyV2('path/to/slip.jpg', {
            expected_receiver_name: 'สมชาย ใจดี',  // Optional: checks receiver name
            expected_bank_code: 'KBANK',          // Optional: checks receiver bank
            expected_account_no: '346'            // Optional: checks receiver account number
        });

        console.log('✅ Slip is Valid!');
        console.log(`Transaction ID : ${result.data.trans_id}`);
        console.log(`Amount         : ${result.data.amount} THB`);
        console.log(`Sender         : ${result.data.sender.name} (${result.data.sender.bank_abbr})`);
        console.log(`Receiver       : ${result.data.receiver.name} (${result.data.receiver.bank_abbr})`);
        console.log(`Account No     : ${result.data.receiver.details?.account_no}`);

    } catch (error) {
        console.error(`❌ Verification Failed [${error.code}]:`, error.message);
        if (error.actual_receiver) {
            console.error('Actual Receiver in Slip was:', error.actual_receiver);
        }
    }
}

main();

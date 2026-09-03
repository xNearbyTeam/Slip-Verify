<?php

require_once __DIR__ . '/SlipVerifier.php';

// 1. Initialize with your API Token
$verifier = new SlipVerifier("YOUR_JWT_API_TOKEN");

try {
    echo "🚀 Verifying bank slip with Auto OCR (v2)...\n";

    // 2. Call verifyV2 with image and receiver checks
    $result = $verifier->verifyV2("path/to/slip.jpg", [
        'expected_receiver_name' => 'สมชาย ใจดี', // Optional: checks receiver name
        'expected_bank_code'     => 'KBANK',       // Optional: checks receiver bank
        'expected_account_no'    => '346'         // Optional: checks receiver account number
    ]);

    $data = $result['data'];
    echo "✅ Slip is Valid!\n";
    echo "Transaction ID : " . $data['trans_id'] . "\n";
    echo "Amount         : " . $data['amount'] . " THB\n";
    echo "Sender         : " . $data['sender']['name'] . " (" . ($data['sender']['bank_abbr'] ?? 'N/A') . ")\n";
    echo "Receiver       : " . $data['receiver']['name'] . " (" . ($data['receiver']['bank_abbr'] ?? 'N/A') . ")\n";
    echo "Account No     : " . ($data['receiver']['details']['account_no'] ?? 'N/A') . "\n";

} catch (Exception $e) {
    echo "❌ Verification Failed: " . $e->getMessage() . "\n";
}

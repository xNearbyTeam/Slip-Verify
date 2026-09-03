<?php

/**
 * SlipVerifier - Official PHP Client for SlipVerify API
 * @website https://api.nearbyshop.xyz
 */
class SlipVerifier {
    private string $token;
    private string $baseUrl;
    private int $timeout;

    public function __construct(string $token, string $baseUrl = "https://api.nearbyshop.xyz", int $timeout = 45) {
        if (empty($token)) {
            throw new InvalidArgumentException("[SlipVerifier] API Token is required. Obtain one at https://discord.gg/VMr2pqukDX");
        }
        $this->token = preg_replace('/^Bearer\s+/i', '', trim($token));
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->timeout = $timeout;
    }

    /**
     * Verify a bank slip with Auto OCR (v2) - RECOMMENDED
     * 
     * @param string $filePath Full path to slip image
     * @param array $receiverOptions Optional receiver validation options ['expected_receiver_name' => '...', 'expected_bank_code' => '...', 'expected_account_no' => '...']
     * @return array Verification result decoded as array
     * @throws Exception On verification failure
     */
    public function verifyV2(string $filePath, array $receiverOptions = []): array {
        if (!file_exists($filePath)) {
            throw new InvalidArgumentException("[SlipVerifier] File not found: " . $filePath);
        }

        $postData = [
            'slip' => new CURLFile(realpath($filePath), mime_content_type($filePath), basename($filePath))
        ];

        foreach (['expected_receiver_name', 'expected_bank_code', 'expected_account_no'] as $key) {
            if (!empty($receiverOptions[$key])) {
                $postData[$key] = $receiverOptions[$key];
            }
        }

        return $this->sendRequest('/slipVerify/v2', $postData);
    }

    /**
     * Verify a bank slip with explicit amount (v1)
     */
    public function verifyV1(string $filePath, $amount, array $receiverOptions = []): array {
        if (!file_exists($filePath)) {
            throw new InvalidArgumentException("[SlipVerifier] File not found: " . $filePath);
        }

        $postData = [
            'qr_img' => new CURLFile(realpath($filePath), mime_content_type($filePath), basename($filePath)),
            'amount' => (string)$amount
        ];

        foreach (['expected_receiver_name', 'expected_bank_code', 'expected_account_no'] as $key) {
            if (!empty($receiverOptions[$key])) {
                $postData[$key] = $receiverOptions[$key];
            }
        }

        return $this->sendRequest('/slipVerify/v1', $postData);
    }

    /**
     * Verify via raw QR Payload string (Fastest)
     */
    public function verifyNoSlip(string $qrPayload, $amount, array $receiverOptions = []): array {
        $postData = [
            'qr_payload' => (string)$qrPayload,
            'amount'     => (string)$amount
        ];

        foreach (['expected_receiver_name', 'expected_bank_code', 'expected_account_no'] as $key) {
            if (!empty($receiverOptions[$key])) {
                $postData[$key] = $receiverOptions[$key];
            }
        }

        return $this->sendRequest('/slipVerify/noSlip', $postData);
    }

    private function sendRequest(string $endpoint, array $postData): array {
        $ch = curl_init($this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->token,
            'User-Agent: SlipVerify-PHPSDK/2.2.0'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error    = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new Exception("[SlipVerifier] cURL Error: " . $error);
        }

        $result = json_decode($response, true);
        if ($httpCode === 200 && isset($result['status']) && $result['status'] === 'success') {
            return $result;
        }

        $msg  = $result['message'] ?? 'Slip verification failed';
        $code = $result['code'] ?? 'HTTP_' . $httpCode;
        throw new Exception("[SlipVerifier] [{$code}] {$msg}", $httpCode);
    }
}

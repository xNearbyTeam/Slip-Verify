const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/**
 * SlipVerifier - Official Node.js Client for SlipVerify API
 * @website https://api.nearbyshop.xyz
 */
class SlipVerifier {
    /**
     * @param {string} token - Your JWT API Token from xNearbyTeam
     * @param {object} [options] - Configuration options
     * @param {string} [options.baseUrl='https://api.nearbyshop.xyz'] - Custom Base URL
     * @param {number} [options.timeout=45000] - Request timeout in milliseconds
     */
    constructor(token, options = {}) {
        if (!token) {
            throw new Error('[SlipVerifier] API Token is required. Obtain one at https://discord.gg/VMr2pqukDX');
        }
        this.token = token.replace(/^Bearer\s+/i, '');
        this.baseUrl = (options.baseUrl || 'https://api.nearbyshop.xyz').replace(/\/+$/, '');
        this.timeout = options.timeout || 45000;
    }

    /**
     * Helper to get request headers
     */
    _getHeaders(additionalHeaders = {}) {
        return {
            'Authorization': `Bearer ${this.token}`,
            'User-Agent': 'SlipVerify-NodeSDK/2.2.0',
            ...additionalHeaders
        };
    }

    /**
     * Verify a bank slip with Auto OCR (v2) - RECOMMENDED
     * @param {string|Buffer|fs.ReadStream} slip - File path, Buffer, or Stream of the slip image
     * @param {object} [receiverOptions] - Optional receiver validation rules
     * @param {string} [receiverOptions.expected_receiver_name] - Receiver Name (e.g. "สมชาย ใจดี")
     * @param {string} [receiverOptions.expected_bank_code] - Bank Code or Abbr (e.g. "004" or "KBANK")
     * @param {string} [receiverOptions.expected_account_no] - Full account number or last 4 digits (e.g. "346" or "067-8-999346")
     * @returns {Promise<object>} Verification result
     */
    async verifyV2(slip, receiverOptions = {}) {
        const form = new FormData();

        if (typeof slip === 'string') {
            if (!fs.existsSync(slip)) {
                throw new Error(`[SlipVerifier] File not found: ${slip}`);
            }
            form.append('slip', fs.createReadStream(slip));
        } else if (Buffer.isBuffer(slip)) {
            form.append('slip', slip, { filename: 'slip.jpg', contentType: 'image/jpeg' });
        } else {
            form.append('slip', slip);
        }

        if (receiverOptions.expected_receiver_name) {
            form.append('expected_receiver_name', receiverOptions.expected_receiver_name);
        }
        if (receiverOptions.expected_bank_code) {
            form.append('expected_bank_code', receiverOptions.expected_bank_code);
        }
        if (receiverOptions.expected_account_no) {
            form.append('expected_account_no', receiverOptions.expected_account_no);
        }

        try {
            const response = await axios.post(`${this.baseUrl}/slipVerify/v2`, form, {
                headers: this._getHeaders(form.getHeaders()),
                timeout: this.timeout
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Verify a bank slip with explicit amount (v1)
     * @param {string|Buffer|fs.ReadStream} slip - Slip image file path or Buffer
     * @param {number|string} amount - Expected amount (e.g. 100.00)
     * @param {object} [receiverOptions] - Optional receiver validation rules
     * @returns {Promise<object>} Verification result
     */
    async verifyV1(slip, amount, receiverOptions = {}) {
        if (amount === undefined || amount === null) {
            throw new Error('[SlipVerifier] Amount is required for verifyV1()');
        }

        const form = new FormData();
        if (typeof slip === 'string') {
            form.append('qr_img', fs.createReadStream(slip));
        } else if (Buffer.isBuffer(slip)) {
            form.append('qr_img', slip, { filename: 'slip.jpg', contentType: 'image/jpeg' });
        } else {
            form.append('qr_img', slip);
        }

        form.append('amount', String(amount));

        if (receiverOptions.expected_receiver_name) {
            form.append('expected_receiver_name', receiverOptions.expected_receiver_name);
        }
        if (receiverOptions.expected_bank_code) {
            form.append('expected_bank_code', receiverOptions.expected_bank_code);
        }
        if (receiverOptions.expected_account_no) {
            form.append('expected_account_no', receiverOptions.expected_account_no);
        }

        try {
            const response = await axios.post(`${this.baseUrl}/slipVerify/v1`, form, {
                headers: this._getHeaders(form.getHeaders()),
                timeout: this.timeout
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Verify via raw QR Payload string without uploading an image (Fastest)
     * @param {string} qrPayload - Raw QR payload string (e.g. "00460006000001...")
     * @param {number|string} amount - Expected transfer amount
     * @param {object} [receiverOptions] - Optional receiver validation rules
     * @returns {Promise<object>} Verification result
     */
    async verifyNoSlip(qrPayload, amount, receiverOptions = {}) {
        if (!qrPayload || amount === undefined) {
            throw new Error('[SlipVerifier] qrPayload and amount are required for verifyNoSlip()');
        }

        const data = {
            qr_payload: String(qrPayload),
            amount: String(amount),
            ...receiverOptions
        };

        try {
            const response = await axios.post(`${this.baseUrl}/slipVerify/noSlip`, data, {
                headers: this._getHeaders({ 'Content-Type': 'application/json' }),
                timeout: this.timeout
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Internal error formatting helper
     */
    _handleError(error) {
        if (error.response && error.response.data) {
            const errData = error.response.data;
            const err = new Error(errData.message || 'Slip verification failed');
            err.code = errData.code || `HTTP_${error.response.status}`;
            err.status = error.response.status;
            err.actual_receiver = errData.actual_receiver;
            err.response = error.response;
            throw err;
        }
        throw error;
    }
}

module.exports = SlipVerifier;

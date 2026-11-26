import { ReadStream } from 'fs';

export interface ReceiverValidationOptions {
    /** Expected receiver name (e.g. "สมชาย ใจดี" or "สมชาย") */
    expected_receiver_name?: string;
    /** Expected bank code or abbreviation (e.g. "004" or "KBANK") */
    expected_bank_code?: string;
    /** Expected full account number or last 4 digits (e.g. "346" or "067-8-999346") */
    expected_account_no?: string;
}

export interface BankAccountDetails {
    account_no?: string;
    [key: string]: any;
}

export interface BankParty {
    name: string;
    bank?: string;
    bank_name_th?: string;
    bank_name_en?: string;
    bank_code?: string;
    bank_abbr?: string;
    account_no?: string;
    details?: BankAccountDetails;
}

export interface SlipData {
    trans_id: string;
    type?: string;
    amount: number;
    date_time: string;
    sender: BankParty;
    receiver: BankParty;
}

export interface VerifySuccessResponse {
    status: 'success';
    data: SlipData;
    extracted_amount?: number;
}

export interface VerifyErrorResponse {
    status: 'error';
    code?: 'RECEIVER_NAME_MISMATCH' | 'RECEIVER_BANK_MISMATCH' | 'RECEIVER_ACCOUNT_MISMATCH' | string;
    message: string;
    actual_receiver?: BankParty;
}

export interface SlipVerifierOptions {
    /** Custom API base URL (Default: "https://api.nearbyshop.xyz") */
    baseUrl?: string;
    /** Timeout in milliseconds (Default: 45000) */
    timeout?: number;
}

export declare class SlipVerifier {
    constructor(token: string, options?: SlipVerifierOptions);

    /**
     * Verify a bank slip using Auto OCR (v2) - Recommended
     */
    verifyV2(
        slip: string | Buffer | ReadStream,
        receiverOptions?: ReceiverValidationOptions
    ): Promise<VerifySuccessResponse>;

    /**
     * Verify a bank slip with explicit amount (v1)
     */
    verifyV1(
        slip: string | Buffer | ReadStream,
        amount: number | string,
        receiverOptions?: ReceiverValidationOptions
    ): Promise<VerifySuccessResponse>;

    /**
     * Verify via raw QR Payload string without uploading an image (Fastest)
     */
    verifyNoSlip(
        qrPayload: string,
        amount: number | string,
        receiverOptions?: ReceiverValidationOptions
    ): Promise<VerifySuccessResponse>;
}

export default SlipVerifier;

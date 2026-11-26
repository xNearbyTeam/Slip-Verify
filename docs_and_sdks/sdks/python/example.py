from slip_verifier import SlipVerifier, SlipVerifyError

# 1. Initialize with your API Token
verifier = SlipVerifier("YOUR_JWT_API_TOKEN")

def main():
    try:
        print("🚀 Verifying bank slip with Auto OCR (v2)...")

        # 2. Call verify_v2 with optional receiver check
        result = verifier.verify_v2(
            slip="path/to/slip.jpg",
            expected_receiver_name="สมชาย ใจดี",  # Optional: checks receiver name
            expected_bank_code="KBANK",          # Optional: checks receiver bank
            expected_account_no="346"            # Optional: checks receiver account number
        )

        data = result["data"]
        print("✅ Slip is Valid!")
        print(f"Transaction ID : {data['trans_id']}")
        print(f"Amount         : {data['amount']} THB")
        print(f"Sender         : {data['sender']['name']} ({data['sender'].get('bank_abbr')})")
        print(f"Receiver       : {data['receiver']['name']} ({data['receiver'].get('bank_abbr')})")
        print(f"Account No     : {data['receiver'].get('details', {}).get('account_no')}")

    except SlipVerifyError as err:
        print(f"❌ Verification Failed [{err.code}]: {err}")
        if err.actual_receiver:
            print(f"Actual Receiver: {err.actual_receiver}")
    except Exception as e:
        print(f"❌ System Error: {e}")

if __name__ == "__main__":
    main()

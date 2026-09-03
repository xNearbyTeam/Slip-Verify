import requests
from typing import Optional, Dict, Any, Union
from pathlib import Path


class SlipVerifyError(Exception):
    """Custom exception raised when slip verification fails"""
    def __init__(self, message: str, code: Optional[str] = None, status_code: Optional[int] = None, actual_receiver: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.code = code
        self.status_code = status_code
        self.actual_receiver = actual_receiver


class SlipVerifier:
    """Official Python SDK for SlipVerify API (https://api.nearbyshop.xyz)"""

    def __init__(self, token: str, base_url: str = "https://api.nearbyshop.xyz", timeout: int = 45):
        """
        Initialize the SlipVerifier client.
        
        :param token: Your JWT API Token from xNearbyTeam
        :param base_url: Custom API Base URL (Default: https://api.nearbyshop.xyz)
        :param timeout: Request timeout in seconds (Default: 45)
        """
        if not token:
            raise ValueError("[SlipVerifier] API Token is required. Obtain one at https://discord.gg/VMr2pqukDX")
        
        self.token = token.replace("Bearer ", "").strip()
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    @property
    def _headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.token}",
            "User-Agent": "SlipVerify-PythonSDK/2.2.0"
        }

    def verify_v2(
        self,
        slip: Union[str, Path, bytes],
        expected_receiver_name: Optional[str] = None,
        expected_bank_code: Optional[str] = None,
        expected_account_no: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Verify bank slip with Auto OCR (v2) - RECOMMENDED
        
        :param slip: Path to image file, Path object, or raw image bytes
        :param expected_receiver_name: Expected receiver name (e.g. 'สมชาย ใจดี')
        :param expected_bank_code: Expected bank code or abbr (e.g. '004' or 'KBANK')
        :param expected_account_no: Expected account number (e.g. '346' or '067-8-999346')
        :return: JSON response dictionary
        """
        data = {}
        if expected_receiver_name:
            data["expected_receiver_name"] = expected_receiver_name
        if expected_bank_code:
            data["expected_bank_code"] = expected_bank_code
        if expected_account_no:
            data["expected_account_no"] = expected_account_no

        files = {}
        if isinstance(slip, (str, Path)):
            slip_path = Path(slip)
            if not slip_path.exists():
                raise FileNotFoundError(f"[SlipVerifier] File not found: {slip_path}")
            files["slip"] = (slip_path.name, open(slip_path, "rb"), "image/jpeg")
        elif isinstance(slip, bytes):
            files["slip"] = ("slip.jpg", slip, "image/jpeg")
        else:
            files["slip"] = slip

        try:
            res = requests.post(
                f"{self.base_url}/slipVerify/v2",
                headers=self._headers,
                data=data,
                files=files,
                timeout=self.timeout
            )
            return self._handle_response(res)
        finally:
            if isinstance(slip, (str, Path)) and "slip" in files:
                files["slip"][1].close()

    def verify_v1(
        self,
        slip: Union[str, Path, bytes],
        amount: Union[float, int, str],
        expected_receiver_name: Optional[str] = None,
        expected_bank_code: Optional[str] = None,
        expected_account_no: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Verify bank slip with explicit amount (v1)
        """
        data = {"amount": str(amount)}
        if expected_receiver_name:
            data["expected_receiver_name"] = expected_receiver_name
        if expected_bank_code:
            data["expected_bank_code"] = expected_bank_code
        if expected_account_no:
            data["expected_account_no"] = expected_account_no

        files = {}
        if isinstance(slip, (str, Path)):
            files["qr_img"] = (Path(slip).name, open(slip, "rb"), "image/jpeg")
        elif isinstance(slip, bytes):
            files["qr_img"] = ("slip.jpg", slip, "image/jpeg")
        else:
            files["qr_img"] = slip

        try:
            res = requests.post(
                f"{self.base_url}/slipVerify/v1",
                headers=self._headers,
                data=data,
                files=files,
                timeout=self.timeout
            )
            return self._handle_response(res)
        finally:
            if isinstance(slip, (str, Path)) and "qr_img" in files:
                files["qr_img"][1].close()

    def verify_no_slip(
        self,
        qr_payload: str,
        amount: Union[float, int, str],
        expected_receiver_name: Optional[str] = None,
        expected_bank_code: Optional[str] = None,
        expected_account_no: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Verify via raw QR Payload string without uploading an image (Fastest)
        """
        data = {
            "qr_payload": str(qr_payload),
            "amount": str(amount)
        }
        if expected_receiver_name:
            data["expected_receiver_name"] = expected_receiver_name
        if expected_bank_code:
            data["expected_bank_code"] = expected_bank_code
        if expected_account_no:
            data["expected_account_no"] = expected_account_no

        res = requests.post(
            f"{self.base_url}/slipVerify/noSlip",
            headers=self._headers,
            json=data,
            timeout=self.timeout
        )
        return self._handle_response(res)

    def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
        try:
            result = response.json()
        except Exception:
            response.raise_for_status()
            raise SlipVerifyError(f"Invalid server response (Status: {response.status_code})", status_code=response.status_code)

        if response.status_code == 200 and result.get("status") == "success":
            return result
        
        raise SlipVerifyError(
            message=result.get("message", "Slip verification failed"),
            code=result.get("code", f"HTTP_{response.status_code}"),
            status_code=response.status_code,
            actual_receiver=result.get("actual_receiver")
        )

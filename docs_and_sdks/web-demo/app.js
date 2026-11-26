document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const dropzonePrompt = document.getElementById('dropzone-prompt');
    const previewWrapper = document.getElementById('preview-wrapper');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-btn');
    const verifyBtn = document.getElementById('verify-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const resultCard = document.getElementById('result-card');

    // Option inputs
    const optReceiverName = document.getElementById('opt-receiver-name');
    const optBankCode = document.getElementById('opt-bank-code');
    const optAccountNo = document.getElementById('opt-account-no');

    // Settings Modal
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const cfgBaseUrl = document.getElementById('cfg-base-url');
    const cfgToken = document.getElementById('cfg-token');

    let currentFile = null;

    // Load Saved Settings from localStorage
    const savedBaseUrl = localStorage.getItem('slip_verify_base_url') || 'https://api.nearbyshop.xyz';
    const savedToken = localStorage.getItem('slip_verify_token') || '';
    cfgBaseUrl.value = savedBaseUrl;
    cfgToken.value = savedToken;

    // Settings Modal Handlers
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', () => {
        localStorage.setItem('slip_verify_base_url', cfgBaseUrl.value.trim());
        localStorage.setItem('slip_verify_token', cfgToken.value.trim());
        settingsModal.style.display = 'none';
        alert('✅ บันทึกการตั้งค่าเรียบร้อยแล้ว');
    });

    // File Selection & Drag & Drop
    dropzone.addEventListener('click', (e) => {
        if (e.target !== removeBtn) {
            fileInput.click();
        }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetFile();
    });

    function handleFile(file) {
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            dropzonePrompt.style.display = 'none';
            previewWrapper.style.display = 'block';
            verifyBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    function resetFile() {
        currentFile = null;
        fileInput.value = '';
        imagePreview.src = '';
        dropzonePrompt.style.display = 'block';
        previewWrapper.style.display = 'none';
        verifyBtn.disabled = true;
        resultCard.style.display = 'none';
    }

    // Verify Button Click Handler
    verifyBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        const token = localStorage.getItem('slip_verify_token') || cfgToken.value.trim();
        const baseUrl = (localStorage.getItem('slip_verify_base_url') || cfgBaseUrl.value.trim()).replace(/\/+$/, '');

        if (!token) {
            settingsModal.style.display = 'flex';
            alert('⚠️ กรุณาระบุ API Token ก่อนเริ่มการตรวจสอบ');
            return;
        }

        // Set Loading State
        verifyBtn.disabled = true;
        btnText.textContent = '⏳ กำลังตรวจสอบกับธนาคาร...';
        btnLoader.style.display = 'inline-block';
        resultCard.style.display = 'none';

        const formData = new FormData();
        formData.append('slip', currentFile);

        if (optReceiverName.value.trim()) {
            formData.append('expected_receiver_name', optReceiverName.value.trim());
        }
        if (optBankCode.value.trim()) {
            formData.append('expected_bank_code', optBankCode.value.trim());
        }
        if (optAccountNo.value.trim()) {
            formData.append('expected_account_no', optAccountNo.value.trim());
        }

        try {
            const response = await fetch(`${baseUrl}/slipVerify/v2`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                renderSuccess(result.data);
            } else {
                renderError(result);
            }
        } catch (error) {
            renderError({
                code: 'NETWORK_ERROR',
                message: `ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ API ได้ (${error.message})`
            });
        } finally {
            verifyBtn.disabled = false;
            btnText.textContent = '🔍 ตรวจสอบสลิปทันที';
            btnLoader.style.display = 'none';
        }
    });

    function renderSuccess(data) {
        resultCard.innerHTML = `
            <div class="result-status success">
                <div class="result-status-icon">✓</div>
                <div>
                    <h3 style="margin:0; font-size:1.05rem;">สลิปถูกต้องสมบูรณ์ (Verified)</h3>
                    <p style="margin:0; font-size:0.82rem; opacity:0.85;">ยืนยันข้อมูลและยอดเงินตรงกับระบบธนาคารเรียบร้อย</p>
                </div>
            </div>

            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">ยอดเงินที่โอน</div>
                    <div class="detail-value amount">${Number(data.amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">เวลาที่ทำรายการ</div>
                    <div class="detail-value">${new Date(data.date_time).toLocaleString('th-TH')}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">ผู้โอนเงิน (Sender)</div>
                    <div class="detail-value">${data.sender?.name || 'N/A'}</div>
                    <small style="color:var(--text-muted);">${data.sender?.bank_abbr || ''} ${data.sender?.account_no || ''}</small>
                </div>
                <div class="detail-item">
                    <div class="detail-label">ผู้รับเงิน (Receiver)</div>
                    <div class="detail-value">${data.receiver?.name || 'N/A'}</div>
                    <small style="color:var(--text-muted);">${data.receiver?.bank_abbr || ''} ${data.receiver?.details?.account_no || ''}</small>
                </div>
            </div>

            <div style="margin-top:1rem; font-size:0.75rem; color:var(--text-muted); text-align:center;">
                Ref ID: <code>${data.trans_id}</code>
            </div>
        `;
        resultCard.style.display = 'block';
    }

    function renderError(result) {
        resultCard.innerHTML = `
            <div class="result-status error">
                <div class="result-status-icon">✕</div>
                <div>
                    <h3 style="margin:0; font-size:1.05rem;">การตรวจสอบไม่ผ่าน (${result.code || 'REJECTED'})</h3>
                    <p style="margin:0; font-size:0.85rem; opacity:0.9;">${result.message || 'ข้อมูลในสลิปไม่ตรงกับเงื่อนไขที่ระบุ'}</p>
                </div>
            </div>
            ${result.actual_receiver ? `
                <div class="detail-item" style="margin-top:1rem;">
                    <div class="detail-label">ข้อมูลผู้รับจริงในสลิป</div>
                    <div class="detail-value">${result.actual_receiver.name} (${result.actual_receiver.bank_abbr || ''})</div>
                    <small style="color:var(--text-muted); font-family:var(--font-mono);">เลขบัญชี: ${result.actual_receiver.details?.account_no || 'N/A'}</small>
                </div>
            ` : ''}
        `;
        resultCard.style.display = 'block';
    }
});

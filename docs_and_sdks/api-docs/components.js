const sidebarContent = `
    <a href="index.html" class="logo">
        <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
        </div>
        <h2>xNearby <span>APIs</span></h2>
    </a>

    <nav class="nav-menu">
        <div class="nav-group">
            <h3>ภาพรวม (Overview)</h3>
            <ul>
                <li><a href="index.html#introduction" class="nav-link" id="nav-intro">แนะนำระบบ</a></li>
                <li><a href="index.html#services" class="nav-link" id="nav-services">บริการทั้งหมด (Catalog)</a></li>
                <li><a href="index.html#authentication" class="nav-link" id="nav-auth">การยืนยันตัวตน (API Key)</a></li>
                <li><a href="index.html#global-errors" class="nav-link" id="nav-global-errors">รหัส HTTP ทั่วไป (Errors)</a></li>
            </ul>
        </div>

        <div class="nav-group">
            <h3>Slip Verification API 🧾</h3>
            <ul>
                <li>
                    <a href="slip-verify.html#verify-v2" class="nav-link" id="nav-v2">
                        <span class="badge post">POST</span> /slipVerify/v2 <span class="badge recommended" style="margin-left:auto; font-size:0.6rem;">AUTO</span>
                    </a>
                </li>
                <li>
                    <a href="slip-verify.html#verify-v1" class="nav-link" id="nav-v1">
                        <span class="badge post">POST</span> /slipVerify/v1
                    </a>
                </li>
                <li>
                    <a href="slip-verify.html#receiver-validation" class="nav-link" id="nav-receiver">
                        🛡️ ตรวจสอบผู้รับเงิน
                    </a>
                </li>
                <li>
                    <a href="slip-verify.html#slip-errors" class="nav-link" id="nav-slip-errors">
                        ⚠️ Error Codes สลิป
                    </a>
                </li>
            </ul>
        </div>

        <div class="nav-group">
            <h3>TrueMoney Wallet API 🎁</h3>
            <ul>
                <li>
                    <a href="truemoney.html#tmn-verify" class="nav-link" id="nav-tmn-verify">
                        <span class="badge post">POST</span> /tmn/verify
                    </a>
                </li>
                <li>
                    <a href="truemoney.html#tmn-redeem" class="nav-link" id="nav-tmn-redeem">
                        <span class="badge post">POST</span> /tmn/redeem
                    </a>
                </li>
                <li>
                    <a href="truemoney.html#tmn-errors" class="nav-link" id="nav-tmn-errors">
                        ⚠️ Error Codes ซอง
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav-group">
            <h3>บริการอื่นๆ ในอนาคต</h3>
            <ul>
                <li><a href="#" class="nav-link muted">API เติมเกม (Coming Soon)</a></li>
                <li><a href="#" class="nav-link muted">API โซเชียลมีเดีย (Coming Soon)</a></li>
            </ul>
        </div>
    </nav>
    <div class="sidebar-footer">
        <a href="https://nearbyshop.xyz/developer" target="_blank" class="discord-btn-sidebar" style="background: var(--primary); border-color: var(--primary-light); color: #fff; margin-bottom: 8px; font-weight: 600;">
            🔑 ขอรับ API Key (nearbyshop.xyz)
        </a>
        <a href="https://discord.gg/VMr2pqukDX" target="_blank" class="discord-btn-sidebar">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.747 11.747 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 20.01 20.01 0 0 0 6.022-3.044.077.077 0 0 0 .033-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
            </svg>
            แจ้งปัญหา / เข้าร่วมคอมมู
        </a>
        <p>v2.3.0 &bull; Live & Online</p>
    </div>
`;

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.innerHTML = sidebarContent;
        highlightActiveLink();
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref || linkHref === '#') return;
        
        const linkPath = linkHref.split('#')[0];
        const linkHash = linkHref.includes('#') ? '#' + linkHref.split('#')[1] : '';

        link.classList.remove('active');

        if (linkPath === currentPath) {
            if (currentHash === linkHash) {
                link.classList.add('active');
            } else if (!currentHash && !linkHash) {
                link.classList.add('active');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initSidebar);
window.addEventListener('hashchange', highlightActiveLink);

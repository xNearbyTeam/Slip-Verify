document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Syntax Highlighting
    if (window.hljs) {
        hljs.highlightAll();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleMenu() {
        if (!sidebar) return;
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // 3. Tab Switching Logic (cURL, Node.js, Python, PHP)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const parent = btn.closest('.grid-right') || btn.closest('.doc-section') || document;
            
            // Remove active from sibling buttons & contents
            const container = btn.closest('.request-tabs') || parent;
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Activate selected tab
            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 4. One-Click Copy Code Button
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-clipboard');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                const originalText = btn.textContent;
                btn.textContent = '✓ Copied!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // 5. Smooth Scrolling & Active Nav Highlight on Scroll
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href') || '';
                if (href.endsWith(`#${current}`)) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }
    });

    // 6. Close sidebar on mobile when clicking a nav link
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link') && window.innerWidth <= 1024) {
            if (sidebar && sidebar.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

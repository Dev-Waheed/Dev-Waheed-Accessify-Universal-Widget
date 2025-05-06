(function() {
    // Create and inject styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary: #6366f1;
        }

        .widget-toggle {
            position: fixed;
            bottom: 24px;
            left: calc(100vw - 64px);
            background: linear-gradient(
                to right,
                #006be6,
                #0260dd,
                #0555d4,
                #0749cb,
                #093ec2
            );
            color: white;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 99999;
            transition: transform 0.2s;
        }

        .widget-toggle:hover {
            transform: translateY(-2px);
        }

        .custom-widget-frame {
            position: fixed;
            bottom: 10px;
            right: 0px;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            border: none;
            border-radius: 12px;
            z-index: 99998;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            background-color: transparent !important;
            overflow: initial !important;
        }

        .custom-widget-frame.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .widget-toggle {
                bottom: 20px;
                left: calc(100vw - 56px);
            }
        }
    `;
    document.head.appendChild(style);

    // Create toggle button
    const toggleButton = document.createElement('div');
    toggleButton.className = 'widget-toggle';
    toggleButton.title = 'Accessibility Menu';
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'custom-widget-frame';
    iframe.title = 'Yashfa Widget';
    iframe.name = 'yashfa-widget';
    iframe.src = 'YOUR_WIDGET_URL_HERE'; // Replace with your widget URL
    iframe.allowFullscreen = true;

    // Add elements to body
    document.body.appendChild(toggleButton);
    document.body.appendChild(iframe);

    // Event listeners
    toggleButton.addEventListener('click', toggleWidget);

    // Message listener
    window.addEventListener('message', (event) => {
        // Verify the origin matches your widget's origin
        if (event.origin !== new URL(iframe.src).origin) return;

        if (event.data.action === 'close') {
            iframe.classList.remove('active');
        }
    });

    // Toggle function
    function toggleWidget() {
        iframe.classList.toggle('active');
        
        // Send message to iframe when opening
        if (iframe.classList.contains('active')) {
            iframe.contentWindow.postMessage(
                { action: 'open', data: 'widget' },
                new URL(iframe.src).origin
            );
        }
    }

    // Prevent multiple instances
    if (!window.widgetLoaded) {
        window.widgetLoaded = true;
    } else {
        console.warn('Widget already loaded');
        toggleButton.remove();
        iframe.remove();
        style.remove();
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qr-form');
    const input = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const qrImage = document.getElementById('qr-image');
    const downloadBtn = document.getElementById('download-btn');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text = input.value.trim();
        if (!text) return;

        // Reset UI state
        resultContainer.hidden = true;
        errorMessage.hidden = true;
        loading.hidden = false;
        generateBtn.disabled = true;

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate QR code');
            }

            // Display QR code
            qrImage.src = data.qrCodeDataUrl;
            downloadBtn.href = data.qrCodeDataUrl;
            
            // Show result
            loading.hidden = true;
            resultContainer.hidden = false;
        } catch (error) {
            loading.hidden = true;
            errorMessage.textContent = error.message;
            errorMessage.hidden = false;
        } finally {
            generateBtn.disabled = false;
        }
    });

    // Auto-select text on focus
    input.addEventListener('focus', function() {
        this.select();
    });
});

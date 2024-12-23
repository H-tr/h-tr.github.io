// Function to initialize code blocks with copy functionality
function initializeCodeBlocks() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    
    // Process each code block
    codeBlocks.forEach((pre) => {
        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        
        // Add copy functionality
        copyButton.addEventListener('click', async () => {
            const code = pre.textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        
        // Insert the pre element into wrapper and add copy button
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeCodeBlocks();
});
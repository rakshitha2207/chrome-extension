document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inputForm');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const pdfFile = document.getElementById('pdfDocFile').files[0];
        const formURL = document.getElementById('formURL').value;

        if (!formURL) {
            statusDiv.textContent = 'Please provide the form URL.';
            return;
        }

        // Extract text from PDF file
        if (pdfFile) {
            extractTextFromPDF(pdfFile)
                .then(text => {
                    console.log('Text from PDF:', text);
                    // Use the extracted text to fill form fields or answer questions

                    // Send form URL and extracted answers to background script
                    chrome.runtime.sendMessage({
                        type: 'form_data',
                        formURL: formURL,
                        pdfText: text,
                        docxText: null // Since we are not using DOCX file, pass null
                    }, function (response) {
                        if (response && response.success) {
                            statusDiv.textContent = 'Form URL and answers submitted successfully.';
                        } else {
                            statusDiv.textContent = 'Failed to submit form URL and answers.';
                        }
                    });
                })
                .catch(error => {
                    console.error('Error extracting text from PDF:', error);
                    statusDiv.textContent = 'Error extracting text from PDF. Please try again.';
                });
        } else {
            statusDiv.textContent = 'Please select a PDF file.';
        }
    });
});

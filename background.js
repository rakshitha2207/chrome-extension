// background.js

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extracted_questions_fields') {
        const questionsAndFields = message.data;
        console.log('Extracted questions and fields:', questionsAndFields);
        // Process the extracted questions and fields as needed

        // Send a response acknowledging the receipt of data
        sendResponse({ success: true });
    }
});

// Background script to handle extension functionality
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

// Handle error cases
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'error') {
        console.error('Error occurred:', message.error);
        // Optionally, handle the error here or display an error notification
        // For demonstration, let's display an error notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png', // Path to your extension's icon
            title: 'Error',
            message: message.error,
        });
    }
});

// Handle completion notification
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'completion') {
        console.log('Form filling completed.');
        // Display completion notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png', // Path to your extension's icon
            title: 'Form Filling Completed',
            message: 'All relevant fields on the form have been successfully filled.',
        });
    }
});

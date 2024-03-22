// Function to extract questions and form fields
function extractQuestionsAndFields() {
    try {
        const questionsAndFields = [];

        // Modify the selector to match the structure of the form on the webpage
        const questionElements = document.querySelectorAll('.question'); // Example selector

        console.log('Question elements:', questionElements);

        if (!questionElements || questionElements.length === 0) {
            throw new Error('No questions found on the page.');
        }

        questionElements.forEach(questionElement => {
            const question = questionElement.textContent.trim();
            let field = null;

            // Example logic to find the corresponding form field
            const nextInputElement = questionElement.nextElementSibling;
            if (nextInputElement && nextInputElement.tagName.toLowerCase() === 'input') {
                field = {
                    type: 'text', // Example type, replace with actual type detection logic
                    element: nextInputElement
                };
            }

            if (question && field) {
                questionsAndFields.push({ question, field });
            }
        });

        if (questionsAndFields.length === 0) {
            throw new Error('No fields found corresponding to questions.');
        }

        return { success: true, data: questionsAndFields };
    } catch (error) {
        console.error('Error extracting questions and fields:', error);
        return { success: false, error: error.message };
    }
}

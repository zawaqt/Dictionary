
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const wordInput = document.getElementById('word-input');
    const resultContainer = document.getElementById('result-container');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const word = wordInput.value.trim();

        if (!word) {
            return; 
        }

       
        resultContainer.innerHTML = '<p>Loading...</p>';

        try {
           
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            
            if (!response.ok) {
               
                throw new Error('Word not found. Please check your spelling.');
            }

            const data = await response.json();
            displayResults(data);

        } catch (error) {
           
            displayError(error.message);
        }
    });

    function displayResults(data) {
        resultContainer.innerHTML = ''; 

        const wordData = data[0];

        const header = document.createElement('div');
        header.innerHTML = `<h2>${wordData.word}</h2>`;
        if (wordData.phonetic) {
            const phonetic = document.createElement('p');
            phonetic.className = 'phonetic';
            phonetic.textContent = wordData.phonetic;
            header.appendChild(phonetic);
        }
        resultContainer.appendChild(header);

        wordData.meanings.forEach(meaning => {
            const partOfSpeechContainer = document.createElement('div');
            partOfSpeechContainer.className = 'part-of-speech';

            const partOfSpeech = document.createElement('h3');
            partOfSpeech.textContent = meaning.partOfSpeech;
            partOfSpeechContainer.appendChild(partOfSpeech);

            const definitionsList = document.createElement('ol');
            definitionsList.className = 'definitions';

            meaning.definitions.forEach(def => {
                const listItem = document.createElement('li');
                listItem.textContent = def.definition;
                definitionsList.appendChild(listItem);
            });

            partOfSpeechContainer.appendChild(definitionsList);
            resultContainer.appendChild(partOfSpeechContainer);
        });
    }

    function displayError(message) {
        resultContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
});
document.getElementById('toUpperCase').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.toUpperCase();
    updateStats();
});

document.getElementById('toLowerCase').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.toLowerCase();
    updateStats();
});

document.getElementById('capitalizeWords').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.replace(/\b\w/g, char => char.toUpperCase());
    updateStats();
});

document.getElementById('reverseText').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.split('').reverse().join('');
    updateStats();
});

document.getElementById('removeExtraSpaces').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.replace(/\s+/g, ' ').trim();
    updateStats();
});

document.getElementById('removePunctuation').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    document.getElementById('textInput').value = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    updateStats();
});

document.getElementById('generateLorem').addEventListener('click', function() {
    const randomText = faker.lorem.paragraph();
    document.getElementById('textInput').value = randomText;
    updateStats();
});

document.getElementById('textInput').addEventListener('input', updateStats);

function updateStats() {
    let text = document.getElementById('textInput').value;
    document.getElementById('charCount').innerText = text.length;
    document.getElementById('charCountNoSpaces').innerText = text.replace(/\s+/g, '').length;
    document.getElementById('spaceCount').innerText = (text.match(/\s/g) || []).length;
    document.getElementById('specialCharCount').innerText = (text.match(/[^\w\s]/g) || []).length;
    document.getElementById('wordCount').innerText = (text.match(/\b\w+\b/g) || []).length;
    document.getElementById('sentenceCount').innerText = (text.match(/[\w|\)][.?!](\s|$)/g) || []).length;
    document.getElementById('paragraphCount').innerText = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    document.getElementById('readingTime').innerText = Math.ceil((text.match(/\b\w+\b/g) || []).length / 200) + " sec";
    document.getElementById('speakingTime').innerText = Math.ceil((text.match(/\b\w+\b/g) || []).length / 150) + " sec";

    let frequency = countLetterFrequency(text);
    updateLetterFrequency(frequency);
    let topLetters = getTopLetters(frequency);
    updateTopLetters(topLetters);
    let topWords = countTopWords(text);
    updateTopWords(topWords);
}

function countLetterFrequency(text) {
    const letters = text.toUpperCase().replace(/[^A-Z]/g, '');
    const frequency = {};
    for (const letter of letters) {
        frequency[letter] = (frequency[letter] || 0) + 1;
    }
    return frequency;
}

function updateLetterFrequency(frequency) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letterFrequency = document.getElementById('letterFrequency');
    letterFrequency.innerHTML = '';
    for (const letter of letters) {
        const count = frequency[letter] || 0;
        letterFrequency.innerHTML += `<div class="letter-row"><span>${letter}: ${count}</span></div>`;
    }
}

function getTopLetters(frequency) {
    return Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 5);
}

function updateTopLetters(topLetters) {
    for (let i = 0; i < 5; i++) {
        const letter = topLetters[i] ? `${topLetters[i][0]}: ${topLetters[i][1]}` : 'N/A';
        document.getElementById(`topLetter${i + 1}`).innerText = letter;
    }
}

function countTopWords(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency = {};
    for (const word of words) {
        frequency[word] = (frequency[word] || 0) + 1;
    }
    return Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 5);
}

function updateTopWords(topWords) {
    for (let i = 0; i < 5; i++) {
        const word = topWords[i] ? `${topWords[i][0]}: ${topWords[i][1]}` : 'N/A';
        document.getElementById(`topWord${i + 1}`).innerText = word;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});

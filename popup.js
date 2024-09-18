document.getElementById('ask').addEventListener('click', async () => {
    const query = document.getElementById('query').value;
    
    if (query) {
        const responseDiv = document.getElementById('response');
        responseDiv.textContent = 'Memproses...';

        try {
            const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyBbu1kfpwVmeJg9TrieVxruvjHJcQk9n_8`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document: {
                        type: 'PLAIN_TEXT',
                        content: query,
                    },
                    encodingType: 'UTF8',
                }),
            });

            const data = await response.json();
            if (response.ok) {
                responseDiv.textContent = `Sentiment score: ${data.documentSentiment.score}`;
            } else {
                responseDiv.textContent = `Error: ${data.error.message}`;
            }
        } catch (error) {
            responseDiv.textContent = 'Terjadi kesalahan.';
            console.error(error);
        }
    } else {
        document.getElementById('response').textContent = 'Masukkan pertanyaan.';
    }
});

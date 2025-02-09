// const { API_URL } = require("../../utils/constant");
const shortenBtn = document.getElementById('shortenBtn');
const urlInput = document.getElementById('urlInput');
const shortenedUrl = document.getElementById('shortenedUrl');
const shortURLCopy = document.getElementById('shortURLCopy');

const API_URL = 'http://localhost:8000'



shortenBtn.addEventListener('click', async () => {
  const longUrl = urlInput.value;
  console.log('long URL',longUrl);
  
  try {
    const response = await fetch(`${API_URL}/url`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ url: longUrl }) 
    });

    const data = await response.json();
    console.log('response',data);
    
    const newLink = `${API_URL}/url/${data.id}`

    shortURLCopy.textContent = `Your ShortID is : ${data.id}`;
    shortenedUrl.textContent = newLink;
    // shortenedUrl.href = newLink;

  } catch (error) {
    console.error('Error shortening URL:', error);
    shortURLCopy.textContent = 'Error shortening URL.';
  }
});


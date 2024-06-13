// Toggle navigation on mobile
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('showing');
});

// Smooth scroll to sections
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to generate image from text using OpenAI API
async function generateImageFromText(text) {
    try {
        const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image. Please try again later.');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.image_url;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Handle generate button click
document.getElementById('generate-btn').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value.trim();
    const loading = document.getElementById('loading');
    const imageResult = document.getElementById('image-result');
    const generatedImage = document.getElementById('generated-image');

    // Validate input
    if (!textInput) {
        alert("Please enter some text.");
        return;
    }

    // Show loading screen
    loading.style.display = 'block';
    imageResult.style.display = 'none';

    try {
        const imageUrl = await generateImageFromText(textInput);
        generatedImage.src = imageUrl;
        imageResult.style.display = 'block';
    } catch (error) {
        alert(error.message);
    } finally {
        loading.style.display = 'none';
    }
});


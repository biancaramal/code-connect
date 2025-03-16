const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
  inputUpload.click();
});

function readContentFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve({url: reader.result, name: file.name});
        }

        reader.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`);
        }

        reader.readAsDataURL(file);
    });
};

const imagePrincipal = document.querySelector('.main-image');
const imageName = document.querySelector('.container-image-name');

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if(file){
        try {
            const contentFile = await readContentFile(file);
            imagePrincipal.src = contentFile.url;
            imageName.textContent = contentFile.name;
        } catch(error) {
            console.error('Erro na leitura do arquivo.'); 
        }
    }
});

const inputTags = document.getElementById('input-tags');
const listTags = document.querySelector('.list-tags');

inputTags.addEventListener('keypress', (event) => {  
    if(event.key === 'Enter') {
        event.preventDefault();

        const tagText = inputTags.value.trim();

        if(tagText !== '') {
            const newTag = document.createElement('li');
            newTag.innerHTML = `<p>${tagText}</p> <img src="img/close-black.svg" alt="Fechar" class="remove-tag">`;

            listTags.appendChild(newTag);
            inputTags.value = '';
        }
    }
});

listTags.addEventListener('click', (event) => {
    if(event.target.classList.contains('remove-tag')) {
        const tag = event.target.parentElement;
        tag.remove(tag);
    }
});


const acceptedTags = ['Front-end', 'Programação', 'Data Science', 'Fullstack', 'HTML', 'CSS', 'JavaScript'];

async function checkAvailableTags(tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(acceptedTags.includes(tagText));
        }, 1000);
    });
}
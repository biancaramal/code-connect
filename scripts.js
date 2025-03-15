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


const Image = {

    postPicture: async function(imageUrl: string){
        const freeImageHostAPIKey = '6d207e02198a847aa98d0a2a901485a5';

        await fetch('https://freeimage.host/api/1/upload', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: freeImageHostAPIKey,
                action: 'upload',
                source: imageUrl,
                format: 'json'
            }),
        }).then((value) => console.log(value));
    }

   
};

export default Image;
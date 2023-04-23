const ImageService = {

    

    /**
     * Returns image url through callBackFunction 
     */
    postPictureToImgur: async function(base64Image: any, callBackFunction: Function, errorCallBackFunction: Function){
        const data = {
        image: base64Image,
        type: "base64",
        };

        try{
        const response = await fetch('https://api.imgur.com/3/image/', {
            method: 'POST',
            headers: {
                'Authorization': 'Client-ID 09abb43c84f7b52',
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const responseData = await response.json();
            if (responseData.success) {
                const imageUrl = responseData.data.link;
                callBackFunction(imageUrl);
            } else {
                errorCallBackFunction(responseData.data.error);
            }
        }
        catch(error)
        {
        console.log(error.message);
        }
    },

    postPicture: async function(imageUrl: string){
        const freeImageHostAPIKey = '6d207e02198a847aa98d0a2a901485a5';

        const data = new FormData();
        data.append('key', freeImageHostAPIKey);
        data.append('action', 'upload');
        data.append('source', imageUrl);
        data.append('format', 'json');


        await fetch('https://freeimage.host/api/1/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data,
        }).then((value) => console.log("response: " + JSON.stringify(value)));
    },
    // const uploadImage = (file, callback) => {
    //     const formData = new FormData();
    //     formData.append('image', file);
      
    //     axios.post('https://freeimage.host/api/1/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     .then(response => {
    //       callback(response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   };

   
};

export default ImageService;
import { imgurConfig } from "../imgurConfig";

const ImageService = {
  /**
   * Returns image url through callBackFunction
   */
  postPictureToImgur: async function (
    base64Image: any,
    callBackFunction: Function,
    errorCallBackFunction: Function
  ) {
    const data = {
      image: base64Image,
      type: "base64",
    };

    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Authorization: "Client-ID " + imgurConfig.clientId,
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
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default ImageService;

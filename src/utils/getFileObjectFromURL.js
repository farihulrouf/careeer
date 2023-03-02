const getFileObjectFromURL = (url) => {
  return new Promise((resolve, reject) => {
    try {
      var myRequest = new Request(url);
      fetch(myRequest)
        .then((response) => response.blob())
        .then((myBlob) => {
          var reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(myBlob);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export default getFileObjectFromURL;

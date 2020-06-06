import Adapter from './Adapter';

export class CustomUpload extends Adapter {
  /**
   * Create a Cloudinary unsigned image upload adapter
   * @param  {string} url The upload url
   * @param  {any} loader Object used in loading the image
   * @param  {any} requestHeader Any headers you may wish to include in the request
   */
  constructor(url, loader, imgResponseParameter = 'image_url', requestHeader = {}) {
    super(url, loader);
    this.headers = requestHeader;
    this.imageUrlParameter = imgResponseParameter;
  }

  _setHeader() {
    const keys = Object.keys(this.headers);

    keys.forEach((key) => {
      this.xhr.setRequestHeader(key, this.headers[key]);
    });
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const fd = new FormData();
          this.xhr.open('POST', this.url, true);
          this._setHeader();

          // Hookup an event listener to update the upload progress bar
          this.xhr.upload.addEventListener('progress', (e) => {
            this.loader.uploadTotal = 100;
            this.loader.uploaded = Math.round((e.loaded * 100) / e.total);
          });

          // Hookup a listener to listen for when the request state changes
          this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4 && this.xhr.status === 201) {
              // Successful upload, resolve the promise with the new image
              const response = JSON.parse(this.xhr.responseText);

              if (!response[this.imageUrlParameter]) {
                throw new Error(`Could not find '${this.imageUrlParameter}' in the response.`);
              }
              let images = {
                default: response[this.imageUrlParameter],
              };

              resolve(images);
            } else if (this.xhr.status !== 201) {
              // Unsuccessful request, reject the promise
              reject('Upload failed');
            }
          };

          // Setup the form data to be sent in the request
          fd.append('image', file);
          this.xhr.send(fd);
        }),
    );
  }
}

### Constructor

Each class has it's own constructor

#### CustomUpload

The constructor accepts two arguments and returns a new instance of the adapter. Typically, you would call this constructor from a factory function that creates the upload adapter for the editor.

| Parameters | Type   | Description | Example |
|------------|--------|-------------|---------|
| url        | string | The upload url | "https://upload-api/images" |
| loader     | Object    | The loader is a parameter provided by the ckeditor which contains things like the `file`, `total upload size`, `uploaded`. | N/A |
| imgResponseParameter _optional_ | string | The name of the response parameter where the image url is located. Defaults to 'image_url' | 'url' |
| requestHeaders _optional_ | object | This parameter contains header contents you may wish to add | { 'Authorization': 'xxxxxxxxxxxxxxxx' }

#### CloudinaryUnsigned

| Parameters | Type   | Description | Example |
|------------|--------|-------------|---------|
| loader     | Object    | The loader is a parameter provided by the ckeditor which contains things like the `file`, `total upload size`, `uploaded`. | N/A |
| cloudName  | string | This is the cloud name gotten from your cloudinary dashboard | 'MyCloud' |
| unsignedUploadPreset | string | This is the upload preset you created on cloudinary using [these steps](https://support.cloudinary.com/hc/en-us/articles/360004967272-Upload-Preset-Configuration) | 'MyPreset' |
| sizes _optional_    | number[] or object | An array of numbers or an object of sizes with their named transformation. It helps ckeditor with responsive images. | [ 160, 500, 1000 ] or {160: 't_image_xs', 500: 't_image_md'} |


### Methods

Each class has the same methods

**upload**: This is a function called when an image has been dropped in the editor. It would upload the image to your specified location and respond with a promise that is resolved if the request succeeds. The resolved promise would also return the image's new location. If the image upload fails, the promise is rejected. This function also hooks up to the event that listens for the upload progress and feeds this data back to the editor to be displayed.
_This method takes no arguments_

**abort**: This is a function that aborts the XMLHttpRequest that is uploading the image if the upload promise is rejected or some error occurs.
_This method takes no arguments_

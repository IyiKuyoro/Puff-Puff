## Puff-Puff

This package is custom image upload adapter for a rich text editor. It makes use of XHR under the hood in uploading images to your preferred web app.

### Getting Started

Currently, this package offers two upload adapters for [CKEditor5](https://ckeditor.com/ckeditor-5/). Below are instructions for using each.

#### Custom Uploads

If you wish to upload the embedded images to a custom web app, all you need to provide is the upload url and other request headers that you may have.

- Install puff-puff using `npm i --save puff-puff`
- Import the **CustomUpload** adapter into the file where you setup your editor using `import { CustomUpload } from 'puff-puff/CKEditor';`
- After installing the package, you would need to setup a factory function that creates the adapter that would be added to your editor's config object. [(Please review this doc on how to setup your editor)](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/overview.html). Below is a sample function that demonstrates that. Keep in mind that depending on the frontend library or framework you use, where you place the function below may defer. The url of the uploaded image in this case will be in the response body of the <upload_url> post request as 'image_url'
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CustomUpload( <upload_url>, loader);
  };
}
```
- If you wish to use a custom parameter name for the image url in your response body, add a third parameter to the constructor like so.
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CustomUpload( <upload_url>, loader, 'url');
  };
}
```
- Finally, add the plugin to your extra plugins array in the config object.
- If your upload endpoint is expecting some headers, you can include them as a fourth parameter in the constructor
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CustomUpload( <upload_url>, loader, '', <headers_object>);
  };
}
```

#### Cloudinary Uploads

If you wish to upload the embedded images to Cloudinary, you will need a cloud name and an unsigned upload preset.

- Setup your cloudinary upload preset by following the steps [here](https://support.cloudinary.com/hc/en-us/articles/360004967272-Upload-Preset-Configuration). You do not need any addons except you wish to add them.
- Install puff-puff using `npm i puff-puff`
- Importing the **CloudinaryUnsigned** upload adapter `import { CloudinaryUnsigned } from 'puff-puff/CKEditor';`
- After installing the package, you would need to setup a factory function that creates the adapter that would be added to your editor's config object. [(Please review this doc on how to setup your editor)](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/overview.html). Below is a sample function that demonstrates that. Keep in mind that depending on the frontend library or framework you use, where you place the function below may defer.
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CloudinaryUnsigned( loader, '<your_cloud_name>', '<your_unsigned_upload_preset>', [ 160, 500, 1000, 1052 ]);
  };
}
```
- Finally, add the plugin to your extra plugins array in the config object.
- To add responsive image support, add an array of image sizes you wish to use as the fourth parameter of the constructor. **Please note that you may have to use the editor to display the rich text content for reading and ensure it is not editable to see the effect of the responsive images when you resize your window.**
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CloudinaryImageUploadAdapter(
      loader,
      '<your_cloud_name>',
      '<your_unsigned_upload_preset>',
      [ 160, 500, 1000, 1052 ]
     );
  };
}
```

### Class Documentation

- [CKEditor Adapters](https://github.com/IyiKuyoro/Puff-Puff/blob/master/src/CKEditor/README.md)

### Contributors

_Opeoluwa Iyi-Kuyoro_: 👨🏿[Profile](https://github.com/IyiKuyoro) - [WebSite](https://iyikuyoro.dev)

## Contributions

As you can already tell, there is a whole lot more to be added to turn this into a goto library for all things embedded rich text image uploads. Please feel free to fork, add and raise a PR if you are so inclined. I am also open to discussing any challenges with you on [twitter](https://twitter.com/IyiKuyoro) or via Email.

[![Buy me beer](https://res.cloudinary.com/iyikuyoro/image/upload/c_scale,w_154/v1606348762/GitHub%20Readme%20Images/Screen_Shot_2020-11-25_at_6.55.02_PM.png "Buy me beer.")](https://buymeacoff.ee/iyikuyoro)

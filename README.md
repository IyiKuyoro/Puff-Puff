## Puff-Puff

This package is custom image upload adapter for rich text editor. It makes use of XHR under the hood in uploading images to your preferred webapp.

### Getting Started

Currently, this package offers two upload adapters for [CKEditor5](https://ckeditor.com/ckeditor-5/). Below are instructions for using each.

#### Custom Uploads

If you wish to upload the embedded images to a custom webapp, all you need to provide is the upload url and other request headers that you may have.

- Install puff-puff using `npm i --save puff-puff`
- Import the **CustomUpload** adapter into file where you setup your editor using `import { CustomUpload } from 'puff-puff/CKEditor';`
- After installing the package, you would need to setup a factory function that creates the adapter that would be added to your editor's config object. [(Please review this doc on how to setup your editor)](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/overview.html). Below is a sample function that demonstrates that. Keep in mind that depending on the frontend library or framework you use, where you place the function below may defer.
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CustomUpload( <upload_url>, loader);
  };
}
```
- Finally, add the plugin to your extra plugins array in the config object.
- If your upload endpoint is expecting some headers, you can include then as a third parameter in the constructor
```javascript
imagePluginFactory(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new CustomUpload( <upload_url>, loader, <headers_object>);
  };
}
```

#### Cloudinary Uploads

If you wish to upload the embedded images to Cloudinary, you will need a cloud name and an unsigned upload preset.

- Setup your cloudinary upload preset by following steps here. You do not need any addons except you wish to add them.
- Install this **CloudinaryUnsigned** upload adapter using `npm i puff-puff`
- Importing the upload adapter `import { CloudinaryUnsigned } from 'puff-puff/CKEditor';`
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

- [CKEditor Adapters]()

### Contributors

_Opeoluwa Iyi-Kuyoro_: 👨🏿[Profile](https://github.com/IyiKuyoro) - [WebSite](https://iyikuyoro.dev)

## Contributions

As you can already tell, there is a whole lot more to be added to turn this into a go to library for all things embedded rich text image uploads. Please feel free to fork, add and raise a PR if you are so inclined. I am also open to discussing any challenges with you on [twitter](https://twitter.com/IyiKuyoro) or via Email.


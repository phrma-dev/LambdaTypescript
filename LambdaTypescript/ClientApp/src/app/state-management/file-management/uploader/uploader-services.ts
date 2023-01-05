import axios from 'axios';

export const PDFToText = (files: any[]) => {
    var formData = new FormData();

    formData.append('ifile', files[0].file);

    //formData.append("ifile", $("#file")[0].files[0]);
    //console.log($("#file")[0].files[0]);

    return new Promise<string>((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://phrmadataapi.azurewebsites.net/Document/PdfToText',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

export const GetPreviewImages = () => {
    return new Promise<string>((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://phrmadataapi.azurewebsites.net/Intranet/GetPreviewImages',
        })
            .then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

export const CreateFile = (fileName: string, previewImage: string, fileStorageLocation: string) => {
    var formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('previewImage', previewImage);
    formData.append('fileStorageLocation', fileStorageLocation);

    return new Promise<string>((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://phrmadataapi.azurewebsites.net/Intranet/CreateFile',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

export const UploadFile = (files: any[], filePath: any[], previewImage: string) => {
    var formData = new FormData();

    formData.append('ifile', files[0].file);
    formData.append('previewImage', previewImage);
    console.log(files);

    //formData.append("ifile", $("#file")[0].files[0]);
    //console.log($("#file")[0].files[0]);

    let path = filePath.length === 0 ? 'root' : filePath.join('/');
  formData.append('path', path);
  var returned = 
    axios({
        method: 'post',
        url: 'https://phrmadataapi.azurewebsites.net/Document/UploadFile',
        data: formData,
    })
        .then(function (response) {
          returned = response.data;
          console.log(response);
          return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
  console.log(returned);
  return returned;
};

export const GetItems = (path: any) => {
    let formData = new FormData();
    let newPath: string;
    if (path) {
        newPath = path;
    } else {
        newPath = 'root';
    }
    formData.append('path', newPath);

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://phrmadataapi.azurewebsites.net/Document/GetItems',
            data: formData,
        })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

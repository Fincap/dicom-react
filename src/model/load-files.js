const readFileAsBytes = (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(new Int8Array(fileReader.result));
    };
    fileReader.readAsArrayBuffer(file);
  });
};

const loadFiles = async (fileList) => {
  const filesInBytes = Promise.all(fileList.map(readFileAsBytes));

  return filesInBytes;
};

export default loadFiles;

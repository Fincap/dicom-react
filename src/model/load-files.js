const loadFiles = (fileList) => {
  let loadedFiles = [];

  let fileReader = new FileReader();
  fileReader.onload = (event) => {
    loadedFiles = [...loadedFiles, new Int8Array(event.target.result)];
  };

  const filesInBytes = fileList.map((file) =>
    fileReader.readAsArrayBuffer(file)
  );

  return filesInBytes;
};

export default loadFiles;

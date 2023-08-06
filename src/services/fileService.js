const _saveFile = (fileName, fileContent) => {
  const url = window.URL.createObjectURL(
    new Blob([fileContent])
  );

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);

  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const SaveQuest = (name, content) => {
  const fileName = `${name}.qbq`,
    fileContent = JSON.stringify(content);

  _saveFile(fileName, fileContent);
};

export const SaveGame = (name, content) => {
  const fileName = `${name}.qbg`,
    fileContent = JSON.stringify(content);

  _saveFile(fileName, fileContent);
};

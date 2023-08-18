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
  // Validation
  if (!name) {
    return "A name is required to save the quest.";
  }

  // Update file metadata
  content.version = content.Version ? content.Version + 1 : 1;
  content.lastModifiedDate = new Date().toDateString();

  const fileName = `${name}.qbq`,
        fileContent = JSON.stringify(content);

  _saveFile(fileName, fileContent);

  return null;
};

export const SaveGame = (name, content) => {
  // Validation
  if (!name) {
    return "A name is required to save the game.";
  }

  const fileName = `${name}.qbg`,
    fileContent = JSON.stringify(content);

  _saveFile(fileName, fileContent);
};

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

export const saveCampaign = (name, campaignContent) => {
  // Validation
  if (!name) {
    return {
      error: "A name is required to save the campaign."
    };
  }

  const campaignObj = { ...campaignContent };
  const now = new Date();

  // Update file metadata
  campaignObj.version = !campaignObj.version || campaignObj.name !== name 
    ? 1
    : campaignObj.version + 1;
  campaignObj.name = name;
  campaignObj.lastModifiedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  const fileName = `${name}.qbc`,
    fileContent = JSON.stringify(campaignObj, null, 2);

  _saveFile(fileName, fileContent);

  return {
    content: campaignObj
  };
};

export const saveGame = (name, gameContent) => {
  // Validation
  if (!name) {
    return {
      error: "A name is required to save the game."
    };
  }

  const gameObj = { ...gameContent };
  const now = new Date();

  // Update file metadata
  gameObj.lastSaved = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  const fileName = `${name}.qbg`,
    fileContent = JSON.stringify(gameObj, null, 2);

  _saveFile(fileName, fileContent);

  return {
    content: gameObj
  };
};

export const loadFile = (file, setDataCallbackFunction) => {
  const fileReader = new FileReader();

  const loadFileEvent = file.target.files[0]
  fileReader.readAsText(loadFileEvent, "UTC-8");

  fileReader.onload = (event) => {
    if (event.target) {
      const loadedFileContent = JSON.parse(event.target.result);

      setDataCallbackFunction({
        content: loadedFileContent,
        name: loadFileEvent.name
      });
    }
  };
};

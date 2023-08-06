import { useRef, useState } from 'react';
import { Button, Input, Stack } from '@mui/joy';
import { SaveQuest } from '../services/fileService';

const testobj = {
  name: 'kamp',
  id: '123789'
};

const SaveAndLoad = () => {
  const [loadedFile, setLoadedFile] = useState(null);
  const fileNameRef = useRef();
  const loadQuestRef = useRef();
  const loadGameRef = useRef();

  const handleClickedSave = () => {
    const inputValue = fileNameRef.current.childNodes[0].value;

    if (!inputValue || inputValue === '') {
      return;
    }

    SaveQuest(
      inputValue,
      testobj
    );
  };

  const handleLoadQuestClicked = () => {
    loadQuestRef.current.click();
  };

  const handleLoadGameClicked = () => {
    loadGameRef.current.click();
  };

  const loadFile = (loadEvent) => {
    const fileReader = new FileReader();

    const loadFileEvent = loadEvent.target.files[0]

    fileReader.readAsText(loadFileEvent, "UTC-8");

    fileReader.onload = (loadedFile) => {
      const loadedFileContent = JSON.parse(loadedFile.target.result);

      setLoadedFile({
        content: loadedFileContent,
        name: loadFileEvent.name
      });
    };
  };

  return (
    <Stack gap='20px'>
      <Stack direction='row' gap='10px'>
        <Input placeholder="Type name of file here..." ref={fileNameRef} />
        <Button onClick={handleClickedSave}>Save</Button>
        <Button onClick={handleLoadQuestClicked} variant='outlined'>Load quest</Button>
        <Button onClick={handleLoadGameClicked} variant='outlined'>Load game</Button>
      </Stack>

      {loadedFile &&
        <>
          <div>Loaded file:</div>
          <div>file name: {loadedFile.name}</div>
          <div>content: {JSON.stringify(loadedFile.content)}</div>
        </>
      }

      <input type='file'
        style={{ display: 'none' }}
        ref={loadQuestRef}
        onChange={loadFile}
        accept='.qbq'
      />
      <input type='file'
        style={{ display: 'none' }}
        ref={loadGameRef}
        onChange={loadFile}
        accept='.qbg'
      />
    </Stack>
  );
};

export default SaveAndLoad;

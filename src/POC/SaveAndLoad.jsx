import { useRef, useState } from 'react';
import { Button, Input, Stack } from '@mui/joy';
import { loadFile, saveCampaign } from '../services/fileService';

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

    saveCampaign(
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

  const handleLoadedFile = (loadEvent) => {
    loadFile(loadEvent, setLoadedFile);
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
        onChange={handleLoadedFile}
        accept='.qbq'
      />
      <input type='file'
        style={{ display: 'none' }}
        ref={loadGameRef}
        onChange={handleLoadedFile}
        accept='.qbg'
      />
    </Stack>
  );
};

export default SaveAndLoad;

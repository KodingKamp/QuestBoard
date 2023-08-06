import { useRef, useState } from 'react';
import { Button, Input, Stack } from '@mui/joy';

const testobj = {
  name: 'kamp',
  id: '123789'
};

const SaveAndLoad = () => {
  const [loadedFile, setLoadedFile] = useState(null);
  const fileNameRef = useRef();
  const uploadFileRef = useRef();

  const handleClickedSave = () => {
    const inputValue = fileNameRef.current.childNodes[0].value;

    if (!inputValue || inputValue === '') {
      return;
    }

    save(
      inputValue,
      testobj
    );
  };

  const save = (fileName, fileContent) => {
    const url = window.URL.createObjectURL(
      new Blob([JSON.stringify(fileContent)])
    );

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.qbf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleClickedLoad = () => {
    uploadFileRef.current.click();
  };

  const load = (e) => {
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], "UTC-8");

    fileReader.onload = fileContent => {
      const uploadedFile = JSON.parse(fileContent.target.result);

      setLoadedFile({
        content: uploadedFile,
        name: e.target.files[0].name
      });
    }
  }

  return (
    <Stack gap='20px'>
      <Stack direction='row' gap='10px'>
        <Input placeholder="Type name of file here..." ref={fileNameRef} />
        <Button onClick={handleClickedSave}>Save</Button>
        <Button onClick={handleClickedLoad} variant='outlined'>Load</Button>
      </Stack>

      <input type='file' style={{ display: 'none' }} ref={uploadFileRef} onChange={load} />
      {loadedFile &&
        <>
          <div>Loaded file:</div>
          <div>file name: {loadedFile.name}</div>
          <div>content: {JSON.stringify(loadedFile.content)}</div>
        </>
      }
    </Stack>
  );
};

export default SaveAndLoad;

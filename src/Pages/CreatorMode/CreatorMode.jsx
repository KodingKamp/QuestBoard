import { Button, Input } from '@mui/joy';
import './CreatorMode.scss';
import SaveAndLoad from '../../POC/SaveAndLoad';

const testobj = {
  name: 'kamp',
  id: '123789'
};

const CreatorMode = () => {
  return (
    <div id='creator-mode-component'>
      <SaveAndLoad />
    </div>
  );
};

export default CreatorMode;

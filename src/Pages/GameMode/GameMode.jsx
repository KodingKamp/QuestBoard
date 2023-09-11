import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import './GameMode.scss';

const GameMode = () => {
  const campaignState = useSelector(state => state.campaign);

  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignState.data) {
      navigate('/');
    }
  }, [campaignState.data])

  return (
    <div id='game-mode-component'>
      <div>
        <Link to='/'>
          <Button variant='plain'>
            Back
          </Button>
        </Link>
      </div>
      Game Mode
    </div>
  );
};

export default GameMode;

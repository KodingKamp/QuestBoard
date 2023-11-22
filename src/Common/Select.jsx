import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const SelectComponent = ({ menuItems, label, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState();

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    onSelect(selectedItem);
  }, [selectedItem])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select-dropdown"
          value={selectedItem}
          label="select-dropdown"
          onChange={handleChange}
        >
          {menuItems.map((item, index) => (
            <MenuItem sx={{color: 'black'}} key={index} value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectComponent;
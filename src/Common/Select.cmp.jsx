import React, { useEffect, useState } from 'react';
import { Box,Select, FormControl, MenuItem, InputLabel  } from '@mui/material';

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
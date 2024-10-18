import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectBrand } from '@/app/interface/brands';
import {useGetBrands} from '@/app/hook/useGetBrands';

export function SelectBrandComponent({brand, setBrand}: SelectBrand) {

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
  };

  const {brands}  = useGetBrands()


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Marca</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand}
          label="Marca"
          onChange={handleChange}
        >
          {brands.map((brandItem) => (
            <MenuItem key={brandItem.id} value={brandItem.id}>
              {brandItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

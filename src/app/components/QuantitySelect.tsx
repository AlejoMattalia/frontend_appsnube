import React from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface QuantitySelectProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  stock: number;
}

export const QuantitySelect = ({ quantity, setQuantity, stock }: QuantitySelectProps) => {
  const handleQuantityChange = (event: SelectChangeEvent<number>) => {
    setQuantity(Number(event.target.value)); // Convertir el valor a número
  };

  return (
    <FormControl fullWidth sx={{ maxWidth: "100px" }}>
      <InputLabel id="quantity-select-label">Cantidad</InputLabel>
      <Select
        labelId="quantity-select-label"
        id="quantity-select"
        value={quantity}
        label="Cantidad"
        onChange={handleQuantityChange}
        size="small"
        sx={{ maxWidth: "100px" }}
      >
        {Array.from({ length: stock }, (_, i) => i + 1).map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

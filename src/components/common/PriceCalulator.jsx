import { Box, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import StyledTextField from '../../ui/overrides/TextField';
import Helper from '../../utils/Helper';
import NumberComponent from './AnimatedNumber';

const PriceCalculator = ({ selectedCurrency }) => {
  const [value, setValue] = useState(1);
  useEffect(() => {}, [value]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={1} mb={1} px={2}>
      <StyledTextField
        type="number"
        InputProps={{ startAdornment: <Edit /> }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{ style: { textAlign: 'center' } }}
        placeholder="Amount"
        value={value}
        sx={{ maxWidth: 140, minWidth: 80 }}
        onChange={(event) => setValue(event.target.value)}
      />
      <Typography typography="h6" fontWeight="500" ml={1} sx={{ color: '#ccc', textWrap: 'nowrap' }}>
        {selectedCurrency.symbol} =
      </Typography>
      <Box sx={{ maxWidth: 130 }}>
        <Typography
          typography="h6"
          fontWeight="500"
          textOverflow="ellipsis"
          ml={1}
          sx={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <NumberComponent value={selectedCurrency.price * Number(value)} />
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceCalculator;

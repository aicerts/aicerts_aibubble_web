import { Box, Typography } from '@mui/material';
import useDataStore from '../../store/useDataStore';
import WishlistAdd from '../symbol-detail/WishlistAdd';

const SymbolName = ({ symbol }) => {
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  return (
    <Box display="flex" alignItems="center" gap={0}>
      <WishlistAdd symbol={symbol} />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          height: 36,
          padding: '6px 15px',
          cursor: 'pointer',
          color: 'white',
          background: '#ffffff1f',
          borderRadius: 20,
          ':hover': {
            background: '#ffffff40'
          }
        }}
        onClick={() => setSelectedCurrency(symbol)}>
        <img width={20} height={20} src={symbol.image} alt={symbol.name} />
        <Typography color="white" ml={1}>
          {symbol.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default SymbolName;

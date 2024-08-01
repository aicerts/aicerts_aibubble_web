import { Box } from '@mui/material';
import TradingViewIcon from '../../assets/icons/TradingViewIcon';
import StyledIconButton from '../../ui/overrides/IconButton';
import MarketWatchIcon from '../../assets/icons/MarketWatchIcon';
import YahooFinanceIcon from '../../assets/icons/YahooFinanceIcon';

const TradeLinks = ({ symbol, ...props }) => {
  const open = (url) => {
    window.open(url, 'blank');
  };
  return (
    <Box display="flex" justifyContent="center" mb={1} gap={1} {...props}>
      <StyledIconButton onClick={() => open(`https://www.tradingview.com/chart/?symbol=${symbol.symbol}`)}>
        <TradingViewIcon />
      </StyledIconButton>
      <StyledIconButton onClick={() => open(`https://www.marketwatch.com/investing/stock/${symbol.symbol}`)} sx={{ pr: 0.7 }}>
        <MarketWatchIcon />
      </StyledIconButton>
      <StyledIconButton onClick={() => open(`https://finance.yahoo.com/quote/${symbol.symbol}`)} sx={{ pr: 0.7 }}>
        <YahooFinanceIcon />
      </StyledIconButton>
    </Box>
  );
};

export default TradeLinks;

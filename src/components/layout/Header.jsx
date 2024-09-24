import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Search } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import { ClickAwayListener, Grow, Typography } from '@mui/material';
import Logo from '../../assets/images/logo.png';
import LogoIcon from '../../assets/images/icon.png';
import StyledIconButton from '../../ui/overrides/IconButton';
import StyledTextField from '../../ui/overrides/TextField';
import useDataStore from '../../store/useDataStore';
import ConfigurationDialog from './ConfigurationDialog';

const Header = () => {
  const symbols = useDataStore((state) => state.currencies);
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      const filter = symbols.filter(
        (item) => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymbols(filter);
    } else {
      setFilteredSymbols(symbols);
    }
  }, [searchTerm, symbols]);

  const anchorEl = useRef();
  const [searchEnabled, setSearchEnabled] = useState(false);

  const handleClose = (currency) => {
    setSearchEnabled(false);
    setSearchTerm('');
    if (currency) {
      setSelectedCurrency(currency);
    }
  };
  return (
    <AppBar position="static" sx={{ background: '#444', boxShadow: '1px 1px 7px 7px #00000057' }}>
      <Box px={2} py={1} display="flex" justifyContent="space-between" maxHeight={55} height={55} width="100%" alignItems="center">
        <Box height="100%" ml={5}>
          <img src={searchEnabled ? LogoIcon : Logo} alt="AI + Bubbles" height="100%" style={{ maxWidth: '200px' }} />
        </Box>

        <Box>
          {!searchEnabled && (
            <StyledIconButton onClick={() => setSearchEnabled(true)}>
              <Search />
            </StyledIconButton>
          )}
        </Box>

        {searchEnabled && (
          <ClickAwayListener onClickAway={() => handleClose()}>
            <Box width="70%" position="relative">
              <StyledTextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                fullWidth
                ref={anchorEl}
                placeholder="Search symbol"
                InputProps={{ startAdornment: <Search /> }}
              />

              <Grow in={searchEnabled}>
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 9999,
                    border: 0,
                    mt: 1 / 2,
                    mr: 1,
                    borderRadius: 1,
                    width: '100%',
                    maxHeight: 240,
                    background: '#444444e6',
                    backdropFilter: 'blur(8px)',
                    overflow: 'scroll',
                    boxShadow: '0px 0px 7px 7px #00000027'
                  }}>
                  {filteredSymbols.map((symbol, index) => {
                    return (
                      <Box
                        display="flex"
                        key={symbol.symbol}
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleClose(symbol)}
                        sx={{
                          cursor: 'pointer',
                          px: 2,
                          transition: 'background .4s',
                          ':hover': { background: '#ffffff14' },
                          borderBottom: filteredSymbols.length - 1 !== index ? '1px solid #656565' : ''
                        }}>
                        <Box display="flex" alignItems="center">
                          <img width={20} height={20} src={symbol.image} alt={symbol.name} />
                          <Typography color="white" ml={1} px={1} py={1}>
                            {symbol.name}
                          </Typography>
                        </Box>
                        <Typography fontWeight="600" color="#CCC" mr={1} px={1} py={1}>
                          {symbol.symbol}
                        </Typography>
                      </Box>
                    );
                  })}
                  {filteredSymbols.length === 0 && (
                    <Typography variant="h6" color="#CCC" ml={1} px={1} py={1}>
                      No symbols found
                    </Typography>
                  )}
                </Box>
              </Grow>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
      <ConfigurationDialog />
    </AppBar>
  );
};
export default Header;

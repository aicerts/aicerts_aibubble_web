import { Box, ClickAwayListener, Grow, Stack, Typography } from '@mui/material';
import { Add, Edit, Search } from '@mui/icons-material';
import { StyledTab, StyledTabs } from '../../ui/overrides/Tabs';
import StyledIconButton from '../../ui/overrides/IconButton';
import HeaderProgress from './HeaderProgress';
import useConfigStore from '../../store/useConfigStore';
import useDataStore from '../../store/useDataStore';
import Helper from '../../utils/Helper';
import Constant from '../../utils/Constant';
import { useEffect, useRef, useState } from 'react';
import ConfigurationDialog from './ConfigurationDialog';
import icon from "../../assets/images/icon.png";
import logo from "../../assets/images/logo.png";
import StyledTextField from '../../ui/overrides/TextField';

const HeaderTabs = () => {
  const config = useConfigStore((state) => state.configuration);
  const layout = useConfigStore((state) => state.layout);
  const updateConfig = useConfigStore((state) => state.setConfig);
  const currencies = useDataStore((state) => state.currencies);
  const [isMobile, setIsMobile] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const symbols = useDataStore((state) => state.currencies);
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);
  const anchorEl = useRef();
  const setEditConfig = useConfigStore((state) => state.setEditConfig);
  const allConfigs = useConfigStore((state) => state.allConfigs);
  const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);
  const setConfig = useConfigStore((state) => state.setConfig);

  const calculateVarient = (item) => {
    const weight = Helper.calculateConfigurationWeight(item, currencies);
    if (weight > 0) {
      return 'buy';
    }
    if (weight < 0) {
      return 'sell';
    }
    return 'neutral';
  };

  useEffect(() => {
    const cleanup = Helper.handleResize(setIsMobile);

    return cleanup;
  }, []);

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
  
  const handleClose = (currency) => {
    setSearchEnabled(false);
    setSearchTerm('');
    if (currency) {
      setSelectedCurrency(currency);
    }
  };

  const handleAddConfig = () => {
    const item = { ...Constant.DEFAULT_CONFIGS[0] };
    item.period = 'min15';
    item.id = Date.now();
    allConfigs.push(item);
    updateAllConfig(allConfigs);
    setConfig(item);
    setEditConfig(true);
  };

  return (
    <Stack direction="row"  >
      <HeaderProgress />
      {layout === 'bubble' && (
        <>
        <img 
            className="ml-2" 
            src={isMobile ? icon : logo} 
            alt="Brand Image" 
            style={{ height: 40 }} 
          />
      <StyledTabs
            variant="scrollable"
            value={config.id}
            onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
            scrollButtons={false}
            sx={{
              visibility: searchEnabled && isMobile ? 'hidden' : 'visible',
              width: searchEnabled && isMobile ? '0%' : 'auto', 
            }}
          >
            {allConfigs.map((item) => {
              return <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />;
            })}
          </StyledTabs>
      </>
      )}
      <Box p={1}>
          <StyledIconButton onClick={() => setEditConfig(true)}>
            <Edit />
          </StyledIconButton>
      </Box>
      <Box p={1}>
          <StyledIconButton onClick={() => handleAddConfig()}>
            <Add />
          </StyledIconButton>
      </Box>
      <Box p={1}>
        {!searchEnabled && (
          <StyledIconButton onClick={() => setSearchEnabled(true)}>
            <Search />
          </StyledIconButton>
        )}
      </Box>
      
      {searchEnabled && (
        <ClickAwayListener onClickAway={() => handleClose()}>
          <Box
            width={isMobile ? '70%' : '30%'} // 70% width on mobile view
            position="relative"
          >
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
      <ConfigurationDialog/>
    </Stack>
  );
};

export default HeaderTabs;

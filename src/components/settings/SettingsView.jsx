import { Box, Stack, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import StyledIconButton from '../../ui/overrides/IconButton';
import useConfigStore from '../../store/useConfigStore';
import StyledTextField from '../../ui/overrides/TextField';
import Logo from '../../assets/images/logo.png';
import ColorSettings from './ColorSettings';
import useDataStore from '../../store/useDataStore';
import Scrollbar from 'react-scrollbars-custom';

const SettingsView = () => {
  const watchlists = useConfigStore((state) => state.watchlists);
  const updateAllWatchlist = useConfigStore((state) => state.updateAllWatchlist);
  const isMobile = useDataStore((state) => state.isMobile);

  const updateName = (id, value) => {
    const index = watchlists.findIndex((item) => item.id === id);
    watchlists[index].name = value;
    updateAllWatchlist(watchlists);
  };

  const addWatchList = () => {
    const item = {
      id: Date.now(),
      name: '',
      symbols: []
    };
    watchlists.push(item);
    updateAllWatchlist(watchlists);
  };

  const removeWatchlist = (id) => {
    const wl = watchlists.filter((item) => item.id !== id);
    updateAllWatchlist(wl);
  };
  return (
    <Box  sx={{ flexGrow: 1, width: '100%', display:"flex", justifyContent:"center"}}>
      <Stack  width={isMobile?"100%": "50%"} height={isMobile?"100%": "90%"} p={2} bgcolor={isMobile? "": ""} borderRadius={"10px"}
      sx={{ background:isMobile? "": '#444444e6', backdropFilter: 'blur(8px)'}} >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography typography="h6" color="white">
            Colors
          </Typography>
          <ColorSettings />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography typography="h6" color="white">
            Watchlists
          </Typography>
          <StyledIconButton>
            <Add onClick={() => addWatchList()} />
          </StyledIconButton>
        </Box>
        <Box
          marginTop={2}
          height={isMobile ? 240 : 300}
          mb={2}
          sx={{
            overflowY: 'scroll', // Enable vertical scrolling
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar for Chrome, Safari, and Edge
          }}>
          <Scrollbar
            style={{ height: '100%' }}
            noScrollX
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return (
                  <div
                    {...restProps}
                    ref={elementRef}
                    style={{
                      backgroundColor: '#CFA935', // Thumb color
                      borderRadius: '8px' // Optional: rounded corners for the scrollbar thumb
                    }}
                  />
                );
              }
            }}>
            {watchlists.map((item, index) => {
              return (
                <Box display="flex" key={item.id} alignItems="center" my={1} px={2}>
                  <StyledTextField
                    fullWidth
                    placeholder={`Watchlist ${index + 1}`}
                    value={item.name}
                    onChange={(e) => updateName(item.id, e.target.value)}
                    InputProps={{ startAdornment: <Edit /> }}
                    inputProps={{
                      maxLength: process.env.WATCHLIST_CHARACTER_LIMIT, // Set the character limit
                    }}
                  />
                  <StyledIconButton onClick={() => removeWatchlist(item.id)} sx={{ ml: 1 }}>
                    <Delete />
                  </StyledIconButton>
                </Box>
              );
            })}
          </Scrollbar>
        </Box>
        <Box display="flex" justifyContent="center" mt={7} sx={{ opacity: 0.85 }}>
          <img src={Logo} alt="AI + Bubbles" width={150} style={{ maxWidth: '40vw' }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default SettingsView;

import { Box } from '@mui/material';
import BubbleCanvas from './BubbleCanvas';
import useDataStore from '../../store/useDataStore';
import Logo from '../../assets/images/logo_black.png';
import './style.css';

const BubblePlot = ({ webviewLoading }) => {
  const isLoading = useDataStore((state) => state.loading);

  return (
    <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ||
        (webviewLoading && (
          <Box>
            <img className="scale-up-center" src={Logo} alt="AI + Bubble" width={200} />
          </Box>
        ))}
      {!isLoading && !webviewLoading && <BubbleCanvas />}
    </Box>
  );
};

export default BubblePlot;

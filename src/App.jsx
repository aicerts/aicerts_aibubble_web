import * as React from 'react';
import MainLayout from './layout/MainLayout';
import BubbleView from './pages/BubbleView';
import useDataStore from './store/useDataStore';
import Helper from './utils/Helper';

const App = () => {

  const setIsMobile = useDataStore((state) => state.setIsMobile);
  const isMobile = useDataStore((state) => state.isMobile);

  
  React.useEffect(() => {
    // Handle window resize for mobile detection
    const cleanup = Helper.handleResize(setIsMobile);
    return cleanup;
  }, []);
  return <BubbleView />;
};

export default App;

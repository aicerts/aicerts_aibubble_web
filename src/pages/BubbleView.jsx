import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderTabs from '../components/layout/HeaderTabs';
import BubblePlot from '../components/bubble-layout/BubblePlot';
import FooterTabs from '../components/layout/FooterTabs';
import ChartView from '../components/symbol-detail/ChartView';
import useConfigStore from '../store/useConfigStore';
import ListView from '../components/list-layout/ListView';
import Header from '../components/layout/Header';
import SettingsView from '../components/settings/SettingsView';

const BubbleView = () => {
  const isWebView = window.isEmbbed || false;
  const [webviewLoading, isWebviewLoading] = useState(isWebView);
  const layout = useConfigStore((state) => state.layout);
  const config = useConfigStore((state) => state);
  const setInitConfig = useConfigStore((state) => state.setInitConfig);
  useEffect(() => {
    if (isWebView) {
      window.fromFlutter = (c) => {
        const parsed = JSON.parse(c);
        if (parsed) {
          setInitConfig(parsed);
          isWebviewLoading(false);
        }
      };
    }
  }, []);
  useEffect(() => {
    if (window.getConfig && isWebView) {
      window.getConfig.postMessage(JSON.stringify(config));
    }
  }, [config]);
  return (
    <Stack sx={{ p: 0, bgcolor: '#222222', height: '100vh' }}>
      {/* <Header /> */}
      <HeaderTabs />
      {layout === 'bubble' && <BubblePlot webviewLoading={webviewLoading} />}
      {layout === 'list' && <ListView />}
      {layout === 'settings' && <SettingsView />}
      <ChartView />
      <FooterTabs />
    </Stack>
  );
};

export default BubbleView;

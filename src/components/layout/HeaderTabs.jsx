import { Box, Stack } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { StyledTab, StyledTabs } from '../../ui/overrides/Tabs';
import StyledIconButton from '../../ui/overrides/IconButton';
import HeaderProgress from './HeaderProgress';
import useConfigStore from '../../store/useConfigStore';
import useDataStore from '../../store/useDataStore';
import Helper from '../../utils/Helper';
import Constant from '../../utils/Constant';

const HeaderTabs = () => {
  const config = useConfigStore((state) => state.configuration);
  const setConfig = useConfigStore((state) => state.setConfig);
  const layout = useConfigStore((state) => state.layout);
  const updateConfig = useConfigStore((state) => state.setConfig);
  const currencies = useDataStore((state) => state.currencies);
  const setEditConfig = useConfigStore((state) => state.setEditConfig);
  const allConfigs = useConfigStore((state) => state.allConfigs);
  const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);

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

  const handleAddConfig = () => {
    const item = { ...Constant.DEFAULT_CONFIGS[0] };
    item.period = 'min1';
    item.id = Date.now();
    allConfigs.push(item);
    updateAllConfig(allConfigs);
    setConfig(item);
    setEditConfig(true);
  };

  return (
    <Stack direction="row" position="relative">
      <HeaderProgress />
      {layout === 'bubble' && (
        <>
          <StyledTabs
            variant="scrollable"
            value={config.id}
            onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
            scrollButtons={false}>
            {allConfigs.map((item) => {
              return <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />;
            })}
          </StyledTabs>
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
        </>
      )}
    </Stack>
  );
};

export default HeaderTabs;

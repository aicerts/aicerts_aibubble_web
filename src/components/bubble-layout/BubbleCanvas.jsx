import { useEffect, useRef, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Block, RemoveRedEye, Star } from '@mui/icons-material';
import BubbleManager from '../../utils/BubbleManager';
import useDataStore from '../../store/useDataStore';
import useConfigStore from '../../store/useConfigStore';

const BubbleCanvas = () => {
  const [canvasManager, setCanvasManager] = useState();
  const currencies = useDataStore((state) => state.currencies);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const filter = useDataStore((state) => state.filter);

  const favorites = useConfigStore((state) => state.favorites);
  const blocklist = useConfigStore((state) => state.blocklist);
  const watchlists = useConfigStore((state) => state.watchlists);
  const config = useConfigStore((state) => state.configuration);
  const colorScheme = useConfigStore((state) => state.colorScheme);

  const baseCurrency = useConfigStore((state) => state.currency);
  const selectedCurrency = useDataStore((state) => state.selectedCurrency);
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  const canvasContainerRef = useRef();
  useEffect(() => {
    if (canvasContainerRef.current) {
      const cM = new BubbleManager(canvasContainerRef.current);
      setCanvasManager(cM);

      cM.setProperties({ ...config, colors: colorScheme, baseCurrency });

      cM.eventSelect.register((currency) => setSelectedCurrency(currency));
      cM.wakeUp();
      cM.start();
    }
  }, [canvasContainerRef]);
  useEffect(() => {
    if (canvasManager) {
      canvasManager.setProperties({ ...config, colors: colorScheme, baseCurrency });
    }
  }, [config, colorScheme]);

  useEffect(() => {
    if (canvasManager) {
      canvasManager.selectedCurrencyId = selectedCurrency?.id;
    }
  }, [selectedCurrency]);

  useEffect(() => {
    let filtered = [];
    if (filter.type === 'all') {
      filtered = currencies.filter((item) => !blocklist.includes(item.id));
    } else if (filter.type === 'favorite') {
      filtered = currencies.filter((item) => favorites.includes(item.id));
    } else if (filter.type === 'blocklist') {
      filtered = currencies.filter((item) => blocklist.includes(item.id));
    } else if (filter.type === 'watchlist' && filter.id) {
      const wt = watchlists.find((item) => item.id === filter.id);
      filtered = currencies.filter((item) => wt.symbols.includes(item.id));
    }
    setFilteredCurrencies(filtered);
  }, [currencies, favorites, filter, blocklist, watchlists]);

  useEffect(() => {
    if (canvasManager) {
      canvasManager.pushCurrencies(filteredCurrencies);
    }
  }, [filteredCurrencies]);

  const renderIcon = () => {
    if (filter.type === 'watchlist') {
      return <RemoveRedEye fontSize="inherit" />;
    }
    if (filter.type === 'blocklist') {
      return <Block fontSize="inherit" />;
    }
    if (filter.type === 'favorite') {
      return <Star fontSize="inherit" />;
    }
    return '';
  };

  const renderName = () => {
    if (filter.type === 'watchlist') {
      return 'Watchlist';
    }
    if (filter.type === 'blocklist') {
      return 'Blocklist';
    }
    if (filter.type === 'favorite') {
      return 'Favorite';
    }
    return '';
  };
  return (
    <>
      <canvas id="canvas" ref={canvasContainerRef} />
      {filteredCurrencies.length === 0 && (
        <Stack position="fixed" bgcolor="transaprent" textAlign="center">
          <Typography typography="h3" color="#ccc" lineHeight="0">
            {renderIcon()}
          </Typography>
          <Typography typography="h6" color="#ccc">
            {renderName()}
          </Typography>
          <Typography typography="h6" color="white">
            List is empty
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default BubbleCanvas;

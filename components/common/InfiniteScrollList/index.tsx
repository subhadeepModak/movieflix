import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {throttle} from 'lodash';

interface Item {
  id: number;
  text: string;
}

interface InfiniteScrollListProps {
  fetchData: (page: number) => Promise<Item[]>;
  defaultPage: number;
  renderItem: (item: Item) => any;
  data: any;
}

const styles = StyleSheet.create({
  indicatorContainer: {
    paddingVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
});

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  fetchData,
  defaultPage,
  renderItem,
  data,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startPage, setStartPage] = useState<number>(defaultPage);
  const [endPage, setEndPage] = useState<number>(defaultPage);
  const [onStartReachedInProgress, setOnStartReachedInProgress] =
    useState(false);
  const [onEndReachedInProgress, setOnEndReachedInProgress] = useState(false);

  const listRef = useRef<any>(null);

  useEffect(() => {
    if (!loading && endPage === defaultPage && startPage === defaultPage) {
      loadData(defaultPage);
    }
  }, []);

  const loadData = async (pageNum: number) => {
    if (pageNum > 2024 || pageNum < 1950) {
      return null;
    }
    setLoading(true);
    try {
      await fetchData(pageNum);

      if (pageNum < startPage) {
        setStartPage(pageNum);
      }
      if (pageNum > endPage) {
        setEndPage(pageNum);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadNext = async () => {
    if (!loading && !onEndReachedInProgress) {
      setOnEndReachedInProgress(true);
      await loadData(endPage + 1, 'down').finally(() =>
        setOnEndReachedInProgress(false),
      );
    }
  };

  const handleLoadPrevious = async () => {
    if (!loading && !onStartReachedInProgress) {
      setOnStartReachedInProgress(true);
      await loadData(startPage - 1, 'up').finally(() =>
        setOnStartReachedInProgress(false),
      );
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (onStartReachedInProgress || onEndReachedInProgress) {
      return;
    }

    if (!event || !event.nativeEvent || !event.nativeEvent.contentOffset) {
      return;
    }

    const offset = event.nativeEvent.contentOffset.y;
    const visibleLength = event.nativeEvent.layoutMeasurement.height;
    const contentLength = event.nativeEvent.contentSize.height;

    const isScrollAtStart = offset < 10;
    const isScrollAtEnd = contentLength - visibleLength - offset < 10;

    if (isScrollAtStart) {
      handleLoadPrevious();
    }

    if (isScrollAtEnd) {
      handleLoadNext();
    }
  };

  // Throttled scroll handler to limit the frequency of the scroll events
  const throttledHandleScroll = useCallback(
    throttle((event: any) => {
      event.persist();
      handleScroll(event);
    }, 400),
    [loading, onStartReachedInProgress, onEndReachedInProgress, data],
  );

  const renderHeaderLoadingIndicator = () => {
    if (!onStartReachedInProgress) {
      return null;
    }

    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  };

  const renderFooterLoadingIndicator = () => {
    if (!onEndReachedInProgress) {
      return null;
    }

    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  };

  return (
    <FlatList
      ref={listRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={renderHeaderLoadingIndicator}
      ListFooterComponent={renderFooterLoadingIndicator}
      onScroll={throttledHandleScroll}
      scrollEventThrottle={true}
      maintainVisibleContentPosition={{
        autoscrollToTopThreshold: 10,
        minIndexForVisible: 2,
      }}
      {...props}
    />
  );
};

export default InfiniteScrollList;

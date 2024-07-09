import React from 'react';
import { View } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader = () => {
  return (
    <View>
      <SkeletonPlaceholder.Item height={250} width={'49%'} borderRadius={5} />
      <SkeletonPlaceholder.Item height={250} width={'49%'} borderRadius={5} />
    </View>
  );
};

export default SkeletonLoader;

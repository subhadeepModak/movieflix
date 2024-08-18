import React, {forwardRef, useCallback} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

const CustomBottomSheet = (
  {children, onChange, snapPoints, initialIndex, ...props},
  ref,
) => {
  const renderBackdrop = useCallback(
    backdropProps => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={initialIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={onChange}
      backdropComponent={renderBackdrop}
      {...props}>
      {children}
    </BottomSheetModal>
  );
};

export default forwardRef(CustomBottomSheet);

import { PlacementType } from '@enums';

export const getPlacementValue = (placement: PlacementType): string => {
  switch (placement) {
    case PlacementType.ALL_TYPE:
      return 'All Type';
    case PlacementType.HOME:
      return 'Home';
    case PlacementType.LIBRARY:
      return 'Library';
    default:
      return placement;
  }
};

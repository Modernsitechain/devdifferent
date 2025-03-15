const MAX_BYTE_SIZE = 1024;
const MAX_KILO_BYTE_SIZE = MAX_BYTE_SIZE * 1024;

export const getKbSize = (byte: number): number => {
  return Math.floor(byte / MAX_BYTE_SIZE);
};

export const getMbSize = (byte: number): number => {
  return Math.floor(byte / MAX_KILO_BYTE_SIZE);
};

export const getDynamicSize = (byte: number): string => {
  if (byte >= MAX_BYTE_SIZE && byte < MAX_KILO_BYTE_SIZE) {
    return `${getKbSize(byte)} Kb`;
  } else if (byte >= MAX_KILO_BYTE_SIZE) {
    return `${getMbSize(byte)} Mb`;
  } else {
    return `${byte} Byte`;
  }
};

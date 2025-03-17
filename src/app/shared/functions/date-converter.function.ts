import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export const getFormattedDate = (date: Dayjs): string => {
  const formattedDate = dayjs(date).format('DD MMMM YYYY | h.mm A');

  return formattedDate;
};

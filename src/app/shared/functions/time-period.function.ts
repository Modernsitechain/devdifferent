import dayjs from 'dayjs';

export const getTimePeriod = (date: string): string => {
  const startDate = dayjs(date).format('D MMMM YYYY');
  const endDate = dayjs(date).endOf('month').format('D MMMM YYYY');

  return `${startDate} - ${endDate}`;
};

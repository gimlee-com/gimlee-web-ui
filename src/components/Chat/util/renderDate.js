export default function renderDate(date, t) {
  return date.calendar(null, {
    lastWeek: 'dddd, DD-MM-YYYY',
    lastDay: `[${t('app:calendar:yesterday')}]`,
    sameDay: `[${t('app:calendar:today')}]`,
    sameElse() {
      return 'DD-MM-YYYY';
    },
  });
}

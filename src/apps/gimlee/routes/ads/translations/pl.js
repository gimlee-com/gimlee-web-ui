import { AD_TYPE_BUY, AD_TYPE_FOUND, AD_TYPE_LOST, AD_TYPE_OTHER, AD_TYPE_SELL } from '../model/adType';

export default {
  new: 'Nowe ogłoszenie',
  title: 'Tytuł',
  step: 'Krok',
  nextStep: 'Dalej',
  previousStep: 'Wstecz',
  skipStep: 'Pomiń',
  submit: 'Wyślij',
  skipExplanation: 'Ten krok nie jest wymagany, możesz go pominąć',
  type: 'Rodzaj ogłoszenia',
  preview: 'Podgląd',
  adType: {
    [AD_TYPE_BUY]: 'Kupię',
    [AD_TYPE_SELL]: 'Sprzedam',
    [AD_TYPE_LOST]: 'Zgubiono',
    [AD_TYPE_FOUND]: 'Znaleziono',
    [AD_TYPE_OTHER]: 'Inne',
  },
  searchForAds: 'Szukaj ogłoszeń',
  displayingAll: 'Wszystkie ogłoszenia',
  currentSearch: 'Obecne wyszukiwanie',
  searchPhrase: 'Szukany tekst',
  searchForAdType: {
    [null]: 'Wszystkie ogłoszenia',
    [AD_TYPE_BUY]: 'Kupię',
    [AD_TYPE_SELL]: 'Sprzedam',
    [AD_TYPE_LOST]: 'Zgubiłem',
    [AD_TYPE_FOUND]: 'Znalazłem',
    [AD_TYPE_OTHER]: 'Inne ogłoszenia',
  },
};

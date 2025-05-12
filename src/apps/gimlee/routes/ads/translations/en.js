import { AD_TYPE_BUY, AD_TYPE_FOUND, AD_TYPE_LOST, AD_TYPE_OTHER, AD_TYPE_SELL } from '../model/adType';

export default {
  new: 'New posting',
  title: 'Title',
  step: 'Step',
  nextStep: 'Next',
  previousStep: 'Go back',
  skipStep: 'Skip',
  submit: 'Submit',
  skipExplanation: 'This step can be skipped if you don\'t want to share this information',
  type: 'Posting type',
  preview: 'Preview',
  adType: {
    [AD_TYPE_BUY]: 'Buy',
    [AD_TYPE_SELL]: 'Sell',
    [AD_TYPE_LOST]: 'Lost',
    [AD_TYPE_FOUND]: 'Found',
    [AD_TYPE_OTHER]: 'Other',
  },
  searchForAds: 'Search for ads',
  displayingAll: 'All ads',
  currentSearch: 'Current search',
  searchPhrase: 'Search phrase',
  searchForAdType: {
    [null]: 'All ads',
    [AD_TYPE_BUY]: 'Buy',
    [AD_TYPE_SELL]: 'Sell',
    [AD_TYPE_LOST]: 'Lost',
    [AD_TYPE_FOUND]: 'Found',
    [AD_TYPE_OTHER]: 'Other ads',
  },
};

export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const SUGGESTIONS = {
  'Pre-Disbursement': {
    content: 'Please choose one of these options...',
    suggestions: ['Loan application live status', 'Delivery Order live status'],
  },
  Finance: {
    content: 'Please choose one of these options...',
    suggestions: ['TA'],
  },
  'Post-Disbursement': {
    content: 'Please choose one of these options...',
    suggestions: ['Commission Payout'],
  },
};

// api end points
export const DO_ENDPOINT =
  'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io/get_do_details';

export const APPLICATION_ENDPOINT =
  'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io/get_applications_details';

export const TARGET_API_ENDPOINTS = {
  'Loan application live status': APPLICATION_ENDPOINT,

  'Delivery Order live status': DO_ENDPOINT,
};

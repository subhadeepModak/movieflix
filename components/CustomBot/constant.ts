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

export const NESTED_SUGGESTIONS = {
  'Loan application live status': {
    enableEditing: true,
    content: 'Here is some suggested questions for you...',
    suggestions: [
      'How many loan application were gererated in past month?',
      'Which branch had the most number of applications this month?',
      'Give me 5 customer applied for the loan applications last month ? ',
    ],
  },
  'Delivery Order live status': {
    enableEditing: true,
    content: 'Here is some suggested questions for you...',
    suggestions: [
      "How many DO's generated in the past month?",
      " Give me 5 Customers whose DO's have generated in the past month?",
      " Give me he application numbers for which the DO's amount is the greater than 25000000?",
    ],
  },
};

export const SUGGESTED_QUESTIONS_LIST = Object.values(
  NESTED_SUGGESTIONS
).reduce((acc, item) => {
  return [...acc, ...item.suggestions];
}, []);

// api end points
export const DO_ENDPOINT =
  'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io/get_do_details';

export const APPLICATION_ENDPOINT =
  'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io/get_application_details';

export const TARGET_API_ENDPOINTS = {
  'Loan application live status': APPLICATION_ENDPOINT,

  'Delivery Order live status': DO_ENDPOINT,
};

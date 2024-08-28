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
  menu: {
    content: 'I can help you with following things.',
    suggestions: ['Pre-Disbursement', 'Finance', 'Post-Disbursement'],
  },
};

export const NESTED_SUGGESTIONS = {
  'Loan application live status': {
    enableEditing: true,
    content: 'Here are some suggested questions for you...',
    suggestions: [
      'How many loan applications were generated in the past month',
      'Which branch has the most number of applications this month',
      'Give me 5 customers who have applied for the loan applications last month',
    ],
  },
  'Delivery Order live status': {
    enableEditing: true,
    content: 'Here are some suggested questions for you...',
    suggestions: [
      "How many DO's have been generated in the past month",
      "Give me 5 Customers whose DO's have been generated in the past month",
      "Give me the application numbers for which the DO's amount is greater than 2500000",
    ],
  },
  TA: {
    enableEditing: true,
    content: 'Here are some suggested questions for you...',
    suggestions: [
      'I want to know my total limit',
      'Tell me my available amount',
      'Give me list of all outstanding balances',
    ],
  },
};

export const SUGGESTED_QUESTIONS_LIST = Object.values(
  NESTED_SUGGESTIONS,
).reduce((acc, item) => {
  return [...acc, ...item.suggestions];
}, []);

export const BASE_API_URL =
  //'https://mmfsl-iht-container-dealerbuddy.thankfuldesert-989ed112.centralindia.azurecontainerapps.io';
  'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io';

// api end points

export const DO_ENDPOINT = `${BASE_API_URL}/get_do_details`;

export const APPLICATION_ENDPOINT = `${BASE_API_URL}/get_application_details`;

export const GET_TA_DETAILS = `${BASE_API_URL}/get_ta_details`;

export const TARGET_API_ENDPOINTS = {
  'Loan application live status': APPLICATION_ENDPOINT,

  'Delivery Order live status': DO_ENDPOINT,
  TA: GET_TA_DETAILS,
};

export const DUMMY_USERS = [
  {id: '17760', password: '1234'},
  {id: '1310', password: '1234'},
  {id: 'AU01', password: '1234'},
  {id: 'BR05', password: '1234'},
  {id: 'KA15', password: '1234'},
  {id: '14052', password: '1234'},
  {id: '37363', password: '1234'},
  {id: '26041', password: '1234'},
  {id: 'PA38', password: '1234'},
];

export const MENU_OPTIONS = {
  content: 'I can help you with following things.',
  suggestions: ['Pre-Disbursement', 'Finance', 'Post-Disbursement'],
};

export const handleLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  if (!username || !password) {
    return new Promise<any>((resolve, reject) => {
      reject('Username or password is incorrect.');
    });
  } else {
    const selectedUser = DUMMY_USERS.find(({id}) => id === `${username}`);

    if (!selectedUser || selectedUser.password !== password) {
      return new Promise<any>((resolve, reject) => {
        reject('Username or password is incorrect.');
      });
    }
    return new Promise<any>((resolve, reject) => {
      resolve({
        isSignedIn: true,
      });
    });
  }
};

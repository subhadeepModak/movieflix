export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_API_URL =
  'https://mmfsl-iht-container-dealerbuddy.thankfuldesert-989ed112.centralindia.azurecontainerapps.io';
//'https://mmfsl-iht-cont-searchcx-test.thankfuldesert-989ed112.centralindia.azurecontainerapps.io';

export const API_CONSTANTS_URL = `${BASE_API_URL}/get_app_constant`;

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
    return new Promise<any>(resolve => {
      resolve({
        isSignedIn: true,
      });
    });
  }
};

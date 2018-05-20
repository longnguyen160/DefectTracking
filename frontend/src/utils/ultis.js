import jwtDecode from 'jwt-decode';

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function setAccessToken(authResult) {
  localStorage.setItem('access_token', authResult.accessToken);
}

export function getUserIdFromToken() {
  const token = getAccessToken();

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.sub) {
      return decodedToken.sub;
    }
  }

  return null;
}

export function checkAuthentication() {
  return !!getUserIdFromToken();
}

export function getError(error) {
  const { response } = error;
  let message = 'Error! Please try again later';

  switch (response.status) {
    case 401:
      message = "Access Denied. You don't have permission";
      break;
    case 403:
      message = "Wrong email or password";
      break;
    default:
      message = response.data.message;
      break;
  }

  return message;
}

export const validateForm = {
  required: value => ((value || value === 0) ? null : 'Required'),
  number: value => (value && isNaN(Number(value)) ? 'Must be a number' : null),
  email: value => ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : null),
};

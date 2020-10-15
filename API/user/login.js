import fetchApi from '../fetchApi';

export default function login(username, password)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  }

  return fetchApi('user/login', options);
}

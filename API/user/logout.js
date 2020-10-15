import fetchApi from '../fetchApi';

export default function logout()
{
  return fetchApi('user/logout');
}

import fetchApi from '../fetchApi';

export default function updateUser(newUser)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newUser: newUser
    })
  }

  return fetchApi('user/update', options);
}

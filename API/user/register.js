import fetchApi from '../fetchApi';

export default function register(username, email, password, passwordConfirm, avatar)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userInputs: {
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      },
      avatarData: avatar
    })
  }

  return fetchApi('user/register', options);
}

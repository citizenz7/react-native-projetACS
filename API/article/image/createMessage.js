import fetchApi from '../../fetchApi';

export default function createMessage(image)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message })
  }

  return fetchApi('message/create', options);
}

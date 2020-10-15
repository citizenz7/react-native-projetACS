import fetchApi from '../fetchApi';

export default function updateMessage(newMessage)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newMessage: newMessage })
  }

  return fetchApi('message/update', options);
}

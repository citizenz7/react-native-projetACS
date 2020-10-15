import fetchApi from '../fetchApi';

export default function deleteMessage(messageId)
{
  return fetchApi(`message/delete?messageId=${messageId}`);
}

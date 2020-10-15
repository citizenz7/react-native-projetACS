import fetchApi from '../fetchApi';

export default function deleteMessage(messageId)
{
  return fetchApi(`message/create?messageId=${messageId}`);
}

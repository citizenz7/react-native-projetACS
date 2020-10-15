import fetchApi from '../fetchApi';

export default function updateArticle(newArticle)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newArticle: newArticle })
  }

  return fetchApi('article/update', options);
}

import fetchApi from '../fetchApi';

export default function deleteArticle(articleId)
{
  return fetchApi(`article/delete?articleId=${articleId}`);
}

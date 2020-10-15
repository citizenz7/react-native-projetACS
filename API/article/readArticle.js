import fetchApi from '../fetchApi';


export function getArticle(articleId)
{
  return fetchApi(`article/read?articleId=${articleId}`);
}

export function getArticleOf(sellerId, page = 1, max = 20)
{
  return fetchApi(`article/read/getArticleOf?sellerId=${sellerId}&page=${page}&max=${max}`);
}

export function searchArticle(searchBody, page = 1, max = 20)
{
  let { words, categories, sousCategories } = searchBody;
  if (!words) words = "";
  if (!categories) categories = "";
  if (!sousCategories) sousCategories = "";

  return fetchApi(`article/read/search?words=${words}&categories=${categories}&sousCategories=${sousCategories}&page=${page}&max=${max}`);
}

const readArticle = {
  getArticle: getArticle,
  getArticleOf: getArticleOf,
  searchArticle: searchArticle
}

export default readArticle;

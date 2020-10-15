import fetchApi from '../fetchApi';

export function getAvisFor(destinaterId, page = 1, max = 20)
{
  return fetchApi(`avis/read/avisFor?destinaterId=${destinaterId}&page=${page}&max=${max}`);
}

export function getAvisFrom(posterId, page = 1, max = 20)
{
  return fetchApi(`avis/read/avisFrom?posterId=${posterId}&page=${page}&max=${max}`);
}

const readAvis = {
  getAvisFor: getAvisFor,
  getAvisFrom: getAvisFrom
}

export default readAvis;

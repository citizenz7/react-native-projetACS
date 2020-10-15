import fetchApi from '../fetchApi';

export default function deleteAVis(avisId)
{
  return fetchApi(`avis/delete?avisId=${avisId}`);
}

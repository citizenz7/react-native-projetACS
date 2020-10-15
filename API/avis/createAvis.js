import fetchApi from '../fetchApi';

export default function createAvis(avis)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ avis: avis })
  }

  return fetchApi('avis/create', options);
}

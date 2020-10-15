import fetchApi from '../fetchApi';

export default function updateAvis(newAvis)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newAvis: newAvis })
  }

  return fetchApi('avis/update', options);
}

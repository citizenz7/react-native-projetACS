import fetchApi from '../../fetchApi';

export default function createImage(image)
{
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: image })
  }

  return fetchApi('article/image/create', options);
}

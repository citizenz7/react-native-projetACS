import fetchApi from '../../fetchApi';

export default function deleteImage(imageId)
{
  return fetchApi(`article/image/delete?imageId=${imageId}`);
}

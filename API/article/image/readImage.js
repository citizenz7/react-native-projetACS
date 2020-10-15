import fetchApi from '../../fetchApi';

export function getImage(imageId)
{
  return fetchApi(`article/image/read?imageId=${imageId}`);
}

export function getBase64(imageId)
{
  return fetchApi(`article/image/read/base64?imageId=${imageId}`);
}


const readImage = {
  getImage: getImage,
  getBase64: getBase64
}

export default readImage;

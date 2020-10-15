import login from './user/login';
import register from './user/register';
import logout from './user/logout';
import updateUser from './user/updateUser';

import createAvis from './avis/createAvis';
import deleteAvis from './avis/deleteAvis';
import readAvis, { getAvisFrom, getAvisFor } from './avis/readAvis';
import updateAvis from './avis/updateAvis';

import createMessage from './message/createMessage';
import deleteMessage from './message/deleteMessage';
import readMessage, { getMessage, getChatRoom, getRoomMessages } from './message/readMessage';
import updateMessage from './message/updateMessage';

import createArticle from './article/createArticle';
import deleteArticle from './article/deleteArticle';
import readArticle, { getArticle, getArticleOf, searchArticle } from './article/readArticle';
import updateArticle from './article/updateArticle';

const Api = {
  login: login,
  register: register,
  logout: logout,
  updateUser: updateUser,

  createAvis: createAvis,
  deleteAvis: deleteAvis,
  readAvis: readAvis,
  updateAvis: updateAvis,
  getAvisFrom: getAvisFrom,
  getAvisFor: getAvisFor,

  createMessage: createMessage,
  deleteMessage: deleteMessage,
  readMessage: readMessage,
  updateMessage: updateMessage,
  getMessage: getMessage,
  getChatRoom: getChatRoom,
  getRoomMessages: getRoomMessages,

  createMessage: createMessage,
  deleteMessage: deleteMessage,
  readMessage: readMessage,
  updateMessage: updateMessage,
  getArticle: getArticle,
  getArticleOf: getArticleOf,
  searchArticle: searchArticle,
}

export default Api;

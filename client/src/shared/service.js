import axios from 'axios';
const apiKey = 'AIzaSyDEDlsUp0QCDFVmklPr95wrapuh0CHzq2E';

export const chatAxios = axios.create({
  baseURL: 'https://pokemon-chat-52d89.firebaseio.com/'
});

export const ajaxSignIn = async data => {
  const result = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    data
  );
  return result;
};

export const ajaxSignUp = async data => {
  const result = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    data
  );
  return result;
};

export const ajaxBuildNewMember = async (id, userName) => {
  const result = await chatAxios.post(`/members/${id}.json`, {
    userName,
    avatar: 25,
    friends: 'undefined'
  });
  return result;
};

export const ajaxGetClientInfo = async id => {
  const result = await chatAxios.get(`/members/${id}.json`);
  return result;
};

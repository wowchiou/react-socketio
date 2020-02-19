import axios from 'axios';
const apiKey = 'AIzaSyDEDlsUp0QCDFVmklPr95wrapuh0CHzq2E';

export const chatAxios = axios.create({
  baseURL: 'https://pokemon-chat-52d89.firebaseio.com/'
});

export const ajaxSignIn = async data => {
  console.log(data);
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

export const ajaxBuildNewMember = async data => {
  const result = await chatAxios.post(
    `https://pokemon-chat-52d89.firebaseio.com/members/${data.id}.json`,
    { userName: data.userName }
  );
  return result;
};

export const ajaxGetClientInfo = async (id, form) => {
  const result = await chatAxios.get(
    `https://pokemon-chat-52d89.firebaseio.com/members/${id}.json`
  );
  return result;
};

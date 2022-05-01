import jwtDecode from 'jwt-decode';

const decodeMirageJWT = (request) => {
  return jwtDecode(request.requestHeaders.Authorization.slice('Bearer '.length));
};

export default decodeMirageJWT;

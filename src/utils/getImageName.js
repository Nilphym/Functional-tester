const getImageName = (imageUrl) => {
  const splited = imageUrl.split('/');
  return splited[splited.length - 1].split('.')[0];
};

export default getImageName;

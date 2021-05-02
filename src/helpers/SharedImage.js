import {GetPermissionRead, saveGifStorage} from './saveImage';



export const SharedImage = async (
  url,
  shared
) => {
  
  console.log(url)

  const granded = await GetPermissionRead();
  let res = await saveGifStorage(url, 'shared', notification = false, shared);
  

  return {
    granded, 
    res
  }
};

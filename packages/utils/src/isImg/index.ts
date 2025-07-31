/** 判断是否是图片链接 */
const isImg = (path: string): boolean => {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);
};
export default isImg;

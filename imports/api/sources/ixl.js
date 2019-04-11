
export const ixl = keys => {
  const baseUrl = 'https://www.ixl.com/standards/common-core/math/';
  const { grade } = keys;
  const url = (
    grade.code === 'K'    ? `${baseUrl}kindergarten`
  : grade.code[0] === 'H' ? `${baseUrl}high-school`
  :                         `${baseUrl}grade-${grade.code}`);
  const title = (
    grade.code[0] === 'H' ? `IXL ${grade.code} Skills Practice`
    :                       `IXL Grade ${grade.code} Skills Practice`)
  return {
    url,
    title,
  }
}

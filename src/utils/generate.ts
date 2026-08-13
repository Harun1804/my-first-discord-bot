function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateNewUrl(url: string): string {
  const urlSplit = url.split("/");
  const lastSegment = urlSplit[urlSplit.length - 1];
  const newSegment = generateRandomString(6);
  return url.replace(lastSegment, newSegment);
}

export { generateRandomString, generateNewUrl };

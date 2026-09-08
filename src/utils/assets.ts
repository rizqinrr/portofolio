export const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

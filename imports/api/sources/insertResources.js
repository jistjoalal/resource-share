import { ccCode } from './index'

export default insertResources = (stds, keySet, sources, keys={}, i=0) => {
  Object.values(stds).forEach(std => {
    if (typeof std != 'object') return;
    keys = { ...keys, [keySet[i]]: std };
    sources[keySet[i]].forEach(source => {
      insertResource(source, keys);
    })
    insertResources(std, keySet, sources, keys, i + 1);
  })
}

const insertResource = (source, keys) => {
  const { title, url } = source(keys);
  if (!title || !url) return;
  const code = 'Math/' + ccCode(keys);
  Resources.insert({
    title,
    url,
    code,
    ...DEFAULT_RESOURCE(),
  });
}

const DEFAULT_RESOURCE = () => ({
  type: 'URL',
  username: 'Jist',
  authorId: '1234',
  score: 0,
  favoritedBy: [],
  comments: [],
  createdAt: new Date(),
})

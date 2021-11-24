export const processHashtags = (caption) => {
  const hashWord = /#[\w]+/g;
  const newhashtags = caption.match(hashWord) || [];
  const hashtagArray = newhashtags.map(hashtag => ({
      where: {hashtag}, 
      create: {hashtag}
    }))

  return hashtagArray;
}
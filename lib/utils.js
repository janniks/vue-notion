// utils from react-notion
export const getTextContent = (text) => {
  return text.reduce((prev, current) => prev + current[0], '');
};

const groupBlockContent = (blockMap) => {
  const output = [];

  let lastType = undefined;
  let index = -1;

  Object.keys(blockMap).forEach((id) => {
    blockMap[id].value.content?.forEach((blockId) => {
      const blockType = blockMap[blockId]?.value?.type;

      if (blockType && blockType !== lastType) {
        index++;
        lastType = blockType;
        output[index] = [];
      }

      output[index].push(blockId);
    });

    lastType = undefined;
  });

  return output;
};

export const getListNumber = (blockId, blockMap) => {
  const groups = groupBlockContent(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};

export const defaultMapPageUrl = (pageId = '') => {
  pageId = pageId.replace(/-/g, '');

  return `/${pageId}`;
};

export const uuidToId = (uuid) => uuid.replaceAll('-', '');

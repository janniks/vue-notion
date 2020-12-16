import fetch from "cross-fetch";

const getPageTable = async (
  pageId,
  apiUrl = "https://notion-api.splitbee.io/v1"
) => await fetch(`${apiUrl}/table/${pageId}`).then((res) => res.json());

const getPageBlocks = async (
  pageId,
  apiUrl = "https://notion-api.splitbee.io/v1"
) => await fetch(`${apiUrl}/page/${pageId}`).then((res) => res.json());

export { getPageTable, getPageBlocks };

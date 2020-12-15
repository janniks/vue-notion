import fetch from "node-fetch";

export const getBlogTable = async (
  blogId,
  apiUrl = "https://notion-api.splitbee.io/v1"
) => await fetch(`${apiUrl}/table/${blogId}`).then((res) => res.json());

export const getPageBlocks = async (
  pageId,
  apiUrl = "https://notion-api.splitbee.io/v1"
) => await fetch(`${apiUrl}/page/${pageId}`).then((res) => res.json());

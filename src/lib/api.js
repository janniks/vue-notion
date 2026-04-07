const MAIN_API = "https://api.vue-notion.workers.dev/v1";
const SPLITBEE_API = "https://notion-api.splitbee.io/v1";

export const getPageTable = async (pageId, apiUrl = MAIN_API) => {
  try {
    const res = await fetch(`${apiUrl}/table/${pageId}`);
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) throw new Error("Empty response");
    return data;
  } catch (err) {
    console.warn("getPageTable fallback to Splitbee:", err);
    const res = await fetch(`${SPLITBEE_API}/table/${pageId}`);
    return res.json();
  }
};

export const getPageBlocks = async (pageId, apiUrl = MAIN_API) => {
  try {
    const res = await fetch(`${apiUrl}/page/${pageId}`);
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) throw new Error("Empty response");
    return data;
  } catch (err) {
    console.warn("getPageBlocks fallback to Splitbee:", err);
    const res = await fetch(`${SPLITBEE_API}/page/${pageId}`);
    return res.json();
  }
};
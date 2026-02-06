/**
 * Generate embed URL from source URL for known providers
 */
export function generateEmbedUrl(url: string): { embedUrl: string; provider: string } {
  if (!url || typeof url !== "string") {
    return { embedUrl: "", provider: "" };
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId = "";
      if (hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get("v") || "";
      }
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
          provider: "YouTube",
        };
      }
    }

    // TODO: Add more providers (Vimeo, Google Drive, Figma, etc.)
    // Contributions welcome for additional video/embed providers

    // Default: return original URL
    return { embedUrl: url, provider: "" };
  } catch (error) {
    console.warn(`Failed to parse embed URL: ${url}`, error);
    return { embedUrl: url, provider: "" };
  }
}

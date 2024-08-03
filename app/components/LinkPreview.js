import Link from "next/link";
import React, { useState, useEffect } from "react";

const LinkPreview = ({ url }) => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) throw new Error("Failed to fetch preview");
        const data = await response.json();

        // If it's a TikTok link and there's no image, fetch from TikTok's embed API
        if (
          url.includes("tiktok.com") &&
          (!data.images || data.images.length === 0)
        ) {
          const tiktokData = await fetchTikTokInfo(url);
          data.title = tiktokData.title;
          if (tiktokData.thumbnail_url) {
            data.images = [tiktokData.thumbnail_url];
          } else {
            // If it's a profile or we couldn't get a thumbnail, use the placeholder
            data.images = ["/images/tiktok_placeholder.jpg"];
          }
        }

        setPreviewData(data);
      } catch (err) {
        console.error("Error fetching link preview:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [url]);

  const fetchTikTokInfo = async (url) => {
    try {
      const response = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
      );
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.error("Error fetching TikTok embed info:", error);
      return {};
    }
  };

  if (loading) return <div>Loading preview...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!previewData) {
    return null;
  } else {
    console.log(previewData);
  }
  return (
    <Link
      key={url}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className=" bg-red-400 flex  gap-72 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300 w-[150px] h-[150px] ">
      {previewData.images && previewData.images.length > 0 && (
        <img
          src={previewData.images[0]}
          alt={previewData.title}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gray-700 bg-opacity-60 p-4">
        <h1 className="text-lg font-bold text-white overflow-hidden text-ellipsis whitespace-normal break-words max-h-28">
          {previewData.title}
        </h1>
      </div>
    </Link>
  );
};

export default LinkPreview;

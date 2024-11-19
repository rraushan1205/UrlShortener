"use client";
import { table } from "console";
import { useEffect, useState } from "react";
interface Url {
  id: string;
  shorturl: string;
  redirecturl: string;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  visitHistory: any[]; // Update this for specificity
}
export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [urls, setUrls] = useState<Url[]>([]);
  const getUrls = async () => {
    const allUrl = await fetch("/api/url/getAllUrl");
    if (allUrl) {
      const urldata = await allUrl.json();
      console.log(urldata.data);
      const url_data: Url[] = urldata.data;
      setUrls(url_data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url");
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    try {
      const response = await fetch("/url/shorten", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
      const data = await response.json();
      console.log(data.data);
      setShortenedUrl(data.data); // Update state with the short URL
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="grid place-content-center">
      <form onSubmit={handleSubmit} className="my-28">
        <label htmlFor="url">Url:</label>
        <input
          id="url"
          name="url"
          className="outline-none mx-4 rounded px-2 py-1 text-black"
          type="text"
          placeholder="Type your url here"
        />
        <button type="submit" className="bg-gray-800 px-2 py-1 rounded-sm">
          shorten
        </button>
      </form>
      <p className="" id="shortedId">
        <a href={shortenedUrl}>{shortenedUrl}</a>
      </p>
      <button className="bg-gray-700 px-2 py-1 rounded-lg" onClick={getUrls}>
        Get-Url
      </button>
      <table className="text-white mt-10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Short URL</th>
            <th>Redirect URL</th>
            <th>Visit Count</th>
          </tr>
        </thead>
        <tbody>
          {urls &&
            urls.map((urlItem, index) => (
              <tr key={index}>
                <td className="px-8 py-1 border border-gray-600">
                  {urlItem.id}
                </td>
                <td className="px-8 py-1 border border-gray-600">
                  {urlItem.shorturl}
                </td>
                <td className="px-8 py-1 border border-gray-600">
                  {urlItem.redirecturl}
                </td>
                <td className="px-8 py-1 border border-gray-600">
                  {urlItem.visitCount}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

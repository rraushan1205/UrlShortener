"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState("");

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
      <button className="bg-gray-700 px-2 py-1 rounded-lg">
        <Link href="/ShowAllUrl">Get-Url</Link>
      </button>
    </div>
  );
}

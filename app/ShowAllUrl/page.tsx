"use client";
import { table } from "console";
import { useEffect, useState } from "react";
import { createClient } from "redis";
import Loading from "../loading/Loading";
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
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUrls = async () => {
    const allUrl = await fetch("/api/url/getAllUrl");
    if (allUrl) {
      const urldata = await allUrl.json();
      const url_data: Url[] = urldata.data;
      setUrls(url_data);
      console.log(url_data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUrls();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid place-content-center">
      {urls && (
        <table className="text-white mt-10">
          <thead>
            <tr>
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
                    {urlItem.shorturl}
                  </td>
                  <td className="px-8 py-1 border border-gray-600">
                    {urlItem.redirecturl}
                  </td>
                  <td className="px-14 py-1 border border-gray-600">
                    {urlItem.visitCount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

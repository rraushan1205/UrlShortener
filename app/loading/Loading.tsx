export default function Loading() {
  return (
    <div className="grid place-content-center py-[200px]">
      <div className="border-4 w-36 h-36 border-l-0 border-t-0 animate-spin rounded-full  border-gray-600"></div>
      <h1 className="my-10 text-[25px]">Fetching data</h1>
    </div>
  );
}

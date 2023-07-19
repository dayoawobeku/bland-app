async function getData() {
  const res = await fetch('https://bland-app.vercel.app/api/tester');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Tester() {
  const data = await getData();
  return (
    <>
      <p>Data: {JSON.stringify(data)}</p>
    </>
  );
}

export default function Artists() {
  const artists = [
    { name: "Aarti Sharma", style: "Hyper-realistic", desc: "3 day express available" },
    { name: "Rohit Verma", style: "Hyper-realistic", desc: "Skin tone mastery" },
    { name: "Meera Kapoor", style: "Hyper-realistic", desc: "Wedding portraits" }
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((a) => (
          <div key={a.name} className="bg-white p-4 rounded shadow-sm">
            <div className="h-40 bg-gray-100 mb-3 rounded" />
            <h3 className="font-semibold">{a.name}</h3>
            <p className="text-sm text-gray-600">{a.style}</p>
            <p className="text-sm mt-2">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}￼Enter

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";
import AdminHeader from "@/layouts/AdminHeader";

type FileItem = {
  file: string;
  status: "linked" | "orphan" | "missing";
};

export default function AdminStorageAudit() {
  const [data, setData] = useState<{
    linked: FileItem[];
    orphan: FileItem[];
    missing: FileItem[];
    summary: any;
  } | null>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  
  const getPublicUrl = (file: string) =>
    `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file}`;

  useEffect(() => {
    fetch(`${apiUrl}/admin/storage/audit`, {
      credentials: "include",
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  const toggleSelect = (file: string) => {
    setSelected(prev =>
      prev.includes(file)
        ? prev.filter(f => f !== file)
        : [...prev, file]
    );
  };

  const deleteSelected = async () => {
    if (!confirm(`Delete ${selected.length} orphan files?`)) return;

    await fetch(`${apiUrl}/admin/storage/delete`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: selected }),
    });

    window.location.reload();
  };

  if (!data) return <p>Loading audit…</p>;

const render = (
  items: FileItem[],
  color: string,
  selectable = false
) =>
  items.map(item => {
    const imgUrl = getPublicUrl(item.file);
    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(item.file);

    return (
      <div
        key={item.file}
        className={`flex items-center gap-4 p-2 border-2 ${color}`}
      >
        {/* IMAGE PREVIEW */}
        <div className="relative group">
          {isImage ? (
            <img
              src={imgUrl}
              alt=""
              className="w-16 h-16 object-cover border rounded bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-xs">
              N/A
            </div>
          )}

          {/* HOVER ZOOM */}
          {isImage && (
            <img
              src={imgUrl}
              className="hidden group-hover:block absolute z-50 left-20 top-0 w-64 h-64 object-contain border-2 bg-white shadow-lg"
            />
          )}
        </div>

        {/* FILE PATH */}
        <div className="flex-1 text-xs break-all">
          {item.file}
        </div>

        {/* STATUS */}
        <span className="text-xs font-bold uppercase">
          {item.status === "linked" && "🟢"}
          {item.status === "orphan" && "🔴"}
          {item.status === "missing" && "🟡"}
        </span>

        {/* SELECT */}
        {selectable && (
          <input
            type="checkbox"
            checked={selected.includes(item.file)}
            onChange={() => toggleSelect(item.file)}
          />
        )}
      </div>
    );
  });


  return (
    <div className="space-y-6">
        <AdminHeader />
      <h1 className="text-2xl font-bold">Storage Audit</h1>

      <div className="flex gap-4 text-sm">
        <span>🟢 Linked: {data.summary.linked}</span>
        <span>🔴 Orphan: {data.summary.orphan}</span>
        <span>🟡 Missing: {data.summary.missing}</span>
      </div>

      <section>
        <h2 className="font-bold mb-2">🟢 Linked</h2>
        {render(data.linked, "bg-green-100 border-green-500")}
      </section>

      <section>
        <h2 className="font-bold mb-2">🔴 Orphan (safe to delete)</h2>
        {render(data.orphan, "bg-red-100 border-red-500", true)}
      </section>

      {selected.length > 0 && (
        <Button variant="destructive" onClick={deleteSelected}>
          Delete Selected ({selected.length})
        </Button>
      )}

      <section>
        <h2 className="font-bold mb-2">🟡 Missing in Storage</h2>
        {render(data.missing, "bg-yellow-100 border-yellow-500")}
      </section>
    </div>
  );
}

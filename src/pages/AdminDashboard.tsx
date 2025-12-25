import AdminHeader from "@/layouts/AdminHeader";

export default function AdminDashboard() {
  return (
    <div>
        <AdminHeader />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-2 p-6">
          <p className="text-sm text-muted-foreground">Posts</p>
          <p className="text-3xl font-bold">—</p>
        </div>

        <div className="border-2 p-6">
          <p className="text-sm text-muted-foreground">Categories</p>
          <p className="text-3xl font-bold">—</p>
        </div>

        <div className="border-2 p-6">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="text-3xl font-bold">—</p>
        </div>
      </div>
    </div>
  );
}

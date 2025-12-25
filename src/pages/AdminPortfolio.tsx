import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/layouts/AdminHeader";

type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  imageUrl: string;
  category: { name: string };
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const { toast } = useToast();

  const fetchItems = async () => {
    const res = await fetch(`${apiUrl}/portfolio`, {
      credentials: "include",
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;

    const res = await fetch(`${apiUrl}/admin/portfolio/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      toast({ title: "Deleted", description: "Item removed" });
      fetchItems();
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between mb-6 py-8">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Button asChild>
          <Link to="/admin/portfolio/new">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Link>
        </Button>
      </div>

      <div className="border-2 border-foreground">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border-b-2 border-foreground last:border-0"
          >
            <img
              src={item.imageUrl}
              className="w-20 h-16 object-cover border-2 border-foreground"
            />

            <div className="flex-1">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.client} · {item.category.name}
              </p>
            </div>

            <Button size="sm" variant="outline" asChild>
              <Link to={`/admin/portfolio/${item.id}`}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteItem(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

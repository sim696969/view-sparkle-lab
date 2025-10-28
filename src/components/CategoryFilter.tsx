import { Button } from "@/components/ui/button";
import { Coffee, Cookie, Sandwich, Leaf } from "lucide-react";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All', icon: Coffee },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'pastries', label: 'Pastries', icon: Cookie },
  { id: 'sandwiches', label: 'Sandwiches', icon: Sandwich },
  { id: 'tea', label: 'Tea', icon: Leaf },
];

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeCategory === id ? "default" : "outline"}
          onClick={() => onCategoryChange(id)}
          className={`flex items-center gap-2 whitespace-nowrap transition-smooth ${
            activeCategory === id 
              ? 'bg-gradient-primary text-primary-foreground shadow-warm scale-105' 
              : 'hover:bg-accent hover:border-accent'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  };
  onAddToCart: () => void;
}

export const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-hover bg-gradient-card border-border overflow-hidden">
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">RM {item.price.toFixed(2)}</span>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            size="sm"
            className="bg-gradient-primary text-primary-foreground hover:scale-105 transition-smooth shadow-warm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

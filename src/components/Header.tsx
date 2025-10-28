import { Coffee, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-warm">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-playfair text-foreground">Brew & Bites</h1>
              <p className="text-xs text-muted-foreground">Café</p>
            </div>
          </div>
          
          <Button 
            onClick={onCartClick}
            variant="outline"
            size="lg"
            className="relative hover:bg-accent hover:border-accent transition-smooth"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-warm animate-scale-in">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

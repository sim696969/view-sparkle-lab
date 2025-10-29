import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onCheckout: () => void;
}

export const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 animate-slide-in-right flex flex-col">
        <div className="p-6 border-b border-border animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold font-playfair text-foreground">Your Cart</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:rotate-90 transition-smooth hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>{itemCount} items</p>
        </div>

        <ScrollArea className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-scale-in">
              <ShoppingBag className="w-16 h-16 text-muted mb-4 opacity-50 animate-pulse" />
              <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth animate-fade-in hover:shadow-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-card transition-smooth hover:scale-110"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    <p className="text-sm font-medium text-primary mt-1">RM {item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button 
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 hover:scale-110 transition-smooth hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      
                      <Button 
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 hover:scale-110 transition-smooth hover:bg-primary/10 hover:border-primary hover:text-primary"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-foreground">RM {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/20 animate-fade-in">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">RM {total.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">RM {total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={onCheckout}
              className="w-full bg-gradient-primary text-primary-foreground hover:scale-105 transition-smooth shadow-warm h-12 text-base font-semibold"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

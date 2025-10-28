import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MenuCard } from "@/components/MenuCard";
import { Cart } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

import espressoImg from "@/assets/espresso.jpg";
import latteImg from "@/assets/latte.jpg";
import cappuccinoImg from "@/assets/cappuccino.jpg";
import coldBrewImg from "@/assets/cold-brew.jpg";
import croissantImg from "@/assets/croissant.jpg";
import muffinImg from "@/assets/muffin.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import teaImg from "@/assets/tea.jpg";

const menuItems = [
  { id: 'espresso', name: 'Espresso', price: 3.50, category: 'coffee', image: espressoImg, description: 'Rich and bold espresso shot' },
  { id: 'latte', name: 'Latte', price: 4.50, category: 'coffee', image: latteImg, description: 'Smooth espresso with steamed milk' },
  { id: 'cappuccino', name: 'Cappuccino', price: 4.25, category: 'coffee', image: cappuccinoImg, description: 'Equal parts espresso, milk, and foam' },
  { id: 'cold_brew', name: 'Cold Brew', price: 4.75, category: 'coffee', image: coldBrewImg, description: '16-hour steeped smooth coffee' },
  { id: 'chocolate_croissant', name: 'Chocolate Croissant', price: 3.25, category: 'pastries', image: croissantImg, description: 'Flaky croissant with rich chocolate' },
  { id: 'blueberry_muffin', name: 'Blueberry Muffin', price: 2.95, category: 'pastries', image: muffinImg, description: 'Moist muffin with fresh blueberries' },
  { id: 'turkey_sandwich', name: 'Turkey Avocado Sandwich', price: 7.50, category: 'sandwiches', image: sandwichImg, description: 'Fresh turkey with avocado on artisan bread' },
  { id: 'green_tea', name: 'Green Tea', price: 2.75, category: 'tea', image: teaImg, description: 'Premium Japanese green tea' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: typeof menuItems[0]) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => {
      return prev
        .map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Coming soon!",
      description: "Checkout functionality will be available soon",
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold font-playfair text-foreground mb-2">Our Menu</h2>
          <p className="text-muted-foreground">Freshly brewed coffee and delicious treats</p>
        </section>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <MenuCard 
                item={item}
                onAddToCart={() => addToCart(item)}
              />
            </div>
          ))}
        </div>
      </main>

      <Cart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;

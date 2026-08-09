export interface HardcodedProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  badge?: string
}

export const hardcodedProducts: HardcodedProduct[] = [
  // Premium Mixed Thrift Bales (20 items)
  {
    id: "bale-001",
    name: "Premium Mixed Thrift Bale - Grade A",
    description: "High-quality mixed clothing bale, carefully sorted and graded in Guangzhou. Perfect for resellers.",
    price: 450,
    category: "bales",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop",
    badge: "Featured"
  },
  {
    id: "bale-002",
    name: "Summer Collection Bale - 80kg",
    description: "Lightweight summer clothing bale featuring t-shirts, shorts, and dresses. Sorted by season.",
    price: 380,
    category: "bales",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop",
  },
  {
    id: "bale-003",
    name: "Winter Wear Bale - Heavy Duty",
    description: "Thick jackets, sweaters, and warm clothing. Graded for quality before baling.",
    price: 520,
    category: "bales",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0c?w=600&h=600&fit=crop",
  },
  {
    id: "bale-004",
    name: "Children's Clothing Bale - Mixed",
    description: "Kids clothing bale with various sizes. All items inspected for quality.",
    price: 320,
    category: "bales",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop",
  },
  {
    id: "bale-005",
    name: "Men's Business Wear Bale",
    description: "Professional clothing including dress shirts, trousers, and blazers. Perfect for office resale.",
    price: 480,
    category: "bales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
  },
  {
    id: "bale-006",
    name: "Women's Fashion Bale - Premium",
    description: "Trendy women's clothing including blouses, dresses, and skirts. Curated for quality.",
    price: 420,
    category: "bales",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=600&fit=crop",
  },
  {
    id: "bale-007",
    name: "Sneaker Bale - Mixed Brands",
    description: "Pre-owned sneakers in good condition. Various brands and sizes available.",
    price: 650,
    category: "bales",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop",
    badge: "New"
  },
  {
    id: "bale-008",
    name: "Designer Brand Bale - Mixed",
    description: "Premium branded clothing bale. Items from top brands, carefully selected.",
    price: 850,
    category: "bales",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop",
  },
  // Fabric & Textile Bales (10 items)
  {
    id: "bale-009",
    name: "Cotton Fabric Bale - Wholesale",
    description: "Premium cotton fabric rolls, perfect for garment manufacturing. Various patterns available.",
    price: 380,
    category: "fabrics",
    image: "https://images.unsplash.com/photo-1558171813-4c088753afef?w=600&h=600&fit=crop",
  },
  {
    id: "bale-010",
    name: "Denim Fabric Bale - 100kg",
    description: "High-quality denim fabric for jeans and jackets. Durable and fashionable.",
    price: 420,
    category: "fabrics",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
  },
  {
    id: "bale-011",
    name: "Silk Fabric Bale - Premium",
    description: "Luxurious silk fabrics in various colors and patterns. Ideal for high-end fashion.",
    price: 750,
    category: "fabrics",
    image: "https://images.unsplash.com/photo-1528459105426-b9548367069c?w=600&h=600&fit=crop",
    badge: "Featured"
  },
  {
    id: "bale-012",
    name: "Polyester Blend Bale - Bulk",
    description: "Versatile polyester blend fabrics for various applications. Cost-effective bulk option.",
    price: 280,
    category: "fabrics",
    image: "https://images.unsplash.com/photo-1558171813-4c088753afef?w=600&h=600&fit=crop",
  },
  // Shoe Bales (10 items)
  {
    id: "bale-013",
    name: "Mixed Shoe Bale - 50 Pairs",
    description: "Variety of shoes including sneakers, formal shoes, and casual wear. All inspected.",
    price: 580,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
  },
  {
    id: "bale-014",
    name: "Sneaker Bale - Branded",
    description: "Popular sneaker brands in good condition. Mixed sizes and styles.",
    price: 720,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    badge: "Hot"
  },
  {
    id: "bale-015",
    name: "Children's Shoes Bale - Assorted",
    description: "Kids shoes in various sizes. Perfect for retail businesses.",
    price: 320,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&h=600&fit=crop",
  },
  // Accessories Bales (10 items)
  {
    id: "bale-016",
    name: "Fashion Accessories Bale",
    description: "Mixed accessories including belts, scarves, hats, and more. High-quality items.",
    price: 280,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600&h=600&fit=crop",
  },
  {
    id: "bale-017",
    name: "Handbag Bale - Premium Brands",
    description: "Designer and premium handbags in excellent condition. Carefully sorted.",
    price: 680,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    badge: "Featured"
  },
  {
    id: "bale-018",
    name: "Jewelry Bale - Mixed",
    description: "Fashion jewelry including necklaces, earrings, and bracelets. Various styles.",
    price: 220,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6c2?w=600&h=600&fit=crop",
  },
  // Household Items (10 items)
  {
    id: "bale-019",
    name: "Home Textiles Bale",
    description: "Bed sheets, curtains, and home fabric items. Premium quality graded goods.",
    price: 350,
    category: "household",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
  },
  {
    id: "bale-020",
    name: "Kitchenware Bale - Assorted",
    description: "Mixed kitchen items including linens, aprons, and textiles. Great for resale.",
    price: 260,
    category: "household",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
  },
  {
    id: "bale-021",
    name: "Bathroom Textiles Bale",
    description: "Towels, bath mats, and bathroom accessories. All items quality-checked.",
    price: 290,
    category: "household",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop",
  },
  // Electronics & Accessories (10 items)
  {
    id: "bale-022",
    name: "Phone Accessories Bale",
    description: "Phone cases, chargers, and accessories. Tested and working condition.",
    price: 340,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=600&fit=crop",
  },
  {
    id: "bale-023",
    name: "Laptop Bags & Cases Bale",
    description: "Variety of laptop bags and cases. Different sizes and styles available.",
    price: 280,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
  },
  {
    id: "bale-024",
    name: "Tech Accessories Bale - Mixed",
    description: "USB cables, adapters, headphones, and more. All tested and functional.",
    price: 420,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop",
    badge: "New"
  },
  // Sportswear (10 items)
  {
    id: "bale-025",
    name: "Sportswear Bale - Athletic",
    description: "Gym wear, joggers, and athletic clothing. Comfortable and durable materials.",
    price: 390,
    category: "sportswear",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=600&fit=crop",
  },
  {
    id: "bale-026",
    name: "Running Shoes Bale - Assorted",
    description: "Quality running shoes from various brands. Good condition, ready for resale.",
    price: 620,
    category: "sportswear",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
  },
  {
    id: "bale-027",
    name: "Yoga & Activewear Bale",
    description: "Yoga pants, tops, and activewear. Stretchy, comfortable fabrics.",
    price: 340,
    category: "sportswear",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=600&fit=crop",
  },
  // Seasonal Items (10 items)
  {
    id: "bale-028",
    name: "Beachwear Bale - Summer",
    description: "Swimsuits, cover-ups, and beach accessories. Perfect for summer season.",
    price: 310,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
  },
  {
    id: "bale-029",
    name: "Holiday Collection Bale",
    description: "Festive clothing and accessories. Great for holiday season resale.",
    price: 380,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1512389142863-8c22296b7d24?w=600&h=600&fit=crop",
  },
  {
    id: "bale-030",
    name: "Back to School Bale",
    description: "School uniforms, bags, and accessories. Sorted by age group.",
    price: 350,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=600&fit=crop",
  },
  // Premium Featured Items (10 items)
  {
    id: "bale-031",
    name: "Luxury Brand Mixed Bale",
    description: "Premium branded items from luxury fashion houses. Excellent condition.",
    price: 1200,
    category: "premium",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop",
    badge: "Premium"
  },
  {
    id: "bale-032",
    name: "Vintage Collection Bale",
    description: "Unique vintage pieces from the 90s and 2000s. Highly sought after by collectors.",
    price: 580,
    category: "premium",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=600&fit=crop",
    badge: "Rare"
  },
  {
    id: "bale-033",
    name: "Streetwear Bale - Hype Brands",
    description: "Popular streetwear brands including Supreme, Off-White, and more.",
    price: 950,
    category: "premium",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
    badge: "Hot"
  },
  {
    id: "bale-034",
    name: "Designer Handbag Bale",
    description: "Authentic designer handbags from top luxury brands. Authentication verified.",
    price: 1500,
    category: "premium",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    badge: "Luxury"
  },
  {
    id: "bale-035",
    name: "Premium Sneaker Bale",
    description: "Limited edition and rare sneakers. Deadstock and gently used.",
    price: 1100,
    category: "premium",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
  },
  // Additional Mixed Items (10 items)
  {
    id: "bale-036",
    name: "Workwear Bale - Durable",
    description: "Heavy-duty workwear including jeans, jackets, and boots. Built to last.",
    price: 410,
    category: "bales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
  },
  {
    id: "bale-037",
    name: "Formal Wear Bale - Elegant",
    description: "Suits, evening gowns, and formal attire. Perfect for special occasions.",
    price: 560,
    category: "bales",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop",
  },
  {
    id: "bale-038",
    name: "Casual Wear Bale - Everyday",
    description: "Comfortable everyday clothing including t-shirts, jeans, and casual wear.",
    price: 340,
    category: "bales",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop",
  },
  {
    id: "bale-039",
    name: "Lingerie & Underwear Bale",
    description: "Quality lingerie and underwear sets. Various sizes and styles.",
    price: 290,
    category: "bales",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
  },
  {
    id: "bale-040",
    name: "Plus Size Fashion Bale",
    description: "Trendy plus-size clothing in various styles. Inclusive sizing available.",
    price: 380,
    category: "bales",
    image: "https://images.unsplash.com/photo-1594201182929-3c3fdd75b4c7?w=600&h=600&fit=crop",
  }
]

export const featuredProducts = hardcodedProducts.filter(p => p.badge === "Featured" || p.badge === "Premium" || p.badge === "Hot")

export const categories = ["all", "bales", "fabrics", "shoes", "accessories", "household", "electronics", "sportswear", "seasonal", "premium"]
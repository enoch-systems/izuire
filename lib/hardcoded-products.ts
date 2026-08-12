export interface HardcodedProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  images?: string[]
  badge?: string
}

const NEW_IMAGE_URL = "https://res.cloudinary.com/djdbcoyot/image/upload/v1786553251/gtnizvboye5kfupmx74k.jpg"

export const hardcodedProducts: HardcodedProduct[] = [
  // Premium Mixed Thrift Bales (20 items)
  {
    id: "bale-001",
    name: "Premium Mixed Thrift Bale - Grade A",
    description: "High-quality mixed clothing bale, carefully sorted and graded in Guangzhou. Perfect for resellers.",
    price: 450,
    category: "bales",
    image: NEW_IMAGE_URL,
    badge: "Featured"
  },
  {
    id: "bale-002",
    name: "Summer Collection Bale - 80kg",
    description: "Lightweight summer clothing bale featuring t-shirts, shorts, and dresses. Sorted by season.",
    price: 380,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-003",
    name: "Winter Wear Bale - Heavy Duty",
    description: "Thick jackets, sweaters, and warm clothing. Graded for quality before baling.",
    price: 520,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-004",
    name: "Children's Clothing Bale - Mixed",
    description: "Kids clothing bale with various sizes. All items inspected for quality.",
    price: 320,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-005",
    name: "Men's Business Wear Bale",
    description: "Professional clothing including dress shirts, trousers, and blazers. Perfect for office resale.",
    price: 480,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-006",
    name: "Women's Fashion Bale - Premium",
    description: "Trendy women's clothing including blouses, dresses, and skirts. Curated for quality.",
    price: 420,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-007",
    name: "Sneaker Bale - Mixed Brands",
    description: "Pre-owned sneakers in good condition. Various brands and sizes available.",
    price: 650,
    category: "bales",
    image: NEW_IMAGE_URL,
    badge: "New"
  },
  {
    id: "bale-008",
    name: "Designer Brand Bale - Mixed",
    description: "Premium branded clothing bale. Items from top brands, carefully selected.",
    price: 850,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  // Fabric & Textile Bales (10 items)
  {
    id: "bale-009",
    name: "Cotton Fabric Bale - Wholesale",
    description: "Premium cotton fabric rolls, perfect for garment manufacturing. Various patterns available.",
    price: 380,
    category: "fabrics",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-010",
    name: "Denim Fabric Bale - 100kg",
    description: "High-quality denim fabric for jeans and jackets. Durable and fashionable.",
    price: 420,
    category: "fabrics",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-011",
    name: "Silk Fabric Bale - Premium",
    description: "Luxurious silk fabrics in various colors and patterns. Ideal for high-end fashion.",
    price: 750,
    category: "fabrics",
    image: NEW_IMAGE_URL,
    badge: "Featured"
  },
  {
    id: "bale-012",
    name: "Polyester Blend Bale - Bulk",
    description: "Versatile polyester blend fabrics for various applications. Cost-effective bulk option.",
    price: 280,
    category: "fabrics",
    image: NEW_IMAGE_URL,
  },
  // Shoe Bales (10 items)
  {
    id: "bale-013",
    name: "Mixed Shoe Bale - 50 Pairs",
    description: "Variety of shoes including sneakers, formal shoes, and casual wear. All inspected.",
    price: 580,
    category: "shoes",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-014",
    name: "Sneaker Bale - Branded",
    description: "Popular sneaker brands in good condition. Mixed sizes and styles.",
    price: 720,
    category: "shoes",
    image: NEW_IMAGE_URL,
    badge: "Hot"
  },
  {
    id: "bale-015",
    name: "Children's Shoes Bale - Assorted",
    description: "Kids shoes in various sizes. Perfect for retail businesses.",
    price: 320,
    category: "shoes",
    image: NEW_IMAGE_URL,
  },
  // Accessories Bales (10 items)
  {
    id: "bale-016",
    name: "Fashion Accessories Bale",
    description: "Mixed accessories including belts, scarves, hats, and more. High-quality items.",
    price: 280,
    category: "accessories",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-017",
    name: "Handbag Bale - Premium Brands",
    description: "Designer and premium handbags in excellent condition. Carefully sorted.",
    price: 680,
    category: "accessories",
    image: NEW_IMAGE_URL,
    badge: "Featured"
  },
  {
    id: "bale-018",
    name: "Jewelry Bale - Mixed",
    description: "Fashion jewelry including necklaces, earrings, and bracelets. Various styles.",
    price: 220,
    category: "accessories",
    image: NEW_IMAGE_URL,
  },
  // Household Items (10 items)
  {
    id: "bale-019",
    name: "Home Textiles Bale",
    description: "Bed sheets, curtains, and home fabric items. Premium quality graded goods.",
    price: 350,
    category: "household",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-020",
    name: "Kitchenware Bale - Assorted",
    description: "Mixed kitchen items including linens, aprons, and textiles. Great for resale.",
    price: 260,
    category: "household",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-021",
    name: "Bathroom Textiles Bale",
    description: "Towels, bath mats, and bathroom accessories. All items quality-checked.",
    price: 290,
    category: "household",
    image: NEW_IMAGE_URL,
  },
  // Electronics & Accessories (10 items)
  {
    id: "bale-022",
    name: "Phone Accessories Bale",
    description: "Phone cases, chargers, and accessories. Tested and working condition.",
    price: 340,
    category: "electronics",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-023",
    name: "Laptop Bags & Cases Bale",
    description: "Variety of laptop bags and cases. Different sizes and styles available.",
    price: 280,
    category: "electronics",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-024",
    name: "Tech Accessories Bale - Mixed",
    description: "USB cables, adapters, headphones, and more. All tested and functional.",
    price: 420,
    category: "electronics",
    image: NEW_IMAGE_URL,
    badge: "New"
  },
  // Sportswear (10 items)
  {
    id: "bale-025",
    name: "Sportswear Bale - Athletic",
    description: "Gym wear, joggers, and athletic clothing. Comfortable and durable materials.",
    price: 390,
    category: "sportswear",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-026",
    name: "Running Shoes Bale - Assorted",
    description: "Quality running shoes from various brands. Good condition, ready for resale.",
    price: 620,
    category: "sportswear",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-027",
    name: "Yoga & Activewear Bale",
    description: "Yoga pants, tops, and activewear. Stretchy, comfortable fabrics.",
    price: 340,
    category: "sportswear",
    image: NEW_IMAGE_URL,
  },
  // Seasonal Items (10 items)
  {
    id: "bale-028",
    name: "Beachwear Bale - Summer",
    description: "Swimsuits, cover-ups, and beach accessories. Perfect for summer season.",
    price: 310,
    category: "seasonal",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-029",
    name: "Holiday Collection Bale",
    description: "Festive clothing and accessories. Great for holiday season resale.",
    price: 380,
    category: "seasonal",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-030",
    name: "Back to School Bale",
    description: "School uniforms, bags, and accessories. Sorted by age group.",
    price: 350,
    category: "seasonal",
    image: NEW_IMAGE_URL,
  },
  // Premium Featured Items (10 items)
  {
    id: "bale-031",
    name: "Luxury Brand Mixed Bale",
    description: "Premium branded items from luxury fashion houses. Excellent condition.",
    price: 1200,
    category: "premium",
    image: NEW_IMAGE_URL,
    badge: "Premium"
  },
  {
    id: "bale-032",
    name: "Vintage Collection Bale",
    description: "Unique vintage pieces from the 90s and 2000s. Highly sought after by collectors.",
    price: 580,
    category: "premium",
    image: NEW_IMAGE_URL,
    badge: "Rare"
  },
  {
    id: "bale-033",
    name: "Streetwear Bale - Hype Brands",
    description: "Popular streetwear brands including Supreme, Off-White, and more.",
    price: 950,
    category: "premium",
    image: NEW_IMAGE_URL,
    badge: "Hot"
  },
  {
    id: "bale-034",
    name: "Designer Handbag Bale",
    description: "Authentic designer handbags from top luxury brands. Authentication verified.",
    price: 1500,
    category: "premium",
    image: NEW_IMAGE_URL,
    badge: "Luxury"
  },
  {
    id: "bale-035",
    name: "Premium Sneaker Bale",
    description: "Limited edition and rare sneakers. Deadstock and gently used.",
    price: 1100,
    category: "premium",
    image: NEW_IMAGE_URL,
  },
  // Additional Mixed Items (10 items)
  {
    id: "bale-036",
    name: "Workwear Bale - Durable",
    description: "Heavy-duty workwear including jeans, jackets, and boots. Built to last.",
    price: 410,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-037",
    name: "Formal Wear Bale - Elegant",
    description: "Suits, evening gowns, and formal attire. Perfect for special occasions.",
    price: 560,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-038",
    name: "Casual Wear Bale - Everyday",
    description: "Comfortable everyday clothing including t-shirts, jeans, and casual wear.",
    price: 340,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-039",
    name: "Lingerie & Underwear Bale",
    description: "Quality lingerie and underwear sets. Various sizes and styles.",
    price: 290,
    category: "bales",
    image: NEW_IMAGE_URL,
  },
  {
    id: "bale-040",
    name: "Plus Size Fashion Bale",
    description: "Trendy plus-size clothing in various styles. Inclusive sizing available.",
    price: 380,
    category: "bales",
    image: NEW_IMAGE_URL,
  }
]

export const featuredProducts = hardcodedProducts.filter(p => p.badge === "Featured" || p.badge === "Premium" || p.badge === "Hot")

export const categories = ["all", "bales", "fabrics", "shoes", "accessories", "household", "electronics", "sportswear", "seasonal", "premium"]
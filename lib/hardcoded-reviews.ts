export interface HardcodedReview {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
  product: string
  image: string
  productImage: string
  gallery: string[]
}

const NEW_IMAGE_URL = "https://res.cloudinary.com/djdbcoyot/image/upload/v1786553251/gtnizvboye5kfupmx74k.jpg"

export const hardcodedReviews: HardcodedReview[] = [
  {
    id: "review-001",
    name: "Ahmed K.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "IZUIRE has transformed my business. The quality of thrift bales I receive is consistently excellent. Every item is properly sorted and graded. My customers love the quality!",
    date: "2024-01-15",
    product: "Premium Mixed Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-002",
    name: "Fatima M.",
    location: "Accra, Ghana",
    rating: 5,
    text: "Best sourcing service in China! They inspect every bale before shipping. I've been ordering for 6 months and the quality never disappoints. Highly recommended!",
    date: "2024-01-12",
    product: "Silk Fabric Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-003",
    name: "Chidi O.",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "The service charge is worth every penny. They saved me from buying low-quality stock. Now I only order through IZUIRE. My resale business has grown 3x!",
    date: "2024-01-10",
    product: "Sneaker Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-004",
    name: "Aisha B.",
    location: "Nairobi, Kenya",
    rating: 4,
    text: "Professional team with excellent communication. They send photos and videos of the bales before shipping. Very transparent and trustworthy service.",
    date: "2024-01-08",
    product: "Women's Fashion Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-005",
    name: "Oluwaseun A.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Fast shipping and excellent packaging. The bales arrived in perfect condition. Will definitely order again. The quality grading system is top-notch!",
    date: "2024-01-05",
    product: "Designer Brand Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-006",
    name: "Musa I.",
    location: "Kano, Nigeria",
    rating: 5,
    text: "I was skeptical at first, but after my first order I'm a loyal customer. The mixed bales have great variety. Perfect for my retail shop!",
    date: "2024-01-03",
    product: "Mixed Shoe Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-007",
    name: "Grace N.",
    location: "Accra, Ghana",
    rating: 5,
    text: "The inspection service is invaluable. They caught damaged items before shipping and replaced them. True professionals who care about their clients.",
    date: "2024-01-01",
    product: "Premium Mixed Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-008",
    name: "Emeka J.",
    location: "Port Harcourt, Nigeria",
    rating: 4,
    text: "Great prices and quality. The ¥500 full-day service is a bargain for the quality you get. They even helped me negotiate with suppliers.",
    date: "2023-12-28",
    product: "Men's Business Wear Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-009",
    name: "Zainab H.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "I've tried other sourcing agents, but IZUIRE is different. They actually care about quality. Every bale I've received has been worth the investment.",
    date: "2023-12-25",
    product: "Fashion Accessories Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-010",
    name: "Ibrahim S.",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "The WhatsApp support is very responsive. Any questions I have are answered quickly. Makes the whole ordering process smooth and easy.",
    date: "2023-12-22",
    product: "Children's Clothing Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-011",
    name: "Blessing E.",
    location: "Lagos, Nigeria",
    rating: 4,
    text: "Love the variety of products available. From fabrics to shoes, they have it all. Makes my sourcing trips to China much more efficient.",
    date: "2023-12-20",
    product: "Cotton Fabric Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  },
  {
    id: "review-012",
    name: "David T.",
    location: "Accra, Ghana",
    rating: 5,
    text: "Third order and still impressed. The grading system ensures you know exactly what quality to expect. No surprises, just quality products every time.",
    date: "2023-12-18",
    product: "Premium Mixed Bale",
    image: NEW_IMAGE_URL,
    productImage: NEW_IMAGE_URL,
    gallery: [
      NEW_IMAGE_URL,
      NEW_IMAGE_URL,
      NEW_IMAGE_URL
    ]
  }
]
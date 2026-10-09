export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How can I rent from SharePal?",
    answer:
      "Renting from SharePal is simple and completely hassle-free. Select your preferred delivery and pickup dates, browse our extensive collection of gaming consoles, cameras, and gear, add your chosen items to the cart, and proceed to checkout. Complete a quick digital KYC verification, and we will deliver sanitized, ready-to-play gear directly to your doorstep with zero hidden charges.",
  },
  {
    id: "faq-2",
    question:
      "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    answer:
      "Partial extensions are completely supported! If you rented multiple items (e.g., a PS5 console and additional controllers or games), you can choose to extend only specific items from your order dashboard or contact our customer support team at least 24 hours before your scheduled pickup date.",
  },
  {
    id: "faq-3",
    question: "When does the rental start?",
    answer:
      "Your rental period officially starts only from the scheduled delivery date you selected at the time of placing your order. We deliver between 5 PM and 11 PM on your delivery day (or earlier if chosen), and pickup occurs after 9 AM on your chosen return date. We do not charge you for transit or turnaround time!",
  },
  {
    id: "faq-4",
    question: "What will be the condition of the products at the time of delivery?",
    answer:
      "All products on SharePal undergo rigorous multi-point quality checks, sanitization, and performance testing before every dispatch. Consoles are updated to the latest firmware with fresh controller grips, cleaned optical lenses/fans, and are packaged securely in protective travel cases.",
  },
  {
    id: "faq-5",
    question: "Why is verification required?",
    answer:
      "Because we provide high-value electronic equipment and gaming consoles with zero or minimal security deposit, a fast one-time digital KYC verification (Govt ID proof and delivery address verification) ensures trust, community safety, and seamless doorstep delivery.",
  },
];

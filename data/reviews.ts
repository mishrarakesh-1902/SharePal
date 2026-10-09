export interface Review {
  id: string;
  initials: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  text: string;
}

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    initials: "RS",
    name: "Rakesh",
    location: "Mumbai",
    category: "Trekking Gear",
    rating: 5,
    text: "Ordered 2 pair of shoes & 3 trekking poles. Shoes were in mint condition, very well cleaned and sanitized and so does the trekking poles. Delivery and pick-u...",
  },
  {
    id: "rev-2",
    initials: "SJ",
    name: "Shruti",
    location: "Mumbai",
    category: "Winter Wear",
    rating: 5,
    text: "Right from the time I saw their website, till I got my refund the entire experience with SharePal was brilliant. The product listing, prices, delivery, communication...",
  },
  {
    id: "rev-3",
    initials: "AK",
    name: "Amit",
    location: "Delhi",
    category: "Riding Gear",
    rating: 5,
    text: "Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received...",
  },
  {
    id: "rev-4",
    initials: "SB",
    name: "Satyaki",
    location: "Kolkata",
    category: "Trekking Gear",
    rating: 5,
    text: "I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super...",
  },
  {
    id: "rev-5",
    initials: "PD",
    name: "Prateek",
    location: "Bangalore",
    category: "Gaming Gadgets",
    rating: 5,
    text: "Rented a PS5 console with FC26 and extra dualsense controllers for our weekend gaming party. The setup was instant, condition was pristine, and games worked flawlessly...",
  },
  {
    id: "rev-6",
    initials: "VK",
    name: "Varun",
    location: "Bangalore",
    category: "PS5 Console",
    rating: 5,
    text: "Super smooth delivery right to my doorstep in Koramangala. The 100+ games library kept us entertained all week. Definitely renting again for our next holiday...",
  },
  {
    id: "rev-7",
    initials: "RG",
    name: "Rohan",
    location: "Pune",
    category: "Action Cameras",
    rating: 5,
    text: "Got the GoPro Hero 12 for my Ladakh road trip with all mounting accessories and memory cards. Hassel-free KYC and prompt doorstep pickup when I returned...",
  },
  {
    id: "rev-8",
    initials: "NM",
    name: "Neha",
    location: "Hyderabad",
    category: "VR & Consoles",
    rating: 5,
    text: "The Oculus Quest 2 VR headset experience was mind blowing. Battery life and lenses were in top-notch condition. Outstanding customer support team...",
  },
];

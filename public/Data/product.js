const electronicProducts = [
  // --- ឡានអគ្គិសនី (Electric Cars) ---
  { "id": 1, "name": "Tesla Model Y Performance", "price": 52490, "img": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500", "status": "new" },
  { "id": 2, "name": "Porsche Taycan Electric", "price": 118500, "img": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500", "status": "new" },
  { "id": 3, "name": "Hyundai Ioniq 5 EV", "price": 42450, "img": "https://images.unsplash.com/photo-1669824003753-4889508b9815?w=500", "status": "sale" },
  { "id": 4, "name": "Rivian R1T Electric Truck", "price": 69900, "img": "https://images.unsplash.com/photo-1669046755489-0ff448b1fc58?w=500", "status": "new" },
  { "id": 5, "name": "Audi e-tron GT", "price": 104900, "img": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500", "status": "sale" },

  // --- ម៉ូតូ និងកង់អគ្គិសនី (Electric Bikes & Scooters) ---
  { "id": 6, "name": "Yamaha E-Bike Mountain", "price": 4799, "img": "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500", "status": "new" },
  { "id": 7, "name": "Super73 Electric Bike", "price": 3295, "img": "https://images.unsplash.com/photo-1620436444855-66795bdf354f?w=500", "status": "sale" },
  { "id": 8, "name": "Segway Ninebot Max Scooter", "price": 899, "img": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500", "status": "new" },
  { "id": 9, "name": "Vespa Elettrica Scooter", "price": 7499, "img": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500", "status": "sale" },
  { "id": 10, "name": "Rad Power Cargo E-Bike", "price": 2299, "img": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500", "status": "new" },

  // --- ទូរស័ព្ទ និងថេប្លេត (Smartphones & Tablets) ---
  { "id": 11, "name": "iPhone 16 Pro Max", "price": 1199, "img": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500", "status": "new" },
  { "id": 12, "name": "Samsung Galaxy S26 Ultra", "price": 1299, "img": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", "status": "new" },
  { "id": 13, "name": "Google Pixel 9 Pro XL", "price": 1099, "img": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", "status": "sale" },
  { "id": 14, "name": "iPad Pro M4 Liquid Retina", "price": 999, "img": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", "status": "new" },
  { "id": 15, "name": "Samsung Galaxy Z Fold", "price": 1799, "img": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "status": "sale" },

  // --- កុំព្យូទ័រ និងគ្រឿងហ្គេម (Computers & Gaming) ---
  { "id": 16, "name": "MacBook Air M3 13-inch", "price": 1099, "img": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500", "status": "sale" },
  { "id": 17, "name": "Dell XPS 15 OLED Laptop", "price": 1899, "img": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500", "status": "new" },
  { "id": 18, "name": "Sony PlayStation 5 Pro", "price": 699, "img": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500", "status": "sale" },
  { "id": 19, "name": "Nintendo Switch OLED", "price": 349, "img": "https://images.unsplash.com/photo-1578345218746-50a229b3d0f8?w=500", "status": "sale" },
  { "id": 20, "name": "Asus ROG Ally Handheld", "price": 699, "img": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500", "status": "new" },

  // --- កាមេរ៉ា និងគ្រឿងសំឡេង (Cameras & Audio) ---
  { "id": 21, "name": "Sony Alpha Mirrorless Camera", "price": 2499, "img": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", "status": "new" },
  { "id": 22, "name": "Sony WH-1000XM5 Headphones", "price": 348, "img": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", "status": "sale" },
  { "id": 23, "name": "AirPods Pro 2nd Gen", "price": 199, "img": "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=500", "status": "sale" },
  { "id": 24, "name": "DJI Mini 4 Pro Drone", "price": 759, "img": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500", "status": "new" },
  { "id": 25, "name": "GoPro HERO13 Black", "price": 399, "img": "https://images.unsplash.com/photo-1565849906461-0e443307583e?w=500", "status": "new" },

  // --- ឧបករណ៍វៃឆ្លាតផ្សេងៗ (Smart Gadgets) ---
  { "id": 26, "name": "Apple Watch Ultra 2", "price": 799, "img": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500", "status": "new" },
  { "id": 27, "name": "Meta Quest 3 VR Headset", "price": 499, "img": "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500", "status": "sale" },
  { "id": 28, "name": "Samsung 49\" Gaming Monitor", "price": 1199, "img": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500", "status": "sale" },
  { "id": 29, "name": "Keychron Mechanical Keyboard", "price": 169, "img": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500", "status": "new" },
  { "id": 30, "name": "JBL Boombox 3 Speaker", "price": 449, "img": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", "status": "sale" }
];
export default electronicProducts;
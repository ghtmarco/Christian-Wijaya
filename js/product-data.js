const productData = [
    {
        id: "1",
        name: "Elegant Summer Dress",
        category: "dresses",
        price: 2500000,
        imageSrc: "Assets/image_2.jpg",
        productTag: "New",
        descriptionShort: "A flowing summer dress perfect for elegant occasions.",
        descriptionLong: "Experience the perfect blend of comfort and sophistication with our Elegant Summer Dress. Crafted from premium lightweight fabric, this dress features a flowing silhouette that flatters every figure. The delicate details and timeless design make it perfect for both casual outings and special occasions.",
        availableSizes: ["XS", "S", "M", "L", "XL"],
        details: {
            material: "100% Premium Cotton",
            care: "Machine wash cold, hang dry",
            fit: "Regular fit, true to size",
            origin: "Made in Indonesia",
            sku: "CW-SD-001"
        }
    },
    {
        id: "2",
        name: "Silk Blouse",
        category: "tops",
        price: 1800000,
        imageSrc: "Assets/image_3.jpg",
        productTag: "",
        descriptionShort: "Luxurious silk blouse for professional elegance.",
        descriptionLong: "Elevate your workwear with this luxurious silk blouse. Its smooth texture and classic cut offer timeless appeal, ensuring you look polished and professional for any business engagement or elegant evening out.",
        availableSizes: ["S", "M", "L"],
        details: {
            material: "100% Mulberry Silk",
            care: "Dry clean only",
            fit: "Tailored fit",
            origin: "Made in Italy",
            sku: "CW-TB-002"
        }
    },
    {
        id: "3",
        name: "Tailored Trousers",
        category: "bottoms",
        price: 2200000,
        imageSrc: "Assets/image_4.jpg",
        productTag: "",
        descriptionShort: "Perfectly tailored trousers for modern sophistication.",
        descriptionLong: "These perfectly tailored trousers are a staple for modern sophistication. Designed with a flattering high waist and a sleek straight leg, they offer both comfort and style for the discerning woman.",
        availableSizes: ["S", "M", "L", "XL"],
        details: {
            material: "Wool Blend (70% Wool, 30% Polyester)",
            care: "Dry clean recommended",
            fit: "Straight leg, high waist",
            origin: "Made in Indonesia",
            sku: "CW-BB-003"
        }
    },
    {
        id: "4",
        name: "Leather Handbag",
        category: "accessories",
        price: 1200000,
        imageSrc: "Assets/image_5.jpg",
        productTag: "",
        descriptionShort: "Premium leather handbag with timeless design.",
        descriptionLong: "A premium leather handbag that combines timeless design with practical functionality. Featuring multiple compartments and an adjustable strap, it's the perfect accessory for everyday elegance.",
        availableSizes: ["One Size"],
        details: {
            material: "Genuine Calfskin Leather",
            care: "Wipe clean with damp cloth, use leather conditioner",
            fit: "N/A",
            origin: "Made in France",
            sku: "CW-AC-004"
        }
    },
    {
        id: "5",
        name: "Evening Gown",
        category: "dresses",
        price: 3200000,
        imageSrc: "Assets/image_6.jpg",
        productTag: "New",
        descriptionShort: "Stunning evening gown for special occasions.",
        descriptionLong: "Make a grand entrance with this stunning evening gown. Intricately detailed with hand-sewn embellishments and crafted from luxurious flowing fabric, this gown is designed for those unforgettable special occasions.",
        availableSizes: ["XS", "S", "M"],
        details: {
            material: "Silk Chiffon with Sequin Embellishments",
            care: "Specialist dry clean only",
            fit: "Floor-length, A-line silhouette",
            origin: "Made in Indonesia",
            sku: "CW-SD-005"
        }
    },
    {
        id: "6",
        name: "Cashmere Sweater",
        category: "tops",
        price: 1500000,
        imageSrc: "Assets/image_7.jpg",
        productTag: "",
        descriptionShort: "Soft cashmere sweater for ultimate comfort.",
        descriptionLong: "Indulge in the ultimate comfort with our soft cashmere sweater. This versatile piece features a classic crew neck and a relaxed fit, perfect for layering or wearing on its own for a touch of everyday luxury.",
        availableSizes: ["S", "M", "L", "XL"],
        details: {
            material: "100% Mongolian Cashmere",
            care: "Hand wash cold or dry clean",
            fit: "Relaxed fit",
            origin: "Made in Scotland",
            sku: "CW-TT-006"
        }
    },
    {
        id: "7",
        name: "Silk Scarf",
        category: "accessories",
        price: 800000,
        imageSrc: "Assets/image_1.jpg", 
        productTag: "",
        descriptionShort: "Elegant silk scarf with unique pattern.",
        descriptionLong: "Add a touch of elegance to any outfit with this beautiful silk scarf. Featuring a unique, artistic pattern and crafted from the finest silk, it's a versatile accessory for any season.",
        availableSizes: ["One Size"],
        details: {
            material: "100% Pure Silk Twill",
            care: "Dry clean only",
            fit: "N/A (90cm x 90cm)",
            origin: "Made in Italy",
            sku: "CW-AC-007"
        }
    },
    {
        id: "8",
        name: "Designer Skirt",
        category: "bottoms",
        price: 1900000,
        imageSrc: "Assets/image_2.jpg", 
        productTag: "Sale",
        descriptionShort: "Chic designer skirt for versatile styling.",
        descriptionLong: "This chic designer skirt offers versatile styling options, from office wear to evening outings. Its flattering cut and high-quality fabric ensure both comfort and a sophisticated look.",
        availableSizes: ["XS", "S", "M", "L"],
        details: {
            material: "Viscose Blend Crepe",
            care: "Machine wash gentle or dry clean",
            fit: "Midi-length, slight A-line",
            origin: "Made in Indonesia",
            sku: "CW-BB-008"
        }
    },
    {
        id: "9",
        name: "Cocktail Dress",
        category: "dresses",
        price: 2800000,
        imageSrc: "Assets/image_3.jpg",
        productTag: "",
        descriptionShort: "Sophisticated cocktail dress for evening events.",
        descriptionLong: "Turn heads at any evening event with this sophisticated cocktail dress. Featuring a modern silhouette and subtle detailing, it's the epitome of understated glamour.",
        availableSizes: ["S", "M", "L"],
        details: {
            material: "Stretch Cady Fabric",
            care: "Dry clean only",
            fit: "Knee-length, fitted silhouette",
            origin: "Made in Portugal",
            sku: "CW-SD-009"
        }
    },
    {
        id: "10",
        name: "Statement Jewelry",
        category: "accessories",
        price: 950000,
        imageSrc: "Assets/image_4.jpg", 
        productTag: "New",
        descriptionShort: "Bold statement jewelry to complete your look.",
        descriptionLong: "Complete your look with this bold statement jewelry piece. Designed to capture attention, it features unique gemstones and an artistic design, perfect for adding a touch of personality to your ensemble.",
        availableSizes: ["One Size"],
        details: {
            material: "Gold-plated Brass, Semi-precious Stones",
            care: "Avoid contact with perfumes and lotions; wipe clean",
            fit: "N/A",
            origin: "Made in Thailand",
            sku: "CW-AC-010"
        }
    }
];


window.productData = productData;
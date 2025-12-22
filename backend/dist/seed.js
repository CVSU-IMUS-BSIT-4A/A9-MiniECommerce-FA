"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const product_service_1 = require("./services/product.service");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const productService = app.get(product_service_1.ProductService);
    const products = [
        {
            name: 'Gaming Laptop 15"',
            description: 'High-performance gaming laptop with RTX graphics, 16GB RAM, 512GB SSD. Perfect for gaming and content creation.',
            price: 65999.00,
            stock: 12,
            imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop',
        },
        {
            name: 'Wireless Gaming Mouse',
            description: 'Ergonomic wireless mouse with RGB lighting, precision sensor, and long battery life. Great for work and play.',
            price: 1499.00,
            stock: 50,
            imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop',
        },
        {
            name: 'RGB Mechanical Keyboard',
            description: 'Premium mechanical keyboard with customizable RGB backlighting and blue switches for satisfying typing.',
            price: 4299.00,
            stock: 30,
            imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop',
        },
        {
            name: 'USB-C Multiport Hub',
            description: '7-in-1 USB-C hub with 4K HDMI, USB 3.0 ports, SD card reader, and 100W power delivery.',
            price: 2499.00,
            stock: 40,
            imageUrl: 'https://images.unsplash.com/photo-1591290619762-d2f45f3e5d8f?w=500&h=500&fit=crop',
        },
        {
            name: 'HD Webcam 1080p',
            description: 'Crystal-clear 1080p webcam with built-in dual microphones, auto-focus, and low-light correction.',
            price: 3799.00,
            stock: 25,
            imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=500&fit=crop',
        },
        {
            name: 'Portable SSD 1TB',
            description: 'Ultra-fast portable 1TB SSD with USB-C connectivity. Transfer speeds up to 1000MB/s.',
            price: 7499.00,
            stock: 20,
            imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=500&fit=crop',
        },
        {
            name: 'Wireless Headphones',
            description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery, and superior sound quality.',
            price: 12999.00,
            stock: 18,
            imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
        },
        {
            name: 'LED Desk Lamp',
            description: 'Adjustable LED desk lamp with touch controls, multiple brightness levels, and eye-care technology.',
            price: 1899.00,
            stock: 35,
            imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
        },
    ];
    console.log('Seeding database...');
    for (const product of products) {
        try {
            await productService.create(product);
            console.log(`Created: ${product.name}`);
        }
        catch (error) {
            console.error(`Failed to create ${product.name}:`, error.message);
        }
    }
    console.log('Seeding completed!');
    await app.close();
}
seed();
//# sourceMappingURL=seed.js.map
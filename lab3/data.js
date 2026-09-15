import http from 'http';

export const item = [
    {
        id: 1,
        name: 'mobile',
        price: 4000,
        rating: 4.7,
        review: 225
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        price: 2499,
        rating: 4.5,
        review: 180
    },
    {
        id: 3,
        name: 'Smart Watch',
        price: 3999,
        rating: 4.6,
        review: 320
    },
    {
        id: 4,
        name: 'Bluetooth Speaker',
        price: 1799,
        rating: 4.4,
        review: 145
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        price: 3299,
        rating: 4.7,
        review: 210
    },
    {
        id: 6,
        name: 'Wireless Mouse',
        price: 899,
        rating: 4.3,
        review: 165
    },
    {
        id: 7,
        name: 'USB-C Power Bank',
        price: 1499,
        rating: 4.5,
        review: 275
    },
    {
        id: 8,
        name: 'Laptop Backpack',
        price: 1299,
        rating: 4.6,
        review: 190
    },
    {
        id: 9,
        name: 'LED Desk Lamp',
        price: 799,
        rating: 4.2,
        review: 120
    },
    {
        id: 10,
        name: 'Portable SSD',
        price: 5999,
        rating: 4.8,
        review: 350
    }
];

const server = http.createServer((req, res) => {

    if (req.url === '/api/products') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(item));
    } else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

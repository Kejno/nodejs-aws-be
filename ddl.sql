DROP TABLE IF EXISTS product, stock;

CREATE TABLE IF NOT EXISTS product(
    id uuid PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    price FLOAT NOT NULL,
    rating FLOAT NOT NULL,
    numReviews INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS stock(
    product_id uuid PRIMARY KEY,
    count INT CHECK (count >= 0) DEFAULT 0,
	FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO product
VALUES
    ('6a5d2c9f-1709-414e-b1f0-0faae23c9b2d', 'Airpods Wireless Bluetooth Headphones', '/images/airpods.jpg', 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',	'Apple', 'Electronics',	89.99, 4, 5),
    ('5804cb94-cc98-431c-8195-b15695a7700d', 'iPhone 11 Pro 256GB Memory', '/images/phone.jpg',	'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life', 'Apple',	'Electronics', 599.99, 3, 7),
    ('5580a2e7-1679-46ef-a425-2d626e1534d1', 'Cannon EOS 80D DSLR Camera', '/images/camera.jpg', 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design', 'Cannon', 'Electronics', 929.99, 4.5, 4),
    ('4df96f54-436c-45c4-abd8-c33f03e79d6d', 'Sony Playstation 4 Pro White Version', '/images/playstation.jpg', 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music', 'Sony', 'Electronics', 399.99,	5, 1),
    ('6881bc64-ce5d-4d14-876f-71a56254dab9', 'Logitech G-Series Gaming Mouse', '/images/mouse.jpg',	'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience', 'Logitech',	'Electronics',	49.99,	3.5, 2),
    ('8d9e6530-4241-4d52-a039-9343755a9e1c', 'Amazon Echo Dot 3rd Generation', '/images/alexa.jpg',	'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space', 'Amazon',	'Electronics',	29.99,	4.5, 8);

INSERT INTO stock
VALUES
    ('6a5d2c9f-1709-414e-b1f0-0faae23c9b2d', 5),
    ('5804cb94-cc98-431c-8195-b15695a7700d', 7),
    ('5580a2e7-1679-46ef-a425-2d626e1534d1', 8),
    ('4df96f54-436c-45c4-abd8-c33f03e79d6d', 3),
    ('6881bc64-ce5d-4d14-876f-71a56254dab9', 2),
    ('8d9e6530-4241-4d52-a039-9343755a9e1c', 11);
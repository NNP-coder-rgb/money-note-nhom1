-- Schema database cho TechMarket
-- Task: TF252F3

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    icon VARCHAR(20),
    description TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('new', 'used')),
    price BIGINT NOT NULL,
    old_price BIGINT NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id),
    seller_id VARCHAR(50) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    stock INT DEFAULT 0,
    location VARCHAR(100) NOT NULL,
    images JSON,
    specs JSON,
    condition_percent INT,
    serial VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    inspection_steps JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flash_sales (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    sale_price BIGINT NOT NULL,
    discount_percent INT,
    sold_count INT DEFAULT 0,
    total_slot INT DEFAULT 10,
    ends_at TIMESTAMP NOT NULL
);

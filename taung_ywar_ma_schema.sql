-- Taung Ywar Ma Village MVP Database Schema

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMs
-- ============================================================

CREATE TYPE user_role AS ENUM ('admin', 'content_editor', 'farmer');

CREATE TYPE crop_category AS ENUM (
    'onion', 'sesame', 'rice', 'bean', 'corn',
    'vegetable', 'fruit', 'herb', 'other'
);

CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'cancelled', 'completed'
);

CREATE TYPE gallery_category AS ENUM (
    'festival', 'youth_activity', 'village_life',
    'agriculture', 'heritage', 'other'
);

CREATE TYPE announcement_category AS ENUM (
    'health', 'agriculture', 'community', 'emergency', 'donation', 'other'
);

CREATE TYPE month_name AS ENUM (
    'january', 'february', 'march', 'april',
    'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'
);

-- ============================================================
-- 1. AUTHENTICATION & RBAC
-- ============================================================

CREATE TABLE roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        user_role NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username                VARCHAR(150) NOT NULL UNIQUE,
    email                   VARCHAR(254) NOT NULL UNIQUE,
    password_hash           TEXT NOT NULL,
    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    is_temporary_password   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id     UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, role_id)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

-- ============================================================
-- 2. MEDIA
-- ============================================================

CREATE TABLE media (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name   TEXT NOT NULL,
    file_path   TEXT NOT NULL,
    file_size   INTEGER,
    mime_type   VARCHAR(100),
    alt_text    TEXT,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. FARMERS
-- ============================================================

CREATE TABLE farmers (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    full_name   VARCHAR(255) NOT NULL,
    phone       VARCHAR(30) NOT NULL,
    village_area VARCHAR(255),
    bio         TEXT,
    photo_id    UUID REFERENCES media(id) ON DELETE SET NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_farmers_user_id ON farmers(user_id);
CREATE INDEX idx_farmers_is_active ON farmers(is_active);

-- ============================================================
-- 4. CROPS
-- ============================================================

CREATE TABLE crops (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id           UUID NOT NULL REFERENCES farmers(id) ON DELETE RESTRICT,
    name                VARCHAR(255) NOT NULL,
    category            crop_category NOT NULL DEFAULT 'other',
    description         TEXT,
    quantity_available  NUMERIC(10, 2),
    unit                VARCHAR(50),
    image_id            UUID REFERENCES media(id) ON DELETE SET NULL,
    is_published        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_crops_farmer_id ON crops(farmer_id);
CREATE INDEX idx_crops_category ON crops(category);
CREATE INDEX idx_crops_is_published ON crops(is_published);

CREATE TABLE crop_harvest_months (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_id     UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    month       month_name NOT NULL,
    UNIQUE (crop_id, month)
);

CREATE INDEX idx_crop_harvest_months_crop_id ON crop_harvest_months(crop_id);
CREATE INDEX idx_crop_harvest_months_month ON crop_harvest_months(month);

-- ============================================================
-- 5. ORDER REQUESTS
-- ============================================================

CREATE TABLE order_requests (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_id             UUID NOT NULL REFERENCES crops(id) ON DELETE RESTRICT,
    farmer_id           UUID NOT NULL REFERENCES farmers(id) ON DELETE RESTRICT,
    buyer_name          VARCHAR(255) NOT NULL,
    buyer_phone         VARCHAR(30) NOT NULL,
    quantity_requested  NUMERIC(10, 2) NOT NULL CHECK (quantity_requested > 0),
    preferred_contact_time VARCHAR(100),
    notes               TEXT,
    status              order_status NOT NULL DEFAULT 'pending',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_requests_crop_id ON order_requests(crop_id);
CREATE INDEX idx_order_requests_farmer_id ON order_requests(farmer_id);
CREATE INDEX idx_order_requests_status ON order_requests(status);
CREATE INDEX idx_order_requests_created_at ON order_requests(created_at DESC);

-- ============================================================
-- 6. FESTIVALS
-- ============================================================

CREATE TABLE festivals (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    start_date      DATE NOT NULL,
    end_date        DATE,
    location        VARCHAR(255),
    description     TEXT,
    cover_image_id  UUID REFERENCES media(id) ON DELETE SET NULL,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_festivals_start_date ON festivals(start_date);
CREATE INDEX idx_festivals_is_published ON festivals(is_published);

-- ============================================================
-- 7. YOUTH BLOG
-- ============================================================

CREATE TABLE youth_blog_posts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(500) NOT NULL,
    cover_image_id  UUID REFERENCES media(id) ON DELETE SET NULL,
    content         TEXT NOT NULL,
    published_date  DATE,
    author_id       UUID REFERENCES users(id) ON DELETE SET NULL,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_youth_blog_posts_is_published ON youth_blog_posts(is_published);
CREATE INDEX idx_youth_blog_posts_published_date ON youth_blog_posts(published_date DESC);

-- ============================================================
-- 8. VILLAGE HISTORY
-- ============================================================

CREATE TABLE village_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    founding_story  TEXT,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE history_timeline_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    history_id      UUID NOT NULL REFERENCES village_history(id) ON DELETE CASCADE,
    event_year      INTEGER,
    event_date      DATE,
    title           VARCHAR(500) NOT NULL,
    description     TEXT,
    image_id        UUID REFERENCES media(id) ON DELETE SET NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_history_timeline_history_id ON history_timeline_events(history_id);
CREATE INDEX idx_history_timeline_event_year ON history_timeline_events(event_year);

CREATE TABLE notable_figures (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    history_id  UUID NOT NULL REFERENCES village_history(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    photo_id    UUID REFERENCES media(id) ON DELETE SET NULL,
    birth_year  INTEGER,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notable_figures_history_id ON notable_figures(history_id);

-- ============================================================
-- 9. PHOTO GALLERY
-- ============================================================

CREATE TABLE photo_gallery (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id    UUID NOT NULL REFERENCES media(id) ON DELETE RESTRICT,
    caption     TEXT,
    category    gallery_category NOT NULL DEFAULT 'other',
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_photo_gallery_category ON photo_gallery(category);
CREATE INDEX idx_photo_gallery_is_published ON photo_gallery(is_published);

-- ============================================================
-- 10. MARKET PRICES
-- ============================================================

CREATE TABLE market_prices (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_name   VARCHAR(255) NOT NULL,
    price       NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    unit        VARCHAR(50) NOT NULL,
    market_name VARCHAR(255) NOT NULL,
    price_date  DATE NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_market_prices_price_date ON market_prices(price_date DESC);
CREATE INDEX idx_market_prices_crop_name ON market_prices(crop_name);
CREATE INDEX idx_market_prices_is_published ON market_prices(is_published);

-- ============================================================
-- 11. ANNOUNCEMENTS
-- ============================================================

CREATE TABLE announcements (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(500) NOT NULL,
    body        TEXT NOT NULL,
    category    announcement_category NOT NULL DEFAULT 'other',
    is_pinned   BOOLEAN NOT NULL DEFAULT FALSE,
    expiry_date DATE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_by  UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_announcements_category ON announcements(category);
CREATE INDEX idx_announcements_is_pinned ON announcements(is_pinned);
CREATE INDEX idx_announcements_is_published ON announcements(is_published);
CREATE INDEX idx_announcements_expiry_date ON announcements(expiry_date);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);

-- ============================================================
-- 12. EMERGENCY CONTACTS
-- ============================================================

CREATE TABLE emergency_contacts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    phone       VARCHAR(30) NOT NULL,
    category    VARCHAR(100) NOT NULL,
    notes       TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_emergency_contacts_category ON emergency_contacts(category);
CREATE INDEX idx_emergency_contacts_is_published ON emergency_contacts(is_published);

-- ============================================================
-- SEED: DEFAULT ROLES
-- ============================================================

INSERT INTO roles (name) VALUES
    ('admin'),
    ('content_editor'),
    ('farmer');

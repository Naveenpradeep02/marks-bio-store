-- ========================================================================
-- MARKS BIOTECH - PRODUCTION LIVE DATABASE EXPORT
-- Tailored for Hostinger phpMyAdmin (u623630575_marksbiotechdb)
-- Tables ordered in strict dependency order (Parent tables first, Children after)
-- Eliminates errno 150 (Foreign key constraint is incorrectly formed)
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
START TRANSACTION;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `users`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firebase_uid` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `role` enum('admin','customer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `customer_type` enum('retail','wholesale') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'retail',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `firebase_uid` (`firebase_uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 2 rows for `users`
INSERT INTO `users` (`id`, `firebase_uid`, `email`, `name`, `phone`, `role`, `customer_type`, `created_at`, `updated_at`) VALUES
(1, 'mjDTsHCDGUWDaH4LavcE6E2NoLo2', 'mani.krishnan@marksbiotech.com', 'Mani Krishnan', '', 'admin', 'retail', '2026-09-07 14:46:36', '2026-09-07 14:46:36'),
(3, 'CDVGTCcXPPWmBO66roJdJUJqedp2', 'naveen@gmail.com', 'Naveen C', '+9108870686660', 'admin', 'retail', '2026-09-08 10:02:15', '2026-11-10 12:07:55');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `brands`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 7 rows for `brands`
INSERT INTO `brands` (`id`, `name`, `logo_url`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Rocky Mountain', '/uploads/brands/1788865515006-404863103.png', 'Rocky Mountain Tissue Bank allograft and regenerative bone graft products, AATB accredited and FDA registered, processed in the USA.', '2026-09-07 15:19:51', '2026-09-08 16:35:16'),
(10, 'B&B Dental (Italy)', '/assets/imgs/logo.png', 'Renowned European dental implantology manufacturer from Bologna, Italy, specializing in DURAVIT dental implants, Conexa connection prosthetics, and surgical kits.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(11, 'Rocky Mountain Tissue Bank (USA)', '/assets/imgs/rmtb-o.webp', 'FDA-registered and AATB-accredited tissue bank in Colorado, USA, providing irradiated allograft cancellous & cortical particulate and bone blocks.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(12, 'NovoBone (Italy)', '/assets/imgs/Novobone.webp', 'Italian biomedical manufacturer producing 100% resorbable deproteinized bovine bone mineral xenografts under strict MDR (EU 2017/745) standards.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(13, 'T-Barrier (Italy)', '/assets/imgs/Collagen13.webp', 'Premium equine collagen barrier membranes and biocompatible titanium mesh for guided bone and tissue regeneration (GBR/GTR).', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(14, 'Amcrylate (India)', '/assets/imgs/amcrylate-pack.jpeg', 'Medical-grade Isoamyl 2-cyanoacrylate surgical tissue adhesive developed with IICT & TIFAC for rapid sutureless wound closure.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(15, 'Claronav / MicronMapper (Canada)', '/assets/imgs/micronmaper.webp', 'Global pioneers in real-time dynamic optical surgical navigation (Navident) and sub-10 micron passive stereophotogrammetry (MicronMapper).', '2026-11-11 20:57:40', '2026-11-11 20:57:40');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `categories`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_categories_name_parent` (`name`,`parent_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 27 rows for `categories`
INSERT INTO `categories` (`id`, `name`, `parent_id`, `description`, `created_at`, `updated_at`) VALUES
(12, 'Allograft', NULL, 'Irradiated allogenic bone graft materials from Rocky Mountain Tissue Bank.', '2026-09-11 12:30:30', '2026-09-11 12:30:30'),
(13, 'Cancellous Particulate Vials', 12, '', '2026-09-11 12:30:30', '2026-09-11 12:30:30'),
(14, 'Cortical / Cancellous Bone Blocks', 12, '', '2026-09-11 12:30:30', '2026-09-11 12:30:30'),
(15, 'Cortical Particulate Vials', 12, '', '2026-09-11 12:30:30', '2026-09-11 12:30:30'),
(39, 'Dental Implants & Systems', NULL, 'Premium B&B Dental Italian implant fixtures, surgical protocols, and customized subperiosteal frames.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(40, 'DURAVIT EV Implants', 39, 'DURAVIT EV Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(41, 'DURAVIT 3P Universal Implants', 39, 'DURAVIT 3P Universal Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(42, 'DURAVIT Wide Molar Implants', 39, 'DURAVIT Wide Molar Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(43, 'DURAVIT Pterygo Implants', 39, 'DURAVIT Pterygo Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(44, 'DURAVIT Slim Implants', 39, 'DURAVIT Slim Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(45, 'DURAVIT Mini Implants', 39, 'DURAVIT Mini Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(46, 'Customized Subperiosteal Implants', 39, 'Customized Subperiosteal Implants - Dental Implants & Systems', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(47, 'Prosthetics & Abutments', NULL, 'Precision Conexa cold-weld conical prosthetic components, Ti-Bases, straight & angled abutments.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(48, 'Conexa Conical Connection Prosthetics', 47, 'Conexa Conical Connection Prosthetics - Prosthetics & Abutments', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(49, 'Surgical Kits & Instrumentation', NULL, 'Ergonomic autoclavable cassettes, step drills, depth stops, and guided surgery sleeves.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(50, 'Surgical Kits & Guided Boxes', 49, 'Surgical Kits & Guided Boxes - Surgical Kits & Instrumentation', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(51, 'Regenerative Biomaterials', NULL, 'Allograft bone, bovine xenografts, equine collagen membranes, titanium mesh, and surgical tissue adhesives.', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(52, 'Allograft Cancellous Particulate', 51, 'Allograft Cancellous Particulate - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(53, 'Allograft Cortical / Cancellous Blocks', 51, 'Allograft Cortical / Cancellous Blocks - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(54, 'Allograft Cortical Particulate', 51, 'Allograft Cortical Particulate - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(55, 'Bovine Xenograft Granules', 51, 'Bovine Xenograft Granules - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(56, 'Resorbable Collagen Membranes', 51, 'Resorbable Collagen Membranes - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(57, 'Titanium Safety Mesh', 51, 'Titanium Safety Mesh - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(58, 'Surgical Tissue Adhesives', 51, 'Surgical Tissue Adhesives - Regenerative Biomaterials', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(59, 'Dynamic Navigation & 3D Photogrammetry', NULL, 'Navident dynamic robotic surgical navigation and MicronMapper full-arch stereophotogrammetry systems.', '2026-11-11 20:57:40', '2026-11-11 20:57:40');
INSERT INTO `categories` (`id`, `name`, `parent_id`, `description`, `created_at`, `updated_at`) VALUES
(60, 'Navident Dynamic Surgical Tracking', 59, 'Navident Dynamic Surgical Tracking - Dynamic Navigation & 3D Photogrammetry', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(61, 'MicronMapper 3D Photogrammetry', 59, 'MicronMapper 3D Photogrammetry - Dynamic Navigation & 3D Photogrammetry', '2026-11-11 20:57:40', '2026-11-11 20:57:40');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `store_settings`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `store_settings`;
CREATE TABLE IF NOT EXISTS `store_settings` (
  `setting_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 1 rows for `store_settings`
INSERT INTO `store_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES
('stock_management', '0', '2026-11-10 13:47:04');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `seo_global_settings`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `seo_global_settings`;
CREATE TABLE IF NOT EXISTS `seo_global_settings` (
  `id` int NOT NULL DEFAULT '1',
  `global_site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Marks Biotech - Advanced Biomaterials & Digital Dentistry',
  `global_title_template` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '%title% | Marks Biotech',
  `global_meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `global_og_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '/assets/imgs/logo.webp',
  `global_canonical_domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://marksbiotech.com',
  `global_robots` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'index, follow',
  `google_tag_manager_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `meta_pixel_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `google_analytics_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `custom_header_scripts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `custom_body_scripts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `global_organization_schema` json DEFAULT NULL,
  `alt_tag_auto_fallback` tinyint(1) NOT NULL DEFAULT '1',
  `popups_master_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 1 rows for `seo_global_settings`
INSERT INTO `seo_global_settings` (`id`, `global_site_name`, `global_title_template`, `global_meta_description`, `global_og_image`, `global_canonical_domain`, `global_robots`, `google_tag_manager_id`, `meta_pixel_id`, `google_analytics_id`, `custom_header_scripts`, `custom_body_scripts`, `global_organization_schema`, `alt_tag_auto_fallback`, `popups_master_enabled`, `updated_at`) VALUES
(1, 'Marks Biotech - Advanced Biomaterials & Digital Dentistry', '%title% | Marks Biotech', 'Marks Biotech specializes in premium dental biomaterials, allografts, xenografts, collagen membranes, and digital surgical solutions for clinicians across India.', '/assets/imgs/logo.webp', 'https://marksbiotech.com', 'index, follow', '', '', '', NULL, NULL, NULL, 1, 1, '2026-11-11 18:24:19');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `page_seo`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `page_seo`;
CREATE TABLE IF NOT EXISTS `page_seo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_keywords` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `canonical_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `robots_directive` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'index, follow',
  `og_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `og_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `og_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `twitter_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `twitter_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `twitter_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `twitter_card` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'summary_large_image',
  `custom_schema` json DEFAULT NULL,
  `schema_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'WebPage',
  `custom_head_tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_path` (`page_path`),
  KEY `idx_page_seo_path` (`page_path`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 12 rows for `page_seo`
INSERT INTO `page_seo` (`id`, `page_path`, `page_name`, `meta_title`, `meta_description`, `meta_keywords`, `canonical_url`, `robots_directive`, `og_title`, `og_description`, `og_image`, `twitter_title`, `twitter_description`, `twitter_image`, `twitter_card`, `custom_schema`, `schema_type`, `custom_head_tags`, `created_at`, `updated_at`) VALUES
(1, '/', 'Home Page', 'Marks Biotech | Advanced Dental Biomaterials & Regenerative Solutions', 'Empowering implantologists and maxillofacial surgeons with premium bone grafts, membrane matrices, and digital dentistry precision.', 'dental biomaterials, bone graft, allograft, xenograft, dental implants, collagen membrane', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'WebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(2, '/about', 'About Us', 'About Marks Biotech | Pioneering Regenerative Dentistry', 'Learn about Marks Biotech\'s mission, scientific leadership, quality standards, and clinical excellence in regenerative surgery.', 'about marks biotech, surgical biomaterials, dental innovation, clinical excellence', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'AboutPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(3, '/store', 'Online Store & Catalog', 'Shop Dental Biomaterials & Clinical Kits | Marks Biotech Store', 'Order certified Cancellous Particulate Vials, Cortical Blocks, Pericardium Membranes, and surgical kits directly online.', 'buy bone graft, dental store online, clinical kits, implant accessories', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'CollectionPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(4, '/all-products', 'All Products', 'All Biomaterials & Surgical Implements | Marks Biotech', 'Explore the comprehensive catalog of certified human allografts, bovine xenografts, and titanium implant solutions.', 'all products, surgical catalog, dental biomaterials india', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'CollectionPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(5, '/allograft', 'Allograft Tissue Portfolio', 'Human Allograft Bone & Tissue Solutions | Marks Biotech', 'Highest osteoconductive scaffold integrity for sinus lifts, socket preservation, and severe ridge augmentation.', 'human allograft, cancellous particulate, cortical strut, socket preservation', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'MedicalWebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(6, '/xenograft', 'Xenograft Bone Matrices', 'Bovine Xenograft Bone Grafts | Marks Biotech', 'High-porosity deproteinized bovine bone graft matrices engineered for long-term space maintenance and volume stability.', 'xenograft, bovine bone graft, sinus augmentation, space maintenance', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'MedicalWebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(7, '/tissue', 'Tissue & Membranes', 'Pericardium & Collagen Tissue Membranes | Marks Biotech', 'Resorbable barrier membranes and dermal matrices for guided bone and tissue regeneration (GBR/GTR).', 'pericardium membrane, collagen membrane, GBR, guided tissue regeneration', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'MedicalWebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(8, '/scientific-evidence', 'Scientific Evidence & Clinical Studies', 'Scientific Evidence & Clinical Literature | Marks Biotech', 'Histological analyses, multi-center clinical trials, and peer-reviewed studies validating Marks Biotech biomaterials.', 'clinical studies, histology biomaterials, dental research evidence', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'MedicalWebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(9, '/events', 'Events & Hands-on Workshops', 'Clinical Conferences, Workshops & Masterclasses | Marks Biotech', 'Join live surgical demonstrations, hands-on masterclasses, and national dental implant congresses across India.', 'dental events, implant workshop, surgical masterclass, dental conference india', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'CollectionPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(10, '/blog', 'Clinical Blog & Knowledge Hub', 'Clinical Insights & Digital Dentistry Blog | Marks Biotech', 'Stay updated on the latest surgical techniques, photogrammetry, Morse Taper connections, and dynamic navigation.', 'dental blog, implantology articles, dynamic navigation, photogrammetry', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'Blog', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(11, '/careers', 'Careers & Opportunities', 'Join Our Team | Careers at Marks Biotech', 'Explore rewarding clinical specialist, biomedical sales, and technical support career paths at Marks Biotech.', 'marks biotech careers, dental sales jobs, biotech opportunities', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'WebPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27'),
(12, '/cart', 'Shopping Cart & Checkout', 'Shopping Cart & Offers Breakdown | Marks Biotech', 'Review your selected clinical biomaterials, applied bulk discounts, and complete your secure order.', 'cart, checkout, buy biomaterials', '', 'index, follow', '', NULL, '', '', NULL, '', 'summary_large_image', NULL, 'CheckoutPage', NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `popups`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `popups`;
CREATE TABLE IF NOT EXISTS `popups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('event','product','custom') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'event',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `badge_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Learn More',
  `button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '/events',
  `secondary_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `secondary_button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `product_id` int DEFAULT NULL,
  `event_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `event_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `delay_seconds` int NOT NULL DEFAULT '3',
  `show_frequency` enum('once_per_session','always','once_per_day') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'once_per_session',
  `target_pages` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'all',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `idx_popups_active` (`is_active`),
  KEY `idx_popups_type` (`type`),
  CONSTRAINT `popups_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 2 rows for `popups`
INSERT INTO `popups` (`id`, `type`, `name`, `title`, `subtitle`, `content`, `image_url`, `badge_text`, `button_text`, `button_link`, `secondary_button_text`, `secondary_button_link`, `product_id`, `event_date`, `event_location`, `delay_seconds`, `show_frequency`, `target_pages`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'event', 'April 2026 Live Navigation Surgical Workshop', 'Navident Advanced Surgical & Prosthetic Workshop', 'Live Hands-On Dynamic Computer-Assisted Implantology at ITC Grand Chola', 'Join Dr. Mani Krishnan for 2 days of intensive live patient surgery demonstration and hands-on typodont training.', '/assets/event/11.webp', '🔥 Limited Seats (April 2026)', 'Register for Workshop', '/events/11', '', '', NULL, 'November 28-29, 2026', 'ITC Grand Chola, Chennai', 3, 'once_per_session', 'all', 1, '2026-11-10 16:22:27', '2026-11-11 18:36:15'),
(2, 'product', 'Next-Gen Cancellous Particulate Vials', 'Premium Allograft Cancellous Particulate Vials', '100% Human Osteoinductive Tissue Matrix with Superior Handling', 'Optimized 250-1000µm particulate size for sinus augmentation, extraction sockets, and peri-implant defect filling.', '/assets/imgs/proc-dental-surgery.jpg', 'Featured Biomaterial', 'Explore Allograft Store', '/allograft', '', '', NULL, '', '', 5, 'once_per_session', 'all', 1, '2026-11-10 16:22:27', '2026-11-11 18:36:15');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `blogs`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `featured_image_alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `category` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CLINICAL INSIGHTS',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `author_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Marks Biotech Clinical Team',
  `author_title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Biomaterials Specialist',
  `author_avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `read_time` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '5 min read',
  `status` enum('draft','published','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `view_count` int NOT NULL DEFAULT '0',
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `meta_keywords` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schema_markup` json DEFAULT NULL,
  `published_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blocks_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_blogs_slug` (`slug`),
  KEY `idx_blogs_status` (`status`),
  KEY `idx_blogs_category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 14 rows for `blogs`
INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `featured_image_alt`, `category`, `tags`, `author_name`, `author_title`, `author_avatar`, `read_time`, `status`, `view_count`, `meta_title`, `meta_description`, `meta_keywords`, `og_image`, `schema_markup`, `published_at`, `created_at`, `updated_at`, `blocks_json`) VALUES
(1, 'Morse Taper Connection', '1', 'In 1864 an engineer named Stephen Morse conceptualised the mechanical phenomenon stating that when two conical metal components (female + male) reach a tight contact, these fix one into the other, through a the so called "cold welding".', '<h2>The Engineering Genius Behind the Morse Taper</h2>\n<p>The Morse Taper connection has revolutionized contemporary implantology by eliminating micro-movements and bacterial micro-leakage at the implant-abutment junction.</p>\n<h3>Mechanical Cold Welding</h3>\n<p>When two conical titanium components with matching tapers are torqued together, the friction creates an airtight hermetic seal. This completely prevents peri-implant crestal bone resorption caused by inflammatory microbial ingress.</p>\n<h3>Long-Term Crestal Bone Preservation</h3>\n<p>Clinical studies demonstrate that Morse Taper implants maintain marginal bone levels substantially better than traditional flat-to-flat butt joint hex connections over a 10-year follow-up period.</p>', '/assets/imgs/blog-1.webp', 'Morse Taper implant connection diagram showing cold welding interface', 'DENTAL IMPLANT TECHNOLOGY', 'Morse Taper, Implant Design, Cold Welding, Biological Width', 'Dr. Mani Krishnan', 'Chief Implantologist', '', '5 min read', 'published', 2, NULL, NULL, NULL, NULL, NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27', '2026-11-11 18:36:15', NULL),
(2, 'Dynamic Navigation: Precision Implant Surgery', '2', 'Dynamic Navigation is the most effective means by which to accurately transfer a planned implant position to a patient. In contrast to the inherent inaccuracy of Freehand and Static Navigation...', '<h2>Real-Time Optical Guidance in the Operatory</h2>\n<p>Dynamic navigation pairs cone-beam CT (CBCT) data with motion-tracking optical stereoscopic cameras to guide the drill tip in real time with sub-millimeter clinical accuracy.</p>\n<h3>Why Static Guides Fall Short</h3>\n<p>Static surgical guides can crack, obscure visual irrigation, restrict flap reflection, and make posterior access difficult in patients with limited mouth opening. Dynamic navigation eliminates these physical constraints entirely.</p>', '/assets/imgs/blog-2.webp', 'Dynamic navigation optical tracking camera in modern surgical dental operatory', 'SURGICAL NAVIGATION TECHNOLOGY', 'Dynamic Navigation, Navident, Guided Surgery, CBCT', 'Marks Biotech Clinical Team', 'Computer-Guided Surgery Specialists', '', '7 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27', '2026-11-11 18:36:15', NULL),
(3, 'Photogrammetry in Full-Arch Dental Implants for Passivity', '3', 'Explore how photogrammetry supports accurate implant-position capture in full-arch dental implant workflows, its relationship with passive fit, CAD/CAM and clinical verification.', '<h2>The Challenge of Multi-Implant Capture</h2>\n<p>Intraoral scanners (IOS) introduce stitching distortion when scanning across full edentulous arches. Photogrammetry captures multi-unit scan bodies instantly with optical triangulation, guaranteeing absolute passivity for CAD/CAM milled frameworks.</p>', '/assets/imgs/micronmaper.webp', 'Photogrammetric scan body calibration for multi-unit abutment digital capture', 'DIGITAL DENTISTRY • PHOTOGRAMMETRY', 'Photogrammetry, Full Arch, Passive Fit, MicronMapper', 'Dr. Rajesh Nair', 'Prosthodontics Specialist', '', '6 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27', '2026-11-11 18:36:15', NULL),
(4, 'Passive Fit of Implant Prosthesis Using Digital Technology', '4', 'A framework that needs to be forced into place is already telling you something: the prosthesis and the implant positions are not matching as they should. Discover how digital technology controls passive fit...', '<h2>Preventing Screw Loosening and Implant Fracture</h2>\n<p>Misfit between the framework and multi-unit abutments introduces static strain that can lead to screw loosening, abutment shear, or biological bone failure. Digital workflows ensure tolerances within 10 microns.</p>', '/assets/imgs/blog-4.webp', 'Milled titanium substructure inspected for passive Sheffield test fit', 'DIGITAL WORKFLOW • IMPLANT PROSTHODONTICS', 'Passive Fit, Prosthodontics, CAD/CAM, Screw Loosening', 'Marks Biotech Clinical Team', 'Prosthetic Verification Group', '', '8 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27', '2026-11-11 18:36:15', NULL),
(5, 'Radiographic Markers for Guided Implant Surgery', '5', 'Radiopaque markers for dental implants are small, X-ray-visible reference points incorporated into a radiographic template to help relate intended prosthetics to patient anatomy.', '<h2>Accurate Dual-Scan Registration</h2>\n<p>Fiducial markers made of radiopaque barium sulfate or gutta-percha enable flawless registration between DICOM radiographic datasets and optical STL surface meshes.</p>', '/assets/imgs/blog-5.webp', 'CBCT 3D volume showing radio-opaque fiducial markers for surgical guide alignment', 'GUIDED IMPLANT SURGERY • CBCT PLANNING', 'Radiographic Markers, CBCT, Dual Scan, Guided Surgery', 'Dr. Mani Krishnan', 'CBCT Planning & Navigation Specialist', '', '5 min read', 'published', 7, NULL, NULL, NULL, NULL, NULL, '2026-11-10 16:22:27', '2026-11-10 16:22:27', '2026-11-11 19:46:29', '[{"id":"test-1","type":"heading","text":"Dynamic Navigation Mastery"}]'),
(6, 'Role Of Compactors / Expanders in Dental Implant Surgery', '6', 'Bone compactors and expanders widen or densify a narrow or low-density ridge by pushing bone laterally rather than drilling it away, preserving bone volume and boosting primary stability.', '\n      <h2>Role Of Compactors / Expanders in Dental Implant Surgery</h2>\n      <p class="lead">Bone compactors and expanders widen or densify a narrow or low-density ridge by pushing bone laterally rather than drilling it away, preserving bone volume and boosting primary stability.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-6.webp', 'Role Of Compactors / Expanders in Dental Implant Surgery', 'IMPLANT SITE PREPARATION • RIDGE EXPANSION', '', 'Dr. Rajesh Nair', 'Oral & Maxillofacial Surgeon', '', '6 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(7, 'Emergence Profile in Dental Implant Procedure Using PEEK Abutments', '7', 'Standard round healing abutments never replicate a tooth\'s cervical anatomy. Discover how PEEK components guide critical and subcritical contours during early soft tissue healing.', '\n      <h2>Emergence Profile in Dental Implant Procedure Using PEEK Abutments</h2>\n      <p class="lead">Standard round healing abutments never replicate a tooth\'s cervical anatomy. Discover how PEEK components guide critical and subcritical contours during early soft tissue healing.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-7.webp', 'Emergence Profile in Dental Implant Procedure Using PEEK Abutments', 'IMPLANT PROSTHODONTICS • SOFT TISSUE ARCHITECTURE', '', 'Marks Biotech Prosthodontics', 'Esthetic Reconstruction', '', '6 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(8, 'Guided Endodontics in Dynamic Navigation Systems', '8', 'Dynamic navigation in endodontics uses real-time optical tracking to guide burs along pre-planned CBCT paths for calcified canals, conservative access, and microsurgery.', '\n      <h2>Guided Endodontics in Dynamic Navigation Systems</h2>\n      <p class="lead">Dynamic navigation in endodontics uses real-time optical tracking to guide burs along pre-planned CBCT paths for calcified canals, conservative access, and microsurgery.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-8.webp', 'Guided Endodontics in Dynamic Navigation Systems', 'SURGICAL NAVIGATION • GUIDED ENDODONTICS', '', 'Dr. Mani Krishnan', 'Endodontic & Navigation Faculty', '', '7 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(9, 'Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry', '9', 'Deep learning networks automate tooth, alveolar bone, sinus, and mandibular canal segmentation in seconds, transforming digital implant planning and guide design.', '\n      <h2>Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry</h2>\n      <p class="lead">Deep learning networks automate tooth, alveolar bone, sinus, and mandibular canal segmentation in seconds, transforming digital implant planning and guide design.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-9.webp', 'Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry', 'ARTIFICIAL INTELLIGENCE • CBCT SEGMENTATION', '', 'AI Research Group', 'Medical Imaging & AI Systems', '', '8 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(10, 'Evaluvating 3D Implant Placement Using Digital Dentistry Software', '10', 'Comparing planned vs actual placed positions: entry-point, apical, and angular deviations, registration accuracy, and how delivery methods affect digital implant outcomes.', '\n      <h2>Evaluvating 3D Implant Placement Using Digital Dentistry Software</h2>\n      <p class="lead">Comparing planned vs actual placed positions: entry-point, apical, and angular deviations, registration accuracy, and how delivery methods affect digital implant outcomes.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-10.webp', 'Evaluvating 3D Implant Placement Using Digital Dentistry Software', 'VIRTUAL IMPLANT PLANNING • ACCURACY ANALYSIS', '', 'Dr. Rajesh Nair', 'Surgical Planning Mentor', '', '9 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(11, 'Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry', '11', 'Auto-merging aligns CBCT bone scans with soft-tissue intraoral scans into a single coordinate system. Explore AI-driven registration, submillimeter accuracy, and virtual patient workflows.', '\n      <h2>Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry</h2>\n      <p class="lead">Auto-merging aligns CBCT bone scans with soft-tissue intraoral scans into a single coordinate system. Explore AI-driven registration, submillimeter accuracy, and virtual patient workflows.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-11.webp', 'Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry', 'DIGITAL DENTISTRY • MULTIMODAL REGISTRATION', '', 'Marks Biotech Digital Faculty', 'Multimodal Imaging', '', '7 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(12, 'TMJ Pain Management (Arthrocenthesis) & Navigation Procedure', '12', 'Examine TMJ arthrocentesis mechanisms, landmark-based limitations, patient-specific 3D printed guides, real-time dynamic navigation, and comparative clinical outcomes.', '\n      <h2>TMJ Pain Management (Arthrocenthesis) & Navigation Procedure</h2>\n      <p class="lead">Examine TMJ arthrocentesis mechanisms, landmark-based limitations, patient-specific 3D printed guides, real-time dynamic navigation, and comparative clinical outcomes.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-12.webp', 'TMJ Pain Management (Arthrocenthesis) & Navigation Procedure', 'TMJ PROCEDURES • SURGICAL NAVIGATION', '', 'Dr. Mani Krishnan', 'Maxillofacial Joint Surgery', '', '8 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(13, 'Tissue Adhesives in Dentistry', '13', 'Cyanoacrylate tissue adhesives vs conventional sutures: wound healing, chair time, graft fixation, hemostatic benefits, and tension limitations in oral surgery.', '\n      <h2>Tissue Adhesives in Dentistry</h2>\n      <p class="lead">Cyanoacrylate tissue adhesives vs conventional sutures: wound healing, chair time, graft fixation, hemostatic benefits, and tension limitations in oral surgery.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-13.webp', 'Tissue Adhesives in Dentistry', 'BIOMATERIALS • WOUND CLOSURE', '', 'Marks Biotech Biomaterials Team', 'Tissue Regeneration', '', '6 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL),
(14, 'Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery', '14', 'MicronMapper Tissue Mapper replaces wet, bloody, tongue-crowded post-op optical scans with contact-based Trace surface registration on surgery day.', '\n      <h2>Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery</h2>\n      <p class="lead">MicronMapper Tissue Mapper replaces wet, bloody, tongue-crowded post-op optical scans with contact-based Trace surface registration on surgery day.</p>\n      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>\n      <h3>Key Clinical Observations</h3>\n      <ul>\n        <li>Precision calibration reduces mechanical and biological complications.</li>\n        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>\n        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>\n      </ul>\n      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>\n    ', '/assets/imgs/blog-14.webp', 'Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery', 'PHOTOGRAMMETRY • FULL-ARCH RESTORATION', '', 'Dr. Mani Krishnan', 'Full-Arch Digital Loading', '', '10 min read', 'published', 0, NULL, NULL, NULL, NULL, NULL, '2026-11-11 18:36:15', '2026-11-11 18:36:15', '2026-11-11 20:42:51', NULL);

-- ------------------------------------------------------------------------
-- Table structure & data for table: `events`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2026',
  `type` enum('workshop','conference','hands-on','symposium') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'workshop',
  `status` enum('upcoming','ongoing','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'upcoming',
  `date_string` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `banner_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `badge_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `speaker_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `speaker_title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `registration_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `seats_total` int DEFAULT '50',
  `seats_available` int DEFAULT '50',
  `price` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Free',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blocks_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_events_year` (`year`),
  KEY `idx_events_status` (`status`),
  KEY `idx_events_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 28 rows for `events`
INSERT INTO `events` (`id`, `title`, `slug`, `year`, `type`, `status`, `date_string`, `location`, `image_url`, `banner_url`, `badge_text`, `description`, `speaker_name`, `speaker_title`, `registration_link`, `seats_total`, `seats_available`, `price`, `is_active`, `featured`, `created_at`, `updated_at`, `blocks_json`) VALUES
(1, 'Navident Advanced Surgical & Prosthetic Workshop', 'navident-advanced-surgical-prosthetic-workshop', '2026', 'workshop', 'upcoming', 'April 26-27, 2026', 'ITC Grand Chola, Chennai', '/assets/event/11.webp', '', '🔥 Registration Open', 'Comprehensive hands-on training with dynamic computer-assisted implantology and live navigation surgery guidance.', 'Dr. Mani Krishnan', 'Chief Clinical Specialist, Implantology', '/events/11', 40, 12, '₹15,000', 1, 1, '2026-11-11 17:20:06', '2026-11-11 17:20:06', NULL),
(2, 'CLARONAV DENTAL - Dynamic Navigation Surgical Workshop', 'claronav-dental-dynamic-navigation-workshop', '2026', 'workshop', 'upcoming', 'May 16-17, 2026', 'The Leela Palace, Bengaluru', '/assets/event/12.webp', '', 'Limited Seats', 'Live patient demonstration and photogrammetry workflow integration with hands-on typodont models.', 'Dr. Rajesh Nair', 'Oral & Maxillofacial Surgeon', '/events/9', 30, 8, '₹12,500', 1, 1, '2026-11-11 17:20:06', '2026-11-11 17:20:06', NULL),
(3, 'IDS Cologne Germany - 2025 Global Dental Expo', 'ids-cologne-germany-2025', '2025', 'conference', 'completed', 'March 25-29, 2025', 'Koelnmesse, Cologne, Germany', '/assets/event/23.webp', '', 'Completed', 'International dental show featuring cutting-edge bioceramics, synthetic grafts, and next-gen navigation.', 'Marks Biotech Delegation', 'International Clinical Team', '/events/22', 500, 0, 'Free Entry', 1, 0, '2026-11-11 17:20:06', '2026-11-11 17:20:06', NULL),
(4, 'Expodent Delhi 2025 National Dental Exhibition', 'expodent-delhi-2025', '2025', 'conference', 'completed', 'December 19-21, 2025', 'Pragati Maidan, New Delhi', '/assets/event/25.webp', '', 'Completed', 'Demonstrating clinical biomaterials, osteoconductive membranes, and computer-guided surgery systems.', 'Marks Biotech Technical Team', 'Product Specialists', '/events/25', 350, 0, 'Free', 1, 0, '2026-11-11 17:20:06', '2026-11-11 17:20:06', NULL),
(5, 'Digital Philosophy – Full-Arch Management With a Fully Digital Workflow', 'manipal-college-maxillofacial-navident', '2026', 'workshop', 'upcoming', 'July 11-12, 2026', 'The Ritz-Carlton, Pune', '/assets/event/5.webp', '', '🔥 Registration Open', 'Comprehensive academic and clinical event covering Digital Philosophy – Full-Arch Management With a Fully Digital Workflow, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan', 'Dynamic Navigation & Guided Implant Specialist', '/events/5', 50, 0, '₹15,000', 1, 0, '2026-11-11 17:20:06', '2026-11-11 18:36:14', NULL),
(7, 'Diagnosis And Treatment Of Peri-Implantitis', 'event-7-diagnosis-and-treatment-of-peri-implantitis', '2026', 'workshop', 'completed', 'March 14-15, 2026', 'JW Marriott, Kolkata', '/assets/event/7.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Diagnosis And Treatment Of Peri-Implantitis, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Rajesh Nair', 'Dynamic Navigation & Guided Implant Specialist', '/events/7', 40, 0, '₹11,000', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(8, 'Navident Advanced Sugical & Prosthetic Workshop', 'event-8-navident-advanced-sugical-prosthetic-workshop', '2025', 'workshop', 'completed', 'October 10-12, 2025', 'ITC Grand Chola, Chennai', '/assets/event/11.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Navident Advanced Sugical & Prosthetic Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan', 'Dynamic Navigation & Guided Implant Specialist', '/events/8', 40, 0, '₹15,000', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(9, 'CLARONAV DENTAL - Navident Advanced Sugical & Prosthetic Workshop', 'event-9-claronav-dental-navident-advanced-sugical-prosthetic-workshop', '2025', 'workshop', 'completed', 'May 16-17, 2026', 'The Leela Palace, Bengaluru', '/assets/event/12.webp', '', 'Completed', 'Comprehensive academic and clinical event covering CLARONAV DENTAL - Navident Advanced Sugical & Prosthetic Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Rajesh Nair', 'Dynamic Navigation & Guided Implant Specialist', '/events/9', 40, 0, '₹12,500', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(10, 'Indian Society of Oral Implantologists (ISOI) Conference – Mumbai', 'event-10-indian-society-of-oral-implantologists-isoi-conference-mumbai', '2025', 'conference', 'completed', 'September 19-21, 2025', 'Jio World Convention Centre, Mumbai', '/assets/event/13.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Indian Society of Oral Implantologists (ISOI) Conference – Mumbai, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'ISOI Scientific Committee', 'Dynamic Navigation & Guided Implant Specialist', '/events/10', 40, 0, 'Delegate Pass', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(11, 'Future Of Dentistry One Day Navident Surgical Workshop', 'event-11-future-of-dentistry-one-day-navident-surgical-workshop', '2025', 'workshop', 'completed', 'November 21-22, 2025', 'Hotel Sahara Star, Mumbai', '/assets/event/14.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Future Of Dentistry One Day Navident Surgical Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Rajesh Nair', 'Oral & Maxillofacial Surgeon', '/events/11', 40, 0, '₹12,500', 1, 0, '2026-11-11 18:36:14', '2026-11-11 19:46:29', '[{"id":"test-1","type":"heading","text":"Dynamic Navigation Mastery"}]'),
(12, 'Management Of The Conometric Prosthesis', 'event-12-management-of-the-conometric-prosthesis', '2026', 'workshop', 'upcoming', 'August 22-23, 2026', 'ITC Maratha, Mumbai', '/assets/event/8.webp', '', 'Limited Seats', 'Comprehensive academic and clinical event covering Management Of The Conometric Prosthesis, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Rajesh Nair', 'Dynamic Navigation & Guided Implant Specialist', '/events/12', 40, 10, '₹13,500', 1, 1, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(14, 'OSICON 2025 – 2nd National Conference of the Osseointegration Society of India', 'event-14-osicon-2025-2nd-national-conference-of-the-osseointegration-society-of-india', '2025', 'conference', 'completed', 'August 08-10, 2025', 'Sheraton Grand, Bengaluru', '/assets/event/16.webp', '', 'Completed', 'Comprehensive academic and clinical event covering OSICON 2025 – 2nd National Conference of the Osseointegration Society of India, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'OSICON Faculty', 'Dynamic Navigation & Guided Implant Specialist', '/events/14', 40, 0, 'Delegate Pass', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(15, 'Guided System Software for Dentists and Dental Technicians', 'event-15-guided-system-software-for-dentists-and-dental-technicians', '2026', 'workshop', 'upcoming', 'September 05-06, 2026', 'Le Meridien, Kochi', '/assets/event/9.webp', '', 'Early Bird', 'Comprehensive academic and clinical event covering Guided System Software for Dentists and Dental Technicians, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan', 'Dynamic Navigation & Guided Implant Specialist', '/events/15', 40, 22, '₹12,000', 1, 1, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(17, 'International Digital Dentistry Congress', 'event-17-international-digital-dentistry-congress', '2026', 'conference', 'completed', 'February 27-28, 2026', 'Hyderabad International Convention Centre', '/assets/event/18.webp', '', 'Completed', 'Comprehensive academic and clinical event covering International Digital Dentistry Congress, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'IDDC Faculty', 'Dynamic Navigation & Guided Implant Specialist', '/events/17', 40, 0, 'Delegate', 1, 0, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(18, 'AEEDC Dubai - 30 Years of Inspiration, Progress & Global Impact', 'event-18-aeedc-dubai-30-years-of-inspiration-progress-global-impact', '2026', 'conference', 'completed', 'February 03-05, 2026', 'Dubai World Trade Centre, UAE', '/assets/event/20.webp', '', 'Completed', 'Comprehensive academic and clinical event covering AEEDC Dubai - 30 Years of Inspiration, Progress & Global Impact, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Global Dental Leaders', 'Dynamic Navigation & Guided Implant Specialist', '/events/18', 40, 0, 'Free Entry', 1, 0, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(19, 'NIDACON Nagpur - Unity in Profession. Excellence in Practice.', 'event-19-nidacon-nagpur-unity-in-profession-excellence-in-practice', '2026', 'conference', 'completed', 'January 24-25, 2026', 'Nagpur Convention Centre', '/assets/event/21.webp', '', 'Completed', 'Comprehensive academic and clinical event covering NIDACON Nagpur - Unity in Profession. Excellence in Practice., hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'NIDACON Council', 'Dynamic Navigation & Guided Implant Specialist', '/events/19', 40, 0, 'Delegate', 1, 0, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(20, '2nd Global Implant Summit 2026 - Trivandrum', 'event-20-2nd-global-implant-summit-2026-trivandrum', '2026', 'conference', 'completed', 'April 04-05, 2026', 'Hyatt Regency, Trivandrum', '/assets/event/31.webp', '', 'Completed', 'Comprehensive academic and clinical event covering 2nd Global Implant Summit 2026 - Trivandrum, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'National Implant Summit Faculty', 'Dynamic Navigation & Guided Implant Specialist', '/events/20', 40, 0, '₹8,500', 1, 0, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(21, 'Digital Full Mouth Implant Lab Workshop', 'event-21-digital-full-mouth-implant-lab-workshop', '2026', 'workshop', 'completed', 'January 17-18, 2026', 'Digital Dental Academy, Hyderabad', '/assets/event/19.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Digital Full Mouth Implant Lab Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan', 'Dynamic Navigation & Guided Implant Specialist', '/events/21', 40, 0, '₹14,000', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(22, 'IDS Cologne Germany - 2025', 'event-22-ids-cologne-germany-2025', '2025', 'conference', 'completed', 'March 25-29, 2025', 'Koelnmesse, Cologne, Germany', '/assets/event/23.webp', '', 'Completed', 'Comprehensive academic and clinical event covering IDS Cologne Germany - 2025, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Marks Biotech International Delegation', 'Dynamic Navigation & Guided Implant Specialist', '/events/22', 40, 0, 'Exhibition', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(24, 'Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department', 'event-24-manipal-college-of-dental-science-mangalore-navident-at-maxillofacial-department', '2025', 'workshop', 'completed', 'November 14, 2025', 'MCODS, Mangalore', '/assets/event/24.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. K. Srinivas', 'Professor & HOD, Oral Surgery', '/events/24', 40, 0, 'Institutional', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(25, 'Expodent Delhi', 'event-25-expodent-delhi', '2025', 'workshop', 'completed', 'December 19-21, 2025', 'Pragati Maidan, New Delhi', '/assets/event/25.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Expodent Delhi, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Marks Biotech Technical Team', 'Product Specialists', '/events/25', 40, 0, 'Free Entry', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(26, 'Full Arch Dental Implants Prosthetic Workshop', 'event-26-full-arch-dental-implants-prosthetic-workshop', '2026', 'workshop', 'completed', 'April 26, 2026', 'Taj Santacruz, Mumbai', '/assets/event/April-26-event/event-26-banner.webp', '', 'Completed', 'Comprehensive academic and clinical event covering Full Arch Dental Implants Prosthetic Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan', 'Dynamic Navigation & Guided Implant Specialist', '/events/26', 40, 0, '₹16,500', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(27, 'B & B Dental Education Series.', 'event-27-b-b-dental-education-series', '2026', 'workshop', 'completed', 'February 07-08, 2026', 'Radisson Blu, New Delhi', '/assets/event/27.webp', '', 'Completed', 'Comprehensive academic and clinical event covering B & B Dental Education Series., hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'B&B Dental Faculty', 'Dynamic Navigation & Guided Implant Specialist', '/events/27', 40, 0, '₹10,000', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL),
(28, 'ICOI - Asean Congress', 'event-28-icoi-asean-congress', '2026', 'conference', 'completed', 'March 19-21, 2026', 'Bangkok Convention Centre, Thailand', '/assets/event/28.png', '', 'Completed', 'Comprehensive academic and clinical event covering ICOI - Asean Congress, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'ICOI Asean Board', 'Dynamic Navigation & Guided Implant Specialist', '/events/28', 40, 0, 'International', 1, 0, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(29, 'Global Expodent Bangalore', 'event-29-global-expodent-bangalore', '2026', 'conference', 'upcoming', 'October 09-11, 2026', 'BIEC, Bengaluru', '/assets/event/29.webp', '', 'Registration Open', 'Comprehensive academic and clinical event covering Global Expodent Bangalore, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Global Expodent Team', 'Dynamic Navigation & Guided Implant Specialist', '/events/29', 40, 350, 'Free Entry', 1, 1, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL);
INSERT INTO `events` (`id`, `title`, `slug`, `year`, `type`, `status`, `date_string`, `location`, `image_url`, `banner_url`, `badge_text`, `description`, `speaker_name`, `speaker_title`, `registration_link`, `seats_total`, `seats_available`, `price`, `is_active`, `featured`, `created_at`, `updated_at`, `blocks_json`) VALUES
(30, 'ISOI - September ( National Conference Of ISOI )', 'event-30-isoi-september-national-conference-of-isoi', '2026', 'conference', 'upcoming', 'September 18-20, 2026', 'Chennai Trade Centre', '/assets/event/30.webp', '', 'Upcoming Expo', 'Comprehensive academic and clinical event covering ISOI - September ( National Conference Of ISOI ), hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'ISOI National Council', 'Dynamic Navigation & Guided Implant Specialist', '/events/30', 40, 120, 'Conference Pass', 1, 1, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(32, 'B&B Dental International Meeting', 'event-32-b-b-dental-international-meeting', '2026', 'conference', 'upcoming', 'November 12-14, 2026', 'Bologna, Italy', '/assets/event/32.webp', '', 'Global Meet', 'Comprehensive academic and clinical event covering B&B Dental International Meeting, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'B&B Dental Global Delegation', 'Dynamic Navigation & Guided Implant Specialist', '/events/32', 40, 80, 'International Meet', 1, 1, '2026-11-11 18:36:15', '2026-11-11 18:36:15', NULL),
(33, 'Advanced Live Surgical & Prosthetic Workshop', 'event-33-advanced-live-surgical-prosthetic-workshop', '2026', 'workshop', 'completed', 'April 18-19, 2026', 'Marks Biotech Masterclass Arena, Chennai', '/assets/event/33.png', '', 'Completed', 'Comprehensive academic and clinical event covering Advanced Live Surgical & Prosthetic Workshop, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.', 'Dr. Mani Krishnan & Clinical Mentors', 'Chief Navigation Specialists', '/events/33', 40, 0, '₹18,000', 1, 0, '2026-11-11 18:36:14', '2026-11-11 18:36:14', NULL);

-- ------------------------------------------------------------------------
-- Table structure & data for table: `invoice_counters`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `invoice_counters`;
CREATE TABLE IF NOT EXISTS `invoice_counters` (
  `year` int NOT NULL,
  `value` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 1 rows for `invoice_counters`
INSERT INTO `invoice_counters` (`year`, `value`) VALUES
(2026, 0);

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offers`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offers`;
CREATE TABLE IF NOT EXISTS `offers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `offer_type` enum('bulk_quantity','mix_match','combo_bundle','cross_sell','cart_value') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','active','inactive','scheduled','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `start_at` datetime DEFAULT NULL,
  `end_at` datetime DEFAULT NULL,
  `priority` int NOT NULL DEFAULT '0',
  `stackable` tinyint(1) NOT NULL DEFAULT '0',
  `usage_limit` int DEFAULT NULL,
  `times_used` int NOT NULL DEFAULT '0',
  `display_config` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `offer_code` (`offer_code`),
  KEY `idx_offers_status` (`status`),
  KEY `idx_offers_dates` (`start_at`,`end_at`),
  KEY `idx_offers_type` (`offer_type`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 5 rows for `offers`
INSERT INTO `offers` (`id`, `name`, `offer_code`, `description`, `offer_type`, `status`, `start_at`, `end_at`, `priority`, `stackable`, `usage_limit`, `times_used`, `display_config`, `created_at`, `updated_at`) VALUES
(17, 'Biologics Volume Tier Savings', 'BULK-BIO-TIER', 'Tiered volume savings on clinical regenerative particulates. Unlock progressive discounts as order quantity increases.', 'bulk_quantity', 'active', NULL, NULL, 10, 1, 500, 0, '{"displayMessage":"Buy 5+ save 10%, Buy 10+ save 15%, Buy 20+ save 20%!","storefrontBadge":"BULK SAVINGS UP TO 20%"}', '2026-11-10 13:43:51', '2026-11-10 13:43:51'),
(18, 'Implant Surgical Combo Pack', 'MIX-SURGICAL-COMBO', 'Combine 3 Titanium Membranes and 2 Regenerative Vials to receive 15% promotional combo discount.', 'mix_match', 'active', NULL, NULL, 20, 1, 200, 0, '{"displayMessage":"Bundle Titanium Membranes with Regenerative Vials for an instant 15% discount!","storefrontBadge":"SURGICAL COMBO 15% OFF"}', '2026-11-10 13:43:51', '2026-11-10 13:43:51'),
(19, 'Bone Graft Starter Kit', 'KIT-BONE-GRAFT', 'Complete starter combination containing Titanium Membrane, Particulate Vial, and Bone Block.', 'combo_bundle', 'active', NULL, NULL, 15, 1, 100, 0, '{"displayMessage":"Order all 3 clinical starter essentials together and save ₹500 instantly!","storefrontBadge":"STARTER KIT ₹500 OFF"}', '2026-11-10 13:43:51', '2026-11-10 13:43:51'),
(20, 'Titanium Membrane Cross-Sell Special', 'REC-CROSS-SELL-01', 'Clinicians purchasing Titanium Membranes receive exclusive 25% discount on Cortical Bone Blocks.', 'cross_sell', 'active', NULL, NULL, 30, 1, NULL, 0, '{"displayMessage":"Pair with Cortical Bone Blocks to get an exclusive 25% discount!","storefrontBadge":"SPECIAL COMPLEMENTARY ADD-ON"}', '2026-11-10 13:43:51', '2026-11-10 13:43:51'),
(21, 'Clinical Spend & Save ₹1,000', 'TIER-CART-10K', 'Unlock ₹1,000 direct deduction on clinic orders of ₹10,000 or more.', 'cart_value', 'active', NULL, NULL, 5, 1, NULL, 0, '{"maxDiscount":1000,"minCartValue":10000,"displayMessage":"Orders over ₹10,000 automatically receive ₹1,000 savings at checkout!","storefrontBadge":"SPEND ₹10K GET ₹1,000 OFF"}', '2026-11-10 13:43:51', '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `addresses`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Home',
  `line1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `line2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pincode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `products`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `category` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `type_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `specifications` json DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_products_slug` (`slug`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 19 rows for `products`
INSERT INTO `products` (`id`, `name`, `brand_id`, `category_id`, `category`, `type_name`, `slug`, `sku`, `price`, `description`, `specifications`, `stock`, `status`, `created_at`, `updated_at`) VALUES
(49, 'DURAVIT EV Implant System', 10, 40, 'Dental Implants & Systems', 'DURAVIT EV', 'duravit-ev-implant-system', 'BB-DUR-EV-SYS', '12500.00', 'Conical connection dental implant engineered with self-tapping progressive threads for high primary stability in both soft and dense bone. Features the proprietary Conexa connection with internal hexagon, eliminating bacterial micro-leakage and crestal bone resorption.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Material":"Medical Grade 4 Pure Titanium / Grade 5 ELI","Connection":"Conexa Conical Internal Hex (Cold-Weld Seal)","Sterilization":"Gamma radiation (sterile blister pack)","Surface Treatment":"Dual-acid etched and sandblasted microrough surface","Primary Indication":"Immediate & delayed placement in soft/dense bone"}', 150, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(50, 'DURAVIT 3P Universal Implants', 10, 41, 'Dental Implants & Systems', 'DURAVIT 3P', 'duravit-3p-universal-implants', 'BB-DUR-3P-SYS', '11500.00', 'Triple-pitch thread geometry providing accelerated insertion speed, high primary stability, and versatile single-stage or two-stage surgical protocols across all jaw bone densities.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Material":"Medical Grade 4 Titanium","Connection":"Internal Hexagonal Connection (2.42mm hex)","Thread Geometry":"Triple-lead progressive pitch for fast insertion","Surface Treatment":"Sandblasted and double acid-etched","Surgical Protocol":"Single-stage or Two-stage placement"}', 180, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(51, 'DURAVIT Wide Implants', 10, 42, 'Dental Implants & Systems', 'DURAVIT Wide', 'duravit-wide-implants', 'BB-DUR-WIDE', '13500.00', 'Specially engineered for immediate post-extraction molar sites. The wide coronal body maximizes bone-to-implant contact and eliminates the need for extensive bone augmentation in wide extraction sockets.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Connection":"Conexa Conical / Internal Hex","Apex Design":"Flat anatomical protection apex","Neck Diameter":"Wide neck 5.5mm and 6.0mm","Primary Indication":"Immediate post-extraction molar placement"}', 90, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(52, 'DURAVIT Pterygo Implants', 10, 43, 'Dental Implants & Systems', 'DURAVIT Pterygo', 'duravit-pterygo-implants', 'BB-DUR-PTERYGO', '16500.00', 'Extra-long bicortical anchorage implants dedicated to pterygoid and pyramidal process fixation in severely resorbed posterior maxilla cases without requiring invasive sinus bone augmentation.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Lengths":"20 mm and 22 mm","Anchorage":"Bicortical pterygomaxillary pillar","Connection":"Conexa Conical Connection","Torque Resistance":"High insertion torque (>60 Ncm)"}', 60, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(53, 'DURAVIT Slim Implants', 10, 44, 'Dental Implants & Systems', 'DURAVIT Slim', 'duravit-slim-implants', 'BB-DUR-SLIM', '12000.00', 'Narrow 3.0mm diameter implant designed specifically for reduced interdental spaces, maxillary lateral incisors, mandibular incisors, and narrow alveolar ridges.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Diameter":"3.0 mm Narrow Profile","Material":"High-strength Medical Grade 5 ELI Titanium Alloy","Connection":"Internal Hex Conical Connection","Primary Indication":"Incisor restorations & narrow bone ridges"}', 80, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(54, 'DURAVIT Mini Implants', 10, 45, 'Dental Implants & Systems', 'DURAVIT Mini', 'duravit-mini-implants', 'BB-DUR-MINI', '8500.00', 'Monolithic one-piece small diameter implant with integrated ball abutment, optimized for minimally invasive flapless overdenture stabilization in thin ridges.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Body Type":"One-piece monolithic body","Procedure":"Minimally invasive flapless placement","Indication":"Immediate overdenture retention and stabilization","Attachment Head":"Integrated spherical ball abutment (Ø 2.5 mm)"}', 70, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(55, 'Customized Subperiosteal Implants', 10, 46, 'Dental Implants & Systems', 'Subperiosteal', 'customized-subperiosteal-implants', 'BB-SUB-CUSTOM', '65000.00', 'Patient-specific 3D printed titanium subperiosteal mesh frames manufactured via Direct Metal Laser Sintering (DMLS) directly from CBCT scans for severe jawbone atrophy without grafting.', '{"Design":"Patient-specific CAD custom design from CBCT & optical scan","Fixation":"Mini osteosynthesis fixation screws","Material":"Medical Grade 23 Ti-6Al-4V ELI","Abutments":"Pre-angled multi-unit abutment pillars integrated","Indication":"Extreme maxillary or mandibular ridge atrophy","Manufacturing":"Direct Metal Laser Sintering (DMLS) 3D Titanium Printing"}', 20, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(56, 'Conexa Prosthetics & Abutments', 10, 48, 'Prosthetics & Abutments', 'Conexa Prosthetics', 'conexa-connection-prosthetics', 'BB-CONEXA-PROSTH', '4500.00', 'High-precision conical cold-welding prosthetic range with internal hex. Delivers a zero-microgap hermetic bacterial seal, preventing peri-implantitis and screw loosening.', '{"Range":"Straight abutments, angled abutments, Ti-Bases, Multi-Unit","Origin":"Made in Bologna, Italy (B&B Dental)","Tolerance":"Sub-micron precision machining","Compatibility":"DURAVIT EV, 3P, Wide, Slim implant systems","Connection Seal":"Conical cold-welding with internal hexagon"}', 250, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(57, 'B&B Surgical Kits & Guided Boxes', 10, 50, 'Surgical Kits & Instrumentation', 'Surgical Cassette', 'bb-surgical-kits-guided-boxes', 'BB-SURG-KIT-BOX', '85000.00', 'Fully autoclavable ergonomic surgical cassettes equipped with precision multi-step drills, physical depth-stop keys, torque ratchets, parallel pins, and guided surgery sleeves.', '{"Origin":"Made in Bologna, Italy (B&B Dental)","Workflow":"Freehand and fully guided surgical protocols","Drill Coating":"DLC (Diamond-Like Carbon) low-friction wear coating","Included Tools":"Step drills, countersinks, drivers, torque ratchet 10-70 Ncm, depth keys","Cassette Material":"High-temperature autoclavable medical polymer"}', 25, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(58, 'Rocky Mountain Allograft — Cancellous Particulate Vials', 11, 52, 'Regenerative Biomaterials', 'Cancellous Particulate', 'rocky-mountain-allograft-cancellous-particulate', 'RM-CANPAR-MASTER', '4500.00', '100% human donor cancellous bone and marrow particulate, gamma-irradiated for complete sterility while preserving osteoconductive trabecular matrix. Proven over 40+ years of clinical use.', '{"Storage":"Ambient room temperature (no cold storage required)","Processing":"Sterilized by low-dose Gamma Irradiation","Shelf Life":"5 Years from date of processing","Indications":"Sinus lift, socket preservation, ridge augmentation, periodontal defects","Accreditation":"AATB Accredited, FDA Registered (Tissue Bank USA)","Tissue Source":"Human Donor Allogenic Cancellous Bone & Marrow"}', 200, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(59, 'Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks', 11, 53, 'Regenerative Biomaterials', 'Bone Blocks', 'rocky-mountain-allograft-cortical-cancellous-blocks', 'RM-BB-MASTER', '18000.00', 'Structural irradiated human allogenic cortical/cancellous bone blocks engineered for severe 3D horizontal and vertical alveolar ridge reconstruction.', '{"Fixation":"Lag screws / titanium osteosynthesis fixation","Processing":"Sterile irradiated allograft","Indications":"Severe horizontal and vertical alveolar ridge atrophy","Accreditation":"AATB Accredited, FDA Registered","Tissue Composition":"Composite Cortical (outer support) + Cancellous (inner revascularization)"}', 80, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(60, 'Rocky Mountain Allograft — Cortical Particulate Vials', 11, 54, 'Regenerative Biomaterials', 'Cortical Particulate', 'rocky-mountain-allograft-cortical-particulate', 'RM-CP-MASTER', '5500.00', 'Irradiated allogenic crushed cortical particulate (2-3 mm granule size), delivering long-term volume space maintenance and slow bone remodeling.', '{"Indications":"Onlay grafting, sinus floor elevation, external contouring","Tissue Type":"100% Allogenic Cortical Bone Particulate","Granule Size":"2 - 3 mm randomly sized","Accreditation":"AATB Accredited, FDA Registered","Resorption Rate":"Slow resorption for maximum volume retention"}', 100, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(61, 'NovoBone Xenograft Granules', 12, 55, 'Regenerative Biomaterials', 'Bovine Xenograft', 'novobone-xenograft-granules', 'NB-XENO-GRAN', '3800.00', 'Deproteinized bovine bone mineral, thermally treated at low temperature to preserve the natural interconnective crystalline hydroxyapatite matrix. 100% resorbable and compliant with MDR EU 2017/745.', '{"Origin":"Bovine Bone Mineral (Cattle from certified disease-free herds)","Compliance":"MDR (EU 2017/745) Class III Medical Device","Processing":"Low-temperature thermal purification (zero residual proteins)","Origin Country":"Produced and packaged entirely in Italy","Pore Structure":"Interconnected macro- and micro-pores (65-80% porosity)"}', 150, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(62, 'T-Barrier Collagen — Resorbable Equine Collagen Membrane', 13, 56, 'Regenerative Biomaterials', 'Collagen Membrane', 't-barrier-collagen-membrane', 'TB-COL-MEM', '4200.00', 'Resorbable equine pericardium collagen barrier membrane. Delivers exceptional tensile tear resistance, full barrier protection for 6-8 weeks, and complete physiological resorption without immune response.', '{"Origin":"Equine Pericardium Type I & III Collagen","Handling":"High tensile strength, easily draped and suturable","Packaging":"Sterile double peel-pack pouch","Origin Country":"Made in Italy","Resorption Period":"6 - 8 weeks complete physiological biodegradation"}', 140, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(63, 'T-Barrier Titanium Safety Mesh', 13, 57, 'Regenerative Biomaterials', 'Titanium Mesh', 't-barrier-titanium-safety-mesh', 'TB-TITAN-MESH', '14500.00', 'Biocompatible Grade 1 pure titanium safety mesh designed for Guided Bone Regeneration (GBR). Features optimal microporosity for vascular nutrient diffusion while preserving mechanical stability against flap collapse.', '{"Handling":"Easily trimmed, molded, and fixed with micro-screws","Material":"Pure Grade 1 Medical Titanium (ISO 5832-2)","Thickness":"0.13 mm ultra-thin profile","Origin Country":"Made in Italy","Biocompatibility":"Non-reactive, prevents soft tissue compression"}', 60, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(64, 'Amcrylate Surgical Tissue Adhesive', 14, 58, 'Regenerative Biomaterials', 'Tissue Adhesive', 'amcrylate-surgical-tissue-adhesive', 'AMCRYL-TISSUE-ADH', '2400.00', 'Medical-grade Isoamyl 2-cyanoacrylate surgical liquid adhesive for sutureless wound closure and periodontal dressing. Solidifies in 5-10 seconds, forming a flexible, sterile, waterproof, and bacteriostatic barrier.', '{"Advantage":"Significantly less tissue inflammation & no brittleness compared to N-butyl cyanoacrylate","Properties":"Haemostatic, bacteriostatic, water-resistant, biodegradable","Indications":"Dental extraction sockets, periodontal flaps, mucosal lacerations, skin incisions","Collaboration":"Indian Institute of Chemical Technology (IICT) & TIFAC","Active Compound":"Isoamyl 2-cyanoacrylate monomer","Polymerization Time":"5 to 10 seconds on contact with tissue fluid"}', 160, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(65, 'Navident 3.0 Dynamic Tracking System', 15, 60, 'Dynamic Navigation & 3D Photogrammetry', 'Dynamic Navigation', 'navident-3-dynamic-tracking-system', 'CLARO-NAVIDENT-30', '1850000.00', 'Dynamic computer-guided surgical navigation system providing real-time 3D optical tracking of drill position, angle, and apex depth relative to patient CBCT anatomy with sub-millimeter clinical accuracy.', '{"Origin":"Claronav (Toronto, Canada)","Accuracy":"Sub-millimeter real-time tip tracking (< 0.5 mm)","Software":"Navident 3.0 Planning & Live Guidance Suite","Compatibility":"Universal compatibility with all implant kits and handpieces","Tracking Technology":"High-frequency Optical Stereoscopic Micrometric Sensors"}', 10, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(66, 'Navident 4.0 EVO Surgical Navigation', 15, 60, 'Dynamic Navigation & 3D Photogrammetry', 'Dynamic Navigation EVO', 'navident-4-evo-surgical-system', 'CLARO-NAVIDENT-40-EVO', '2450000.00', 'Next-generation surgical navigation powered by high-frame-rate stereoscopic cameras, instantaneous touchless trace registration, and comprehensive guidance for zygomatic, pterygoid, and full-arch cases.', '{"Origin":"Claronav (Toronto, Canada)","Sensor":"EVO High-Speed Ultra-Wide Optical Tracker","Display":"Ultra-HD Medical Touchscreen on Articulated Arm","Registration":"Touchless trace registration in under 60 seconds","Advanced Protocols":"Zygomatic, Pterygoid, and Edentulous Full-Arch Navigation"}', 8, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(67, 'MicronMapper 3D Photogrammetry Scanner', 15, 61, 'Dynamic Navigation & 3D Photogrammetry', 'Photogrammetry Scanner', 'micronmapper-photogrammetry', 'CLARO-MICRONMAPPER', '1650000.00', 'High-precision 3D photogrammetric optical scanner for instant full-arch implant position capture. Eliminates intraoral scanning errors and traditional impression distortion for guaranteed passive fit.', '{"Origin":"Claronav (Toronto, Canada)","Capture Speed":"Under 15 seconds full-arch capture","Export Formats":"Direct open STL / PLY export to Exocad, 3Shape, and Blender","Included Accessories":"MicronMapper sensor, 6x precision scan flags, calibration artifact","Measurement Precision":"Sub-10 micron passive stereophotogrammetric resolution"}', 12, 'active', '2026-11-11 20:57:40', '2026-11-11 20:57:40');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `product_variants`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `attribute_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Size',
  `value` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock` int NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 61 rows for `product_variants`
INSERT INTO `product_variants` (`id`, `product_id`, `attribute_name`, `value`, `sku`, `price`, `stock`, `sort_order`, `created_at`, `updated_at`) VALUES
(16, 49, 'Diameter', 'Ø 3.5 mm x 10 mm', 'BB-EV-35-10', '12500.00', 40, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(17, 49, 'Diameter', 'Ø 4.0 mm x 10 mm', 'BB-EV-40-10', '12500.00', 50, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(18, 49, 'Diameter', 'Ø 4.5 mm x 10 mm', 'BB-EV-45-10', '12500.00', 35, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(19, 49, 'Diameter', 'Ø 5.0 mm x 10 mm', 'BB-EV-50-10', '12500.00', 25, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(20, 50, 'Diameter', 'Ø 3.75 mm x 10 mm', 'BB-3P-375-10', '11500.00', 60, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(21, 50, 'Diameter', 'Ø 4.25 mm x 10 mm', 'BB-3P-425-10', '11500.00', 70, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(22, 50, 'Diameter', 'Ø 4.75 mm x 10 mm', 'BB-3P-475-10', '11500.00', 50, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(23, 51, 'Neck Diameter', 'Ø 5.5 mm x 10 mm', 'DURAVIT-WIDE-55-10', '13500.00', 45, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(24, 51, 'Neck Diameter', 'Ø 6.0 mm x 10 mm', 'DURAVIT-WIDE-60-10', '13500.00', 45, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(25, 52, 'Length', 'Ø 3.75 mm x 20 mm', 'DURAVIT-PTERYGO-20', '16500.00', 30, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(26, 52, 'Length', 'Ø 3.75 mm x 22 mm', 'DURAVIT-PTERYGO-22', '16500.00', 30, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(27, 53, 'Length', 'Ø 3.0 mm x 10 mm', 'DURAVIT-SLIM-30-10', '12000.00', 25, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(28, 53, 'Length', 'Ø 3.0 mm x 11.5 mm', 'DURAVIT-SLIM-30-115', '12000.00', 30, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(29, 53, 'Length', 'Ø 3.0 mm x 13 mm', 'DURAVIT-SLIM-30-13', '12000.00', 25, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(30, 54, 'Size', 'Ø 2.4 mm x 10 mm', 'BB-MINI-24-10', '8500.00', 25, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(31, 54, 'Size', 'Ø 2.4 mm x 13 mm', 'BB-MINI-24-13', '8500.00', 25, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(32, 54, 'Size', 'Ø 2.4 mm x 15 mm', 'BB-MINI-24-15', '8500.00', 20, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(33, 55, 'Arch Type', 'Full-Arch Maxilla Custom Frame', 'BB-SUB-MAX-FA', '65000.00', 10, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(34, 55, 'Arch Type', 'Full-Arch Mandible Custom Frame', 'BB-SUB-MAND-FA', '65000.00', 10, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(35, 56, 'Abutment Type', 'Straight Titanium Abutment (G/H 2mm)', 'BB-CON-STR-2', '4200.00', 60, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(36, 56, 'Abutment Type', 'Angled 15° Titanium Abutment', 'BB-CON-ANG-15', '4800.00', 50, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(37, 56, 'Abutment Type', 'Angled 25° Titanium Abutment', 'BB-CON-ANG-25', '4800.00', 50, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(38, 56, 'Abutment Type', 'CAD/CAM Ti-Base Engaging', 'BB-CON-TIBASE-ENG', '4500.00', 50, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(39, 56, 'Abutment Type', 'Multi-Unit Abutment (MUA) Straight', 'BB-CON-MUA-STR', '5500.00', 40, 4, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(40, 57, 'Kit Configuration', 'Universal Dental Implant Surgical Kit', 'BB-SURG-KIT-UNIV', '85000.00', 15, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40');
INSERT INTO `product_variants` (`id`, `product_id`, `attribute_name`, `value`, `sku`, `price`, `stock`, `sort_order`, `created_at`, `updated_at`) VALUES
(41, 57, 'Kit Configuration', 'Complete 3D Guided Surgery Cassette', 'BB-SURG-KIT-GUIDED', '110000.00', 10, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(42, 58, 'Size', '0.25 gm', 'RM-CANPAR-025', '4500.00', 40, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(43, 58, 'Size', '0.50 gm', 'RM-CANPAR-050', '7500.00', 60, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(44, 58, 'Size', '1.0 gm', 'RM-CANPAR-100', '12000.00', 50, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(45, 58, 'Size', '2.0 gm', 'RM-CANPAR-200', '21000.00', 30, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(46, 58, 'Size', '3.0 gm', 'RM-CANPAR-300', '29000.00', 20, 4, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(47, 59, 'Dimensions', '5 × 10 × 10 mm', 'RM-BB-5x10x10', '18000.00', 15, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(48, 59, 'Dimensions', '5 × 10 × 20 mm', 'RM-BB-5x10x20', '26000.00', 15, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(49, 59, 'Dimensions', '5 × 10 × 30 mm', 'RM-BB-5x10x30', '34000.00', 15, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(50, 59, 'Dimensions', '10 × 10 × 10 mm', 'RM-BB-10x10x10', '28000.00', 15, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(51, 59, 'Dimensions', '10 × 10 × 20 mm', 'RM-BB-10x10x20', '42000.00', 10, 4, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(52, 59, 'Dimensions', '10 × 10 × 30 mm', 'RM-BB-10x10x30', '55000.00', 10, 5, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(53, 60, 'Size', '0.5 gm', 'RM-CP-050', '5500.00', 35, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(54, 60, 'Size', '1.0 gm', 'RM-CP-100', '9500.00', 40, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(55, 60, 'Size', '2.0 gm', 'RM-CP-200', '17000.00', 25, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(56, 61, 'Weight / Volume', '0.5 g (1.0 cc) — 0.2-0.6mm', 'NB-GRAN-05', '3800.00', 30, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(57, 61, 'Weight / Volume', '1.0 g (2.0 cc) — 0.2-0.6mm', 'NB-GRAN-10', '6500.00', 40, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(58, 61, 'Weight / Volume', '2.0 g (4.0 cc) — 0.2-0.6mm', 'NB-GRAN-20', '11500.00', 35, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(59, 61, 'Weight / Volume', '3.0 g (6.0 cc) — 0.2-0.6mm', 'NB-GRAN-30', '16500.00', 25, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(60, 61, 'Weight / Volume', '5.0 g (10.0 cc) — 0.2-0.6mm', 'NB-GRAN-50', '25000.00', 20, 4, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(61, 62, 'Membrane Size', '10 × 10 × 1 mm', 'TB-COL-10x10', '4200.00', 25, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(62, 62, 'Membrane Size', '10 × 20 × 0.25 mm', 'TB-COL-10x20', '6200.00', 25, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(63, 62, 'Membrane Size', '15 × 20 × 0.25 mm', 'TB-COL-15x20', '7800.00', 30, 2, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(64, 62, 'Membrane Size', '23 × 23 × 0.25 mm', 'TB-COL-23x23', '9500.00', 30, 3, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(65, 62, 'Membrane Size', '20 × 30 × 0.25 mm', 'TB-COL-20x30', '11500.00', 15, 4, '2026-11-11 20:57:40', '2026-11-11 20:57:40');
INSERT INTO `product_variants` (`id`, `product_id`, `attribute_name`, `value`, `sku`, `price`, `stock`, `sort_order`, `created_at`, `updated_at`) VALUES
(66, 62, 'Membrane Size', '30 × 40 × 0.25 mm', 'TB-COL-30x40', '15500.00', 15, 5, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(67, 63, 'Mesh Dimensions', '24 × 29 × 0.13 mm (Standard)', 'TB-TIT-24x29', '14500.00', 30, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(68, 63, 'Mesh Dimensions', '34 × 25 × 0.13 mm (Macro)', 'TB-TIT-34x25', '17500.00', 30, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(69, 64, 'Pack Size', 'Box of 5 Ampoules (0.25 ml each)', 'AMCRYL-PK5-025', '2400.00', 90, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(70, 64, 'Pack Size', 'Box of 10 Ampoules (0.25 ml each)', 'AMCRYL-PK10-025', '4200.00', 70, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(71, 65, 'Cart System', 'Navident 3.0 Mobile Cart Workstation', 'NAVI-30-CART', '1850000.00', 5, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(72, 65, 'Cart System', 'Navident 3.0 Portable Rig Unit', 'NAVI-30-PORTABLE', '1650000.00', 5, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(73, 66, 'System Edition', 'Navident EVO Surgical Cart Edition', 'NAVI-40-EVO-CART', '2450000.00', 5, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(74, 66, 'System Edition', 'Navident EVO Zygomatic Specialized Package', 'NAVI-40-EVO-ZYGO', '2750000.00', 3, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(75, 67, 'Package', 'Complete MicronMapper Full-Arch Scanner Suite', 'MM-COMPLETE-SUITE', '1650000.00', 7, 0, '2026-11-11 20:57:40', '2026-11-11 20:57:40'),
(76, 67, 'Package', 'MicronMapper Pro Kit with 12x Scan Flags', 'MM-PRO-KIT-12', '1850000.00', 5, 1, '2026-11-11 20:57:40', '2026-11-11 20:57:40');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `product_images`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 44 rows for `product_images`
INSERT INTO `product_images` (`id`, `product_id`, `image_path`, `alt_text`, `sort_order`, `created_at`) VALUES
(35, 49, '/assets/imgs/2.webp', 'DURAVIT EV Implant System - Official Product Image', 0, '2026-11-11 20:57:40'),
(36, 49, '/uploads/products/2.webp', 'DURAVIT EV Implant System - Official Product Image', 1, '2026-11-11 20:57:40'),
(37, 50, '/assets/imgs/1.webp', 'DURAVIT 3P Universal Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(38, 50, '/uploads/products/1.webp', 'DURAVIT 3P Universal Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(39, 51, '/assets/imgs/3.webp', 'DURAVIT Wide Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(40, 51, '/uploads/products/3.webp', 'DURAVIT Wide Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(41, 52, '/assets/imgs/4.webp', 'DURAVIT Pterygo Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(42, 52, '/uploads/products/4.webp', 'DURAVIT Pterygo Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(43, 53, '/assets/imgs/5.webp', 'DURAVIT Slim Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(44, 53, '/uploads/products/5.webp', 'DURAVIT Slim Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(45, 54, '/assets/imgs/6.webp', 'DURAVIT Mini Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(46, 54, '/uploads/products/6.webp', 'DURAVIT Mini Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(47, 55, '/assets/imgs/di-2.webp', 'Customized Subperiosteal Implants - Official Product Image', 0, '2026-11-11 20:57:40'),
(48, 55, '/uploads/products/di-2.webp', 'Customized Subperiosteal Implants - Official Product Image', 1, '2026-11-11 20:57:40'),
(49, 56, '/assets/imgs/di-1.webp', 'Conexa Prosthetics & Abutments - Official Product Image', 0, '2026-11-11 20:57:40'),
(50, 56, '/uploads/products/di-1.webp', 'Conexa Prosthetics & Abutments - Official Product Image', 1, '2026-11-11 20:57:40'),
(51, 57, '/assets/imgs/di-2.webp', 'B&B Surgical Kits & Guided Boxes - Official Product Image', 0, '2026-11-11 20:57:40'),
(52, 57, '/uploads/products/di-2.webp', 'B&B Surgical Kits & Guided Boxes - Official Product Image', 1, '2026-11-11 20:57:40'),
(53, 58, '/assets/imgs/Rectangle 253.webp', 'Rocky Mountain Allograft — Cancellous Particulate Vials - Official Product Image', 0, '2026-11-11 20:57:40'),
(54, 58, '/uploads/products/Rectangle 253.webp', 'Rocky Mountain Allograft — Cancellous Particulate Vials - Official Product Image', 1, '2026-11-11 20:57:40'),
(55, 59, '/assets/imgs/Rectangle 252.webp', 'Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks - Official Product Image', 0, '2026-11-11 20:57:40'),
(56, 59, '/uploads/products/Rectangle 252.webp', 'Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks - Official Product Image', 1, '2026-11-11 20:57:40'),
(57, 59, '/assets/imgs/allograft-bone-blocks.png', 'Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks - Official Product Image', 2, '2026-11-11 20:57:40'),
(58, 60, '/assets/imgs/allograft-cortical-particulate.png', 'Rocky Mountain Allograft — Cortical Particulate Vials - Official Product Image', 0, '2026-11-11 20:57:40'),
(59, 60, '/uploads/products/allograft-cortical-particulate.png', 'Rocky Mountain Allograft — Cortical Particulate Vials - Official Product Image', 1, '2026-11-11 20:57:40');
INSERT INTO `product_images` (`id`, `product_id`, `image_path`, `alt_text`, `sort_order`, `created_at`) VALUES
(60, 61, '/assets/imgs/image 102.webp', 'NovoBone Xenograft Granules - Official Product Image', 0, '2026-11-11 20:57:40'),
(61, 61, '/uploads/products/image 102.webp', 'NovoBone Xenograft Granules - Official Product Image', 1, '2026-11-11 20:57:40'),
(62, 61, '/assets/imgs/Novobone.webp', 'NovoBone Xenograft Granules - Official Product Image', 2, '2026-11-11 20:57:40'),
(63, 62, '/assets/imgs/Collagen13.webp', 'T-Barrier Collagen — Resorbable Equine Collagen Membrane - Official Product Image', 0, '2026-11-11 20:57:40'),
(64, 62, '/uploads/products/Collagen13.webp', 'T-Barrier Collagen — Resorbable Equine Collagen Membrane - Official Product Image', 1, '2026-11-11 20:57:40'),
(65, 62, '/assets/imgs/Collagen.webp', 'T-Barrier Collagen — Resorbable Equine Collagen Membrane - Official Product Image', 2, '2026-11-11 20:57:40'),
(66, 63, '/assets/imgs/titanium-membrane-1.webp', 'T-Barrier Titanium Safety Mesh - Official Product Image', 0, '2026-11-11 20:57:40'),
(67, 63, '/uploads/products/titanium-membrane-1.webp', 'T-Barrier Titanium Safety Mesh - Official Product Image', 1, '2026-11-11 20:57:40'),
(68, 63, '/uploads/products/image 101.webp', 'T-Barrier Titanium Safety Mesh - Official Product Image', 2, '2026-11-11 20:57:40'),
(69, 64, '/assets/imgs/amcrylate-pack.jpeg', 'Amcrylate Surgical Tissue Adhesive - Official Product Image', 0, '2026-11-11 20:57:40'),
(70, 64, '/uploads/products/amcrylate-pack.jpeg', 'Amcrylate Surgical Tissue Adhesive - Official Product Image', 1, '2026-11-11 20:57:40'),
(71, 64, '/assets/imgs/tissue-img1.webp', 'Amcrylate Surgical Tissue Adhesive - Official Product Image', 2, '2026-11-11 20:57:40'),
(72, 65, '/assets/imgs/navident-1.webp', 'Navident 3.0 Dynamic Tracking System - Official Product Image', 0, '2026-11-11 20:57:40'),
(73, 65, '/uploads/products/navident-1.webp', 'Navident 3.0 Dynamic Tracking System - Official Product Image', 1, '2026-11-11 20:57:40'),
(74, 66, '/assets/imgs/navident.webp', 'Navident 4.0 EVO Surgical Navigation - Official Product Image', 0, '2026-11-11 20:57:40'),
(75, 66, '/uploads/products/navident.webp', 'Navident 4.0 EVO Surgical Navigation - Official Product Image', 1, '2026-11-11 20:57:40'),
(76, 66, '/uploads/products/3.0.webp', 'Navident 4.0 EVO Surgical Navigation - Official Product Image', 2, '2026-11-11 20:57:40'),
(77, 67, '/assets/imgs/micronmaper.webp', 'MicronMapper 3D Photogrammetry Scanner - Official Product Image', 0, '2026-11-11 20:57:40'),
(78, 67, '/uploads/products/micronmaper.webp', 'MicronMapper 3D Photogrammetry Scanner - Official Product Image', 1, '2026-11-11 20:57:40');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `product_daily_analytics`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `product_daily_analytics`;
CREATE TABLE IF NOT EXISTS `product_daily_analytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `product_id` int NOT NULL,
  `product_views` int NOT NULL DEFAULT '0',
  `unique_viewers` int NOT NULL DEFAULT '0',
  `add_to_cart_count` int NOT NULL DEFAULT '0',
  `wishlist_count` int NOT NULL DEFAULT '0',
  `purchase_count` int NOT NULL DEFAULT '0',
  `units_sold` int NOT NULL DEFAULT '0',
  `revenue` decimal(12,2) NOT NULL DEFAULT '0.00',
  `cancelled_units` int NOT NULL DEFAULT '0',
  `returned_units` int NOT NULL DEFAULT '0',
  `search_appearances` int NOT NULL DEFAULT '0',
  `search_clicks` int NOT NULL DEFAULT '0',
  `total_dwell_seconds` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_prod_daily_date` (`date`,`product_id`),
  KEY `product_id` (`product_id`),
  KEY `idx_prod_daily_date` (`date`),
  CONSTRAINT `product_daily_analytics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `inventory_logs`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `inventory_logs`;
CREATE TABLE IF NOT EXISTS `inventory_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `type` enum('in','out','adjustment') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `delta` int NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `adjusted_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `adjusted_by` (`adjusted_by`),
  KEY `fk_inventory_logs_variant` (`variant_id`),
  CONSTRAINT `fk_inventory_logs_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_logs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_logs_ibfk_2` FOREIGN KEY (`adjusted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `customer_sessions`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `customer_sessions`;
CREATE TABLE IF NOT EXISTS `customer_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anonymous_session_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int DEFAULT NULL,
  `landing_page` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `exit_page` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `referrer` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `utm_source` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_medium` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_campaign` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_term` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'desktop',
  `browser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operating_system` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `started_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ended_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `duration_seconds` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_id` (`session_id`),
  KEY `idx_sessions_customer` (`customer_id`),
  KEY `idx_sessions_anon` (`anonymous_session_id`),
  KEY `idx_sessions_started` (`started_at`),
  KEY `idx_sessions_utm` (`utm_source`,`utm_campaign`),
  CONSTRAINT `customer_sessions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `orders`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `customer_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `discount_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','shipped','delivered','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_line1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_line2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_state` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_pincode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applied_offers` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `order_items`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `quantity` int NOT NULL,
  `line_total` decimal(10,2) NOT NULL,
  `applied_offer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `invoices`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `customer_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_line1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_line2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_state` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_pincode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `discount_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('unpaid','paid','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `issued_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `analytics_events`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `analytics_events`;
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `session_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anonymous_session_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int DEFAULT NULL,
  `event_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `page_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `referrer` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `search_query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_metadata` json DEFAULT NULL,
  `device_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'desktop',
  `browser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operating_system` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`),
  KEY `category_id` (`category_id`),
  KEY `order_id` (`order_id`),
  KEY `idx_events_type_created` (`event_type`,`created_at`),
  KEY `idx_events_product_created` (`product_id`,`created_at`),
  KEY `idx_events_customer` (`customer_id`),
  KEY `idx_events_session` (`session_id`),
  KEY `idx_events_search` (`search_query`,`created_at`),
  CONSTRAINT `analytics_events_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `analytics_events_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `analytics_events_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `analytics_events_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `analytics_events_ibfk_5` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_customer_types`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_customer_types`;
CREATE TABLE IF NOT EXISTS `offer_customer_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `customer_type` enum('retail','wholesale') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_offer_cust_type` (`offer_id`,`customer_type`),
  CONSTRAINT `offer_customer_types_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 10 rows for `offer_customer_types`
INSERT INTO `offer_customer_types` (`id`, `offer_id`, `customer_type`, `created_at`) VALUES
(3, 17, 'retail', '2026-11-10 13:43:51'),
(4, 17, 'wholesale', '2026-11-10 13:43:51'),
(5, 18, 'retail', '2026-11-10 13:43:51'),
(6, 18, 'wholesale', '2026-11-10 13:43:51'),
(7, 19, 'retail', '2026-11-10 13:43:51'),
(8, 19, 'wholesale', '2026-11-10 13:43:51'),
(9, 20, 'retail', '2026-11-10 13:43:51'),
(10, 20, 'wholesale', '2026-11-10 13:43:51'),
(11, 21, 'retail', '2026-11-10 13:43:51'),
(12, 21, 'wholesale', '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_conditions`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_conditions`;
CREATE TABLE IF NOT EXISTS `offer_conditions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `condition_type` enum('min_quantity','exact_quantity','min_cart_value','min_items_count') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimum_value` decimal(12,2) NOT NULL DEFAULT '0.00',
  `maximum_value` decimal(12,2) DEFAULT NULL,
  `operator` enum('gte','eq','lte','between') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'gte',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_oc_offer` (`offer_id`),
  CONSTRAINT `offer_conditions_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_rewards`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_rewards`;
CREATE TABLE IF NOT EXISTS `offer_rewards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `reward_type` enum('discount','fixed_combo_price','special_unit_price','free_product') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'discount',
  `discount_type` enum('percentage','fixed_amount','override_price') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `discount_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `maximum_discount` decimal(10,2) DEFAULT NULL,
  `target_scope` enum('all_eligible','specific_products','cheapest_item','cart_subtotal') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all_eligible',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_or_offer` (`offer_id`),
  CONSTRAINT `offer_rewards_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 3 rows for `offer_rewards`
INSERT INTO `offer_rewards` (`id`, `offer_id`, `reward_type`, `discount_type`, `discount_value`, `maximum_discount`, `target_scope`, `created_at`) VALUES
(7, 18, 'discount', 'percentage', '15.00', '5000.00', 'all_eligible', '2026-11-10 13:43:51'),
(8, 19, 'discount', 'fixed_amount', '500.00', NULL, 'all_eligible', '2026-11-10 13:43:51'),
(9, 21, 'discount', 'fixed_amount', '1000.00', '1000.00', 'cart_subtotal', '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_products`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_products`;
CREATE TABLE IF NOT EXISTS `offer_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `required_quantity` int NOT NULL DEFAULT '1',
  `product_role` enum('trigger','reward','bundle_item','eligible') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'eligible',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`),
  KEY `idx_op_offer` (`offer_id`),
  KEY `idx_op_prod_variant` (`product_id`,`variant_id`),
  CONSTRAINT `offer_products_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_products_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 6 rows for `offer_products`
INSERT INTO `offer_products` (`id`, `offer_id`, `product_id`, `variant_id`, `required_quantity`, `product_role`, `created_at`) VALUES
(7, 17, 46, NULL, 1, 'eligible', '2026-11-10 13:43:51'),
(8, 18, 28, NULL, 3, 'eligible', '2026-11-10 13:43:51'),
(9, 18, 46, NULL, 2, 'eligible', '2026-11-10 13:43:51'),
(10, 19, 28, NULL, 1, 'bundle_item', '2026-11-10 13:43:51'),
(11, 19, 46, NULL, 1, 'bundle_item', '2026-11-10 13:43:51'),
(12, 19, 47, NULL, 1, 'bundle_item', '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_quantity_slabs`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_quantity_slabs`;
CREATE TABLE IF NOT EXISTS `offer_quantity_slabs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `customer_type` enum('retail','wholesale','all') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `minimum_quantity` int NOT NULL,
  `maximum_quantity` int DEFAULT NULL,
  `pricing_type` enum('special_unit_price','percentage_discount','fixed_discount') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'special_unit_price',
  `pricing_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_oqs_offer` (`offer_id`),
  CONSTRAINT `offer_quantity_slabs_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 3 rows for `offer_quantity_slabs`
INSERT INTO `offer_quantity_slabs` (`id`, `offer_id`, `customer_type`, `minimum_quantity`, `maximum_quantity`, `pricing_type`, `pricing_value`, `created_at`) VALUES
(11, 17, 'all', 5, 9, 'percentage_discount', '10.00', '2026-11-10 13:43:51'),
(12, 17, 'all', 10, 19, 'percentage_discount', '15.00', '2026-11-10 13:43:51'),
(13, 17, 'all', 20, NULL, 'percentage_discount', '20.00', '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `offer_recommendations`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `offer_recommendations`;
CREATE TABLE IF NOT EXISTS `offer_recommendations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `offer_id` int NOT NULL,
  `trigger_product_id` int NOT NULL,
  `trigger_variant_id` int DEFAULT NULL,
  `recommended_product_id` int NOT NULL,
  `recommended_variant_id` int DEFAULT NULL,
  `minimum_trigger_quantity` int NOT NULL DEFAULT '1',
  `discount_type` enum('percentage','fixed_amount','special_price') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `discount_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trigger_variant_id` (`trigger_variant_id`),
  KEY `recommended_product_id` (`recommended_product_id`),
  KEY `recommended_variant_id` (`recommended_variant_id`),
  KEY `idx_orec_offer` (`offer_id`),
  KEY `idx_orec_trigger` (`trigger_product_id`,`trigger_variant_id`),
  CONSTRAINT `offer_recommendations_ibfk_1` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_recommendations_ibfk_2` FOREIGN KEY (`trigger_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_recommendations_ibfk_3` FOREIGN KEY (`trigger_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_recommendations_ibfk_4` FOREIGN KEY (`recommended_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offer_recommendations_ibfk_5` FOREIGN KEY (`recommended_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping 1 rows for `offer_recommendations`
INSERT INTO `offer_recommendations` (`id`, `offer_id`, `trigger_product_id`, `trigger_variant_id`, `recommended_product_id`, `recommended_variant_id`, `minimum_trigger_quantity`, `discount_type`, `discount_value`, `display_order`, `created_at`) VALUES
(3, 20, 28, NULL, 47, NULL, 1, 'percentage', '25.00', 10, '2026-11-10 13:43:51');

-- ------------------------------------------------------------------------
-- Table structure & data for table: `applied_offer_records`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `applied_offer_records`;
CREATE TABLE IF NOT EXISTS `applied_offer_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `offer_id` int DEFAULT NULL,
  `offer_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `metadata_snapshot` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_aor_order` (`order_id`),
  KEY `idx_aor_offer` (`offer_id`),
  CONSTRAINT `applied_offer_records_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applied_offer_records_ibfk_2` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================================
-- FINAL COMMIT & RESTORE CONSTRAINTS
-- ========================================================================
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
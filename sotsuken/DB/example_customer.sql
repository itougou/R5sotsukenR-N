-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: example
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pass` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `kubun` int DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'テスト太郎',NULL,NULL,'東京都サンプル区1-1','080-0000-0000','2019-05-06','2019-05-01',NULL),(2,'伊藤　剛',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'松井　秀樹',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'田中　正博',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'大谷　宏樹',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'大谷　翔平',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'A.ロッド',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'安部　信三',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'ジョン・ボンジョビ',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'スティーブン・スピルバーグ',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'鈴木一郎',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'日本花子',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'日本花子',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'島根太郎',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'マイク・トラウト',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'佐藤が次郎',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'ヤマダ　太郎',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'野口五郎',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'デビッド伊藤',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'江川卓',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'伊藤　轟介',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-24 10:51:28

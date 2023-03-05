-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2023 at 10:01 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proddb`
--
CREATE DATABASE IF NOT EXISTS `proddb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proddb`;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `userID` text NOT NULL,
  `prodID` text NOT NULL,
  `quantity` text NOT NULL,
  `orderDate` text NOT NULL,
  `amount` text NOT NULL,
  `others` text NOT NULL,
  `prodName` text NOT NULL,
  `razOrderID` text DEFAULT NULL,
  `razPaymentID` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `userID`, `prodID`, `quantity`, `orderDate`, `amount`, `others`, `prodName`, `razOrderID`, `razPaymentID`) VALUES
(1, 'rajeshbtechit85@gmail.com', '5', '1', '2023-03-05', '10', 'paid', 'Prod3', NULL, NULL),
(2, 'rajeshbtechit85@gmail.com', '5', '1', '2023-03-05', '10', 'paid', 'Prod3', 'order_LNmRP6JzaKGBTU', 'pay_LNmRf3HdF9WZ8x'),
(3, 'rajeshbtechit85@gmail.com', '5', '1', '2023-03-05', '10', 'waiting', 'Prod3', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `prodID` int(11) NOT NULL,
  `prodName` text NOT NULL,
  `prodPrice` text NOT NULL,
  `prodDesc` text NOT NULL,
  `prodAvail` text NOT NULL,
  `prodQuantity` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prodID`, `prodName`, `prodPrice`, `prodDesc`, `prodAvail`, `prodQuantity`) VALUES
(3, 'Prod1', '10', 'Prod1', '', '15'),
(4, 'Prod2', '15', 'Prod2', '', '15'),
(5, 'Prod3', '10', 'Nill', '', '5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `id` text NOT NULL,
  `username` text NOT NULL,
  `emailid` text NOT NULL,
  `password` text NOT NULL,
  `created` text NOT NULL,
  `others1` text NOT NULL,
  `others2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `id`, `username`, `emailid`, `password`, `created`, `others1`, `others2`) VALUES
(1, '113362188719016515214', 'rajesh r', 'rajeshbtechit85@gmail.com', '', '2023-03-05 07:23:53.368', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prodID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prodID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

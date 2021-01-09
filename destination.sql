-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2021 at 05:16 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `destination`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `admin` int(10) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`admin`, `admin_email`, `password`) VALUES
(1, 'admin@gmail.com', '2238f75e04f3d7a7f6bd4c66446d8be9');

-- --------------------------------------------------------

--
-- Table structure for table `daily_expense`
--

CREATE TABLE `daily_expense` (
  `expense_id` int(10) NOT NULL,
  `expense_date` datetime NOT NULL DEFAULT current_timestamp(),
  `expense_description` text NOT NULL,
  `expense_credit` decimal(10,2) NOT NULL,
  `expense_receiver` varchar(255) NOT NULL,
  `expense_account` enum('cash','credit') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daily_expense`
--

INSERT INTO `daily_expense` (`expense_id`, `expense_date`, `expense_description`, `expense_credit`, `expense_receiver`, `expense_account`) VALUES
(1, '2021-01-06 12:44:00', 'to Dev', '7500.00', 'Dream Coder', 'credit'),
(3, '2021-01-06 16:36:46', 'picnic to life', '1.00', 'Prem Bikram Limbu', 'cash'),
(7, '2021-01-07 02:13:14', 'ertert', '545555.00', 'rthgfhgfhfghfg', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `daily_sales`
--

CREATE TABLE `daily_sales` (
  `sales_id` int(10) NOT NULL,
  `sales_date` datetime NOT NULL DEFAULT current_timestamp(),
  `sales_description` text NOT NULL,
  `sales_credit` decimal(10,2) NOT NULL,
  `sales_profit` decimal(10,2) NOT NULL,
  `sales_debited` enum('paid','pending') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table to daily sales record';

--
-- Dumping data for table `daily_sales`
--

INSERT INTO `daily_sales` (`sales_id`, `sales_date`, `sales_description`, `sales_credit`, `sales_profit`, `sales_debited`) VALUES
(3, '2021-01-03 08:34:28', 'Nepal to Singapore', '5000.00', '200.00', 'paid'),
(4, '2021-01-06 00:10:13', 'mom to pop', '5000.00', '200.00', 'pending'),
(5, '2021-01-06 00:36:13', 'dad to ma', '5000.00', '5000.00', 'paid'),
(6, '2021-01-06 23:21:34', 'lon', '5600.00', '600.00', 'pending'),
(7, '2021-01-06 23:24:45', 'interest recieved', '600.00', '600.00', 'paid'),
(20, '2021-01-07 01:41:53', 'gog', '789.00', '78.00', 'paid'),
(21, '2021-01-07 01:44:11', 'dog', '8098089.00', '890.00', 'paid'),
(22, '2021-01-07 01:51:38', 'prem', '1112.00', '22.00', 'paid'),
(24, '2021-01-07 02:07:39', 'ten ten', '1010.00', '10.00', 'paid');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`admin`);

--
-- Indexes for table `daily_expense`
--
ALTER TABLE `daily_expense`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `daily_sales`
--
ALTER TABLE `daily_sales`
  ADD PRIMARY KEY (`sales_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `admin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `daily_expense`
--
ALTER TABLE `daily_expense`
  MODIFY `expense_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `daily_sales`
--
ALTER TABLE `daily_sales`
  MODIFY `sales_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

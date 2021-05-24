SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `countdown`;
CREATE TABLE `countdown` (
  `id` int(250) NOT NULL AUTO_INCREMENT,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `alarm` tinyint(1) NOT NULL DEFAULT '0',
  `ranout` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

INSERT INTO `countdown` (`id`, `start`, `end`, `alarm`, `ranout`) VALUES
(1,	'2021-05-24 09:02:52',	'2021-05-24 10:50:52',	0,	0);

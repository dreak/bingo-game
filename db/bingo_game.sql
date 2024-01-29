SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for game_participant
-- ----------------------------
DROP TABLE IF EXISTS `game_participant`;
CREATE TABLE `game_participant` (
  `game_participant_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_room_id` int unsigned NOT NULL,
  `user_identifier` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `betting_number` json DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_participant_id`) USING BTREE,
  UNIQUE KEY `uq_game_participant_user_identifier` (`user_identifier`) USING BTREE,
  UNIQUE KEY `uq_game_participant_game_room_id_user_name` (`game_room_id`,`user_name`) USING BTREE,
  CONSTRAINT `fk_game_participant_game_room` FOREIGN KEY (`game_room_id`) REFERENCES `game_room` (`game_room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for game_room
-- ----------------------------
DROP TABLE IF EXISTS `game_room`;
CREATE TABLE `game_room` (
  `game_room_id` int unsigned NOT NULL AUTO_INCREMENT,
  `room_identifier` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `master_code` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `game_size` tinyint unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_room_id`) USING BTREE,
  UNIQUE KEY `uq_game_room_room_identifier` (`room_identifier`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for game_winning_number
-- ----------------------------
DROP TABLE IF EXISTS `game_winning_number`;
CREATE TABLE `game_winning_number` (
  `game_winning_number_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_room_id` int unsigned NOT NULL,
  `winning_number` tinyint unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_winning_number_id`) USING BTREE,
  UNIQUE KEY `uq_game_winning_number_game_room_id_winning_number` (`game_room_id`,`winning_number`) USING BTREE,
  CONSTRAINT `fk_game_winning_number_game_room` FOREIGN KEY (`game_room_id`) REFERENCES `game_room` (`game_room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=805 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

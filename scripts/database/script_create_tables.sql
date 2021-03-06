-- MySQL Script generated by MySQL Workbench
-- Sat Mar  2 12:02:16 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pt_leal_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pt_leal_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pt_leal_db` DEFAULT CHARACTER SET utf8 ;
USE `pt_leal_db` ;

-- -----------------------------------------------------
-- Table `pt_leal_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pt_leal_db`.`users` (
  `user_id` VARCHAR(32) NOT NULL,
  `created_date` DATETIME NOT NULL DEFAULT now(),
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `birth_date` DATETIME NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `pt_leal_db`.`users` (`user_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `pt_leal_db`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pt_leal_db`.`transactions` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NOT NULL DEFAULT now(),
  `value` FLOAT NOT NULL DEFAULT 0,
  `points` INT NOT NULL DEFAULT 1,
  `status` INT NOT NULL DEFAULT 0,
  `fk_user_id` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `pt_leal_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `pt_leal_db`.`transactions` (`transaction_id` ASC) VISIBLE;

CREATE INDEX `fk_user_id_idx` ON `pt_leal_db`.`transactions` (`fk_user_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

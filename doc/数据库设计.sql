SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `hook`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `hook_user`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `hook` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `order` VARCHAR(500) NOT NULL,
    `create_time` BIGINT,
    `update_time` BIGINT,
    `last_call_time` BIGINT,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `hook_user` (
    `id` INTEGER NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `hook_id` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `hook_user` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);
ALTER TABLE `hook_user` ADD FOREIGN KEY (`hook_id`) REFERENCES `hook`(`id`);
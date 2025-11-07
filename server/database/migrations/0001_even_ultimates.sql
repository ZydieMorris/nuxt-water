CREATE TABLE `register` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `register_id` PRIMARY KEY(`id`)
);

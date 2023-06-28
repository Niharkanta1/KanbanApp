-- PUBLIC.BOARD definition

-- Drop table

-- DROP TABLE PUBLIC.BOARD;

CREATE TABLE PUBLIC.BOARD (
	ID BIGINT NOT NULL,
	DATE_CREATED TIMESTAMP,
	DATE_MODIFIED TIMESTAMP,
	USER_CREATED VARCHAR(255),
	USER_MODIFIED VARCHAR(255),
	DESCRIPTION VARCHAR(255),
	IS_FAVORITE BOOLEAN,
	NAME VARCHAR(50) NOT NULL,
	WORKSPACE_ID BIGINT,
	CONSTRAINT CONSTRAINT_3 PRIMARY KEY (ID)
);
CREATE INDEX FKH8R4RYXRNG25R7KO3YH5EAUDU_INDEX_3 ON PUBLIC.BOARD (WORKSPACE_ID);
CREATE UNIQUE INDEX PRIMARY_KEY_3 ON PUBLIC.BOARD (ID);


-- PUBLIC.CARD definition

-- Drop table

-- DROP TABLE PUBLIC.CARD;

CREATE TABLE PUBLIC.CARD (
	ID BIGINT NOT NULL,
	DATE_CREATED TIMESTAMP,
	DATE_MODIFIED TIMESTAMP,
	USER_CREATED VARCHAR(255),
	USER_MODIFIED VARCHAR(255),
	CATEGORY VARCHAR(255),
	DESCRIPTION VARCHAR(255),
	END_DATE TIMESTAMP,
	IS_ARCHIVED BOOLEAN,
	IS_WATCHING BOOLEAN,
	NAME VARCHAR(50) NOT NULL,
	REMINDER_DATE TIMESTAMP,
	START_DATE TIMESTAMP,
	STAGE_LIST_ID BIGINT,
	CONSTRAINT CONSTRAINT_1 PRIMARY KEY (ID)
);
CREATE INDEX FKASVX4B87T3IO36AQGSTJCQNHA_INDEX_1 ON PUBLIC.CARD (STAGE_LIST_ID);
CREATE UNIQUE INDEX PRIMARY_KEY_1 ON PUBLIC.CARD (ID);


-- PUBLIC.KB_AUTHORITY definition

-- Drop table

-- DROP TABLE PUBLIC.KB_AUTHORITY;

CREATE TABLE PUBLIC.KB_AUTHORITY (
	NAME VARCHAR(50) NOT NULL,
	CONSTRAINT CONSTRAINT_4 PRIMARY KEY (NAME)
);
CREATE UNIQUE INDEX PRIMARY_KEY_4 ON PUBLIC.KB_AUTHORITY (NAME);

-- PUBLIC.CARD foreign keys

ALTER TABLE PUBLIC.CARD ADD CONSTRAINT FKASVX4B87T3IO36AQGSTJCQNHA FOREIGN KEY (STAGE_LIST_ID) REFERENCES PUBLIC.STAGE_LIST(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- PUBLIC.KB_USER definition

-- Drop table

-- DROP TABLE PUBLIC.KB_USER;

CREATE TABLE PUBLIC.KB_USER (
	ID BIGINT NOT NULL,
	ACTIVE BOOLEAN NOT NULL,
	ACTIVATION_KEY VARCHAR(20),
	EMAIL VARCHAR(254) NOT NULL,
	FIRST_NAME VARCHAR(255) NOT NULL,
	IMAGE_URL VARCHAR(256),
	JOIN_DATE TIMESTAMP NOT NULL,
	LANG_KEY VARCHAR(10),
	LAST_NAME VARCHAR(255),
	PASSWORD_HASH VARCHAR(255) NOT NULL,
	PHONE_NUMBER VARCHAR(255),
	RESET_DATE TIMESTAMP,
	RESET_KEY VARCHAR(20),
	TITLE VARCHAR(255),
	USER_NAME VARCHAR(50) NOT NULL,
	CONSTRAINT CONSTRAINT_F PRIMARY KEY (ID),
	CONSTRAINT UK_8WWVYVN8L3MIE40YGWHK0UM8N UNIQUE (USER_NAME),
	CONSTRAINT UK_JXFMMW0PMKAFL8UJ3HWSQ8G0 UNIQUE (EMAIL)
);
CREATE UNIQUE INDEX PRIMARY_KEY_F ON PUBLIC.KB_USER (ID);
CREATE UNIQUE INDEX UK_8WWVYVN8L3MIE40YGWHK0UM8N_INDEX_F ON PUBLIC.KB_USER (USER_NAME);
CREATE UNIQUE INDEX UK_JXFMMW0PMKAFL8UJ3HWSQ8G0_INDEX_F ON PUBLIC.KB_USER (EMAIL);


-- PUBLIC.KB_USER_AUTHORITY definition

-- Drop table

-- DROP TABLE PUBLIC.KB_USER_AUTHORITY;

CREATE TABLE PUBLIC.KB_USER_AUTHORITY (
	USER_ID BIGINT NOT NULL,
	AUTHORITY_NAME VARCHAR(50) NOT NULL,
	CONSTRAINT CONSTRAINT_D PRIMARY KEY (USER_ID,AUTHORITY_NAME)
);
CREATE INDEX FKIS17KVGDVWH14FGQC77B8PG8R_INDEX_D ON PUBLIC.KB_USER_AUTHORITY (USER_ID);
CREATE INDEX FKRLNC55SX2YDQ92B9NNLA12HAP_INDEX_D ON PUBLIC.KB_USER_AUTHORITY (AUTHORITY_NAME);
CREATE UNIQUE INDEX PRIMARY_KEY_D ON PUBLIC.KB_USER_AUTHORITY (USER_ID,AUTHORITY_NAME);


-- PUBLIC.KB_USER_AUTHORITY foreign keys

ALTER TABLE PUBLIC.KB_USER_AUTHORITY ADD CONSTRAINT FKIS17KVGDVWH14FGQC77B8PG8R FOREIGN KEY (USER_ID) REFERENCES PUBLIC.KB_USER(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE PUBLIC.KB_USER_AUTHORITY ADD CONSTRAINT FKRLNC55SX2YDQ92B9NNLA12HAP FOREIGN KEY (AUTHORITY_NAME) REFERENCES PUBLIC.KB_AUTHORITY(NAME) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- PUBLIC.REL_CARD_USER definition

-- Drop table

-- DROP TABLE PUBLIC.REL_CARD_USER;

CREATE TABLE PUBLIC.REL_CARD_USER (
	CARD_ID BIGINT NOT NULL,
	MEMBER_ID BIGINT NOT NULL,
	CONSTRAINT CONSTRAINT_E PRIMARY KEY (CARD_ID,MEMBER_ID)
);
CREATE INDEX FK2FKQOKN0J1O643PB4XTD3DLTW_INDEX_E ON PUBLIC.REL_CARD_USER (MEMBER_ID);
CREATE INDEX FKA5S2VUKJWG1664M7Q5YL8DXH6_INDEX_E ON PUBLIC.REL_CARD_USER (CARD_ID);
CREATE UNIQUE INDEX PRIMARY_KEY_E ON PUBLIC.REL_CARD_USER (CARD_ID,MEMBER_ID);


-- PUBLIC.REL_CARD_USER foreign keys

ALTER TABLE PUBLIC.REL_CARD_USER ADD CONSTRAINT FK2FKQOKN0J1O643PB4XTD3DLTW FOREIGN KEY (MEMBER_ID) REFERENCES PUBLIC.KB_USER(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE PUBLIC.REL_CARD_USER ADD CONSTRAINT FKA5S2VUKJWG1664M7Q5YL8DXH6 FOREIGN KEY (CARD_ID) REFERENCES PUBLIC.CARD(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- PUBLIC.STAGE_LIST definition

-- Drop table

-- DROP TABLE PUBLIC.STAGE_LIST;

CREATE TABLE PUBLIC.STAGE_LIST (
	ID BIGINT NOT NULL,
	DATE_CREATED TIMESTAMP,
	DATE_MODIFIED TIMESTAMP,
	USER_CREATED VARCHAR(255),
	USER_MODIFIED VARCHAR(255),
	DESCRIPTION VARCHAR(255),
	IS_WATCHING BOOLEAN,
	NAME VARCHAR(50) NOT NULL,
	BOARD_ID BIGINT,
	CONSTRAINT CONSTRAINT_6 PRIMARY KEY (ID)
);
CREATE INDEX FKRPGXQB7CRB8OFRM6LLSVAYD7Q_INDEX_6 ON PUBLIC.STAGE_LIST (BOARD_ID);
CREATE UNIQUE INDEX PRIMARY_KEY_6 ON PUBLIC.STAGE_LIST (ID);


-- PUBLIC.STAGE_LIST foreign keys

ALTER TABLE PUBLIC.STAGE_LIST ADD CONSTRAINT FKRPGXQB7CRB8OFRM6LLSVAYD7Q FOREIGN KEY (BOARD_ID) REFERENCES PUBLIC.BOARD(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- PUBLIC.WORKSPACE definition

-- Drop table

-- DROP TABLE PUBLIC.WORKSPACE;

CREATE TABLE PUBLIC.WORKSPACE (
	ID BIGINT NOT NULL,
	DATE_CREATED TIMESTAMP,
	DATE_MODIFIED TIMESTAMP,
	USER_CREATED VARCHAR(255),
	USER_MODIFIED VARCHAR(255),
	CATEGORY VARCHAR(255),
	DESCRIPTION VARCHAR(255),
	NAME VARCHAR(50) NOT NULL,
	SHORT_NAME VARCHAR(255),
	WEBSITE VARCHAR(255),
	USER_ID BIGINT,
	"DEFAULT" BOOLEAN,
	CONSTRAINT CONSTRAINT_E8 PRIMARY KEY (ID)
);
CREATE INDEX FKHCD56QHUHDKJ0YEK6JOV8VIXR_INDEX_E ON PUBLIC.WORKSPACE (USER_ID);
CREATE UNIQUE INDEX PRIMARY_KEY_E3 ON PUBLIC.WORKSPACE (ID);


-- PUBLIC.WORKSPACE foreign keys

ALTER TABLE PUBLIC.WORKSPACE ADD CONSTRAINT FKHCD56QHUHDKJ0YEK6JOV8VIXR FOREIGN KEY (USER_ID) REFERENCES PUBLIC.KB_USER(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;


INSERT INTO PUBLIC.BOARD (ID,DATE_CREATED,DATE_MODIFIED,USER_CREATED,USER_MODIFIED,DESCRIPTION,IS_FAVORITE,NAME,WORKSPACE_ID) VALUES
	 (1,'2022-03-01 23:06:16.087',NULL,'system',NULL,'A sample board.',NULL,'Default Board',1),
	 (1552,'2022-03-01 23:48:42.619',NULL,'system',NULL,'A sample board.',NULL,'Default Board',1552),
	 (3152,'2022-03-02 14:18:58.082',NULL,'system',NULL,'A sample board.',NULL,'Default Board',3152),
	 (4752,'2022-03-12 00:26:00.495',NULL,'user3',NULL,'',NULL,'Sample board 2',3152),
	 (6352,'2022-04-10 12:43:39.116',NULL,'user3',NULL,'',NULL,'Sample Board 3',3152),
	 (6353,'2022-04-10 12:44:35.93',NULL,'user3',NULL,'',NULL,'Sample Board 4',3152),
	 (6354,'2022-04-10 12:53:25.287',NULL,'user3',NULL,'',NULL,'Sample Board 5',3152),
	 (7952,'2023-06-12 00:00:01.646',NULL,'system',NULL,'A sample board.',NULL,'Default Board',4752),
	 (9552,'2023-06-21 00:46:58.46',NULL,'system',NULL,'A sample board.',NULL,'Default Board',6352);

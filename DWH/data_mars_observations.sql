DROP DATABASE IF EXISTS data_mars_observations;
CREATE DATABASE data_mars_observations;

USE data_mars_observations;

DROP TABLE IF EXISTS dim_time;
CREATE TABLE dim_time (
        id                      INTEGER PRIMARY KEY,  -- year*10000+month*100+day
        db_date                 DATE NOT NULL,
        year                    INTEGER NOT NULL,
        month                   INTEGER NOT NULL, -- 1 to 12
        day                     INTEGER NOT NULL, -- 1 to 31
        quarter                 INTEGER NOT NULL, -- 1 to 4
        week                    INTEGER NOT NULL, -- 1 to 52/53
        day_name                VARCHAR(9) NOT NULL, -- 'Monday', 'Tuesday'...
        month_name              VARCHAR(9) NOT NULL, -- 'January', 'February'...
        holiday_flag            CHAR(1) DEFAULT 'f' CHECK (holiday_flag in ('t', 'f')),
        weekend_flag            CHAR(1) DEFAULT 'f' CHECK (weekday_flag in ('t', 'f')),
        UNIQUE td_ymd_idx (year,month,day),
        UNIQUE td_dbdate_idx (db_date)

) Engine=MyISAM;


DROP PROCEDURE IF EXISTS fill_date_dimension;
DELIMITER //
CREATE PROCEDURE fill_date_dimension(IN startdate DATE,IN stopdate DATE)
BEGIN
    DECLARE currentdate DATE;
    SET currentdate = startdate;
    WHILE currentdate <= stopdate DO
        INSERT INTO dim_time VALUES (
            YEAR(currentdate)*10000+MONTH(currentdate)*100 + DAY(currentdate),
            currentdate,
            YEAR(currentdate),
            MONTH(currentdate),
            DAY(currentdate),
            QUARTER(currentdate),
            WEEKOFYEAR(currentdate),
            DATE_FORMAT(currentdate,'%W'),
            DATE_FORMAT(currentdate,'%M'),
            'f',
            CASE DAYOFWEEK(currentdate) WHEN 1 THEN 't' WHEN 7 then 't' ELSE 'f' END
            );
        SET currentdate = ADDDATE(currentdate,INTERVAL 1 DAY);
    END WHILE;
END
//
DELIMITER ;

TRUNCATE TABLE dim_time;
CALL fill_date_dimension('2017-01-01','2027-01-01');
OPTIMIZE TABLE dim_time;


DROP TABLE IF EXISTS dim_geo;
CREATE TABLE dim_geo(
    id INTEGER PRIMARY KEY,
    country_name VARCHAR(50),
    country_id INTEGER,
    state_name VARCHAR(50),
    state_id INTEGER,
    municipality_name VARCHAR(50),
    municipality_id INTEGER,
    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

LOAD DATA LOCAL INFILE './dim_geo.csv'
INTO TABLE dim_geo
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

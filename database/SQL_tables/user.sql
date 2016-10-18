drop table if exists user;

create table user (
    id int primary key auto_increment,
    username char(20) not null,
    password varchar(150) not null,
    email varchar(100) not null,
    admin tinyint(1) not null,
    registered tinyint(1) not null,
    CONSTRAINT uc_username UNIQUE (username)
);

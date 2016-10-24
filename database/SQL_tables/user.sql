drop table if exists users;

create table users (
    id int primary key auto_increment,
    username char(20) not null,
    password varchar(150) not null,
    email varchar(100) not null,
    admin boolean not null,
    CONSTRAINT uc_username UNIQUE (username)
);

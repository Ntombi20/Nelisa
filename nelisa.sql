CREATE DATABASE nelisa_spaza_app;
CREATE USER ntombi@localhost IDENTIFIED BY 'nicolenma20';
GRANT ALL PRIVILEGES ON nelisa_spaza_app.* TO ntombi@localhost;
FLUSH PRIVILEGES;

drop table if exists products;
drop table if exists categories;

create table categories(
    id int primary key auto_increment,
    description char(100) not null,
    CONSTRAINT uc_description UNIQUE (description)
);

create table products (
    id int primary key auto_increment,
    description char(100) not null,
    category_id int,
    foreign key (category_id) references categories(id),
    CONSTRAINT uc_description UNIQUE (description)
);

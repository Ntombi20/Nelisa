drop table if exists products;

create table products (
    id int primary key auto_increment,
    product char(100) not null,
    category_id int,
    foreign key (category_id) references categories(id),
    CONSTRAINT uc_product UNIQUE (product)
);

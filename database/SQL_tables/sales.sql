drop table if exists sales;

create table sales (
    id int primary key auto_increment,
    date char(50) not null,
    quantity decimal(10),
    price decimal(10,2),
    products_id int,
    foreign key (products_id) references products(id),
    CONSTRAINT uc_id UNIQUE (id)
);

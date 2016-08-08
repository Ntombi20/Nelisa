drop table if exists sales;

create table sales (
    id int primary key auto_increment,
    quantity decimal(10),
    price decimal(10,2),
    date char(50) not null,
    products_id int,
    foreign key (products_id) references products(id)
);

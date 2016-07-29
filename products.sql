-- drop table if exists 'products';

create table products (
    id int primary key auto_increment,
        description char(100) not null,
    price decimal(10,2),
    category_id int,
    foreign key (category_id) references categories(id)
);

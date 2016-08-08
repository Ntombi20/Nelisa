drop table if exists purchases;

create table purchases (
  id int primary key auto_increment,
  products_id int,
  foreign key (products_id) references products(id),
  quantity decimal(10),
  price decimal(10,2),
  date char(50) not null
);

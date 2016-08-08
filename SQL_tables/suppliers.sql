drop table if exists suppliers;

create table suppliers (
  id int primary key auto_increment,
  shop char(100) not null,
  purchases_id int,
  foreign key (purchases_id) references purchases(id)
);

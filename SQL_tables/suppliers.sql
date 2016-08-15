drop table if exists suppliers;

create table suppliers (
  id int primary key auto_increment,
  shop char(100) not null,
  CONSTRAINT uc_id UNIQUE (id)
);

drop table if exists purchases;

create table purchases (
  id int primary key auto_increment,
  products_id int,
  foreign key (products_id) references products(id),
  suppliers_id int,
  quantity decimal(10),
  price decimal(10,2),
  date char(50) not null,
  CONSTRAINT uc_id UNIQUE (id)
);

ALTER TABLE purchases ADD CONSTRAINT fk_suppliers_id FOREIGN KEY (suppliers_id) REFERENCES suppliers(id);

SELECT purchases.id as purchases_id, products.product, suppliers.shop, purchases.quantity, purchases.price, purchases.date
FROM products inner join purchases on purchases.products_id = products.id AND FROM suppliers inner join purchases on
 purchases.suppliers_id = suppliers.id

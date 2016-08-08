drop table if exists categories;

create table categories(
    id int primary key auto_increment,
    categoryName char(100) not null,
    CONSTRAINT uc_categoryName UNIQUE (categoryName)
);

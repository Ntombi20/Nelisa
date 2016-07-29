drop table if exists 'categories';

create table categories(
    id int primary key auto_increment,
    description char(100) not null
);

INSERT INTO categories (description) VALUE ("Diary");
INSERT INTO categories (description) VALUE ("Bakery");
INSERT INTO categories (description) VALUE ("Canned food");
INSERT INTO categories (description) VALUE ("Bevarage");
INSERT INTO categories (description) VALUE ("Grain product");
INSERT INTO categories (description) VALUE ("Household");
INSERT INTO categories (description) VALUE ("Fruit");
INSERT INTO categories (description) VALUE ("Snacks");
INSERT INTO categories (description) VALUE ("Gift");

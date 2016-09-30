CREATE DATABASE nelisa_spaza;
CREATE USER ntombi@localhost IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON nelisa_spaza.* TO ntombi@localhost;
FLUSH PRIVILEGES;

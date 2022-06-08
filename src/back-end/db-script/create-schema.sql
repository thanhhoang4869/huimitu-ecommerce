CREATE TABLE "user" (
  "email" varchar PRIMARY KEY,
  "phone" varchar UNIQUE,
  "fullname" varchar,
  "address" varchar,
  "birthday" date,
  "gender" varchar,
  "avatar" varchar
);

CREATE TABLE "shipping_address" (
  "id" int PRIMARY KEY,
  "email" varchar,
  "shipping_address" varchar,
  "receiver_phone" varchar,
  "receiver_name" varchar
);

CREATE TABLE "category" (
  "id" int PRIMARY KEY,
  "parent_id" int,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "payment" (
  "id" int PRIMARY KEY,
  "provider" varchar
);

CREATE TABLE "product" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "category_id" int
);

CREATE TABLE "product_image" (
  "id" int PRIMARY KEY,
  "product_id" int,
  "path" varchar,
  "is_primary" boolean
);

CREATE TABLE "inventory" (
  "id" int PRIMARY KEY,
  "location" varchar
);

CREATE TABLE "product_inventory" (
  "product_id" int,
  "inventory_id" int,
  "stock" int,
  PRIMARY KEY ("product_id", "inventory_id")
);

CREATE TABLE "option" (
  "id" int PRIMARY KEY,
  "product_id" int,
  "name" varchar
);

CREATE TABLE "option_choice" (
  "id" int PRIMARY KEY,
  "option_id" int,
  "choice_name" varchar
);

CREATE TABLE "variant" (
  "id" int PRIMARY KEY,
  "product_id" int,
  "price" int,
  "discount_price" int
);

CREATE TABLE "variant_option" (
  "variant_id" int,
  "option_id" int,
  "choice_id" int,
  PRIMARY KEY ("variant_id", "option_id")
);

CREATE TABLE "order" (
  "id" int PRIMARY KEY,
  "email" varchar,
  "created_time" timestamp,
  "payment_id" int,
  "shipping_address_id" int
);

CREATE TABLE "order_product" (
  "order_id" int,
  "product_id" int,
  "quantity" int,
  PRIMARY KEY ("order_id", "product_id")
);

CREATE TABLE "cart" (
  "id" int PRIMARY KEY,
  "email" varchar
);

CREATE TABLE "cart_product" (
  "cart_id" int,
  "product_id" int,
  "quantity" int,
  PRIMARY KEY ("cart_id", "product_id")
);

CREATE TABLE "review" (
  "product_id" int,
  "order_id" int,
  "rating" int,
  "comment" varchar
);

ALTER TABLE "shipping_address" ADD FOREIGN KEY ("email") REFERENCES "user" ("email");

ALTER TABLE "category" ADD FOREIGN KEY ("parent_id") REFERENCES "category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "product_image" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_inventory" ADD FOREIGN KEY ("product_id") REFERENCES "variant" ("id");

ALTER TABLE "product_inventory" ADD FOREIGN KEY ("inventory_id") REFERENCES "inventory" ("id");

ALTER TABLE "option_choice" ADD FOREIGN KEY ("option_id") REFERENCES "option" ("id");

ALTER TABLE "variant" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("variant_id") REFERENCES "variant" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("option_id") REFERENCES "option" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("choice_id") REFERENCES "option_choice" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_address" ("id");

ALTER TABLE "order_product" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_product" ADD FOREIGN KEY ("product_id") REFERENCES "variant" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("email") REFERENCES "user" ("email");

ALTER TABLE "cart_product" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "cart_product" ADD FOREIGN KEY ("product_id") REFERENCES "variant" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

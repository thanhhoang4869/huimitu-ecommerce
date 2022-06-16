CREATE TABLE "account" (
  "email" varchar PRIMARY KEY,
  "password" char(256),
  "phone" varchar UNIQUE,
  "fullname" varchar,
  "address" varchar,
  "birthday" date,
  "gender" varchar,
  "avatar" varchar
);

CREATE TABLE "shipping_address" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar,
  "shipping_address" varchar,
  "receiver_phone" varchar,
  "receiver_name" varchar
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "parent_id" int,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "payment" (
  "id" SERIAL PRIMARY KEY,
  "provider" varchar
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "category_id" int,
  "description" varchar,
  "avg_rating" float,
  "count_rating" int
);

CREATE TABLE "product_image" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "path" varchar,
  "is_primary" boolean
);

CREATE TABLE "option" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "name" varchar
);

CREATE TABLE "option_choice" (
  "id" SERIAL PRIMARY KEY,
  "option_id" int,
  "choice_name" varchar
);

CREATE TABLE "variant" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "price" bigint,
  "discount_price" bigint,
  "stock" int
);

CREATE TABLE "variant_option" (
  "variant_id" int,
  "option_id" int,
  "choice_id" int,
  PRIMARY KEY ("option_id", "variant_id")
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar,
  "created_time" timestamp,
  "payment_id" int,
  "shipping_address_id" int,
  "total" bigint,
  "shipping_provider_id" int,
  "shipping_price" int,
  "voucher_id" int
);

CREATE TABLE "order_variant" (
  "order_id" int,
  "variant_id" int,
  "quantity" int,
  "variant_price" bigint,
  PRIMARY KEY ("order_id", "variant_id")
);

CREATE TABLE "cart" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar
);

CREATE TABLE "cart_variant" (
  "cart_id" int,
  "variant_id" int,
  "quantity" int,
  PRIMARY KEY ("cart_id", "variant_id")
);

CREATE TABLE "review" (
  "product_id" int,
  "order_id" int,
  "rating" int,
  "comment" varchar,
  PRIMARY KEY ("product_id", "order_id")
);

CREATE TABLE "shipping_provider" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "phone" varchar UNIQUE
);

CREATE TABLE "order_state" (
  "order_id" int,
  "state" varchar,
  "created_time" timestamp,
  PRIMARY KEY ("order_id", "state")
);

CREATE TABLE "voucher" (
  "id" SERIAL PRIMARY KEY,
  "discount" bigint,
  "minimum_price" bigint,
  "start_date" timestamp,
  "end_date" timestamp
);

ALTER TABLE "shipping_address" ADD FOREIGN KEY ("email") REFERENCES "account" ("email");

ALTER TABLE "order" ADD FOREIGN KEY ("email") REFERENCES "account" ("email");

ALTER TABLE "cart" ADD FOREIGN KEY ("email") REFERENCES "account" ("email");

ALTER TABLE "category" ADD FOREIGN KEY ("parent_id") REFERENCES "category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "product_image" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "variant" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "option_choice" ADD FOREIGN KEY ("id") REFERENCES "option" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("option_id") REFERENCES "option" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("choice_id") REFERENCES "option_choice" ("id");

ALTER TABLE "variant_option" ADD FOREIGN KEY ("variant_id") REFERENCES "variant" ("id");

ALTER TABLE "order_variant" ADD FOREIGN KEY ("variant_id") REFERENCES "variant" ("id");

ALTER TABLE "cart_variant" ADD FOREIGN KEY ("variant_id") REFERENCES "variant" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_address" ("id");

ALTER TABLE "order_variant" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_state" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "cart_variant" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shipping_provider_id") REFERENCES "shipping_provider" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("voucher_id") REFERENCES "voucher" ("id");

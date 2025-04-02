CREATE TABLE schema_nodejs.users (
	user_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(256),
	email VARCHAR(256) UNIQUE NOT NULL
);
CREATE TABLE schema_nodejs.posts (
	post_id SERIAL PRIMARY KEY NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	title VARCHAR(256) NOT NULL,
	content TEXT,
	author_id INTEGER REFERENCES schema_nodejs.users(user_id)
);
CREATE TABLE schema_nodejs.profiles (
	profile_id SERIAL PRIMARY KEY NOT NULL,
	bio TEXT,
	user_id INTEGER NOT NULL UNIQUE REFERENCES schema_nodejs.users(user_id)
);
CREATE TABLE schema_nodejs.categories (
	category_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(256)
);
CREATE TABLE post_in_categories (
	post_id INTEGER NOT NULL REFERENCES schema_nodejs.posts(post_id),
	category_id INTEGER NOT NULL REFERENCES schema_nodejs.categories(category_id)
);
CREATE UNIQUE INDEX post_id_category_id_unique ON post_in_categories(post_id int4_ops,category_id int4_ops);
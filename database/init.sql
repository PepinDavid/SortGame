create database if not exists waste_game;
use waste_game;

create table if not exists users  {
    id serial primary key,
    email varchar not null,
    username varchar not null,
    password varchar not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    modified_at timestamp default CURRENT_TIMESTAMP
};

create table if not exists auth_token {
    id serial primary key,
    created_at timestamp default CURRENT_TIMESTAMP,
    user_id integer foreign key 
}

create table if no exists maps {
    id serial primary key,
};

create table if not exists players {
    id serial primary key,
};

create table if not exists npcs {
    id serial primary key,
};

create table if not exists items {
    id serial primary key,
};

create table if not exists npcs {
    id serial primary key,
};

create table if not exists obstacles {
    id serial primary key,
};

create table if not exists games {
    id serial primary key,
};


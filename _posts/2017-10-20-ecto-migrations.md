---
layout: post
title: "Intro to Ecto"
categories: journal
tags: elixir
image:
  feature: liquid-text.jpg
  teaser: liquid-text-teaser.jpg
  credit: Death to Stock Photo
  creditlink: ""
---

Ecto is the specific component for interacting with databases in the Elixir language. It supports mosts used database systems, the default being PostgreSQL, but Oracle, MySQL, SQLite, and MongoDB are also available. I recently started to work on Elixir for some project and here's a short syntax sum-up for using Ecto in your web apps.

```bash
# Auto create models
mix phx.gen.model Account accounts user_id:integer first_name:string last_name:string

mix ecto.gen.migration create_table
  creating priv/repo/migrations/20171020086542_create_table.exs

# Apply migration
mix ecto.migrate

# Rollback last migration
mix ecto.rollback
```

And here's the Ecto syntax for managing data structures (DDL only).

```elixir
# Creating a table
create table(:users) do
  add :first_name, :string
  add :last_name, :string, size: 40
  add :username, :string, default: "Default"
  add :creation_date, :string, default: fragment("now()")
  add :ref_if, :string, null: false
  add :description, :text
  add :age, :integer
  add :eur_price, :float
  add :btc_price, :float, precision: 10, scale: 2
  add :last_conn, :datetime
  add :group_id, references(:groups)
  add :object, :json

  timestamps  # inserted_at and updated_at
end

create_if_not_exists table(:users) do: ... end

# Altering a table
alter table(:users) do
  add :intro, :text
  modify :username, :text
  remove :age
end

rename table(:users), :intro, to: :introduction
rename table(:users), to: table(:accounts)

# Dropping a table
drop table(:users)
drop_if_exists table(:users)

# Execute arbitrary SQL statements
execute "UPDATE users SET username = 'Def'"
execute create: "users", capped: true, size: 1024

# Create Indexes
create index(:users, [:first_name, :last_name], concurrently: true)
create unique_index(:users, [:username])
drop index(:users, [:first_name])
```

# Online Food Store — CRUD App

An Express + EJS + SQLite app for managing a food store: menu items,
delivery locations, and orders — each with full add/edit/delete support.

## Structure
```
food-store-crud/
├── app.js
├── config/db.js                    # SQLite connection + all 3 tables
├── model/
│   ├── foodModel.js
│   ├── locationModel.js
│   └── orderModel.js
├── controller/
│   ├── foodController.js
│   ├── locationController.js
│   └── orderController.js
├── routes/
│   ├── foodRoute.js
│   ├── locationRoute.js
│   └── orderRoute.js
├── views/
│   ├── index.ejs / add.ejs / edit.ejs        (foods)
│   ├── locations/index.ejs / add.ejs / edit.ejs
│   └── orders/index.ejs / add.ejs / edit.ejs
├── public/style.css
├── schema.sql
└── package.json
```

## Setup
```bash
npm install
npm start
```
Then open http://localhost:3000

The SQLite database file (`foodstore.db`) is created automatically on first
run, with foreign keys enabled (`PRAGMA foreign_keys = ON`).

## Database schema

**foods** — the menu
| Column | Type |
|---|---|
| id | INTEGER PK |
| food_name | TEXT |
| food_type | TEXT |
| price | REAL |
| created_at | DATETIME |

**delivery_locations** — where each food item can be delivered, linked to `foods`
| Column | Type |
|---|---|
| id | INTEGER PK |
| food_id | INTEGER → foods(id) |
| location_name | TEXT |
| address | TEXT |
| delivery_fee | REAL |
| created_at | DATETIME |

**orders** — actual customer orders, linked to both `foods` and `delivery_locations`
| Column | Type |
|---|---|
| id | INTEGER PK |
| food_id | INTEGER → foods(id) |
| location_id | INTEGER → delivery_locations(id) |
| customer_name | TEXT |
| quantity | INTEGER |
| status | TEXT (Pending / Preparing / Delivering / Delivered / Cancelled) |
| created_at | DATETIME |

Deleting a food or location cascades and removes any dependent rows
(`ON DELETE CASCADE`), so removing a food also removes its delivery
locations and any orders tied to it.

## Routes

| Method | Path | Action |
|---|---|---|
| GET | / | List foods |
| GET | /add | Add-food form |
| POST | /add | Create food |
| GET | /edit/:id | Edit-food form |
| PUT | /edit/:id | Update food |
| DELETE | /delete/:id | Delete food |
| GET | /locations | List delivery locations |
| GET | /locations/add | Add-location form |
| POST | /locations/add | Create location |
| GET | /locations/edit/:id | Edit-location form |
| PUT | /locations/edit/:id | Update location |
| DELETE | /locations/delete/:id | Delete location |
| GET | /orders | List orders |
| GET | /orders/add | Add-order form |
| POST | /orders/add | Create order |
| GET | /orders/edit/:id | Edit-order form |
| PUT | /orders/edit/:id | Update order |
| DELETE | /orders/delete/:id | Delete order |

## Notes
- Every page has a top nav bar to jump between Foods / Delivery Locations / Orders.
- The add/edit forms for locations and orders use dropdowns populated from
  existing foods (and locations, for orders) — you need at least one food
  before adding a location, and at least one food + location before adding an order.
- To browse the raw data, use `sqlite3 foodstore.db` or a GUI tool like
  DB Browser for SQLite, as covered in the earlier conversation.

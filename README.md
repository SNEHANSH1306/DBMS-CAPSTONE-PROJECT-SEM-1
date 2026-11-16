# CareerLens — SQL (MySQL) version

Same CareerLens app (login, application tracker, dashboard, blind spot detector,
fake internship checker, job recommendations) but the database is now **MySQL**
instead of MongoDB. The React frontend is unchanged except for one small file
(`src/hooks/useAppState.js`).

## File structure

```
careerlens/
├── README.md                     <- this file
├── package.json / vite.config.js / index.html
├── .env.example                  <- frontend: VITE_API_URL
├── database/                     <- ALL the DBMS work lives here
│   ├── schema.sql                <- CREATE DATABASE, 10 tables, index, view, trigger
│   ├── seed.sql                  <- roles, skills, role requirements, sample jobs
│   ├── sample_data.sql           <- (optional) 2 demo users + applications
│   └── queries_demo.sql          <- 14 practice/viva queries (JOIN, GROUP BY, subquery...)
├── docs/
│   ├── er_diagram.png            <- ER diagram for your report
│   ├── er.dot                    <- source of the diagram
│   └── DBMS_CONCEPTS.md          <- normalization + viva answers
├── server/                       <- Express backend
│   ├── package.json
│   ├── .env.example              <- DB_USER, DB_PASSWORD, JWT_SECRET ...
│   ├── server.js                 <- starts the server, mounts routes
│   ├── config/db.js              <- MySQL connection pool
│   ├── middleware/auth.js        <- checks the JWT token
│   ├── routes/
│   │   ├── auth.js               <- signup (transaction) + login
│   │   ├── profile.js            <- read/update profile + skills
│   │   ├── applications.js       <- tracker: SELECT / INSERT / UPDATE / DELETE
│   │   ├── blindspot.js          <- skill-gap JOIN query
│   │   ├── fakecheck.js          <- scores a listing + saves result in 2 tables
│   │   └── jobs.js               <- job ranking by SQL (GROUP BY + JOIN)
│   └── utils/
│       ├── profileHelper.js      <- getProfile / saveSkills helpers
│       └── fakeCheckRules.js     <- red-flag scoring rules
└── src/                          <- React frontend (pages, components, context, hooks)
```

## Steps to run

### 1. Install MySQL
- Install **MySQL Community Server 8.x** and **MySQL Workbench** (https://dev.mysql.com/downloads/).
- Remember the **root password** you set during installation.

### 2. Create the database
In MySQL Workbench: *File → Open SQL Script* → run these in order (lightning-bolt button):
1. `database/schema.sql`
2. `database/seed.sql`
3. `database/sample_data.sql` (optional, gives demo data; demo login: `demo@careerlens.com` / `demo123`)

Or from a terminal inside the `database` folder:
```
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
mysql -u root -p < sample_data.sql
```
Check it worked: `USE careerlens_db; SHOW TABLES;` should list 10 tables and 1 view.

### 3. Start the backend
```
cd server
npm install
copy .env.example .env        (Windows)   |   cp .env.example .env   (Mac/Linux)
```
Open `server/.env` and set `DB_PASSWORD` (your MySQL root password) and `JWT_SECRET`. Then:
```
npm run dev
```
You should see `MySQL connected` and `CareerLens API running on http://localhost:5000`.

### 4. Start the frontend (second terminal)
```
npm install
copy .env.example .env
npm run dev
```
Open the URL it prints (usually http://localhost:5173), sign up, and use the app.

### 5. See your data in SQL
After adding an application in the app, run in Workbench:
```sql
USE careerlens_db;
SELECT * FROM users;
SELECT * FROM applications;
SELECT * FROM v_application_stats;
```

## MongoDB → SQL: what changed

| MongoDB version | SQL version |
|---|---|
| `User` collection with `skills: []` array | `users` + `skills` + `user_skills` (many-to-many) |
| `targetRole` text in user | `roles` table, `users.target_role_id` foreign key |
| `Application` collection | `applications` table (FK `user_id`) |
| Skill gap done in JS with a lookup object | `role_skills` table + one JOIN query |
| Job match computed in JS | SQL `GROUP BY` + `COUNT` ranking |
| Fake check result not stored | `fake_checks` + `fake_check_flags` (1 : many) |
| Mongoose models | plain SQL with the `mysql2` package |

## Common problems
- **`ER_ACCESS_DENIED_ERROR`** — wrong `DB_USER`/`DB_PASSWORD` in `server/.env`.
- **`ER_BAD_DB_ERROR: Unknown database`** — you haven't run `schema.sql` yet.
- **`Client does not support authentication protocol`** (older tools) — run in MySQL:
  `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';`
- **"Failed to fetch" in the browser** — backend isn't running, or `VITE_API_URL` in the frontend `.env` is wrong. Restart `npm run dev` after editing `.env`.
- Optional real jobs: add `ADZUNA_APP_ID` / `ADZUNA_APP_KEY` to `server/.env` (free keys at developer.adzuna.com). Without them, the sample jobs in the `jobs` table are used.

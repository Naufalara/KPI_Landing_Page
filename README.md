# Back End

## How to Use

1. **Install Dependencies:**
   Run the following command in your terminal (cmd or git bash):
   ```sh
   composser install
   ```
2. **Configure .env**
   run command :

   ```sh
   cp .env.example .env
   ```

   open .env and change DB_DATABASE to your db name

   add this to .env

   ```sh
   FRONTEND_URL=http://localhost:5173
   SESSION_DOMAIN=localhost
   SANCTUM_STATEFUL_DOMAINS=localhost:8000
   ```

3. **To start development mode, run:**
   ```sh
   php artisan serve
   ```

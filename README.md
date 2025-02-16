# VacyStay - Your Next Vacation, Just a Click Away!


## Technologies Used

- **Next.js 14**
- **React**
- **Tailwind CSS**
- **Django**
- **Django Rest Framework**
- **Docker Compose**
- **PostgreSQL**

## Features in This Project

- Fully responsive design built with **Tailwind CSS**
- Authentication using **Django Allauth** (Email login)
- Using `react-date-range` and other packages for date selection
- Image uploading using the Fetch API

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev




Docker Setup

# Check if Docker is installed
docker --version

# Check if Docker Compose is installed
docker-compose --version


docker-compose up --build


-->If "web" is not running
docker-compose up -d web

1)If you encounter any issues with the database, you may need to run migrations
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate

2)To create a superuser for the Django admin
docker-compose exec web python manage.py createsuperuser


3)To check the logs of your containers
docker-compose logs

4)If you need to stop the containers
docker-compose down

5)If you want to remove volumes when stopping
docker-compose down -v


# shop_wbClone

Учебный full-stack проект — клон маркетплейса (в духе Wildberries).
Пользователь может зарегистрироваться / войти, выбрать роль (покупатель или продавец),
продавец добавляет товары, а на витрине они появляются у всех в реальном времени.

## О проекте

- **Клиент** — SPA на React + TypeScript, сборка через Vite, состояние в Redux Toolkit, запросы через axios, роутинг через React Router.
- **Сервер** — REST API на Express (TypeScript). Данные в PostgreSQL, кэш и «горячие» запросы через Redis, реальное время (событие о новом товаре) через Socket.IO.
- **Авторизация** — пароли хешируются через bcrypt, сессия хранится в JWT внутри HttpOnly-cookie.
- **Инфраструктура** — весь стек (postgres, redis, server, client) поднимается одной командой через Docker Compose.

Структура репозитория:

```
shop_wbClone/
├── client/            # React + Vite фронтенд
├── server/            # Express API + PostgreSQL + Redis + Socket.IO
└── docker-compose.yml # запуск всего стека
```

## Зависимости

### Сервер (`server/`)

| Пакет | Назначение |
| --- | --- |
| `express` | веб-фреймворк, REST API и маршрутизация |
| `pg` | клиент для PostgreSQL |
| `redis` | клиент Redis для кэширования запросов |
| `socket.io` | реальное время (WebSocket), рассылка событий о новых товарах |
| `jsonwebtoken` | генерация и проверка JWT-токенов |
| `bcrypt` | хеширование паролей пользователей |
| `cookie-parser` | чтение cookie из запросов |
| `cors` | разрешение кросс-доменных запросов от клиента |
| `helmet` | базовые security-заголовки HTTP |
| `express-rate-limit` | ограничение числа запросов (защита от перебора) |
| `dotenv` | загрузка переменных окружения из `.env` |

Dev-зависимости сервера: `typescript`, `tsx`, `ts-node`, `nodemon` (запуск и авто-перезагрузка TS), а также типы `@types/*` для перечисленных пакетов.

### Клиент (`client/`)

| Пакет | Назначение |
| --- | --- |
| `react`, `react-dom` | UI-библиотека и рендер в DOM |
| `react-router-dom` | клиентский роутинг между страницами |
| `@reduxjs/toolkit`, `react-redux` | глобальное состояние приложения |
| `axios` | HTTP-запросы к серверному API |
| `socket.io-client` | подключение к серверу по WebSocket |
| `sass` | стили в формате SCSS-модулей |

Dev-зависимости клиента: `vite`, `@vitejs/plugin-react` (сборка и dev-сервер), `typescript`, `eslint` + плагины (линтинг), типы `@types/*`.

## Установка зависимостей

```bash
# сервер
cd server
npm install

# клиент
cd client
npm install
```

## Запуск

### Вариант 1 — Docker (рекомендуется)

Поднимает сразу PostgreSQL, Redis, сервер и клиент:

```bash
docker compose up --build
```

- Клиент: http://localhost:5173
- API сервера: http://localhost:3000

### Вариант 2 — локально

Нужны запущенные PostgreSQL и Redis, а в корне проекта — файл `.env` с настройками
(`DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `SERVER_HOST`, `SERVER_PORT`, `JWT_SECRET`, `NODE_ENV`).

```bash
# сервер (http://localhost:3000)
cd server
npm run dev

# клиент (http://localhost:5173)
cd client
npm run dev
```

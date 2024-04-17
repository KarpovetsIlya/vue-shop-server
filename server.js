// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware для разбора JSON
app.use(bodyParser.json());

// Добавляем middleware для CORS
app.use(cors());

// Добавляем middleware для обработки предварительных запросов (preflight requests)
app.options("/api/orders", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Данные, которые будут храниться в памяти

let data = [
  {
    id: 1,
    title: "Плитка BEE OFF WHITE",
    price: 7179,
    imageUrl: "/sneakers/plitka-1.jpg",
  },
  {
    id: 2,
    title: "Плитка BEE GREY",
    price: 7179,
    imageUrl: "/sneakers/plitka-2.jpg",
  },
  {
    id: 3,
    title: "Плитка BEE PINK",
    price: 7179,
    imageUrl: "/sneakers/plitka-3.jpg",
  },
  {
    id: 4,
    title: "Плитка BEE BLUE",
    price: 7179,
    imageUrl: "/sneakers/plitka-4.jpg",
  },
  {
    id: 5,
    title: "Плитка BEE GRAPHITE",
    price: 7179,
    imageUrl: "/sneakers/plitka-5.jpg",
  },
  {
    id: 6,
    title: "Плитка BEE MUSTARD",
    price: 7179,
    imageUrl: "/sneakers/plitka-6.jpg",
  },
  {
    id: 7,
    title: "Плитка BEE COTTO",
    price: 7179,
    imageUrl: "/sneakers/plitka-7.jpg",
  },
  {
    id: 8,
    title: "Плитка BEE GREEN",
    price: 7179,
    imageUrl: "/sneakers/plitka-8.jpg",
  },
  {
    id: 9,
    title: "Плитка CANDY CRAYON GRAPHITE",
    price: 5426,
    imageUrl: "/sneakers/plitka-9.jpg",
  },
  {
    id: 10,
    title: "Плитка CANDY CRAYON BLUE",
    price: 5426,
    imageUrl: "/sneakers/plitka-10.jpg",
  },
  {
    id: 11,
    title: "Плитка CANDY CRAYON MINT",
    price: 5426,
    imageUrl: "/sneakers/plitka-11.jpg",
  },
  {
    id: 12,
    title: "Плитка CANDY CRAYON CAFE",
    price: 5426,
    imageUrl: "/sneakers/plitka-12.jpg",
  },
  {
    id: 13,
    title: "Плитка CANDY MINT",
    price: 4692,
    imageUrl: "/sneakers/plitka-13.jpg",
  },
  {
    id: 14,
    title: "Плитка CANDY BLUE",
    price: 4692,
    imageUrl: "/sneakers/plitka-14.jpg",
  },
  {
    id: 15,
    title: "Плитка CANDY PINK",
    price: 4692,
    imageUrl: "/sneakers/plitka-15.jpg",
  },
  {
    id: 16,
    title: "Плитка CANDY WHITE",
    price: 4692,
    imageUrl: "/sneakers/plitka-16.jpg",
  },
  {
    id: 17,
    title: "Плитка SAFI GRAPHITE",
    price: 4692,
    imageUrl: "/sneakers/plitka-17.jpg",
  },
  {
    id: 18,
    title: "Плитка SAFI MINT",
    price: 3941,
    imageUrl: "/sneakers/plitka-18.jpg",
  },
  {
    id: 19,
    title: "Плитка SAFI EMERALD",
    price: 3941,
    imageUrl: "/sneakers/plitka-19.jpg",
  },
  {
    id: 20,
    title: "Плитка SAFI WHITE",
    price: 3941,
    imageUrl: "/sneakers/plitka-20.jpg",
  },
  {
    id: 21,
    title: "Плитка SAFI AQUA",
    price: 3941,
    imageUrl: "/sneakers/plitka-21.jpg",
  },
  {
    id: 22,
    title: "Плитка SAFI COBALT",
    price: 3941,
    imageUrl: "/sneakers/plitka-22.jpg",
  },
  {
    id: 23,
    title: "Плитка SAFI PINK",
    price: 3941,
    imageUrl: "/sneakers/plitka-23.jpg",
  },
  {
    id: 24,
    title: "Плитка SAFI GREY",
    price: 3941,
    imageUrl: "/sneakers/plitka-24.jpg",
  },
];

// Маршрут для получения данных с возможностью сортировки
app.get("/api/data", (req, res) => {
  let sortedData = [...data]; // Создаем копию данных, чтобы не изменять оригинал

  // Проверяем, есть ли параметр сортировки в запросе
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy.toLowerCase(); // Приводим параметр сортировки к нижнему регистру для удобства сравнения

    // Сортируем данные в зависимости от выбранного параметра сортировки
    switch (sortBy) {
      case "title":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price_asc":
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sortedData.sort((a, b) => b.price - a.price);
        break;
      default:
        // Если параметр сортировки недействителен, возвращаем исходные данные без сортировки
        break;
    }
  }

  res.json(sortedData);
});

// Маршрут для поиска данных
app.get("/api/search", (req, res) => {
  const searchQuery = req.query.q.toLowerCase(); // Получаем параметр поиска и приводим его к нижнему регистру

  // Фильтруем данные в зависимости от поискового запроса
  const searchData = data.filter((item) => {
    // Проверяем, содержит ли значение поля title поисковой запрос
    return item.title.toLowerCase().includes(searchQuery);
  });

  res.json(searchData);
});

// Маршрут для добавления новых данных
app.post("/api/data", (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json(newData);
});

// Маршрут для работы с закладками
let bookmarks = []; // Массив для хранения закладок

// Маршрут для получения всех закладок
app.get("/api/bookmarks", (req, res) => {
  res.json(bookmarks);
});

// Маршрут для добавления новой закладки
app.post("/api/bookmarks", (req, res) => {
  const { productId, item } = req.body; // Деструктурируем item из тела запроса
  const existingBookmark = bookmarks.find(
    (bookmark) => bookmark.productId === productId
  );
  if (existingBookmark) {
    // Если закладка для данного товара уже существует, вернуть сообщение об ошибке
    return res
      .status(400)
      .json({ error: "Bookmark already exists for this product." });
  }
  const newBookmark = { id: productId, productId, item }; // Добавляем item к новой закладке
  bookmarks.push(newBookmark);
  res.status(201).json(newBookmark);
});

// Маршрут для удаления закладки по ID
app.delete("/api/bookmarks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
  res.sendStatus(204);
});

let orders = [];

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Эндпоинт для создания нового заказа
app.post("/api/orders", (req, res) => {
  const newOrder = req.body;
  newOrder.id = orders.length + 1; // Присваиваем уникальный идентификатор заказу
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

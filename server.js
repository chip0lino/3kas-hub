const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
// Используйте middleware cors
app.use(cors());
const port = 3000;

app.use(express.json());

// Чтение JSON файла
app.get('/data', (req, res) => {
  const filePath = 'data.json';
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Файл не найден');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      const jsonData = JSON.parse(data);
      res.header('Access-Control-Allow-Origin', '*');
      res.send(jsonData);
    } catch (err) {
      return res.status(500).send('Ошибка парсинга JSON');
    }
  });
});
//http://localhost:3000/update вместо вот этого надо сделать http://localhost:3000/add http://localhost:3000/update http://localhost:3000/delete
//Удаление - просто предаешь уникальный айдишник в данном случае номер с решеткой и удаляешь элемент с этим номером из прочтенного массива и отправляешь его записываться. поиск номера элемента с помощью indexOf 
// Обновление
// Обновление JSON файла передаешь в боди объект типа 
let boddy = {
  oldId : '#1111' ,
  newData: {
    "Телефон": "#6668",
    "Внешний номер": "77777",
    "Номер ВТС": "11111",
    "Сотрудник": "Ебанат аналович Конча",
    "Должность": "Пожиратель Кала ",
    "Отдел": "ГОВНА",
    "Кабинет": "000"
  }
}
//тебе нужно удалить старый с айдитшником старым, и добавить новый
app.post('/update', (req, res) => {
  const filePath = 'data.json';
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Файл не найден');
  }

  const newData = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      let jsonData = JSON.parse(data);
      jsonData.push(newData);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Ошибка записи файла');
        }
        res.send('Файл успешно обновлен');
      });
    } catch (err) {
      return res.status(500).send('Ошибка парсинга JSON');
    }
  });
});

// Удаление сотрудника из JSON файла
app.delete('/delete/:id', (req, res) => {
  const filePath = 'data.json';
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Файл не найден');
  }

  const id = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      let jsonData = JSON.parse(data);
      jsonData = jsonData.filter((employee, index) => index !== parseInt(id));

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Ошибка записи файла');
        }
        res.send('Сотрудник удален');
      });
    } catch (err) {
      return res.status(500).send('Ошибка парсинга JSON');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
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
  const newEmployee = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Данные перед обновлением:', jsonData);

      const index = jsonData.findIndex(employee => employee["Телефон"] === newEmployee.oldId);
      if (index !== -1) {
        console.log('Сотрудник найден, обновляю...');
        jsonData[index] = newEmployee.newData;

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error('Ошибка записи файла:', err);
            return res.status(500).send('Ошибка записи файла');
          }
          console.log('Сотрудник обновлен, данные после обновления:', jsonData);
          res.send('Файл успешно обновлен');
        });
      } else {
        console.error('Сотрудник не найден');
        res.status(404).send('Сотрудник не найден');
      }
    } catch (err) {
      console.error('Ошибка парсинга JSON:', err);
      return res.status(500).send('Ошибка парсинга JSON');
    }
  });
});

app.use(express.json()); // добавить middleware для парсинга JSON

app.post('/delete', (req, res) => {
  const filePath = 'data.json';
  const id = req.body.id;
  console.log('Удаление сотрудника с ID:', id);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Данные перед удалением:', jsonData);

      const index = jsonData.findIndex(employee => employee["Телефон"] === id);
      if (index !== -1) {
        console.log('Сотрудник найден, удаляю...');
        jsonData.splice(index, 1);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error('Ошибка записи файла:', err);
            return res.status(500).send('Ошибка записи файла');
          }
          console.log('Сотрудник удален, данные после удаления:', jsonData);
          res.send('Сотрудник удален');
        });
      } else {
        console.error('Сотрудник не найден');
        res.status(404).send('Сотрудник не найден');
      }
    } catch (err) {
      console.error('Ошибка парсинга JSON:', err);
      return res.status(500).send('Ошибка парсинга JSON');
    }
  });
});

app.post('/add', (req, res) => {
  const filePath = 'data.json';
  const newEmployee = req.body;
  console.log('Добавление нового сотрудника:', newEmployee);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Данные перед добавлением:', jsonData);

      jsonData.push(newEmployee);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Ошибка записи файла:', err);
          return res.status(500).send('Ошибка записи файла');
        }
        console.log('Сотрудник добавлен, данные после добавления:', jsonData);
        res.send('Файл успешно обновлен');
      });
    } catch (err) {
      console.error('Ошибка парсинга JSON:', err);
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
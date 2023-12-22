import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const app = express();
export const sqlrouter = express.Router();

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
console.log(db);
sqlrouter.post('/menu/new', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);

  // 요청에서 필요한 데이터 추출
  const { name, image, info, price } = req.body;

  // MySQL 쿼리
  const sqlQuery = `INSERT INTO menu (name, image, info, price) VALUES (?, ?, ?, ?)`;

  // 쿼리 실행
  db.query(sqlQuery, [name, image, info, price], (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});

sqlrouter.get('/menu/info', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "SELECT * FROM menu WHERE today=1";

    db.query(sqlQuery, (err, result) => {
        if (err){
		console.error(err);
	}
	else{
		res.send({data: result});
	}
    });
});

sqlrouter.delete('/menu/drop', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  // 요청에서 필요한 데이터 추출
  const { id } = req.query;

  // MySQL 쿼리
  const sqlQuery = `DELETE FROM menu WHERE menu_id = ${id}`;

  // 쿼리 실행
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});

sqlrouter.put('/menu/update', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);

  // 요청에서 필요한 데이터 추출
  const { id, name, image, info, price, today} = req.body;

  // MySQL 쿼리
  const sqlQuery = `UPDATE menu SET today = ${today}, image = '${image}', name = '${name}', info = '${info}', price = '${price}' WHERE menu_id = '${id}'`;

  // 쿼리 실행
  db.query(sqlQuery, [name, image, info, price, id], (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});

sqlrouter.post('/noti/new', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);

  // 요청에서 필요한 데이터 추출
  const { title, content, EVENT, image } = req.body;

  // MySQL 쿼리
  const sqlQuery = `INSERT INTO noti ( title, content, EVENT, image) VALUES (?, ?, ?, ?)`;

  // 쿼리 실행
  db.query(sqlQuery, [ title, content, EVENT, image], (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});

sqlrouter.get('/noti/event', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = `SELECT * FROM noti WHERE EVENT=1 ORDER BY noti_id DESC`;

    db.query(sqlQuery, (err, result) => {
        if (err){
    console.error(err);
  }
  else{
    res.send({data: result});
  }
    });
});

sqlrouter.get('/noti/notify', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = `SELECT * FROM noti WHERE EVENT=0 ORDER BY noti_id DESC`;

    db.query(sqlQuery, (err, result) => {
        if (err){
    console.error(err);
  }
  else{
    res.send({data: result});
  }
    });
});

sqlrouter.delete('/noti/drop', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  // 요청에서 필요한 데이터 추출
  const { id } = req.query;

  // MySQL 쿼리
  const sqlQuery = `DELETE FROM noti WHERE noti_id = ${id}`;

  // 쿼리 실행
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});

sqlrouter.put('/noti/update', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);

  // 요청에서 필요한 데이터 추출
  const {id, title, content, EVENT, image} = req.body;

  // MySQL 쿼리
  const sqlQuery = `UPDATE noti SET title = ‘${title}’, content = ‘${content}’, EVENT = ‘${EVENT}’, image = ${image} WHERE noti_id = '${id}'`;

  // 쿼리 실행
  db.query(sqlQuery, [id, title, content, EVENT, image, today], (err, result) => {
    if (err) {
      console.error('MySQL 쿼리 오류:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    } else {
      // 결과 응답
      res.status(200).send(result);
    }
  });
});
   

sqlrouter.get('/noti/one', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {id} = req.query;

    const sqlQuery = `SELECT * FROM noti WHERE noti_id = ${id}`;

    db.query(sqlQuery, (err, result) => {
        if (err){
    console.error(err);
  }
  else{
    res.send({data: result});
  }
    });
});

sqlrouter.get('/menu/one', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {id} = req.query;
    const sqlQuery = `SELECT * FROM menu WHERE menu_id = ${id}`;

    db.query(sqlQuery, (err, result) => {
        if (err){
    console.error(err);
  }
  else{
    res.send({data: result});
  }
    });
});

sqlrouter.get('/menu/admin', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM menu";

    db.query(sqlQuery, (err, result) => {
        if (err){
    console.error(err);
  }
  else{
    res.send({data: result});
  }
    });
});


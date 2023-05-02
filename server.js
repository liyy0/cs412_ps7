const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const api_key = process.env.API_KEY
const Redis = require('ioredis');


app.use(cors());
app.use(express.json());



const redis = new Redis();
const axios = require('axios');
app.post('/', async (req, res) => {
  try {
    const { geovalue } = req.body;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${geovalue}`;
    console.log(url);
    const cacheKey = url;
    const cachedData = await redis.get(cacheKey);
    if(cachedData){
      console.log('Data found in Redis cache');
      res.json(JSON.parse(cachedData));
    }
    else{
      const response = await axios.get(url);
      const data = response.data;

      // Cache weather data for 60 seconds
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 60);

      console.log(data);
      res.json(data);


    }


    }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});




// app.use(express.static('/src'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} .`);
  });




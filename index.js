const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;

const mongoose = require('mongoose');
const CryptoModel = require('./models/FavouriteCrypto');

mongoose.connect('mongodb+srv://anton:hH4YHcaDuimXBiWk@myapp.fisvcb5.mongodb.net/', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const corsOptions = {
  origin: 'http://cryptoprojectwp1.s3-website-eu-west-1.amazonaws.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get('/favouriteCrypto', (req, res, next) => {
    CryptoModel.find()
    .then((data) => {
        res.json({'favouriteCrypto': data});
    })
    .catch(() => {
        console.log('Error fetching entries')
    })
  });

app.post('/favouriteCrypto', (req, res, next) => {
    const {
        id
    } = req.body;
    const newCrypto = new CryptoModel({
        id
    });
    newCrypto.save()
        .then((result) => {
            res.status(201).json({
                message: 'Crypto added to favourites',
                favourite: result
            });
        })
        .catch((err) => {
            console.log('Error adding crypto to favourites', err);
            res.status(500).json({
                error: 'Failed to add crypto to favourites'
            });
        });
});
app.delete('/favourites/:id', (req, res, next) => {
    const cryptoId = req.params.id;
  
    CryptoModel.findOneAndDelete({ id: cryptoId })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: 'Crypto removed from favorites',
            removedCrypto: result
          });
        } else {
          res.status(404).json({
            error: 'Crypto not found in favorites'
          });
        }
      })
      .catch((err) => {
        console.log('Error removing crypto from favorites', err);
        res.status(500).json({
          error: 'Failed to remove crypto from favorites'
        });
      });
  });
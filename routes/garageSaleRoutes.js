const express = require("express");
const mongoose = require("mongoose");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const shortid = require("shortid");
const geocoder = require("geocoder");
const GarageSale = mongoose.model("GarageSale");

const router = express.Router();

//Setting up aws
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

//Setting up multer and multer s3
const upload = multer({
  limits: { fileSize: 5242880 },
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: "garagesaleking",
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(
        null,
        process.env.GARAGE_SALE_STORAGE_PATH.concat(
          shortid.generate(),
          "_",
          file.originalname
        )
      );
    }
  })
});

// Routes begin here
router.post("/api/user_location", (req, res) => {
  const userLocation = req.body;
  const point = {
    type: "Point",
    coordinates: [parseFloat(userLocation.lng), parseFloat(userLocation.lat)]
  };

  const geoOptions = {
    maxDistance: parseFloat(30 * 1609.34),
    spherical: true,
    num: 100
  };

  var nearGarageSales = [];
  GarageSale.geoNear(point, geoOptions, (err, results, stats) => {
    if (err) {
    } else {
      if (results.length === 0) {
        GarageSale.find({}, (err, garageSales) => {
          res.send(garageSales);
        });
      } else {
        results.forEach(result => {
          nearGarageSales.push({
            distance: parseFloat(result.dis * 0.000621371),
            description: result.obj.description,
            images: result.obj.images,
            location: result.obj.location,
            _id: result.obj._id
          });
        });
        res.send(nearGarageSales);
      }
    }
  });
});

router.get("/api/garagesales", (req, res) => {
  GarageSale.find({}, (err, garageSales) => {
    if (!err) {
      res.send(garageSales);
    }
  });
});

router.post(
  "/api/garagesales",
  upload.array("garageSalePhotos", 5),
  (req, res, next) => {
    //Add longitude, Latitude and formated address to the garage sale
    geocoder.geocode(req.body.location, (err, data) => {
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      const location = data.results[0].formatted_address;

      const newGarageSale = new GarageSale({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        location: location,
        coords: [lng, lat],
        creator: {
          id: req.user._id,
          username: req.user.username
        }
      });

      //Adding uploaded images to the images array of the garage sale
      var fileNames = [];
      if (req.files.length > 0) {
        req.files.forEach(file => {
          fileNames.push(file.key);
        });
        newGarageSale.images = fileNames;
      }

      newGarageSale.save((err, createdGarageSale) => {
        if (err) {
          //If garage sale is not saved, then the uploaded images will be deleted
          if (req.files.length > 0) {
            req.files.forEach(file => {
              s3.deleteObject(
                {
                  Bucket: "garagesaleking",
                  Key: file.key
                },
                (err, data) => {}
              );
            });
          }
        } else {
          res.redirect("/garagesales");
        }
      });
    });
  }
);

router.get("/api/garagesales/:id", (req, res) => {
  GarageSale.findById(req.params.id, (err, foundGarageSale) => {
    if (!err) {
      res.send(foundGarageSale);
    }
  });
});

module.exports = router;

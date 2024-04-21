"use strict";
/* -------------------------------------------------------
    UPLOAD MIDDLEWARE
------------------------------------------------------- */
// multer module ile "Fom-Data" tipinde verileri kabul edebiliriz, yani dosya yükleme yapilabilir.
const multer = require("multer");
module.exports = multer({
  //dest: './uploads',
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, returnCallback) {
      // returnCallback(error, filename)
      // returnCallback(null, 'mustafa.jpg');
      returnCallback(null, file.originalname);
    },
  }),
});

// import package here
const multer = require('multer')

exports.uploadFile = (imageFile) => {
  // code here
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
    }
  })

  const fileFilter = function (req, file, cb) {
    // <input type="file" name="image"></input>
    // image.pdf 
    if (file.fieldname == imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/)) {
        req.fileValidationError = {
          message: 'only image file are allowed'
        }
        return cb(new Error("only image file are allowed"), false)
      }
    }
    cb(null, true)
  }

  const sizeInMB = 10
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).single(imageFile)

  //config middleware multer
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }

      // jika tidak ada file yang diupload
      if (!req.file && !err) {
        return res.status(400).send({
          message: 'Please select file to upload'
        })
      }

      // jika size lebih
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file size 10 MB'
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
};
import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'src/uploads'); // Directorio donde se guardarán las imágenes
  },

  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre de archivo único
  }

})

const upload = multer({ storage: storage })


export default upload;
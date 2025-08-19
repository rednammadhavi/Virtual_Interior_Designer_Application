// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({ storage }) 


import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const name = crypto.randomBytes(8).toString('hex')
        cb(null, `${Date.now()}-${name}${ext}`)
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

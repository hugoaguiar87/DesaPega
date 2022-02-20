import { Router } from "express";
import multer from "multer";

import * as apiController from '../controllers/apiController';
import * as privateControler from '../controllers/privateController';
import * as testeController from '../controllers/testeController'

import { privateRoute } from "../config/authConfig";

const upload = multer({
    dest: './temp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = [ 'image/jpg', 'image/jpeg', 'image/png']
        cb(null, allowed.includes( file.mimetype ))
    },
    limits: { fileSize: 5242880 },
})

const router = Router()

router.get('/ping', testeController.pong)

router.get('/states', apiController.getStates)

router.post('/user/signin', apiController.singin)
router.post('/user/signup', apiController.singup)

router.get('/user/me', privateRoute, privateControler.getUserInfos)
router.put('/user/me', privateRoute, privateControler.editUser)

router.get('/categories', apiController.getCategories)

router.post('/ads/create', privateRoute, upload.array('images'), privateControler.createAds)
router.get('/ads/list', apiController.getAdsList)
router.get('/ads/:id', apiController.getAdItem)
router.post('/ads/:id', privateRoute, upload.array('images'), privateControler.editAds)

router.delete('/ads/image/:id_image', privateRoute, privateControler.deleteImage)
router.delete('/ads/:id', privateRoute, privateControler.deleteAds)


export default router;
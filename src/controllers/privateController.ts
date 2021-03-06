import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';
import bcrypt from 'bcrypt';
import sharp from "sharp";
import { unlink } from "fs/promises";

import { User, UserInstance } from "../models/User";
import { State } from "../models/State";
import { Ad, AdInstance } from "../models/Ad";
import { Image, ImageInstace } from "../models/Image";
import { Category } from "../models/Category";

dotenv.config()

export const getUserInfos = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance

        const user = await User.findByPk(tokenDecoded.id)
        const state = await State.findByPk(user?.state_id)
        const ads = await Ad.findAll({where: {idUser: user?.id}})
        const img = await Image.findAll({where: {id_user: user?.id}}) as Array<ImageInstace>
        
        let adList = []
        for(let i in ads){
            
            let imgsAds = img.filter(item => {
                if(item.id_ads === ads[i].id){
                    return true
                } else {
                    return false
                }
            })

            const cat = await Category.findByPk(ads[i].id_category)

            adList.push({
                id: ads[i].id,
                status: ads[i].status,
                images: imgsAds,
                dateCreated: ads[i].dateCreated,
                title: ads[i].title,
                price: ads[i].price,
                priceNegotiable: ads[i].priceNegotiable,
                description: ads[i].description,
                views: ads[i].views,
                category: cat?.slug
            })
        }

        return res.json({
            name: user?.name,
            email: user?.email,
            state: state?.name,
            ads: adList
        })
       
    }

    res.json({error: 'N??o Autorizado!'})
}

export const editUser = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance

        let user = await User.findByPk(tokenDecoded.id)
        const {name, email, state_id, password} = req.body

        if(user){
            if(name && validator.isLength(name, {min: 4})){
                user.name = name
            }
            if(name && !validator.isLength(name, {min: 4})){
                return res.json({error: 'Nome de usu??rio tem que ter no m??nimo 4 caracteres'})
            }

            if(email && validator.isEmail(email)){
                let emailExist = await User.findOne({where: {email}})
                if(emailExist){
                    return res.json({error: "Email cadastrado!"})
                }
                user.email = email
            }
            if(email && !validator.isEmail(email)){
                return res.json({error: 'Email inv??lido!'})
            }

            const state = await State.findByPk(state_id)
            if(state_id && state){
                user.state_id = state_id
            }
            if(state_id && !state){
                return res.json({error: "Estado n??o existe!"})
            }

            if(password){
                const passwordHash = await bcrypt.hash(password, 12)
                user.passwordHash = passwordHash
            }

            if(!name && !email && !state_id && !password){
                return res.json({status: true, message: "Nenhum dado enviado!"})
            }

            await user.save()

            return res.json({status: true})
    
        }
    }


    res.json({error: 'N??o autorizado!'})
}

export const createAds = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance
        const {title, id_category, price, priceNegotiable, description, status, id_state} = req.body

        if(!title){
            return res.json({error: "Dados incompletos"})
        }
        
        if(!id_category){
            return res.json({error: "Dados incompletos"})
        } else {
            let categoryIsValid = await Category.findByPk(id_category)
            if(!categoryIsValid){
                return res.json({error: "Categoria inv??lida"})
            }
        }

        if(!price){
            return res.json({error: "Dados incompletos"})
        }

        if(!priceNegotiable){
            return res.json({error: "Dados incompletos"})
        }

        if(!status){
            return res.json({error: "Dados incompletos"})
        }

        if(!id_state){
            return res.json({error: "Dados incompletos"})
        } else {
            let stateIsValid = await State.findByPk(id_state)
            if(!stateIsValid){
                return res.json({error: "Estado n??o encontrado"})
            }
        }

        let newAd = await Ad.create({
            idUser: tokenDecoded.id,
            title,
            id_category,
            price,
            priceNegotiable,
            description,
            status,
            id_state
        })
        
        if(req.files){
            const files = req.files as Express.Multer.File[]

            for(let i=0; i<files.length; i++){
                await sharp(files[i].path)
                    .resize(500,500)
                    .toFormat('jpeg')
                    .toFile(`public/media/${files[i].filename}.jpeg`)
                await unlink(files[i].path)

                let isDeafult = false
                if(i==0){
                    isDeafult = true
                }

                await Image.create({
                    id_ads: newAd.id,
                    url: `${files[i].filename}.jpeg`,
                    default: isDeafult,
                    id_user: newAd.idUser
                })
            }
        }

        res.status(201)
        return res.json({status: true, id: newAd.id})
    }

    res.json({error: 'N??o autorizado!'})
}

export const editAds = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance
        const id_ads = req.params.id as string

        if(!validator.isInt(id_ads)){
            return res.json({error: 'Id inv??lido'})
        }
        let ad = await Ad.findByPk(Number (id_ads)) as AdInstance

        if(!ad){
            return res.json({error: 'An??ncio n??o encontrado.'})
        }
        if(ad.idUser.toString() !== tokenDecoded.id.toString()){
            return res.json({error: 'An??ncio e Usu??rio incompat??veis.'})
        }

        const { title, id_category, price, priceNegotiable, description, status, id_state, id_image, isDefault } = req.body

        if(title){
            ad.title = title
        }

        if(id_category){
            const categoryIsValid = await Category.findByPk(id_category)
            if(!categoryIsValid){
                return res.json({error: 'N??o ?? uma categoria v??lida.'})
            }

            ad.id_category = id_category
        }

        if(price){
            ad.price = price
        }

        if(priceNegotiable){
            ad.priceNegotiable = priceNegotiable
        }

        if(description){
            ad.description = description
        }

        if(status){
            ad.status = status
        }

        if(id_state){
            const stateIsValid = await State.findByPk(id_state)
            if(!stateIsValid){
                return res.json({error: 'N??o ?? um estado v??lido'})
            }

            ad.id_state = id_state
        }

        await ad.save()

        if(req.files){
            const files = req.files as Express.Multer.File[]
            const imgDefault = await Image.findAll({where: {id_ads: ad.id, default: true}})

            for(let i=0; i<files.length; i++ ){
                await sharp(files[i].path)
                    .resize(500,500)
                    .toFormat('jpeg')
                    .toFile(`public/media/${files[i].filename}.jpeg`)
                await unlink(files[i].path)

                let def = false
                if(!imgDefault){
                    if(i==0){
                        def = true
                    }
                }

                await Image.create({
                    id_ads: ad.id,
                    url: `${files[i].filename}.jpeg`,
                    default: def,
                    id_user: ad.idUser
                })
            }

        }

        if(id_image && isDefault){
            let img = await Image.findByPk(id_image) as ImageInstace
            if(!img){
                return res.json({error: 'Id da imagem inv??lido'})
            }
            img.default = isDefault

            img.save()
        }


        return res.json({status: true})
    }

    res.json({error: 'N??o autorizado!'})
}

export const deleteImage = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance
        const id_image = req.params.id_image as string

        if(!validator.isInt(id_image)){
            return res.json({error: 'Id da imagem inv??lido'})
        }
        
        let image = await Image.findByPk(Number(id_image)) as ImageInstace
        if(!image){
            return res.json({error: 'Imagem n??o encontrada'})
        }

        if(tokenDecoded.id != image.id_user){
            return res.json({error: 'Essa imagem n??o pertence a esse usu??rio!'})
        }

        await unlink(`public/media/${image.url}`)
        await Image.destroy({where: {
            id: id_image,
            id_user: tokenDecoded.id,
            url: image.url
        }})


        return res.json({status: true})

    }

    res.json({error: 'N??o autorizado'})
}

export const deleteAds = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserInstance
        const id = req.params.id as string

        if(!validator.isInt(id)){
            return res.json({error: 'N??o ?? um id v??lido'})
        }
        
        let ad = await Ad.findByPk(Number(id))
        if(!ad){
            return res.json({error: "An??ncio inexistente!"})
        }

        if(ad.idUser != tokenDecoded.id) {
            return res.json({error: 'Esse an??ncio n??o pertence a este usu??rio.'})
        }

        let images = await Image.findAll({where: { id_ads: ad.id, id_user: tokenDecoded.id }}) as ImageInstace[]
        for(let i=0; i<images.length; i++){
            await unlink(`public/media/${images[i].url}`)
            await Image.destroy({where: {
                id: images[i].id,
                id_user: tokenDecoded.id,
                url: images[i].url,
                id_ads: ad.id
            }})
        }

        await Ad.destroy({where: {
            id: ad.id,
            idUser: tokenDecoded.id,
        }})

        return res.json({status: true})
    }
    
    res.json({error: 'N??o autorizado'})
}
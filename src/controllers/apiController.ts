import { Request, Response } from "express";
import validator from "validator";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { State } from "../models/State";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Image, ImageInstace } from "../models/Image";
import { Ad } from "../models/Ad";

import { generateToken } from "../config/authConfig";

dotenv.config()


export const getStates = async (req: Request, res: Response) => {
    let states = await State.findAll()

    res.json({states})
}

export const singin = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password){
        let {email, password} = req.body

        if(!validator.isEmail(email)){
            res.json({error: "Email inválido!"})
            return
        }

        let user = await User.findOne({where: {email}})
        if(!user){
            res.json({error: "Email não cadastrado!"})
            return
        } else {
            const match = await bcrypt.compare(password, user.passwordHash)

            if(!match){
                res.json({error: "Senha incorreta!"})
                return
            } else {
                const token = generateToken({id: user.id, email: user.email})
                return res.json({status: true, token})
            }
        }

    }

    res.json({error: "Dados incompletos!"})
}

export const singup = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password && req.body.state_id && req.body.name){
        let {email, password, state_id, name} = req.body

        if(!validator.isEmail(email)){
            res.json({error: 'Não é um email válido!'})
            return;
        }

        let hashUser = await User.findOne({where: {email}})
        if(hashUser){
            res.json({error: 'Email já está cadastrado'})
            return;
        }

        let stateItem = await State.findByPk(state_id)
        if(!stateItem){
            res.json({error: 'Estado não existe'})
            return
        }

        if(!validator.isLength(name, {min: 4})){
            res.json({error: 'Nome de usuário tem que ter no mínimo 4 caracteres'})
            return;
        }

        const passwordHash = await bcrypt.hash(password, 12)

        let newUser = await User.create({email, passwordHash, state_id, name})
        const token = generateToken({id: newUser.id, email: newUser.email})

        res.status(201)
        res.json({id: newUser.id, email: newUser.email, token})

        return;
    }

    res.json({error: 'Dados incompletos'})
}

export const getCategories = async (req: Request, res: Response) => {
    let allCategories = await Category.findAll()
    let categories = [] 

    for(let i in allCategories){
        categories.push({
            id: allCategories[i].id,
            name: allCategories[i].name,
            slug: allCategories[i].slug,
            image: `${process.env.SERVER_URLBASE}/assets/images/${allCategories[i].slug}.png`
        })
    }
    res.json({categories})
}

export const getAdsList = async (req: Request, res: Response) => {
    const allAdsList = await Ad.findAll({where: {status: true}})

    let adsList = []
    for(let i =0; i<allAdsList.length ; i++){
        let imageDefault = await Image.findOne({where: {id_ads: allAdsList[i].id, default: true}}) as ImageInstace
        let urlImg

        if(imageDefault){
            urlImg = `${process.env.SERVER_URLBASE}/media/${imageDefault.url}`
        } else {
            urlImg = `${process.env.SERVER_URLBASE}/media/default.jpeg`
        }

        adsList.push({
            id: allAdsList[i].id,
            title: allAdsList[i].title,
            price: allAdsList[i].price,
            priceNegotiable: allAdsList[i].priceNegotiable,
            image: urlImg,
            category: allAdsList[i].id_category,
            state: allAdsList[i].id_state
        })
    }

    res.json({ adsList })
}

export const getAdItem = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const { other = null } = req.query
    
    if(!id){
        return res.json({error: 'Sem produto'})
    }
    
    if(!validator.isInt(id)){
        return res.json({error: 'Não é um id válido.'})
    }

    let ads = await Ad.findByPk(Number(id))

    if(!ads){
        return res.json({error: "Anúncio não encontrado!"})
    }
    ads.views++
    await ads.save()

    let images = await Image.findAll({where: {id_ads: id}}) as ImageInstace[]
    let urls = []

    for(let i = 0; i<images.length; i++){
        urls.push({
            url:`${process.env.SERVER_URLBASE}/media/${images[i].url}`,
            id: images[i].id,
            default: images[i].default
        })
    }

    const adUser = await User.findByPk(ads.idUser)
    const category = await Category.findByPk(ads.id_category)
    const state = await State.findByPk(ads.id_state)

    let others = []
    if(other){
        const otherData = await Ad.findAll({ where: { status: true, idUser: ads.idUser } })

        for(let i = 0; i<otherData.length; i++){
            if(otherData[i].id != ads.id){
                let image = `${process.env.SERVER_URLBASE}/media/default.jpeg`
                let imageDefault = await Image.findOne({where: {id_ads: otherData[i].id, default: true}}) as ImageInstace

                if(imageDefault){
                    image = `${process.env.SERVER_URLBASE}/media/${imageDefault.url}`
                }

                others.push({
                    id: otherData[i].id,
                    title: otherData[i].title,
                    price: otherData[i].price,
                    priceNegotiable: otherData[i].priceNegotiable,
                    image
                })
            }
        }
    }

    return res.json({
        id: ads.id,
        title: ads.title,
        price: ads.price,
        priceNegotiable: ads.priceNegotiable,
        description: ads.description,
        dateCreated: ads.dateCreated,
        views: ads.views,
        images: urls,
        category,
        userInfo: {
            name: adUser?.name,
            email: adUser?.email
        },
        stateName: state?.name,
        others        
    })
}
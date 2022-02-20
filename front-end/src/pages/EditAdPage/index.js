import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { requestApi } from '../../helpers/Requests';

import Header from '../../components/partials/Header';
import { PageArea } from './styled';

const EditAdPage = () => {
    const {id} = useParams()
    const fileField = useRef()

    const [adInfos, setAdInfos] = useState({})
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])

    const [title, setTitle] = useState('')
    const [id_state, setIdState] = useState('')
    const [id_category, setIdCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState('')
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadAd = async () => {
            let ad = await requestApi.adItem(id)
            setAdInfos(ad)
        }

        loadAd()
    }, [update])

    useEffect(() => {
        const loadStates = async () => {
            let allStates = await requestApi.states()
            setStates(allStates.states)
        }

        const loadCategories = async () => {
            let cats = await requestApi.categories()
            setCategories(cats.categories)
        }

        loadStates()
        loadCategories()
    }, [])

    const handleClickEditAd = async () => {
        const body = new FormData()
        if(title){ body.append('title', title) }
        if(id_state){ body.append('id_state', id_state) }
        if(id_category){ body.append('id_category', id_category) }
        if(price){
            let priceFormated = price.replace(/\./g, '')
            priceFormated = priceFormated.replace(',', '.')
            body.append('price', priceFormated) 
        }
        if(priceNegotiable){ body.append('priceNegotiable', priceNegotiable) }
        if(description){ body.append('description', description) }
        setDisabled(true)

        const json = await requestApi.editAd(id, body)

        if(json.error){
            setDisabled(false)
            alert(`Erro: ${json.error}`)
            return
        } else{
            setUpdate(!update)
            setTitle('')
            setIdState('')
            setIdCategory('')
            setPrice('')
            setPriceNegotiable('')
            setDescription('')
            setDisabled(false)
            alert('Anúncio Alterado Com Sucesso!')
            return
        }
    }

    const handleClickAdImages = async () => {
        const body = new FormData()
        setDisabled(true)
        setLoading(true)

        if(fileField.current.files.length > 0) {
            for(let i=0; i < fileField.current.files.length; i++){
                body.append('images', fileField.current.files[i])
            }

            const json = await requestApi.editAd(id, body)

            if(json.error) {
                setDisabled(false)
                setLoading(false)
                alert(`Erro: ${json.error}`)
                return
            } else {
                setUpdate(!update)
                setLoading(false)
                setDisabled(false)
                fileField.current.value = ""
                alert('Imagens enviada com sucesso!')
                return
            }
        } else {
            setDisabled(false)
            setLoading(false)
            return alert('Não há imagens!')
        }
    }

    const handleDefaultOff = async (id_image) => {
        const body = new FormData()
        body.append('id_image', id_image)
        body.append('isDefault', false)

        const json = await requestApi.editAd(id, body)

        if(json.error){
            alert(`Erro: ${json.error}`)
            return
        } else{
            setUpdate(!update)
            return
        }
    }

    const handleDefaultOn = async (id_image) => {
        const body = new FormData()
        body.append('id_image', id_image)
        body.append('isDefault', true)

        const json = await requestApi.editAd(id, body)

        if(json.error){
            alert(`Erro: ${json.error}`)
            return
        } else{
            setUpdate(!update)
            return
        }
    }

    const handleClickDelete = async (id_image) => {
        let confirm = window.confirm('Confirmar exclusão da imagem?')
        if(confirm){
            const json = await requestApi.deleteImage(id_image)

            if(json.error){
                alert(`Erro: ${json.error}`)
                return
            } else {
                setUpdate(!update)
                alert('Imagem deletada com sucesso!')
                return
            }
        }
    }

    const priceMask = createNumberMask({
        prefix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        integerLimit: 10
    })

    const priceRender = (price) => {
        let priceForm = price.toLocaleString('pt-Br', {minimumFractionDigits: 2})
        return priceForm
    } 

    return (
        <>
            <Header/>

            <PageArea>
                <h2>Editar Anúncio</h2>
                
                <div className='form'>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">{adInfos.title}</div>
                        <div className="area--title">Novo Título</div>
                        <div className="area--input">
                            <input 
                                type='text'
                                placeholder="Digite o título..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={disabled}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">{adInfos.stateName}</div>
                        <div className="area--title">Novo Estado</div>
                        <div className="area--input">
                            <select
                                value={id_state}
                                onChange={(e) => setIdState(e.target.value)}
                                disabled={disabled}
                            >
                                <option disabled value=''></option>
                                {states && states.map((item, index) => {
                                    return (
                                        <option 
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">{adInfos.category ? `${adInfos.category.name}` : ''}</div>
                        <div className="area--title">Nova Categoria</div>
                        <div className="area--input">
                            <select
                                value={id_category}
                                onChange={(e) => setIdCategory(e.target.value)}
                                disabled={disabled}
                            >
                                <option disabled value=''></option>
                                {categories && categories.map((item, index) => {
                                    return (
                                        <option 
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </label>                    
                                
                    <label className="area">
                         <div className="area--title">Preço</div>
                         <div className="area--input">R$ {adInfos.price ? `${priceRender(Number (adInfos.price))}` : ''}</div>
                         <div className="area--title">Novo Preço</div>
                         <div className="area--input">
                             <MaskedInput 
                                placeholder="R$"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                disabled={disabled}
                                mask= {priceMask}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">{adInfos.priceNegotiable === true ? 'Sim' : 'Não'}</div>
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <select
                                value={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.value)}
                                disabled={disabled}
                            >
                                <option disabled value=''></option>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>                                
                            </select>
                        </div>
                    </label>
                            
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">{adInfos.description}</div>
                        <div className="area--title">Nova Descrição</div>
                        <div className="area--input">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={disabled}
                            >
                            </textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--title"></div>
                        <div className="area--title"></div>
                        <button onClick={() => handleClickEditAd()}>Editar Anúncio</button>
                    </label>
                </div>
            </PageArea>

            <PageArea>
                <h2>Imagens do Anúncio</h2>

                <div className='form'>
                    <label className="area">
                        <div className="area--title">Adicionar Novas Imagens</div>
                        <div className="area--input">
                            <input 
                                type='file'
                                multiple
                                disabled={disabled}
                                ref={fileField}
                            />                                
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <button onClick={() => handleClickAdImages()}>Adicionar Imagens</button>
                    </label>

                    {loading && 
                        <label className="area">
                            <div className="area--title"></div>
                            <p>Aguarde! Carregando Imagens...</p>
                        </label>
                    }               
                    
                </div>
                
                
                <div className='img--container'>
                    {adInfos.images && adInfos.images.map((i,k) => {
                        return (
                            <div className='img--area'>
                                <img key={k} src={i.url} alt='imagem'/>
                                <div className='default'>
                                    <span>Imagem Padrão: </span>
                                    <small>{i.default ? 'Sim' : 'Não'}</small>
                                    {i.default ? 
                                        <button onClick={() => handleDefaultOff(i.id)}>X</button> 
                                        : 
                                        <button onClick={() => handleDefaultOn(i.id)}>&#10003;</button>}
                                </div>
                                <div className='del'>
                                    <button onClick={() => handleClickDelete(i.id)}>Deletar Imagem</button>
                                </div>
                                 
                            </div>
                        )
                    })}
                </div>                    
            
                
            </PageArea>
        </>
    )
}

export default EditAdPage;
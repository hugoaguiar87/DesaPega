import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Header from "../../components/partials/Header";
import { requestApi } from "../../helpers/Requests";
import { PageArea, ErrorMessage } from "./styled";

const CreatedAdPage = () => {
    const fileField = useRef()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [id_category, setIdCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [description, setDescription] = useState('')
    const [id_state, setIdState] = useState('')

    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        const loadStates = async () => {
            let allStates = await requestApi.states()

            setStates(allStates.states.sort((a,b) => {
                if(a.name > b.name){
                    return 1
                } else {
                    return -1
                }
            }))
        }

        loadStates()
    }, [])

    useEffect(() => {
        const loadCat = async () => {
            let allCats = await requestApi.categories()
            setCategories(allCats.categories)
        }
        loadCat()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')
        let errors = []

        if(!title.trim()){
            errors.push('Sem título!')
        }

        if(!id_category){
            errors.push('Sem categoria!')
        }

        if(errors.length === 0){
            const body = new FormData()
            let priceFormated = price.replace(/\./g, '')
            priceFormated = priceFormated.replace(',', '.')

            body.append('title', title)
            body.append('id_category', id_category)
            body.append('price', priceFormated)
            body.append('priceNegotiable', priceNegotiable)
            body.append('description', description)
            body.append('status', true)
            body.append('id_state', id_state)

            if(fileField.current.files.length > 0){
                for(let i=0; i < fileField.current.files.length; i++){
                    body.append('images', fileField.current.files[i])
                }
            }
            
            const json = await requestApi.createAd(body)
            
            if(!json.error){
               return navigate(`/ads/${json.id}`)

            } else {
                setError(json.error)
            }

        } else {
            setError(errors.join("\n"))
        }

        setDisabled(false)
    }

    const priceMask = createNumberMask({
        prefix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        integerLimit: 10
    })

    return (
        <div>
            <Header/>

            <PageArea>
                <h1>Postar Novo Anúncio</h1>

                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input 
                                type='text'
                                placeholder="Digite o título..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                value={id_state}
                                onChange={(e) => setIdState(e.target.value)}
                                disabled={disabled}
                                required
                            >
                                <option disabled value=''>Selecione o seu estado...</option>
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
                        <div className="area--input">
                            <select
                                value={id_category}
                                onChange={(e) => setIdCategory(e.target.value)}
                                disabled={disabled}
                                required
                            >
                                <option disabled value=''>Selecione uma categoria...</option>
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
                        <div className="area--input">
                            <MaskedInput 
                                placeholder="R$"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                disabled={disabled}
                                mask= {priceMask}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--checkbox">
                            <input 
                                type='checkbox'
                                checked={priceNegotiable}
                                onChange={() => setPriceNegotiable(!priceNegotiable)}
                                disabled={disabled}
                            />
                        </div>
                    </label>
                            
                    <label className="area">
                        <div className="area--title">Descrição</div>
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
                        <div className="area--title">Imagens (1 ou mais)</div>
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
                        <button>Adicionar Anúncio</button>    
                    </label>
                </form>
            </PageArea>
        </div>
    )
}

export default CreatedAdPage;
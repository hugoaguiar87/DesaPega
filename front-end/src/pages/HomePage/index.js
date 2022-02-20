import React, { useEffect, useState } from "react";

import { requestApi } from "../../helpers/Requests.js";

import Header from "../../components/partials/Header/index.js";
import { AdsArea, SearchArea } from "./styled.js";
import { Link } from "react-router-dom";
import AdItem from "../../components/partials/AdItem/index.js";


const HomePage = () => {
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [ adsList, setAdsList] = useState([])

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
        const loadCategories = async () => {
            let allCat = await requestApi.categories()

            setCategories(allCat.categories)
        }

        loadCategories()
    }, [])

    useEffect(() => {
        const loadAds = async () => {
            let allAds = await requestApi.adsList()
            let adsHome = []

            allAds.adsList.sort((a, b) => {
                if(a.id > b.id){ 
                    return -1
                } else {return 1}
            }).map((item, index) => {
                if(index < 8){
                    adsHome.push(item)
                }
                return item
            })

            setAdsList(adsHome)
        }

        loadAds()
    }, [])
    
    return(
        <>
            <Header/>

            <SearchArea>
                <div className="search--container">
                    <div className="search--box">
                        <form method="GET" action="/ads">
                            <input 
                                placeholder="O que você procura?"
                                name="q"
                                type='text'
                            />
                            <select name="state" >
                                <option disabled selected value=''>Selecione o estado...</option>
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
                            <button>Pesquisar</button>
                        </form>
                    </div>

                    <div className="search--list">
                        {categories && categories.map((item) => {
                            return (
                                <Link key={item.id} to={`/ads?cat=${item.id}`} className='categories'>
                                    <img src={item.image} alt={item.name} />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}                        
                    </div>
                </div>
            </SearchArea>

            <AdsArea>
                <div className="ads--container">
                    <h2>Anúncios Recentes</h2>
                    <div className="ads--list">
                        {adsList && adsList.map((item, index) => {
                            return(
                                <div>
                                    <AdItem key={index} ad={item} />
                                </div>
                            )                             
                        })}
                    </div>
                    <div className="seeAll">
                        <Link to='/ads'>Ver Todos &gt;&gt; </Link>
                    </div>
                    <hr/>
                    <p>O DesaPega é um site de anúncios de compra e venda independente. Criado por Hugo Aguiar, com o propósito de
                        colocar em prática seus conhecimentos adquiridos. O site tem fins educacionais, não funcionando de forma efetiva.
                        Os anúncios aqui presentes são fictícios. Fique a vontade para testar o funcionamento da aplicação.
                        Contribua com esse projeto <a href="https://github.com/hugoaguiar87/DesaPega" target="_blank" rel="noreferrer">CLICANDO AQUI</a>
                        &nbsp;e dê uma "star" no projeto. Obrigado!
                    </p>
                </div>
            </AdsArea>

            
        </>
    )
}

export default HomePage;
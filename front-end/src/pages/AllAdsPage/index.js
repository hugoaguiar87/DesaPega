import React, { useState, useEffect } from 'react';
import { SearchArea, AdsArea, PageArea } from './styled';

import { requestApi } from '../../helpers/Requests';

import Header from '../../components/partials/Header'
import AdItem from '../../components/partials/AdItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paginate } from '../../components/Paginate';

const AllAdsPage = () =>{
    const urlParams = useLocation()
    const useQueryString = () => {
        return new URLSearchParams(urlParams.search)
    }
    const query = useQueryString()
    const navigate = useNavigate()

    const [q, setQ] = useState( query.get('q') !== null ? query.get('q') : '' )
    const [state, setState] = useState( query.get('state') !== null ? query.get('state') : '' )
    const [cat, setCat] = useState( query.get('cat') !== null ? query.get('cat') : '' )

    const [statesList, setStatesList] = useState([])
    const [categories, setCategories] = useState([])
    const [adsList, setAdsList] = useState([])
    const [loading, setLoading] = useState(false)

    const [current, setCurrent] = useState(1)

    useEffect(() => {
        let queryString = []
        if(q){
            queryString.push(`q=${q}`)
        }
        if(state){
            queryString.push(`state=${state}`)
        }
        if(cat){
            queryString.push(`cat=${cat}`)
        }

        navigate(`?${queryString.join('&')}`)
    }, [q, cat, state])

    useEffect(() => {
        const loadStates = async () => {
            let allStates = await requestApi.states()

            setStatesList(allStates.states.sort((a,b) => {
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
        setLoading(true)
        const loadAds = async () => {
            let allAds = await requestApi.adsList()

            setAdsList(allAds.adsList)
            setLoading(false)
        }

        loadAds()
    }, [])

    const adsRender = adsList.filter((i) => {
            if(i.title.toLowerCase().includes( q.toLowerCase() )){ return true }
            else{ return false }
        })
        .filter((i) => {
            if(!state){ return true }
            else if( state && (i.state == state) ) { return true }
            else {return false}
        })
        .filter((i, k, array) => {
            if(!cat){
                return true
            }
            else if(cat && i.category == cat) {
                return true
            }
            else{ return false}
        })

    const renderAdsList = () => {
        const adsRenderPaginated = adsRender.filter((i, k) => {
            const min = (current-1)*9
            const max = current*9

            if((k+1) > min && (k+1) <= max){ return true }
        })
        
        return(
            <div className='ads-list'>

                {adsRender.length !== 0 && adsRenderPaginated.map((i, k) => {
                    return (
                        <div>
                            <AdItem key={k} ad={i} />                         
                        </div>
                    )
                })}

                {!loading && (adsRender.length === 0) && 
                    <div className='loading'>Resultado não encontrado</div>
                }

            </div>
        )
    }

    return (
        <>
            <Header />

            <PageArea>
                <SearchArea>
                    <form method='GET'>
                        <input 
                            name='q'
                            type='text'
                            placeholder='O que você procura...'
                            value={q}
                            onChange={ (e) => setQ(e.target.value) }
                        />

                        <div className='filterName'>Estado:</div>
                        <select name='state' value={state} onChange={ e => setState(e.target.value) }>
                            <option value='' disabled selected> </option>
                            {statesList && statesList.map((i, k) => {
                                return(
                                    <option key={k} value={i.id}>{i.name}</option>
                                )
                            })}
                        </select>
                        
                        <div className='filterName'>Categorias:</div>
                        <ul>
                            {categories && categories.map((i, k) => {
                                return(
                                    <li 
                                        key={k} 
                                        className={cat == i.id ? 'categoryItem active' : 'categoryItem'}
                                        onClick={() => setCat(i.id)}
                                    >
                                        <img src={i.image} alt={i.slug}/>
                                        <span>{i.name}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </form>
                </SearchArea>

                <AdsArea>
                    <h2>Resultados</h2>
                    {loading && <div className='loading'>Carregando...</div>}
                    {renderAdsList()}
                    {adsRender.length > 9 &&
                        <Paginate 
                            records= {adsRender.length}
                            limit= {9}
                            current={current}
                            onChange={setCurrent}
                            delta={1}
                            fixed={1}
                        />
                    }
                </AdsArea>
            </PageArea>
            
        </>
    )
}

export default AllAdsPage;
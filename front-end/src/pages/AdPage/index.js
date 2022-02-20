import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";

import Header from '../../components/partials/Header';
import AdItem from '../../components/partials/AdItem'
import { requestApi } from '../../helpers/Requests';
import { PageArea, Fake } from './styled';

const AdPage = () => {
    const {id} = useParams()

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState({})

    useEffect(() => {
        const loadAd = async (id) => {
            let infos = await requestApi.adItem(id, true)
            setAdInfo(infos)
            setLoading(false)            
        }
        loadAd(id)
    }, [id])

    const formatData = (data) => {
        let cDate = new Date(data)
        const day = cDate.getDate()
        const month = cDate.getMonth()
        const year = cDate.getFullYear()

        const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

        return `${day} de ${months[month]} de ${year}`
    }

    const priceRender = (price) => {
        let priceForm = price.toLocaleString('pt-Br', {minimumFractionDigits: 2})
        return priceForm
    }

    return (
        <>
            <Header/>
            
            <PageArea>
                <div className='container'>
                    <div className='left'>
                        <div className='box--image'>
                            {loading && <Fake height={300}/>}
                            {adInfo.images && 
                                <Slide>
                                    {adInfo.images.map((img, key) => {
                                        return(
                                            <div key={key} className='slide--imgs'>
                                                <img src={img.url} alt='Fotos'/>
                                            </div>
                                        )
                                    })}
                                </Slide>
                            }
                        </div>
                        <div className='box--infos'>
                            <div className='box--title'>
                                {loading && <Fake/>}
                                {adInfo.title && 
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated && 
                                    <small>Criado em: {formatData(adInfo.dateCreated)}</small>
                                }
                                
                            </div>
                            <div className='box--description'>
                                {loading && <Fake height={150}/>}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views && 
                                    <small>Visualizações: {adInfo.views}</small>
                                }                            
                            </div>
                        </div>
                    </div>

                    <div className='rigth'>
                        <div className='box'>
                            {loading && <Fake/>}
                            {adInfo.price && 
                                <div className='price'>
                                    <section>Preço:</section>
                                    <h3>R$ { priceRender(Number (adInfo.price))}</h3>
                                </div>
                            }
                        </div>
                        {adInfo.userInfo && 
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' rel='noreferrer' className='link--'>
                                Fale com o vendedor
                            </a>
                        }
                        <div className='box'>
                            {loading && <Fake />}
                            {adInfo.userInfo && 
                                <div className='user--infos'>
                                    <section>Criado por: <strong>{adInfo.userInfo.name}</strong></section>
                                    <small>Email: {adInfo.userInfo.email}</small>
                                    <small>Estado: {adInfo.stateName}</small>
                                </div>
                            }
                        </div>
                    </div>

                </div>

                {adInfo.others && 
                    <>
                        <h3 className='h3'>Outras ofertas deste vendedor</h3>
                        {adInfo.others.filter((i,k) => {
                            if(k<4) {return i}
                        })
                        .map((i, k) => {
                            return(
                                <div key={k} className='other--item'>
                                    <AdItem ad={i}/>
                                </div>
                            )
                        })}    
                    </>
                }
            </PageArea>
        </>
    )
}

export default AdPage;
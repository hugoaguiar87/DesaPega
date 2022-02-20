import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { requestApi } from "../../helpers/Requests";
import { PageArea, EditUserModal, ErrorMessage } from "./styled";

import Header from "../../components/partials/Header";
import Modal from '../../components/Modal';

const MyAccountPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [modalEditUser, setModalEditUser] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            let infos = await requestApi.userInfos()
            setUser(infos)
            setName(infos.name)
            setEmail(infos.email) 
        }

        loadUser()
    }, [update])


    const editUser = () => {
        const handleSubmit = async () => {
            setDisabled(true)
            setError('')
            let json

            if(newPassword){
                if(newPassword === confirmPassword){
                    json = await requestApi.editUser(newEmail, name, newPassword)

                    if(json.error){
                        setError(json.error)
                        setDisabled(false)
                        return
                    } else{
                        setModalEditUser(false)
                        setUpdate(!update)
                        setDisabled(false)
                        setNewEmail('')
                        setNewPassword('')
                        setConfirmPassword('')
                        return
                    }
                } else{
                    setError('Senhas diferentes!')
                    setDisabled(false)
                    return
                }
            }

            json = await requestApi.editUser(newEmail, name)
            if(json.error){
                setError(json.error)
                setDisabled(false)
                return
            } else {
                setModalEditUser(false)
                setUpdate(!update)
                setDisabled(false)
                setNewEmail('')
                return
            }            
        }

        return(
            <EditUserModal>
                {modalEditUser ? 
                    <Modal onClose={() => setModalEditUser(false)}>
                        <h2>Editar Usuário</h2>
                        {error && 
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <div className="form">
                            <label className="modal--form--area">
                                <div className="modal--form--title">Nome: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='text'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Email: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Novo Email: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='email'
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Nova Senha: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='password'
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Confirmar Nova Senha: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title"></div>
                                <button onClick={handleSubmit}>Alterar</button>
                            </label>
                        </div>
                    </Modal> 
                    : null
                }
            </EditUserModal>            
        )
    }

    const handleStatusOn = async(id) => {
        const body = new FormData()
        body.append('status', true)
        
        const json = await requestApi.editAd(id, body)

        if(json.error){
            alert(`Erro: ${json.error}`)
            return 
        } else{
            setUpdate(!update)
            return
        }
    }

    const handleStatusOff = async(id) => {
        const body = new FormData()
        body.append('status', false)

        const json = await requestApi.editAd(id, body)

        if(json.error){
            alert(`Erro: ${json.error}`)
            return 
        } else{
            setUpdate(!update)
            return
        }
    }

    return(
        <>
            <Header/>
            
            <PageArea>
                <h2>Dados do Usuário</h2>
                <div className="infos">
                    <label className="area">
                        <div className="area--title">Nome:</div>
                        <div className="area--info">{user.name}</div>
                    </label>

                    <label className="area">
                        <div className="area--title">Email:</div>
                        <div className="area--info">{user.email}</div>
                    </label>
                    
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--info">{user.state}</div>
                    </label>

                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--info">
                            <button 
                                className="info--button" 
                                onClick={() => setModalEditUser(true)}
                            >
                                Alterar Dados
                            </button>
                        </div>
                    </div>
                </div>

                <h2>Meus Anúncios</h2>
                <div className="allAds">
                    {user.ads && user.ads.map((i, k) => {
                        return (
                            <div className={i.status ? "ad--container" : 'inactive'}>
                                <span  onClick={() => navigate(`/ads/${i.id}`)}>{i.title}</span>
                                {i.status && <button onClick={() => handleStatusOff(i.id)}>Desativar</button>}
                                {!i.status && <button onClick={() => handleStatusOn(i.id)}>Ativar</button>}
                                <button onClick={() => navigate(`/my-account/edit/${i.id}`)}>Editar</button>
                            </div>
                        )
                    })}
                </div>
            </PageArea>

            {editUser()}
        </>
    )
}

export default MyAccountPage;
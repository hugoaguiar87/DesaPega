import React, { useState, useEffect } from "react";

import Header from "../../components/partials/Header";
import { doLogin } from "../../helpers/AuthHandler";
import { requestApi } from "../../helpers/Requests";
import { PageArea, ErrorMessage } from "./styled";

const SingUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [state_id, setStateId] = useState('')
    const [states, setStates] = useState([])
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        if(password !== confirmPassword){
            setDisabled(false)
            return setError('Senhas diferentes!')
        }

        const json = await requestApi.register(email, password, state_id, name)
        
        if(json.error){
            setError(json.error)
        } else {
            doLogin(json.token)
            window.location.href = '/'
        }

        setDisabled(false)
    }

    return (
        <div>
            <Header/>

            <PageArea>
                <h1>Cadastrar</h1>

                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input 
                                type='text'
                                placeholder="Digite seu nome..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                value={state_id}
                                onChange={(e) => setStateId(e.target.value)}
                                disabled={disabled}
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
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input 
                                type='email'
                                placeholder="Digite seu email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type='password'
                                placeholder="Digite sua senha..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength= {6}
                                disabled={disabled}
                                required    
                            />
                        </div>
                    </label>
                            
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type='password'
                                placeholder="Digite sua senha novamente..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={disabled}
                                required    
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <button>Cadastrar</button>    
                    </label>
                </form>
            </PageArea>
        </div>
    )
}

export default SingUpPage;
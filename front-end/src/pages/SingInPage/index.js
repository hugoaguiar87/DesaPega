import React, { useState } from "react";

import Header from "../../components/partials/Header";
import { doLogin } from "../../helpers/AuthHandler";
import { requestApi } from "../../helpers/Requests";
import { ErrorMessage, PageArea } from "./styled";

const SingInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        const json = await requestApi.login(email, password)

        if(json.error){
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)
            window.location.href = '/'
        }

        setDisabled(false)
    }

    return(
        <div>
            <Header/>
    
            <PageArea>
                <h1>Login</h1>

                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite seu email..."
                                type='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                disabled= {disabled}
                                required 
                            /> 
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite sua senha..." 
                                type='password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled= {disabled} 
                                required   
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input--checkbox">
                            <input 
                                type='checkbox' 
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}
                                disabled= {disabled}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <button disabled= {disabled}>Entrar</button>
                    </label>
                </form>
            </PageArea>
        </div>

    )
}


export default SingInPage;
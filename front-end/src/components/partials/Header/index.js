import React from "react";
import { Link } from "react-router-dom";
import { HeaderArea } from "./styled";

import { doLogout, isLogged } from "../../../helpers/AuthHandler";

const Header = () => {
    let logged = isLogged()

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return(
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <span className="logo--1">Desa</span>
                        <span className="logo--2">Pega</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged && 
                            <>
                                <li>
                                    <Link to='/my-account'>Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to='/post-ad' className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }

                        {!logged && 
                            <>
                                <li>
                                    <Link to='/singin'>Login</Link>
                                </li>
                                <li>
                                    <Link to='/register'>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to='/singin' className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }                        
                    </ul>
                </nav>                
            </div>
        </HeaderArea>
    )
}

export default Header;
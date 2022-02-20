import styled from 'styled-components';

export const HeaderArea = styled.div`
    background-color: white;
    height: 60px;
    border-bottom: 1px solid #CCC;

    a{
        text-decoration: none;
    }

    .container{
        max-width: 1024px;
        margin: auto;
        display: flex;
        height: 100%;
    }

    .logo{
        flex: 1;
        display: flex;
        align-items: center;

        .logo--1, .logo--2 {
            font-size: 27px;
            font-weight: bold;
            font-style: italic;
        }

        .logo--1{
            color: #41B5D9;
        }

        .logo--2 {
            color: #BE54F0;
        }
    }

    nav{
        padding: 10px 0;
        
        ul, li{
            margin: 0;
            padding: 0;
            list-style:none;
        }

        ul{
            display: flex;
            height: 100%;
            align-items: center
        }

        li{
            margin: 0 15px;
            
            a, button{
                color: black;
                font-size: 14px;
                background: none;
                border: 0;
                cursor: pointer;
                
                &:hover{
                    color: #999;
                }

                &.button{
                    background-color: #FF8100;
                    border-radius: 4px;
                    color: white;
                    padding: 4px 10px;
                }

                &.button:hover{
                    background-color: #E57706
                }
            }

            
        }

    }

    @media (max-width: 700px) {
        height: auto;

        .container {
            flex-direction: column;
        }

        .logo{
            justify-content: center;
            margin: 10px 0;
        }

        nav ul{
            flex-direction: column;

            li{
                margin-bottom: 10px;
            }
        }
    }
`
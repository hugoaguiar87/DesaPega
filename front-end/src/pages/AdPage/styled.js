import styled from 'styled-components';

export const PageArea = styled.div`
    max-width: 1024px;
    margin:auto;


    .container{
        display: flex;
        margin: 15px 0;
    }

    .left{
        flex: 1;
        background-color: white;
        border: 1px solid #DDD;
        border-radius: 5px;
        box-shadow: 0px 0px 2px #999;
        margin-right: 15px;

        display: flex;
    }

    .box--infos{
        margin-left: 15px;
        flex: 1;
        padding: 5px;
    }

    .box--title{
        margin-bottom: 30px;
        h2{
            margin: 0; 
        }

        small{
            color: #999;
        }
    }

    .box--description {
        small{
            color: #999;
        }
    }

    .box--image{
        width: 320px;
        height: 320px;

        .slide--imgs{
            display: flex;
            height: 320px; 
        }
    }

    .rigth{
        .box{
            background-color: white;
            width: 300px;
            border: 1px solid #DDD;
            border-radius: 5px;
            box-shadow: 0px 0px 2px #999;
            margin-bottom: 15px;
            padding: 10px;
            
            .price {
                h3{
                    font-size: 27px;
                    margin: 0;
                    color: blue;
                }
            }
        }

        a{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            background-color: #0000FF;
            height: 30px;
            color: #FFF;
            box-shadow: 0px 0px 4px #999;
            border-radius: 5px;
            margin-bottom: 10px;
            text-decoration: none;
        }

        .user--infos{
            display: flex;
            flex-direction: column;

            section, small {
                margin-bottom: 5px;
            }

            small{
                color: #999;
            }
        }
    }

    .other--item{
        display: inline-block;
    }

    @media (max-width: 700px) {
        .container{
            flex-direction: column;
            margin-left: 10px;
            /* margin-right: 10px; */
        }

        .left{
            flex-direction: column;
            align-items: center;
            margin-bottom: 15px;
            
            .box--infos{
                align-self: flex-start;
                margin-bottom: 15px;
            }
        }

        .rigth {
            margin-right: 15px;
            .box{
                width: 100%;
            }

            .link--{
                width: 100%;
            }
        }

        .h3{
            text-align:center;
            font-size: 20px;
        }

        .other--item{
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
        }
    }

`

export const Fake = styled.div`
    background-color: #DDD;
    height: ${props => (props.height || 30)}px;
   
`
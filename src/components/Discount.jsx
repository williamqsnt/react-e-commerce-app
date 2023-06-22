import styled from "@emotion/styled"


const Discount = () => {

    return(
        <Container>
            <div>
                <p>Bénéficiez de -20% <br/>avec le code WILLI20</p>
                <button>Buy Now</button>
            </div>
        </Container>
    )

}

export default Discount;


const Container = styled.div`
    background-color : #F5F5DC;
    padding : 2em 4em;
    margin : 0 4em 1em 4em;



    p{
        font-size : 50px;
        font-weight : bolder;
        color : darkgreen;
    }
    button{
        background-color : green;
        color : white;
        border : none;
        padding : 1em 2em; 
        margin-bottom : 2em;
        border-radius : 50px;
        font-size : 20px;
    }
`
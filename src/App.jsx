import { useEffect, useState } from "react"
import Card from "./components/card"
import GameHeader from "./components/GameHeader"



const cardValues = [
  "🏎️",
  "🚗",
  "🚕",
  "🚙",
  "🚓",
  "🚑",
  "🚒",
  "🚚",
  "🏎️",
  "🚗",
  "🚕",
  "🚙",
  "🚓",
  "🚑",
  "🚒",
  "🚚"
]


function App() {

  const [cards, setCards] = useState([]);

  const initializeGame = () => {
    //Shuffle cards

    // Adding more info to the card
    const finalCards = cardValues.map((value, index) =>(
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }
    ));

    // populando a variavel de estado cards[] com o finalCards[]
    setCards(finalCards);

  }


  //This is a Hook(like state hooks) to run a function when the component renders
  useEffect(()=>{
    initializeGame();
  }, []) // only render once, with the empty array[]


  const handleCardClick = (card)=>{
  
    //I dont allow clickig if card is already flipped or Mateched
    if(card.isFlipped || card.isMatched){
      return ;
    }

    // Updated the card flip State
    const newCards = cards.map((c) => {
      
      if(c.id == card.id){
      
        return {...c, isFlipped: true}; // Maintain all the properties equal.Only change isFlipped
      }else{
        return c;
      }
    })

    setCards(newCards);


  };

  return (
    <div className="app">

        <GameHeader statsResult = {{ score: 10, moves: 6 }} />
        
        <div className="cards-grid">
          
          {cards.map((card)=>
          //The map , has to be on the new generated cards[] state variable!
            <Card card={card} onClick={handleCardClick}/>
          )}
        </div>


    </div>
  )
}

export default App

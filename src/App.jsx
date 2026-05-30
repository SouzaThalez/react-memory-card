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
  //Keeps track of the two items that are flipped
  // It only has lenght of 0 to 1 
  const [flippedCards, setFlippedCards] = useState([]);
  //Keeps track of matched cards
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);  

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
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);

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

    const newFLippedCards = [...flippedCards, card.id];
    setFlippedCards(newFLippedCards);

    //Check for a match if two cards a fliped
    if (flippedCards.length == 1) {
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value == card.value) {
       
        setTimeout(() => {

          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
        
          // Updated the card mateched State
          const newMatchedCards = cards.map((c) => {
            if(c.id == card.id || c.id == firstCard.id){
              return {...c, isMatched: true}; // Maintain all the properties equal.Only change matched
            }else{
              return c;
            }
          })

          setCards((prev)=>
              prev.map((c) => {
                if(c.id == card.id || c.id == firstCard.id){
                  return {...c, isMatched: true};// Maintain all the properties equal.Only change matched
                }else{
                  return c;
                }
            }),
          
          );

          setFlippedCards([]);
          

        }, 500);

      }else{

        setTimeout(()=>{

          const flippedBackCard = newCards.map((c)=>{
            if (newFLippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false};
            }else{
              return c; 
            }
          });
          setCards(flippedBackCard);
          setFlippedCards([]);
        },1000)

      }
    }

    setMoves((prev) => prev + 1);

  };

  return (
    <div className="app">

        <GameHeader statsResult = {{ score: score, moves: moves}} onReset={initializeGame} />
        
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

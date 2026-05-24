function Card({card, onClick}: any){
    return(
        <div className={`card ${card.isFlipped ? "flipped": ""}`} 
             onClick={()=> onClick(card)}
             key={card.id}>
            <div className="card-front">?</div>
           <div className="card-back">{card.value}</div>
        </div>
    )
}

export default Card;
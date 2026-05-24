type Stats = {
    score: number;
    moves: number;
}

type GameHeaderProps = {
    statsResult: Stats;
}

function GameHeader({ statsResult }: GameHeaderProps) {

    return (
        <div className="game-header">
            <h1>Memory card game</h1>

            <div className="stats">

                <div className="stat-item">
                    <span className="stat-label">Score:</span>
                    <span className="stat-value">
                        {statsResult.score}
                    </span>
                </div>

                <div className="stat-item">
                    <span className="stat-label">Moves:</span>
                    <span className="stat-value">
                        {statsResult.moves}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default GameHeader;
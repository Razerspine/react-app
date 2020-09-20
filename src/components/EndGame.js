import React from "react";

export class EndGame extends React.Component {
    constructor(props) {
        super(props);
    }

    initMessage() {
        return (
            <div className={'text-caption'}>
                <h2 className="text-caption__title">Congratulations!</h2>
                <p className={"text-caption__description"}>
                    You completed the quiz and scored
                    <span className={'text-caption__count'}>{this.props.score}</span>
                    out of 30 possible points
                </p>
            </div>
        )
    }

    render() {

        const {score, restartGame} = this.props;

        this.initMessage();

        if(score === 30) {
            return (
                <div className="content-block">
                    {this.initMessage()}
                    <button
                        className="btn-secondary"
                        onClick={restartGame}>
                        Try again!
                    </button>
                </div>
            )
        } else {
            return (
                <div className="content-block">
                    {this.initMessage()}
                    <button className="btn-secondary" onClick={restartGame}>
                        Try again!
                    </button>
                </div>
            );
        }
    }
}

export default EndGame
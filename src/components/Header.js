import React from "react";

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const groupArray = document.querySelectorAll('.group-list__item');
        if(prevProps.groupId !== this.props.groupId && this.props.groupId <= 5) {
            groupArray[prevProps.groupId].classList.remove('active');
            groupArray[this.props.groupId].className += ' active';
        }
    }

    render() {
        const {groupId, score} = this.props;

        return (
            <div className="top-section">
                <div className="top-section__row">
                    <div className="logo">
                        <svg className={"logo__icon"}>
                            <use xlinkHref='#logo-app' />
                        </svg>
                        <span className={"logo__description"}>What is a Game?</span>
                    </div>
                    <div className={'top-section__field'}>Score: <span className="top-section__count">{score}</span></div>
                </div>
                <ul className="group-list">
                    <li className="group-list__item active">fighting</li>
                    <li className="group-list__item">horror</li>
                    <li className="group-list__item">racing</li>
                    <li className="group-list__item">rpg</li>
                    <li className="group-list__item">shooter</li>
                    <li className="group-list__item">slasher</li>
                </ul>
            </div>
        )
    }
}

export default Header
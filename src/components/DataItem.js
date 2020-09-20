import React from "react";
import ReactPlayer from "./ReactPlayer";

export class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {data, groupId, id, select, isLoaded} = this.props;
        let dataItem = {};

        const styleItem = {
            display: select ? 'block' : 'none'
        };
        const styleInstruction = {
            display: select ? 'none' : 'block'
        };

        if(isLoaded) {
            dataItem = data[groupId][id]
        }

        return (
            <div className={'data-wrapper'}>
                <div className={'data-wrapper__description'} style={styleInstruction}>
                    <h3>FAQ</h3>
                    <p>Listen to the soundtrack, choose a game from the list that suits you.</p>
                    <p>For each correct answer, the first time you get 5 points,</p>
                    <p>for the next wrong choice you get -1 point.</p>
                    <p>The maximum number of points that can be collected is 30 points.</p>
                    <p>Good luck!</p>
                </div>
                <div className={'item-wrapper'}>
                    <div id={`item_` + id} className={'data-item'} style={styleItem}>
                        <div className={'data-item__row'}>
                            <div className={'data-item__image-wrapper'}>
                                <img src={dataItem.image} className={'data-item__image'} alt={dataItem.name}/>
                            </div>
                            <div className={'data-item__container'}>
                                <p className={'data-item__title'}>{dataItem.name}</p>
                                <ReactPlayer src={dataItem.audio} />
                            </div>
                            <div className={'data-item__description'}>{dataItem.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataItem
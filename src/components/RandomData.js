import React from "react";
import ReactPlayer from "./ReactPlayer";
import coverImage from "../media/cover.jpg";

export class RandomData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, groupId, random, success, isLoaded} = this.props;
        let randomItem = {};

        if(isLoaded) {
         randomItem = data[groupId][random];
        }

        return (
            <div className={'random-item'}>
                <div className={'random-item__row'}>
                    <div className={'random-item__image-wrapper'}>
                        <img src={success ? randomItem.image : coverImage}
                             className={'random-item__image'} alt={success ? randomItem.name : 'image'}/>
                    </div>
                    <div className={'random-item__container'}>
                        <p className={'random-item__title'}>{success ? randomItem.name : '**********'}</p>
                        <ReactPlayer autoPlayAfterSrcChange={false} autoPlay={false} src={success ? '' : randomItem.audio} />
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomData
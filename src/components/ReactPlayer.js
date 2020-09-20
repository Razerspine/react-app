import React, {createRef} from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class ReactPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.player = createRef();
    }


    render() {
        return (
            <AudioPlayer
                className={"js-player"}
                showDownloadProgress={false}
                src={this.props.src}
                preload={"none"}
                autoPlayAfterSrcChange={false}
                onPlay={event => {
                    console.log(event.type);
                }}
                ref={this.player}
            />
        )
    }
}

export default ReactPlayer
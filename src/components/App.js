import React from "react";
import axios from "axios";
import Header from "./Header";
import RandomData from "./RandomData";
import DataList from "./DataList";
import DataItem from "./DataItem";
import EndGame from "./EndGame";
import AudioPlayer from "react-h5-audio-player";
import audioSuccess from "../media/success.mp3";
import audioError from "../media/error.mp3";
import UsersResult from "../services/UsersResult";


export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            random: 0,
            data: [],
            groupId: 0,
            id: 0,
            select: false,
            success: false,
            score: 0,
            step: 0,
            isLoaded: false,
            audio: null,
            endGroup: false
        }

        this.onSelectData = this.onSelectData.bind(this);
        this.getNextGroup = this.getNextGroup.bind(this);
        this.restartGame = this.restartGame.bind(this);

    }

    componentDidMount() {
        axios.post('https://7ltmyex6zg.execute-api.eu-central-1.amazonaws.com/v1/data')
            .then(response => {
                this.setState({
                    data: response.data.data,
                    random: this.randomData(),
                    isLoaded: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    randomData() {
        return Math.floor(Math.random() * 5);
    }

    onSelectData(id, event) {
        this.setState({
            id: id - 1,
            select: true
        });
        if (!event.target.classList.contains('success') && !event.target.classList.contains('error')) {
            this.setState((prevState) => ({
                step: prevState.step + 1
            }));
        }
        this.getSuccess(id);
        this.dataListStatus(event);
    }

    dataListStatus(event) {
        if (Number(event._targetInst.key) === this.state.random && !this.state.success) {
            event.target.classList.add('success');
            this.setState({
                success: true
            });
        } else if (Number(event._targetInst.key) !== this.state.random && !this.state.success) {
            event.target.classList.add('error');
            this.setState({
                success: false
            });
        }
    }

    getSuccess(id) {

        if (this.state.success) return;
        if (id - 1 !== this.state.random) {
            this.audioNotification(false);
        } else {
            this.setState((prevState) => ({
                score: prevState.score + 5 - this.state.step,
                success: true
            }));
            this.audioNotification(true);
        }
    }

    audioNotification(success) {
        const alertSuccess = audioSuccess;
        const alertError = audioError;

        if (success) {
            this.setState({
                alert: alertSuccess
            });
        } else {
            this.setState({
                alert: alertError
            });
        }
    }

    getNextGroup() {
        if (!this.state.success) return;
        if (this.state.groupId === 5) {
            this.setState({
                groupId: -1,
                endGroup: true
            });
        }
        this.setState((prevState) => ({
            random: this.randomData(),
            groupId: prevState.groupId + 1,
            select: false,
            success: false,
            step: 0
        }));
    }

    restartGame() {

        this.setState({
            score: 0,
            endGroup: false
        })
    }

    render() {
        const {random, data, id, select, success, score, groupId, endGroup, isLoaded} = this.state;

        if (endGroup) {
            return (
                <div className={'wrapper'}>
                    <div className={'container'}>
                        <EndGame score={score} restartGame={this.restartGame}>
                            <Header score={score} />
                        </EndGame>
                        <UsersResult points={score} isLoaded={isLoaded} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'wrapper'}>
                    <div className={'container'}>
                        <Header score={score} groupId={groupId}/>
                        <RandomData data={data} random={random} groupId={groupId}
                                    success={success} isLoaded={isLoaded}/>
                        <div className={'content'}>
                            <DataList isLoaded={isLoaded} onItemSelected={this.onSelectData} groupId={groupId}
                                      data={data}/>
                            <DataItem isLoaded={isLoaded} groupId={groupId} data={data} id={id}
                                      select={select}/>
                        </div>
                        <AudioPlayer style={{display: 'none'}}
                                     src={this.state.alert}
                                     autoPlay={true}
                                     autoPlayAfterSrcChange={true}
                                     preload={"auto"}
                                     onPlay={event => {
                                         this.setState({alert: null})
                                     }}
                        />
                        <button
                            disabled={success ? false : true}
                            className={"btn-primary"} onClick={this.getNextGroup}>
                            Next Level
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default App;
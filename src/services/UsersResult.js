import React from 'react';
import {FirebaseConfig} from './FirebaseConfig.js';

class UsersResult extends React.Component {

    constructor(pros) {
        super(pros);

        this.state = {
            name: '',
            score: this.props.points,
            userList: null,
            isLoaded: false,
            saveData: null,
            save: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    writeUserData() {
        return this.state.userList;
    }

    getUserData() {

        FirebaseConfig.database().ref('/user-data')
            .once('value')
            .then(snapshot => {

                let arrayList = [];

                snapshot.forEach(function (childSnapshot) {
                    let data = childSnapshot.val();

                    arrayList.push(data);
                });

                this.setState({
                    userList: arrayList
                })
            });
    }

    componentDidMount() {
        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userList !== this.state.userList) {
            this.writeUserData();

            this.setState({
                isLoaded: true
            })
        }
    }

    onChangeHandler(event) {

        this.setState({
            saveData: {
                name: event.target.value,
                score: this.props.points
            }
        })
    }

    submitHandler(event) {
        event.preventDefault();
        let userData = this.state.saveData;
        let renderData = this.state.userList;
        FirebaseConfig.database().ref('user-data').push(userData);

        let newData = Object.assign(renderData).concat(userData);

        this.setState({
            userList: newData,
            save: true
        })
    }

    render() {

        const {userList, isLoaded, save} = this.state;

        let data;

        if(isLoaded) {
            data = userList.map((item, key) => {
                return (
                    <div className={'user-content__row'} key={key}>
                        <div className={'user-content__col'}>{item.name}</div>
                        <div className={'user-content__col'}>{item.score}</div>
                    </div>

                )
            });
        }

        return (
            <div className={'user-content'}>
                <div className={'user-content__list'}>
                    <h3 className={'user-content__title'}>Users result lists</h3>
                    <div className={'user-content__caption'}>
                        <div className={'user-content__text'}>Name</div>
                        <div className={'user-content__value'}>Score</div>
                    </div>
                    <div className={'user-content__wrapper'}>
                        {data}
                    </div>
                </div>
                <div className={'form-wrapper'}>
                    <div className={save ? 'success-message' : 'success-message disabled'}>Your result save successfully!</div>
                    <form className={save ? 'user-form disabled' : 'user-form'} onSubmit={this.submitHandler}>
                        <label>
                            <p className={'user-form__title'}>You can save your result on user lists</p>
                            <input type={'text'} className={'user-form__input'} onChange={this.onChangeHandler}
                                   name={'name'} placeholder={'Enter your name'} />
                        </label>
                        <label>
                            <input type={'hidden'} name={'score'} value={this.props.points} />
                        </label>
                        <button type={'submit'} className={'user-form__button'}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UsersResult;
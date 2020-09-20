import React from "react";

export class DataList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, onItemSelected, groupId, isLoaded} = this.props;
        let dataList = data[groupId];
        let dataArray = [];

        if(isLoaded){
            dataArray = Object.values([].concat(dataList));
        }

        const classNameStatus = groupId % 2 === 1 ? 'data-list__item default' : 'data-list__item'

        let dataItem = dataArray.map((value, index) => {

            return (
                <li onClick={(event => onItemSelected(value.id, event))} id={value.id} className={classNameStatus} key={index}>
                    {value.name}
                </li>
            )
        })
            return (
                <ul className={'data-list'}>
                    {dataItem}
                </ul>
            )
    }
}

export default DataList
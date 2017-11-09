import React from 'react';


export default class OrderByFilter extends React.Component {
    render() {
        let arr = []
        const attributes = this.props.attributes;
        for(var attr in attributes) {
            arr.push(
                <option value={attr} key={attr}>{attributes[attr]}</option>
            );
        }

        return (
            <select
                name="order_by"
                value={this.props.value}
                onChange={this.props.handleChange} >
                {arr}
            </select>
        );
    }
}
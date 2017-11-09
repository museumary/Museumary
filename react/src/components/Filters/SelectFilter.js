import React from 'react';


export default class OrderByFilter extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value !== nextProps.value;
    }

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
                name={this.props.name ? this.props.name: "order_by"}
                value={this.props.value}
                onChange={this.props.handleChange} >
                {arr}
            </select>
        );
    }
}
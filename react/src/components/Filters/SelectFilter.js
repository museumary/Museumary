import React from 'react';

const ALPHABET = {
    "None": "All",
    "A":"A",
    "B":"B",
    "C":"C",
    "D":"D",
    "E":"E",
    "F":"F",
    "G":"G",
    "H":"H",
    "I":"I",
    "J":"J",
    "K":"K",
    "L":"L",
    "M":"M",
    "N":"N",
    "O":"O",
    "P":"P",
    "Q":"Q",
    "R":"R",
    "S":"S",
    "T":"T",
    "U":"U",
    "V":"V",
    "W":"W",
    "X":"X",
    "Y":"Y",
    "Z":"Z"
}

export default class OrderByFilter extends React.PureComponent {
    render() {
        let {name, value, attributes, handleChange} = this.props;

        if(name === "startswith") {
            attributes = ALPHABET;
        }

        let arr = [];
        for(var attr in attributes) {
            arr.push(
                <option value={attr} key={attr}>{attributes[attr]}</option>
            );
        }

        return (
            <select
                name={name}
                value={value}
                onChange={handleChange}>
                {arr}
            </select>
        );
    }
}


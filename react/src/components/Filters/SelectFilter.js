import React from 'react';

export default class OrderByFilter extends React.Component {
    static defaultProps = {
        alphabet: {
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
    }

    render() {
        let attr_list = this.props.attributes;

        if(this.props.name === "startswith") {
            attr_list = this.props.alphabet;
        }

        let arr = []
        for(var attr in attr_list) {
            arr.push(
                <option value={attr} key={attr}>{attr_list[attr]}</option>
            );
        }

        return (
            <select
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.handleChange} >
                {arr}
            </select>
        );
    }
}


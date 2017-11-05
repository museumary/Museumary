import React from 'react';
import { Link } from 'react-router-dom';

export class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: props.initialPage
        }
    }

    render() {
        return (
            <ul>
                <button type="button">{"<<"}</button>
                <button type="button">{"<"}</button>
                <button type="button">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">5</button>
                <button type="button">></button>
                <button type="button">>></button>
            </ul>
        );
    }
}

// class Pagination extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             items:[],
//             activePage: props.initialPage
//         };
//     }

//     render() {
//         return (
//             <ul>
//                 <button type="button">{"<<"}</button>
//                 <button type="button">{"<"}</button>
//                 <button type="button">1</button>
//                 <button type="button">2</button>
//                 <button type="button">3</button>
//                 <button type="button">4</button>
//                 <button type="button">5</button>
//                 <button type="button">></button>
//                 <button type="button">>></button>
//             </ul>
//         );
//     }
// }

Pagination.defaultProps = {
    initialPage: 1
}

export default Pagination
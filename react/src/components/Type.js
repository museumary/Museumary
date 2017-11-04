import React from 'react';

class Type extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }
    componentDidMount(){
        const type_id = parseInt(this.props.match.params.number, 10)
            this.setState({med_arr: []});
            this.setState({work_arr: []});
            fetch(`http://api.museumary.me/art_type/` + type_id)
                .then(result=>result.json())
                .then(items=>{
                    this.setState({items})
                    for (var i = 0, len = items.medium_ids.length; i < len; i++) {
                        fetch('http://api.museumary.me/medium/' + items.medium_ids[i])
                            .then(result=>result.json())
                            .then(responseJson=>this.setState({med_arr: this.state.med_arr.concat([responseJson])}))
                    }
                    var length = 0;
                    if(items.work_ids.length < 4) {
                        length = items.work_ids.length;
                    }
                    else {
                        length = 4;
                    }
                    for (var j = 0; j < length; j++) {
                        fetch('http://api.museumary.me/work/' + items.work_ids[j])
                        .then(result=>result.json())
                        .then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
                    }
                })
    }


    render() {
        var type_obj = this.state.items;
        var med_list = this.state.med_arr;
        var work_list = this.state.work_arr;
        if(type_obj && work_list && med_list){
        //  Do all React code within this div. 'Type_obj' is the object that
        //  associated with this Type page, you should be able to access it
        //  like any other JSON
            console.log(work_list);

            return <div className="Type">
                        <h1>{type_obj.name}</h1>
                        {
                            med_list.map(
                                function(obj) {
                                    return <div>{obj.name}<br/></div>;
                                }
                            )
                        }<br/><br/>
                        {
                            work_list.map(
                                function(obj) {
                                    return <div><img src={obj.image_url}/><br/><br/></div>;
                                }
                            )
                        }
                        </div>;
                    }
        else {
            return <div className="Type"></div>;
        }
    }
}

export default Type;

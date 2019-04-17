import * as React from "react";

export class RPSApp extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    submitHandler() {
        this.props.requests.play("p1 throw placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({result: "INVALID!"})
    }

    draw(){
        this.setState({result: "DRAW"})
    }

    p1Wins(){
        this.setState({result: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({result: "P2 Wins!"})
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>

    }
}
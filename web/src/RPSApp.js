import * as React from "react";

export class RPSApp extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    submitHandler() {
        this.props.requests.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid() {
        this.setState({result: "INVALID!"})
    }

    draw() {
        this.setState({result: "DRAW"})
    }

    p1Wins() {
        this.setState({result: "P1 Wins!"})
    }

    p2Wins() {
        this.setState({result: "P2 Wins!"})
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.result}
            <input name="p1Throw" onChange={this.handleInputChange.bind(this)}/>
            <input name="p2Throw" onChange={this.handleInputChange.bind(this)}/>
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>

    }
}
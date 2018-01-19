import React, { Component } from "react";
import "./styles.scss";

export default class extends Component {
    state = {
        activeField: 0,
        first: "",
        second: "",
        third: "",
        last: ""
    }

    setBoxValue = ({ target: { value } }) => {
        /*
            Grab correct property in state based on input changed,
                Given event value, pass through #ensure to grab most recently entered character
                    Set state accordingly, controlled input will automatically reflect the correct value.
        */
    };

    regress = () => this.setState(prevState => {
        if (prevState.activeField > 0) {
            return { activeField: prevState.activeField - 1 };
        }
    });

    advance = () => this.setState(prevState => {
        if (prevState.activeField < 4) {
            return { activeField: prevState.activeField + 1 };
        }
    });

    componentDidMount() {
        this.order = [this.first, this.second, this.third, this.last];
    }

    componentDidUpdate() {
        const { activeField } = this.state;
        
        this.order[activeField] && this.order[activeField].focus();
    }

    change = ({ keyCode }) => keyCode === 8 ? this.regress() : this.advance();

    ensure = value => {
        return value.length > 1 ? value[value.length - 1] : value; 
    };

    render() {
        return <section>
            <figure>
                <input ref={node => this.first = node} type="text" onChange={this.ensure} onKeyUp={this.change} />
                <input ref={node => this.second = node} type="text" onChange={this.ensure} onKeyUp={this.change} />
                <input ref={node => this.third = node} type="text" onChange={this.ensure} onKeyUp={this.change} />
                <input ref={node => this.last = node} type="text" onChange={this.ensure} onKeyUp={this.change} />
            </figure>
        </section>
    }
}
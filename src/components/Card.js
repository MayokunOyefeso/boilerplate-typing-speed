import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        console.log(this.props.words);
        return (
            <div className="card">
                <div className="card-header d-flex flex-row flex-wrap">
                    {this.props.words.map((wordObj) => {
                        return <h3 className="px-2" key={wordObj.word}>{wordObj.word}</h3>;
                    })}
                </div>
                <div className="card-body text-center">
                    <div className="card-title"></div>
                    <p className="card-text">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-lg" placeholder="Start typing here...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text">{this.props.timer}</span>
                            <button className="btn btn-primary" type="button">Reset</button>
                        </div>
                    </p>
                </div>
            </div>
        )
    }
}

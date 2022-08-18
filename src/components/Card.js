import React, { Component } from 'react';

export default class Card extends Component {
    getWordStatusClass = (statusIn) => {
        return statusIn === 1 ? '' : 
        statusIn === 0 ? 'text-danger':
        statusIn === -1 ? 'text-white bg-dark' :'text-secondary'
    }
    render() {
        return (
            <div className="card">
                <div className="card-header d-flex flex-row flex-wrap">
                    {this.props.words.map((wordObj) => {
                        return <h3 className={`px-2 ${this.getWordStatusClass(wordObj.status)}`} key={wordObj.word}>{wordObj.word}</h3>;
                    })}
                </div>
                <div className="card-body text-center">
                    <div className="card-title"></div>
                    <div className="card-text">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-lg" placeholder="Start typing here...." onChange={this.props.inputHandler} />
                            <span className="input-group-text">{this.props.timer}</span>
                            <button className="btn btn-primary" type="button">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React from 'react'
import { render } from 'react-dom'
import App from './app'

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: 1};
    }

    componentDidMount () {
        console.log(+new Date());
        setTimeout(() => {
            this.setState({
                date: 2
            })
        },2000)
    }

    render () {
        return (
            <App name={this.state.date} />
        )
    }
}

render(
    <Container />,
    document.getElementById('app')
)
import React from 'react';

class Person extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor")
        this.state = { classNameToBePut: "", money:"", person:Object}
    }

    handleOnClickChangeFriend = (props) => {
        this.props.onSelectFriendParamChange(props);
    }

    componentDidMount() {
        console.log("componentDidMount")
        console.log(this.props.person)
        if (this.props.person.balance.length == 0) {
            this.setState({
                money: "NIL"
            })
            this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-white-100 text-white-600 rounded-md" })
        }
        else{
            if(parseInt(this.props.person.balance[0].amount) > 0) {
                this.setState({
                    money: "INR " + this.props.person.balance[0].amount})
                this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md" })
            }
            if (parseInt(this.props.person.balance[0].amount) < 0) {
                this.setState({
                    money: "INR " + this.props.person.balance[0].amount * -1
                })
                this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md color-red" })
            }
        } 
    }

    UNSAFE_componentWillReceiveProps() {
        console.log(this.props)
        if (this.props.person.balance.length == 0) {
            this.setState({
                money: "NIL"
            })
            this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-white-100 text-white-600 rounded-md" })
        }
        else {
            if (parseInt(this.props.person.balance[0].amount) > 0) {
                this.setState({
                    money: "INR " + this.props.person.balance[0].amount
                })
                this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md" })
            }
            if (parseInt(this.props.person.balance[0].amount) < 0) {
                this.setState({
                    money: "INR " + this.props.person.balance[0].amount * -1
                })
                this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md color-red" })
            }
        }
    }
    render() {
        return <button onClick={() => this.handleOnClickChangeFriend(this.props)} class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                <img src={this.props.person.picture.small} class="w-7 h-7 mr-2 rounded-full" alt="profile" />
                {this.props.person.first_name + " " + (this.props.person.last_name === null ? "" : this.props.person.last_name)}
            </div>
            <div class="flex items-center w-full">
                <div class={this.state.classNameToBePut}>{this.state.money}</div>
                <div class="ml-auto text-xs text-gray-500">{this.state.money}</div>
            </div>
        </button>;
    }
}

export default Person;
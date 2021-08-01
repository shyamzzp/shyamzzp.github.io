import React from 'react';

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = { classNameToBePut: "", }
    }

    handleOnClickChangeFriend = (props) => {
        this.props.onSelectFriendParamChange(props);
    }

    componentDidMount() {
        if (this.props.dept == 'Confirmed') {
            this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md" })
        }
        if (this.props.dept == 'Invited') {
            this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-white-100 text-white-600 rounded-md" })
        }
        if (this.props.dept == 'Unsubscribed') {
            this.setState({ classNameToBePut: "text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md" })
        }
    }

    render() {
        return <button onClick={() => this.handleOnClickChangeFriend(this.props)} class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                <img src={this.props.image} class="w-7 h-7 mr-2 rounded-full" alt="profile" />
                {this.props.name}
            </div>
            <div class="flex items-center w-full">
                <div class={this.state.classNameToBePut}>{this.props.dept}</div>
                <div class="ml-auto text-xs text-gray-500">{this.props.money}</div>
            </div>
        </button>;
    }
}

export default Person;
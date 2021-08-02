import "./App.css";
import Person from "./components/Person";
import React from "react";
import { constants } from "./constant";
import axios from "axios";
import FormData from "form-data";
import "antd/dist/antd.dark.css";
import { Spin, Switch, Table, Empty } from "antd";
import { Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.Splitwise = require("splitwise");
    this.sw = this.Splitwise({
      consumerKey: constants.consumer_key,
      consumerSecret: constants.consumer_secret,
    });
    this.handleOnClickChangeFriend = this.handleOnClickChangeFriend.bind(this);
    this.state = {
      data: [],
      personalData: Object,
      userProfile: "./man.png",
      friendName: "",
      friendsExpenseData: [],
      friendNameVs: "Friend",
      friendImageVs: "https://image.flaticon.com/icons/png/512/848/848006.png",
      isDataLoading: true,
      isSpinFriendsLoading: false,
      isOwesYouChecked: false,
      isYouOweChecked: false,
      isShowAllFriends: false,
      searchText: "",
      searchedColumn: "",
    };
  }
  componentDidMount() {
    this.getData();
    this.getPersonalData();
    this.setState({ isDataLoading: false });
    window.scrollTo(0, 0);
  }

  showAllFriendsToggle(self, checked, evt) {
    this.setState({ isOwesYouChecked: false });
    this.setState({ isYouOweChecked: false });
    if (checked) {
      this.setState({ isShowAllFriends: true });
      this.setState({ data: [] });
      this.setState({ isSpinFriendsLoading: true });
      this.sw.getFriends().then((item) => {
        item.forEach((element) => {
          element.first_name =
            element.first_name.charAt(0).toUpperCase() +
            element.first_name.substr(1).toLowerCase();
          element.last_name =
            element.last_name === null
              ? ""
              : element.last_name.charAt(0).toUpperCase() +
                element.last_name.substr(1).toLowerCase();
          element.registration_status =
            element.registration_status.charAt(0).toUpperCase() +
            element.registration_status.substr(1).toLowerCase();
        });
        this.setState({ isSpinFriendsLoading: false });
        this.setState({ data: item });
      });
    } else {
      this.setState({ isShowAllFriends: false });
      this.getData();
    }
  }
  oweCalculationFriends(self, checked, evt, crdr) {
    if (checked) {
      if (crdr == 1) {
        this.setState({ isShowAllFriends: false });
        this.setState({ isYouOweChecked: false });
        this.setState({ isOwesYouChecked: true });
      } else {
        this.setState({ isOwesYouChecked: false });
        this.setState({ isShowAllFriends: false });
        this.setState({ isYouOweChecked: true });
      }
      this.setState({ data: [] });
      this.setState({ isSpinFriendsLoading: true });
      this.sw.getFriends().then((item) => {
        var filteredData = [];
        item.forEach((element) => {
          element.first_name =
            element.first_name.charAt(0).toUpperCase() +
            element.first_name.substr(1).toLowerCase();
          element.last_name =
            element.last_name === null
              ? ""
              : element.last_name.charAt(0).toUpperCase() +
                element.last_name.substr(1).toLowerCase();
          element.registration_status =
            element.registration_status.charAt(0).toUpperCase() +
            element.registration_status.substr(1).toLowerCase();
          if (
            element.balance.length > 0 &&
            parseFloat(element.balance[0].amount) > 0.0 &&
            crdr == 1
          ) {
            filteredData.push(element);
          }
          if (
            element.balance.length > 0 &&
            parseFloat(element.balance[0].amount) < 0.0 &&
            crdr == 0
          ) {
            filteredData.push(element);
          }
        });
        this.setState({ isSpinFriendsLoading: false });
        this.setState({ data: filteredData });
      });
    } else {
      this.setState({ isShowAllFriends: false });
      this.setState({ isYouOweChecked: false });
      this.setState({ isOwesYouChecked: false });
      this.getData();
    }
  }

  getData() {
    this.setState({ data: [] });
    this.setState({ isSpinFriendsLoading: true });
    this.sw.getFriends().then((item) => {
      var filteredData = [];
      item.forEach((element) => {
        element.first_name =
          element.first_name.charAt(0).toUpperCase() +
          element.first_name.substr(1).toLowerCase();
        element.last_name =
          element.last_name === null
            ? ""
            : element.last_name.charAt(0).toUpperCase() +
              element.last_name.substr(1).toLowerCase();
        element.registration_status =
          element.registration_status.charAt(0).toUpperCase() +
          element.registration_status.substr(1).toLowerCase();
        if (element.balance.length > 0 && element.balance[0].amount !== "0.0") {
          filteredData.push(element);
        }
      });
      this.setState({ isSpinFriendsLoading: false });
      this.setState({ data: filteredData });
    });
  }

  handleOnClickChangeFriend = (propsChildren) => {
    this.setState({ isDataLoading: true });
    this.setState({ friendNameVs: propsChildren.person.first_name });
    this.setState({ friendImageVs: propsChildren.image });
    this.setState({ friendsExpenseData: [] });
    this.getExpensesBtnFriends(propsChildren.id);
  };

  getPersonalData() {
    this.sw.getCurrentUser().then((item) => {
      this.setState({ userProfile: item.picture.small });
      this.setState({ personalData: item });
    });
  }

  getExpensesBtnFriends(friend_id) {
    var data = new FormData();
    var config = {
      method: "get",
      url: "api/v3.0/get_expenses?limit=1000000&friend_id=" + friend_id,
      headers: {
        Authorization: "Bearer " + constants.api_key,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.expenses);
        this.setState({ friendsExpenseData: response.data.expenses });
        this.setState({ isDataLoading: false });
      })
      .catch(function (error) {
        this.setState({ isDataLoading: false });
      });
  }

  //Table Filter-Search Functionality
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block", borderRadius: 5 }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              borderRadius: 5,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
              borderRadius: 5,
            }}
          >
            Reset
          </Button>
          <Button
            size="small"
            style={{
              borderRadius: 5,
            }}
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      {
        if(this.state.searchedColumn === dataIndex){
          return <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />;
        }else{
          if(dataIndex == 'created_by'){
            return text.first_name
          } else if(dataIndex == 'date'){
            return text.split('T')[0];
          }
          else{
            return text
          }
        }
      },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Expense",
        dataIndex: "cost",
        key: "cost",
        sorter: (a, b) => a.cost - b.cost,
        sortDirections: ["descend", "ascend"],
        width: "20%",
        ...this.getColumnSearchProps("cost"),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        ...this.getColumnSearchProps("date"),
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        sortDirections: [ "ascend","descend"],
      },
      {
        title: "Created By",
        dataIndex: "created_by",
        key: "created_by",
        ...this.getColumnSearchProps("created_by"),
      },
    ];
    return (
      <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div class="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
          <div class="h-16 text-blue-500 flex items-center justify-center">
            <svg
              class="w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
            <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                class="h-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </button>
            <button class="h-10 w-12 dark:bg-gray-700 dark:text-white rounded-md flex items-center justify-center bg-blue-100 text-blue-500">
              <svg
                viewBox="0 0 24 24"
                class="h-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </button>
            <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                class="h-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
            </button>
            <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                class="h-5"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex-grow overflow-hidden h-full flex flex-col">
          <div class="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10 padding-20">
            <div class="flex h-full text-gray-600 dark:text-gray-400">
              <a
                href="#"
                class="cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              >
                Friends
              </a>
              <a
                href="#"
                class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
              >
                Groups
              </a>
            </div>
            <div class="ml-auto flex items-center space-x-7">
              {/* <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Deposit</button> */}

              <button class="flex items-center">
                <span class="relative flex-shrink-0">
                  <img
                    class="w-7 h-7 rounded-full"
                    src={this.state.userProfile}
                    alt="profile"
                  />
                  <span class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
                </span>
                <span class="ml-2">{this.state.personalData.first_name}</span>
                <svg
                  viewBox="0 0 24 24"
                  class="w-4 ml-1 flex-shrink-0"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-grow flex overflow-x-hidden">
            <div class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
              <div class="relative flex-space-between">
                <Switch
                  unCheckedChildren="Show all"
                  checkedChildren="Show all"
                  onChange={(checked, evt) =>
                    this.showAllFriendsToggle(this, checked, evt)
                  }
                  checked={this.state.isShowAllFriends}
                />
                <Switch
                  unCheckedChildren="Owes You"
                  checkedChildren="Owes You"
                  onChange={(checked, evt) =>
                    this.oweCalculationFriends(this, checked, evt, 1)
                  }
                  checked={this.state.isOwesYouChecked}
                />
                <Switch
                  unCheckedChildren="You Owe"
                  checkedChildren="You Owe"
                  onChange={(checked, evt) =>
                    this.oweCalculationFriends(this, checked, evt, 0)
                  }
                  checked={this.state.isYouOweChecked}
                />
              </div>
              <div class="space-y-4 mt-4">
                {this.state.isSpinFriendsLoading ? (
                  <center class="center-vertical">
                    <Spin />
                  </center>
                ) : (
                  this.state.data.map((eachPerson, i) => (
                    <Person
                      onSelectFriendParamChange={this.handleOnClickChangeFriend}
                      id={eachPerson.id}
                      person={eachPerson}
                      image={eachPerson.picture.small}
                    />
                  ))
                )}
              </div>
            </div>
            <div class="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
              <div class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                <div class="flex w-full items-center">
                  <div class="flex items-center text-3xl text-gray-900 dark:text-white mr-4">
                    <img
                      src={this.state.friendImageVs}
                      class="w-12 mr-4 rounded-full"
                    />
                    {this.state.friendNameVs}
                  </div>
                  <div class="flex items-center text-3xl text-gray-900 dark:text-white mr-4 ml-4">
                    <img
                      src="https://image.flaticon.com/icons/png/512/1751/1751805.png"
                      class="w-12 mr-4 rounded-full"
                    />
                  </div>
                  <div class="flex items-center text-3xl text-gray-900 dark:text-white">
                    <img
                      src={this.state.userProfile}
                      class="w-12 mr-4 rounded-full"
                    />
                    {this.state.personalData.first_name}
                  </div>
                  <div class="ml-auto sm:flex hidden items-center justify-end">
                    <div class="text-right">
                      <div class="text-xs text-gray-400 dark:text-gray-400">
                        Account balance:
                      </div>
                      <div class="text-gray-900 text-lg dark:text-white">
                        $2,794.00
                      </div>
                    </div>
                    <button class="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        class="w-4"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex items-center space-x-3 sm:mt-7 mt-4">
                  <a
                    href="#"
                    class="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5"
                  >
                    Activities
                  </a>
                  <a
                    href="#"
                    class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5"
                  >
                    Transfer
                  </a>{" "}
                  <a
                    href="#"
                    class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
                  >
                    Budgets
                  </a>
                  <a
                    href="#"
                    class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
                  >
                    Notifications
                  </a>
                  <a
                    href="#"
                    class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden"
                  >
                    Cards
                  </a>
                </div>
              </div>
              <div class="sm:p-7 p-4">
                <Table
                  dataSource={this.state.friendsExpenseData}
                  bordered
                  loading={this.state.isDataLoading}
                  locale={{
                    emptyText: (
                      <Empty description="Select friend to display expenses." />
                    ),
                  }}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

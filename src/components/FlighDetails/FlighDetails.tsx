import React from "react";
import './style.css'

const { useState } = React;

const Flight = [
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        label: "rgb(13, 28, 83)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        label: "rgb(252, 178, 50)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        label: "rgb(13, 28, 83)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src:
            "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        label: "rgb(252, 178, 50)"
    }
];

const Cell = (props:any) => {
    const { index } = props;
    const [active, handleActive] = useState(false);

    return (
        <div
            id="fd_cardContainer"
            style={{
                height: active ? `300px` : `100px`,
                transition: "0.9s"
            }}
            onClick={() => {
                handleActive(!active);
            }}
        >
            <div id="fd_firstDisplay">
                <div id="fd_flightDetail">
                    <div
                        id="fd_detailLabel"
                        style={{ fontWeight: "bold", color: Flight[index].label }}
                    >
                        From
                    </div>
                    BLR
                    <div id="fd_detailLabel">Kempegowda International</div>
                </div>
                <div
                    id="fd_flightDetail"
                    style={{
                        marginTop: "15px"
                    }}
                >
                    <div id="fd_animContainer">
                        <div id="fd_anim">
                            <div id="fd_circle" />
                            <div id="fd_circle" />
                            <div id="fd_circle" />
                        </div>
                    </div>
                    <div id="fd_animContainer" style={{ left: "62px" }}>
                        <div id="fd_anim">
                            <div id="fd_circle" />
                            <div id="fd_circle" />
                            <div id="fd_circle" />
                        </div>
                    </div>
                    <img
                        style={{ width: "30px" }}
                        src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
                    />
                </div>
                <div id="fd_flightDetail">
                    <div
                        id="fd_detailLabel"
                        style={{ fontWeight: "bold", color: Flight[index].label }}
                    >
                        To
                    </div>
                    DEL
                    <div id="fd_detailLabel">Indira Gandhi International</div>
                </div>
            </div>
            <div
                id="fd_first"
                style={{
                    transform: active
                        ? `rotate3d(1, 0, 0, -180deg)`
                        : `rotate3d(1, 0, 0, 0deg)`,
                    transitionDelay: active ? "0s" : "0.3s"
                }}
            >
                <div id="fd_firstTop">
                    <img style={Flight[index].style} src={Flight[index].src} />
                    <div id="fd_timecontainer">
                        <div id="fd_detailDate">
                            Bengaluru
                            <div id="fd_detailTime">6:20</div>
                            June 12
                        </div>
                        <img
                            style={{
                                width: "30px",
                                height: "26px",
                                marginTop: "22px",
                                marginLeft: "16px",
                                marginRight: "16px"
                            }}
                            src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
                        />
                        <div id="fd_detailDate">
                            New Delhi
                            <div id="fd_detailTime">8:45</div>
                            June 12
                        </div>
                    </div>
                </div>
                <div id="fd_firstBehind">
                    <div id="fd_firstBehindDisplay">
                        <div id="fd_firstBehindRow">
                            <div id="fd_detail">
                                6:20 - 8:45
                                <div id="fd_detailLabel">Flight Time</div>
                            </div>
                            <div id="fd_detail">
                                No
                                <div id="fd_detailLabel">Transfer</div>
                            </div>
                        </div>
                        <div id="fd_firstBehindRow">
                            <div id="fd_detail">
                                2h 25 min
                                <div id="fd_detailLabel">Duration</div>
                            </div>
                            <div id="fd_detail">
                                8<div id="fd_detailLabel">Gate</div>
                            </div>
                        </div>
                        <div id="fd_firstBehindRow">
                            <div id="fd_detail">
                                5:35
                                <div id="fd_detailLabel">Boarding</div>
                            </div>
                            <div id="fd_detail">
                                20A
                                <div id="fd_detailLabel">Seat</div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="fd_second"
                        style={{
                            transform: active
                                ? `rotate3d(1, 0, 0, -180deg)`
                                : `rotate3d(1, 0, 0, 0deg)`,
                            transitionDelay: active ? "0.2s" : "0.2s"
                        }}
                    >
                        <div id="fd_secondTop" />
                        <div id="fd_secondBehind">
                            <div id="fd_secondBehindDisplay">
                                <div id="fd_price">
                                    $100
                                    <div id="fd_priceLabel">Price</div>
                                </div>
                                <div id="fd_price">
                                    Economy
                                    <div id="fd_priceLabel">Class</div>
                                </div>
                                <img
                                    id="fd_barCode"
                                    src="https://github.com/pizza3/asset/blob/master/barcode.png?raw=true"
                                />
                            </div>
                            <div
                                id="fd_third"
                                style={{
                                    transform: active
                                        ? `rotate3d(1, 0, 0, -180deg)`
                                        : `rotate3d(1, 0, 0, 0deg)`,
                                    transitionDelay: active ? "0.4s" : "0s"
                                }}
                            >
                                <div id="fd_thirdTop" />
                                <div id="fd_secondBehindBottom">
                                    <button
                                        id="fd_button"
                                        style={{
                                            color: Flight[index].label,
                                            border: `1px solid ${Flight[index].label}`
                                        }}
                                    >
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Header = (
    <div>
        <svg
            id="fd_back"
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
        >
            <polyline
                points="244 400 100 256 244 112"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "48px"
                }}
            />
            <line
                x1="120"
                y1="256"
                x2="412"
                y2="256"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "48px"
                }}
            />
        </svg>
        <div id="fd_headerText">Select Flight</div>
        <div id="fd_tripDetail">
            Your Trip
            <div id="fd_tripDest">
                BLR - DEL<div id="fd_oneWay">One Way</div>
                <div />
            </div>
            12th June, 2020
        </div>
        <svg
            id="fd_settings"
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
        >
            <line
                x1="368"
                y1="128"
                x2="448"
                y2="128"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <line
                x1="64"
                y1="128"
                x2="304"
                y2="128"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <line
                x1="368"
                y1="384"
                x2="448"
                y2="384"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <line
                x1="64"
                y1="384"
                x2="304"
                y2="384"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <line
                x1="208"
                y1="256"
                x2="448"
                y2="256"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <line
                x1="64"
                y1="256"
                x2="144"
                y2="256"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <circle
                cx="336"
                cy="128"
                r="32"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <circle
                cx="176"
                cy="256"
                r="32"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
            <circle
                cx="336"
                cy="384"
                r="32"
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px"
                }}
            />
        </svg>
    </div>
);

const DataArr = Array(8)
    .fill(0)
    .map(Number.call, Number);
    
const FlightDetails = () => {
    return (
        <div className="fd_App">
            {Header}
            {DataArr.map((val, i) => (
                <Cell key={i} index={i} />
            ))}
        </div>
    );
}

export default FlightDetails
import React, { useEffect, useState } from 'react'
import './game.css'
function Game() {

    const Show = () => {
        let money = [
            { x: "740px", y: "134px", value: "0", img: "virus.png", class: "virus" },
            { x: "1860px", y: "134px", value: "0", img: "virus.png", class: "virus" },
            { x: "3540px", y: "134px", value: "0", img: "virus.png", class: "virus" },
            { x: "5780px", y: "134px", value: "0", img: "virus.png", class: "virus" },
            { x: "6900px", y: "134px", value: "0", img: "virus.png", class: "virus" },

            { x: "200px", y: "570px", value: "0", img: "virus.png", class: "virus" },
            { x: "2420px", y: "570px", value: "0", img: "virus.png", class: "virus" },
            { x: "4100px", y: "570px", value: "0", img: "virus.png", class: "virus" },
            { x: "5700px", y: "570px", value: "0", img: "virus.png", class: "virus" },
            { x: "6340px", y: "570px", value: "0", img: "virus.png", class: "virus" },

            { x: "550px", y: "464px", value: 100, img: "100.png" },
            { x: "650px", y: "264px", value: 300, img: "300.png" },
            { x: "1250px", y: "264px", value: 500, img: "500.png" },
            { x: "1550px", y: "264px", value: 400, img: "400.png" },
            { x: "2350px", y: "264px", value: 200, img: "200.png" },
            { x: "2130px", y: "264px", value: 500, img: "500.png" },
            { x: "2350px", y: "264px", value: 100, img: "100.png" },
            { x: "1250px", y: "264px", value: 300, img: "300.png" },
            { x: "3250px", y: "264px", value: 200, img: "200.png" },
            { x: "1250px", y: "264px", value: 500, img: "500.png" },
            { x: "4250px", y: "264px", value: 400, img: "400.png" },
            { x: "2250px", y: "264px", value: 300, img: "300.png" },
            { x: "250px", y: "264px", value: 100, img: "100.png" },


            { x: "5550px", y: "464px", value: 100, img: "100.png" },
            { x: "6650px", y: "264px", value: 300, img: "300.png" },
            { x: "7750px", y: "264px", value: 500, img: "500.png" },
            { x: "8550px", y: "264px", value: 400, img: "400.png" },
            { x: "9350px", y: "264px", value: 200, img: "200.png" },
            { x: "10130px", y: "264px", value: 500, img: "500.png" },
            { x: "12350px", y: "264px", value: 100, img: "100.png" },
            { x: "31250px", y: "264px", value: 300, img: "300.png" },
            { x: "43250px", y: "264px", value: 200, img: "200.png" },
            { x: "51250px", y: "264px", value: 500, img: "500.png" },
            { x: "64250px", y: "264px", value: 400, img: "400.png" },
            { x: "72250px", y: "264px", value: 300, img: "300.png" },
            { x: "8250px", y: "264px", value: 100, img: "100.png" },


            { x: "1650px", y: "664px", value: 300, img: "300.png" },
            { x: "21250px", y: "564px", value: 500, img: "500.png" },
            { x: "31550px", y: "1264px", value: 400, img: "400.png" },
            { x: "42350px", y: "664px", value: 200, img: "200.png" },
            { x: "52130px", y: "564px", value: 500, img: "500.png" },
            { x: "62350px", y: "864px", value: 100, img: "100.png" },
            { x: "81250px", y: "664px", value: 300, img: "300.png" },
            { x: "73250px", y: "464px", value: 200, img: "200.png" },
            { x: "91250px", y: "264px", value: 500, img: "500.png" },
            { x: "14250px", y: "364px", value: 400, img: "400.png" },
            { x: "22250px", y: "264px", value: 300, img: "300.png" },

            { x: "350px", y: "664px", value: 300, img: "300.png" },
            { x: "3250px", y: "564px", value: 500, img: "500.png" },
            { x: "4550px", y: "1264px", value: 400, img: "400.png" },
            { x: "4350px", y: "664px", value: 200, img: "200.png" },
            { x: "3130px", y: "564px", value: 500, img: "500.png" },
            { x: "5350px", y: "864px", value: 100, img: "100.png" },
            { x: "3250px", y: "664px", value: 300, img: "300.png" },
            { x: "2250px", y: "464px", value: 200, img: "200.png" },
            { x: "3250px", y: "264px", value: 500, img: "500.png" },
            { x: "5250px", y: "364px", value: 400, img: "400.png" },
            { x: "3250px", y: "264px", value: 300, img: "300.png" },

            { x: "950px", y: "134px", value: "bid", img: "./bid.png" }

        ]


        return (
            <>
                {money.map(m => (
                    <img className={'imgc ' + m.class} style={{ "top": m.y, "left": m.x }} id={m.value} src={m.img} />

                ))}

            </>

        )
    }
    return (
        <div className="Game">

            <div className="frame">

                <div className="corner_topleft" />
                <div className="corner_topright" />
                <div className="corner_bottomleft" />
                <div className="corner_bottomright" />
                <div className="camera">
                    <Show />
                    <div className="map pixel-art">
                        <div className="character" facing="down" walking="true">
                            <div className="shadow pixel-art" />
                            <div className="character_spritesheet pixel-art" />
                        </div>
                    </div>
                    <div className="dpad">
                        <div className="DemoDirectionUI flex-center">
                            <button className="dpad-button dpad-left">
                            </button>
                        </div>
                    </div>
                    <svg className="headline" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 75 14" shapeRendering="crispEdges">
                        3" /&gt;
              <path stroke="#cccccc" d="M1 12h73" /> --&gt;
            </svg>
                </div>
            </div>
        </div>
    )

}
export default Game;
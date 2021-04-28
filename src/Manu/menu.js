import React, { useState } from 'react';
import Game from '../Game/game';
import './menu.css'


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Main from '../Main/main'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Game: false,
            ended: false
        }

        // if (this.props.isnewGame) {
        //     this.startGame();

        // }

    }



    bid() {
        let g = JSON.parse(window.localStorage.getItem("theGame"))[0]
        let score = parseInt(document.getElementById("score").innerHTML.split("$")[1])
        g.bids = g.bids.concat(score);
        const gamesRef = firestore.collection('games').doc(window.localStorage.getItem("game"));
        gamesRef.update({
            bids: g.bids
        })
    }

    score = () => {

        document.getElementById("score").innerHTML = "$ " + (window.localStorage.getItem("Score"));
        setTimeout(this.score, 100);


    }

    startTimer = (duration) => {


        var timer = duration, minutes, seconds;
        let i = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            (document.getElementById("timer").innerHTML = "Remaining time: " + minutes.substring(1,) + ":" + seconds)


            if (--timer < 0) {
                document.getElementById('lost').classList.remove("hidden")
                document.getElementById('lost').classList.add("lost")
                window.localStorage.setItem("end", true)
                let g = JSON.parse(window.localStorage.getItem("theGame"))[0]
                let score = parseInt(document.getElementById("score").innerHTML.split("$")[1])
                g.bids = g.bids.concat(score);
                const gamesRef = firestore.collection('games').doc(window.localStorage.getItem("game"));
                gamesRef.update({
                    bids: g.bids
                })
                window.localStorage.setItem("end", true)

                document.querySelector("#lost h1").innerHTML = "Lost";
                document.querySelector("#lost p").innerHTML = "you fail to reach the auction location";



                clearInterval(i);
            }
        }, 1000);

    }

    New = () => {
        window.location.href = '/'
    }
    render() {
        if (this.props.IsReady) {
            // this.score();
            var fiveMinutes = 60 * 3
            this.startTimer(fiveMinutes)
        }
        return (
            <div className='Menu'>

                <div className={!this.state.Game ? "hidden" : "lost"} id="lost" >
                    <h1>Loading....</h1>
                    <p></p>
                    <button id="btn" onClick={this.New}>Start new Game</button>
                    {/* <button id='place' onClick={this.bid}>Place your bid</button> */}

                </div>
                <div className='sction'>
                    <p id="timer">Remaining time: 0:00</p>
                </div>
                <div className='sction'>
                    <p id='score'>Wallet: $0</p>
                </div>
                <div className='sction'>
                    <p id="players">Number of players: 4</p>
                </div>
                <div className='sction'>
                    <p>Map</p>
                </div>
            </div >
        )
    }
}
export default Menu;
import React, { useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyB8TS40mpgzG1T_NLE0mPpYGsjJM-J_l4I",
    authDomain: "game-af1a6.firebaseapp.com",
    projectId: "game-af1a6",
    storageBucket: "game-af1a6.appspot.com",
    messagingSenderId: "665228881004",
    appId: "1:665228881004:web:5cdbbd3ec5383f53ab7c49",
    measurementId: "G-G676HHE188"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
let user = "ali"
function Main({ newGame, Start, setIsReady }) {
    const dummy = useRef();
    const gamesRef = firestore.collection('games');
    const query = gamesRef.orderBy('time').limit(25);
    const [games] = useCollectionData(query, { idField: 'id' });

    const [time, setTime] = useState(2);
    const startTimer = (duration) => {
        document.getElementById("start").style.display = "none"
        var timer = duration, minutes, seconds;
        let i = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            (document.getElementById("timerr").innerHTML = (minutes.substring(1,) + ":" + seconds))
            if (--timer < 0) {
                Start();
                clearInterval(i)
                document.getElementById("players").innerHTML = "# of players: " + window.localStorage.getItem("players")
                setIsReady();
            }
        }, 1000);

    }



    const Join = async (e) => {
        newGame();
        let open = false;
        games.map(game => {

            if (game.status) {
                //join that game
                const currDate = new Date()
                const oldDate = game.time.toDate()

                let mins = (currDate - oldDate) / 60000

                if (mins < 2) {

                    // setTime(mins)
                    // startTimer(mins * 60)
                    setTime(.1 * 60)
                    startTimer(.1 * 60)

                    open = true;
                    const updateRef = firestore.collection('games').doc(game.id);
                    // let upd = updateRef.

                    updateRef.update({

                        bid: 0,
                        bids: [],
                        bidders: [],
                        players: game.players.concat(user.photoURL, user.displayName),
                        status: true,
                        time: game.time
                    })
                    window.localStorage.setItem("game", game.id)

                    return;
                } else {

                    const updateRef = firestore.collection('games').doc(game.id);
                    updateRef.update({
                        bid: 0,
                        bids: [],
                        bidders: [],
                        players: game.time.players,
                        status: false,
                        time: game.time
                    })
                }
            }
        })
        if (!open) {
            await gamesRef.add({
                bid: 0,
                bids: [],
                bidders: [],
                status: true,
                players: [user.photoURL, user.displayName],
                time: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(res => window.localStorage.setItem("game", res.id))
            // window.localStorage.setItem("game",game.id)
            setTime(.1 * 60);
            startTimer(.1 * 60)
        }

    }



    const [user] = useAuthState(auth);

    return (
        <div className='new' id="logoo">
            <div className='logo'>
                <img src='logo.png' />
            </div>
            <div className='name'>
                {time == 0 ? <h4 id='title' >wait while others join</h4> : ""}
            </div>
            <div className='name'>
                {games && games.map(gme => <Game key={gme.id} games={gme} />)}

            </div>
            <div>
                <button id="start" onClick={Join}>start a game</button>
            </div>

        </div >


    )
}
function Game(props) {
    return (

        props.games.id == window.localStorage.getItem("game") ? <div>
            <p id="timerr"></p>

            <p id='t'>wait while others join....</p>
            <div className='profile'>
                {props.games.players.map((img, i) => (
                    <div className='profile'>
                        { (i % 2 == 0) ? <img src={img} /> : <p id='title'>{img}  </p>}
                        {window.localStorage.setItem('players', props.games.players.length)}

                    </div>
                ))}
            </div>
            <br />
        </div> : ""
    )
}
export default Main;
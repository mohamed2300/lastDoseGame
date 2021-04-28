import Game from '../Game/game';
import '../Manu/menu.css'
import React, { useState, useRef } from 'react';
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
function Info() {
    const [data, setData] = useState({ bid: 0, bidders: [] });
    let id = window.localStorage.getItem("game");

    const dummy = useRef();
    const gamesRef = firestore.collection('games');
    const query = gamesRef.orderBy('time').limit(25);
    const [games] = useCollectionData(query, { idField: 'id' });

    function bid(bid) {
        games.map(game => {
            if (game.id == window.localStorage.getItem("game")) {
                const gamesRef = firestore.collection('games').doc(window.localStorage.getItem("game"));
                gamesRef.update({
                    bids: game.bids.concat(bid)
                })
            }
        })


    }
    if (games) {
        window.localStorage.setItem("theGame", JSON.stringify(games.filter(game => game.id == window.localStorage.getItem("game"))))

    }
    // const interval = setInterval(function () {
    //     if (games) {
    //         // bid(parseInt(document.getElementById("score").innerHTML.split("$")[1]));
    //     }
    // }, 10000);
    // clearInterval(interval);

    return (
        <>

            {games && games.map(gme => <ShowInfo key={gme.id} games={gme} />)}
            <button onClick={bid}>bid</button>
        </>



    )

}
function ShowInfo(props) {
    return (

        props.games && props.games.id == window.localStorage.getItem("game") ? (
            <div className='Menu'>
                <div className='sction'>
                    <p id='bid'>Highest: ${Math.max.apply(Math, props.games.bids)}</p>
                </div>
                <div className='sction'>
                    <p id="bidder">Lowest: {Math.min.apply(Math, props.games.bids)}</p>
                </div>

            </div >
        ) : ""

    );
}
export default Info;
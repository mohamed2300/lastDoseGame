import React, { useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Main from '../Main/main'
import './newgame.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const NewGame = ({ start, setIsReady }) => {
    const [ch, setCh] = useState(1)
    const [Join, setJoin] = useState(false);

    function chr(c) {
        setCh(c);
        window.localStorage.setItem("c", "./" + c + ".png")
        document.getElementsByClassName("character_spritesheet")[0].style.backgroundImage = "url(./ch" + c + ".png)"
    }
    function newGame() {
        setJoin(true)

    }
    const dummy = useRef();
    const gamesRef = firestore.collection('games');
    const query = gamesRef.orderBy('time').limit(25);
    const [games] = useCollectionData(query, { idField: 'id' });


    function Start() {
        window.localStorage.setItem("ch", ch)
        window.localStorage.setItem("score", "0");
        window.localStorage.setItem("end", "false");
        window.localStorage.setItem("time", 0.1);
        const updateRef = firestore.collection('games').doc(window.localStorage.getItem("game"));
        updateRef.update({

            status: false
        })
        document.getElementsByClassName("character_spritesheet")[0].style.backgroundImage = "./c" + window.localStorage.getItem("ch") + ".png"
        start();
    }
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);


    }
    function SignOut() {
        auth.signOut()
    }
    const [user] = useAuthState(auth);

    return (

        <>

            {Join ?
                <Main newGame={newGame} Start={Start} setIsReady={setIsReady} /> : (
                    <div className='new'>

                        <div className='logo'>
                            <img src='logo.png' />
                        </div>
                        <div className='name'>

                            {/* <input type='text' placeholder='pick a name' /> */}
                            <div className='section'>
                                {user ? <h1>{user.displayName} <p className='logout' onClick={SignOut}>logout</p></h1> : <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>}

                            </div>
                        </div>
                        <div className='charecter'>
                            <div className='ch ' id={ch == 1 ? 'active' : ''} onClick={() => chr(1)}> <img src='c1.png' /></div>
                            <div className='ch ' id={ch == 2 ? 'active' : ''} onClick={() => chr(2)}> <img src='c2.png' /></div>
                            <div className='ch ' id={ch == 3 ? 'active' : ''} onClick={() => chr(3)}><img src='c3.png' /></div>
                            <div className='ch ' id={ch == 4 ? 'active' : ''} onClick={() => chr(4)}> <img src='c4.png' /></div>
                        </div>
                        <div>
                            <button onClick={newGame} id={user ? "" : "dis"} disabled={!user}>Continue</button>
                        </div>
                    </div>
                )}</>
    )
}
export default NewGame;
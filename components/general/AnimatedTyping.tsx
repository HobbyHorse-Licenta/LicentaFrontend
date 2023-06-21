import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {StyleSheet, Text } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

interface TimeoutStruct {
    cursorTimeout: NodeJS.Timeout | undefined,
    typingTimeout: NodeJS.Timeout | undefined,
    firstNewLineTimeout: NodeJS.Timeout | undefined,
    secondNewLineTimeout: NodeJS.Timeout | undefined,
}

const textColor = COLORS.aPrimaryColorOverall;
const cursorColor = "transparent";

const AnimatedTyping = (props) => {

    let [text, setText] = useState("");
    let [cursorColor, setCursorColor] = useState("transparent");
    let [messageIndex, setMessageIndex] = useState(0);
    let [textIndex, setTextIndex] = useState(0);
    let [timeouts, setTimeouts] = useState<TimeoutStruct>({
        cursorTimeout: undefined,
        typingTimeout: undefined,
        firstNewLineTimeout: undefined,
        secondNewLineTimeout: undefined,
    });

    let textRef = useRef(text);
    textRef.current = text;

    let cursorColorRef = useRef(cursorColor);
    cursorColorRef.current = cursorColor;

    let messageIndexRef = useRef(messageIndex);
    messageIndexRef.current = messageIndex;

    let textIndexRef = useRef(textIndex);
    textIndexRef.current = textIndex;

    let timeoutsRef = useRef(timeouts);
    timeoutsRef.current = timeouts;

    let typingAnimation = () => {
        if (textIndexRef.current < props.text[messageIndexRef.current].length) {
            console.log("Mai trebuie sa scriem")
            setText(textRef.current + props.text[messageIndexRef.current].charAt(textIndexRef.current));
            setTextIndex(textIndexRef.current + 1);

            let updatedTimeouts = { ...timeoutsRef.current };
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 50);
            setTimeouts(updatedTimeouts);
        } else if (messageIndexRef.current + 1 < props.text.length) {
            setMessageIndex(messageIndexRef.current + 1);
            setTextIndex(0);

            let updatedTimeouts = {...timeoutsRef.current};
            updatedTimeouts.firstNewLineTimeout = setTimeout(newLineAnimation, 120);
            updatedTimeouts.secondNewLineTimeout = setTimeout(newLineAnimation, 200);
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 280);
            setTimeouts(updatedTimeouts);
        } else {
            clearInterval(timeoutsRef.current.cursorTimeout);
            setCursorColor("transparent");

            if (props.onComplete) {
                console.log("Am terminat")
                console.log(textRef.current)
                console.log(textIndexRef.current)
                // props.onComplete();
                

                let updatedTimeouts = { ...timeoutsRef.current };
                updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
                updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250);
                setTimeouts(updatedTimeouts);
                textRef.current = "";
                textIndexRef.current = 0;
                console.log(textRef.current)
                console.log(textIndexRef.current + " < " + props.text[messageIndexRef.current].length)

                
            }
        }
    };

    let newLineAnimation = () => {
        setText(textRef.current + "\n");
    };

    let cursorAnimation = () => {
        if (cursorColorRef.current === "transparent") {
            setCursorColor(cursorColor);
        } else {
            setCursorColor("transparent");
        }
    };

    useEffect(() => {
        console.log("Intru din nou aici");

        let updatedTimeouts = { ...timeoutsRef.current };
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
        updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250);
        setTimeouts(updatedTimeouts);

        return () => {
            clearTimeout(timeoutsRef.current.typingTimeout);
            clearTimeout(timeoutsRef.current.firstNewLineTimeout);
            clearTimeout(timeoutsRef.current.secondNewLineTimeout);
            clearInterval(timeoutsRef.current.cursorTimeout);
        };
    }, []);

    return (
        <Text style={styles.text}>
            {text}
            {/* <Text style={{color: cursorColor}}>|</Text> */}
        </Text>
    )
};

export default AnimatedTyping;

let styles = StyleSheet.create({
    text: {
        color: textColor,
        textAlign: "center"
        //alignSelf: "stretch"
    }
})
import { Component } from "react";
import { Image, View } from "react-native";

export default class Lscreen extends Component {
   
    constructor(props: any){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        setTimeout( () => {
        console.log("CE MAAA?")
        }, 5000 );
    }


    render() {
        return (
            <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
                <Image style={{resizeMode:'center'}}
                source={require('../../assets/hobby_horse.png')}
                ></Image>
            </View> 
        );
    }
}
import React from "react";
import AnimalsContainer from "./AnimalsContainer";
import HelloWorld from "./start";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            //we can also leave it empy and it will work
            name: "",
            cutenessScore: null
        };
        //we'll bind this with handlechange, because this in handleChange doesn't know what "this is":
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    //it's like Mounted:
    //In here we don't need bout this, because it's automatticaly binded
    componentDidMount() {
        axios.get("/get-animal").then(resp => {
            // console.log("resp from /get-animal:", resp);
            //we store our resp in "state"! state is an equialent to data in vue. State must be an object - an array won't work.
            this.setState({
                //the function we have to use in order to put resp.data in our state
                name: resp.data.name,
                cutenessScore: resp.data.cutenessScore
            });
            // console.log("this.state:", this.state);
        });
    }

    //when chage even happens this function will run:
    handleChange(e) {
        // console.log("handleChange running");
        // console.log(e.target.value);
        // console.log("e.target.name:", e.target.name);
        this.setState({
            //whatever the name of the input is should be a propperty of the input field
            [e.target.name]: e.target.value //it does not mean an array , it means whatever is inside should be understood as variable
        });
    }

    handleClick(e) {
        e.preventDefault(); //to keep the form from submitting
        console.log("this.state:", this.state);
        //from here you could make a post request with axios, just like we did in Vue.
    }

    render() {
        return (
            <div>
                <AnimalsContainer //PROPS: we gonna take the state of App and
                    //pass it to AnimalsContainer(child component)
                    name={this.state.name} //we're passing to AnimalsContainter a prop(or a variable) called name a value of this.state.name. we can call this variable whatever name, but the value has to be some value of our state
                    cutenessScore={this.state.cutenessScore}
                />
                <HelloWorld />
                <form>
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="cutenessScore"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>submit</button>
                </form>
            </div>
        );
    }
}

//it's very important that every input field has a name

//    //to asign input to the state we have to listen to event
//called "change", there are different events

//when our app component mounts, then we can have a function that will run and fetch data from a server (or api)
//In react this function is called: componentDidMount
//axios has to be importet to the component

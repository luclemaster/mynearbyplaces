import React from 'react'
//import App from '../App';
import Entry from './Entry'
import server from '../serverInterface/server'
import entries from '../serverInterface/entries'
import  './Home.css'
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            entries: "",
            page: 0,
            location: "",
            category: "",
            currentReview: "",
            pickedResult: false,
            editingPage: false,
            name: "",
            address: "",
            infoText: ""
        }
    }
    openPage = (event) => {
        this.setState({ pickedResult: true});
    }
    HomePage = () => {
        this.setState({ pickedResult: false})
    }
    componentDidMount() {
        const entries = server.fetchEntries();
        this.setState({ entries: entries });
    }

    updateChanges = () => {
        if(this.setState.pickedResult){
            server.changeInfo(this.state.name,
                this.state.address, this.state.infoText, this.state.page)
        }
        else{
            server.createPage(this.state.name,this.state.address, this.state.infoText)
        }
        this.setState({editingPage: false,
            pickedResult: false})
        this.setState({name: "", addReview: "", infoText: "" })
    }
    cancelChanges = () => {
        this.setState({editingPage: false});
        this.setState({name: "", addReview: "", infoText: "" })
    }
    chooseLocation = (event) => {
        const value = event.target.value
        this.setState ({
            location : value
        });
    }
    chooseCategory = (event) => {
        const value = event.target.value
        this.setState ({
            category : value
        });
    }
    writeReview = (event) => {
        const value = event.target.value
        this.setState ({
            currentReview : value
        });
    }
    postReview = () => {
        server.addReview(this.state.currentReview, this.state.page)
        this.setState ({
            currentReview : ""
        })
    }
    editName = (event) => {
        const value = event.target.value
        this.setState ({
            name : value
        });
    }
    editAddress = (event) => {
        const value = event.target.value
        this.setState ({
            address : value
        });
    }
    editInfo = (event) => {
        const value = event.target.value
        this.setState ({
            infoText : value
        });
    }
    deletePage = () => {
        if(!this.state.pickedResult) {
            this.cancelChanges();
        }
        else {
            server.deleteIndex(this.state.page);
        }
        this.setState({pickedResult: false, 
        editingPage: false});
    }
    editPage = () => {
        if (this.state.pickedResult) {
            this.setState({
                name: entries[this.state.page].name,
                address: entries[this.state.page].address,
                infoText: entries[this.state.page].infoText
            }) 
        } else{
            this.setState({
                name: "",
                    address: "",
                    infoText: ""
            })
        }

        this.setState({editingPage: true})
    }
    fillResults = () => {
        const { entries, page } = this.state
        let mappedList = [];
        for (let i = 0; i < entries.length; i++)
        {
            mappedList.push(i)
        }
        return mappedList.map((val) => {
            return (
                <div className='restaurantArea'>
                    <label className='titleText'>{entries[val].name}</label>
                    <br></br>
                    <text>{entries[val].address}</text>
                    <br></br>
                    <text>{entries[val].infoText}</text>
                    <br></br>
                    <button onClick={() => {this.state.page = val; 
                    this.openPage();}} className='pageButton'>Open Page</button>
                    <br></br>
                </div>
            )
        });
    }
    body = () => {
        const { entries, page } = this.state
        return (
            <div>
                {entries.length > 0 ? 
                <div className="Entry">
                    <Entry entry={entries[page]} />
                </div>
                :
                ''}
            </div>
        )
    }
    selection = () => {
        return(
            <div>
                <lable className='boldText'>City:</lable>
                <input 
                type ="text" 
                value={this.state.location}
                onChange={this.chooseLocation}
                ></input>
                <button>Search</button>
            </div>
        );
    }

    render() {
        const location = this.state.location;
        if(this.state.editingPage) {
            return (
                <div>
                    <label>Name</label>
                    <input value={this.state.name} className='editBox' onChange={this.editName}></input>
                    <br></br>
                    <label>address</label>
                    <input value={this.state.address} className='editBox' onChange={this.editAddress}></input>
                    <br></br>
                    <label>Information</label>
                    <input value ={this.state.infoText} className='editBox' onChange={this.editInfo}></input>
                    <br></br>
                    <button onClick={this.deletePage} className='deleteButton'>Delete Page</button>
                    <button onClick={this.cancelChanges} className='cancelButton'>Cancel Changes</button>
                    <button onClick={this.updateChanges} className='submitButton'>Submit</button>
                </div>
            )
        } else if (this.state.pickedResult) {
            return(
                <div className='restaurantArea'>
                    <button onClick ={this.HomePage}>Home Page</button>
                    <button onClick={this.editPage}>Edit Page</button>
                    <this.body body />
                    <lable></lable>
                    <input 
                    type ="text" 
                    value={this.state.currentReview}
                    onChange={this.writeReview}
                    className='commentBox'
                    ></input>
                    <button onClick={this.postReview}>Post a Review!</button>
                    <br></br>

                </div>
            )
        } else {
            return(
                <div className='pageBackground'>
                    <this.selection selection />
                    <this.fillResults fillResults/>
                    <br></br>
                    <button onClick={this.editPage} className="createPage">Add a location!</button>
                    <br></br>
                </div>
            )
        }
    }
}
export default Home
//photo search
//https://maps.googleapis.com/maps/api/place/photo?photoreference={}maxheight={200}key={app_id}
//info search
//https://maps.googleapis.com/maps/api/place/textsearch/json?query={type of place}+in+{city}key={app_id}

import React from 'react'
import './InfoPage.css'
class Entry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentReview : ""
        }
    }
    onChange = (event) => {
        const value = event.target.value
        this.setState ({
            location : value
        });
    }
    displayReviews = () => {
        return this.props.entry.reviews.map((review) => {
            return <p className='reviewText'>{review}</p>
        })
    }
    
    render(){
        return(
            <div className='pageInfo'>
                <label className="titleText">{this.props.entry.name}</label>
                <div>{this.props.entry.address}</div>
                <div>{this.props.entry.infoText}</div>
                <label className='reviewArea'>Reviews</label>
                <this.displayReviews displayReviews/>
            </div>
        )
    }
}
export default Entry
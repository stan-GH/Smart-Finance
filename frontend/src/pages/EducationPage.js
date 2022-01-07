import React from 'react';
import '../styles/education.css';
import TweetEmbed from 'react-tweet-embed'


class EducationPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            tweets: []
        };

        let options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //Makes GET request to get tweet ids from Twitter service
        fetch('http://localhost:3001/tips/', options).then(res => res.json()).then(twitUser => {
            if (twitUser.success === true) {
                let tweet_wid = []
                for (let i = 0; i < twitUser.tweets.length; i++) {
                    tweet_wid[i] = <li className="tweetList"> <TweetEmbed id= {twitUser.tweets[i].id_str} options={{cards: 'hidden' }}/> </li>
                }

                this.setState({tweets: tweet_wid});
                
            }
        });
    }

    componentDidMount() {
        if (this.props.currUser != null) {
            document.getElementById('login-link').innerHTML = 'Logout';
            document.getElementById('login-link').onclick = function() {
                this.props.changeUser(null);
            }
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
    }

    render() {
        return(
            <div id="education-pg">
                <h1 id="education-title"> Education </h1>
                <h2 id="about"> Learn About Finances For Free Here </h2>

                <div id="budgeting-container" className="container">
                    <h2> Budgeting </h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/pZDxU74V924" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p> Learn how to budget with this video from Bank of America!
                    </p>
                </div>

                <div id="invest-container" className="container">
                    <h2> Investing 101 </h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Sbp_t4guM8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p> Start learning how to invest your money to grow your capital!
                    </p>
                </div>

                <div id="money-container" className="container">
                    <h2> Cash or Credit? </h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fXp8I1iSrlc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p> Most people have questionson whether they should use cash or credit to pay for goods and services. Watch this video to find out the answer!
                    </p>
                </div>
                <h2> Daily Tips From MoneyTips! </h2>
                <ul>{this.state.tweets} </ul>
                
            </div>
        );
    }
}

export default EducationPage;
import React from 'react'
import  '../../css/routes/flowerDetail.css'

import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import SearchHeader from '../../components/common/searchHeader';
import Comment from '../../components/flowerDetail/comment';
import NewComment from '../../components/flowerDetail/newcomment';
import * as Auth from '../../actions/authAction';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            flower: {},
            newCommentState: false
        }
        this.openNewComment = this.openNewComment.bind(this)
        this.closeNewComment = this.closeNewComment.bind(this)
        this.readComments = this.readComments.bind(this)
        this.newComment = this.newComment.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        axios('/flowers/' + this.props.match.params.id)
            .then(response => this.setState({ flower: response.data }))
            .then(() => {return this.readComments()})
            .then(response => {this.setState({comments: response.data.comments, isLoading: false});})
    }

    readComments() {
        return axios(
            '/flowers/' + this.props.match.params.id + '/comments')
    }

    openNewComment() {
        this.slider.slickGoTo(0)
        this.setState({
            'lastCommentPosition': document.getElementsByClassName('slick-current')[0].getAttribute("data-index"), 
            'newCommentState': true
        })
        console.log(this.state)
    }

    closeNewComment(cancel) {
        if(cancel) 
            this.slider.slickGoTo(this.state.lastCommentPosition)
        this.setState({'newCommentState': false})
    }


    newComment(data) {
        this.closeNewComment(true)
        console.log(this.props.access)
        axios({
            method: 'post',
            url: '/flowers/' + this.state.flower.id + '/comments/',
            data,
            headers: {
                authorization: 'Bearer '+ this.props.access 
            },
        }).then((response) => {
            console.log(response.data)
            this.setState({'comments': response.data.comments })
        }).then(() => {
            this.closeNewComment()
        })
    }
    
    render() {
        const settings = {
            dots: false, infinite: false, speed: 500,
            slidesToShow: 3, slidesToScroll: 3,
        };

        return (
            <div className="flower-detail">
                <SearchHeader/>
                    {this.state.isLoading ? 
                    (<div className="main"><h1>loading...</h1></div>) :
                    (<div className="main">
                        <img src={this.state.flower.images[0].url}/>
                        <div className="flower-header">
                            <div className="title">
                                <h2>{this.state.flower.name}</h2>
                                <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="star"/>
                                <h2>{this.state.flower.star ? this.state.flower.star : '평가없음'}</h2>
                            </div>
                            <div className="languages">
                                <h3>꽃말</h3>
                                <div>
                                    {this.state.flower.languages.map(value => {
                                        return <Link to={"/search?language=" + value.name} onClick={(event) => event.stopPropagation()}>
                                        <h5 className="purpose">{value.name}</h5></Link>
                                    })}
                                </div>
                            </div>
                            <div className="purposes">
                                <h3>목적</h3>
                                <div>
                                    {this.state.flower.purposes.map(value => {
                                        return <Link to={"/search?purpose=" + value.name} onClick={(event) => event.stopPropagation()}>
                                        <h5 className="purpose">{value.name}</h5>
                                    </Link>;
                                    })}
                                </div>
                            </div>
                            <div className="colors">
                                <h3>색상</h3>
                                <div>
                                    {this.state.flower.colors.map(value => {
                                        return <h5>{value.name}</h5>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                { this.state.isLoading ? 
                    (<div className="description"/>) : (
                    <div className="description">
                        <h3>꽃 설명</h3>
                        <p>{this.state.flower.description}</p>
                    </div>)
                }
                
                { this.state.isLoading ? 
                    (<div className="comments"/>) : (
                    <div className="comments">
                        <h3>댓글</h3>
                        <div className="slide-wrapper">
                            <Slider ref={slider => (this.slider = slider)} {...settings} className="comment-slides">
                                {this.state.newCommentState ? 
                                    <NewComment newComment={this.newComment} closeNewComment={this.closeNewComment}/> : null}
                                {this.state.comments.map(value => {
                                    return <Comment comment={value}/> 
                                })}
                            </Slider>
                        </div>
                        <button onClick={this.openNewComment}>댓글쓰기</button>
                    </div>)
                }
            </div>
        );
    }

}


export default connect(
    (state) => ({
        loading: state.auth.pending,
        error: state.auth.error,
        isLogin: state.auth.isLogin,
        access: state.auth.data.access
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(FlowerDetail));
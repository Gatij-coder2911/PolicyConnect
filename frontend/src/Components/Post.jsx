import React, { useState } from "react";
import "../Pages/Feed.css";
import Comment from "./Comment";
import PropTypes from 'prop-types';

const PolicyPost = ({ title, description,department_name,department_description,ministry_name, authorities, reference, file, created_by, upvotes, downvotes, comments: initialComments, onBookmark, onLike, onDislike, onExplain }) => {
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState("");

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setIsDisliked(false);
        onLike();
    };

    const handleDislike = () => {
        setIsDisliked(!isDisliked);
        setIsLiked(false);
        onDislike();
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        onBookmark();
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { name: "Current User", comment: newComment }]);
            setNewComment("");
        }
    };

    return (
        <div className="policypost">
            <div className="username">
                <div className="userphoto"></div>
                <div className="name">
                    <h1 className="TitleName">Name</h1>
                    <p>Admin</p>
                </div>
            </div>
            <div className="titlepreview">
                <h1>{title}</h1>
                
                <div className="pdfpreview">
                <div>
                    <h2>Government Of India</h2>
                    <h1>Ministry Name:</h1>
                    <p>{ministry_name}</p>
                    <h1>Department Name:</h1>
                    <p>{department_name}</p>
                    <h1>Department Description:</h1>
                    <p>{department_description}</p>
                    <h1>Description:</h1>
                    <p>{description}</p>
                    
                    <h1>Authorities</h1>
                    <p>{authorities}</p>
                    <h1>Reference</h1>
                    <p>{reference}</p>
                </div>
                </div>
                <div className="likedislikecontainer">
                    <div className="likedislike">
                        <button className={`like ${isLiked ? 'active' : ''}`} onClick={handleLike}>
                            Like ({upvotes})
                        </button>
                        <button className={`dislike ${isDisliked ? 'active' : ''}`} onClick={handleDislike}>
                            Dislike ({downvotes})
                        </button>
                        <button className="Comment" onClick={toggleComments}>
                            Comment
                        </button>
                        <button className="Explain" onClick={onExplain}>
                            Explain
                        </button>
                    </div>
                    <div>
                        <button className={`Comment ${isBookmarked ? 'active' : ''}`} onClick={handleBookmark}>
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                    </div>
                </div>
                {showComments && (
                    <>
                        {comments.map((comment, index) => (
                            <Comment key={index} name={comment.name} comment={comment.comment} />
                        ))}
                        <div className="add-comment">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <button onClick={handleAddComment}>Post</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

PolicyPost.propTypes = {
    policy_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    authorities: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    ministry_name: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    department_name: PropTypes.string.isRequired,
    department_description: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    onExplain: PropTypes.func.isRequired,
    comments: PropTypes.array,
    onBookmark: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired,
};
export default PolicyPost;
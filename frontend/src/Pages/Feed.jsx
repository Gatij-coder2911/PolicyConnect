import { useNavigate } from "react-router-dom";
import "./Feed.css";
import PolicyPost from "@/Components/Post";
import axios from "axios";
import { useState, useEffect } from "react";

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentPolicies();
  }, []);

  const fetchRecentPolicies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:5000/api/recent_policies"
      ); // Update the endpoint if necessary
      console.log(response.data);
      setPosts(
        Array.isArray(response.data.policies) ? response.data.policies : []
      );
      setError(null);
    } catch (error) {
      console.error("Error fetching policies:", error);
      setError("Failed to fetch policies. Please try again later.");
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSummary = async (post) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/summarize_policy', {
        title: post.title,
        description: post.description,
        details: post.details || post.description, // Use description as fallback if details are not available
        ministry_name: post.ministry_name,
        department_name: post.department_name,
        department_description: post.department_description,
        summary_length: 200
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to fetch summary.');
    }
  };
  const handleBookmark = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/bookmark`);
      // Update local state or refetch posts
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

  const handleLikeDislike = async (postId, action) => {
    try {
      await axios.post(`/api/posts/${postId}/${action}`);
      // Update local state or refetch posts
    } catch (error) {
      console.error(`Error ${action} post:`, error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function gotoHome() {
    navigate("/");
  }
  function gotoRanking() {
    navigate("/ranking");
  }

  return (
    <div className="contain">
      <div className="vertical">
        <div className="sidebar1">
          <li className="list">
            <button className="listbtn" onClick={gotoHome}>
              Home
            </button>
            <button className="listbtn" onClick={gotoRanking}>
              Ranking Board
            </button>
            <button className="listbtn">Library</button>
          </li>
        </div>
        <div className="sidebar2">
          <div>
            <h1>LeaderBoard</h1>
          </div>
          <div className="leaderlist">
            <div className="roundedbar">
              <div className="round">1</div>
              <h3>RANK 1</h3>
            </div>
            <div className="roundedbar">
              <div className="round">2</div>
              <h3>RANK 2</h3>
            </div>
            <div className="roundedbar">
              <div className="round">3</div>
              <h3>RANK 3</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="mainbarFeed">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PolicyPost
              key={post.policy_id} // Ensure this is the correct unique key for your policies
              title={post.title}
              description={post.description}
              details={post.details}
              ministry_name={post.ministry_name}
              department_description={post.department_description}
              department_name={post.department_name}
              authorities={post.authorities}
              reference={post.reference}
              file={post.pdf_file_path}
              created_by={post.created_by}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              comments={post.comments}
              onBookmark={() => handleBookmark(post.policy_id)}
              onLike={() => handleLikeDislike(post.policy_id, "like")}
              onDislike={() => handleLikeDislike(post.policy_id, "dislike")}
              onExplain={() => fetchSummary(post)}
              />
          ))
        ) : (
          <div>No recent policies available.</div>
        )}
      </div>
      <div className="sidebar3">
        <div className="explanation">
          <h1>Explanation</h1>
          <div className="summary">
          {summary ? (
            <p className="Select">{summary}</p>
          ) : (
            <p className="Select">Select a policy to see its summary.</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;

import { useState, useEffect } from 'react';
import './Ranking.css';
import "./Feed.css"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Ranking = () => {
    const navigate = useNavigate();
    const [topPolicies, setTopPolicies] = useState([]);
    const [expandedPolicy, setExpandedPolicy] = useState(null);



    useEffect(() => {
        fetchTopPolicies();
    }, []);

    const fetchTopPolicies = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/policy');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setTopPolicies(data.slice(0, 4)); // Get top 4 policies if data is an array
            } else if (typeof data === 'object' && data !== null) {
                // If data is an object, assume the policies are in a property (e.g., data.policies)
                const policies = data.policies || Object.values(data);
                setTopPolicies(policies.slice(0, 4));
            } else {
                console.error('Unexpected data format:', data);
                setTopPolicies([]);
            }
        } catch (error) {
            console.error('Error fetching top policies:', error);
            setTopPolicies([]);
        }
    };

    function gotoHome() {
        navigate('/');
    }

    function gotoRanking() {
        navigate('/ranking');
    }

    function togglePolicyExpansion(policyId) {
        setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
    }
    return (
        <div className="contain">
            <div className="sidebarr">
                <li className="list">
                    <button className="listbtn" onClick={gotoHome}>Home</button>
                    <button className="listbtn" onClick={gotoRanking}>Ranking Board</button>
                    <button className="listbtn">Library</button>
                </li>
            </div>
            <div className="mainbarFeed">
                <h2>Ranking Board</h2>
                <div className='rankingboard'>
                    {topPolicies.map((policy, index) => (
                        <div className='rank' key={policy.id}>
                            <div className='hi'>
                                <div className='userphot'>
                                    <h1>{index + 1}</h1>
                                </div>
                                <div className='posttitle'>
                                    <h1>{policy.title}</h1>
                                    <p>{policy.created_by}</p>
                                </div>
                                <button 
    className='viewPolicyBtn' 
    onClick={() => togglePolicyExpansion(policy.id)}
>
    {expandedPolicy === policy.id ? 'Hide Policy' : 'View Policy'}
</button>
                            </div>
                            {expandedPolicy === policy.id && (
                                <div className="expandedPolicy">
                                    <h2>Government Of India</h2>
                                    <h3>Ministry Name:</h3>
                                    <p>{policy.ministry_name}</p>
                                    <h3>Department Name:</h3>
                                    <p>{policy.department_name}</p>
                                    <h3>Department Description:</h3>
                                    <p>{policy.department_description}</p>
                                    <h3>Description:</h3>
                                    <p>{policy.description}</p>
                                    <h3>Authorities:</h3>
                                    <p>{policy.authorities}</p>
                                    <h3>Reference:</h3>
                                    <p>{policy.reference}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Ranking.propTypes = {
    policy_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    authorities: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    ministry_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    department_name: PropTypes.string.isRequired,
    department_description: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    comments: PropTypes.array,
    onBookmark: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired
};

export default Ranking


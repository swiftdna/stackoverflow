// import { Row } from 'react-bootstrap';
import {isEmpty} from 'underscore';
import { useNavigate } from 'react-router-dom';
export default function UserCard({owner, data, source}) {

    const navigate = useNavigate();

    if (isEmpty(data)) {
        return <></>
    }

    const getOuterClassName = () => {
        let base = "post-signature flex--item";
        if (owner) {
            base += " owner";
        }
        if (source === 'list') {
            base += " list";
        }
        return base;
    }

    const openUser = () => {
        navigate(`/userProfile/${data._id}/${data.email}`);      }

	return (
		<div className={getOuterClassName()}>
            <div className="user-info user-hover">
                <div className="user-action-time">
                    <div className="js-gps-track">{owner ? 'asked' : 'edited'} <span title={data.modified} className="relativetime">{data.modified}</span></div>
                </div>
                <div className="user-gravatar32">
                    <a href><div className="gravatar-wrapper-32"><img src={data.profilePhoto} alt="user avatar" width="32" height="32" className="bar-sm" /></div></a>
                </div>
                <div className="user-details">
                    <a href  onClick={() => openUser()}>{data.username}</a>
                    {data.badgecount ? 
                        <div className="-flair">
                            <span className="reputation-score" title="reputation score 29,910" dir="ltr">{data.Reputation}</span>
                            <span title="21 gold badges" aria-hidden="true">
                            <span className="badge1"></span>
                            <span className="badgecount">{data.badgecount.Gold}</span>
                            </span><span className="v-visible-sr">{data.badgecount.Gold} gold badges</span>
                            <span title="99 silver badges" aria-hidden="true">
                            <span className="badge2">
                            </span><span className="badgecount">{data.badgecount.Silver}</span></span>
                            <span className="v-visible-sr">{data.badgecount.Silver} silver badges</span>
                            <span title="124 bronze badges" aria-hidden="true">
                            <span className="badge3">
                            </span><span className="badgecount">{data.badgecount.Bronze}</span></span>
                            <span className="v-visible-sr">{data.badgecount.Bronze} bronze badges</span>
                        </div> : ''}
                </div>
            </div>
        </div>
	)
}
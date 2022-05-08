// import { Row } from 'react-bootstrap';

export default function UserCard({owner, data}) {
	return (
		<div className={owner ? "post-signature owner flex--item" : "post-signature flex--item"}>
            <div className="user-info user-hover">
                <div className="user-action-time">
                    <a href title="show all edits to this post" className="js-gps-track" data-gps-track="post.click({ item: 4, priv: 0, post_type: 1 })">{owner ? 'asked' : 'edited'} <span title={data.modified} className="relativetime">{data.modified}</span></a>
                </div>
                <div className="user-gravatar32">
                    <a href><div className="gravatar-wrapper-32"><img src={data.profilePhoto} alt="user avatar" width="32" height="32" className="bar-sm" /></div></a>
                </div>
                <div className="user-details">
                    <a href>{data.username}</a>
                    <div className="-flair">
                        <span className="reputation-score" title="reputation score 29,910" dir="ltr">29.9k</span><span title="21 gold badges" aria-hidden="true"><span className="badge1"></span><span className="badgecount">21</span></span><span className="v-visible-sr">21 gold badges</span><span title="99 silver badges" aria-hidden="true"><span className="badge2"></span><span className="badgecount">99</span></span><span className="v-visible-sr">99 silver badges</span><span title="124 bronze badges" aria-hidden="true"><span className="badge3"></span><span className="badgecount">124</span></span><span className="v-visible-sr">124 bronze badges</span>
                    </div>
                </div>
            </div>
        </div>
	)
}
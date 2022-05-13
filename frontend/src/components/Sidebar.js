import { Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const loc = useLocation();
    const isActivePath = (path, current_class) => {
        switch (path) {
            case 'home':
                if (loc.pathname === '/')
                    return current_class + ' active';
                return current_class;
            case 'questions':
                if (loc.pathname.indexOf('/search') !== -1 || loc.pathname.indexOf('/questions') !== -1)
                    return current_class + ' active';
                return current_class;
            case 'tags':
                if (loc.pathname.indexOf('/tags') !== -1)
                    return current_class + ' active';
                return current_class;
            case 'users':
                if (loc.pathname.indexOf('/users') !== -1)
                    return current_class + ' active';
                return current_class;

            case 'companies':
                    if (loc.pathname.indexOf('/adminReview') !== -1)
                        return current_class + ' active';
                    return current_class;
            default:
                if (loc.pathname.indexOf(`/${path}`) !== -1)
                    return current_class + ' active';
                return current_class;
        }
        
    };
	return (
		<Col xs={2} style={{borderRight: '1px solid #DEDEDE', marginRight: '0', paddingRight: '0'}}>
            <ol className="nav-links">
                <li className={isActivePath('home', 'ps_relative')} onClick={() => navigate('/')}>Home</li>
                <ol className="nav-links">
                    <li className="fs-fine heading tt-uppercase ml8 mt16 mb4 fc-light">Public</li>
                    <li className={isActivePath('questions', 'sub')} onClick={() => navigate('/')}>Questions</li>
                    <li className={isActivePath('tags', 'sub')} onClick={() => navigate('/tags')}>Tags</li>
                    <li className={isActivePath('users', 'sub')} onClick={() => navigate('/users')}>Users</li>
                    <li className={isActivePath('companies', 'sub')}>Companies</li>
                </ol>
            </ol>
        </Col>
	)
}
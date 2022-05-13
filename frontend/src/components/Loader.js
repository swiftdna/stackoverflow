import { Spinner } from 'react-bootstrap';


export default function Loader({ text }) {
	return (
		<Spinner animation="border" role="status" style={{position: 'absolute', left: '48%', top: '40%', color: '#0070BA', width: '6em', height: '6em'}}>
		  <span className="visually-hidden">{text}</span>
		</Spinner>
	);
}
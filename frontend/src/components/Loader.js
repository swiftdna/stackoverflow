import { Spinner } from 'react-bootstrap';


export default function Loader({ text }) {
	return (
		<Spinner animation="border" role="status">
		  <span className="visually-hidden">{text}</span>
		</Spinner>
	);
}
import Button from "./Button";
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate(); // Added parentheses to invoke the hook
    return (
        <div>
            <Button type="back" onClick={(e) => {
                e.preventDefault();
                navigate(-1); // Call navigate function properly
            }}>
                &larr;Back
            </Button>
        </div>
    );
}

export default BackButton;

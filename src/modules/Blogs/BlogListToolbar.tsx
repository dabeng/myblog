import { Link } from "react-router-dom";

export default function BlogListToolbar() {
    return (
        <p className="buttons">
            <Link to="create" className="button is-primary">
                <span className="icon">
                    <i className="fa-regular fa-pen-to-square"></i>
                </span>
                <span>Write a blog</span>
            </Link>
        </p>
    );
}
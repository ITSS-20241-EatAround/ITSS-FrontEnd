import { useState, useEffect } from "react";
import { GetCommentAPI, PostCommentAPI } from "../../services/userApi";
import moment from "moment/moment";

const StarRatingInput = ({ value, onChange }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-lg cursor-pointer ${star <= value ? "text-yellow-500" : "text-gray-300"
                        }`}
                    onClick={() => onChange(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};
const Comment = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getComments = (page) => {
        GetCommentAPI(id, {
            params: {
                page: page
            }
        }).then(({ data }) => {
            setComments(data.data);
            setTotalPage(data.totalPages);
            setCurrentPage(data.currentPage);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        getComments(currentPage);
    }, [id, currentPage]);

    const addComment = () => {
        if (newComment.trim() && rating > 0) {
            PostCommentAPI({
                dish_id : id, 
                comment_content : newComment, 
                dish_rate : rating
            }).then((data) => {
                setNewComment("");
                setRating(0);
                setCurrentPage(1);
                getComments(currentPage);
            }).catch((er) => {
                console.log(er);
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            addComment();
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    onKeyDown={handleKeyPress}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                ></textarea>
                <StarRatingInput value={rating} onChange={setRating} />
                <button
                    onClick={addComment}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Thêm bình luận
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {comments.length === 0 ? (
                    <p className="text-gray-500">Chưa có bình luận nào.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.comment_id} className="border-b py-2">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-800">{comment.user.name}</h4>
                                <span className="text-gray-500 text-sm">
                                    {moment(new Date(comment.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                            </div>
                            <div className="flex items-center mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-lg ${star <= +comment.dish_rate
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-700">{comment.comment_content}</p>
                        </div>
                    ))
                )}
            </div>
            {/* Pagination */}
            {totalPage > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-4">
                    <button
                        onClick={() => {
                            setCurrentPage((prev) => +prev - 1)}
                        }
                        className={`px-3 py-1 rounded ${currentPage == 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                        disabled={currentPage == 1}
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => {
                            setCurrentPage((prev) => +prev + 1)
                            }
                        }
                        className={`px-3 py-1 rounded ${currentPage == totalPage
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                        disabled={currentPage == totalPage}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default Comment;
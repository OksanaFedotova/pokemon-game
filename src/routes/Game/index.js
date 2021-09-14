const GamePage = ({onChangePage}) => {
    const handleClick = (page) => {
        onChangePage && onChangePage(page);
    }
    return (
    <div>
        This is Game Page!
        <button onClick={handleClick}>
            Home
        </button>
    </div>
    );
};

export default GamePage;
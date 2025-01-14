import { useEffect, useState } from "react";
import LoadMoreButton from "./LoadMoreButton";

const ParentComponent = () => {
  const [limit, setLimit] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Simulate an API call
  const fetchPosts = async (newLimit) => {
    setIsSpinning(true);
    setError(null); // Reset any previous errors
    try {
      // Mock API call delay
      const newPosts = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              Array.from({ length: newLimit }, (_, i) => ({
                id: i + 1,
                content: `Post ${i + 1}`,
              }))
            ),
          1000
        )
      );
      setPosts(newPosts);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setIsSpinning(false);
    }
  };

  useEffect(() => {
    fetchPosts(limit);
  }, [limit]);

  // Scroll event handler
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100 &&
      !isSpinning
    ) {
      setLimit((prevLimit) => prevLimit + 5);
    }
  };

  useEffect(() => {
    const throttledScroll = () => {
      setTimeout(handleScroll, 200); // Throttle scroll events
    };
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [isSpinning]);

  return (
    <div>
      <div>
        {error && <div className="error">{error}</div>}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              {post.content}
            </div>
          ))
        ) : isSpinning ? (
          <div className="spinner">Loading...</div>
        ) : (
          <div className="no-data">No posts available.</div>
        )}
      </div>
      <LoadMoreButton isSpinning={isSpinning} />
    </div>
  );
};

export default ParentComponent;

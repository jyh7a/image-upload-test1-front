import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageLayout = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [elapsedTime, setElapsedTime] = useState(null); // 새로운 state

  const fetchData = async () => {
    try {
      const response = await axios.get(`/get-images?search=${query}`);
      const { results, elapsedTime } = response.data;
      setImages(results);
      setElapsedTime(elapsedTime); // 시간을 state에 저장
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]); // 'query'가 변경될 때만 API를 호출합니다.

  const handleSearch = () => {
    setQuery(search); // 검색 버튼을 누르면 'query'를 'search'로 설정
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {elapsedTime !== null && ( // 걸린 시간이 있으면 표시
          <span> Search took {elapsedTime} ms</span>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {images.map(({ title, url }, index) => (
            <tr key={index}>
              <td>{title}</td>
              <td>
                <img
                  src={`/proxy-images/${url}`}
                  alt={title}
                  width="200"
                  height="200"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageLayout;

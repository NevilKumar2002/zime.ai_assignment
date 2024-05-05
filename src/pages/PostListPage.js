// PostListPage.js

import React, { useState, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import Filters from '../components/Filters';
import PostTable from './PostTable';
import SearchInput from '../components/SearchInput';
import { fetchData } from '../api';
import "../index.css"

const { Content } = Layout;

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      try {
        const data = await fetchData({ page: pagination.current, pageSize: pagination.pageSize, tags: selectedTags, search: searchText });
        setPosts(data.data);
        setPagination({ ...pagination, total: data.total });
        const uniqueTags = [...new Set(data.data.flatMap(post => post.tags))];
        setAllTags(uniqueTags);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [pagination.current, pagination.pageSize, selectedTags, searchText]);
  
  const handlePageChange = (pagination) => {
    setPagination(pagination);
  };

  const handleFiltersChange = (selectedFilters) => {
    setSelectedTags(selectedFilters);
    // Reset pagination to the first page when filters change
    setPagination({ ...pagination, current: 1 });
  };

  const handleSearchChange = (value) => {
    setSearchText(value);
  };

  const filteredPosts = posts
    .filter(post => post.body.toLowerCase().includes(searchText.toLowerCase())) // Filter based on search text
    .map(post => ({
      ...post,
      tags: post.tags.map(tag => ({
        name: tag,
        isHighlighted: selectedTags.includes(tag),
      })),
    }))
    .filter(post => selectedTags.every(tag => post.tags.find(t => t.name === tag)));
  
  return (
    <Layout className='layout-container'>
      <Content style={{ padding: '0 50px' }}>
        <Filters options={allTags} onChange={handleFiltersChange} />
        <SearchInput onChange={handleSearchChange} />
        {loading && <Spin />}
        {error && <div>Error: {error.message}</div>}
        {!loading && !error && (
          <PostTable
            dataSource={filteredPosts}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </Content>
    </Layout>
  );
};

export default PostListPage;

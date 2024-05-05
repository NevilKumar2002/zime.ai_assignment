// PostTable.js

import React from 'react';
import { Table, Tag } from 'antd';

const PostTable = ({ dataSource, pagination, onPageChange, searchText }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      render: (text) => {
        if (!searchText || !text.toLowerCase().includes(searchText.toLowerCase())) {
          return <span>{text}</span>;
        }

        // Split the text into parts before and after the matched text
        const parts = text.split(new RegExp(`(${searchText})`, 'gi'));

        return (
          <span>
            {parts.map((part, index) => (
              part.toLowerCase() === searchText.toLowerCase() ? (
                <span key={index} style={{ color: 'yellow' }}>{part}</span>
              ) : (
                <span key={index}>{part}</span>
              )
            ))}
          </span>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map(({ name, isHighlighted }) => (
            <Tag color={isHighlighted ? 'blue' : undefined} key={name}>
              {name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Reactions',
      dataIndex: 'reactions',
      key: 'reactions',
    },
  ];

  return (
    <div style={{ overflowX: 'auto', backgroundColor:'white' }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        onChange={onPageChange}
        rowKey="id"
        
      />
    </div>
  );
};

export default PostTable;

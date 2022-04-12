import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from 'antd';

import '../App.css';
import 'antd/dist/antd.css';

interface Commit {
    commit: {
        author: {
            name: string;
            date: string;
        }
        message: string;
        url: string;
    }
}

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        width: 230,
    },
    {
        title: 'Author',
        dataIndex: 'author',
        width: 150,
    },
    {
        title: 'Message',
        dataIndex: 'message',
    },
    {
        title: 'Url',
        dataIndex: 'url',
    },
];

export const CommitFeedList: React.FC = () => {
    const { userName, repoName } = useParams();
    const navigate = useNavigate();
    const [commits, setCommits] = useState<Commit[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1)
    useEffect(() => {fetchMoreData();}, []);
    const fetchMoreData = useCallback(() => {
        const params = new URLSearchParams();
        params.append('per_page', '10');
        params.append('page', `${pageNumber}`);
        axios.get(`https://api.github.com/repos/${userName}/${repoName}/commits`, {
            headers: { Authorization: `Bearer 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` },
            params
        })
            .then(res => {
                const newCommits = res.data;
                if (!newCommits || newCommits.length < 10) {
                    setHasMore(false);
                } else {
                    const newSinceTime = newCommits[newCommits.length - 1]?.commit?.author?.date;
                    setPageNumber(pageNumber => pageNumber + 1);
                }
                const commitArray = res.data.map((commitMeta: Commit) => ({
                    date: commitMeta.commit.author.date,
                    author: commitMeta.commit.author.name,
                    message: commitMeta.commit.message,
                    url: commitMeta.commit.url
                }));
                setCommits(oldCommits => [...oldCommits, ...commitArray])
            })
            .catch(error => {
                navigate(`/does/not/exist`);
            })
    }, [userName, repoName]);

    return (
        <div className="App" style={{ height: '100vh' }}>
            <h1 style={{ height: '50px', overflow: "auto" }} >Commit Feed Table</h1>
            <div id="scrollableDiv" style={{ height: '90%', overflow: "auto" }}>
                <InfiniteScroll
                    dataLength={commits.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <Table
                        columns={columns}
                        dataSource={commits}
                        pagination={false}
                        bordered
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};



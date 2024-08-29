import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import PopConfirmDelete from './PopconfirmDelete';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function TrackTable() {
    const token = localStorage.getItem('access_token') as string
    const [trackList, setTrackList] = useState([])
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    })
    const columns: TableProps<DataType>['columns'] = [
        {
            title: "STT",
            dataIndex: "test",
            key: "stt",
            render: (text, record, index) => {
                console.log(index)
                return <>{((meta.current - 1) * meta.pageSize) + index + 1 }</>
            }
       }
       ,
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: "trackUrl",
            dataIndex: "trackUrl",
            key: "trackUrl"
        },
        {
            title: "Up loader",
            dataIndex: "uploader",
            key: "uploader",
            render: (i) => <div>{i.name}</div>
        },
        {
            title: 'Action',
            key: 'operation',
            width: 100,
            render: (item) => {
                return <PopConfirmDelete id={item._id} getdata={getData} token={ token } />
            }
            ,
        },

    ];

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const data = await res.json()
        if (data) {
            setTrackList(data.data.result)
            setMeta({
                current: data.data.meta.current,
                pageSize: data.data.meta.pageSize,
                total: data.data.meta.total,
                pages: data.data.meta.pages
            })

        }
    }

    const handlePagination = async (current: number, pageSize: number) => {
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${current}&pageSize=${pageSize}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const data = await res.json()
        setTrackList(data.data.result)
        setMeta({
            current: data.data.meta.current,
            pageSize: data.data.meta.pageSize,
            total: data.data.meta.total,
            pages: data.data.meta.pages
        })
    }



    return (
        <div>
            <Table
                columns={columns}
                dataSource={trackList}
                pagination={{ total: meta.total, current: meta.current, pageSize: meta.pageSize, onChange: handlePagination }} />
        </div>
    )
}

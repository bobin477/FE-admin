import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';

interface IProps {
    id: string
    getdata: any
    token: string
}

export default function PopConfirmDelete(props: IProps) {

    const { id, getdata, token } = props

    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:8000/api/v1/tracks/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const data = await res.json()

        if (data) {
            getdata()
            message.success('delete success');
        } else {
            message.error('xoa khong thanh cong');
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        handleDelete(id)
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };


    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    )
}

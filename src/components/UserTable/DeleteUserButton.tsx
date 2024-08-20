import {Button, Popconfirm, message, notification} from "antd";
import type {PopconfirmProps} from 'antd';

interface IProps {
    _id: string
    token:string
    getData: any
}

const DeleteUserButton = (props: IProps) => {
    const {_id, token, getData} = props

    const handleOk = async (_id: string ) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })
        const d = await res.json();
        console.log(d)
        if (d.data) {
            await getData()
            notification.success({
                message: "Xoa thanh cong"
            })
        } else {
            notification.error(
                {
                    message: "Co loi xay ra",
                    description: JSON.stringify(d.message)
                }
            )
        }


    };

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        await  handleOk(_id)
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <Button danger>Delete</Button>
    </Popconfirm>
}

export default DeleteUserButton;
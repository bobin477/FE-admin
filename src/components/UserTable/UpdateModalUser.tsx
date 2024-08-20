import React, {useEffect} from "react";
import {Form, Input, Modal, notification, Select} from "antd";

const {Option} = Select;
import {IUser} from "./UserTable.tsx";

interface IProps {
    token: string;
    getData: any;
    isUpdateModalOpen: boolean
    setIsUpdateModalOpen: (isOpen: boolean) => void
    dataUpdate: null | IUser
    setUserData: React.Dispatch<React.SetStateAction<IUser | null>>
}


const UpdateModalUser = (props: IProps) => {
    const {token, getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setUserData} = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                role: dataUpdate.role,
                age: dataUpdate.age,
                address: dataUpdate.address,
                gender: dataUpdate.gender,
            })
        }


    }, [dataUpdate]);


    const handleCloseCreateModal = () => {
        setUserData(null);
        setIsUpdateModalOpen(false);

    }

    const onFinish = async (values: IUser) => {
        const data = {
            ...values, _id: dataUpdate?._id
        }

        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...data
            })
        })
        const d = await res.json();

        if (d.data) {
            await getData()
            notification.success({
                message: "Update thanh cong"
            })
            handleCloseCreateModal();
        } else {
            notification.error(
                {
                    message: "Co loi xay ra",
                    description: JSON.stringify(d.message)
                }
            )
        }
    };

    return <div>
        <Modal title="Update User" open={isUpdateModalOpen} onOk={() => form.submit()} onCancel={handleCloseCreateModal}
               maskClosable={false}>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="ADMIN">Admin</Option>
                        <Option value="USER">User</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default UpdateModalUser;
import {Form, Input, Modal, notification, Select} from "antd";

const {Option} = Select;

interface IProps {
    token: string;
    getData: any;
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (isOpen: boolean) => void
}


const UserModalCreate = (props: IProps) => {
    const {token, getData, isCreateModalOpen, setIsCreateModalOpen} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        form.resetFields();
    }

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...values
            })
        })
        const d = await res.json();

        if (d.data) {
            getData()
            notification.success({
                message: "Tao thanh cong"
            })
            handleCloseCreateModal();
            getData();
            form.resetFields();
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
        <Modal title="Create User" open={isCreateModalOpen} onOk={() => form.submit()} onCancel={handleCloseCreateModal}
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
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input.Password/>
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

export default UserModalCreate;